import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Phone Assistant for Tax Advisors & Accounting firms",
  description: "Client calls cleanly sorted: deadlines, documents, status questions — captured and routed automatically. GDPR-compliant, hosted in Germany.",
  alternates: {
    canonical: "https://www.rsg-ai.de/en/ki-telefonassistent/steuerberater",
    languages: { "de-DE": "https://www.rsg-ai.de/ki-telefonassistent/steuerberater", en: "https://www.rsg-ai.de/en/ki-telefonassistent/steuerberater" },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Phone Assistant for Tax Advisors & Accounting firms",
    description: "Client calls cleanly sorted: deadlines, documents, status questions — captured and routed automatically. GDPR-compliant, hosted in Germany.",
    url: "https://www.rsg-ai.de/en/ki-telefonassistent/steuerberater",
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
      { "@type": "ListItem", "position": 3, "name": "Tax Advisors", "item": "https://www.rsg-ai.de/en/ki-telefonassistent/steuerberater" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI phone assistant",
    "name": "AI Phone Assistant for Tax Advisors & Accounting firms",
    "provider": {
      "@type": "ProfessionalService",
      "name": "RSG Agent Services",
      "url": "https://www.rsg-ai.de",
      "telephone": "+49 176 60772556",
      "address": { "@type": "PostalAddress", "streetAddress": "Klingholzstraße 7", "postalCode": "65189", "addressLocality": "Wiesbaden", "addressCountry": "DE" }
    },
    "areaServed": { "@type": "Country", "name": "Germany" },
    "url": "https://www.rsg-ai.de/en/ki-telefonassistent/steuerberater",
    "description": "Client calls cleanly sorted: deadlines, documents, status questions — captured and routed automatically. GDPR-compliant, hosted in Germany."
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Is this confidentiality- and GDPR-compliant?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Hosting exclusively in Germany, aligned with the EU AI Act, with a DPA. No US cloud, no storage beyond processing." } },
      { "@type": "Question", "name": "Can it connect to our systems?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — we connect it to your calendar and common practice-management tools as part of the fixed-price setup." } },
      { "@type": "Question", "name": "What does it cost for a firm?", "acceptedAnswer": { "@type": "Answer", "text": "Fixed-price setup from €2,500 (workflow) or €5,000 (autonomous agent), plus usage-based costs." } }
    ]
  }
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <h1>AI Phone Assistant for Tax Advisors</h1>
        <p>During filing season the phone never stops — and your team answers status questions instead of doing billable work.</p>
        <section>
          <h2>What the agent handles</h2>
          <ul>
            <li><strong>Status questions handled</strong> — Deadlines, document status, callbacks: captured in a structured way and routed to the right contact.</li>
            <li><strong>Always reachable in peak season</strong> — No busy signal during the busiest weeks — every client gets through, 24/7.</li>
            <li><strong>Confidentiality & GDPR</strong> — Servers in Germany, EU-AI-Act-aligned, with a data processing agreement (DPA).</li>
            <li><strong>Your team focuses on the work</strong> — The agent takes the routine; your advisors keep their time for what's billable.</li>
          </ul>
          <p>6 languages: DE · EN · FR · IT · PL · PT. Hosted in Germany.</p>
        </section>
        <section>
          <h2>Frequently asked</h2>
          <details><summary>Is this confidentiality- and GDPR-compliant?</summary><p>Yes. Hosting exclusively in Germany, aligned with the EU AI Act, with a DPA. No US cloud, no storage beyond processing.</p></details>
          <details><summary>Can it connect to our systems?</summary><p>Yes — we connect it to your calendar and common practice-management tools as part of the fixed-price setup.</p></details>
          <details><summary>What does it cost for a firm?</summary><p>Fixed-price setup from €2,500 (workflow) or €5,000 (autonomous agent), plus usage-based costs.</p></details>
        </section>
        <p><a href="https://www.rsg-ai.de/en/termin">Book an intro call</a></p>
      </main>
    </>
  );
}
