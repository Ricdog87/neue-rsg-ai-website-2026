import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, MapPin, Phone, Mail, Check } from 'lucide-react';
import { site } from '@/lib/content';
import { breadcrumbLd, ldJson } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'KI-Beratung Wiesbaden — KI-Agenten für den Mittelstand',
  description:
    'KI-Beratung & KI-Agenten für Unternehmen in Wiesbaden, Mainz, Frankfurt Rhein-Main. DSGVO-konform, persönlich vor Ort, Go-Live in 2–4 Wochen.',
  keywords: [
    'KI-Beratung Wiesbaden',
    'KI-Agentur Wiesbaden',
    'KI-Beratung Hessen',
    'AI Consulting Wiesbaden',
    'KI-Beratung Rhein-Main',
    'KI-Beratung Frankfurt',
    'KI-Beratung Mainz',
    'KI-Automatisierung Mittelstand',
    'KI-Agenten Hessen'
  ],
  alternates: { canonical: `${site.url}/ki-beratung-wiesbaden` },
  openGraph: {
    title: 'KI-Beratung Wiesbaden — Persönlich. DSGVO. 2–4 Wochen Go-Live.',
    description:
      'KI-Agenten für den Mittelstand im Rhein-Main-Gebiet. Made in Wiesbaden.',
    url: `${site.url}/ki-beratung-wiesbaden`
  },
  robots: { index: true, follow: true }
};

const REASONS = [
  {
    title: 'Persönlich vor Ort',
    body: 'Wir sitzen in Wiesbaden. Strategie-Workshops und Kick-off-Meetings auch persönlich bei dir — keine Zoom-Black-Box.'
  },
  {
    title: 'Wir kennen den Rhein-Main-Mittelstand',
    body: 'Versicherungen, Beratungen, Family-Offices, Tech-Unternehmen. Wir sprechen die Sprache der hiesigen Branchen.'
  },
  {
    title: 'DSGVO + EU-Hosting · 100 % made in Germany',
    body: 'Sprachdaten gespeichert in Deutschland (Hetzner, Nürnberg), Verarbeitung über EU-/US-Dienste unter DPF/SCC. Dein Datenschutzbeauftragter atmet durch.'
  },
  {
    title: 'Go-Live in 2–4 Wochen — nicht 4 Monaten',
    body: 'Keine endlosen Beratungs-Workshops. Wir bauen produktiv, du siehst Resultate in deiner Pipeline ab Woche 2.'
  }
];

const PROOF = [
  { value: '12+', label: 'Kunden-Agenten in Produktion' },
  { value: '38.000+', label: 'Automatisierte Tasks pro Monat' },
  { value: '312 %', label: 'Ø ROI nach 4 Monaten' }
];

export default function KIBeratungWiesbadenPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[hsl(var(--bg))] px-6 pb-24 pt-32 md:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: ldJson(
            breadcrumbLd([
              { name: 'RSG AI', url: site.url },
              { name: 'KI-Beratung Wiesbaden', url: `${site.url}/ki-beratung-wiesbaden` },
            ]),
          ),
        }}
      />
      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full opacity-25 blur-[140px]"
        style={{ background: 'radial-gradient(circle, hsl(271 91% 65% / 0.5), transparent 65%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full opacity-20 blur-[140px]"
        style={{ background: 'radial-gradient(circle, hsl(174 100% 50% / 0.5), transparent 65%)' }}
      />

      <div className="relative mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))] transition hover:text-[hsl(var(--fg))]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Zurück zur Startseite
        </Link>

        {/* HERO */}
        <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--neon))/30] bg-[hsl(var(--neon))/8] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[hsl(var(--neon))]">
          <MapPin className="h-3 w-3" />
          Wiesbaden · Rhein-Main · Hessen
        </p>
        <h1 className="mt-5 font-display text-balance text-4xl tracking-tight md:text-6xl lg:text-7xl">
          KI-Beratung in Wiesbaden.
          <br />
          <span className="text-[hsl(var(--neon))]" style={{ textShadow: '0 0 40px hsl(174 100% 50% / 0.5)' }}>
            Für Mittelstand, der nicht warten will.
          </span>
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-[hsl(var(--muted))] md:text-lg">
          Wir bauen, integrieren und betreiben KI-Agenten für Unternehmen im Rhein-Main-Gebiet.
          Persönlich vor Ort, DSGVO-konform, mit messbarem ROI in 4 Monaten. 15 Jahre B2B-Vertrieb
          stecken in jedem Agenten — keine Theorie, EU-Datenschutzniveau, transparente Subprozessoren.
        </p>

        {/* Trust stats */}
        <div className="mt-10 grid grid-cols-3 gap-3 md:gap-6">
          {PROOF.map((p) => (
            <div
              key={p.label}
              className="rounded-2xl border border-white/8 bg-white/[0.025] p-4 text-center md:p-6"
            >
              <p
                className="font-display text-3xl font-bold leading-none tracking-tight text-[hsl(var(--neon))] md:text-5xl"
                style={{ textShadow: '0 0 30px hsl(174 100% 50% / 0.45)' }}
              >
                {p.value}
              </p>
              <p className="mt-2 text-[11px] text-[hsl(var(--muted))] md:text-xs">{p.label}</p>
            </div>
          ))}
        </div>

        {/* WHY WIESBADEN */}
        <section className="mt-20">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[hsl(var(--neon))]">
            Warum eine KI-Agentur aus Wiesbaden?
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight md:text-5xl">
            Vier Gründe, warum lokale KI-Beratung im Mittelstand gewinnt.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {REASONS.map((r, i) => (
              <div
                key={r.title}
                className="rounded-2xl border border-white/8 bg-white/[0.025] p-6"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[hsl(var(--muted))]">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-xl tracking-tight md:text-2xl">
                  {r.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted))] md:text-base">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICE LIST */}
        <section className="mt-20">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[hsl(var(--neon))]">
            Was wir in Wiesbaden für dich tun
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight md:text-5xl">
            KI-Beratung, die ab Woche 2 für dich liefert.
          </h2>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {[
              'Prozess-Audit vor Ort in Wiesbaden — 60-Minuten-Termin, kein Pitch',
              'Maßgeschneiderte KI-Agenten auf LangChain / LangGraph',
              'Integration in HubSpot, Salesforce, DATEV, Personio, Slack, Teams',
              'DSGVO-konformes Hosting in Deutschland (Nürnberg) auf EU-Servern',
              '24/7-Monitoring & monatliche Optimierungs-Reviews',
              'Persönliche Ansprechpartner — kein Helpdesk-Outsourcing'
            ].map((s) => (
              <li
                key={s}
                className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.025] p-4"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--neon))/15] text-[hsl(var(--neon))]">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-sm text-[hsl(var(--fg))]">{s}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* REGIONS */}
        <section className="mt-20 rounded-3xl border border-white/8 bg-white/[0.02] p-8 md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[hsl(var(--neon))]">
            Wir arbeiten im gesamten Rhein-Main-Gebiet
          </p>
          <h2 className="mt-3 font-display text-2xl tracking-tight md:text-3xl">
            Sitz Wiesbaden — aktiv in Hessen & im Süden Rheinland-Pfalz.
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              'Wiesbaden',
              'Mainz',
              'Frankfurt am Main',
              'Offenbach',
              'Darmstadt',
              'Hanau',
              'Gießen',
              'Limburg',
              'Bad Homburg',
              'Rüsselsheim',
              'Hochheim',
              'Eltville'
            ].map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-[hsl(var(--muted))]"
              >
                {c}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          className="mt-20 overflow-hidden rounded-3xl border border-[hsl(var(--accent))/30] p-8 md:p-12"
          style={{
            background:
              'linear-gradient(155deg, hsl(271 91% 65% / 0.10) 0%, hsl(174 100% 50% / 0.05) 60%, hsl(240 14% 5%) 100%)',
            boxShadow: '0 40px 100px -30px hsl(271 91% 65% / 0.45)'
          }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[hsl(var(--neon))]">
            Lass uns reden
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight md:text-5xl">
            30 Minuten mit Ricardo. Persönlich in Wiesbaden oder per Video.
          </h2>
          <p className="mt-5 max-w-2xl text-sm text-[hsl(var(--muted))] md:text-base">
            Du erzählst uns deine 2–3 schmerzhaftesten Prozesse — wir sagen dir konkret,
            wo ein KI-Agent den größten Hebel hat. Kostenlos, unverbindlich, ohne
            Vertriebs-Floskel.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={site.cta.meetingUrl}
              className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-6 py-3.5 text-sm font-bold text-white transition hover:opacity-90"
              style={{ boxShadow: '0 25px 60px -15px hsl(271 91% 65% / 0.7)' }}
            >
              Termin buchen
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={`tel:${site.contact.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-[hsl(var(--fg))] transition hover:border-[hsl(var(--neon))/40] hover:bg-[hsl(var(--neon))/8]"
            >
              <Phone className="h-4 w-4" />
              {site.contact.phone}
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-[hsl(var(--fg))] transition hover:border-[hsl(var(--neon))/40] hover:bg-[hsl(var(--neon))/8]"
            >
              <Mail className="h-4 w-4" />
              {site.contact.email}
            </a>
          </div>
          <p className="mt-6 text-xs text-[hsl(var(--muted))]">
            <MapPin className="mr-1 inline h-3 w-3" />
            Am Heiligenhaus 9, 65207 Wiesbaden · Mo–Fr 9:00–18:00 Uhr
          </p>
        </section>
      </div>
    </main>
  );
}
