/**
 * Insights — Kurz-Essays, die wir wöchentlich auf LinkedIn veröffentlichen.
 *
 * Hier laufen sie SEO-tauglich auf rsg-ai.de mit, mit Cross-Link zur
 * LinkedIn-Variante. Bewusst kein MDX/CMS — eine Datei, eine Wahrheit.
 */

export type Insight = {
  slug: string;
  date: string;            // ISO YYYY-MM-DD
  readingTime: string;     // z.B. "4 min"
  tag: 'Pipeline-Teardown' | 'Pricing' | 'Hiring' | 'Stack' | 'Anti-Pattern';
  title: string;
  excerpt: string;
  /** Paragraphs as plain strings — first line is dropcap-styled */
  body: string[];
  linkedinUrl?: string;
};

export const INSIGHTS: Insight[] = [
  {
    slug: 'warum-94-prozent-ki-projekte-scheitern',
    date: '2026-05-15',
    readingTime: '4 min',
    tag: 'Anti-Pattern',
    title: 'Warum 94 % aller KI-Projekte im Mittelstand scheitern.',
    excerpt:
      'Drei Muster aus 40 Discovery-Calls. Keine technische Schuld — alle drei sind organisatorisch.',
    body: [
      'Wir hatten in den letzten zwölf Monaten 40 Discovery-Calls mit Mittelständlern. 38 wollten einen KI-Agenten. Drei haben wir gebaut. Nicht weil die anderen 35 keine Use Cases hatten — sondern weil das Setup im Unternehmen noch nicht trug. Hier die drei Muster, die wir immer wieder sehen.',
      'Erstens: Niemand besitzt den Prozess. KI automatisiert einen Workflow. Wenn dieser Workflow heute schon niemandem im Unternehmen gehört, wird er auch nach der Automatisierung nicht gewartet. Der Agent läuft drei Wochen, dann ändert sich das CRM-Feld, dann liegt der Agent flach, dann ruft niemand an, dann wars das. Owner first, Agent second.',
      'Zweitens: Die Daten leben in Köpfen. „Das spürt man halt" ist kein Trainings-Input. Wenn deine besten Mitarbeiter:innen den Prozess auch nicht in drei Sätzen erklären können, kann der Agent ihn auch nicht lernen. Wissen muss vor der Automatisierung dokumentiert werden — sonst automatisierst du Tribal Knowledge weg.',
      'Drittens: Der Entscheider sitzt nicht im Raum. Mittelständische KI-Projekte ziehen sich um Monate, wenn der Sponsor erst am Ende des Sprints unterschreibt. Wir verlangen mittlerweile: CEO oder COO, eine Stunde pro Woche, im Sprint-Call. Wer das nicht zusagt, kriegt keine Pipeline.',
      'Daher unsere Faustregel: Bevor wir Code schreiben, prüfen wir mit unserer ROI-Checkliste 12 Fragen. Wenn vier davon rot sind, sagen wir ab. Lieber drei statt fünf Projekte — aber alle drei laufen nach sechs Monaten noch.',
    ],
    linkedinUrl:
      'https://www.linkedin.com/newsletters/mittelstand-automatisiert-7458498915005431808/',
  },
];
