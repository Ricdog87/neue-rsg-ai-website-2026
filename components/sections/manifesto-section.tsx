'use client';

import { motion } from 'framer-motion';
import { about } from '@/lib/content';

export function ManifestoSection() {
  return (
    <section
      id="manifesto"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--ink))] text-white px-6 py-24 md:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        <span className="eyebrow !text-[hsl(var(--accent-soft))] before:!bg-[hsl(var(--accent-soft))]">
          Manifesto
        </span>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-10 max-w-5xl font-display text-balance text-[clamp(2rem,5.5vw,4.5rem)] font-light leading-[1.02] tracking-[-0.02em]"
        >
          „Wir sind kein IT-Unternehmen,{' '}
          <span className="font-accent italic text-[hsl(var(--accent-soft))]">
            das Vertrieb erklärt bekommt.
          </span>
          "
        </motion.blockquote>

        <div className="mt-20 grid gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {about.pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-[hsl(var(--ink))] p-7"
            >
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-white/50">
                №&nbsp;{String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-display text-[1.25rem] font-medium tracking-tight text-white">
                {p.title}
              </h3>
              <p className="mt-3 text-[0.9rem] leading-[1.6] text-white/65">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 flex items-start gap-6 border-t border-white/10 pt-10"
        >
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[hsl(var(--accent))] font-display text-base font-medium text-white">
            RS
          </div>
          <div>
            <p className="font-accent text-[1.25rem] font-light italic leading-[1.5] text-white md:text-[1.5rem]">
              „{about.quote}"
            </p>
            <p className="mt-3 text-[0.8rem] text-white/55">
              — {about.founder.name}, {about.founder.role}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
