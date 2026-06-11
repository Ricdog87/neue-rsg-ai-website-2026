'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  MessageSquare,
  Send,
  X,
  Sparkles,
  Calendar,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  AlertTriangle,
  UserCog,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Aiko-Widget — Sales-Chatbot mit AI-Act- und DSGVO-konformer
 * Erstöffnung.
 *
 * Compliance:
 * - Erste Konversation startet mit einer KI-Offenlegung (System-Prompt
 *   erzwingt die Phrase „Ich bin Aiko — eine KI"). Zusätzlich rendern
 *   wir hier am Widget-Header dauerhaft „Aiko · KI von RSG AI".
 * - Persistenz: nur localStorage, kein Server-Side Logging der
 *   Konversation jenseits des HubSpot-Eintrags, der NACH expliziter
 *   Einwilligung erfolgt.
 */

type Role = 'user' | 'assistant';
type ToolEvent =
  | { kind: 'lead_captured'; firstName: string }
  | { kind: 'meeting_link'; url: string }
  | { kind: 'checkout_link'; url: string; tier: string; billing: string }
  | { kind: 'escalated' }
  | { kind: 'tool_error'; message: string };

type Message = {
  id: string;
  role: Role;
  content: string;
  tools?: ToolEvent[];
};

const STORAGE_KEY = 'rsg-aiko-chat-v3';

const INTRO_DE: Message = {
  id: 'intro',
  role: 'assistant',
  content:
    'Hi, ich bin Aiko — eine KI-Assistentin von RSG AI. Ich helf dir herauszufinden, ob ein KI-Telefonassistent oder eine Prozess-Automatisierung für euch passt. Welche Abteilung verliert bei euch gerade am meisten Zeit?',
};

function loadHistory(): Message[] {
  if (typeof window === 'undefined') return [INTRO_DE];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [INTRO_DE];
    const parsed = JSON.parse(raw) as Message[];
    if (!Array.isArray(parsed) || parsed.length === 0) return [INTRO_DE];
    return parsed;
  } catch {
    return [INTRO_DE];
  }
}

function persist(messages: Message[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
  } catch {
    /* Quota — silently */
  }
}

