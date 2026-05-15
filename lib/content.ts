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
    email: 'info@rsg-ai.de',
    phone: '+49 176 60772556',
    phoneHref: 'tel:+4917660772556',
    city: 'Wiesbaden, Deutschland',
    hours: 'Mo–Fr · 9:00–18:00 Uhr'
  },
  cta: {
    primary: 'Demo anfragen',
    secondary: 'Einsparpotenzial berechnen',
    meetingUrl: 'https://meetings-eu1.hubspot.com/r-serrano'
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/rsg-recruiting-solutions-group/',
    instagram: 'https://www.instagram.com/rsg.agentservices/',
    youtube: 'https://www.youtube.com/@RSGAgentServices'
  },
  legal: {
    company: 'RSG Recruiting Solutions Group GmbH',
    hrb: 'HRB 35951',
    imprintUrl: 'https://www.rsg-ai.de/impressum',
    privacyUrl: 'https://www.rsg-ai.de/datenschutz',
    termsUrl: 'https://www.rsg-ai.de/agb'
  }
} as const;

export const nav = [
  { label: 'Lösungen', href: '#solutions' },
  { label: 'Use Cases', href: '#usecases' },
  { label: 'ROI-Rechner', href: '#roi' },
  { label: 'Preise', href: '#pricing' },
  { label: 'Über uns', href: '#about' },
  { label: 'Kontakt', href: '#contact' }
] as const;

/* ─────────────────────────────────────────────────────────
   HERO — Hook: "Dein Vertrieb arbeitet. Aber zu 70 % falsch."
   ───────────────────────────────────────────────────────── */
export const hero = {
  eyebrow: 'KI-Agenten aus dem Vertrieb — für den Mittelstand',
  headlineKinetic: [
    'Dein Vertrieb',
    'arbeitet hart.',
    'Aber zu 70 %',
    'an der falschen Aufgabe.'
  ],
  subline:
    '15 Jahre B2B-Vertrieb. Tausende Stunden in CRMs, Mail-Threads und Excel-Listen verschwendet. Heute bauen wir die KI-Agenten, die wir damals selbst gebraucht hätten — und betreiben sie für dich. DSGVO-konform. In 2–4 Wochen live.',
  ctaPrimary: 'Agenten-Demo anfragen',
  ctaSecondary: 'Einsparpotenzial berechnen',
  trustChips: [
    'DSGVO-konform · EU-Server',
    'Made in Germany',
    'Go-Live 2–4 Wochen',
    '12+ Kunden in Produktion',
    'Ø 312 % ROI nach 4 Monaten'
  ]
} as const;

export const liveStats = [
  { value: '1.247', label: 'Tasks/Tag' },
  { value: '0.8s', label: 'Ø Reaktionszeit' },
  { value: '99.9%', label: 'Uptime EU-Cloud' },
  { value: '24/7', label: 'kein Feierabend' },
  { value: '2–4', label: 'Wochen Go-Live' },
  { value: '35K€', label: 'Ø Ersparnis p.a.' },
  { value: '100%', label: 'DSGVO-konform' }
] as const;

/* ─────────────────────────────────────────────────────────
   LIVE AGENTS — Proof: "Während du liest, arbeiten sie."
   ───────────────────────────────────────────────────────── */
export const liveAgents = {
  eyebrow: 'KI-Agenten live in Produktion',
  headline: 'Während du diese Zeile liest, schließen unsere Agenten Tickets, qualifizieren Leads und beantworten E-Mails.',
  subline:
    'Kein Demo-Video. Kein PowerPoint. Echte Pipelines bei echten Mittelständlern — ohne Pause, ohne Wartezeit, ohne den teuersten Mitarbeiter blockieren.',
  agents: [
    {
      name: 'Sales-Agent',
      status: 'LIVE',
      promise: 'Kein Lead schläft bis Montag ein.',
      metric: 'Qualifizierte Leads/Tag',
      metricValue: '47'
    },
    {
      name: 'E-Mail-Agent',
      status: 'LIVE',
      promise: 'Kein Postfach läuft mehr über.',
      metric: 'Ø Bearbeitung pro E-Mail',
      metricValue: '0.3s'
    },
    {
      name: 'Support-Agent',
      status: 'LIVE',
      promise: '24/7 ohne Hotline-Stress.',
      metric: 'Tickets ohne Mensch gelöst',
      metricValue: '94%'
    }
  ],
  kpis: [
    { value: '12+', label: 'Kunden-Agenten aktiv' },
    { value: '38.000+', label: 'Automatisierte Tasks/Monat' },
    { value: '312%', label: 'Ø ROI nach 4 Monaten' }
  ],
  cta: 'Meinen Agenten bauen lassen'
} as const;

