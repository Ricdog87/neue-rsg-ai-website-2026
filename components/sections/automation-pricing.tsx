'use client';

import { motion } from 'framer-motion';
import { Check, ArrowUpRight } from 'lucide-react';
import { pricing } from '@/lib/content';

/**
 * Automation pricing — the two project tiers (Workflows / autonomous
 * agent) rendered as premium cards. Data + Stripe buy-links come straight
 * from lib/content.ts (pricing.tiers), so prices stay single-sourced.
 */
export function AutomationPricing() {
  const tiers = pricing.tiers ?? [];

  return (
    <section
      id="automation-pricing"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/85 px-6 py-20 backdrop-blur-[2px] md:py-28 lg:px-10"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
            Investment · Festpreis &amp; netto
          </span>
          <h2 className="mx-auto mt-3 font-display text-[clamp(1.875rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
            Zwei Pakete. Ein Festpreis. Kein Berater-Stundensatz.
          </h2>
          <p className="mx-auto mt-4 text-[1rem] leading-relaxed text-[hsl(var(--muted))]">
            Klarer Prozess → automatischer Workflow. Bewertung, Recherche oder
            Entscheidung nötig → autonomer KI-Agent. Beides zum Festpreis, in
            Wochen statt Quartalen.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {tiers.map((t, i) => {
            const tier = t as typeof t & {
              checkoutUrl?: string;
              buyLabel?: string;
              roiHint?: string;
            };
            const rec = !!t.recommended;
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={
                  'relative flex flex-col rounded-2xl border p-7 transition-transform duration-300 hover:-translate-y-1 md:p-8 ' +
                  (rec
                    ? 'border-[hsl(var(--accent))/40] bg-[hsl(var(--accent))/10] shadow-[0_0_40px_hsl(var(--accent)/0.45)]'
                    : 'border-[hsl(var(--border))] bg-[hsl(var(--surface))]')
                }
              >
                {rec && (
                  <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--accent))] px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-white">
                    ★ Beliebt
                  </span>
                )}

                <h3 className="font-display text-[1.5rem] font-medium text-[hsl(var(--fg))]">
                  {t.name}
                </h3>
                <p className="mt-2 min-h-[3rem] text-[0.9rem] leading-relaxed text-[hsl(var(--muted))]">
                  {t.tagline}
                </p>

                <div className="my-6 h-px w-full bg-[hsl(var(--border))]" />

                <div className="flex items-end gap-2">
                  <span className="font-display text-[clamp(2.25rem,4vw,3rem)] font-medium leading-none tabular-nums tracking-[-0.025em] text-[hsl(var(--fg))]">
                    {t.price}
                  </span>
                  {t.priceSuffix && (
                    <span className="mb-1 text-[0.95rem] text-[hsl(var(--subtle))]">
                      {t.priceSuffix}
                    </span>
                  )}
                </div>
                {t.marketPrice && (
                  <p className="mt-2 text-[0.8rem] text-[hsl(var(--subtle))]">
                    <span className="line-through">{t.marketPrice}</span>
                    <span className="ml-1.5 rounded-full bg-[hsl(var(--accent))/12] px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-[hsl(var(--accent))]">
                      unser Preis
                    </span>
                  </p>
                )}

                <ul className="mt-6 flex-1 space-y-3">
                  {t.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-[0.875rem] leading-relaxed text-[hsl(var(--muted))]"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--accent))]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {tier.roiHint && (
                  <p className="mt-5 inline-flex items-center gap-1.5 self-start rounded-full bg-[hsl(var(--accent))/10] px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-[hsl(var(--accent))]">
                    ✨ {tier.roiHint}
                  </p>
                )}
                {t.bestFor && (
                  <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--subtle))]">
                    {t.bestFor}
                  </p>
                )}

                {tier.checkoutUrl ? (
                  <>
                    <a
                      href={tier.checkoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-event="workflow_buy_click"
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[hsl(var(--accent))] px-5 py-3 text-[0.9rem] font-medium text-white transition-all hover:brightness-110"
                    >
                      {tier.buyLabel || 'Paket buchen'}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href="/termin"
                      data-event="booking_clicked_secondary"
                      className="mt-3 inline-flex w-full items-center justify-center text-[0.8rem] text-[hsl(var(--muted))] underline-offset-2 transition-colors hover:text-[hsl(var(--fg))] hover:underline"
                    >
                      Größerer Scope? {t.cta} →
                    </a>
                  </>
                ) : (
                  <a
                    href="/termin"
                    data-event="booking_clicked"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-[hsl(var(--border))] px-5 py-3 text-[0.9rem] font-medium text-[hsl(var(--fg))] transition-all hover:border-[hsl(var(--accent))/60] hover:text-[hsl(var(--accent))]"
                  >
                    {t.cta}
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>

        {pricing.footnote && (
          <p className="mx-auto mt-8 max-w-3xl text-center text-[0.8rem] leading-relaxed text-[hsl(var(--subtle))]">
            {pricing.footnote}
          </p>
        )}
      </div>
    </section>
  );
}
