'use client';

import { motion } from 'framer-motion';
import { timeline, site } from '@/lib/content';
import { ArrowUpRight } from 'lucide-react';

export function TimelineSection() {
  return (
    <section
      id="timeline"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))] px-6 py-24 md:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-5">
            <span className="eyebrow">{timeline.eyebrow}</span>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[hsl(var(--fg))]">
              {timeline.headline}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-2">
            <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
              {timeline.subline}
            </p>
          </div>
        </div>

        {/* Editorial timeline — vertical hairline with hanging steps */}
        <div className="mt-16 relative">
          <div
            aria-hidden
            className="absolute left-5 top-2 h-[calc(100%-1rem)] w-px bg-[hsl(var(--border))] md:left-7"
          />
          <ol className="space-y-12">
            {timeline.phases.map((phase, i) => (
              <motion.li
                key={phase.n}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.55 }}
                className="relative grid grid-cols-12 items-start gap-x-6 pl-14 md:pl-20"
              >
                {/* Marker */}
                <span className="absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full border border-[hsl(var(--border-strong))] bg-[hsl(var(--bg))] font-mono text-[0.75rem] text-[hsl(var(--accent))] md:left-2">
                  {String(phase.n).padStart(2, '0')}
                </span>
                <div className="col-span-12 md:col-span-4">
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
                    {phase.tag}
                  </span>
                  <h3 className="mt-2 font-display text-[1.5rem] font-medium leading-tight tracking-tight text-[hsl(var(--fg))]">
                    {phase.title}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-8 md:col-start-5">
                  <p className="text-[1rem] leading-[1.65] text-[hsl(var(--muted))]">
                    {phase.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-col items-start gap-6 border-t border-[hsl(var(--border))] pt-12 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <span className="font-display text-[clamp(3rem,7vw,5rem)] font-medium leading-none tracking-tight text-[hsl(var(--fg))]">
              {timeline.summary.weeks}
            </span>
            <p className="mt-2 text-[0.95rem] text-[hsl(var(--muted))]">
              {timeline.summary.label}
            </p>
          </div>
          <a
            href={site.cta.meetingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-14 items-center gap-2 rounded-full border border-[hsl(var(--accent))] bg-[hsl(var(--accent))]/90 px-7 font-display text-[0.95rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))]"
          >
            Jetzt starten
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
