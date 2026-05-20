'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Linkedin, Check, AlertCircle } from 'lucide-react';
import { MaskWipe, SplitLines } from '@/components/effects/reveal';
import { site } from '@/lib/content';

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<SubmitState>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    setMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Etwas ist schiefgelaufen.');
      setState('success');
      setMessage(data.message || 'Check dein Postfach — bestätige den Link.');
      setEmail('');
    } catch (err) {
      setState('error');
      setMessage(err instanceof Error ? err.message : 'Unerwarteter Fehler.');
    }
  }

  return (
    <section
      id="newsletter"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/82 backdrop-blur-[2px] px-6 py-20 md:py-28 lg:px-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 30% 40%, hsl(var(--accent) / 0.10), transparent 65%)',
        }}
      />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 md:col-span-5">
            <MaskWipe>
              <span className="eyebrow">§ 08 · Lead-Magnet</span>
            </MaskWipe>
            <SplitLines
              lines={['Die ROI-Checkliste,', 'die wir Kunden geben.']}
              className="mt-6"
              lineClassName="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.025em] text-[hsl(var(--fg))]"
            />
            <MaskWipe delay={0.25}>
              <p className="mt-8 max-w-md text-[1rem] leading-[1.65] text-[hsl(var(--muted))]">
                12 harte Fragen aus echten Discovery-Calls. Am Ende weißt du
                konkret, ob ein KI-Agent dein Geschäft beschleunigt — oder ob
                wir dir absagen sollten.
              </p>
            </MaskWipe>
          </div>

          <div className="col-span-12 md:col-span-6 md:col-start-7">
            {/* LinkedIn primary CTA */}
            <motion.a
              href={site.newsletter.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="Abonnieren"
              data-event="newsletter-linkedin-click"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-start justify-between gap-6 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-7 transition-colors hover:border-[hsl(var(--accent))/50] hover:bg-[hsl(var(--surface))]/80"
            >
              <div className="flex flex-col gap-3">
                <span className="inline-flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
                  <Linkedin className="h-3.5 w-3.5" />
                  LinkedIn · Empfohlen
                </span>
                <h3 className="font-display text-[1.25rem] font-medium leading-tight text-[hsl(var(--fg))]">
                  „Mittelstand automatisiert" — Newsletter auf LinkedIn
                </h3>
                <p className="text-[0.9rem] leading-[1.55] text-[hsl(var(--muted))]">
                  Wöchentlich · Pipeline-Teardowns, KPI-Reverse-Engineering,
                  Pricing-Calls. Kein Marketing-Filler.
                </p>
              </div>
              <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[hsl(var(--subtle))] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[hsl(var(--accent))]" />
            </motion.a>

            {/* Email fallback */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6"
            >
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-px flex-1 bg-[hsl(var(--border))]" />
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
                  Oder direkt per E-Mail
                </span>
                <span aria-hidden className="h-px flex-1 bg-[hsl(var(--border))]" />
              </div>

              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3" noValidate>
                <label htmlFor="newsletter-email" className="sr-only">
                  E-Mail-Adresse
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Mail
                      aria-hidden
                      className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--subtle))]"
                    />
                    <input
                      id="newsletter-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="ceo@dein-unternehmen.de"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={state === 'loading' || state === 'success'}
                      className="h-12 w-full rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--bg))] pl-11 pr-4 font-display text-[0.95rem] text-[hsl(var(--fg))] placeholder:text-[hsl(var(--subtle))] focus:border-[hsl(var(--accent))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))/30] disabled:opacity-50"
                    />
                  </div>
                  {/* Honeypot — bots fill this, humans don't see it */}
                  <input
                    type="text"
                    name="company-name"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="absolute -left-[9999px] h-0 w-0"
                    onChange={() => {}}
                  />
                  <button
                    type="submit"
                    disabled={state === 'loading' || state === 'success'}
                    data-event="newsletter-email-submit"
                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[hsl(var(--accent))] px-7 font-display text-[0.9rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {state === 'loading'
                      ? 'Senden…'
                      : state === 'success'
                        ? 'Gesendet ✓'
                        : 'Checkliste holen'}
                    {state === 'idle' && (
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    )}
                  </button>
                </div>

                {state === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2 font-mono text-[0.75rem] text-[hsl(174_100%_70%)]"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    {message}
                  </motion.p>
                )}
                {state === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2 font-mono text-[0.75rem] text-[hsl(0_72%_70%)]"
                  >
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    {message}
                  </motion.p>
                )}

                <p className="mt-1 font-mono text-[0.6875rem] leading-[1.5] text-[hsl(var(--subtle))]">
                  Double-Opt-In · Abmeldung jederzeit · Keine Drittweitergabe ·{' '}
                  <a href={site.legal.privacyUrl} className="underline underline-offset-2 hover:text-[hsl(var(--muted))]">
                    Datenschutz
                  </a>
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
