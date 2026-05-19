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

export function ShowcaseSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track) return;

      if (window.innerWidth < 1024) return;

      if (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        track.style.transform = 'none';
        track.style.flexWrap = 'wrap';
        track.style.justifyContent = 'center';
        return;
      }

      const slides = gsap.utils.toArray<HTMLElement>('.showcase-card', track);
      if (slides.length === 0) return;

      const getDistance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      slides.forEach((card) => {
        gsap.fromTo(
          card.querySelector('.showcase-card-inner'),
          { scale: 0.94, opacity: 0.6 },
          {
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: 'left center',
              end: 'center center',
              scrub: true,
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
    <>
      {/* Mobile / tablet — simple editorial card grid */}
      <section
        id="showcase"
        className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))] px-6 py-24 lg:hidden"
      >
        <div className="mx-auto max-w-[1280px]">
          <span className="eyebrow">{useCases.eyebrow}</span>
          <h2 className="mt-6 font-display text-[clamp(2rem,6vw,3rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[hsl(var(--fg))]">
            {useCases.headline}
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--border))] sm:grid-cols-2">
            {useCases.items.map((item, i) => (
              <div key={item.name} className="flex flex-col justify-between bg-[hsl(var(--bg))] p-7">
                <div>
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
                    0{i + 1} / 0{useCases.items.length}
                  </span>
                  <h3 className="mt-4 font-display text-[1.375rem] font-medium tracking-tight text-[hsl(var(--fg))]">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-[hsl(var(--muted))]">
                    {item.body}
                  </p>
                </div>
                <div className="mt-6 border-t border-[hsl(var(--border))] pt-4">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
                    KPI
                  </span>
                  <p className="mt-1 font-display text-[1.5rem] font-medium text-[hsl(var(--fg))]">
                    {item.kpi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Desktop — pinned horizontal scroll over indigo fluid simulation */}
      <section
        id="showcase-desktop"
        ref={wrapRef}
        className="relative hidden h-screen w-full overflow-hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--surface))] lg:block"
      >
        <DistortionPlane />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background:
              'linear-gradient(to right, hsl(240 14% 2% / 0.95) 0%, hsl(240 14% 2% / 0.5) 15%, hsl(240 14% 2% / 0.5) 85%, hsl(240 14% 2% / 0.95) 100%)',
          }}
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 px-10 pt-32">
          <div className="mx-auto max-w-[1280px]">
            <span className="eyebrow">{useCases.eyebrow}</span>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[hsl(var(--fg))]">
              {useCases.headline}
            </h2>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2 font-mono text-[0.625rem] uppercase tracking-[0.3em] text-[hsl(var(--subtle))]">
          scroll →
        </div>

        <div
          ref={trackRef}
          className="relative z-10 flex h-full items-center gap-8 px-[10vw] will-change-transform"
          style={{ width: 'max-content' }}
        >
          {useCases.items.map((item, i) => (
            <div
              key={item.name}
              className="showcase-card relative h-[60vh] w-[34vw] shrink-0"
            >
              <div className="showcase-card-inner relative flex h-full w-full flex-col justify-between overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--bg))] p-10 shadow-[var(--shadow-lift)] transition-colors hover:border-[hsl(var(--accent))]">
                <div>
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
                    0{i + 1} / 0{useCases.items.length}
                  </span>
                  <h3 className="mt-6 font-display text-[2rem] font-medium leading-tight tracking-tight text-[hsl(var(--fg))] md:text-[2.5rem]">
                    {item.name}
                  </h3>
                  <p className="mt-5 max-w-md text-[1rem] leading-[1.6] text-[hsl(var(--muted))]">
                    {item.body}
                  </p>
                </div>
                <div className="mt-8 border-t border-[hsl(var(--border))] pt-6">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
                    KPI
                  </span>
                  <p className="mt-2 font-display text-[1.75rem] font-medium text-[hsl(var(--fg))] md:text-[2rem]">
                    {item.kpi}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
