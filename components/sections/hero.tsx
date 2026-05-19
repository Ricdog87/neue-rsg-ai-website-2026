'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import { ArrowUpRight, Calculator, Sparkles } from 'lucide-react';
import { hero, liveStats, site } from '@/lib/content';
import { Magnetic } from '@/components/effects/magnetic';

const NeuralSpace = dynamic(
  () => import('@/components/hero/neural-space').then((m) => m.NeuralSpace),
  { ssr: false, loading: () => null }
);

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Cinematic dark hero — WebGL neural-space + editorial typography.
 *
 * What's new (members-club feel):
 *  · Service identifier pill above the headline — tells you in 2s what we do
 *  · Headline letters react to mouse hover (subtle 3D tilt)
 *  · Stats strip has hover micro-interactions
 *  · CTAs use animated gradient borders
 */
export function Hero() {
  const lines = hero.headlineKinetic;
  const lastIndex = lines.length - 1;
  const [reduced, setReduced] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse parallax on headline
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useSpring(useTransform(mouseY, [-1, 1], [2, -2]), {
    stiffness: 120,
    damping: 30,
  });
  const tiltY = useSpring(useTransform(mouseX, [-1, 1], [-2, 2]), {
    stiffness: 120,
    damping: 30,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-[#03020c] text-white"
      style={{ minHeight: '100svh' }}
    >
      <NeuralSpace reduced={reduced} />

      {/* Top + bottom fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            'linear-gradient(180deg, rgba(3,2,12,0.55) 0%, rgba(3,2,12,0) 25%, rgba(3,2,12,0) 60%, rgba(3,2,12,0.85) 100%)',
        }}
      />

      {/* Indigo bloom behind headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-[6] h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(58,27,160,0.35) 0%, rgba(58,27,160,0.10) 30%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Editorial grid */}
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

      <div
        className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-12 gap-x-6 px-6 pt-[150px] pb-24 lg:px-10 lg:pt-[190px] lg:pb-32"
        style={{ minHeight: '100svh' }}
      >
        {/* ── Service identifier pill — tells the visitor what we DO ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="col-span-12 mb-10 flex flex-wrap items-center gap-4 md:mb-14"
        >
          <Magnetic strength={0.18} radius={120}>
            <a
              href="#solutions"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-white/15 bg-white/[0.04] py-2 pl-2 pr-4 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/[0.08]"
            >
              <span className="relative grid h-6 w-6 place-items-center rounded-full bg-[hsl(var(--accent))] text-white">
                <Sparkles className="h-3 w-3" />
              </span>
              <span className="font-display text-[0.8rem] font-medium tracking-tight text-white/90">
                Wir bauen & betreiben KI-Agenten für deinen Vertrieb.
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 text-white/55 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
            </a>
          </Magnetic>

          <span className="hidden items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-white/40 md:inline-flex">
            <span className="h-px w-6 bg-white/20" />
            {hero.eyebrow}
          </span>
        </motion.div>

        {/* ── Headline with mouse-tilt parallax ── */}
        <motion.div
          className="col-span-12 md:col-span-11"
          style={{
            rotateX: reduced ? 0 : tiltX,
            rotateY: reduced ? 0 : tiltY,
            transformPerspective: 1200,
            transformStyle: 'preserve-3d',
          }}
        >
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
                      ? { textShadow: '0 0 80px rgba(180,160,255,0.35)' }
                      : undefined
                  }
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
        </motion.div>

        {/* ── Subline + CTAs + trust ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.0 }}
          className="col-span-12 mt-14 grid grid-cols-12 gap-x-6 gap-y-12 md:mt-20"
        >
          <div className="col-span-12 md:col-span-7">
            <p className="max-w-2xl text-balance text-[1.05rem] leading-[1.65] text-white/70 md:text-[1.15rem]">
              {hero.subline}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic strength={0.28}>
                <a
                  href={site.cta.meetingUrl}
                  className="group relative inline-flex h-14 items-center gap-2 overflow-hidden rounded-full bg-white px-7 font-display text-[0.95rem] font-medium text-[#0a0a0a] transition-all hover:shadow-[0_20px_50px_-10px_rgba(180,160,255,0.6)]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#a855f7] via-[#5e7cff] to-[#00ffe0] transition-transform duration-500 group-hover:translate-x-0"
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
                    className="group flex items-start gap-3 text-[0.95rem] text-white/90"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-px w-4 shrink-0 bg-[#7d5cf0] transition-all duration-300 group-hover:w-8 group-hover:bg-[hsl(174_100%_50%)]"
                    />
                    <span>{chip}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* ── Live-stats masthead ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.8 }}
          className="col-span-12 mt-20 border-t border-white/15 pt-8 md:mt-auto md:pt-10"
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
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
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
                whileHover={{ y: -3 }}
                className="group cursor-default"
              >
                <div className="font-display text-[2rem] font-medium leading-none tracking-tight text-white transition-colors group-hover:text-[hsl(174_100%_70%)] md:text-[2.4rem]">
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
          <motion.span
            animate={{ height: ['12px', '24px', '12px'] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="block w-px bg-white/40"
          />
        </motion.div>
      </div>
    </section>
  );
}
