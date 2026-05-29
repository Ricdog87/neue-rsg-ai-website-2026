'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, Send, X, Sparkles, Calendar, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Role = 'user' | 'assistant';

type ToolEvent =
  | { kind: 'lead_captured'; name: string }
  | { kind: 'meeting_suggested'; url: string };

type Message = {
  id: string;
  role: Role;
  content: string;
  tools?: ToolEvent[];
};

const STORAGE_KEY = 'rsg-aiko-chat-v1';
const INTRO: Message = {
  id: 'intro',
  role: 'assistant',
  content:
    'Hi, ich bin Aiko — die digitale Sales-Beraterin von RSG AI. Ich helf dir herauszufinden, ob sich ein KI-Agent für euren Prozess wirklich rechnet. Welche Abteilung verliert bei euch gerade am meisten Zeit?',
};

function loadHistory(): Message[] {
  if (typeof window === 'undefined') return [INTRO];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [INTRO];
    const parsed = JSON.parse(raw) as Message[];
    if (!Array.isArray(parsed) || parsed.length === 0) return [INTRO];
    return parsed;
  } catch {
    return [INTRO];
  }
}

function persist(messages: Message[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
  } catch {
    /* quota — silently skip */
  }
}

export function AiChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([INTRO]);
  const [input, setInput] = React.useState('');
  const [streaming, setStreaming] = React.useState(false);
  const [unread, setUnread] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const abortRef = React.useRef<AbortController | null>(null);

  // Load history after mount (avoid hydration mismatch).
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

  React.useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  async function send() {
    const trimmed = input.trim();
    if (!trimmed || streaming) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: trimmed,
    };
    const assistantMsg: Message = {
      id: `a-${Date.now()}`,
      role: 'assistant',
      content: '',
    };

    const next = [...messages, userMsg, assistantMsg];
    setMessages(next);
    setInput('');
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch('/api/chat', {
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
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error ?? 'Anfrage fehlgeschlagen.');
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
                m.id === assistantMsg.id
                  ? { ...m, content: m.content + chunk }
                  : m,
              ),
            );
          } else if (event.type === 'tool') {
            const kind = String(event.kind ?? '');
            if (kind === 'lead_captured' || kind === 'meeting_suggested') {
              const toolEvent: ToolEvent =
                kind === 'lead_captured'
                  ? { kind, name: String(event.name ?? '') }
                  : { kind, url: String(event.url ?? '/termin') };
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMsg.id
                    ? { ...m, tools: [...(m.tools ?? []), toolEvent] }
                    : m,
                ),
              );
            }
          } else if (event.type === 'error') {
            const msg = String(event.message ?? 'Etwas ist schiefgelaufen.');
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsg.id ? { ...m, content: msg } : m,
              ),
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
        prev.map((m) =>
          m.id === assistantMsg.id && !m.content ? { ...m, content: msg } : m,
        ),
      );
    } finally {
      setStreaming(false);
      if (!open) setUnread(true);
    }
  }

  function reset() {
    abortRef.current?.abort();
    setMessages([INTRO]);
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
      {/* Floating launcher */}
      <motion.button
        type="button"
        aria-label={open ? 'Chat schließen' : 'Mit Aiko chatten'}
        onClick={() => setOpen((o) => !o)}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 18 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full',
          'bg-gradient-to-br from-[hsl(var(--accent))] to-[hsl(var(--accent-deep))]',
          'text-white shadow-[0_10px_40px_-10px_hsl(var(--accent)/0.7)]',
          'transition-shadow hover:shadow-[0_14px_50px_-8px_hsl(var(--accent)/0.85)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--bg))]',
          'sm:bottom-6 sm:right-6 sm:h-16 sm:w-16',
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageSquare className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
        {unread && !open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--neon))] opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[hsl(var(--neon))] ring-2 ring-[hsl(var(--bg))]" />
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
            aria-label="Chat mit Aiko, KI-Sales-Beraterin von RSG AI"
            className={cn(
              'fixed bottom-24 right-3 z-[69] flex w-[calc(100vw-1.5rem)] max-w-[400px] flex-col overflow-hidden',
              'rounded-2xl border border-[hsl(var(--border-strong))] bg-[hsl(var(--surface))]/95 backdrop-blur-xl',
              'shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]',
              'sm:bottom-28 sm:right-6',
            )}
            style={{ height: 'min(620px, calc(100dvh - 8rem))' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-[hsl(var(--border))] bg-[hsl(var(--ink))]/60 px-4 py-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(var(--accent))] to-[hsl(var(--accent-deep))]">
                <Sparkles className="h-5 w-5 text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[hsl(var(--neon))] ring-2 ring-[hsl(var(--surface))]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-[hsl(var(--fg))]">Aiko · KI-Sales</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--muted))]">
                  RSG AI · jetzt online
                </div>
              </div>
              <button
                type="button"
                onClick={reset}
                className="font-mono text-[10px] uppercase tracking-[0.16em] text-[hsl(var(--subtle))] transition-colors hover:text-[hsl(var(--accent-soft))]"
                aria-label="Konversation neu starten"
              >
                Reset
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4 scrollbar-thin"
            >
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} streaming={streaming} />
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
                  placeholder="Frag Aiko etwas zu KI-Agenten…"
                  rows={1}
                  maxLength={2000}
                  disabled={streaming}
                  className={cn(
                    'flex-1 resize-none rounded-xl border border-[hsl(var(--border-strong))] bg-[hsl(var(--bg-deep))]/60',
                    'px-3 py-2 text-sm text-[hsl(var(--fg))] placeholder:text-[hsl(var(--subtle))]',
                    'focus:border-[hsl(var(--accent))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--accent))]',
                    'disabled:opacity-50',
                    'max-h-32',
                  )}
                  style={{ minHeight: '40px' }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || streaming}
                  aria-label="Senden"
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                    'bg-[hsl(var(--accent))] text-white transition-all',
                    'hover:bg-[hsl(var(--accent-deep))] hover:shadow-[0_0_24px_hsl(var(--accent)/0.55)]',
                    'disabled:bg-[hsl(var(--border-strong))] disabled:text-[hsl(var(--subtle))] disabled:shadow-none',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]',
                  )}
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
              <p className="mt-2 px-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[hsl(var(--subtle))]">
                DSGVO · EU-Hosting · keine Werbe-Mails
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({
  message,
  streaming,
}: {
  message: Message;
  streaming: boolean;
}) {
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
            ? 'rounded-br-md bg-[hsl(var(--accent))] text-white shadow-[0_4px_16px_-4px_hsl(var(--accent)/0.5)]'
            : 'rounded-bl-md border border-[hsl(var(--border))] bg-[hsl(var(--surface-2))] text-[hsl(var(--fg))]',
        )}
      >
        {message.content || (!isUser && streaming ? '…' : '')}
      </div>
      {message.tools?.map((tool, i) => (
        <ToolCard key={`${message.id}-tool-${i}`} tool={tool} />
      ))}
    </motion.div>
  );
}

function ToolCard({ tool }: { tool: ToolEvent }) {
  if (tool.kind === 'meeting_suggested') {
    return (
      <motion.a
        href={tool.url}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--accent))]/40 bg-[hsl(var(--accent))]/10',
          'px-3.5 py-2.5 text-sm text-[hsl(var(--accent-soft))] transition-all',
          'hover:border-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/20 hover:shadow-[0_0_24px_hsl(var(--accent)/0.4)]',
        )}
      >
        <Calendar className="h-4 w-4" />
        <span className="font-medium">30-Min-Termin mit Ricardo buchen</span>
      </motion.a>
    );
  }
  if (tool.kind === 'lead_captured') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--neon))]/30 bg-[hsl(var(--neon))]/10 px-3.5 py-2 text-xs text-[hsl(var(--neon-soft))]"
      >
        <CheckCircle2 className="h-4 w-4" />
        <span>Übergeben an Ricardo — Antwort meist in &lt; 2 Std.</span>
      </motion.div>
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
          className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
