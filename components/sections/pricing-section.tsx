'use client';

import { motion } from 'framer-motion';
import { pricing, site } from '@/lib/content';
import { Check, Sparkles, Shield, Clock, Zap } from 'lucide-react';
import { ScrollParallax } from '@/components/effects/scroll-parallax';
import { ScrollScale } from '@/components/effects/scroll-scale';
import { Magnetic } from '@/components/effects/magnetic';

const TRUST_ICONS = [Zap, Shield, Sparkles, Clock];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-t border-white/5 bg-[hsl(var(--bg))] px-6 py-24 md:py-32"
    >
      {/* Ambient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full opacity-25 blur-[140px]"
        style={{ background: 'radial-gradient(circle, hsl(271 91% 65% / 0.5), transparent 65%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full opacity-20 blur-[140px]"
        style={{ background: 'radial-gradient(circle, hsl(174 100% 50% / 0.5), transparent 65%)' }}
      />

      <div className="relative mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))]">
          {pricing.eyebrow}
        </p>
        <ScrollParallax x={-8}>
          <h2 className="mt-4 font-display text-balance text-4xl tracking-tight md:text-6xl">
            {pricing.headline}
          </h2>
        </ScrollParallax>
        <p className="mt-6 max-w-3xl text-base text-[hsl(var(--muted))] md:text-lg">
          {pricing.subline}
        </p>

        {/* Trust row — 4 micro-badges above the cards */}
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {pricing.trustRow.map((t, i) => {
            const Icon = TRUST_ICONS[i] ?? Sparkles;
            return (
              <div
                key={t.label}
                className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.025] p-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[hsl(var(--neon))/25] bg-[hsl(var(--neon))/8]">
                  <Icon className="h-3.5 w-3.5 text-[hsl(var(--neon))]" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[hsl(var(--fg))]">{t.label}</p>
                  <p className="text-[11px] text-[hsl(var(--muted))]">{t.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-2">
          {pricing.tiers.map((tier, i) => {
            const isReco = tier.recommended;
            return (
              <ScrollScale key={tier.name} from={isReco ? 0.95 : 0.92} to={1} out={1}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className={`relative flex h-full flex-col overflow-hidden rounded-3xl p-8 ${
                    isReco ? 'lg:scale-[1.02]' : ''
                  }`}
                  style={{
                    background: isReco
                      ? 'linear-gradient(155deg, hsl(271 91% 65% / 0.12) 0%, hsl(174 100% 50% / 0.06) 50%, hsl(240 14% 5%) 100%)'
                      : 'linear-gradient(155deg, hsl(240 12% 8% / 0.95) 0%, hsl(240 14% 5%) 100%)',
                    border: isReco
                      ? '1px solid hsl(271 91% 65% / 0.45)'
                      : '1px solid hsl(0 0% 100% / 0.08)',
                    boxShadow: isReco
                      ? '0 40px 100px -30px hsl(271 91% 65% / 0.45), inset 0 1px 0 hsl(0 0% 100% / 0.08)'
                      : '0 20px 50px -20px hsl(240 14% 5% / 0.8)',
                  }}
                >
                  {/* Animated EMPFOHLEN ribbon */}
                  {isReco && (
                    <div className="absolute -right-2 top-6 flex items-center gap-1.5 rounded-l-full border border-[hsl(var(--accent))/50] bg-gradient-to-r from-[hsl(var(--accent))/30] to-[hsl(var(--accent))/15] px-4 py-1.5 backdrop-blur">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[hsl(var(--accent))] opacity-70" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
                      </span>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--accent))]">
                        Empfohlen
                      </span>
                    </div>
                  )}

                  {/* "Best for" pill */}
                  <span
                    className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${
                      isReco
                        ? 'border-[hsl(var(--neon))/30] bg-[hsl(var(--neon))/8] text-[hsl(var(--neon))]'
                        : 'border-white/10 bg-white/[0.03] text-[hsl(var(--muted))]'
                    }`}
                  >
                    Best für · {tier.bestFor}
                  </span>

                  <h3 className="mt-5 font-display text-3xl tracking-tight md:text-4xl">
                    {tier.name}
                  </h3>
                  <p className="mt-2 text-sm text-[hsl(var(--muted))]">{tier.tagline}</p>

                  {/* Price block */}
                  <div className="mt-6">
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`font-display text-5xl font-bold md:text-6xl ${
                          isReco ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--fg))]'
                        }`}
                        style={
                          isReco
                            ? { textShadow: '0 0 40px hsl(271 91% 65% / 0.5)' }
                            : undefined
                        }
                      >
                        {tier.price}
                      </span>
                      <span className="text-sm text-[hsl(var(--muted))]">{tier.priceSuffix}</span>
                    </div>
                    {/* Crossed-out market price */}
                    <p className="mt-2 flex items-center gap-2 text-xs">
                      <s className="text-[hsl(var(--muted))]/60">{tier.marketPrice}</s>
                      <span className="rounded-full border border-[hsl(var(--neon))/30] bg-[hsl(var(--neon))/8] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[hsl(var(--neon))]">
                        unser Preis
                      </span>
                    </p>
                    <p className="mt-2 text-xs text-[hsl(var(--muted))]">{tier.note}</p>
                  </div>

                  {/* ROI hint */}
                  <div
                    className={`mt-6 flex items-center gap-3 rounded-xl border p-3 ${
                      isReco
                        ? 'border-[hsl(var(--accent))/30] bg-[hsl(var(--accent))/8]'
                        : 'border-white/10 bg-white/[0.03]'
                    }`}
                  >
                    <Sparkles
                      className={`h-4 w-4 shrink-0 ${
                        isReco ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--neon))]'
                      }`}
                    />
                    <p className="text-xs font-medium text-[hsl(var(--fg))]">{tier.roiHint}</p>
                  </div>

                  <ul className="mt-7 space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            isReco
                              ? 'bg-[hsl(var(--accent))/20] text-[hsl(var(--accent))]'
                              : 'bg-[hsl(var(--neon))/10] text-[hsl(var(--neon))]'
                          }`}
                        >
                          <Check className="h-3 w-3" />
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Magnetic strength={isReco ? 0.25 : 0.18}>
                    <a
                      href={site.cta.meetingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-8 block rounded-full px-6 py-4 text-center text-sm font-bold transition ${
                        isReco
                          ? 'bg-[hsl(var(--accent))] text-white hover:opacity-90'
                          : 'border border-white/20 text-[hsl(var(--fg))] hover:border-[hsl(var(--accent))/40] hover:bg-[hsl(var(--accent))/8]'
                      }`}
                      style={
                        isReco
                          ? { boxShadow: '0 25px 60px -15px hsl(271 91% 65% / 0.7)' }
                          : undefined
                      }
                    >
                      {tier.cta} →
                    </a>
                  </Magnetic>
                </motion.div>
              </ScrollScale>
            );
          })}
        </div>

        <p className="mt-6 text-xs text-[hsl(var(--muted))]">{pricing.footnote}</p>
      </div>
    </section>
  );
}
