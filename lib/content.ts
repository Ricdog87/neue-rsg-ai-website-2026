/**
 * Single source of truth for all section copy.
 *
 * Edited under a "senior SEO + storytelling + painpoint" pass:
 * - Headlines hook with the visceral pain first, promise second.
 * - Every section follows Problem → Agitate → Solve (PAS).
 * - Keywords woven naturally: "KI-Agent", "KI Automatisierung Vertrieb",
 *   "KI Mittelstand", "DSGVO KI", "ChatGPT Vertrieb", "n8n Workflow",
 *   "LangChain LangGraph", "AI Agent Deutschland".
 * - All German you-form ("du") for warm + direct B2B-Mittelstand tone.
 *
 * Shape is preserved so no component breaks — only values changed,
 * a few additive keys (techExplainer.painByMode, problems.stats, etc.).
 */

export const site = {
  name: 'RSG Agent Services',
  shortName: 'RSGAI',
  tagline: 'KI-Agenten, die wirklich arbeiten',
  positioning:
    'Deutschlands erste KI-Agentur aus dem Vertrieb — bauen, betreiben, liefern.',
  url: 'https://www.rsg-ai.de',
  contact: {
    email: 'hello@rsg-ai.de',
    phone: '+49 176 60772556',
    phoneHref: 'tel:+4917660772556',
    city: 'Wiesbaden, Deutschland',
    hours: 'Mo–Fr · 9:00–18:00 Uhr'
  },
  cta: {
    primary: 'Demo anfragen',
    secondary: 'Einsparpotenzial berechnen',
    meetingUrl: '/termin'
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/113145138/',
    instagram: 'https://www.instagram.com/rsg_ai_automation/',
    youtube: 'https://www.youtube.com/@ricardo_builds_ai'
  },
  /** Newsletter funnel — dual-track (LinkedIn primary + own email capture). */
  newsletter: {
    linkedinUrl:
      'https://www.linkedin.com/newsletters/mittelstand-automatisiert-7458498915005431808/',
    leadMagnet: 'roi-checkliste-ki-agent',
    leadMagnetTitle: 'KI-Agent · ROI-Checkliste',
    leadMagnetSub:
      '12 harte Fragen — am Ende weißt du, ob ein KI-Agent dein Geschäft wirklich beschleunigt.',
    fromEmail: 'RSG AI <hello@rsg-ai.de>'
  },
  legal: {
    company: 'RSG Recruiting Solutions Group GmbH',
    brandName: 'RSG AI',
    brandNote: 'RSG AI ist eine Marke der RSG Recruiting Solutions Group GmbH.',
    hrb: 'HRB 35951',
    imprintUrl: '/impressum',
    privacyUrl: '/datenschutz',
    termsUrl: '/agb'
  }
} as const;

export const nav = [
  { label: 'Telefonassistentin', href: '/ki-telefonassistent' },
  { label: 'Preise', href: '/preise' },
  { label: 'Cases', href: '/cases' },
  { label: 'Insights', href: '/insights' },
  { label: 'Termin', href: '/termin' }
] as const;

/* ─────────────────────────────────────────────────────────
   HERO — Hook: "Dein Vertrieb arbeitet. Aber zu 70 % falsch."
   ───────────────────────────────────────────────────────── */
export const hero = {
  eyebrow: 'KI-Telefonassistentin · Werkstatt für den Vertrieb',
  headlineKinetic: [
    'KI-Agenten,',
    'die ans Telefon gehen —',
    'und verkaufen.'
  ],
  // Used as a refined sub-statement below the headline
  subStatement: 'Live in vier Wochen — nicht in vier Quartalen.',
  subline:
    'Deine KI-Telefonassistentin nimmt jeden Anruf an, qualifiziert Leads und bucht Termine — 24/7, in natürlichem Deutsch, eingebunden in dein CRM. Aufnahme aktuell für Kohorte 06 (Q3 2026).',
  ctaPrimary: 'Erstgespräch',
  ctaSecondary: 'Telefonassistentin ansehen',
  trustChips: [
    '4 Wochen bis Live',
    'DSGVO · EU-Server',
    '12+ Agenten in Produktion',
    '312 % Ø ROI nach 4 Monaten',
    'Hosting in Deutschland'
  ]
} as const;

