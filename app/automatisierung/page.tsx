import type { Metadata } from 'next';
import { AutomationHero } from '@/components/sections/automation-hero';
import { AgentShowcase } from '@/components/sections/agent-showcase';
import { PipelineSection } from '@/components/sections/pipeline-section';
import { AutomationPricing } from '@/components/sections/automation-pricing';
import { RoiSection } from '@/components/sections/roi-section';
import { SolutionsSection } from '@/components/sections/solutions-section';
import { UspSection } from '@/components/sections/usp-section';
import { ContactSection } from '@/components/sections/contact-section';
import { ScrollSlide } from '@/components/ui/scroll-slide';
import { ScrollZoom } from '@/components/ui/scroll-zoom';

export const metadata: Metadata = {
  title: 'KI-Automatisierung & KI-Agenten für den Mittelstand',
  description:
    'Prozessautomatisierung und autonome KI-Agenten — gebaut und betrieben aus einer Hand. Workflows ab 2.500 €, KI-Agenten ab 5.000 €. Go-Live in 4 Wochen, Festpreis, DSGVO & EU-Cloud.',
  alternates: { canonical: 'https://www.rsg-ai.de/automatisierung' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'KI-Automatisierung & KI-Agenten für den Mittelstand',
    description:
      'Prozessautomatisierung und autonome KI-Agenten — gebaut und betrieben aus einer Hand. Go-Live in 4 Wochen, Festpreis, DSGVO & EU-Cloud.',
    url: 'https://www.rsg-ai.de/automatisierung',
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
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Automatisierung',
        item: 'https://www.rsg-ai.de/automatisierung',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'KI-Automatisierung & KI-Agenten',
    name: 'Prozessautomatisierung & KI-Agenten',
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
    url: 'https://www.rsg-ai.de/automatisierung',
    description:
      'Prozessautomatisierung und autonome KI-Agenten — gebaut und betrieben aus einer Hand. Go-Live in 4 Wochen, Festpreis, DSGVO & EU-Cloud.',
  },
];

/**
 * /automatisierung — the dedicated home for everything beyond the phone
 * assistant: process automation + autonomous AI agents. The homepage is
 * voice-first; this page is where workflows & agents take the stage.
 *
 * Composed from the proven section components (pipelines, process, USP,
 * ROI) under a purpose-built automation hero.
 */
export default function AutomatisierungPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AutomationHero />
      <ScrollZoom>
        <AgentShowcase />
      </ScrollZoom>
      <ScrollSlide direction="right">
        <PipelineSection />
      </ScrollSlide>
      <ScrollSlide direction="left">
        <SolutionsSection />
      </ScrollSlide>
      <ScrollZoom>
        <RoiSection />
      </ScrollZoom>
      <ScrollZoom>
        <AutomationPricing />
      </ScrollZoom>
      <ScrollSlide direction="right">
        <UspSection />
      </ScrollSlide>
      <ScrollZoom>
        <ContactSection />
      </ScrollZoom>
    </>
  );
}
