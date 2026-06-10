import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Phone Assistant for Car Dealerships & Workshops",
  description: "Service appointments without hold times, sales enquiries qualified — the AI assistant answers every call. Hosted in Germany, GDPR-compliant.",
  alternates: {
    canonical: "https://www.rsg-ai.de/en/ki-telefonassistent/autohaus",
    languages: { "de-DE": "https://www.rsg-ai.de/ki-telefonassistent/autohaus", en: "https://www.rsg-ai.de/en/ki-telefonassistent/autohaus" },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Phone Assistant for Car Dealerships & Workshops",
    description: "Service appointments without hold times, sales enquiries qualified — the AI assistant answers every call. Hosted in Germany, GDPR-compliant.",
    url: "https://www.rsg-ai.de/en/ki-telefonassistent/autohaus",
    siteName: "RSG Agent Services",
    locale: "en_US",
    type: "website",
    images: ["https://www.rsg-ai.de/opengraph-image"],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.rsg-ai.de/en" },
      { "@type": "ListItem", "position": 2, "name": "AI Phone Assistant", "item": "https://www.rsg-ai.de/en/ki-telefonassistent" },
      { "@type": "ListItem", "position": 3, "name": "Car Dealerships", "item": "https://www.rsg-ai.de/en/ki-telefonassistent/autohaus" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI phone assistant",
    "name": "AI Phone Assistant for Car Dealerships & Workshops",
    "provider": {
      "@type": "ProfessionalService",
      "name": "RSG Agent Services",
      "url": "https://www.rsg-ai.de",
      "telephone": "+49 176 60772556",
      "address": { "@type": "PostalAddress", "streetAddress": "Klingholzstraße 7", "postalCode": "65189", "addressLocality": "Wiesbaden", "addressCountry": "DE" }
    },
    "areaServed": { "@type": "Country", "name": "Germany" },
    "url": "https://www.rsg-ai.de/en/ki-telefonassistent/autohaus",
    "description": "Service appointments without hold times, sales enquiries qualified — the AI assistant answers every call. Hosted in Germany, GDPR-compliant."
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Can it book workshop appointments?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — it books, reschedules and confirms service appointments straight into your calendar." } },
      { "@type": "Question", "name": "Does it qualify sales enquiries?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. It captures the vehicle, budget and timeline so your sales team only follows up on warm leads." } },
      { "@type": "Question", "name": "What does it cost for a dealership?", "acceptedAnswer": { "@type": "Answer", "text": "Fixed-price setup from €2,500 (workflow) or €5,000 (autonomous agent), plus usage-based costs." } }
    ]
  }
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <h1>AI Phone Assistant for Car Dealerships</h1>
        <p>Service is on the line, sales is with a customer — and the phone rings out. Every missed call is a missed service slot or sale.</p>
        <section>
          <h2>What the agent handles</h2>
          <ul>
            <li><strong>Workshop appointments</strong> — Books, reschedules and confirms service appointments right in the call — synced to your calendar.</li>
            <li><strong>Sales enquiries qualified</strong> — Captures and qualifies vehicle enquiries so your sales team only gets warm leads.</li>
            <li><strong>Answered at peak times</strong> — No busy signal when service and sales are slammed — every caller gets through.</li>
            <li><strong>After-hours capture</strong> — Evening and weekend enquiries are captured for a warm callback.</li>
          </ul>
          <p>6 languages: DE · EN · FR · IT · PL · PT. Hosted in Germany, GDPR-compliant.</p>
        </section>
        <section>
          <h2>Frequently asked</h2>
          <details><summary>Can it book workshop appointments?</summary><p>Yes — it books, reschedules and confirms service appointments straight into your calendar.</p></details>
          <details><summary>Does it qualify sales enquiries?</summary><p>Yes. It captures the vehicle, budget and timeline so your sales team only follows up on warm leads.</p></details>
          <details><summary>What does it cost for a dealership?</summary><p>Fixed-price setup from €2,500 (workflow) or €5,000 (autonomous agent), plus usage-based costs.</p></details>
        </section>
        <p><a href="https://www.rsg-ai.de/en/termin">Book an intro call</a></p>
      </main>
    </>
  );
}
