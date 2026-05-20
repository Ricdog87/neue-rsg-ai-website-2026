import { Hero } from '@/components/sections/hero';
import { TechMarquee } from '@/components/sections/tech-marquee';
import { UspSection } from '@/components/sections/usp-section';
import { ManifestoStatementSection } from '@/components/sections/manifesto-statement-section';
import { PipelineSection } from '@/components/sections/pipeline-section';
import { SolutionsSection } from '@/components/sections/solutions-section';
import { RoiSection } from '@/components/sections/roi-section';
import { PricingSection } from '@/components/sections/pricing-section';
import { CommitmentSection } from '@/components/sections/commitment-section';
import { FaqSection } from '@/components/sections/faq-section';
import { FAQ } from '@/lib/faq';
import { NewsletterSection } from '@/components/sections/newsletter-section';
import { ContactSection } from '@/components/sections/contact-section';
import { SectionReveal } from '@/components/ui/section-reveal';
import { faqPageLd, ldJson } from '@/lib/jsonld';

/**
 * Sales-pitch composition — designed for live meeting use.
 *
 *  №01 Hero        · Wer wir sind        (5-Sek-Eindruck)
 *  №02 USP         · Warum RSG AI        (3 Differenzierer)
 *  №03 Manifesto   · Drei Sätze          (pinned scroll-jacked)
 *  №04 Pipelines   · Was wir bauen       (2 Workflows → Case-Studies)
 *  №05 Solutions   · Wie wir liefern     (4 Schritte)
 *  №06 ROI         · Was du sparst       (Rechner)
 *  №07 Pricing     · Investment          (2 Tiers)
 *  №08 Commitment  · Worauf wir uns festlegen
 *  №09 FAQ         · 7 harte Antworten
 *  №10 Newsletter  · Lead-Magnet         (LinkedIn + E-Mail)
 *  №11 Contact     · Termin              (Buchung)
 */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(faqPageLd(FAQ)) }}
      />
      <Hero />
      <TechMarquee />
      <SectionReveal>
        <UspSection />
      </SectionReveal>
      <ManifestoStatementSection />
      <SectionReveal>
        <PipelineSection />
      </SectionReveal>
      <SectionReveal>
        <SolutionsSection />
      </SectionReveal>
      <SectionReveal>
        <RoiSection />
      </SectionReveal>
      <SectionReveal>
        <PricingSection />
      </SectionReveal>
      <SectionReveal>
        <CommitmentSection />
      </SectionReveal>
      <SectionReveal>
        <FaqSection />
      </SectionReveal>
      <SectionReveal>
        <NewsletterSection />
      </SectionReveal>
      <SectionReveal>
        <ContactSection />
      </SectionReveal>
    </>
  );
}
