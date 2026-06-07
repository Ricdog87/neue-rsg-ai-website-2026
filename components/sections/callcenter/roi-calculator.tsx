'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, PhoneIncoming, PhoneOutgoing, Phone } from 'lucide-react';
import { site } from '@/lib/content';
import {
  CALC_DEFAULTS,
  CALC_CONSTANTS,
  INDUSTRIES,
  priceFor,
  recommendTariff,
  type Mode,
} from '@/lib/callcenter';
import { useTerm, TermSwitch } from '@/components/sections/callcenter/provider';

const fmtEur = (n: number) => Math.round(n).toLocaleString('de-DE') + ' €';

/** Count toward target whenever it changes (eased). */
function useCountUp(target: number, ms = 700) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const e = 1 - Math.pow(1 - t, 3);
      setValue(a + (target - a) * e);
      if (t < 1) raf = requestAnimationFrame(tick);
      else from.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return value;
}

const MODES: { id: Mode; label: string; Icon: typeof Phone }[] = [
  { id: 'inbound', label: 'Inbound', Icon: PhoneIncoming },
  { id: 'outbound', label: 'Outbound', Icon: PhoneOutgoing },
  { id: 'both', label: 'Beides', Icon: Phone },
];

export function CallcenterRoiCalculator() {
  const { term } = useTerm();

  const [calls, setCalls] = useState(CALC_DEFAULTS.callsPerDay);
  const [mode, setMode] = useState<Mode>(CALC_DEFAULTS.mode);
  const [missed, setMissed] = useState(CALC_DEFAULTS.missedPct);
  const [orderValue, setOrderValue] = useState(CALC_DEFAULTS.orderValue);
  const [industryId, setIndustryId] = useState(CALC_DEFAULTS.industryId);
  const [advanced, setAdvanced] = useState(false);
  const [duration, setDuration] = useState(CALC_DEFAULTS.durationMin);
  const [closeRate, setCloseRate] = useState(CALC_DEFAULTS.closeRatePct);
  const [agentCost, setAgentCost] = useState(CALC_DEFAULTS.agentCost);

  // Picking an industry seeds a sensible default order value (only texts/defaults).
  function pickIndustry(id: string) {
    setIndustryId(id);
    const ind = INDUSTRIES.find((i) => i.id === id);
    if (ind) setOrderValue(ind.orderValue);
  }

  const r = useMemo(() => {
    const callsMonth = calls * CALC_CONSTANTS.workdays;
    const minutesMonth = callsMonth * duration;
    const fte = Math.max(1, Math.ceil(callsMonth / CALC_CONSTANTS.minutesPerFte));
    const humanCost = fte * agentCost;
    const missedCalls = callsMonth * (missed / 100);
    const wonRevenue = missedCalls * (closeRate / 100) * orderValue;

    const tariff = recommendTariff(minutesMonth);
    const { monthly, setup } = priceFor(tariff, term);

    const costSaving = humanCost - monthly;
    const totalGain = costSaving + wonRevenue;
    const roi = monthly > 0 ? (totalGain / monthly) * 100 : 0;
    const paybackWeeks = setup > 0 && totalGain > 0 ? (setup / totalGain) * (52 / 12) : 0;

    return { callsMonth, minutesMonth, humanCost, wonRevenue, tariff, monthly, setup, totalGain, roi, paybackWeeks };
  }, [calls, missed, orderValue, duration, closeRate, agentCost, term]);

  const lost = useCountUp(r.wonRevenue);
  const human = useCountUp(r.humanCost);
  const price = useCountUp(r.monthly);
  const gain = useCountUp(r.totalGain);
  const roi = useCountUp(r.roi);

  const wonLabel =
    mode === 'inbound'
      ? 'aus verpassten Anrufen'
      : mode === 'outbound'
        ? 'aus proaktiven Rückrufen'
        : 'aus verpassten Anrufen & Rückrufen';

  return (
    <section
      id="rechner"
      className="relative scroll-mt-24 border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/85 px-6 py-20 backdrop-blur-[2px] md:py-28 lg:px-10"
    >
      <div className="relative mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">ROI-Rechner</span>
          <h2 className="mt-6 font-display text-[clamp(1.875rem,4vw,3rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
            Rechne nach, was dich verpasste Anrufe{' '}
            <span className="text-[hsl(var(--success))]">wirklich kosten</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[0.975rem] leading-[1.6] text-[hsl(var(--muted))]">
            Stell deine Eckdaten ein — wir rechnen live gegen, was ein KI-Callcenter
            dir pro Monat bringt. Konservative Schätzung, keine Zusage.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* ── Inputs ── */}
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 md:p-8">
            <Slider label="Anrufe pro Tag" value={calls} display={`${calls}`} min={5} max={300} step={5} onChange={setCalls} />

            <div className="mt-7">
              <Label>Modus</Label>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {MODES.map(({ id, label, Icon }) => {
                  const active = id === mode;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setMode(id)}
                      className={
                        'flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-[0.85rem] font-medium transition-all ' +
                        (active
                          ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent))/12] text-[hsl(var(--fg))]'
                          : 'border-[hsl(var(--border))] bg-[hsl(var(--bg))] text-[hsl(var(--muted))] hover:border-[hsl(var(--accent))/50]')
                      }
                    >
                      <Icon className="h-4 w-4" /> {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-7">
              <Slider label="Aktuell verpasste Anrufe" value={missed} display={`${missed} %`} min={0} max={90} step={5} onChange={setMissed} />
            </div>
            <div className="mt-7">
              <Slider label="Ø Wert eines Auftrags / Leads" value={orderValue} display={fmtEur(orderValue)} min={50} max={5000} step={50} onChange={setOrderValue} />
            </div>

            <div className="mt-7">
              <Label>Branche</Label>
              <div className="relative mt-3">
                <select
                  value={industryId}
                  onChange={(e) => pickIndustry(e.target.value)}
                  aria-label="Branche"
                  className="w-full appearance-none rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--bg))] px-4 py-3 pr-10 text-[0.9rem] text-[hsl(var(--fg))] outline-none transition-colors focus:border-[hsl(var(--accent))]"
                >
                  {INDUSTRIES.map((i) => (
                    <option key={i.id} value={i.id} className="bg-[hsl(var(--bg))]">
                      {i.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--subtle))]" />
              </div>
            </div>

            {/* Advanced assumptions */}
            <button
              type="button"
              onClick={() => setAdvanced((v) => !v)}
              className="mt-7 flex w-full items-center justify-between border-t border-[hsl(var(--border))] pt-5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--subtle))] transition-colors hover:text-[hsl(var(--fg))]"
            >
              Erweiterte Annahmen
              <ChevronDown className={'h-4 w-4 transition-transform ' + (advanced ? 'rotate-180' : '')} />
            </button>
            {advanced && (
              <div className="mt-6 space-y-7">
                <Slider label="Ø Gesprächsdauer" value={duration} display={`${duration} Min`} min={1} max={15} step={1} onChange={setDuration} />
                <Slider label="Abschlussquote" value={closeRate} display={`${closeRate} %`} min={1} max={60} step={1} onChange={setCloseRate} />
                <Slider label="Vollkosten menschl. Agent" value={agentCost} display={`${fmtEur(agentCost)}/Mon`} min={1500} max={6000} step={100} onChange={setAgentCost} />
              </div>
            )}
          </div>

          {/* ── Output ── */}
          <div className="flex flex-col gap-3">
            <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 md:p-8">
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
                  Laufzeit
                </span>
                <TermSwitch />
              </div>

              {/* Lost revenue — red */}
              <div className="rounded-xl border border-red-500/25 bg-red-500/[0.06] p-5">
                <div className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-red-300/90">
                  Potenziell entgangener Umsatz · pro Monat
                </div>
                <div className="mt-1.5 font-display text-[clamp(2rem,5vw,2.75rem)] font-medium leading-none tabular-nums tracking-[-0.02em] text-red-300">
                  {fmtEur(lost)}
                </div>
                <div className="mt-1 text-[0.72rem] text-[hsl(var(--muted))]">{wonLabel}</div>
              </div>

              {/* Comparison rows */}
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Tile label="Menschliches Team würde kosten" value={`${fmtEur(human)}/Mon`} sub="nur Geschäftszeiten" />
                <Tile
                  label={`RSG AI · ${r.tariff.name}`}
                  value={`${fmtEur(price)}/Mon`}
                  sub={r.setup > 0 ? `+ Einrichtung ${fmtEur(r.setup)}` : 'keine Einrichtung'}
                  accent
                />
              </div>
            </div>

            {/* Advantage — green hero number */}
            <div className="relative overflow-hidden rounded-2xl border border-[hsl(var(--success))/35] bg-[hsl(var(--success))/10] p-6 text-center md:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-[220px] w-[220px] rounded-full opacity-40 blur-[90px]"
                style={{ background: 'radial-gradient(circle, hsl(var(--success) / 0.5), transparent 65%)' }}
              />
              <div className="relative font-mono text-[0.625rem] uppercase tracking-[0.24em] text-[hsl(var(--success))]">
                Dein Vorteil · pro Monat
              </div>
              <div className="relative mt-2 font-display text-[clamp(2.75rem,7vw,4rem)] font-medium leading-none tabular-nums tracking-[-0.03em] text-[hsl(var(--success))]">
                {fmtEur(gain)}
              </div>
              <div className="relative mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[hsl(var(--muted))]">
                <span>ROI <span className="text-[hsl(var(--success))]">{Math.round(roi).toLocaleString('de-DE')} %</span></span>
                <span className="hidden sm:inline">·</span>
                <span>
                  Einrichtung amortisiert in{' '}
                  <span className="text-[hsl(var(--fg))]">
                    {r.setup <= 0 ? 'sofort' : `${Math.max(1, Math.round(r.paybackWeeks))} Wochen`}
                  </span>
                </span>
              </div>
              <motion.a
                href={site.cta.meetingUrl}
                data-event="callcenter_calc_cta"
                whileHover={{ y: -2 }}
                className="relative mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[hsl(var(--success))] px-7 font-display text-[0.9rem] font-semibold text-[#04130c] transition-all hover:brightness-110"
              >
                Diese Ersparnis sichern — Demo buchen
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center font-mono text-[0.6875rem] leading-relaxed text-[hsl(var(--subtle))]">
          Schätzung auf Basis von {CALC_CONSTANTS.workdays} Arbeitstagen/Monat, ~
          {CALC_CONSTANTS.minutesPerFte} Gesprächsminuten je Vollzeitkraft und deinen
          Eingaben. Menschliche Kosten gelten nur für Geschäftszeiten — das KI-Callcenter
          arbeitet 24/7. Preise netto zzgl. USt. Keine garantierte Zusage.
        </p>
      </div>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
      {children}
    </span>
  );
}

function Tile({ label, value, sub, accent }: { label: string; value: string; sub: string; accent?: boolean }) {
  return (
    <div className={'rounded-xl border p-4 ' + (accent ? 'border-[hsl(var(--accent))/40] bg-[hsl(var(--accent))/8]' : 'border-[hsl(var(--border))] bg-[hsl(var(--bg))]')}>
      <div className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[hsl(var(--subtle))]">{label}</div>
      <div className="mt-1.5 font-display text-[1.35rem] font-medium tabular-nums tracking-tight text-[hsl(var(--fg))]">{value}</div>
      <div className="mt-0.5 text-[0.68rem] text-[hsl(var(--muted))]">{sub}</div>
    </div>
  );
}

function Slider({
  label, value, display, min, max, step, onChange,
}: {
  label: string; value: number; display: string; min: number; max: number; step: number; onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <Label>{label}</Label>
        <span className="font-display text-[1.15rem] font-medium tabular-nums tracking-tight text-[hsl(var(--fg))]">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_hsl(var(--accent)/0.3)]"
        style={{ background: `linear-gradient(90deg, hsl(var(--accent)) ${pct}%, hsl(var(--border-strong)) ${pct}%)` }}
      />
    </div>
  );
}