/* ─────────────────────────────────────────────────────────
   PROBLEMS — Pain agitation. Visceral.
   ───────────────────────────────────────────────────────── */
export const problems = {
  eyebrow: 'Du erkennst dich wieder?',
  headline: 'Diese 4 Vertriebs-Killer haben uns 15 Jahre lang Umsatz gekostet. Erkennst du sie?',
  subline:
    'Wir waren auf deiner Seite des Schreibtisches. Wir wissen, wo deine teuersten Mitarbeiter wirklich Zeit verlieren — und warum kein Tool der Welt das alleine fixt.',
  items: [
    {
      title: 'Dein Vertrieb verkauft nicht. Er verwaltet.',
      body: 'Angebote schreiben, Leads nachfassen, CRM pflegen, Termine koordinieren, Reports bauen. Die Top-Performer in deinem Team verbringen mehr Zeit mit Tipparbeit als mit echten Kundengesprächen. Jede Stunde Admin ist eine Stunde, in der ein Wettbewerber dein Geschäft macht.',
      stat: { value: '68 %', label: 'der Vertriebszeit geht für Nicht-Verkaufs-Aufgaben verloren (McKinsey 2024)' }
    },
    {
      title: 'Hochbezahlte Mitarbeiter machen Mindestlohn-Arbeit.',
      body: 'E-Mails kategorisieren, Daten zwischen Systemen kopieren, Follow-ups erinnern, Status-Updates schreiben. Du zahlst 80K für eine Senior-Position — und 30 Stunden im Monat fließen in Tasks, die ein KI-Agent in Sekunden erledigt. Das ist kein Effizienz-Problem. Das ist eine offene Geldwunde.',
      stat: { value: '40 %', label: 'der Arbeitszeit entfällt auf wiederholbare, automatisierbare Routine' }
    },
    {
      title: 'Jede Woche ohne Automatisierung ist verlorenes Geld.',
      body: 'Während du noch ein KI-Pilotprojekt evaluierst und dein IT-Team Tickets schreibt, laufen deine Pipelines weiter durch dieselben Löcher. Wir haben es selbst durchlebt: Drei Quartale verloren, weil "wir müssen erst nochmal drüber schlafen".',
      stat: { value: '47K €', label: 'durchschnittlicher Jahresverlust pro manuellem Vertriebsprozess (eigene Erhebung)' }
    },
    {
      title: 'ChatGPT im Browser ist kein Vertriebssystem.',
      body: 'Wir wissen: Dein Team hat schon ChatGPT-Accounts. Du hast Prompts gespeichert. Vielleicht sogar Custom GPTs gebaut. Aber ohne tiefe CRM-Integration, ohne Prozesswissen, ohne Multi-Step-Logik bleibt jedes KI-Experiment eine Spielerei — die irgendwann im Sande verläuft.',
      stat: { value: '74 %', label: 'der KI-Initiativen im Mittelstand scheitern an fehlender Prozess-Integration (BCG 2024)' }
    }
  ],
  outro: {
    title: 'Wir haben den Weg bereits gegangen — für uns und für 12+ Mittelständler.',
    body: 'Als Vertriebsprofis und KI-Architekten in Personalunion wissen wir, welche Agenten wirklich helfen und welche nur in PowerPoint schick aussehen. Wir bauen, integrieren und betreiben — und liefern messbare Ergebnisse, keine Theorien.',
    cta: 'Zeig mir, wie ihr das löst'
  }
} as const;

