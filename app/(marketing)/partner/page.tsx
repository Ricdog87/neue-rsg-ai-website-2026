import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  X,
  Phone,
  BookOpen,
  BarChart3,
  Users,
  Headphones,
  FileText,
  Mic,
} from 'lucide-react';
import { PartnerFaq, PartnerForm } from './partner-sections';
import { site, voiceAgents } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Partner werden â KI-Automatisierung vertreiben | RSG AI',
  description:
    'Werde selbststÃ¤ndiger Partner von RSG AI. Verdiene Setup-Provision + monatliche Bestandsprovision auf KI-Automatisierungsprojekte. Â§84 HGB, 100 % erfolgsabhÃ¤ngig.',
  alternates: { canonical: '/partner' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Partner werden â KI-Automatisierung vertreiben | RSG AI',
    description:
      'Werde selbststÃ¤ndiger Partner von RSG AI. Â§84 HGB, Setup-Provision + monatliche Bestandsprovision. Kein Investment, sofort starten.',
    type: 'website',
    url: `${site.url}/partner`,
  },
};

// ââ Static data âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

const PROVISION_TABLE = [
  { stufe: 'RSG Partner',    setup: '20 %', bestand: '10 %',          top: false },
  { stufe: 'Senior Partner', setup: '23 %', bestand: '13 %',          top: false },
  { stufe: 'Director',       setup: '27 %', bestand: '17 %',          top: false },
  { stufe: 'Equity Circle',  setup: '30 %', bestand: '22 % + Equity', top: true  },
] as const;

const CAREER_STAGES = [
  {
    num: '01',
    title: 'RSG Partner',
    criteria: 'Einstieg nach Zertifizierung',
    provisions: '20 % Setup Â· 10 % Bestand',
    perks: [
      'Onboarding-Akademie (Produkt + Vertrieb)',
      'Demo-Assets & Pitch-Decks',
      'Partner-Cockpit & CRM-Zugang',
      'Technischer Sales-Support',
    ],
    highlight: false,
  },
  {
    num: '02',
    title: 'Senior Partner',
    criteria: 'Ab 6 aktiven Bestandskunden',
    provisions: '23 % Setup Â· 13 % Bestand',
    perks: [
      'Alles aus RSG Partner',
      'Leads nach Zertifizierung',
      'Monatliches Strategie-Briefing',
      'PrioritÃ¤ts-Support',
    ],
    highlight: false,
  },
  {
    num: '03',
    title: 'Director',
    criteria: 'Ab 15 aktiven Bestandskunden',
    provisions: '27 % Setup Â· 17 % Bestand',
    perks: [
      'Alles aus Senior Partner',
      'Co-Branding-Option',
      'Discovery-Call-Backing (wir kommen mit)',
      'Quartalsweise Roadmap-Runde',
    ],
    highlight: true,
  },
  {
    num: '04',
    title: 'Equity Circle',
    criteria: 'Ab 30 aktiven Bestandskunden Â· Einladung',
    provisions: '30 % Setup Â· 22 % Bestand + Equity',
    perks: [
      'Alle Director-Vorteile',
      'Beteiligung am Unternehmenswachstum',
      'PersÃ¶nliche Slack-Linie zu Ricardo',
      'Mitentscheidung bei Produkt-Roadmap',
    ],
    highlight: false,
  },
] as const;

const DELIVERABLES = [
  {
    Icon: Users,
    text: 'Leads nach Zertifizierung â nicht âunbegrenzt sofort", aber echte qualifizierte Anfragen',
  },
  {
    Icon: BarChart3,
    text: 'Partner-Cockpit & CRM-Zugang â deine gesamte Pipeline auf einen Blick',
  },
  {
    Icon: BookOpen,
    text: 'Onboarding-Akademie: Produkt-Wissen + Vertriebs-Playbook',
  },
  {
    Icon: FileText,
    text: 'Demo-Assets, Pitch-Decks & ROI-Rechner',
  },
  {
    Icon: Mic,
    text: 'Live-Demo-Telefonassistent â vorfÃ¼hrbar fÃ¼r jeden Interessenten (wichtiger USP!)',
  },
  {
    Icon: Headphones,
    text: 'Technischer Sales-Support â wir kommen mit auf deinen Discovery-Call',
  },
  {
    Icon: Phone,
    text: 'Monatliche Produkt-Updates & Release-Briefings',
  },
] as const;

