'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, Phone } from 'lucide-react';
import { voicePlans } from '@/lib/pricing-voice';
import { VoiceCard, type Billing } from '@/components/sections/pricing-plans-section';
import { useEnglish } from '@/components/system/use-locale';

/**
 * Pricing Snapshot — Voice-Preise auf der Homepage.
 *
 * Nutzt dieselben vollen Karten wie /preise (VoiceCard aus
 * pricing-plans-section), damit Homepage und Preisseite identisch
 * aussehen — inklusive Monatlich/Jährlich-Toggle (−15 %, Setup
 * inklusive bei Jahresvorkasse) und dem Pill-Link zu den
 * Automatisierungs-Preisen, beides 1:1 wie auf /preise.
 */
export function PricingSnapshot() {
  const en = useEnglish();
  const [billing, setBilling] = useState<Billing>('monthly');

  return (
    <section
      id="pricing-snapshot"
      className="relative px-6 py-16 md:py-20 lg:px-10"
    >
      <div className="relative mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-4">
          <div className="col-span-12 md:col-span-7">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
              {en ? 'Pricing · Phone assistant' : 'Preise · Telefonassistent'}
            </span>
            <h2 className="mt-3 font-display text-[clamp(1.875rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
              {en ? 'Three plans. One call to get started.' : 'Drei Pakete. Ein Anruf reicht zum Start.'}
            </h2>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--accent))/30] bg-[hsl(var(--accent-soft))]/10 px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--accent))]">
              <span className="relative flex h-1.5 w-1.5">
                <span aria-hidden className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-[hsl(var(--accent))] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />
              </span>
              {en ? 'Cohort 06 · Q3 2026 · only 3 of 5 slots left' : 'Kohorte 06 · Q3 2026 · nur noch 3 von 5 Plätzen'}
            </p>
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

        {/* Billing toggle — 1:1 wie /preise (Jahresvorkasse: −15 %, Setup inkl.) */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--bg))]/60 p-1">
            <button
              type="button"
              onClick={() => setBilling('monthly')}
              data-event="snapshot_billing_monthly"
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
              data-event="snapshot_billing_annual"
              className={
                'rounded-full px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] transition-all ' +
                (billing === 'annual' ? 'bg-[hsl(var(--accent))] text-white' : 'text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))]')
              }
            >
              {en ? 'Yearly · −15%' : 'Jährlich · −15 %'}
            </button>
          </div>
        </div>

        {/* Cross-Link zu den Automatisierungs-Preisen — Pill wie auf /preise */}
        <p className="mt-5 text-center text-[0.95rem] text-[hsl(var(--muted))]">
          {en ? 'Need process automation instead?' : 'Brauchst du eher Prozess-Automatisierung?'}{' '}
          <Link
            href={en ? '/en/automatisierung' : '/automatisierung#automation-pricing'}
            data-event="snapshot_to_automation_pricing"
            className="ml-1.5 inline-flex items-center rounded-full border border-[hsl(var(--accent))/45] bg-[hsl(var(--accent))/12] px-3.5 py-1.5 align-middle font-semibold text-[hsl(var(--accent))] transition-colors hover:border-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))/20]"
          >
            → {en ? 'AI agents & workflows' : 'KI-Agenten & Workflows'}
          </Link>
        </p>

        {/* Cards — identisch zur /preise-Seite (volle Feature-Listen) */}
        <div className="mt-10 grid items-stretch gap-6 md:grid-cols-3">
          {voicePlans.map((p) => (
            <VoiceCard key={p.id} plan={p} billing={billing} />
          ))}
        </div>

        {/* Sub-line — additional context */}
        <p className="mt-8 text-center text-[0.875rem] text-[hsl(var(--muted))]">
          {en ? 'AI agents & workflows from €2,500' : 'KI-Agenten & Workflows ab 2.500 €'}
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
