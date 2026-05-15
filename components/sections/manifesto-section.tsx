'use client';

import { motion } from 'framer-motion';
import { about } from '@/lib/content';
import { ScrollParallax } from '@/components/effects/scroll-parallax';
import { ScrollScale } from '@/components/effects/scroll-scale';

export function ManifestoSection() {
  return (
    <section
      id="manifesto"
      className="relative border-t border-white/5 bg-[hsl(var(--bg))] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))]">
          Manifesto
        </p>

        <ScrollParallax x={-12} className="mt-8">
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display text-balance text-4xl leading-tight tracking-tight md:text-6xl"
          >
            "Wir sind kein IT-Unternehmen, das Vertrieb erklärt&nbsp;bekommt."
          </motion.blockquote>
        </ScrollParallax>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {about.pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-xl border border-white/8 bg-white/[0.03] p-5"
            >
              <h3 className="font-semibold text-[hsl(var(--fg))]">{p.title}</h3>
              <p className="mt-2 text-sm text-[hsl(var(--muted))] leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>

        <ScrollScale from={0.9} to={1.02} out={0.95} className="mt-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center gap-5 rounded-2xl border border-[hsl(var(--accent))/20] bg-[hsl(var(--accent))/5] p-7"
        >
          <div className="h-14 w-14 shrink-0 rounded-full border-2 border-[hsl(var(--accent))/40] bg-[hsl(var(--accent))/20] flex items-center justify-center text-2xl">
            RS
          </div>
          <div>
            <p className="text-sm italic text-[hsl(var(--muted))]">"{about.quote}"</p>
            <p className="mt-2 text-xs text-[hsl(var(--muted))]">
              — {about.founder.name}, {about.founder.role}
            </p>
          </div>
        </motion.div>
        </ScrollScale>
      </div>
    </section>
  );
}
