'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Mic, PhoneOff, Loader2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { site } from '@/lib/content';
import { useEnglish } from '@/components/system/use-locale';
import { unlockAudio } from '@/lib/audio-unlock';

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
const WIDGET_SRC =
  'https://unpkg.com/@elevenlabs/convai-widget-embed@0.14.0/dist/index.js';
const MAX_MS = 3 * 60 * 1000;
const CYAN: [number, number, number] = [20, 240, 208];
const BTN =
  'mt-4 inline-flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-3.5 font-display text-[0.95rem] font-medium transition-all';

type VisualState = 'idle' | 'connecting' | 'live';

type WidgetEl = HTMLElement & {
  startSession?: () => Promise<void> | void;
  endSession?: () => void;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { 'agent-id'?: string },
        HTMLElement
      >;
    }
  }
}

/**
 * VoiceConsoleWidget — iOS-Fallback mit KITT-Outfit.
 *
 * Setup:
 * - ElevenLabs Convai-Widget wird offscreen gerendert (audio-fähig, UI weg)
 * - Unser KITT-Visualizer + Mic-Button rendern dort, wo's auf Desktop läuft
 * - Click auf Mic ruft im SYNCHRONEN User-Gesture-Handler:
 *     1) unlockAudio()         — Audio-Pipeline entsperren
 *     2) widget.startSession() — Widget übernimmt Audio (iOS-getestet)
 * - State (idle/connecting/live) wird lokal getrackt + per Status-Polling
 *   am Widget-Element verifiziert
 *
 * Damit iOS-Audio funktioniert UND der Look identisch zum Desktop ist.
 */
export function VoiceConsoleWidget() {
  const en = useEnglish();
  const widgetRef = useRef<WidgetEl>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [defined, setDefined] = useState(false);
  const [state, setState] = useState<VisualState>('idle');
  const [err, setErr] = useState(false);

  // Widget-Script idempotent laden + warten bis Custom Element registriert
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const existing = document.querySelector('script[data-convai-widget="1"]');
    if (existing) {
      setScriptLoaded(true);
    } else {
      const s = document.createElement('script');
      s.src = WIDGET_SRC;
      s.async = true;
      s.type = 'module';
      s.dataset.convaiWidget = '1';
      s.onload = () => setScriptLoaded(true);
      s.onerror = () => setScriptLoaded(false);
      document.body.appendChild(s);
    }
    window.customElements
      ?.whenDefined('elevenlabs-convai')
      .then(() => setDefined(true))
      .catch(() => setDefined(false));
  }, []);

  // Auto-End nach 3 Min — Cost-Schutz
  useEffect(() => {
    if (state !== 'live') return;
    const id = window.setTimeout(() => {
      widgetRef.current?.endSession?.();
      setState('idle');
    }, MAX_MS);
    return () => window.clearTimeout(id);
  }, [state]);

  const start = () => {
    // ⚠ SYNCHRON — KEIN await vor diesen beiden Calls, sonst stirbt
    // die User-Activation auf iOS Safari.
    unlockAudio();

    const widget = widgetRef.current;
    if (!widget || !widget.startSession) {
      setErr(true);
      return;
    }

    setErr(false);
    setState('connecting');

    // Promise fire-and-forget — der CALL muss in der Geste passieren,
    // das Resolve darf später kommen.
    Promise.resolve(widget.startSession())
      .then(() => setState('live'))
      .catch(() => {
        setErr(true);
        setState('idle');
      });
  };

  const stop = () => {
    widgetRef.current?.endSession?.();
    setState('idle');
  };

  const live = state === 'live';

  if (!AGENT_ID) {
    return (
      <>
        <Visualizer live={false} state="idle" />
        <StatusLabel state="idle" en={en} />
        <Link
          href={site.cta.meetingUrl}
          className={cn(
            BTN,
            'bg-[hsl(174_100%_45%)] text-[#04130f] hover:bg-[hsl(174_100%_55%)]',
          )}
        >
          <Mic className="h-4 w-4" /> {en ? 'Book intro call' : 'Erstgespräch buchen'}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </>
    );
  }

  return (
    <>
      {/* Widget offscreen — funktional aktiv, visuell unsichtbar.
          Wir nutzen es ausschließlich als iOS-getestete Audio-Engine. */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: -9999,
          top: -9999,
          width: 1,
          height: 1,
          overflow: 'hidden',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        {scriptLoaded && defined && (
          // @ts-expect-error custom element
          <elevenlabs-convai ref={widgetRef} agent-id={AGENT_ID} />
        )}
      </div>

      <Visualizer live={live} state={state} />
      <StatusLabel state={state} en={en} />

      {live ? (
        <button
          type="button"
          onClick={stop}
          className={cn(
            BTN,
            'border border-red-400/40 bg-red-500/15 text-red-100 hover:bg-red-500/25',
          )}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
          </span>
          {en ? 'Live — end call' : 'Live — Gespräch beenden'}
          <PhoneOff className="h-4 w-4" />
        </button>
      ) : state === 'connecting' ? (
        <button
          type="button"
          disabled
          className={cn(BTN, 'bg-[hsl(174_100%_45%)] text-[#04130f] opacity-80')}
        >
          <Loader2 className="h-4 w-4 animate-spin" />{' '}
          {en ? 'Connecting …' : 'Verbinde …'}
        </button>
      ) : (
        <button
          type="button"
          onClick={start}
          disabled={!scriptLoaded || !defined}
          data-event="voice_console_start_ios"
          className={cn(
            BTN,
            'group relative overflow-hidden bg-[hsl(174_100%_45%)] text-[#04130f] shadow-[0_8px_30px_-8px_hsl(174_100%_50%/0.6)] hover:shadow-[0_14px_44px_-8px_hsl(174_100%_50%/0.8)] active:scale-[0.99] disabled:opacity-60',
          )}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full"
          />
          <Mic className="relative h-4 w-4" />
          <span className="relative">
            {!scriptLoaded || !defined
              ? en
                ? 'Loading voice engine …'
                : 'Sprach-Engine lädt …'
              : err
                ? en
                  ? 'Tap to retry'
                  : 'Nochmal versuchen'
                : en
                  ? 'Talk to the AI agent'
                  : 'Sprich mit dem KI-Agenten'}
          </span>
        </button>
      )}

      {err && (
        <p className="mt-3 max-w-sm text-center text-[0.75rem] leading-relaxed text-[hsl(45_90%_68%)]">
          {en
            ? 'Could not start the voice session. Make sure microphone is allowed in Safari settings and try again.'
            : 'Sprach-Sitzung konnte nicht starten. Prüf den Mikrofon-Zugriff in den Safari-Einstellungen und versuch es nochmal.'}
        </p>
      )}
    </>
  );
}

