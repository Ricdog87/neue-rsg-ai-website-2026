'use client';

import { motion } from 'framer-motion';
import { solutions, site } from '@/lib/content';
import { Magnetic } from '@/components/effects/magnetic';
import { TiltCard } from '@/components/effects/tilt-card';
import { ScrollParallax } from '@/components/effects/scroll-parallax';
import { ScrollScale } from '@/components/effects/scroll-scale';

export function SolutionsSection() {
  return (
    <section
      id="solutions"
      className="relative border-t border-white/5 bg-[hsl(var(--bg))] px-4 py-20 sm:px-6 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))]">
          {solutions.eyebrow}
        </p>
        <ScrollParallax x={-8}>
          <h2 className="mt-4 font-display text-balance text-3xl tracking-tight sm:text-4xl md:text-6xl">
            {solutions.headline}
          </h2>
        </ScrollParallax>
        <p className="mt-6 max-w-3xl text-base text-[hsl(var(--muted))] md:text-lg">
          {solutions.subline}
        </p>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Steps */}
          <ScrollScale from={0.95} to={1} out={1}>
          <div className="space-y-4">
            {solutions.steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="flex gap-4 rounded-xl border border-white/8 bg-white/[0.03] p-5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[hsl(var(--neon))/30] bg-[hsl(var(--neon))/8] font-mono text-xs text-[hsl(var(--neon))]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-[hsl(var(--muted))]">{step.body}</p>
                </div>
              </motion.div>
            ))}
            <Magnetic strength={0.3}>
              <a
                href={site.cta.meetingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                {solutions.cta} →
              </a>
            </Magnetic>
          </div>
          </ScrollScale>

          {/* Pipeline visual */}
          <ScrollParallax y={-12}>
          <TiltCard className="rounded-2xl border border-white/8 bg-black/40 p-6 font-mono">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[hsl(var(--neon))] shadow-[0_0_8px_hsl(var(--neon))]" />
              <span className="text-xs text-[hsl(var(--neon))]">{solutions.pipeline.title} · AKTIV</span>
              <span className="ml-auto rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-[hsl(var(--muted))]">
                ∅ {solutions.pipeline.timeSaved} gespart
              </span>
            </div>
            <div className="space-y-2">
              {solutions.pipeline.steps.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.3 }}
                  className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.03] p-3"
                >
                  <span className="mt-0.5 text-xs text-[hsl(var(--accent))]">{s.n}</span>
                  <div>
                    <div className="text-xs font-medium">{s.title}</div>
                    <div className="text-[10px] text-[hsl(var(--muted))]">{s.detail}</div>
                  </div>
                  <span className="ml-auto mt-0.5 h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon))] opacity-60" />
                </motion.div>
              ))}
            </div>
          </TiltCard>
          </ScrollParallax>
        </div>
      </div>
    </section>
  );
}
