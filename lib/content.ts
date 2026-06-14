/**
 * Single source of truth for all section copy.
 *
 * Edited under a "senior SEO + storytelling + painpoint" pass:
 * - Headlines hook with the visceral pain first, promise second.
 * - Every section follows Problem â Agitate â Solve (PAS).
 * - Keywords woven naturally: "KI-Agent", "KI Automatisierung Vertrieb",
 *   "KI Mittelstand", "DSGVO KI", "ChatGPT Vertrieb", "n8n Workflow",
 *   "LangChain LangGraph", "AI Agent Deutschland".
 * - All German you-form ("du") for warm + direct B2B-Mittelstand tone.
 *
 * Shape is preserved so no component breaks â only values changed,
 * a few additive keys (techExplainer.painByMode, problems.stats, etc.).
 */

export const site = {
  name: 'RSG Agent Services',
  shortName: 'RSGAI',
  tagline: 'KI-Agenten, die wirklich arbeiten',
  positioning:
    'KI-Agentur mit echter Vertriebs-DNA â bauen, betreiben, liefern.',
  url: 'https://www.rsg-ai.de',
  contact: {
    email: 'hello@rsg-ai.de',
    phone: '+49 176 60772556',
    phoneHref: 'tel:+4917660772556',
    city: 'Wiesbaden, Deutschland',
    hours: 'MoâFr Â· 9:00â18:00 Uhr'
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
  /** Newsletter funnel â dual-track (LinkedIn primary + own email capture). */
  newsletter: {
    linkedinUrl:
      'https://www.linkedin.com/newsletters/mittelstand-automatisiert-7458498915005431808/',
    leadMagnet: 'roi-checkliste-ki-agent',
    leadMagnetTitle: 'KI-Agent Â· ROI-Checkliste',
    leadMagnetSub:
      '12 harte Fragen â am Ende weiÃt du, ob ein KI-Agent dein GeschÃ¤ft wirklich beschleunigt.',
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
  { label: 'Telefonassistent', href: '/ki-telefonassistent' },
  { label: 'Automatisierung', href: '/automatisierung' },
  { label: 'Preise', href: '/preise' },
  { label: 'Cases', href: '/cases' },
  { label: 'Insights', href: '/insights' },
  { label: 'Partner', href: '/partner' },
  { label: 'Termin', href: '/termin' }
] as const;

/* âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
   HERO â Hook: "Dein Vertrieb arbeitet. Aber zu 70 % falsch."
   âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ */
export const hero = {
  eyebrow: 'KI-Telefonassistent Â· Werkstatt fÃ¼r den Vertrieb',
  headlineKinetic: [
    'KI-Agenten,',
    'die ans Telefon gehen â',
    'und verkaufen.'
  ],
  // Used as a refined sub-statement below the headline
  subStatement: 'Live in vier Wochen â nicht in vier Quartalen.',
  subline:
    'Dein KI-Telefonassistent nimmt jeden Anruf an, qualifiziert Leads und bucht Termine â 24/7, in natÃ¼rlichem Deutsch, eingebunden in dein CRM. Aufnahme aktuell fÃ¼r Kohorte 06 (Q3 2026).',
  ctaPrimary: 'Kostenloses ErstgesprÃ¤ch',
  ctaSecondary: 'Telefonassistent ansehen',
  trustChips: [
    '4 Wochen bis Live',
    'DSGVO Â· EU-Server',
    '12+ Agenten in Produktion',
    'bis zu 312 % ROI (Pilotkunden)',
    'Hosting in Deutschland'
  ]
} as const;

/* âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
   VOICE AGENTS â Highlight-Sektion âJETZT NEU"
   Echte Telefon-Stimmen, die qualifizieren, beraten, verkaufen.
   âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ */
export const voiceAgents = {
  badge: 'Jetzt neu Â· ab Q3 2026',
  eyebrow: 'RSG AI Â· Voice-Suite',
  headline: 'Dein Telefon-Agent, der nie schlÃ¤ft.',
  subheadline:
    'Eingehende Anrufe annehmen. Anliegen klÃ¤ren. Termine direkt setzen. In natÃ¼rlichem Deutsch â mit deinem Markenton, deinem CRM, deiner Sprechweise.',
  subline:
    'Echte GesprÃ¤che, kein Voice-Mail-Roboter. Trainiert auf deine Cases, eingebunden in dein CRM oder deine bestehende Telefonanlage. Speicherung in Deutschland (Hetzner, NÃ¼rnberg); Sprachverarbeitung Ã¼ber zertifizierte EU-/US-Dienste nach EU-Datenschutzniveau. Auf DSGVO und die Transparenzpflichten des EU AI Act ausgelegt.',
  /** Konkrete, belegte Vertrauens-Anker â werden Ã¼ber trustRow ausgespielt. */
  trustChips: [
    'Server in NÃ¼rnberg Â· DE',
    'DSGVO-konform Â· EU',
    '6 Sprachen Â· DE first',
    '< 10 Min eingerichtet',
    '24/7 Â· niemand wartet',
  ],
  /** BewÃ¤hrte Use-Cases nach Branchen â fÃ¼r die Branchen-Marquee. */
  industries: [
    'Arztpraxen',
    'ZahnÃ¤rzte',
    'Physiotherapeuten',
    'Hotels',
    'Handwerker',
    'AnwÃ¤lte',
    'Hausverwaltungen',
    'AutohÃ¤user',
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
      tag: 'Service Â· Inbound',
      title: 'Termin- & Reservierungs-Assistent',
      tagline: 'Anrufer nennen ihren Wunsch â der Agent bucht direkt.',
      body:
        'Terminvereinbarung, Reservierung, Status-RÃ¼ckfrage: Der Agent nimmt den Anruf entgegen, prÃ¼ft live deine VerfÃ¼gbarkeit und trÃ¤gt den Termin direkt in Kalender oder CRM ein. Kein Telefon-Tag, keine vergessene RÃ¼ckmeldung â der Anrufer hat seinen Slot, bevor er aufgelegt hat.',
      kpi: { value: '24/7', label: 'Termine rund um die Uhr Â· ohne Personal' },
      bullets: [
        'Live-VerfÃ¼gbarkeit aus Kalender/CRM',
        'Bucht, verschiebt & storniert im GesprÃ¤ch',
        'BestÃ¤tigung per SMS/E-Mail automatisch',
        'Ãbergabe an Mensch bei SonderfÃ¤llen',
      ],
    },
    {
      id: 'inbound',
      tag: 'Service Â· Inbound',
      title: 'Empfangs-Assistent',
      tagline: 'Sie hebt ab. Beim ersten Klingeln. Immer.',
      body:
        'Kein âDrÃ¼cken Sie die 1"-MenÃ¼. Keine Warteschleife. Der Agent nimmt jeden Anruf an, klÃ¤rt das Anliegen, leitet sauber weiter oder lÃ¶st Standard-Fragen sofort. Aus 60 % Tier-1-Anfragen werden 0 â der Rest landet beim richtigen Menschen mit vollem Kontext.',
      kpi: { value: '< 1 Sek.', label: 'Annahme Â· keine Warteschleife' },
      bullets: [
        '6 Sprachen: DE Â· EN Â· FR Â· IT Â· PL Â· PT',
        'Erkennt VIP-Kunden + priorisiert',
        'Termin-Buchung direkt im GesprÃ¤ch',
        'Voicemail-Transkript per E-Mail',
      ],
    },
    {
      id: 'custom',
      tag: 'Custom Â· Enterprise',
      title: 'Custom Voice-Agent',
      tagline: 'Dein Use-Case. Deine Stimme. Dein Workflow.',
      body:
        'Recall-Kampagnen, Mahnwesen, Termin-Erinnerungen, Bestandskunden-Recovery â wir bauen den Agenten auf deinen exakten Prozess. Inklusive Stimm-Klon (mit Consent), Integrationen in jede CRM-/ERP-Welt und Compliance-Logging fÃ¼r regulierte Branchen.',
      kpi: { value: '4 Wochen', label: 'bis Go-Live Â· Festpreis' },
      bullets: [
        'Stimm-Klon optional Â· mit Consent-Workflow',
        'Compliance-Logging fÃ¼r regulierte Branchen',
        'Eigene Rufnummer oder Anbindung deiner Anlage',
        'WhatsApp- + SMS-Hand-off als Add-On',
      ],
    },
  ],
  /** Live-Demo-Anruf â echte gehosteter Empfangs-Assistent (Christian). */
  liveDemo: {
    eyebrow: 'Live-Demo Â· echte Stimme',
    claim: 'Der Agent, der nie schlÃ¤ft.',
    headline: 'HÃ¶r live, was wir bauen.',
    subline:
      'Ruf jetzt unseren Empfangs-Assistenten an. Sie nimmt ab beim ersten Klingeln. Echte Stimme, echte Antworten, in unter 0,4 Sekunden â wie fÃ¼r deine eigene Hotline.',
    phoneDisplay: '+49 30 826 83906',
    phoneHref: 'tel:+493082683906',
    phoneLabel: 'RSG KI Empfangs-Assistent Â· live',
    callCta: 'Jetzt anrufen',
    copyCta: 'Nummer kopieren',
    copyConfirm: 'Nummer kopiert â wÃ¤hl jetzt an',
    disclaimer:
      'KI- und Aufzeichnungs-Hinweis zu GesprÃ¤chsbeginn â du entscheidest. MoâFr 5â18 Uhr beste HÃ¶rqualitÃ¤t.',
    callerHint:
      'Live mit âChristian" â Senior-Sales-TonalitÃ¤t, kennt rsg-ai.de und pitcht im GesprÃ¤ch den Buchungslink.',
    counterTemplate: 'Rund um die Uhr automatisch beantwortet',
    counterValue: '47',
    trustStrip: [
      { icon: 'zap', label: '0,4 s Reaktion' },
      { icon: 'server', label: 'Server in NÃ¼rnberg' },
      { icon: 'shield', label: 'DSGVO-konform Â· EU' },
      { icon: 'languages', label: '6 Sprachen Â· DE first' },
      { icon: 'infinity', label: '24/7 verfÃ¼gbar' },
    ],
    footer:
      'Sie sprechen mit einem echten KI-Agenten, gebaut auf demselben Stack, den wir fÃ¼r MittelstÃ¤ndler ausrollen. Wenn Sie den Unterschied zu einem Menschen nicht hÃ¶ren, hÃ¶rt ihn auch Ihr Kunde nicht.',
  },
  /** Quantifizierte Kunden-Outcomes â werden in der âProof-Row" angezeigt. */
  proofPoints: [
    { value: '30h-Stelle', label: 'eingespart pro Agent Â· Ã Mittelstand' },
    { value: 'Live', label: 'Voice-Agenten im Wirkbetrieb' },
    { value: 'bis 9.000', label: 'Calls/Monat im Spitzenbetrieb' },

  ],
  cta: {
    primary: 'Live-Demo anhÃ¶ren',
    primaryHref: '#contact',
    secondary: 'ErstgesprÃ¤ch buchen',
    secondaryHref: '/termin',
    note: 'Du hÃ¶rst im ErstgesprÃ¤ch einen echten Agenten live â und entscheidest selbst, ob du den Unterschied zu einem Menschen hÃ¶rst.',
  },
} as const;

export const liveStats = [
  { value: '24/7', label: 'im Einsatz' },
  { value: '0.8s', label: 'Ã Reaktion' },
  { value: 'bis 38Kâ¬', label: 'Ersparnis p.a. (Pilotkunden)' },
  { value: 'bis 312%', label: 'ROI Â· Pilotkunden' },
  { value: '99.9%', label: 'Uptime EU' },
  { value: '12+', label: 'Live-Agenten' }
] as const;

/* âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
   SOLUTIONS â How we solve it. Outcome-first.
   âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ */
export const solutions = {
  eyebrow: 'Wie wir liefern',
  headline: 'Vier Schritte. Vier Wochen. Live.',
  subline:
    'Kein Strategie-Deck. Kein Pilot in Q3. Bauen, integrieren, betreiben.',
  steps: [
    {
      title: 'Prozess-Audit in 60 Minuten.',
      body: '3 Prozesse mit grÃ¶Ãtem Hebel identifizieren. 1 Roadmap-Seite. Kein 80-Seiten-Deck.'
    },
    {
      title: 'MaÃgeschneidert auf LangChain / LangGraph.',
      body: 'Kein Standard-Tool. Dein Agent kennt deine Systeme, deine Sprache, deine Edge-Cases.'
    },
    {
      title: 'EU-Cloud Â· 24/7-Monitoring.',
      body: 'DSGVO-konformes Hosting in Deutschland. Echtzeit-Dashboards. Automatische Alerts.'
    },
    {
      title: 'CRM-Integration ohne IT-Ticket.',
      body: 'Dein CRM-System Â· Team-Chat. Tag 1 produktiv.'
    }
  ],
  cta: 'Termin buchen',
  pipeline: {
    title: 'Sales-Agent Â· live',
    status: 'active',
    timeSaved: 'â 38 Minuten pro Lead',
    steps: [
      { n: '01', title: 'Lead trifft ein', detail: 'Web-Formular Â· LinkedIn Â· CRM' },
      { n: '02', title: 'KI-Agent qualifiziert', detail: 'Firmenprofil Â· Score Â· Intent' },
      { n: '03', title: 'CRM-Datensatz automatisch', detail: 'Dein CRM-System' },
      { n: '04', title: 'Vertrieb benachrichtigt', detail: 'Team-Chat Â· E-Mail' },
      { n: '05', title: 'Termin gebucht', detail: 'Kalender' }
    ]
  }
} as const;

/* âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
   ROI â With painpoint per department.
   âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ */
export const roi = {
  eyebrow: 'RentabilitÃ¤tskalkulator',
  headline: 'Rechne nach, was dich dein manueller Prozess wirklich kostet.',
  subline:
    'Klick die Abteilungen an, die in deinem Unternehmen am meisten Zeit verlieren. Wir zeigen dir live, wieviel ein KI-Agent dir pro Jahr zurÃ¼ckbringt â und nach wieviel Monaten er sich amortisiert hat.',
  hint: 'Werte basieren auf realen Implementierungen bei MittelstÃ¤ndlern (50â300 MA).',
  departments: [
    {
      id: 'telefon',
      label: 'Telefon & Empfang',
      body: 'Anrufannahme, Terminvergabe, Auskunft & Weiterleitung',
      pain: 'Jeder verpasste Anruf ist ein verlorener Kunde â niemand nimmt ab',
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
      pain: 'Research dauert Tage â der Markt Ã¤ndert sich in Stunden'
    },
    {
      id: 'support',
      label: 'Kundenservice',
      body: 'Tickets, FAQ, Chat â alles, was nach Tier-1 schreit',
      pain: 'Montagmorgen-Stau erschÃ¶pft dein bestes Support-Team'
    },
    {
      id: 'consulting',
      label: 'Beratung / Consulting',
      body: 'Research, PrÃ¤sentationen, Dokumentation',
      pain: 'Senior-Stunden gehen fÃ¼r Recherche & Folien drauf'
    },
    {
      id: 'it',
      label: 'IT / Administration',
      body: 'Helpdesk, Monitoring, Dokumentation',
      pain: 'IT ertrinkt im Tickets-Backlog statt zu modernisieren'
    }
  ],
  result: {
    savingsLabel: 'GeschÃ¤tztes Einsparpotenzial',
    roiLabel: 'bis ROI erreicht',
    perYear: 'pro Jahr Â· konservative SchÃ¤tzung',
    empty: 'WÃ¤hle mindestens eine Abteilung â und sieh die Zahl, die dein CFO sehen sollte.',
    cta: 'Diese Zahl mit Ricardo besprechen'
  },
  /**
   * Conversion factors used to translate annual â¬ savings into more
   * tangible buckets (hours of senior time, content pieces, etc.).
   * Numbers are deliberately conservative.
   */
  visual: {
    hourlyRate: 65,
    comparison: {
      manualLabel: 'Heute Â· manuell',
      manualHint: '100 % Personalkosten Â· 0 % Skalierung',
      aiLabel: 'Mit KI-Agent',
      aiHint: 'KI Ã¼bernimmt Routine Â· Mensch macht Mensch-Arbeit',
      reductionLabel: 'Aufwandsreduktion'
    },
    timeLabel: 'Stunden zurÃ¼ckgewonnen pro Monat',
    projectionLabel: '5-Jahres-Projektion Â· kumulierte Ersparnis',
    projectionYears: [1, 2, 3, 4, 5],
    /** Investment-vs-output break-even calc â Senior BD framing */
    breakeven: {
      eyebrow: 'Investment vs. Ertrag Â· Break-Even-Punkt',
      headline: 'Ab welchem Tag ist dein KI-Agent bezahlt?',
      subline:
        'Senior-BD-Frage: Wie schnell holt sich dein Invest wieder rein? Hier ist die ehrliche Linie â unsere Investition gegen den Umsatz, der dir gerade in deinen manuellen Prozessen verloren geht.',
      tiers: [
        { id: 'workflow', label: 'Automatische Workflows',  price: 2500 },
        { id: 'agent',    label: 'KI-Agent Autonom',         price: 5000 }
      ],
      investLabel: 'Einmaliges Invest',
      monthlySavingsLabel: 'Verloren Â· Monat',
      breakevenLabel: 'Break-Even nach',
      netLabel: 'Netto-Plus Â· 12 Monate',
      manualLineLabel: 'Investment',
      aiLineLabel: 'Kumulierte Ersparnis',
      footer: 'Jede Woche, die du wartest, ist eine Woche, in der dein Wettbewerber automatisiert.'
    },
    equivalents: [
      { threshold: 30000, icon: 'ð¤', label: 'Senior-Mitarbeiter Vollzeit', divisor: 65000 },
      { threshold: 15000, icon: 'ð£', label: 'Marketing-Kampagnen', divisor: 4500 },
      { threshold: 10000, icon: 'ðï¸', label: 'Wochen Team-Urlaub', divisor: 8000 },
      { threshold: 5000,  icon: 'ð»', label: 'Senior-Workshops', divisor: 3500 }
    ]
  }
} as const;

/* âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
   VOICE-PRICING â Solo / AI Account Manager / Scale (Subscription-Model).
   Setup-GebÃ¸hr per Tier Â· bei Jahresvorkasse entfÃ¤llt Solo/AI Account Manager.
   âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ */
export const voicePricing = {
  annualDiscount: 0.15, // 15 % off bei jÃ¤hrlicher Vorkasse
  setup: { solo: 490, team: 990, scale: 1990 },
  reassurance: [
    'DSGVO Â· EU-Hosting (NÃ¼rnberg)',
    'Monatlich kÃ¼ndbar',
    '30-Tage-SLA',
    'Du besitzt deine Daten',
  ],
  tiers: [
    {
      id: 'solo',
      name: 'Solo',
      tagline: 'Der smarte Einstieg.',
      monthly: 199,
      annual: 169, // 199 Ã 0.85 â 169
      bestFor: 'SelbststÃ¤ndige Â· Solo-Berater Â· 1-Person-Setups',
      features: [
        '1 Rufnummer inklusive',
        '1.000 Min/Monat inkl. Â· jede weitere 0,29 â¬',
        'Transkripte ins CRM',
        'GefÃ¼hrtes Onboarding',
        'MoâFr Standard-Support',
      ],
      ctaLabel: 'Solo starten',
      ctaEvent: 'checkout_started',
      recommended: false,
    },
    {
      id: 'team',
      name: 'AI Account Manager',
      tagline: 'Dein digitaler Account Manager â Inbound, Outbound, CRM & Prozesse.',
      monthly: 499,
      annual: 424, // 499 Ã 0.85 â 424
      bestFor: 'KMU mit aktivem Lead-, Kampagnen- & CRM-Betrieb',
      features: [
        '2 Rufnummern inklusive',
        '3.000 Min/Monat inkl. (Inbound + Outbound) Â· jede weitere 0,25 â¬',
        'Inbound- & Outbound-Kampagnen Ã¼ber automatisierte Anruflisten',
        'Automatisierte Lead-Bearbeitung + CRM-Workflows & Follow-ups',
        'Terminbuchung Â· Reporting Â· laufende Optimierung & Betreuung',
      ],
      ctaLabel: 'AI Account Manager buchen',
      ctaEvent: 'checkout_started',
      recommended: true,
    },
    {
      id: 'scale',
      name: 'Scale',
      tagline: 'Custom-Voice + individuelle Workflows.',
      monthly: null, // Preis auf Anfrage
      annual: null,
      bestFor: 'GrÃ¶Ãere Teams Â· Mehrstandort Â· spezielle Compliance',
      features: [
        'Custom-Voice (Brand-Stimme)',
        'ab 5.000 Min/Monat Â· individuell Â· unbegrenzt skalierbar',
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
    'Alle Preise zzgl. MwSt. Â· Setup-GebÃ¸hr Solo 490 â¬ / AI Account Manager 990 â¬ netto einmalig, separat auf der ersten Rechnung berechnet. Bei Jahresvorkasse entfÃ¤llt das Setup fÃ¼r Solo & AI Account Manager. Â· Scale-Setup individuell ab 1.990 â¬ netto.',
} as const;

/* âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
   PRICING â Anti-FUD, transparent, outcome-anchored.
   âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ */
export const pricing = {
  eyebrow: 'Preise â transparent, ohne Beraterstunden-Falle',
  headline: 'Du kennst deine Ersparnis. Jetzt vergleich die Investition.',
  subline:
    'Keine 200-Stunden-Projekte mit offenem Ende. Festpreise. Klare Leistung. Dein erster Agent rechnet sich schneller, als du Angebote vergleichst.',
  trustRow: [
    { label: 'Festpreis', sub: 'kein Time-and-Material' },
    { label: '14 Tage SLA', sub: 'nach Go-Live inklusive' },
    { label: 'DSGVO + EU', sub: 'Speicherung in der EU' },
    { label: '2â4 Wochen', sub: 'bis Produktiv-Agent' }
  ],
  tiers: [
    {
      name: 'Automatische Workflows',
      tagline: 'Wenn deine Prozesse klar sind, du aber niemanden hast, der sie automatisiert.',
      price: 'ab 2.500 â¬',
      priceSuffix: 'einmalig',
      note: 'zzgl. Hosting & Token-Kosten*',
      marketPrice: 'Marktpreis ab 8.000 â¬',
      roiHint: 'Ã ROI nach < 2 Monaten bei 25Kâ¬ Ersparnis',
      bestFor: 'Sales-Ops Â· HR-Ops Â· Buchhaltung',
      features: [
        'Individuelle Workflow-Entwicklung & Automatisierung',
        'Integration in deine bestehenden Systeme',
        'DSGVO-konformes EU-Hosting',
        'Dokumentation & Team-Schulung',
        'Standard-Support (MoâFr)'
      ],
      checkoutUrl: 'https://buy.stripe.com/dRm6oHfcmfIs7ss2xO8bS00',
      buyLabel: 'Paket buchen â 2.500 â¬',
      cta: 'ErstgesprÃ¤ch buchen',
      recommended: false
    },
    {
      name: 'KI-Agent Autonom',
      tagline: 'Wenn dein Prozess Bewertung, Recherche oder Entscheidung verlangt.',
      price: 'ab 5.000 â¬',
      priceSuffix: 'einmalig',
      note: 'zzgl. Hosting & Token-Kosten*',
      marketPrice: 'Marktpreis ab 18.000 â¬',
      roiHint: 'Unser meistgewÃ¤hltes Paket im Mittelstand',
      bestFor: 'Kundenservice Â· Account Management Â· Mittelstand',
      features: [
        'Autonomer KI-Agent mit Entscheidungslogik',
        'Multi-System-Integration (CRM, ERP, E-Mail, Team-Chat)',
        'DSGVO-konformes EU-Hosting & Monitoring',
        'Custom Prompt-Engineering im Markenton',
        'Priorisierter Support Â· WÃ¶chentliches Reporting',
        '14 Tage Optimierungs-SLA nach Go-Live'
      ],
      checkoutUrl: 'https://buy.stripe.com/8x2eVd2pAdAkcMM2xO8bS01',
      buyLabel: 'Paket buchen â 5.000 â¬',
      cta: 'ErstgesprÃ¤ch buchen',
      recommended: true
    }
  ],
  footnote:
    '* Token-Kosten sind nutzungsabhÃ¤ngig, transparent abgerechnet und in der Regel <5 % der Personalkostenersparnis. Alle Preise zzgl. MwSt.'
} as const;

/* âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
   ABOUT â Founder story, sharpened.
   âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ */
export const about = {
  founder: {
    name: 'Ricardo Serrano',
    role: 'GrÃ¼nder & GeschÃ¤ftsfÃ¸hrer',
    company: 'RSG Agent Services',
    photo: '/images/ricardo-serrano.png'
  }
} as const;

/* âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
   FINAL CTA â Anti-pitch framing.
   âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ */
export const finalCta = {
  eyebrow: 'Lass uns reden',
  headline: '30 Minuten. Kein Pitch. Nur ehrliche Antworten zu deinem Prozess.',
  subline:
    'Ricardo nimmt sich persÃ¶nlich Zeit. Wir schauen gemeinsam auf deine 2â3 schmerzhaftesten Prozesse â und sagen dir konkret, wo ein KI-Agent den grÃ¶Ãten Hebel hat. Falls es keinen gibt, sagen wir auch das.',
  badge: 'Kostenlos Â· unverbindlich Â· DSGVO-konform',
  ctaTitle: '30-Min. ErstgesprÃ¤ch mit Ricardo',
  ctaBody: 'Du gehst aus dem GesprÃ¤ch mit einer klaren EinschÃ¤tzung deines Automatisierungs-ROI.',
  ctaButton: 'Termin buchen',
  responseSla: 'Antwort innerhalb 24h Â· meistens schneller',
  agentOptions: [
    'Support-Agent',
    'E-Mail-Agent',
    'Sales-Agent',
    'Onboarding-Agent',
    'Operations-Agent',
    'Individuelle LÃ¶sung'
  ],
  liveStatus: {
    label: 'Heute online',
    sub: 'Antwort meistens in < 2 Stunden'
  },
  founderTagline:
    '15 Jahre B2B-Vertrieb. Spricht Vertrieb, baut KI. Du redest direkt mit dem GrÃ¼nder â kein SDR, kein Account-Manager.',
  /** Static "next available slots" preview â feels alive even though it's static */
  nextSlots: [
    { day: 'Heute',     time: '17:30' },
    { day: 'Morgen',    time: '10:00' },
    { day: 'Ãbermorgen', time: '14:30' }
  ],
  microProof:
    'âROI nach 4 Monaten â und Ricardo hat genauso ehrlich gesagt, was NICHT geht." â CTO, Datenanalyse-Unternehmen'
} as const;

/* âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
   FOOTER
   âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ */
export const footer = {
  description:
    'KI-Agenten, die deine GeschÃ¤ftsprozesse 24/7 automatisieren. DSGVO-konform, made in Germany.',
  groups: [
    {
      title: 'Produkt',
      links: [
        { label: 'Voice-Suite Â· NEU', href: '/#voice' },
        { label: 'Warum uns', href: '/automatisierung#usp' },
        { label: 'Pipelines', href: '/automatisierung#pipelines' },
        { label: 'Prozess', href: '/automatisierung#solutions' },
        { label: 'ROI-Rechner', href: '/#rechner' },
        { label: 'Investment', href: '/preise' }
      ]
    },
    {
      title: 'KI-LÃ¶sungen', links: [{ label: 'KI-Telefonassistent', href: '/ki-telefonassistent' }, { label: 'KI-Agentur Mittelstand', href: '/ki-agentur-mittelstand' }, { label: 'Telefon-Agent Arztpraxis', href: '/ki-telefonassistent/arztpraxis' }, { label: 'Telefon-Agent Handwerk', href: '/ki-telefonassistent/handwerk' }, { label: 'Telefon-Agent Steuerberater', href: '/ki-telefonassistent/steuerberater' }, { label: 'Telefon-Agent Hausverwaltung', href: '/ki-telefonassistent/hausverwaltung' }, { label: 'Telefon-Agent Hotellerie', href: '/ki-telefonassistent/hotel' }, { label: 'Telefon-Agent Autohaus', href: '/ki-telefonassistent/autohaus' }] }, { title: 'Cases & Insights',
      links: [
        { label: 'Alle Case Studies', href: '/cases' },
        { label: 'Insights Â· Essays', href: '/insights' },
        { label: 'ROI-Checkliste (PDF)', href: '/roi-checkliste-ki-agent' }
      ]
    },
    {
      title: 'Standorte',
      links: [
        { label: 'KI-Telefonassistent Wiesbaden', href: '/ki-telefonassistent-wiesbaden' },
        { label: 'KI-Telefonassistent Frankfurt', href: '/ki-telefonassistent-frankfurt' },
        { label: 'KI-Telefonassistent MÃ¼nchen', href: '/ki-telefonassistent-muenchen' },
        { label: 'KI-Telefonassistent Hamburg', href: '/ki-telefonassistent-hamburg' },
        { label: 'KI-Telefonassistent Berlin', href: '/ki-telefonassistent-berlin' },
        { label: 'KI-Telefonassistent KÃ¶ln', href: '/ki-telefonassistent-koeln' },
        { label: 'KI-Telefonassistent Stuttgart', href: '/ki-telefonassistent-stuttgart' },
        { label: 'KI-Telefonassistent DÃ¼sseldorf', href: '/ki-telefonassistent-duesseldorf' },
        { label: 'KI-Telefonassistent NÃ¼rnberg', href: '/ki-telefonassistent-nuernberg' }
      ]
    },
    {
      title: 'Unternehmen',
      links: [
        { label: 'Termin buchen', href: '/termin' },
        { label: 'Partner werden', href: '/partner' },
        { label: 'Kontakt', href: '/#contact' },
        { label: 'KI-Beratung Wiesbaden', href: '/ki-beratung-wiesbaden' }, { label: 'Auf Google bewerten', href: 'https://g.page/r/CYC7KblNfDiYEAE/review' }
      ]
    },
    {
      title: 'Rechtliches',
      links: [
        { label: 'Impressum', href: '/impressum' },
        { label: 'Datenschutz', href: '/datenschutz' },
        { label: 'KI-Transparenz', href: '/ai-transparenz' },
        { label: 'AGB', href: '/agb' }
      ]
    }
  ],
  copyright: 'Â© 2026 RSG Recruiting Solutions Group GmbH Â· HRB 35951 Â· Alle Rechte vorbehalten.',
  tagline: 'KI-Agenten Â· DSGVO-konform Â· Made in Germany'
} as const;
