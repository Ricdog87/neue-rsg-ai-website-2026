import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KI-Agentur für den Mittelstand – bauen & betreiben",
  description: "Die KI-Agentur aus dem Vertrieb: wir bauen UND betreiben Dein KI-Agenten. Festpreis, Go-Live in 4 Wochen, DSGVO & EU-Cloud. Deutschlandweit, Sitz in Wiesbaden.",
  alternates: { canonical: "https://www.rsg-ai.de/ki-agentur-mittelstand" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "KI-Agentur für den Mittelstand – bauen & betreiben",
    description: "Die KI-Agentur aus dem Vertrieb: wir bauen UND betreiben Dein KI-Agenten. Festpreis, Go-Live in 4 Wochen, DSGVO & EU-Cloud. Deutschlandweit, Sitz in Wiesbaden.",
    url: "https://www.rsg-ai.de/ki-agentur-mittelstand",
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
      { "@type": "ListItem", "position": 2, "name": "KI-Agentur Mittelstand", "item": "https://www.rsg-ai.de/ki-agentur-mittelstand" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "KI-Automatisierung & KI-Agenten",
    "name": "KI-Agentur für den Mittelstand",
    "provider": {
      "@type": "ProfessionalService",
      "name": "RSG Agent Services",
      "url": "https://www.rsg-ai.de",
      "telephone": "+49 176 60772556",
      "address": { "@type": "PostalAddress", "streetAddress": "Klingholzstraße 7", "postalCode": "65189", "addressLocality": "Wiesbaden", "addressCountry": "DE" }
    },
    "areaServed": { "@type": "Country", "name": "Deutschland" },
    "availableChannel": { "@type": "ServiceChannel", "serviceUrl": "https://www.rsg-ai.de/ki-agentur-mittelstand", "servicePhone": "+49 30 826 83906" },
    "url": "https://www.rsg-ai.de/ki-agentur-mittelstand",
    "description": "Die KI-Agentur aus dem Vertrieb: wir bauen UND betreiben Dein KI-Agenten. Festpreis, Go-Live in 4 Wochen, DSGVO & EU-Cloud. Deutschlandweit, Sitz in Wiesbaden."
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Was macht eine KI-Agentur konkret?", "acceptedAnswer": { "@type": "Answer", "text": "Wir analysieren Prozesse (60-Min-Audit), bauen maßgeschneiderte KI-Agenten auf LangChain/LangGraph, integrieren sie in eure Systeme und betreiben sie mit 24/7-Monitoring — aus einer Hand." } },
      { "@type": "Question", "name": "Was kostet ein KI-Agent im Mittelstand?", "acceptedAnswer": { "@type": "Answer", "text": "Festpreis: Workflows ab 2.500 €, autonome KI-Agenten ab 5.000 € (einmalig), zzgl. nutzungsabhängiger Kosten. Vergleichbare Projekte liegen marktüblich bei 8.000–18.000 €." } },
      { "@type": "Question", "name": "Wie schnell sehen wir Ergebnisse?", "acceptedAnswer": { "@type": "Answer", "text": "Audit am Montag, erster Agent in der zweiten Woche produktiv, voll integriert nach 4 Wochen — mit wöchentlichen Demos." } },
      { "@type": "Question", "name": "Sind wir danach von euch abhängig?", "acceptedAnswer": { "@type": "Answer", "text": "Nein. Ihr besitzt Code, Daten und Konfiguration. Wir betreiben auf Wunsch weiter, aber ihr seid nie eingesperrt." } }
    ]
  }
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <h1>KI-Agentur für den Mittelstand</h1>
        <p>Wir bauen und betreiben Dein KI-Agenten — die einzige Agentur aus dem Vertrieb. Go-Live in 4 Wochen, Festpreis, DSGVO & EU-Cloud. Deutschlandweit, Sitz in Wiesbaden.</p>
        <section>
          <h2>Drei Gründe, warum du keinen zweiten Anbieter brauchst</h2>
          <ul>
            <li><strong>Wir betreiben, was wir bauen.</strong> 24/7-Monitoring, Wartung, Weiterentwicklung inklusive.</li>
            <li><strong>Vertriebs-DNA, kein IT-Theater.</strong> 15 Jahre B2B-Vertrieb stecken in jedem Agenten.</li>
            <li><strong>Vier Wochen, nicht vier Quartale.</strong> Audit, Bau, Integration, Betrieb.</li>
          </ul>
        </section>
        <section>
          <h2>Häufige Fragen</h2>
          <details><summary>Was macht eine KI-Agentur konkret?</summary><p>Wir analysieren Prozesse (60-Min-Audit), bauen maßgeschneiderte KI-Agenten auf LangChain/LangGraph, integrieren sie in eure Systeme und betreiben sie mit 24/7-Monitoring — aus einer Hand.</p></details>
          <details><summary>Was kostet ein KI-Agent im Mittelstand?</summary><p>Festpreis: Workflows ab 2.500 €, autonome KI-Agenten ab 5.000 € (einmalig), zzgl. nutzungsabhängiger Kosten. Vergleichbare Projekte liegen marktüblich bei 8.000–18.000 €.</p></details>
          <details><summary>Wie schnell sehen wir Ergebnisse?</summary><p>Audit am Montag, erster Agent in der zweiten Woche produktiv, voll integriert nach 4 Wochen — mit wöchentlichen Demos.</p></details>
          <details><summary>Sind wir danach von euch abhängig?</summary><p>Nein. Ihr besitzt Code, Daten und Konfiguration. Wir betreiben auf Wunsch weiter, aber ihr seid nie eingesperrt.</p></details>
        </section>
        <p><a href="https://www.rsg-ai.de/termin">Erstgespräch buchen</a></p>
      </main>
    </>
  );
}
