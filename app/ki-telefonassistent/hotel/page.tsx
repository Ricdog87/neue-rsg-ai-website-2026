import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KI-Telefonassistent für Hotels – 24/7 Reservierung | RSG AI",
  description: "Reservierungen und Gästeanfragen rund um die Uhr, mehrsprachig, angebunden an Ihr PMS. Jeder unbeantwortete Anruf ist eine nicht gebuchte Nacht.",
  alternates: { canonical: "https://www.rsg-ai.de/ki-telefonassistent/hotel" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "KI-Telefonassistent für Hotels – 24/7 Reservierung | RSG AI",
    description: "Reservierungen und Gästeanfragen rund um die Uhr, mehrsprachig, angebunden an Ihr PMS. Jeder unbeantwortete Anruf ist eine nicht gebuchte Nacht.",
    url: "https://www.rsg-ai.de/ki-telefonassistent/hotel",
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
      { "@type": "ListItem", "position": 3, "name": "Hotellerie", "item": "https://www.rsg-ai.de/ki-telefonassistent/hotel" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "KI-Telefonassistent",
    "name": "KI-Telefonassistent für Hotels",
    "provider": {
      "@type": "ProfessionalService",
      "name": "RSG Agent Services",
      "url": "https://www.rsg-ai.de",
      "telephone": "+49 176 60772556",
      "address": { "@type": "PostalAddress", "streetAddress": "Klingholzstraße 7", "postalCode": "65189", "addressLocality": "Wiesbaden", "addressCountry": "DE" }
    },
    "areaServed": { "@type": "Country", "name": "Deutschland" },
    "availableChannel": { "@type": "ServiceChannel", "serviceUrl": "https://www.rsg-ai.de/ki-telefonassistent/hotel", "servicePhone": "+49 30 826 83906" },
    "url": "https://www.rsg-ai.de/ki-telefonassistent/hotel",
    "description": "Reservierungen und Gästeanfragen rund um die Uhr, mehrsprachig, angebunden an Ihr PMS. Jeder unbeantwortete Anruf ist eine nicht gebuchte Nacht."
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Spricht der Agent die Sprachen meiner Gäste?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, der Agent beherrscht standardmäßig sechs Sprachen (DE, EN, FR, IT, PL, PT) und erkennt die Sprache des Anrufers automatisch." } },
      { "@type": "Question", "name": "Lässt er sich an unser PMS anbinden?", "acceptedAnswer": { "@type": "Answer", "text": "Wir binden gängige Hotelsoftware/PMS an, sodass Verfügbarkeiten live geprüft und Reservierungen direkt eingebucht werden. Details klären wir im Audit." } },
      { "@type": "Question", "name": "Was kostet das für ein Hotel?", "acceptedAnswer": { "@type": "Answer", "text": "Festpreis-Einrichtung ab 2.500 €, zzgl. nutzungsabhängiger Kosten. Bereits wenige zusätzlich gebuchte Nächte pro Monat decken die Investition." } }
    ]
  }
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <h1>KI-Telefonassistent für Hotels</h1>
        <p>Jeder unbeantwortete Anruf ist eine nicht gebuchte Nacht — und an der Rezeption ist niemand frei.</p>
        <section>
          <h2>Was der Agent für Hotellerie übernimmt</h2>
          <ul>
            <li><strong>Reservierungen rund um die Uhr</strong> — Der Agent nimmt Buchungsanfragen 24/7 an, prüft Verfügbarkeit und bucht — auch wenn die Rezeption besetzt ist.</li>
            <li><strong>Mehrsprachig für internationale Gäste</strong> — 6 Sprachen (DE · EN · FR · IT · PL · PT).</li>
            <li><strong>An Ihr PMS angebunden</strong> — Verfügbarkeiten und Reservierungen laufen direkt in Ihre Hotelsoftware. Keine Doppelbuchung.</li>
            <li><strong>Upsell im Gespräch</strong> — Frühstück, Late-Checkout, Zimmer-Upgrade: der Agent bietet aktiv an.</li>
          </ul>
          <p>Anbindung an gängige PMS-/Hotelsoftware. Eigene Rufnummer oder Anbindung Ihrer Telefonanlage.</p>
        </section>
        <section>
          <h2>Häufige Fragen</h2>
          <details><summary>Spricht der Agent die Sprachen meiner Gäste?</summary><p>Ja, der Agent beherrscht standardmäßig sechs Sprachen (DE, EN, FR, IT, PL, PT) und erkennt die Sprache des Anrufers automatisch.</p></details>
          <details><summary>Lässt er sich an unser PMS anbinden?</summary><p>Wir binden gängige Hotelsoftware/PMS an, sodass Verfügbarkeiten live geprüft und Reservierungen direkt eingebucht werden.</p></details>
          <details><summary>Was kostet das für ein Hotel?</summary><p>Festpreis-Einrichtung ab 2.500 €, zzgl. nutzungsabhängiger Kosten. Bereits wenige zusätzlich gebuchte Nächte pro Monat decken die Investition.</p></details>
        </section>
        <p><a href="https://www.rsg-ai.de/termin">Erstgespräch buchen</a></p>
      </main>
    </>
  );
}
