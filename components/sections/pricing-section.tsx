'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pricing, voicePricing, site } from '@/lib/content';
import { Check, ArrowUpRight, Sparkles, Phone, Workflow } from 'lucide-react';
import { MaskWipe, SplitLines } from '@/components/effects/reveal';

type Tab = 'voice' | 'workflows';
type Billing = 'monthly' | 'annual';

/**
 * Pricing — two-tab layout.
 *
 *   ┌─ KI-Telefonassistentin (Voice, default) ─┬─ KI-Agenten & Workflows ─┐
 *   │                                          │                          │
 *   │  Monatlich / Jährlich (−15 %)            │                          │
 *   │  [Solo 199] [Team 499 ★] [Scale →call]   │  [Workflows] [Agent]     │
 *   └──────────────────────────────────────────┴──────────────────────────┘
 *
 * Solo/Team CTAs → /api/checkout (Stripe — skeleton, ENV-driven).
 * Scale → /termin (sales-led).
 * Workflows tab keeps the existing two project-tiers (2.500 / 5.000 €).
 */
export function PricingSection() {
  const [tab, setTab] = useState<Tab>('voice');
  const [billing, setBilling] = useState<Billing>('monthly');

  return (
    <section
      id="pricing"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/82 backdrop-blur-[2px] px-6 py-20 md:py-28 lg:px-10"
    >
      <div className="relative mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-5">
            <MaskWipe>
              <span className="eyebrow">Investment</span>
            </MaskWipe>
            <SplitLines
              lines={['Telefonassistentin oder', 'Workflows. Du wählst.']}
              className="mt-6"
              lineClassName="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.025em] text-[hsl(var(--fg))]"
            />
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-2">
            <MaskWipe delay={0.2}>
              <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
                Solo/Team starten direkt — Setup-Gebühr ist einmalig auf der
                ersten Rechnung. Scale + Custom-Workflows sind Sales-Led und
                immer mit klarem Festpreis vor dem ersten Commit.
              </p>
            </MaskWipe>
          </div>
        </div>

        {/* Tab toggle */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-1">
            <TabButton
              active={tab === 'voice'}
              onClick={() => setTab('voice')}
              icon={<Phone className="h-3.5 w-3.5" />}
              label="KI-Telefonassistentin"
            />
            <TabButton
              active={tab === 'workflows'}
              onClick={() => setTab('workflows')}
              icon={<Workflow className="h-3.5 w-3.5" />}
              label="KI-Agenten & Workflows"
            />
          </div>

          {/* Billing toggle — voice only */}
          {tab === 'voice' && (
            <div className="inline-flex items-center gap-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-1">
              <BillingButton
                active={billing === 'monthly'}
                onClick={() => setBilling('monthly')}
                label="Monatlich"
              />
              <BillingButton
                active={billing === 'annual'}
                onClick={() => setBilling('annual')}
                label="Jährlich · −15 %"
              />
            </div>
          )}
        </div>

        {/* Cards — switch on tab */}
        <AnimatePresence mode="wait">
          {tab === 'voice' ? (
            <motion.div
              key="voice"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 grid gap-px overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--border))] md:grid-cols-3"
            >
              {voicePricing.tiers.map((tier, i) => (
                <VoiceCard key={tier.id} tier={tier} billing={billing} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="workflows"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 grid gap-px overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--border))] md:grid-cols-2"
            >
              {pricing.tiers.map((tier, i) => (
                <WorkflowCard key={tier.name} tier={tier} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reassurance strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]"
        >
          {(tab === 'voice' ? voicePricing.reassurance : pricing.trustRow.map((t) => t.label)).map(
            (item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <span className="text-[hsl(var(--accent))]">▸</span>
                {item}
              </span>
            ),
          )}
        </motion.div>

        <p className="mt-10 max-w-3xl text-[0.8rem] leading-relaxed text-[hsl(var(--subtle))]">
          {tab === 'voice' ? voicePricing.footnote : pricing.footnote}
        </p>
      </div>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-event={active ? undefined : `pricing_tab_${label.toLowerCase().includes('telefon') ? 'voice' : 'workflows'}`}
      className={
        'inline-flex h-10 items-center gap-2 rounded-full px-5 font-display text-[0.85rem] font-medium transition-all ' +
        (active
          ? 'bg-[hsl(var(--fg))] text-[hsl(var(--bg))]'
          : 'text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))]')
      }
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function BillingButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'inline-flex h-9 items-center rounded-full px-4 font-mono text-[0.6875rem] uppercase tracking-[0.18em] transition-all ' +
        (active
          ? 'bg-[hsl(var(--accent))] text-white'
          : 'text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))]')
      }
    >
      {label}
    </button>
  );
}

/* ── Voice tier card ── */
function VoiceCard({
  tier,
  billing,
  index,
}: {
  tier: (typeof voicePricing.tiers)[number];
  billing: Billing;
  index: number;
}) {
  const isReco = tier.recommended;
  const price = billing === 'monthly' ? tier.monthly : tier.annual;
  const isOnRequest = price == null;

  async function handleCheckout() {
    if ('ctaHref' in tier && tier.ctaHref) {
      window.location.href = tier.ctaHref;
      return;
    }
    try {
      window.plausible?.('checkout_started', {
        props: { tier: tier.id, billing },
      });
    } catch {}
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ tier: tier.id, billing }),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else if (data?.fallbackHref) {
        window.location.href = data.fallbackHref;
      } else {
        window.location.href = '/termin';
      }
    } catch {
      window.location.href = '/termin';
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={
        'group relative flex flex-col overflow-hidden p-8 transition-colors md:p-10 ' +
        (isReco
          ? 'bg-gradient-to-b from-[hsl(var(--accent))/8] via-[hsl(var(--bg))] to-[hsl(var(--bg))]'
          : 'bg-[hsl(var(--bg))] hover:bg-[hsl(var(--surface))]')
      }
    >
      <header className="flex items-center justify-between">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
          {tier.name}
        </span>
        {isReco && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--accent))/40] bg-[hsl(var(--accent))/10] px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
            ★ Beliebt
          </span>
        )}
      </header>

      <p className="mt-6 text-[0.95rem] leading-[1.5] text-[hsl(var(--muted))]">{tier.tagline}</p>

      <div className="my-6 h-px w-full bg-[hsl(var(--border))]" />

      {/* Price */}
      <div className="flex items-baseline gap-2 whitespace-nowrap">
        {isOnRequest ? (
          <span className="font-display text-[clamp(2rem,3.5vw,2.75rem)] font-medium leading-none text-[hsl(var(--fg))]">
            Preis auf Anfrage
          </span>
        ) : (
          <>
            <span className="font-display text-[clamp(2.5rem,4.2vw,3.5rem)] font-medium leading-none tabular-nums tracking-[-0.025em] text-[hsl(var(--fg))]">
              {price}
            </span>
            <span className="font-display text-[clamp(2.5rem,4.2vw,3.5rem)] font-light leading-none text-[hsl(var(--accent))]">
              €
            </span>
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
              netto / Mo
            </span>
          </>
        )}
      </div>

      {!isOnRequest && (
        <p className="mt-3 text-[0.75rem] leading-relaxed text-[hsl(var(--muted))]">
          {billing === 'monthly' ? (
            <>
              +{' '}
              <span className="text-[hsl(var(--accent))]">
                {tier.id === 'solo'
                  ? '490 € netto Setup'
                  : tier.id === 'team'
                    ? '990 € netto Setup'
                    : '1.990 € netto Setup'}
              </span>{' '}
              · einmalig auf 1. Rechnung
            </>
          ) : (
            <>
              <s className="text-[hsl(var(--subtle))]">
                {tier.id === 'solo' ? '490 € Setup' : '990 € Setup'}
              </s>{' '}
              <span className="text-[hsl(174_100%_70%)]">· Setup inklusive</span>
              <span className="ml-2 text-[hsl(var(--subtle))]">· 12 Monate, jährlich abgerechnet</span>
            </>
          )}
        </p>
      )}
      {isOnRequest && (
        <p className="mt-3 text-[0.75rem] leading-relaxed text-[hsl(var(--muted))]">
          Setup individuell <span className="text-[hsl(var(--accent))]">ab 1.990 € netto</span>
        </p>
      )}

      <div className="mt-7">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
          Best für
        </p>
        <p className="mt-2 text-[0.875rem] leading-[1.5] text-[hsl(var(--accent))]">
          {tier.bestFor}
        </p>
      </div>

      <ul className="mt-6 space-y-2.5 border-t border-[hsl(var(--border))] pt-5">
        {tier.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5 text-[0.875rem] leading-[1.5] text-[hsl(var(--fg))]"
          >
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--accent))]" strokeWidth={2.5} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7 flex items-start gap-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-4 py-3">
        <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--accent))]" />
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[hsl(var(--fg))]">
          Ein zurückgewonnener Auftrag/Mo zahlt das ganze Paket
        </p>
      </div>

      <div className="mt-auto pt-7">
        <button
          type="button"
          onClick={handleCheckout}
          data-cursor-label="Buchen"
          data-event={tier.ctaEvent}
          data-tier={tier.id}
          className={
            'group/cta inline-flex h-14 w-full items-center justify-center gap-2 rounded-full font-display text-[0.95rem] font-medium transition-all ' +
            (isReco
              ? 'bg-[hsl(var(--accent))] text-white shadow-[0_8px_24px_-8px_hsl(var(--accent)/0.6)] hover:bg-[hsl(var(--accent-deep))]'
              : 'border border-[hsl(var(--fg))] text-[hsl(var(--fg))] hover:bg-[hsl(var(--fg))] hover:text-[hsl(var(--bg))]')
          }
        >
          {tier.ctaLabel}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
        </button>
      </div>
    </motion.article>
  );
}

