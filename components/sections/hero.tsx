'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calculator } from 'lucide-react';
import { hero, liveStats, site } from '@/lib/content';
import { KineticTypo } from '@/components/hero/kinetic-typo';
import { LensFlare } from '@/components/hero/lens-flare';
import { AstronautPlaceholder } from '@/components/hero/astronaut-placeholder';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[hsl(var(--bg))] noise"
    >
      <LensFlare />
      <AstronautPlaceholder />

      {/* Content layer */}
      <div className="relative z-20 flex flex-1 flex-col justify-between px-6 pt-32 pb-12 md:pt-40">
        <div className="mx-auto w-full max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))]"
          >
            {hero.eyebrow}
          </motion.p>

          <div className="mt-6">
            <KineticTypo lines={hero.headlineKinetic} />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 max-w-2xl text-balance text-base text-[hsl(var(--muted))] md:text-lg"
          >
            {hero.subline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a href={site.cta.meetingUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg" className="group">
                {hero.ctaPrimary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <a href="#roi">
              <Button variant="outline" size="lg">
                <Calculator className="h-4 w-4" />
                {hero.ctaSecondary}
              </Button>
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-10 flex flex-wrap gap-3 text-xs text-[hsl(var(--muted))]"
          >
            {hero.trustChips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur"
              >
                {chip}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Live-Stats Strip am Hero-Boden */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mx-auto mt-16 w-full max-w-7xl"
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
                <div className="font-display text-2xl text-[hsl(var(--fg))] md:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-[hsl(var(--muted))]">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
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
