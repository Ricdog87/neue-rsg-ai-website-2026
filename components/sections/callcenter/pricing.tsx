'use client';

import { motion } from 'framer-motion';
import { Check, ArrowUpRight, Sparkles } from 'lucide-react';
import { site } from '@/lib/content';
import { TARIFFS, ENTERPRISE, priceFor } from '@/lib/callcenter';
import { useTerm, TermSwitch } from '@/components/sections/callcenter/provider';

const fmtEur = (n: number) => n.toLocaleString('de-DE') + ' €';

export function CallcenterPricing() {
  const { term } = useTerm();

  return (
    <section
      id="preise"
      className="relative scroll-mt-24 border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/85 px-6 py-20 backdrop-blur-[2px] md:py-28 lg:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Preise &amp; Laufzeiten</span>
          <h2 className="mt-6 font-display text-[clamp(1.875rem,3.8vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
            Transparente Pakete — bis Enterprise.
          </h2>
          <p className="mx-auto mt-4 text-[1rem] leading-relaxed text-[hsl(var(--muted))]">
            Wähl deine Laufzeit — längere Bindung senkt Monatspreis und Einrichtung.
            Bei Jahresvorkasse entfällt die Einrichtungsgebühr.
          </p>
          <div className="mt-8 flex justify-center">
            <TermSwitch />
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {TARIFFS.map((t, i) => {
            const { monthly, setup } = priceFor(t, term);
            const rec = !!t.popular;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={
                  'group relative flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1.5 ' +
                  (rec
                    ? 'border-[hsl(var(--accent))/45] bg-[hsl(var(--accent))/10] shadow-[0_0_40px_hsl(var(--accent)/0.35)] hover:shadow-[0_24px_60px_-20px_hsl(var(--accent)/0.6)]'
                    : 'border-[hsl(var(--border))] bg-[hsl(var(--surface))] hover:border-[hsl(var(--border-strong))] hover:shadow-[var(--shadow-lift)]')
                }
              >
                {rec && (
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--accent))] px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-white">
                    ★ Beliebt
                  </span>
                )}
                <h3 className="font-display text-[1.35rem] font-medium text-[hsl(var(--fg))]">{t.name}</h3>
                <p className="mt-1 min-h-[2.6rem] text-[0.85rem] leading-relaxed text-[hsl(var(--muted))]">{t.tagline}</p>

                <div className="my-5 h-px w-full bg-[hsl(var(--border))]" />

                <div className="flex items-end gap-1.5">
                  <span className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-medium leading-none tabular-nums tracking-[-0.025em] text-[hsl(var(--fg))]">
                    {fmtEur(monthly)}
                  </span>
                  <span className="mb-0.5 text-[0.8rem] text-[hsl(var(--muted))]">/Mon</span>
                </div>
                <p className="mt-1.5 text-[0.72rem] text-[hsl(var(--subtle))]">
                  {setup > 0 ? (
                    <>Einrichtung <span className="text-[hsl(var(--fg))]">{fmtEur(setup)}</span></>
                  ) : (
                    <span className="text-[hsl(var(--success))]">Einrichtung entfällt</span>
                  )}
                </p>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[0.825rem] leading-snug text-[hsl(var(--muted))]">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--accent))]" strokeWidth={2.5} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={site.cta.meetingUrl}
                  data-event={`callcenter_pricing_${t.id}`}
                  className={
                    'mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[0.85rem] font-medium transition-all ' +
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

          {/* Enterprise card — featured for large accounts */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ delay: 0.24, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/15 p-6 transition-all duration-300 hover:-translate-y-1.5"
            style={{ background: 'linear-gradient(160deg, hsl(271 60% 18%) 0%, hsl(240 14% 6%) 55%)' }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-[200px] w-[200px] rounded-full opacity-50 blur-[80px]"
              style={{ background: 'radial-gradient(circle, hsl(var(--accent)/0.6), transparent 65%)' }}
            />
            <span className="relative inline-flex w-fit items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-white">
              <Sparkles className="h-3 w-3 text-[hsl(var(--accent-soft))]" /> Für Großkunden
            </span>
            <h3 className="relative mt-4 font-display text-[1.35rem] font-medium text-white">{ENTERPRISE.name}</h3>
            <p className="relative mt-1 min-h-[2.6rem] text-[0.85rem] leading-relaxed text-white/65">{ENTERPRISE.tagline}</p>

            <div className="relative my-5 h-px w-full bg-white/10" />

            <div className="relative font-display text-[clamp(1.75rem,3vw,2.25rem)] font-medium leading-none tracking-[-0.025em] text-white">
              {ENTERPRISE.price}
            </div>
            <p className="relative mt-1.5 text-[0.72rem] text-white/50">individuell nach Volumen & SLA</p>

            <ul className="relative mt-5 flex-1 space-y-2.5">
              {ENTERPRISE.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[0.825rem] leading-snug text-white/75">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--accent-soft))]" strokeWidth={2.5} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href={site.cta.meetingUrl}
              data-event="callcenter_pricing_enterprise"
              className="relative mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-[0.85rem] font-semibold text-[#1a0b2e] transition-all hover:brightness-95"
            >
              Enterprise-Demo buchen
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        </div>

        <p className="mt-8 text-center text-[0.8rem] text-[hsl(var(--subtle))]">
          Alle Preise netto zzgl. USt. · Inklusiv-Minuten je Tarif, weitere Minuten transparent abgerechnet · Enterprise nach Volumen, Integrationstiefe & SLA.
        </p>
      </div>
    </section>
  );
}
