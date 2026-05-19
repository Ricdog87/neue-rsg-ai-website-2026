'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { roi, site } from '@/lib/content';
import { ScrollParallax } from '@/components/effects/scroll-parallax';
import { ScrollScale } from '@/components/effects/scroll-scale';
import { Magnetic } from '@/components/effects/magnetic';
import { BreakevenChart } from '@/components/sections/roi-breakeven';
import { TrendingDown, TrendingUp, Clock } from 'lucide-react';

const SAVINGS: Record<string, number> = {
  recruiting: 28000,
  marketing: 18000,
  accounting: 22000,
  sales: 35000,
  bd: 20000,
  support: 45000,
  consulting: 25000,
  it: 15000,
};

function useCountUp(target: number, durationMs = 900) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  useEffect(() => {
    const start = performance.now();
    const from = fromRef.current;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return value;
}

/**
 * Smart team-size picker.
 *
 * Replaces the generic range slider with a segmented control: four
 * realistic categories from Solo to Mittelstand. Clicking a segment
 * sets a sensible default for that band; a small +/- stepper lets
 * the customer fine-tune from there. Max realistic for the target
 * audience is 250 MA — beyond that we'd be talking enterprise sales,
 * not a self-service ROI calculator.
 */
const TEAM_SEGMENTS = [
  { id: 'solo',    label: 'Solo',         range: '1 MA',         defaultValue: 1,   min: 1,   max: 1   },
  { id: 'startup', label: 'Startup',      range: '2–10 MA',      defaultValue: 5,   min: 2,   max: 10  },
  { id: 'growth',  label: 'Wachstumsphase', range: '11–50 MA',   defaultValue: 25,  min: 11,  max: 50  },
  { id: 'mid',     label: 'Mittelstand',  range: '51–250 MA',    defaultValue: 100, min: 51,  max: 250 },
] as const;

type TeamSegment = (typeof TEAM_SEGMENTS)[number];

function segmentFor(n: number): TeamSegment {
  return TEAM_SEGMENTS.find((s) => n >= s.min && n <= s.max) ?? TEAM_SEGMENTS[TEAM_SEGMENTS.length - 1];
}

function TeamSizePicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const active = segmentFor(value);
  const stepDown = () => onChange(Math.max(active.min, value - (value > 50 ? 5 : 1)));
  const stepUp   = () => onChange(Math.min(active.max, value + (value >= 50 ? 5 : 1)));

  return (
    <div className="mt-6 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-medium text-[hsl(var(--fg))]">
          Wie groß ist dein Team?
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--neon))]">
          Startup → Mittelstand
        </p>
      </div>

      {/* Segment chips */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {TEAM_SEGMENTS.map((s) => {
          const isActive = s.id === active.id;
          return (
            <button
              key={s.id}
              onClick={() => onChange(s.defaultValue)}
              className={`group relative overflow-hidden rounded-xl border p-3 text-left transition-all duration-300 ${
                isActive
                  ? 'border-[hsl(var(--neon))] bg-[hsl(var(--neon))/8] shadow-[0_0_30px_-12px_hsl(174_100%_50%/0.7)]'
                  : 'border-[hsl(var(--border))] bg-white/[0.025] hover:border-white/25 hover:bg-white/[0.04]'
              }`}
            >
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
                  isActive ? 'text-[hsl(var(--neon))]' : 'text-[hsl(var(--muted))]'
                }`}
              >
                {s.label}
              </span>
              <span className="mt-1 block text-sm font-semibold text-[hsl(var(--fg))]">
                {s.range}
              </span>
            </button>
          );
        })}
      </div>

      {/* Fine-tune stepper */}
      <div className="mt-5 flex items-center justify-between rounded-xl border border-[hsl(var(--border))] bg-white/[0.025] px-4 py-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--muted))]">
            Genau · feinjustieren
          </p>
          <p className="mt-0.5 flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-[hsl(var(--neon))]">
              {value}
            </span>
            <span className="text-sm text-[hsl(var(--muted))]">
              {value === 1 ? 'Mitarbeiter' : 'Mitarbeiter · ' + active.label}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={stepDown}
            disabled={value <= active.min}
            aria-label="Weniger"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-lg font-bold text-[hsl(var(--fg))] transition hover:border-[hsl(var(--neon))/40] hover:bg-[hsl(var(--neon))/8] disabled:opacity-30"
          >
            −
          </button>
          <button
            onClick={stepUp}
            disabled={value >= active.max}
            aria-label="Mehr"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-lg font-bold text-[hsl(var(--fg))] transition hover:border-[hsl(var(--neon))/40] hover:bg-[hsl(var(--neon))/8] disabled:opacity-30"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export function RoiSection() {
  const [selected, setSelected] = useState<string[]>([]);
  const [employees, setEmployees] = useState(20);

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const savingsPerYear = selected.reduce((sum, id) => sum + (SAVINGS[id] ?? 0), 0);
  const scaledSavings = Math.round((savingsPerYear * Math.max(1, employees / 20)) / 1000) * 1000;
  const roiMonths = scaledSavings > 0 ? Math.max(1, Math.round((5000 / scaledSavings) * 12)) : 0;
  // Tangibles: how many of each "thing" the savings buy
  const equivalents = roi.visual.equivalents
    .filter((e) => scaledSavings >= e.threshold)
    .slice(0, 3)
    .map((e) => ({ ...e, count: Math.max(1, Math.round(scaledSavings / e.divisor)) }));

  // Live €-lost ticker
  const perSecond = scaledSavings > 0 ? scaledSavings / (365 * 8 * 3600) : 0;
  const [lostSinceLoad, setLostSinceLoad] = useState(0);
  useEffect(() => {
    if (scaledSavings === 0) {
      setLostSinceLoad(0);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      setLostSinceLoad(((now - start) / 1000) * perSecond);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [perSecond, scaledSavings]);

  const animatedSavings = useCountUp(scaledSavings, 900);
  const animatedMonths = useCountUp(roiMonths, 700);

  return (
    <section
      id="roi"
      className="relative overflow-hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/82 backdrop-blur-[2px] px-6 py-24 md:py-32 lg:px-10"
    >
      {/* Subtle indigo wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-[600px] w-[600px] -translate-y-1/2 rounded-full opacity-30 blur-[140px]"
        style={{ background: 'radial-gradient(circle, hsl(255 71% 37% / 0.10), transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-5">
            <span className="eyebrow">{roi.eyebrow}</span>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[hsl(var(--fg))]">
              {roi.headline}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-2">
            <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">{roi.subline}</p>
            <p className="mt-3 font-mono text-[0.75rem] text-[hsl(var(--subtle))]">{roi.hint}</p>
          </div>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Department picker */}
          <div className="space-y-3 lg:col-span-3">
            <p className="mb-4 text-sm font-medium">
              Welche Abteilungen sollen automatisiert werden?
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {roi.departments.map((dept) => {
                const active = selected.includes(dept.id);
                return (
                  <button
                    key={dept.id}
                    onClick={() => toggle(dept.id)}
                    className={`group relative overflow-hidden rounded-xl border p-4 text-left transition-all duration-300 ${
                      active
                        ? 'border-[hsl(var(--neon))] bg-[hsl(var(--neon))/8] shadow-[0_0_30px_-10px_hsl(174_100%_50%/0.6)]'
                        : 'border-[hsl(var(--border))] bg-[hsl(var(--surface))] hover:border-white/25 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{dept.label}</span>
                      {active ? (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(var(--neon))] text-[10px] font-bold text-black">
                          ✓
                        </span>
                      ) : (
                        <span className="h-5 w-5 rounded-full border border-[hsl(var(--border-strong))]" />
                      )}
                    </div>
                    <p className="mt-1.5 text-xs text-[hsl(var(--muted))]">{dept.body}</p>
                    {'pain' in dept && (dept as { pain?: string }).pain && (
                      <p className="mt-2 flex items-center gap-1.5 text-[11px] italic text-[hsl(var(--accent))]/85">
                        <TrendingDown className="h-3 w-3 shrink-0" />
                        {(dept as { pain: string }).pain}
                      </p>
                    )}
                    {SAVINGS[dept.id] && (
                      <p className="mt-2 font-mono text-xs text-[hsl(var(--accent))]">
                        Ø {SAVINGS[dept.id].toLocaleString('de-DE')} €/Jahr Ersparnis
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            <TeamSizePicker value={employees} onChange={setEmployees} />
          </div>

          {/* Result panel */}
          <ScrollScale from={0.92} to={1.02} out={1} className="lg:col-span-2">
            <div
              className="relative h-full overflow-hidden rounded-3xl border border-[hsl(var(--accent))/30] p-8"
              style={{
                background:
                  'linear-gradient(155deg, hsl(255 71% 18% / 0.55) 0%, hsl(240 12% 6%) 55%, hsl(240 14% 3%) 100%)',
                boxShadow:
                  '0 40px 100px -30px hsl(255 71% 37% / 0.45), inset 0 1px 0 hsl(0 0% 100% / 0.06)',
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, hsl(var(--fg)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--fg)) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              <div className="relative flex h-full flex-col gap-6">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[hsl(var(--neon))] opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--neon))]" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[hsl(var(--neon))]">
                    Live · {roi.result.savingsLabel}
                  </span>
                </div>

                <div>
                  <ScrollParallax y={-12}>
                    <div className="flex items-baseline gap-2">
                      <span
                        className="font-display text-[clamp(4.5rem,11vw,8rem)] font-bold leading-[0.85] tracking-tight text-[hsl(var(--neon))]"
                        style={{ textShadow: '0 0 60px hsl(255 71% 37% / 0.6)' }}
                      >
                        {scaledSavings > 0 ? `${Math.round(animatedSavings / 1000)}K` : '—'}
                      </span>
                      <span className="font-display text-4xl font-bold text-[hsl(var(--neon))] md:text-5xl">
                        €
                      </span>
                    </div>
                  </ScrollParallax>
                  <p className="mt-2 text-sm text-[hsl(var(--muted))]">{roi.result.perYear}</p>
                </div>

                {roiMonths > 0 && (
                  <div className="flex items-center gap-3 rounded-2xl border border-[hsl(var(--accent))/30] bg-[hsl(var(--accent))/8] p-4">
                    <Clock className="h-5 w-5 shrink-0 text-[hsl(var(--accent))]" />
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[hsl(var(--accent))]">
                        {roi.result.roiLabel}
                      </p>
                      <p className="mt-0.5 font-display text-3xl font-bold text-[hsl(var(--fg))]">
                        {animatedMonths} {animatedMonths === 1 ? 'Monat' : 'Monate'}
                      </p>
                    </div>
                  </div>
                )}

                {scaledSavings > 0 && (
                  <div className="rounded-2xl border border-red-500/30 bg-red-500/[0.06] p-4">
                    <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-red-400">
                      <TrendingUp className="h-3 w-3 rotate-180" />
                      Verloren, seit du diese Sektion offen hast
                    </p>
                    <p className="mt-1.5 font-mono text-2xl font-bold text-red-400">
                      {lostSinceLoad.toLocaleString('de-DE', { maximumFractionDigits: 2 })} €
                    </p>
                  </div>
                )}

                {selected.length === 0 && (
                  <p className="text-sm italic text-[hsl(var(--muted))]">{roi.result.empty}</p>
                )}

                <Magnetic strength={0.22}>
                  <a
                    href={site.cta.meetingUrl}
                    className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-[hsl(var(--neon))] px-6 py-4 text-sm font-bold text-black transition hover:opacity-90"
                    style={{ boxShadow: '0 20px 50px -10px hsl(255 71% 37% / 0.6)' }}
                  >
                    {roi.result.cta} →
                  </a>
                </Magnetic>
              </div>
            </div>
          </ScrollScale>
        </div>

        {/* ───── VISUAL STORY ROW — only renders when there's a selection ───── */}
        {scaledSavings > 0 && (
          <div className="mt-12 space-y-6">
            {/* HERO: The 8-hour work-day comparison — animated bars */}
            <div
              className="relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] p-8 md:p-10"
              style={{
                background:
                  'linear-gradient(155deg, hsl(255 71% 14% / 0.6) 0%, hsl(240 12% 6%) 60%, hsl(240 14% 3%) 100%)',
                boxShadow:
                  '0 40px 100px -30px hsl(255 71% 37% / 0.35), inset 0 1px 0 hsl(0 0% 100% / 0.05)',
              }}
            >
              {/* Soft purple bloom upper-right */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full opacity-50 blur-[120px]"
                style={{ background: 'radial-gradient(circle, hsl(255 71% 37% / 0.45), transparent 65%)' }}
              />
              <div className="relative grid gap-10 lg:grid-cols-[1.5fr_1fr]">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[hsl(var(--neon))]">
                    Dein Arbeitstag · in Echtzeit
                  </p>
                  <h3 className="mt-3 max-w-xl font-display text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[hsl(var(--fg))]">
                    8 Stunden.{' '}
                    <span className="font-accent italic text-[hsl(var(--neon))]">
                      5,4 davon
                    </span>{' '}
                    laufen ins Leere.
                  </h3>
                  <p className="mt-4 max-w-xl text-[0.95rem] leading-[1.6] text-[hsl(var(--muted))]">
                    McKinsey 2024: 68 % der Arbeitszeit fließen in Routine. Mit
                    einem KI-Agenten kippt das Verhältnis.
                  </p>

                  {/* HEUTE — animated bar */}
                  <AnimatedDayBar
                    label="Heute · ohne KI"
                    labelClass="text-red-400"
                    routinePct={68}
                    routineLabel="5,4h Routine"
                    sellingLabel="2,6h Verkaufen"
                    routineFill="linear-gradient(95deg, hsl(0 75% 60% / 0.95) 0%, hsl(8 80% 55% / 0.75) 100%)"
                    sellingFill="linear-gradient(95deg, hsl(240 12% 14%) 0%, hsl(255 71% 28% / 0.5) 100%)"
                    delay={0.1}
                    showCursor
                  />

                  {/* MIT KI — inverted */}
                  <AnimatedDayBar
                    className="mt-7"
                    label={
                      <span className="inline-flex items-center gap-1.5 text-[hsl(var(--neon))]">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[hsl(var(--neon))] opacity-60" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--neon))]" />
                        </span>
                        Mit RSG KI-Agent
                      </span>
                    }
                    labelClass="text-[hsl(var(--neon))]"
                    routinePct={20}
                    routineLabel="1,6h"
                    sellingLabel="6,4h Verkaufen · Wertschöpfung"
                    routineFill="linear-gradient(95deg, hsl(0 75% 60% / 0.7) 0%, hsl(0 75% 55% / 0.4) 100%)"
                    sellingFill="linear-gradient(95deg, hsl(255 71% 50%) 0%, hsl(220 90% 55%) 35%, hsl(174 100% 50%) 100%)"
                    sellingGlow
                    delay={0.55}
                  />
                </div>

                {/* Side panel — animated big numbers */}
                <div className="flex flex-col justify-center gap-6 lg:border-l lg:border-white/10 lg:pl-10">
                  <BigNumber
                    eyebrow="Pro Mitarbeiter gewonnen"
                    value={3.8}
                    suffix="h"
                    decimals={1}
                    sub="Verkaufszeit · jeden Tag"
                    color="hsl(var(--neon))"
                    glow="0 0 50px hsl(174 100% 50% / 0.45)"
                  />
                  <div className="border-t border-white/10 pt-6">
                    <BigNumber
                      eyebrow={`Im Team (${employees} MA) gewonnen`}
                      value={Math.round(employees * 3.8 * 20)}
                      suffix="h"
                      sub="Wertschöpfungs-Stunden pro Monat"
                      size="md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* BREAK-EVEN: Investment vs. Output — senior BD framing */}
            <BreakevenChart scaledSavings={scaledSavings} />

            {/* THIRD ROW: 5-Year projection + tangibles */}
            <div className="grid gap-6 lg:grid-cols-12">
              {/* 5-Year projection */}
              <div
                className="relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] p-8 lg:col-span-7"
                style={{
                  background:
                    'linear-gradient(155deg, hsl(255 71% 18% / 0.5) 0%, hsl(240 12% 6%) 60%, hsl(240 14% 3%) 100%)',
                  boxShadow: '0 30px 80px -30px hsl(255 71% 37% / 0.3)',
                }}
              >
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--muted))]">
                  {roi.visual.projectionLabel}
                </p>
                <h3 className="mt-3 font-display text-[clamp(1.5rem,2.5vw,2.25rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[hsl(var(--fg))]">
                  In 5 Jahren holst du dir{' '}
                  <span
                    className="text-[hsl(var(--neon))]"
                    style={{ textShadow: '0 0 30px hsl(174 100% 50% / 0.5)' }}
                  >
                    {Math.round((scaledSavings * 5) / 1000)}K €
                  </span>{' '}
                  zurück.
                </h3>

                <div className="mt-10 flex items-end gap-3 md:gap-4" style={{ minHeight: 240 }}>
                  {roi.visual.projectionYears.map((y, i) => {
                    const cumulative = scaledSavings * y;
                    const heightPct = (y / roi.visual.projectionYears.length) * 100;
                    return (
                      <div key={y} className="flex flex-1 flex-col items-center gap-3">
                        <motion.span
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                          className="font-display text-[1.05rem] font-medium tracking-tight text-[hsl(var(--fg))] md:text-[1.25rem]"
                        >
                          {Math.round(cumulative / 1000)}K
                        </motion.span>
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: `${Math.max(40, heightPct * 1.8)}px` }}
                          viewport={{ once: true, margin: '-40px' }}
                          transition={{
                            delay: 0.2 + i * 0.1,
                            duration: 0.9,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="w-full rounded-t-md"
                          style={{
                            background:
                              'linear-gradient(to top, hsl(255 71% 50% / 0.9), hsl(174 100% 50% / 0.65))',
                            boxShadow:
                              '0 0 30px hsl(255 71% 37% / 0.45), inset 0 1px 0 hsl(0 0% 100% / 0.15)',
                          }}
                        />
                        <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--muted))]">
                          Jahr {y}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tangibles */}
              {equivalents.length > 0 && (
                <div
                  className="relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] p-8 lg:col-span-5"
                  style={{
                    background:
                      'linear-gradient(155deg, hsl(255 71% 14% / 0.4) 0%, hsl(240 12% 6%) 60%, hsl(240 14% 3%) 100%)',
                    boxShadow: '0 30px 80px -30px hsl(255 71% 37% / 0.25)',
                  }}
                >
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--muted))]">
                    Was {Math.round(animatedSavings / 1000)}K € pro Jahr bedeuten
                  </p>
                  <h3 className="mt-3 font-display text-[clamp(1.5rem,2.5vw,2rem)] font-medium leading-tight tracking-tight text-[hsl(var(--fg))]">
                    Was du dafür{' '}
                    <span className="font-accent italic text-[hsl(var(--accent))]">
                      wirklich
                    </span>{' '}
                    kaufen kannst.
                  </h3>
                  <ul className="mt-6 space-y-3">
                    {equivalents.map((eq, i) => (
                      <motion.li
                        key={eq.label}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                        className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4 transition-colors hover:border-[hsl(var(--accent))/40] hover:bg-white/[0.05]"
                      >
                        <span className="text-3xl">{eq.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2">
                            <span
                              className="font-display text-[2.5rem] font-medium leading-none tracking-tight text-[hsl(var(--accent))]"
                              style={{ textShadow: '0 0 25px hsl(271 91% 65% / 0.4)' }}
                            >
                              {eq.count}
                            </span>
                            <span className="text-xs font-bold text-[hsl(var(--accent))]/70">×</span>
                          </div>
                          <span className="mt-0.5 block text-[0.875rem] font-medium text-[hsl(var(--fg))]">
                            {eq.label}
                          </span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Helpers — animated bar & animated big number
   ───────────────────────────────────────────────────────── */

function AnimatedDayBar({
  label,
  labelClass = '',
  routinePct,
  routineLabel,
  sellingLabel,
  routineFill,
  sellingFill,
  sellingGlow = false,
  showCursor = false,
  delay = 0,
  className = '',
}: {
  label: React.ReactNode;
  labelClass?: string;
  routinePct: number;
  routineLabel: string;
  sellingLabel: string;
  routineFill: string;
  sellingFill: string;
  sellingGlow?: boolean;
  showCursor?: boolean;
  delay?: number;
  className?: string;
}) {
  const sellingPct = 100 - routinePct;
  return (
    <div className={'mt-8 ' + className}>
      <div className="mb-2 flex items-baseline justify-between">
        <span
          className={
            'font-mono text-[0.6875rem] uppercase tracking-[0.22em] ' + labelClass
          }
        >
          {label}
        </span>
        <span className="font-mono text-[0.75rem] text-[hsl(var(--muted))]">8h Tag</span>
      </div>
      <div className="relative flex h-14 overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${routinePct}%` }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
          className="relative flex items-center justify-start overflow-hidden whitespace-nowrap pl-4 font-mono text-[0.7rem] font-bold uppercase tracking-wider text-white/95"
          style={{ background: routineFill }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.5, duration: 0.5 }}
          >
            {routineLabel}
          </motion.span>
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${sellingPct}%` }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: delay + 0.15 }}
          className="relative flex items-center justify-end overflow-hidden whitespace-nowrap pr-4 font-mono text-[0.7rem] font-bold uppercase tracking-wider text-white/95"
          style={{
            background: sellingFill,
            boxShadow: sellingGlow
              ? '0 0 40px hsl(174 100% 50% / 0.35) inset, 0 0 30px hsl(255 71% 37% / 0.25)'
              : undefined,
          }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.65, duration: 0.5 }}
          >
            {sellingLabel}
          </motion.span>
        </motion.div>
        {showCursor && (
          <motion.div
            aria-hidden
            initial={{ left: '0%' }}
            animate={{ left: ['0%', '100%'] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'linear', delay: delay + 1.2 }}
            className="pointer-events-none absolute top-0 h-full w-px"
            style={{
              background:
                'linear-gradient(to bottom, transparent 0%, hsl(174 100% 50% / 0.8) 50%, transparent 100%)',
              boxShadow: '0 0 14px hsl(174 100% 50% / 0.7)',
            }}
          />
        )}
      </div>
      <div className="mt-1.5 flex justify-between font-mono text-[0.625rem] tracking-wider text-[hsl(var(--subtle))]">
        <span>09:00</span>
        <span>11:00</span>
        <span>13:00</span>
        <span>15:00</span>
        <span>17:00</span>
      </div>
    </div>
  );
}

function BigNumber({
  eyebrow,
  value,
  suffix = '',
  decimals = 0,
  sub,
  color = 'hsl(var(--fg))',
  glow,
  size = 'lg',
}: {
  eyebrow: string;
  value: number;
  suffix?: string;
  decimals?: number;
  sub: string;
  color?: string;
  glow?: string;
  size?: 'md' | 'lg';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / 1400, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            setV(ease * value);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  const display = v.toLocaleString('de-DE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <div ref={ref}>
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--muted))]">
        {eyebrow}
      </p>
      <p
        className={
          'mt-2 font-display font-medium leading-none tabular-nums tracking-tight ' +
          (size === 'lg' ? 'text-[clamp(3rem,5vw,4.5rem)]' : 'text-[clamp(2rem,3.5vw,2.75rem)]')
        }
        style={{ color, textShadow: glow }}
      >
        {display}
        {suffix}
      </p>
      <p className="mt-2 text-[0.8rem] text-[hsl(var(--muted))]">{sub}</p>
    </div>
  );
}
