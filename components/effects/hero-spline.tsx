'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

/**
 * Hero centerpiece — curated Spline scene.
 *
 * Replaces the WebGL distort-sphere (`HeroOrb`) with a richer
 * neural-brain mesh authored in Spline (Ricardo's "AI Brain"
 * workspace asset). The Spline runtime is dynamically imported and
 * SSR-disabled so the runtime bundle never ships in the initial
 * document.
 *
 * Guards:
 *   - `prefers-reduced-motion` → no render
 *   - low core count (<= 2 logical CPUs) → no render (mobile fallback)
 *
 * The wrapper is `pointer-events-none` so it cannot eat clicks
 * from the headline / CTAs that sit above it (z-20).
 *
 * Source:  https://app.spline.design/file/29282388-bf3c-4f53-9da0-c1245ffbe1ba
 * Scene:   https://prod.spline.design/6Z5gSmCh7pwQOhqp/scene.splinecode
 * Author:  Ricardo Serrano (own asset, full rights)
 */

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => null,
});

const SCENE_URL =
  'https://prod.spline.design/6Z5gSmCh7pwQOhqp/scene.splinecode';

export function HeroSpline() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lowEnd =
      navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    if (lowEnd) return;
    setEnabled(true);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[80vh] w-[90vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 md:h-[90vh]"
    >
      <Spline scene={SCENE_URL} />
    </div>
  );
}
