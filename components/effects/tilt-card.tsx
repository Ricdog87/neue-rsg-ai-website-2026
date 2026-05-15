'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Max tilt in degrees */
  max?: number;
  /** Glow follows cursor */
  glow?: boolean;
};

/**
 * 3D-tilt hover card. Element rotates on X/Y based on cursor position,
 * with an optional purple glow that follows the pointer. Pointer:fine only.
 */
export function TiltCard({ children, className, max = 8, glow = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const el = ref.current;
    if (!el) return;

    const rxTo = gsap.quickTo(el, 'rotateX', { duration: 0.5, ease: 'power3' });
    const ryTo = gsap.quickTo(el, 'rotateY', { duration: 0.5, ease: 'power3' });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      ryTo(x * max * 2);
      rxTo(-y * max * 2);
      if (glow) {
        el.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
        el.style.setProperty('--my', `${(y + 0.5) * 100}%`);
      }
    };
    const onLeave = () => {
      rxTo(0);
      ryTo(0);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [max, glow]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1200,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
