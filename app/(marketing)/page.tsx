import { Hero } from '@/components/sections/hero';
import { TrustMarquee } from '@/components/sections/trust-marquee';
import { LiveAgentsSection } from '@/components/sections/live-agents-section';
import { ProblemsSection } from '@/components/sections/problems-section';
import { SolutionsSection } from '@/components/sections/solutions-section';
import { SimulationSection } from '@/components/sections/simulation-section';
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

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <LiveAgentsSection />
      <ProblemsSection />
      <SolutionsSection />
      <SimulationSection />
      <UseCasesSection />
      <ManifestoSection />
      <RoiSection />
      <TechExplainerSection />
      <PricingSection />
      <TestimonialsSection />
      <TimelineSection />
      <TechStackSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