export function AikoWidget() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([INTRO_DE]);
  const [input, setInput] = React.useState('');
  const [streaming, setStreaming] = React.useState(false);
  const [unread, setUnread] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const abortRef = React.useRef<AbortController | null>(null);

  React.useEffect(() => {
    setMessages(loadHistory());
  }, []);

  React.useEffect(() => {
    persist(messages);
  }, [messages]);

  React.useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [open, messages, streaming]);

  React.useEffect(() => {
    if (open) {
      setUnread(false);
      const t = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  React.useEffect(() => () => abortRef.current?.abort(), []);

  async function send() {
    const trimmed = input.trim();
    if (!trimmed || streaming) return;

    const userMsg: Message = { id: 'u-' + Date.now(), role: 'user', content: trimmed };
    const assistantMsg: Message = { id: 'a-' + Date.now(), role: 'assistant', content: '' };
    const next = [...messages, userMsg, assistantMsg];
    setMessages(next);
    setInput('');
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch('/api/sales-chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          messages: next
            .filter((m) => m.id !== 'intro' && m.id !== assistantMsg.id)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? 'Anfrage fehlgeschlagen.');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.trim()) continue;
          let event: Record<string, unknown>;
          try {
            event = JSON.parse(line);
          } catch {
            continue;
          }
          if (event.type === 'text') {
            const chunk = String(event.text ?? '');
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsg.id ? { ...m, content: m.content + chunk } : m,
              ),
            );
          } else if (event.type === 'tool') {
            const kind = String(event.kind ?? '');
            let toolEvent: ToolEvent | null = null;
            if (kind === 'lead_captured') {
              toolEvent = { kind, firstName: String(event.firstName ?? '') };
            } else if (kind === 'meeting_link') {
              toolEvent = { kind, url: String(event.url ?? '/termin') };
            } else if (kind === 'checkout_link') {
              toolEvent = {
                kind,
                url: String(event.url ?? ''),
                tier: String(event.tier ?? ''),
                billing: String(event.billing ?? ''),
              };
            } else if (kind === 'escalated') {
              toolEvent = { kind };
            } else if (kind === 'tool_error') {
              toolEvent = { kind, message: String(event.message ?? '') };
            }
            if (toolEvent) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMsg.id
                    ? { ...m, tools: [...(m.tools ?? []), toolEvent as ToolEvent] }
                    : m,
                ),
              );
            }
          } else if (event.type === 'error') {
            const msg = String(event.message ?? 'Etwas ist schiefgelaufen.');
            setMessages((prev) =>
              prev.map((m) => (m.id === assistantMsg.id ? { ...m, content: msg } : m)),
            );
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      const msg =
        err instanceof Error
          ? err.message
          : 'Verbindung abgebrochen. Probier es gleich nochmal.';
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantMsg.id && !m.content ? { ...m, content: msg } : m)),
      );
    } finally {
      setStreaming(false);
      if (!open) setUnread(true);
    }
  }

  function reset() {
    abortRef.current?.abort();
    setMessages([INTRO_DE]);
    setInput('');
    setStreaming(false);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
  }

  return (
    <>
      {/* Floating Launcher */}
      <motion.button
        type="button"
        aria-label={open ? 'Chat schließen' : 'Mit Aiko chatten'}
        onClick={() => setOpen((o) => !o)}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, type: 'spring', stiffness: 200, damping: 18 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full',
          'bg-gradient-to-br from-[hsl(174_100%_45%)] to-[hsl(174_100%_30%)]',
          'text-[#04130f] shadow-[0_10px_40px_-10px_hsl(174_100%_50%/0.7)]',
          'transition-shadow hover:shadow-[0_14px_50px_-8px_hsl(174_100%_50%/0.85)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(174_100%_60%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--bg))]',
          'sm:bottom-6 sm:right-6 sm:h-16 sm:w-16',
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="m" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <MessageSquare className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
        {unread && !open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--accent))] opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[hsl(var(--accent))] ring-2 ring-[hsl(var(--bg))]" />
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            role="dialog"
            aria-label="Chat mit Aiko, KI-Sales-Assistentin von RSG AI"
            className={cn(
              'fixed bottom-24 right-3 z-[69] flex w-[calc(100vw-1.5rem)] max-w-[420px] flex-col overflow-hidden',
              'rounded-2xl border border-[hsl(174_100%_50%/0.3)] bg-[hsl(var(--surface))]/95 backdrop-blur-xl',
              'shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]',
              'sm:bottom-28 sm:right-6',
            )}
            style={{ height: 'min(640px, calc(100dvh - 8rem))' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-[hsl(var(--border))] bg-[hsl(var(--ink))]/60 px-4 py-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(174_100%_45%)] to-[hsl(174_100%_30%)]">
                <Sparkles className="h-5 w-5 text-[#04130f]" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[hsl(174_100%_55%)] ring-2 ring-[hsl(var(--surface))]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-[hsl(var(--fg))]">Aiko · KI von RSG AI</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--muted))]">
                  Sales · jetzt online
                </div>
              </div>
              <button
                type="button"
                onClick={reset}
                className="font-mono text-[10px] uppercase tracking-[0.16em] text-[hsl(var(--subtle))] transition-colors hover:text-[hsl(174_100%_70%)]"
                aria-label="Konversation neu starten"
              >
                Reset
              </button>
            </div>

            {/* AI-Act-Banner — dauerhafte Offenlegung */}
            <div className="flex items-start gap-2 border-b border-[hsl(var(--border))] bg-[hsl(174_100%_50%/0.06)] px-4 py-2.5 text-[11px] leading-relaxed text-[hsl(var(--muted))]">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(174_100%_60%)]" />
              <span>
                Du chattest mit einer KI. Persönliche Daten werden erst nach deiner expliziten Einwilligung verarbeitet (DSGVO).{' '}
                <a
                  href="/datenschutz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-[hsl(174_100%_75%)]"
                >
                  Datenschutz
                </a>{' '}
                ·{' '}
                <a
                  href="/ai-transparenz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-[hsl(174_100%_75%)]"
                >
                  KI-Transparenz
                </a>
              </span>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <Bubble key={m.id} message={m} streaming={streaming} />
              ))}
              {streaming &&
                messages[messages.length - 1]?.role === 'assistant' &&
                !messages[messages.length - 1]?.content && <TypingDots />}
            </div>

            {/* Composer */}
            <div className="border-t border-[hsl(var(--border))] bg-[hsl(var(--ink))]/40 px-3 py-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                className="flex items-end gap-2"
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  placeholder="Frag Aiko zu Preisen, Use-Cases, Terminen…"
                  rows={1}
                  maxLength={2000}
                  disabled={streaming}
                  className={cn(
                    'flex-1 resize-none rounded-xl border border-[hsl(var(--border-strong))] bg-[hsl(var(--bg-deep))]/60',
                    'px-3 py-2 text-sm text-[hsl(var(--fg))] placeholder:text-[hsl(var(--subtle))]',
                    'focus:border-[hsl(174_100%_50%)] focus:outline-none focus:ring-1 focus:ring-[hsl(174_100%_50%)]',
                    'max-h-32 disabled:opacity-50',
                  )}
                  style={{ minHeight: '40px' }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || streaming}
                  aria-label="Senden"
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                    'bg-[hsl(174_100%_45%)] text-[#04130f] transition-all',
                    'hover:bg-[hsl(174_100%_55%)] hover:shadow-[0_0_24px_hsl(174_100%_50%/0.55)]',
                    'disabled:bg-[hsl(var(--border-strong))] disabled:text-[hsl(var(--subtle))] disabled:shadow-none',
                  )}
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
              <p className="mt-2 px-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[hsl(var(--subtle))]">
                Aiko ist eine KI · DSGVO · EU-Hosting
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ message, streaming }: { message: Message; streaming: boolean }) {
  const isUser = message.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn('flex flex-col gap-2', isUser ? 'items-end' : 'items-start')}
    >
      <div
        className={cn(
          'max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'rounded-br-md bg-[hsl(174_100%_45%)] text-[#04130f] shadow-[0_4px_16px_-4px_hsl(174_100%_50%/0.5)]'
            : 'rounded-bl-md border border-[hsl(var(--border))] bg-[hsl(var(--surface-2))] text-[hsl(var(--fg))]',
        )}
      >
        {message.content || (!isUser && streaming ? '…' : '')}
      </div>
      {message.tools?.map((t, i) => <ToolCard key={message.id + '-tool-' + i} tool={t} />)}
    </motion.div>
  );
}

