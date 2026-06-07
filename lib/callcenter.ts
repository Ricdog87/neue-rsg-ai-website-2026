// lib/callcenter.ts
// Single source of truth for the /ki-callcenter page: tariffs, contract
// terms, industries, the ROI calculator logic + copy. Prices are net (zzgl.
// USt.). Booking CTA reuses the site-wide meeting URL (site.cta.meetingUrl).

export type TermId = 'flex' | '12m' | '24m';
export type TariffId = 's' | 'm' | 'l';
export type Mode = 'inbound' | 'outbound' | 'both';

export type Term = {
  id: TermId;
  label: string;
  sub: string;
  /** Multiplier applied to the monthly price */
  monthlyFactor: number;
  /** Multiplier applied to the setup fee */
  setupFactor: number;
  badge?: string;
};

export const TERMS: Term[] = [
  { id: 'flex', label: 'Flexibel', sub: 'monatlich kündbar', monthlyFactor: 1, setupFactor: 1 },
  { id: '12m', label: '12 Monate', sub: '−10 % · Einrichtung 50 %', monthlyFactor: 0.9, setupFactor: 0.5, badge: 'beliebt' },
  { id: '24m', label: '24 Monate', sub: '−15 % · keine Einrichtung', monthlyFactor: 0.85, setupFactor: 0 },
];

export type Tariff = {
  id: TariffId;
  name: string;
  monthly: number; // € netto / Monat (Listenpreis, Flexibel)
  setup: number; // € netto Einrichtung (Flexibel)
  minutes: number; // inklusive Gesprächsminuten / Monat
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
      'DSGVO · Server in Deutschland',
    ],
  },
  {
    id: 'm',
    name: 'Callcenter M',
    monthly: 1990,
    setup: 2990,
    minutes: 4000,
    tagline: 'Inbound + Outbound, wachsendes Volumen',
    popular: true,
    features: [
      '~4.000 Gesprächsminuten / Monat inkl.',
      'Inbound + Outbound-Kampagnen',
      'Viele parallele Gespräche gleichzeitig',
      'Automatische Follow-ups & Recall-Listen',
      'Reporting-Dashboard · Prioritäts-Support',
    ],
  },
  {
    id: 'l',
    name: 'Callcenter L',
    monthly: 3990,
    setup: 4990,
    minutes: 8000,
    tagline: 'Dedizierte Operation, hohes Volumen',
    features: [
      '~8.000 Gesprächsminuten / Monat inkl.',
      'Dedizierte KI-Operation für hohes Volumen',
      'Custom-Voice & Branchen-Skripte',
      'Multi-Standort & Multi-Team',
      'Dedizierter Ansprechpartner & SLA',
    ],
  },
];

/** Final price for a tariff under a contract term. */
export function priceFor(tariff: Tariff, term: Term) {
  return {
    monthly: Math.round(tariff.monthly * term.monthlyFactor),
    setup: Math.round(tariff.setup * term.setupFactor),
  };
}

/** Recommend a tariff from the projected monthly minutes. */
export function recommendTariff(minutesMonth: number): Tariff {
  if (minutesMonth <= TARIFFS[0].minutes) return TARIFFS[0];
  if (minutesMonth <= TARIFFS[1].minutes) return TARIFFS[1];
  return TARIFFS[2];
}

// ── Industries ────────────────────────────────────────────────
export type Industry = {
  id: string;
  label: string;
  blurb: string;
  /** Default average order/lead value for the calculator (€) */
  orderValue: number;
};

