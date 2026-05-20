import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { site } from '@/lib/content';
import { PrintButton } from './print-button';

export const metadata: Metadata = {
  title: 'ROI-Checkliste für KI-Agenten — 12 harte Fragen',
  description:
    'Bist du bereit für einen KI-Agenten? 12 harte Fragen aus echten Discovery-Calls. Druck sie aus, geh sie mit deinem Team durch.',
  robots: { index: true, follow: true },
};

type Block = {
  num: string;
  q: string;
  hint: string;
  red: string;
  green: string;
};

const BLOCKS: { section: string; items: Block[] }[] = [
  {
    section: 'Volumen & Wiederholung',
    items: [
      {
        num: '01',
        q: 'Welcher Prozess frisst mehr als 20 Stunden Mitarbeiterzeit pro Woche — und sieht jedes Mal gleich aus?',
        hint: 'Ein KI-Agent rechnet sich erst ab Repetition. Einmal-Fälle ≠ Pipeline.',
        red: 'Unter 10 h/Woche · jedes Mal anders',
        green: '> 20 h/Woche · 80 % Wiederholungslogik',
      },
      {
        num: '02',
        q: 'Wie oft pro Tag taucht dieser Prozess auf — und steigt das Volumen?',
        hint: 'Wenn Volumen stagniert oder sinkt, fix das Problem manuell.',
        red: '< 10x/Tag · rückläufig',
        green: '> 50x/Tag · wächst quartalsweise',
      },
      {
        num: '03',
        q: 'Würden 2 zusätzliche Mitarbeiter:innen das Problem lösen — oder skaliert es selbst dann nicht?',
        hint: 'KI ist nicht „bessere Mitarbeiter:innen". KI ist Skalierung jenseits von Hiring.',
        red: '2 FTE reichen aus',
        green: 'Auch 5 FTE wären in 6 Monaten überlastet',
      },
    ],
  },
  {
    section: 'Daten & Regeln',
    items: [
      {
        num: '04',
        q: 'Sind die Daten, die der Agent braucht, irgendwo digital verfügbar — oder leben sie in Köpfen?',
        hint: 'Tribal Knowledge → erst dokumentieren, dann automatisieren.',
        red: 'Wissen sitzt in 1–2 Köpfen',
        green: 'Datenbank · Wiki · API · CRM',
      },
      {
        num: '05',
        q: 'Kannst du in 3 Sätzen erklären, wann der Prozess korrekt abgeschlossen ist?',
        hint: 'Wenn du es nicht erklären kannst, kann der Agent es nicht lernen.',
        red: '„Das spürt man halt"',
        green: 'Klare Kriterien · prüfbar · in einem Satz',
      },
      {
        num: '06',
        q: 'Wo darf der Agent autonom entscheiden — und wo MUSS ein Mensch drauf schauen?',
        hint: 'Confidence-Schwellen entscheiden über Vertrauen + Haftung.',
        red: 'Unklar · „lass uns mal sehen"',
        green: '> 85 % autonom · < 85 % Mensch · dokumentiert',
      },
    ],
  },
  {
    section: 'Business-Impact',
    items: [
      {
        num: '07',
        q: 'Was kostet dich eine Woche Stillstand bei diesem Prozess konkret in Euro?',
        hint: 'Wenn die Zahl nicht klar ist, ist auch der ROI nicht klar.',
        red: '„Schwer zu sagen"',
        green: 'Verlorener Umsatz × Wahrscheinlichkeit · in Euro',
      },
      {
        num: '08',
        q: 'Welche KPI zeigt sofort, ob der Agent funktioniert — und wer schaut täglich drauf?',
        hint: 'Ohne Owner und KPI: Agent läuft, niemand merkt es.',
        red: 'Kein Owner · kein Dashboard',
        green: 'Owner benannt · KPI im Live-Dashboard',
      },
      {
        num: '09',
        q: 'Was passiert, wenn der Agent 4 Wochen ausfällt — Notfallplan vorhanden?',
        hint: 'Mission-critical ohne Fallback ist fahrlässig. Wir bauen Übergaben mit.',
        red: 'Kein Plan B',
        green: 'Manuelle Fallback-Variante dokumentiert',
      },
    ],
  },
  {
    section: 'Organisation & Tempo',
    items: [
      {
        num: '10',
        q: 'Wer im Unternehmen entscheidet final — und ist diese Person Teil des Projekts ab Tag 1?',
        hint: 'Ohne Entscheider im Raum: Projekt zieht sich um Monate.',
        red: 'Entscheider hat keine Zeit',
        green: 'CEO/COO ist 1 h/Woche im Sprint',
      },
      {
        num: '11',
        q: 'Habt ihr 4 Wochen Zeit + 1 Person mit 20 % Kapazität für die Übergabe?',
        hint: 'Wir liefern in 4 Wochen — aber nur, wenn ein Mensch bei euch verfügbar ist.',
        red: 'Niemand hat Zeit',
        green: '1 Mensch · 1 Tag/Woche · 4 Wochen',
      },
      {
        num: '12',
        q: 'Was passiert, wenn der Agent das versprochene Ergebnis nach 4 Monaten nicht bringt?',
        hint: 'Wir geben Erfolgs-Garantie. Aber: Klare Ausstiegskriterien sparen Streit.',
        red: 'Unklar',
        green: 'Erfolgskriterien + Exit dokumentiert',
      },
    ],
  },
];

