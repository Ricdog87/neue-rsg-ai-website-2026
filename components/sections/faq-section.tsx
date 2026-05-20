'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Clock, Code2, Lock, Shield } from 'lucide-react';
import { MaskWipe, SplitLines } from '@/components/effects/reveal';
import { FAQ } from '@/lib/faq';

const GUARANTEES = [
  { Icon: Clock, label: '30-Tage-SLA', detail: 'oder Anpassung auf unsere Kosten' },
  { Icon: Code2, label: 'Du besitzt alles', detail: 'Code · Daten · Konfig' },
  { Icon: Lock, label: 'DSGVO · EU', detail: 'Frankfurt + Berlin · AVV inkl.' },
  { Icon: Shield, label: 'Festpreis', detail: 'vor dem ersten Commit' },
] as const;

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/82 backdrop-blur-[2px] px-6 py-20 md:py-28 lg:px-10"
    >
      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-5">
            <MaskWipe>
              <span className="eyebrow">Bevor du buchst</span>
            </MaskWipe>
            <SplitLines
              lines={['Vier Garantien.', 'Sieben Antworten.']}
              className="mt-6"
              lineClassName="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.025em] text-[hsl(var(--fg))]"
            />
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-2">
            <MaskWipe delay={0.2}>
              <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
                Erst was wir dir vertraglich schwarz auf weiß geben. Dann die
                sieben Fragen, die Buyer sonst erst in Minute 17 stellen.
              </p>
            </MaskWipe>
          </div>
        </div>

        {/* Four hard guarantees — compact strip */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GUARANTEES.map(({ Icon, label, detail }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-5"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[hsl(var(--border-strong))] text-[hsl(var(--accent))]">
                <Icon className="h-4 w-4" strokeWidth={1.5} />
              </span>
              <div>
                <div className="font-display text-[0.95rem] font-medium leading-tight text-[hsl(var(--fg))]">
                  {label}
                </div>
                <div className="mt-0.5 font-mono text-[0.7rem] uppercase tracking-wider text-[hsl(var(--subtle))]">
                  {detail}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <ul className="mt-16 border-t border-[hsl(var(--border))]">
          {FAQ.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <li
                key={item.q}
                className="border-b border-[hsl(var(--border))]"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  data-cursor="hover"
                  data-sound="tick"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  className="group flex w-full items-start justify-between gap-6 py-7 text-left transition-colors hover:bg-[hsl(var(--accent))/[0.03]] md:py-8"
                >
                  <div className="flex items-start gap-6">
                    <span className="mt-1.5 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))] transition-colors group-hover:text-[hsl(var(--accent))]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-[clamp(1.125rem,2vw,1.5rem)] font-medium leading-[1.3] tracking-[-0.01em] text-[hsl(var(--fg))]">
                      {item.q}
                    </h3>
                  </div>
                  <span
                    aria-hidden
                    className={
                      'mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ' +
                      (isOpen
                        ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]'
                        : 'border-[hsl(var(--border-strong))] text-[hsl(var(--fg))] group-hover:border-[hsl(var(--accent))]')
                    }
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.3, delay: isOpen ? 0.1 : 0 },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-12 gap-x-6 pb-8">
                        <div className="col-span-12 md:col-start-2 md:col-span-9">
                          <p className="text-[1rem] leading-[1.7] text-[hsl(var(--muted))]">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex items-center justify-between gap-6 text-[0.875rem]"
        >
          <p className="font-accent text-[1.05rem] font-light italic leading-[1.5] text-[hsl(var(--muted))] md:text-[1.25rem]">
            „Frage nicht beantwortet?
            <span className="text-[hsl(var(--fg))]"> Stell sie im Erstgespräch.</span>"
          </p>
        </motion.div>
      </div>
    </section>
  );
}
