'use client';

import { motion } from 'framer-motion';
import { timeline, site } from '@/lib/content';
import { Magnetic } from '@/components/effects/magnetic';
import { ScrollParallax } from '@/components/effects/scroll-parallax';
import { ScrollScale } from '@/components/effects/scroll-scale';

const TAG_COLORS: Record<string, string> = {
  Discovery: 'text-[hsl(var(--neon))] border-[hsl(var(--neon))/30] bg-[hsl(var(--neon))/8]',
  Design:    'text-[hsl(var(--accent))] border-[hsl(var(--accent))/30] bg-[hsl(var(--accent))/8]',
  Build:     'text-blue-400 border-blue-400/30 bg-blue-400/8',
  QA:        'text-yellow-400 border-yellow-400/30 bg-yellow-400/8',
  Launch:    'text-emerald-400 border-emerald-400/30 bg-emerald-400/8',
};

export function TimelineSection() {
  return (
    <section
      id="timeline"
      className="relative border-t border-white/5 bg-[hsl(var(--bg))] px-4 py-20 sm:px-6 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))]">
          {timeline.eyebrow}
        </p>
        <ScrollParallax x={-8}>
          <h2 className="mt-4 font-display text-balance text-3xl tracking-tight sm:text-4xl md:text-6xl">
            {timeline.headline}
          </h2>
        </ScrollParallax>
        <p className="mt-6 max-w-3xl text-base text-[hsl(var(--muted))] md:text-lg">
          {timeline.subline}
        </p>

        {/* Timeline */}
        <div className="mt-14 relative">
          {/* Vertical line */}
          <ScrollParallax y={20} className="absolute left-6 top-0 h-full w-px md:left-8">
            <div className="h-full w-full bg-gradient-to-b from-[hsl(var(--neon))/40] via-[hsl(var(--accent))/30] to-transparent" />
          </ScrollParallax>

          <div className="space-y-6">
            {timeline.phases.map((phase, i) => (
              <ScrollScale key={phase.n} from={0.94} to={1} out={1}>
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative flex gap-4 pl-12 sm:pl-14 md:pl-20"
              >
                {/* Circle on line */}
                <div className="absolute left-2 top-3 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[hsl(var(--neon))/40] bg-[hsl(var(--bg))] sm:left-3 md:left-5 md:h-7 md:w-7">
                  <span className="font-mono text-[10px] text-[hsl(var(--neon))]">{phase.n}</span>
                </div>

                <div className="flex-1 rounded-xl border border-white/8 bg-white/[0.03] p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] ${TAG_COLORS[phase.tag] ?? 'text-[hsl(var(--muted))] border-white/10'}`}
                    >
                      {phase.tag}
                    </span>
                    <h3 className="font-semibold">{phase.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-[hsl(var(--muted))] leading-relaxed">{phase.body}</p>
                </div>
              </motion.div>
              </ScrollScale>
            ))}
          </div>
        </div>

        {/* Summary badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-start gap-5 rounded-2xl border border-[hsl(var(--neon))/25] bg-[hsl(var(--neon))/5] p-5 md:p-7 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <span className="font-mono text-4xl font-bold text-[hsl(var(--neon))] md:text-5xl">
              {timeline.summary.weeks}
            </span>
            <p className="mt-1 text-sm text-[hsl(var(--muted))]">{timeline.summary.label}</p>
          </div>
          <Magnetic strength={0.3}>
            <a
              href={site.cta.meetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[hsl(var(--neon))] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Jetzt starten →
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
