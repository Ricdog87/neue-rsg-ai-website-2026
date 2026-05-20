'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { MaskWipe, SplitLines } from '@/components/effects/reveal';

/**
 * FAQ section — premium B2B standard.
 *
 * Editorial accordion: each question is a row, opening reveals the
 * answer with a y-slide. Only ONE answer open at a time (radio-style)
 * to keep the section compact.
 *
 * Selected from real buyer concerns we hear in calls — DSGVO, costs,
 * timeline, integration, vendor lock-in, ownership.
 */

const FAQ: Array<{ q: string; a: string }> = [
  {
    q: 'Wie schnell ist der erste Agent produktiv?',
    a: 'Audit am Montag → erster Agent in der zweiten Woche produktiv → voll integriert nach 4 Wochen. Wir liefern Sprint-basiert, mit wöchentlichen Demos statt Mega-Release am Ende.',
  },
  {
    q: 'Was passiert mit unseren Daten?',
    a: 'Alle Daten bleiben in deutschen Rechenzentren (Frankfurt + Berlin). Kein US-Cloud-Anbieter, keine Drittland-Übertragung. Auftragsverarbeitungsvertrag inklusive, Daten-Lokation transparent — dein Datenschutzbeauftragter atmet durch.',
  },
  {
    q: 'Sind wir am Ende von eurer Infrastruktur abhängig?',
    a: 'Nein. Du bekommst Quellcode, Konfiguration, Daten und Dokumentation. Falls du irgendwann ohne uns weitermachen willst, kannst du das. Vendor-Lock-in ist ein Anti-Pattern, kein Geschäftsmodell.',
  },
  {
    q: 'Was kostet der Betrieb monatlich?',
    a: 'Hosting + Token-Kosten sind nutzungsabhängig und werden transparent durchgereicht — in der Regel < 5 % deiner Personalkostenersparnis. Du siehst pro Tag was der Agent gekostet und gespart hat.',
  },
  {
    q: 'Was wenn der Agent doch nicht das tut, was wir uns vorgestellt haben?',
    a: 'Wir liefern auf Festpreis-Basis mit klar definierten Akzeptanzkriterien aus dem Audit. Optimierungs-SLA in den ersten 14 Tagen nach Go-Live. Wenn der Agent die definierten KPIs nach 30 Tagen nicht erfüllt: Anpassung auf unsere Kosten.',
  },
  {
    q: 'Welche Systeme könnt ihr anbinden?',
    a: 'HubSpot · Salesforce · Pipedrive · Personio · DATEV · Slack · Microsoft Teams · Outlook · Calendly · Google Workspace · Stripe · REST-APIs · Webhooks. Wenn dein System dokumentiert ist, bauen wir die Integration.',
  },
  {
    q: 'Wir haben schon ChatGPT-Pro-Accounts — warum reicht das nicht?',
    a: 'Browser-ChatGPT ist ein Werkzeug. Ein KI-Agent ist ein System: er hat Zugriff auf dein CRM, kann Multi-Step-Logik ausführen, behält Kontext über Tage, eskaliert wenn er unsicher ist, läuft ohne dass jemand davor sitzt. Das sind Klassen-Unterschiede, keine Ausstattungs-Unterschiede.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/82 backdrop-blur-[2px] px-6 py-24 md:py-32 lg:px-10"
    >
      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-5">
            <MaskWipe>
              <span className="eyebrow">№ 07 · Vor dem Termin</span>
            </MaskWipe>
            <SplitLines
              lines={['Sieben Fragen,', 'die du sonst', 'erst im Call stellen würdest.']}
              className="mt-6"
              lineClassName="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.025em] text-[hsl(var(--fg))]"
            />
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-2">
            <MaskWipe delay={0.2}>
              <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
                Antworten auf das, was die meisten Buyer in Minute 17 fragen.
                Spar dir den Smalltalk — komm direkt mit den konkreten Fragen
                ins Erstgespräch.
              </p>
            </MaskWipe>
          </div>
        </div>

        <ul className="mt-20 border-t border-[hsl(var(--border))]">
          {FAQ.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <li
                key={item.q}
                className="border-b border-[hsl(var(--border))]"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  data-cursor="hover"
                  data-sound="tick"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  className="group flex w-full items-start justify-between gap-6 py-7 text-left transition-colors hover:bg-[hsl(var(--accent))/[0.03]] md:py-8"
                >
                  <div className="flex items-start gap-6">
                    <span className="mt-1.5 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))] transition-colors group-hover:text-[hsl(var(--accent))]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-[clamp(1.125rem,2vw,1.5rem)] font-medium leading-[1.3] tracking-[-0.01em] text-[hsl(var(--fg))]">
                      {item.q}
                    </h3>
                  </div>
                  <span
                    aria-hidden
                    className={
                      'mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ' +
                      (isOpen
                        ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]'
                        : 'border-[hsl(var(--border-strong))] text-[hsl(var(--fg))] group-hover:border-[hsl(var(--accent))]')
                    }
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
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
                          <p className="text-[1rem] leading-[1.7] text-[hsl(var(--muted))]">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex items-center justify-between gap-6 text-[0.875rem]"
        >
          <p className="font-accent text-[1.05rem] font-light italic leading-[1.5] text-[hsl(var(--muted))] md:text-[1.25rem]">
            „Frage nicht beantwortet?
            <span className="text-[hsl(var(--fg))]"> Stell sie im Erstgespräch.</span>"
          </p>
        </motion.div>
      </div>
    </section>
  );
}
