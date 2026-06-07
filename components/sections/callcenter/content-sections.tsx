'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight, Infinity as InfinityIcon, Gauge, Network, Megaphone, Building2, ShieldCheck,
  Server, FileCheck, Lock, Plus, Minus, Star,
} from 'lucide-react';
import { site } from '@/lib/content';
import { callcenter, INDUSTRIES } from '@/lib/callcenter';

const EASE = [0.16, 1, 0.3, 1] as const;
const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10% 0px' },
  transition: { duration: 0.6, ease: EASE },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

/* ── Capabilities (enterprise) ───────────────────────────── */
const CAP_ICONS = [InfinityIcon, Gauge, Network, Megaphone, Building2, Lock];
export function CallcenterSolution() {
  const s = callcenter.capabilities;
  return (
    <section className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--surface))]/82 px-6 py-20 backdrop-blur-[2px] md:py-28 lg:px-10">
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div {...reveal}><Eyebrow>{s.eyebrow}</Eyebrow></motion.div>
          <motion.h2 {...reveal} transition={{ ...reveal.transition, delay: 0.05 }} className="mt-6 font-display text-[clamp(2rem,4.2vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.02em] text-[hsl(var(--fg))]">
            {s.headline}
          </motion.h2>
          <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="mx-auto mt-4 max-w-xl text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
            {s.subline}
          </motion.p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.points.map((pt, i) => {
            const Icon = CAP_ICONS[i] ?? Gauge;
            return (
              <motion.div
                key={pt.title}
                {...reveal}
                transition={{ ...reveal.transition, delay: (i % 3) * 0.07 }}
                className="group rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--bg))] p-6 transition-all hover:-translate-y-1 hover:border-[hsl(var(--accent))/40] hover:shadow-[var(--shadow-lift)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full border border-[hsl(var(--border-strong))] bg-[hsl(var(--surface))] text-[hsl(var(--accent))] transition-colors group-hover:border-[hsl(var(--accent))] group-hover:bg-[hsl(var(--accent))/10]">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-display text-[1.15rem] font-medium text-[hsl(var(--fg))]">{pt.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-[1.6] text-[hsl(var(--muted))]">{pt.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Onboarding steps ────────────────────────────────────── */
export function CallcenterSteps() {
  const st = callcenter.steps;
  return (
    <section className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/85 px-6 py-20 backdrop-blur-[2px] md:py-28 lg:px-10">
      <div className="mx-auto max-w-[1180px]">
        <motion.div {...reveal} className="max-w-xl">
          <Eyebrow>{st.eyebrow}</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.2vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.02em] text-[hsl(var(--fg))]">
            {st.headline}
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {st.items.map((it, i) => (
            <motion.div
              key={it.n}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.08 }}
              className="relative rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-7"
            >
              <span className="font-mono text-[0.8rem] tracking-[0.18em] text-[hsl(var(--accent))]">{it.n}</span>
              <h3 className="mt-4 font-display text-[1.2rem] font-medium leading-tight text-[hsl(var(--fg))]">{it.title}</h3>
              <p className="mt-2 text-[0.9rem] leading-[1.6] text-[hsl(var(--muted))]">{it.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Industries / use cases ──────────────────────────────── */
export function CallcenterIndustries() {
  const head = callcenter.industriesHead;
  return (
    <section className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--surface))]/82 px-6 py-20 backdrop-blur-[2px] md:py-28 lg:px-10">
      <div className="mx-auto max-w-[1180px]">
        <motion.div {...reveal} className="mx-auto max-w-2xl text-center">
          <Eyebrow>{head.eyebrow}</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.2vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.02em] text-[hsl(var(--fg))]">
            {head.headline}
          </h2>
          <p className="mx-auto mt-4 text-[1rem] leading-relaxed text-[hsl(var(--muted))]">{head.subline}</p>
        </motion.div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={ind.id}
              {...reveal}
              transition={{ ...reveal.transition, delay: (i % 4) * 0.06 }}
              className="group rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--bg))] p-6 transition-all hover:border-[hsl(var(--accent))/40] hover:bg-[hsl(var(--accent))/5]"
            >
              <h3 className="font-display text-[1.05rem] font-medium text-[hsl(var(--fg))]">{ind.label}</h3>
              <p className="mt-2 text-[0.85rem] leading-[1.55] text-[hsl(var(--muted))]">{ind.blurb}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Security & compliance ───────────────────────────────── */
const LEGAL_ICONS = [ShieldCheck, FileCheck, Server, Lock];
export function CallcenterLegal() {
  const l = callcenter.legal;
  return (
    <section className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/85 px-6 py-20 backdrop-blur-[2px] md:py-28 lg:px-10">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <motion.div {...reveal} className="col-span-12 md:col-span-4">
            <Eyebrow>{l.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(1.875rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
              {l.headline}
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {['EU AI Act', 'DSGVO · AVV', 'Server in DE', 'SSO · Audit-Logs'].map((b) => (
                <span key={b} className="rounded-full border border-[hsl(var(--success))/30] bg-[hsl(var(--success))/10] px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[hsl(var(--success))]">
                  {b}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="col-span-12 grid gap-4 sm:grid-cols-2 md:col-span-7 md:col-start-6">
            {l.points.map((pt, i) => {
              const Icon = LEGAL_ICONS[i] ?? ShieldCheck;
              return (
                <motion.div
                  key={pt.title}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: i * 0.07 }}
                  className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6"
                >
                  <Icon className="h-5 w-5 text-[hsl(var(--success))]" strokeWidth={1.75} />
                  <h3 className="mt-4 font-display text-[1.05rem] font-medium text-[hsl(var(--fg))]">{pt.title}</h3>
                  <p className="mt-2 text-[0.875rem] leading-[1.55] text-[hsl(var(--muted))]">{pt.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Social proof (placeholder) ──────────────────────────── */
export function CallcenterSocialProof() {
  const items = [
    { quote: 'Saisonspitzen mit dem Fünffachen an Anrufen — null Warteschleife, null verlorene Kunden.', who: 'Platzhalter · E-Commerce-Konzern' },
    { quote: 'Die KI-Operation läuft 24/7 mit SLA. Unser Team kümmert sich nur noch um die echten Sonderfälle.', who: 'Platzhalter · Versicherung' },
    { quote: 'Outbound-Reaktivierung über Millionen Kontakte — vollautomatisch und DSGVO-konform.', who: 'Platzhalter · Energieversorger' },
  ];
  return (
    <section className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--surface))]/82 px-6 py-20 backdrop-blur-[2px] md:py-28 lg:px-10">
      <div className="mx-auto max-w-[1180px]">
        <motion.div {...reveal} className="flex items-center gap-3">
          <Eyebrow>Vertrauen</Eyebrow>
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-[hsl(var(--subtle))]">Platzhalter — echte Referenzen folgen</span>
        </motion.div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.figure
              key={i}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.08 }}
              className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--bg))] p-7"
            >
              <div className="flex gap-1 text-[hsl(var(--accent))]">
                {Array.from({ length: 5 }).map((_, s) => (<Star key={s} className="h-3.5 w-3.5 fill-current" />))}
              </div>
              <blockquote className="mt-4 font-display text-[1.05rem] leading-[1.5] text-[hsl(var(--fg))]">„{it.quote}"</blockquote>
              <figcaption className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--subtle))]">{it.who}</figcaption>
            </motion.figure>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-40">
          {['LOGO', 'LOGO', 'LOGO', 'LOGO', 'LOGO'].map((l, i) => (
            <span key={i} className="font-display text-[1.1rem] font-medium tracking-[0.1em] text-[hsl(var(--muted))]">{l}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ─────────────────────────────────────────────────── */
export function CallcenterFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/85 px-6 py-20 backdrop-blur-[2px] md:py-28 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <motion.div {...reveal} className="text-center">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(1.875rem,3.8vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
            Enterprise-Fragen
          </h2>
        </motion.div>
        <div className="mt-10 divide-y divide-[hsl(var(--border))] border-y border-[hsl(var(--border))]">
          {callcenter.faq.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-[1.05rem] font-medium text-[hsl(var(--fg))]">{f.q}</span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[hsl(var(--border-strong))] text-[hsl(var(--accent))]">
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pr-11 text-[0.95rem] leading-[1.65] text-[hsl(var(--muted))]">{f.a}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Final CTA ───────────────────────────────────────────── */
export function CallcenterFinalCta() {
  const c = callcenter.finalCta;
  return (
    <section className="relative overflow-hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-6 py-24 md:py-32 lg:px-10">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[120px]"
        style={{ background: 'radial-gradient(circle, hsl(var(--accent) / 0.3), transparent 70%)' }}
      />
      <motion.div {...reveal} className="relative mx-auto max-w-3xl text-center">
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.06] tracking-[-0.02em] text-[hsl(var(--fg))]">
          {c.headline}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">{c.subline}</p>
        <a
          href={site.cta.meetingUrl}
          data-event="callcenter_final_cta"
          className="group mt-9 inline-flex h-14 items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-8 font-display text-[0.95rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))] hover:shadow-[0_16px_40px_-12px_hsl(var(--accent)/0.7)]"
        >
          {c.cta}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </motion.div>
    </section>
  );
}

/* ── Sticky mobile CTA ───────────────────────────────────── */
export function CallcenterStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[hsl(var(--border))] bg-[hsl(var(--ink))]/95 px-4 py-3 backdrop-blur-md md:hidden">
      <div className="flex items-center gap-3">
        <a href="#preise" className="flex h-11 flex-1 items-center justify-center rounded-full border border-[hsl(var(--border-strong))] text-[0.85rem] font-medium text-[hsl(var(--fg))]">
          Preise ansehen
        </a>
        <a href={site.cta.meetingUrl} data-event="callcenter_sticky_demo" className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-[hsl(var(--accent))] text-[0.85rem] font-semibold text-white">
          Demo buchen <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
