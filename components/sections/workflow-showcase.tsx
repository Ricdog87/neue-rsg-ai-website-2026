'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Brain,
  Database,
  MessageSquare,
  Calendar,
  FileText,
  ScanText,
  CheckCircle2,
  Archive,
  Send,
  UserCheck,
  Inbox,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEnglish } from '@/components/system/use-locale';

/**
 * WorkflowShowcase — n8n-Style Node-Canvas für /automatisierung.
 *
 * Kunden können sich unter „Automatisierung" wenig vorstellen. Diese
 * Sektion zeigt drei echte Workflows als Node-Graph (wie im n8n-Editor):
 * Karten-Nodes mit Icon + Label, verbunden durch animierte Konnektoren,
 * auf einem Dot-Grid-Canvas. Pure CSS/SVG — kein Screenshot, keine
 * Lizenzfragen, gestochen scharf, exakt im Brand.
 *
 * Desktop: horizontaler Flow · Mobile: vertikaler Stack.
 * Dash-Animation respektiert prefers-reduced-motion (via CSS).
 */

type Tone = 'input' | 'ai' | 'system' | 'output';

type WfNode = {
  icon: LucideIcon;
  label: string;
  labelEn: string;
  detail: string;
  detailEn: string;
  tone: Tone;
};

type Workflow = {
  id: string;
  tab: string;
  tabEn: string;
  title: string;
  titleEn: string;
  outcome: string;
  outcomeEn: string;
  nodes: WfNode[];
};

const WORKFLOWS: Workflow[] = [
  {
    id: 'lead',
    tab: 'Lead-Qualifizierung',
    tabEn: 'Lead qualification',
    title: 'Web-Lead → qualifiziert → Termin im Kalender',
    titleEn: 'Web lead → qualified → meeting booked',
    outcome: 'Ø 38 Min manuelle Arbeit pro Lead gespart',
    outcomeEn: 'Saves ~38 min of manual work per lead',
    nodes: [
      { icon: Mail, label: 'Web-Formular', labelEn: 'Web form', detail: 'Trigger · Webhook', detailEn: 'Trigger · webhook', tone: 'input' },
      { icon: Brain, label: 'KI-Agent', labelEn: 'AI agent', detail: 'Firma · Intent · Score', detailEn: 'Company · intent · score', tone: 'ai' },
      { icon: Database, label: 'CRM', detail: 'HubSpot · Datensatz', labelEn: 'CRM', detailEn: 'HubSpot · record', tone: 'system' },
      { icon: MessageSquare, label: 'Team-Ping', labelEn: 'Team ping', detail: 'Slack · Hot-Lead', detailEn: 'Slack · hot lead', tone: 'system' },
      { icon: Calendar, label: 'Termin', labelEn: 'Meeting', detail: 'Kalender · gebucht', detailEn: 'Calendar · booked', tone: 'output' },
    ],
  },
  {
    id: 'invoice',
    tab: 'Rechnungs-Eingang',
    tabEn: 'Invoice intake',
    title: 'E-Mail-Anhang → erfasst → in DATEV verbucht',
    titleEn: 'Email attachment → captured → posted to DATEV',
    outcome: 'Belege landen ohne Tippen im System — minutengenau',
    outcomeEn: 'Receipts enter the system without typing — to the minute',
    nodes: [
      { icon: Inbox, label: 'Rechnungs-Mail', labelEn: 'Invoice email', detail: 'Trigger · Anhang', detailEn: 'Trigger · attachment', tone: 'input' },
      { icon: ScanText, label: 'KI-Extraktion', labelEn: 'AI extraction', detail: 'Betrag · Datum · USt', detailEn: 'Amount · date · VAT', tone: 'ai' },
      { icon: UserCheck, label: 'Freigabe', labelEn: 'Approval', detail: 'Mensch · 1 Klick', detailEn: 'Human · one click', tone: 'system' },
      { icon: Database, label: 'DATEV', detail: 'Buchungssatz', labelEn: 'DATEV', detailEn: 'Posting record', tone: 'system' },
      { icon: Archive, label: 'Archiv', labelEn: 'Archive', detail: 'GoBD-konform', detailEn: 'Audit-proof', tone: 'output' },
    ],
  },
  {
    id: 'support',
    tab: 'Support-Triage',
    tabEn: 'Support triage',
    title: 'Ticket → klassifiziert → Antwort raus',
    titleEn: 'Ticket → classified → reply sent',
    outcome: '94 % der Tier-1-Anfragen ohne Menschen-Touch gelöst',
    outcomeEn: '94% of tier-1 requests resolved without human touch',
    nodes: [
      { icon: MessageSquare, label: 'Ticket', detail: 'E-Mail · Chat · Form', labelEn: 'Ticket', detailEn: 'Email · chat · form', tone: 'input' },
      { icon: Brain, label: 'Klassifikation', labelEn: 'Classification', detail: 'Intent · Priorität', detailEn: 'Intent · priority', tone: 'ai' },
      { icon: FileText, label: 'Antwort-Entwurf', labelEn: 'Reply draft', detail: 'Markenton · DE/EN', detailEn: 'Brand voice · DE/EN', tone: 'ai' },
      { icon: CheckCircle2, label: 'Confidence-Check', labelEn: 'Confidence check', detail: '> 85 % → autonom', detailEn: '> 85% → autonomous', tone: 'system' },
      { icon: Send, label: 'Versand', labelEn: 'Sent', detail: 'Ticket geschlossen', detailEn: 'Ticket closed', tone: 'output' },
    ],
  },
];

