import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KI-Telefonassistent für Arztpraxen – DSGVO-konform | RSG AI",
  description: "Anrufannahme & Terminvergabe für Ihre Praxis – automatisch, ohne Warteschleife, DSGVO-konform. 6 Sprachen, Hosting in Deutschland. Live-Demo anhören.",
  alternates: { canonical: "https://www.rsg-ai.de/ki-telefonassistent/arztpraxis" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "KI-Telefonassistent für Arztpraxen – DSGVO-konform | RSG AI",
    description: "Anrufannahme & Terminvergabe für Ihre Praxis – automatisch, ohne Warteschleife, DSGVO-konform. 6 Sprachen, Hosting in Deutschland. Live-Demo anhören.",
    url: "https://www.rsg-ai.de/ki-telefonassistent/arztpraxis",
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
      { "@type": "ListItem", "position": 3, "name": "Arztpraxen", "item": "https://www.rsg-ai.de/ki-telefonassistent/arztpraxis" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "KI-Telefonassistent",
    "name": "KI-Telefonassistent für Arztpraxen",
    "provider": {
      "@type": "ProfessionalService",
      "name": "RSG Agent Services",
      "url": "https://www.rsg-ai.de",
      "telephone": "+49 176 60772556",
      "address": { "@type": "PostalAddress", "streetAddress": "Klingholzstraße 7", "postalCode": "65189", "addressLocality": "Wiesbaden", "addressCountry": "DE" }
    },
    "areaServed": { "@type": "Country", "name": "Deutschland" },
    "availableChannel": { "@type": "ServiceChannel", "serviceUrl": "https://www.rsg-ai.de/ki-telefonassistent/arztpraxis", "servicePhone": "+49 30 826 83906" },
    "url": "https://www.rsg-ai.de/ki-telefonassistent/arztpraxis",
    "description": "Anrufannahme & Terminvergabe für Ihre Praxis – automatisch, ohne Warteschleife, DSGVO-konform. 6 Sprachen, Hosting in Deutschland. Live-Demo anhören."
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Ist das für eine Arztpraxis DSGVO- und schweigepflichtkonform?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Wir hosten ausschließlich auf Servern in Deutschland, arbeiten EU-AI-Act-konform und schließen einen Auftragsverarbeitungsvertrag (AVV). Gesprächsdaten werden nicht für US-Cloud-Dienste verwendet." } },
      { "@type": "Question", "name": "Versteht der Agent medizinische Anliegen richtig?", "acceptedAnswer": { "@type": "Answer", "text": "Der Agent wird auf die typischen Anliegen Ihrer Praxis trainiert (Termin, Rezept, Überweisung, Rückruf) und eskaliert bei Unsicherheit sauber an einen Menschen — mit vollem Gesprächskontext." } },
      { "@type": "Question", "name": "Was kostet ein KI-Telefonassistent für eine Praxis?", "acceptedAnswer": { "@type": "Answer", "text": "Einrichtung als Festpreis ab 2.500 € (Workflow) bzw. ab 5.000 € (autonomer Agent), zzgl. nutzungsabhängiger Hosting-/Token-Kosten — in der Regel unter 5 % der eingesparten Personalkosten. Konkret rechnen wir das im Erstgespräch durch." } }
    ]
  }
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <h1>KI-Telefonassistent für Arztpraxen</h1>
        <p>Jeder verpasste Anruf ist ein verlorener Patient — und Ihr Team telefoniert, statt am Tresen zu helfen.</p>
        <section>
          <h2>Was der Agent für Arztpraxen übernimmt</h2>
          <ul>
            <li><strong>Annahme beim ersten Klingeln</strong> — Kein Besetztzeichen, keine Warteschleife. Der Agent nimmt jeden Anruf an — auch in der Sprechstunde und nach Feierabend.</li>
            <li><strong>Termine buchen & verschieben</strong> — Vergibt, verschiebt und sagt Termine direkt im Gespräch ab — angebunden an Ihr Praxis- und Terminsystem.</li>
            <li><strong>Routine-Anliegen vorqualifiziert</strong> — Rezept, Überweisung, Rückruf: strukturiert erfasst und an die richtige Stelle geleitet. Ihr MFA-Team bekommt nur den Rest.</li>
            <li><strong>Schweigepflicht & DSGVO</strong> — Server in Deutschland, EU-AI-Act-konform, mit Auftragsverarbeitungsvertrag.</li>
          </ul>
          <p>Anbindung an gängige PVS- und Terminsysteme (z. B. Doctolib-Kalender). 6 Sprachen: DE · EN · FR · IT · PL · PT.</p>
        </section>
        <section>
          <h2>Häufige Fragen</h2>
          <details><summary>Ist das für eine Arztpraxis DSGVO- und schweigepflichtkonform?</summary><p>Ja. Wir hosten ausschließlich auf Servern in Deutschland, arbeiten EU-AI-Act-konform und schließen einen Auftragsverarbeitungsvertrag (AVV). Gesprächsdaten werden nicht für US-Cloud-Dienste verwendet.</p></details>
          <details><summary>Versteht der Agent medizinische Anliegen richtig?</summary><p>Der Agent wird auf die typischen Anliegen Ihrer Praxis trainiert (Termin, Rezept, Überweisung, Rückruf) und eskaliert bei Unsicherheit sauber an einen Menschen — mit vollem Gesprächskontext.</p></details>
          <details><summary>Was kostet ein KI-Telefonassistent für eine Praxis?</summary><p>Einrichtung als Festpreis ab 2.500 € (Workflow) bzw. ab 5.000 € (autonomer Agent), zzgl. nutzungsabhängiger Hosting-/Token-Kosten — in der Regel unter 5 % der eingesparten Personalkosten.</p></details>
        </section>
        <p><a href="https://www.rsg-ai.de/termin">Erstgespräch buchen</a></p>
      </main>
    </>
  );
}
