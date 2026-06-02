import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KI-Telefonassistent für Unternehmen – DSGVO | RSG AI",
  description: "KI-Telefonassistent, der Anrufe in unter 0,4 s annimmt – inbound & outbound, Termine buchen. DSGVO-konform, Hosting in Deutschland, deutschlandweit.",
  alternates: { canonical: "https://www.rsg-ai.de/ki-telefonassistent" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "KI-Telefonassistent für Unternehmen – DSGVO | RSG AI",
    description: "KI-Telefonassistent, der Anrufe in unter 0,4 s annimmt – inbound & outbound, Termine buchen. DSGVO-konform, Hosting in Deutschland, deutschlandweit.",
    url: "https://www.rsg-ai.de/ki-telefonassistent",
    siteName: "RSG Agent Services",
    locale: "de_DE",
    type: "website",
    images: ["https://www.rsg-ai.de/opengraph-image"],
  },
};

// Strukturierte Daten (Breadcrumb + Service + FAQ)
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Start", "item": "https://www.rsg-ai.de" },
      { "@type": "ListItem", "position": 2, "name": "KI-Telefonassistent", "item": "https://www.rsg-ai.de/ki-telefonassistent" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "KI-Telefonassistent",
    "name": "KI-Telefonassistent für Unternehmen",
    "provider": {
      "@type": "ProfessionalService",
      "name": "RSG Agent Services",
      "url": "https://www.rsg-ai.de",
      "telephone": "+49 176 60772556",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Klingholzstraße 7",
        "postalCode": "65189",
        "addressLocality": "Wiesbaden",
        "addressCountry": "DE"
      }
    },
    "areaServed": { "@type": "Country", "name": "Deutschland" },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://www.rsg-ai.de/ki-telefonassistent",
      "servicePhone": "+49 30 826 83906"
    },
    "url": "https://www.rsg-ai.de/ki-telefonassistent",
    "description": "KI-Telefonassistent, der Anrufe in unter 0,4 s annimmt – inbound & outbound, Termine buchen. DSGVO-konform, Hosting in Deutschland, deutschlandweit."
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Was ist ein KI-Telefonassistent?", "acceptedAnswer": { "@type": "Answer", "text": "Ein Sprach-Agent, der Anrufe vollautomatisch annimmt, das Anliegen in natürlichem Deutsch versteht, Standardfragen löst, Termine bucht und bei Bedarf an einen Menschen übergibt — 24/7, ohne Warteschleife." } },
      { "@type": "Question", "name": "Was kostet ein KI-Telefonassistent?", "acceptedAnswer": { "@type": "Answer", "text": "Festpreis: Workflow ab 2.500 €, autonomer Agent ab 5.000 € (einmalig), zzgl. nutzungsabhängiger Hosting-/Token-Kosten — in der Regel unter 5 % der eingesparten Personalkosten." } },
      { "@type": "Question", "name": "Ist ein KI-Telefonassistent DSGVO-konform?", "acceptedAnswer": { "@type": "Answer", "text": "Bei uns ja: Hosting ausschließlich in Deutschland, EU-AI-Act-konform, mit Auftragsverarbeitungsvertrag. Keine US-Cloud." } },
      { "@type": "Question", "name": "Wie schnell ist der Agent einsatzbereit?", "acceptedAnswer": { "@type": "Answer", "text": "Audit in 60 Minuten, erster produktiver Agent in der Regel in 2 Wochen, voll integriert nach 4 Wochen." } }
    ]
  }
];

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* TODO Dev: Mit euren Komponenten/Designsystem umsetzen. Volltext/Design = HTML-Vorlage. */}
      <main>
        <h1>KI-Telefonassistent für Unternehmen</h1>
        <p>Nimmt jeden Anruf an — in unter 0,4 Sekunden. Inbound annehmen, Outbound qualifizieren, Termine buchen. In natürlichem Deutsch, DSGVO-konform, Hosting in Deutschland, deutschlandweit.</p>
        <section>
          <h2>Inbound annehmen. Outbound qualifizieren. Termine setzen.</h2>
          <ul>
            <li><strong>Empfangs-Assistent (Inbound)</strong> — hebt beim ersten Klingeln ab, klärt das Anliegen, leitet mit Kontext weiter.</li>
            <li><strong>Outbound-Closer</strong> — ruft Leads ab, qualifiziert in 3 Minuten, bucht Termine im Kalender.</li>
            <li><strong>Custom Voice-Agent</strong> — Recall, Mahnwesen, Erinnerungen, gebaut auf euren Prozess.</li>
          </ul>
        </section>
        <section>
          <h2>Für eure Branche</h2>
          <ul>
            <li><a href="/ki-telefonassistent/arztpraxis">KI-Telefonassistent für Arztpraxen</a></li>
            <li><a href="/ki-telefonassistent/handwerk">KI-Telefonassistent für Handwerk</a></li>
            <li><a href="/ki-telefonassistent/steuerberater">KI-Telefonassistent für Steuerberater & Kanzleien</a></li>
            <li><a href="/ki-telefonassistent/hausverwaltung">KI-Telefonassistent für Hausverwaltungen</a></li>
            <li><a href="/ki-telefonassistent/hotel">KI-Telefonassistent für Hotellerie</a></li>
            <li><a href="/ki-telefonassistent/autohaus">KI-Telefonassistent für Autohäuser</a></li>
          </ul>
        </section>
        <section>
          <h2>Häufige Fragen</h2>
          <details><summary>Was ist ein KI-Telefonassistent?</summary><p>Ein Sprach-Agent, der Anrufe vollautomatisch annimmt, das Anliegen in natürlichem Deutsch versteht, Standardfragen löst, Termine bucht und bei Bedarf an einen Menschen übergibt — 24/7, ohne Warteschleife.</p></details>
          <details><summary>Was kostet ein KI-Telefonassistent?</summary><p>Festpreis: Workflow ab 2.500 €, autonomer Agent ab 5.000 € (einmalig), zzgl. nutzungsabhängiger Hosting-/Token-Kosten — in der Regel unter 5 % der eingesparten Personalkosten.</p></details>
          <details><summary>Ist ein KI-Telefonassistent DSGVO-konform?</summary><p>Bei uns ja: Hosting ausschließlich in Deutschland, EU-AI-Act-konform, mit Auftragsverarbeitungsvertrag. Keine US-Cloud.</p></details>
          <details><summary>Wie schnell ist der Agent einsatzbereit?</summary><p>Audit in 60 Minuten, erster produktiver Agent in der Regel in 2 Wochen, voll integriert nach 4 Wochen.</p></details>
        </section>
        <p><a href="https://www.rsg-ai.de/termin">Erstgespräch buchen</a></p>
      </main>
    </>
  );
}