/* ─────────────────────────────────────────────────────────
   VOICE AGENTS — Highlight-Sektion „JETZT NEU"
   Echte Telefon-Stimmen, die qualifizieren, beraten, verkaufen.
   ───────────────────────────────────────────────────────── */
export const voiceAgents = {
  badge: 'Jetzt neu · ab Q3 2026',
  eyebrow: 'RSG AI · Voice-Suite',
  headline: 'Dein Telefon-Agent, der nie schläft.',
  subheadline:
    'Eingehende Anrufe annehmen. Anliegen klären. Termine direkt setzen. In natürlichem Deutsch — mit deinem Markenton, deinem CRM, deiner Sprechweise.',
  subline:
    'Echte Gespräche, kein Voice-Mail-Roboter. Trainiert auf deine Cases, eingebunden in dein CRM oder deine bestehende Telefonanlage. Hosting in Deutschland (Nürnberg), DSGVO- und EU-AI-Act-konform.',
  /** Konkrete, belegte Vertrauens-Anker — werden über trustRow ausgespielt. */
  trustChips: [
    'Server in Nürnberg · DE',
    'DSGVO + EU AI Act',
    '6 Sprachen · DE first',
    '< 10 Min eingerichtet',
    '24/7 · niemand wartet',
  ],
  /** Bewährte Use-Cases nach Branchen — für die Branchen-Marquee. */
  industries: [
    'Arztpraxen',
    'Zahnärzte',
    'Physiotherapeuten',
    'Hotels',
    'Handwerker',
    'Anwälte',
    'Hausverwaltungen',
    'Autohäuser',
    'Steuerberater',
    'Restaurants',
    'Immobilienmakler',
    'Apotheken',
    'Recruiter',
    'Einzelhandel',
  ],
  offers: [
    {
      id: 'inbound-termin',
      tag: 'Service · Inbound',
      title: 'Termin- & Reservierungs-Assistent',
      tagline: 'Anrufer nennen ihren Wunsch — der Agent bucht direkt.',
      body:
        'Terminvereinbarung, Reservierung, Status-Rückfrage: Der Agent nimmt den Anruf entgegen, prüft live deine Verfügbarkeit und trägt den Termin direkt in Kalender oder CRM ein. Kein Telefon-Tag, keine vergessene Rückmeldung — der Anrufer hat seinen Slot, bevor er aufgelegt hat.',
      kpi: { value: '24/7', label: 'Termine rund um die Uhr · ohne Personal' },
      bullets: [
        'Live-Verfügbarkeit aus Kalender/CRM',
        'Bucht, verschiebt & storniert im Gespräch',
        'Bestätigung per SMS/E-Mail automatisch',
        'Übergabe an Mensch bei Sonderfällen',
      ],
    },
    {
      id: 'inbound',
      tag: 'Service · Inbound',
      title: 'Empfangs-Assistent',
      tagline: 'Sie hebt ab. Beim ersten Klingeln. Immer.',
      body:
        'Kein „Drücken Sie die 1"-Menü. Keine Warteschleife. Der Agent nimmt jeden Anruf an, klärt das Anliegen, leitet sauber weiter oder löst Standard-Fragen sofort. Aus 60 % Tier-1-Anfragen werden 0 — der Rest landet beim richtigen Menschen mit vollem Kontext.',
      kpi: { value: '< 1 Sek.', label: 'Annahme · keine Warteschleife' },
      bullets: [
        '6 Sprachen: DE · EN · FR · IT · PL · PT',
        'Erkennt VIP-Kunden + priorisiert',
        'Termin-Buchung direkt im Gespräch',
        'Voicemail-Transkript per E-Mail',
      ],
    },
    {
      id: 'custom',
      tag: 'Custom · Enterprise',
      title: 'Custom Voice-Agent',
      tagline: 'Dein Use-Case. Deine Stimme. Dein Workflow.',
      body:
        'Recall-Kampagnen, Mahnwesen, Termin-Erinnerungen, Bestandskunden-Recovery — wir bauen den Agenten auf deinen exakten Prozess. Inklusive Stimm-Klon (mit Consent), Integrationen in jede CRM-/ERP-Welt und Compliance-Logging für regulierte Branchen.',
      kpi: { value: '4 Wochen', label: 'bis Go-Live · Festpreis' },
      bullets: [
        'Stimm-Klon optional · mit Consent-Workflow',
        'Compliance-Logging für regulierte Branchen',
        'Eigene Rufnummer oder Anbindung deiner Anlage',
        'WhatsApp- + SMS-Hand-off als Add-On',
      ],
    },
  ],
  /** Live-Demo-Anruf — echte gehosteter Empfangs-Assistent (Christian). */
  liveDemo: {
    eyebrow: 'Live-Demo · echte Stimme',
    claim: 'Der Agent, der nie schläft.',
    headline: 'Hör live, was wir bauen.',
    subline:
      'Ruf jetzt unseren Empfangs-Assistenten an. Sie nimmt ab beim ersten Klingeln. Echte Stimme, echte Antworten, in unter 0,4 Sekunden — wie für deine eigene Hotline.',
    phoneDisplay: '+49 30 826 83906',
    phoneHref: 'tel:+493082683906',
    phoneLabel: 'RSG KI Empfangs-Assistent · live',
    callCta: 'Jetzt anrufen',
    copyCta: 'Nummer kopieren',
    copyConfirm: 'Nummer kopiert — wähl jetzt an',
    disclaimer:
      'Keine Aufzeichnung. Mo–Fr 9–18 Uhr beste Hörqualität.',
    callerHint:
      'Live mit „Christian" — Senior-Sales-Tonalität, kennt rsg-ai.de und pitcht im Gespräch den Buchungslink.',
    counterTemplate: 'Heute schon · CALLS · live beantwortet',
    counterValue: '47',
    trustStrip: [
      { icon: 'zap', label: '0,4 s Reaktion' },
      { icon: 'server', label: 'Server in Nürnberg' },
      { icon: 'shield', label: 'DSGVO + EU AI Act' },
      { icon: 'languages', label: '6 Sprachen · DE first' },
      { icon: 'infinity', label: '24/7 verfügbar' },
    ],
    footer:
      'Sie sprechen mit einem echten KI-Agenten, gebaut auf demselben Stack, den wir für Mittelständler ausrollen. Wenn Sie den Unterschied zu einem Menschen nicht hören, hört ihn auch Ihr Kunde nicht.',
  },
  /** Quantifizierte Kunden-Outcomes — werden in der „Proof-Row" angezeigt. */
  proofPoints: [
    { value: '30h-Stelle', label: 'eingespart pro Agent · Ø Mittelstand' },
    { value: '200+', label: 'Voice-Agenten online & in Wartung' },
    { value: '9.000 Calls/Mo.', label: 'Spitzenkunden-Volumen verarbeitet' },
    { value: '4,9 / 5', label: 'Ø Bewertung · Trustpilot · Google · OMR' },
  ],
  cta: {
    primary: 'Live-Demo anhören',
    primaryHref: '#contact',
    secondary: 'Erstgespräch buchen',
    secondaryHref: '/termin',
    note: 'Du hörst im Erstgespräch einen echten Agenten live — und entscheidest selbst, ob du den Unterschied zu einem Menschen hörst.',
  },
} as const;

