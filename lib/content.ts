/**
 * Content quelle: https://www.rsg-ai.de/ (scraped 2026-05-13)
 * Texte 1:1 aus Live-Site übernommen. Lücken sind als TODO markiert.
 * Single source of truth für alle Sektionen.
 */

export const site = {
  name: 'RSG Agent Services',
  shortName: 'RSGAI',
  tagline: 'KI-Agenten made in Germany',
  positioning: 'Deutschlands erste KI-Builder aus dem Vertrieb',
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
    x: 'https://x.com/RSGAgentService',
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
  { label: 'Partner', href: 'https://www.rsg-ai.de/partner' },
  { label: 'Kontakt', href: '#contact' }
] as const;

export const hero = {
  eyebrow: 'Deutschlands erste KI-Builder aus dem Vertrieb',
  headlineKinetic: ['Wir kennen', 'deinen', 'Vertriebsalltag.', 'Und automatisieren ihn.'],
  subline:
    '15 Jahre B2B-Vertrieb & Recruiting. Heute bauen wir die KI-Agenten, die wir damals selbst gebraucht hätten — und betreiben sie für dich.',
  ctaPrimary: 'Agenten-Demo anfragen',
  ctaSecondary: 'Einsparpotenzial berechnen',
  trustChips: ['DSGVO-konform', 'Deutsche Ansprechpartner', 'Go-Live 2–4 Wochen']
} as const;

