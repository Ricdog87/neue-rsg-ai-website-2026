import type { Metadata } from 'next';
import { Hero } from '@/components/sections/hero';
import { PricingSnapshot } from '@/components/sections/pricing-snapshot';
import { VoiceRoiCalculator } from '@/components/sections/voice-roi-calculator';
import { TechMarquee } from '@/components/sections/tech-marquee';
import { TrustStrip } from '@/components/sections/trust-strip';
import { GoogleReviews } from '@/components/sections/google-reviews';
import { ContactSection } from '@/components/sections/contact-section';
import { VoiceConsole } from '@/components/sections/voice-console';
import { ScrollZoom } from '@/components/ui/scroll-zoom';
import { ScrollSlide } from '@/components/ui/scroll-slide';

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
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[440px] w-[720px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(174_100%_50%/0.16),transparent_70%)] blur-3xl"
        />
        <div className="mx-auto max-w-2xl px-6 pb-16 pt-[130px] text-center lg:pt-[160px]">
          <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.02em] text-white">
            Talk to one of our AI agents.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[1.05rem] leading-relaxed text-white/65">
            Skip the reading — hear it live. One click, your voice, an answer in under 0.4 seconds.
          </p>
          <div className="mx-auto mt-9 max-w-md text-left">
            <VoiceConsole title={null} />
          </div>
        </div>
      </section>
      <Hero />
      <ScrollZoom>
        <PricingSnapshot />
      </ScrollZoom>
      <ScrollSlide direction="right">
        <VoiceRoiCalculator />
      </ScrollSlide>
      <TechMarquee />
      <ScrollZoom>
        <TrustStrip />
      </ScrollZoom>
      <GoogleReviews en />
      <ScrollZoom>
        <ContactSection />
      </ScrollZoom>
    </>
  );
}
