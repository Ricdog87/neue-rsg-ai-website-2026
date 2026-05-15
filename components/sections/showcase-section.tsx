'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useCases } from '@/lib/content';

const DistortionPlane = dynamic(
  () => import('@/components/effects/distortion-plane').then((m) => m.DistortionPlane),
  { ssr: false },
);

/**
 * Showcase — the "wow" moment.
 *
 * A pinned section: while the user keeps scrolling vertically, the page
 * stops moving and a horizontal track of use-case cards glides past in
 * front of a WebGL distortion plane. Card N "owns" the viewport, scales
 * up briefly, and hands off to N+1. Pure GSAP ScrollTrigger.
 */
export function ShowcaseSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track) return;

      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        track.style.transform = 'none';
        track.style.flexWrap = 'wrap';
        track.style.justifyContent = 'center';
        return;
      }

      const slides = gsap.utils.toArray<HTMLElement>('.showcase-card', track);
      if (slides.length === 0) return;

      // Total horizontal distance = (n-1) full slide widths
      const getDistance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Per-card scale-into-frame — stronger zoom for premium feel
      slides.forEach((card) => {
        gsap.fromTo(
          card.querySelector('.showcase-card-inner'),
          { scale: 0.78, opacity: 0.35, rotateY: 18 },
          {
            scale: 1,
            opacity: 1,
            rotateY: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: 'left center',
              end: 'center center',
              scrub: 1.2,
            },
          },
        );

        // Add an exit-scale so card shrinks as it leaves center going left
        gsap.fromTo(
          card.querySelector('.showcase-card-inner'),
          { scale: 1 },
          {
            scale: 0.85,
            opacity: 0.4,
            rotateY: -14,
            ease: 'power2.in',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: 'center center',
              end: 'right center',
              scrub: 1.2,
            },
          },
        );
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        ScrollTrigger.refresh();
      };
    },
    { scope: wrapRef },
  );

  return (
    <section
      id="showcase"
      ref={wrapRef}
      className="relative h-screen w-full overflow-hidden border-t border-white/5"
    >
      {/* WebGL distortion backdrop */}
      <DistortionPlane />

      {/* Dark wash for readability */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background:
            'linear-gradient(to right, hsl(240 10% 4% / 0.85) 0%, hsl(240 10% 4% / 0.5) 18%, hsl(240 10% 4% / 0.5) 82%, hsl(240 10% 4% / 0.85) 100%)',
        }}
      />

      {/* Eyebrow & headline overlay */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 px-6 pt-24 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))]">
            {useCases.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-balance text-4xl tracking-tight md:text-6xl">
            {useCases.headline}
          </h2>
        </div>
      </div>

      {/* Hint */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--muted))]">
        scroll →
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="relative z-10 flex h-full items-center gap-8 px-[10vw] will-change-transform"
        style={{ width: 'max-content' }}
      >
        {useCases.items.map((item, i) => (
          <div
            key={item.name}
            className="showcase-card relative h-[58vh] w-[80vw] shrink-0 md:w-[42vw] lg:w-[34vw]"
          >
            <div className="showcase-card-inner group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition-colors hover:border-[hsl(var(--neon))/40]">
              <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(circle at 30% 20%, hsl(271 91% 65% / 0.18), transparent 60%)',
                }}
              />
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--muted))]">
                  0{i + 1} / 0{useCases.items.length}
                </span>
                <h3 className="mt-6 font-display text-3xl tracking-tight md:text-4xl">
                  {item.name}
                </h3>
                <p className="mt-4 max-w-md text-sm text-[hsl(var(--muted))] md:text-base">
                  {item.body}
                </p>
              </div>
              <div className="mt-8 border-t border-white/10 pt-5">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))]">
                  KPI
                </span>
                <p className="mt-2 font-display text-2xl text-[hsl(var(--fg))] md:text-3xl">
                  {item.kpi}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
