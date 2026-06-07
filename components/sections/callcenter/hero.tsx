'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Calculator } from 'lucide-react';
import { site } from '@/lib/content';
import { callcenter } from '@/lib/callcenter';

const EASE = [0.16, 1, 0.3, 1] as const;
const h = callcenter.hero;

export function CallcenterHero() {
  return (
    <section
      id="callcenter-hero"
      className="relative overflow-hidden text-white"
      style={{ minHeight: '92svh' }}
    >
      {/* Legibility veils over the site-wide WebGL backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 90% 50% at 32% 40%, rgba(3,2,12,0.8) 0%, rgba(3,2,12,0.55) 35%, rgba(3,2,12,0.15) 65%, transparent 85%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(3,2,12,0.55) 0%, rgba(3,2,12,0) 14%, rgba(3,2,12,0) 66%, rgba(3,2,12,0.96) 100%)',
        }}
      />

      <div className="relative z-10 mx-auto grid min-h-[92svh] max-w-[1280px] grid-cols-12 gap-x-6 px-6 pt-[140px] pb-16 lg:px-10 lg:pt-[200px] lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="col-span-12 mb-10 flex items-center gap-4 md:mb-14"
        >
          <span aria-hidden className="h-px w-10 bg-white/30" />
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-white/65">
            {h.eyebrow}
          </span>
          <span className="ml-auto hidden font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-white/30 md:inline">
            № 03 / Inbound ⇆ Outbound
          </span>
        </motion.div>

        <div className="col-span-12 md:col-span-11 lg:col-span-10">
          <h1 className="font-display text-[clamp(2.25rem,5.6vw,5rem)] font-medium leading-[1.06] tracking-[-0.025em] text-white">
            {h.headline.map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.12 }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
          className="col-span-12 mt-10 max-w-2xl md:mt-12"
        >
          <p className="text-balance text-[1.05rem] leading-[1.65] text-white/70">{h.subline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={site.cta.meetingUrl}
              data-event="callcenter_hero_demo"
              className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-[hsl(var(--accent))] px-6 font-display text-[0.9rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))] hover:shadow-[0_12px_30px_-10px_hsl(var(--accent)/0.6)]"
            >
              <span className="relative z-10">{h.primaryCta}</span>
              <ArrowUpRight className="relative z-10 h-4 w-4 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#rechner"
              data-event="callcenter_hero_calc"
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-6 font-display text-[0.9rem] font-medium text-white/85 transition-all hover:border-white/40 hover:text-white"
            >
              <Calculator className="h-4 w-4" />
              {h.secondaryCta}
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-white/45">
            {h.trust.map((chip) => (
              <li key={chip} className="flex items-center gap-2">
                <span aria-hidden className="h-1 w-1 rounded-full bg-[hsl(var(--success))]" />
                {chip}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
