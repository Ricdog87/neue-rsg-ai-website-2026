'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Inbound Call-to-Action für die Hero-Sektion.
 * Der KI-Telefon-Agent wird vom Kunden ANGERUFEN (kein Outbound/Rückruf mehr).
 * Drop-in-Ersatz: gleicher Dateiname, gleicher named export, keine Props.
 */

// Anzeige- und Wähl-Format der Inbound-Demo-Nummer
const PHONE_DISPLAY = '+49 30 826 83906';
const PHONE_DIAL = '+493082683906';

export function HeroCallbackCard() {
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
      <div className="pointer-events-none absolute -inset-6 rounded-[28px] bg-[radial-gradient(60%_60%_at_50%_0%,hsl(var(--accent)/0.25),transparent_70%)] opacity-60 blur-2xl" />

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
              Live-Demo · Jetzt anrufen
            </span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
            Antwort &lt; 0,4 s
          </span>
        </div>

        {/* Headline */}
        <h3 className="font-display text-[clamp(1.5rem,2.4vw,1.875rem)] font-medium leading-[1.15] tracking-[-0.02em] text-white">
          Ruf unseren KI-Agenten an — er hebt beim ersten Klingeln ab.
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-white/65">
          Echte Stimme, echte Antworten in unter 0,4 Sekunden. Hör selbst, wie sich dein
          zukünftiger Hotline-Agent anhört — kein Formular, kein Warten.
        </p>

        {/* Call-Action */}
        <div className="mt-5 space-y-3">
          <a
            href={`tel:${PHONE_DIAL}`}
            className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-[hsl(var(--accent))] px-5 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_30px_-8px_hsl(var(--accent)/0.6)] transition-all hover:brightness-110 active:scale-[0.99]"
          >
            <Phone className="h-4 w-4 transition-transform group-hover:-rotate-12" />
            {PHONE_DISPLAY}
            <span className="text-white/70">· Jetzt anrufen</span>
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
            {copied ? 'Nummer kopiert' : 'Nummer kopieren'}
          </button>
        </div>

        {/* Trust-Row */}
        <div className="mt-4 flex items-start gap-2.5 pt-1 text-[12px] leading-relaxed text-white/65">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--neon))]" />
          <span>
            Kostenlos &amp; unverbindlich2· keine Aufzeichnung · DSGVO · EU-Hosting.
            <br />
            <span className="text-white/45">Mo–Fr 9–18 Uhr beste Hörqualität.</span>
          </span>
        </div>
      </motion.div>
    </div>
  );
}
