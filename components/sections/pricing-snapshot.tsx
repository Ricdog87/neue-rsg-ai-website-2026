'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Phone } from 'lucide-react';
import { voicePlans } from '@/lib/pricing-voice';
import { useEnglish } from '@/components/system/use-locale';

/**
 * Pricing Snapshot — kompakte 3-Card-Voice-Preview für die Homepage.
 *
 * Ziel: Preise sofort sichtbar, ohne dass User durch 8 Sektionen scrollen muss.
 * Volle Details + Toggle + Workflows + ROI + FAQ → eigene /preise-Seite.
 */
export function PricingSnapshot() {
  const en = useEnglish();
  return (
    <section
      id="pricing-snapshot"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/82 px-6 py-16 backdrop-blur-[2px] md:py-20 lg:px-10"
    >
      <div className="relative mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-4">
          <div className="col-span-12 md:col-span-7">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
              {en ? 'Pricing · Phone assistant' : 'Preise · Telefonassistentin'}
            </span>
            <h2 className="mt-3 font-display text-[clamp(1.875rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
              {en ? 'Three plans. One call to get started.' : 'Drei Pakete. Ein Anruf reicht zum Start.'}
            </h2>
          </div>
          <div className="col-span-12 flex md:col-span-5 md:items-end md:justify-end">
            <Link
              href="/preise"
              data-event="snapshot_to_pricing_page"
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-[hsl(var(--border-strong))] bg-[hsl(var(--surface))] px-5 font-display text-[0.875rem] font-medium text-[hsl(var(--fg))] transition-all hover:border-[hsl(var(--accent))/50] hover:text-[hsl(var(--accent))]"
            >
              {en ? 'Compare all plans' : 'Alle Pakete vergleichen'}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Cards — compact, max 4 features each */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {voicePlans.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className={
                'relative flex flex-col rounded-xl border p-6 ' +
                (p.recommended
                  ? 'border-[hsl(var(--accent))/40] bg-[hsl(var(--accent))/10]'
                  : 'border-[hsl(var(--border))] bg-[hsl(var(--bg))]/60')
              }
            >
              {p.recommended && (
                <span className="absolute -top-2.5 left-6 inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--accent))] px-3 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-white">
                  {en ? '★ Popular' : '★ Beliebt'}
                </span>
              )}

              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-display text-[1.25rem] font-medium text-[hsl(var(--fg))]">
                  {p.name}
                </h3>
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
                  {(en ? p.idealForEn ?? p.idealFor : p.idealFor).replace(/^Ideal (für|for) ?/, '')}
                </span>
              </div>

              <div className="mt-4 flex items-end gap-1.5">
                <span className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-medium leading-none tabular-nums tracking-[-0.02em] text-[hsl(var(--fg))]">
                  {p.priceMonthly}
                </span>
                {p.priceSuffix ? (
                  <span className="text-[0.85rem] text-[hsl(var(--muted))]">
                    {en ? '/month' : p.priceSuffix}
                  </span>
                ) : null}
              </div>
              {p.setupValue !== null ? (
                <p className="mt-1.5 text-[0.7rem] text-[hsl(var(--muted))]">
                  {en ? `+ €${p.setupValue} setup` : `+ ${p.setupValue} € Setup`}
                </p>
              ) : (
                <p className="mt-1.5 text-[0.7rem] text-[hsl(var(--muted))]">
                  {en ? 'Setup from €1,990 · custom' : p.setup}
                </p>
              )}

              <ul className="mt-5 flex-1 space-y-2">
                {(en ? p.featuresEn ?? p.features : p.features).slice(0, 3).map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-[0.825rem] leading-snug text-[hsl(var(--muted))]"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--accent))]" strokeWidth={2.5} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/preise"
                data-event={`snapshot_card_${p.id}`}
                data-tier={p.id}
                className={
                  'mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full text-[0.875rem] font-medium transition-all ' +
                  (p.recommended
                    ? 'bg-[hsl(var(--accent))] text-white hover:brightness-110'
                    : 'border border-[hsl(var(--border-strong))] text-[hsl(var(--fg))] hover:border-[hsl(var(--accent))/60] hover:text-[hsl(var(--accent))]')
                }
              >
                {en ? p.ctaEn ?? p.cta : p.cta}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Sub-line — additional context */}
        <p className="mt-6 text-center text-[0.875rem] text-[hsl(var(--muted))]">
          {en ? 'Need process automation rather than telephony?' : 'Du brauchst eher Prozess-Automatisierung statt Telefonie?'}{' '}
          <Link
            href={en ? '/en/automatisierung' : '/automatisierung'}
            className="font-medium text-[hsl(var(--accent))] underline-offset-2 hover:underline"
          >
            {en ? 'AI agents & workflows from €2,500' : 'KI-Agenten & Workflows ab 2.500 €'}
          </Link>
          <span className="mx-2 text-[hsl(var(--subtle))]">·</span>
          <Phone className="-mt-0.5 inline h-3.5 w-3.5 text-[hsl(var(--accent))]" />{' '}
          <a
            href="tel:+4917660772556"
            className="hover:text-[hsl(var(--fg))] hover:underline"
          >
            {en ? 'Rather call us directly?' : 'Lieber direkt anrufen?'}
          </a>
        </p>
      </div>
    </section>
  );
}
