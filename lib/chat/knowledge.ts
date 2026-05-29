/**
 * Statisches Wissensfundament für den Sales-Chatbot.
 *
 * Wird in den system prompt mit cache_control eingebettet, damit Claude
 * faktentreu über RSG AI Bescheid weiß. Single source of truth: alle
 * existierenden lib/-Module werden hier zu einem dichten Brief verdichtet.
 *
 * Wichtig: Inhalt nur ändern, wenn sich Fakten ändern — sonst wird der
 * Prompt-Cache invalidiert (siehe shared/prompt-caching.md).
 */

import { site, hero, solutions, roi, pricing, finalCta, about } from '../content';
import { FAQ } from '../faq';
import { CASE_STUDIES } from '../case-studies';

function bullets(items: readonly string[] | string[]): string {
  return items.map((s) => `  - ${s}`).join('\n');
}

const companyBlock = `
# RSG AI · Unternehmens-Snapshot
- Markenname: ${site.name} (${site.shortName})
- Tagline: ${site.tagline}
- Positionierung: ${site.positioning}
- Rechtsträger: ${site.legal.company} · ${site.legal.hrb}
- Standort: ${site.contact.city}
- Geschäftszeiten: ${site.contact.hours}
- Hosting: EU-Cloud, deutsche Rechenzentren (Frankfurt + Berlin), DSGVO-konform
- Gründer & Geschäftsführer: ${about.founder.name} — 15 Jahre B2B-Vertrieb, baut KI für den Mittelstand
- Kontakt: ${site.contact.email} · ${site.contact.phone}
- LinkedIn: ${site.social.linkedin}
- Aktuelle Kohorte: ${hero.subline}
`.trim();

const trustBlock = `
# Trust-Anker (faktisch belegt — niemals übertreiben)
${bullets(hero.trustChips)}
`.trim();

const solutionsBlock = `
# Lieferprozess — 4 Schritte in 4 Wochen
${solutions.steps.map((s, i) => `${i + 1}. ${s.title}\n   ${s.body}`).join('\n')}

Tech-Stack-Stichworte: LangChain, LangGraph, n8n, Python, TypeScript, Next.js,
Postgres, Vector-DBs (Qdrant/pgvector), DSGVO-konformes EU-Hosting,
HubSpot / Salesforce / Pipedrive / Personio / DATEV / Slack / Teams /
Outlook / Calendly / Google Workspace / Stripe / REST-APIs / Webhooks.
`.trim();

const departmentsBlock = `
# Abteilungen mit höchstem Hebel (typische Painpoints)
${roi.departments
  .map((d) => `- ${d.label}: ${d.body}\n  Painpoint: ${d.pain}`)
  .join('\n')}
`.trim();

const pricingBlock = `
# Preise — transparent, Festpreis, ohne Beraterstunden-Falle
${pricing.tiers
  .map(
    (t) => `## ${t.name} (${t.price} ${t.priceSuffix})
- Für wen: ${t.bestFor}
- Tagline: ${t.tagline}
- ROI-Hinweis: ${t.roiHint}
- Marktpreis-Vergleich: ${t.marketPrice}
- Leistungen:
${bullets(t.features)}
- ${t.note}`,
  )
  .join('\n\n')}

Fußnote: ${pricing.footnote}
`.trim();

const caseStudiesBlock = `
# Case Studies (echte Ergebnisse)
${CASE_STUDIES.map(
  (c) => `## ${c.title}
- Branche: ${c.meta.find((m) => m.k === 'Industry')?.v}
- Stack: ${c.meta.find((m) => m.k === 'Stack')?.v}
- Dauer: ${c.meta.find((m) => m.k === 'Duration')?.v}
- Problem: ${c.problem.body}
- KPIs nach Go-Live:
${bullets(c.results.kpis.map((k) => `${k.value} · ${k.label}${k.sub ? ` (${k.sub})` : ''}`))}
- Kunden-Zitat: „${c.quote.text}" — ${c.quote.author}, ${c.quote.company}`,
).join('\n\n')}
`.trim();

const faqBlock = `
# FAQ — häufige Fragen (Originaltext der Website)
${FAQ.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')}
`.trim();

const meetingBlock = `
# Erstgespräch — wie es abläuft
- Format: ${finalCta.headline}
- Inhalt: ${finalCta.subline}
- Was der Kunde am Ende hat: ${finalCta.ctaBody}
- Antwort-SLA: ${finalCta.responseSla}
- Termin-Buchungsseite: ${site.url}${site.cta.meetingUrl}
- Direkte Buchung per E-Mail: ${site.contact.email}
- Telefonisch: ${site.contact.phone}
`.trim();

export const KNOWLEDGE_BASE = [
  companyBlock,
  trustBlock,
  solutionsBlock,
  departmentsBlock,
  pricingBlock,
  caseStudiesBlock,
  faqBlock,
  meetingBlock,
].join('\n\n---\n\n');