/* ── Workflow project tier card (existing pattern, preserved) ── */
function WorkflowCard({
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
      <header className="flex items-center justify-between">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
          № {String(index + 1).padStart(2, '0')}
        </span>
        {isReco && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--accent))/40] bg-[hsl(var(--accent))/10] px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
            Empfohlen
          </span>
        )}
      </header>

      <h3 className="mt-8 font-display text-[clamp(1.875rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.025em] text-[hsl(var(--fg))]">
        {tier.name}
      </h3>
      <p className="mt-4 text-[0.975rem] leading-[1.6] text-[hsl(var(--muted))]">{tier.tagline}</p>

      <div className="my-8 h-px w-full bg-[hsl(var(--border))]" />

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

      <div className="mt-8">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
          Best für
        </p>
        <p className="mt-2 text-[0.875rem] leading-[1.5] text-[hsl(var(--accent))]">
          {tier.bestFor}
        </p>
      </div>

      <ul className="mt-7 space-y-3 border-t border-[hsl(var(--border))] pt-6">
        {tier.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-3 text-[0.9rem] leading-[1.55] text-[hsl(var(--fg))]"
          >
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--accent))]" strokeWidth={2.5} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7 flex items-start gap-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-4 py-3">
        <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--accent))]" />
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[hsl(var(--fg))]">
          {tier.roiHint}
        </p>
      </div>

      <div className="mt-auto pt-8">
        <a
          href={site.cta.meetingUrl}
          data-sound="tick"
          data-cursor-label="Buchen"
          data-event="booking_clicked"
          data-tier="workflow"
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

function formatPrice(raw: string): string {
  return raw.replace(/^ab\s*/i, '').replace(/\s*€\s*$/, '').trim();
}