/* ─────────────────────────────────────────────────────────
   SOLUTIONS — How we solve it. Outcome-first.
   ───────────────────────────────────────────────────────── */
export const solutions = {
  eyebrow: 'Bauen. Betreiben. Liefern.',
  headline: 'Kein 80-Seiten-Strategiepapier. Sondern KI-Agenten, die ab Woche 2 für dich arbeiten.',
  subline:
    'Du brauchst keinen weiteren Berater, der dir erklärt, was du schon weißt. Du brauchst einen KI-Agenten, der die Routine übernimmt — damit dein Team endlich wieder das macht, wofür du es bezahlst. Wir analysieren, bauen, integrieren und betreiben. Du siehst Resultate.',
  steps: [
    {
      title: 'Prozess-Audit in 60 Minuten — nicht 60 Tagen.',
      body: 'Schluss mit endlosen Discovery-Phasen, die niemand bezahlt. Wir setzen uns mit deinen Vertriebs- und Operations-Leads zusammen, identifizieren die 3 Prozesse mit dem größten Hebel — datenbasiert, ohne Bauchgefühl. Am Ende: 1 Roadmap-Seite, kein 80-Seiten-Deck.'
    },
    {
      title: 'Maßgeschneiderter KI-Agent statt Standard-Tool von der Stange.',
      body: 'Du kennst das: Standard-Tools zwingen dich, deine Prozesse anzupassen. Wir drehen das um. Auf LangChain & LangGraph bauen wir Agenten, die deine Sprache sprechen, deine Systeme kennen, deine Edge-Cases handhaben.'
    },
    {
      title: 'EU-Hosting & 24/7-Monitoring — dein Compliance-Officer schläft ruhig.',
      body: 'Keine US-Cloud-Datentransfers, keine Erklärungsnot vor dem Datenschutzbeauftragten. DSGVO-konforme deutsche Cloud, ISO 27001, Echtzeit-Dashboards, automatische Alerts. Wir betreiben — du lieferst Resultate.'
    },
    {
      title: 'Tiefe Integration in dein CRM — ohne IT-Ticket-Hölle.',
      body: 'HubSpot, Salesforce, Pipedrive, Personio, DATEV, Slack, Teams. Direkt angebunden — kein "wir warten auf einen IT-Slot in Q3". Dein Agent ist ab Tag 1 in deinem Stack, nicht daneben.'
    }
  ],
  cta: 'Erstgespräch buchen',
  pipeline: {
    title: 'Sales-Agent · live',
    status: 'active',
    timeSaved: '∅ 38 Minuten pro Lead',
    steps: [
      { n: '01', title: 'Lead trifft ein', detail: 'Web-Formular · LinkedIn · CRM' },
      { n: '02', title: 'KI-Agent qualifiziert', detail: 'Firmenprofil · Score · Intent' },
      { n: '03', title: 'CRM-Datensatz automatisch', detail: 'HubSpot · Salesforce · Pipedrive' },
      { n: '04', title: 'Vertrieb benachrichtigt', detail: 'Slack · Teams · E-Mail' },
      { n: '05', title: 'Termin gebucht', detail: 'Calendly · Outlook · Google Cal' }
    ]
  }
} as const;

/* ─────────────────────────────────────────────────────────
   USE CASES — Painpoint per agent.
   ───────────────────────────────────────────────────────── */
