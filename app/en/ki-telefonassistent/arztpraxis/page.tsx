import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Phone Assistant for Medical Practices – GDPR-compliant",
  description: "Call handling & appointment booking for your practice – automatic, no hold queue, GDPR-compliant. 6 languages, hosted in Germany.",
  alternates: {
    canonical: "https://www.rsg-ai.de/en/ki-telefonassistent/arztpraxis",
    languages: { "de-DE": "https://www.rsg-ai.de/ki-telefonassistent/arztpraxis", en: "https://www.rsg-ai.de/en/ki-telefonassistent/arztpraxis" },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Phone Assistant for Medical Practices – GDPR-compliant",
    description: "Call handling & appointment booking for your practice – automatic, no hold queue, GDPR-compliant. 6 languages, hosted in Germany.",
    url: "https://www.rsg-ai.de/en/ki-telefonassistent/arztpraxis",
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
      { "@type": "ListItem", "position": 3, "name": "Medical Practices", "item": "https://www.rsg-ai.de/en/ki-telefonassistent/arztpraxis" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI phone assistant",
    "name": "AI Phone Assistant for Medical Practices – GDPR-compliant",
    "provider": {
      "@type": "ProfessionalService",
      "name": "RSG Agent Services",
      "url": "https://www.rsg-ai.de",
      "telephone": "+49 176 60772556",
      "address": { "@type": "PostalAddress", "streetAddress": "Klingholzstraße 7", "postalCode": "65189", "addressLocality": "Wiesbaden", "addressCountry": "DE" }
    },
    "areaServed": { "@type": "Country", "name": "Germany" },
    "url": "https://www.rsg-ai.de/en/ki-telefonassistent/arztpraxis",
    "description": "Call handling & appointment booking for your practice – automatic, no hold queue, GDPR-compliant. 6 languages, hosted in Germany."
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Is this GDPR- and confidentiality-compliant for a practice?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We host exclusively on servers in Germany, work in line with the EU AI Act and sign a data processing agreement (DPA). Conversation data is not used for US cloud services." } },
      { "@type": "Question", "name": "Does the agent understand medical requests correctly?", "acceptedAnswer": { "@type": "Answer", "text": "The agent is trained on your practice's typical requests (appointment, prescription, referral, callback) and cleanly escalates to a human when unsure — with full conversation context." } },
      { "@type": "Question", "name": "What does it cost for a practice?", "acceptedAnswer": { "@type": "Answer", "text": "Fixed-price setup from €2,500 (workflow) or €5,000 (autonomous agent), plus usage-based costs — typically under 5% of the staff costs saved." } }
    ]
  }
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <h1>AI Phone Assistant for Medical Practices</h1>
        <p>Every missed call is a lost patient — and your team is on the phone instead of helping at the front desk.</p>
        <section>
          <h2>What the agent handles</h2>
          <ul>
            <li><strong>Answered on the first ring</strong> — No busy signal, no hold queue. The agent answers every call — during consultation hours and after closing.</li>
            <li><strong>Book & reschedule appointments</strong> — Books, reschedules and cancels appointments right in the call — connected to your practice and scheduling system.</li>
            <li><strong>Routine requests pre-qualified</strong> — Prescription, referral, callback: captured in a structured way and routed to the right place. Your staff only get the rest.</li>
            <li><strong>Confidentiality & GDPR</strong> — Servers in Germany, aligned with the EU AI Act, with a data processing agreement.</li>
          </ul>
          <p>Connects to common practice and scheduling systems. 6 languages: DE · EN · FR · IT · PL · PT.</p>
        </section>
        <section>
          <h2>Frequently asked</h2>
          <details><summary>Is this GDPR- and confidentiality-compliant for a practice?</summary><p>Yes. We host exclusively on servers in Germany, work in line with the EU AI Act and sign a data processing agreement (DPA). Conversation data is not used for US cloud services.</p></details>
          <details><summary>Does the agent understand medical requests correctly?</summary><p>The agent is trained on your practice's typical requests (appointment, prescription, referral, callback) and cleanly escalates to a human when unsure — with full conversation context.</p></details>
          <details><summary>What does it cost for a practice?</summary><p>Fixed-price setup from €2,500 (workflow) or €5,000 (autonomous agent), plus usage-based costs — typically under 5% of the staff costs saved.</p></details>
        </section>
        <p><a href="https://www.rsg-ai.de/en/termin">Book an intro call</a></p>
      </main>
    </>
  );
}
