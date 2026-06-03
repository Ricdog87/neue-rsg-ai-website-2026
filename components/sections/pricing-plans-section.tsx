'use client';

import { useState } from 'react';
import { Check, Mic, Workflow, ArrowUpRight } from 'lucide-react';
import { pricing } from '@/lib/content';
import { voicePlans, type VoicePlan } from '@/lib/pricing-voice';

type Billing = 'monthly' | 'annual';

type AgentCard = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceSuffix?: string;
  marketPrice?: string;
  bestFor?: string;
  features: readonly string[];
  cta: string;
  ctaHref: string;
  recommended?: boolean;
};

const HREF = '/termin';

const agentCards: AgentCard[] = (pricing.tiers || []).map((t, i) => ({
  id: 'agent-' + i,
  name: t.name,
  tagline: t.tagline,
  price: t.price,
  priceSuffix: t.priceSuffix,
  marketPrice: t.marketPrice,
  bestFor: t.bestFor,
  features: t.features,
  cta: t.cta,
  ctaHref: HREF,
  recommended: t.recommended,
}));

/* ── Voice Plan Card with annual/monthly logic ── */
function VoiceCard({ plan, billing }: { plan: VoicePlan; billing: Billing }) {
  const rec = !!plan.recommended;
  const price = billing === 'monthly' ? plan.priceMonthly : plan.priceAnnual;
  const onRequest = plan.monthlyValue == null;

  async function handleClick(e: React.MouseEvent) {
    if (!plan.checkoutTier) return; // Scale → /termin via href
    e.preventDefault();
    try {
      window.plausible?.('checkout_started', {
        props: { tier: plan.checkoutTier, billing },
      });
    } catch {}
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ tier: plan.checkoutTier, billing }),
      });
      const data = await res.json();
      window.location.href = data?.url || data?.fallbackHref || plan.ctaHref;
    } catch {
      window.location.href = plan.ctaHref;
    }
  }

  return (
    <div
      className={
        'relative flex flex-col rounded-xl border p-7 transition-transform duration-300 hover:-translate-y-1 ' +
        (rec
          ? 'border-[hsl(var(--accent))/40] bg-[hsl(var(--accent))/10] shadow-[0_0_40px_hsl(var(--accent)/0.45)]'
          : 'border-[hsl(var(--border))] bg-[hsl(var(--bg))]/60')
      }
    >
      {rec ? (
        <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--accent))] px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-white">
          ★ Beliebt
        </span>
      ) : null}

      <h4 className="font-display text-[1.5rem] font-medium text-[hsl(var(--fg))]">{plan.name}</h4>
      <p className="mt-1 min-h-[2.5rem] text-[0.9rem] leading-relaxed text-[hsl(var(--muted))]">{plan.tagline}</p>

      <div className="my-6 h-px w-full bg-[hsl(var(--border))]" />

      {/* Price */}
      <div className="flex items-end gap-2">
        <span className="font-display text-[clamp(2rem,3.6vw,3rem)] font-medium leading-none tabular-nums tracking-[-0.025em] text-[hsl(var(--fg))]">
          {price}
        </span>
        {plan.priceSuffix && !onRequest ? (
          <span className="mb-1 text-[0.95rem] text-[hsl(var(--subtle))]">{plan.priceSuffix}</span>
        ) : null}
      </div>

      {/* Setup line — only for Solo/Team, behavior changes with billing */}
      {plan.setupValue !== null ? (
        <p className="mt-2 text-[0.8rem] leading-relaxed text-[hsl(var(--subtle))]">
          {billing === 'monthly' ? (
            <>+ <span className="text-[hsl(var(--accent))]">{plan.setupValue} € netto Setup</span> · einmalig auf 1. Rechnung</>
          ) : (
            <>
              <s>+ {plan.setupValue} € Setup</s>{' '}
              <span className="text-[hsl(174_100%_70%)]">· Setup inklusive</span>
              <span className="ml-1">· 12 Mo, jährlich abgerechnet</span>
            </>
          )}
        </p>
      ) : (
        <p className="mt-2 text-[0.8rem] text-[hsl(var(--subtle))]">{plan.setup}</p>
      )}

      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[0.875rem] leading-relaxed text-[hsl(var(--muted))]">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--accent))]" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--subtle))]">
        {plan.idealFor}
      </p>

      <a
        href={plan.ctaHref}
        onClick={handleClick}
        data-event={plan.checkoutTier ? 'checkout_started' : 'booking_clicked'}
        data-tier={plan.checkoutTier ?? 'scale'}
        className={
          'mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.9rem] font-medium transition-all ' +
          (rec
            ? 'bg-[hsl(var(--accent))] text-white hover:brightness-110'
            : 'border border-[hsl(var(--border))] text-[hsl(var(--fg))] hover:border-[hsl(var(--accent))/60] hover:text-[hsl(var(--accent))]')
        }
      >
        {plan.cta}
        <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}

