'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ENTRY_KEY = 'rsg-entry-shown';

/**
 * Premium entry sequence — Cuberto / Active Theory pattern.
 *
 *   ┌─────────────────────────────┐
 *   │                             │
 *   │       RSG.                  │   ← Manrope wordmark, stroke-draws
 *   │                             │
 *   │              ░░░  73        │   ← mono counter 0→100
 *   │                             │
 *   └─────────────────────────────┘
 *           ↓ curtain wipes up
 *
 * - Only fires once per browser session (sessionStorage flag).
 * - Total duration: ~1.6s.
 * - Easing: [0.83, 0, 0.17, 1] (in-out-quart) on the curtain wipe.
 * - Respects prefers-reduced-motion.
 */
export function EntryLoader() {
  const [show, setShow] = useState<boolean | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShow(false);
      return;
    }
    if (sessionStorage.getItem(ENTRY_KEY)) {
      setShow(false);
      return;
    }

    setShow(true);
    // Lock body scroll while the loader is up
    document.body.style.overflow = 'hidden';

    const start = performance.now();
    const dur = 1200;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 2.6);
      setCount(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const hide = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(ENTRY_KEY, '1');
      document.body.style.overflow = '';
    }, 1700);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hide);
      document.body.style.overflow = '';
    };
  }, []);

  if (show === null) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          initial={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.95, ease: [0.83, 0, 0.17, 1], delay: 0.1 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-[#03020c]"
        >
          {/* Subtle radial behind the mark */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(168,85,247,0.18) 0%, rgba(168,85,247,0.04) 35%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Wordmark — Manrope with stroke-draw via SVG */}
          <div className="relative flex flex-col items-center gap-12">
            <svg
              width="180"
              height="60"
              viewBox="0 0 180 60"
              className="text-white"
            >
              {/* Rising stripes mark */}
              <g transform="translate(0, 14)">
                <motion.path
                  d="M0 30 L9 4 L13 4 L4 30 Z"
                  fill="currentColor"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                />
                <motion.path
                  d="M8 30 L17 4 L21 4 L12 30 Z"
                  fill="currentColor"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 0.7, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                />
                <motion.path
                  d="M16 30 L25 4 L29 4 L20 30 Z"
                  fill="currentColor"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 0.42, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                />
              </g>
              {/* RSG. wordmark text */}
              <motion.text
                x="42"
                y="40"
                fontFamily="var(--font-display)"
                fontSize="34"
                fontWeight="500"
                fill="currentColor"
                letterSpacing="-0.025em"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                RSGAI
              </motion.text>
              <motion.text
                x="151"
                y="40"
                fontFamily="var(--font-display)"
                fontSize="34"
                fontWeight="500"
                fill="hsl(271 91% 65%)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.0 }}
              >
                .
              </motion.text>
            </svg>

            {/* Counter strip */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55 }}
              className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-white/50"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(174_100%_50%)] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(174_100%_50%)]" />
              </span>
              <span>Initialisiere Agenten</span>
              <span className="block h-px w-12 bg-white/15" />
              <span className="tabular-nums text-white">{count.toString().padStart(2, '0')}</span>
            </motion.div>
          </div>

          {/* Bottom hairline gradient — adds the "premium frame" detail */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, hsl(174 100% 50% / 0.5) 30%, hsl(271 91% 65% / 0.5) 70%, transparent 100%)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
