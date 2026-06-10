import { Hero } from '@/components/sections/hero';
import { VoiceConsole } from '@/components/sections/voice-console';
import { TechMarquee } from '@/components/sections/tech-marquee';
import { PricingSnapshot } from '@/components/sections/pricing-snapshot';
import { VoiceRoiCalculator } from '@/components/sections/voice-roi-calculator';
import { TrustStrip } from '@/components/sections/trust-strip';
import { GoogleReviews } from '@/components/sections/google-reviews';
import { ContactSection } from '@/components/sections/contact-section';
import { ScrollSlide } from '@/components/ui/scroll-slide';
import { ScrollZoom } from '@/components/ui/scroll-zoom';
import { ScrollParallax } from '@/components/effects/scroll-parallax';
import { faqPageLd, ldJson } from '@/lib/jsonld';
import { FAQ } from '@/lib/faq';
import { CitiesSection } from '@/components/sections/cities-section'
import { GuaranteeStrip } from '@/components/sections/guarantee-strip';

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
      <section id="voice" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[440px] w-[720px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(174_100%_50%/0.05),transparent_75%)] blur-3xl"
        />
        <div className="mx-auto max-w-2xl px-6 pb-16 pt-[130px] text-center lg:pt-[160px]">
          <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.02em] text-white">
            Sprich mit einem unserer KI-Agenten.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[1.05rem] leading-relaxed text-white/65">
            Lies nicht über KI-Telefonie — erlebe sie. Ein Klick, deine Stimme, Antwort in unter 0,4 Sekunden.
          </p>
          <div className="mx-auto mt-9 max-w-md text-left">
            <VoiceConsole title={null} />
          </div>
        </div>
      </section>
      <Hero />
      <ScrollParallax x={10}>
        <ScrollSlide direction="left">
          <GoogleReviews />
        </ScrollSlide>
      </ScrollParallax>
      <ScrollParallax x={-14}>
        <ScrollZoom>
          <PricingSnapshot />
        </ScrollZoom>
      </ScrollParallax>
      <ScrollParallax x={14}>
        <ScrollSlide direction="right">
          <VoiceRoiCalculator />
        </ScrollSlide>
      </ScrollParallax>
      <ScrollParallax x={-10}>
        <ScrollSlide direction="up">
          <TechMarquee />
        </ScrollSlide>
      </ScrollParallax>
      <ScrollParallax x={-14}>
        <ScrollZoom>
          <TrustStrip />
        </ScrollZoom>
      </ScrollParallax>
      <ScrollParallax x={10}>
        <ScrollSlide direction="up">
          <GuaranteeStrip />
        </ScrollSlide>
      </ScrollParallax>
      <ScrollParallax x={12}>
        <ScrollZoom>
          <ContactSection />
        </ScrollZoom>
      </ScrollParallax>
      <ScrollParallax x={-10}>
        <ScrollSlide direction="up">
          <CitiesSection />
        </ScrollSlide>
      </ScrollParallax>
    </>
  );
}
