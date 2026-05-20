import type { MetadataRoute } from 'next';
import { site } from '@/lib/content';
import { CASE_STUDIES } from '@/lib/case-studies';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url,                                    lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${site.url}/ki-beratung-wiesbaden`,         lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/roi-checkliste-ki-agent`,       lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    ...CASE_STUDIES.map((cs) => ({
      url: `${site.url}/cases/${cs.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    { url: `${site.url}/impressum`,                     lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${site.url}/datenschutz`,                   lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${site.url}/agb`,                           lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ];
}
