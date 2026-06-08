type CityFaq = { q: string; a: string };

/** Einheitliches Schema-Set pro Stadt-Seite: Service + BreadcrumbList + LocalBusiness (+ optional FAQPage). */
export function cityJsonLd(name: string, slug: string, faq: CityFaq[] = []) {
  const url = `https://www.rsg-ai.de/${slug}`;
  const blocks: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `KI-Telefonassistent ${name}`,
      serviceType: 'KI-Telefonassistent / KI-Voice-Agent',
      provider: { '@type': 'Organization', name: 'RSG AI', url: 'https://www.rsg-ai.de' },
      areaServed: { '@type': 'City', name },
      availableChannel: { '@type': 'ServiceChannel', serviceUrl: url },
      offers: { '@type': 'Offer', priceCurrency: 'EUR', price: '199', url },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://www.rsg-ai.de/' },
        { '@type': 'ListItem', position: 2, name: 'KI-Telefonassistent', item: 'https://www.rsg-ai.de/ki-telefonassistent' },
        { '@type': 'ListItem', position: 3, name: `KI-Telefonassistent ${name}`, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: `RSG AI · KI-Telefonassistent ${name}`,
      url,
      areaServed: { '@type': 'City', name },
      description: `KI-Telefonassistent für Unternehmen in ${name}: Anrufe annehmen, Leads qualifizieren, Termine buchen — 24/7, DSGVO-konform, Hosting in Deutschland.`,
    },
  ];
  if (faq.length) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }
  return blocks;
}
