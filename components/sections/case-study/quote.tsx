'use client';

import { motion } from 'framer-motion';
import { MaskWipe } from '@/components/effects/reveal';
import type { CaseStudy } from '@/lib/case-studies';

export function CaseStudyQuote({ cs }: { cs: CaseStudy }) {
  return (
    <section
      id="case-quote"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/82 backdrop-blur-[2px] px-6 py-24 md:py-32 lg:px-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 30%, hsl(var(--accent) / 0.08), transparent 65%)',
        }}
      />

      <div className="relative mx-auto max-w-[1080px]">
        <MaskWipe>
          <span className="eyebrow">§ 04 · Stimme aus der Werkstatt</span>
        </MaskWipe>

        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="mt-10"
        >
          <span
            aria-hidden
            className="block font-display text-[6rem] leading-none text-[hsl(var(--accent))]/30"
          >
            “
          </span>
          <blockquote className="-mt-6 font-accent text-[clamp(1.5rem,3vw,2.5rem)] font-normal italic leading-[1.3] tracking-[-0.01em] text-[hsl(var(--fg))]">
            {cs.quote.text}
          </blockquote>

          <figcaption className="mt-10 flex flex-col gap-1 border-t border-[hsl(var(--border))] pt-6 sm:flex-row sm:items-baseline sm:justify-between">
            <span className="font-display text-[0.95rem] font-medium text-[hsl(var(--fg))]">
              {cs.quote.author}
            </span>
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
              {cs.quote.company}
            </span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
