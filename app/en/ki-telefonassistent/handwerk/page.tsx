import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Phone Assistant for Trades & Crafts businesses",
  description: "Win jobs even after hours: the AI assistant answers every call, captures the request and books appointments — while you're on the job. Hosted in Germany.",
  alternates: {
    canonical: "https://www.rsg-ai.de/en/ki-telefonassistent/handwerk",
    languages: { "de-DE": "https://www.rsg-ai.de/ki-telefonassistent/handwerk", en: "https://www.rsg-ai.de/en/ki-telefonassistent/handwerk" },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Phone Assistant for Trades & Crafts businesses",
    description: "Win jobs even after hours: the AI assistant answers every call, captures the request and books appointments — while you're on the job. Hosted in Germany.",
    url: "https://www.rsg-ai.de/en/ki-telefonassistent/handwerk",
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
      { "@type": "ListItem", "position": 3, "name": "Trades", "item": "https://www.rsg-ai.de/en/ki-telefonassistent/handwerk" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI phone assistant",
    "name": "AI Phone Assistant for Trades & Crafts businesses",
    "provider": {
      "@type": "ProfessionalService",
      "name": "RSG Agent Services",
      "url": "https://www.rsg-ai.de",
      "telephone": "+49 176 60772556",
      "address": { "@type": "PostalAddress", "streetAddress": "Klingholzstraße 7", "postalCode": "65189", "addressLocality": "Wiesbaden", "addressCountry": "DE" }
    },
    "areaServed": { "@type": "Country", "name": "Germany" },
    "url": "https://www.rsg-ai.de/en/ki-telefonassistent/handwerk",
    "description": "Win jobs even after hours: the AI assistant answers every call, captures the request and books appointments — while you're on the job. Hosted in Germany."
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Does it work when I'm on a job site?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — the agent answers independently of you. You get a clean summary of every call and only step in for the jobs worth your time." } },
      { "@type": "Question", "name": "Can it book on-site appointments?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. It books, reschedules and confirms appointments straight into your calendar." } },
      { "@type": "Question", "name": "What does it cost for a trades business?", "acceptedAnswer": { "@type": "Answer", "text": "Fixed-price setup from €2,500 (workflow) or €5,000 (autonomous agent), plus usage-based costs. We calculate the ROI with you in the intro call." } }
    ]
  }
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <h1>AI Phone Assistant for Trades & Crafts</h1>
        <p>You're on the scaffold, not at the desk — so every second call goes unanswered. That's a lost job.</p>
        <section>
          <h2>What the agent handles</h2>
          <ul>
            <li><strong>Answers while you work</strong> — On the roof, under the sink, on the road — the agent picks up every call and never leaves a customer hanging.</li>
            <li><strong>Jobs captured after hours</strong> — Evenings and weekends too: the request is captured in a structured way so you can call back the next morning — warm, not cold.</li>
            <li><strong>Appointments & quote requests</strong> — Books on-site appointments and captures quote requests directly — synced to your calendar.</li>
            <li><strong>No monthly headcount</strong> — A flat monthly fee instead of a part-time office hire — and it never calls in sick.</li>
          </ul>
          <p>6 languages: DE · EN · FR · IT · PL · PT. Hosted in Germany, GDPR-compliant.</p>
        </section>
        <section>
          <h2>Frequently asked</h2>
          <details><summary>Does it work when I'm on a job site?</summary><p>Yes — the agent answers independently of you. You get a clean summary of every call and only step in for the jobs worth your time.</p></details>
          <details><summary>Can it book on-site appointments?</summary><p>Yes. It books, reschedules and confirms appointments straight into your calendar.</p></details>
          <details><summary>What does it cost for a trades business?</summary><p>Fixed-price setup from €2,500 (workflow) or €5,000 (autonomous agent), plus usage-based costs. We calculate the ROI with you in the intro call.</p></details>
        </section>
        <p><a href="https://www.rsg-ai.de/en/termin">Book an intro call</a></p>
      </main>
    </>
  );
}
