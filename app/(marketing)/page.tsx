import { Hero } from '@/components/sections/hero';
import { LiveVoiceAgent } from '@/components/sections/live-voice-agent';
import { TechMarquee } from '@/components/sections/tech-marquee';
import { VoiceAgentsSection } from '@/components/sections/voice-agents-section';
import { PricingSnapshot } from '@/components/sections/pricing-snapshot';
import { TrustStrip } from '@/components/sections/trust-strip';
import { ContactSection } from '@/components/sections/contact-section';
import { SectionReveal } from '@/components/ui/section-reveal';
import { faqPageLd, ldJson } from '@/lib/jsonld';
import { FAQ } from '@/lib/faq';

/**
 * Homepage — Focused funnel, not encyclopedia.
 *
 * Strategy: don't dump everything on one page. Land users on the
 * value-proposition + price, then funnel them to dedicated pages
 * for depth (/preise, /ki-telefonassistent, /cases, /insights).
 *
 *  №01 Live-Voice-Agent · Interactive Hook (im Browser ausprobieren)
 *  №02 Hero             · Voice-forward Positioning
 *  №03 PricingSnapshot  · 3 Voice-Cards → /preise
 *  №04 TechMarquee      · Tech-Stack-Strip (visual breather)
 *  №05 VoiceAgents      · Live-Demo + Use-Cases (kompakt)
 *  №06 TrustStrip       · 4 KPIs (DSGVO · Time-to-Live · Performance)
 *  №07 Contact          · Final CTA → Termin
 */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(faqPageLd(FAQ)) }}
      />
      <SectionReveal>
        <LiveVoiceAgent />
      </SectionReveal>
      <Hero />
      <SectionReveal>
        <PricingSnapshot />
      </SectionReveal>
      <TechMarquee />
      <SectionReveal>
        <VoiceAgentsSection />
      </SectionReveal>
      <SectionReveal>
        <TrustStrip />
      </SectionReveal>
      <SectionReveal>
        <ContactSection />
      </SectionReveal>
    </>
  );
}