export const INDUSTRIES: Industry[] = [
  { id: 'handwerk', label: 'Handwerk', blurb: 'Jeder verpasste Anruf ist ein verlorener Auftrag — die KI nimmt ihn an.', orderValue: 800 },
  { id: 'hausverwaltung', label: 'Hausverwaltung', blurb: 'Mieter-Anliegen 24/7 aufnehmen, qualifizieren, weiterleiten.', orderValue: 300 },
  { id: 'reinigung', label: 'Gebäudereinigung', blurb: 'Anfragen annehmen und Vor-Ort-Termine automatisch vereinbaren.', orderValue: 600 },
  { id: 'arzt', label: 'Arztpraxen', blurb: 'Terminvergabe & Rückfragen ohne dauerbesetztes Telefon.', orderValue: 120 },
  { id: 'gastro', label: 'Gastronomie', blurb: 'Reservierungen entgegennehmen, auch wenn das Team im Service ist.', orderValue: 90 },
  { id: 'immobilien', label: 'Immobilien', blurb: 'Exposé-Anfragen sofort qualifizieren und Besichtigungen buchen.', orderValue: 1500 },
  { id: 'ecommerce', label: 'E-Commerce', blurb: 'Bestell- & Service-Anrufe rund um die Uhr beantworten.', orderValue: 150 },
  { id: 'b2b', label: 'B2B-Vertrieb', blurb: 'Inbound-Leads in Sekunden qualifizieren, Outbound-Listen abtelefonieren.', orderValue: 2500 },
  { id: 'kanzlei', label: 'Kanzleien', blurb: 'Mandanten-Erstkontakt aufnehmen und sauber vorqualifizieren.', orderValue: 900 },
];

// ── Calculator ────────────────────────────────────────────────
export const CALC_DEFAULTS = {
  callsPerDay: 40,
  mode: 'both' as Mode,
  missedPct: 50, // % aktuell verpasster Anrufe
  orderValue: 400, // € Ø Auftrags-/Leadwert
  industryId: 'b2b',
  // advanced
  durationMin: 4,
  closeRatePct: 15,
  agentCost: 3000, // € Vollkosten menschl. Agent / Monat
};

export const CALC_CONSTANTS = {
  workdays: 22,
  minutesPerFte: 1100, // produktive Gesprächsminuten pro FTE / Monat
};

