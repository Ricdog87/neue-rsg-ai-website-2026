'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Full-screen reveal curtain that wipes off on initial load.
 * No router-listener — runs once per page mount.
 */
export function PageTransition() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.display = 'none';
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'expo.inOut' } });
    tl.to(el, { yPercent: -100, duration: 1.1, delay: 0.1 }).set(el, { display: 'none' });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[10000] bg-[hsl(var(--bg))]"
      style={{ willChange: 'transform' }}
    />
  );
}
