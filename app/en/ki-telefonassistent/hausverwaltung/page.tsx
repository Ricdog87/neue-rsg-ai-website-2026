import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Phone Assistant for Property Management companies",
  description: "Tenant calls around the clock: damage reports, maintenance, callbacks — captured and prioritized automatically. Hosted in Germany, GDPR-compliant.",
  alternates: {
    canonical: "https://www.rsg-ai.de/en/ki-telefonassistent/hausverwaltung",
    languages: { "de-DE": "https://www.rsg-ai.de/ki-telefonassistent/hausverwaltung", en: "https://www.rsg-ai.de/en/ki-telefonassistent/hausverwaltung" },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Phone Assistant for Property Management companies",
    description: "Tenant calls around the clock: damage reports, maintenance, callbacks — captured and prioritized automatically. Hosted in Germany, GDPR-compliant.",
    url: "https://www.rsg-ai.de/en/ki-telefonassistent/hausverwaltung",
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
      { "@type": "ListItem", "position": 3, "name": "Property Management", "item": "https://www.rsg-ai.de/en/ki-telefonassistent/hausverwaltung" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI phone assistant",
    "name": "AI Phone Assistant for Property Management companies",
    "provider": {
      "@type": "ProfessionalService",
      "name": "RSG Agent Services",
      "url": "https://www.rsg-ai.de",
      "telephone": "+49 176 60772556",
      "address": { "@type": "PostalAddress", "streetAddress": "Klingholzstraße 7", "postalCode": "65189", "addressLocality": "Wiesbaden", "addressCountry": "DE" }
    },
    "areaServed": { "@type": "Country", "name": "Germany" },
    "url": "https://www.rsg-ai.de/en/ki-telefonassistent/hausverwaltung",
    "description": "Tenant calls around the clock: damage reports, maintenance, callbacks — captured and prioritized automatically. Hosted in Germany, GDPR-compliant."
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Can it handle emergencies?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Urgent cases (e.g. water damage) are flagged and escalated immediately; routine matters are captured for the next working day." } },
      { "@type": "Question", "name": "Does it connect to our systems?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — we connect it to your tools as part of the fixed-price setup." } },
      { "@type": "Question", "name": "What does it cost?", "acceptedAnswer": { "@type": "Answer", "text": "Fixed-price setup from €2,500 (workflow) or €5,000 (autonomous agent), plus usage-based costs." } }
    ]
  }
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <h1>AI Phone Assistant for Property Management</h1>
        <p>From a broken heater to a locksmith call — tenant calls flood in around the clock, and your team gets nothing else done.</p>
        <section>
          <h2>What the agent handles</h2>
          <ul>
            <li><strong>Damage reports 24/7</strong> — Captures damage and maintenance reports day and night, in a structured way, and prioritizes urgent cases.</li>
            <li><strong>Every call answered</strong> — No tenant stuck in a queue — the agent picks up every call, weekends and holidays too.</li>
            <li><strong>Routed to the right place</strong> — Emergencies escalate immediately; routine matters are queued cleanly for your team.</li>
            <li><strong>Relief at scale</strong> — The more units you manage, the more time the agent gives your team back.</li>
          </ul>
          <p>6 languages: DE · EN · FR · IT · PL · PT. Hosted in Germany, GDPR-compliant.</p>
        </section>
        <section>
          <h2>Frequently asked</h2>
          <details><summary>Can it handle emergencies?</summary><p>Yes. Urgent cases (e.g. water damage) are flagged and escalated immediately; routine matters are captured for the next working day.</p></details>
          <details><summary>Does it connect to our systems?</summary><p>Yes — we connect it to your tools as part of the fixed-price setup.</p></details>
          <details><summary>What does it cost?</summary><p>Fixed-price setup from €2,500 (workflow) or €5,000 (autonomous agent), plus usage-based costs.</p></details>
        </section>
        <p><a href="https://www.rsg-ai.de/en/termin">Book an intro call</a></p>
      </main>
    </>
  );
}
