'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonials } from '@/lib/content';

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))] px-6 py-24 md:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-5">
            <span className="eyebrow">{testimonials.eyebrow}</span>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-light leading-[1.02] tracking-[-0.02em] text-[hsl(var(--ink))]">
              {testimonials.headline}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-2">
            <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
              {testimonials.subline}
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--border))] md:grid-cols-3">
          {testimonials.items.map((item, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
              className="flex flex-col gap-8 bg-[hsl(var(--bg))] p-8 transition-colors hover:bg-[hsl(var(--surface))] md:p-10"
            >
              <Quote
                className="h-7 w-7 text-[hsl(var(--accent))] -scale-x-100"
                aria-hidden
              />
              <blockquote className="flex-1 font-display text-[1.15rem] font-light leading-[1.45] tracking-tight text-[hsl(var(--ink))] md:text-[1.25rem]">
                „{item.quote}"
              </blockquote>
              <figcaption className="flex items-end justify-between border-t border-[hsl(var(--border))] pt-6">
                <div>
                  <p className="text-[0.875rem] font-medium text-[hsl(var(--ink))]">
                    {item.author}
                  </p>
                  <p className="mt-0.5 text-[0.8rem] text-[hsl(var(--muted))]">
                    {item.company}
                  </p>
                  <p className="text-[0.75rem] text-[hsl(var(--subtle))]">
                    {item.meta}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display text-[1.5rem] font-light leading-none tracking-tight text-[hsl(var(--accent))]">
                    {item.saved}
                  </p>
                  <p className="mt-1 text-[0.65rem] uppercase tracking-wider text-[hsl(var(--subtle))]">
                    gespart
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
