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
            Kostenlos &amp; unverbindlich · keine Aufzeichnung · DSGVO · EU-Hosting.
            <br />
            <span className="text-white/45">Mo–Fr 9–18 Uhr beste Hörqualität.</span>
          </span>
        </div>
      </motion.div>
    </div>
  );
}
'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PhoneCall, Sparkles, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Hero-Callback-Karte — die Hauptkonversion im Hero.
 *
 * Visuell:
 * - Glas-Card mit Accent-Border + sanftem Glow
 * - „Live-Demo"-Badge oben rechts
 * - 2 prominente Inputs (Vorname klein, Telefon groß)
 * - Volle-Breite-CTA-Button
 * - Compact Consent-Checkbox + Trust-Mikrocopy
 * - Loading-, Success- und Error-States austauschen den Inhalt
 *
 * Daten gehen an /api/callback → Server ruft Fonio Outbound API.
 * Kein API-Key im Client.
 */
export function HeroCallbackCard() {
  const reduced = useReducedMotion();
  const [firstName, setFirstName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [consent, setConsent] = React.useState(false);
  const [website, setWebsite] = React.useState(''); // honeypot
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const phoneRef = React.useRef<HTMLInputElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError(null);

    if (!firstName.trim()) {
      setError('Vorname fehlt.');
      return;
    }
    if (!phone.trim()) {
      setError('Telefonnummer fehlt.');
      phoneRef.current?.focus();
      return;
    }
    if (!consent) {
      setError('Bitte stimm der Datenverarbeitung kurz zu.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          phone: phone.trim(),
          consent,
          website,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? 'Da ist etwas schiefgelaufen.');
        return;
      }
      setSuccess(true);
    } catch {
      setError(
        'Verbindung abgebrochen. Probier es bitte gleich nochmal.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 3.0, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Ambient glow behind the card */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[28px] opacity-60 blur-2xl"
        style={{
          background:
            'radial-gradient(ellipse at 70% 30%, hsl(var(--accent) / 0.45), transparent 70%)',
        }}
      />

      <div
        className={cn(
          'relative overflow-hidden rounded-3xl',
          'border border-[hsl(var(--accent))]/40',
          'bg-[hsl(var(--ink))]/85 backdrop-blur-xl',
          'shadow-[0_30px_80px_-20px_hsl(var(--accent)/0.55)]',
          'p-5 sm:p-7',
        )}
      >
        {/* Top row: badge + status pulse */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full',
              'border border-[hsl(var(--neon))]/40 bg-[hsl(var(--neon))]/10 px-2.5 py-1',
              'font-mono text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--neon-soft))]',
            )}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--neon))] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon))]" />
            </span>
            <Sparkles className="h-3 w-3" />
            Live-Demo
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
            Rückruf in Sekunden
          </span>
        </div>

        {success ? (
          <SuccessState firstName={firstName} />
        ) : (
          <>
            <h2 className="font-display text-[clamp(1.5rem,2.4vw,1.875rem)] font-medium leading-[1.15] tracking-[-0.02em] text-white">
              Lass dich in Sekunden vom KI-Agenten zurückrufen.
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-white/65">
              Nummer eintragen, absenden — du hörst sofort, wie sich unser Telefon-Agent
              für deine Hotline anhört.
            </p>

            <form onSubmit={onSubmit} className="mt-5 space-y-3" noValidate>
              {/* Honeypot — visually hidden, screen-reader hidden, but in DOM */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  top: 'auto',
                  width: 1,
                  height: 1,
                  overflow: 'hidden',
                }}
              >
                <label htmlFor="website">Website (nicht ausfüllen)</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-[110px_1fr]">
                <Field
                  id="firstName"
                  label="Vorname"
                  value={firstName}
                  onChange={setFirstName}
                  type="text"
                  autoComplete="given-name"
                  placeholder="Max"
                  disabled={submitting}
                  required
                />
                <Field
                  id="phone"
                  label="Telefonnummer"
                  value={phone}
                  onChange={setPhone}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+49 151 23456789"
                  disabled={submitting}
                  emphasized
                  ref={phoneRef}
                  required
                />
              </div>

              {/* Format-Hinweis für die Telefonnummer */}
              <p className="-mt-1 text-[11px] leading-relaxed text-white/45">
                Bitte mit Ländervorwahl eingeben — z.&nbsp;B.{' '}
                <span className="font-medium text-white/70">+49&nbsp;151&nbsp;23456789</span>{' '}
                (Mobil) oder{' '}
                <span className="font-medium text-white/70">+49&nbsp;30&nbsp;12345678</span>{' '}
                (Festnetz). Keine Leerzeichen nötig.
              </p>

              <button
                type="submit"
                disabled={submitting}
                data-event="hero-callback-submit"
                className={cn(
                  'group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full',
                  'bg-gradient-to-br from-[hsl(var(--accent))] to-[hsl(var(--accent-deep))]',
                  'font-display text-[15px] font-medium text-white',
                  'transition-all hover:shadow-[0_0_44px_hsl(var(--accent)/0.7)]',
                  'disabled:opacity-70',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--bg))]',
                )}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Anruf wird eingeleitet…
                  </>
                ) : (
                  <>
                    <PhoneCall className="h-4 w-4" />
                    Jetzt Rückruf starten
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

              <label className="flex items-start gap-2.5 pt-1 text-[12px] leading-relaxed text-white/65">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  disabled={submitting}
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-white/30 bg-transparent accent-[hsl(var(--accent))]"
                />
                <span>
                  Ich willige ein, dass meine Daten für den Rückruf verarbeitet werden.{' '}
                  <a
                    href="/datenschutz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-[hsl(var(--accent-soft))]"
                  >
                    Datenschutz
                  </a>
                  .
                </span>
              </label>

              {error && (
                <p
                  role="alert"
                  className="rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-[13px] text-red-200"
                >
                  {error}
                </p>
              )}

              <p className="pt-1 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                Kostenlos · unverbindlich · DSGVO · EU-Hosting
              </p>
            </form>
          </>
        )}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Sub-components
   ───────────────────────────────────────────────────────── */

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: 'text' | 'tel';
  inputMode?: 'tel' | 'text';
  autoComplete?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  emphasized?: boolean;
};

