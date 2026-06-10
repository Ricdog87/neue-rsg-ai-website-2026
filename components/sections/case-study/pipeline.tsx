'use client';

import { motion } from 'framer-motion';
import {
  Mail,
  Database,
  Brain,
  Slack,
  Calendar,
  MessageSquare,
  FileSearch,
  FileText,
  CheckCircle2,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { MaskWipe, SplitLines } from '@/components/effects/reveal';
import type { CaseStudy, CaseStep } from '@/lib/case-studies';

const ICONS: Record<string, LucideIcon> = {
  Mail,
  Database,
  Brain,
  Slack,
  Calendar,
  MessageSquare,
  FileSearch,
  FileText,
  CheckCircle2,
  Workflow,
};

const TONE_COLOR: Record<string, string> = {
  input: 'hsl(var(--neon))',
  ai: 'hsl(var(--accent))',
  system: 'hsl(0 0% 65%)',
  output: 'hsl(174 100% 70%)',
};

export function CaseStudyPipeline({ cs, en = false }: { cs: CaseStudy; en?: boolean }) {
  return (
    <section
      id="case-pipeline"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/82 backdrop-blur-[2px] px-6 py-20 md:py-28 lg:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Problem framing */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-5">
            <MaskWipe>
              <span className="eyebrow">§ 02 · {cs.problem.headline}</span>
            </MaskWipe>
            <SplitLines
              lines={en ? ['What didn’t', 'work.'] : ['Was nicht', 'funktioniert hat.']}
              className="mt-6"
              lineClassName="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.025em] text-[hsl(var(--fg))]"
            />
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-2">
            <MaskWipe delay={0.2}>
              <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
                {cs.problem.body}
              </p>
            </MaskWipe>
            <ul className="mt-8 space-y-3">
              {cs.problem.bullets.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.55 }}
                  className="flex items-start gap-3 text-[0.95rem] leading-[1.6] text-[hsl(var(--fg))]"
                >
                  <span
                    aria-hidden
                    className="mt-2.5 h-px w-4 shrink-0 bg-[hsl(0_72%_58%)]"
                  />
                  <span>{b}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pipeline visualization */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-20 overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-8 md:p-10"
          style={{ boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.04)' }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full opacity-30 blur-[120px]"
            style={{
              background: 'radial-gradient(circle, hsl(var(--accent) / 0.35), transparent 65%)',
            }}
          />

          <div className="relative grid grid-cols-12 gap-x-6 gap-y-4">
            <div className="col-span-12 md:col-span-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--accent))/30] bg-[hsl(var(--accent))/10] px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(var(--accent))] opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />
                  </span>
                  Pipeline · Live
                </span>
              </div>
              <h3 className="mt-4 font-display text-[clamp(1.375rem,2.5vw,1.875rem)] font-medium leading-[1.15] tracking-tight text-[hsl(var(--fg))]">
                {cs.pipeline.title}
              </h3>
            </div>
            <div className="col-span-12 md:col-span-4 md:text-right">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
                Ø Zeit-Ersparnis
              </p>
              <p className="mt-2 font-display text-[1.5rem] font-medium tracking-tight text-[hsl(var(--neon))]">
                {cs.pipeline.timeSaved}
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="relative mt-10 overflow-x-auto">
            <div className="flex min-w-[840px] items-stretch gap-2">
              {cs.pipeline.steps.map((step: CaseStep, si: number) => {
                const Icon = ICONS[step.icon] ?? Workflow;
                const color = TONE_COLOR[step.tone ?? 'system'];
                const isLast = si === cs.pipeline.steps.length - 1;
                return (
                  <div key={si} className="flex flex-1 items-center">
                    <motion.div
                      initial={{ opacity: 0, y: 16, scale: 0.92 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: '-15% 0px' }}
                      transition={{ delay: 0.2 + si * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="flex w-full flex-col items-center gap-3"
                    >
                      <span className="font-mono text-[0.6rem] tracking-[0.2em] text-[hsl(var(--subtle))]">
                        {String(si + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="grid h-14 w-14 place-items-center rounded-full border bg-[hsl(var(--bg))]"
                        style={{
                          borderColor: color,
                          color,
                          boxShadow: `0 0 24px -8px ${color.replace(')', ' / 0.6)')}`,
                        }}
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                      <div className="px-1 text-center">
                        <div className="font-display text-[0.85rem] font-medium leading-tight text-[hsl(var(--fg))]">
                          {step.label}
                        </div>
                        <div className="mt-0.5 text-[0.7rem] leading-tight text-[hsl(var(--subtle))]">
                          {step.detail}
                        </div>
                      </div>
                    </motion.div>

                    {!isLast && (
                      <div className="relative mx-1 h-px flex-1 shrink-0 self-center">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true, margin: '-15% 0px' }}
                          transition={{ delay: 0.4 + si * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          className="h-px w-full origin-left bg-gradient-to-r from-[hsl(var(--border-strong))] to-[hsl(var(--border-strong))]/30"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
