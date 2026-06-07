'use client';

import { motion } from 'framer-motion';
import { Check, ArrowUpRight } from 'lucide-react';
import { site } from '@/lib/content';
import { TARIFFS, priceFor } from '@/lib/callcenter';
import { useTerm, TermSwitch } from '@/components/sections/callcenter/provider';

const fmtEur = (n: number) => n.toLocaleString('de-DE') + ' €';

export function CallcenterPricing() {
  const { term } = useTerm();

  return (
    <section
      id="preise"
      className="relative scroll-mt-24 border-t border-[hsl(var(--border))] bg-[hsl(var(--surface))]/82 px-6 py-20 backdrop-blur-[2px] md:py-28 lg:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Preise &amp; Laufzeiten</span>
          <h2 className="mt-6 font-display text-[clamp(1.875rem,3.8vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
            Drei Tarife. Transparent. Netto.
          </h2>
          <p className="mx-auto mt-4 text-[1rem] leading-relaxed text-[hsl(var(--muted))]">
            Wähl deine Laufzeit — längere Bindung senkt Monatspreis und Einrichtung.
            Bei Jahresvorkasse entfällt die Einrichtungsgebühr.
          </p>
          <div className="mt-8 flex justify-center">
            <TermSwitch />
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TARIFFS.map((t, i) => {
            const { monthly, setup } = priceFor(t, term);
            const rec = !!t.popular;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className={
                  'relative flex flex-col rounded-2xl border p-7 transition-transform duration-300 hover:-translate-y-1 md:p-8 ' +
                  (rec
                    ? 'border-[hsl(var(--accent))/45] bg-[hsl(var(--accent))/10] shadow-[0_0_40px_hsl(var(--accent)/0.4)]'
                    : 'border-[hsl(var(--border))] bg-[hsl(var(--bg))]')
                }
              >
                {rec && (
                  <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--accent))] px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-white">
                    ★ Beliebt
                  </span>
                )}

                <h3 className="font-display text-[1.5rem] font-medium text-[hsl(var(--fg))]">{t.name}</h3>
                <p className="mt-1 min-h-[2.75rem] text-[0.9rem] leading-relaxed text-[hsl(var(--muted))]">{t.tagline}</p>

                <div className="my-6 h-px w-full bg-[hsl(var(--border))]" />

                <div className="flex items-end gap-1.5">
                  <span className="font-display text-[clamp(2rem,3.6vw,2.75rem)] font-medium leading-none tabular-nums tracking-[-0.025em] text-[hsl(var(--fg))]">
                    {fmtEur(monthly)}
                  </span>
                  <span className="mb-1 text-[0.9rem] text-[hsl(var(--muted))]">/Monat</span>
                </div>
                <p className="mt-2 text-[0.8rem] text-[hsl(var(--subtle))]">
                  {setup > 0 ? (
                    <>Einrichtung <span className="text-[hsl(var(--fg))]">{fmtEur(setup)}</span> einmalig</>
                  ) : (
                    <span className="text-[hsl(var(--success))]">Einrichtung entfällt</span>
                  )}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[0.875rem] leading-relaxed text-[hsl(var(--muted))]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--accent))]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={site.cta.meetingUrl}
                  data-event={`callcenter_pricing_${t.id}`}
                  className={
                    'mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.9rem] font-medium transition-all ' +
                    (rec
                      ? 'bg-[hsl(var(--accent))] text-white hover:brightness-110'
                      : 'border border-[hsl(var(--border-strong))] text-[hsl(var(--fg))] hover:border-[hsl(var(--accent))/60] hover:text-[hsl(var(--accent))]')
                  }
                >
                  Demo buchen
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-[0.8rem] text-[hsl(var(--subtle))]">
          Alle Preise netto zzgl. USt. · Inklusiv-Minuten je Tarif, weitere Minuten transparent abgerechnet.
        </p>
      </div>
    </section>
  );
}
