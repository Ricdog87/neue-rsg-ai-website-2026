'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Scale at viewport-enter (top of element hits bottom of viewport) */
  from?: number;
  /** Scale at viewport-center */
  to?: number;
  /** Scale at viewport-exit (bottom of element hits top of viewport) */
  out?: number;
  /** ScrollTrigger scrub smoothing (0 = snap, higher = smoother lag) */
  scrub?: number | boolean;
};

/**
 * Wrap any element to make it zoom in as it enters the viewport,
 * settle at full size in the middle, and zoom slightly out as it
 * leaves. GSAP scrub keeps it locked to scroll position.
 */
export function ScrollScale({
  children,
  className,
  from = 0.86,
  to = 1,
  out = 0.94,
  scrub = 1.1,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub,
        },
      });
      tl.fromTo(el, { scale: from }, { scale: to, ease: 'power2.out', duration: 0.5 });
      tl.to(el, { scale: out, ease: 'power2.in', duration: 0.5 });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}
