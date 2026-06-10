// English insights — mirrors lib/insights.ts (same slugs/structure).
import type { Insight } from './insights';

export const INSIGHTS_EN: Insight[] = [
  {
    slug: 'warum-94-prozent-ki-projekte-scheitern',
    date: '2026-05-15',
    readingTime: '4 min',
    tag: 'Anti-Pattern',
    title: 'Why 94% of all AI projects at SMBs fail.',
    excerpt:
      'Three patterns from 40 discovery calls. No technical fault — all three are organizational.',
    body: [
      'Over the last twelve months we ran 40 discovery calls with mid-sized companies. 38 wanted an AI agent. We built three. Not because the other 35 had no use cases — but because the setup inside the company wasn’t ready yet. Here are the three patterns we see again and again.',
      'First: nobody owns the process. AI automates a workflow. If that workflow has no owner in the company today, it won’t be maintained after automation either. The agent runs for three weeks, then a CRM field changes, then the agent goes down, then nobody calls, then it’s over. Owner first, agent second.',
      'Second: the data lives in people’s heads. “You just feel it” is not training input. If your best people can’t explain the process in three sentences, the agent can’t learn it either. Knowledge has to be documented before automation — otherwise you automate tribal knowledge away.',
      'Third: the decision-maker isn’t in the room. Mid-market AI projects drag on for months when the sponsor only signs off at the end of the sprint. We now require: CEO or COO, one hour a week, in the sprint call. No commitment, no pipeline.',
      'So our rule of thumb: before we write a line of code, we run 12 questions through our ROI checklist. If four of them come back red, we say no. Better three projects than five — but all three still running after six months.',
    ],
    linkedinUrl:
      'https://www.linkedin.com/newsletters/mittelstand-automatisiert-7458498915005431808/',
  },
];
