'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calculator, PhoneCall } from 'lucide-react';
import { site } from '@/lib/content';
import { callcenter } from '@/lib/callcenter';
import { Magnetic } from '@/components/effects/magnetic';
import { CharSplit } from '@/components/effects/reveal';

const EASE = [0.16, 1, 0.3, 1] as const;
const h = callcenter.hero;

/** Count up to a target once the element scrolls into view. */
function StatNumber({
  value, prefix = '', suffix = '', decimals = 0,
}: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1200);
          const eased = 1 - Math.pow(1 - t, 3);
          setN(value * eased);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{n.toLocaleString('de-DE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
    </span>
  );
}

/** Live "calls in progress" visual — concentric pulse rings + a ticker. */
function LiveOps() {
  const [count, setCount] = useState(247);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      setCount((c) => Math.max(180, Math.min(420, c + Math.round((Math.random() - 0.45) * 14))));
    }, 1400);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative grid h-full min-h-[320px] place-items-center">
      {/* pulse rings */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute rounded-full border border-[hsl(var(--accent))/30]"
          style={{ width: 120 + i * 90, height: 120 + i * 90 }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.15, 0.5] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
        />
      ))}
      <div
        aria-hidden
        className="absolute h-[260px] w-[260px] rounded-full opacity-50 blur-[60px]"
        style={{ background: 'radial-gradient(circle, hsl(var(--accent)/0.5), transparent 70%)' }}
      />
      <div className="relative flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.03] px-7 py-6 backdrop-blur-md">
        <span className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-white/55">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--success))] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--success))]" />
          </span>
          Live · Gespräche gleichzeitig
        </span>
        <span className="mt-2 font-display text-[clamp(2.75rem,6vw,4rem)] font-medium leading-none tabular-nums tracking-[-0.03em] text-white">
          {count}
        </span>
        <span className="mt-2 flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white/40">
          <PhoneCall className="h-3 w-3 text-[hsl(var(--success))]" /> 0 in der Warteschleife
        </span>
      </div>
    </div>
  );
}

export function CallcenterHero() {
  return (
    <section id="callcenter-hero" className="relative overflow-hidden text-white" style={{ minHeight: '94svh' }}>
      {/* Legibility + aurora veils over the site-wide WebGL backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: 'radial-gradient(ellipse 95% 55% at 32% 38%, rgba(3,2,12,0.82) 0%, rgba(3,2,12,0.55) 35%, rgba(3,2,12,0.12) 66%, transparent 86%)' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 z-[1] h-[520px] w-[520px] rounded-full opacity-40 blur-[120px]"
        style={{ background: 'radial-gradient(circle, hsl(var(--accent)/0.5), transparent 65%)' }}
        animate={{ x: [0, 40, 0], y: [0, 24, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(180deg, rgba(3,2,12,0.55) 0%, rgba(3,2,12,0) 14%, rgba(3,2,12,0) 64%, rgba(3,2,12,0.96) 100%)' }}
      />

      <div className="relative z-10 mx-auto grid min-h-[94svh] max-w-[1280px] grid-cols-12 gap-x-6 px-6 pt-[140px] pb-10 lg:px-10 lg:pt-[180px]">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="col-span-12 mb-10 flex items-center gap-4"
        >
          <span aria-hidden className="h-px w-10 bg-white/30" />
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-white/65">{h.eyebrow}</span>
          <span className="ml-auto hidden font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-white/30 md:inline">№ 03 / Enterprise</span>
        </motion.div>

        {/* Headline + live visual */}
        <div className="col-span-12 grid items-center gap-x-10 gap-y-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h1 className="font-display text-[clamp(2.25rem,5.4vw,4.75rem)] font-medium leading-[1.05] tracking-[-0.025em] text-white">
              {h.headline.map((line, i) => (
                <span key={i} className="block">
                  <CharSplit text={line} delay={0.25 + i * 0.18} stagger={0.02} duration={0.9} />
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 1.0 }}
              className="mt-7 max-w-xl text-balance text-[1.05rem] leading-[1.65] text-white/70"
            >
              {h.subline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 1.2 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={0.14} radius={90}>
                <a
                  href={site.cta.meetingUrl}
                  data-event="callcenter_hero_demo"
                  className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-[hsl(var(--accent))] px-6 font-display text-[0.9rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))] hover:shadow-[0_14px_34px_-10px_hsl(var(--accent)/0.7)]"
                >
                  <span className="relative z-10">{h.primaryCta}</span>
                  <ArrowUpRight className="relative z-10 h-4 w-4 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Magnetic>
              <a
                href="#preise"
                data-event="callcenter_hero_pricing"
                className="group inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-6 font-display text-[0.9rem] font-medium text-white/85 transition-all hover:border-white/40 hover:text-white"
              >
                <Calculator className="h-4 w-4" />
                Preise &amp; {h.secondaryCta}
              </a>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.45 }}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-white/45"
            >
              {h.trust.map((chip) => (
                <li key={chip} className="flex items-center gap-2">
                  <span aria-hidden className="h-1 w-1 rounded-full bg-[hsl(var(--success))]" />
                  {chip}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.6 }}
            className="hidden lg:block"
          >
            <LiveOps />
          </motion.div>
        </div>

        {/* Animated stats band */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.5 }}
          className="col-span-12 mt-auto grid grid-cols-2 gap-y-8 border-t border-white/12 pt-8 sm:grid-cols-4"
        >
          {h.stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <dt className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-medium leading-none tracking-[-0.03em] text-white">
                <StatNumber value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
              </dt>
              <dd className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-white/45">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