export const liveStats = [
  { value: '1.247', label: 'Tasks/Tag' },
  { value: '0.8s', label: 'Ø Zeit' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Automatisierung' },
  { value: '2–4', label: 'Wochen Go-Live' },
  { value: '35K€', label: 'Ø Jahresersparnis' },
  { value: '100%', label: 'DSGVO-konform' }
] as const;

export const liveAgents = {
  eyebrow: 'KI-Agenten live in Produktion',
  headline: 'Drei Agenten. Eine Sekunde. Dein Business automatisiert.',
  subline:
    'Während du diese Zeile liest, arbeiten KI-Agenten bei unseren Kunden — ohne Pause, ohne Fehler, ohne Wartezeit. Live-Ausgabe aus echten Pipelines.',
  agents: [
    {
      name: 'Sales-Agent',
      status: 'LIVE',
      promise: 'Kein Lead geht verloren.',
      metric: 'Qualifizierte Leads/Tag',
      metricValue: '47'
    },
    {
      name: 'E-Mail-Agent',
      status: 'LIVE',
      promise: 'Kein Postfach läuft über.',
      metric: 'Ø Bearbeitungszeit/E-Mail',
      metricValue: '0.3s'
    },
    {
      name: 'Support-Agent',
      status: 'LIVE',
      promise: '24/7 ohne Wartezeit.',
      metric: 'Tickets/Tag gelöst ohne Mensch',
      metricValue: '94%'
    }
  ],
  kpis: [
    { value: '12+', label: 'Kunden-Agenten aktiv' },
    { value: '38.000+', label: 'Automatisierte Tasks/Monat' },
    { value: '312%', label: 'Ø ROI nach 4 Monaten' }
  ],
  cta: 'Meinen Agenten bauen'
} as const;

export const problems = {
  eyebrow: 'Wir waren in deiner Situation',
  headline: 'Diese Probleme kennen wir aus eigener Erfahrung.',
  subline:
    'Über 15 Jahre in B2B-Vertrieb und Operations haben uns gelehrt, wo Unternehmen wirklich Geld und Zeit verlieren.',
  items: [
    {
      title: 'Dein Vertriebsteam verkauft — aber nicht wirklich.',
      body: 'Angebote schreiben, Leads nachfassen, CRM pflegen, Termine koordinieren. Deine besten Vertriebler verbringen mehr Zeit mit Administration als mit echten Kundengesprächen. Das kostet dich täglich Umsatz.',
      stat: { value: 'TODO:%', label: 'der Vertriebszeit geht für Nicht-Verkaufs-Aufgaben verloren' }
    },
    {
      title: 'Deine Mitarbeiter verschwenden Zeit mit Routineaufgaben.',
      body: 'E-Mails beantworten, Daten einpflegen, Berichte erstellen, Follow-ups setzen. Hochbezahlte Mitarbeiter verlieren täglich Stunden mit Aufgaben, die ein KI-Agent in Sekunden erledigt.',
      stat: { value: 'TODO:%', label: 'der Arbeitszeit entfällt auf wiederholbare, automatisierbare Aufgaben' }
    },
    {
      title: 'Jede Woche ohne Automatisierung ist bares Geld.',
      body: 'Wir haben das selbst erlebt: Während du noch evaluierst und intern diskutierst, läuft deine Pipeline weiter durch Löcher. Kein KI-Tool rettet dich — nur ein funktionierender Prozess tut es.',
      stat: { value: 'TODO:K€', label: 'Jahresverlust pro nicht automatisiertem Vertriebsprozess' }
    },
    {
      title: 'ChatGPT ist kein Vertriebssystem.',
      body: 'Ja, wir wissen — du hast schon Prompts gebaut, Workflows ausprobiert, ChatGPT im Team eingeführt. Ohne tiefe CRM-Integration, Prozesswissen und technische Architektur bleibt jedes KI-Experiment Spielerei.',
      stat: { value: 'TODO:%', label: 'der KI-Initiativen scheitern ohne Vertriebsprozess-Know-how' }
    }
  ],
  outro: {
    title: 'Wir haben den Weg schon gegangen — für uns und für unsere Kunden.',
    body: 'Als erfahrene Unternehmer und KI-Architekten wissen wir genau, welche KI-Agenten wirklich helfen — und welche nur schick aussehen. Wir bauen, wir betreiben, wir liefern messbare Ergebnisse.',
    cta: 'Zeig mir die Lösungen'
  }
} as const;

export const solutions = {
  eyebrow: 'Wir bauen. Wir betreiben. Wir liefern.',
  headline: 'Kein Consultant-Report. Echte KI-Agenten in Produktion.',
  subline:
    'Andere beraten nur. Wir analysieren, bauen, integrieren und betreiben deinen KI-Agenten dauerhaft — damit du dich aufs Verkaufen konzentrierst.',
  steps: [
    {
      title: 'Analyse deiner Prozesse',
      body: 'Identifikation von Automatisierungspotenzial in deinen bestehenden Workflows — präzise, datenbasiert, ohne Bauchgefühl.'
    },
    {
      title: 'Design spezialisierter AI Agents',
      body: 'Auf Basis von LangChain und LangGraph, exakt zugeschnitten auf deine Anforderungen und Systemlandschaft.'
    },
    {
      title: 'Sicheres Hosting & Monitoring',
      body: 'DSGVO-konforme EU-Infrastruktur mit 24/7-Überwachung, Alerting und kontinuierlicher Optimierung.'
    },
    {
      title: 'Integration in deine Systeme',
      body: 'Direkte Anbindung an CRM, HR- und Fachsysteme deines Unternehmens — ohne Unterbrechung des Betriebs.'
    }
  ],
  cta: 'Erstgespräch buchen',
  pipeline: {
    title: 'Sales-Agent',
    status: 'active',
    timeSaved: '∅ 38 Minuten',
    steps: [
      { n: '01', title: 'Neuer Lead eingehend', detail: 'Web-Formular · LinkedIn · CRM' },
      { n: '02', title: 'KI-Agent qualifiziert Lead', detail: 'Firmenprofil · Score · Priorisierung' },
      { n: '03', title: 'CRM automatisch befüllt', detail: 'HubSpot · Salesforce · Pipedrive' },
      { n: '04', title: 'Vertrieb benachrichtigt', detail: 'Slack · E-Mail · MS Teams' },
      { n: '05', title: 'Termin automatisch gebucht', detail: 'Calendly · Outlook · Google Cal' }
    ]
  }
} as const;

export const useCases = {
  eyebrow: 'Use Cases',
  headline: 'KI-Agenten für jede Abteilung.',
  subline:
    'Von Sales über Support bis hin zu Operations — unsere Agenten passen sich deinen Workflows an.',
  items: [
    {
      name: 'Support-Agent',
      kpi: '70 % schnellere Antwortzeiten',
      body: 'Automatisiert Tier-1-Anfragen, eskaliert intelligent an Menschen. 24/7 erreichbar.'
    },
    {
      name: 'Operations-Agent',
      kpi: '60 % weniger Admin-Aufwand',
      body: 'Automatisiert Rechnungsprüfung, Datenpflege und interne Genehmigungsprozesse.'
    },
    {
      name: 'E-Mail-Agent',
      kpi: '85 % automatisierte Antworten',
      body: 'Klassifiziert eingehende E-Mails und erstellt Antwortentwürfe für Review.'
    },
    {
      name: 'Onboarding-Agent',
      kpi: '50 % kürzere Einarbeitungszeit',
      body: 'Führt neue Mitarbeiter durch Checklisten, Systeme und Schulungen.'
    },
    {
      name: 'Sales-Agent',
      kpi: '3x mehr qualifizierte Leads',
      body: 'Qualifiziert Inbound-Leads, reichert CRM-Daten an und priorisiert Outreach.'
    },
    {
      name: 'Admin-Agent',
      kpi: '40 % Zeitersparnis in Admin-Prozessen',
      body: 'Automatisiert Bestellungen, Rechnungsprüfung und Termin-Koordination.'
    }
  ]
} as const;

export const techExplainer = {
  eyebrow: 'Technologie live erklärt',
  headline: 'Wie funktioniert KI-Automatisierung?',
  subline:
    'Live-Visualisierung realer Architekturen — von einfachen n8n-Flows bis zu autonomen KI-Agenten.',
  modes: [
    { id: 'n8n', label: 'n8n Workflow', icon: '⚙️' },
    { id: 'agent', label: 'KI-Agent (Standalone)', icon: '🤖' },
    { id: 'hybrid', label: 'Hybrid-System', icon: '🔗' }
  ],
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
    { value: '99%', label: 'Ersparnis' }
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

export const roi = {
  eyebrow: 'Rentabilitätskalkulator',
  headline: 'Wo lohnt sich KI in Ihrem Unternehmen?',
  subline:
    'Wählen Sie Ihre Abteilungen, geben Sie die Mitarbeiterzahl ein und sehen Sie sofort das Einsparpotenzial durch KI-Automatisierung.',
  departments: [
    { id: 'recruiting', label: 'Recruiting', body: 'Screening, Erstansprache, Interview-Scheduling' },
    { id: 'marketing', label: 'Marketing', body: 'Content-Erstellung, Social Media, Kampagnen-Analyse' },
    { id: 'accounting', label: 'Buchhaltung', body: 'Rechnungsverarbeitung, Mahnwesen, Reporting' },
    { id: 'sales', label: 'Sales / Vertrieb', body: 'Lead-Qualifizierung, Follow-ups, CRM-Pflege' },
    { id: 'bd', label: 'Business Development', body: 'Marktanalyse, Wettbewerbsmonitoring, Outreach' },
    { id: 'support', label: 'Kundenservice', body: 'Ticket-Bearbeitung, FAQ, Chatbot-Support' },
    { id: 'consulting', label: 'Beratung / Consulting', body: 'Research, Präsentationen, Dokumentation' },
    { id: 'it', label: 'IT / Administration', body: 'Helpdesk, Monitoring, Dokumentation' }
  ]
} as const;

export const pricing = {
  eyebrow: 'Preise',
  headline: 'Du kennst dein Einsparpotenzial. Jetzt vergleich die Investition.',
  subline:
    'Wähle das Modell, das zu deinem Unternehmen passt. Beide rechnen sich schneller, als du denkst.',
  tiers: [
    {
      name: 'Automatische Workflows',
      tagline: 'Automatisierte Prozesse und Workflows für wiederkehrende Aufgaben.',
      price: 'ab 2.500 €',
      priceSuffix: 'einmalig',
      note: 'zzgl. Wartung und Token-Kosten*',
      features: [
        'Individuelle Workflow-Entwicklung',
        'Integration in bestehende Systeme',
        'DSGVO-konformes Hosting',
        'Dokumentation und Schulung',
        'Standard-Support (Mo-Fr)'
      ],
      cta: 'Erstgespräch buchen',
      recommended: false
    },
    {
      name: 'KI Agent Autonom',
      tagline: 'Eigenständige KI-Agenten, die komplexe Aufgaben autonom erledigen.',
      price: 'ab 5.000 €',
      priceSuffix: 'einmalig',
      note: 'zzgl. Wartung und Token-Kosten*',
      features: [
        'Autonomer KI-Agent mit Entscheidungsfähigkeit',
        'Multi-System-Integration',
        'DSGVO-konformes Hosting',
        'Custom Prompt Engineering',
        'Priorisierter Support',
        'Wöchentliches Reporting'
      ],
      cta: 'Erstgespräch buchen',
      recommended: true
    }
  ],
  footnote:
    '* Token-Kosten sind nutzungsabhängig und werden transparent abgerechnet. Alle Preise zzgl. MwSt.'
} as const;

export const testimonials = {
  eyebrow: 'Erfolgsgeschichten',
  headline: 'Andere reden über KI. Unsere Kunden messen sie.',
  subline:
    'Keine Versprechen — nur gemessene Ergebnisse. Diese Unternehmen haben sich entschieden und profitieren täglich davon.',
  items: [
    {
      quote:
        'RSG Agent Services hat unsere Kundenservice-Prozesse revolutioniert. 70% Zeitersparnis und deutlich zufriedenere Kunden.',
      author: 'Geschäftsführer',
      company: 'Technologieunternehmen',
      meta: 'Mittelstand · 150 Mitarbeiter',
      saved: '€45.000/Jahr'
    },
    {
      quote:
        'Die KI-Lösung für unsere E-Mail-Verarbeitung hat die Bearbeitungszeit um 60% reduziert. Professionell und zuverlässig umgesetzt.',
      author: 'Head of Operations',
      company: 'Innovationsunternehmen',
      meta: 'Wachstumsunternehmen · 80 Mitarbeiter',
      saved: '€32.000/Jahr'
    },
    {
      quote: 'Exzellente Beratung und maßgeschneiderte Automatisierung. ROI bereits nach 4 Monaten erreicht.',
      author: 'CTO',
      company: 'Datenanalyse-Unternehmen',
      meta: 'Tech-Startup · 45 Mitarbeiter',
      saved: '€28.000/Jahr'
    }
  ],
  trustBar: {
    title: 'Vertraut von innovativen Unternehmen',
    logos: [
      { name: 'elumalab', src: '/images/elumalab-logo.png' },
      { name: 'Lacar Associate', src: '/images/lacar-logo.jpg' }
    ]
  }
} as const;

export const timeline = {
  eyebrow: 'Unser Prozess — keine Blackbox',
  headline: 'Vom Erstgespräch zum laufenden Agenten in 2–4 Wochen.',
  subline:
    'Projekte, die monatelang in Planung stecken, liefern keinen Umsatz. Unser Prozess ist bewusst schnell, klar und ohne bürokratischen Overhead.',
  phases: [
    {
      tag: 'Discovery',
      n: '01',
      title: 'Analyse & Strategie',
      body: 'Wir analysieren deine Prozesse, identifizieren Automatisierungspotenzial und entwickeln eine maßgeschneiderte KI-Strategie.'
    },
    {
      tag: 'Design',
      n: '02',
      title: 'Konzeption & Design',
      body: 'Wir konzipieren die optimale Agenten-Architektur und erstellen ein detailliertes Design für deine Lösung.'
    },
    {
      tag: 'Build',
      n: '03',
      title: 'Entwicklung & Integration',
      body: 'Wir entwickeln deine KI-Agenten und integrieren sie nahtlos in deine bestehenden Systeme (CRM, HR, E-Mail).'
    },
    {
      tag: 'QA',
      n: '04',
      title: 'Testing & Optimierung',
      body: 'Wir testen alle Funktionen gründlich und optimieren die Agenten für maximale Effizienz und Präzision.'
    },
    {
      tag: 'Launch',
      n: '05',
      title: 'Training & Support',
      body: 'Wir schulen dein Team und bieten kontinuierlichen Support sowie proaktive Weiterentwicklung deiner Agenten.'
    }
  ],
  summary: { weeks: '2–4', label: 'Von Erstgespräch bis Go-Live' }
} as const;

export const techStack = {
  eyebrow: 'Technologie',
  headline: 'Unter der Haube: Enterprise-Grade, keine Bastelei.',
  subline:
    'Deine Daten bleiben in Europa. Unsere Agenten laufen auf modernster Open-Source-Infrastruktur — sicher, skalierbar und DSGVO-konform.',
  items: [
    {
      tag: 'Orchestration',
      title: 'LangChain & LangGraph',
      body: 'Agenten-Orchestrierung mit modernster Open-Source-Technologie — robust und production-ready.'
    },
    {
      tag: 'Architecture',
      title: 'Multi-Agent Architecture',
      body: 'Vernetzte Agenten, die miteinander kommunizieren und kooperieren — für komplexe Prozessautomatisierung.'
    },
    {
      tag: 'Infrastructure',
      title: 'Europäisches Hosting',
      body: 'Alle Daten auf EU-Servern. ISO 27001 & DSGVO-konform — keine Kompromisse beim Datenschutz.'
    },
    {
      tag: 'Security',
      title: 'Enterprise Security',
      body: 'End-to-End-Verschlüsselung, Zugriffsmanagement und vollständige Audit-Logs für maximale Kontrolle.'
    },
    {
      tag: 'Observability',
      title: 'Echtzeit-Monitoring',
      body: 'Dashboards für Performance, Durchsatz und Fehlerquoten — damit du immer weißt, was deine Agenten tun.'
    },
    {
      tag: 'Compliance',
      title: 'DSGVO by Design',
      body: 'Datenschutz ist kein Add-on, sondern die Grundlage unserer Architektur — von Anfang an eingebaut.'
    }
  ],
  badges: [
    { label: 'ISO 27001', sub: 'Zertifizierungsstandard' },
    { label: 'EU-Server', sub: '100% europäische Infrastruktur' },
    { label: '99.9%', sub: 'Garantierte Uptime' }
  ]
} as const;

export const about = {
  eyebrow: 'Gegründet von einem Vertriebler',
  headline: 'Deutschlands erste KI-Agentur, die aus dem Vertrieb kommt.',
  paragraphs: [
    'Ricardo Serrano hat 15 Jahre im B2B-Vertrieb verbracht — Produktvertrieb, Dienstleistungsvertrieb, C-Level-Deals. Er kannte jeden manuellen Prozess, jede Excel-Liste, jeden Workaround, der irgendwann zum Standard wurde.',
    '2023 wurde aus dieser Frustration eine Mission: RSG Agent Services — die erste KI-Beratung in Deutschland, die nicht von Theoretikern, sondern von erfahrenen Vertriebsprofis gegründet wurde. Wir bauen KI-Agenten, die echte Vertriebsprobleme lösen. Nicht auf dem Papier — in der Praxis.',
    'Wir sind kein IT-Unternehmen, das Vertrieb erklärt bekommt. Wir sind ein Vertriebsunternehmen, das KI baut.'
  ],
  quote: 'Komplexität ist der Feind der Umsetzung. Deshalb liefern wir, was wirklich funktioniert.',
  founder: {
    name: 'Ricardo Serrano',
    role: 'Geschäftsführer',
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
      body: 'Hunderte von Geschäftsprozessen analysiert und automatisiert. Wir wissen, wo Zeit und Geld wirklich verloren gehen.'
    },
    {
      title: 'KI-Architekten',
      body: 'Von der Prozessanalyse bis zum produktiven Agenten: Wir bauen, testen und betreiben jede Lösung selbst.'
    },
    {
      title: 'Keine Theorie-Berater',
      body: 'Unsere KI-Agenten laufen bei echten Unternehmen, in echten CRMs, mit echten Ergebnissen — nicht in PowerPoints.'
    }
  ]
} as const;

export const finalCta = {
  eyebrow: 'Lass uns reden',
  headline: '30 Minuten. Kein Pitch. Nur echte Antworten.',
  subline:
    'Ricardo nimmt sich persönlich Zeit für dich. Wir schauen gemeinsam auf deine Prozesse — und sagen dir ehrlich, wo ein KI-Agent den größten Hebel hat.',
  badge: 'Kostenlos & unverbindlich',
  ctaTitle: '30-Min. Erstgespräch',
  ctaBody: 'Wir zeigen dir deinen konkreten Automatisierungs-ROI.',
  ctaButton: 'Termin buchen',
  responseSla: 'Antwortet innerhalb 24h',
  agentOptions: [
    'Support-Agent',
    'E-Mail-Agent',
    'Sales-Agent',
    'Onboarding-Agent',
    'Operations-Agent',
    'Individuelle Lösung'
  ]
} as const;

export const footer = {
  description:
    'KI-Agenten, die deine Geschäftsprozesse 24/7 automatisieren. DSGVO-konform, made in Germany.',
  groups: [
    {
      title: 'Lösungen',
      links: [
        { label: 'Support-Agent', href: '#usecases' },
        { label: 'E-Mail-Agent', href: '#usecases' },
        { label: 'Sales-Agent', href: '#usecases' },
        { label: 'Automatische Workflows', href: '#pricing' }
      ]
    },
    {
      title: 'Unternehmen',
      links: [
        { label: 'Über uns', href: '#about' },
        { label: 'Partner', href: 'https://www.rsg-ai.de/partner' },
        { label: 'Vision & Mission', href: 'https://www.rsg-ai.de/vision-mission' },
        { label: 'KI-Beratung Wiesbaden', href: 'https://www.rsg-ai.de/ki-beratung-wiesbaden' },
        { label: 'Preise', href: '#pricing' },
        { label: 'Kontakt', href: '#contact' }
      ]
    },
    {
      title: 'Unsere Marken',
      links: [
        { label: 'RSG Recruiting Solutions', href: 'https://www.recruiting-sg.de' },
        { label: 'elumalab', href: 'https://www.elumalab.com' },
        { label: 'Lacar Associate', href: 'https://www.lacar-associate.de' },
        { label: 'Lacar eLearning', href: 'https://lacar-elearning.com' }
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
  tagline: 'Powered by KI-Agenten-Technologie'
} as const;

