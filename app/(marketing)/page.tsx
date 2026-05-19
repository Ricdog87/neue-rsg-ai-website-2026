import { Hero } from '@/components/sections/hero';
import { ProblemsSection } from '@/components/sections/problems-section';
import { LiveAgentsSection } from '@/components/sections/live-agents-section';
import { SolutionsSection } from '@/components/sections/solutions-section';
import { RoiSection } from '@/components/sections/roi-section';
import { PricingSection } from '@/components/sections/pricing-section';
import { ContactSection } from '@/components/sections/contact-section';
import { SectionReveal } from '@/components/ui/section-reveal';

/**
 * Sales-pitch flow — 7 cinematic acts for live-meeting use.
 *
 *  1. Hero         · Hook (3-sec read)
 *  2. Problems     · Hartfakts der verlorenen Zeit
 *  3. LiveAgents   · Proof: 3 Agents, live KPIs
 *  4. Solutions    · 4-step "Wie wir liefern"
 *  5. ROI          · Interactive savings calc
 *  6. Pricing      · 2 Tiers, klare Zahlen
 *  7. Contact      · Close: Founder + Termin
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionReveal>
        <ProblemsSection />
      </SectionReveal>
      <SectionReveal>
        <LiveAgentsSection />
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
