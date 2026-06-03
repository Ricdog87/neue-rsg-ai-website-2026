/**
 * JSON-LD schema builders for SEO + Answer Engine Optimization (AEO).
 *
 * Goal: be cite-able in Perplexity, ChatGPT, Google AI Overviews, Bing Copilot.
 * Schemas follow schema.org + Google's structured-data guidelines.
 */

import { site } from './content';

/**
 * Person — Ricardo Serrano, Geschäftsführer & Founder.
 * Verknüpft Brand mit Founder für E-E-A-T und LLM-Discoverability.
 */
export function personLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${site.url}/#ricardo-serrano`,
    name: 'Ricardo Serrano',
    givenName: 'Ricardo',
    familyName: 'Serrano',
    jobTitle: 'Geschäftsführer & Founder',
    worksFor: { '@id': `${site.url}#organization` },
    url: site.url,
    image: `${site.url}/images/ricardo-serrano.png`,
    sameAs: [
      'https://www.linkedin.com/in/ricardo-serrano-frsg/',
      site.social.youtube,
      'https://github.com/Ricdog87',
    ],
    knowsAbout: [
      'Künstliche Intelligenz',
      'AI Agents',
      'B2B Vertriebsautomatisierung',
      'LangChain',
      'LangGraph',
      'n8n',
      'Recruiting Automatisierung',
      'Personalmarketing',
      'DSGVO-konforme KI',
    ],
    knowsLanguage: ['de', 'en'],
    nationality: { '@type': 'Country', name: 'DE' },
  };
}

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}#organization`,
    name: site.name,
    alternateName: site.legal.brandName,
    legalName: site.legal.company,
    url: site.url,
    logo: {
      '@type': 'ImageObject',
      url: `${site.url}/opengraph-image`,
      width: 1200,
      height: 630,
    },
    description: site.positioning,
    foundingLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: 'Wiesbaden', addressCountry: 'DE' },
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: site.contact.email,
      telephone: site.contact.phone,
      areaServed: 'DE',
      availableLanguage: ['German', 'English'],
    },
    founder: { '@id': `${site.url}/#ricardo-serrano` },
    sameAs: [site.social.linkedin, site.social.instagram, site.social.youtube],
  };
}

/**
 * LocalBusiness — picks up local-pack signals for "KI Agentur Wiesbaden" etc.
 */
export function localBusinessLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.url}#localbusiness`,
    name: site.name,
    image: `${site.url}/opengraph-image`,
    url: site.url,
    telephone: site.contact.phone,
    email: site.contact.email,
    priceRange: '€€€',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Wiesbaden',
      addressRegion: 'Hessen',
      addressCountry: 'DE',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 50.0826, longitude: 8.2493 },
    areaServed: [
      { '@type': 'Country', name: 'Deutschland' },
      { '@type': 'Country', name: 'Österreich' },
      { '@type': 'Country', name: 'Schweiz' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    parentOrganization: { '@id': `${site.url}#organization` },
  };
}

/**
 * Catalog of services — anchored to LocalBusiness so they show up as
 * "Offers" in rich results.
 */