export const liveStats = [
  { value: '1.247', label: 'Tasks/Tag' },
  { value: '0.8s', label: 'Ø Reaktion' },
  { value: '38K€', label: 'Ø Ersparnis p.a.' },
  { value: '312%', label: 'Ø ROI · 4 Mo.' },
  { value: '99.9%', label: 'Uptime EU' },
  { value: '12+', label: 'Live-Agenten' }
] as const;

/* ─────────────────────────────────────────────────────────
   SOLUTIONS — How we solve it. Outcome-first.
   ───────────────────────────────────────────────────────── */
export const solutions = {
  eyebrow: 'Wie wir liefern',
  headline: 'Vier Schritte. Vier Wochen. Live.',
  subline:
    'Kein Strategie-Deck. Kein Pilot in Q3. Bauen, integrieren, betreiben.',
  steps: [
    {
      title: 'Prozess-Audit in 60 Minuten.',
      body: '3 Prozesse mit größtem Hebel identifizieren. 1 Roadmap-Seite. Kein 80-Seiten-Deck.'
    },
    {
      title: 'Maßgeschneidert auf LangChain / LangGraph.',
      body: 'Kein Standard-Tool. Dein Agent kennt deine Systeme, deine Sprache, deine Edge-Cases.'
    },
    {
      title: 'EU-Cloud · 24/7-Monitoring.',
      body: 'DSGVO-konformes Hosting in Deutschland. Echtzeit-Dashboards. Automatische Alerts.'
    },
    {
      title: 'CRM-Integration ohne IT-Ticket.',
      body: 'Dein CRM-System · Team-Chat. Tag 1 produktiv.'
    }
  ],
  cta: 'Termin buchen',
  pipeline: {
    title: 'Sales-Agent · live',
    status: 'active',
    timeSaved: '∅ 38 Minuten pro Lead',
    steps: [
      { n: '01', title: 'Lead trifft ein', detail: 'Web-Formular · LinkedIn · CRM' },
      { n: '02', title: 'KI-Agent qualifiziert', detail: 'Firmenprofil · Score · Intent' },
      { n: '03', title: 'CRM-Datensatz automatisch', detail: 'Dein CRM-System' },
      { n: '04', title: 'Vertrieb benachrichtigt', detail: 'Team-Chat · E-Mail' },
      { n: '05', title: 'Termin gebucht', detail: 'Kalender' }
    ]
  }
} as const;

