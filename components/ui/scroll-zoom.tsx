'use client';

import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

interface ScrollZoomProps {
  children: ReactNode;
  className?: string;
  /** Peak zoom-in scale as the section arrives (settles to 1). Default 1.05. */
  zoom?: number;
  /** Vertical parallax drift in % across the pass. Default 6. */
  drift?: number;
  /** Enter blur in px — desktop (pointer:fine) only, where it's cheap. Default 10. */
  blur?: number;
}

/**
 * ScrollZoom — scroll-scrubbed "cinematic zoom" wrapper (Lusion-style).
 *
 * Unlike SectionReveal (one-shot reveal), this ties scale + parallax + fade
 * to the scroll POSITION: a section zooms IN as it arrives, sits in focus,
 * then drifts/zooms OUT as it leaves. Driven by the same Lenis-fed
 * ScrollTrigger as the rest of the site, so it stays perfectly in sync.
 *
 * Performance: transform/opacity everywhere; blur only on desktop pointer:fine.
 * Honors prefers-reduced-motion (renders static). Cleanup is handled by
 * useGSAP, which reverts every animation + ScrollTrigger created in scope.
 */
export function ScrollZoom({
  children,
  className = '',
  zoom = 1.05,
  drift = 6,
  blur = 10,
}: ScrollZoomProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const trigger = triggerRef.current;
      const inner = innerRef.current;
      if (!trigger || !inner) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const useBlur = window.matchMedia('(min-width: 768px) and (pointer: fine)').matches;
      const enterBlur = useBlur ? `blur(${blur}px)` : 'blur(0px)';
      const exitBlur = useBlur ? `blur(${Math.round(blur * 0.35)}px)` : 'blur(0px)';

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      // ENTER — zoom in, lift, focus (~first 35% of the pass)
      tl.fromTo(
        inner,
        { scale: zoom, yPercent: drift, autoAlpha: 0, filter: enterBlur },
        { scale: 1, yPercent: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.35 },
      )
        // FOCUS — hold at rest (~30%)
        .to(inner, { scale: 1, yPercent: 0, autoAlpha: 1, duration: 0.3 })
        // EXIT — drift up, slight zoom out, soften (~last 35%)
        .to(inner, {
          scale: 1 - (zoom - 1) * 0.6,
          yPercent: -drift * 0.8,
          autoAlpha: 0.82,
          filter: exitBlur,
          duration: 0.35,
        });
    },
    { scope: triggerRef },
  );

  return (
    <div ref={triggerRef} className={className}>
      <div ref={innerRef} style={{ willChange: 'transform, opacity' }}>
        {children}
      </div>
    </div>
  );
}
