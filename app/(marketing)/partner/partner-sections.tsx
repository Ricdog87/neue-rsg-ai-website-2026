'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowRight, CheckCircle2 } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'Was bedeutet §84 HGB — bin ich wirklich selbstständig?',
    a: '§84 HGB definiert den Handelsvertreter als selbstständigen Gewerbetreibenden. Das bedeutet konkret: Du entscheidest selbst, wann, wo und wie du arbeitest. Du kannst mehrere Auftraggeber gleichzeitig haben (außer direkte KI-Wettbewerber) und bist nicht weisungsgebunden. Es gibt kein Über-Unterordnungsverhältnis — du bist Unternehmer:in, der für RSG AI Leistungen vermittelt.',
  },
  {
    q: 'Muss ich etwas investieren oder zahlen?',
    a: 'Nein. Es gibt keine Einstiegsgebühr, kein Investment und keine Vorauszahlung. Du startest kostenlos. Das Einzige, was du brauchst, ist ein eigenes Gewerbe oder Freiberufler-Status — damit du Provisionen legal empfangen kannst. Alle Tools, Materialien und das Onboarding sind in der Partnerschaft inklusive.',
  },
  {
    q: 'Kann ich von überall arbeiten?',
    a: 'Ja, 100 % remote und ortsunabhängig. Unsere KI-Lösungen betreuen wir vollständig digital. Discovery Calls, Demos und Onboarding finden online statt. Du brauchst lediglich eine stabile Internetverbindung und ein Telefon — du kannst aus dem Wohnzimmer, Co-Working Space oder dem Ausland heraus arbeiten.',
  },
  {
    q: 'Darf ich parallel für andere Unternehmen tätig sein?',
    a: 'Ja. Als Handelsvertreter:in nach §84 HGB darfst du grundsätzlich für mehrere Auftraggeber tätig sein. Die einzige Einschränkung: Du darfst während unserer Partnerschaft keine direkten KI-Automatisierungskonkurrenten vertreten. Alle anderen Branchen, Produkte oder Dienstleistungen sind vollständig erlaubt.',
  },
  {
    q: 'Wann erhalte ich meine erste Provision?',
    a: 'Sofort nach deiner ersten erfolgreichen Vermittlung. Die Einmalprovision auf das Setup wird nach Zahlungseingang des Kunden ausgezahlt (i.d.R. innerhalb von 14 Tagen). Die monatliche Bestandsprovision fließt ab dem Monat, in dem der Kunde seine erste Monatsrate zahlt. Es gibt keine Wartezeit und keine Mindestlaufzeit — was du vermittelst, bekommst du.',
  },
];

// ── FAQ Accordion ────────────────────────────────────────────────────────────

