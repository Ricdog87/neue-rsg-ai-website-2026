'use client';

import Script from 'next/script';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { ArrowUpRight, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { trackConversion } from '@/components/system/track';

const EASE = [0.16, 1, 0.3, 1] as const;

/** /en/termin — English booking page (HubSpot embed). */
function TerminContent() {
  const params = useSearchParams();
  const selectedAgent = params?.get('agent') || null;

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const data = e.data as { meetingBookSucceeded?: boolean } | null;
      if (data && typeof data === 'object' && data.meetingBookSucceeded) {
        trackConversion('close_convert_lead', { source: 'hubspot_meeting' });
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[hsl(var(--bg))] text-[hsl(var(--fg))]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(20,184,166,0.30) 0%, rgba(20,184,166,0.08) 30%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '120px 120px',
          maskImage:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.5) 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.5) 30%, transparent 75%)',
        }}
      />

      <section className="relative">
        <div className="mx-auto grid max-w-[1280px] grid-cols-12 gap-x-6 px-6 pt-[140px] pb-20 lg:px-10 lg:pt-[180px]">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="col-span-12 mb-12 flex items-center justify-between md:mb-16"
          >
            <span className="inline-flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--accent-soft))]">
              <span aria-hidden className="h-px w-7 bg-[hsl(var(--accent))]" />
              Appointment · 30 min · online
            </span>
            <div className="hidden items-center gap-4 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-white/45 md:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(var(--accent-soft))] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent-soft))]" />
              </span>
              <span>Usually a reply within &lt; 2 hrs.</span>
              <span className="text-white/25">№&nbsp;02</span>
            </div>
          </motion.div>

          <div className="col-span-12 md:col-span-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.025em] text-white"
            >
              Talk directly{' '}
              <span className="font-accent italic text-[hsl(var(--accent-soft))]">
                with the founder.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
              className="mt-8 max-w-2xl text-base md:text-lg text-[hsl(var(--muted))]"
            >
              No SDR, no account manager. 30 minutes of straight talk about your AI agent —
              what works, what doesn’t, and how fast it goes live for you.
            </motion.p>

            {selectedAgent && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--accent)/0.4)] bg-[hsl(var(--accent)/0.12)] px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--accent-soft))]"
              >
                <Sparkles className="h-3 w-3" />
                Your interest: {decodeURIComponent(selectedAgent)}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--muted))]"
            >
              <span className="inline-flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-[hsl(var(--accent-soft))]" />
                30 minutes
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-[hsl(var(--accent-soft))]" />
                GDPR-compliant · EU servers
              </span>
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--accent-soft))]" />
                Personal consultation
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative pb-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
            className="relative overflow-hidden rounded-2xl border border-[hsl(var(--border-strong))] bg-[hsl(var(--surface))]"
            style={{
              boxShadow:
                '0 24px 60px -20px hsl(174 90% 42% / 0.35), 0 1px 0 hsl(0 0% 100% / 0.05) inset',
            }}
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent, hsl(174 90% 42% / 0.55), transparent)',
              }}
            />
            <div
              className="meetings-iframe-container"
              data-src="https://meetings-eu1.hubspot.com/r-serrano/rsg-ai-demo?embed=true"
              style={{ minHeight: '760px', background: 'white' }}
            />
            <Script
              src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
              strategy="afterInteractive"
            />
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <a
              href="mailto:hello@rsg-ai.de"
              className="group flex items-center justify-between rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-5 transition-colors hover:border-[hsl(var(--accent)/0.5)]"
            >
              <div>
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--muted))]">
                  Email · straight to Ricardo
                </p>
                <p className="mt-1 text-sm font-medium text-white">hello@rsg-ai.de</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-[hsl(var(--muted))] transition-colors group-hover:text-[hsl(var(--accent-soft))]" />
            </a>

            <a
              href="tel:+4917660772556"
              className="group flex items-center justify-between rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-5 transition-colors hover:border-[hsl(var(--accent)/0.5)]"
            >
              <div>
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--muted))]">
                  Phone · 9am–6pm
                </p>
                <p className="mt-1 text-sm font-medium text-white">+49 176 60772556</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-[hsl(var(--muted))] transition-colors group-hover:text-[hsl(var(--accent-soft))]" />
            </a>

            <div className="flex items-center justify-between rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-5">
              <div>
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--muted))]">
                  Office hours
                </p>
                <p className="mt-1 text-sm font-medium text-white">Mon–Fri · 9:00–18:00</p>
              </div>
              <Clock className="h-4 w-4 text-[hsl(var(--muted))]" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function EnTerminPage() {
  return (
    <Suspense fallback={null}>
      <TerminContent />
    </Suspense>
  );
}
