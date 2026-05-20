/**
 * Case-study data — single source for the per-pipeline deep-dive pages.
 * Mirrors the homepage Pipeline section but with more depth.
 */

export type CaseStep = {
  icon: string; // lucide icon name (resolved in component)
  label: string;
  detail: string;
  tone?: 'input' | 'ai' | 'system' | 'output';
};

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  /** Project metadata for the case-study hero strip */
  meta: { k: string; v: string }[];
  /** Eyebrow + headline framing */
  eyebrow: string;
  headline: string;
  subline: string;
  problem: {
    headline: string;
    body: string;
    bullets: string[];
  };
  pipeline: {
    title: string;
    timeSaved: string;
    steps: CaseStep[];
  };
  results: {
    headline: string;
    kpis: { value: string; label: string; sub?: string }[];
  };
  quote: {
    text: string;
    author: string;
    company: string;
  };
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'sales-agent',
    title: 'Sales-Agent — Lead-Qualifizierung in 4,8 Sekunden',
    summary:
      'Inbound-Lead → KI-Qualifizierung → HubSpot → Slack → Termin. Vollautomatisch, 24/7, mit messbarem Score pro Lead.',
    meta: [
      { k: 'Year', v: '2026' },
      { k: 'Industry', v: 'B2B SaaS' },
      { k: 'Stack', v: 'LangChain · HubSpot · Slack' },
      { k: 'Duration', v: '3 Wochen' },
      { k: 'Status', v: 'Live · Produktion' },
    ],
    eyebrow: 'Case Study № 01 · Sales-Agent',
    headline: 'Aus 142 Leads täglich — die richtigen 47 qualifiziert.',
    subline:
      'Der Vertrieb startete jeden Morgen mit einer Excel-Liste aus Inbound-Formularen, LinkedIn und Empfehlungen. 142 Leads pro Tag. Niemand hatte Zeit, jeden zu prüfen. Die heißen Leads gingen unter.',
    problem: {
      headline: 'Das Problem',
      body:
        'Der Kunde — ein B2B-SaaS-Mittelständler — sammelte täglich ~142 Inbound-Leads aus 6 Quellen. Manuelle Qualifizierung dauerte ø 23 Min pro Lead. Ergebnis: Nur 30 % der Leads wurden überhaupt kontaktiert, davon die Hälfte zu spät.',
      bullets: [
        '142 Leads/Tag aus Web-Formular · LinkedIn · Empfehlung · Webinar · Demo-Anfrage',
        '23 Min ø Qualifizierungs-Zeit pro Lead → 54 h/Woche allein für Sichtung',
        '30 % Kontakt-Quote, davon 50 % > 24 h nach Eingang (Lead kalt)',
        '€220 K geschätzter Umsatzverlust pro Quartal durch verlorene Hot-Leads',
      ],
    },
    pipeline: {
      title: 'Sales-Agent · Lead-Pipeline',
      timeSaved: 'Ø 22,5 Min pro Lead gespart',
      steps: [
        { icon: 'Mail', label: 'Lead-Eingang', detail: 'Web-Form · LinkedIn · Webhook', tone: 'input' },
        { icon: 'Database', label: 'Anreicherung', detail: 'Clearbit · LinkedIn API · Domain', tone: 'system' },
        { icon: 'Brain', label: 'Intent-Score', detail: 'GPT-4 · 5 Achsen · 0–100', tone: 'ai' },
        { icon: 'Workflow', label: 'Routing', detail: 'Hot >80 · Warm 40-80 · Kalt <40', tone: 'ai' },
        { icon: 'Database', label: 'HubSpot', detail: 'Datensatz angelegt · Score · Tags', tone: 'system' },
        { icon: 'Slack', label: 'Slack-Ping', detail: '#sales-hot · @on-call', tone: 'system' },
        { icon: 'Calendar', label: 'Termin', detail: 'Calendly · 30 Min · ICS', tone: 'output' },
      ],
    },
    results: {
      headline: 'Was sich nach 4 Monaten geändert hat.',
      kpis: [
        { value: '47', label: 'Hot-Leads/Tag qualifiziert', sub: 'von 142 Inbound' },
        { value: '4,8 s', label: 'Ø End-to-End-Zeit', sub: 'Lead → Slack-Ping' },
        { value: '78 %', label: 'Kontakt-Quote in < 1 h', sub: 'vorher 15 %' },
        { value: '+34 %', label: 'Win-Rate', sub: 'Hot-Leads vs vorher gemischt' },
        { value: '€312 K', label: 'Gewonnener Umsatz / Quartal', sub: 'Conservative attribution' },
        { value: '54 h', label: 'Vertriebszeit gespart / Woche', sub: 'für echte Verkaufsgespräche' },
      ],
    },
    quote: {
      text:
        'Wir haben nicht „Lead-Volumen" Problem gelöst — wir hatten genug Leads. Wir hatten ein Aufmerksamkeits-Problem. RSG hat einen Agent gebaut, der genau die richtigen 30 % aus dem Inbound rausfiltert. Mein Team telefoniert seitdem wieder, statt Excel-Listen zu sortieren.',
      author: 'Head of Sales',
      company: 'B2B SaaS · 80 Mitarbeiter',
    },
  },
  {
    slug: 'support-agent',
    title: 'Support-Agent — Tier-1 ohne Menschen-Touch',
    summary:
      'Kundenanfrage → Knowledge-Base-Lookup → Brand-Voice-Antwort. 94 % der Tier-1-Tickets autonom gelöst, klare Eskalation für den Rest.',
    meta: [
      { k: 'Year', v: '2026' },
      { k: 'Industry', v: 'E-Commerce · DACH' },
      { k: 'Stack', v: 'LangChain · RAG · Zendesk' },
      { k: 'Duration', v: '4 Wochen' },
      { k: 'Status', v: 'Live · Produktion' },
    ],
    eyebrow: 'Case Study № 02 · Support-Agent',
    headline: '200 Tickets im Montagmorgen-Stau — heute sind es 12.',
    subline:
      'Der Support-Posteingang füllte sich übers Wochenende mit Standardanfragen — Versand, Retouren, Rechnungs-PDFs. Montagmorgens stand das Team vor 200+ offenen Tickets. Heute löst der Agent 94 % davon, bevor das Team online geht.',
    problem: {
      headline: 'Das Problem',
      body:
        'Der Kunde — ein deutscher E-Commerce-Mittelständler — hatte 280 ø Tickets/Werktag. 78 % davon waren Tier-1-Standardanfragen (Versand-Status, Retoure, Rechnungs-Re-Issue). Das Support-Team verbrachte 65 % seiner Zeit mit Anfragen, für die die Antwort in der FAQ stand — die Kunden aber nicht las.',
      bullets: [
        '280 Tickets/Werktag · 78 % Tier-1 · 22 % komplex',
        '65 % Support-Zeit für FAQ-Antworten (Versand · Retoure · Rechnung)',
        '14 min ø Bearbeitungszeit Tier-1 → 28 h/Tag Personal-Aufwand',
        'CSAT 3,4 / 5 — weil komplexe Tickets zu lange warteten',
      ],
    },
    pipeline: {
      title: 'Support-Agent · Ticket-Resolution',
      timeSaved: 'Ø 13,8 Min pro Tier-1-Ticket gespart',
      steps: [
        { icon: 'MessageSquare', label: 'Anfrage', detail: 'E-Mail · Chat · Form', tone: 'input' },
        { icon: 'FileSearch', label: 'KB-Suche', detail: 'RAG · 1.200 Artikel · Confidence', tone: 'ai' },
        { icon: 'Brain', label: 'Klassifikation', detail: 'Tier-1 / Tier-2 · Intent', tone: 'ai' },
        { icon: 'FileText', label: 'Antwort-Draft', detail: 'Markenton · DE/EN · Personalisiert', tone: 'ai' },
        { icon: 'Workflow', label: 'Confidence-Check', detail: '> 85 % autonom · < 85 % Mensch', tone: 'ai' },
        { icon: 'CheckCircle2', label: 'Lösung', detail: 'Auto-Antwort oder Eskalation', tone: 'output' },
      ],
    },
    results: {
      headline: 'Was sich nach 6 Monaten geändert hat.',
      kpis: [
        { value: '94 %', label: 'Tier-1 autonom gelöst', sub: 'von 78 % aller Tickets' },
        { value: '12 s', label: 'Ø Antwortzeit Tier-1', sub: 'vorher 14 Min' },
        { value: '4,7 / 5', label: 'CSAT', sub: 'vorher 3,4' },
        { value: '−28 h/Tag', label: 'Support-Zeit gespart', sub: 'für komplexe Tickets verfügbar' },
        { value: '0', label: 'Hotline-Stau Montagmorgens', sub: 'erste seit 3 Jahren' },
        { value: '€45 K/Jahr', label: 'Ø Ersparnis', sub: 'gesicherte Personalkosten' },
      ],
    },
    quote: {
      text:
        'Mein Team hatte Montagmorgens jedes Mal 200 Tickets Backlog. Heute zeigt das Dashboard 12 Tickets in der Warteschlange — alle Tier-2, weil der Agent den Rest schon erledigt hat. Mein Team ist seitdem nicht nur entspannter — auch unsere CSAT-Werte sind hoch.',
      author: 'Head of Customer Service',
      company: 'E-Commerce · 150 Mitarbeiter',
    },
  },
];
