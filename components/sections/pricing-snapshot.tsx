'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, Loader2, Phone } from 'lucide-react';
import { voicePlans } from '@/lib/pricing-voice';
import { useEnglish } from '@/components/system/use-locale';

/**
 * Pricing Snapshot — kompakte 3-Card-Voice-Preview für die Homepage.
 *
 * Ziel: Preise sofort sichtbar, ohne dass User durch 8 Sektionen scrollen muss.
 * Volle Details + Toggle + Workflows + ROI + FAQ → eigene /preise-Seite.
 */
export function PricingSnapshot() {
  const en = useEnglish();
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  async function handleCheckout(tier: 'solo' | 'team') {
    setLoadingTier(tier);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, billing: 'monthly' }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        // Fallback: Stripe nicht konfiguriert → Terminbuchung
        window.location.href = data.fallbackHref ?? '/termin';
      }
    } catch {
      window.location.href = '/termin';
    } finally {
      setLoadingTier(null);
    }
  }

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

        {/* Cards — compact, max 4 features each */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {voicePlans.map((p, i) => (
            <SnapshotCard key={p.id} p={p} i={i} en={en} loadingTier={loadingTier} onCheckout={handleCheckout} />
          ))}
        </div>

        {/* Sub-line — additional context */}
        <p className="mt-6 text-center text-[0.875rem] text-[hsl(var(--muted))]">
          {en ? 'Need process automation rather than telephony?' : 'Du brauchst eher Prozess-Automatisierung statt Telefonie?'}{' '}
          <Link
            href={en ? '/en/automatisierung' : '/automatisierung'}
            className="font-medium text-[hsl(var(--accent))] underline-offset-2 hover:underline"
          >
            {en ? 'AI agents & workflows from €2,500' : 'KI-Agenten & Workflows ab 2.500 €'}
          </Link>
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


function SnapshotCard({ p, i, en, loadingTier, onCheckout }: {
  p: (typeof voicePlans)[number];
  i: number;
  en: boolean;
  loadingTier: string | null;
  onCheckout: (tier: 'solo' | 'team') => void;
}) {
  const reduce = useReducedMotion();
  const rxMV = useMotionValue(0);
  const ryMV = useMotionValue(0);
  const rotateX = useSpring(rxMV, { stiffness: 160, damping: 18 });
  const rotateY = useSpring(ryMV, { stiffness: 160, damping: 18 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const py = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    ryMV.set(Math.max(-1, Math.min(1, px)) * 6);
    rxMV.set(Math.max(-1, Math.min(1, -py)) * 6);
  }
  function onLeave() {
    rxMV.set(0);
    ryMV.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ delay: i * 0.13, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      className={
        'group relative flex flex-col overflow-hidden rounded-2xl border p-6 transition-colors duration-300 ' +
        (p.recommended
          ? 'border-[hsl(var(--accent))]/55 bg-gradient-to-b from-[hsl(var(--accent))]/[0.14] via-[hsl(var(--accent))]/[0.05] to-transparent shadow-[0_0_60px_-18px_hsl(var(--accent)/0.6)] md:-mt-3 md:mb-3'
          : 'border-[hsl(var(--border))] bg-[hsl(var(--bg))]/60 hover:border-[hsl(var(--accent))]/45 hover:bg-[hsl(var(--bg))]/75')
      }
    >
      {/* Corner brackets — viewfinder framing on the recommended card */}
      {p.recommended && (
        <>
          <span aria-hidden className="absolute left-2 top-2 h-2.5 w-2.5 border-l border-t border-[hsl(var(--accent))]/60" />
          <span aria-hidden className="absolute right-2 top-2 h-2.5 w-2.5 border-r border-t border-[hsl(var(--accent))]/60" />
          <span aria-hidden className="absolute bottom-2 left-2 h-2.5 w-2.5 border-b border-l border-[hsl(var(--accent))]/60" />
          <span aria-hidden className="absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-[hsl(var(--accent))]/60" />
        </>
      )}

      {/* Top rail — plan index + bestseller / capacity chip */}
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
          <span aria-hidden className={'h-px w-4 ' + (p.recommended ? 'bg-[hsl(var(--accent))]/60' : 'bg-[hsl(var(--border-strong))]')} />
          {String(i + 1).padStart(2, '0')}
        </span>
        {p.recommended ? (
          <motion.span
            animate={{ scale: [1, 1.07, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--accent))] px-2.5 py-0.5 font-mono text-[0.575rem] uppercase tracking-[0.2em] text-white shadow-[0_0_22px_hsl(var(--accent)/0.55)]"
          >
            ★ Bestseller
          </motion.span>
        ) : (
          <span className="rounded-full border border-[hsl(var(--border))] px-2.5 py-0.5 font-mono text-[0.575rem] uppercase tracking-[0.18em] text-[hsl(var(--subtle))]">
            {(en ? p.idealForEn ?? p.idealFor : p.idealFor)
              .replace(/^Ideal (für|for) ?/, '')
              .replace(/^Aktives.*?·\s*/, '')
              .replace(/^Active.*?·\s*/, '')}
          </span>
        )}
      </div>

      {/* Name — full width, never fights for space */}
      <h3 className="mt-4 text-balance font-display text-[clamp(1.35rem,2.2vw,1.6rem)] font-medium leading-[1.1] tracking-[-0.015em] text-[hsl(var(--fg))]">
        {p.name}
      </h3>
      {p.recommended && (
        <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[hsl(var(--accent))]/90">
          {(en ? p.idealForEn ?? p.idealFor : p.idealFor).replace(/^Ideal (für|for) ?/, '')}
        </p>
      )}

      {/* Price block */}
      <div className="mt-5 flex items-end gap-1.5">
        <span className="font-display text-[clamp(2rem,3.4vw,2.6rem)] font-medium leading-none tabular-nums tracking-[-0.025em] text-[hsl(var(--fg))]">
          {p.priceMonthly}
        </span>
        {p.priceSuffix ? (
          <span className="mb-0.5 text-[0.85rem] text-[hsl(var(--muted))]">
            {en ? '/month' : p.priceSuffix}
          </span>
        ) : null}
      </div>
      <p className="mt-1.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[hsl(var(--muted))]">
        {p.setupValue !== null
          ? en ? `+ €${p.setupValue} setup · one-time` : `+ ${p.setupValue} € Setup · einmalig`
          : en ? 'Setup from €1,990 · custom' : 'Setup ab 1.990 € · individuell'}
      </p>

      {/* Hairline divider with mini scan mark */}
      <div aria-hidden className="relative mt-5 h-px w-full overflow-hidden bg-[hsl(var(--border))]">
        <span className={'absolute inset-y-0 left-0 h-px w-10 ' + (p.recommended ? 'bg-[hsl(var(--accent))]' : 'bg-[hsl(var(--border-strong))]')} />
      </div>

      <ul className="mt-5 flex-1 space-y-2.5">
        {(en ? p.featuresEn ?? p.features : p.features).slice(0, 3).map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5 text-[0.825rem] leading-snug text-[hsl(var(--muted))]"
          >
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--accent))]" strokeWidth={2.5} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {p.checkoutTier ? (
        <button
          type="button"
          data-event={`snapshot_card_${p.id}`}
          data-tier={p.id}
          disabled={loadingTier === p.id}
          onClick={() => onCheckout(p.checkoutTier as 'solo' | 'team')}
          className={
            'relative mt-6 inline-flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-full text-[0.875rem] font-medium transition-all disabled:opacity-70 ' +
            (p.recommended
              ? 'bg-[hsl(var(--accent))] text-white shadow-[0_10px_30px_-10px_hsl(var(--accent)/0.8)] hover:shadow-[0_14px_40px_-10px_hsl(var(--accent)/0.95)]'
              : 'border border-[hsl(var(--border-strong))] text-[hsl(var(--fg))] hover:border-[hsl(var(--accent))]/60 hover:text-[hsl(var(--accent))]')
          }
        >
          {p.recommended && (
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
          )}
          {loadingTier === p.id ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <>
              <span className="relative">{en ? p.ctaEn ?? p.cta : p.cta}</span>
              <ArrowUpRight className="relative h-3.5 w-3.5" />
            </>
          )}
        </button>
      ) : (
        <Link
          href="/termin"
          data-event={`snapshot_card_${p.id}`}
          data-tier={p.id}
          className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-[hsl(var(--border-strong))] text-[0.875rem] font-medium text-[hsl(var(--fg))] transition-all hover:border-[hsl(var(--accent))]/60 hover:text-[hsl(var(--accent))]"
        >
          {en ? p.ctaEn ?? p.cta : p.cta}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </motion.div>
  );
}
