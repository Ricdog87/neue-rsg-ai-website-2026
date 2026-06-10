'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useConversation } from '@elevenlabs/react';
import { Mic, PhoneOff, Loader2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { site } from '@/lib/content';
import { useEnglish } from '@/components/system/use-locale';

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
const MAX_MS = 3 * 60 * 1000;
const CYAN: [number, number, number] = [20, 240, 208];
const BTN =
  'mt-4 inline-flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-3.5 font-display text-[0.95rem] font-medium transition-all';

type VisualState = 'idle' | 'connecting' | 'live' | 'off';

/**
 * KITT-style voice visualizer — a Knight-Rider scanner sweep plus a live
 * equalizer, drawn in one canvas, cyan + on-brand. Driven by `live` (the
 * ElevenLabs conversation status). Honors prefers-reduced-motion.
 * Cosmetic for now: reacts to connection state, not raw audio yet.
 */
function Visualizer({ live }: { live: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const liveRef = useRef(live);
  useEffect(() => {
    liveRef.current = live;
  }, [live]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let raf = 0;
    let t = 0;
    let amp = 0;
    let talk = 0;
    let scan = 0;
    let dir = 1;

    const fit = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    window.addEventListener('resize', fit);

    const rr = (x: number, y: number, w: number, h: number, r: number) => {
      const rad = Math.min(r, w / 2, h / 2);
      ctx.beginPath();
      ctx.moveTo(x + rad, y);
      ctx.arcTo(x + w, y, x + w, y + h, rad);
      ctx.arcTo(x + w, y + h, x, y + h, rad);
      ctx.arcTo(x, y + h, x, y, rad);
      ctx.arcTo(x, y, x + w, y, rad);
      ctx.closePath();
    };
    const rgb = (a: number) => `rgba(${CYAN[0]},${CYAN[1]},${CYAN[2]},${a.toFixed(3)})`;
    const SEG = 22;

    const frame = () => {
      t += 0.016;
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      if (!W) {
        raf = requestAnimationFrame(frame);
        return;
      }
      ctx.clearRect(0, 0, W, H);
      const isLive = liveRef.current;

      let target: number;
      if (reduce) target = isLive ? 0.42 : 0.12;
      else if (isLive) {
        talk += 0.06;
        const burst = Math.max(0, Math.sin(talk * 1.3)) * Math.max(0, Math.sin(talk * 0.5 + 1));
        target = 0.4 + 0.7 * burst + Math.random() * 0.06;
      } else {
        target = 0.16 + 0.08 * Math.sin(t * 1.5);
      }
      amp += (target - amp) * (reduce ? 1 : 0.22);

      const scanH = 6;
      const eqTop = scanH + 14;
      const eqH = Math.max(10, H - eqTop);

      const sw = (W - (SEG - 1) * 4) / SEG;
      const speed = reduce ? 0 : isLive ? 1.7 : 0.85;
      scan += dir * speed;
      if (scan >= SEG - 1) {
        scan = SEG - 1;
        dir = -1;
      }
      if (scan <= 0) {
        scan = 0;
        dir = 1;
      }
      for (let s = 0; s < SEG; s++) {
        const d = Math.abs(s - scan);
        const g = Math.max(0, 1 - d / 4);
        const lvl = g * (0.5 + 0.5 * amp);
        ctx.fillStyle = rgb(0.12 + 0.88 * lvl);
        rr(s * (sw + 4), 0, sw, scanH, 2);
        ctx.fill();
      }

      const bars = 32;
      const bw = (W - (bars - 1) * 3) / bars;
      for (let i = 0; i < bars; i++) {
        const dd = Math.abs(i - (bars - 1) / 2) / ((bars - 1) / 2);
        const shape = Math.pow(1 - dd, 1.2);
        const n = 0.5 + 0.5 * Math.sin(t * 6 + i * 0.55) * (isLive ? 1 : 0.5);
        const h = Math.min(eqH, Math.max(2, 4 + amp * eqH * 1.0 * shape * (0.5 + 0.7 * n)));
        const y = eqTop + eqH / 2 - h / 2;
        ctx.fillStyle = rgb(Math.min(1, 0.28 + amp * 0.7 * shape + 0.1 * n));
        rr(i * (bw + 3), y, bw, h, Math.min(bw / 2, 3));
        ctx.fill();
      }
      ctx.fillStyle = rgb(0.14);
      ctx.fillRect(0, eqTop + eqH / 2 - 0.5, W, 1);

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', fit);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="block h-[150px] w-full" />;
}

function StatusLabel({ state, en }: { state: VisualState; en: boolean }) {
  const map: Record<VisualState, string> = en
    ? { idle: 'ready', connecting: 'connecting …', live: 'live · listening', off: 'available shortly' }
    : { idle: 'bereit', connecting: 'verbinde …', live: 'live · hört zu', off: 'gleich erreichbar' };
  return (
    <div className="mt-3 flex items-center justify-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.24em] text-[hsl(var(--subtle))]">
      Status:&nbsp;<span className="text-[hsl(174_100%_70%)]">{map[state]}</span>
    </div>
  );
}

function ConsoleControls() {
  const conversation = useConversation();
  const status = conversation.status;
  const [err, setErr] = useState(false);
  const live = status === 'connected';
  const en = useEnglish();

  useEffect(() => {
    if (status !== 'connected') return;
    const id = window.setTimeout(() => conversation.endSession(), MAX_MS);
    return () => window.clearTimeout(id);
  }, [status, conversation]);

  const start = async () => {
    setErr(false);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setErr(true);
      return;
    }
    try {
      await conversation.startSession({ agentId: AGENT_ID as string, connectionType: 'webrtc' });
    } catch {
      setErr(true);
    }
  };

  const state: VisualState = status === 'connecting' ? 'connecting' : live ? 'live' : 'idle';

  return (
    <>
      <Visualizer live={live} />
      <StatusLabel state={state} en={en} />
      {live ? (
        <button
          type="button"
          onClick={() => conversation.endSession()}
          className={cn(BTN, 'border border-red-400/40 bg-red-500/15 text-red-100 hover:bg-red-500/25')}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
          </span>
          {en ? 'Live — end call' : 'Live — Gespräch beenden'}
          <PhoneOff className="h-4 w-4" />
        </button>
      ) : status === 'connecting' ? (
        <button type="button" disabled className={cn(BTN, 'bg-[hsl(174_100%_45%)] text-[#04130f] opacity-80')}>
          <Loader2 className="h-4 w-4 animate-spin" /> {en ? 'Connecting …' : 'Verbinde …'}
        </button>
      ) : (
        <button
          type="button"
          onClick={start}
          data-event="voice_console_start"
          className={cn(
            BTN,
            'bg-[hsl(174_100%_45%)] text-[#04130f] hover:bg-[hsl(174_100%_55%)] hover:shadow-[0_0_40px_hsl(174_100%_50%/0.5)] active:scale-[0.99]',
          )}
        >
          <Mic className="h-4 w-4" />
          {err ? (en ? 'Allow mic & retry' : 'Mikrofon erlauben & nochmal') : (en ? 'Talk to the AI agent' : 'Sprich mit der KI-Agentin')}
        </button>
      )}
      {err && (
        <p className="mt-3 max-w-sm text-center text-[0.75rem] leading-relaxed text-[hsl(45_90%_68%)]">
          {en
            ? 'Please allow microphone access when your browser asks — then the agent speaks instantly. Blocked it by accident? Click the lock / camera icon in the address bar → Microphone → Allow → reload the page.'
            : 'Bitte erlaube den Mikrofon-Zugriff, wenn dein Browser fragt — dann spricht die Agentin sofort. Versehentlich blockiert? Oben in der Adresszeile auf das Schloss-/Kamera-Symbol → Mikrofon → „Zulassen" → Seite neu laden.'}
        </p>
      )}
    </>
  );
}

function ConsoleFallback({ pending }: { pending: boolean }) {
  const en = useEnglish();
  return (
    <>
      <Visualizer live={false} />
      <StatusLabel state={pending ? 'idle' : 'off'} en={en} />
      <Link
        href={site.cta.meetingUrl}
        data-event="voice_console_fallback"
        className={cn(BTN, 'bg-[hsl(174_100%_45%)] text-[#04130f] hover:bg-[hsl(174_100%_55%)]')}
      >
        <Mic className="h-4 w-4" /> {en ? 'Book intro call' : 'Erstgespräch buchen'}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </>
  );
}

/**
 * VoiceConsole — the hero centerpiece for /ki-telefonassistent: a live,
 * KITT-style voice agent. Reuses the ElevenLabs wiring; degrades to a
 * booking CTA when NEXT_PUBLIC_ELEVENLABS_AGENT_ID is absent (e.g. CI).
 */
export function VoiceConsole({ title }: { title?: string | null }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const en = useEnglish();
  const heading =
    title === undefined
      ? en
        ? 'Talk to the AI agent now — live in your browser.'
        : 'Sprich jetzt mit der KI-Agentin — live im Browser.'
      : title;

  return (
    <div className="rounded-2xl border border-[hsl(174_100%_50%/0.25)] bg-[hsl(var(--surface))]/80 p-6 shadow-[0_0_72px_-16px_hsl(174_100%_50%/0.55)] backdrop-blur-sm">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(174_100%_50%/0.4)] bg-[hsl(174_100%_50%/0.08)] px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(174_100%_70%)]">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(174_100%_50%)] opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(174_100%_50%)]" />
        </span>
        {en ? 'Live · in your browser · no waiting' : 'Live · im Browser · keine Wartezeit'}
      </div>
      {heading ? (
        <p className="mb-4 font-display text-[1.125rem] font-medium leading-tight text-[hsl(var(--fg))]">
          {heading}
        </p>
      ) : null}
      <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--bg))]/50 p-3">
        {AGENT_ID && mounted ? (
          <ConsoleControls />
        ) : (
          <ConsoleFallback pending={!!AGENT_ID} />
        )}
      </div>
      <p className="mt-3 text-center text-[0.7rem] text-[hsl(var(--subtle))]">
        {en ? 'Free · max 3 min · mic required · GDPR · EU' : 'Kostenlos · max. 3 Min · Mikrofon erforderlich · DSGVO · EU'}
      </p>
      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-[hsl(var(--border))] pt-4">
        {(en
          ? [
              ['200+', 'Voice agents · live'],
              ['9,000', 'Calls/mo · peak'],
              ['24/7', 'Pickup · shift-free'],
            ]
          : [
              ['200+', 'Voice-Agenten · live'],
              ['9.000', 'Calls/Mo · Spitze'],
              ['24/7', 'Annahme · Schicht-frei'],
            ]
        ).map(([big, label]) => (
          <div key={label}>
            <div className="font-display text-[1.15rem] font-medium leading-none tabular-nums text-[hsl(var(--fg))]">
              {big}
            </div>
            <div className="mt-1 font-mono text-[0.575rem] uppercase tracking-[0.16em] text-[hsl(var(--muted))]">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
