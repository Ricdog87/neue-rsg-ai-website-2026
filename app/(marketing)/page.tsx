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
import { faqPageLd, ldJson } from '@/lib/jsonld';
import { FAQ } from '@/lib/faq';
import { CitiesSection } from '@/components/sections/cities-section'
import { GuaranteeStrip } from '@/components/sections/guarantee-strip';
import { SocialProofBar } from '@/components/sections/social-proof-bar';
import { ComparisonSection } from '@/components/sections/comparison-section';
import { ObjectionFaq } from '@/components/sections/objection-faq';
import { NewsletterSection } from '@/components/sections/newsletter-section';

/**
 * Homepage — aufgebaut als Live-Verkaufspräsentation (Pitch-Arc).
 *
 * Reihenfolge folgt dem Sales-Gespräch, damit die Seite beim Scrollen
 * die Story trägt:
 *
 *  №01 Live-Demo        · VoiceConsole — der Hook, live im Browser
 *  №02 Hero             · Wer wir sind, Positionierung
 *  №03 SocialProof      · Schnelle Glaubwürdigkeit
 *  №04 Comparison       · Das Problem: Manuell vs. Hire vs. Agent
 *  №05 ROI-Rechner      · Der Wert: verlorener → zurückgewonnener Umsatz
 *  №06 Pricing          · Das Angebot (nach dem Wert, nie davor)
 *  №07 GoogleReviews    · Beweis
 *  №08 TrustStrip       · KPIs · DSGVO · Time-to-Live
 *  №09 TechMarquee      · Visueller Breather
 *  №10 ObjectionFaq     · Einwände
 *  №11 GuaranteeStrip   · Risiko-Umkehr
 *  №12 Contact          · CTA → Termin
 *  №13 Newsletter/Cities· Tail (SEO)
 *
 * Bewusst KEIN horizontaler Parallax-Drift (ScrollParallax x) mehr:
 * voll-breite Sektionen ±7 % zu verschieben erzeugte sichtbare
 * Rand-Balken beim Scrollen. Entrance-Reveals (Slide/Zoom) bleiben.
 * ExitIntent-Popup entfernt — feuert sonst mitten in der Präsentation,
 * sobald die Maus Richtung Browser-Leiste fährt.
 */
export default function HomePage() {
  return (
    <>
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
      <ScrollSlide direction="up">
        <SocialProofBar />
      </ScrollSlide>

      {/* №04 — Das Problem: drei Wege, Anrufe zu händeln */}
      <ScrollSlide direction="up">
        <ComparisonSection />
      </ScrollSlide>

      {/* №05 — Der Wert: verlorener → zurückgewonnener Umsatz */}
      <ScrollSlide direction="up">
        <VoiceRoiCalculator />
      </ScrollSlide>

      {/* №06 — Das Angebot */}
      <ScrollZoom>
        <PricingSnapshot />
      </ScrollZoom>

      {/* №07 — Beweis */}
      <ScrollSlide direction="up">
        <GoogleReviews />
      </ScrollSlide>

      {/* №08 — KPIs · DSGVO */}
      <ScrollZoom>
        <TrustStrip />
      </ScrollZoom>

      {/* №09 — Breather */}
      <ScrollSlide direction="up">
        <TechMarquee />
      </ScrollSlide>

      {/* №10 — Einwände */}
      <ScrollSlide direction="up">
        <ObjectionFaq />
      </ScrollSlide>

      {/* №11 — Risiko-Umkehr */}
      <ScrollSlide direction="up">
        <GuaranteeStrip />
      </ScrollSlide>

      {/* №12 — CTA */}
      <ScrollZoom>
        <ContactSection />
      </ScrollZoom>

      {/* №13 — Tail */}
      <ScrollSlide direction="up">
        <NewsletterSection />
      </ScrollSlide>
      <ScrollSlide direction="up">
        <CitiesSection />
      </ScrollSlide>
    </>
  );
}
