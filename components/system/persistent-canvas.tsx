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
 * One Three.js scene that lives at z-index -1 on the body, behind all
 * sections. Stays mounted for the entire session — no re-init cost
 * when scrolling between sections.
 *
 * As you scroll, opacity is driven by scroll position:
 *   · Hero viewport: full opacity (1.0)
 *   · Beyond hero: fades to 0.18 — present but quiet
 *
 * Sections sit on top with their normal `bg-[hsl(var(--bg))]` —
 * giving the canvas a chance to peek through where the background
 * is slightly translucent (or where we leave it transparent).
 *
 * Mounted ONCE in app/layout.tsx.
 */
export function PersistentCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  // Drive opacity from scroll position — Hero (100vh) full, then fade
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      const vh = window.innerHeight;
      const y = window.scrollY;
      // 0 → 1 over the hero viewport
      const heroProgress = Math.min(1, y / (vh * 0.9));
      // Fade from 1.0 → 0.18 as we leave the hero
      const op = 1 - heroProgress * 0.82;
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

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ contain: 'strict' }}
    >
      <NeuralSpace reduced={reduced} />
    </div>
  );
}
