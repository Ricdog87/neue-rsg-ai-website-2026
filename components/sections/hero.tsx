'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Calculator } from 'lucide-react';
import { hero, liveStats, site } from '@/lib/content';
import { Magnetic } from '@/components/effects/magnetic';

const EASE = [0.16, 1, 0.3, 1] as const;
const EASE_INOUT = [0.65, 0, 0.35, 1] as const;

/**
 * Hero — Senior-Audit V3.
 *
 * Now transparent: the WebGL scene lives at <PersistentCanvas /> on the
 * layout level so it bleeds across the whole site. The hero is just
 * the typographic layer on top.
 *
 *   · One idea (the canvas behind us)
 *   · One bold mask-reveal headline
 *   · Asymmetric stat strip (1 huge KPI + quiet ticker)
 *   · One CTA dominant, one secondary
 *   · Inline trust chips below CTAs
 *   · No mouse-tilt, no gradient italic, no editorial grid overlay
 */
export function Hero() {
  const lines = hero.headlineKinetic;
  const lastIndex = lines.length - 1;

  const heroKpi = liveStats[0];
  const tickerKpis = liveStats.slice(1);

  return (
    <section
      id="hero"
      className="relative overflow-hidden text-white"
      style={{ minHeight: '100svh' }}
    >
      {/* Single legibility veil — gradient at very bottom only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(3,2,12,0.35) 0%, rgba(3,2,12,0) 20%, rgba(3,2,12,0) 70%, rgba(3,2,12,0.95) 100%)',
        }}
      />

      <div
        className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-12 gap-x-6 px-6 pt-[150px] pb-20 lg:px-10 lg:pt-[180px] lg:pb-24"
        style={{ minHeight: '100svh' }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 1.8 }}
          className="col-span-12 mb-14 flex items-center gap-3 md:mb-20"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(174_100%_50%)] opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(174_100%_50%)]" />
          </span>
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-white/55">
            {hero.eyebrow}
          </span>
          <span className="ml-auto hidden font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-white/30 md:inline">
            № 01 / Vertriebs-KI
          </span>
        </motion.div>

        {/* Headline */}
        <div className="col-span-12 md:col-span-11">
          <h1 className="font-display text-[clamp(2.75rem,9vw,8rem)] font-medium leading-[0.95] tracking-[-0.025em] text-white">
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{
                    duration: 1.2,
                    ease: EASE_INOUT,
                    delay: 1.95 + i * 0.14,
                  }}
                  className={
                    'inline-block ' +
                    (i === lastIndex ? 'font-accent font-light italic text-white/95' : '')
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
          transition={{ duration: 0.9, ease: EASE, delay: 2.7 }}
          className="col-span-12 mt-14 max-w-2xl md:mt-20"
        >
          <p className="text-balance text-[1.05rem] leading-[1.65] text-white/65 md:text-[1.15rem]">
            {hero.subline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.14} radius={90}>
              <a
                href={site.cta.meetingUrl}
                data-sound="tick"
                className="group relative inline-flex h-14 items-center gap-2 overflow-hidden rounded-full bg-white px-7 font-display text-[0.95rem] font-medium text-[#0a0a0a] transition-shadow hover:shadow-[0_20px_50px_-10px_rgba(168,85,247,0.55)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#a855f7] via-[#5e7cff] to-[#00ffe0] transition-transform duration-500 group-hover:translate-x-0"
                />
                <span className="relative z-10 transition-colors group-hover:text-white">
                  {hero.ctaPrimary}
                </span>
                <ArrowUpRight className="relative z-10 h-4 w-4 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </a>
            </Magnetic>
            <Magnetic strength={0.12} radius={80}>
              <a
                href="#roi"
                data-sound="tick"
                className="group inline-flex h-14 items-center gap-2 rounded-full border border-white/25 px-7 font-display text-[0.95rem] font-medium text-white transition-all hover:border-white"
              >
                <Calculator className="h-4 w-4 transition-transform group-hover:rotate-[-6deg]" />
                {hero.ctaSecondary}
              </a>
            </Magnetic>
          </div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 3.1 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-white/45"
          >
            {hero.trustChips.slice(0, 3).map((chip) => (
              <li key={chip} className="flex items-center gap-2">
                <span aria-hidden className="h-px w-3 bg-white/30" />
                {chip}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Asymmetric stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 3.3 }}
          className="col-span-12 mt-auto pt-16 md:pt-24"
        >
          <div className="grid grid-cols-12 items-end gap-x-6 gap-y-8 border-t border-white/12 pt-8">
            <div className="col-span-12 md:col-span-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(174_100%_50%)] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(174_100%_50%)]" />
                </span>
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-white/45">
                  Live · jetzt
                </span>
              </div>
              <div className="font-display text-[clamp(4.5rem,11vw,8.5rem)] font-medium leading-[0.85] tracking-[-0.04em] text-white">
                {heroKpi.value}
              </div>
              <div className="mt-3 font-mono text-[0.75rem] uppercase tracking-[0.24em] text-white/45">
                {heroKpi.label} · von 12+ Agenten in Produktion
              </div>
            </div>

            <ul className="col-span-12 md:col-span-6 md:col-start-7">
              {tickerKpis.map((s, i) => (
                <motion.li
                  key={s.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 3.5 + i * 0.08 }}
                  className="flex items-baseline justify-between border-b border-white/8 py-2.5 font-mono text-[0.75rem] last:border-b-0"
                >
                  <span className="uppercase tracking-[0.18em] text-white/45">{s.label}</span>
                  <span className="font-display text-[1.05rem] tracking-tight text-white">
                    {s.value}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
