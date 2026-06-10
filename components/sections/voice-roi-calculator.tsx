'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Phone, PhoneOff, Wallet, Percent } from 'lucide-react';
import { voicePlans } from '@/lib/pricing-voice';
import { useEnglish } from '@/components/system/use-locale';

/**
 * Voice-ROI-Kalkulator (Customer-Value-zentrisch).
 *
 * Statt „interne Stunden gespart" zeigt der Rechner den emotional viel
 * stärkeren Hebel: verlorenen Umsatz durch verpasste Anrufe — und wie
 * viel davon mit RSG AI zurückkommt.
 *
 * Inputs: Anrufe/Tag · % verpasst · Ø Auftragswert · Conversion %
 * Annahmen: 22 Arbeitstage/Monat · 95 % Recovery durch RSG AI.
 */

const WORKING_DAYS = 22;
const RECOVERY_RATE = 0.95;

const fmtEur = (n: number) =>
  n.toLocaleString('de-DE', { maximumFractionDigits: 0 }) + ' €';
const fmtEurEn = (n: number) =>
  '€' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });

function recommendPlan(callsPerDay: number) {
  return (
    voicePlans.find((p) => p.maxCallsPerDay !== null && callsPerDay <= p.maxCallsPerDay) ??
    voicePlans[voicePlans.length - 1]
  );
}

