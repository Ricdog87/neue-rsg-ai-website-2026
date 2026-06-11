/**
 * Wissensbasis für Aiko (Sales-Bot).
 *
 * Single Source of Truth: alle Texte werden aus den bestehenden
 * Content-Modulen verdichtet — kein duplizierter Brand-Text, keine
 * driftenden Versionen. Wird in den System-Prompt mit cache_control
 * eingebettet (siehe shared/prompt-caching: stabiler Prefix).
 *
 * Wichtig: NIEMALS hier Preise/Features erfinden. Wenn Aiko etwas
 * nicht in dieser Datei findet → escalate_to_human.
 */

import { site, finalCta, about } from '../content';
import { voicePlans } from '../pricing-voice';
import { FAQ } from '../faq';
import { CASE_STUDIES } from '../case-studies';

const bullets = (items: readonly string[] | string[]) =>
  items.map((s) => `  - ${s}`).join('\n');

const companyBlock = `
# RSG AI — Unternehmens-Snapshot
- Markenname: ${site.name} (${site.shortName})
- Tagline: ${site.tagline}
- Positionierung: ${site.positioning}
- Rechtsträger: ${site.legal.company} · ${site.legal.hrb}
- Standort: ${site.contact.city}
- Geschäftszeiten: ${site.contact.hours}
- Hosting: EU-Cloud · DSGVO + EU AI Act konform
- Gründer & Geschäftsführer: ${about.founder.name}
- Kontakt: ${site.contact.email} · ${site.contact.phone}
- Termin-Buchung (HubSpot): ${site.cta.meetingUrl}
- Aiko ruft die HubSpot-Buchungsstrecke automatisch über das Tool
  book_meeting auf — Aiko schickt nie selbst erfundene Links.
`.trim();

const voicePlansBlock = `
# Voice-Pakete (alleinige Preis-Quelle — keine anderen Preise nennen)
${voicePlans
  .map(
    (p) => `## ${p.name}
- Tagline: ${p.tagline}
- Preis monatlich: ${p.priceMonthly}${p.priceSuffix}
- Preis jährlich (15 % günstiger, Setup inklusive): ${p.priceAnnual}${p.priceSuffix}
- Setup (nur bei monatlich): ${p.setup}
- Inklusiv-Minuten: ${p.includedMinutes.toLocaleString('de-DE')} Min/Mo
- Zusatzminute: ${p.overagePerMin !== null ? `${p.overagePerMin.toString().replace('.', ',')} €` : 'individuell'}
- Ideal für: ${p.idealFor}
- Bot-Closing erlaubt? ${p.checkoutTier ? 'JA — request_checkout darf für tier=' + p.checkoutTier + ' aufgerufen werden' : 'NEIN — Scale geht IMMER an Ricardo (escalate_to_human oder book_meeting)'}
- Leistungen:
${bullets(p.features)}`,
  )
  .join('\n\n')}

# Stripe-Checkout-Logik (verbindlich)
- Aiko ruft request_checkout NUR für Solo oder Team auf.
- billing="monthly" → Setup wird zusätzlich berechnet (eine Rechnung).
- billing="annual" → 15 % günstiger, KEIN Setup, 12 Monate Vorkasse.
- Vor request_checkout MUSS:
  1) DSGVO-Einwilligung explizit eingeholt sein (siehe System-Prompt),
  2) Lead per capture_lead bereits in HubSpot angelegt sein,
  3) Tier + Billing vom Nutzer eindeutig bestätigt sein ("Ja, ich
     will den AI Account Manager im Jahres-Abo").
`.trim();

const caseStudiesBlock = `
# Case Studies (echte Ergebnisse — exakt zitierbar)
${CASE_STUDIES.map(
  (c) => `## ${c.title}
- Branche: ${c.meta.find((m) => m.k === 'Industry')?.v ?? '—'}
- Stack: ${c.meta.find((m) => m.k === 'Stack')?.v ?? '—'}
- Problem: ${c.problem.body}
- KPIs nach Go-Live:
${bullets(c.results.kpis.map((k) => `${k.value} · ${k.label}${k.sub ? ' (' + k.sub + ')' : ''}`))}
- Originalzitat: „${c.quote.text}" — ${c.quote.author}, ${c.quote.company}`,
).join('\n\n')}
`.trim();

const faqBlock = `
# FAQ — exakt so von der Website (verbatim verwendbar)
${FAQ.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')}
`.trim();

const meetingBlock = `
# Erstgespräch / Termin
- Format: ${finalCta.headline}
- Inhalt: ${finalCta.subline}
- Outcome für den Kunden: ${finalCta.ctaBody}
- Antwort-SLA: ${finalCta.responseSla}
- Aiko bucht NIE selbst Termine — sie ruft book_meeting auf, das
  liefert den HubSpot-Buchungslink (${site.cta.meetingUrl}). Der
  Kunde wählt selbst den Slot, HubSpot bestätigt automatisch.
`.trim();

export const KNOWLEDGE_BASE = [
  companyBlock,
  voicePlansBlock,
  caseStudiesBlock,
  faqBlock,
  meetingBlock,
].join('\n\n---\n\n');
