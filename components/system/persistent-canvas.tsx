'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const NeuralSpace = dynamic(
  () => import('@/components/hero/neural-space').then((m) => m.NeuralSpace),
  { ssr: false, loading: () => null }
);

/**
 * Persistent WebGL backdrop — Active-Theory pattern (lite).
 *
 * Mobile-aware:
 *   - Auto-pauses the scene when the document is hidden (tab inactive)
 *     to save mobile battery.
 *   - Detects narrow viewports + coarse pointers and skips the WebGL
 *     entirely on the smallest devices — falling back to a static
 *     radial gradient. Saves ~200ms on slow phones + huge battery win.
 *   - Reduced-motion users get the static fallback too.
 *
 * Scroll-driven opacity:
 *   - Hero viewport (0 → 1 viewport): full 1.0
 *   - Beyond hero: fades to 0.55 (still present, atmospheric)
 */
export function PersistentCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [skipWebgl, setSkipWebgl] = useState(false);
  const [paused, setPaused] = useState(false);

  // Detect reduced-motion + low-end / mobile devices
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqMobile = window.matchMedia('(max-width: 640px), (pointer: coarse) and (max-width: 900px)');
    const mqDataSaver = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

    setReduced(mqMotion.matches);
    setSkipWebgl(mqMotion.matches || mqMobile.matches || mqDataSaver === true);

    const onMotion = () => {
      setReduced(mqMotion.matches);
      setSkipWebgl(mqMotion.matches || mqMobile.matches);
    };
    const onMobile = () => setSkipWebgl(mqMotion.matches || mqMobile.matches);
    mqMotion.addEventListener?.('change', onMotion);
    mqMobile.addEventListener?.('change', onMobile);
    return () => {
      mqMotion.removeEventListener?.('change', onMotion);
      mqMobile.removeEventListener?.('change', onMobile);
    };
  }, []);

  // Pause when the document is hidden (tab inactive, screen locked)
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const onVis = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Scroll-driven opacity
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      const vh = window.innerHeight;
      const y = window.scrollY;
      const heroProgress = Math.min(1, y / (vh * 0.9));
      const op = 1 - heroProgress * 0.45;
      el.style.opacity = op.toFixed(3);
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Static fallback gradient — mobile / reduced-motion / data-saver
  if (skipWebgl) {
    return (
      <div
        ref={ref}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 30%, hsl(240 14% 8%) 0%, hsl(240 14% 4%) 45%, hsl(240 14% 2%) 100%)',
        }}
      />
    );
  }

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ contain: 'strict' }}
    >
      <NeuralSpace reduced={reduced || paused} />
    </div>
  );
}
