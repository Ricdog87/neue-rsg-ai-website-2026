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
          { scale: 0.92, opacity: 0.5 },
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
      {/* ── Mobile / tablet: simple card grid ──────────────────────────── */}
      <section
        id="showcase"
        className="relative border-t border-white/5 bg-[hsl(var(--bg))] px-4 py-20 sm:px-6 lg:hidden"
      >
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))]">
            {useCases.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-balance text-3xl tracking-tight sm:text-4xl md:text-6xl">
            {useCases.headline}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {useCases.items.map((item, i) => (
              <div
                key={item.name}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
              >
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--muted))]">
                    0{i + 1} / 0{useCases.items.length}
                  </span>
                  <h3 className="mt-4 font-display text-2xl tracking-tight">{item.name}</h3>
                  <p className="mt-3 text-sm text-[hsl(var(--muted))] leading-relaxed">{item.body}</p>
                </div>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))]">KPI</span>
                  <p className="mt-1 font-display text-xl text-[hsl(var(--fg))]">{item.kpi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Desktop: pinned horizontal scroll ─────────────────────────── */}
      <section
        id="showcase-desktop"
        ref={wrapRef}
        className="relative hidden h-screen w-full overflow-hidden border-t border-white/5 lg:block"
      >
        <DistortionPlane />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background:
              'linear-gradient(to right, hsl(240 10% 4% / 0.85) 0%, hsl(240 10% 4% / 0.5) 18%, hsl(240 10% 4% / 0.5) 82%, hsl(240 10% 4% / 0.85) 100%)',
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 px-6 pt-32">
          <div className="mx-auto max-w-7xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))]">
              {useCases.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-balance text-3xl tracking-tight sm:text-4xl md:text-6xl">
              {useCases.headline}
            </h2>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--muted))]">
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
              className="showcase-card relative h-[58vh] w-[34vw] shrink-0"
            >
              <div className="showcase-card-inner group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition-colors hover:border-[hsl(var(--neon))/40]">
                <div
                  className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 20%, hsl(271 91% 65% / 0.18), transparent 60%)',
                  }}
                />
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--muted))]">
                    0{i + 1} / 0{useCases.items.length}
                  </span>
                  <h3 className="mt-6 font-display text-3xl tracking-tight md:text-4xl">{item.name}</h3>
                  <p className="mt-4 max-w-md text-sm text-[hsl(var(--muted))] md:text-base">{item.body}</p>
                </div>
                <div className="mt-8 border-t border-white/10 pt-5">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))]">KPI</span>
                  <p className="mt-2 font-display text-2xl text-[hsl(var(--fg))] md:text-3xl">{item.kpi}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
