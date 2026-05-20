import { NextResponse } from 'next/server';
import { site } from '@/lib/content';
import { CASE_STUDIES } from '@/lib/case-studies';
import { INSIGHTS } from '@/lib/insights';
import { FAQ } from '@/lib/faq';

export const dynamic = 'force-static';
export const revalidate = 3600;

function caseStudyToMarkdown(cs: (typeof CASE_STUDIES)[number]) {
  const meta = cs.meta.map((m) => `- ${m.k}: ${m.v}`).join('\n');
  const bullets = cs.problem.bullets.map((b) => `- ${b}`).join('\n');
  const steps = cs.pipeline.steps
    .map((s, i) => `${i + 1}. **${s.label}** (${s.detail})`)
    .join('\n');
  const kpis = cs.results.kpis
    .map((k) => `- **${k.value}** — ${k.label}${k.sub ? ` (${k.sub})` : ''}`)
    .join('\n');

  return `## ${cs.title}

URL: ${site.url}/cases/${cs.slug}

${cs.subline}

### Projekt-Meta
${meta}

### Das Problem
${cs.problem.body}

${bullets}

### Pipeline · ${cs.pipeline.title}
Ø Zeit-Ersparnis: ${cs.pipeline.timeSaved}

${steps}

### Ergebnis · ${cs.results.headline}
${kpis}

### O-Ton
> ${cs.quote.text}
> — ${cs.quote.author}, ${cs.quote.company}`;
}

function insightToMarkdown(post: (typeof INSIGHTS)[number]) {
  return `## ${post.title}

URL: ${site.url}/insights/${post.slug}
Datum: ${post.date} · ${post.tag} · ${post.readingTime}

${post.excerpt}

${post.body.join('\n\n')}`;
}

export async function GET() {
  const cases = CASE_STUDIES.map(caseStudyToMarkdown).join('\n\n---\n\n');
  const insights = INSIGHTS.map(insightToMarkdown).join('\n\n---\n\n');
  const faqs = FAQ.map((q) => `### ${q.q}\n\n${q.a}`).join('\n\n');

  const content = `# RSG Agent Services — vollständiger Content

> ${site.tagline}. Maßgeschneiderte KI-Agenten für den deutschsprachigen Mittelstand. 2–4 Wochen Go-Live. EU-Cloud-Hosting in Deutschland. DSGVO-konform mit AVV. Source-Code-Ownership. 30-Tage-SLA mit Erfolgskriterien.

Geschäftsführer: Ricardo Serrano · Standort: Wiesbaden, Hessen · Marktfokus: DACH-Mittelstand · Kontakt: ${site.contact.email}

---

# Case Studies — Live-Pipelines aus echten Projekten

${cases}

---

# Insights — Essays aus dem Mittelstand

${insights}

---

# FAQ — Häufig gestellte Fragen vor dem Erstgespräch

${faqs}

---

# Kontakt

- E-Mail: ${site.contact.email}
- Telefon: ${site.contact.phone}
- Standort: ${site.contact.city}
- LinkedIn: ${site.social.linkedin}
- LinkedIn-Newsletter: ${site.newsletter.linkedinUrl}
- YouTube: ${site.social.youtube}
- Instagram: ${site.social.instagram}
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
