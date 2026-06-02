import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KI-Telefonassistent für Hausverwaltungen | RSG AI",
  description: "Mieter-Anrufe von Schadensmeldung bis Notfall – automatisch angenommen, strukturiert erfasst, priorisiert weitergeleitet. DSGVO, EU-Hosting.",
  alternates: { canonical: "https://www.rsg-ai.de/ki-telefonassistent/hausverwaltung" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "KI-Telefonassistent für Hausverwaltungen | RSG AI",
    description: "Mieter-Anrufe von Schadensmeldung bis Notfall – automatisch angenommen, strukturiert erfasst, priorisiert weitergeleitet. DSGVO, EU-Hosting.",
    url: "https://www.rsg-ai.de/ki-telefonassistent/hausverwaltung",
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
      { "@type": "ListItem", "position": 3, "name": "Hausverwaltungen", "item": "https://www.rsg-ai.de/ki-telefonassistent/hausverwaltung" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "KI-Telefonassistent",
    "name": "KI-Telefonassistent für Hausverwaltungen",
    "provider": {
      "@type": "ProfessionalService",
      "name": "RSG Agent Services",
      "url": "https://www.rsg-ai.de",
      "telephone": "+49 176 60772556",
      "address": { "@type": "PostalAddress", "streetAddress": "Klingholzstraße 7", "postalCode": "65189", "addressLocality": "Wiesbaden", "addressCountry": "DE" }
    },
    "areaServed": { "@type": "Country", "name": "Deutschland" },
    "availableChannel": { "@type": "ServiceChannel", "serviceUrl": "https://www.rsg-ai.de/ki-telefonassistent/hausverwaltung", "servicePhone": "+49 30 826 83906" },
    "url": "https://www.rsg-ai.de/ki-telefonassistent/hausverwaltung",
    "description": "Mieter-Anrufe von Schadensmeldung bis Notfall – automatisch angenommen, strukturiert erfasst, priorisiert weitergeleitet. DSGVO, EU-Hosting."
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Wie werden echte Notfälle behandelt?", "acceptedAnswer": { "@type": "Answer", "text": "Der Agent erkennt Dringlichkeit (z. B. Wasserschaden, Heizungsausfall) und leitet diese Fälle sofort priorisiert an Ihren Bereitschaftsdienst weiter — mit allen erfassten Daten." } },
      { "@type": "Question", "name": "Wie vollständig ist die Schadensaufnahme?", "acceptedAnswer": { "@type": "Answer", "text": "Der Agent fragt strukturiert Objekt, Einheit, Art und Dringlichkeit ab und legt einen vollständigen Vorgang in Ihrem System an, sodass nichts nachtelefoniert werden muss." } },
      { "@type": "Question", "name": "Was kostet das für eine Hausverwaltung?", "acceptedAnswer": { "@type": "Answer", "text": "Festpreis-Einrichtung ab 2.500 €, zzgl. nutzungsabhängiger Kosten. Gerade bei vielen Einheiten entlastet das Ihr Team spürbar — konkrete Rechnung im Erstgespräch." } }
    ]
  }
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <h1>KI-Telefonassistent für Hausverwaltungen</h1>
        <p>Mieter-Anrufe von Heizungsausfall bis Schlüsseldienst — rund um die Uhr, und Ihr Team kommt zu nichts anderem mehr.</p>
        <section>
          <h2>Was der Agent für Hausverwaltungen übernimmt</h2>
          <ul>
            <li><strong>Schadensmeldungen strukturiert aufnehmen</strong> — Objekt, Wohnung, Problem, Dringlichkeit — der Agent erfasst alles vollständig und legt einen sauberen Vorgang an.</li>
            <li><strong>Notfälle sofort priorisiert</strong> — Wasserschaden oder Heizungsausfall im Winter werden erkannt und direkt an den Bereitschaftsdienst eskaliert.</li>
            <li><strong>Standardfragen automatisch</strong> — Hausgeld, Termine, Zuständigkeiten: beantwortet der Agent selbst.</li>
            <li><strong>In Ihre Verwaltungssoftware integriert</strong> — Vorgänge landen direkt in Ihrem ERP/Ticketsystem. DSGVO-konform, Server in Deutschland.</li>
          </ul>
          <p>Anbindung an gängige Hausverwaltungs-/ERP-Systeme und Ticketing. Eigene Rufnummer oder Anbindung Ihrer Anlage.</p>
        </section>
        <section>
          <h2>Häufige Fragen</h2>
          <details><summary>Wie werden echte Notfälle behandelt?</summary><p>Der Agent erkennt Dringlichkeit (z. B. Wasserschaden, Heizungsausfall) und leitet diese Fälle sofort priorisiert an Ihren Bereitschaftsdienst weiter — mit allen erfassten Daten.</p></details>
          <details><summary>Wie vollständig ist die Schadensaufnahme?</summary><p>Der Agent fragt strukturiert Objekt, Einheit, Art und Dringlichkeit ab und legt einen vollständigen Vorgang in Ihrem System an.</p></details>
          <details><summary>Was kostet das für eine Hausverwaltung?</summary><p>Festpreis-Einrichtung ab 2.500 €, zzgl. nutzungsabhängiger Kosten.</p></details>
        </section>
        <p><a href="https://www.rsg-ai.de/termin">Erstgespräch buchen</a></p>
      </main>
    </>
  );
}
