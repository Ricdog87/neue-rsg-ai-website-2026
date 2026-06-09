import type { MetadataRoute } from 'next';
import { site } from '@/lib/content';
import { CASE_STUDIES } from '@/lib/case-studies';
import { INSIGHTS } from '@/lib/insights';

const U = site.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // DE/EN-Paare mit hreflang-Alternates (Array direkt typisiert -> Literale bleiben schmal)
  const enPairs: MetadataRoute.Sitemap = [
    { url: U, lastModified: now, priority: 1.0, changeFrequency: 'weekly', alternates: { languages: { 'de-DE': U, en: `${U}/en` } } },
    { url: `${U}/en`, lastModified: now, priority: 0.9, changeFrequency: 'weekly', alternates: { languages: { 'de-DE': U, en: `${U}/en` } } },
    { url: `${U}/preise`, lastModified: now, priority: 0.9, changeFrequency: 'weekly', alternates: { languages: { 'de-DE': `${U}/preise`, en: `${U}/en/preise` } } },
    { url: `${U}/en/preise`, lastModified: now, priority: 0.8, changeFrequency: 'weekly', alternates: { languages: { 'de-DE': `${U}/preise`, en: `${U}/en/preise` } } },
  ];

  const staticPaths: Array<[string, number, 'weekly' | 'monthly' | 'yearly']> = [
    ['/automatisierung', 0.9, 'weekly'],
    ['/ki-agentur-mittelstand', 0.9, 'weekly'],
    ['/ki-telefonassistent', 0.9, 'weekly'],
    ['/ki-beratung-wiesbaden', 0.8, 'monthly'],
    ['/termin', 0.9, 'monthly'],
    ['/roi-checkliste-ki-agent', 0.7, 'monthly'],
    ['/ki-telefonassistent/arztpraxis', 0.8, 'monthly'],
    ['/ki-telefonassistent/autohaus', 0.8, 'monthly'],
    ['/ki-telefonassistent/handwerk', 0.8, 'monthly'],
    ['/ki-telefonassistent/hausverwaltung', 0.8, 'monthly'],
    ['/ki-telefonassistent/hotel', 0.8, 'monthly'],
    ['/ki-telefonassistent/steuerberater', 0.8, 'monthly'],
    ['/ki-telefonassistent-immobilien', 0.7, 'monthly'],
    ['/ki-telefonassistent-kanzlei', 0.7, 'monthly'],
    ['/ki-telefonassistent-wiesbaden', 0.8, 'monthly'],
    ['/ki-automatisierung-wiesbaden', 0.8, 'monthly'],
    ['/ki-telefonassistent-frankfurt', 0.8, 'monthly'],
    ['/ki-telefonassistent-muenchen', 0.8, 'monthly'],
    ['/ki-telefonassistent-hamburg', 0.8, 'monthly'],
    ['/ki-telefonassistent-berlin', 0.8, 'monthly'],
    ['/ki-telefonassistent-koeln', 0.8, 'monthly'],
    ['/ki-telefonassistent-stuttgart', 0.8, 'monthly'],
    ['/ki-telefonassistent-duesseldorf', 0.8, 'monthly'],
    ['/ki-telefonassistent-nuernberg', 0.8, 'monthly'],
    ['/blog/ki-telefonassistent-vergleich-2026', 0.7, 'monthly'],
    ['/blog/ki-telefonassistent-handwerk', 0.7, 'monthly'],
    ['/blog/ki-telefonassistent-kosten-2026', 0.7, 'monthly'],
    ['/blog/ki-telefonie-dsgvo-2026', 0.7, 'monthly'],
    ['/cases', 0.8, 'monthly'],
    ['/insights', 0.7, 'weekly'],
    ['/impressum', 0.3, 'yearly'],
    ['/datenschutz', 0.3, 'yearly'],
    ['/agb', 0.3, 'yearly'],
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map(([p, priority, changeFrequency]) => ({
    url: `${U}${p}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const caseEntries: MetadataRoute.Sitemap = CASE_STUDIES.map((cs) => ({
    url: `${U}/cases/${cs.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const insightEntries: MetadataRoute.Sitemap = INSIGHTS.map((post) => ({
    url: `${U}/insights/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...enPairs, ...staticEntries, ...caseEntries, ...insightEntries];
}
