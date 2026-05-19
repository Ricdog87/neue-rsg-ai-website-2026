import { Hero } from '@/components/sections/hero';
import { UspSection } from '@/components/sections/usp-section';
import { ManifestoStatementSection } from '@/components/sections/manifesto-statement-section';
import { PipelineSection } from '@/components/sections/pipeline-section';
import { SolutionsSection } from '@/components/sections/solutions-section';
import { RoiSection } from '@/components/sections/roi-section';
import { PricingSection } from '@/components/sections/pricing-section';
import { ContactSection } from '@/components/sections/contact-section';
import { SectionReveal } from '@/components/ui/section-reveal';

/**
 * Sales-pitch composition — 8 sections, designed for live meeting use.
 *
 *  №01 Hero        · Wer wir sind        (5-Sek-Eindruck)
 *  №02 USP         · Warum RSG AI        (3 Differenzierer)
 *  №03 Manifesto   · Drei Sätze          (pinned scroll-jacked) ← NEW
 *  №04 Pipelines   · Was wir bauen       (2 reale Workflows)
 *  №05 Solutions   · Wie wir liefern     (4 Schritte)
 *  №06 ROI         · Was du sparst       (Rechner)
 *  №07 Pricing     · Investment          (2 Tiers)
 *  №08 Contact     · Termin              (Buchung)
 */
export default function HomePage() {
  return (
    <>
      <Hero />
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
        <ContactSection />
      </SectionReveal>
    </>
  );
}
