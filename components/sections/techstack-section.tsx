'use client';

import { motion } from 'framer-motion';
import { techStack } from '@/lib/content';

export function TechStackSection() {
  return (
    <section
      id="techstack"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-6 py-24 md:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-5">
            <span className="eyebrow">{techStack.eyebrow}</span>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[hsl(var(--ink))]">
              {techStack.headline}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-2">
            <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
              {techStack.subline}
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--border))] md:grid-cols-2 lg:grid-cols-3">
          {techStack.items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="flex flex-col gap-3 bg-[hsl(var(--bg))] p-8"
            >
              <span className="inline-block w-fit font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
                {item.tag}
              </span>
              <h3 className="font-display text-[1.15rem] font-medium tracking-tight text-[hsl(var(--ink))]">
                {item.title}
              </h3>
              <p className="text-[0.9rem] leading-[1.6] text-[hsl(var(--muted))]">
                {item.body}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--border))] sm:grid-cols-2 lg:grid-cols-4">
          {techStack.badges.map((badge) => (
            <div key={badge.label} className="bg-[hsl(var(--bg))] p-5">
              <div className="font-display text-[0.95rem] font-medium text-[hsl(var(--ink))]">
                {badge.label}
              </div>
              <div className="mt-1 text-[0.8rem] text-[hsl(var(--muted))]">{badge.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
