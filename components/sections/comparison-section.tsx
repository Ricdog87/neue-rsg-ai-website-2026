'use client';

import { motion } from 'framer-motion';
import { Check, Minus, X } from 'lucide-react';
import { useEnglish } from '@/components/system/use-locale';

/**
 * Vergleich — Manuell (Status quo) vs. Eigener Mitarbeiter vs.
 * Automatisierter Anrufagent (RSG AI). Ehrlich, KMU-realistisch,
 * RSG-Spalte als beste Wahl hervorgehoben.
 */
type Row = {
  c: string; cEn: string;
  manual: string; manualEn: string;
  human: string; humanEn: string;
  agent: string; agentEn: string;
};

const ROWS: Row[] = [
  { c: 'Erreichbarkeit', cEn: 'Availability',
    manual: 'Nur wenn zufällig jemand Zeit hat', manualEn: 'Only if someone happens to be free',
    human: 'Geschäftszeiten — Urlaub, Krankheit, Pause', humanEn: 'Business hours — holidays, sick days, breaks',
    agent: '24/7/365 — nie krank, nie im Urlaub', agentEn: '24/7/365 — never sick, never on holiday' },
  { c: 'Reaktionszeit', cEn: 'Response time',
    manual: 'Anruf verpasst → Rückruf Stunden später', manualEn: 'Missed call → callback hours later',
    human: 'Wenn frei, sonst Warteschleife', humanEn: 'If free, otherwise on hold',
    agent: '< 0,4 Sek — beim ersten Klingeln', agentEn: '< 0.4 s — on the first ring' },
  { c: 'Verpasste Anrufe', cEn: 'Missed calls',
    manual: '30–60 % gehen verloren', manualEn: '30–60% are lost',
    human: 'Bei Lastspitzen & nach Feierabend', humanEn: 'At peak load & after hours',
    agent: '0 — jeder Anruf wird angenommen', agentEn: '0 — every call is answered' },
  { c: 'Kosten / Monat', cEn: 'Cost / month',
    manual: 'Versteckte Opportunitätskosten', manualEn: 'Hidden opportunity cost',
    human: '3.000–4.500 € + Lohnnebenkosten', humanEn: '€3,000–4,500 + payroll overhead',
    agent: 'Ab 199 € — planbarer Festpreis', agentEn: 'From €199 — predictable flat fee' },
  { c: 'Skalierung', cEn: 'Scaling',
    manual: 'Gar nicht', manualEn: 'Not at all',
    human: 'Neue Einstellung nötig', humanEn: 'Requires a new hire',
    agent: '100 Anrufe gleichzeitig — ohne Mehrkosten', agentEn: '100 calls in parallel — no extra cost' },
  { c: 'Follow-up & CRM', cEn: 'Follow-up & CRM',
    manual: 'Zettel, Post-its, Vergessen', manualEn: 'Notes, post-its, forgotten',
    human: 'Manuell — fehleranfällig', humanEn: 'Manual — error-prone',
    agent: 'Automatisch ins CRM, Termin gebucht', agentEn: 'Auto into CRM, meeting booked' },
  { c: 'Konsistenz', cEn: 'Consistency',
    manual: 'Reine Tagesform', manualEn: 'Pure daily mood',
    human: 'Tagesform + Einarbeitung', humanEn: 'Daily mood + ramp-up',
    agent: 'Immer gleich — immer im Markenton', agentEn: 'Always the same — always on-brand' },
  { c: 'Startklar', cEn: 'Time to ready',
    manual: '—', manualEn: '—',
    human: 'Recruiting + 4–8 Wochen Einarbeitung', humanEn: 'Recruiting + 4–8 weeks ramp-up',
    agent: 'In 4 Wochen live', agentEn: 'Live in 4 weeks' },
];

