'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Copy, Check, ShieldCheck, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEnglish } from '@/components/system/use-locale';

/**
 * Inbound Call-to-Action für die Hero-Sektion.
 * Der KI-Telefon-Agent wird vom Kunden ANGERUFEN (kein Outbound/Rückruf mehr).
 * Drop-in-Ersatz: gleicher Dateiname, gleicher named export, keine Props.
 */

// Anzeige- und Wähl-Format der Inbound-Demo-Nummer
const PHONE_DISPLAY = '+49 30 826 83906';
const PHONE_DIAL = '+493082683906';

export function HeroCallbackCard() {
  const en = useEnglish();
  const [copied, setCopied] = useState(false);

  async function copyNumber() {
    try {
      await navigator.clipboard.writeText(PHONE_DIAL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard nicht verfügbar – stille Degradierung */
    }
  }

  return (
    <div className="relative">
      {/* Glow */}
      <div className="pointer-events-none absolute -inset-6 rounded-[28px] bg-[radial-gradient(60%_60%_at_50%_0%,hsl(var(--accent)/0.28),transparent_70%)] opacity-70 blur-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
      >
        {/* Eyebrow */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--neon))] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon))]" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
              {en ? 'Live demo · call now' : 'Live-Demo · Jetzt anrufen'}
            </span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
            {en ? 'Replies < 0.4 s' : 'Antwort < 0,4 s'}
          </span>
        </div>

        {/* Headline */}
        <h3 className="font-display text-[clamp(1.5rem,2.4vw,1.875rem)] font-medium leading-[1.15] tracking-[-0.02em] text-white">
          {en
            ? 'Call our AI agent — it picks up on the first ring.'
            : 'Ruf unseren KI-Agenten an — er hebt beim ersten Klingeln ab.'}
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-white/65">
          {en
            ? 'Real voice, real answers in under 0.4 seconds. Hear what your future hotline agent sounds like — no form, no waiting.'
            : 'Echte Stimme, echte Antworten in unter 0,4 Sekunden. Hör selbst, wie sich dein zukünftiger Hotline-Agent anhört — kein Formular, kein Warten.'}
        </p>

        {/* Call-Action */}
        <div className="mt-5 space-y-3">
          <a
            href={`tel:${PHONE_DIAL}`}
            className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-[hsl(var(--accent))] px-5 py-4 text-[16px] font-semibold text-white shadow-[0_10px_40px_-8px_hsl(var(--accent)/0.7)] transition-all hover:brightness-110 active:scale-[0.99]"
          >
            <span className="pointer-events-none absolute inset-0 -z-10 animate-pulse bg-[hsl(var(--accent))] opacity-40 blur-md" />
            <Phone className="h-5 w-5 transition-transform group-hover:-rotate-12" />
            <span className="tabular-nums tracking-tight">{PHONE_DISPLAY}</span>
            <span className="text-white/75">{en ? '· Call now' : '· Jetzt anrufen'}</span>
          </a>

          <button
            type="button"
            onClick={copyNumber}
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-[13px] font-medium transition-colors hover:bg-white/[0.05]',
              copied ? 'text-[hsl(var(--neon))]' : 'text-white/70',
            )}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied
              ? en ? 'Number copied' : 'Nummer kopiert'
              : en ? 'Copy number' : 'Nummer kopieren'}
          </button>
        </div>

                {/* Social-Proof direkt an der Aktion */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-white/65">
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--neon))] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon))]" />
            </span>
            <strong className="font-semibold text-white">47</strong>&nbsp;{en ? 'answered live today' : 'heute live beantwortet'}
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-current text-[hsl(var(--accent))]" />
            <strong className="font-semibold text-white">{en ? 'GDPR' : 'DSGVO'}</strong>&nbsp;{en ? 'compliant' : 'konform'}
          </span>
          <span>
            <strong className="font-semibold text-white">Live</strong>&nbsp;{en ? 'in production' : 'im Wirkbetrieb'}
          </span>
        </div>

        {/* Trust-Badges */}
        <div className="mt-4 flex flex-wrap gap-2 border-t border-white/5 pt-4 text-[11px] text-white/55">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1">
            <ShieldCheck className="h-3.5 w-3.5 text-[hsl(var(--neon))]" /> {en ? 'GDPR · EU hosting' : 'DSGVO · EU-Hosting'}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1">
            <Check className="h-3.5 w-3.5 text-[hsl(var(--neon))]" /> {en ? 'Recording only with consent' : 'Aufzeichnung nur mit Einwilligung'}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1">
            {en ? 'Free · Mon–Fri 9am–6pm' : 'Kostenlos · Mo–Fr 9–18 Uhr'}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