/* ── Workflow / Agent project card (unchanged behavior) ── */
function AgentPlanCard({ card }: { card: AgentCard }) {
  const rec = !!card.recommended;
  return (
    <div
      className={
        'relative flex flex-col rounded-xl border p-7 transition-transform duration-300 hover:-translate-y-1 ' +
        (rec
          ? 'border-[hsl(var(--accent))/40] bg-[hsl(var(--accent))/10] shadow-[0_0_40px_hsl(var(--accent)/0.45)]'
          : 'border-[hsl(var(--border))] bg-[hsl(var(--bg))]/60')
      }
    >
      {rec ? (
        <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--accent))] px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-white">
          ★ Beliebt
        </span>
      ) : null}
      <h4 className="font-display text-[1.5rem] font-medium text-[hsl(var(--fg))]">{card.name}</h4>
      <p className="mt-1 min-h-[2.5rem] text-[0.9rem] leading-relaxed text-[hsl(var(--muted))]">{card.tagline}</p>
      <div className="my-6 h-px w-full bg-[hsl(var(--border))]" />
      <div className="flex items-end gap-2">
        <span className="font-display text-[clamp(2.25rem,3.6vw,3rem)] font-medium leading-none tabular-nums tracking-[-0.025em] text-[hsl(var(--fg))]">{card.price}</span>
        {card.priceSuffix ? <span className="mb-1 text-[0.95rem] text-[hsl(var(--subtle))]">{card.priceSuffix}</span> : null}
      </div>
      {card.marketPrice ? (
        <p className="mt-2 text-[0.8rem] text-[hsl(var(--subtle))]"><span className="line-through">{card.marketPrice}</span> · unser Preis</p>
      ) : null}
      <ul className="mt-6 flex-1 space-y-3">
        {card.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[0.875rem] leading-relaxed text-[hsl(var(--muted))]">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--accent))]" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      {card.bestFor ? (
        <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--subtle))]">{card.bestFor}</p>
      ) : null}
      <a
        href={card.ctaHref}
        data-event="booking_clicked"
        className={
          'mt-6 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-[0.9rem] font-medium transition-all ' +
          (rec
            ? 'bg-[hsl(var(--accent))] text-white hover:brightness-110'
            : 'border border-[hsl(var(--border))] text-[hsl(var(--fg))] hover:border-[hsl(var(--accent))/60] hover:text-[hsl(var(--accent))]')
        }
      >
        {card.cta}
      </a>
    </div>
  );
}

const GROUPS = [
  { id: 'voice', label: 'KI-Sprachagenten', Icon: Mic },
  { id: 'agents', label: 'KI-Agenten & Workflows', Icon: Workflow },
] as const;

