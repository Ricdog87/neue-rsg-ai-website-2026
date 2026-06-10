import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ROI Checklist for AI Agents — 12 hard questions',
  description: 'Are you ready for an AI agent? 12 hard questions from real discovery calls. Go through them with your team — red flags vs. green lights.',
  alternates: {
    canonical: '/en/roi-checkliste-ki-agent',
    languages: { 'de-DE': '/roi-checkliste-ki-agent', en: '/en/roi-checkliste-ki-agent' },
  },
  robots: { index: true, follow: true },
  openGraph: { title: 'ROI Checklist for AI Agents · RSG AI', description: '12 hard questions from real discovery calls.', type: 'article' },
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
      { "@type": "Question", "name": "Which process eats more than 20 hours of staff time per week — and looks the same every time?", "acceptedAnswer": { "@type": "Answer", "text": "Red flag: Under 10 h/week · different every time. Green light: > 20 h/week · 80% repetitive logic." } },
      { "@type": "Question", "name": "Is the data the agent needs available digitally somewhere — or does it live in people's heads?", "acceptedAnswer": { "@type": "Answer", "text": "Red flag: Knowledge sits in 1–2 heads. Green light: Database · wiki · API · CRM." } },
      { "@type": "Question", "name": "What does one week of downtime in this process cost you, concretely in euros?", "acceptedAnswer": { "@type": "Answer", "text": "Red flag: 'Hard to say'. Green light: Lost revenue × probability · in euros." } },
      { "@type": "Question", "name": "Who makes the final call — and is that person part of the project from day one?", "acceptedAnswer": { "@type": "Answer", "text": "Red flag: Decision-maker has no time. Green light: CEO/COO is in the sprint 1 h/week." } }
  ],
};