const TONE_STYLES: Record<Tone, { chip: string; icon: string; label: string }> = {
  input: {
    chip: 'border-white/15 bg-white/[0.06]',
    icon: 'text-white/80',
    label: 'TRIGGER',
  },
  ai: {
    chip: 'border-[hsl(var(--neon))]/40 bg-[hsl(var(--neon))]/[0.1]',
    icon: 'text-[hsl(var(--neon))]',
    label: 'KI',
  },
  system: {
    chip: 'border-[hsl(var(--accent))]/45 bg-[hsl(var(--accent))]/[0.12]',
    icon: 'text-[hsl(174_90%_60%)]',
    label: 'SYSTEM',
  },
  output: {
    chip: 'border-[hsl(var(--neon))]/50 bg-[hsl(var(--neon))]/[0.14]',
    icon: 'text-[hsl(var(--neon))]',
    label: 'ERGEBNIS',
  },
};

export function WorkflowShowcase() {
  const en = useEnglish();
  const [active, setActive] = useState(WORKFLOWS[0].id);
  const wf = WORKFLOWS.find((w) => w.id === active) ?? WORKFLOWS[0];

  return (
    <section id="workflows" className="relative px-6 py-20 md:py-28 lg:px-10">
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--neon))]">
            {en ? 'This is what automation looks like' : 'So sieht Automatisierung aus'}
          </span>
          <h2 className="mt-3 font-display text-[clamp(1.875rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
            {en
              ? 'Your process as a workflow — node by node.'
              : 'Dein Prozess als Workflow — Node für Node.'}
          </h2>
          <p className="mt-4 text-[1.02rem] leading-[1.6] text-[hsl(var(--muted))]">
            {en
              ? 'No abstract slides. This is how your automation actually looks in production: a trigger, AI steps, your systems — connected and running 24/7.'
              : 'Keine abstrakten Folien. So sieht deine Automatisierung in Produktion wirklich aus: ein Trigger, KI-Schritte, deine Systeme — verbunden und 24/7 im Lauf.'}
          </p>
        </div>

        {/* Workflow switcher */}
        <div className="mt-8 flex flex-wrap gap-2">
          {WORKFLOWS.map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() => setActive(w.id)}
              data-event={`workflow_tab_${w.id}`}
              className={cn(
                'rounded-full border px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] transition-all',
                w.id === active
                  ? 'border-[hsl(var(--neon))]/60 bg-[hsl(var(--neon))]/10 text-[hsl(var(--neon))]'
                  : 'border-[hsl(var(--border))] text-[hsl(var(--muted))] hover:border-[hsl(var(--neon))]/40 hover:text-[hsl(var(--fg))]',
              )}
            >
              {en ? w.tabEn : w.tab}
            </button>
          ))}
        </div>

        {/* Canvas */}
        <AnimatePresence mode="wait">
          <motion.div
            key={wf.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-6 overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/70 p-6 md:p-10"
          >
            {/* n8n-Canvas: Dot-Grid */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.5]"
              style={{
                backgroundImage:
                  'radial-gradient(circle, hsl(0 0% 100% / 0.06) 1px, transparent 1px)',
                backgroundSize: '22px 22px',
              }}
            />
            {/* Soft glow top-right */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-[280px] w-[280px] rounded-full opacity-25 blur-[100px]"
              style={{
                background:
                  'radial-gradient(circle, hsl(var(--neon) / 0.5), transparent 70%)',
              }}
            />

            {/* Title row */}
            <div className="relative mb-8 flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-[clamp(1.05rem,1.8vw,1.3rem)] font-medium tracking-[-0.015em] text-[hsl(var(--fg))]">
                {en ? wf.titleEn : wf.title}
              </h3>
              <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--neon))]/30 bg-[hsl(var(--neon))]/[0.07] px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-[hsl(var(--neon))]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(var(--neon))] opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon))]" />
                </span>
                Live · 24/7
              </span>
            </div>

            {/* Nodes — horizontal on md+, vertical stack on mobile */}
            <div className="relative flex flex-col items-stretch gap-0 md:flex-row md:items-center">
              {wf.nodes.map((n, i) => (
                <div
                  key={`${wf.id}-${n.label}`}
                  className="flex flex-col items-center md:flex-1 md:flex-row"
                >
                  <NodeCard node={n} index={i} en={en} />
                  {i < wf.nodes.length - 1 && <Connector />}
                </div>
              ))}
            </div>

            {/* Outcome line */}
            <div className="relative mt-8 flex items-center gap-3 border-t border-[hsl(var(--border))] pt-5">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[hsl(var(--neon))]" />
              <p className="text-[0.9rem] font-medium text-[hsl(var(--fg))]/90">
                {en ? wf.outcomeEn : wf.outcome}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footnote */}
        <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[hsl(var(--subtle))]">
          {en
            ? 'Built on n8n / LangGraph · wired into your systems · hosted in Germany'
            : 'Gebaut auf n8n / LangGraph · verdrahtet mit deinen Systemen · gehostet in Deutschland'}
        </p>
      </div>
    </section>
  );
}

