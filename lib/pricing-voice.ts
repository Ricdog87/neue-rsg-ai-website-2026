// lib/pricing-voice.ts
// Editierbare Datenquelle fuer die KI-Sprachagenten-Preise (Gruppe 1).
// Alle Preise netto. Aenderungen hier wirken sofort in der Pricing-Sektion.

export type VoicePlan = {
  id: string;
  name: string;
  tagline: string;
  /** Monthly price as displayed (formatted string for layout) */
  priceMonthly: string;
  /** Annual price = 15 % off; bei Jahresvorkasse entfällt das Setup */
  priceAnnual: string;
  /** Numeric values for JSON-LD / Stripe (€ netto) */
  monthlyValue: number | null;
  annualValue: number | null;
  priceSuffix: string;
  priceNote?: string;
  /** Setup as displayed when monthly billing */
  setup: string;
  /** Setup value in € netto (null = Scale individuell) */
  setupValue: number | null;
  idealFor: string;
  features: string[];
  cta: string;
  /** Used as fallback when Stripe isn't configured. Solo/Team trigger /api/checkout. */
  ctaHref: string;
  /** Stripe checkout tier identifier — null = sales-led */
  checkoutTier: 'solo' | 'team' | null;
  recommended?: boolean;
};

export const voiceGroup = {
  eyebrow: 'Neu · KI-Sprachagenten',
  headline: 'Dein Telefon, das nie unbesetzt ist.',
  subline: 'Drei Stufen — vom smarten Einstieg bis Enterprise.',
};

export const voicePlans: VoicePlan[] = [
  {
    id: 'solo',
    name: 'Solo',
    tagline: 'Der smarte Einstieg für kleine Teams',
    priceMonthly: '199 €',
    priceAnnual: '169 €',
    monthlyValue: 199,
    annualValue: 169,
    priceSuffix: '/Monat',
    setup: '+ 490 € einmalig Setup',
    setupValue: 490,
    idealFor: 'Ideal für 1–20 Anrufe/Tag',
    features: [
      'KI-Telefonassistent für deine Rufnummer — rund um die Uhr erreichbar',
      '500 Gesprächsminuten/Monat inklusive · ⚠️ TBD',
      'Automatische Gesprächs-Transkripte — direkt in dein CRM',
      'Vollautomatische Lead-Erfassung & gepflegte Kontaktlisten',
      '6 Sprachen · DE first',
      'Geführtes Onboarding',
    ],
    cta: 'Solo starten',
    ctaHref: '/termin',
    checkoutTier: 'solo',
  },
  {
    id: 'team',
    name: 'Team',
    tagline: 'Für wachsende Vertriebs- & Serviceteams',
    priceMonthly: '499 €',
    priceAnnual: '424 €',
    monthlyValue: 499,
    annualValue: 424,
    priceSuffix: '/Monat',
    setup: '+ 990 € einmalig Setup',
    setupValue: 990,
    idealFor: 'Ideal für 20–100 Anrufe/Tag',
    features: [
      'Alles aus Solo',
      '2 Rufnummern · 2.000 Min Inbound + 500 Min Outbound · ⚠️ TBD',
      'Outbound-Kampagnen über automatisierte Anruflisten',
      'Automatische Lead-Listen inkl. Anreicherung & Priorisierung',
      'Transkript-→-CRM-Workflows: Termine, Notizen & Follow-ups laufen automatisch',
      'Reporting-Dashboard · Prioritäts-Support',
    ],
    cta: 'Team buchen',
    ctaHref: '/termin',
    checkoutTier: 'team',
    recommended: true,
  },
  {
    id: 'scale',
    name: 'Scale',
    tagline: 'Enterprise-Grade & voll maßgeschneidert',
    priceMonthly: 'Auf Anfrage',
    priceAnnual: 'Auf Anfrage',
    monthlyValue: null,
    annualValue: null,
    priceSuffix: '',
    priceNote: 'individuell',
    setup: 'Setup ab 1.990 € · individuell',
    setupValue: null,
    idealFor: 'Ab 100 Anrufe/Tag',
    features: [
      'Alles aus Team',
      'Custom-Voice (eigene Brand-Stimme)',
      'Unbegrenzte Rufnummern + Minuten · ⚠️ TBD',
      'Individuelle Automations-Workflows nach deinen Prozessen',
      'Dedizierter Ansprechpartner & SLA',
      'Höchste Datenschutz-Stufe: keine Speicherung über die Verarbeitung hinaus · kein Training auf deinen Daten · EU-Hosting',
    ],
    cta: 'Angebot anfragen',
    ctaHref: '/termin',
    checkoutTier: null,
  },
];
