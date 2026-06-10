// English case-study data — mirrors lib/case-studies.ts (same slugs/structure).
import type { CaseStudy } from './case-studies';

export const CASE_STUDIES_EN: CaseStudy[] = [
  {
    slug: 'sales-agent',
    title: 'Sales Agent — lead qualification in 4.8 seconds',
    summary:
      'Inbound lead → AI qualification → HubSpot → Slack → meeting. Fully automatic, 24/7, with a measurable score per lead.',
    meta: [
      { k: 'Year', v: '2026' },
      { k: 'Industry', v: 'B2B SaaS' },
      { k: 'Stack', v: 'LangChain · HubSpot · Slack' },
      { k: 'Duration', v: '3 weeks' },
      { k: 'Status', v: 'Live · production' },
    ],
    eyebrow: 'Case Study № 01 · Sales Agent',
    headline: 'From 142 leads a day — the right 47 qualified.',
    subline:
      'Sales started every morning with an Excel list from inbound forms, LinkedIn and referrals. 142 leads a day. Nobody had time to check each one. The hot leads slipped through.',
    problem: {
      headline: 'The problem',
      body:
        'The client — a B2B SaaS mid-sized company — collected ~142 inbound leads a day from 6 sources. Manual qualification took ~23 min per lead. Result: only 30% of leads were contacted at all, half of them too late.',
      bullets: [
        '142 leads/day from web form · LinkedIn · referral · webinar · demo request',
        '23 min avg qualification time per lead → 54 h/week just for triage',
        '30% contact rate, 50% of those > 24 h after arrival (lead cold)',
        '€220K estimated lost revenue per quarter from lost hot leads',
      ],
    },
    pipeline: {
      title: 'Sales Agent · lead pipeline',
      timeSaved: 'Avg. 22.5 min saved per lead',
      steps: [
        { icon: 'Mail', label: 'Lead intake', detail: 'Web form · LinkedIn · webhook', tone: 'input' },
        { icon: 'Database', label: 'Enrichment', detail: 'Clearbit · LinkedIn API · domain', tone: 'system' },
        { icon: 'Brain', label: 'Intent score', detail: 'GPT-4 · 5 axes · 0–100', tone: 'ai' },
        { icon: 'Workflow', label: 'Routing', detail: 'Hot >80 · Warm 40-80 · Cold <40', tone: 'ai' },
        { icon: 'Database', label: 'HubSpot', detail: 'Record created · score · tags', tone: 'system' },
        { icon: 'Slack', label: 'Slack ping', detail: '#sales-hot · @on-call', tone: 'system' },
        { icon: 'Calendar', label: 'Meeting', detail: 'Calendly · 30 min · ICS', tone: 'output' },
      ],
    },
    results: {
      headline: 'What changed after 4 months.',
      kpis: [
        { value: '47', label: 'hot leads/day qualified', sub: 'of 142 inbound' },
        { value: '4.8 s', label: 'avg. end-to-end time', sub: 'lead → Slack ping' },
        { value: '78 %', label: 'contact rate in < 1 h', sub: 'was 15%' },
        { value: '+34 %', label: 'win rate', sub: 'hot leads vs. mixed before' },
        { value: '€312K', label: 'won revenue / quarter', sub: 'conservative attribution' },
        { value: '54 h', label: 'sales time saved / week', sub: 'for real sales conversations' },
      ],
    },
    quote: {
      text:
        'We didn’t solve a “lead volume” problem — we had enough leads. We had an attention problem. RSG built an agent that filters exactly the right 30% out of inbound. My team is back on the phone instead of sorting Excel lists.',
      author: 'Head of Sales',
      company: 'B2B SaaS · 80 employees',
    },
  },
  {
    slug: 'support-agent',
    title: 'Support Agent — Tier-1 with no human touch',
    summary:
      'Customer request → knowledge-base lookup → brand-voice answer. 94% of Tier-1 tickets resolved autonomously, clean escalation for the rest.',
    meta: [
      { k: 'Year', v: '2026' },
      { k: 'Industry', v: 'E-commerce · DACH' },
      { k: 'Stack', v: 'LangChain · RAG · Zendesk' },
      { k: 'Duration', v: '4 weeks' },
      { k: 'Status', v: 'Live · production' },
    ],
    eyebrow: 'Case Study № 02 · Support Agent',
    headline: '200 tickets in the Monday-morning jam — today it’s 12.',
    subline:
      'The support inbox filled up over the weekend with standard requests — shipping, returns, invoice PDFs. Monday morning the team faced 200+ open tickets. Today the agent resolves 94% of them before the team comes online.',
    problem: {
      headline: 'The problem',
      body:
        'The client — a German e-commerce mid-sized company — had ~280 tickets/workday. 78% were Tier-1 standard requests (shipping status, return, invoice re-issue). The support team spent 65% of its time on questions whose answer was in the FAQ — which customers didn’t read.',
      bullets: [
        '280 tickets/workday · 78% Tier-1 · 22% complex',
        '65% support time on FAQ answers (shipping · returns · invoices)',
        '14 min avg handling time Tier-1 → 28 h/day staff effort',
        'CSAT 3.4 / 5 — because complex tickets waited too long',
      ],
    },
    pipeline: {
      title: 'Support Agent · ticket resolution',
      timeSaved: 'Avg. 13.8 min saved per Tier-1 ticket',
      steps: [
        { icon: 'MessageSquare', label: 'Request', detail: 'Email · chat · form', tone: 'input' },
        { icon: 'FileSearch', label: 'KB search', detail: 'RAG · 1,200 articles · confidence', tone: 'ai' },
        { icon: 'Brain', label: 'Classification', detail: 'Tier-1 / Tier-2 · intent', tone: 'ai' },
        { icon: 'FileText', label: 'Answer draft', detail: 'Brand voice · DE/EN · personalized', tone: 'ai' },
        { icon: 'Workflow', label: 'Confidence check', detail: '> 85% autonomous · < 85% human', tone: 'ai' },
        { icon: 'CheckCircle2', label: 'Resolution', detail: 'Auto-answer or escalation', tone: 'output' },
      ],
    },
    results: {
      headline: 'What changed after 6 months.',
      kpis: [
        { value: '94 %', label: 'Tier-1 resolved autonomously', sub: 'of 78% of all tickets' },
        { value: '12 s', label: 'avg. Tier-1 response time', sub: 'was 14 min' },
        { value: '4.7 / 5', label: 'CSAT', sub: 'was 3.4' },
        { value: '−28 h/day', label: 'support time saved', sub: 'available for complex tickets' },
        { value: '0', label: 'Monday-morning hotline jam', sub: 'first in 3 years' },
        { value: '€45K/yr', label: 'avg. savings', sub: 'secured staff costs' },
      ],
    },
    quote: {
      text:
        'My team had a 200-ticket backlog every Monday morning. Today the dashboard shows 12 tickets in the queue — all Tier-2, because the agent already handled the rest. My team isn’t just more relaxed — our CSAT is high too.',
      author: 'Head of Customer Service',
      company: 'E-commerce · 150 employees',
    },
  },
  {
    slug: 'email-agent',
    title: 'Email Agent — an inbox that doesn’t feel like one',
    summary:
      'Inbox → classification → answer draft or auto-reply. The CEO opens 8 emails in the morning instead of 80 — the rest is sorted, answered or escalated.',
    meta: [
      { k: 'Year', v: '2026' },
      { k: 'Industry', v: 'B2B services' },
      { k: 'Stack', v: 'LangGraph · Gmail API · Notion' },
      { k: 'Duration', v: '2 weeks' },
      { k: 'Status', v: 'Live · production' },
    ],
    eyebrow: 'Case Study № 03 · Email Agent',
    headline: '180 emails a day — today the CEO reads 8.',
    subline:
      'A managing director with 180 emails a day, 70% of it CC noise and status pings. The agent sorts, answers where allowed, escalates what matters — and delivers a briefing in Notion each morning.',
    problem: {
      headline: 'The problem',
      body:
        'A 60-employee service firm, MD deep in day-to-day operations. 180 emails/day, 4 h of reading without a single decision made. Customer requests got buried under status pings, newsletters and CC loops.',
      bullets: [
        '180 emails/day · 70% “FYI only” · 20% answerable · 10% decision-relevant',
        '4 h daily reading time with no measurable output',
        'Customer emails waited ~11 h for a reply — lost deals not measurable but felt',
        'No system for “read later”, “forward to team”, “decide myself”',
      ],
    },
    pipeline: {
      title: 'Email Agent · inbox triage',
      timeSaved: 'Avg. 3.5 h saved per day',
      steps: [
        { icon: 'Mail', label: 'Inbox', detail: 'Gmail · IMAP · webhook', tone: 'input' },
        { icon: 'Brain', label: 'Classification', detail: '5 categories · confidence', tone: 'ai' },
        { icon: 'FileText', label: 'Answer draft', detail: 'Tone · context from Notion', tone: 'ai' },
        { icon: 'Workflow', label: 'Routing', detail: 'Auto · draft · team · escalation', tone: 'ai' },
        { icon: 'CheckCircle2', label: 'Briefing', detail: 'Notion · 8 a.m. · 8 emails', tone: 'output' },
      ],
    },
    results: {
      headline: 'What changed after 3 months.',
      kpis: [
        { value: '8', label: 'emails/day for the CEO', sub: 'of 180 inbound' },
        { value: '3.5 h', label: 'reading time saved', sub: 'per workday' },
        { value: '94 %', label: 'categorization hit rate', sub: 'measured over 4 weeks' },
        { value: '2.3 h', label: 'avg. response time customer emails', sub: 'was 11 h' },
        { value: '0', label: 'missed customer requests', sub: 'since go-live' },
        { value: '12', label: 'auto-answered routine emails/day', sub: 'no human touch' },
      ],
    },
    quote: {
      text:
        'I used to need an hour in the morning to know what mattered. Today I open Notion, read 8 lines, and know what’s on fire. My inbox is finally just a tool — not a task anymore.',
      author: 'Managing Director',
      company: 'B2B services · 60 employees',
    },
  },
];
