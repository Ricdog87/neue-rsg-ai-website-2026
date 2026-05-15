'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Magnetic strength: 0 = none, 1 = follows pointer exactly */
  strength?: number;
  /** Activation radius in px */
  radius?: number;
};

/**
 * Magnetic hover-effect — element subtly drifts toward the cursor while
 * the pointer is within `radius`. Snaps back on leave. Classic Lusion CTA.
 */
export function Magnetic({ children, className, strength = 0.35, radius = 90 }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const el = wrapRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < radius + Math.max(rect.width, rect.height) / 2) {
        xTo(dx * strength);
        yTo(dy * strength);
      } else {
        xTo(0);
        yTo(0);
      }
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, [strength, radius]);

  return (
    <div ref={wrapRef} className={className} style={{ display: 'inline-block', willChange: 'transform' }}>
      {children}
    </div>
  );
}
