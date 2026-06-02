'use client';

import { useEffect, useState } from 'react';
import {
  ConversationProvider,
  useConversationControls,
  useConversationStatus,
} from '@elevenlabs/react';
import { Mic, PhoneOff, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * In-Browser-Sprachagent (ElevenLabs / ElevenAgents React-SDK).
 * Inline-Button startet das Gespraech direkt auf der Seite (WebRTC, kein schwebendes Widget).
 * Sicher ohne NEXT_PUBLIC_ELEVENLABS_AGENT_ID -> rendert nichts.
 * Kosten-Schutz: Session endet automatisch nach MAX_MIN Minuten.
 */

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
const MAX_MS = 3 * 60 * 1000;
const BASE =
  'group inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 text-[15px] font-semibold transition-all';

function ButtonInner({ className }: { className?: string }) {
  const { startSession, endSession } = useConversationControls();
  const { status } = useConversationStatus();
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (status !== 'connected') return;
    const t = setTimeout(() => {
      endSession();
    }, MAX_MS);
    return () => clearTimeout(t);
  }, [status, endSession]);

  async function start() {
    setErr(false);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setErr(true);
      return;
    }
    try {
      await startSession({ agentId: AGENT_ID as string });
    } catch {
      setErr(true);
    }
  }

  if (status === 'connecting') {
    return (
      <button type="button" disabled className={cn(BASE, 'bg-[hsl(var(--accent))] text-white opacity-80', className)}>
        <Loader2 className="h-4 w-4 animate-spin" /> Verbinde …
      </button>
    );
  }

  if (status === 'connected') {
    return (
      <button
        type="button"
        onClick={() => endSession()}
        className={cn(BASE, 'border border-red-400/40 bg-red-500/15 text-red-100 hover:bg-red-500/25', className)}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
        </span>
        Live — Gespräch beenden
        <PhoneOff className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={start}
      className={cn(
        BASE,
        'bg-[hsl(var(--accent))] text-white shadow-[0_8px_30px_-8px_hsl(var(--accent)/0.6)] hover:brightness-110 active:scale-[0.99]',
        className,
      )}
    >
      <Mic className="h-4 w-4" />
      {err ? 'Mikrofon erlauben & nochmal klicken' : 'Jetzt live sprechen'}
    </button>
  );
}

function StaticButton({ className }: { className?: string }) {
  return (
    <button type="button" disabled className={cn(BASE, 'bg-[hsl(var(--accent))] text-white opacity-90', className)}>
      <Mic className="h-4 w-4" /> Jetzt live sprechen
    </button>
  );
}

export function LiveVoiceButton({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!AGENT_ID) return null;
  if (!mounted) return <StaticButton className={className} />;
  return (
    <ConversationProvider>
      <ButtonInner className={className} />
    </ConversationProvider>
  );
}

export function LiveVoiceAgent() {
  if (!AGENT_ID) return null;
  return (
    <div className="mx-auto mb-12 max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-xl">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
        <Sparkles className="h-3 w-3 text-[hsl(var(--accent))]" /> Live-Sprachagent · im Browser
      </div>
      <h3 className="font-display text-[clamp(1.25rem,2vw,1.5rem)] font-medium text-white">
        Sprich jetzt direkt mit dem Agenten.
      </h3>
      <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-white/60">
        Kein Anruf, kein Formular — klick, erlaube dein Mikrofon und unterhalte dich live.
        Echte Stimme, in Echtzeit.
      </p>
      <div className="mx-auto mt-5 max-w-xs">
        <LiveVoiceButton />
      </div>
      <p className="mx-auto mt-4 max-w-md text-[11px] leading-relaxed text-white/35">
        Kostenlos · max. 3 Min · Mikrofon erforderlich. Sprachverarbeitung via ElevenLabs.
      </p>
    </div>
  );
}