export function PartnerFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/82 backdrop-blur-[2px] px-6 py-20 md:py-28 lg:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 grid grid-cols-12 gap-x-6 gap-y-6">
          <div className="col-span-12 md:col-span-5">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-[hsl(var(--accent))]">
              Deine Fragen · beantwortet
            </span>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.025em] text-[hsl(var(--fg))]">
              FAQ zur Partnerschaft
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-2">
            <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
              Die wichtigsten Fragen zur selbstständigen Tätigkeit als Handelsvertreter:in nach §84 HGB.
              Weitere Fragen? Stell sie im persönlichen Gespräch.
            </p>
          </div>
        </div>

        <ul className="border-t border-[hsl(var(--border))]">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <li key={i} className="border-b border-[hsl(var(--border))]">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`partner-faq-${i}`}
                  className="group flex w-full items-start justify-between gap-6 py-7 text-left transition-colors md:py-8"
                >
                  <div className="flex items-start gap-6">
                    <span className="mt-1.5 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))] transition-colors group-hover:text-[hsl(var(--accent))]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-[clamp(1.05rem,2vw,1.35rem)] font-medium leading-[1.3] tracking-[-0.01em] text-[hsl(var(--fg))]">
                      {item.q}
                    </h3>
                  </div>
                  <span
                    aria-hidden
                    className={[
                      'mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300',
                      isOpen
                        ? 'border-[#a855f7] bg-[#a855f7]/10 text-[#a855f7]'
                        : 'border-[hsl(var(--border-strong))] text-[hsl(var(--fg))] group-hover:border-[#a855f7]',
                    ].join(' ')}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`partner-faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.3, delay: isOpen ? 0.1 : 0 },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-12 gap-x-6 pb-8">
                        <div className="col-span-12 md:col-start-2 md:col-span-9">
                          <p className="text-[1rem] leading-[1.7] text-[hsl(var(--muted))]">{item.a}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

// ── Application Form ─────────────────────────────────────────────────────────

export function PartnerForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null)?.value ?? '';
    const gewerbeEl = form.querySelector<HTMLInputElement>('input[name="gewerbe"]:checked');

    const payload = {
      fullName: `${get('firstName').trim()} ${get('lastName').trim()}`.trim(),
      email: get('email').trim(),
      phone: get('phone').trim(),
      region: get('region').trim(),
      gewerbe: gewerbeEl?.value ?? '',
      vertriebserfahrung: get('vertriebserfahrung').trim(),
      nachricht: get('nachricht').trim(),
    };

    try {
      const res = await fetch('/api/partner-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        const json = await res.json().catch(() => ({})) as { error?: string };
        setErrorMsg(json.error ?? 'Etwas ist schiefgelaufen — bitte versuche es erneut.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Netzwerkfehler — bitte prüfe deine Verbindung und versuche es erneut.');
      setStatus('error');
    }
  }

  const inputClass =
    'w-full rounded-xl border border-[hsl(var(--border-strong))] bg-[hsl(var(--surface))] px-4 py-3 text-[0.95rem] text-[hsl(var(--fg))] placeholder-[hsl(var(--subtle))] outline-none transition-colors focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]/30';

  return (
    <section
      id="bewerbung"
      className="relative border-t border-[hsl(var(--border))] px-6 py-20 md:py-28 lg:px-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 100%, hsl(270 80% 60% / 0.07), transparent)',
        }}
      />
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 grid grid-cols-12 gap-x-6 gap-y-6">
          <div className="col-span-12 md:col-span-5">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-[hsl(var(--accent))]">
              Dein nächster Schritt
            </span>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.025em] text-[hsl(var(--fg))]">
              Jetzt bewerben.{' '}
              <span className="text-[#a855f7]">In 60 Sekunden.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-2">
            <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
              Keine Spontanzusage. Kein automatisierter Funnel. Ricardo prüft jede Bewerbung
              persönlich und antwortet innerhalb von 48h.
            </p>
          </div>
        </div>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-xl rounded-2xl border border-[#a855f7]/30 bg-[#a855f7]/5 p-12 text-center"
          >
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full border border-[#a855f7]/30 bg-[#a855f7]/10 text-[#a855f7]">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="font-display text-2xl font-medium text-[hsl(var(--fg))]">
              Bewerbung erhalten!
            </h3>
            <p className="mt-3 text-[1rem] leading-relaxed text-[hsl(var(--muted))]">
              Ricardo meldet sich persönlich innerhalb von 48h bei dir. Schau auch kurz in deinen
              Spam-Ordner.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-2 block font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--muted))]"
                >
                  Vorname
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  autoComplete="given-name"
                  placeholder="Max"
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="mb-2 block font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--muted))]"
                >
                  Nachname
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  autoComplete="family-name"
                  placeholder="Mustermann"
                  className={inputClass}
                />
              </div>

              {/* Contact */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--muted))]"
                >
                  E-Mail *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="max@beispiel.de"
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--muted))]"
                >
                  Telefon
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+49 176 …"
                  className={inputClass}
                />
              </div>

              {/* Region */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="mb-2 block font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--muted))]"
                >
                  Region (Bundesland / Stadt)
                </label>
                <input
                  id="region"
                  name="region"
                  type="text"
                  autoComplete="address-level1"
                  placeholder="z.B. Hessen · Frankfurt"
                  className={inputClass}
                />
              </div>

              {/* Gewerbe */}
              <div className="sm:col-span-2">
                <fieldset>
                  <legend className="mb-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--muted))]">
                    Hast du ein eigenes Gewerbe oder Freiberufler-Status?
                  </legend>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { value: 'ja', label: 'Ja' },
                      { value: 'nein', label: 'Nein' },
                      { value: 'in-planung', label: 'In Planung' },
                    ].map(({ value, label }) => (
                      <label
                        key={value}
                        className="flex cursor-pointer items-center gap-3 rounded-xl border border-[hsl(var(--border-strong))] bg-[hsl(var(--surface))] px-5 py-3 text-[0.9rem] text-[hsl(var(--fg))] transition-all has-[:checked]:border-[#a855f7] has-[:checked]:bg-[#a855f7]/8"
                      >
                        <input
                          type="radio"
                          name="gewerbe"
                          value={value}
                          className="accent-[#a855f7]"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              {/* Vertriebserfahrung */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="vertriebserfahrung"
                  className="mb-2 block font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--muted))]"
                >
                  Deine B2B-Vertriebserfahrung *
                </label>
                <textarea
                  id="vertriebserfahrung"
                  name="vertriebserfahrung"
                  required
                  maxLength={500}
                  rows={4}
                  placeholder="Kurz beschreiben: Welche Branchen, welche Zielkunden, wie viele Jahre Erfahrung?"
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Nachricht */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="nachricht"
                  className="mb-2 block font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--muted))]"
                >
                  Kurze Nachricht (optional)
                </label>
                <textarea
                  id="nachricht"
                  name="nachricht"
                  rows={3}
                  placeholder="Was motiviert dich, KI-Automatisierung zu vertreiben?"
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

            {status === 'error' && (
              <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
                <p className="text-[0.875rem] text-red-400">{errorMsg}</p>
              </div>
            )}

            <div className="mt-8 flex flex-col items-start gap-4">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-[#a855f7] px-9 font-display text-[1rem] font-medium text-white transition-all hover:bg-[#9333ea] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2.5">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Wird gesendet…
                  </span>
                ) : (
                  <>
                    Bewerbung abschicken
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[hsl(var(--subtle))]">
                🔒 DSGVO-konform · Ricardo antwortet persönlich innerhalb von 48h
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
