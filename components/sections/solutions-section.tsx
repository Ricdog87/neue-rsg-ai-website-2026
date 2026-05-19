'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Activity } from 'lucide-react';
import { solutions, site } from '@/lib/content';

export function SolutionsSection() {
  return (
    <section
      id="solutions"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-6 py-24 md:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-5">
            <span className="eyebrow">{solutions.eyebrow}</span>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-light leading-[1.02] tracking-[-0.02em] text-[hsl(var(--ink))]">
              {solutions.headline}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-2">
            <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
              {solutions.subline}
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          {/* Steps — left column */}
          <ol className="lg:col-span-6">
            {solutions.steps.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group grid grid-cols-[auto_1fr] gap-x-6 border-t border-[hsl(var(--border))] py-7 last:border-b"
              >
                <span className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-[hsl(var(--subtle))] pt-1.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-[1.375rem] font-medium leading-tight tracking-tight text-[hsl(var(--ink))]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-[1.6] text-[hsl(var(--muted))]">
                    {step.body}
                  </p>
                </div>
              </motion.li>
            ))}
            <div className="mt-10">
              <a
                href={site.cta.meetingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-14 items-center gap-2 rounded-full bg-[hsl(var(--ink))] px-7 text-[0.95rem] font-medium text-[hsl(var(--bg))] transition-all hover:bg-[hsl(var(--accent))]"
              >
                {solutions.cta}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </ol>

          {/* Pipeline visual — right column, paper card */}
          <aside className="lg:col-span-6 lg:col-start-7">
            <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--bg))] p-8 shadow-[var(--shadow-soft)] md:p-10">
              <div className="mb-6 flex items-center justify-between border-b border-[hsl(var(--border))] pb-5">
                <div className="flex items-center gap-2.5">
                  <Activity className="h-4 w-4 text-[hsl(var(--accent))]" aria-hidden />
                  <span className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-[hsl(var(--ink))]">
                    {solutions.pipeline.title}
                  </span>
                </div>
                <span className="font-mono text-[0.7rem] text-[hsl(var(--subtle))]">
                  ∅ {solutions.pipeline.timeSaved} gespart
                </span>
              </div>
              <ol className="space-y-1">
                {solutions.pipeline.steps.map((s, i) => (
                  <motion.li
                    key={s.n}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.2 }}
                    className="flex items-start gap-4 border-b border-[hsl(var(--border))] py-3 last:border-b-0"
                  >
                    <span className="mt-0.5 font-mono text-[0.7rem] text-[hsl(var(--accent))]">
                      {s.n}
                    </span>
                    <div className="flex-1">
                      <div className="text-[0.875rem] font-medium text-[hsl(var(--ink))]">
                        {s.title}
                      </div>
                      <div className="mt-0.5 text-[0.75rem] text-[hsl(var(--subtle))]">
                        {s.detail}
                      </div>
                    </div>
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--accent))] opacity-70"
                    />
                  </motion.li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