export function PricingPlansSection() {
  const [active, setActive] = useState<'voice' | 'agents'>('voice');
  const [billing, setBilling] = useState<Billing>('monthly');

  return (
    <section
      id="pricing"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/82 px-6 py-20 backdrop-blur-[2px] md:py-28 lg:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
            Investment · transparent & netto
          </span>
          <h2 className="mx-auto mt-3 max-w-3xl font-display text-[clamp(1.875rem,3.4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
            Zwei Wege zu mehr Output — pro Monat oder als Projekt.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[1rem] leading-relaxed text-[hsl(var(--muted))]">
            Sprachagenten für dein Telefon oder maßgeschneiderte KI-Agenten & Automatisierung. Wähl deine Linie.
          </p>
        </div>

        {/* Category toggle */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <div role="tablist" aria-label="Preis-Kategorien" className="inline-flex rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--bg))]/60 p-1">
            {GROUPS.map((g) => {
              const sel = g.id === active;
              const Icon = g.Icon;
              return (
                <button
                  key={g.id}
                  type="button"
                  role="tab"
                  aria-selected={sel}
                  data-event={!sel ? `pricing_tab_${g.id}` : undefined}
                  onClick={() => setActive(g.id)}
                  className={
                    'rounded-full px-5 py-2 text-[0.85rem] font-medium transition-all ' +
                    (sel ? 'bg-[hsl(var(--accent))] text-white' : 'text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))]')
                  }
                >
                  <span className="inline-flex items-center gap-2"><Icon className="h-4 w-4" />{g.label}</span>
                </button>
              );
            })}
          </div>

          {/* Billing toggle — voice only */}
          {active === 'voice' ? (
            <div className="inline-flex items-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--bg))]/60 p-1">
              <button
                type="button"
                onClick={() => setBilling('monthly')}
                className={
                  'rounded-full px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] transition-all ' +
                  (billing === 'monthly' ? 'bg-[hsl(var(--accent))] text-white' : 'text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))]')
                }
              >
                Monatlich
              </button>
              <button
                type="button"
                onClick={() => setBilling('annual')}
                className={
                  'rounded-full px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] transition-all ' +
                  (billing === 'annual' ? 'bg-[hsl(var(--accent))] text-white' : 'text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))]')
                }
              >
                Jährlich · −15 %
              </button>
            </div>
          ) : null}
        </div>

        {/* Cards */}
        {active === 'voice' ? (
          <div role="tabpanel" className="mt-12 grid gap-6 md:grid-cols-3">
            {voicePlans.map((p) => (
              <VoiceCard key={p.id} plan={p} billing={billing} />
            ))}
          </div>
        ) : (
          <div
            role="tabpanel"
            className={'mt-12 grid gap-6 ' + (agentCards.length === 3 ? 'md:grid-cols-3' : 'mx-auto max-w-3xl md:grid-cols-2')}
          >
            {agentCards.map((c) => (
              <AgentPlanCard key={c.id} card={c} />
            ))}
          </div>
        )}

        {/* Reassurance strip — voice tab only */}
        {active === 'voice' ? (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[hsl(var(--subtle))]">
            <span><span className="text-[hsl(var(--accent))]">▸</span> DSGVO · EU-Hosting (Nürnberg)</span>
            <span><span className="text-[hsl(var(--accent))]">▸</span> Monatlich kündbar</span>
            <span><span className="text-[hsl(var(--accent))]">▸</span> 30-Tage-SLA</span>
            <span><span className="text-[hsl(var(--accent))]">▸</span> Du besitzt deine Daten</span>
          </div>
        ) : null}

        <p className="mt-8 text-center text-[0.8rem] text-[hsl(var(--subtle))]">
          Alle Preise netto, zzgl. MwSt. · Setup-Gebühr Solo 490 € / Team 990 € netto einmalig auf 1. Rechnung. Bei Jahresvorkasse entfällt das Setup für Solo & Team. Scale-Setup ab 1.990 € individuell.
        </p>
      </div>
    </section>
  );
}
