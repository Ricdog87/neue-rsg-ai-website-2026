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
/**
 * REC-timecode — Lusion-style technical indicator. Ticks up every 40ms
 * to simulate a film/session timer in the top right of the hero rail.
 * Format: HH:MM:SS:FF (frames @ 25fps), monospaced & tabular.
 */
function RecTime() {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setT((v) => v + 1), 40);
    return () => window.clearInterval(id);
  }, []);
  const frames = t % 25;
  const totalSec = Math.floor(t / 25);
  const ss = (totalSec % 60).toString().padStart(2, '0');
  const mm = (Math.floor(totalSec / 60) % 60).toString().padStart(2, '0');
  const hh = Math.floor(totalSec / 3600).toString().padStart(2, '0');
  const ff = frames.toString().padStart(2, '0');
  return (
    <span className="tabular-nums tracking-[0.18em] text-white/55">
      REC {hh}:{mm}:{ss}:{ff}
    </span>
  );
}

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

      {/* Hairline editorial grid overlay — Lusion-style technical texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '88px 88px',
          maskImage:
            'radial-gradient(ellipse at center, black 25%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 25%, transparent 75%)',
        }}
      />

      <div
        className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1280px] grid-cols-12 gap-x-6 px-6 pt-[120px] pb-14 lg:px-10 lg:pt-[180px] lg:pb-24"
      >
        {/* ── Top rail — editorial masthead with scanning indicator + REC timestamp ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 1.8 }}
          className="col-span-12 mb-12 flex items-center gap-4 md:mb-16"
        >
          <span
            aria-hidden
            className="relative inline-flex h-px w-12 overflow-hidden bg-white/15"
          >
            <span className="hero-scan-line absolute inset-y-0 h-px w-4 bg-[hsl(174_100%_60%)]" />
          </span>
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(174_100%_50%)] opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(174_100%_50%)]" />
          </span>
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-white/70">
            {h.eyebrow}
          </span>
          <span className="ml-auto hidden items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-white/40 md:inline-flex">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-red-400/80 shadow-[0_0_8px_rgb(248_113_113/0.9)]" />
            <RecTime />
            <span aria-hidden className="h-px w-6 bg-white/15" />
            <span>№ 01 / WI ⇆ {en ? 'DE' : 'DE'}</span>
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
                  className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-[hsl(var(--accent))] px-7 font-display text-[0.9rem] font-semibold text-white shadow-[0_14px_44px_-12px_hsl(var(--accent)/0.75)] transition-all hover:shadow-[0_18px_56px_-12px_hsl(var(--accent)/0.9)]"
                >
                  {/* Gradient sweep — slides in from left on hover */}
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[hsl(var(--accent))] via-[hsl(220_85%_65%)] to-[hsl(174_100%_50%)] transition-transform duration-500 group-hover:translate-x-0"
                  />
                  {/* Hairline corner brackets (top-left + bottom-right) */}
                  <span aria-hidden className="absolute left-2 top-1.5 h-1.5 w-1.5 border-l border-t border-white/35 transition-opacity duration-300 group-hover:opacity-0" />
                  <span aria-hidden className="absolute bottom-1.5 right-2 h-1.5 w-1.5 border-b border-r border-white/35 transition-opacity duration-300 group-hover:opacity-0" />
                  <span className="relative z-10">{h.ctaPrimary}</span>
                  <ArrowUpRight className="relative z-10 h-4 w-4 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Magnetic>
              <Magnetic strength={0.12} radius={80}>
                <a
                  /* EN-Homepage hat keine #voice-Sektion → dort zur
                     Telefonassistent-Seite mit Live-Console verlinken. */
                  href={en ? '/en/ki-telefonassistent' : '#voice'}
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
              className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-white/55"
            >
              {h.trustChips.slice(0, 3).map((chip, i) => (
                <motion.li
                  key={chip}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  transition={{ duration: 0.6, delay: 3.2 + i * 0.12, ease: EASE }}
                  className="group flex items-center gap-2 whitespace-nowrap transition-colors hover:text-white/85"
                >
                  <span aria-hidden className="relative inline-flex h-px w-4 overflow-hidden bg-white/20">
                    <span className="absolute inset-y-0 h-px w-1.5 bg-[hsl(174_100%_60%)] transition-all duration-500 group-hover:w-full" />
                  </span>
                  {chip}
                </motion.li>
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
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-white/55">
                  {en ? 'Live · now' : 'Live · jetzt'}
                </span>
                <span aria-hidden className="ml-1 h-px flex-1 bg-white/10" />
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-white/30">
                  T+24H
                </span>
              </div>
              {/* Huge KPI in a technical viewfinder frame */}
              <div className="relative inline-block">
                {/* Corner brackets — top-left + bottom-right */}
                <span aria-hidden className="absolute -left-3 -top-3 h-4 w-4 border-l border-t border-[hsl(174_100%_50%/0.45)]" />
                <span aria-hidden className="absolute -right-3 -bottom-3 h-4 w-4 border-b border-r border-[hsl(174_100%_50%/0.45)]" />
                <div className="font-display text-[clamp(4.5rem,11vw,8.5rem)] font-medium leading-[0.85] tabular-nums tracking-[-0.04em] text-white">
                  <LiveTicker base={1247} />
                </div>
                {/* Scanning underline */}
                <span aria-hidden className="mt-3 block h-px w-full overflow-hidden bg-white/10">
                  <span className="hero-scan-line block h-px w-1/4 bg-[hsl(174_100%_60%)]" />
                </span>
              </div>
              <div className="mt-4 font-mono text-[0.75rem] uppercase tracking-[0.24em] text-white/55">
                {en ? 'Tasks today · from 12+ agents in production' : 'Tasks heute · von 12+ Agenten in Produktion'}
              </div>
            </ScrollSlide>

            <ScrollSlide delay={300} className="col-span-12 md:col-span-6 md:col-start-7">
              <ul className="relative">
                {/* Scanning hairline at left edge of the whole list */}
                <span aria-hidden className="absolute -left-2 top-0 bottom-0 w-px overflow-hidden bg-white/10">
                  <span className="hero-scan-vert absolute left-0 h-12 w-px bg-[hsl(174_100%_60%)]" />
                </span>
                {tickerKpis.map((s, i) => (
                  <motion.li
                    key={s.label}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 3.5 + i * 0.08 }}
                    className="group flex items-baseline justify-between border-b border-white/8 py-2.5 pl-4 font-mono text-[0.75rem] transition-colors last:border-b-0 hover:bg-white/[0.015]"
                  >
                    <span className="flex items-center gap-2 uppercase tracking-[0.18em] text-white/50">
                      <span aria-hidden className="h-px w-2 bg-white/25 transition-all duration-300 group-hover:w-4 group-hover:bg-[hsl(174_100%_60%)]" />
                      {en ? (LIVESTATS_EN[s.label] ?? s.label) : s.label}
                    </span>
                    <span className="font-display text-[1.05rem] tabular-nums tracking-tight text-white">
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
