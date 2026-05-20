'use client';

import { motion } from 'framer-motion';
import { CharSplit } from '@/components/effects/reveal';
import type { CaseStudy } from '@/lib/case-studies';

const EASE = [0.16, 1, 0.3, 1] as const;

export function CaseStudyHero({ cs }: { cs: CaseStudy }) {
  return (
    <section
      id="case-hero"
      className="relative overflow-hidden text-white"
      style={{ minHeight: '100svh' }}
    >
      {/* Soft legibility veil under the headline anchor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 90% 50% at 30% 38%, rgba(3,2,12,0.78) 0%, rgba(3,2,12,0.55) 35%, rgba(3,2,12,0.15) 65%, transparent 85%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(3,2,12,0.55) 0%, rgba(3,2,12,0) 12%, rgba(3,2,12,0) 70%, rgba(3,2,12,0.95) 100%)',
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
          transition={{ duration: 0.6, ease: EASE, delay: 1.6 }}
          className="col-span-12 mb-12 flex items-center gap-3 md:mb-16"
        >
          <span aria-hidden className="h-px w-10 bg-white/30" />
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-[hsl(var(--accent))]">
            {cs.eyebrow}
          </span>
        </motion.div>

        {/* Headline */}
        <div className="col-span-12 md:col-span-10">
          <h1 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-medium leading-[1.04] tracking-[-0.025em] text-white">
            <CharSplit text={cs.headline} delay={1.8} stagger={0.018} duration={0.95} />
          </h1>
        </div>

        {/* Subline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 2.5 }}
          className="col-span-12 mt-14 max-w-2xl md:mt-20"
        >
          <p className="text-balance text-[1.05rem] leading-[1.65] text-white/70 md:text-[1.15rem]">
            {cs.subline}
          </p>
        </motion.div>

        {/* Project meta strip */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.8, ease: EASE }}
          className="col-span-12 mt-16 grid grid-cols-2 gap-y-6 border-y border-white/10 py-6 sm:grid-cols-5 sm:gap-x-6 md:mt-auto"
        >
          {cs.meta.map(({ k, v }) => (
            <div key={k} className="flex flex-col gap-1">
              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-white/35">
                {k}
              </dt>
              <dd className="font-display text-[0.95rem] font-medium tracking-tight text-white">
                {v}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
