import type { Metadata } from 'next';
import { ScrollSlide } from '@/components/ui/scroll-slide';
import { ScrollZoom } from '@/components/ui/scroll-zoom';
import { CallcenterHero } from '@/components/sections/callcenter/hero';
import {
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
  title: 'Enterprise KI-Callcenter — Inbound & Outbound at scale, SLA, DSGVO | RSG AI',
  description:
    'KI-Callcenter für Großkunden: hunderte parallele Gespräche, dedizierte Operation mit garantiertem SLA, volle Integration in Telefonie, CRM und ERP. 24/7, DSGVO-konform, Server in Deutschland, EU AI Act ready. Pakete bis Enterprise.',
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Enterprise KI-Callcenter — at scale, SLA, DSGVO | RSG AI',
    description:
      'Tausende Anrufe, null verloren. KI-Callcenter für Großkunden: dedizierte Operation, SLA, volle Integration. 24/7, DSGVO, Server in Deutschland.',
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
    serviceType: 'Enterprise KI-Callcenter (Inbound & Outbound)',
    name: 'Enterprise KI-Callcenter',
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
      'Enterprise KI-Callcenter für hohes Anrufvolumen: dedizierte Operation, SLA, volle Integration, 24/7, DSGVO-konform, Server in Deutschland.',
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
 * /ki-callcenter — enterprise landing page for the AI call center product.
 * Pricing is surfaced right after the hero; the pricing table and ROI
 * calculator share contract-term state via CallcenterProvider so the term
 * switcher updates both live.
 */
export default function KiCallcenterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <CallcenterHero />

      {/* Pricing first (enterprise buyers want the investment early), then the
          ROI calculator — both share the contract-term state. */}
      <CallcenterProvider>
        <ScrollZoom>
          <CallcenterPricing />
        </ScrollZoom>
        <ScrollZoom>
          <CallcenterRoiCalculator />
        </ScrollZoom>
      </CallcenterProvider>

      <ScrollSlide direction="left">
        <CallcenterSolution />
      </ScrollSlide>
      <ScrollZoom>
        <CallcenterSteps />
      </ScrollZoom>
      <ScrollSlide direction="right">
        <CallcenterIndustries />
      </ScrollSlide>
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
