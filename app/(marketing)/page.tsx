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
import { SocialProofBar } from '@/components/sections/social-proof-bar';
import { ComparisonSection } from '@/components/sections/comparison-section';
import { ObjectionFaq } from '@/components/sections/objection-faq';
import { NewsletterSection } from '@/components/sections/newsletter-section';

/**
 * Homepage — Pitch-Arc-Reihenfolge MIT den cinematischen Scroll-Effekten.
 *
 * Reihenfolge = Sales-Story:
 *  №01 Live-Demo → №02 Hero → №03 SocialProof → №04 Problem (Comparison)
 *  → №05 Wert (ROI) → №06 Angebot (Pricing) → №07 Beweis (Reviews)
 *  → №08 TrustStrip → №09 Breather (Marquee) → №10 Einwände (FAQ)
 *  → №11 Garantie → №12 CTA → №13 Tail
 *
 * Effekt-Komposition: ScrollParallax-Drift + gemischte Slide-Richtungen +
 * Zoom-Reveals (wie Deploy 8165145 — die Version mit dem „Wow"-Scroll).
 * Der overflow-x-clip-Wrapper unterbindet horizontale Scroll-Artefakte
 * durch die Drifts, ohne die Effekte zu kastrieren (clip erzeugt keinen
 * Scroll-Container, sticky bleibt funktional).
 *
 * ExitIntent bleibt entfernt — Overlay-Risiko in Live-Präsentationen.
 */
export default function HomePage() {
  return (
    <div className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(faqPageLd(FAQ)) }}
      />

      {/* №01 — Live-Demo · der Präsentations-Hook */}
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

      {/* №02 — Positionierung */}
      <Hero />

      {/* №03 — Schnelle Glaubwürdigkeit */}
      <ScrollParallax x={-12}>
        <ScrollSlide direction="up">
          <SocialProofBar />
        </ScrollSlide>
      </ScrollParallax>

      {/* №04 — Das Problem: drei Wege, Anrufe zu händeln */}
      <ScrollParallax x={12}>
        <ScrollSlide direction="up">
          <ComparisonSection />
        </ScrollSlide>
      </ScrollParallax>

      {/* №05 — Der Wert: verlorener → zurückgewonnener Umsatz */}
      <ScrollParallax x={14}>
        <ScrollSlide direction="right">
          <VoiceRoiCalculator />
        </ScrollSlide>
      </ScrollParallax>

      {/* №06 — Das Angebot */}
      <ScrollParallax x={-14}>
        <ScrollZoom>
          <PricingSnapshot />
        </ScrollZoom>
      </ScrollParallax>

      {/* №07 — Beweis */}
      <ScrollParallax x={10}>
        <ScrollSlide direction="left">
          <GoogleReviews />
        </ScrollSlide>
      </ScrollParallax>

      {/* №08 — KPIs · DSGVO */}
      <ScrollParallax x={-14}>
        <ScrollZoom>
          <TrustStrip />
        </ScrollZoom>
      </ScrollParallax>

      {/* №09 — Breather */}
      <ScrollParallax x={-10}>
        <ScrollSlide direction="up">
          <TechMarquee />
        </ScrollSlide>
      </ScrollParallax>

      {/* №10 — Einwände */}
      <ScrollParallax x={14}>
        <ScrollSlide direction="up">
          <ObjectionFaq />
        </ScrollSlide>
      </ScrollParallax>

      {/* №11 — Risiko-Umkehr */}
      <ScrollParallax x={10}>
        <ScrollSlide direction="up">
          <GuaranteeStrip />
        </ScrollSlide>
      </ScrollParallax>

      {/* №12 — CTA */}
      <ScrollParallax x={12}>
        <ScrollZoom>
          <ContactSection />
        </ScrollZoom>
      </ScrollParallax>

      {/* №13 — Tail */}
      <ScrollParallax x={-12}>
        <ScrollSlide direction="up">
          <NewsletterSection />
        </ScrollSlide>
      </ScrollParallax>
      <ScrollParallax x={-10}>
        <ScrollSlide direction="up">
          <CitiesSection />
        </ScrollSlide>
      </ScrollParallax>
    </div>
  );
}
