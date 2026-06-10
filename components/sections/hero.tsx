'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Phone } from 'lucide-react';
import { hero, liveStats, site } from '@/lib/content';
import { Magnetic } from '@/components/effects/magnetic';
import { CharSplit } from '@/components/effects/reveal';
import { HeroCallbackCard } from '@/components/sections/hero-callback-card';
import { useEnglish } from '@/components/system/use-locale';
import { ScrollSlide } from '@/components/ui/scroll-slide';

const LIVESTATS_EN: Record<string, string> = {
  'Ø Reaktion': 'avg response',
  'Ersparnis p.a. (Pilotkunden)': 'savings p.a. (pilots)',
  'ROI · Pilotkunden': 'ROI · pilots',
  'Uptime EU': 'Uptime EU',
  'Live-Agenten': 'live agents',
  'im Einsatz': 'in operation',
};

const HERO_EN = {
  eyebrow: 'AI phone assistant · A workshop for sales',
  headlineKinetic: ['AI agents', 'that pick up the phone —', 'and sell.'],
  subStatement: 'Live in four weeks — not four quarters.',
  subline:
    'Your AI phone assistant answers every call, qualifies leads and books meetings — 24/7, in natural language, wired into your CRM. Currently onboarding Cohort 06 (Q3 2026).',
  ctaPrimary: 'Free intro call',
  ctaSecondary: 'See the assistant',
  trustChips: [
    'Live in 4 weeks',
    'GDPR · EU servers',
    '12+ agents in production',
    'up to 312% ROI (pilots)',
    'Hosted in Germany',
  ],
};

/**
 * Live ticker — the hero KPI that actually increments every few seconds
 * so the "Tasks/Tag" number feels truly alive. Increments by 1–3 every
 * 2–5 seconds with a soft flash on the last digit each time.
 */
function LiveTicker({ base }: { base: number }) {
  const [value, setValue] = useState(base);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancel = false;
    const tick = () => {
      if (cancel) return;
      setValue((v) => v + 1 + Math.floor(Math.random() * 3));
      setFlash(true);
      window.setTimeout(() => setFlash(false), 380);
      window.setTimeout(tick, 2000 + Math.random() * 3000);
    };
    const initial = window.setTimeout(tick, 1800);
    return () => {
      cancel = true;
      window.clearTimeout(initial);
    };
  }, []);

  const formatted = value.toLocaleString('de-DE');
  return (
    <span className="relative inline-flex items-baseline">
      <span>{formatted}</span>
      <span
        aria-hidden
        className={
          'pointer-events-none absolute inset-0 transition-opacity duration-300 ' +
          (flash ? 'opacity-100' : 'opacity-0')
        }
        style={{
          color: 'hsl(var(--accent))',
          textShadow: '0 0 30px hsl(var(--accent) / 0.65)',
        }}
      >
        {formatted}
      </span>
    </span>
  );
}

const EASE = [0.16, 1, 0.3, 1] as const;
const EASE_INOUT = [0.65, 0, 0.35, 1] as const;

/**
 * Hero — Senior-Audit V3.
 *
 * Now transparent: the WebGL scene lives at <PersistentCanvas /> on the
 * layout level so it bleeds across the whole site. The hero is just
 * the typographic layer on top.
 *
 * · One idea (the canvas behind us)
 * · One bold mask-reveal headline
 * · Asymmetric stat strip (1 huge KPI + quiet ticker)
 * · One CTA dominant, one secondary
 * · Inline trust chips below CTAs
 * · No mouse-tilt, no gradient italic, no editorial grid overlay
 */