/* ─────────────────────────────────────────────────────────
   ROI — With painpoint per department.
   ───────────────────────────────────────────────────────── */
export const roi = {
  eyebrow: 'Rentabilitätskalkulator',
  headline: 'Rechne nach, was dich dein manueller Prozess wirklich kostet.',
  subline:
    'Klick die Abteilungen an, die in deinem Unternehmen am meisten Zeit verlieren. Wir zeigen dir live, wieviel ein KI-Agent dir pro Jahr zurückbringt — und nach wieviel Monaten er sich amortisiert hat.',
  hint: 'Werte basieren auf realen Implementierungen bei Mittelständlern (50–300 MA).',
  departments: [
    {
      id: 'telefon',
      label: 'Telefon & Empfang',
      body: 'Anrufannahme, Terminvergabe, Auskunft & Weiterleitung',
      pain: 'Jeder verpasste Anruf ist ein verlorener Kunde — niemand nimmt ab',
    },
    {
      id: 'recruiting',
      label: 'Recruiting',
      body: 'Screening, Erstansprache, Interview-Scheduling',
      pain: 'Recruiter verschwenden 60 % des Tages mit Mail-Pingpong'
    },
    {
      id: 'marketing',
      label: 'Marketing',
      body: 'Content-Erstellung, Social, Kampagnen-Reporting',
      pain: 'Content-Engpass blockiert deine Lead-Maschine'
    },
    {
      id: 'accounting',
      label: 'Buchhaltung',
      body: 'Rechnungsverarbeitung, Mahnwesen, Reports',
      pain: 'Belege manuell tippen kostet 6+ Stunden pro Woche'
    },
    {
      id: 'sales',
      label: 'Sales / Vertrieb',
      body: 'Lead-Qualifizierung, Follow-ups, CRM-Pflege',
      pain: 'Top-Performer verkaufen nur 30 % ihrer Arbeitszeit'
    },
    {
      id: 'bd',
      label: 'Business Development',
      body: 'Marktanalyse, Wettbewerbsmonitoring, Outreach',
      pain: 'Research dauert Tage — der Markt ändert sich in Stunden'
    },
    {
      id: 'support',
      label: 'Kundenservice',
      body: 'Tickets, FAQ, Chat — alles, was nach Tier-1 schreit',
      pain: 'Montagmorgen-Stau erschöpft dein bestes Support-Team'
    },
    {
      id: 'consulting',
      label: 'Beratung / Consulting',
      body: 'Research, Präsentationen, Dokumentation',
      pain: 'Senior-Stunden gehen für Recherche & Folien drauf'
    },
    {
      id: 'it',
      label: 'IT / Administration',
      body: 'Helpdesk, Monitoring, Dokumentation',
      pain: 'IT ertrinkt im Tickets-Backlog statt zu modernisieren'
    }
  ],
  result: {
    savingsLabel: 'Geschätztes Einsparpotenzial',
    roiLabel: 'bis ROI erreicht',
    perYear: 'pro Jahr · konservative Schätzung',
    empty: 'Wähle mindestens eine Abteilung — und sieh die Zahl, die dein CFO sehen sollte.',
    cta: 'Diese Zahl mit Ricardo besprechen'
  },
  /**
   * Conversion factors used to translate annual € savings into more
   * tangible buckets (hours of senior time, content pieces, etc.).
   * Numbers are deliberately conservative.
   */
  visual: {
    hourlyRate: 65,
    comparison: {
      manualLabel: 'Heute · manuell',
      manualHint: '100 % Personalkosten · 0 % Skalierung',
      aiLabel: 'Mit KI-Agent',
      aiHint: 'KI übernimmt Routine · Mensch macht Mensch-Arbeit',
      reductionLabel: 'Aufwandsreduktion'
    },
    timeLabel: 'Stunden zurückgewonnen pro Monat',
    projectionLabel: '5-Jahres-Projektion · kumulierte Ersparnis',
    projectionYears: [1, 2, 3, 4, 5],
    /** Investment-vs-output break-even calc — Senior BD framing */
    breakeven: {
      eyebrow: 'Investment vs. Ertrag · Break-Even-Punkt',
      headline: 'Ab welchem Tag ist dein KI-Agent bezahlt?',
      subline:
        'Senior-BD-Frage: Wie schnell holt sich dein Invest wieder rein? Hier ist die ehrliche Linie — unsere Investition gegen den Umsatz, der dir gerade in deinen manuellen Prozessen verloren geht.',
      tiers: [
        { id: 'workflow', label: 'Automatische Workflows',  price: 2500 },
        { id: 'agent',    label: 'KI-Agent Autonom',         price: 5000 }
      ],
      investLabel: 'Einmaliges Invest',
      monthlySavingsLabel: 'Verloren · Monat',
      breakevenLabel: 'Break-Even nach',
      netLabel: 'Netto-Plus · 12 Monate',
      manualLineLabel: 'Investment',
      aiLineLabel: 'Kumulierte Ersparnis',
      footer: 'Jede Woche, die du wartest, ist eine Woche, in der dein Wettbewerber automatisiert.'
    },
    equivalents: [
      { threshold: 30000, icon: '👤', label: 'Senior-Mitarbeiter Vollzeit', divisor: 65000 },
      { threshold: 15000, icon: '📣', label: 'Marketing-Kampagnen', divisor: 4500 },
      { threshold: 10000, icon: '🏖️', label: 'Wochen Team-Urlaub', divisor: 8000 },
      { threshold: 5000,  icon: '💻', label: 'Senior-Workshops', divisor: 3500 }
    ]
  }
} as const;

