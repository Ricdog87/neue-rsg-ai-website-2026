'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Activity } from 'lucide-react';
import { solutions, site } from '@/lib/content';
import { MaskWipe, SplitLines, Stagger } from '@/components/effects/reveal';

export function SolutionsSection() {
  return (
    <section
      id="solutions"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--surface))]/82 backdrop-blur-[2px] px-6 py-20 md:py-28 lg:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-5">
            <MaskWipe>
              <span className="eyebrow">{solutions.eyebrow}</span>
            </MaskWipe>
            <SplitLines
              lines={[solutions.headline]}
              className="mt-6"
              lineClassName="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[hsl(var(--fg))]"
            />
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-2">
            <MaskWipe delay={0.2}>
              <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
                {solutions.subline}
              </p>
            </MaskWipe>
          </div>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          {/* Steps with animated connector line on the left */}
          <div className="relative lg:col-span-6">
            {/* Animated vertical line */}
            <svg
              aria-hidden
              className="pointer-events-none absolute left-3 top-0 h-full w-px overflow-visible"
              preserveAspectRatio="none"
            >
              <motion.line
                x1={0}
                x2={0}
                y1={0}
                y2="100%"
                stroke="hsl(var(--accent))"
                strokeWidth={1.5}
                strokeDasharray="2 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: '-15% 0px' }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>

            <Stagger
              delayStep={0.12}
              className="ml-0 flex flex-col"
            >
              {solutions.steps.map((step, i) => (
                <div
                  key={step.title}
                  data-cursor="hover"
                  className="group relative grid grid-cols-[auto_1fr] gap-x-6 border-t border-[hsl(var(--border))] py-7 last:border-b"
                >
                  <span className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-[hsl(var(--subtle))] pt-1.5 transition-colors group-hover:text-[hsl(var(--accent))]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.375rem] font-medium leading-tight tracking-tight text-[hsl(var(--fg))]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-[1.6] text-[hsl(var(--muted))]">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </Stagger>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10"
            >
              <a
                href={site.cta.meetingUrl}
                data-sound="tick"
                className="group inline-flex h-14 items-center gap-2 rounded-full bg-[hsl(var(--fg))] px-7 font-display text-[0.95rem] font-medium text-[hsl(var(--bg))] transition-all hover:bg-[hsl(var(--accent))] hover:text-white"
              >
                {solutions.cta}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </div>

          {/* Pipeline visual */}
          <motion.aside
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 lg:col-start-7"
          >
            <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--bg))] p-8 shadow-[var(--shadow-soft)] md:p-10">
              <div className="mb-6 flex items-center justify-between border-b border-[hsl(var(--border))] pb-5">
                <div className="flex items-center gap-2.5">
                  <Activity className="h-4 w-4 text-[hsl(var(--accent))]" aria-hidden />
                  <span className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-[hsl(var(--fg))]">
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
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.3, duration: 0.55 }}
                    className="flex items-start gap-4 border-b border-[hsl(var(--border))] py-3 last:border-b-0"
                  >
                    <span className="mt-0.5 font-mono text-[0.7rem] text-[hsl(var(--accent))]">
                      {s.n}
                    </span>
                    <div className="flex-1">
                      <div className="text-[0.875rem] font-medium text-[hsl(var(--fg))]">
                        {s.title}
                      </div>
                      <div className="mt-0.5 text-[0.75rem] text-[hsl(var(--subtle))]">
                        {s.detail}
                      </div>
                    </div>
                    <motion.span
                      aria-hidden
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12 + 0.5, type: 'spring', stiffness: 220 }}
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--accent))]"
                      style={{ boxShadow: '0 0 10px hsl(var(--accent) / 0.7)' }}
                    />
                  </motion.li>
                ))}
              </ol>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
