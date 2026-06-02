'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Phone,
  PhoneIncoming,
  CalendarCheck,
  Sparkles,
  Headphones,
  ArrowRight,
  AudioLines,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { voiceAgents } from '@/lib/content';
import { cn } from '@/lib/utils';

const OFFER_ICONS: Record<string, LucideIcon> = {
  'inbound-termin': CalendarCheck,
  inbound: PhoneIncoming,
  custom: Headphones,
};

/**
 * VoiceAgentsSection — „JETZT NEU" Highlight für RSG AI Telefon-Agenten.
 *
 * Visual treatment:
 * - Fly-in from right with spring physics on the central phone visual
 * - Continuous sound-wave animation around the phone icon
 * - Pulsing accent glow + neon ring
 * - „Jetzt neu" ribbon-badge with sparkle
 * - Three offer cards lift on hover, accent border-glow trail
 *
 * Place EARLY on the homepage (between Hero and Usp) — it's the new
 * highlight. Sticks out, but stays in the brand palette.
 */
export function VoiceAgentsSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="voice"
      aria-labelledby="voice-headline"
      className="relative isolate overflow-hidden px-4 py-24 sm:py-32 lg:py-40"
    >
      {/* Ambient backdrop — accent glow + neon scan line */}
      <BackgroundGlow />

      <div className="relative mx-auto max-w-7xl">
        {/* ── Top: badge + headline ─────────────────────────── */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <NewBadge label={voiceAgents.badge} />

            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[hsl(var(--accent-soft))]">
              {voiceAgents.eyebrow}
            </p>

            <h2
              id="voice-headline"
              className="font-display text-[clamp(2.25rem,5.2vw,4.25rem)] font-medium leading-[1.04] tracking-[-0.025em] text-[hsl(var(--fg))]"
            >
              {voiceAgents.headline}
            </h2>

            <p className="text-balance text-lg leading-relaxed text-[hsl(var(--muted))] sm:text-xl">
              {voiceAgents.subheadline}
            </p>

            <p className="max-w-xl text-[15px] leading-relaxed text-[hsl(var(--muted))]">
              {voiceAgents.subline}
            </p>

            <TrustChipRow chips={voiceAgents.trustChips} />

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <Link
                href={voiceAgents.cta.primaryHref}
                className={cn(
                  'group inline-flex items-center justify-center gap-2 rounded-full',
                  'bg-[hsl(var(--accent))] px-6 py-3 text-sm font-medium text-white',
                  'transition-all hover:bg-[hsl(var(--accent-deep))]',
                  'hover:shadow-[0_0_40px_hsl(var(--accent)/0.6)]',
                )}
              >
                <AudioLines className="h-4 w-4" />
                {voiceAgents.cta.primary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={voiceAgents.cta.secondaryHref}
                className={cn(
                  'inline-flex items-center justify-center gap-2 rounded-full',
                  'border border-[hsl(var(--border-strong))] bg-transparent px-6 py-3 text-sm text-[hsl(var(--fg))]',
                  'transition-all hover:border-[hsl(var(--neon))] hover:text-[hsl(var(--neon))]',
                )}
              >
                {voiceAgents.cta.secondary}
              </Link>
            </div>
            <p className="max-w-md text-sm italic leading-relaxed text-[hsl(var(--muted))]">
              {voiceAgents.cta.note}
            </p>
          </motion.div>

          {/* Phone visual — fly-in from right with spring */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 80, scale: 0.85 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 1.1,
              delay: 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative flex items-center justify-center"
          >
            <PhoneVisual reduced={reduced ?? false} />
          </motion.div>
        </div>

        {/* ── Proof row ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={cn(
            'mt-16 grid gap-px overflow-hidden rounded-2xl border border-[hsl(var(--border-strong))]',
            'bg-[hsl(var(--border))]',
            'sm:grid-cols-2 lg:grid-cols-4',
          )}
        >
          {voiceAgents.proofPoints.map((p) => (
            <div
              key={p.label}
              className="bg-[hsl(var(--surface))]/80 px-6 py-5 backdrop-blur-sm"
            >
              <div className="font-display text-2xl font-medium leading-tight text-[hsl(var(--fg))]">
                {p.value}
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--fg))]/75">
                {p.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Three offer cards ─────────────────────────────── */}
        <div className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-3">
          {voiceAgents.offers.map((offer, i) => (
            <OfferCard key={offer.id} offer={offer} index={i} />
          ))}
        </div>

        {/* ── Industries marquee ────────────────────────────── */}
        <div className="mt-16 sm:mt-20">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-[hsl(var(--muted))]">
            Bewährt in
          </p>
          <IndustriesMarquee items={voiceAgents.industries} />
        </div>
      </div>
    </section>
  );
}

function IndustriesMarquee({ items }: { items: readonly string[] }) {
  // Duplicate the list so the marquee can loop seamlessly.
  const doubled = [...items, ...items];
  return (
    <div
      className="relative mt-6 flex overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
      }}
    >
      <motion.div
        className="flex shrink-0 items-center gap-3 py-2 pr-3"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className={cn(
              'whitespace-nowrap rounded-full',
              'border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/60 px-4 py-1.5',
              'text-sm text-[hsl(var(--muted))]',
            )}
          >
            {label}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Sub-components
   ───────────────────────────────────────────────────────── */

function NewBadge({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: -8 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.3 }}
      className={cn(
        'group relative inline-flex items-center gap-2 rounded-full',
        'border border-[hsl(var(--neon))]/40 bg-[hsl(var(--neon))]/10 px-3.5 py-1.5',
        'font-mono text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--neon-soft))]',
        'backdrop-blur-sm',
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--neon))] opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--neon))]" />
      </span>
      <Sparkles className="h-3 w-3" />
      <span>{label}</span>
    </motion.div>
  );
}