/* ─────────────────────────────────────────────────────────
   VOICE-PRICING — Solo / Team / Scale (Subscription-Model).
   Setup-Gebühr per Tier · bei Jahresvorkasse entfällt Solo/Team.
   ───────────────────────────────────────────────────────── */
export const voicePricing = {
  annualDiscount: 0.15, // 15 % off bei jährlicher Vorkasse
  setup: { solo: 490, team: 990, scale: 1990 },
  reassurance: [
    'DSGVO · EU-Hosting (Nürnberg)',
    'Monatlich kündbar',
    '30-Tage-SLA',
    'Du besitzt deine Daten',
  ],
  tiers: [
    {
      id: 'solo',
      name: 'Solo',
      tagline: 'Der smarte Einstieg.',
      monthly: 199,
      annual: 169, // 199 × 0.85 ≈ 169
      bestFor: 'Selbstständige · Solo-Berater · 1-Person-Setups',
      features: [
        '1 Rufnummer inklusive',
        '1.000 Min/Monat inkl. · jede weitere 0,29 €',
        'Transkripte ins CRM',
        'Geführtes Onboarding',
        'Mo–Fr Standard-Support',
      ],
      ctaLabel: 'Solo starten',
      ctaEvent: 'checkout_started',
      recommended: false,
    },
    {
      id: 'team',
      name: 'Team',
      tagline: 'Alles aus Solo + Volumen + Outbound.',
      monthly: 499,
      annual: 424, // 499 × 0.85 ≈ 424
      bestFor: 'Teams · KMU mit Vertriebs- oder Support-Calls',
      features: [
        '2 Rufnummern inklusive',
        '3.000 Min/Monat inkl. (Inbound + Outbound) · jede weitere 0,25 €',
        'Outbound-Kampagnen (Reaktivierung, Follow-ups)',
        'Wöchentliches Reporting',
        'Prioritäts-Support',
      ],
      ctaLabel: 'Team buchen',
      ctaEvent: 'checkout_started',
      recommended: true,
    },
    {
      id: 'scale',
      name: 'Scale',
      tagline: 'Custom-Voice + individuelle Workflows.',
      monthly: null, // Preis auf Anfrage
      annual: null,
      bestFor: 'Größere Teams · Mehrstandort · spezielle Compliance',
      features: [
        'Custom-Voice (Brand-Stimme)',
        'ab 5.000 Min/Monat · individuell · unbegrenzt skalierbar',
        'Individuelle Workflows + n8n/LangGraph-Integration',
        'Dediziertes SLA + Slack-Support',
        'Quartalsweise Roadmap-Review',
      ],
      ctaLabel: 'Angebot anfragen',
      ctaEvent: 'booking_clicked',
      ctaHref: '/termin',
      recommended: false,
    },
  ],
  footnote:
    'Alle Preise zzgl. MwSt. · Setup-Gebühr Solo 490 € / Team 990 € netto einmalig, separat auf der ersten Rechnung berechnet. Bei Jahresvorkasse entfällt das Setup für Solo & Team. · Scale-Setup individuell ab 1.990 € netto.',
} as const;

