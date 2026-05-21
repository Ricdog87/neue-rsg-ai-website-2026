'use client';

import { motion } from 'framer-motion';
import { MaskWipe, SplitLines } from '@/components/effects/reveal';
import type { CaseStudy } from '@/lib/case-studies';

export function CaseStudyResults({ cs }: { cs: CaseStudy }) {
  return (
    <section
      id="case-results"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/82 backdrop-blur-[2px] px-6 py-20 md:py-28 lg:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-5">
            <MaskWipe>
              <span className="eyebrow">§ 03 · Ergebnis</span>
            </MaskWipe>
            <SplitLines
              lines={[cs.results.headline]}
              className="mt-6"
              lineClassName="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.025em] text-[hsl(var(--fg))]"
            />
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-2">
            <MaskWipe delay={0.2}>
              <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
                Sechs harte Zahlen. Aus den Live-Dashboards des Kunden,
                gemessen über die ersten Monate nach Go-Live. Kein
                Marketing-Number-Massaging — Roh-Output aus dem Agent-Log.
              </p>
            </MaskWipe>
          </div>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--border))] sm:grid-cols-2 lg:grid-cols-3">
          {cs.results.kpis.map((k, i) => (
            <motion.article
              key={k.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ delay: i * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              data-cursor="hover"
              className="group relative flex flex-col gap-3 overflow-hidden bg-[hsl(var(--bg))] p-8 transition-colors hover:bg-[hsl(var(--surface))]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(circle at 30% 0%, hsl(var(--accent) / 0.10), transparent 60%)',
                }}
              />
              <span className="relative font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
                KPI № {String(i + 1).padStart(2, '0')}
              </span>
              <div className="relative font-display text-[clamp(2.25rem,4vw,3rem)] font-medium leading-none tabular-nums tracking-[-0.025em] text-[hsl(var(--accent))]">
                {k.value}
              </div>
              <p className="relative text-[0.95rem] font-medium leading-tight text-[hsl(var(--fg))]">
                {k.label}
              </p>
              {k.sub && (
                <p className="relative font-mono text-[0.7rem] uppercase tracking-wider text-[hsl(var(--subtle))]">
                  {k.sub}
                </p>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
