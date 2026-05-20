/**
 * FAQ — pure data, importable from server components for JSON-LD
 * without crossing the React Server / Client boundary.
 */

export const FAQ: Array<{ q: string; a: string }> = [
  {
    q: 'Wie schnell ist der erste Agent produktiv?',
    a: 'Audit am Montag → erster Agent in der zweiten Woche produktiv → voll integriert nach 4 Wochen. Wir liefern Sprint-basiert, mit wöchentlichen Demos statt Mega-Release am Ende.',
  },
  {
    q: 'Was passiert mit unseren Daten?',
    a: 'Alle Daten bleiben in deutschen Rechenzentren (Frankfurt + Berlin). Kein US-Cloud-Anbieter, keine Drittland-Übertragung. Auftragsverarbeitungsvertrag inklusive, Daten-Lokation transparent — dein Datenschutzbeauftragter atmet durch.',
  },
  {
    q: 'Sind wir am Ende von eurer Infrastruktur abhängig?',
    a: 'Nein. Du bekommst Quellcode, Konfiguration, Daten und Dokumentation. Falls du irgendwann ohne uns weitermachen willst, kannst du das. Vendor-Lock-in ist ein Anti-Pattern, kein Geschäftsmodell.',
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
