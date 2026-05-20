'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Lenis smooth-scroll provider.
 *
 * Tuning notes (refined for fluidity + mobile feel):
 *   - duration: 1.4 (was 1.6) — slightly faster settle, less floaty
 *   - easing: exponential-out (Linear app feel)
 *   - wheelMultiplier: 1.0 (was 0.85) — more responsive scroll wheel
 *   - touchMultiplier: 1.8 (was 1.4) — flick scrolling feels more natural
 *     on iOS Safari where native momentum is heavy
 *   - smoothTouch: false — let mobile use NATIVE momentum, much better
 *     than Lenis smoothing on touch which feels laggy
 *
 * Reduced-motion: bail entirely so visitors who need it get native scroll.
 *
 * Drives GSAP ScrollTrigger so every scroll-tied animation in the site
 * is fed the same smoothed scroll value — no jitter between Lenis and
 * native handlers.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      // smoothTouch defaults to false in Lenis v1 — native momentum on
      // iOS/Android remains; just leave it.
    });

    // Drive ScrollTrigger from Lenis so reveals, pins, and scrubs stay in sync
    lenis.on('scroll', ScrollTrigger.update);
    const rafCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(rafCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafCb);
    };
  }, []);

  return <>{children}</>;
}