function TrustChipRow({ chips }: { chips: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {chips.map((chip, i) => (
        <motion.span
          key={chip}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.07, duration: 0.4 }}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full',
            'border border-[hsl(var(--border-strong))] bg-[hsl(var(--surface))]/80 px-3 py-1.5',
            'font-mono text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--fg))]/85',
          )}
        >
          <span className="h-1 w-1 rounded-full bg-[hsl(var(--accent))]" />
          {chip}
        </motion.span>
      ))}
    </div>
  );
}

function PhoneVisual({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative aspect-square w-full max-w-[440px]">
      {/* Outer pulse rings */}
      {!reduced &&
        [0, 1, 2].map((i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute inset-0 rounded-full border border-[hsl(var(--accent))]/30"
            animate={{
              scale: [0.6, 1.15],
              opacity: [0.55, 0],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              delay: i * 1.05,
              ease: 'easeOut',
            }}
          />
        ))}

      {/* Mid neon ring */}
      <div className="absolute inset-[14%] rounded-full border border-[hsl(var(--neon))]/30" />

      {/* Inner glow disc */}
      <div
        className="absolute inset-[22%] rounded-full"
        style={{
          background:
            'radial-gradient(circle at center, hsl(var(--accent) / 0.45), hsl(var(--accent) / 0.15) 55%, transparent 75%)',
        }}
      />

      {/* Phone icon center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className={cn(
            'relative flex h-32 w-32 items-center justify-center rounded-full',
            'border border-[hsl(var(--accent))]/40 bg-[hsl(var(--ink))]/80 backdrop-blur-xl',
            'shadow-[0_30px_80px_-20px_hsl(var(--accent)/0.6)]',
          )}
          animate={
            reduced
              ? undefined
              : {
                  rotate: [-3, 3, -3],
                }
          }
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Phone className="h-14 w-14 text-[hsl(var(--accent-soft))]" />
          {/* Speaking indicator dot */}
          {!reduced && (
            <motion.span
              className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(var(--neon))] ring-4 ring-[hsl(var(--bg))]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--bg))]" />
            </motion.span>
          )}
        </motion.div>
      </div>

      {/* Sound wave bars — left + right */}
      <SoundWaveColumn side="left" reduced={reduced} />
      <SoundWaveColumn side="right" reduced={reduced} />

      {/* Floating mini-stats orbiting */}
      <OrbitChip
        position="top"
        label="0,4s Ø"
        sub="Reaktion"
        delay={0.5}
        reduced={reduced}
      />
      <OrbitChip
        position="bottom"
        label="24/7"
        sub="online"
        delay={0.8}
        reduced={reduced}
      />
    </div>
  );
}