export default function EnRoiChecklistPage() {
  return (
    <main className="relative min-h-screen px-6 pb-24 pt-[150px] lg:px-10 lg:pt-[180px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <div className="mx-auto max-w-[1080px]">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-[hsl(var(--accent))]">Lead magnet · ROI checklist</span>
        <h1 className="mt-6 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.025em] text-[hsl(var(--fg))]">
          Are you ready for an AI agent? 12 hard questions.
        </h1>
        <p className="mt-6 max-w-2xl text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
          The same 12 questions we ask in real discovery calls. Go through them with your team. If the answers land on the green side, an AI agent will pay off fast — if they land red, we&apos;ll tell you straight.
        </p>

        <section className="mt-14">
          <h2 className="font-mono text-[0.75rem] uppercase tracking-[0.24em] text-[hsl(var(--subtle))]">Volume &amp; repetition</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[0.8rem] tabular-nums text-[hsl(var(--accent))]">01</span>
                <h3 className="font-display text-[1.05rem] font-medium leading-snug text-[hsl(var(--fg))]">Which process eats more than 20 hours of staff time per week — and looks the same every time?</h3>
              </div>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-[hsl(var(--muted))]">An AI agent only pays off with repetition. One-off cases are not a pipeline.</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="rounded-md border border-[hsl(0_60%_45%/0.3)] bg-[hsl(0_60%_45%/0.06)] px-3 py-2 text-[0.78rem] text-[hsl(0_70%_72%)]">&#9873; Under 10 h/week · different every time</div>
                <div className="rounded-md border border-[hsl(var(--accent))/30] bg-[hsl(var(--accent))/0.06] px-3 py-2 text-[0.78rem] text-[hsl(var(--accent))]">&#10003; &gt; 20 h/week · 80% repetitive logic</div>
              </div>
            </div>
            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[0.8rem] tabular-nums text-[hsl(var(--accent))]">02</span>
                <h3 className="font-display text-[1.05rem] font-medium leading-snug text-[hsl(var(--fg))]">How often per day does this process occur — and is the volume rising?</h3>
              </div>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-[hsl(var(--muted))]">If volume is flat or shrinking, fix it manually.</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="rounded-md border border-[hsl(0_60%_45%/0.3)] bg-[hsl(0_60%_45%/0.06)] px-3 py-2 text-[0.78rem] text-[hsl(0_70%_72%)]">&#9873; &lt; 10x/day · declining</div>
                <div className="rounded-md border border-[hsl(var(--accent))/30] bg-[hsl(var(--accent))/0.06] px-3 py-2 text-[0.78rem] text-[hsl(var(--accent))]">&#10003; &gt; 50x/day · growing each quarter</div>
              </div>
            </div>
            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[0.8rem] tabular-nums text-[hsl(var(--accent))]">03</span>
                <h3 className="font-display text-[1.05rem] font-medium leading-snug text-[hsl(var(--fg))]">Would 2 extra hires solve it — or does it not scale even then?</h3>
              </div>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-[hsl(var(--muted))]">AI is not 'better employees'. AI is scaling beyond hiring.</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="rounded-md border border-[hsl(0_60%_45%/0.3)] bg-[hsl(0_60%_45%/0.06)] px-3 py-2 text-[0.78rem] text-[hsl(0_70%_72%)]">&#9873; 2 FTE are enough</div>
                <div className="rounded-md border border-[hsl(var(--accent))/30] bg-[hsl(var(--accent))/0.06] px-3 py-2 text-[0.78rem] text-[hsl(var(--accent))]">&#10003; Even 5 FTE would be overloaded in 6 months</div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-14">
          <h2 className="font-mono text-[0.75rem] uppercase tracking-[0.24em] text-[hsl(var(--subtle))]">Data &amp; rules</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[0.8rem] tabular-nums text-[hsl(var(--accent))]">04</span>
                <h3 className="font-display text-[1.05rem] font-medium leading-snug text-[hsl(var(--fg))]">Is the data the agent needs available digitally somewhere — or does it live in people's heads?</h3>
              </div>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-[hsl(var(--muted))]">Tribal knowledge: document first, then automate.</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="rounded-md border border-[hsl(0_60%_45%/0.3)] bg-[hsl(0_60%_45%/0.06)] px-3 py-2 text-[0.78rem] text-[hsl(0_70%_72%)]">&#9873; Knowledge sits in 1–2 heads</div>
                <div className="rounded-md border border-[hsl(var(--accent))/30] bg-[hsl(var(--accent))/0.06] px-3 py-2 text-[0.78rem] text-[hsl(var(--accent))]">&#10003; Database · wiki · API · CRM</div>
              </div>
            </div>
            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[0.8rem] tabular-nums text-[hsl(var(--accent))]">05</span>
                <h3 className="font-display text-[1.05rem] font-medium leading-snug text-[hsl(var(--fg))]">Can you explain in 3 sentences when the process is correctly completed?</h3>
              </div>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-[hsl(var(--muted))]">If you can't explain it, the agent can't learn it.</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="rounded-md border border-[hsl(0_60%_45%/0.3)] bg-[hsl(0_60%_45%/0.06)] px-3 py-2 text-[0.78rem] text-[hsl(0_70%_72%)]">&#9873; 'You just feel it'</div>
                <div className="rounded-md border border-[hsl(var(--accent))/30] bg-[hsl(var(--accent))/0.06] px-3 py-2 text-[0.78rem] text-[hsl(var(--accent))]">&#10003; Clear criteria · verifiable · in one sentence</div>
              </div>
            </div>
            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[0.8rem] tabular-nums text-[hsl(var(--accent))]">06</span>
                <h3 className="font-display text-[1.05rem] font-medium leading-snug text-[hsl(var(--fg))]">Where may the agent decide autonomously — and where MUST a human look?</h3>
              </div>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-[hsl(var(--muted))]">Confidence thresholds decide trust and liability.</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="rounded-md border border-[hsl(0_60%_45%/0.3)] bg-[hsl(0_60%_45%/0.06)] px-3 py-2 text-[0.78rem] text-[hsl(0_70%_72%)]">&#9873; Unclear · 'let's see'</div>
                <div className="rounded-md border border-[hsl(var(--accent))/30] bg-[hsl(var(--accent))/0.06] px-3 py-2 text-[0.78rem] text-[hsl(var(--accent))]">&#10003; &gt; 85% autonomous · &lt; 85% human · documented</div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-14">
          <h2 className="font-mono text-[0.75rem] uppercase tracking-[0.24em] text-[hsl(var(--subtle))]">Business impact</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[0.8rem] tabular-nums text-[hsl(var(--accent))]">07</span>
                <h3 className="font-display text-[1.05rem] font-medium leading-snug text-[hsl(var(--fg))]">What does one week of downtime in this process cost you, concretely in euros?</h3>
              </div>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-[hsl(var(--muted))]">If the number isn't clear, the ROI isn't either.</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="rounded-md border border-[hsl(0_60%_45%/0.3)] bg-[hsl(0_60%_45%/0.06)] px-3 py-2 text-[0.78rem] text-[hsl(0_70%_72%)]">&#9873; 'Hard to say'</div>
                <div className="rounded-md border border-[hsl(var(--accent))/30] bg-[hsl(var(--accent))/0.06] px-3 py-2 text-[0.78rem] text-[hsl(var(--accent))]">&#10003; Lost revenue × probability · in euros</div>
              </div>
            </div>
            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[0.8rem] tabular-nums text-[hsl(var(--accent))]">08</span>
                <h3 className="font-display text-[1.05rem] font-medium leading-snug text-[hsl(var(--fg))]">Which KPI instantly shows whether the agent works — and who checks it daily?</h3>
              </div>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-[hsl(var(--muted))]">Without an owner and a KPI: the agent runs, nobody notices.</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="rounded-md border border-[hsl(0_60%_45%/0.3)] bg-[hsl(0_60%_45%/0.06)] px-3 py-2 text-[0.78rem] text-[hsl(0_70%_72%)]">&#9873; No owner · no dashboard</div>
                <div className="rounded-md border border-[hsl(var(--accent))/30] bg-[hsl(var(--accent))/0.06] px-3 py-2 text-[0.78rem] text-[hsl(var(--accent))]">&#10003; Owner named · KPI in a live dashboard</div>
              </div>
            </div>
            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[0.8rem] tabular-nums text-[hsl(var(--accent))]">09</span>
                <h3 className="font-display text-[1.05rem] font-medium leading-snug text-[hsl(var(--fg))]">What happens if the agent is down for 4 weeks — is there a contingency plan?</h3>
              </div>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-[hsl(var(--muted))]">Mission-critical without a fallback is negligent. We build handovers in.</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="rounded-md border border-[hsl(0_60%_45%/0.3)] bg-[hsl(0_60%_45%/0.06)] px-3 py-2 text-[0.78rem] text-[hsl(0_70%_72%)]">&#9873; No plan B</div>
                <div className="rounded-md border border-[hsl(var(--accent))/30] bg-[hsl(var(--accent))/0.06] px-3 py-2 text-[0.78rem] text-[hsl(var(--accent))]">&#10003; Manual fallback documented</div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-14">
          <h2 className="font-mono text-[0.75rem] uppercase tracking-[0.24em] text-[hsl(var(--subtle))]">Organization &amp; pace</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[0.8rem] tabular-nums text-[hsl(var(--accent))]">10</span>
                <h3 className="font-display text-[1.05rem] font-medium leading-snug text-[hsl(var(--fg))]">Who makes the final call — and is that person part of the project from day one?</h3>
              </div>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-[hsl(var(--muted))]">Without a decision-maker in the room, the project drags on for months.</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="rounded-md border border-[hsl(0_60%_45%/0.3)] bg-[hsl(0_60%_45%/0.06)] px-3 py-2 text-[0.78rem] text-[hsl(0_70%_72%)]">&#9873; Decision-maker has no time</div>
                <div className="rounded-md border border-[hsl(var(--accent))/30] bg-[hsl(var(--accent))/0.06] px-3 py-2 text-[0.78rem] text-[hsl(var(--accent))]">&#10003; CEO/COO is in the sprint 1 h/week</div>
              </div>
            </div>
            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[0.8rem] tabular-nums text-[hsl(var(--accent))]">11</span>
                <h3 className="font-display text-[1.05rem] font-medium leading-snug text-[hsl(var(--fg))]">Do you have 4 weeks plus one person at 20% capacity for the handover?</h3>
              </div>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-[hsl(var(--muted))]">We deliver in 4 weeks — but only if one person on your side is available.</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="rounded-md border border-[hsl(0_60%_45%/0.3)] bg-[hsl(0_60%_45%/0.06)] px-3 py-2 text-[0.78rem] text-[hsl(0_70%_72%)]">&#9873; Nobody has time</div>
                <div className="rounded-md border border-[hsl(var(--accent))/30] bg-[hsl(var(--accent))/0.06] px-3 py-2 text-[0.78rem] text-[hsl(var(--accent))]">&#10003; 1 person · 1 day/week · 4 weeks</div>
              </div>
            </div>
            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[0.8rem] tabular-nums text-[hsl(var(--accent))]">12</span>
                <h3 className="font-display text-[1.05rem] font-medium leading-snug text-[hsl(var(--fg))]">What happens if the agent doesn't deliver the promised result after 4 months?</h3>
              </div>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-[hsl(var(--muted))]">We give a success guarantee. But clear exit criteria save arguments.</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="rounded-md border border-[hsl(0_60%_45%/0.3)] bg-[hsl(0_60%_45%/0.06)] px-3 py-2 text-[0.78rem] text-[hsl(0_70%_72%)]">&#9873; Unclear</div>
                <div className="rounded-md border border-[hsl(var(--accent))/30] bg-[hsl(var(--accent))/0.06] px-3 py-2 text-[0.78rem] text-[hsl(var(--accent))]">&#10003; Success criteria + exit documented</div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-16 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-8 text-center">
          <h2 className="font-display text-[1.5rem] font-medium text-[hsl(var(--fg))]">Went through it and unsure?</h2>
          <p className="mx-auto mt-3 max-w-xl text-[0.95rem] text-[hsl(var(--muted))]">Bring your answers to a 30-minute call — we&apos;ll give you a clear, honest read on your ROI.</p>
          <Link href="/en/termin" className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-6 font-display text-[0.95rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))]">
            Book an intro call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