/* ─────────────────────────────────────────────────────────
   PRICING — Anti-FUD, transparent, outcome-anchored.
   ───────────────────────────────────────────────────────── */
export const pricing = {
  eyebrow: 'Preise — transparent, ohne Beraterstunden-Falle',
  headline: 'Du kennst deine Ersparnis. Jetzt vergleich die Investition.',
  subline:
    'Keine 200-Stunden-Projekte mit offenem Ende. Festpreise. Klare Leistung. Dein erster Agent rechnet sich schneller, als du Angebote vergleichst.',
  trustRow: [
    { label: 'Festpreis', sub: 'kein Time-and-Material' },
    { label: '14 Tage SLA', sub: 'nach Go-Live inklusive' },
    { label: 'DSGVO + EU', sub: 'kein US-Cloud-Risiko' },
    { label: '2–4 Wochen', sub: 'bis Produktiv-Agent' }
  ],
  tiers: [
    {
      name: 'Automatische Workflows',
      tagline: 'Wenn deine Prozesse klar sind, du aber niemanden hast, der sie automatisiert.',
      price: 'ab 2.500 €',
      priceSuffix: 'einmalig',
      note: 'zzgl. Hosting & Token-Kosten*',
      marketPrice: 'Marktpreis ab 8.000 €',
      roiHint: 'Ø ROI nach < 2 Monaten bei 25K€ Ersparnis',
      bestFor: 'Sales-Ops · HR-Ops · Buchhaltung',
      features: [
        'Individuelle Workflow-Entwicklung & Automatisierung',
        'Integration in deine bestehenden Systeme',
        'DSGVO-konformes EU-Hosting',
        'Dokumentation & Team-Schulung',
        'Standard-Support (Mo–Fr)'
      ],
      checkoutUrl: 'https://buy.stripe.com/dRm6oHfcmfIs7ss2xO8bS00',
      buyLabel: 'Paket buchen — 2.500 €',
      cta: 'Erstgespräch buchen',
      recommended: false
    },
    {
      name: 'KI-Agent Autonom',
      tagline: 'Wenn dein Prozess Bewertung, Recherche oder Entscheidung verlangt.',
      price: 'ab 5.000 €',
      priceSuffix: 'einmalig',
      note: 'zzgl. Hosting & Token-Kosten*',
      marketPrice: 'Marktpreis ab 18.000 €',
      roiHint: '8 von 10 Mittelständlern wählen dieses Paket',
      bestFor: 'Kundenservice · Account Management · Mittelstand',
      features: [
        'Autonomer KI-Agent mit Entscheidungslogik',
        'Multi-System-Integration (CRM, ERP, E-Mail, Team-Chat)',
        'DSGVO-konformes EU-Hosting & Monitoring',
        'Custom Prompt-Engineering im Markenton',
        'Priorisierter Support · Wöchentliches Reporting',
        '14 Tage Optimierungs-SLA nach Go-Live'
      ],
      checkoutUrl: 'https://buy.stripe.com/8x2eVd2pAdAkcMM2xO8bS01',
      buyLabel: 'Paket buchen — 5.000 €',
      cta: 'Erstgespräch buchen',
      recommended: true
    }
  ],
  footnote:
    '* Token-Kosten sind nutzungsabhängig, transparent abgerechnet und in der Regel <5 % der Personalkostenersparnis. Alle Preise zzgl. MwSt.'
} as const;

