'use client';

import { motion } from 'framer-motion';
import { testimonials } from '@/lib/content';

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative border-t border-white/5 bg-[hsl(var(--bg))] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))]">
          {testimonials.eyebrow}
        </p>
        <h2 className="mt-4 font-display text-balance text-4xl tracking-tight md:text-6xl">
          {testimonials.headline}
        </h2>
        <p className="mt-6 max-w-3xl text-base text-[hsl(var(--muted))] md:text-lg">
          {testimonials.subline}
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-7"
            >
              {/* Stars */}
              <div className="flex gap-1 text-[hsl(var(--neon))]">
                {'★★★★★'.split('').map((s, j) => (
                  <span key={j} className="text-sm">{s}</span>
                ))}
              </div>

              <p className="flex-1 text-sm italic leading-relaxed text-[hsl(var(--fg))]">
                "{item.quote}"
              </p>

              <div className="border-t border-white/8 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">{item.author}</p>
                    <p className="text-xs text-[hsl(var(--muted))]">{item.company}</p>
                    <p className="text-xs text-[hsl(var(--muted))]">{item.meta}</p>
                  </div>
                  <div className="rounded-lg border border-[hsl(var(--neon))/25] bg-[hsl(var(--neon))/8] px-3 py-2 text-center">
                    <span className="font-mono text-sm font-bold text-[hsl(var(--neon))]">
                      {item.saved}
                    </span>
                    <p className="text-[10px] text-[hsl(var(--muted))]">gespart</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
