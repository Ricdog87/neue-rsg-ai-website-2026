// lib/callcenter.ts
// Single source of truth for the /ki-callcenter page — repositioned for
// enterprise / high-volume customers. Tariffs, contract terms, the ROI
// calculator logic and all copy live here. Prices net (zzgl. USt.).
// Booking CTA reuses the site-wide meeting URL (site.cta.meetingUrl).

export type TermId = 'flex' | '12m' | '24m';
export type TariffId = 's' | 'm' | 'l';
export type Mode = 'inbound' | 'outbound' | 'both';

export type Term = {
  id: TermId;
  label: string;
  sub: string;
  monthlyFactor: number;
  setupFactor: number;
};

export const TERMS: Term[] = [
  { id: 'flex', label: 'Flexibel', sub: 'monatlich kündbar', monthlyFactor: 1, setupFactor: 1 },
  { id: '12m', label: '12 Monate', sub: '−10 % · Einrichtung 50 %', monthlyFactor: 0.9, setupFactor: 0.5 },
  { id: '24m', label: '24 Monate', sub: '−15 % · keine Einrichtung', monthlyFactor: 0.85, setupFactor: 0 },
];

export type Tariff = {
  id: TariffId;
  name: string;
  monthly: number;
  setup: number;
  minutes: number;
  tagline: string;
  features: string[];
  popular?: boolean;
};

export const TARIFFS: Tariff[] = [
  {
    id: 's',
    name: 'Callcenter S',
    monthly: 990,
    setup: 1990,
    minutes: 2000,
    tagline: 'Einzelstandort / Anruf-Überlauf',
    features: [
      '~2.000 Gesprächsminuten / Monat inkl.',
      'Inbound-Annahme rund um die Uhr',
      'Eigene Rufnummer oder Anbindung deiner Anlage',
      'Termin- & Lead-Erfassung direkt ins CRM',
    ],
  },
  {
    id: 'm',
    name: 'Callcenter M',
    monthly: 1990,
    setup: 2990,
    minutes: 4000,
    tagline: 'Inbound + Outbound, wachsendes Volumen',
    features: [
      '~4.000 Gesprächsminuten / Monat inkl.',
      'Inbound + Outbound-Kampagnen',
      'Viele parallele Gespräche gleichzeitig',
      'Automatische Follow-ups & Recall-Listen',
    ],
  },
  {
    id: 'l',
    name: 'Callcenter L',
    monthly: 3990,
    setup: 4990,
    minutes: 8000,
    tagline: 'Dedizierte Operation, hohes Volumen',
    popular: true,
    features: [
      '~8.000 Gesprächsminuten / Monat inkl.',
      'Hunderte parallele Gespräche',
      'Custom-Voice & Branchen-Skripte',
      'Reporting-Dashboard · Prioritäts-Support',
    ],
  },
];

/** Enterprise / large-account tier — custom pricing, rendered as a 4th card. */
export const ENTERPRISE = {
  id: 'enterprise',
  name: 'Enterprise',
  price: 'Auf Anfrage',
  tagline: 'Großkunden · unbegrenztes Volumen · SLA',
  features: [
    'Unbegrenztes Volumen · elastisch bei Lastspitzen',
    'Dedizierte KI-Operation & garantiertes SLA',
    'Volle Integration: Telefonanlage, CRM, ERP, Ticketing',
    'Multi-Standort & Multi-Team-Steuerung',
    'SSO, Audit-Logs, Rollen- & Rechte-Management',
    'Dedizierter Ansprechpartner & Quartals-Reviews',
  ],
} as const;

export function priceFor(tariff: Tariff, term: Term) {
  return {
    monthly: Math.round(tariff.monthly * term.monthlyFactor),
    setup: Math.round(tariff.setup * term.setupFactor),
  };
}

export function recommendTariff(minutesMonth: number): Tariff {
  if (minutesMonth <= TARIFFS[0].minutes) return TARIFFS[0];
  if (minutesMonth <= TARIFFS[1].minutes) return TARIFFS[1];
  return TARIFFS[2];
}

// ── Use cases / sectors with call-center scale ───────────────
export type Industry = { id: string; label: string; blurb: string; orderValue: number };