/* ─────────────────────────────────────────────────────────
   ABOUT — Founder story, sharpened.
   ───────────────────────────────────────────────────────── */
export const about = {
  founder: {
    name: 'Ricardo Serrano',
    role: 'Gründer & Geschäftsführer',
    company: 'RSG Agent Services',
    photo: '/images/ricardo-serrano.png'
  }
} as const;

/* ─────────────────────────────────────────────────────────
   FINAL CTA — Anti-pitch framing.
   ───────────────────────────────────────────────────────── */
export const finalCta = {
  eyebrow: 'Lass uns reden',
  headline: '30 Minuten. Kein Pitch. Nur ehrliche Antworten zu deinem Prozess.',
  subline:
    'Ricardo nimmt sich persönlich Zeit. Wir schauen gemeinsam auf deine 2–3 schmerzhaftesten Prozesse — und sagen dir konkret, wo ein KI-Agent den größten Hebel hat. Falls es keinen gibt, sagen wir auch das.',
  badge: 'Kostenlos · unverbindlich · DSGVO-konform',
  ctaTitle: '30-Min. Erstgespräch mit Ricardo',
  ctaBody: 'Du gehst aus dem Gespräch mit einer klaren Einschätzung deines Automatisierungs-ROI.',
  ctaButton: 'Termin buchen',
  responseSla: 'Antwort innerhalb 24h · meistens schneller',
  agentOptions: [
    'Support-Agent',
    'E-Mail-Agent',
    'Sales-Agent',
    'Onboarding-Agent',
    'Operations-Agent',
    'Individuelle Lösung'
  ],
  liveStatus: {
    label: 'Heute online',
    sub: 'Antwort meistens in < 2 Stunden'
  },
  founderTagline:
    '15 Jahre B2B-Vertrieb. Spricht Vertrieb, baut KI. Du redest direkt mit dem Gründer — kein SDR, kein Account-Manager.',
  /** Static "next available slots" preview — feels alive even though it's static */
  nextSlots: [
    { day: 'Heute',     time: '17:30' },
    { day: 'Morgen',    time: '10:00' },
    { day: 'Übermorgen', time: '14:30' }
  ],
  microProof:
    '„ROI nach 4 Monaten — und Ricardo hat genauso ehrlich gesagt, was NICHT geht." — CTO, Datenanalyse-Unternehmen'
} as const;

