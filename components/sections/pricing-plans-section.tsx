'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Mic, Workflow, ArrowUpRight } from 'lucide-react';
import { pricing } from '@/lib/content';
import { voicePlans, type VoicePlan } from '@/lib/pricing-voice';
import { useEnglish } from '@/components/system/use-locale';

type Billing = 'monthly' | 'annual';

type AgentCard = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceSuffix?: string;
  marketPrice?: string;
  roiHint?: string;
  bestFor?: string;
  features: readonly string[];
  /** Direct Stripe Payment-Link (one-time). When present → primary CTA. */
  checkoutUrl?: string;
  /** Label for the buy button when checkoutUrl is set */
  buyLabel?: string;
  /** Always-shown secondary CTA leading to /termin */
  secondaryCta: string;
  ctaHref: string;
  recommended?: boolean;
};

const HREF = '/termin';

const agentCards: AgentCard[] = (pricing.tiers || []).map((t, i) => {
  const tier = t as typeof t & { checkoutUrl?: string; buyLabel?: string; roiHint?: string };
  return {
    id: 'agent-' + i,
    name: t.name,
    tagline: t.tagline,
    price: t.price,
    priceSuffix: t.priceSuffix,
    marketPrice: t.marketPrice,
    roiHint: tier.roiHint,
    bestFor: t.bestFor,
    features: t.features,
    checkoutUrl: tier.checkoutUrl,
    buyLabel: tier.buyLabel,
    secondaryCta: t.cta,
    ctaHref: HREF,
    recommended: t.recommended,
  };
});

/* ── Voice Plan Card with annual/monthly logic ── */
function VoiceCard({ plan, billing }: { plan: VoicePlan; billing: Billing }) {
  const rec = !!plan.recommended;
  const price = billing === 'monthly' ? plan.priceMonthly : plan.priceAnnual;
  const onRequest = plan.monthlyValue == null;
  const en = useEnglish();

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
          ? 'border-[hsl(var(--accent))/40] bg-[hsl(var(--accent))/10] rec-pulse'
          : 'border-[hsl(var(--border))] bg-[hsl(var(--bg))]/60')
      }
    >
      {rec ? (
        <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--accent))] px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-white">
          {en ? '★ Popular' : '★ Beliebt'}
        </span>
      ) : null}

      <h4 className="font-display text-[1.5rem] font-medium text-[hsl(var(--fg))]">{plan.name}</h4>
      <p className="mt-1 min-h-[2.5rem] text-[0.9rem] leading-relaxed text-[hsl(var(--muted))]">{en ? plan.taglineEn ?? plan.tagline : plan.tagline}</p>

      <div className="my-6 h-px w-full bg-[hsl(var(--border))]" />

      {/* Price */}
      <div className="flex items-end gap-2">
        <span className="font-display text-[clamp(2rem,3.6vw,3rem)] font-medium leading-none tabular-nums tracking-[-0.025em] text-[hsl(var(--fg))]">
          {price}
        </span>
        {plan.priceSuffix && !onRequest ? (
          <span className="mb-1 text-[0.95rem] text-[hsl(var(--subtle))]">{en ? '/month' : plan.priceSuffix}</span>
        ) : null}
      </div>

      {/* Setup line — only for Solo/Team, behavior changes with billing */}
      {plan.setupValue !== null ? (
        <p className="mt-2 text-[0.8rem] leading-relaxed text-[hsl(var(--subtle))]">
          {billing === 'monthly' ? (
            <>+ <span className="text-[hsl(var(--accent))]">{en ? `€${plan.setupValue} setup` : `${plan.setupValue} € netto Setup`}</span>{en ? ' · one-time on first invoice' : ' · einmalig auf 1. Rechnung'}</>
          ) : (
            <>
              <s>+ {plan.setupValue} € Setup</s>{' '}
              <span className="text-[hsl(174_100%_70%)]">{en ? '· setup included' : '· Setup inklusive'}</span>
              <span className="ml-1">{en ? '· 12 mo, billed yearly' : '· 12 Mo, jährlich abgerechnet'}</span>
            </>
          )}
        </p>
      ) : (
        <p className="mt-2 text-[0.8rem] text-[hsl(var(--subtle))]">{plan.setup}</p>
      )}

      <ul className="mt-6 flex-1 space-y-3">
        {(en ? plan.featuresEn ?? plan.features : plan.features).map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[0.875rem] leading-relaxed text-[hsl(var(--muted))]">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--accent))]" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--subtle))]">
        {en ? plan.idealForEn ?? plan.idealFor : plan.idealFor}
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
        {en ? plan.ctaEn ?? plan.cta : plan.cta}
        <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}

