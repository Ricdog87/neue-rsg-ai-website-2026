// lib/callcenter.ts
// Single source of truth for the /ki-callcenter page — repositioned for
// enterprise / high-volume customers. Bilingual (DE default + EN under /en).
// Prices net (zzgl. USt.). Booking CTA reuses site.cta.meetingUrl.

export type TermId = 'flex' | '12m' | '24m';
export type TariffId = 's' | 'm' | 'l';
export type Mode = 'inbound' | 'outbound' | 'both';

export type Term = {
  id: TermId;
  label: string;
  sub: string;
  labelEn: string;
  subEn: string;
  monthlyFactor: number;
  setupFactor: number;
};

export const TERMS: Term[] = [
  { id: 'flex', label: 'Flexibel', sub: 'monatlich kündbar', labelEn: 'Flexible', subEn: 'monthly cancellable', monthlyFactor: 1, setupFactor: 1 },
  { id: '12m', label: '12 Monate', sub: '−10 % · Einrichtung 50 %', labelEn: '12 months', subEn: '−10% · setup 50%', monthlyFactor: 0.9, setupFactor: 0.5 },
  { id: '24m', label: '24 Monate', sub: '−15 % · keine Einrichtung', labelEn: '24 months', subEn: '−15% · no setup', monthlyFactor: 0.85, setupFactor: 0 },
];

export type Tariff = {
  id: TariffId;
  name: string;
  monthly: number;
  setup: number;
  minutes: number;
  tagline: string;
  taglineEn: string;
  features: string[];
  featuresEn: string[];
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
    taglineEn: 'Single site / call overflow',
    features: [
      '~2.000 Gesprächsminuten / Monat inkl.',
      'Inbound-Annahme rund um die Uhr',
      'Eigene Rufnummer oder Anbindung deiner Anlage',
      'Termin- & Lead-Erfassung direkt ins CRM',
    ],
    featuresEn: [
      '~2,000 talk minutes / month included',
      'Inbound answered around the clock',
      'Own number or connect your existing PBX',
      'Appointment & lead capture straight into your CRM',
    ],
  },
  {
    id: 'm',
    name: 'Callcenter M',
    monthly: 1990,
    setup: 2990,
    minutes: 4000,
    tagline: 'Inbound + Outbound, wachsendes Volumen',
    taglineEn: 'Inbound + outbound, growing volume',
    features: [
      '~4.000 Gesprächsminuten / Monat inkl.',
      'Inbound + Outbound-Kampagnen',
      'Viele parallele Gespräche gleichzeitig',
      'Automatische Follow-ups & Recall-Listen',
    ],
    featuresEn: [
      '~4,000 talk minutes / month included',
      'Inbound + outbound campaigns',
      'Many concurrent conversations',
      'Automated follow-ups & recall lists',
    ],
  },
  {
    id: 'l',
    name: 'Callcenter L',
    monthly: 3990,
    setup: 4990,
    minutes: 8000,
    tagline: 'Dedizierte Operation, hohes Volumen',
    taglineEn: 'Dedicated operation, high volume',
    popular: true,
    features: [
      '~8.000 Gesprächsminuten / Monat inkl.',
      'Hunderte parallele Gespräche',
      'Custom-Voice & Branchen-Skripte',
      'Reporting-Dashboard · Prioritäts-Support',
    ],
    featuresEn: [
      '~8,000 talk minutes / month included',
      'Hundreds of concurrent conversations',
      'Custom voice & industry scripts',
      'Reporting dashboard · priority support',
    ],
  },
];