export function Hero() {
  const en = useEnglish();
  const h = en ? HERO_EN : hero;
  const lines = h.headlineKinetic;

  const tickerKpis = liveStats.slice(1);

  return (
    <section
      id="hero"
      className="relative overflow-hidden text-white"
      style={{ minHeight: '100svh' }}
    >
      {/* Layered legibility veils — radial wash under headline + vignette */}
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
            'linear-gradient(180deg, rgba(3,2,12,0) 0%, rgba(3,2,12,0) 72%, rgba(3,2,12,0.85) 100%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 50% 50%, transparent 40%, rgba(3,2,12,0.45) 100%)',
        }}
      />

      <div
        className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1280px] grid-cols-12 gap-x-6 px-6 pt-[120px] pb-14 lg:px-10 lg:pt-[180px] lg:pb-24"
      >
        {/* ── Pre-headline rail — refined eyebrow + masthead ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 1.8 }}
          className="col-span-12 mb-12 flex items-center gap-4 md:mb-16"
        >
          <span aria-hidden className="h-px w-10 bg-white/30" />
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-white/65">
            {h.eyebrow}
          </span>
          <span className="ml-auto hidden font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-white/30 md:inline">
            № 01 / Wiesbaden ⇆ {en ? 'Germany' : 'Deutschland'}
          </span>
        </motion.div>

        {/* ── Headline — per-letter kinetic (Lusion-style) ── */}
        <ScrollSlide direction="up" delay={0} className="col-span-12 md:col-span-10">
          <h1 className="font-display text-[clamp(2.25rem,5.6vw,5.25rem)] font-medium leading-[1.08] tracking-[-0.025em] text-white">
            {lines.map((line, i) => {
              const offset = lines
                .slice(0, i)
                .reduce((s, l) => s + l.replace(/\s+/g, '').length, 0);
              return (
                <span key={i} className="block">
                  <CharSplit
                    text={line}
                    delay={1.95 + offset * 0.022}
                    stagger={0.022}
                    duration={0.95}
                  />
                </span>
              );
            })}
          </h1>

          {/* Italic sub-statement — single editorial flourish */}
          {h.subStatement && (
            <div className="mt-6 overflow-hidden md:mt-7">
              <motion.p
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: 1.2,
                  ease: EASE_INOUT,
                  delay: 2.95,
                }}
                className="font-accent text-[clamp(1.25rem,2.4vw,2.1rem)] font-light italic leading-[1.2] text-white/75"
              >
                {h.subStatement}
              </motion.p>
            </div>
          )}
        </ScrollSlide>

        {/* ── Conversion grid: left = subline + secondary CTAs · right = callback card ── */}
        <div className="col-span-12 mt-14 grid items-start gap-x-10 gap-y-10 md:mt-20 lg:grid-cols-[1fr_minmax(360px,460px)] lg:gap-x-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 2.7 }}
            className="max-w-2xl"
          >
            <p className="text-balance text-[1rem] leading-[1.65] text-white/65 md:text-[1.05rem]">
              {h.subline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.14} radius={90}>
                <a
                  href={site.cta.meetingUrl}
                  data-sound="tick"
                  data-cursor-label="Buchen"
                  data-event="meeting-cta-hero"
                  className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-[hsl(var(--accent))] px-7 font-display text-[0.9rem] font-semibold text-white shadow-[0_14px_44px_-12px_hsl(var(--accent)/0.75)] transition-all hover:bg-[hsl(var(--accent-deep))] hover:shadow-[0_18px_56px_-12px_hsl(var(--accent)/0.9)]"
                >
                  <span className="relative z-10">{h.ctaPrimary}</span>
                  <ArrowUpRight className="relative z-10 h-4 w-4 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Magnetic>
              <Magnetic strength={0.12} radius={80}>
                <a
                  href="#voice"
                  data-sound="tick"
                  data-cursor-label="Ansehen"
                  data-event="voice_section_open"
                  className="group inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-6 font-display text-[0.9rem] font-medium text-white/85 transition-all hover:border-white/40 hover:text-white"
                >
                  <Phone className="h-4 w-4 transition-transform group-hover:rotate-[-6deg]" />
                  {h.ctaSecondary}
                </a>
              </Magnetic>
            </div>

            <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-white/45">
              {en ? '30 min · no sales pitch · honest take' : '30 Min · kein Verkaufsgespräch · ehrliche Einschätzung'}
            </p>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 3.1 }}
              className="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-white/45"
            >
              {h.trustChips.slice(0, 3).map((chip) => (
                <li key={chip} className="flex items-center gap-2">
                  <span aria-hidden className="h-px w-3 bg-white/30" />
                  {chip}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Hero-Conversion: Live-Callback-Karte */}
          <div className="w-full">
            <HeroCallbackCard />
          </div>
        </div>

        {/* Project-meta strip — Lusion case-study language */}
        <ScrollSlide delay={0} className="col-span-12">
          <dl className="mt-16 grid grid-cols-2 gap-y-6 border-y border-white/10 py-6 sm:grid-cols-5 sm:gap-x-6 md:mt-20">
            {[
              { k: 'Year', v: '2026' },
              { k: 'Type', v: en ? 'AI workshop' : 'KI-Werkstatt' },
              { k: 'Industry', v: en ? 'B2B · Sales' : 'B2B · Vertrieb' },
              { k: 'Stack', v: 'LangChain · n8n' },
              { k: 'Location', v: 'Wiesbaden, DE' },
            ].map(({ k, v }) => (
              <div key={k} className="flex flex-col gap-1">
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-white/35">
                  {k}
                </dt>
                <dd className="font-display text-[0.95rem] font-medium tracking-tight text-white">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </ScrollSlide>

        {/* Asymmetric stats */}
        <ScrollSlide direction="up" delay={0} className="col-span-12 mt-auto pt-16 md:pt-24">
          <div className="grid grid-cols-12 items-end gap-x-6 gap-y-8 border-t border-white/12 pt-8">
            <ScrollSlide delay={200} className="col-span-12 md:col-span-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(174_100%_50%)] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(174_100%_50%)]" />
                </span>
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-white/45">
                  {en ? 'Live · now' : 'Live · jetzt'}
                </span>
              </div>
              <div className="font-display text-[clamp(4.5rem,11vw,8.5rem)] font-medium leading-[0.85] tabular-nums tracking-[-0.04em] text-white">
                <LiveTicker base={1247} />
              </div>
              <div className="mt-3 font-mono text-[0.75rem] uppercase tracking-[0.24em] text-white/45">
                {en ? 'Tasks today · from 12+ agents in production' : 'Tasks heute · von 12+ Agenten in Produktion'}
              </div>
            </ScrollSlide>

            <ScrollSlide delay={300} className="col-span-12 md:col-span-6 md:col-start-7">
              <ul>
                {tickerKpis.map((s, i) => (
                  <motion.li
                    key={s.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 3.5 + i * 0.08 }}
                    className="flex items-baseline justify-between border-b border-white/8 py-2.5 font-mono text-[0.75rem] last:border-b-0"
                  >
                    <span className="uppercase tracking-[0.18em] text-white/45">
                      {en ? (LIVESTATS_EN[s.label] ?? s.label) : s.label}
                    </span>
                    <span className="font-display text-[1.05rem] tracking-tight text-white">
                      {s.value}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </ScrollSlide>
          </div>
        </ScrollSlide>
      </div>
    </section>
  );
}
