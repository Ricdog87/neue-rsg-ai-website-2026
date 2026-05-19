'use client';

import { ArrowUpRight } from 'lucide-react';
import { useCases, site } from '@/lib/content';
import { motion } from 'framer-motion';
import { MaskWipe, SplitLines, Stagger } from '@/components/effects/reveal';
import { AgentIconByName } from '@/components/icons/agent-icons';

export function UseCasesSection() {
  return (
    <section
      id="usecases"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))] px-6 py-24 md:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-5">
            <MaskWipe>
              <span className="eyebrow">{useCases.eyebrow}</span>
            </MaskWipe>
            <SplitLines
              lines={[useCases.headline]}
              className="mt-6"
              lineClassName="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[hsl(var(--fg))]"
            />
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-2">
            <MaskWipe delay={0.2}>
              <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
                {useCases.subline}
              </p>
            </MaskWipe>
          </div>
        </div>

        <Stagger
          delayStep={0.06}
          className="mt-16 grid gap-px overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--border))] md:grid-cols-2 lg:grid-cols-3"
        >
          {useCases.items.map((item) => (
            <article
              key={item.name}
              data-cursor="hover"
              className="group relative flex flex-col gap-4 overflow-hidden bg-[hsl(var(--bg))] p-8 transition-colors hover:bg-[hsl(var(--surface))]"
            >
              {/* Hover accent glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(circle at 30% 0%, hsl(var(--accent) / 0.12), transparent 60%)',
                }}
              />
              <div className="relative flex items-start justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-[hsl(var(--border-strong))] bg-[hsl(var(--surface))] text-[hsl(var(--accent))] transition-all group-hover:border-[hsl(var(--accent))] group-hover:bg-[hsl(var(--accent))]/10">
                  <AgentIconByName name={item.name} className="h-5 w-5" />
                </span>
                <span className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--accent))]">
                  {item.kpi}
                </span>
              </div>
              <h3 className="relative font-display text-[1.375rem] font-medium leading-tight tracking-tight text-[hsl(var(--fg))]">
                {item.name}
              </h3>
              <p className="relative text-[0.95rem] leading-[1.6] text-[hsl(var(--muted))]">
                {item.body}
              </p>
            </article>
          ))}
        </Stagger>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex justify-start"
        >
          <a
            href={site.cta.meetingUrl}
            data-sound="tick"
            className="group inline-flex h-14 items-center gap-2 rounded-full border border-[hsl(var(--fg))] px-7 font-display text-[0.95rem] font-medium text-[hsl(var(--fg))] transition-all hover:bg-[hsl(var(--fg))] hover:text-[hsl(var(--bg))]"
          >
            Meinen Agenten besprechen
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