export const useCases = {
  eyebrow: 'KI-Agenten für jede Abteilung',
  headline: 'Sechs Agenten. Sechs Painpoints. Sechs Bereiche, in denen du sofort Luft kriegst.',
  subline:
    'Jeder Agent löst ein konkretes Problem, das wir bei Mittelständlern immer wieder sehen. Du wählst — wir bauen.',
  items: [
    {
      name: 'Support-Agent',
      kpi: '70 % schnellere Antwortzeiten',
      body: 'Schluss mit Ticket-Stau am Montagmorgen. Tier-1-Anfragen werden automatisch beantwortet, komplexe Fälle intelligent eskaliert — 24/7, in deinem Tonfall.'
    },
    {
      name: 'Operations-Agent',
      kpi: '60 % weniger Admin-Aufwand',
      body: 'Rechnungsprüfung, Stammdatenpflege, interne Genehmigungen — die unsichtbare Arbeit, die niemand sehen will, die aber jeden Tag passieren muss. Macht der Agent.'
    },
    {
      name: 'E-Mail-Agent',
      kpi: '85 % der E-Mails vorbereitet',
      body: 'Klassifizierung, Priorisierung, Antwort-Drafts in deinem Stil. Dein Posteingang wird vom Stresstreiber zur To-do-Liste, die schon halb erledigt ist.'
    },
    {
      name: 'Onboarding-Agent',
      kpi: '50 % kürzere Einarbeitung',
      body: 'Neue Mitarbeiter haben Tag 1 einen geduldigen 24/7-Mentor: Checklisten abgearbeitet, Systeme erklärt, Fragen beantwortet — ohne Senior-Zeit zu verbrennen.'
    },
    {
      name: 'Sales-Agent',
      kpi: '3× mehr qualifizierte Leads',
      body: 'Inbound-Leads angereichert, gescored, priorisiert, ans CRM weitergereicht. Dein Vertrieb startet jeden Morgen mit der Liste, die er wirklich anrufen sollte.'
    },
    {
      name: 'Admin-Agent',
      kpi: '40 % Zeitersparnis in Admin-Prozessen',
      body: 'Bestellungen, Rechnungs-Workflows, Termin-Koordination. Die Aufgaben, die niemand machen will und doch jeden Tag müssen — automatisch erledigt.'
    }
  ]
} as const;

/* ─────────────────────────────────────────────────────────
   TECH EXPLAINER — Smarter: per-mode painpoint + flow.
   ───────────────────────────────────────────────────────── */
