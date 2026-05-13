import { Hero } from '@/components/sections/hero';
import { SectionPlaceholder } from '@/components/sections/section-placeholder';
import {
  liveAgents,
  problems,
  solutions,
  useCases,
  techExplainer,
  roi,
  pricing,
  testimonials,
  timeline,
  techStack,
  about,
  finalCta
} from '@/lib/content';

export default function HomePage() {
  return (
    <>
      <Hero />

      <SectionPlaceholder
        id="trust"
        eyebrow="Vertraut von innovativen Unternehmen"
        headline="ISO 27001 · DSGVO · EU-Server"
        subline="Logo-Strip Bestandskunden — kommt im nächsten Turn als animierte Marquee."
      />

      <SectionPlaceholder
        id="live-agents"
        eyebrow={liveAgents.eyebrow}
        headline={liveAgents.headline}
        subline={liveAgents.subline}
      />

      <SectionPlaceholder
        id="problems"
        eyebrow={problems.eyebrow}
        headline={problems.headline}
        subline={problems.subline}
      />

      <SectionPlaceholder
        id="solutions"
        eyebrow={solutions.eyebrow}
        headline={solutions.headline}
        subline={solutions.subline}
      />

      <SectionPlaceholder
        id="simulation"
        eyebrow="Live-Simulation"
        headline="Sieh deinem KI-Agenten beim Denken zu."
        subline="Terminal/Dashboard-Widget mit streamendem KI-Output. Implementation im nächsten Turn."
      />

      <SectionPlaceholder
        id="usecases"
        eyebrow={useCases.eyebrow}
        headline={useCases.headline}
        subline={useCases.subline}
      />

      <SectionPlaceholder
        id="manifesto"
        eyebrow="Manifesto"
        headline="Wir sind kein IT-Unternehmen, das Vertrieb erklärt bekommt."
        subline="iPad-Mockup mit Loop-Video + neon-türkiser Outline. Asset folgt."
      />

      <SectionPlaceholder
        id="roi"
        eyebrow={roi.eyebrow}
        headline={roi.headline}
        subline={roi.subline}
      />

      <SectionPlaceholder
        id="tech-explainer"
        eyebrow={techExplainer.eyebrow}
        headline={techExplainer.headline}
        subline={techExplainer.subline}
      />

      <SectionPlaceholder
        id="pricing"
        eyebrow={pricing.eyebrow}
        headline={pricing.headline}
        subline={pricing.subline}
      />

      <SectionPlaceholder
        id="testimonials"
        eyebrow={testimonials.eyebrow}
        headline={testimonials.headline}
        subline={testimonials.subline}
      />

      <SectionPlaceholder
        id="timeline"
        eyebrow={timeline.eyebrow}
        headline={timeline.headline}
        subline={timeline.subline}
      />

      <SectionPlaceholder
        id="techstack"
        eyebrow={techStack.eyebrow}
        headline={techStack.headline}
        subline={techStack.subline}
      />

      <SectionPlaceholder
        id="about"
        eyebrow={about.eyebrow}
        headline={about.headline}
        subline={about.paragraphs[0]}
      />

      <SectionPlaceholder
        id="contact"
        eyebrow={finalCta.eyebrow}
        headline={finalCta.headline}
        subline={finalCta.subline}
      />
    </>
  );
}
