'use client';

import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

interface ScrollSlideProps {
  children: ReactNode;
  className?: string;
  /** Side the section slides in from. */
  direction?: 'left' | 'right';
  /** Horizontal travel in % across the pass. Default 10. */
  distance?: number;
}

/**
 * ScrollSlide — scroll-scrubbed horizontal drift (Lusion-style lateral motion).
 * A section slides in from one side, settles, then drifts toward the other as
 * it leaves — tied to scroll position via the shared Lenis-fed ScrollTrigger.
 * Wrapper clips horizontal overflow so the motion never creates a scrollbar.
 * Honors prefers-reduced-motion (renders static). useGSAP reverts on unmount.
 */
export function ScrollSlide({
  children,
  className = '',
  direction = 'left',
  distance = 10,
}: ScrollSlideProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const trigger = triggerRef.current;
      const inner = innerRef.current;
      if (!trigger || !inner) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const sign = direction === 'left' ? -1 : 1;

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      });
      tl.fromTo(
        inner,
        { xPercent: sign * distance, autoAlpha: 0 },
        { xPercent: 0, autoAlpha: 1, duration: 0.35 },
      )
        .to(inner, { xPercent: 0, autoAlpha: 1, duration: 0.3 })
        .to(inner, { xPercent: -sign * distance * 0.6, autoAlpha: 0.85, duration: 0.35 });
    },
    { scope: triggerRef },
  );

  return (
    <div ref={triggerRef} className={'overflow-x-clip ' + className}>
      <div ref={innerRef} style={{ willChange: 'transform, opacity' }}>
        {children}
      </div>
    </div>
  );
}
