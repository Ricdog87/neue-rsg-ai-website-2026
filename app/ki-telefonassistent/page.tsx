import type { Metadata } from 'next';
import Link from 'next/link';
import {
  PhoneIncoming,
  PhoneOutgoing,
  Settings2,
  Stethoscope,
  Wrench,
  Scale,
  Home,
  Hotel,
  Car,
  Check,
  ArrowRight,
  Headphones,
  ShieldCheck,
} from 'lucide-react';
import { site } from '@/lib/content';
import { VoiceConsole } from '@/components/sections/voice-console';
import { CitiesSection } from '@/components/sections/cities-section';
import { ScrollZoom } from '@/components/ui/scroll-zoom';
import { ScrollSlide } from '@/components/ui/scroll-slide';
import { ComparisonSection } from '@/components/sections/comparison-section';
import { GuaranteeStrip } from '@/components/sections/guarantee-strip';
import { GoogleReviews } from '@/components/sections/google-reviews';

export const metadata: Metadata = {
  title: 'KI-Telefonassistent — Inbound · Outbound · Termine in unter 0,4 s',
  description:
    'Deine KI-Telefonassistentin nimmt jeden Anruf in unter 0,4 s an. Inbound, Outbound, Termine — 24/7, natürliches Deutsch, DSGVO-konform, Hosting in Deutschland.',
  alternates: { canonical: '/ki-telefonassistent' },
  openGraph: {
    title: 'KI-Telefonassistent für den Mittelstand · RSG AI',
    description:
      'Inbound annehmen, Outbound qualifizieren, Termine setzen — 24/7. DSGVO, Hosting in Deutschland. Solo ab 199 €/Mo.',
    url: `${site.url}/ki-telefonassistent`,
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const SERVICES = [
  {
    Icon: PhoneIncoming,
    title: 'Empfangs-Assistent',
    sub: 'Inbound',
    body: 'Hebt beim ersten Klingeln ab, versteht das Anliegen in natürlichem Deutsch, klärt Standard-Fragen direkt, leitet komplexe Fälle mit vollem Kontext an dein Team weiter.',
    bullets: [
      'Annahme in < 0,4 Sek.',
      '24/7 · auch am Wochenende',
      'Termin-Buchung im Gespräch',
    ],
  },
  {
    Icon: PhoneOutgoing,
    title: 'Outbound-Closer',
    sub: 'Outbound',
    body: 'Ruft Leads aus deiner Liste ab, qualifiziert in 3 Minuten anhand deiner Fragen, bucht den Termin direkt in den Kalender — oder markiert den Lead sauber als „kein Interesse".',
    bullets: [
      'Lead-Listen automatisch abgearbeitet',
      'Qualifizierung nach deinen Kriterien',
      'CRM-Synchronisation live',
    ],
  },
  {
    Icon: Settings2,
    title: 'Custom Voice-Agent',
    sub: 'Maßgeschneidert',
    body: 'Recall-Kampagnen, Mahnwesen, Termin-Erinnerungen, Bestandskunden-Reaktivierung — wir bauen den Agent auf deinen exakten Prozess inklusive Compliance-Logging.',
    bullets: [
      'Eigene Brand-Stimme (mit Consent)',
      'Compliance-Logging regulierte Branchen',
      'WhatsApp / SMS Hand-off',
    ],
  },
];

const INDUSTRIES = [
  { Icon: Stethoscope, href: '/ki-telefonassistent/arztpraxis', label: 'Arztpraxen', tagline: 'Termine · Rezepte · Rückrufe' },
  { Icon: Wrench, href: '/ki-telefonassistent/handwerk', label: 'Handwerk', tagline: 'Aufträge auch nach Feierabend' },
  { Icon: Scale, href: '/ki-telefonassistent/steuerberater', label: 'Steuerberater & Kanzleien', tagline: 'Mandantenanrufe sauber sortiert' },
  { Icon: Home, href: '/ki-telefonassistent/hausverwaltung', label: 'Hausverwaltungen', tagline: 'Schadensmeldungen rund um die Uhr' },
  { Icon: Hotel, href: '/ki-telefonassistent/hotel', label: 'Hotellerie', tagline: 'Reservierungen direkt im Gespräch' },
  { Icon: Car, href: '/ki-telefonassistent/autohaus', label: 'Autohäuser', tagline: 'Werkstatt-Termine ohne Wartezeit' },
];

const FAQ = [
  {
    q: 'Was ist ein KI-Telefonassistent?',
    a: 'Ein Sprach-Agent, der Anrufe vollautomatisch annimmt, das Anliegen in natürlichem Deutsch versteht, Standardfragen löst, Termine bucht und bei Bedarf an einen Menschen übergibt — 24/7, ohne Warteschleife.',
  },
  {
    q: 'Was kostet ein KI-Telefonassistent?',
    a: 'Solo ab 199 €/Monat netto, AI Account Manager 499 €/Monat, Scale auf Anfrage. Plus einmalige Setup-Gebühr (entfällt bei Jahresvorkasse für Solo & AI Account Manager). Volle Tabelle inkl. Toggle auf /preise.',
  },
  {
    q: 'Ist ein KI-Telefonassistent DSGVO-konform?',
    a: 'Bei uns ja: Hosting ausschließlich in Deutschland (Nürnberg), EU-AI-Act-konform, mit Auftragsverarbeitungsvertrag. Keine US-Cloud, keine Speicherung über die Verarbeitung hinaus.',
  },
  {
    q: 'Wie schnell ist der Agent einsatzbereit?',
    a: 'Audit in 60 Minuten, erster produktiver Agent in der Regel in 2 Wochen, voll integriert nach 4 Wochen. Festpreis vor dem ersten Commit.',
  },
];

const JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Start', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'KI-Telefonassistent', item: `${site.url}/ki-telefonassistent` },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'KI-Telefonassistent',
    name: 'KI-Telefonassistent für Unternehmen',
    provider: { '@id': `${site.url}#organization` },
    areaServed: { '@type': 'Country', name: 'Deutschland' },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${site.url}/ki-telefonassistent`,
      servicePhone: '+49 30 826 83906',
    },
    url: `${site.url}/ki-telefonassistent`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  },
];

export default function KiTelefonassistentPage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* Hero */}
      <section className="relative px-6 pb-12 pt-[150px] lg:px-10 lg:pt-[180px]">
        {/* Bottom fade — blends the transparent (aurora) hero smoothly into
            the next section instead of a hard teal->dark edge. */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-44 bg-gradient-to-b from-transparent to-[hsl(var(--bg))]" />
        <div className="relative z-[2] mx-auto max-w-[1280px]">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 md:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(174_100%_50%/0.4)] bg-[hsl(174_100%_50%/0.08)] px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(174_100%_70%)]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(174_100%_50%)] opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(174_100%_50%)]" />
                </span>
                Live · 24/7 · DE
              </div>
              <h1 className="mt-6 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.025em] text-[hsl(var(--fg))]">
                Deine KI-Telefonassistentin{' '}
                <span className="text-[hsl(var(--accent))]">nimmt jeden Anruf in</span>{' '}
                <span className="tabular-nums">&lt; 0,4 s</span> an.
              </h1>
              <p className="mt-6 max-w-2xl text-[1.125rem] leading-[1.6] text-[hsl(var(--muted))]">
                Inbound, Outbound, Termine — in natürlichem Deutsch. Eingebunden in dein CRM,
                gehostet in Deutschland, DSGVO-konform. Live in vier Wochen, monatlich kündbar.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/preise"
                  data-event="voice_page_to_pricing"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-6 font-display text-[0.95rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))]"
                >
                  Preise ansehen
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href={site.cta.meetingUrl}
                  className="text-[0.9rem] text-[hsl(var(--muted))] underline-offset-4 hover:text-[hsl(var(--fg))] hover:underline"
                >
                  Direkt Erstgespräch buchen →
                </Link>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5">
              <VoiceConsole />
            </div>
          </div>
        </div>
      </section>

      {/* Three services */}
      <ScrollZoom>
      <section className="relative bg-[hsl(var(--bg))]/82 px-6 py-20 backdrop-blur-[2px] md:py-24 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-12 gap-x-6 gap-y-6">
            <div className="col-span-12 md:col-span-5">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
                Was sie kann
              </span>
              <h2 className="mt-4 font-display text-[clamp(1.875rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
                Inbound. Outbound. Custom.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-7 md:pt-2">
              <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
                Drei klare Rollen statt einem unscharfen „Sprachbot". Wähl die Linie, die dein
                Telefon heute am meisten braucht — kombinier sie später nach Bedarf.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {SERVICES.map(({ Icon, title, sub, body, bullets }) => (
              <div
                key={title}
                className="group relative flex flex-col rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 transition-colors hover:border-[hsl(var(--accent))/40]"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[hsl(var(--accent))/12] text-[hsl(var(--accent))]">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
                    {sub}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[1.25rem] font-medium tracking-tight text-[hsl(var(--fg))]">
                  {title}
                </h3>
                <p className="mt-2.5 text-[0.9rem] leading-[1.55] text-[hsl(var(--muted))]">{body}</p>
                <ul className="mt-5 space-y-2 border-t border-[hsl(var(--border))] pt-4">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[0.825rem] leading-snug text-[hsl(var(--fg))]/85">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--accent))]" strokeWidth={2.5} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollZoom>

      {/* Industries */}
      <ScrollSlide direction="right">
      <section className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--surface))]/40 px-6 py-20 backdrop-blur-[2px] md:py-24 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-12 gap-x-6 gap-y-6">
            <div className="col-span-12 md:col-span-5">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
                Für eure Branche
              </span>
              <h2 className="mt-4 font-display text-[clamp(1.875rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
                Aus 200+ Live-Implementierungen extrahiert.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-7 md:pt-2">
              <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
                Jede Branche hat eigene Anrufgründe + Compliance-Anforderungen. Wähl deine
                Branche → sieh konkret, was wir für diesen Use-Case bauen.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map(({ Icon, href, label, tagline }) => (
              <Link
                key={href}
                href={href}
                data-event="voice_industry_click"
                className="group relative flex items-center gap-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--bg))]/60 p-5 transition-all hover:-translate-y-0.5 hover:border-[hsl(var(--accent))/50] hover:bg-[hsl(var(--surface))]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[hsl(var(--border-strong))] bg-[hsl(var(--surface))] text-[hsl(var(--accent))]">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-[1rem] font-medium leading-tight text-[hsl(var(--fg))] group-hover:text-[hsl(var(--accent))]">
                    {label}
                  </div>
                  <div className="mt-1 truncate text-[0.8rem] text-[hsl(var(--muted))]">{tagline}</div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-[hsl(var(--subtle))] transition-all group-hover:translate-x-0.5 group-hover:text-[hsl(var(--accent))]" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      </ScrollSlide>

      {/* Trust strip */}
      <ScrollZoom>
      <section className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/82 px-6 py-16 backdrop-blur-[2px] lg:px-10">
        <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-8 text-center md:grid-cols-3">
          {[
            { Icon: ShieldCheck, big: '100 %', label: 'DSGVO · EU-Hosting (Nürnberg)' },
            { Icon: Headphones, big: '< 0,4 s', label: 'Antwortzeit Voice' },
            { Icon: PhoneIncoming, big: '24/7', label: 'auch am Wochenende' },
          ].map(({ Icon, big, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[hsl(var(--accent))/12] text-[hsl(var(--accent))]">
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <div className="font-display text-[clamp(1.5rem,2.5vw,2rem)] font-medium leading-none tracking-[-0.025em] text-[hsl(var(--fg))]">
                {big}
              </div>
              <div className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--muted))]">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>
      </ScrollZoom>

      {/* FAQ */}
      <ScrollSlide direction="left">
      <section className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/82 px-6 py-20 backdrop-blur-[2px] md:py-24 lg:px-10">
        <div className="mx-auto max-w-[820px]">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
            Häufige Fragen
          </span>
          <h2 className="mt-4 font-display text-[clamp(1.875rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
            Vier Antworten, bevor du buchst.
          </h2>

          <ul className="mt-10 border-t border-[hsl(var(--border))]">
            {FAQ.map(({ q, a }, i) => (
              <li key={q} className="border-b border-[hsl(var(--border))]">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 transition-colors hover:bg-[hsl(var(--accent))/[0.03]]">
                    <div className="flex items-start gap-5">
                      <span className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-[1.125rem] font-medium leading-snug tracking-[-0.01em] text-[hsl(var(--fg))]">
                        {q}
                      </h3>
                    </div>
                    <span
                      aria-hidden
                      className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[hsl(var(--border-strong))] text-[hsl(var(--fg))] transition-all group-open:rotate-45 group-open:border-[hsl(var(--accent))] group-open:bg-[hsl(var(--accent))/10] group-open:text-[hsl(var(--accent))]"
                    >
                      +
                    </span>
                  </summary>
                  <p className="ml-[3.25rem] pb-6 pr-10 text-[0.95rem] leading-[1.65] text-[hsl(var(--muted))]">
                    {a}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>
      </ScrollSlide>

      <ScrollSlide direction="up">
        <ComparisonSection />
      </ScrollSlide>

      <GoogleReviews />

      <CitiesSection />

      <ScrollZoom>
        <GuaranteeStrip />
      </ScrollZoom>

      {/* Final CTA */}
      <ScrollZoom>
      <section className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/82 px-6 py-20 backdrop-blur-[2px] md:py-28 lg:px-10">
        <div className="mx-auto max-w-[820px] text-center">
          <h2 className="font-display text-[clamp(1.875rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
            Hör sie, statt nur über sie zu lesen.
          </h2>
          <p className="mt-4 text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
            Ein Klick — die Telefonassistentin ruft dich in 5 Minuten zurück. Oder buch direkt 30 Min mit Ricardo.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={site.cta.meetingUrl}
              data-event="voice_page_final_cta"
              className="group inline-flex h-14 items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-7 font-display text-[0.95rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))]"
            >
              Erstgespräch buchen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/preise"
              className="text-[0.9rem] text-[hsl(var(--muted))] underline-offset-4 hover:text-[hsl(var(--fg))] hover:underline"
            >
              Preise vergleichen →
            </Link>
          </div>
        </div>
      </section>
      </ScrollZoom>
    </article>
  );
}
