import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KI-Telefonassistent für Autohäuser & Werkstätten | RSG AI",
  description: "Service-Termine, Probefahrten und Teile-Anfragen automatisch annehmen und buchen. Angebunden an Ihr DMS. DSGVO, Hosting in Deutschland.",
  alternates: { canonical: "https://www.rsg-ai.de/ki-telefonassistent/autohaus" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "KI-Telefonassistent für Autohäuser & Werkstätten | RSG AI",
    description: "Service-Termine, Probefahrten und Teile-Anfragen automatisch annehmen und buchen. Angebunden an Ihr DMS. DSGVO, Hosting in Deutschland.",
    url: "https://www.rsg-ai.de/ki-telefonassistent/autohaus",
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
      { "@type": "ListItem", "position": 3, "name": "Autohäuser", "item": "https://www.rsg-ai.de/ki-telefonassistent/autohaus" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "KI-Telefonassistent",
    "name": "KI-Telefonassistent für Autohäuser",
    "provider": {
      "@type": "ProfessionalService",
      "name": "RSG Agent Services",
      "url": "https://www.rsg-ai.de",
      "telephone": "+49 176 60772556",
      "address": { "@type": "PostalAddress", "streetAddress": "Klingholzstraße 7", "postalCode": "65189", "addressLocality": "Wiesbaden", "addressCountry": "DE" }
    },
    "areaServed": { "@type": "Country", "name": "Deutschland" },
    "availableChannel": { "@type": "ServiceChannel", "serviceUrl": "https://www.rsg-ai.de/ki-telefonassistent/autohaus", "servicePhone": "+49 30 826 83906" },
    "url": "https://www.rsg-ai.de/ki-telefonassistent/autohaus",
    "description": "Service-Termine, Probefahrten und Teile-Anfragen automatisch annehmen und buchen. Angebunden an Ihr DMS. DSGVO, Hosting in Deutschland."
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Kann der Agent Werkstatttermine eigenständig buchen?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Er prüft freie Slots in Ihrem Kalender/DMS und bucht den Termin im Gespräch — inklusive Erinnerung per SMS oder Mail als Add-On." } },
      { "@type": "Question", "name": "Hilft der Agent auch im Verkauf?", "acceptedAnswer": { "@type": "Answer", "text": "Er qualifiziert eingehende Kaufinteressenten (Modell, Budget, Inzahlungnahme) und übergibt warme Leads an Ihr Verkaufsteam — und kann per Outbound Recalls fahren." } },
      { "@type": "Question", "name": "Was kostet das für ein Autohaus?", "acceptedAnswer": { "@type": "Answer", "text": "Festpreis ab 2.500 € (Workflow) bzw. ab 5.000 € (autonomer Agent), zzgl. nutzungsabhängiger Kosten. Über gebuchte Werkstattauslastung und gewonnene Leads rechnet sich das schnell." } }
    ]
  }
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <h1>KI-Telefonassistent für Autohäuser</h1>
        <p>Service-Annahme, Probefahrt-Termine, Teile-Anfragen — und das Telefon ist dauerbesetzt.</p>
        <section>
          <h2>Was der Agent für Autohäuser übernimmt</h2>
          <ul>
            <li><strong>Werkstatttermine automatisch buchen</strong> — Der Agent vergibt Service- und Werkstatttermine direkt im Kalender.</li>
            <li><strong>Verkaufsleads qualifiziert</strong> — Interesse an Modell, Budget, Inzahlungnahme: der Agent qualifiziert und übergibt heiße Leads an den Verkauf.</li>
            <li><strong>Recall- & Rückruf-Kampagnen</strong> — Outbound: der Agent ruft Bestandskunden für Service-Recalls oder Termin-Erinnerungen aktiv an.</li>
            <li><strong>An Ihr DMS angebunden</strong> — Termine und Leads landen direkt in Ihrem Dealer-Management-System. DSGVO-konform, Server in Deutschland.</li>
          </ul>
          <p>Anbindung an gängige DMS-/Werkstattsysteme und Kalender. Inbound und Outbound möglich.</p>
        </section>
        <section>
          <h2>Häufige Fragen</h2>
          <details><summary>Kann der Agent Werkstatttermine eigenständig buchen?</summary><p>Ja. Er prüft freie Slots in Ihrem Kalender/DMS und bucht den Termin im Gespräch — inklusive Erinnerung per SMS oder Mail als Add-On.</p></details>
          <details><summary>Hilft der Agent auch im Verkauf?</summary><p>Er qualifiziert eingehende Kaufinteressenten (Modell, Budget, Inzahlungnahme) und übergibt warme Leads an Ihr Verkaufsteam.</p></details>
          <details><summary>Was kostet das für ein Autohaus?</summary><p>Festpreis ab 2.500 € (Workflow) bzw. ab 5.000 € (autonomer Agent), zzgl. nutzungsabhängiger Kosten.</p></details>
        </section>
        <p><a href="https://www.rsg-ai.de/termin">Erstgespräch buchen</a></p>
      </main>
    </>
  );
}
