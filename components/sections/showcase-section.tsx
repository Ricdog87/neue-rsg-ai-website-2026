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
        {useCases.items.map((item, i) => {
          // Alternate accent flavor per card for visual rhythm
          const isPurple = i % 2 === 0;
          const accentRgb = isPurple ? '271 91% 65%' : '174 100% 50%';

          return (
            <div
              key={item.name}
              className="showcase-card relative h-[64vh] w-[82vw] shrink-0 md:w-[44vw] lg:w-[36vw]"
            >
              <div
                className="showcase-card-inner group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[28px] p-9 backdrop-blur-xl"
                style={{
                  // Layered: gradient background + edge-glow on hover
                  background:
                    'linear-gradient(155deg, hsl(240 12% 8% / 0.95) 0%, hsl(240 14% 5% / 0.7) 100%)',
                  border: '1px solid hsl(0 0% 100% / 0.08)',
                  boxShadow: `0 30px 80px -30px hsl(${accentRgb} / 0.25)`,
                }}
              >
                {/* Animated gradient border — only visible on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `conic-gradient(from 0deg at 50% 50%, hsl(${accentRgb} / 0.6), transparent 25%, hsl(${accentRgb} / 0.3) 50%, transparent 75%, hsl(${accentRgb} / 0.6))`,
                    WebkitMask:
                      'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    padding: '1px',
                    animation: 'spin 6s linear infinite',
                  }}
                />

                {/* Ambient glow that follows the card */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full opacity-30 blur-3xl transition-opacity duration-700 group-hover:opacity-70"
                  style={{ background: `radial-gradient(circle, hsl(${accentRgb} / 0.7), transparent 65%)` }}
                />

                {/* GIANT background number — drives the visual rhythm */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -bottom-12 font-display leading-none tracking-tighter select-none"
                  style={{
                    fontSize: 'clamp(14rem, 22vw, 22rem)',
                    color: `hsl(${accentRgb} / 0.06)`,
                    fontWeight: 700,
                  }}
                >
                  0{i + 1}
                </span>

                {/* Top row: counter + status pulse */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-[hsl(var(--muted))]">
                    0{i + 1} <span className="opacity-40">/</span> 0{useCases.items.length}
                  </span>
                  <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[hsl(var(--neon))]">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(var(--neon))] opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--neon))]" />
                    </span>
                    Live
                  </span>
                </div>

                {/* Headline + body */}
                <div className="relative z-10 mt-auto">
                  <h3
                    className="font-display text-4xl leading-[0.95] tracking-tight md:text-5xl"
                    style={{ color: `hsl(${accentRgb})` }}
                  >
                    {item.name}
                  </h3>
                  <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[hsl(var(--muted))] md:text-base">
                    {item.body}
                  </p>
                </div>

                {/* KPI block: oversized, glowing, with neon rule */}
                <div className="relative z-10 mt-8">
                  <div className="h-px w-12 bg-gradient-to-r from-[hsl(var(--neon))] to-transparent" />
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--muted))]">
                      Messbar
                    </span>
                    <p
                      className="font-display text-3xl font-bold tracking-tight md:text-4xl"
                      style={{
                        color: 'hsl(var(--fg))',
                        textShadow: `0 0 40px hsl(${accentRgb} / 0.5)`,
                      }}
                    >
                      {item.kpi}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
