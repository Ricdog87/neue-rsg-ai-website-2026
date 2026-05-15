import { Hero } from '@/components/sections/hero';
import { TrustMarquee } from '@/components/sections/trust-marquee';
import { LiveAgentsSection } from '@/components/sections/live-agents-section';
import { ProblemsSection } from '@/components/sections/problems-section';
import { SolutionsSection } from '@/components/sections/solutions-section';
import { SimulationSection } from '@/components/sections/simulation-section';
import { ShowcaseSection } from '@/components/sections/showcase-section';
import { UseCasesSection } from '@/components/sections/usecases-section';
import { StatsRevealSection } from '@/components/sections/stats-reveal-section';
import { ManifestoSection } from '@/components/sections/manifesto-section';
import { RoiSection } from '@/components/sections/roi-section';
import { TechExplainerSection } from '@/components/sections/tech-explainer-section';
import { PricingSection } from '@/components/sections/pricing-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { TimelineSection } from '@/components/sections/timeline-section';
import { TechStackSection } from '@/components/sections/techstack-section';
import { AboutSection } from '@/components/sections/about-section';
import { ContactSection } from '@/components/sections/contact-section';
import { SectionReveal } from '@/components/ui/section-reveal';

/**
 * Page composition order — senior funnel pass.
 *
 *  1.  Hero            → Hook + Promise
 *  2.  TrustMarquee    → Instant credibility
 *  3.  Problems        → PAIN (agitate)
 *  4.  LiveAgents      → PROOF: agents working right now
 *  5.  Showcase        → PROOF: horizontal walkthrough of use cases
 *  6.  StatsReveal     → PROOF: big numbers in your face
 *  7.  Solutions       → SOLUTION (how we solve it)
 *  8.  UseCases        → SOLUTION (which agent fits which department)
 *  9.  Simulation      → SOLUTION (interactive sim)
 *  10. TechExplainer   → SOLUTION (architecture: which mode fits you)
 *  11. Roi             → BUYING SIGNAL (your savings)
 *  12. Testimonials    → SOCIAL PROOF (others who decided)
 *  13. Pricing         → INVESTMENT
 *  14. Timeline        → ANTI-ANXIETY (process clarity)
 *  15. TechStack       → TRUST (DSGVO / EU / ISO27001)
 *  16. Manifesto       → POSITIONING
 *  17. About           → FOUNDER STORY
 *  18. Contact         → CLOSE
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMarquee />

      {/* PAIN */}
      <SectionReveal><ProblemsSection /></SectionReveal>

      {/* PROOF */}
      <SectionReveal><LiveAgentsSection /></SectionReveal>
      <ShowcaseSection />
      <StatsRevealSection />

      {/* SOLUTION */}
      <SectionReveal><SolutionsSection /></SectionReveal>
      <SectionReveal><UseCasesSection /></SectionReveal>
      <SectionReveal><SimulationSection /></SectionReveal>
      <SectionReveal><TechExplainerSection /></SectionReveal>

      {/* BUYING SIGNAL */}
      <SectionReveal><RoiSection /></SectionReveal>

      {/* SOCIAL PROOF + INVESTMENT */}
      <SectionReveal><TestimonialsSection /></SectionReveal>
      <SectionReveal><PricingSection /></SectionReveal>

      {/* ANTI-ANXIETY + TRUST */}
      <SectionReveal><TimelineSection /></SectionReveal>
      <SectionReveal><TechStackSection /></SectionReveal>

      {/* POSITIONING + CLOSE */}
      <SectionReveal><ManifestoSection /></SectionReveal>
      <SectionReveal><AboutSection /></SectionReveal>
      <SectionReveal><ContactSection /></SectionReveal>
    </>
  );
}
