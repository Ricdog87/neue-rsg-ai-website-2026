'use client';

import { useEffect, useRef, useState } from 'react';
import { roi, site } from '@/lib/content';
import { ScrollParallax } from '@/components/effects/scroll-parallax';
import { ScrollScale } from '@/components/effects/scroll-scale';
import { Magnetic } from '@/components/effects/magnetic';
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

export function RoiSection() {
  const [selected, setSelected] = useState<string[]>([]);
  const [employees, setEmployees] = useState(20);

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const savingsPerYear = selected.reduce((sum, id) => sum + (SAVINGS[id] ?? 0), 0);
  const scaledSavings = Math.round((savingsPerYear * Math.max(1, employees / 20)) / 1000) * 1000;
  const roiMonths = scaledSavings > 0 ? Math.max(1, Math.round((5000 / scaledSavings) * 12)) : 0;
  const monthlyHours = scaledSavings > 0 ? Math.round(scaledSavings / roi.visual.hourlyRate / 12) : 0;

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
  const animatedHours = useCountUp(monthlyHours, 700);

  // Bar comparison: manual cost vs cost with AI (savings = 70 % cut)
  const aiPercent = scaledSavings > 0 ? 30 : 100; // % bar of "with AI"

  return (
    <section
      id="roi"
      className="relative overflow-hidden border-t border-white/5 bg-[hsl(var(--bg))] px-6 py-24 md:py-32"
    >
      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-[600px] w-[600px] -translate-y-1/2 rounded-full opacity-40 blur-[120px]"
        style={{ background: 'radial-gradient(circle, hsl(174 100% 50% / 0.45), transparent 65%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 bottom-0 h-[500px] w-[500px] rounded-full opacity-30 blur-[120px]"
        style={{ background: 'radial-gradient(circle, hsl(271 91% 65% / 0.5), transparent 65%)' }}
      />

      <div className="relative mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))]">
          {roi.eyebrow}
        </p>
        <ScrollParallax x={-8}>
          <h2 className="mt-4 font-display text-balance text-4xl tracking-tight md:text-6xl">
            {roi.headline}
          </h2>
        </ScrollParallax>
        <p className="mt-6 max-w-3xl text-base text-[hsl(var(--muted))] md:text-lg">{roi.subline}</p>
        <p className="mt-3 font-mono text-xs text-[hsl(var(--muted))]">{roi.hint}</p>

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
                        : 'border-white/8 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{dept.label}</span>
                      {active ? (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(var(--neon))] text-[10px] font-bold text-black">
                          ✓
                        </span>
                      ) : (
                        <span className="h-5 w-5 rounded-full border border-white/15" />
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

            <div className="mt-6 rounded-xl border border-white/8 bg-white/[0.02] p-4">
              <label className="mb-2 flex items-center justify-between text-sm">
                <span className="text-[hsl(var(--muted))]">Wie viele Mitarbeiter hast du?</span>
                <span className="font-mono font-semibold text-[hsl(var(--fg))]">{employees}</span>
              </label>
              <input
                type="range"
                min={5}
                max={500}
                step={5}
                value={employees}
                onChange={(e) => setEmployees(Number(e.target.value))}
                className="w-full accent-[hsl(var(--neon))]"
              />
              <div className="mt-1 flex justify-between font-mono text-[10px] text-[hsl(var(--muted))]">
                <span>5</span>
                <span>500+</span>
              </div>
            </div>
          </div>

          {/* Result panel */}
          <ScrollScale from={0.92} to={1.02} out={1} className="lg:col-span-2">
            <div
              className="relative h-full overflow-hidden rounded-3xl border border-[hsl(var(--neon))/30] p-8"
              style={{
                background:
                  'linear-gradient(155deg, hsl(174 100% 50% / 0.08) 0%, hsl(271 91% 65% / 0.06) 60%, hsl(240 14% 5%) 100%)',
                boxShadow:
                  '0 40px 100px -30px hsl(174 100% 50% / 0.35), inset 0 1px 0 hsl(0 0% 100% / 0.05)',
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
                        style={{ textShadow: '0 0 60px hsl(174 100% 50% / 0.6)' }}
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
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-[hsl(var(--neon))] px-6 py-4 text-sm font-bold text-black transition hover:opacity-90"
                    style={{ boxShadow: '0 20px 50px -10px hsl(174 100% 50% / 0.6)' }}
                  >
                    {roi.result.cta} →
                  </a>
                </Magnetic>
              </div>
            </div>
          </ScrollScale>
        </div>

        {/* ───── VISUAL ROW: only renders when there's a selection ───── */}
        {scaledSavings > 0 && (
          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            {/* Comparison bars: manual vs AI */}
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 lg:col-span-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[hsl(var(--muted))]">
                Vorher · Nachher
              </p>
              <h3 className="mt-2 font-display text-2xl tracking-tight md:text-3xl">
                So sieht dein Aufwand mit und ohne KI-Agent aus.
              </h3>

              <div className="mt-6 space-y-5">
                {/* Manual bar — full width, red */}
                <div>
                  <div className="mb-2 flex items-baseline justify-between">
                    <span className="text-sm font-medium text-[hsl(var(--fg))]">
                      {roi.visual.comparison.manualLabel}
                    </span>
                    <span className="font-mono text-sm font-semibold text-red-400">
                      100 %
                    </span>
                  </div>
                  <div className="relative h-6 overflow-hidden rounded-md bg-white/5">
                    <div
                      className="h-full rounded-md transition-all duration-700"
                      style={{
                        width: '100%',
                        background:
                          'linear-gradient(to right, hsl(0 75% 55% / 0.85), hsl(0 75% 55% / 0.55))',
                        boxShadow: '0 0 20px hsl(0 75% 55% / 0.4) inset',
                      }}
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-[hsl(var(--muted))]">
                    {roi.visual.comparison.manualHint}
                  </p>
                </div>

                {/* AI bar — small, neon */}
                <div>
                  <div className="mb-2 flex items-baseline justify-between">
                    <span className="text-sm font-medium text-[hsl(var(--fg))]">
                      {roi.visual.comparison.aiLabel}
                    </span>
                    <span className="font-mono text-sm font-semibold text-[hsl(var(--neon))]">
                      {aiPercent} %
                    </span>
                  </div>
                  <div className="relative h-6 overflow-hidden rounded-md bg-white/5">
                    <div
                      className="h-full rounded-md transition-all duration-700"
                      style={{
                        width: `${aiPercent}%`,
                        background:
                          'linear-gradient(to right, hsl(174 100% 50% / 0.95), hsl(174 100% 50% / 0.65))',
                        boxShadow: '0 0 25px hsl(174 100% 50% / 0.6) inset',
                      }}
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-[hsl(var(--muted))]">
                    {roi.visual.comparison.aiHint}
                  </p>
                </div>

                {/* Reduction badge */}
                <div className="flex items-center justify-between rounded-lg border border-[hsl(var(--neon))/25] bg-[hsl(var(--neon))/8] px-4 py-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--neon))]">
                    {roi.visual.comparison.reductionLabel}
                  </span>
                  <span className="font-display text-3xl font-bold text-[hsl(var(--neon))]">
                    -{100 - aiPercent} %
                  </span>
                </div>
              </div>

              {/* Hours regained */}
              <div className="mt-7 border-t border-white/8 pt-6">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[hsl(var(--muted))]">
                    {roi.visual.timeLabel}
                  </span>
                  <span className="font-display text-3xl font-bold text-[hsl(var(--fg))]">
                    {animatedHours}h
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-12 gap-1">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const filled = i < Math.min(12, Math.round(monthlyHours / 20));
                    return (
                      <div
                        // eslint-disable-next-line react/no-array-index-key
                        key={i}
                        className="h-8 rounded-sm transition-colors"
                        style={{
                          background: filled
                            ? 'linear-gradient(to top, hsl(174 100% 50% / 0.85), hsl(174 100% 50% / 0.4))'
                            : 'hsl(0 0% 100% / 0.04)',
                          boxShadow: filled ? '0 0 12px hsl(174 100% 50% / 0.4) inset' : 'none',
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right column: 5-yr projection + tangibles */}
            <div className="space-y-6 lg:col-span-5">
              {/* 5-year cumulative bars */}
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[hsl(var(--muted))]">
                  {roi.visual.projectionLabel}
                </p>
                <div className="mt-4 flex items-end gap-2">
                  {roi.visual.projectionYears.map((y) => {
                    const cumulative = scaledSavings * y;
                    const heightPct = (y / roi.visual.projectionYears.length) * 100;
                    return (
                      <div key={y} className="flex flex-1 flex-col items-center gap-2">
                        <span className="font-mono text-[10px] text-[hsl(var(--neon))]">
                          {Math.round(cumulative / 1000)}K
                        </span>
                        <div
                          className="w-full rounded-t-md transition-all duration-700"
                          style={{
                            height: `${Math.max(20, heightPct * 1.4)}px`,
                            background:
                              'linear-gradient(to top, hsl(271 91% 65% / 0.9), hsl(174 100% 50% / 0.7))',
                            boxShadow: '0 0 20px hsl(271 91% 65% / 0.35)',
                          }}
                        />
                        <span className="font-mono text-[10px] text-[hsl(var(--muted))]">
                          J{y}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-4 text-xs text-[hsl(var(--muted))]">
                  Über 5 Jahre:{' '}
                  <span className="font-mono font-bold text-[hsl(var(--neon))]">
                    {Math.round((scaledSavings * 5) / 1000)}K €
                  </span>{' '}
                  zurück in dein Unternehmen.
                </p>
              </div>

              {/* What can you DO with the savings */}
              {equivalents.length > 0 && (
                <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[hsl(var(--muted))]">
                    Was du mit der Ersparnis machen kannst
                  </p>
                  <ul className="mt-4 space-y-3">
                    {equivalents.map((eq) => (
                      <li
                        key={eq.label}
                        className="flex items-center gap-4 rounded-lg border border-white/6 bg-white/[0.02] px-4 py-3"
                      >
                        <span className="text-2xl">{eq.icon}</span>
                        <div className="flex-1">
                          <span className="font-mono text-2xl font-bold text-[hsl(var(--accent))]">
                            {eq.count}×
                          </span>{' '}
                          <span className="text-sm text-[hsl(var(--fg))]">{eq.label}</span>
                        </div>
                      </li>
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
