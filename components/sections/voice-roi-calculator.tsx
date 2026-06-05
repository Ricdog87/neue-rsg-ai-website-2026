'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Phone, Clock } from 'lucide-react';
import { voicePlans } from '@/lib/pricing-voice';
import { useEnglish } from '@/components/system/use-locale';

/**
 * Telefonassistentin-Rechner — Einsparpotenzial.
 *
 * Vergleicht die internen Bearbeitungskosten deiner Anrufe mit dem
 * passenden RSG-AI-Paket. Es werden AUSSCHLIESSLICH die hinterlegten
 * VK-Preise aus lib/pricing-voice.ts verwendet (inkl. Inklusiv-Minuten
 * und Zusatzminuten-Preis). Die internen Kosten sind eine transparente
 * Schätzung (Arbeitstage × Stundensatz) — als Fußnote ausgewiesen.
 */

const WORKING_DAYS = 22; // Arbeitstage/Monat
const HOURLY_RATE = 50; // € netto, vollkostenbelastete Stunde (inkl. Lohnnebenkosten)

const fmtEur = (n: number) =>
  n.toLocaleString('de-DE', { maximumFractionDigits: 0 }) + ' €';

function recommendPlan(callsPerDay: number) {
  return (
    voicePlans.find((p) => p.maxCallsPerDay !== null && callsPerDay <= p.maxCallsPerDay) ??
    voicePlans[voicePlans.length - 1]
  );
}

