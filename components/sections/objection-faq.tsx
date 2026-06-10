'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { FAQ, FAQ_EN } from '@/lib/faq';
import { useEnglish } from '@/components/system/use-locale';

/**
 * Objection-Handling-FAQ — die 7 Fragen, die Entscheider stellen,
 * direkt vor dem finalen CTA beantwortet. Senkt Kauf-Reibung genau dort,
 * wo der Besucher sonst abspringt.
 */
export function ObjectionFaq() {
  const en = useEnglish();
  const items = en ? FAQ_EN : FAQ;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative px-6 py-20 md:py-28 lg:px-10">
      <div className="mx-auto max-w-[920px]">
        <div className="max-w-2xl">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
            {en ? 'Before you decide' : 'Bevor du entscheidest'}
          </span>
          <h2 className="mt-3 font-display text-[clamp(1.875rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
            {en ? 'The 7 questions decision-makers ask — answered.' : 'Die 7 Fragen, die Entscheider stellen — beantwortet.'}
          </h2>
        </div>

        <div className="mt-12 divide-y divide-[hsl(var(--border))] border-y border-[hsl(var(--border))]">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 py-5 text-left"
                >
                  <span className="font-mono text-[0.75rem] tabular-nums text-[hsl(var(--accent))]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 font-display text-[1.05rem] font-medium leading-snug text-[hsl(var(--fg))]">
                    {it.q}
                  </span>
                  <Plus
                    className={
                      'h-4 w-4 shrink-0 text-[hsl(var(--muted))] transition-transform duration-300 ' +
                      (isOpen ? 'rotate-45 text-[hsl(var(--accent))]' : '')
                    }
                    strokeWidth={2}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[68ch] pb-6 pl-10 pr-6 text-[0.98rem] leading-[1.65] text-[hsl(var(--muted))]">
                        {it.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
