'use client';

import { motion } from 'framer-motion';
import { techStack } from '@/lib/content';

const TAG_COLORS: Record<string, string> = {
  Orchestration:  'text-[hsl(var(--neon))]   bg-[hsl(var(--neon))/8]   border-[hsl(var(--neon))/25]',
  Architecture:   'text-[hsl(var(--accent))] bg-[hsl(var(--accent))/8] border-[hsl(var(--accent))/25]',
  Infrastructure: 'text-blue-400 bg-blue-400/8 border-blue-400/25',
  Security:       'text-red-400 bg-red-400/8 border-red-400/25',
  Observability:  'text-yellow-400 bg-yellow-400/8 border-yellow-400/25',
  Compliance:     'text-emerald-400 bg-emerald-400/8 border-emerald-400/25',
};

export function TechStackSection() {
  return (
    <section
      id="techstack"
      className="relative border-t border-white/5 bg-[hsl(var(--bg))] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))]">
          {techStack.eyebrow}
        </p>
        <h2 className="mt-4 font-display text-balance text-4xl tracking-tight md:text-6xl">
          {techStack.headline}
        </h2>
        <p className="mt-6 max-w-3xl text-base text-[hsl(var(--muted))] md:text-lg">
          {techStack.subline}
        </p>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-6"
            >
              <span
                className={`rounded-full border px-2.5 py-1 font-mono text-[10px] ${TAG_COLORS[item.tag] ?? 'text-[hsl(var(--muted))] border-white/10 bg-white/5'}`}
              >
                {item.tag}
              </span>
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-[hsl(var(--muted))] leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Badge bar */}
        <div className="mt-10 flex flex-wrap gap-3">
          {techStack.badges.map(badge => (
            <div
              key={badge.label}
              className="rounded-xl border border-white/8 bg-white/[0.04] px-5 py-3"
            >
              <div className="font-semibold text-sm">{badge.label}</div>
              <div className="mt-0.5 text-xs text-[hsl(var(--muted))]">{badge.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