const FIT_YES = [
  'Eigenes Gewerbe oder Freiberufler-Status (Pflicht â keine Ausnahme)',
  'B2B-Vertriebserfahrung â du weiÃt, wie EntscheidergesprÃ¤che laufen',
  'Netzwerk zu Entscheidern in KMU (50â500 Mitarbeitende)',
  'Eigenmotiviert, kein Mikromanagement nÃ¶tig',
  'Bereit, aktiv zu akquirieren und GesprÃ¤che selbst zu initiieren',
] as const;

const FIT_NO = [
  'âSchnell-Geld-Sucher" â wer in Woche 1 reich sein will, ist falsch hier',
  'Ohne jedes B2B-Netzwerk und ohne Bereitschaft, eines aufzubauen',
  'AusschlieÃlich suchend nach einem ruhigen Nebenjob ohne Eigeninitiative',
  'Ohne Gewerbe und ohne Bereitschaft, eines anzumelden',
] as const;

// ââ Page âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

export default function PartnerPage() {
  return (
    <>
      {/* ââ HERO âââââââââââââââââââââââââââââââââââââââââââââââââââââââ */}
      <section className="relative overflow-hidden px-6 pb-20 pt-[140px] md:pb-28 md:pt-[160px] lg:px-10">
        {/* Purple bloom */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[700px] w-[1000px] max-w-[120vw] -translate-x-1/2 -translate-y-[35%] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse, hsl(270 80% 55% / 0.13), transparent 68%)',
          }}
        />
        <div className="mx-auto max-w-[1280px]">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-[hsl(var(--accent))]">
            Handelsvertreter:in Â· Â§84 HGB Â· selbststÃ¤ndig
          </span>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,6.5vw,5.25rem)] font-medium leading-[1.02] tracking-[-0.03em] text-[hsl(var(--fg))]">
            Wachse mit dem KI-Markt.{' '}
            <span
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, #a855f7 0%, #c084fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Als freier Partner.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-[1.1rem] leading-[1.7] text-[hsl(var(--muted))]">
            Der KI-Automatisierungsmarkt wÃ¤chst 38&thinsp;% pro Jahr. Wer jetzt Vertrieb
            Ã¼bernimmt, baut ein wiederkehrendes Einkommen â Monat fÃ¼r Monat, ohne Deckel.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="#bewerbung"
              className="group inline-flex h-13 items-center gap-2.5 rounded-full bg-[#a855f7] px-7 py-3.5 font-display text-[0.95rem] font-medium text-white shadow-lg shadow-[#a855f7]/25 transition-all hover:bg-[#9333ea] hover:shadow-[#9333ea]/30"
            >
              Jetzt bewerben
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={voiceAgents.liveDemo.phoneHref}
              className="group inline-flex h-13 items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 font-display text-[0.95rem] font-medium text-white/80 backdrop-blur-sm transition-all hover:border-white/30 hover:text-white"
            >
              <Phone className="h-4 w-4" />
              Live-Demo anhÃ¶ren â
            </a>
          </div>

          {/* Trust chips */}
          <div className="mt-9 flex flex-wrap gap-2">
            {[
              'Bestandsprovision ohne Deckel',
              'Monatlich wiederkehrend',
              'Â§84 HGB Â· selbststÃ¤ndig',
              'Sofort-Onboarding',
            ].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-[hsl(var(--muted))]"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ââ DAS MODELL âââââââââââââââââââââââââââââââââââââââââââââââââ */}
      <section className="relative border-t border-[hsl(var(--border))] px-6 py-20 md:py-28 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-14 grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 md:col-span-5">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-[hsl(var(--accent))]">
                Das Modell
              </span>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.025em] text-[hsl(var(--fg))]">
                Nicht angestellt. Nicht Freelancer.{' '}
                <span className="text-[#a855f7]">Handelsvertreter:in.</span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-2">
              <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
                Â§84 HGB definiert die selbststÃ¤ndige Partnerschaft. Du entscheidest, wann und wo du
                arbeitest â keine Weisungsgebundenheit, keine festen Zeiten. Du kannst parallel fÃ¼r
                andere Auftraggeber tÃ¤tig sein. 100&thinsp;% erfolgsabhÃ¤ngige VergÃ¼tung. Du bist
                Unternehmer:in â und wir sind dein bestes Produkt.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                emoji: 'ð',
                title: 'Unternehmerische Freiheit',
                body: 'Du fÃ¼hrst dein eigenes Micro-Unternehmen. Keine Rechenschaftspflicht, kein festes Reporting, kein Mikromanagement. Was zÃ¤hlt, sind deine Ergebnisse.',
              },
              {
                emoji: 'ð',
                title: 'Freie Zeit- und Ortseinteilung',
                body: '100&nbsp;% remote. Kein BÃ¼ro, keine Kernzeiten. Ob morgens um 7 oder abends um 21&nbsp;Uhr â du entscheidest, wann du verkaufst.',
              },
              {
                emoji: 'ð',
                title: 'Provision ohne Deckel',
                body: 'Kein Provisionsdeckel, keine Einkommensgrenze. Je mehr Kunden du aufbaust, desto mehr verdienst du â dauerhaft und ohne Pause.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-white/8 bg-white/[0.025] p-7 backdrop-blur-sm transition-all hover:border-[#a855f7]/30 hover:bg-[#a855f7]/[0.03]"
              >
                <span className="text-3xl">{card.emoji}</span>
                <h3 className="mt-4 font-display text-[1.1rem] font-medium text-[hsl(var(--fg))]">
                  {card.title}
                </h3>
                <p
                  className="mt-2.5 text-[0.9rem] leading-[1.65] text-[hsl(var(--muted))]"
                  dangerouslySetInnerHTML={{ __html: card.body }}
                />
              </div>
            ))}
          </div>

          <p className="mt-7 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[hsl(var(--subtle))]">
            â &nbsp; Eigenes Gewerbe oder anerkannter Freiberufler-Status erforderlich.
          </p>
        </div>
      </section>

      {/* ââ WAS DU VERKAUFST âââââââââââââââââââââââââââââââââââââââââââ */}
      <section className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg-deep))] px-6 py-20 md:py-28 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-14">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-[hsl(var(--accent))]">
              Das Portfolio
            </span>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.025em] text-[hsl(var(--fg))]">
              KI-LÃ¶sungen aus einer Hand â drei Produktlinien
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                tag: 'n8n Â· LangChain Â· Zapier',
                title: 'Automatische Workflows',
                body: 'Regel-basierte Automatisierungen fÃ¼r Vertrieb, HR, Buchhaltung und Operations. Dein Kunde spart 15â30 Stunden pro Woche.',
                setup: 'ab 1.497 â¬ Setup',
                lizenz: 'ab 297 â¬/Monat Lizenz',
              },
              {
                tag: 'LangGraph Â· GPT-4o Â· EU-Cloud',
                title: 'Autonome KI-Agenten',
                body: 'SelbststÃ¤ndig entscheidende Agenten fÃ¼r Kundenservice, Lead-Qualifizierung und komplexe Workflows mit Multi-Step-Reasoning.',
                setup: 'ab 4.997 â¬ Setup',
                lizenz: 'ab 497 â¬/Monat Lizenz',
              },
              {
                tag: 'ElevenLabs Â· DSGVO Â· 6 Sprachen',
                title: 'Voice-Agenten (RSG Voice Suite)',
                body: 'KI-Telefonie, die GesprÃ¤che fÃ¼hrt, Termine bucht und qualifiziert. NatÃ¼rliche Sprache mit unter 0,4&nbsp;s Reaktion, DSGVO-konform.',
                setup: 'Custom Setup',
                lizenz: 'ab 797 â¬/Monat',
              },
            ].map((product) => (
              <div
                key={product.title}
                className="relative overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-7 transition-all hover:border-[hsl(var(--accent))]/35"
              >
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[hsl(var(--accent))]">
                  {product.tag}
                </span>
                <h3 className="mt-2 font-display text-[1.1rem] font-medium text-[hsl(var(--fg))]">
                  {product.title}
                </h3>
                <p
                  className="mt-2.5 text-[0.875rem] leading-[1.6] text-[hsl(var(--muted))]"
                  dangerouslySetInnerHTML={{ __html: product.body }}
                />

                <div className="mt-6 border-t border-[hsl(var(--border))] pt-5">
                  <div className="font-display text-[1.05rem] font-medium text-[hsl(var(--fg))]">
                    {product.setup}
                  </div>
                  <div className="mt-0.5 text-[0.875rem] text-[hsl(var(--muted))]">
                    {product.lizenz}
                  </div>
                  <div className="mt-4 flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-[#a855f7]">
                      <span className="h-1 w-1 rounded-full bg-[#a855f7]" />
                      20â30&nbsp;% Einmalprovision
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-[hsl(var(--accent))]">
                      <span className="h-1 w-1 rounded-full bg-[hsl(var(--accent))]" />
                      10â22&nbsp;% monatl. Bestandsprovision
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ââ WAS DU VERDIENST âââââââââââââââââââââââââââââââââââââââââââ */}
      <section className="relative border-t border-[hsl(var(--border))] px-6 py-20 md:py-28 lg:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 0%, hsl(270 80% 60% / 0.055), transparent)',
          }}
        />
        <div className="mx-auto max-w-[1280px]">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-[hsl(var(--accent))]">
            Das VergÃ¼tungsmodell
          </span>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.025em] text-[hsl(var(--fg))]">
            Du baust dir einen Bestand auf. Monat fÃ¼r Monat.
          </h2>
          <p className="mt-5 max-w-2xl text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
            Das Modell ist zweiteilig â und der zweite Teil macht den Unterschied:
          </p>

          {/* Two-part model */}
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-7">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-[#a855f7]/30 bg-[#a855f7]/10 font-mono text-[0.875rem] font-bold text-[#a855f7]">
                  A
                </span>
                <span className="font-display text-[1rem] font-medium text-[hsl(var(--fg))]">
                  Einmalprovision beim Setup
                </span>
              </div>
              <p className="text-[0.95rem] leading-[1.65] text-[hsl(var(--muted))]">
                Du vermittelst einen Neukunden â du erhÃ¤ltst sofort eine Einmalprovision auf das
                Setup. Substanziell â bis zu 30&thinsp;% des Einmal-Betrags.
              </p>
            </div>
            <div className="rounded-2xl border border-[hsl(var(--accent))]/25 bg-[hsl(var(--accent))]/5 p-7">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-[hsl(var(--accent))]/30 bg-[hsl(var(--accent))]/10 font-mono text-[0.875rem] font-bold text-[hsl(var(--accent))]">
                  B
                </span>
                <span className="font-display text-[1rem] font-medium text-[hsl(var(--fg))]">
                  Monatliche Bestandsprovision
                </span>
              </div>
              <p className="text-[0.95rem] leading-[1.65] text-[hsl(var(--muted))]">
                Solange der Kunde zahlt, flieÃt deine Provision weiter. Ohne Deckel. Ohne
                Auslaufdatum. Du bringst den Kunden einmal â du verdienst jahrelang.
              </p>
            </div>
          </div>

          {/* Annuity metaphor */}
          <div className="mt-6 rounded-2xl border border-[#a855f7]/20 bg-[#a855f7]/5 p-7">
            <p className="font-accent text-[1.1rem] italic leading-[1.65] text-[hsl(var(--fg))]">
              âWie ein Bausparvertrag, nur ohne Bausparvertrag. Jeder Neukunde ist ein neuer,
              dauerhafter Einkommensstrom."
            </p>
          </div>

          {/* Provisions table */}
          <div className="mt-14">
            <h3 className="mb-5 font-display text-[1.2rem] font-medium text-[hsl(var(--fg))]">
              Provisions-Tabelle
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-[hsl(var(--border))]">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--surface))]">
                    {['Karrierestufe', 'Setup-Provision', 'Bestandsprovision / Monat'].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-4 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--muted))]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PROVISION_TABLE.map((row) => (
                    <tr
                      key={row.stufe}
                      className={[
                        'border-b border-[hsl(var(--border))] last:border-0 transition-colors hover:bg-white/[0.02]',
                        row.top ? 'bg-[#a855f7]/[0.04]' : '',
                      ].join(' ')}
                    >
                      <td className="px-6 py-4 font-display text-[0.95rem] font-medium text-[hsl(var(--fg))]">
                        {row.top ? (
                          <span className="flex items-center gap-2">
                            {row.stufe}
                            <span className="inline-flex items-center rounded-full bg-[#a855f7]/15 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-[#a855f7]">
                              Top
                            </span>
                          </span>
                        ) : (
                          row.stufe
                        )}
                      </td>
                      <td className="px-6 py-4 font-mono text-[0.9rem] font-medium text-[#a855f7]">
                        {row.setup}
                      </td>
                      <td className="px-6 py-4 font-mono text-[0.9rem] font-medium text-[hsl(var(--accent))]">
                        {row.bestand}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Beispielrechnung */}
          <div className="mt-14">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <h3 className="font-display text-[1.2rem] font-medium text-[hsl(var(--fg))]">
                Beispielaufbau
              </h3>
              <span className="inline-flex items-center rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-amber-400">
                Beispielrechnung Â· keine Verdienstgarantie
              </span>
            </div>
            <p className="mb-6 text-[0.875rem] leading-[1.6] text-[hsl(var(--muted))]">
              Annahme: 8 neue Kunden pro Quartal Â· Ã Vertragswert 497&thinsp;â¬/Monat Â· RSG Partner
              (10&thinsp;% Bestandsprovision)
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { monat: 'Monat 3',  kunden: 8,  betrag: 398  },
                { monat: 'Monat 6',  kunden: 16, betrag: 795  },
                { monat: 'Monat 9',  kunden: 24, betrag: 1193 },
                { monat: 'Monat 12', kunden: 32, betrag: 1591 },
              ].map((row) => (
                <div
                  key={row.monat}
                  className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-5"
                >
                  <div className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--muted))]">
                    {row.monat}
                  </div>
                  <div className="mt-2 font-display text-[1.75rem] font-medium leading-none text-[hsl(var(--fg))]">
                    ~{row.betrag.toLocaleString('de-DE')}&thinsp;â¬
                  </div>
                  <div className="mt-1 text-[0.8rem] text-[hsl(var(--subtle))]">
                    / Monat wiederkehrend
                  </div>
                  <div className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[hsl(var(--subtle))]">
                    {row.kunden} Bestandskunden
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-5">
              <p className="text-[0.9rem] leading-[1.65] text-[hsl(var(--muted))]">
                Als{' '}
                <strong className="text-[hsl(var(--fg))]">Director</strong> mit Voice-Kunden-Mix:
                12 Kunden Ã 797&thinsp;â¬ Ã 17&thinsp;% ={' '}
                <strong className="text-[hsl(var(--accent))]">~1.625&thinsp;â¬/Monat</strong> â plus
                weitere Bestandskunden â gesamt{' '}
                <strong className="text-[hsl(var(--fg))]">bis ~5.000â8.400&thinsp;â¬/Monat</strong>{' '}
                mÃ¶glich.
              </p>
            </div>
            <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[hsl(var(--subtle))]">
              Beispielrechnung auf Basis angenommener VermittlungsaktivitÃ¤t. Keine
              Verdienstgarantie.
            </p>
          </div>
        </div>
      </section>

      {/* ââ KARRIERESTUFEN âââââââââââââââââââââââââââââââââââââââââââââ */}
      <section className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg-deep))] px-6 py-20 md:py-28 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-[hsl(var(--accent))]">
            Karriereweg
          </span>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.025em] text-[hsl(var(--fg))]">
            Vier Stufen. Keine Deckelung.
          </h2>
          <p className="mt-4 max-w-2xl text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
            Jede Stufe bringt hÃ¶here Provisionen und mehr UnterstÃ¼tzung. Du steigst auf, wenn du die
            Kriterien erfÃ¼llst â automatisch, ohne GesprÃ¤ch, ohne Antrag.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {CAREER_STAGES.map((stage) => (
              <div
                key={stage.title}
                className={[
                  'relative overflow-hidden rounded-2xl border p-7 transition-all',
                  stage.highlight
                    ? 'border-[#a855f7]/40 bg-[#a855f7]/[0.05]'
                    : 'border-[hsl(var(--border))] bg-[hsl(var(--surface))] hover:border-[hsl(var(--border-strong))]',
                ].join(' ')}
              >
                {stage.highlight && (
                  <span className="absolute right-4 top-4 inline-flex items-center rounded-full bg-[#a855f7]/20 px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-[#a855f7]">
                    Beliebt
                  </span>
                )}
                <div className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-[hsl(var(--subtle))]">
                  {stage.num}
                </div>
                <h3 className="mt-2 font-display text-[1.15rem] font-medium text-[hsl(var(--fg))]">
                  {stage.title}
                </h3>
                <div className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[hsl(var(--accent))]">
                  {stage.provisions}
                </div>
                <div className="mt-1 text-[0.8rem] leading-snug text-[hsl(var(--subtle))]">
                  {stage.criteria}
                </div>
                <ul className="mt-5 space-y-2.5">
                  {stage.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-[0.825rem] text-[hsl(var(--muted))]">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--success))]" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ââ WAS WIR LIEFERN ââââââââââââââââââââââââââââââââââââââââââââ */}
      <section className="relative border-t border-[hsl(var(--border))] px-6 py-20 md:py-28 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 md:col-span-4">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-[hsl(var(--accent))]">
                Dein Support
              </span>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.025em] text-[hsl(var(--fg))]">
                Was wir liefern
              </h2>
              <p className="mt-4 text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
                Du verkaufst â wir liefern. Technisch, didaktisch, operativ.
              </p>
            </div>
            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <ul className="space-y-3">
                {DELIVERABLES.map(({ Icon, text }) => (
                  <li
                    key={text}
                    className="flex items-start gap-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-5"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[hsl(var(--border-strong))] text-[hsl(var(--accent))]">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <p className="text-[0.9rem] leading-[1.6] text-[hsl(var(--muted))]">{text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ââ WER PASST / WER NICHT ââââââââââââââââââââââââââââââââââââââ */}
      <section className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg-deep))] px-6 py-20 md:py-28 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-[hsl(var(--accent))]">
            Ehrlicher Filter
          </span>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.025em] text-[hsl(var(--fg))]">
            Passt du zu uns? Wir sagen es dir direkt.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[hsl(var(--success))]/20 bg-[hsl(var(--success))]/[0.04] p-7">
              <h3 className="mb-5 font-display text-[1.1rem] font-medium text-[hsl(var(--fg))]">
                â Das bringst du mit
              </h3>
              <ul className="space-y-3">
                {FIT_YES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--success))]" />
                    <span className="text-[0.9rem] leading-[1.55] text-[hsl(var(--muted))]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-7">
              <h3 className="mb-5 font-display text-[1.1rem] font-medium text-[hsl(var(--fg))]">
                â Das passt nicht
              </h3>
              <ul className="space-y-3">
                {FIT_NO.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                    <span className="text-[0.9rem] leading-[1.55] text-[hsl(var(--muted))]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ââ FAQ + FORM (client components) âââââââââââââââââââââââââââââ */}
      <PartnerFaq />
      <PartnerForm />

      {/* ââ LEGAL DISCLAIMER âââââââââââââââââââââââââââââââââââââââââââ */}
      <div className="border-t border-[hsl(var(--border))] px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <p className="max-w-4xl text-[0.75rem] leading-[1.7] text-[hsl(var(--subtle))]">
            Diese Partnerschaft ist eine selbststÃ¤ndige TÃ¤tigkeit als Handelsvertreter:in gemÃ¤Ã
            Â§84 HGB. Es besteht kein ArbeitsverhÃ¤ltnis. FÃ¼r die TÃ¤tigkeit ist ein eigenes Gewerbe
            oder anerkannter Freiberufler-Status erforderlich. Alle Provisions- und
            Verdienstangaben sind Beispielrechnungen und keine Verdienstgarantien.
          </p>
        </div>
      </div>
    </>
  );
}