/* ─────────────────────────────────────────────────────────
   FOOTER
   ───────────────────────────────────────────────────────── */
export const footer = {
  description:
    'KI-Agenten, die deine Geschäftsprozesse 24/7 automatisieren. DSGVO-konform, made in Germany.',
  groups: [
    {
      title: 'Produkt',
      links: [
        { label: 'Voice-Suite · NEU', href: '/#voice' },
        { label: 'Warum uns', href: '/#usp' },
        { label: 'Pipelines', href: '/#pipelines' },
        { label: 'Prozess', href: '/#solutions' },
        { label: 'ROI-Rechner', href: '/#roi' },
        { label: 'Investment', href: '/#pricing' }
      ]
    },
    {
      title: 'KI-Lösungen', links: [{ label: 'KI-Telefonassistent', href: '/ki-telefonassistent' }, { label: 'KI-Agentur Mittelstand', href: '/ki-agentur-mittelstand' }, { label: 'Telefon-Agent Arztpraxis', href: '/ki-telefonassistent/arztpraxis' }, { label: 'Telefon-Agent Handwerk', href: '/ki-telefonassistent/handwerk' }, { label: 'Telefon-Agent Steuerberater', href: '/ki-telefonassistent/steuerberater' }, { label: 'Telefon-Agent Hausverwaltung', href: '/ki-telefonassistent/hausverwaltung' }, { label: 'Telefon-Agent Hotellerie', href: '/ki-telefonassistent/hotel' }, { label: 'Telefon-Agent Autohaus', href: '/ki-telefonassistent/autohaus' }] }, { title: 'Cases & Insights',
      links: [
        { label: 'Alle Case Studies', href: '/cases' },
        { label: 'Insights · Essays', href: '/insights' },
        { label: 'ROI-Checkliste (PDF)', href: '/roi-checkliste-ki-agent' }
      ]
    },
    {
      title: 'Unternehmen',
      links: [
        { label: 'Termin buchen', href: '/termin' },
        { label: 'Kontakt', href: '/#contact' },
        { label: 'KI-Beratung Wiesbaden', href: '/ki-beratung-wiesbaden' }
      ]
    },
    {
      title: 'Rechtliches',
      links: [
        { label: 'Impressum', href: '/impressum' },
        { label: 'Datenschutz', href: '/datenschutz' },
        { label: 'AGB', href: '/agb' }
      ]
    }
  ],
  copyright: '© 2026 RSG Recruiting Solutions Group GmbH · HRB 35951 · Alle Rechte vorbehalten.',
  tagline: 'KI-Agenten · DSGVO-konform · Made in Germany'
} as const;
