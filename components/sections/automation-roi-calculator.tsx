'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, Users } from 'lucide-react';
import { pricing } from '@/lib/content';

/**
 * Automatisierungs-Rechner — Einsparpotenzial durch Workflows & KI-Agenten.
 *
 * Schätzt die jährliche Personalkosten-Ersparnis eines wiederkehrenden
 * Prozesses und die Amortisationszeit gegen den realen Festpreis des
 * gewählten Pakets (Workflow / autonomer KI-Agent) aus content.ts.
 */

const HOURLY_RATE = 50; // € netto, vollkostenbelastet
const WEEKS = 52;
const AUTOMATION_RATE = 0.8; // ~80 % der wiederkehrenden Zeit fällt weg

const fmtEur = (n: number) =>
  Math.round(n).toLocaleString('de-DE') + ' €';

// One-time package prices, single-sourced from content.ts (e.g. "ab 2.500 €")
const PACKAGES = (pricing.tiers ?? []).map((t) => ({
  name: t.name,
  price: Number(String(t.price).replace(/[^\d]/g, '')) || 0,
  recommended: !!t.recommended,
}));

export function AutomationRoiCalculator() {
  const [hours, setHours] = useState(12); // Stunden/Woche
  const [people, setPeople] = useState(2);
  const [pkgIndex, setPkgIndex] = useState(
    Math.max(0, PACKAGES.findIndex((p) => p.recommended)),
  );

  const pkg = PACKAGES[pkgIndex] ?? PACKAGES[0];

  const { annualSaving, monthlySaving, paybackMonths, roiPct } = useMemo(() => {
    const annualLabor = hours * people * WEEKS * HOURLY_RATE;
    const annualSaving = annualLabor * AUTOMATION_RATE;
    const monthlySaving = annualSaving / 12;
    const paybackMonths = monthlySaving > 0 ? pkg.price / monthlySaving : Infinity;
    const roiPct = pkg.price > 0 ? ((annualSaving - pkg.price) / pkg.price) * 100 : 0;
    return { annualSaving, monthlySaving, paybackMonths, roiPct };
  }, [hours, people, pkg]);

  return (
    <section
      id="automation-rechner"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--surface))]/82 px-6 py-20 backdrop-blur-[2px] md:py-28 lg:px-10"
    >
      <div className="relative mx-auto max-w-[1080px]">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border-strong))] bg-[hsl(var(--bg))] px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(var(--accent))] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />
            </span>
            Automatisierungs-Rechner
          </span>
          <h2 className="mt-6 font-display text-[clamp(1.875rem,4vw,3rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
            Was bringt dir{' '}
            <span className="text-[hsl(var(--accent))]">eine Automatisierung</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[0.975rem] leading-[1.6] text-[hsl(var(--muted))]">
            Nimm einen wiederkehrenden Prozess — Angebote, Rechnungen,
            Dateneingaben, Recherche. Wir rechnen die jährliche Ersparnis und
            zeigen, nach wie vielen Monaten sich das Paket trägt.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-12 overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--bg))] p-6 shadow-[var(--shadow-lift)] md:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 h-[320px] w-[320px] rounded-full opacity-30 blur-[120px]"
            style={{ background: 'radial-gradient(circle, hsl(var(--accent) / 0.4), transparent 65%)' }}
          />

          <div className="relative space-y-9">
            <Slider
              icon={<Clock className="h-4 w-4" />}
              label="Stunden/Woche, die der Prozess heute kostet"
              value={hours}
              display={`${hours} h`}
              min={2}
              max={40}
              step={1}
              onChange={setHours}
            />
            <Slider
              icon={<Users className="h-4 w-4" />}
              label="Mitarbeitende, die daran arbeiten"
              value={people}
              display={`${people}`}
              min={1}
              max={10}
              step={1}
              onChange={setPeople}
            />
          </div>

          {/* Package selector */}
          <div className="relative mt-9">
            <p className="mb-3 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
              Paket
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {PACKAGES.map((p, i) => {
                const active = i === pkgIndex;
                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setPkgIndex(i)}
                    className={
                      'flex items-center justify-between rounded-xl border p-4 text-left transition-all ' +
                      (active
                        ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent))/12]'
                        : 'border-[hsl(var(--border))] bg-[hsl(var(--surface))] hover:border-[hsl(var(--accent))/50]')
                    }
                  >
                    <span className="font-display text-[0.95rem] font-medium text-[hsl(var(--fg))]">
                      {p.name}
                    </span>
                    <span className="font-mono text-[0.8rem] tabular-nums text-[hsl(var(--muted))]">
                      ab {p.price.toLocaleString('de-DE')} €
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* KPI tiles */}
          <div className="relative mt-3 grid gap-3 sm:grid-cols-3">
            <KpiTile label="Einmal-Investment" value={fmtEur(pkg.price)} sub="Festpreis · einmalig" />
            <KpiTile
              label="Amortisation"
              value={paybackMonths < 60 ? `${Math.max(1, Math.ceil(paybackMonths))} Mon.` : '> 5 Jahre'}
              sub="bis das Paket sich trägt"
            />
            <KpiTile label="ROI nach 12 Monaten" value={`${Math.round(roiPct)} %`} sub="Ersparnis vs. Invest" highlight={roiPct > 0} />
          </div>

          {/* Savings highlight */}
          <div className="relative mt-3 overflow-hidden rounded-xl border border-[hsl(var(--accent))/35] bg-[hsl(var(--accent))/10] p-6 text-center">
            <div className="font-mono text-[0.625rem] uppercase tracking-[0.24em] text-[hsl(var(--accent))]">
              Geschätzte jährliche Ersparnis
            </div>
            <div className="mt-2 font-display text-[clamp(2.5rem,6vw,3.75rem)] font-medium leading-none tabular-nums tracking-[-0.03em] text-[hsl(var(--accent))]">
              {fmtEur(annualSaving)}
            </div>
            <div className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--muted))]">
              ≈ {fmtEur(monthlySaving)} pro Monat zurückgewonnene Kapazität
            </div>
          </div>

          <div className="relative mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/termin"
              data-event="automation_calculator_cta"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[hsl(var(--accent))] px-7 font-display text-[0.9rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))]"
            >
              Prozess-Audit buchen
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#automation-pricing"
              className="font-display text-[0.85rem] font-medium text-[hsl(var(--muted))] underline-offset-4 transition-colors hover:text-[hsl(var(--fg))] hover:underline"
            >
              Pakete ansehen →
            </a>
          </div>
        </motion.div>

        <p className="mt-6 text-center font-mono text-[0.6875rem] leading-relaxed text-[hsl(var(--subtle))]">
          Annahmen: {HOURLY_RATE} € pro Stunde (vollkostenbelastet), {WEEKS}{' '}
          Wochen/Jahr, ~{Math.round(AUTOMATION_RATE * 100)} % des wiederkehrenden
          Aufwands automatisierbar. Festpreise netto laut Preisliste. Schätzung,
          keine garantierte Zusage.
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

function KpiTile({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-5">
      <div className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
        {label}
      </div>
      <div
        className={
          'mt-1.5 font-display text-[1.75rem] font-medium tabular-nums tracking-tight ' +
          (highlight ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--fg))]')
        }
      >
        {value}
      </div>
      <div className="mt-1 text-[0.7rem] text-[hsl(var(--muted))]">{sub}</div>
    </div>
  );
}
