import { Hero } from '@/components/sections/hero';
import { UspSection } from '@/components/sections/usp-section';
import { PipelineSection } from '@/components/sections/pipeline-section';
import { SolutionsSection } from '@/components/sections/solutions-section';
import { RoiSection } from '@/components/sections/roi-section';
import { PricingSection } from '@/components/sections/pricing-section';
import { ContactSection } from '@/components/sections/contact-section';
import { SectionReveal } from '@/components/ui/section-reveal';

/**
 * Sales-pitch composition — strafe Reihenfolge, 7 Sektionen.
 *
 *  №01 Hero       · Wer wir sind        (5-Sek-Eindruck)
 *  №02 USP        · Warum RSG AI        (3 Differenzierer)
 *  №03 Pipelines  · Was wir bauen       (2 reale End-to-End-Flows)
 *  №04 Solutions  · Wie wir liefern     (4 Schritte + Live-Pipeline-Visual)
 *  №05 ROI        · Was du sparst       (interaktiver Rechner)
 *  №06 Pricing    · Investment          (2 Tiers, klare Zahlen)
 *  №07 Contact    · Termin              (Buchung)
 *
 * Dropped from main flow (still in codebase as opt-in):
 *  · LiveAgentsSection — redundant zu Pipelines
 *  · UseCasesSection   — Menu besprechen wir im Meeting
 *  · ProblemsSection   — Hartfakts sind im USP enthalten
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionReveal>
        <UspSection />
      </SectionReveal>
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