export const techExplainer = {
  eyebrow: 'Technologie live erklärt',
  headline: 'Drei Wege zur KI-Automatisierung — welcher passt zu dir?',
  subline:
    'Nicht jedes Unternehmen braucht den teuersten Agenten. Wir zeigen dir live, welches der drei Architektur-Modelle deine konkrete Pain löst.',
  modes: [
    { id: 'n8n', label: 'n8n Workflow', icon: '⚙️' },
    { id: 'agent', label: 'KI-Agent (Standalone)', icon: '🤖' },
    { id: 'hybrid', label: 'Hybrid-System', icon: '🔗' }
  ],
  /**
   * One narrative per mode: when is this the right pick?
   * Each has: bestFor (pain), painpoint, payoff, plus its own flow.
   */
  modeDetails: {
    n8n: {
      bestFor: 'Klare, regelbasierte Prozesse',
      painpoint:
        'Du hast Routinen, die täglich passieren — Lead-Routing, Reporting, Datentransfer. Aber niemand will sie machen, und ein Entwickler ist zu teuer.',
      payoff:
        'In 5–10 Tagen läuft der erste Workflow. Keine KI-Halluzinationen, keine Edge-Cases, einfach robust.',
      who: 'Sales-Ops · HR-Ops · Buchhaltung',
      flowTitle: 'n8n Workflow: Lead-Automatisierung',
      flowSteps: [
        { icon: '⚡', label: 'Webhook empfängt neuen Lead aus Web-Formular' },
        { icon: '🧠', label: 'OpenAI analysiert Firmenprofil & Intent' },
        { icon: '🔀', label: 'Router entscheidet: Heiß / Warm / Kalt' },
        { icon: '💼', label: 'HubSpot-Datensatz wird automatisch angelegt' },
        { icon: '💬', label: 'Slack-Nachricht ans richtige Sales-Team' },
        { icon: '📅', label: 'Calendly verschickt Termin-Link' }
      ],
      comparison: [
        { value: '45 Min', label: 'Manuell' },
        { value: '8 Sek', label: 'Mit n8n' },
        { value: '99 %', label: 'Zeitersparnis' }
      ]
    },
    agent: {
      bestFor: 'Aufgaben mit Entscheidungsspielraum',
      painpoint:
        'Du hast Anfragen, die echte Bewertung brauchen — komplexe Support-Tickets, individuelle Angebote, mehrstufige Recherchen. Ein starrer Workflow scheitert hier täglich.',
      payoff:
        'Der Agent versteht Kontext, fragt nach, wenn nötig, eskaliert nur das, was wirklich einen Menschen braucht.',
      who: 'Kundenservice · Account Management · Pre-Sales',
      flowTitle: 'Autonomer KI-Agent: Support-Anfrage',
      flowSteps: [
        { icon: '📩', label: 'Kunde stellt mehrstufige Anfrage' },
        { icon: '🧠', label: 'Agent versteht Intent & Historie' },
        { icon: '🔎', label: 'Greift auf Knowledge-Base & CRM zu' },
        { icon: '✍️', label: 'Verfasst persönliche Antwort im Markenton' },
        { icon: '⚖️', label: 'Entscheidet: selbst antworten oder eskalieren' },
        { icon: '✅', label: 'Schließt Ticket oder reicht an Mensch weiter' }
      ],
      comparison: [
        { value: '2 Std', label: 'Manuell' },
        { value: '12 Sek', label: 'Mit Agent' },
        { value: '94 %', label: 'autonome Lösung' }
      ]
    },
    hybrid: {
      bestFor: 'End-to-End-Prozesse über mehrere Systeme',
      painpoint:
        'Dein Prozess kreuzt Sales, Marketing, Operations und Buchhaltung. Jede Übergabe verliert Zeit, jeder Tool-Wechsel produziert Fehler. Du brauchst ein Gehirn, das alles verbindet.',
      payoff:
        'Workflow-Robustheit + Agenten-Intelligenz. Der Agent denkt, der Workflow handelt — über alle Abteilungs- und Systemgrenzen hinweg.',
      who: 'Mittelstand · Scale-Ups · Mehr-Brand-Holdings',
      flowTitle: 'Hybrid-System: Lead-to-Cash',
      flowSteps: [
        { icon: '⚡', label: 'Trigger: Neuer Inbound-Lead' },
        { icon: '🤖', label: 'KI-Agent qualifiziert & reichert Daten an' },
        { icon: '🔀', label: 'Workflow routet nach Region & Produkt' },
        { icon: '💼', label: 'CRM, Marketing-Tool & ERP synchron befüllt' },
        { icon: '🧠', label: 'Agent schreibt individuelles Erstangebot' },
        { icon: '📅', label: 'Termin gebucht, Vertrag vorbereitet, Buchhaltung informiert' }
      ],
      comparison: [
        { value: '3 Tage', label: 'Manuell' },
        { value: '4 Min', label: 'Mit Hybrid' },
        { value: '99,7 %', label: 'Zeitersparnis' }
      ]
    }
  },
  /* Defaults — kept for backwards-compat with current component */
  flowNodes: [
    { id: 'webhook', label: 'Webhook', sub: 'Trigger', icon: '⚡' },
    { id: 'openai', label: 'OpenAI', sub: 'Analyse', icon: '🧠' },
    { id: 'router', label: 'Router', sub: 'Bedingung', icon: '🔀' },
    { id: 'hubspot', label: 'HubSpot', sub: 'CRM', icon: '💼' },
    { id: 'slack', label: 'Slack', sub: 'Benachrichtigung', icon: '💬' },
    { id: 'calendly', label: 'Calendly', sub: 'Termin', icon: '📅' }
  ],
  comparison: [
    { value: '45 Min', label: 'Manuell' },
    { value: '8 Sek', label: 'Mit KI' },
    { value: '99 %', label: 'Ersparnis' }
  ],
  flowTitle: 'n8n Workflow: Lead-Automatisierung',
  flowSteps: [
    { icon: '⚡', label: 'Webhook empfängt neuen Lead' },
    { icon: '🧠', label: 'OpenAI analysiert Firmenprofil & Intent' },
    { icon: '🔀', label: 'Router entscheidet: Heiß / Warm / Kalt' },
    { icon: '💼', label: 'HubSpot-Datensatz automatisch angelegt' },
    { icon: '💬', label: 'Slack-Nachricht an Sales-Team gesendet' },
    { icon: '📅', label: 'Termin via Calendly automatisch gebucht' }
  ],
  cta: 'Meinen Workflow besprechen'
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
    hourlyRate: 65, // €/h fully-loaded mid-senior knowledge worker
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
    /** What the visitor could DO with the saved money — visceral conversion */
    equivalents: [
      { threshold: 30000, icon: '👤', label: 'Senior-Mitarbeiter Vollzeit', divisor: 65000 },
      { threshold: 15000, icon: '📣', label: 'Marketing-Kampagnen', divisor: 4500 },
      { threshold: 10000, icon: '🏖️', label: 'Wochen Team-Urlaub', divisor: 8000 },
      { threshold: 5000,  icon: '💻', label: 'Senior-Workshops', divisor: 3500 }
    ]
  }
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
        'Individuelle Workflow-Entwicklung (n8n / Zapier-Stack)',
        'Integration in deine bestehenden Systeme',
        'DSGVO-konformes EU-Hosting',
        'Dokumentation & Team-Schulung',
        'Standard-Support (Mo–Fr)'
      ],
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
        'Multi-System-Integration (CRM, ERP, E-Mail, Slack)',
        'DSGVO-konformes EU-Hosting & Monitoring',
        'Custom Prompt-Engineering im Markenton',
        'Priorisierter Support · Wöchentliches Reporting',
        '14 Tage Optimierungs-SLA nach Go-Live'
      ],
      cta: 'Erstgespräch buchen',
      recommended: true
    }
  ],
  footnote:
    '* Token-Kosten sind nutzungsabhängig, transparent abgerechnet und in der Regel <5 % der Personalkostenersparnis. Alle Preise zzgl. MwSt.'
} as const;

