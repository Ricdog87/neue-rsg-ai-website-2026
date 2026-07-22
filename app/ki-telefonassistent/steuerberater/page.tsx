import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KI-Telefonassistent für Steuerberater & Kanzleien",
  description: "Mandanten-Anrufe automatisch annehmen, qualifizieren und weiterleiten. DSGVO-konform, DATEV-Welt, EU-Hosting. Entlasten Sie Ihr Sekretariat.",
  alternates: { canonical: "https://www.rsg-ai.de/ki-telefonassistent/steuerberater" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "KI-Telefonassistent für Steuerberater & Kanzleien",
    description: "Mandanten-Anrufe automatisch annehmen, qualifizieren und weiterleiten. DSGVO-konform, DATEV-Welt, EU-Hosting. Entlasten Sie Ihr Sekretariat.",
    url: "https://www.rsg-ai.de/ki-telefonassistent/steuerberater",
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
      { "@type": "ListItem", "position": 3, "name": "Steuerberater & Kanzleien", "item": "https://www.rsg-ai.de/ki-telefonassistent/steuerberater" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "KI-Telefonassistent",
    "name": "KI-Telefonassistent für Steuerberater & Kanzleien",
    "provider": {
      "@type": "ProfessionalService",
      "name": "RSG Agent Services",
      "url": "https://www.rsg-ai.de",
      "telephone": "+49 176 60772556",
      "address": { "@type": "PostalAddress", "streetAddress": "Klingholzstraße 7", "postalCode": "65189", "addressLocality": "Wiesbaden", "addressCountry": "DE" }
    },
    "areaServed": { "@type": "Country", "name": "Deutschland" },
    "availableChannel": { "@type": "ServiceChannel", "serviceUrl": "https://www.rsg-ai.de/ki-telefonassistent/steuerberater", "servicePhone": "+49 30 826 87804" },
    "url": "https://www.rsg-ai.de/ki-telefonassistent/steuerberater",
    "description": "Mandanten-Anrufe automatisch annehmen, qualifizieren und weiterleiten. DSGVO-konform, DATEV-Welt, EU-Hosting. Entlasten Sie Ihr Sekretariat."
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Wie steht es um Verschwiegenheit und DSGVO?", "acceptedAnswer": { "@type": "Answer", "text": "Wir hosten ausschließlich in Deutschland, schließen einen AVV und arbeiten nach den Transparenzpflichten des EU AI Act ausgerichtet. Für regulierte Anforderungen bieten wir Compliance-Logging." } },
      { "@type": "Question", "name": "Lässt sich der Agent an die DATEV-Welt anbinden?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, wir binden gängige Kanzlei- und DATEV-nahe Systeme an. Den genauen Integrationsumfang klären wir im 60-Minuten-Audit." } },
      { "@type": "Question", "name": "Was kostet das für eine Kanzlei?", "acceptedAnswer": { "@type": "Answer", "text": "Festpreis ab 2.500 € (Workflow) bzw. ab 5.000 € (autonomer Agent), zzgl. nutzungsabhängiger Kosten. Gerade in der Saison amortisiert sich das über die entlastete Sekretariatszeit schnell." } }
    ]
  }
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <h1>KI-Telefonassistent für Steuerberater & Kanzleien</h1>
        <p>Mandanten rufen an, das Sekretariat ist im Dauerstress — und in der Saison bricht das Telefon zusammen.</p>
        <section>
          <h2>Was der Agent für Steuerberater & Kanzleien übernimmt</h2>
          <ul>
            <li><strong>Mandanten-Annahme rund um die Uhr</strong> — Jeder Anruf wird angenommen, das Anliegen sauber erfasst und an den richtigen Berater geleitet — auch zur Abgabefrist.</li>
            <li><strong>Routine-Fragen vorqualifiziert</strong> — Belege, Fristen, Statusfragen: strukturiert aufgenommen, sodass Ihr Team nur noch das Wesentliche bearbeitet.</li>
            <li><strong>Mandantengeheimnis gewahrt</strong> — Hosting in Deutschland, AVV, nach den Transparenzpflichten des EU AI Act ausgerichtet. Compliance-Logging für regulierte Anforderungen.</li>
            <li><strong>In Ihre DATEV-Welt integriert</strong> — Anbindung an gängige Kanzlei- und DATEV-nahe Systeme.</li>
          </ul>
          <p>Anbindung an Kanzlei-Software und die DATEV-Welt. Eigene Rufnummer oder Anbindung Ihrer Telefonanlage.</p>
        </section>
        <section>
          <h2>Häufige Fragen</h2>
          <details><summary>Wie steht es um Verschwiegenheit und DSGVO?</summary><p>Wir hosten ausschließlich in Deutschland, schließen einen AVV und arbeiten nach den Transparenzpflichten des EU AI Act ausgerichtet. Für regulierte Anforderungen bieten wir Compliance-Logging.</p></details>
          <details><summary>Lässt sich der Agent an die DATEV-Welt anbinden?</summary><p>Ja, wir binden gängige Kanzlei- und DATEV-nahe Systeme an. Den genauen Integrationsumfang klären wir im 60-Minuten-Audit.</p></details>
          <details><summary>Was kostet das für eine Kanzlei?</summary><p>Festpreis ab 2.500 € (Workflow) bzw. ab 5.000 € (autonomer Agent), zzgl. nutzungsabhängiger Kosten.</p></details>
        </section>
        <p><a href="https://www.rsg-ai.de/termin">Erstgespräch buchen</a></p>
      </main>
    </>
  );
}
