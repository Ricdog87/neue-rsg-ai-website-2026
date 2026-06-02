'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, Mic, Workflow } from 'lucide-react';
import { pricing } from '@/lib/content';
import { voicePlans } from '@/lib/pricing-voice';

type Card = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceSuffix?: string;
  setup?: string;
  marketPrice?: string;
  idealFor?: string;
  bestFor?: string;
  features: readonly string[];
  cta: string;
  ctaHref: string;
  recommended?: boolean;
};

const HREF = '/termin';

const voiceCards: Card[] = voicePlans.map((p) => ({
  id: p.id,
  name: p.name,
  tagline: p.tagline,
  price: p.priceMonthly,
  priceSuffix: p.priceSuffix,
  setup: p.setup,
  idealFor: p.idealFor,
  features: p.features,
  cta: p.cta,
  ctaHref: p.ctaHref || HREF,
  recommended: p.recommended,
}));

const agentCards: Card[] = (pricing.tiers || []).map((t, i) => ({
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

const GROUPS = [
  { id: 'voice', label: 'KI-Sprachagenten', Icon: Mic, cards: voiceCards },
  { id: 'agents', label: 'KI-Agenten & Workflows', Icon: Workflow, cards: agentCards },
];

function PlanCard({ card, reduce }: { card: Card; reduce: boolean }) {
  const rec = !!card.recommended;
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={reduce ? false : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={
        'relative flex flex-col rounded-xl border p-7 ' +
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
      {card.setup ? <p className="mt-2 text-[0.8rem] text-[hsl(var(--subtle))]">{card.setup}</p> : null}
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
      {card.idealFor || card.bestFor ? (
        <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--subtle))]">{card.idealFor || card.bestFor}</p>
      ) : null}
      <a
        href={card.ctaHref}
        className={
          'mt-6 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-[0.9rem] font-medium transition-all ' +
          (rec
            ? 'bg-[hsl(var(--accent))] text-white hover:brightness-110'
            : 'border border-[hsl(var(--border))] text-[hsl(var(--fg))] hover:border-[hsl(var(--accent))/60] hover:text-[hsl(var(--accent))]')
        }
      >
        {card.cta}
      </a>
    </motion.div>
  );
}

export function PricingPlansSection() {
  const [active, setActive] = useState('voice');
  const reduce = useReducedMotion() || false;
  const group = GROUPS.find((g) => g.id === active) || GROUPS[0];

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

        <div className="mt-10 flex justify-center">
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
        </div>

        <div
          role="tabpanel"
          className={'mt-12 grid gap-6 ' + (group.cards.length === 3 ? 'md:grid-cols-3' : 'mx-auto max-w-3xl md:grid-cols-2')}
        >
          {group.cards.map((c) => (
            <PlanCard key={c.id} card={c} reduce={reduce} />
          ))}
        </div>

        <p className="mt-10 text-center text-[0.8rem] text-[hsl(var(--subtle))]">
          Alle Preise netto, zzgl. MwSt. · Hosting & nutzungsabhängige Token-Kosten transparent abgerechnet.
        </p>
      </div>
    </section>
  );
}