/* ── Workflow / Agent project card — Buy-Button + secondary "Erstgespräch" ── */
function AgentPlanCard({ card }: { card: AgentCard }) {
  const rec = !!card.recommended;
  const hasBuy = !!card.checkoutUrl;
  return (
    <div
      className={
        'relative flex flex-col rounded-xl border p-7 transition-transform duration-300 hover:-translate-y-1 ' +
        (rec
          ? 'border-[hsl(var(--accent))/40] bg-[hsl(var(--accent))/10] rec-pulse'
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
        <span className="font-display text-[clamp(2.25rem,3.6vw,3rem)] font-medium leading-none tabular-nums tracking-[-0.025em] text-[hsl(var(--fg))]">
          {card.price}
        </span>
        {card.priceSuffix ? <span className="mb-1 text-[0.95rem] text-[hsl(var(--subtle))]">{card.priceSuffix}</span> : null}
      </div>

      {card.marketPrice ? (
        <p className="mt-2 text-[0.8rem] text-[hsl(var(--subtle))]">
          <span className="line-through">{card.marketPrice}</span>
          <span className="ml-1.5 rounded-full bg-[hsl(var(--accent))/12] px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-[hsl(var(--accent))]">
            unser Preis
          </span>
        </p>
      ) : null}

      <ul className="mt-6 flex-1 space-y-3">
        {card.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[0.875rem] leading-relaxed text-[hsl(var(--muted))]">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--accent))]" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {card.roiHint ? (
        <p className="mt-5 inline-flex items-center gap-1.5 self-start rounded-full bg-[hsl(var(--accent))/10] px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-[hsl(var(--accent))]">
          ✨ {card.roiHint}
        </p>
      ) : null}

      {card.bestFor ? (
        <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--subtle))]">
          {card.bestFor}
        </p>
      ) : null}

      {/* Primary CTA — Stripe Buy-Button if checkoutUrl present, else /termin */}
      {hasBuy ? (
        <a
          href={card.checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-event="workflow_buy_click"
          data-tier={card.id}
          className={
            'mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.9rem] font-medium transition-all ' +
            (rec
              ? 'bg-[hsl(var(--accent))] text-white hover:brightness-110'
              : 'bg-[hsl(var(--accent))] text-white hover:brightness-110')
          }
        >
          {card.buyLabel || 'Paket buchen'}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      ) : (
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
          {card.secondaryCta}
        </a>
      )}

      {/* Secondary CTA — always available when buy button shows, for bigger scope */}
      {hasBuy ? (
        <a
          href={card.ctaHref}
          data-event="booking_clicked_secondary"
          className="mt-3 inline-flex w-full items-center justify-center text-[0.8rem] text-[hsl(var(--muted))] underline-offset-2 transition-colors hover:text-[hsl(var(--fg))] hover:underline"
        >
          Größerer Scope? {card.secondaryCta} →
        </a>
      ) : null}
    </div>
  );
}

const GROUPS = [
  { id: 'voice', label: 'KI-Sprachagenten', Icon: Mic },
  { id: 'agents', label: 'KI-Agenten & Workflows', Icon: Workflow },
] as const;

export function PricingPlansSection() {
  const en = useEnglish();
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
            {en ? 'Investment · transparent & net' : 'Investment · transparent & netto'}
          </span>
          <h2 className="mx-auto mt-3 max-w-3xl font-display text-[clamp(1.875rem,3.4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
            {en ? 'Simple plans for your AI phone assistant.' : 'Zwei Wege zu mehr Umsatz mit KI — dein Telefon, oder deine Prozesse.'}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[1rem] leading-relaxed text-[hsl(var(--muted))]">
{en ? (
              'Your AI voice agents answer the phone — 24/7, in natural language, wired into your CRM. Pick a plan; scale anytime.'
            ) : (
              <>
                <strong className="text-[hsl(var(--fg))]">KI-Sprachagenten</strong> nehmen dein Telefon ab.{' '}
                <strong className="text-[hsl(var(--fg))]">KI-Agenten & Workflows</strong> nehmen dir die Prozesse ab. Wähl deine Linie — oder kombiniere beide.
              </>
            )}
          </p>
        </div>

        {/* Toggle micro-instruction — makes it obvious the switch is interactive */}
        {!en && (
        <p className="mt-10 text-center font-mono text-[0.625rem] uppercase tracking-[0.28em] text-[hsl(var(--accent))]">
          Was brauchst du? <span aria-hidden>→</span> Wähl deine Linie
        </p>
        )}

        {/* Category toggle */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
          {!en && (
          <div
            role="tablist"
            aria-label="Preis-Kategorien"
            className="inline-flex rounded-full border border-[hsl(var(--border-strong))] bg-[hsl(var(--surface))] p-1.5 shadow-[inset_0_1px_0_hsl(0_0%_100%/0.04)]"
          >
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
                    'relative cursor-pointer rounded-full px-5 py-2 text-[0.85rem] font-medium transition-colors duration-300 ' +
                    (sel
                      ? 'text-white'
                      : 'text-[hsl(var(--muted))] hover:bg-[hsl(var(--fg))]/[0.06] hover:text-[hsl(var(--fg))]')
                  }
                >
                  {sel ? (
                    <motion.span
                      layoutId="pricing-tab-pill"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-full bg-[hsl(var(--accent))] shadow-[0_8px_24px_-8px_hsl(var(--accent)/0.6)]"
                    />
                  ) : null}
                  <span className="relative z-10 inline-flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {g.label}
                  </span>
                </button>
              );
            })}
          </div>
          )}

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
                {en ? 'Monthly' : 'Monatlich'}
              </button>
              <button
                type="button"
                onClick={() => setBilling('annual')}
                className={
                  'rounded-full px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] transition-all ' +
                  (billing === 'annual' ? 'bg-[hsl(var(--accent))] text-white' : 'text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))]')
                }
              >
                {en ? 'Yearly · −15%' : 'Jährlich · −15 %'}
              </button>
            </div>
          ) : null}
        </div>

        {/* Cross-tab teaser — DE only (EN is voice-focused) */}
        {!en && (
        <p className="mt-5 text-center text-[0.95rem] text-[hsl(var(--muted))]">
          {active === 'voice' ? (
            <>
              Brauchst du eher Prozess-Automatisierung?{' '}
              <button
                type="button"
                onClick={() => setActive('agents')}
                className="ml-1.5 inline-flex items-center rounded-full border border-[hsl(var(--accent))/45] bg-[hsl(var(--accent))/12] px-3.5 py-1.5 align-middle font-semibold text-[hsl(var(--accent))] transition-colors hover:border-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))/20]"
              >
                → KI-Agenten & Workflows
              </button>
            </>
          ) : (
            <>
              Brauchst du eher Telefonie?{' '}
              <button
                type="button"
                onClick={() => setActive('voice')}
                className="ml-1.5 inline-flex items-center rounded-full border border-[hsl(var(--accent))/45] bg-[hsl(var(--accent))/12] px-3.5 py-1.5 align-middle font-semibold text-[hsl(var(--accent))] transition-colors hover:border-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))/20]"
              >
                → KI-Sprachagenten
              </button>
            </>
          )}
        </p>
        )}

        {/* Cards */}
        {active === 'voice' ? (
          <div role="tabpanel" className="mt-12 grid gap-6 md:grid-cols-3">
            {voicePlans.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30, scale: p.recommended ? 0.95 : 1 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-12% 0px' }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={p.recommended ? 'md:-mt-2' : ''}
              >
                <VoiceCard plan={p} billing={billing} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div
            role="tabpanel"
            className={'mt-12 grid gap-6 ' + (agentCards.length === 3 ? 'md:grid-cols-3' : 'mx-auto max-w-3xl md:grid-cols-2')}
          >
            {agentCards.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 30, scale: c.recommended ? 0.95 : 1 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-12% 0px' }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={c.recommended ? 'md:-mt-2' : ''}
              >
                <AgentPlanCard card={c} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Reassurance strip — voice tab only */}
        {active === 'voice' ? (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[hsl(var(--muted))]">
            <span><span className="text-[hsl(var(--accent))]">▸</span> {en ? 'GDPR · EU hosting (Nuremberg)' : 'DSGVO · EU-Hosting (Nürnberg)'}</span>
            <span><span className="text-[hsl(var(--accent))]">▸</span> {en ? 'Cancel monthly' : 'Monatlich kündbar'}</span>
            <span><span className="text-[hsl(var(--accent))]">▸</span> {en ? '30-day SLA' : '30-Tage-SLA'}</span>
            <span><span className="text-[hsl(var(--accent))]">▸</span> {en ? 'You own your data' : 'Du besitzt deine Daten'}</span>
          </div>
        ) : null}

        <p className="mt-8 max-w-3xl mx-auto text-center text-[0.85rem] leading-relaxed text-[hsl(var(--muted))]">
          {en ? 'All prices net, plus VAT · Setup fee Solo €490 / Team €990 net, one-time on the first invoice. With annual prepayment the setup is waived for Solo & Team. Scale setup from €1,990, individual.' : 'Alle Preise netto, zzgl. MwSt. · Setup-Gebühr Solo 490 € / Team 990 € netto einmalig auf 1. Rechnung. Bei Jahresvorkasse entfällt das Setup für Solo & Team. Scale-Setup ab 1.990 € individuell.'}
        </p>
      </div>
    </section>
  );
}
