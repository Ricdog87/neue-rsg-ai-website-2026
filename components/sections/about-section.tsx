'use client';

import { motion } from 'framer-motion';
import { about, site } from '@/lib/content';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))] px-6 py-24 md:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-7">
            <span className="eyebrow">{about.eyebrow}</span>
            <h2 className="mt-6 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[hsl(var(--ink))]">
              {about.headline}
            </h2>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          {/* Text column */}
          <div className="lg:col-span-7">
            <div className="space-y-6">
              {about.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.55 }}
                  className={
                    'text-[1.05rem] leading-[1.7] ' +
                    (i === 2
                      ? 'font-medium text-[hsl(var(--ink))]'
                      : 'text-[hsl(var(--muted))]')
                  }
                >
                  {p}
                </motion.p>
              ))}

              <motion.blockquote
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mt-10 border-l-2 border-[hsl(var(--accent))] pl-6 font-accent text-[1.5rem] font-light italic leading-[1.45] text-[hsl(var(--ink))] md:text-[1.75rem]"
              >
                „{about.quote}"
              </motion.blockquote>
            </div>
          </div>

          {/* Right column — founder + pillars */}
          <aside className="lg:col-span-5">
            <div className="rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--bg))] p-7 shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-5">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-[hsl(var(--border))]">
                  <Image
                    src={about.founder.photo}
                    alt={about.founder.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div>
                  <p className="font-display text-[1.15rem] font-medium tracking-tight text-[hsl(var(--ink))]">
                    {about.founder.name}
                  </p>
                  <p className="text-[0.875rem] text-[hsl(var(--muted))]">
                    {about.founder.role}
                  </p>
                  <p className="text-[0.875rem] text-[hsl(var(--muted))]">
                    {about.founder.company}
                  </p>
                  <a
                    href={site.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[hsl(var(--accent))] hover:underline"
                  >
                    LinkedIn <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-px overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--border))] sm:grid-cols-2">
              {about.pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-[hsl(var(--bg))] p-5"
                >
                  <h3 className="font-display text-[0.95rem] font-medium text-[hsl(var(--ink))]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[0.8rem] leading-relaxed text-[hsl(var(--muted))]">
                    {p.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
