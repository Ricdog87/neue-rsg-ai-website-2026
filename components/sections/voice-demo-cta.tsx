'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  PhoneCall,
  Copy,
  Check,
  Zap,
  Server,
  Shield,
  Languages,
  Infinity as InfinityIcon,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { voiceAgents } from '@/lib/content';
import { cn } from '@/lib/utils';

const ICONS: Record<string, LucideIcon> = {
  zap: Zap,
  server: Server,
  shield: Shield,
  languages: Languages,
  infinity: InfinityIcon,
};

/**
 * VoiceDemoCta — „Hör live, was wir bauen."
 *
 * Placed inside VoiceAgentsSection, between the offer cards and the
 * industries marquee. Lets prospects call the live RSG KI receptionist
 * (Christian, ElevenLabs DE voice) and decide for themselves whether
 * they hear the difference to a human.
 *
 * Behavior:
 * - Touch devices  → tel: link triggers the dialer directly
 * - Pointer devices → copies the number to clipboard with toast,
 *                     plus the tel: link still fires for handlers
 *                     (Skype, FaceTime, etc.) that may be registered
 *
 * Tracking: data-track="demo-call-click" on the primary CTA so the
 * analytics layer can correlate calls → /termin bookings.
 */
export function VoiceDemoCta() {
  const reduced = useReducedMotion();
  const demo = voiceAgents.liveDemo;

  const [copied, setCopied] = React.useState(false);
  const [isTouch, setIsTouch] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)');
    setIsTouch(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const handleClick = React.useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isTouch) return; // let the tel: link fire on touch devices
      // On desktop the tel: link is mostly noise — copy instead.
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(demo.phoneDisplay);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2400);
      } catch {
        // clipboard may be blocked — fall back to letting tel: fire
        window.location.href = demo.phoneHref;
      }
    },
    [isTouch, demo.phoneDisplay, demo.phoneHref],
  );

  const ctaLabel = isTouch
    ? demo.callCta
    : copied
      ? demo.copyConfirm
      : demo.copyCta;

  const [counter, setCounter] = React.useState(0);
  React.useEffect(() => {
    // Reveal the counter with a quick count-up — feels alive.
    const target = Number.parseInt(demo.counterValue, 10);
    if (!Number.isFinite(target) || reduced) {
      setCounter(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 900;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCounter(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [demo.counterValue, reduced]);

  return (
    <motion.section
      aria-labelledby="voice-demo-headline"
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'relative isolate overflow-hidden rounded-3xl border border-[hsl(var(--accent))]/30',
        'bg-gradient-to-br from-[hsl(var(--surface))]/95 via-[hsl(var(--surface-2))]/95 to-[hsl(var(--ink))]/95',
        'p-6 backdrop-blur-xl sm:p-10 lg:p-14',
        'shadow-[0_30px_80px_-30px_hsl(var(--accent)/0.45)]',
      )}
    >
      {/* Ambient glow behind the phone column */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at center, hsl(var(--accent) / 0.6), hsl(var(--accent) / 0.15) 50%, transparent 75%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-[260px] w-[260px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at center, hsl(var(--neon) / 0.55), transparent 70%)',
        }}
      />

      <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        {/* ─── Copy column ─── */}
        <div className="space-y-5">
          <div
            className={cn(
              'inline-flex items-center gap-2 rounded-full',
              'border border-[hsl(var(--neon))]/40 bg-[hsl(var(--neon))]/10 px-3 py-1',
              'font-mono text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--neon-soft))]',
            )}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--neon))] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--neon))]" />
            </span>
            <Sparkles className="h-3 w-3" />
            {demo.eyebrow}
          </div>

          <p className="font-accent text-xl italic text-[hsl(var(--accent-soft))]">
            {demo.claim}
          </p>

          <h3
            id="voice-demo-headline"
            className="font-display text-[clamp(2rem,4.6vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[hsl(var(--fg))]"
          >
            {demo.headline}
          </h3>

          <p className="max-w-xl text-[15px] leading-relaxed text-[hsl(var(--muted))]">
            {demo.subline}
          </p>

          <p className="max-w-xl text-sm italic leading-relaxed text-[hsl(var(--fg))]/65">
            {demo.callerHint}
          </p>

          <TrustStrip items={demo.trustStrip} />
        </div>

        {/* ─── Phone column ─── */}
        <div className="flex flex-col items-center gap-5">
          <PhoneNumberButton
            display={demo.phoneDisplay}
            href={demo.phoneHref}
            ariaLabel={`${demo.phoneLabel}: ${demo.phoneDisplay}`}
            onClick={handleClick}
            isTouch={isTouch}
            copied={copied}
            ctaLabel={ctaLabel}
            reduced={reduced ?? false}
          />

          <LiveCounter
            value={counter}
            template={demo.counterTemplate}
          />

          <p className="text-center font-mono text-[11px] uppercase tracking-[0.16em] text-[hsl(var(--muted))]">
            {demo.disclaimer}
          </p>
        </div>
      </div>

      {/* ─── Footer signature ─── */}
      <div className="relative mt-10 border-t border-[hsl(var(--border))] pt-6 sm:mt-12">
        <p className="mx-auto max-w-3xl text-center text-[15px] leading-relaxed text-[hsl(var(--fg))]/85">
          {demo.footer}
        </p>
      </div>
    </motion.section>
  );
}