/* ── Node-Karte im n8n-Look ── */
function NodeCard({ node, index, en }: { node: WfNode; index: number; en: boolean }) {
  const t = TONE_STYLES[node.tone];
  const Icon = node.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.09, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full min-w-0 rounded-xl border border-[hsl(var(--border-strong))] bg-[hsl(240_10%_6%)] p-3.5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.8)] md:w-auto md:flex-1"
    >
      {/* Tone-Tag oben rechts */}
      <span className="absolute right-2.5 top-2.5 font-mono text-[0.5rem] uppercase tracking-[0.18em] text-[hsl(var(--subtle))]">
        {node.tone === 'input' ? 'TRIGGER' : node.tone === 'ai' ? 'KI' : node.tone === 'output' ? (en ? 'RESULT' : 'ERGEBNIS') : 'SYSTEM'}
      </span>
      {/* Status-Dot unten rechts (n8n: grüner Erfolgs-Punkt) */}
      <span aria-hidden className="absolute bottom-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon))]/80" />

      <span
        className={cn(
          'inline-flex h-9 w-9 items-center justify-center rounded-lg border',
          t.chip,
        )}
      >
        <Icon className={cn('h-4.5 w-4.5 h-[18px] w-[18px]', t.icon)} />
      </span>
      <div className="mt-2.5 text-[0.85rem] font-semibold leading-tight text-[hsl(var(--fg))]">
        {en ? node.labelEn : node.label}
      </div>
      <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-[hsl(var(--muted))]">
        {en ? node.detailEn : node.detail}
      </div>
    </motion.div>
  );
}

/* ── Konnektor mit fließenden Dashes (horizontal md+, vertikal mobile) ── */
function Connector() {
  return (
    <>
      {/* Desktop: horizontal */}
      <svg
        aria-hidden
        className="hidden h-6 w-10 shrink-0 md:block"
        viewBox="0 0 40 24"
        fill="none"
      >
        <path d="M0 12 H40" stroke="hsl(var(--border-strong))" strokeWidth="1.5" />
        <path
          d="M0 12 H40"
          stroke="hsl(var(--neon))"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          className="wf-dash"
        />
        <circle cx="20" cy="12" r="2.5" fill="hsl(240 10% 6%)" stroke="hsl(var(--neon) / 0.6)" strokeWidth="1" />
      </svg>
      {/* Mobile: vertikal */}
      <svg
        aria-hidden
        className="block h-8 w-6 shrink-0 self-center md:hidden"
        viewBox="0 0 24 32"
        fill="none"
      >
        <path d="M12 0 V32" stroke="hsl(var(--border-strong))" strokeWidth="1.5" />
        <path
          d="M12 0 V32"
          stroke="hsl(var(--neon))"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          className="wf-dash"
        />
      </svg>
    </>
  );
}