function SoundWaveColumn({
  side,
  reduced,
}: {
  side: 'left' | 'right';
  reduced: boolean;
}) {
  const bars = [0, 1, 2, 3, 4];
  return (
    <div
      aria-hidden
      className={cn(
        'absolute top-1/2 flex h-20 -translate-y-1/2 items-center gap-1.5',
        side === 'left' ? 'left-2 sm:left-4' : 'right-2 sm:right-4',
      )}
    >
      {bars.map((i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full bg-gradient-to-t from-[hsl(var(--accent))] to-[hsl(var(--neon))]"
          initial={{ height: '20%' }}
          animate={
            reduced
              ? { height: '40%' }
              : { height: ['20%', '90%', '40%', '70%', '25%'] }
          }
          transition={{
            duration: 1.6,
            repeat: Infinity,
            delay: i * 0.12 + (side === 'right' ? 0.08 : 0),
            ease: 'easeInOut',
          }}
          style={{ minHeight: 4 }}
        />
      ))}
    </div>
  );
}

function OrbitChip({
  position,
  label,
  sub,
  delay,
  reduced,
}: {
  position: 'top' | 'bottom';
  label: string;
  sub: string;
  delay: number;
  reduced: boolean;
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: position === 'top' ? -12 : 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease: 'easeOut' }}
      className={cn(
        'absolute left-1/2 -translate-x-1/2 rounded-2xl border border-[hsl(var(--border-strong))]',
        'bg-[hsl(var(--surface))]/90 px-3.5 py-2 backdrop-blur-md',
        'shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]',
        position === 'top' ? '-top-2' : '-bottom-2',
      )}
    >
      <div className="text-base font-medium leading-none text-[hsl(var(--fg))]">
        {label}
      </div>
      <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[hsl(var(--muted))]">
        {sub}
      </div>
    </motion.div>
  );
}

function OfferCard({
  offer,
  index,
}: {
  offer: (typeof voiceAgents.offers)[number];
  index: number;
}) {
  const Icon = OFFER_ICONS[offer.id] ?? Phone;
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: 0.15 + index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={cn(
        'group relative flex flex-col gap-4 overflow-hidden rounded-2xl',
        'border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/70 p-6 backdrop-blur-sm',
        'transition-all duration-300',
        'hover:border-[hsl(var(--accent))]/50',
        'hover:shadow-[0_20px_60px_-20px_hsl(var(--accent)/0.4)]',
      )}
    >
      {/* Accent corner glow on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[hsl(var(--accent))]/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="flex items-center justify-between">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full',
            'border border-[hsl(var(--accent))]/30 bg-[hsl(var(--accent))]/10 px-2.5 py-0.5',
            'font-mono text-[9px] uppercase tracking-[0.18em] text-[hsl(var(--accent-soft))]',
          )}
        >
          {offer.tag}
        </span>
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full',
            'border border-[hsl(var(--border-strong))] bg-[hsl(var(--bg-deep))]',
            'transition-colors group-hover:border-[hsl(var(--accent))]/50',
          )}
        >
          <Icon className="h-5 w-5 text-[hsl(var(--accent-soft))]" />
        </div>
      </div>

      <div>
        <h3 className="font-display text-2xl font-medium leading-tight tracking-tight text-[hsl(var(--fg))]">
          {offer.title}
        </h3>
        <p className="mt-1 font-accent text-base italic text-[hsl(var(--accent-soft))]">
          {offer.tagline}
        </p>
      </div>

      <p className="text-sm leading-relaxed text-[hsl(var(--muted))]">
        {offer.body}
      </p>

      <ul className="space-y-2 text-sm text-[hsl(var(--fg))]/85">
        {offer.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[hsl(var(--neon))]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between border-t border-[hsl(var(--border))] pt-4">
        <div>
          <div className="text-xl font-medium leading-none text-[hsl(var(--fg))]">
            {offer.kpi.value}
          </div>
          <div className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--fg))]/70">
            {offer.kpi.label}
          </div>
        </div>
        <Link
          href="#contact"
          aria-label={`Mehr zu ${offer.title} erfahren`}
          className={cn(
            'inline-flex h-9 w-9 items-center justify-center rounded-full',
            'border border-[hsl(var(--border-strong))] text-[hsl(var(--fg))]',
            'transition-all hover:border-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/10 hover:text-[hsl(var(--accent-soft))]',
          )}
        >
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}

function BackgroundGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="absolute -top-40 left-1/2 h-[520px] w-[840px] -translate-x-1/2 rounded-full opacity-50 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle at center, hsl(var(--accent) / 0.55) 0%, hsl(var(--accent) / 0.15) 40%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full opacity-25 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle at center, hsl(var(--neon) / 0.5) 0%, transparent 70%)',
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 70%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        }}
      />
    </div>
  );
}
