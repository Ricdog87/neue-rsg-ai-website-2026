'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Calculator } from 'lucide-react';
import { hero, liveStats, site } from '@/lib/content';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Editorial hero — typography first, Hohrising rising-stripes mark as
 * signature element. Indigo accent on the final headline word.
 */
export function Hero() {
  const lines = hero.headlineKinetic;
  const lastIndex = lines.length - 1;

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[hsl(var(--bg))] pt-[120px] pb-20 md:pt-[160px] md:pb-28 noise"
    >
      {/* Indigo wash behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[50vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 lens-flare"
      />

      {/* Rising stripes — signature SVG mark, top-right, parallax-style */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.6 }}
        className="pointer-events-none absolute right-6 top-[120px] hidden md:right-10 md:top-[180px] md:block"
      >
        <RisingStripes className="h-[clamp(160px,28vw,360px)] w-auto text-[hsl(var(--accent))]" />
      </motion.div>

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-12 gap-x-6 px-6 lg:px-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="col-span-12 mb-10 flex items-center justify-between md:mb-16"
        >
          <span className="eyebrow">{hero.eyebrow}</span>
          <span className="hidden font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))] md:inline">
            №&nbsp;01 / Vertriebs-KI
          </span>
        </motion.div>

        {/* Headline */}
        <div className="col-span-12 md:col-span-10">
          <h1 className="font-display text-[clamp(2.5rem,7.5vw,6.5rem)] font-medium leading-[0.98] tracking-[-0.025em] text-[hsl(var(--ink))]">
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.05, ease: EASE, delay: 0.15 + i * 0.12 }}
                  className={
                    'inline-block ' +
                    (i === lastIndex
                      ? 'font-accent font-light italic text-[hsl(var(--accent))]'
                      : '')
                  }
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* Subline + CTAs + trust */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
          className="col-span-12 mt-16 grid grid-cols-12 gap-x-6 md:mt-24"
        >
          <div className="col-span-12 md:col-span-7">
            <p className="max-w-2xl text-balance text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))] md:text-[1.125rem]">
              {hero.subline}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={site.cta.meetingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-14 items-center gap-2 rounded-full border border-[hsl(var(--accent))] bg-[hsl(var(--accent))]/90 px-7 font-display text-[0.95rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))] hover:shadow-[0_8px_24px_-8px_hsl(var(--accent)/0.5)]"
              >
                {hero.ctaPrimary}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#roi"
                className="group inline-flex h-14 items-center gap-2 rounded-full border border-[hsl(var(--ink))] px-7 font-display text-[0.95rem] font-medium text-[hsl(var(--ink))] transition-all hover:bg-[hsl(var(--ink))] hover:text-white"
              >
                <Calculator className="h-4 w-4" />
                {hero.ctaSecondary}
              </a>
            </div>
          </div>

          <div className="col-span-12 mt-12 md:col-span-5 md:mt-0">
            <div className="border-t border-[hsl(var(--border))] pt-6">
              <p className="mb-5 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
                Vertrauensanker
              </p>
              <ul className="space-y-3">
                {hero.trustChips.map((chip) => (
                  <li
                    key={chip}
                    className="flex items-start gap-3 text-[0.95rem] text-[hsl(var(--ink))]"
                  >
                    <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-[hsl(var(--accent))]" />
                    <span>{chip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Live stats — masthead bottom strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.4 }}
          className="col-span-12 mt-24 border-t border-[hsl(var(--border))] pt-8 md:mt-32"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(var(--accent))] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
            </span>
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
              Live · KI-Agenten in Produktion
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 lg:grid-cols-7">
            {liveStats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-[2rem] font-medium leading-none tracking-tight text-[hsl(var(--ink))] md:text-[2.25rem]">
                  {s.value}
                </div>
                <div className="mt-2 text-[0.7rem] uppercase tracking-wider text-[hsl(var(--subtle))]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function RisingStripes({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 110 180"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 178 L40 4 L52 4 L12 178 Z" fill="currentColor" opacity="0.95" />
      <path d="M30 178 L70 4 L82 4 L42 178 Z" fill="currentColor" opacity="0.55" />
      <path d="M60 178 L100 4 L112 4 L72 178 Z" fill="currentColor" opacity="0.25" />
    </svg>
  );
}
