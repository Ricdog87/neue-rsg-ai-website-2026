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
 * The section pins to the viewport and as the user scrolls down,
 * three huge stat cards (taken from `liveAgents.kpis`) zoom in
 * one after the other from scale 0.3 → 2.5, then fade out, then
 * the next one comes. A DistortionPlane in the background
 * provides the brand-coloured noise field.
 *
 * Guarded by `prefers-reduced-motion` — without motion the three
 * stats are simply stacked legibly with no transform animation.
 *
 * Sits between ShowcaseSection and UseCasesSection.
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
        // Static fallback: show all three legibly, no animation
        gsap.set([s1, s2, s3], { scale: 1, opacity: 1, position: 'relative' });
        return;
      }

      gsap.set([s1, s2, s3], { scale: 0.3, opacity: 0, willChange: 'transform, opacity' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Stage 1
      tl.to(s1, { scale: 2.5, opacity: 1, duration: 1, ease: 'power2.out' }, 0);
      tl.to(s1, { scale: 4, opacity: 0, duration: 1, ease: 'power2.in' }, 1.1);

      // Stage 2
      tl.to(s2, { scale: 2.5, opacity: 1, duration: 1, ease: 'power2.out' }, 1.1);
      tl.to(s2, { scale: 4, opacity: 0, duration: 1, ease: 'power2.in' }, 2.2);

      // Stage 3 — final one stays visible
      tl.to(s3, { scale: 2.5, opacity: 1, duration: 1, ease: 'power2.out' }, 2.2);
    },
    { scope: sectionRef },
  );

  const stages = [stage1Ref, stage2Ref, stage3Ref];

  return (
    <section
      ref={sectionRef}
      id="stats-reveal"
      className="relative h-[100svh] overflow-hidden border-t border-white/5 bg-[hsl(var(--bg))]"
      aria-label="Live-Zahlen"
    >
      {/* Brand-coloured noise backdrop */}
      <DistortionPlane />

      {/* Eyebrow */}
      <div className="absolute left-1/2 top-10 z-20 -translate-x-1/2 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[hsl(var(--neon))]">
          Live aus Produktion
        </p>
      </div>

      {/* Stack of stat cards — stacked on top of each other, GSAP scales each in turn */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {liveAgents.kpis.slice(0, 3).map((kpi, i) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            ref={stages[i]}
            className="pointer-events-none absolute flex flex-col items-center justify-center text-center"
            style={{ willChange: 'transform, opacity' }}
            aria-hidden={i > 0}
          >
            <span className="font-display text-[clamp(4rem,18vw,16rem)] font-bold leading-none tracking-tighter text-[hsl(var(--fg))] drop-shadow-[0_0_40px_hsl(var(--accent)/0.45)]">
              {kpi.value}
            </span>
            <span className="mt-4 max-w-[80vw] font-mono text-sm uppercase tracking-[0.25em] text-[hsl(var(--neon))] md:text-base">
              {kpi.label}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--muted))]">
        weiterscrollen ↓
      </div>
    </section>
  );
}
