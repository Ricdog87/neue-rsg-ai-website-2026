import { Hero } from '@/components/sections/hero';
import { TrustMarquee } from '@/components/sections/trust-marquee';
import { LiveAgentsSection } from '@/components/sections/live-agents-section';
import { ProblemsSection } from '@/components/sections/problems-section';
import { SolutionsSection } from '@/components/sections/solutions-section';
import { SimulationSection } from '@/components/sections/simulation-section';
import { ShowcaseSection } from '@/components/sections/showcase-section';
import { UseCasesSection } from '@/components/sections/usecases-section';
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

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <SectionReveal><LiveAgentsSection /></SectionReveal>
      <SectionReveal><ProblemsSection /></SectionReveal>
      <SectionReveal><SolutionsSection /></SectionReveal>
      <SectionReveal><SimulationSection /></SectionReveal>
      {/* WOW — pinned horizontal showcase over WebGL distortion */}
      <ShowcaseSection />
      <SectionReveal><UseCasesSection /></SectionReveal>
      <SectionReveal><ManifestoSection /></SectionReveal>
      <SectionReveal><RoiSection /></SectionReveal>
      <SectionReveal><TechExplainerSection /></SectionReveal>
      <SectionReveal><PricingSection /></SectionReveal>
      <SectionReveal><TestimonialsSection /></SectionReveal>
      <SectionReveal><TimelineSection /></SectionReveal>
      <SectionReveal><TechStackSection /></SectionReveal>
      <SectionReveal><AboutSection /></SectionReveal>
      <SectionReveal><ContactSection /></SectionReveal>
    </>
  );
}
