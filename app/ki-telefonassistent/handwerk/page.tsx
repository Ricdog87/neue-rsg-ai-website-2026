import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KI-Telefonassistent fürs Handwerk – 24/7",
  description: "Dein KI-Telefonassistent nimmt Anrufe an, qualifiziert Anfragen und bucht Termine – auch auf der Baustelle. DSGVO, deutsche Server. Jetzt Demo anhören.",
  alternates: { canonical: "https://www.rsg-ai.de/ki-telefonassistent/handwerk" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "KI-Telefonassistent fürs Handwerk – 24/7",
    description: "Dein KI-Telefonassistent nimmt Anrufe an, qualifiziert Anfragen und bucht Termine – auch auf der Baustelle. DSGVO, deutsche Server. Jetzt Demo anhören.",
    url: "https://www.rsg-ai.de/ki-telefonassistent/handwerk",
    siteName: "RSG Agent Services",
    locale: "de_DE",
    type: "website",
    images: ["https://www.rsg-ai.de/opengraph-image"],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Start", "item": "https://www.rsg-ai.de" },
      { "@type": "ListItem", "position": 2, "name": "KI-Telefonassistent", "item": "https://www.rsg-ai.de/ki-telefonassistent" },
      { "@type": "ListItem", "position": 3, "name": "Handwerk", "item": "https://www.rsg-ai.de/ki-telefonassistent/handwerk" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "KI-Telefonassistent",
    "name": "KI-Telefonassistent fürs Handwerk",
    "provider": {
      "@type": "ProfessionalService",
      "name": "RSG Agent Services",
      "url": "https://www.rsg-ai.de",
      "telephone": "+49 176 60772556",
      "address": { "@type": "PostalAddress", "streetAddress": "Klingholzstraße 7", "postalCode": "65189", "addressLocality": "Wiesbaden", "addressCountry": "DE" }
    },
    "areaServed": { "@type": "Country", "name": "Deutschland" },
    "availableChannel": { "@type": "ServiceChannel", "serviceUrl": "https://www.rsg-ai.de/ki-telefonassistent/handwerk", "servicePhone": "+49 30 826 87804" },
    "url": "https://www.rsg-ai.de/ki-telefonassistent/handwerk",
    "description": "Dein KI-Telefonassistent nimmt Anrufe an, qualifiziert Anfragen und bucht Termine – auch auf der Baustelle. DSGVO, deutsche Server. Jetzt Demo anhören."
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Funktioniert das, wenn ich den ganzen Tag auf der Baustelle bin?", "acceptedAnswer": { "@type": "Answer", "text": "Genau dafür ist es gebaut. Der Agent nimmt alle Anrufe an, qualifiziert sie und schickt dir strukturierte Leads — du entscheidest abends in 5 Minuten, wen du zurückrufst." } },
      { "@type": "Question", "name": "Kann der Agent direkt Angebote oder Aufträge erstellen?", "acceptedAnswer": { "@type": "Answer", "text": "Er erfasst alle Auftragsdaten strukturiert und kann sie in deine Software übergeben. Die Angebotserstellung lässt sich als Workflow ergänzen — das schauen wir uns im Erstgespräch an." } },
      { "@type": "Question", "name": "Was kostet das für einen Handwerksbetrieb?", "acceptedAnswer": { "@type": "Answer", "text": "Festpreis-Einrichtung ab 2.500 €, zzgl. nutzungsabhängiger Kosten (meist unter 5 % der eingesparten Zeit). Bei wenigen gewonnenen Zusatzaufträgen pro Monat rechnet sich das sofort." } }
    ]
  }
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <h1>KI-Telefonassistent fürs Handwerk</h1>
        <p>Du bist auf der Baustelle — und das Telefon klingelt ins Leere. Jeder verpasste Anruf ist ein verlorener Auftrag.</p>
        <section>
          <h2>Was der Agent für Handwerk übernimmt</h2>
          <ul>
            <li><strong>Nimmt an, während du arbeitest</strong> — 24/7, auch wenn du die Hände voll hast oder auf dem Dach stehst.</li>
            <li><strong>Qualifiziert die Anfrage</strong> — Gewerk, Ort, Dringlichkeit, Budget: der Agent klärt das Wichtigste und schickt dir den fertigen Lead aufs Handy.</li>
            <li><strong>Bucht Termine & Rückrufe</strong> — Vergibt Besichtigungstermine im Kalender oder vereinbart einen Rückruf.</li>
            <li><strong>Notfälle erkannt & priorisiert</strong> — Wasserrohrbruch um 23 Uhr? Der Agent erkennt Dringlichkeit und leitet sofort weiter.</li>
          </ul>
          <p>Anbindung an gängige Handwerkersoftware und Kalender. Eigene Rufnummer oder Anbindung deiner bestehenden Anlage.</p>
        </section>
        <section>
          <h2>Häufige Fragen</h2>
          <details><summary>Funktioniert das, wenn ich den ganzen Tag auf der Baustelle bin?</summary><p>Genau dafür ist es gebaut. Der Agent nimmt alle Anrufe an, qualifiziert sie und schickt dir strukturierte Leads — du entscheidest abends in 5 Minuten, wen du zurückrufst.</p></details>
          <details><summary>Kann der Agent direkt Angebote oder Aufträge erstellen?</summary><p>Er erfasst alle Auftragsdaten strukturiert und kann sie in deine Software übergeben. Die Angebotserstellung lässt sich als Workflow ergänzen.</p></details>
          <details><summary>Was kostet das für einen Handwerksbetrieb?</summary><p>Festpreis-Einrichtung ab 2.500 €, zzgl. nutzungsabhängiger Kosten (meist unter 5 % der eingesparten Zeit).</p></details>
        </section>
        <p><a href="https://www.rsg-ai.de/termin">Erstgespräch buchen</a></p>
      </main>
    </>
  );
}