/** Enterprise / large-account tier — custom pricing, rendered as a 4th card. */
export const ENTERPRISE = {
  id: 'enterprise',
  name: 'Enterprise',
  price: 'Auf Anfrage',
  priceEn: 'On request',
  tagline: 'Großkunden · unbegrenztes Volumen · SLA',
  taglineEn: 'Large accounts · unlimited volume · SLA',
  features: [
    'Unbegrenztes Volumen · elastisch bei Lastspitzen',
    'Dedizierte KI-Operation & garantiertes SLA',
    'Volle Integration: Telefonanlage, CRM, ERP, Ticketing',
    'Multi-Standort & Multi-Team-Steuerung',
    'SSO, Audit-Logs, Rollen- & Rechte-Management',
    'Dedizierter Ansprechpartner & Quartals-Reviews',
  ],
  featuresEn: [
    'Unlimited volume · elastic for peak loads',
    'Dedicated AI operation & guaranteed SLA',
    'Full integration: PBX, CRM, ERP, ticketing',
    'Multi-site & multi-team control',
    'SSO, audit logs, role & permission management',
    'Dedicated contact & quarterly reviews',
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
export type Industry = { id: string; label: string; labelEn: string; blurb: string; blurbEn: string; orderValue: number };

export const INDUSTRIES: Industry[] = [
  { id: 'energie', label: 'Energie & Versorger', labelEn: 'Energy & Utilities', blurb: 'Tarif-, Zähler- und Störungs-Hotline — Lastspitzen ohne Warteschleife.', blurbEn: 'Tariff, meter and outage hotline — peak loads without a queue.', orderValue: 700 },
  { id: 'versicherung', label: 'Versicherung & Finanz', labelEn: 'Insurance & Finance', blurb: 'Schadenmeldung, Vertragsservice, Rückrufe — 24/7 und revisionssicher.', blurbEn: 'Claims, policy service, callbacks — 24/7 and audit-proof.', orderValue: 1200 },
  { id: 'ecommerce', label: 'E-Commerce & Retail', labelEn: 'E-Commerce & Retail', blurb: 'Bestell-, Retouren- und Service-Anrufe in jeder Saisonspitze.', blurbEn: 'Order, returns and service calls through every seasonal peak.', orderValue: 150 },
  { id: 'health', label: 'Gesundheit & MVZ', labelEn: 'Health & Clinics', blurb: 'Terminsteuerung über viele Standorte, ohne Dauerbesetzung.', blurbEn: 'Appointment control across many sites, no permanently staffed phone.', orderValue: 120 },
  { id: 'immobilien', label: 'Immobilien & Verwaltung', labelEn: 'Real Estate & Property', blurb: 'Mieter- und Interessenten-Anliegen zentral aufnehmen und routen.', blurbEn: 'Capture and route tenant and prospect requests centrally.', orderValue: 1500 },
  { id: 'b2b', label: 'B2B-Vertrieb & SaaS', labelEn: 'B2B Sales & SaaS', blurb: 'Inbound-Leads in Sekunden qualifizieren, Outbound at scale.', blurbEn: 'Qualify inbound leads in seconds, outbound at scale.', orderValue: 2500 },
  { id: 'logistik', label: 'Logistik & Mobilität', labelEn: 'Logistics & Mobility', blurb: 'Sendungs- und Buchungsanfragen rund um die Uhr beantworten.', blurbEn: 'Answer shipment and booking requests around the clock.', orderValue: 300 },
  { id: 'public', label: 'Öffentlicher Sektor', labelEn: 'Public Sector', blurb: 'Bürger-Hotline mit klarer KI-Transparenz und EU-Hosting.', blurbEn: 'Citizen hotline with clear AI transparency and EU hosting.', orderValue: 200 },
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

// ── Page copy (German) ────────────────────────────────────────
export const callcenter = {
  hero: {
    eyebrow: 'Enterprise KI-Callcenter · Inbound & Outbound at scale',
    headline: ['Tausende Anrufe.', 'Null verloren.', 'Ein KI-Callcenter.'],
    subline:
      'Für Unternehmen mit hohem Anrufvolumen: hunderte parallele Gespräche, dedizierte Operation mit SLA, volle Integration in Telefonie, CRM und ERP. 24/7, DSGVO-konform, Server in Deutschland.',
    primaryCta: 'Enterprise-Demo buchen',
    secondaryCta: 'Ersparnis berechnen',
    pricingCta: 'Preise & Ersparnis berechnen',
    enterpriseTag: 'Enterprise',
    trust: ['Garantiertes SLA', 'Server in Deutschland', 'EU AI Act ready', 'Dedizierte Operation'],
    liveLabel: 'Live · Gespräche gleichzeitig',
    queueLabel: '0 in der Warteschleife',
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
    badges: ['EU AI Act', 'DSGVO · AVV', 'Server in DE', 'SSO · Audit-Logs'],
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
};

// ── Page copy (English) ───────────────────────────────────────
export const callcenterEn: typeof callcenter = {
  hero: {
    eyebrow: 'Enterprise AI Call Center · Inbound & outbound at scale',
    headline: ['Thousands of calls.', 'None lost.', 'One AI call center.'],
    subline:
      'For companies with high call volume: hundreds of concurrent conversations, a dedicated operation with SLA, full integration into telephony, CRM and ERP. 24/7, GDPR-compliant, servers in Germany.',
    primaryCta: 'Book an enterprise demo',
    secondaryCta: 'Calculate savings',
    pricingCta: 'Pricing & savings',
    enterpriseTag: 'Enterprise',
    trust: ['Guaranteed SLA', 'Servers in Germany', 'EU AI Act ready', 'Dedicated operation'],
    liveLabel: 'Live · concurrent calls',
    queueLabel: '0 in the queue',
    stats: [
      { value: 500, prefix: '', suffix: '+', decimals: 0, label: 'concurrent calls' },
      { value: 99.9, prefix: '', suffix: ' %', decimals: 1, label: 'uptime SLA' },
      { value: 0.4, prefix: '< ', suffix: ' s', decimals: 1, label: 'response time' },
      { value: 24, prefix: '', suffix: '/7', decimals: 0, label: 'dedicated operation' },
    ],
  },
  capabilities: {
    eyebrow: 'Enterprise capabilities',
    headline: 'Built for volume humans can’t handle.',
    subline: 'Not a voicemail box. A scaling AI operation for inbound and outbound.',
    points: [
      { title: 'Elastically scalable', body: 'Hundreds of concurrent calls — peak loads are absorbed automatically, with no queue.' },
      { title: 'Dedicated with SLA', body: 'Your own AI operation with guaranteed availability, monitoring and fixed response times.' },
      { title: 'Fully integrated', body: 'Connects to your PBX, CRM, ERP and ticketing — leads and appointments land automatically.' },
      { title: 'Outbound at scale', body: 'Recall, reactivation and appointment campaigns across large call lists — fully automated.' },
      { title: 'Multi-site', body: 'Central control across sites, teams and numbers — a single dashboard.' },
      { title: 'Secure & auditable', body: 'SSO, roles & permissions, complete audit logs — ready for regulated industries.' },
    ],
  },
  steps: {
    eyebrow: 'Onboarding',
    headline: 'From audit to dedicated operation.',
    items: [
      { n: '01', title: 'Audit & requirements', body: 'We analyse call volume, peak loads, processes and compliance requirements.' },
      { n: '02', title: 'Integration & scripts', body: 'Connect telephony, CRM/ERP. Voice, scripts and routing in your brand tone.' },
      { n: '03', title: 'Pilot & load test', body: 'Controlled pilot with a load test on peak volume, fine-tuning, sign-off.' },
      { n: '04', title: 'Rollout & operation', body: 'Full rollout with dedicated operation, SLA monitoring and quarterly reviews.' },
    ],
  },
  industriesHead: {
    eyebrow: 'Use cases',
    headline: 'Where call volume is business-critical.',
    subline: 'Pre-configured scripts and routing — tailored to your industry and load profiles.',
  },
  legal: {
    eyebrow: 'Security & compliance',
    headline: 'Enterprise security, legally sound and hosted in Germany.',
    badges: ['EU AI Act', 'GDPR · DPA', 'Servers in DE', 'SSO · audit logs'],
    points: [
      { title: 'EU AI Act ready', body: 'Transparency duty under Art. 50: callers are clearly told, on request, that they are speaking with an AI.' },
      { title: 'GDPR & DPA', body: 'Data processing agreement included, purpose-bound processing, clear deletion concepts.' },
      { title: 'Servers in Germany', body: 'Hosting in Nuremberg, encryption in transit and at rest, no third-country transfer.' },
      { title: 'SSO & audit logs', body: 'Single sign-on, role & permission management and complete audit logs for review and compliance.' },
    ],
  },
  faq: [
    { q: 'How is the SLA guaranteed?', a: 'The Enterprise tier comes with a contractually assured SLA defining availability and response times, 24/7 monitoring and escalation paths.' },
    { q: 'How do you handle load peaks?', a: 'The AI operation is elastic: hundreds of calls run in parallel and peaks are absorbed automatically — no queue, no “please try again later”.' },
    { q: 'Can you connect our existing PBX?', a: 'Yes. We connect existing systems (SIP/trunk) or provision new numbers — including routing across sites and teams.' },
    { q: 'What about security & access?', a: 'SSO, granular role & permission management, encryption and complete audit logs. Servers in Germany, GDPR-compliant, DPA included.' },
    { q: 'Is outbound legally compliant?', a: 'Outbound campaigns run with consent and time-window logic plus an AI transparency notice — aligned with your compliance.' },
    { q: 'How long does onboarding take?', a: 'Audit, integration and a pilot with a load test — depending on integration depth, usually a few weeks to full rollout.' },
    { q: 'Do we get our own numbers & sites?', a: 'Yes — any number of phone numbers and sites, controlled centrally in one dashboard.' },
    { q: 'What does Enterprise cost?', a: 'Individual, based on volume, integration depth and SLA. We work through the business case together — the calculator above gives a first estimate.' },
  ],
  finalCta: {
    eyebrow: 'Enterprise',
    headline: 'Talk to our enterprise team.',
    subline: 'We work through your business case, show the live demo on your load profile and define your SLA.',
    cta: 'Book an enterprise demo',
  },
};

/** Pick the locale-appropriate copy block. */
export function pickCallcenter(en: boolean) {
  return en ? callcenterEn : callcenter;
}
