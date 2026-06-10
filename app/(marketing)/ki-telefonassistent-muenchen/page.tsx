import type { Metadata } from 'next';
import { CitiesSection } from '@/components/sections/cities-section';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, MapPin, Phone, Mail, Check } from 'lucide-react';
import { site } from '@/lib/content';
import { breadcrumbLd, ldJson } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'KI-Telefonassistent München – DSGVO-konform & 24/7',
  description:
    'KI-Telefonassistent für Unternehmen in München & Bayern. Automatisch Anrufe entgegennehmen, Leads qualifizieren, Termine buchen. DSGVO-konform, Go-Live in 2–4 Wochen.',
  keywords: [
    'KI Telefonassistent München',
    'AI Voice Agent München',
    'Automatischer Telefonassistent München',
    'KI Kundenservice München',
    'KI Telefonassistent Bayern',
    'Voice Agent B2B München',
  ],
  alternates: { canonical: `${site.url}/ki-telefonassistent-muenchen` },
  openGraph: {
    title: 'KI-Telefonassistent München — 24/7. DSGVO. Go-Live in 2–4 Wochen.',
    description: 'KI-Telefonassistent für B2B-Unternehmen in München & Bayern.',
    url: `${site.url}/ki-telefonassistent-muenchen`,
  },
  robots: { index: true, follow: true },
};

const REASONS = [
  { title: 'Münchner Mittelstand braucht keine Warteschleifen', body: 'Ihr KI-Telefonassistent nimmt jeden Anruf sofort entgegen — von Schwabing bis zum Münchner Süden, rund um die Uhr, ohne Warteschleife.' },
  { title: 'Nahtlose Integration in Ihre Systeme', body: 'HubSpot, Salesforce, SAP, Personio — Anrufdaten fließen automatisch in Ihre bestehende Software. Ihr Vertrieb sieht jeden Lead in Echtzeit.' },
  { title: 'DSGVO + EU-Hosting · 100 % Made in Germany', body: 'Sprachdaten auf deutschen Servern (Hetzner, Nürnberg). Volle DSGVO-Konformität, Auftragsverarbeitungsvertrag inklusive. Ideal für regulierte Branchen.' },
  { title: 'Schneller als jede Recruiting-Lösung', body: 'Kein zusätzliches Personal nötig. Kein Onboarding, keine Krankentage. Ihr KI-Assistent ist in 2–4 Wochen live und skaliert auf Knopfdruck.' },
];
const PROOF = [
  { value: '12+', label: 'Agenten in Produktion' },
  { value: '24/7', label: 'Verfügbarkeit' },
  { value: '< 2 Wo.', label: 'bis Go-Live' },
];