export function ComparisonSection() {
  const en = useEnglish();
  return (
    <section id="vergleich" className="relative overflow-hidden px-6 py-20 md:py-28 lg:px-10">
      {/* Hairline grid backdrop (subtle, radial-masked) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '88px 88px',
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />
      <div className="relative mx-auto max-w-[1280px]">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
            <span aria-hidden className="relative inline-flex h-px w-8 overflow-hidden bg-[hsl(var(--accent))]/30">
              <span className="hero-scan-line absolute inset-y-0 h-px w-3 bg-[hsl(var(--accent))]" />
            </span>
            {en ? 'The honest comparison' : 'Der ehrliche Vergleich'}
          </span>
          <h2 className="mt-3 font-display text-[clamp(1.875rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
            {en ? 'Manual vs. a hire vs. an automated call agent.' : 'Manuell vs. eigener Mitarbeiter vs. automatisierter Anrufagent.'}
          </h2>
          <p className="mt-4 text-[1.02rem] leading-[1.6] text-[hsl(var(--muted))]">
            {en
              ? 'Three ways to handle your inbound calls. Here is what each really costs you — in money and in lost deals.'
              : 'Drei Wege, deine eingehenden Anrufe zu händeln. Was dich jeder wirklich kostet — in Euro und in verlorenen Abschlüssen.'}
          </p>
        </div>

        <p className="mt-10 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[hsl(var(--subtle))] md:hidden">
          {en ? '← swipe to compare →' : '← seitlich wischen zum Vergleichen →'}
        </p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 0.6 }}
          className="mt-3 overflow-x-auto md:mt-12"
        >
          <div className="min-w-[760px]">
            {/* Header */}
            <div className="grid grid-cols-[1.1fr_1fr_1fr_1.15fr] gap-px">
              <div />
              <div className="rounded-t-md px-5 py-4">
                <div className="flex items-center gap-2 text-[hsl(var(--muted))]">
                  <X className="h-4 w-4" strokeWidth={2} />
                  <span className="font-display text-[0.95rem] font-medium text-[hsl(var(--fg))]">{en ? 'Manual' : 'Manuell'}</span>
                </div>
                <div className="mt-0.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[hsl(var(--subtle))]">{en ? 'status quo' : 'Status quo'}</div>
              </div>
              <div className="rounded-t-md px-5 py-4">
                <div className="flex items-center gap-2 text-[hsl(var(--muted))]">
                  <Minus className="h-4 w-4" strokeWidth={2} />
                  <span className="font-display text-[0.95rem] font-medium text-[hsl(var(--fg))]">{en ? 'A hire' : 'Mitarbeiter'}</span>
                </div>
                <div className="mt-0.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[hsl(var(--subtle))]">{en ? 'human, in-house' : 'Mensch, inhouse'}</div>
              </div>
              <div className="relative rounded-t-md border-x border-t border-[hsl(var(--accent))]/45 bg-gradient-to-b from-[hsl(var(--accent))]/15 to-[hsl(var(--accent))]/[0.05] px-5 py-4 shadow-[0_-6px_30px_-12px_hsl(var(--accent)/0.4)]">
                {/* Corner brackets — viewfinder */}
                <span aria-hidden className="absolute left-1.5 top-1.5 h-2 w-2 border-l border-t border-[hsl(var(--accent))]/60" />
                <span aria-hidden className="absolute right-1.5 top-1.5 h-2 w-2 border-r border-t border-[hsl(var(--accent))]/60" />
                <span className="absolute -top-2.5 left-5 inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--accent))] px-2.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-white shadow-[0_0_20px_hsl(var(--accent)/0.55)]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-white opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                  {en ? 'Recommended' : 'Empfohlen'}
                </span>
                <div className="flex items-center gap-2 text-[hsl(var(--accent))]">
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                  <span className="font-display text-[0.95rem] font-semibold text-[hsl(var(--fg))]">RSG AI · {en ? 'Call agent' : 'Anrufagent'}</span>
                </div>
                <div className="mt-0.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[hsl(var(--accent))]/85">{en ? 'automated · 24/7' : 'automatisiert · 24/7'}</div>
              </div>
            </div>

            {/* Rows */}
            {ROWS.map((r, i) => (
              <div key={r.c} className="group grid grid-cols-[1.1fr_1fr_1fr_1.15fr] gap-px border-t border-[hsl(var(--border))] transition-colors hover:bg-white/[0.012]">
                <div className="flex items-center gap-3 px-5 py-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[hsl(var(--subtle))]">
                  <span aria-hidden className="h-px w-3 bg-[hsl(var(--border-strong))] transition-all duration-300 group-hover:w-5 group-hover:bg-[hsl(var(--accent))]/70" />
                  {en ? r.cEn : r.c}
                </div>
                <div className="px-5 py-4 text-[0.85rem] leading-snug text-[hsl(var(--muted))]">
                  {en ? r.manualEn : r.manual}
                </div>
                <div className="px-5 py-4 text-[0.85rem] leading-snug text-[hsl(var(--muted))]">
                  {en ? r.humanEn : r.human}
                </div>
                <div className={
                  'relative flex items-start gap-2 border-x border-[hsl(var(--accent))]/45 bg-gradient-to-r from-[hsl(var(--accent))]/[0.1] to-[hsl(var(--accent))]/[0.05] px-5 py-4 text-[0.85rem] font-medium leading-snug text-[hsl(var(--fg))]' +
                  (i === ROWS.length - 1 ? ' rounded-b-md border-b' : '')
                }>
                  {/* Bottom corner brackets only on last row */}
                  {i === ROWS.length - 1 && (
                    <>
                      <span aria-hidden className="absolute left-1.5 bottom-1.5 h-2 w-2 border-l border-b border-[hsl(var(--accent))]/60" />
                      <span aria-hidden className="absolute right-1.5 bottom-1.5 h-2 w-2 border-r border-b border-[hsl(var(--accent))]/60" />
                    </>
                  )}
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--accent))]" strokeWidth={2.5} />
                  <span>{en ? r.agentEn : r.agent}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
