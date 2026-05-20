import { NextResponse } from 'next/server';
import { site } from '@/lib/content';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET() {
  const content = `# RSG Agent Services

> ${site.tagline}. Wir bauen und betreiben produktive KI-Agenten für den Mittelstand. 2–4 Wochen Go-Live. Hosting in Deutschland, DSGVO-konform, Festpreis vor dem ersten Commit.

## Über uns

RSG Agent Services (Markenname der RSG Recruiting Solutions Group GmbH, Wiesbaden) entwickelt maßgeschneiderte KI-Agenten für Vertrieb, Support und Operations im deutschsprachigen Mittelstand. Geschäftsführer: Ricardo Serrano. Stack: LangChain, LangGraph, n8n, OpenAI, Anthropic. EU-Cloud-Hosting (Frankfurt + Berlin), AVV inklusive.

## Kernleistungen

- KI-Agent-Entwicklung (Sales · Support · E-Mail · Operations · Onboarding · Admin)
- KI-Beratung Mittelstand · Workflow-Audit · Roadmap mit Festpreis
- 30-Tage-SLA · Source-Code-Ownership · keine Vendor-Lock-in

## Geografischer Fokus

Wiesbaden · Mainz · Frankfurt Rhein-Main · DACH-Mittelstand (DE/AT/CH)

## Wichtige Seiten

- [Homepage](${site.url}): Übersicht aller KI-Agent-Services
- [KI-Beratung Wiesbaden](${site.url}/ki-beratung-wiesbaden): Lokale Beratung Rhein-Main
- [Case Studies](${site.url}/cases): Sales-Agent · Support-Agent · E-Mail-Agent
- [Sales-Agent Case](${site.url}/cases/sales-agent): 142 → 47 qualifizierte Leads/Tag, €312 K Umsatz/Quartal
- [Support-Agent Case](${site.url}/cases/support-agent): 94 % Tier-1 autonom gelöst, CSAT 3,4 → 4,7
- [E-Mail-Agent Case](${site.url}/cases/email-agent): 180 → 8 Mails/Tag für den CEO
- [Insights](${site.url}/insights): Pipeline-Teardowns, Anti-Patterns, Pricing-Essays
- [ROI-Checkliste KI-Agent](${site.url}/roi-checkliste-ki-agent): 12 harte Fragen vor dem Investment

## Optional

- [LinkedIn-Newsletter „Mittelstand automatisiert"](${site.newsletter.linkedinUrl})
- [Termin buchen](${site.url}/termin): Erstgespräch, kostenfrei, 30 Min
- [Datenschutz](${site.url}/datenschutz) · [Impressum](${site.url}/impressum) · [AGB](${site.url}/agb)

## Kontakt

- E-Mail: ${site.contact.email}
- Telefon: ${site.contact.phone}
- LinkedIn: ${site.social.linkedin}
- YouTube: ${site.social.youtube}
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
