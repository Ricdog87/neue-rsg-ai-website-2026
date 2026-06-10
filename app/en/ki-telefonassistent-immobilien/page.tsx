import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Phone Assistant for Real Estate agents",
  description: "Never miss a buyer or tenant enquiry: the AI assistant qualifies callers, books viewings and captures leads 24/7. Hosted in Germany, GDPR-compliant.",
  alternates: {
    canonical: "https://www.rsg-ai.de/en/ki-telefonassistent-immobilien",
    languages: { "de-DE": "https://www.rsg-ai.de/ki-telefonassistent-immobilien", en: "https://www.rsg-ai.de/en/ki-telefonassistent-immobilien" },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Phone Assistant for Real Estate agents",
    description: "Never miss a buyer or tenant enquiry: the AI assistant qualifies callers, books viewings and captures leads 24/7. Hosted in Germany, GDPR-compliant.",
    url: "https://www.rsg-ai.de/en/ki-telefonassistent-immobilien",
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
      { "@type": "ListItem", "position": 3, "name": "Real Estate", "item": "https://www.rsg-ai.de/en/ki-telefonassistent-immobilien" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI phone assistant",
    "name": "AI Phone Assistant for Real Estate agents",
    "provider": {
      "@type": "ProfessionalService",
      "name": "RSG Agent Services",
      "url": "https://www.rsg-ai.de",
      "telephone": "+49 176 60772556",
      "address": { "@type": "PostalAddress", "streetAddress": "Klingholzstraße 7", "postalCode": "65189", "addressLocality": "Wiesbaden", "addressCountry": "DE" }
    },
    "areaServed": { "@type": "Country", "name": "Germany" },
    "url": "https://www.rsg-ai.de/en/ki-telefonassistent-immobilien",
    "description": "Never miss a buyer or tenant enquiry: the AI assistant qualifies callers, books viewings and captures leads 24/7. Hosted in Germany, GDPR-compliant."
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Can it book viewings?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — it books, reschedules and confirms viewing appointments straight into your calendar." } },
      { "@type": "Question", "name": "Does it qualify leads?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. It captures budget, timeline and financing readiness so you prioritize serious buyers." } },
      { "@type": "Question", "name": "What does it cost?", "acceptedAnswer": { "@type": "Answer", "text": "Fixed-price setup from €2,500 (workflow) or €5,000 (autonomous agent), plus usage-based costs." } }
    ]
  }
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <h1>AI Phone Assistant for Real Estate</h1>
        <p>A hot listing means dozens of calls in an hour — and the ones you miss go straight to the competition.</p>
        <section>
          <h2>What the agent handles</h2>
          <ul>
            <li><strong>Every enquiry captured</strong> — Buyers and tenants get through every time — no missed call, no lost lead.</li>
            <li><strong>Viewings booked in-call</strong> — Books and confirms viewing appointments directly — synced to your calendar.</li>
            <li><strong>Leads pre-qualified</strong> — Budget, timeline, financing readiness captured so you focus on serious buyers.</li>
            <li><strong>Works after hours</strong> — Evening and weekend enquiries captured for a warm callback.</li>
          </ul>
          <p>6 languages: DE · EN · FR · IT · PL · PT. Hosted in Germany, GDPR-compliant.</p>
        </section>
        <section>
          <h2>Frequently asked</h2>
          <details><summary>Can it book viewings?</summary><p>Yes — it books, reschedules and confirms viewing appointments straight into your calendar.</p></details>
          <details><summary>Does it qualify leads?</summary><p>Yes. It captures budget, timeline and financing readiness so you prioritize serious buyers.</p></details>
          <details><summary>What does it cost?</summary><p>Fixed-price setup from €2,500 (workflow) or €5,000 (autonomous agent), plus usage-based costs.</p></details>
        </section>
        <p><a href="https://www.rsg-ai.de/en/termin">Book an intro call</a></p>
      </main>
    </>
  );
}
