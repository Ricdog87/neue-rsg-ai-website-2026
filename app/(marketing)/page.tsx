import { Hero } from '@/components/sections/hero';
import { UspSection } from '@/components/sections/usp-section';
import { LiveAgentsSection } from '@/components/sections/live-agents-section';
import { UseCasesSection } from '@/components/sections/usecases-section';
import { PipelineSection } from '@/components/sections/pipeline-section';
import { SolutionsSection } from '@/components/sections/solutions-section';
import { ProblemsSection } from '@/components/sections/problems-section';
import { RoiSection } from '@/components/sections/roi-section';
import { PricingSection } from '@/components/sections/pricing-section';
import { ContactSection } from '@/components/sections/contact-section';
import { SectionReveal } from '@/components/ui/section-reveal';

/**
 * Sales-pitch composition — meeting-ready, presentation flow.
 *
 *  №01 Hero        · Wer wir sind        (5-Sek-Eindruck)
 *  №02 USP         · Warum RSG AI        (3 Differenzierer)
 *  №03 LiveAgents  · Live in Produktion  (3 Agents · realtime KPI)
 *  №04 Pipelines   · Was wir bauen       (2 End-to-End Flows)  ← NEW
 *  №05 UseCases    · Sechs Agent-Typen   (Icons · KPI · Body)
 *  №06 Solutions   · Wie wir liefern     (4 Steps + Pipeline-Visual)
 *  №07 Problems    · Was wir lösen       (4 Hartfakts)
 *  №08 ROI         · Was du sparst       (interaktiver Rechner)
 *  №09 Pricing     · Investment          (2 Tiers)
 *  №10 Contact     · Termin              (Buchung)
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionReveal>
        <UspSection />
      </SectionReveal>
      <SectionReveal>
        <LiveAgentsSection />
      </SectionReveal>
      <SectionReveal>
        <PipelineSection />
      </SectionReveal>
      <SectionReveal>
        <UseCasesSection />
      </SectionReveal>
      <SectionReveal>
        <SolutionsSection />
      </SectionReveal>
      <SectionReveal>
        <ProblemsSection />
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
