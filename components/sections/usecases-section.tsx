'use client';

import { motion } from 'framer-motion';
import { useCases, site } from '@/lib/content';
import { ArrowUpRight } from 'lucide-react';

const ICONS: Record<string, string> = {
  'Support-Agent': '🎧',
  'Operations-Agent': '⚙️',
  'E-Mail-Agent': '✉️',
  'Onboarding-Agent': '🚀',
  'Sales-Agent': '📈',
  'Admin-Agent': '🗂️'
};

export function UseCasesSection() {
  return (
    <section
      id="usecases"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))] px-6 py-24 md:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-5">
            <span className="eyebrow">{useCases.eyebrow}</span>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[hsl(var(--ink))]">
              {useCases.headline}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-2">
            <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
              {useCases.subline}
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--border))] md:grid-cols-2 lg:grid-cols-3">
          {useCases.items.map((item, i) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group flex flex-col gap-4 bg-[hsl(var(--bg))] p-8 transition-colors hover:bg-[hsl(var(--surface))]"
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl">{ICONS[item.name] ?? '🤖'}</span>
                <span className="rounded-full bg-[hsl(var(--accent-soft))] px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--accent))]">
                  {item.kpi}
                </span>
              </div>
              <h3 className="font-display text-[1.375rem] font-medium leading-tight tracking-tight text-[hsl(var(--ink))]">
                {item.name}
              </h3>
              <p className="text-[0.95rem] leading-[1.6] text-[hsl(var(--muted))]">
                {item.body}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex justify-start">
          <a
            href={site.cta.meetingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-14 items-center gap-2 rounded-full border border-[hsl(var(--ink))] px-7 font-display text-[0.95rem] font-medium text-[hsl(var(--ink))] transition-all hover:bg-[hsl(var(--ink))] hover:text-white"
          >
            Meinen Agenten besprechen
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
