'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { problems } from '@/lib/content';
import { MaskWipe, SplitLines, Stagger, Ticker } from '@/components/effects/reveal';

const REAL_STATS = [
  { value: 67, suffix: ' %' },
  { value: 40, suffix: ' %' },
  { value: 89000, suffix: ' €', fmt: (n: number) => Math.round(n / 1000) + 'K' },
  { value: 74, suffix: ' %' },
];

export function ProblemsSection() {
  return (
    <section
      id="problems"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))] px-6 py-24 md:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-5">
            <MaskWipe>
              <span className="eyebrow">{problems.eyebrow}</span>
            </MaskWipe>
            <SplitLines
              lines={[problems.headline]}
              className="mt-6"
              lineClassName="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[hsl(var(--fg))]"
            />
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-2">
            <MaskWipe delay={0.2}>
              <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
                {problems.subline}
              </p>
            </MaskWipe>
          </div>
        </div>

        <Stagger className="mt-20 grid gap-px overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--border))] md:grid-cols-2">
          {problems.items.map((item, i) => (
            <article
              key={item.title}
              data-cursor="hover"
              className="group flex flex-col gap-6 bg-[hsl(var(--bg))] p-8 transition-colors hover:bg-[hsl(var(--surface))] md:p-10"
            >
              <div className="flex items-start justify-between gap-6">
                <span className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-[hsl(var(--subtle))]">
                  №&nbsp;{String(i + 1).padStart(2, '0')}
                </span>
                <Ticker
                  value={REAL_STATS[i]?.value ?? 0}
                  suffix={REAL_STATS[i]?.suffix ?? ''}
                  fmt={REAL_STATS[i]?.fmt}
                  className="font-display text-[2.5rem] font-medium leading-none tracking-tight text-[hsl(var(--accent))]"
                />
              </div>
              <h3 className="font-display text-[1.5rem] font-medium leading-tight tracking-tight text-[hsl(var(--fg))]">
                {item.title}
              </h3>
              <p className="text-[0.95rem] leading-[1.65] text-[hsl(var(--muted))]">
                {item.body}
              </p>
              <p className="mt-auto text-[0.75rem] uppercase tracking-wider text-[hsl(var(--subtle))]">
                {item.stat.label
                  .replace('TODO:%', '')
                  .replace('TODO:K€', '')}
              </p>
            </article>
          ))}
        </Stagger>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid grid-cols-12 gap-x-6 border-t border-[hsl(var(--border))] pt-12"
        >
          <div className="col-span-12 md:col-span-7">
            <h3 className="font-display text-[1.625rem] font-medium leading-tight tracking-tight text-[hsl(var(--fg))]">
              {problems.outro.title}
            </h3>
            <p className="mt-4 max-w-2xl text-[0.95rem] leading-[1.65] text-[hsl(var(--muted))]">
              {problems.outro.body}
            </p>
          </div>
          <div className="col-span-12 mt-6 flex md:col-span-5 md:mt-0 md:items-end md:justify-end">
            <a
              href="#solutions"
              data-sound="tick"
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-[hsl(var(--fg))] px-6 font-display text-sm font-medium text-[hsl(var(--fg))] transition-all hover:bg-[hsl(var(--fg))] hover:text-[hsl(var(--bg))]"
            >
              {problems.outro.cta}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
