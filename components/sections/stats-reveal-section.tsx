'use client';

import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { liveAgents } from '@/lib/content';
import dynamic from 'next/dynamic';

const DistortionPlane = dynamic(
  () => import('@/components/effects/distortion-plane').then((m) => m.DistortionPlane),
  { ssr: false, loading: () => null },
);

/**
 * Wow-stop #2 — pinned vertical stats reveal.
 *
 * Pixelation fix: text is rendered at its PEAK native size (clamp ~28vw)
 * and we only ever scale DOWN from there. CSS transform-scale upscales
 * the rasterised glyph texture, which blurs above 1; staying ≤1 keeps
 * glyphs vector-sharp.
 *
 * Timeline:
 *   stage_n starts at scale 0.4, opacity 0
 *   → grows to scale 1.0 (full native size — crisp)
 *   → shrinks back + fades out
 *   then stage_{n+1} takes over.
 *
 * Plus GPU promotion (translateZ(0) + backface hidden) and explicit
 * font-smoothing for retina-clean edges.
 */
export function StatsRevealSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage3Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const s1 = stage1Ref.current;
      const s2 = stage2Ref.current;
      const s3 = stage3Ref.current;
      if (!section || !s1 || !s2 || !s3) return;

      if (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        gsap.set([s1, s2, s3], { scale: 1, opacity: 1 });
        return;
      }

      gsap.set([s1, s2, s3], { scale: 0.4, opacity: 0, willChange: 'transform, opacity' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=220%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.to(s1, { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }, 0);
      tl.to(s1, { scale: 0.55, opacity: 0, duration: 1, ease: 'power2.in' }, 1.1);

      tl.to(s2, { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }, 1.1);
      tl.to(s2, { scale: 0.55, opacity: 0, duration: 1, ease: 'power2.in' }, 2.2);

      tl.to(s3, { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }, 2.2);
    },
    { scope: sectionRef },
  );

  const stages = [stage1Ref, stage2Ref, stage3Ref];

  return (
    <section
      ref={sectionRef}
      id="stats-reveal"
      className="relative h-[100svh] overflow-hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]"
      aria-label="Live-Zahlen aus Produktion"
    >
      <DistortionPlane />

      <div className="absolute left-1/2 top-12 z-20 -translate-x-1/2 text-center">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
          Live aus Produktion · gerade jetzt
        </p>
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {liveAgents.kpis.slice(0, 3).map((kpi, i) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            ref={stages[i]}
            className="pointer-events-none absolute flex flex-col items-center justify-center text-center"
            style={{
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
            }}
            aria-hidden={i > 0}
          >
            <span
              className="font-display font-medium leading-none tracking-tighter text-[hsl(var(--ink))]"
              style={{
                fontSize: 'clamp(7rem, 28vw, 22rem)',
                textRendering: 'geometricPrecision',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
              }}
            >
              {kpi.value}
            </span>
            <span className="mt-6 max-w-[80vw] font-mono text-[0.75rem] uppercase tracking-[0.25em] text-[hsl(var(--accent))] md:text-sm">
              {kpi.label}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 font-mono text-[0.625rem] uppercase tracking-[0.3em] text-[hsl(var(--subtle))]">
        weiterscrollen ↓
      </div>
    </section>
  );
}
