import type { MetadataRoute } from 'next';
import { site } from '@/lib/content';
import { CASE_STUDIES } from '@/lib/case-studies';
import { INSIGHTS } from '@/lib/insights';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: 'weekly', priority: 1.0,
      alternates: { languages: { 'de-DE': site.url, en: `${site.url}/en` } } },
    { url: `${site.url}/en`, lastModified: now, changeFrequency: 'weekly', priority: 0.9,
      alternates: { languages: { 'de-DE': site.url, en: `${site.url}/en` } } },
    { url: `${site.url}/ki-telefonassistent`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${site.url}/ki-telefonassistent/arztpraxis`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/ki-telefonassistent/handwerk`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/ki-telefonassistent/steuerberater`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/ki-telefonassistent/hausverwaltung`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/ki-telefonassistent/hotel`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/ki-telefonassistent/autohaus`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    // Geo-Seiten
    { url: `${site.url}/ki-telefonassistent-wiesbaden`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/ki-automatisierung-wiesbaden`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/ki-telefonassistent-frankfurt`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/ki-telefonassistent-muenchen`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/ki-telefonassistent-hamburg`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/ki-telefonassistent-berlin`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/ki-telefonassistent-koeln`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/ki-telefonassistent-stuttgart`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    // Blog
    { url: `${site.url}/blog/ki-telefonassistent-vergleich-2026`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site.url}/ki-agentur-mittelstand`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${site.url}/termin`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${site.url}/ki-beratung-wiesbaden`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/roi-checkliste-ki-agent`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site.url}/cases`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ...CASE_STUDIES.map((cs) => ({
      url: `${site.url}/cases/${cs.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    { url: `${site.url}/insights`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    ...INSIGHTS.map((p) => ({
      url: `${site.url}/insights/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    { url: `${site.url}/impressum`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${site.url}/datenschutz`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${site.url}/agb`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
