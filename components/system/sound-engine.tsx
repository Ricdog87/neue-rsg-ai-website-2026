'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * RSG sound design — sub-audible micro-feedback.
 *
 * Web Audio API only — no asset loading, no autoplay battles. Synthesises:
 *   · tick()      — sine pluck on CTA hover/click (~-32 dB)
 *   · swell()     — slow filtered noise sweep on hero entry (~-26 dB)
 *   · ambient()   — looping LFO-modulated low pad (~-38 dB, very subtle)
 *
 * Default: OFF. User opts in via the toggle in the navbar.
 * Preference stored in localStorage ('rsg-sound').
 *
 * Public API exposed through context — components call useSound().
 */

type SoundCtx = {
  enabled: boolean;
  toggle: () => void;
  tick: () => void;
  swell: () => void;
};

const Ctx = createContext<SoundCtx | null>(null);

const STORE_KEY = 'rsg-sound';

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const ambientRef = useRef<{ stop: () => void } | null>(null);

  // Restore preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(STORE_KEY) === '1') setEnabled(true);
  }, []);

  // Build / tear down AudioContext when toggled
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (enabled && !ctxRef.current) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      const master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);
      // Fade master in
      master.gain.setTargetAtTime(0.85, ctx.currentTime, 0.4);
      ctxRef.current = ctx;
      masterRef.current = master;

      // Start ambient pad
      ambientRef.current = startAmbient(ctx, master);
    } else if (!enabled && ctxRef.current) {
      const ctx = ctxRef.current;
      const master = masterRef.current!;
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
      const stop = ambientRef.current?.stop;
      setTimeout(() => {
        stop?.();
        ctx.close();
        ctxRef.current = null;
        masterRef.current = null;
        ambientRef.current = null;
      }, 700);
    }

    return () => {
      // Cleanup on unmount
      if (ctxRef.current) {
        ambientRef.current?.stop();
        ctxRef.current.close();
        ctxRef.current = null;
        masterRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  const toggle = useCallback(() => {
    setEnabled((v) => {
      const next = !v;
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORE_KEY, next ? '1' : '0');
      }
      return next;
    });
  }, []);

  const tick = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    playTick(ctx, master);
  }, []);

  const swell = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    playSwell(ctx, master);
  }, []);

  // Wire global tick to all interactive elements with [data-sound="tick"]
  useEffect(() => {
    if (!enabled) return;
    const handler = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest('[data-sound="tick"], a, button, [role="button"]')) {
        tick();
      }
    };
    document.addEventListener('pointerdown', handler, { passive: true });
    return () => document.removeEventListener('pointerdown', handler);
  }, [enabled, tick]);

  return (
    <Ctx.Provider value={{ enabled, toggle, tick, swell }}>{children}</Ctx.Provider>
  );
}

export function useSound() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useSound must be used inside <SoundProvider>');
  return c;
}

/* ── Toggle button ────────────────────────────────────────── */
export function SoundToggle({ className = '' }: { className?: string }) {
  const { enabled, toggle } = useSound();
  return (
    <button
      type="button"
      aria-label={enabled ? 'Sound ausschalten' : 'Sound einschalten'}
      aria-pressed={enabled}
      onClick={toggle}
      className={
        'group relative grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-white/[0.03] transition-all hover:border-white/30 hover:bg-white/[0.06] ' +
        className
      }
    >
      {/* Bars — 3 animated rectangles */}
      <span className="flex items-end gap-[3px]">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            aria-hidden
            className="block w-[2px] rounded-full bg-white/85"
            initial={false}
            animate={
              enabled
                ? { height: [5, 11, 7][i], opacity: 1 }
                : { height: 3, opacity: 0.5 }
            }
            transition={
              enabled
                ? {
                    height: {
                      repeat: Infinity,
                      repeatType: 'reverse',
                      duration: 0.6 + i * 0.15,
                      ease: 'easeInOut',
                    },
                  }
                : { duration: 0.25 }
            }
          />
        ))}
      </span>

      {/* Off slash */}
      <AnimatePresence>
        {!enabled && (
          <motion.span
            aria-hidden
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 rotate-[-32deg] origin-center bg-white/85"
          />
        )}
      </AnimatePresence>
    </button>
  );
}

/* ── Synthesis primitives ─────────────────────────────────── */

function playTick(ctx: AudioContext, master: GainNode) {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(2200, now);
  osc.frequency.exponentialRampToValueAtTime(1100, now + 0.04);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.06, now + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

  osc.connect(gain);
  gain.connect(master);
  osc.start(now);
  osc.stop(now + 0.1);
}

function playSwell(ctx: AudioContext, master: GainNode) {
  const now = ctx.currentTime;
  const dur = 2.2;

  const noise = ctx.createBufferSource();
  const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
  noise.buffer = buf;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(120, now);
  filter.frequency.exponentialRampToValueAtTime(1600, now + 1.4);
  filter.Q.value = 4;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.12, now + 0.6);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(master);
  noise.start(now);
  noise.stop(now + dur);
}

function startAmbient(ctx: AudioContext, master: GainNode): { stop: () => void } {
  const now = ctx.currentTime;

  // Two detuned sine oscillators (~55 Hz / 82.5 Hz — A1 / E2-ish)
  const o1 = ctx.createOscillator();
  const o2 = ctx.createOscillator();
  o1.type = 'sine';
  o2.type = 'sine';
  o1.frequency.value = 55;
  o2.frequency.value = 82.5;

  // Slow LFO on filter cutoff for breathing
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 380;
  filter.Q.value = 1;

  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.value = 0.08;
  lfoGain.gain.value = 80;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.045, now + 2.5);

  o1.connect(filter);
  o2.connect(filter);
  filter.connect(gain);
  gain.connect(master);

  o1.start(now);
  o2.start(now);
  lfo.start(now);

  return {
    stop() {
      const t = ctx.currentTime;
      gain.gain.setTargetAtTime(0, t, 0.5);
      setTimeout(() => {
        try {
          o1.stop();
          o2.stop();
          lfo.stop();
        } catch {
          /* already stopped */
        }
      }, 1500);
    },
  };
}
