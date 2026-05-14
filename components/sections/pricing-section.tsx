'use client';

import { motion } from 'framer-motion';
import { pricing, site } from '@/lib/content';
import { Check } from 'lucide-react';

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative border-t border-white/5 bg-[hsl(var(--bg))] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))]">
          {pricing.eyebrow}
        </p>
        <h2 className="mt-4 font-display text-balance text-4xl tracking-tight md:text-6xl">
          {pricing.headline}
        </h2>
        <p className="mt-6 max-w-3xl text-base text-[hsl(var(--muted))] md:text-lg">
          {pricing.subline}
        </p>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {pricing.tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className={`relative rounded-2xl border p-8 ${
                tier.recommended
                  ? 'border-[hsl(var(--accent))/50] bg-[hsl(var(--accent))/5]'
                  : 'border-white/8 bg-white/[0.03]'
              }`}
            >
              {tier.recommended && (
                <span className="absolute right-6 top-6 rounded-full border border-[hsl(var(--accent))/40] bg-[hsl(var(--accent))/15] px-3 py-1 font-mono text-[10px] text-[hsl(var(--accent))]">
                  EMPFOHLEN
                </span>
              )}

              <h3 className="text-xl font-semibold">{tier.name}</h3>
              <p className="mt-1 text-sm text-[hsl(var(--muted))]">{tier.tagline}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-mono text-4xl font-bold">{tier.price}</span>
                <span className="text-sm text-[hsl(var(--muted))]">{tier.priceSuffix}</span>
              </div>
              <p className="mt-1 text-xs text-[hsl(var(--muted))]">{tier.note}</p>

              <ul className="mt-7 space-y-3">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--neon))]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={site.cta.meetingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 block rounded-full px-6 py-3 text-center text-sm font-semibold transition ${
                  tier.recommended
                    ? 'bg-[hsl(var(--accent))] text-white hover:opacity-90'
                    : 'border border-white/20 text-[hsl(var(--fg))] hover:border-[hsl(var(--accent))/40] hover:bg-[hsl(var(--accent))/8]'
                }`}
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-xs text-[hsl(var(--muted))]">{pricing.footnote}</p>
      </div>
    </section>
  );
}
