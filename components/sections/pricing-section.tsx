'use client';

import { motion } from 'framer-motion';
import { pricing, site } from '@/lib/content';
import { Check, ArrowUpRight, Sparkles } from 'lucide-react';
import { MaskWipe, SplitLines } from '@/components/effects/reveal';

/**
 * Pricing — refined comparison layout.
 *
 * Two tiers side-by-side, equal heights, balanced typographic hierarchy.
 * No oversized prices, no wrapping currency symbols, no SaaS-card vibe.
 *
 *   ┌────────────────────────┬─────────────────────────┐
 *   │ № 01                   │ ● EMPFOHLEN             │
 *   │                        │                          │
 *   │ Automatische Workflows │ KI-Agent Autonom         │
 *   │ tagline…               │ tagline…                 │
 *   │ ──                     │ ──                       │
 *   │ 2.500 €                │ 5.000 €                  │
 *   │ einmalig · fix         │ einmalig · fix           │
 *   │ ··· Marktpreis 8.000€  │ ··· Marktpreis 18.000€   │
 *   │ ──                     │ ──                       │
 *   │ Best für …             │ Best für …               │
 *   │ ✓ feature              │ ✓ feature                │
 *   │ ✓ feature              │ ✓ feature                │
 *   │ ··· roiHint            │ ··· roiHint              │
 *   │ [ Erstgespräch ↗ ]     │ [ Erstgespräch ↗ ]       │
 *   └────────────────────────┴─────────────────────────┘
 */
export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/82 backdrop-blur-[2px] px-6 py-24 md:py-32 lg:px-10"
    >
      <div className="relative mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-5">
            <MaskWipe>
              <span className="eyebrow">№ 06 · Investment</span>
            </MaskWipe>
            <SplitLines
              lines={[pricing.headline]}
              className="mt-6"
              lineClassName="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.025em] text-[hsl(var(--fg))]"
            />
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-2">
            <MaskWipe delay={0.2}>
              <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
                {pricing.subline}
              </p>
            </MaskWipe>
          </div>
        </div>

        {/* Trust badges — micro strip above the comparison */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 grid grid-cols-2 gap-x-8 gap-y-3 border-y border-[hsl(var(--border))] py-4 md:grid-cols-4"
        >
          {pricing.trustRow.map((t) => (
            <div
              key={t.label}
              className="flex items-baseline gap-2 font-mono text-[0.625rem] uppercase tracking-[0.22em]"
            >
              <span className="text-[hsl(var(--accent))]">▸</span>
              <span className="text-[hsl(var(--fg))]">{t.label}</span>
              <span className="text-[hsl(var(--subtle))]">· {t.sub}</span>
            </div>
          ))}
        </motion.div>

        {/* Side-by-side tier comparison */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--border))] md:grid-cols-2">
          {pricing.tiers.map((tier, i) => (
            <PricingCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-[0.8rem] leading-relaxed text-[hsl(var(--subtle))]">
          {pricing.footnote}
        </p>
      </div>
    </section>
  );
}

function PricingCard({
  tier,
  index,
}: {
  tier: (typeof pricing.tiers)[number];
  index: number;
}) {
  const isReco = tier.recommended;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      data-cursor="hover"
      className={
        'group relative flex flex-col overflow-hidden p-10 transition-colors md:p-12 ' +
        (isReco
          ? 'bg-gradient-to-b from-[hsl(var(--accent))/8] via-[hsl(var(--bg))] to-[hsl(var(--bg))]'
          : 'bg-[hsl(var(--bg))] hover:bg-[hsl(var(--surface))]')
      }
    >
      {/* Top row — number + (optional) Empfohlen pill */}
      <header className="flex items-center justify-between">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
          № {String(index + 1).padStart(2, '0')}
        </span>
        {isReco && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--accent))/40] bg-[hsl(var(--accent))/10] px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(var(--accent))] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />
            </span>
            Empfohlen
          </span>
        )}
      </header>

      {/* Tier name + tagline */}
      <h3 className="mt-8 font-display text-[clamp(1.875rem,3.5vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.025em] text-[hsl(var(--fg))]">
        {tier.name}
      </h3>
      <p className="mt-4 text-[0.975rem] leading-[1.6] text-[hsl(var(--muted))]">
        {tier.tagline}
      </p>

      {/* Hairline divider */}
      <div className="my-8 h-px w-full bg-[hsl(var(--border))]" />

      {/* Price block — refined, no wrap, tabular */}
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-2 whitespace-nowrap">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
            ab
          </span>
          <span className="font-display text-[clamp(2.5rem,4.2vw,3.5rem)] font-medium leading-none tabular-nums tracking-[-0.025em] text-[hsl(var(--fg))]">
            {formatPrice(tier.price)}
          </span>
          <span className="font-display text-[clamp(2.5rem,4.2vw,3.5rem)] font-light leading-none text-[hsl(var(--accent))]">
            €
          </span>
        </div>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
          {tier.priceSuffix}
        </span>
      </div>
      <div className="mt-3 flex items-baseline gap-3 font-mono text-[0.7rem]">
        <s className="text-[hsl(var(--subtle))]">{tier.marketPrice}</s>
        <span className="rounded-full bg-[hsl(var(--accent))/12] px-2.5 py-0.5 uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
          unser Preis
        </span>
      </div>
      <p className="mt-3 text-[0.75rem] leading-relaxed text-[hsl(var(--muted))]">{tier.note}</p>

      {/* Best für */}
      <div className="mt-8">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
          Best für
        </p>
        <p className="mt-2 text-[0.875rem] leading-[1.5] text-[hsl(var(--accent))]">
          {tier.bestFor}
        </p>
      </div>

      {/* Features — single column, tight rhythm */}
      <ul className="mt-7 space-y-3 border-t border-[hsl(var(--border))] pt-6">
        {tier.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-3 text-[0.9rem] leading-[1.55] text-[hsl(var(--fg))]"
          >
            <Check
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--accent))]"
              strokeWidth={2.5}
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* ROI hint */}
      <div className="mt-7 flex items-start gap-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-4 py-3">
        <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--accent))]" />
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[hsl(var(--fg))]">
          {tier.roiHint}
        </p>
      </div>

      {/* CTA — pushes to the bottom of the card */}
      <div className="mt-auto pt-8">
        <a
          href={site.cta.meetingUrl}
          data-sound="tick"
          data-cursor-label="Buchen"
          data-event="meeting-cta-pricing"
          className={
            'group/cta inline-flex h-14 w-full items-center justify-center gap-2 rounded-full font-display text-[0.95rem] font-medium transition-all ' +
            (isReco
              ? 'bg-[hsl(var(--accent))] text-white shadow-[0_8px_24px_-8px_hsl(var(--accent)/0.6)] hover:bg-[hsl(var(--accent-deep))]'
              : 'border border-[hsl(var(--fg))] text-[hsl(var(--fg))] hover:bg-[hsl(var(--fg))] hover:text-[hsl(var(--bg))]')
          }
        >
          {tier.cta}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
        </a>
      </div>
    </motion.article>
  );
}

/**
 * Strip the "ab " prefix and "€" suffix from the price string in
 * content.ts so the component owns the surrounding markup and can
 * lay it out without text-wrap risk.
 *   "ab 2.500 €"  →  "2.500"
 */
function formatPrice(raw: string): string {
  return raw.replace(/^ab\s*/i, '').replace(/\s*€\s*$/, '').trim();
}
