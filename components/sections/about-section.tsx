'use client';

import { motion } from 'framer-motion';
import { about, site } from '@/lib/content';
import Image from 'next/image';
import { ScrollParallax } from '@/components/effects/scroll-parallax';
import { ScrollScale } from '@/components/effects/scroll-scale';

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative border-t border-white/5 bg-[hsl(var(--bg))] px-4 py-20 sm:px-6 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))]">
          {about.eyebrow}
        </p>
        <ScrollParallax x={-8}>
          <h2 className="mt-4 font-display text-balance text-3xl tracking-tight sm:text-4xl md:text-6xl">
            {about.headline}
          </h2>
        </ScrollParallax>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          {/* Text */}
          <div className="space-y-5">
            {about.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`leading-relaxed ${i === 2 ? 'font-semibold text-[hsl(var(--fg))]' : 'text-[hsl(var(--muted))]'}`}
              >
                {p}
              </motion.p>
            ))}

            <motion.blockquote
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border-l-2 border-[hsl(var(--accent))] pl-5 italic text-[hsl(var(--muted))]"
            >
              "{about.quote}"
            </motion.blockquote>
          </div>

          {/* Founder card + pillars */}
          <div className="space-y-4">
            <ScrollScale from={0.94} to={1} out={1}>
            <ScrollParallax rotate={1}>
            <div className="flex items-center gap-5 rounded-2xl border border-white/8 bg-white/[0.03] p-6">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-[hsl(var(--accent))/30]">
                <Image
                  src={about.founder.photo}
                  alt={about.founder.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div>
                <p className="font-semibold">{about.founder.name}</p>
                <p className="text-sm text-[hsl(var(--muted))]">{about.founder.role}</p>
                <p className="text-sm text-[hsl(var(--muted))]">{about.founder.company}</p>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block font-mono text-xs text-[hsl(var(--neon))] hover:underline"
                >
                  LinkedIn →
                </a>
              </div>
            </div>
            </ScrollParallax>
            </ScrollScale>

            <div className="grid grid-cols-2 gap-3">
              {about.pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="rounded-xl border border-white/8 bg-white/[0.02] p-4"
                >
                  <h3 className="text-sm font-semibold">{p.title}</h3>
                  <p className="mt-1 text-xs text-[hsl(var(--muted))] leading-relaxed">{p.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
