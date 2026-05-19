'use client';

import { motion } from 'framer-motion';
import { pricing, site } from '@/lib/content';
import { Check, Sparkles, Shield, Clock, Zap, ArrowUpRight } from 'lucide-react';
import { MaskWipe, SplitLines } from '@/components/effects/reveal';

const TRUST_ICONS = [Zap, Shield, Sparkles, Clock];

/**
 * Pricing — editorial menu layout.
 *
 * Replaces the previous SaaS card-grid with a Michelin-style menu:
 * each tier is a long horizontal entry. Tier name as huge serif on
 * the left, oversized display price on the right, features as a
 * mono bullet column. Recommended tier gets a subtle accent rail
 * down the left side instead of a coloured background.
 */
export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))] px-6 py-24 md:py-32 lg:px-10"
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

        {/* Trust badges — micro strip above the menu */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-y border-[hsl(var(--border))] py-4 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--muted))]"
        >
          {pricing.trustRow.map((t, i) => {
            const Icon = TRUST_ICONS[i] ?? Sparkles;
            return (
              <div key={t.label} className="flex items-center gap-2">
                <Icon className="h-3 w-3 text-[hsl(var(--accent))]" />
                <span className="text-[hsl(var(--fg))]">{t.label}</span>
                <span className="text-[hsl(var(--subtle))]">· {t.sub}</span>
              </div>
            );
          })}
        </motion.div>

        {/* Editorial menu entries — one row per tier */}
        <div className="mt-12 flex flex-col">
          {pricing.tiers.map((tier, i) => (
            <PricingEntry key={tier.name} tier={tier} index={i} />
          ))}
        </div>

        <p className="mt-12 max-w-3xl text-[0.8rem] text-[hsl(var(--subtle))]">
          {pricing.footnote}
        </p>
      </div>
    </section>
  );
}

function PricingEntry({
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
        'group relative overflow-hidden border-t border-[hsl(var(--border))] py-14 last:border-b ' +
        (isReco ? 'pl-6 md:pl-10' : '')
      }
    >
      {/* Accent rail on recommended tier */}
      {isReco && (
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[hsl(var(--accent))] to-transparent"
        />
      )}

      {/* Subtle hover wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(90deg, hsl(var(--accent) / 0.06) 0%, transparent 50%)',
        }}
      />

      <div className="relative grid grid-cols-12 gap-x-6 gap-y-8">
        {/* Left rail — tier number + tag */}
        <div className="col-span-12 flex items-start gap-4 md:col-span-1">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))] md:mt-3">
            № {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Tier name + tagline + features */}
        <div className="col-span-12 md:col-span-7">
          {isReco && (
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--accent))/40] bg-[hsl(var(--accent))/10] px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(var(--accent))] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />
              </span>
              Empfohlen
            </span>
          )}
          <h3 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.0] tracking-[-0.025em] text-[hsl(var(--fg))]">
            {tier.name}
          </h3>
          <p className="mt-4 max-w-xl text-[1rem] leading-[1.6] text-[hsl(var(--muted))]">
            {tier.tagline}
          </p>

          {/* Best for */}
          <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
            Best für · <span className="text-[hsl(var(--accent))]">{tier.bestFor}</span>
          </p>

          {/* Features as a two-column mono list */}
          <ul className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {tier.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 text-[0.875rem] leading-[1.55] text-[hsl(var(--fg))]"
              >
                <Check
                  className="mt-1 h-3.5 w-3.5 shrink-0 text-[hsl(var(--accent))]"
                  strokeWidth={2}
                />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {/* ROI hint */}
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--accent))/8] px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--accent))]">
            <Sparkles className="h-3 w-3" />
            {tier.roiHint}
          </p>
        </div>

        {/* Right rail — oversized display price + CTA */}
        <div className="col-span-12 flex flex-col items-start gap-6 md:col-span-4 md:items-end md:text-right">
          <div>
            <div className="font-display text-[clamp(3rem,6.5vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.03em] text-[hsl(var(--fg))]">
              {tier.price}
            </div>
            <div className="mt-2 font-mono text-[0.75rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
              {tier.priceSuffix}
            </div>
          </div>
          <div className="flex items-center gap-3 text-[0.75rem]">
            <s className="text-[hsl(var(--subtle))]">{tier.marketPrice}</s>
            <span className="rounded-full bg-[hsl(var(--accent))/15] px-2.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
              unser Preis
            </span>
          </div>
          <p className="text-[0.75rem] text-[hsl(var(--muted))] md:text-right">
            {tier.note}
          </p>
          <a
            href={site.cta.meetingUrl}
            data-sound="tick"
            data-cursor-label="Buchen"
            className={
              'group/cta inline-flex h-14 items-center gap-2 rounded-full px-7 font-display text-[0.95rem] font-medium transition-all ' +
              (isReco
                ? 'bg-[hsl(var(--accent))] text-white hover:bg-[hsl(var(--accent-deep))]'
                : 'border border-[hsl(var(--fg))] text-[hsl(var(--fg))] hover:bg-[hsl(var(--fg))] hover:text-[hsl(var(--bg))]')
            }
          >
            {tier.cta}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
