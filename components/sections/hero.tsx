'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Calculator } from 'lucide-react';
import { hero, liveStats, site } from '@/lib/content';
import { KineticTypo } from '@/components/hero/kinetic-typo';
import { LensFlare } from '@/components/hero/lens-flare';
import { VideoBackground } from '@/components/hero/video-background';
import { Magnetic } from '@/components/effects/magnetic';
import { Button } from '@/components/ui/button';
import { gsap } from '@/lib/gsap';

// Lazy-load WebGL so Three.js stays out of the initial bundle
const HeroWebGL = dynamic(
  () => import('@/components/effects/hero-webgl').then((m) => m.HeroWebGL),
  { ssr: false },
);
const HeroOrb = dynamic(
  () => import('@/components/effects/hero-orb').then((m) => m.HeroOrb),
  { ssr: false },
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Multi-speed parallax: as the hero scrolls past, each layer drifts
      // at a different rate so they separate cinematically.
      const trig = {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.1,
      } as const;

      gsap.to('[data-hero-eyebrow]', { yPercent: -120, opacity: 0.2, ease: 'none', scrollTrigger: trig });
      gsap.to('[data-hero-headline]', { yPercent: -55, ease: 'none', scrollTrigger: trig });
      gsap.to('[data-hero-subline]', { yPercent: -45, opacity: 0.5, ease: 'none', scrollTrigger: trig });
      gsap.to('[data-hero-ctas]', { yPercent: -38, ease: 'none', scrollTrigger: trig });
      gsap.to('[data-hero-chips]', { yPercent: -30, opacity: 0.6, ease: 'none', scrollTrigger: trig });
      gsap.to('[data-hero-stats]', { yPercent: -18, ease: 'none', scrollTrigger: trig });
      gsap.to('[data-hero-scroll-hint]', { opacity: 0, ease: 'none', scrollTrigger: trig });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden noise"
      style={{ backgroundColor: 'hsl(240 10% 4%)' }}
    >
      {/* z:0 — video + overlay */}
      <VideoBackground />

      {/* z:5 — WebGL particle field above video, below content */}
      {/* <HeroWebGL /> disabled for flicker */}

      {/* z:10 — brand glow on top of video overlay */}
      <div className="relative z-10">
        <LensFlare />
      </div>

      {/* z:10 — WebGL centerpiece (procedural iridescent distort sphere) */}
      {/* <HeroOrb /> disabled for flicker */}

      {/* z:20 — all text + CTA content */}
      <div className="relative z-20 flex flex-1 flex-col justify-between px-4 pt-28 pb-10 sm:px-6 md:pt-40 md:pb-12">
        <div className="mx-auto w-full max-w-7xl">
          <motion.p
            data-hero-eyebrow
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))]"
          >
            {hero.eyebrow}
          </motion.p>

          <div data-hero-headline className="mt-6">
            <KineticTypo lines={hero.headlineKinetic} />
          </div>

          <motion.p
            data-hero-subline
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 max-w-2xl text-balance text-base text-[hsl(var(--muted))] md:text-lg"
          >
            {hero.subline}
          </motion.p>

          <motion.div
            data-hero-ctas
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic strength={0.3}>
              <a href={site.cta.meetingUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg" className="group">
                  {hero.ctaPrimary}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a href="#roi">
                <Button variant="outline" size="lg">
                  <Calculator className="h-4 w-4" />
                  {hero.ctaSecondary}
                </Button>
              </a>
            </Magnetic>
          </motion.div>

          <motion.ul
            data-hero-chips
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-10 flex flex-wrap gap-3 text-xs text-[hsl(var(--muted))]"
          >
            {hero.trustChips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm"
              >
                {chip}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Live-Stats Strip */}
        <motion.div
          data-hero-stats
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mx-auto mt-8 w-full max-w-7xl md:mt-16"
        >
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[hsl(var(--muted))]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(var(--neon))] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--neon))]" />
            </span>
            Live — KI-Agent verarbeitet gerade
          </div>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/5 pt-6 sm:grid-cols-4 lg:grid-cols-7">
            {liveStats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl text-[hsl(var(--fg))] md:text-3xl">{s.value}</div>
                <div className="mt-1 text-xs text-[hsl(var(--muted))]">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        data-hero-scroll-hint
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--muted))]"
        aria-hidden
      >
        scroll ↓
      </motion.div>
    </section>
  );
}
