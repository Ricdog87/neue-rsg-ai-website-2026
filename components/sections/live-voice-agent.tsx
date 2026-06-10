'use client';

import { useEffect, useState } from 'react';
import {
  ConversationProvider,
  useConversationControls,
  useConversationStatus,
} from '@elevenlabs/react';
import { Mic, PhoneOff, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { isIOS } from '@/lib/device';

/**
 * In-Browser-Sprachagent (ElevenLabs React-SDK).
 * Inline-Button startet das Gespraech direkt auf der Seite (WebRTC).
 * Sicher ohne NEXT_PUBLIC_ELEVENLABS_AGENT_ID -> rendert nichts.
 * Kosten-Schutz: Session endet automatisch nach 3 Minuten.
 */

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
const MAX_MS = 3 * 60 * 1000;
const BASE =
  'group inline-flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-3 text-sm font-medium transition-all';

function ButtonInner({ className, label }: { className?: string; label: string }) {
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
      // iOS/iPadOS: WebSocket-Pfad (Audio-Priming seit SDK v1.8.1).
      // Desktop/Android: WebRTC für minimale Latenz.
      await startSession({
        agentId: AGENT_ID as string,
        connectionType: isIOS() ? 'websocket' : 'webrtc',
      });
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
        'bg-[hsl(var(--accent))] text-white hover:bg-[hsl(var(--accent-deep))] hover:shadow-[0_0_40px_hsl(var(--accent)/0.6)] active:scale-[0.99]',
        className,
      )}
    >
      <Mic className="h-4 w-4" />
      {err ? 'Mikrofon erlauben & nochmal klicken' : label}
    </button>
  );
}

function StaticButton({ className, label }: { className?: string; label: string }) {
  return (
    <button type="button" disabled className={cn(BASE, 'bg-[hsl(var(--accent))] text-white opacity-90', className)}>
      <Mic className="h-4 w-4" /> {label}
    </button>
  );
}

export function LiveVoiceButton({
  className,
  label = 'Jetzt live sprechen',
}: {
  className?: string;
  label?: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!AGENT_ID) return null;
  if (!mounted) return <StaticButton className={className} label={label} />;
  return (
    <ConversationProvider>
      <ButtonInner className={className} label={label} />
    </ConversationProvider>
  );
}

export function LiveVoiceAgent() {
  if (!AGENT_ID) return null;
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[680px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--accent)/0.18),transparent_70%)] blur-3xl" />
      <div className="mx-auto max-w-5xl px-6 py-24 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--neon))] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon))]" />
          </span>
          Live · im Browser · keine Wartezeit
        </div>
        <h2 className="mx-auto max-w-3xl font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-white">
          Sprich mit einem unserer KI-Agenten.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-[clamp(1rem,1.7vw,1.25rem)] leading-relaxed text-white/65">
          Lies nicht über KI-Telefonie — erlebe sie. Ein Klick, deine Stimme, Antwort in
          unter 0,4 Sekunden. Sprich wie mit einem echten Mitarbeiter — und entscheide selbst,
          ob du den Unterschied zu einem Menschen noch hörst.
        </p>
        <div className="mx-auto mt-9 max-w-sm">
          <LiveVoiceButton label="Sprich mit einem unserer KI-Agenten" className="px-8 py-4 text-base" />
        </div>
        <p className="mx-auto mt-4 text-[12px] text-white/40">
          Kostenlos · max. 3 Min · Mikrofon erforderlich · DSGVO · EU
        </p>
      </div>
    </section>
  );
}