/* ────────────────────────────────────────────────────────────
   KITT-Visualizer mit State-reaktiver Intensität.
   Idle: gedämpftes Scanner-Pulsieren · Connecting: pulse fast
   Live: voller Sweep + Burst-Equalizer + Particle-Ring overlay
   ──────────────────────────────────────────────────────────── */
function Visualizer({ live, state }: { live: boolean; state: VisualState }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const liveRef = useRef(live);
  const stateRef = useRef(state);
  useEffect(() => {
    liveRef.current = live;
    stateRef.current = state;
  }, [live, state]);

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
    const rgb = (a: number) =>
      `rgba(${CYAN[0]},${CYAN[1]},${CYAN[2]},${a.toFixed(3)})`;
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
      const isConnecting = stateRef.current === 'connecting';

      let target: number;
      if (reduce) target = isLive ? 0.42 : 0.12;
      else if (isLive) {
        talk += 0.06;
        const burst =
          Math.max(0, Math.sin(talk * 1.3)) *
          Math.max(0, Math.sin(talk * 0.5 + 1));
        target = 0.4 + 0.7 * burst + Math.random() * 0.06;
      } else if (isConnecting) {
        target = 0.28 + 0.18 * Math.sin(t * 4);
      } else {
        target = 0.16 + 0.08 * Math.sin(t * 1.5);
      }
      amp += (target - amp) * (reduce ? 1 : 0.22);

      const scanH = 6;
      const eqTop = scanH + 14;
      const eqH = Math.max(10, H - eqTop);

      // Scanner-Bar oben
      const sw = (W - (SEG - 1) * 4) / SEG;
      const speed = reduce ? 0 : isLive ? 1.7 : isConnecting ? 2.2 : 0.85;
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

      // Equalizer
      const bars = 32;
      const bw = (W - (bars - 1) * 3) / bars;
      for (let i = 0; i < bars; i++) {
        const dd = Math.abs(i - (bars - 1) / 2) / ((bars - 1) / 2);
        const shape = Math.pow(1 - dd, 1.2);
        const n =
          0.5 + 0.5 * Math.sin(t * 6 + i * 0.55) * (isLive ? 1 : 0.5);
        const h = Math.min(
          eqH,
          Math.max(2, 4 + amp * eqH * 1.0 * shape * (0.5 + 0.7 * n)),
        );
        const y = eqTop + eqH / 2 - h / 2;
        ctx.fillStyle = rgb(
          Math.min(1, 0.28 + amp * 0.7 * shape + 0.1 * n),
        );
        rr(i * (bw + 3), y, bw, h, Math.min(bw / 2, 3));
        ctx.fill();
      }
      ctx.fillStyle = rgb(0.14);
      ctx.fillRect(0, eqTop + eqH / 2 - 0.5, W, 1);

      // Live-Glow-Streifen (nur live, additiv)
      if (isLive && !reduce) {
        const glowY = eqTop + eqH / 2;
        const grad = ctx.createLinearGradient(0, 0, W, 0);
        grad.addColorStop(0, 'rgba(20,240,208,0)');
        grad.addColorStop(0.5, `rgba(20,240,208,${0.18 + 0.12 * amp})`);
        grad.addColorStop(1, 'rgba(20,240,208,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, glowY - 1, W, 2);
      }

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

function StatusLabel({
  state,
  en,
}: {
  state: VisualState;
  en: boolean;
}) {
  const map: Record<VisualState, string> = en
    ? {
        idle: 'ready',
        connecting: 'connecting …',
        live: 'live · listening',
      }
    : {
        idle: 'bereit',
        connecting: 'verbinde …',
        live: 'live · hört zu',
      };
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
        <span
          className={cn(
            'h-1 w-1 rounded-full',
            live
              ? 'animate-pulse bg-[hsl(174_100%_60%)]'
              : 'bg-[hsl(174_100%_55%)]',
          )}
        />
        {map[state]}
      </span>
      <span aria-hidden className="h-px w-6 bg-white/15" />
    </div>
  );
}