function ToolCard({ tool }: { tool: ToolEvent }) {
  if (tool.kind === 'meeting_link') {
    return (
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl border border-[hsl(174_100%_50%)]/40 bg-[hsl(174_100%_50%)]/10 px-3.5 py-2.5 text-sm text-[hsl(174_100%_75%)] transition-all hover:border-[hsl(174_100%_50%)] hover:bg-[hsl(174_100%_50%)]/20"
      >
        <Calendar className="h-4 w-4" />
        <span className="font-medium">30-Min-Termin mit Ricardo buchen</span>
      </a>
    );
  }
  if (tool.kind === 'checkout_link') {
    const label =
      tool.tier === 'solo' ? 'Solo' : tool.tier === 'team' ? 'AI Account Manager' : tool.tier;
    return (
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--accent))]/40 bg-[hsl(var(--accent))]/10 px-3.5 py-2.5 text-sm text-[hsl(var(--accent-soft))] transition-all hover:border-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/20"
      >
        <CreditCard className="h-4 w-4" />
        <span className="font-medium">
          {label} · {tool.billing === 'annual' ? 'Jahres-Abo' : 'Monats-Abo'} buchen
        </span>
      </a>
    );
  }
  if (tool.kind === 'lead_captured') {
    return (
      <div className="inline-flex items-center gap-2 rounded-xl border border-[hsl(174_100%_50%)]/30 bg-[hsl(174_100%_50%)]/10 px-3.5 py-2 text-xs text-[hsl(174_100%_75%)]">
        <CheckCircle2 className="h-4 w-4" />
        <span>Bei Ricardo angelegt — Antwort meist in &lt; 2 Std.</span>
      </div>
    );
  }
  if (tool.kind === 'escalated') {
    return (
      <div className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--accent))]/30 bg-[hsl(var(--accent))]/10 px-3.5 py-2 text-xs text-[hsl(var(--accent-soft))]">
        <UserCog className="h-4 w-4" />
        <span>Ricardo wurde direkt informiert.</span>
      </div>
    );
  }
  if (tool.kind === 'tool_error') {
    return (
      <div className="inline-flex items-center gap-2 rounded-xl border border-amber-400/30 bg-amber-500/10 px-3.5 py-2 text-xs text-amber-200">
        <AlertTriangle className="h-4 w-4" />
        <span>{tool.message}</span>
      </div>
    );
  }
  return null;
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-3 py-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-[hsl(174_100%_50%)]"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