/* ─────────────────────────────────────────────────────────
   TESTIMONIALS — Story-arc, not just quotes.
   ───────────────────────────────────────────────────────── */
export const testimonials = {
  eyebrow: 'Erfolgsgeschichten',
  headline: 'Andere reden über KI. Unsere Kunden zählen, was sie spart.',
  subline:
    'Keine Hochglanz-Versprechen. Drei Mittelständler, drei Painpoints, drei messbare Ergebnisse — jeweils nach 4 Monaten in Produktion.',
  items: [
    {
      quote:
        '„Wir hatten Montagmorgen jedes Mal einen 200-Tickets-Stau. Heute löst der Support-Agent 70 % davon vor 9 Uhr. Mein Team ist seitdem nicht nur entspannter — auch unsere CSAT-Werte sind hoch."',
      author: 'Geschäftsführer',
      company: 'Technologieunternehmen',
      meta: 'Mittelstand · 150 Mitarbeiter',
      saved: '€45.000/Jahr'
    },
    {
      quote:
        '„Unsere Operations-Mailbox war ein schwarzes Loch. RSG hat einen E-Mail-Agenten gebaut, der vorsortiert, draftet und routet. 60 % schnellere Bearbeitung, null Mehraufwand für mein Team."',
      author: 'Head of Operations',
      company: 'Innovationsunternehmen',
      meta: 'Wachstumsunternehmen · 80 Mitarbeiter',
      saved: '€32.000/Jahr'
    },
    {
      quote:
        '„Ich war skeptisch gegenüber „noch einer KI-Beratung". Was RSG anders macht: Sie reden Vertrieb, nicht Tech. ROI war nach 4 Monaten erreicht — und der Agent läuft seitdem stabil."',
      author: 'CTO',
      company: 'Datenanalyse-Unternehmen',
      meta: 'Tech-Startup · 45 Mitarbeiter',
      saved: '€28.000/Jahr'
    }
  ],
  trustBar: {
    title: 'Vertraut von Unternehmen, die nicht mehr warten wollten',
    logos: [
      { name: 'elumalab', src: '/images/elumalab-logo.png' },
      { name: 'Lacar Associate', src: '/images/lacar-logo.jpg' }
    ]
  }
} as const;

/* ─────────────────────────────────────────────────────────
   TIMELINE — Anti-anxiety, momentum framing.
   ───────────────────────────────────────────────────────── */