export const INDUSTRIES: Industry[] = [
  { id: 'energie', label: 'Energie & Versorger', blurb: 'Tarif-, Zähler- und Störungs-Hotline — Lastspitzen ohne Warteschleife.', orderValue: 700 },
  { id: 'versicherung', label: 'Versicherung & Finanz', blurb: 'Schadenmeldung, Vertragsservice, Rückrufe — 24/7 und revisionssicher.', orderValue: 1200 },
  { id: 'ecommerce', label: 'E-Commerce & Retail', blurb: 'Bestell-, Retouren- und Service-Anrufe in jeder Saisonspitze.', orderValue: 150 },
  { id: 'health', label: 'Gesundheit & MVZ', blurb: 'Terminsteuerung über viele Standorte, ohne Dauerbesetzung.', orderValue: 120 },
  { id: 'immobilien', label: 'Immobilien & Verwaltung', blurb: 'Mieter- und Interessenten-Anliegen zentral aufnehmen und routen.', orderValue: 1500 },
  { id: 'b2b', label: 'B2B-Vertrieb & SaaS', blurb: 'Inbound-Leads in Sekunden qualifizieren, Outbound at scale.', orderValue: 2500 },
  { id: 'logistik', label: 'Logistik & Mobilität', blurb: 'Sendungs- und Buchungsanfragen rund um die Uhr beantworten.', orderValue: 300 },
  { id: 'public', label: 'Öffentlicher Sektor', blurb: 'Bürger-Hotline mit klarer KI-Transparenz und EU-Hosting.', orderValue: 200 },
];

// ── Calculator (enterprise defaults) ─────────────────────────
export const CALC_DEFAULTS = {
  callsPerDay: 120,
  mode: 'both' as Mode,
  missedPct: 45,
  orderValue: 600,
  industryId: 'b2b',
  durationMin: 4,
  closeRatePct: 15,
  agentCost: 3000,
};

export const CALC_CONSTANTS = { workdays: 22, minutesPerFte: 1100 };

