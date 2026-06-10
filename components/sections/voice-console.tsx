'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useConversation, ConversationProvider } from '@elevenlabs/react';
import { Mic, PhoneOff, Loader2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { site } from '@/lib/content';
import { useEnglish } from '@/components/system/use-locale';
import { isIOS } from '@/lib/device';
import { unlockAudio } from '@/lib/audio-unlock';
import { VoiceConsoleWidget } from './voice-console-widget';

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
  const live = state === 'live';
  return (
    <div className="mt-3 flex items-center justify-center gap-3 font-mono text-[0.625rem] uppercase tracking-[0.24em] text-[hsl(var(--subtle))]">
      <span aria-hidden className="h-px w-6 bg-white/15" />
      <span>Status</span>
      <span
        className={cn(
          'inline-flex items-center gap-1.5 tabular-nums',
          live ? 'text-[hsl(174_100%_75%)]' : 'text-[hsl(174_100%_70%)]',
        )}
      >
        <span className={cn('h-1 w-1 rounded-full', live ? 'animate-pulse bg-[hsl(174_100%_60%)]' : 'bg-[hsl(174_100%_55%)]')} />
        {map[state]}
      </span>
      <span aria-hidden className="h-px w-6 bg-white/15" />
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
    // SYNCHRON in der User-Geste, vor JEDEM await — sonst verliert iOS
    // Safari/iPadOS die User-Activation und Audio bleibt stumm.
    unlockAudio();

    setErr(false);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setErr(true);
      return;
    }
    try {
      // iOS/iPadOS: WebSocket-Pfad hat das ElevenLabs-Audio-Priming
      // (Client v1.8.1+). WebRTC delegiert an LiveKit, das auf iOS Safari
      // ohne playsInline-Workaround stumm bleibt — siehe lib/device.ts.
      await conversation.startSession({
        agentId: AGENT_ID as string,
        connectionType: isIOS() ? 'websocket' : 'webrtc',
      });
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
            'group relative overflow-hidden bg-[hsl(174_100%_45%)] text-[#04130f] shadow-[0_8px_30px_-8px_hsl(174_100%_50%/0.6)] hover:shadow-[0_14px_44px_-8px_hsl(174_100%_50%/0.8)] active:scale-[0.99]',
          )}
        >
          {/* Hover scan sweep */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full"
          />
          {/* Corner ticks */}
          <span aria-hidden className="pointer-events-none absolute left-2 top-1.5 h-1.5 w-1.5 border-l border-t border-[#04130f]/40 transition-opacity group-hover:opacity-0" />
          <span aria-hidden className="pointer-events-none absolute bottom-1.5 right-2 h-1.5 w-1.5 border-b border-r border-[#04130f]/40 transition-opacity group-hover:opacity-0" />
          <Mic className="relative h-4 w-4" />
          <span className="relative">
            {err ? (en ? 'Allow mic & retry' : 'Mikrofon erlauben & nochmal') : (en ? 'Talk to the AI agent' : 'Sprich mit dem KI-Agenten')}
          </span>
        </button>
      )}
      {err && (
        <p className="mt-3 max-w-sm text-center text-[0.75rem] leading-relaxed text-[hsl(45_90%_68%)]">
          {en
            ? 'Please allow microphone access when your browser asks — then the agent speaks instantly. Blocked it by accident? Click the lock / camera icon in the address bar → Microphone → Allow → reload the page.'
            : 'Bitte erlaube den Mikrofon-Zugriff, wenn dein Browser fragt — dann spricht die Agenten sofort. Versehentlich blockiert? Oben in der Adresszeile auf das Schloss-/Kamera-Symbol → Mikrofon → „Zulassen" → Seite neu laden.'}
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
  const [useWidget, setUseWidget] = useState(false);
  useEffect(() => {
    setMounted(true);
    // Auf iOS/iPadOS: offizielles ElevenLabs-Widget statt React-SDK
    // verwenden — der React-SDK rejected stumm im internen iOS-Priming.
    setUseWidget(isIOS());
  }, []);
  const en = useEnglish();
  const heading =
    title === undefined
      ? en
        ? 'Talk to the AI agent now — live in your browser.'
        : 'Sprich jetzt mit dem KI-Agenten — live im Browser.'
      : title;

  return (
    <div className="relative">
      {/* Outer ambient glow halo behind the card */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-3 rounded-[28px] opacity-50 blur-2xl"
        style={{
          background:
            'radial-gradient(ellipse at 60% 30%, hsl(174 100% 50% / 0.35), transparent 70%)',
        }}
      />

      <div className="relative overflow-hidden rounded-2xl border border-[hsl(174_100%_50%/0.3)] bg-[hsl(var(--surface))]/85 p-6 shadow-[0_0_80px_-16px_hsl(174_100%_50%/0.55)] backdrop-blur-md">
        {/* Corner brackets — technical viewfinder feel */}
        <CornerBrackets />

        {/* Hairline grid texture (very subtle) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          }}
        />

        {/* ── Eyebrow rail — scanning indicator + live badge + datacenter tag ── */}
        <div className="relative mb-5 flex items-center gap-3">
          <span aria-hidden className="relative inline-flex h-px w-8 overflow-hidden bg-[hsl(174_100%_50%/0.25)]">
            <span className="hero-scan-line absolute inset-y-0 h-px w-3 bg-[hsl(174_100%_70%)]" />
          </span>
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(174_100%_50%)] opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(174_100%_50%)]" />
          </span>
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(174_100%_75%)]">
            {en ? 'Live · in your browser' : 'Live · im Browser'}
          </span>
          <span aria-hidden className="ml-auto h-px w-6 bg-white/15" />
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-white/40">
            EU-FRA · WS
          </span>
        </div>

        {heading ? (
          <p className="relative mb-5 font-display text-[clamp(1.125rem,1.6vw,1.35rem)] font-medium leading-[1.2] tracking-[-0.018em] text-[hsl(var(--fg))]">
            {heading}
          </p>
        ) : null}

        {/* Inner KITT canvas frame */}
        <div className="relative rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--bg))]/55 p-3">
          {/* Inner corner ticks */}
          <span aria-hidden className="absolute left-1 top-1 h-1.5 w-1.5 border-l border-t border-[hsl(174_100%_50%/0.45)]" />
          <span aria-hidden className="absolute right-1 top-1 h-1.5 w-1.5 border-r border-t border-[hsl(174_100%_50%/0.45)]" />
          <span aria-hidden className="absolute left-1 bottom-1 h-1.5 w-1.5 border-l border-b border-[hsl(174_100%_50%/0.45)]" />
          <span aria-hidden className="absolute right-1 bottom-1 h-1.5 w-1.5 border-r border-b border-[hsl(174_100%_50%/0.45)]" />

          {/* Measurement ticks above visualizer */}
          <div aria-hidden className="mb-2 flex items-center justify-between font-mono text-[0.55rem] uppercase tracking-[0.18em] text-white/30">
            <span>CH-01</span>
            <span className="flex items-center gap-2">
              <span className="h-px w-3 bg-white/15" />
              SCAN
              <span className="h-px w-3 bg-white/15" />
            </span>
            <span>22.05K</span>
          </div>

          {AGENT_ID && mounted ? (
            useWidget ? (
              <VoiceConsoleWidget />
            ) : (
              <ConversationProvider>
                <ConsoleControls />
              </ConversationProvider>
            )
          ) : (
            <ConsoleFallback pending={!!AGENT_ID} />
          )}
        </div>

        <p className="relative mt-3 text-center font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[hsl(var(--subtle))]">
          {en ? 'Free · max 3 min · mic required · GDPR · EU' : 'Kostenlos · max. 3 Min · Mikrofon · DSGVO · EU'}
        </p>

        {/* KPI strip — hairline-divided columns with scanning marks */}
        <div className="relative mt-5 grid grid-cols-3 divide-x divide-[hsl(var(--border))] border-t border-[hsl(var(--border))] pt-4">
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
          ).map(([big, label], i) => (
            <div key={label} className={cn('group relative px-3', i === 0 && 'pl-0', i === 2 && 'pr-0')}>
              {/* tiny corner tick at top-left of each cell */}
              <span aria-hidden className="absolute left-2 top-0 h-1 w-1 border-l border-t border-[hsl(174_100%_50%/0.4)]" />
              <div className="font-display text-[1.2rem] font-medium leading-none tabular-nums tracking-tight text-[hsl(var(--fg))]">
                {big}
              </div>
              <div className="mt-1.5 flex items-center gap-1.5 font-mono text-[0.575rem] uppercase tracking-[0.16em] text-[hsl(var(--muted))]">
                <span aria-hidden className="h-px w-2 bg-white/20 transition-all duration-300 group-hover:w-3 group-hover:bg-[hsl(174_100%_60%)]" />
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Technical corner brackets — Lusion-style viewfinder frame.
 * Sits inside a relative-positioned parent.
 */
function CornerBrackets() {
  const c = 'absolute h-3 w-3 border-[hsl(174_100%_55%/0.6)]';
  return (
    <>
      <span aria-hidden className={cn(c, 'left-2 top-2 border-l border-t')} />
      <span aria-hidden className={cn(c, 'right-2 top-2 border-r border-t')} />
      <span aria-hidden className={cn(c, 'left-2 bottom-2 border-l border-b')} />
      <span aria-hidden className={cn(c, 'right-2 bottom-2 border-r border-b')} />
    </>
  );
}
