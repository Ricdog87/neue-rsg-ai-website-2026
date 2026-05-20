'use client';

import { motion } from 'framer-motion';
import { Shield, Clock, Lock, Code2 } from 'lucide-react';
import { MaskWipe, SplitLines } from '@/components/effects/reveal';

/**
 * Commitment panel — "Unser Versprechen".
 *
 * Sits between Pricing and FAQ. Four hard guarantees in a 2×2 grid
 * that lower buyer anxiety: SLA, ownership, fail-safe, transparency.
 *
 * Editorial framing — written as four declarative promises, not
 * marketing language.
 */

const COMMITMENTS = [
  {
    Icon: Clock,
    headline: '30-Tage-SLA oder Anpassung auf unsere Kosten.',
    body:
      'Klar definierte Akzeptanzkriterien aus dem Audit. Erfüllt der Agent die KPIs nach 30 Tagen nicht — Optimierung ohne Aufpreis.',
  },
  {
    Icon: Code2,
    headline: 'Du besitzt alles. Code, Daten, Konfig.',
    body:
      'Quellcode, Prompt-Library, Datenfluss, Modell-Konfiguration. Falls du irgendwann ohne uns weiter willst, kannst du das.',
  },
  {
    Icon: Lock,
    headline: 'DSGVO · EU · ohne Drittland-Transfer.',
    body:
      'Frankfurt + Berlin. AVV inklusive. Daten-Lokation auf einer Seite dokumentiert. Dein Datenschutzbeauftragter atmet durch.',
  },
  {
    Icon: Shield,
    headline: 'Festpreis vor dem ersten Commit.',
    body:
      'Audit-Output ist eine 1-Seiten-Roadmap mit Festpreis. Keine T&M-Falle, keine Scope-Creep-Diskussionen drei Monate später.',
  },
];

export function CommitmentSection() {
  return (
    <section
      id="commitment"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/82 backdrop-blur-[2px] px-6 py-20 md:py-28 lg:px-10"
    >
      <div className="relative mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-5">
            <MaskWipe>
              <span className="eyebrow">Unser Versprechen</span>
            </MaskWipe>
            <SplitLines
              lines={['Vier Sätze,', 'die wir dir', 'schriftlich geben.']}
              className="mt-6"
              lineClassName="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.025em] text-[hsl(var(--fg))]"
            />
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-2">
            <MaskWipe delay={0.2}>
              <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
                Wir wissen, dass KI-Projekte in 74 % der Fälle scheitern (BCG
                2024). Das hier sind die vier Klauseln, die wir vertraglich
                garantieren — damit du nicht zur Statistik wirst.
              </p>
            </MaskWipe>
          </div>
        </div>

        {/* 2×2 grid of commitments */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--border))] md:grid-cols-2">
          {COMMITMENTS.map((c, i) => {
            const Icon = c.Icon;
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{
                  duration: 0.75,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                data-cursor="hover"
                className="group relative overflow-hidden bg-[hsl(var(--bg))] p-10 md:p-12"
              >
                {/* Hover accent wash */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at 0% 0%, hsl(var(--accent) / 0.10), transparent 55%)',
                  }}
                />

                <div className="relative flex items-start gap-6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[hsl(var(--border-strong))] bg-[hsl(var(--surface))] text-[hsl(var(--accent))] transition-all group-hover:border-[hsl(var(--accent))] group-hover:bg-[hsl(var(--accent))]/10">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div className="flex-1">
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
                      Klausel № {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-3 font-display text-[1.25rem] font-medium leading-[1.25] tracking-[-0.01em] text-[hsl(var(--fg))] md:text-[1.5rem]">
                      {c.headline}
                    </h3>
                    <p className="mt-4 text-[0.95rem] leading-[1.65] text-[hsl(var(--muted))]">
                      {c.body}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 grid grid-cols-12 gap-x-6 border-t border-[hsl(var(--border))] pt-10"
        >
          <div className="col-span-12 md:col-span-8">
            <p className="font-accent text-[clamp(1.25rem,2.4vw,1.75rem)] font-light italic leading-[1.4] text-[hsl(var(--fg))]">
              „Wir verkaufen kein Prinzip Hoffnung —{' '}
              <span className="text-[hsl(var(--accent))]">wir verkaufen Ergebnis.</span>"
            </p>
          </div>
          <div className="col-span-12 mt-6 flex items-end md:col-span-4 md:mt-0 md:justify-end">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
              — Ricardo Serrano, Gründer
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