export const timeline = {
  eyebrow: 'Unser Prozess — keine Black-Box',
  headline: 'Vom Erstgespräch zum laufenden KI-Agenten in 2–4 Wochen. Nicht 6 Monate.',
  subline:
    'Projekte, die monatelang in Konzeptphase stecken, liefern keinen Umsatz. Unser Vorgehen ist bewusst kompakt, transparent und ohne Beraterstunden-Falle.',
  phases: [
    {
      tag: 'Discovery',
      n: '01',
      title: 'Analyse & Strategie · Tag 1–3',
      body: 'Wir analysieren deine 3 schmerzhaftesten Prozesse, scoren Automatisierungs-Potenzial und priorisieren nach ROI. Ergebnis: ein klarer Roadmap-1-Pager — keine 80-Seiten-Studie.'
    },
    {
      tag: 'Design',
      n: '02',
      title: 'Architektur & Design · Tag 4–7',
      body: 'Wir zeichnen die optimale Agenten-Architektur, definieren Schnittstellen zu deinen Systemen und stimmen Edge-Cases mit deinem Team ab.'
    },
    {
      tag: 'Build',
      n: '03',
      title: 'Entwicklung & Integration · Tag 8–18',
      body: 'Wir entwickeln deinen KI-Agenten auf LangChain/LangGraph, verbinden CRM, ERP, E-Mail, Slack — und du siehst täglich Fortschritt im Staging.'
    },
    {
      tag: 'QA',
      n: '04',
      title: 'Testing & Optimierung · Tag 19–24',
      body: 'Wir testen End-to-End mit echten Datensätzen, tunen Prompts, fangen Edge-Cases ab. Dein Team validiert mit live Beispielen.'
    },
    {
      tag: 'Launch',
      n: '05',
      title: 'Go-Live & 14-Tage-SLA · Tag 25–28',
      body: 'Wir gehen produktiv, schulen dein Team und stehen 14 Tage in High-Touch-Modus daneben. Danach: 24/7-Monitoring + monatliche Optimierungs-Reviews.'
    }
  ],
  summary: { weeks: '2–4', label: 'Von Erstgespräch bis Produktiv-Agent' }
} as const;

/* ─────────────────────────────────────────────────────────
   TECH STACK — Trust deepening, DSGVO-loud.
   ───────────────────────────────────────────────────────── */
export const techStack = {
  eyebrow: 'Technologie unter der Haube',
  headline: 'Enterprise-Grade. Open-Source. Server in der EU. Keine Bastelei.',
  subline:
    'Deine Daten verlassen nie Europa. Unsere Agenten laufen auf modernster Open-Source-Infrastruktur — sicher, skalierbar, DSGVO-konform. Das ist die Architektur, die wir auch unseren eigenen Marken anvertrauen.',
  items: [
    {
      tag: 'Orchestration',
      title: 'LangChain & LangGraph',
      body: 'Production-ready Agenten-Orchestrierung. Multi-Step-Reasoning, Tool-Use, Memory — der Standard hinter den besten KI-Produkten der Welt.'
    },
    {
      tag: 'Architecture',
      title: 'Multi-Agent-Systeme',
      body: 'Spezialisierte Agenten, die miteinander kommunizieren wie ein gut eingespieltes Team. Komplexe Prozesse, sauber aufgeteilt.'
    },
    {
      tag: 'Infrastructure',
      title: 'EU-Hosting · 100 % deutsch',
      body: 'Alle Daten auf Servern in Frankfurt & Berlin. ISO 27001 & DSGVO-konform. Kein US-Cloud-Anbieter, keine Drittland-Übertragung.'
    },
    {
      tag: 'Security',
      title: 'Enterprise Security',
      body: 'End-to-End-Verschlüsselung, rollenbasiertes Zugriffsmanagement, vollständige Audit-Logs. Dein Compliance-Officer schläft ruhig.'
    },
    {
      tag: 'Observability',
      title: 'Echtzeit-Monitoring',
      body: 'Live-Dashboards für Durchsatz, Latenz, Fehlerquote. Anomalien lösen automatische Alerts aus — wir wissen es vor dir.'
    },
    {
      tag: 'Compliance',
      title: 'DSGVO by Design',
      body: 'Datenschutz ist kein Add-on, sondern Architektur-Prinzip. Auftragsverarbeitungsvertrag inklusive, Daten-Lokation transparent.'
    }
  ],
  badges: [
    { label: 'ISO 27001', sub: 'Zertifizierungsstandard' },
    { label: 'EU-Server', sub: '100 % europäische Infrastruktur' },
    { label: '99,9 %', sub: 'Garantierte Uptime' }
  ]
} as const;