export default function MuenchenPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[hsl(var(--bg))] px-6 pb-24 pt-32 md:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(breadcrumbLd([{ name: 'RSG AI', url: site.url }, { name: 'KI-Telefonassistent München', url: `${site.url}/ki-telefonassistent-muenchen` }])) }} />
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full opacity-25 blur-[140px]" style={{ background: 'radial-gradient(circle, hsl(174 90% 42% / 0.5), transparent 65%)' }} />
      <div aria-hidden className="pointer-events-none absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full opacity-20 blur-[140px]" style={{ background: 'radial-gradient(circle, hsl(174 100% 50% / 0.5), transparent 65%)' }} />
      <div className="relative mx-auto max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))] transition hover:text-[hsl(var(--fg))]">
          <ArrowLeft className="h-3.5 w-3.5" />Zurück zur Startseite
        </Link>
        <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--neon))/30] bg-[hsl(var(--neon))/8] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[hsl(var(--neon))]">
          <MapPin className="h-3 w-3" />München · Bayern
        </p>
        <h1 className="mt-5 font-display text-balance text-4xl tracking-tight md:text-6xl lg:text-7xl">
          KI-Telefonassistent<br />
          <span className="text-[hsl(var(--neon))]" style={{ textShadow: '0 0 40px hsl(174 100% 50% / 0.5)' }}>
            für München &amp; Bayern.
          </span>
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-[hsl(var(--muted))] md:text-lg">
          Münchner Unternehmen nutzen KI-Telefonie, um Wachstum zu skalieren — ohne zusätzliches Personal. Ihr Agent nimmt Anrufe entgegen, qualifiziert Leads und bucht Termine. DSGVO-konform, 24/7.
        </p>
        <div className="mt-10 grid grid-cols-3 gap-3 md:gap-6">
          {PROOF.map((p) => (
            <div key={p.label} className="rounded-2xl border border-white/8 bg-white/[0.025] p-4 text-center md:p-6">
              <p className="font-display text-3xl font-bold leading-none tracking-tight text-[hsl(var(--neon))] md:text-5xl" style={{ textShadow: '0 0 30px hsl(174 100% 50% / 0.45)' }}>{p.value}</p>
              <p className="mt-2 text-[11px] text-[hsl(var(--muted))] md:text-xs">{p.label}</p>
            </div>
          ))}
        </div>
        <section className="mt-20">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[hsl(var(--neon))]">Warum ein KI-Telefonassistent für München?</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight md:text-5xl">Vier Gründe, warum Münchner Unternehmen auf KI-Voice setzen.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {REASONS.map((r, i) => (
              <div key={r.title} className="rounded-2xl border border-white/8 bg-white/[0.025] p-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[hsl(var(--muted))]">0{i + 1}</span>
                <h3 className="mt-3 font-display text-xl tracking-tight md:text-2xl">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted))] md:text-base">{r.body}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-20">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[hsl(var(--neon))]">Was der KI-Telefonassistent für Sie tut</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight md:text-5xl">Vom ersten Klingeln bis zum gebuchten Termin — vollautomatisch.</h2>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {['Eingehende Anrufe 24/7 entgegennehmen — kein Warteton', 'Leads qualifizieren nach Ihren Kriterien (Budget, Branche, Dringlichkeit)', 'Termine direkt in Ihren Kalender buchen (Calendly, HubSpot, Google)', 'Gesprächsprotokolle & Lead-Daten automatisch ins CRM übertragen', 'Übergabe an Ihr Vertriebsteam mit vollständigem Gesprächskontext', 'Sprache & Ton individuell auf Ihre Marke angepasst'].map((s) => (
              <li key={s} className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.025] p-4">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--neon))/15] text-[hsl(var(--neon))]"><Check className="h-3 w-3" /></span>
                <span className="text-sm text-[hsl(var(--fg))]">{s}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-20 rounded-3xl border border-white/8 bg-white/[0.02] p-8 md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[hsl(var(--neon))]">Aktiv in München und ganz Bayern</p>
          <h2 className="mt-3 font-display text-2xl tracking-tight md:text-3xl">Von der Innenstadt bis ins Münchner Umland.</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {['München','Schwabing','Maxvorstadt','Bogenhausen','Pullach','Grünwald','Unterföhring','Garching','Unterschleißheim','Freising','Augsburg','Ingolstadt'].map((c) => (
              <span key={c} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-[hsl(var(--muted))]">{c}</span>
            ))}
          </div>
        </section>
        <section className="mt-20 overflow-hidden rounded-3xl border border-[hsl(var(--accent))/30] p-8 md:p-12" style={{ background: 'linear-gradient(155deg, hsl(174 90% 42% / 0.10) 0%, hsl(174 100% 50% / 0.05) 60%, hsl(240 14% 5%) 100%)', boxShadow: '0 40px 100px -30px hsl(174 90% 42% / 0.45)' }}>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[hsl(var(--neon))]">Jetzt Demo anfragen</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight md:text-5xl">30 Minuten Live-Demo. Ihr KI-Agent antwortet ab Woche 2.</h2>
          <p className="mt-5 max-w-2xl text-sm text-[hsl(var(--muted))] md:text-base">Wir zeigen Ihnen live, wie Ihr KI-Telefonassistent Anrufe annimmt, qualifiziert und Termine bucht — speziell für Ihr Münchner Unternehmen.</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href={site.cta.meetingUrl} className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-6 py-3.5 text-sm font-bold text-white transition hover:opacity-90" style={{ boxShadow: '0 25px 60px -15px hsl(174 90% 42% / 0.7)' }}>
              Demo anfragen<ArrowRight className="h-4 w-4" />
            </a>
            <a href={`tel:${site.contact.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-[hsl(var(--fg))] transition hover:border-[hsl(var(--neon))/40] hover:bg-[hsl(var(--neon))/8]">
              <Phone className="h-4 w-4" />{site.contact.phone}
            </a>
            <a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-[hsl(var(--fg))] transition hover:border-[hsl(var(--neon))/40] hover:bg-[hsl(var(--neon))/8]">
              <Mail className="h-4 w-4" />{site.contact.email}
            </a>
          </div>
          <p className="mt-6 text-xs text-[hsl(var(--muted))]"><MapPin className="mr-1 inline h-3 w-3" />Klingholzstraße 7, 65189 Wiesbaden · Remote-Beratung & Video-Demo für München</p>
        </section>
      </div>
    <CitiesSection />
      </main>
  );
}
