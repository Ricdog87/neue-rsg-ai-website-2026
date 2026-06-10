import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Phone Assistant for Hotels & Hospitality",
  description: "Reservations taken right in the call, guest questions answered 24/7 — in 6 languages. Hosted in Germany, GDPR-compliant.",
  alternates: {
    canonical: "https://www.rsg-ai.de/en/ki-telefonassistent/hotel",
    languages: { "de-DE": "https://www.rsg-ai.de/ki-telefonassistent/hotel", en: "https://www.rsg-ai.de/en/ki-telefonassistent/hotel" },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Phone Assistant for Hotels & Hospitality",
    description: "Reservations taken right in the call, guest questions answered 24/7 — in 6 languages. Hosted in Germany, GDPR-compliant.",
    url: "https://www.rsg-ai.de/en/ki-telefonassistent/hotel",
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
      { "@type": "ListItem", "position": 3, "name": "Hospitality", "item": "https://www.rsg-ai.de/en/ki-telefonassistent/hotel" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI phone assistant",
    "name": "AI Phone Assistant for Hotels & Hospitality",
    "provider": {
      "@type": "ProfessionalService",
      "name": "RSG Agent Services",
      "url": "https://www.rsg-ai.de",
      "telephone": "+49 176 60772556",
      "address": { "@type": "PostalAddress", "streetAddress": "Klingholzstraße 7", "postalCode": "65189", "addressLocality": "Wiesbaden", "addressCountry": "DE" }
    },
    "areaServed": { "@type": "Country", "name": "Germany" },
    "url": "https://www.rsg-ai.de/en/ki-telefonassistent/hotel",
    "description": "Reservations taken right in the call, guest questions answered 24/7 — in 6 languages. Hosted in Germany, GDPR-compliant."
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Can it take reservations?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. It takes, changes and confirms reservations connected to your booking system." } },
      { "@type": "Question", "name": "Does it speak my guests' language?", "acceptedAnswer": { "@type": "Answer", "text": "It handles 6 languages (DE, EN, FR, IT, PL, PT) and switches naturally within the call." } },
      { "@type": "Question", "name": "What does it cost for a hotel?", "acceptedAnswer": { "@type": "Answer", "text": "Fixed-price setup from €2,500 (workflow) or €5,000 (autonomous agent), plus usage-based costs." } }
    ]
  }
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <h1>AI Phone Assistant for Hotels</h1>
        <p>Reception is busy, the phone keeps ringing — and a missed call is a missed booking.</p>
        <section>
          <h2>What the agent handles</h2>
          <ul>
            <li><strong>Reservations in the call</strong> — Takes and changes reservations directly — connected to your booking system.</li>
            <li><strong>Guest questions 24/7</strong> — Check-in times, parking, breakfast, directions: answered instantly, day and night.</li>
            <li><strong>6 languages</strong> — DE · EN · FR · IT · PL · PT — your international guests are understood.</li>
            <li><strong>Reception stays free</strong> — The agent takes the phone so your team can focus on the guests in front of them.</li>
          </ul>
          <p>Hosted in Germany, GDPR-compliant.</p>
        </section>
        <section>
          <h2>Frequently asked</h2>
          <details><summary>Can it take reservations?</summary><p>Yes. It takes, changes and confirms reservations connected to your booking system.</p></details>
          <details><summary>Does it speak my guests' language?</summary><p>It handles 6 languages (DE, EN, FR, IT, PL, PT) and switches naturally within the call.</p></details>
          <details><summary>What does it cost for a hotel?</summary><p>Fixed-price setup from €2,500 (workflow) or €5,000 (autonomous agent), plus usage-based costs.</p></details>
        </section>
        <p><a href="https://www.rsg-ai.de/en/termin">Book an intro call</a></p>
      </main>
    </>
  );
}
