'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Top-of-page progress bar. Driven by ScrollTrigger so it stays in lockstep
 * with Lenis smooth scroll.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const bar = barRef.current;
    if (!bar) return;

    const st = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[hsl(var(--accent))] via-[hsl(var(--neon))] to-[hsl(var(--accent))]"
      style={{ transform: 'scaleX(0)' }}
      ref={barRef}
    />
  );
}