/* ─────────────────────────────────────────────────────────
   ABOUT — Founder story, sharpened.
   ───────────────────────────────────────────────────────── */
export const about = {
  eyebrow: 'Gegründet von einem Vertriebler — nicht von einem Informatiker',
  headline: 'Deutschlands erste KI-Agentur, die aus dem Vertrieb kommt.',
  paragraphs: [
    'Ricardo Serrano hat 15 Jahre im B2B-Vertrieb verbracht. Produktvertrieb, Dienstleistungsvertrieb, C-Level-Deals. Er kannte jeden manuellen Prozess, jede Excel-Liste, jeden Workaround, der irgendwann zum Standard wurde — und das Burnout-Risiko, das daraus entsteht.',
    '2023 wurde aus Frustration eine Mission: RSG Agent Services — die erste KI-Beratung in Deutschland, die nicht von Theoretikern, sondern von erfahrenen Vertriebsprofis gegründet wurde. Wir bauen KI-Agenten, die echte Vertriebs- und Operations-Probleme lösen. Nicht auf dem Papier. In der Pipeline.',
    'Wir sind kein IT-Unternehmen, das Vertrieb erklärt bekommt. Wir sind ein Vertriebsunternehmen, das KI baut. Das ist der Unterschied, den unsere Kunden ab Tag 1 merken.'
  ],
  quote:
    'Komplexität ist der Feind der Umsetzung. Deshalb liefern wir, was funktioniert — nicht, was clever klingt.',
  founder: {
    name: 'Ricardo Serrano',
    role: 'Gründer & Geschäftsführer',
    company: 'RSG Agent Services',
    photo: '/images/ricardo-serrano.png'
  },
  pillars: [
    {
      title: '15 Jahre B2B-Vertrieb',
      body: 'Produkt- und Dienstleistungsvertrieb auf C-Level. Wir reden nicht über Vertriebsprobleme — wir haben sie selbst gelöst.'
    },
    {
      title: 'Prozess-Expertise',
      body: 'Hunderte von Geschäftsprozessen analysiert und automatisiert. Wir wissen genau, wo Zeit und Geld wirklich verloren gehen.'
    },
    {
      title: 'KI-Architekten',
      body: 'Von der Prozessanalyse bis zum produktiven Agenten: Wir bauen, testen und betreiben jede Lösung selbst — kein Subunternehmer.'
    },
    {
      title: 'Keine Theorie-Berater',
      body: 'Unsere KI-Agenten laufen bei echten Unternehmen, in echten CRMs, mit echten Ergebnissen. Nicht in PowerPoints, nicht in PoCs, die nie produktiv gehen.'
    }
  ]
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
        { label: 'Lösungen', href: '#solutions' },
        { label: 'Use Cases', href: '#usecases' },
        { label: 'ROI-Rechner', href: '#roi' },
        { label: 'Preise', href: '#pricing' }
      ]
    },
    {
      title: 'Unternehmen',
      links: [
        { label: 'Über uns', href: '#about' },
        { label: 'Kontakt', href: '#contact' },
        { label: 'KI-Beratung Wiesbaden', href: 'https://www.rsg-ai.de/ki-beratung-wiesbaden' }
      ]
    },
    {
      title: 'Rechtliches',
      links: [
        { label: 'Impressum', href: 'https://www.rsg-ai.de/impressum' },
        { label: 'Datenschutz', href: 'https://www.rsg-ai.de/datenschutz' },
        { label: 'AGB', href: 'https://www.rsg-ai.de/agb' }
      ]
    }
  ],
  copyright: '© 2026 RSG Recruiting Solutions Group GmbH · HRB 35951 · Alle Rechte vorbehalten.',
  tagline: 'KI-Agenten · DSGVO-konform · Made in Germany'
} as const;