// ── Page copy ─────────────────────────────────────────────────
export const callcenter = {
  hero: {
    eyebrow: 'Enterprise KI-Callcenter · Inbound & Outbound at scale',
    headline: ['Tausende Anrufe.', 'Null verloren.', 'Ein KI-Callcenter.'],
    subline:
      'Für Unternehmen mit hohem Anrufvolumen: hunderte parallele Gespräche, dedizierte Operation mit SLA, volle Integration in Telefonie, CRM und ERP. 24/7, DSGVO-konform, Server in Deutschland.',
    primaryCta: 'Enterprise-Demo buchen',
    secondaryCta: 'Ersparnis berechnen',
    trust: ['Garantiertes SLA', 'Server in Deutschland', 'EU AI Act ready', 'Dedizierte Operation'],
    stats: [
      { value: 500, prefix: '', suffix: '+', decimals: 0, label: 'parallele Gespräche' },
      { value: 99.9, prefix: '', suffix: ' %', decimals: 1, label: 'Uptime-SLA' },
      { value: 0.4, prefix: '< ', suffix: ' s', decimals: 1, label: 'Antwortzeit' },
      { value: 24, prefix: '', suffix: '/7', decimals: 0, label: 'dedizierter Betrieb' },
    ],
  },
  capabilities: {
    eyebrow: 'Enterprise-Fähigkeiten',
    headline: 'Gebaut für Volumen, das Menschen nicht stemmen.',
    subline: 'Kein Anrufbeantworter. Eine skalierende KI-Operation für Inbound und Outbound.',
    points: [
      { title: 'Elastisch skalierbar', body: 'Hunderte Gespräche gleichzeitig — Lastspitzen werden automatisch abgefedert, ohne Warteschleife.' },
      { title: 'Dediziert mit SLA', body: 'Eigene KI-Operation mit garantierter Verfügbarkeit, Monitoring und festen Reaktionszeiten.' },
      { title: 'Voll integriert', body: 'Anbindung an deine Telefonanlage, dein CRM, ERP und Ticketing — Leads und Termine landen automatisch.' },
      { title: 'Outbound at scale', body: 'Recall-, Reaktivierungs- und Termin-Kampagnen über große Anruflisten — vollautomatisch.' },
      { title: 'Multi-Standort', body: 'Zentrale Steuerung über Standorte, Teams und Rufnummern hinweg — ein Dashboard.' },
      { title: 'Sicher & auditierbar', body: 'SSO, Rollen & Rechte, lückenlose Audit-Logs — bereit für regulierte Branchen.' },
    ],
  },
  steps: {
    eyebrow: 'Onboarding',
    headline: 'Von Audit zu dediziertem Betrieb.',
    items: [
      { n: '01', title: 'Audit & Anforderung', body: 'Wir analysieren Anrufvolumen, Spitzenlasten, Prozesse und Compliance-Anforderungen.' },
      { n: '02', title: 'Integration & Skripte', body: 'Anbindung an Telefonie, CRM/ERP. Stimme, Skripte und Routing in deinem Markenton.' },
      { n: '03', title: 'Pilot & Lasttest', body: 'Kontrollierter Pilot mit Lasttest auf Spitzenvolumen, Feinschliff, Freigabe.' },
      { n: '04', title: 'Rollout & Betrieb', body: 'Voller Rollout mit dediziertem Betrieb, SLA-Monitoring und Quartals-Reviews.' },
    ],
  },
  industriesHead: {
    eyebrow: 'Einsatz',
    headline: 'Dort, wo Anrufvolumen geschäftskritisch ist.',
    subline: 'Vorkonfigurierte Skripte und Routing — angepasst auf deine Branche und deine Lastprofile.',
  },
  legal: {
    eyebrow: 'Sicherheit & Compliance',
    headline: 'Enterprise-Sicherheit, rechtssicher und in Deutschland gehostet.',
    points: [
      { title: 'EU AI Act ready', body: 'Transparenzpflicht nach Art. 50: Anrufer werden auf Wunsch klar informiert, dass sie mit einer KI sprechen.' },
      { title: 'DSGVO & AVV', body: 'Auftragsverarbeitungsvertrag inklusive, zweckgebundene Verarbeitung, klare Löschkonzepte.' },
      { title: 'Server in Deutschland', body: 'Hosting in Nürnberg, Verschlüsselung in Transit und at Rest, keine Drittland-Weitergabe.' },
      { title: 'SSO & Audit-Logs', body: 'Single Sign-On, Rollen- & Rechte-Management und lückenlose Audit-Logs für Revision und Compliance.' },
    ],
  },
  faq: [
    { q: 'Wie wird das SLA garantiert?', a: 'Im Enterprise-Tarif gibt es ein vertraglich zugesichertes SLA mit definierten Verfügbarkeits- und Reaktionszeiten, 24/7-Monitoring und Eskalationspfaden.' },
    { q: 'Wie skaliert ihr Lastspitzen ab?', a: 'Die KI-Operation ist elastisch: hunderte Gespräche laufen parallel, Spitzen werden automatisch abgefedert — keine Warteschleife, kein „später erneut versuchen".' },
    { q: 'Lässt sich unsere bestehende Telefonanlage anbinden?', a: 'Ja. Wir binden bestehende Anlagen (SIP/Trunk) ein oder stellen neue Rufnummern bereit — inklusive Routing über Standorte und Teams.' },
    { q: 'Wie sieht es mit Security & Zugriff aus?', a: 'SSO, granulares Rollen- & Rechte-Management, Verschlüsselung und lückenlose Audit-Logs. Server in Deutschland, DSGVO-konform, AVV inklusive.' },
    { q: 'Ist Outbound rechtskonform?', a: 'Outbound-Kampagnen laufen mit Einwilligungs- und Zeitfenster-Logik sowie KI-Transparenzhinweis — abgestimmt auf eure Compliance.' },
    { q: 'Wie lange dauert das Onboarding?', a: 'Audit, Integration und ein Pilot mit Lasttest — abhängig von Integrationstiefe in der Regel wenige Wochen bis zum vollen Rollout.' },
    { q: 'Bekommen wir eigene Rufnummern & Standorte?', a: 'Ja — beliebig viele Rufnummern und Standorte, zentral in einem Dashboard gesteuert.' },
    { q: 'Was kostet Enterprise?', a: 'Individuell nach Volumen, Integrationstiefe und SLA. Den Business-Case rechnen wir gemeinsam durch — der Rechner oben gibt eine erste Orientierung.' },
  ],
  finalCta: {
    eyebrow: 'Enterprise',
    headline: 'Sprich mit unserem Enterprise-Team.',
    subline: 'Wir rechnen deinen Business-Case durch, zeigen die Live-Demo auf deinem Lastprofil und definieren dein SLA.',
    cta: 'Enterprise-Demo buchen',
  },
} as const;
