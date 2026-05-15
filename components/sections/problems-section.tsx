'use client';

import { motion } from 'framer-motion';
import { problems } from '@/lib/content';
import { ScrollParallax } from '@/components/effects/scroll-parallax';
import { ScrollScale } from '@/components/effects/scroll-scale';

const REAL_STATS = ['67%', '40%', '89.000 €', '74%'];

export function ProblemsSection() {
  return (
    <section
      id="problems"
      className="relative border-t border-white/5 bg-[hsl(var(--bg))] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))]">
          {problems.eyebrow}
        </p>
        <ScrollParallax x={-8}>
          <h2 className="mt-4 font-display text-balance text-4xl tracking-tight md:text-6xl">
            {problems.headline}
          </h2>
        </ScrollParallax>
        <p className="mt-6 max-w-3xl text-base text-[hsl(var(--muted))] md:text-lg">
          {problems.subline}
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {problems.items.map((item, i) => (
            <ScrollScale key={item.title} from={0.92} to={1} out={1}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-7"
            >
              <div className="mb-4 flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[hsl(var(--accent))/30] bg-[hsl(var(--accent))/10] font-mono text-xs text-[hsl(var(--accent))]">
                  {i + 1}
                </span>
                <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
              </div>
              <p className="text-sm text-[hsl(var(--muted))] leading-relaxed">{item.body}</p>
              <div className="mt-5 rounded-xl border border-[hsl(var(--neon))/15] bg-[hsl(var(--neon))/5] px-4 py-3">
                <span className="font-mono text-2xl font-bold text-[hsl(var(--neon))]">
                  {REAL_STATS[i] ?? '—'}
                </span>
                <p className="mt-0.5 text-xs text-[hsl(var(--muted))]">
                  {item.stat.label.replace('TODO:%', '').replace('TODO:K€', '')}
                </p>
              </div>
            </motion.div>
            </ScrollScale>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 rounded-2xl border border-white/8 bg-white/[0.02] p-7"
        >
          <h3 className="text-xl font-semibold">{problems.outro.title}</h3>
          <p className="mt-3 max-w-3xl text-sm text-[hsl(var(--muted))] leading-relaxed">
            {problems.outro.body}
          </p>
          <a
            href="#solutions"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--accent))] px-5 py-2.5 text-sm font-medium text-[hsl(var(--accent))] transition hover:bg-[hsl(var(--accent))/10]"
          >
            {problems.outro.cta} →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