/* ─────────────────────────────────────────────────────────
   Sub-components
   ───────────────────────────────────────────────────────── */

function PhoneNumberButton({
  display,
  href,
  ariaLabel,
  onClick,
  isTouch,
  copied,
  ctaLabel,
  reduced,
}: {
  display: string;
  href: string;
  ariaLabel: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  isTouch: boolean;
  copied: boolean;
  ctaLabel: string;
  reduced: boolean;
}) {
  return (
    <div className="relative flex w-full max-w-md flex-col items-center">
      {/* Outer pulse rings — only when not reduced */}
      {!reduced && (
        <>
          {[0, 1].map((i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute inset-x-0 top-0 mx-auto h-[120%] w-[120%] -translate-y-[10%] rounded-full border border-[hsl(var(--accent))]/30"
              animate={{ scale: [0.9, 1.15], opacity: [0.5, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: i * 1.2,
                ease: 'easeOut',
              }}
            />
          ))}
        </>
      )}

      <motion.a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        data-track="demo-call-click"
        whileHover={reduced ? undefined : { y: -3, scale: 1.015 }}
        whileTap={reduced ? undefined : { scale: 0.985 }}
        transition={{ type: 'spring', stiffness: 380, damping: 24 }}
        className={cn(
          'relative flex w-full flex-col items-center gap-3 rounded-3xl',
          'border-2 border-[hsl(var(--accent))]/40 bg-[hsl(var(--ink))]/80 backdrop-blur-xl',
          'px-6 py-7 text-center transition-colors',
          'hover:border-[hsl(var(--accent))]/70 hover:bg-[hsl(var(--ink))]/90',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--bg))]',
          'shadow-[0_20px_60px_-20px_hsl(var(--accent)/0.7)]',
          'sm:px-8 sm:py-8',
        )}
      >
        {/* Pulsing call icon */}
        <motion.span
          aria-hidden
          className={cn(
            'flex h-14 w-14 items-center justify-center rounded-full',
            'bg-gradient-to-br from-[hsl(var(--accent))] to-[hsl(var(--accent-deep))]',
            'shadow-[0_0_36px_hsl(var(--accent)/0.7)]',
          )}
          animate={reduced ? undefined : { scale: [1, 1.06, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <PhoneCall className="h-7 w-7 text-white" />
        </motion.span>

        {/* The number — huge, mono, tabular */}
        <span
          className={cn(
            'font-mono text-[clamp(1.6rem,4.2vw,2.4rem)] font-medium tracking-tight text-[hsl(var(--fg))]',
            'tabular-nums leading-none',
          )}
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {display}
        </span>

        {/* Animated CTA chip */}
        <motion.span
          key={ctaLabel}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5',
            'font-mono text-[11px] uppercase tracking-[0.18em]',
            copied
              ? 'bg-[hsl(var(--neon))]/15 text-[hsl(var(--neon-soft))]'
              : 'bg-[hsl(var(--accent))]/15 text-[hsl(var(--accent-soft))]',
          )}
        >
          {copied ? (
            <Check className="h-3 w-3" />
          ) : isTouch ? (
            <PhoneCall className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
          {ctaLabel}
        </motion.span>
      </motion.a>
    </div>
  );
}

function LiveCounter({ value, template }: { value: number; template: string }) {
  const [pre, post] = template.split('CALLS');
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full',
        'border border-[hsl(var(--border-strong))] bg-[hsl(var(--surface))]/80 px-3.5 py-1.5',
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--neon))] opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon))]" />
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[hsl(var(--muted))]">
        {pre}
      </span>
      <span className="font-mono text-sm font-medium tabular-nums text-[hsl(var(--fg))]">
        {value}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[hsl(var(--muted))]">
        {post}
      </span>
    </div>
  );
}

function TrustStrip({
  items,
}: {
  items: readonly { icon: string; label: string }[];
}) {
  return (
    <ul className="flex flex-wrap gap-2 pt-2">
      {items.map((item) => {
        const Icon = ICONS[item.icon] ?? Zap;
        return (
          <li
            key={item.label}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full',
              'border border-[hsl(var(--border-strong))] bg-[hsl(var(--surface))]/80 px-3 py-1.5',
              'text-[12px] text-[hsl(var(--fg))]/85',
            )}
          >
            <Icon className="h-3.5 w-3.5 text-[hsl(var(--accent-soft))]" />
            {item.label}
          </li>
        );
      })}
    </ul>
  );
}