export function VoiceRoiCalculator() {
  const en = useEnglish();
  const [calls, setCalls] = useState(30); // Anrufe/Tag
  const [duration, setDuration] = useState(4); // Ø Minuten/Anruf
  const [manualPlanId, setManualPlanId] = useState<string | null>(null);

  const recommended = recommendPlan(calls);
  const plan = manualPlanId
    ? voicePlans.find((p) => p.id === manualPlanId) ?? recommended
    : recommended;

  const { minutesPerMonth, internalCost, ourCost, savings } = useMemo(() => {
    const minutesPerMonth = calls * duration * WORKING_DAYS;
    const internalCost = (minutesPerMonth / 60) * HOURLY_RATE;

    let ourCost: number | null = null;
    if (plan.monthlyValue !== null) {
      const overageMin = Math.max(0, minutesPerMonth - plan.includedMinutes);
      const overage = plan.overagePerMin !== null ? overageMin * plan.overagePerMin : 0;
      ourCost = plan.monthlyValue + overage;
    }

    const savings = ourCost !== null ? Math.max(0, internalCost - ourCost) : null;
    return { minutesPerMonth, internalCost, ourCost, savings };
  }, [calls, duration, plan]);

  return (
    <section
      id="rechner"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/85 px-6 py-20 backdrop-blur-[2px] md:py-28 lg:px-10"
    >
      <div className="relative mx-auto max-w-[1080px]">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border-strong))] bg-[hsl(var(--surface))] px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(var(--accent))] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />
            </span>
            {en ? 'Cost calculator' : 'Kostenrechner'}
          </span>
          <h2 className="mt-6 font-display text-[clamp(1.875rem,4vw,3rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
            {en ? (
              <>
                Calculate your monthly{' '}
                <span className="text-[hsl(var(--accent))]">savings potential</span>.
              </>
            ) : (
              <>
                Berechne dein monatliches{' '}
                <span className="text-[hsl(var(--accent))]">Einsparpotenzial</span>.
              </>
            )}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[0.975rem] leading-[1.6] text-[hsl(var(--muted))]">
            {en
              ? 'Slide to your call volume — we compare our real plan prices against what the same telephony costs your team in-house.'
              : 'Schieb die Regler auf dein Anrufvolumen — wir rechnen mit unseren echten Paketpreisen gegen, was dein Team die gleiche Telefonie kostet.'}
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
          {/* Soft accent bloom */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-[320px] w-[320px] rounded-full opacity-30 blur-[120px]"
            style={{ background: 'radial-gradient(circle, hsl(var(--accent) / 0.4), transparent 65%)' }}
          />

          {/* Sliders */}
          <div className="relative space-y-9">
            <Slider
              icon={<Phone className="h-4 w-4" />}
              label={en ? 'Calls your team handles per day' : 'Anrufe, die dein Team täglich bearbeitet'}
              value={calls}
              display={`${calls}`}
              min={10}
              max={60}
              step={1}
              onChange={(v) => {
                setCalls(v);
                setManualPlanId(null);
              }}
            />
            <Slider
              icon={<Clock className="h-4 w-4" />}
              label={en ? 'Average call duration' : 'Durchschnittliche Anrufdauer'}
              value={duration}
              display={`${duration} ${en ? 'min' : 'Min'}`}
              min={2}
              max={15}
              step={1}
              onChange={setDuration}
            />
          </div>

          {/* KPI tiles */}
          <div className="relative mt-9 grid gap-3 sm:grid-cols-2">
            <KpiTile
              label={en ? 'RSG AI · cost / month' : 'RSG AI · Kosten / Monat'}
              value={ourCost !== null ? fmtEur(ourCost) : en ? 'On request' : 'Auf Anfrage'}
              sub={
                ourCost !== null
                  ? en
                    ? `${plan.name} plan · ${plan.includedMinutes.toLocaleString('en-US')} min incl.`
                    : `Paket ${plan.name} · ${plan.includedMinutes.toLocaleString('de-DE')} Min inkl.`
                  : en
                    ? `${plan.name} plan · custom quote`
                    : `Paket ${plan.name} · individuelles Angebot`
              }
            />
            <KpiTile
              label={en ? 'In-house handling / month' : 'Interne Bearbeitung / Monat'}
              value={fmtEur(internalCost)}
              sub={
                en
                  ? `${minutesPerMonth.toLocaleString('en-US')} talk minutes/month`
                  : `${minutesPerMonth.toLocaleString('de-DE')} Gesprächsminuten/Monat`
              }
            />
          </div>

          {/* Savings highlight */}
          <div className="relative mt-3 overflow-hidden rounded-xl border border-[hsl(var(--accent))/35] bg-[hsl(var(--accent))/10] p-6 text-center">
            <div className="font-mono text-[0.625rem] uppercase tracking-[0.24em] text-[hsl(var(--accent))]">
              {en ? 'Estimated monthly savings' : 'Geschätzte monatliche Ersparnis'}
            </div>
            <div className="mt-2 font-display text-[clamp(2.5rem,6vw,3.75rem)] font-medium leading-none tabular-nums tracking-[-0.03em] text-[hsl(var(--accent))]">
              {savings !== null ? fmtEur(savings) : en ? "Let's talk" : 'Sprich mit uns'}
            </div>
            {savings !== null && (
              <div className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--muted))]">
                ≈ {fmtEur(savings * 12)} {en ? 'per year · plus 24/7 availability' : 'pro Jahr · zzgl. 24/7-Erreichbarkeit'}
              </div>
            )}
          </div>

          {/* Plan tiles */}
          <div className="relative mt-3 grid gap-3 sm:grid-cols-3">
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
                  <span className="font-display text-[0.95rem] font-medium text-[hsl(var(--fg))]">
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
                ? en ? 'Custom quote' : 'Individuelles Angebot'
                : en ? `Start with ${plan.name}` : `${plan.name} starten`}
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
            ? `Based on ${WORKING_DAYS} working days/month and €${HOURLY_RATE} per hour (fully loaded, incl. on-costs). Plan prices net per price list. Figures are an estimate of savings potential, not a guarantee.`
            : `Berechnung auf Basis von ${WORKING_DAYS} Arbeitstagen/Monat und ${HOURLY_RATE} € pro Stunde (vollkostenbelastet, inkl. Lohnnebenkosten). Paketpreise netto laut Preisliste. Werte sind eine Schätzung des Einsparpotenzials, keine garantierte Zusage.`}
        </p>
      </div>
    </section>
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
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-2 text-[0.9rem] text-[hsl(var(--muted))]">
          <span className="text-[hsl(var(--accent))]">{icon}</span>
          {label}
        </span>
        <span className="font-display text-[1.25rem] font-medium tabular-nums tracking-tight text-[hsl(var(--fg))]">
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
        className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_hsl(var(--accent)/0.3)]"
        style={{
          background: `linear-gradient(90deg, hsl(var(--accent)) ${pct}%, hsl(var(--border-strong)) ${pct}%)`,
        }}
      />
    </div>
  );
}

function KpiTile({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--bg))] p-5">
      <div className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
        {label}
      </div>
      <div className="mt-1.5 font-display text-[1.75rem] font-medium tabular-nums tracking-tight text-[hsl(var(--fg))]">
        {value}
      </div>
      <div className="mt-1 text-[0.7rem] text-[hsl(var(--muted))]">{sub}</div>
    </div>
  );
}
