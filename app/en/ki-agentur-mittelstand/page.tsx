import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Agency for SMBs – we build & operate your AI agents",
  description: "The AI agency born from sales: we build AND operate your AI agents. Fixed price, go-live in 4 weeks, GDPR & EU cloud. Germany-wide, based in Wiesbaden.",
  alternates: {
    canonical: "https://www.rsg-ai.de/en/ki-agentur-mittelstand",
    languages: {
      "de-DE": "https://www.rsg-ai.de/ki-agentur-mittelstand",
      en: "https://www.rsg-ai.de/en/ki-agentur-mittelstand",
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Agency for SMBs – we build & operate your AI agents",
    description: "The AI agency born from sales: we build AND operate your AI agents. Fixed price, go-live in 4 weeks, GDPR & EU cloud.",
    url: "https://www.rsg-ai.de/en/ki-agentur-mittelstand",
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
      { "@type": "ListItem", "position": 2, "name": "AI Agency for SMBs", "item": "https://www.rsg-ai.de/en/ki-agentur-mittelstand" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI automation & AI agents",
    "name": "AI agency for SMBs",
    "provider": {
      "@type": "ProfessionalService",
      "name": "RSG Agent Services",
      "url": "https://www.rsg-ai.de",
      "telephone": "+49 176 60772556",
      "address": { "@type": "PostalAddress", "streetAddress": "Klingholzstraße 7", "postalCode": "65189", "addressLocality": "Wiesbaden", "addressCountry": "DE" }
    },
    "areaServed": { "@type": "Country", "name": "Germany" },
    "availableChannel": { "@type": "ServiceChannel", "serviceUrl": "https://www.rsg-ai.de/en/ki-agentur-mittelstand", "servicePhone": "+49 30 826 83906" },
    "url": "https://www.rsg-ai.de/en/ki-agentur-mittelstand",
    "description": "The AI agency born from sales: we build AND operate your AI agents. Fixed price, go-live in 4 weeks, GDPR & EU cloud."
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What does an AI agency actually do?", "acceptedAnswer": { "@type": "Answer", "text": "We analyze your processes (60-minute audit), build tailored AI agents on LangChain/LangGraph, integrate them into your systems and operate them with 24/7 monitoring — all from one partner." } },
      { "@type": "Question", "name": "What does an AI agent cost for an SMB?", "acceptedAnswer": { "@type": "Answer", "text": "Fixed price: workflows from €2,500, autonomous AI agents from €5,000 (one-time), plus usage-based costs. Comparable projects typically run €8,000–18,000 on the market." } },
      { "@type": "Question", "name": "How fast do we see results?", "acceptedAnswer": { "@type": "Answer", "text": "Audit on Monday, first agent productive in week two, fully integrated after 4 weeks — with weekly demos." } },
      { "@type": "Question", "name": "Will we be dependent on you afterwards?", "acceptedAnswer": { "@type": "Answer", "text": "No. You own the code, data and configuration. We keep operating it if you want, but you are never locked in." } }
    ]
  }
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <h1>AI Agency for SMBs</h1>
        <p>We build and operate your AI agents — the only agency born from sales. Go-live in 4 weeks, fixed price, GDPR & EU cloud. Germany-wide, based in Wiesbaden.</p>
        <section>
          <h2>Three reasons you don’t need a second vendor</h2>
          <ul>
            <li><strong>We operate what we build.</strong> 24/7 monitoring, maintenance and ongoing development included.</li>
            <li><strong>Sales DNA, no IT theater.</strong> 15 years of B2B sales go into every agent.</li>
            <li><strong>Four weeks, not four quarters.</strong> Audit, build, integration, operation.</li>
          </ul>
        </section>
        <section>
          <h2>Frequently asked</h2>
          <details><summary>What does an AI agency actually do?</summary><p>We analyze your processes (60-minute audit), build tailored AI agents on LangChain/LangGraph, integrate them into your systems and operate them with 24/7 monitoring — all from one partner.</p></details>
          <details><summary>What does an AI agent cost for an SMB?</summary><p>Fixed price: workflows from €2,500, autonomous AI agents from €5,000 (one-time), plus usage-based costs. Comparable projects typically run €8,000–18,000 on the market.</p></details>
          <details><summary>How fast do we see results?</summary><p>Audit on Monday, first agent productive in week two, fully integrated after 4 weeks — with weekly demos.</p></details>
          <details><summary>Will we be dependent on you afterwards?</summary><p>No. You own the code, data and configuration. We keep operating it if you want, but you are never locked in.</p></details>
        </section>
        <p><a href="https://www.rsg-ai.de/en/termin">Book an intro call</a></p>
      </main>
    </>
  );
}