export function servicesLd() {
  const services = [
    {
      name: 'KI-Agent-Entwicklung',
      description:
        'Custom KI-Agenten für Vertrieb, Support und Operations. LangChain/LangGraph, DSGVO-konform, EU-Cloud-Hosting in Deutschland.',
    },
    {
      name: 'KI-Beratung für Mittelstand',
      description:
        'Strategie-Audit, ROI-Analyse, Prozess-Mapping. Ehrliche Antwort: KI-Agent ja oder nein — bevor du Geld verbrennst.',
    },
    {
      name: 'Sales-Agent · Lead-Qualifizierung',
      description:
        'Inbound-Lead → KI-Qualifizierung → CRM → Slack. 24/7, mit messbarem Intent-Score pro Lead.',
    },
    {
      name: 'Support-Agent · Tier-1-Automatisierung',
      description:
        '94 % der Tier-1-Tickets autonom gelöst. RAG · Markenton · klare Eskalation für komplexe Fälle.',
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    '@id': `${site.url}#services`,
    name: 'KI-Agent-Services',
    itemListElement: services.map((s, i) => ({
      '@type': 'Offer',
      position: i + 1,
      itemOffered: {
        '@type': 'Service',
        name: s.name,
        description: s.description,
        provider: { '@id': `${site.url}#organization` },
        areaServed: { '@type': 'Country', name: 'Deutschland' },
      },
    })),
  };
}

/**
 * Voice Product — KI-Telefonassistentin als schema.org Product
 * mit AggregateOffer (Solo + Team + Scale). Rich-Result-eligible.
 */
export function voiceProductLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${site.url}#voice-product`,
    name: 'RSG KI-Telefonassistentin',
    description:
      'KI-Telefonassistentin für den Mittelstand. 24/7 erreichbar, natürlicher Voice, Inbound + Outbound, CRM-integriert. DSGVO, EU-Hosting (Nürnberg). Live in 4 Wochen.',
    brand: { '@id': `${site.url}#organization` },
    category: 'AI Voice Assistant · Telefonassistent',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: '199',
      highPrice: '499',
      offerCount: 3,
      availability: 'https://schema.org/InStock',
      offers: [
        {
          '@type': 'Offer',
          name: 'Solo · monatlich',
          price: '199',
          priceCurrency: 'EUR',
          eligibleQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
          url: `${site.url}/#pricing`,
        },
        {
          '@type': 'Offer',
          name: 'Team · monatlich',
          price: '499',
          priceCurrency: 'EUR',
          eligibleQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
          url: `${site.url}/#pricing`,
        },
        {
          '@type': 'Offer',
          name: 'Scale · Preis auf Anfrage',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          url: `${site.url}/termin`,
        },
      ],
    },
  };
}

export function faqPageLd(qa: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

/**
 * HowTo — for a step-by-step checklist or guide. Eligible for
 * "rich result" how-to carousel in Google Search.
 */
export function howToLd(args: {
  name: string;
  description: string;
  url: string;
  totalTime?: string; // ISO 8601 duration e.g. "PT30M"
  steps: Array<{ name: string; text: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: args.name,
    description: args.description,
    url: args.url,
    inLanguage: 'de-DE',
    ...(args.totalTime ? { totalTime: args.totalTime } : {}),
    step: args.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}#website`,
    url: site.url,
    name: site.name,
    inLanguage: 'de-DE',
    publisher: { '@id': `${site.url}#organization` },
  };
}

export function breadcrumbLd(trail: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function articleLd(post: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: { '@id': `${site.url}/#ricardo-serrano` },
    publisher: { '@id': `${site.url}#organization` },
    datePublished: post.datePublished,
    inLanguage: 'de-DE',
    mainEntityOfPage: post.url,
    image: `${site.url}/opengraph-image`,
  };
}

export function caseStudyArticleLd(cs: {
  slug: string;
  title: string;
  summary: string;
  headline: string;
  meta: Array<{ k: string; v: string }>;
}) {
  const yearMeta = cs.meta.find((m) => m.k === 'Year')?.v;
  const datePublished = yearMeta ? `${yearMeta}-01-01` : new Date().toISOString().slice(0, 10);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cs.headline,
    name: cs.title,
    description: cs.summary,
    author: { '@id': `${site.url}/#ricardo-serrano` },
    publisher: { '@id': `${site.url}#organization` },
    datePublished,
    inLanguage: 'de-DE',
    mainEntityOfPage: `${site.url}/cases/${cs.slug}`,
    image: `${site.url}/opengraph-image`,
  };
}

/**
 * Inline JSON-LD as a string for direct injection via
 * <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ... }} />
 */
export function ldJson(...nodes: unknown[]): string {
  return JSON.stringify(nodes.length === 1 ? nodes[0] : nodes);
}
