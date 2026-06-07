import type { Metadata } from 'next';
import { ScrollSlide } from '@/components/ui/scroll-slide';
import { ScrollZoom } from '@/components/ui/scroll-zoom';
import { CallcenterHero } from '@/components/sections/callcenter/hero';
import {
  CallcenterProblem,
  CallcenterSolution,
  CallcenterSteps,
  CallcenterIndustries,
  CallcenterLegal,
  CallcenterSocialProof,
  CallcenterFaq,
  CallcenterFinalCta,
  CallcenterStickyCta,
} from '@/components/sections/callcenter/content-sections';
import { CallcenterProvider } from '@/components/sections/callcenter/provider';
import { CallcenterRoiCalculator } from '@/components/sections/callcenter/roi-calculator';
import { CallcenterPricing } from '@/components/sections/callcenter/pricing';
import { callcenter } from '@/lib/callcenter';

const URL = 'https://www.rsg-ai.de/ki-callcenter';

export const metadata: Metadata = {
  title: 'KI-Callcenter — Inbound & Outbound, 24/7, DSGVO | RSG AI',
  description:
    'Dein KI-Callcenter nimmt jeden Anruf an und ruft Leads proaktiv zurück — 24/7, unbegrenzt parallel, in natürlichem Deutsch, direkt ins CRM. Server in Deutschland, DSGVO-konform, EU AI Act ready. Tarife ab 990 €/Monat.',
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'KI-Callcenter — Inbound & Outbound, 24/7, DSGVO | RSG AI',
    description:
      'Nie wieder einen Anruf verpassen. KI-Callcenter für Inbound & Outbound, 24/7, DSGVO-konform, Server in Deutschland. Tarife ab 990 €/Monat.',
    url: URL,
    siteName: 'RSG Agent Services',
    locale: 'de_DE',
    type: 'website',
    images: ['https://www.rsg-ai.de/opengraph-image'],
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://www.rsg-ai.de' },
      { '@type': 'ListItem', position: 2, name: 'KI-Callcenter', item: URL },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'KI-Callcenter (Inbound & Outbound)',
    name: 'KI-Callcenter',
    provider: {
      '@type': 'ProfessionalService',
      name: 'RSG Agent Services',
      url: 'https://www.rsg-ai.de',
      telephone: '+49 176 60772556',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Klingholzstraße 7',
        postalCode: '65189',
        addressLocality: 'Wiesbaden',
        addressCountry: 'DE',
      },
    },
    areaServed: { '@type': 'Country', name: 'Deutschland' },
    url: URL,
    description:
      'KI-Callcenter für Inbound & Outbound: nimmt jeden Anruf an, ruft Leads zurück, 24/7, DSGVO-konform, Server in Deutschland.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: callcenter.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
];

/**
 * /ki-callcenter — dedicated landing page for the AI call center product.
 * Lives inside the existing site (shared layout, nav, WebGL backdrop,
 * design tokens). The ROI calculator and pricing share contract-term
 * state via CallcenterProvider so the term switcher updates both live.
 */
export default function KiCallcenterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <CallcenterHero />

      <ScrollZoom>
        <CallcenterProblem />
      </ScrollZoom>
      <ScrollSlide direction="left">
        <CallcenterSolution />
      </ScrollSlide>
      <ScrollZoom>
        <CallcenterSteps />
      </ScrollZoom>
      <ScrollSlide direction="right">
        <CallcenterIndustries />
      </ScrollSlide>

      {/* Calculator + pricing share the contract-term state */}
      <CallcenterProvider>
        <ScrollZoom>
          <CallcenterRoiCalculator />
        </ScrollZoom>
        <ScrollZoom>
          <CallcenterPricing />
        </ScrollZoom>
      </CallcenterProvider>

      <ScrollZoom>
        <CallcenterLegal />
      </ScrollZoom>
      <ScrollSlide direction="left">
        <CallcenterSocialProof />
      </ScrollSlide>
      <ScrollZoom>
        <CallcenterFaq />
      </ScrollZoom>
      <CallcenterFinalCta />

      <CallcenterStickyCta />
    </>
  );
}
