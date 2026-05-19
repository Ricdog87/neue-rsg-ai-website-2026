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

/**
 * Cinematic dark hero — WebGL "neural space" backdrop with editorial
 * typography on top. Pulsing AI-agent network behind a giant kinetic
 * headline.
 */
export function Hero() {
  const lines = hero.headlineKinetic;
  const lastIndex = lines.length - 1;
  const [reduced, setReduced] = useState(false);

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
      {/* z:0 — WebGL neural-space backdrop */}
      <NeuralSpace reduced={reduced} />

      {/* z:5 — Soft top + bottom fade for legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            'linear-gradient(180deg, rgba(3,2,12,0.55) 0%, rgba(3,2,12,0) 25%, rgba(3,2,12,0) 60%, rgba(3,2,12,0.85) 100%)',
        }}
      />

      {/* z:5 — Indigo bloom vignette behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-[6] h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(58,27,160,0.35) 0%, rgba(58,27,160,0.10) 30%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Decorative rule lines + grid for editorial sci-fi feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[7]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '120px 120px',
          maskImage:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.4) 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.4) 30%, transparent 75%)',
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-12 gap-x-6 px-6 pt-[140px] pb-24 lg:px-10 lg:pt-[180px] lg:pb-32"
        style={{ minHeight: '100svh' }}
      >
        {/* Eyebrow + masthead */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="col-span-12 mb-12 flex items-center justify-between md:mb-20"
        >
          <span className="inline-flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[#b4a0ff]">
            <span aria-hidden className="h-px w-7 bg-[#7d5cf0]" />
            {hero.eyebrow}
          </span>
          <div className="hidden items-center gap-4 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-white/45 md:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#b4a0ff] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#b4a0ff]" />
            </span>
            <span>System online · 48 Agents</span>
            <span className="text-white/25">№&nbsp;01</span>
          </div>
        </motion.div>

        {/* Headline */}
        <div className="col-span-12 md:col-span-11">
          <h1 className="font-display text-[clamp(2.75rem,8.5vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.025em] text-white">
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  initial={{ y: '105%', opacity: 0.4 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 1.1,
                    ease: EASE,
                    delay: 0.25 + i * 0.13,
                  }}
                  className={
                    'inline-block ' +
                    (i === lastIndex
                      ? 'font-accent font-light italic text-transparent bg-clip-text bg-gradient-to-r from-[#b4a0ff] via-[#e2d6ff] to-[#7d5cf0]'
                      : '')
                  }
                  style={
                    i === lastIndex
                      ? {
                          textShadow: '0 0 80px rgba(180,160,255,0.35)',
                        }
                      : undefined
                  }
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* Subline + CTAs + trust column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.0 }}
          className="col-span-12 mt-16 grid grid-cols-12 gap-x-6 gap-y-12 md:mt-24"
        >
          <div className="col-span-12 md:col-span-7">
            <p className="max-w-2xl text-balance text-[1.05rem] leading-[1.65] text-white/70 md:text-[1.15rem]">
              {hero.subline}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic strength={0.28}>
                <a
                  href={site.cta.meetingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex h-14 items-center gap-2 overflow-hidden rounded-full bg-white px-7 font-display text-[0.95rem] font-medium text-[#0a0a0a] transition-all hover:shadow-[0_20px_50px_-10px_rgba(180,160,255,0.6)]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#7d5cf0] to-[#b4a0ff] transition-transform duration-500 group-hover:translate-x-0"
                  />
                  <span className="relative z-10 group-hover:text-white">
                    {hero.ctaPrimary}
                  </span>
                  <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </a>
              </Magnetic>
              <Magnetic strength={0.22}>
                <a
                  href="#roi"
                  className="group inline-flex h-14 items-center gap-2 rounded-full border border-white/30 bg-white/[0.04] px-7 font-display text-[0.95rem] font-medium text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/[0.08]"
                >
                  <Calculator className="h-4 w-4" />
                  {hero.ctaSecondary}
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5">
            <div className="border-t border-white/15 pt-6">
              <p className="mb-5 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-white/40">
                Vertrauensanker
              </p>
              <ul className="space-y-3">
                {hero.trustChips.map((chip, i) => (
                  <motion.li
                    key={chip}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.6,
                      ease: EASE,
                      delay: 1.4 + i * 0.08,
                    }}
                    className="flex items-start gap-3 text-[0.95rem] text-white/90"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-px w-4 shrink-0 bg-[#7d5cf0]"
                    />
                    <span>{chip}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Live stats — bottom masthead */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.8 }}
          className="col-span-12 mt-24 border-t border-white/15 pt-8 md:mt-auto md:pt-10"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#b4a0ff] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#b4a0ff]" />
            </span>
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-white/45">
              Live · KI-Agenten in Produktion
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 lg:grid-cols-7">
            {liveStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: EASE,
                  delay: 2.0 + i * 0.05,
                }}
              >
                <div className="font-display text-[2rem] font-medium leading-none tracking-tight text-white md:text-[2.4rem]">
                  {s.value}
                </div>
                <div className="mt-2 text-[0.7rem] uppercase tracking-wider text-white/45">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.4 }}
          className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.3em] text-white/35 md:flex"
          aria-hidden
        >
          <span>weiter</span>
          <span className="block h-6 w-px bg-white/30" />
        </motion.div>
      </div>
    </section>
  );
}
