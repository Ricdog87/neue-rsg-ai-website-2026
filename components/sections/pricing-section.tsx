'use client';

import { motion } from 'framer-motion';
import { pricing, site } from '@/lib/content';
import { Check, Sparkles, Shield, Clock, Zap, ArrowUpRight } from 'lucide-react';

const TRUST_ICONS = [Zap, Shield, Sparkles, Clock];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))] px-6 py-24 md:py-32 lg:px-10"
    >
      <div className="relative mx-auto max-w-[1280px]">
        {/* Header — editorial two-column */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-5">
            <span className="eyebrow">{pricing.eyebrow}</span>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[hsl(var(--ink))]">
              {pricing.headline}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-2">
            <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
              {pricing.subline}
            </p>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--border))] md:grid-cols-4">
          {pricing.trustRow.map((t, i) => {
            const Icon = TRUST_ICONS[i] ?? Sparkles;
            return (
              <div
                key={t.label}
                className="flex items-center gap-4 bg-[hsl(var(--bg))] p-5"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent))]">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-display text-[0.95rem] font-medium text-[hsl(var(--ink))]">
                    {t.label}
                  </p>
                  <p className="text-[0.75rem] text-[hsl(var(--muted))]">{t.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing tiers */}
        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-2">
          {pricing.tiers.map((tier, i) => {
            const isReco = tier.recommended;
            return (
              <motion.article
                key={tier.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className={
                  'relative flex h-full flex-col rounded-md p-9 transition-all md:p-11 ' +
                  (isReco
                    ? 'bg-[hsl(var(--ink))] text-white shadow-[0_30px_60px_-30px_rgb(0_0_0_/_0.5)]'
                    : 'border border-[hsl(var(--border))] bg-[hsl(var(--bg))] hover:border-[hsl(var(--border-strong))] hover:shadow-[var(--shadow-soft)]')
                }
              >
                {isReco && (
                  <div className="absolute -top-3 left-9 inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--accent))] px-3 py-1">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-white opacity-70" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    <span className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.22em] text-white">
                      Empfohlen
                    </span>
                  </div>
                )}

                <span
                  className={
                    'inline-flex w-fit items-center font-mono text-[0.6875rem] uppercase tracking-[0.22em] ' +
                    (isReco ? 'text-white/55' : 'text-[hsl(var(--subtle))]')
                  }
                >
                  Best für · {tier.bestFor}
                </span>

                <h3
                  className={
                    'mt-5 font-display text-[2rem] font-medium leading-tight tracking-tight md:text-[2.5rem] ' +
                    (isReco ? 'text-white' : 'text-[hsl(var(--ink))]')
                  }
                >
                  {tier.name}
                </h3>
                <p
                  className={
                    'mt-2 text-[0.95rem] ' +
                    (isReco ? 'text-white/65' : 'text-[hsl(var(--muted))]')
                  }
                >
                  {tier.tagline}
                </p>

                <div className="mt-8 border-t border-[hsl(var(--border))]/40 pt-6">
                  <div className="flex items-baseline gap-3">
                    <span
                      className={
                        'font-display text-[3rem] font-medium leading-none tracking-tight md:text-[4rem] ' +
                        (isReco ? 'text-[hsl(var(--accent-soft))]' : 'text-[hsl(var(--ink))]')
                      }
                    >
                      {tier.price}
                    </span>
                    <span
                      className={
                        'text-[0.875rem] ' +
                        (isReco ? 'text-white/55' : 'text-[hsl(var(--muted))]')
                      }
                    >
                      {tier.priceSuffix}
                    </span>
                  </div>
                  <p
                    className={
                      'mt-3 flex items-center gap-3 text-[0.75rem] ' +
                      (isReco ? 'text-white/55' : 'text-[hsl(var(--muted))]')
                    }
                  >
                    <s>{tier.marketPrice}</s>
                    <span
                      className={
                        'rounded-full px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.22em] ' +
                        (isReco
                          ? 'bg-[hsl(var(--accent))] text-white'
                          : 'bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent))]')
                      }
                    >
                      unser Preis
                    </span>
                  </p>
                  <p
                    className={
                      'mt-3 text-[0.75rem] ' +
                      (isReco ? 'text-white/55' : 'text-[hsl(var(--muted))]')
                    }
                  >
                    {tier.note}
                  </p>
                </div>

                <div
                  className={
                    'mt-7 flex items-start gap-3 rounded-md p-4 ' +
                    (isReco
                      ? 'bg-white/[0.06]'
                      : 'bg-[hsl(var(--accent-soft))]/40')
                  }
                >
                  <Sparkles
                    className={
                      'mt-0.5 h-4 w-4 shrink-0 ' +
                      (isReco ? 'text-[hsl(var(--accent-soft))]' : 'text-[hsl(var(--accent))]')
                    }
                  />
                  <p
                    className={
                      'text-[0.875rem] ' +
                      (isReco ? 'text-white/85' : 'text-[hsl(var(--ink))]')
                    }
                  >
                    {tier.roiHint}
                  </p>
                </div>

                <ul className="mt-8 space-y-3">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className={
                        'flex items-start gap-3 text-[0.9rem] ' +
                        (isReco ? 'text-white/85' : 'text-[hsl(var(--fg))]')
                      }
                    >
                      <Check
                        className={
                          'mt-1 h-4 w-4 shrink-0 ' +
                          (isReco ? 'text-[hsl(var(--accent-soft))]' : 'text-[hsl(var(--accent))]')
                        }
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={site.cta.meetingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    'group mt-auto inline-flex h-14 items-center justify-center gap-2 rounded-full px-6 font-display text-[0.95rem] font-medium transition-all ' +
                    (isReco
                      ? 'bg-[hsl(var(--accent))] text-white hover:bg-[hsl(var(--accent-deep))]'
                      : 'border border-[hsl(var(--ink))] text-[hsl(var(--ink))] hover:bg-[hsl(var(--ink))] hover:text-white')
                  }
                  style={{ marginTop: '2.5rem' }}
                >
                  {tier.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </motion.article>
            );
          })}
        </div>

        <p className="mt-10 text-[0.8rem] text-[hsl(var(--subtle))]">{pricing.footnote}</p>
      </div>
    </section>
  );
}
