// lib/pricing-voice.ts
// Editierbare Datenquelle fuer die KI-Sprachagenten-Preise (Gruppe 1).
// Alle Preise netto. Aenderungen hier wirken sofort in der Pricing-Sektion.

export type VoicePlan = {
  id: string;
  name: string;
  tagline: string;
  /** English copy for the bilingual (/en) site */
  taglineEn?: string;
  idealForEn?: string;
  featuresEn?: string[];
  ctaEn?: string;
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
  /** Inklusiv-Gesprächsminuten pro Monat (Quelle für den Ersparnis-Rechner) */
  includedMinutes: number;
  /** Preis je Zusatzminute über das Inklusivvolumen, € netto (null = individuell) */
  overagePerMin: number | null;
  /** Obergrenze Anrufe/Tag für die Auto-Empfehlung im Rechner (null = offen) */
  maxCallsPerDay: number | null;
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
    includedMinutes: 1000,
    overagePerMin: 0.29,
    maxCallsPerDay: 15,
    idealFor: 'Ideal für ~1–15 Anrufe/Tag',
    features: [
      'KI-Telefonassistent für deine Rufnummer — rund um die Uhr erreichbar',
      '1.000 Gesprächsminuten/Monat inklusive · jede weitere 0,29 €',
      'Automatische Gesprächs-Transkripte — direkt in dein CRM',
      'Vollautomatische Lead-Erfassung & gepflegte Kontaktlisten',
      '6 Sprachen · DE first',
      'Geführtes Onboarding',
    ],
    cta: 'Solo starten',
    taglineEn: 'The smart entry point for small teams',
    idealForEn: 'Ideal for ~1–15 calls/day',
    featuresEn: [
      'AI phone assistant for your number — reachable around the clock',
      '1,000 talk minutes/month included · €0.29 per extra minute',
      'Automatic call transcripts — straight into your CRM',
      'Fully automatic lead capture & maintained contact lists',
      '6 languages · DE first',
      'Guided onboarding',
    ],
    ctaEn: 'Start with Solo',
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
    includedMinutes: 3000,
    overagePerMin: 0.25,
    maxCallsPerDay: 45,
    idealFor: 'Ideal für ~15–45 Anrufe/Tag',
    features: [
      'Alles aus Solo',
      '3.000 Gesprächsminuten/Monat inkl. (Inbound + Outbound) · jede weitere 0,25 €',
      'Outbound-Kampagnen über automatisierte Anruflisten',
      'Automatische Lead-Listen inkl. Anreicherung & Priorisierung',
      'Transkript-→-CRM-Workflows: Termine, Notizen & Follow-ups laufen automatisch',
      'Reporting-Dashboard · Prioritäts-Support',
    ],
    cta: 'Team buchen',
    taglineEn: 'For growing sales & service teams',
    idealForEn: 'Ideal for ~15–45 calls/day',
    featuresEn: [
      'Everything in Solo',
      '3,000 talk minutes/month incl. (inbound + outbound) · €0.25 per extra minute',
      'Outbound campaigns via automated call lists',
      'Automatic lead lists incl. enrichment & prioritisation',
      'Transcript-to-CRM workflows: meetings, notes & follow-ups run automatically',
      'Reporting dashboard · priority support',
    ],
    ctaEn: 'Book Team',
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
    includedMinutes: 5000,
    overagePerMin: null,
    maxCallsPerDay: null,
    idealFor: 'Ab ~45 Anrufe/Tag',
    features: [
      'Alles aus Team',
      'Custom-Voice (eigene Brand-Stimme)',
      'ab 5.000 Min/Monat · individuell · unbegrenzt skalierbar',
      'Individuelle Automations-Workflows nach deinen Prozessen',
      'Dedizierter Ansprechpartner & SLA',
      'Höchste Datenschutz-Stufe: keine Speicherung über die Verarbeitung hinaus · kein Training auf deinen Daten · EU-Hosting',
    ],
    cta: 'Angebot anfragen',
    taglineEn: 'Enterprise-grade & fully tailored',
    idealForEn: 'From ~45 calls/day',
    featuresEn: [
      'Everything in Team',
      'Custom voice (your own brand voice)',
      'from 5,000 min/month · individual · scales without limit',
      'Custom automation workflows for your processes',
      'Dedicated contact person & SLA',
      'Highest data-protection tier: no storage beyond processing · no training on your data · EU hosting',
    ],
    ctaEn: 'Request a quote',
    ctaHref: '/termin',
    checkoutTier: null,
  },
];