const Field = React.forwardRef<HTMLInputElement, FieldProps>(function Field(
  {
    id,
    label,
    value,
    onChange,
    type,
    inputMode,
    autoComplete,
    placeholder,
    disabled,
    required,
    emphasized,
  },
  ref,
) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55"
      >
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        name={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        className={cn(
          'w-full rounded-xl border bg-white/[0.04] px-3.5 transition-all',
          'placeholder:text-white/30 focus:outline-none',
          emphasized
            ? 'h-12 border-white/15 text-[16px] font-medium tracking-tight text-white focus:border-[hsl(var(--accent))] focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_hsl(var(--accent)/0.18)]'
            : 'h-12 border-white/10 text-[15px] text-white focus:border-white/40 focus:bg-white/[0.06]',
          disabled && 'opacity-60',
        )}
      />
    </div>
  );
});

function SuccessState({ firstName }: { firstName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-4 py-2 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(var(--neon))] to-[hsl(var(--accent))]">
        <CheckCircle2 className="h-8 w-8 text-[hsl(var(--bg))]" />
        <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(var(--neon))] opacity-40" />
      </div>
      <h3 className="font-display text-[clamp(1.35rem,2.4vw,1.75rem)] font-medium leading-tight text-white">
        Perfekt{firstName ? `, ${firstName}` : ''} — unser KI-Agent ruft dich jetzt an.
      </h3>
      <p className="max-w-md text-[14px] leading-relaxed text-white/65">
        Du solltest in wenigen Sekunden klingeln hören. Falls nicht: dein Provider
        hält die Nummer ggf. zurück — schreib uns dann kurz an{' '}
        <a
          href="mailto:hello@rsg-ai.de"
          className="underline underline-offset-2 hover:text-[hsl(var(--accent-soft))]"
        >
          hello@rsg-ai.de
        </a>
        .
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
        Tipp: nimm den Anruf mit „Hallo?" entgegen — der Agent reagiert sofort.
      </p>
    </motion.div>
  );
}