export function VoiceRoiCalculator() {
  const en = useEnglish();
  const money = en ? fmtEurEn : fmtEur;

  const [calls, setCalls] = useState(30);
  const [missedPct, setMissedPct] = useState(35);
  const [orderValue, setOrderValue] = useState(750);
  const [conversionPct, setConversionPct] = useState(20);
  const [manualPlanId, setManualPlanId] = useState<string | null>(null);

  const recommended = recommendPlan(calls);
  const plan = manualPlanId
    ? voicePlans.find((p) => p.id === manualPlanId) ?? recommended
    : recommended;

  const c = useMemo(() => {
    const callsPerMonth = calls * WORKING_DAYS;
    const missedToday = Math.round(callsPerMonth * (missedPct / 100));
    const lostCustomers = (missedToday * conversionPct) / 100;
    const lostRevenue = lostCustomers * orderValue;

    const recoveredCalls = Math.round(missedToday * RECOVERY_RATE);
    const recoveredCustomers = (recoveredCalls * conversionPct) / 100;
    const recoveredRevenue = recoveredCustomers * orderValue;

    let ourCost: number | null = null;
    if (plan.monthlyValue !== null) {
      const aiMinutes = recoveredCalls * 3; // Ø 3 Min pro recoveredem Call
      const overageMin = Math.max(0, aiMinutes - plan.includedMinutes);
      const overage =
        plan.overagePerMin !== null ? overageMin * plan.overagePerMin : 0;
      ourCost = plan.monthlyValue + overage;
    }

    const netGain =
      ourCost !== null ? Math.max(0, recoveredRevenue - ourCost) : null;
    const roiMultiple =
      ourCost && ourCost > 0 ? recoveredRevenue / ourCost : null;

    return {
      callsPerMonth,
      missedToday,
      lostCustomers,
      lostRevenue,
      recoveredCalls,
      recoveredCustomers,
      recoveredRevenue,
      ourCost,
      netGain,
      roiMultiple,
    };
  }, [calls, missedPct, orderValue, conversionPct, plan]);

  return (
    <section id="rechner" className="relative px-6 py-20 md:py-28 lg:px-10">
      <div className="relative mx-auto max-w-[1080px]">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border-strong))] bg-[hsl(var(--surface))] px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(var(--accent))] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />
            </span>
            {en ? 'Lost-revenue calculator' : 'Verlorener-Umsatz-Rechner'}
          </span>
          <h2 className="mt-6 font-display text-[clamp(1.875rem,4vw,3rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
            {en ? (
              <>
                What you{' '}
                <span className="text-red-400">lose</span> every month —
                <br className="hidden sm:inline" /> and what RSG AI{' '}
                <span className="text-[hsl(var(--accent))]">brings back</span>.
              </>
            ) : (
              <>
                Was du jeden Monat{' '}
                <span className="text-red-400">verlierst</span> —
                <br className="hidden sm:inline" /> und was RSG AI{' '}
                <span className="text-[hsl(var(--accent))]">zurückbringt</span>.
              </>
            )}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[0.975rem] leading-[1.6] text-[hsl(var(--muted))]">
            {en
              ? 'Each missed call is a lost deal. Slide your numbers — see exactly how much revenue your team loses today, and how much RSG AI recovers.'
              : 'Jeder verpasste Anruf ist ein verlorener Abschluss. Schieb die Regler auf deine Werte — und sieh, wie viel Umsatz dein Team heute liegen lässt und wie viel RSG AI zurückbringt.'}
          </p>
        </div>

        {/* Calculator card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-12 overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 shadow-[var(--shadow-lift)] md:p-10"
        >
          {/* Ambient blooms — cyan + red for the dual narrative */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-[320px] w-[320px] rounded-full opacity-30 blur-[120px]"
            style={{
              background:
                'radial-gradient(circle, hsl(var(--accent) / 0.4), transparent 65%)',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -bottom-24 h-[280px] w-[280px] rounded-full opacity-20 blur-[120px]"
            style={{
              background:
                'radial-gradient(circle, rgb(248 113 113 / 0.35), transparent 65%)',
            }}
          />

          {/* Sliders — 2x2 Grid */}
          <div className="relative grid gap-x-10 gap-y-8 sm:grid-cols-2">
            <Slider
              icon={<Phone className="h-4 w-4" />}
              label={en ? 'Calls / day' : 'Anrufe / Tag'}
              value={calls}
              display={`${calls}`}
              min={5}
              max={100}
              step={1}
              onChange={(v) => {
                setCalls(v);
                setManualPlanId(null);
              }}
            />
            <Slider
              icon={<PhoneOff className="h-4 w-4" />}
              tone="warn"
              label={en ? 'Missed today' : 'Heute verpasst'}
              value={missedPct}
              display={`${missedPct} %`}
              min={5}
              max={70}
              step={5}
              onChange={setMissedPct}
            />
            <Slider
              icon={<Wallet className="h-4 w-4" />}
              label={en ? 'Avg deal value' : 'Ø Auftragswert'}
              value={orderValue}
              display={money(orderValue)}
              min={100}
              max={5000}
              step={50}
              onChange={setOrderValue}
            />
            <Slider
              icon={<Percent className="h-4 w-4" />}
              label={en ? 'Conversion call → deal' : 'Conversion Anruf → Kunde'}
              value={conversionPct}
              display={`${conversionPct} %`}
              min={5}
              max={60}
              step={1}
              onChange={setConversionPct}
            />
          </div>

          {/* Big result — recovered revenue */}
          <div className="relative mt-10 overflow-hidden rounded-xl border border-[hsl(var(--accent))]/40 bg-gradient-to-br from-[hsl(var(--accent))]/15 via-[hsl(var(--accent))]/5 to-transparent p-7 text-center">
            <CornerTicks />
            <div className="font-mono text-[0.625rem] uppercase tracking-[0.24em] text-[hsl(var(--accent))]">
              {en
                ? 'Recovered with RSG AI · per month'
                : 'Mit RSG AI zurückgewonnen · pro Monat'}
            </div>
            <div className="mt-2 font-display text-[clamp(2.75rem,7vw,4.25rem)] font-medium leading-none tabular-nums tracking-[-0.035em] text-[hsl(var(--accent))]">
              {c.recoveredRevenue > 0
                ? money(c.recoveredRevenue)
                : en
                  ? "Let's talk"
                  : 'Sprich mit uns'}
            </div>
            <div className="mt-3 grid gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[hsl(var(--muted))] sm:grid-cols-2">
              <div className="flex items-center justify-center gap-2 sm:justify-end">
                <span aria-hidden className="h-px w-6 bg-[hsl(var(--border-strong))]" />
                {c.recoveredCalls} {en ? 'calls saved' : 'Anrufe gerettet'}
              </div>
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                {c.recoveredCustomers.toFixed(1).replace('.', en ? '.' : ',')}{' '}
                {en ? 'new customers/mo' : 'neue Kunden/Mo'}
                <span aria-hidden className="h-px w-6 bg-[hsl(var(--border-strong))]" />
              </div>
            </div>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--accent))]/15 px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--accent))]">
              ≈ {money(c.recoveredRevenue * 12)}{' '}
              {en ? 'per year' : 'pro Jahr'}
            </div>
          </div>

          {/* Bottom strip — Lost / RSG cost / Net gain */}
          <div className="relative mt-3 grid gap-3 sm:grid-cols-3">
            <KpiTile
              tone="warn"
              label={en ? 'Lost today / month' : 'Heute verloren / Monat'}
              value={money(c.lostRevenue)}
              sub={
                en
                  ? `${c.missedToday} missed · ${c.lostCustomers.toFixed(1)} deals`
                  : `${c.missedToday} verpasst · ${c.lostCustomers.toFixed(1).replace('.', ',')} Aufträge`
              }
            />
            <KpiTile
              label={en ? 'RSG AI · cost / month' : 'RSG AI · Kosten / Monat'}
              value={
                c.ourCost !== null
                  ? money(c.ourCost)
                  : en
                    ? 'On request'
                    : 'Auf Anfrage'
              }
              sub={
                c.ourCost !== null
                  ? en
                    ? `Plan ${plan.name} · ${plan.includedMinutes.toLocaleString('en-US')} min`
                    : `Paket ${plan.name} · ${plan.includedMinutes.toLocaleString('de-DE')} Min`
                  : en
                    ? `Plan ${plan.name} · custom`
                    : `Paket ${plan.name} · individuell`
              }
            />
            <KpiTile
              tone="good"
              label={en ? 'Net gain / month' : 'Netto-Plus / Monat'}
              value={c.netGain !== null ? money(c.netGain) : '—'}
              sub={
                c.roiMultiple
                  ? en
                    ? `${c.roiMultiple.toFixed(1)}× ROI vs. cost`
                    : `${c.roiMultiple.toFixed(1).replace('.', ',')}× ROI vs. Kosten`
                  : ''
              }
            />
          </div>

          {/* Plan tiles */}
          <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
            {voicePlans.map((p) => {
              const active = p.id === plan.id;
              const isRec = p.id === recommended.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setManualPlanId(p.id)}
                  className={
                    'group relative flex flex-col items-start gap-1 rounded-xl border p-4 text-left transition-all ' +
                    (active
                      ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent))/12] shadow-[0_0_30px_-12px_hsl(var(--accent)/0.7)]'
                      : 'border-[hsl(var(--border))] bg-[hsl(var(--bg))] hover:border-[hsl(var(--accent))/50]')
                  }
                >
                  {isRec && (
                    <span className="absolute -top-2 right-3 rounded-full bg-[hsl(var(--accent))] px-2 py-0.5 font-mono text-[0.5rem] uppercase tracking-[0.2em] text-white">
                      {en ? 'Recommended' : 'Empfohlen'}
                    </span>
                  )}
                  <span className="text-balance font-display text-[clamp(0.9rem,1.4vw,1.05rem)] font-medium leading-tight text-[hsl(var(--fg))]">
                    {p.name}
                  </span>
                  <span className="font-mono text-[0.7rem] tabular-nums text-[hsl(var(--muted))]">
                    {p.priceMonthly}
                    {p.priceSuffix}
                  </span>
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <div className="relative mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={plan.ctaHref}
              data-event={`calculator_cta_${plan.id}`}
              data-tier={plan.id}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[hsl(var(--accent))] px-7 font-display text-[0.9rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))]"
            >
              {plan.name === 'Scale'
                ? en
                  ? 'Custom quote'
                  : 'Individuelles Angebot'
                : en
                  ? `Start with ${plan.name}`
                  : `${plan.name} starten`}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/preise"
              className="font-display text-[0.85rem] font-medium text-[hsl(var(--muted))] underline-offset-4 transition-colors hover:text-[hsl(var(--fg))] hover:underline"
            >
              {en ? 'Compare all plans →' : 'Alle Pakete vergleichen →'}
            </Link>
          </div>
        </motion.div>

        {/* Footnote */}
        <p className="mt-6 text-center font-mono text-[0.6875rem] leading-relaxed text-[hsl(var(--subtle))]">
          {en
            ? `Based on ${WORKING_DAYS} working days/month and ${Math.round(RECOVERY_RATE * 100)}% missed-call recovery with RSG AI. Plan prices net per price list. Figures are an estimate of revenue potential, not a guarantee.`
            : `Berechnung auf Basis von ${WORKING_DAYS} Arbeitstagen/Monat und ${Math.round(RECOVERY_RATE * 100)} % Recovery-Quote durch RSG AI. Paketpreise netto laut Preisliste. Werte sind eine Schätzung des Umsatzpotenzials, keine garantierte Zusage.`}
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────── */

