export function StructuredData() {
  const org = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": "https://www.rsg-ai.de/#organization",
    "name": "RSG AI",
    "legalName": "RSG Recruiting Solutions Group GmbH",
    "url": "https://www.rsg-ai.de",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.rsg-ai.de/og-image.png",
      "width": 1200,
      "height": 630
    },
    "description": "KI-Telefonassistent für B2B – Inbound & Outbound, 24/7, DSGVO-konform. Ab 199€/Monat.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Am Heiligenhaus 9",
      "addressLocality": "Wiesbaden",
      "postalCode": "65207",
      "addressRegion": "Hessen",
      "addressCountry": "DE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "50.0782",
      "longitude": "8.2397"
    },
    "telephone": "+49-30-826-83906",
    "email": "r.serrano@recruiting-sg.de",
    "foundingDate": "2024",
    "areaServed": ["DE", "AT", "CH"],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": { "@type": "GeoCoordinates", "latitude": "50.0782", "longitude": "8.2397" },
      "geoRadius": "500000"
    },
    "sameAs": [
      "https://www.linkedin.com/company/rsg-ai-automation",
      "https://www.linkedin.com/company/rsg-recruiting"
    ]
  }

  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "RSG AI Telefonassistent",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "url": "https://www.rsg-ai.de",
    "description": "KI-Telefon-Agent für B2B: Inbound-Anrufe entgegennehmen, Leads qualifizieren, Termine buchen – vollautomatisch.",
    "offers": [
      {
        "@type": "Offer",
        "name": "Solo",
        "price": "199",
        "priceCurrency": "EUR",
        "billingDuration": "P1M",
        "description": "Bis 20 parallele Anrufe, 500 Min/Tag"
      },
      {
        "@type": "Offer",
        "name": "Team",
        "price": "499",
        "priceCurrency": "EUR",
        "billingDuration": "P1M",
        "description": "Bis 100 parallele Anrufe, unbegrenzte Min/Tag"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "12",
      "bestRating": "5"
    }
  }

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was ist ein KI-Telefonassistent?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ein KI-Telefonassistent ist ein KI-System das Anrufe automatisch entgegennimmt, Leads qualifiziert und Termine bucht – ohne menschlichen Eingriff, 24/7."
        }
      },
      {
        "@type": "Question",
        "name": "Ist der KI-Telefonassistent DSGVO-konform?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja. Alle Daten werden auf deutschen Servern verarbeitet. Der Agent weist sich zu Beginn jedes Gesprächs als KI aus und gibt Widerspruchsrecht nach §21 DSGVO."
        }
      },
      {
        "@type": "Question",
        "name": "Was kostet ein KI-Telefonassistent?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RSG AI Telefonassistenten starten ab 199€/Monat für das Solo-Paket. Das Team-Paket kostet 499€/Monat. Einmalige Einrichtung ab 490€."
        }
      },
      {
        "@type": "Question",
        "name": "Wie lange dauert die Einrichtung?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die Einrichtung dauert typischerweise 5-10 Werktage. Dazu gehört: Onboarding-Call, Skript-Entwicklung, Testing und Go-Live."
        }
      }
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(software) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  )
}