export default function RoiChecklistePage({
  searchParams,
}: {
  searchParams?: Promise<{ status?: string }>;
}) {
  return (
    <article className="relative min-h-screen bg-[hsl(var(--bg))] px-6 py-24 print:bg-white print:py-12 lg:px-10">
      <div className="mx-auto max-w-[820px]">
        {/* Top bar — hidden in print */}
        <div className="flex items-center justify-between print:hidden">
          <Link
            href="/"
            data-cursor-label="Home"
            className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--muted))] transition-colors hover:text-[hsl(var(--fg))]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Zurück zur Werkstatt
          </Link>

          <PrintButton />
        </div>

        <StatusBanner searchParams={searchParams} />

        {/* Header */}
        <header className="mt-12 print:mt-0">
          <div className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))] print:text-[#a855f7]">
            RSG AI · Lead-Magnet · v1.0
          </div>
          <h1 className="mt-6 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.025em] text-[hsl(var(--fg))] print:text-black">
            ROI-Checkliste für KI-Agenten.
          </h1>
          <p className="mt-6 max-w-prose text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))] print:text-neutral-700">
            12 harte Fragen aus echten Discovery-Calls. Geh sie mit deinem Team durch. Wenn du
            bei mehr als 4 Fragen auf der roten Seite landest — pausier das KI-Projekt und fix
            zuerst die Basics. Wenn du grün durchkommst, sind wir 4 Wochen von Go-Live entfernt.
          </p>
        </header>

        {/* Sections */}
        <div className="mt-16 space-y-16 print:mt-12 print:space-y-12">
          {BLOCKS.map((block) => (
            <section key={block.section} className="print:break-inside-avoid">
              <h2 className="font-mono text-[0.75rem] uppercase tracking-[0.24em] text-[hsl(var(--subtle))] print:text-neutral-500">
                § {block.section}
              </h2>
              <div className="mt-8 space-y-10 print:mt-6 print:space-y-6">
                {block.items.map((it) => (
                  <div key={it.num} className="print:break-inside-avoid">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-[0.8rem] tracking-[0.18em] text-[hsl(var(--accent))] print:text-[#a855f7]">
                        {it.num}
                      </span>
                      <h3 className="font-display text-[1.15rem] font-medium leading-[1.35] tracking-tight text-[hsl(var(--fg))] print:text-black">
                        {it.q}
                      </h3>
                    </div>
                    <p className="ml-12 mt-2 text-[0.9rem] italic text-[hsl(var(--muted))] print:text-neutral-600">
                      {it.hint}
                    </p>
                    <div className="ml-12 mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border border-[hsl(0_72%_58%/0.4)] bg-[hsl(0_72%_58%/0.05)] p-4 print:border-red-300 print:bg-red-50">
                        <div className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(0_72%_70%)] print:text-red-700">
                          Pausieren wenn
                        </div>
                        <div className="mt-1.5 text-[0.9rem] text-[hsl(var(--fg))] print:text-black">
                          {it.red}
                        </div>
                      </div>
                      <div className="rounded-lg border border-[hsl(174_100%_50%/0.4)] bg-[hsl(174_100%_50%/0.05)] p-4 print:border-emerald-300 print:bg-emerald-50">
                        <div className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(174_100%_70%)] print:text-emerald-700">
                          Go wenn
                        </div>
                        <div className="mt-1.5 text-[0.9rem] text-[hsl(var(--fg))] print:text-black">
                          {it.green}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer / CTA */}
        <footer className="mt-20 border-t border-[hsl(var(--border))] pt-10 print:mt-12 print:border-neutral-300">
          <div className="grid gap-6 print:gap-3 md:grid-cols-2">
            <div>
              <h3 className="font-display text-[1.25rem] font-medium tracking-tight text-[hsl(var(--fg))] print:text-black">
                Mehr als 4 Fragen auf der grünen Seite?
              </h3>
              <p className="mt-2 text-[0.95rem] leading-[1.55] text-[hsl(var(--muted))] print:text-neutral-700">
                Buch dir 20 Minuten. Wir prüfen den Case ehrlich — und sagen ab, wenn KI nicht
                der richtige Hebel ist.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end print:hidden">
              <Link
                href={site.cta.meetingUrl}
                data-event="checklist-cta-meeting"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-7 font-display text-[0.95rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))]"
              >
                Erstgespräch buchen
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
                {site.contact.email} · {site.contact.phone}
              </span>
            </div>
          </div>

          <p className="mt-10 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))] print:mt-8 print:text-neutral-500">
            © {new Date().getFullYear()} {site.legal.company} · {site.contact.city} · rsg-ai.de
          </p>
        </footer>
      </div>
    </article>
  );
}

async function StatusBanner({
  searchParams,
}: {
  searchParams?: Promise<{ status?: string }>;
}) {
  const sp = searchParams ? await searchParams : undefined;
  if (!sp?.status) return null;

  const variants: Record<string, { hsl: string; text: string }> = {
    confirmed: {
      hsl: '174 100% 50%',
      text: 'Bestätigt ✓ — Checkliste ist außerdem in deinem Postfach.',
    },
    invalid: {
      hsl: '0 72% 58%',
      text: 'Bestätigungslink ungültig oder abgelaufen. Trag dich gern noch einmal ein.',
    },
    unavailable: {
      hsl: '0 72% 58%',
      text: 'Newsletter-Service gerade nicht erreichbar. Probier’s gleich noch einmal.',
    },
  };
  const v = variants[sp.status];
  if (!v) return null;

  return (
    <div
      className="mt-8 rounded-lg border px-5 py-4 print:hidden"
      style={{
        borderColor: `hsl(${v.hsl} / 0.4)`,
        background: `hsl(${v.hsl} / 0.05)`,
      }}
    >
      <p
        className="font-mono text-[0.75rem] uppercase tracking-[0.18em]"
        style={{ color: `hsl(${v.hsl})` }}
      >
        {v.text}
      </p>
    </div>
  );
}

