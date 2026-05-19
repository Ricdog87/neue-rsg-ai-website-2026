'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Calculator } from 'lucide-react';
import { hero, liveStats, site } from '@/lib/content';
import { Magnetic } from '@/components/effects/magnetic';

const NeuralSpace = dynamic(
  () => import('@/components/hero/neural-space').then((m) => m.NeuralSpace),
  { ssr: false, loading: () => null }
);

const EASE = [0.16, 1, 0.3, 1] as const;
const EASE_INOUT = [0.65, 0, 0.35, 1] as const;

/**
 * Hero — Senior-Audit V2.
 *
 * Composition rules:
 *  · One hero idea (WebGL backdrop) — no competing grid overlays / scroll
 *    hints / extra blooms.
 *  · One bold typographic statement — no gradient italic last-word trope.
 *  · Asymmetric stats: 1 hero KPI big, the rest as a mono ticker.
 *  · One CTA dominant, one secondary. Trust list lives below CTAs, not
 *    competing in the right column.
 *  · No headline tilt — adds nothing, taxes focus.
 */
export function Hero() {
  const lines = hero.headlineKinetic;
  const lastIndex = lines.length - 1;
  const [reduced, setReduced] = useState(false);

  // Promote the first stat — typically "1.247 Tasks/Tag" — to hero KPI;
  // the rest become a quiet ticker. (Designer move: asymmetric weight.)
  const heroKpi = liveStats[0];
  const tickerKpis = liveStats.slice(1);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#03020c] text-white"
      style={{ minHeight: '100svh' }}
    >
      {/* z:0 — WebGL backdrop (the ONE hero idea) */}
      <NeuralSpace reduced={reduced} />

      {/* z:5 — Single legibility veil (bottom only, very subtle) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            'linear-gradient(180deg, rgba(3,2,12,0.35) 0%, rgba(3,2,12,0) 22%, rgba(3,2,12,0) 65%, rgba(3,2,12,0.90) 100%)',
        }}
      />

      {/* z:10 — content */}
      <div
        className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-12 gap-x-6 px-6 pt-[150px] pb-20 lg:px-10 lg:pt-[180px] lg:pb-24"
        style={{ minHeight: '100svh' }}
      >
        {/* Eyebrow ── single line, no pill ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
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

        {/* Headline — clean, no gradient italic trope ── */}
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
                    delay: 0.25 + i * 0.14,
                  }}
                  className={
                    'inline-block ' +
                    (i === lastIndex
                      ? 'font-accent font-light italic text-white/95'
                      : '')
                  }
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* Subline + CTAs — sole right-side rail removed ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.1 }}
          className="col-span-12 mt-14 max-w-2xl md:mt-20"
          data-cursor="hover"
        >
          <p className="text-balance text-[1.05rem] leading-[1.65] text-white/65 md:text-[1.15rem]">
            {hero.subline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.14} radius={90}>
              <a
                href={site.cta.meetingUrl}
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
                className="group inline-flex h-14 items-center gap-2 rounded-full border border-white/25 px-7 font-display text-[0.95rem] font-medium text-white transition-all hover:border-white"
              >
                <Calculator className="h-4 w-4 transition-transform group-hover:rotate-[-6deg]" />
                {hero.ctaSecondary}
              </a>
            </Magnetic>
          </div>

          {/* Trust strip — inline below CTAs, not a separate column */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
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

        {/* ASYMMETRIC stats — 1 huge KPI + quiet ticker ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.7 }}
          className="col-span-12 mt-auto pt-16 md:pt-24"
        >
          <div className="grid grid-cols-12 items-end gap-x-6 gap-y-8 border-t border-white/12 pt-8">
            {/* Hero KPI — display-size */}
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

            {/* Quiet ticker — supporting stats */}
            <ul className="col-span-12 md:col-span-6 md:col-start-7">
              {tickerKpis.map((s, i) => (
                <motion.li
                  key={s.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: EASE,
                    delay: 1.9 + i * 0.08,
                  }}
                  className="flex items-baseline justify-between border-b border-white/8 py-2.5 font-mono text-[0.75rem] last:border-b-0"
                >
                  <span className="uppercase tracking-[0.18em] text-white/45">
                    {s.label}
                  </span>
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
