'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Horizontal drift in % of element width as it crosses the viewport */
  x?: number;
  /** Vertical drift in % of element height as it crosses the viewport */
  y?: number;
  /** Rotation in degrees end-to-end */
  rotate?: number;
  /** Scrub smoothing */
  scrub?: number | boolean;
};

/**
 * Wrap content to make it drift horizontally / vertically / rotate as the
 * user scrolls. Drives a scrub'd ScrollTrigger so motion stays locked to
 * the scroll wheel. Use small values (5-20) for "premium" subtle parallax,
 * larger (30-60) for hero-statement drifts.
 */
export function ScrollParallax({
  children,
  className,
  x = 0,
  y = 0,
  rotate = 0,
  scrub = 1.2,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      // Bail on reduced-motion AND on mobile/touch — horizontal scroll-drift
      // on narrow viewports is risky (edge gaps) and low-value. Desktop only.
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 768px), (pointer: coarse)').matches) return;

      gsap.fromTo(
        el,
        { xPercent: -x / 2, yPercent: -y / 2, rotate: -rotate / 2 },
        {
          xPercent: x / 2,
          yPercent: y / 2,
          rotate: rotate / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}
