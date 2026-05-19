import { Hero } from '@/components/sections/hero';
import { UspSection } from '@/components/sections/usp-section';
import { LiveAgentsSection } from '@/components/sections/live-agents-section';
import { SolutionsSection } from '@/components/sections/solutions-section';
import { ProblemsSection } from '@/components/sections/problems-section';
import { RoiSection } from '@/components/sections/roi-section';
import { PricingSection } from '@/components/sections/pricing-section';
import { ContactSection } from '@/components/sections/contact-section';
import { SectionReveal } from '@/components/ui/section-reveal';

/**
 * Sales-pitch composition — designed to be scrolled through during a
 * live client meeting. Each section is a "slide" the founder can stop
 * on, explain, and answer questions about.
 *
 *  №01 Hero        · Wer wir sind  (5-Sekunden-Eindruck)
 *  №02 USP         · Warum RSG AI  (3 Differenzierer)
 *  №03 LiveAgents  · Was wir gebaut haben  (Proof: live in Produktion)
 *  №04 Solutions   · Wie wir liefern  (4-Schritt-Prozess + Pipeline)
 *  №05 Problems    · Was wir lösen  (4 Hartfakts, Verkaufs-Hebel)
 *  №06 ROI         · Was du sparst  (interaktiver Rechner)
 *  №07 Pricing     · Was es kostet  (zwei Tiers, klare Zahlen)
 *  №08 Contact     · Wann's losgeht  (Termin buchen)
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
