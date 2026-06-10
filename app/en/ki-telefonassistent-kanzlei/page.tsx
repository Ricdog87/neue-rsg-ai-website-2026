import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Phone Assistant for Law Firms",
  description: "Client calls sorted, mandates captured, confidentiality kept: the AI assistant answers every call and routes it cleanly. Hosted in Germany, GDPR-compliant.",
  alternates: {
    canonical: "https://www.rsg-ai.de/en/ki-telefonassistent-kanzlei",
    languages: { "de-DE": "https://www.rsg-ai.de/ki-telefonassistent-kanzlei", en: "https://www.rsg-ai.de/en/ki-telefonassistent-kanzlei" },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Phone Assistant for Law Firms",
    description: "Client calls sorted, mandates captured, confidentiality kept: the AI assistant answers every call and routes it cleanly. Hosted in Germany, GDPR-compliant.",
    url: "https://www.rsg-ai.de/en/ki-telefonassistent-kanzlei",
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
      { "@type": "ListItem", "position": 3, "name": "Law Firms", "item": "https://www.rsg-ai.de/en/ki-telefonassistent-kanzlei" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI phone assistant",
    "name": "AI Phone Assistant for Law Firms",
    "provider": {
      "@type": "ProfessionalService",
      "name": "RSG Agent Services",
      "url": "https://www.rsg-ai.de",
      "telephone": "+49 176 60772556",
      "address": { "@type": "PostalAddress", "streetAddress": "Klingholzstraße 7", "postalCode": "65189", "addressLocality": "Wiesbaden", "addressCountry": "DE" }
    },
    "areaServed": { "@type": "Country", "name": "Germany" },
    "url": "https://www.rsg-ai.de/en/ki-telefonassistent-kanzlei",
    "description": "Client calls sorted, mandates captured, confidentiality kept: the AI assistant answers every call and routes it cleanly. Hosted in Germany, GDPR-compliant."
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Is this confidentiality- and GDPR-compliant?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Hosting exclusively in Germany, aligned with the EU AI Act, with a DPA. No US cloud, no storage beyond processing." } },
      { "@type": "Question", "name": "Does it route to the right attorney?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. It captures the matter and routes potential mandates to the right contact, escalating cleanly when unsure." } },
      { "@type": "Question", "name": "What does it cost for a firm?", "acceptedAnswer": { "@type": "Answer", "text": "Fixed-price setup from €2,500 (workflow) or €5,000 (autonomous agent), plus usage-based costs." } }
    ]
  }
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <h1>AI Phone Assistant for Law Firms</h1>
        <p>Every call could be a new mandate — but your team can't answer the phone and prepare a case at the same time.</p>
        <section>
          <h2>What the agent handles</h2>
          <ul>
            <li><strong>New enquiries captured</strong> — Captures the matter in a structured way and routes potential mandates to the right attorney.</li>
            <li><strong>Always reachable</strong> — No busy signal — every caller gets through, also outside office hours.</li>
            <li><strong>Confidentiality & GDPR</strong> — Servers in Germany, EU-AI-Act-aligned, with a data processing agreement (DPA).</li>
            <li><strong>Billable time protected</strong> — The agent handles intake; your attorneys keep their time for the case.</li>
          </ul>
          <p>6 languages: DE · EN · FR · IT · PL · PT. Hosted in Germany.</p>
        </section>
        <section>
          <h2>Frequently asked</h2>
          <details><summary>Is this confidentiality- and GDPR-compliant?</summary><p>Yes. Hosting exclusively in Germany, aligned with the EU AI Act, with a DPA. No US cloud, no storage beyond processing.</p></details>
          <details><summary>Does it route to the right attorney?</summary><p>Yes. It captures the matter and routes potential mandates to the right contact, escalating cleanly when unsure.</p></details>
          <details><summary>What does it cost for a firm?</summary><p>Fixed-price setup from €2,500 (workflow) or €5,000 (autonomous agent), plus usage-based costs.</p></details>
        </section>
        <p><a href="https://www.rsg-ai.de/en/termin">Book an intro call</a></p>
      </main>
    </>
  );
}
