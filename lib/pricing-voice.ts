// lib/pricing-voice.ts
// Editierbare Datenquelle fuer die KI-Sprachagenten-Preise (Gruppe 1).
// Alle Preise netto. Aenderungen hier wirken sofort in der Pricing-Sektion.

export type VoicePlan = {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: string;
  priceSuffix: string;
  priceNote?: string;
  setup: string;
  idealFor: string;
  features: string[];
  cta: string;
  ctaHref: string;
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
    priceMonthly: '599 €',
    priceSuffix: '/Monat',
    setup: '+ 1.999 € einmalig Setup',
    idealFor: 'Ideal für 1–20 Anrufe/Tag',
    features: [
      'KI-Telefonassistent für deine Rufnummer — rund um die Uhr erreichbar',
      '1.000 Gesprächsminuten/Monat inklusive',
      'Automatische Gesprächs-Transkripte — direkt in dein CRM',
      'Vollautomatische Lead-Erfassung & gepflegte Kontaktlisten',
      '20+ natürliche Stimmen, 25+ Sprachen',
      'Geführtes Onboarding',
    ],
    cta: 'Solo starten',
    ctaHref: '/termin',
  },
  {
    id: 'team',
    name: 'Team',
    tagline: 'Für wachsende Vertriebs- & Serviceteams',
    priceMonthly: '1.499 €',
    priceSuffix: '/Monat',
    setup: '+ 1.999 € einmalig Setup',
    idealFor: 'Ideal für 20–100 Anrufe/Tag',
    features: [
      'Alles aus Solo',
      '3 Rufnummern, 3.000 Minuten/Monat, parallele Anrufe',
      'Outbound-Kampagnen über automatisierte Anruflisten',
      'Automatische Lead-Listen inkl. Anreicherung & Priorisierung',
      'Transkript-→-CRM-Workflows: Termine, Notizen & Follow-ups laufen automatisch',
      'Reporting-Dashboard',
    ],
    cta: 'Team buchen',
    ctaHref: '/termin',
    recommended: true,
  },
  {
    id: 'scale',
    name: 'Scale',
    tagline: 'Enterprise-Grade & voll maßgeschneidert',
    priceMonthly: 'ab 2.499 €',
    priceSuffix: '/Monat',
    priceNote: 'individuell',
    setup: 'Setup individuell',
    idealFor: 'Ab 100 Anrufe/Tag',
    features: [
      'Alles aus Team',
      'Eigene Custom-Stimme, ab 5.000 Minuten',
      'Individuelle Automations-Workflows nach deinen Prozessen',
      'Dedizierter Ansprechpartner & SLA',
      'Höchste Datenschutz-Stufe (keine Datenspeicherung)',
    ],
    cta: 'Beratung anfragen',
    ctaHref: '/termin',
  },
];