function CornerTicks() {
  const c = 'absolute h-2.5 w-2.5 border-[hsl(var(--accent))]/40';
  return (
    <>
      <span aria-hidden className={c + ' left-2 top-2 border-l border-t'} />
      <span aria-hidden className={c + ' right-2 top-2 border-r border-t'} />
      <span aria-hidden className={c + ' left-2 bottom-2 border-l border-b'} />
      <span aria-hidden className={c + ' right-2 bottom-2 border-r border-b'} />
    </>
  );
}

function Slider({
  icon,
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  tone?: 'warn' | 'default';
}) {
  const pct = ((value - min) / (max - min)) * 100;
  const trackColor =
    tone === 'warn' ? 'rgb(248, 113, 113)' : 'hsl(var(--accent))';
  const iconColor =
    tone === 'warn' ? 'text-red-400' : 'text-[hsl(var(--accent))]';
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-2 text-[0.9rem] text-[hsl(var(--muted))]">
          <span className={iconColor}>{icon}</span>
          {label}
        </span>
        <span className="font-display text-[1.05rem] font-medium tabular-nums tracking-tight text-[hsl(var(--fg))]">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
        style={{
          background: `linear-gradient(90deg, ${trackColor} ${pct}%, hsl(var(--border-strong)) ${pct}%)`,
        }}
      />
    </div>
  );
}

function KpiTile({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  tone?: 'warn' | 'good' | 'default';
}) {
  const border =
    tone === 'warn'
      ? 'border-red-400/30'
      : tone === 'good'
        ? 'border-[hsl(var(--accent))]/30'
        : 'border-[hsl(var(--border))]';
  const labelColor =
    tone === 'warn'
      ? 'text-red-300'
      : tone === 'good'
        ? 'text-[hsl(var(--accent))]'
        : 'text-[hsl(var(--subtle))]';
  const valueColor =
    tone === 'warn'
      ? 'text-red-300'
      : tone === 'good'
        ? 'text-[hsl(var(--accent))]'
        : 'text-[hsl(var(--fg))]';
  return (
    <div
      className={`relative overflow-hidden rounded-xl border ${border} bg-[hsl(var(--bg))] p-5`}
    >
      <div
        className={`font-mono text-[0.625rem] uppercase tracking-[0.22em] ${labelColor}`}
      >
        {label}
      </div>
      <div
        className={`mt-1.5 font-display text-[1.6rem] font-medium tabular-nums tracking-tight ${valueColor}`}
      >
        {value}
      </div>
      <div className="mt-1 text-[0.7rem] text-[hsl(var(--muted))]">{sub}</div>
    </div>
  );
}
