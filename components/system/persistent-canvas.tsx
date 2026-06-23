'use client';

import { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';

const NeuralSpace = dynamic(
  () => import('@/components/hero/neural-space').then((m) => m.NeuralSpace),
  { ssr: false, loading: () => null }
);

/**
 * Static deep-space gradient — the universal fallback. Used for
 * mobile/reduced-motion devices AND whenever the WebGL scene fails
 * (lost context, asset error, unsupported GPU). A premium site must
 * never white-screen because a backdrop couldn't initialise.
 */
const STATIC_BACKDROP =
  'radial-gradient(ellipse 100% 80% at 50% 30%, hsl(220 8% 5%) 0%, #000000 70%)';

/**
 * Catches any error thrown while rendering the WebGL backdrop and
 * degrades gracefully to the static gradient instead of taking the
 * whole page down with it.
 */
class CanvasBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[canvas] WebGL backdrop failed — using static fallback', error);
    }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

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

  // Scroll-driven opacity + WebGL-Pause sobald Hero off-screen.
  // Sterne / Bloom kosten ~50–60% CPU/GPU permanent — wenn der Nutzer am
  // Footer liest, ist der Hintergrund eh weggeblendet → freeze the scene.
  const [scrolledPast, setScrolledPast] = useState(false);
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
      // Pause sobald wir > 1 viewport gescrollt haben (Hero komplett raus).
      setScrolledPast(y > vh * 1.05);
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
        style={{ background: STATIC_BACKDROP }}
      />
    );
  }

  const fallback = (
    <div aria-hidden className="absolute inset-0" style={{ background: STATIC_BACKDROP }} />
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ contain: 'strict' }}
    >
      <CanvasBoundary fallback={fallback}>
        <NeuralSpace reduced={reduced || paused || scrolledPast} />
      </CanvasBoundary>
    </div>
  );
}