// ── Page copy ─────────────────────────────────────────────────
export const callcenter = {
  hero: {
    eyebrow: 'KI-Callcenter · Inbound & Outbound',
    headline: ['Nie wieder einen Anruf', 'verpassen. Nie wieder', 'einen Kunden verlieren.'],
    subline:
      'Dein KI-Callcenter nimmt jeden Anruf an, ruft Leads proaktiv zurück und führt Hunderte Gespräche gleichzeitig — 24/7, in natürlichem Deutsch, direkt in dein CRM.',
    primaryCta: 'Kostenlose Demo buchen',
    secondaryCta: 'Ersparnis berechnen',
    trust: ['Server in Deutschland', 'DSGVO-konform', 'EU AI Act ready', '24/7 erreichbar'],
  },
  problem: {
    eyebrow: 'Das Problem',
    headline: 'Jeder verpasste Anruf ist ein verlorener Umsatz.',
    stats: [
      { value: '60 %', label: 'der Anrufe bleiben im KMU unbeantwortet — Feierabend, Urlaub, Stoßzeiten.' },
      { value: '85 %', label: 'der Anrufer, die in der Warteschleife landen, rufen kein zweites Mal an.' },
      { value: '∞', label: 'Fachkräftemangel: Telefondienst ist teuer, schwer zu besetzen, ständig krank.' },
    ],
    body:
      'Dein Telefon klingelt — aber niemand hebt ab. Der Interessent ruft beim Wettbewerber an. Du erfährst nie davon. Tag für Tag versickert so planbarer Umsatz, weil Erreichbarkeit an Menschen, Arbeitszeiten und Kapazität hängt.',
  },
  solution: {
    eyebrow: 'Die Lösung',
    headline: 'Ein Callcenter, das nie schläft, nie krank ist, nie besetzt ist.',
    subline:
      'Kein Anrufbeantworter. Eine KI, die zuhört, versteht, antwortet und handelt — für Inbound und Outbound.',
    points: [
      { title: '24/7 Inbound', body: 'Jeder Anruf wird beim ersten Klingeln angenommen — auch nachts, am Wochenende, an Feiertagen.' },
      { title: 'Outbound auf Knopfdruck', body: 'Leads zurückrufen, Recall-Kampagnen, Termin-Erinnerungen — automatisiert über Anruflisten.' },
      { title: 'Unbegrenzt parallel', body: 'Hunderte Gespräche gleichzeitig. Keine Warteschleife, kein „bitte später erneut versuchen".' },
      { title: 'In Minuten startklar', body: 'Anbindung an deine Rufnummer, dein CRM, deine Prozesse — live in Tagen statt Monaten.' },
    ],
  },
  steps: {
    eyebrow: 'So funktioniert’s',
    headline: 'In vier Schritten live.',
    items: [
      { n: '01', title: 'Einrichtung & Anbindung', body: 'Wir verbinden Rufnummer, CRM und deine wichtigsten Abläufe. Stimme und Skript in deinem Markenton.' },
      { n: '02', title: 'Go-live', body: 'Kurzer Testlauf, Feinschliff, Freigabe — dann geht dein KI-Callcenter in den Wirkbetrieb.' },
      { n: '03', title: 'KI nimmt an / ruft raus', body: 'Inbound-Anrufe werden beantwortet, Outbound-Listen abtelefoniert — rund um die Uhr.' },
      { n: '04', title: 'Leads & Termine ins CRM', body: 'Qualifizierte Leads, Termine und Gesprächsnotizen landen automatisch bei deinem Team.' },
    ],
  },
  industriesHead: {
    eyebrow: 'Branchen',
    headline: 'Gebaut für Betriebe, bei denen das Telefon Umsatz ist.',
    subline: 'Vorkonfigurierte Skripte und Abläufe — angepasst auf deine Branche.',
  },
  legal: {
    eyebrow: 'Recht & Vertrauen',
    headline: 'Rechtssicher, transparent, in Deutschland gehostet.',
    points: [
      { title: 'EU AI Act ready', body: 'Transparenzpflicht nach Art. 50: Anrufer werden auf Wunsch klar darüber informiert, dass sie mit einer KI sprechen.' },
      { title: 'DSGVO & AVV', body: 'Auftragsverarbeitungsvertrag inklusive. Daten werden nur zweckgebunden verarbeitet.' },
      { title: 'Server in Deutschland', body: 'Hosting in Nürnberg. Keine Weitergabe in unsichere Drittländer.' },
      { title: 'Du besitzt deine Daten', body: 'Gesprächsdaten, Transkripte und Konfiguration gehören dir — jederzeit exportierbar.' },
    ],
  },
  faq: [
    { q: 'Klingt die KI wirklich menschlich?', a: 'Ja. Natürliche Stimme, natürlicher Sprech-Rhythmus, Antwort in unter einer Sekunde. Die meisten Anrufer merken den Unterschied nicht — und auf Wunsch sagen wir transparent, dass es eine KI ist.' },
    { q: 'Was passiert bei komplexen Anliegen?', a: 'Die KI klärt Standardfälle selbst und eskaliert saubere, vollständige Übergaben an den richtigen Menschen — inklusive Kontext und Gesprächsnotiz.' },
    { q: 'Wie schnell sind wir live?', a: 'In der Regel innerhalb weniger Tage. Einrichtung, Anbindung und ein kurzer Testlauf — dann Go-live.' },
    { q: 'Ist das kündbar?', a: 'Ja. Im Tarif „Flexibel" monatlich kündbar. Bei 12/24 Monaten gibt es dafür Rabatt und reduzierte bzw. entfallende Einrichtung.' },
    { q: 'Wie steht es um den Datenschutz?', a: 'DSGVO-konform, AVV inklusive, Server in Deutschland (Nürnberg), keine Drittland-Weitergabe. Aufzeichnung nur mit Hinweis.' },
    { q: 'Bekomme ich eine eigene Rufnummer?', a: 'Ja — entweder eine neue Rufnummer oder wir binden deine bestehende Telefonanlage an.' },
    { q: 'Funktioniert Outbound auch?', a: 'Ja. Die KI telefoniert Anruflisten ab: Rückrufe, Recalls, Termin-Erinnerungen, Reaktivierung — vollautomatisch.' },
    { q: 'Was kostet der Einstieg?', a: 'Tarife ab 990 €/Monat netto. Bei Jahresvorkasse entfällt die Einrichtungsgebühr. Den ROI rechnest du oben im Kalkulator durch.' },
  ],
  finalCta: {
    eyebrow: 'Bereit?',
    headline: 'Buche deine kostenlose Live-Demo.',
    subline: 'Hör live, wie dein KI-Callcenter klingt — und wir rechnen deinen Business-Case gemeinsam durch.',
    cta: 'Kostenlose Demo buchen',
  },
} as const;
