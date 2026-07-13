/**
 * FAQ — pure data, importable from server components for JSON-LD
 * without crossing the React Server / Client boundary.
 */

export const FAQ: Array<{ q: string; a: string }> = [
  // ── KI-Telefonassistent – Rich-Snippet-optimiert ──────────────────────────
  {
    q: 'Was ist ein KI-Telefonassistent?',
    a: 'Ein KI-Telefonassistent von RSG AI übernimmt eingehende Anrufe automatisch, qualifiziert Anfragen, beantwortet häufige Fragen und leitet wichtige Gespräche weiter — 24/7, ohne Wartezeiten.',
  },
  {
    q: 'Wie viel kostet ein KI-Telefonassistent von RSG AI?',
    a: 'RSG AI bietet flexible Preismodelle ab 199 € netto/Monat (Paket Solo) zzgl. einmaligem Setup. Die genauen Kosten hängen vom Anrufvolumen und den gewünschten Funktionen ab. Kontaktieren Sie uns für ein individuelles Angebot.',
  },
  {
    q: 'Wie lange dauert die Einrichtung?',
    a: 'Ein RSG AI Telefonassistent ist in der Regel innerhalb von 3-5 Werktagen einsatzbereit. Wir übernehmen die komplette Einrichtung und Integration in Ihre bestehenden Systeme.',
  },
  {
    q: 'Spricht der KI-Assistent natürliches Deutsch?',
    a: 'Ja, RSG AI nutzt modernste Large Language Models mit natürlicher Sprachverarbeitung. Der Assistent kommuniziert flüssig auf Deutsch und erkennt auch Dialekte und regionale Ausdrücke.',
  },
  // ── Allgemeine Agent-FAQs ─────────────────────────────────────────────────
  {
    q: 'Wie schnell ist der erste Agent produktiv?',
    a: 'Audit am Montag → erster Agent in der zweiten Woche produktiv → voll integriert nach 4 Wochen. Wir liefern Sprint-basiert, mit wöchentlichen Demos statt Mega-Release am Ende.',
  },
  {
    q: 'Was passiert mit unseren Daten?',
    a: 'Gesprächs- und Sprachdaten werden in einem deutschen Rechenzentrum (Hetzner, Nürnberg) gespeichert. Teile der KI-Sprachverarbeitung laufen über zertifizierte EU-/US-Dienste auf Basis des EU-US Data Privacy Framework bzw. von Standardvertragsklauseln. Auftragsverarbeitungsvertrag inklusive, Daten-Lokation transparent — dein Datenschutzbeauftragter atmet durch.',
  },
  {
    q: 'Sind wir am Ende von eurer Infrastruktur abhängig?',
    a: 'Nein. Du bekommst Konfiguration, Daten, Dokumentation und bei individuell entwickelten Workflows den Quellcode. Der KI-Telefonassistent läuft auf der Telefonie-Plattform fonio (Wien) — mit eigenem Kundenkonto je Kunde, das auch ohne uns weitergeführt werden kann. Vendor-Lock-in ist ein Anti-Pattern, kein Geschäftsmodell.',
  },
  {
    q: 'Was kostet der Betrieb monatlich?',
    a: 'Hosting + Token-Kosten sind nutzungsabhängig und werden transparent durchgereicht — in der Regel < 5 % deiner Personalkostenersparnis. Du siehst pro Tag was der Agent gekostet und gespart hat.',
  },
  {
    q: 'Was wenn der Agent doch nicht das tut, was wir uns vorgestellt haben?',
    a: 'Wir liefern auf Festpreis-Basis mit klar definierten Akzeptanzkriterien aus dem Audit. Optimierungs-SLA in den ersten 14 Tagen nach Go-Live. Wenn der Agent die definierten KPIs nach 30 Tagen nicht erfüllt: Anpassung auf unsere Kosten.',
  },
  {
    q: 'Welche Systeme könnt ihr anbinden?',
    a: 'HubSpot · Salesforce · Pipedrive · Personio · DATEV · Slack · Microsoft Teams · Outlook · Calendly · Google Workspace · Stripe · REST-APIs · Webhooks. Wenn dein System dokumentiert ist, bauen wir die Integration.',
  },
  {
    q: 'Wir haben schon ChatGPT-Pro-Accounts — warum reicht das nicht?',
    a: 'Browser-ChatGPT ist ein Werkzeug. Ein KI-Agent ist ein System: er hat Zugriff auf dein CRM, kann Multi-Step-Logik ausführen, behält Kontext über Tage, eskaliert wenn er unsicher ist, läuft ohne dass jemand davor sitzt. Das sind Klassen-Unterschiede, keine Ausstattungs-Unterschiede.',
  },
];

export const FAQ_EN: Array<{ q: string; a: string }> = [
  {
    q: 'How fast is the first agent productive?',
    a: 'Audit on Monday → first agent productive in week two → fully integrated after 4 weeks. We deliver in sprints, with weekly demos instead of one mega-release at the end.',
  },
  {
    q: 'What happens to our data?',
    a: 'Conversation and voice data is stored in a German data center (Hetzner, Nuremberg). Parts of the AI speech processing run via certified EU/US services under the EU-US Data Privacy Framework or standard contractual clauses. Data processing agreement included, data location transparent — your data protection officer can breathe easy.',
  },
  {
    q: 'Will we end up dependent on your infrastructure?',
    a: 'No. You get configuration, data, documentation and — for custom-built workflows — the source code. The AI phone assistant runs on the fonio telephony platform (Vienna) with a separate customer account per client, which you can keep even without us. Vendor lock-in is an anti-pattern, not a business model.',
  },
  {
    q: 'What does monthly operation cost?',
    a: 'Hosting + token costs are usage-based and passed through transparently — typically under 5% of your staff-cost savings. You see per day what the agent cost and saved.',
  },
  {
    q: 'What if the agent does not do what we imagined?',
    a: 'We deliver on a fixed-price basis with clear acceptance criteria from the audit. Optimization SLA in the first 14 days after go-live. If the agent does not meet the defined KPIs after 30 days: we adjust at our cost.',
  },
  {
    q: 'Which systems can you connect?',
    a: 'HubSpot · Salesforce · Pipedrive · Personio · DATEV · Slack · Microsoft Teams · Outlook · Calendly · Google Workspace · Stripe · REST APIs · Webhooks. If your system is documented, we build the integration.',
  },
  {
    q: 'We already have ChatGPT Pro accounts — why is that not enough?',
    a: 'Browser ChatGPT is a tool. An AI agent is a system: it has access to your CRM, runs multi-step logic, keeps context over days, escalates when unsure, and runs without anyone sitting in front of it. These are class differences, not feature differences.',
  },
];
