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
import { callcenterEn } from '@/lib/callcenter';

const URL = 'https://www.rsg-ai.de/en/ki-callcenter';

export const metadata: Metadata = {
  title: 'Enterprise AI Call Center — inbound & outbound at scale, SLA, GDPR',
  description:
    'AI call center for large accounts: hundreds of concurrent conversations, a dedicated operation with guaranteed SLA, full integration into telephony, CRM and ERP. 24/7, GDPR-compliant, servers in Germany, EU AI Act ready. Plans up to Enterprise.',
  alternates: {
    canonical: URL,
    languages: {
      'de-DE': 'https://www.rsg-ai.de/ki-callcenter',
      'en': URL,
    },
  },
  openGraph: {
    title: 'Enterprise AI Call Center — at scale, SLA, GDPR',
    description:
      'Thousands of calls, none lost. AI call center for large accounts: dedicated operation, SLA, full integration. 24/7, GDPR, servers in Germany.',
    url: URL,
    siteName: 'RSG Agent Services',
    locale: 'en_US',
    type: 'website',
    images: ['https://www.rsg-ai.de/opengraph-image'],
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.rsg-ai.de/en' },
      { '@type': 'ListItem', position: 2, name: 'AI Call Center', item: URL },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Enterprise AI Call Center (inbound & outbound)',
    name: 'Enterprise AI Call Center',
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
    areaServed: { '@type': 'Country', name: 'Germany' },
    url: URL,
    description:
      'Enterprise AI call center for high call volume: dedicated operation, SLA, full integration, 24/7, GDPR-compliant, servers in Germany.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: callcenterEn.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
];

/**
 * /en/ki-callcenter — English enterprise landing page. Reuses the
 * locale-aware call-center sections, which detect the /en path and render
 * English. Pricing first, then the ROI calculator (shared term state).
 */
export default function EnglishKiCallcenterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <CallcenterHero />

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
