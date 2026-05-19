'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { problems } from '@/lib/content';

const REAL_STATS = ['67%', '40%', '89.000 €', '74%'];

export function ProblemsSection() {
  return (
    <section
      id="problems"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))] px-6 py-24 md:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Section header — editorial two-column */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-5">
            <span className="eyebrow">{problems.eyebrow}</span>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-light leading-[1.02] tracking-[-0.02em] text-[hsl(var(--fg))]">
              {problems.headline}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-2">
            <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
              {problems.subline}
            </p>
          </div>
        </div>

        {/* Problems grid — bordered cards on paper */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--border))] md:grid-cols-2">
          {problems.items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group flex flex-col gap-6 bg-[hsl(var(--bg))] p-8 transition-colors hover:bg-[hsl(var(--surface))] md:p-10"
            >
              <div className="flex items-start justify-between gap-6">
                <span className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-[hsl(var(--subtle))]">
                  №&nbsp;{String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-[2.5rem] font-light leading-none tracking-tight text-[hsl(var(--accent))]">
                  {REAL_STATS[i] ?? '—'}
                </span>
              </div>
              <h3 className="font-display text-[1.5rem] font-medium leading-tight tracking-tight text-[hsl(var(--fg))]">
                {item.title}
              </h3>
              <p className="text-[0.95rem] leading-[1.65] text-[hsl(var(--muted))]">
                {item.body}
              </p>
              <p className="mt-auto text-[0.75rem] uppercase tracking-wider text-[hsl(var(--subtle))]">
                {item.stat.label.replace('TODO:%', '').replace('TODO:K€', '')}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Outro */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-[hsl(var(--ink))] px-6 text-sm font-medium text-[hsl(var(--fg))] transition-all hover:bg-[hsl(var(--ink))] hover:text-[hsl(var(--bg))]"
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
