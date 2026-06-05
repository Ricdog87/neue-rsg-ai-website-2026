import type { Metadata } from 'next';
import { Hero } from '@/components/sections/hero';
import { TechMarquee } from '@/components/sections/tech-marquee';
import { TrustStrip } from '@/components/sections/trust-strip';
import { ContactSection } from '@/components/sections/contact-section';
import { SectionReveal } from '@/components/ui/section-reveal';

export const metadata: Metadata = {
  title: 'AI Phone Assistant for SMBs — answers, qualifies, books | RSG AI',
  description:
    'Your AI phone assistant answers every call, qualifies leads and books meetings — 24/7, in natural language, wired into your CRM. Live in four weeks. GDPR & EU hosting.',
  alternates: {
    canonical: 'https://www.rsg-ai.de/en',
    languages: {
      'de-DE': 'https://www.rsg-ai.de/',
      'en': 'https://www.rsg-ai.de/en',
    },
  },
  openGraph: {
    title: 'AI Phone Assistant for SMBs | RSG AI',
    description:
      'Answers every call, qualifies leads, books meetings — 24/7, wired into your CRM. Live in four weeks.',
    url: 'https://www.rsg-ai.de/en',
    siteName: 'RSG Agent Services',
    locale: 'en_US',
    type: 'website',
    images: ['https://www.rsg-ai.de/opengraph-image'],
  },
};

/**
 * English homepage (/en). Phase 1 of the bilingual rollout: reuses the
 * locale-aware sections (Hero, TrustStrip, ContactSection) which detect
 * the /en path and render English. The German site at the root is
 * untouched.
 */
export default function EnglishHomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <SectionReveal>
        <TrustStrip />
      </SectionReveal>
      <SectionReveal>
        <ContactSection />
      </SectionReveal>
    </>
  );
}
