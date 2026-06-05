'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { finalCta, site, about } from '@/lib/content';
import { ArrowUpRight, Calendar, Mail, Phone, Quote } from 'lucide-react';
import { useEnglish } from '@/components/system/use-locale';

const FC_EN = {
  eyebrow: "Let's talk",
  headline: '30 minutes. No pitch. Just honest answers about your process.',
  subline:
    'Ricardo takes the time personally. We look at your 2–3 most painful processes together — and tell you exactly where an AI agent has the biggest leverage. If there is none, we say that too.',
  badge: 'Free · no obligation · GDPR-compliant',
  ctaButton: 'Book a call',
  responseSla: 'Reply within 24h · usually faster',
  founderTagline:
    '15 years in B2B sales. Speaks sales, builds AI. You talk straight to the founder — no SDR, no account manager.',
  liveStatus: { label: 'Online today', sub: 'Usually replies in < 2 hours' },
  slotsTitle: 'Next available slots',
  slotMeta: '30 min · video',
  agentQuestion: 'Which agent are you interested in? (optional)',
  microProof:
    '"ROI after 4 months — and Ricardo was just as honest about what would NOT work." — CTO, data-analytics company',
  founderRole: 'Founder & CEO',
  contactLabels: {
    email: 'Email · straight to Ricardo',
    phone: 'Phone · 9am–6pm',
    hours: 'Office hours',
  },
  slotDays: { Heute: 'Today', Morgen: 'Tomorrow', Übermorgen: 'In 2 days' } as Record<string, string>,
  agentOptions: [
    'Support agent',
    'Email agent',
    'Sales agent',
    'Onboarding agent',
    'Operations agent',
    'Custom solution',
  ],
  hours: 'Mon–Fri · 9:00–18:00',
};

export function ContactSection() {
  const en = useEnglish();
  const fc = en ? FC_EN : finalCta;
  const [selected, setSelected] = useState<string>('');
  const [pickedSlot, setPickedSlot] = useState<string>('');

  return (
    <section
      id="contact"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-6 py-20 md:py-28 lg:px-10"
    >
      <div className="relative mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-5">
            <span className="eyebrow">{fc.eyebrow}</span>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.08] tracking-[-0.02em] text-[hsl(var(--fg))]">
              {fc.headline}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-2">
            <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
              {fc.subline}
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          {/* LEFT — Booking panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--bg))] p-8 md:p-10 lg:col-span-7 shadow-[var(--shadow-soft)]"
          >
            {/* Live status */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--accent-soft))] px-3 py-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-[hsl(var(--accent))] opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />
                </span>
                <span className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
                  {fc.liveStatus.label}
                </span>
              </span>
              <span className="text-[0.75rem] text-[hsl(var(--muted))]">
                {fc.liveStatus.sub}
              </span>
            </div>

            {/* Founder row */}
            <div className="mt-7 flex items-center gap-5">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-[hsl(var(--border))]">
                <Image
                  src={about.founder.photo}
                  alt={about.founder.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-display text-[1.375rem] font-medium tracking-tight text-[hsl(var(--fg))]">
                  {about.founder.name}
                </p>
                <p className="text-[0.875rem] text-[hsl(var(--muted))]">
                  {(en ? FC_EN.founderRole : about.founder.role)} · {about.founder.company}
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-xl text-[0.95rem] leading-[1.6] text-[hsl(var(--fg))]">
              {fc.founderTagline}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[hsl(var(--accent-soft))] px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--accent))]">
                {fc.badge}
              </span>
              <span className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--muted))]">
                {fc.responseSla}
              </span>
            </div>

            {/* Slots */}
            <div className="mt-8 border-t border-[hsl(var(--border))] pt-7">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
                {en ? FC_EN.slotsTitle : 'Nächste freie Slots'}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {finalCta.nextSlots.map((slot) => {
                  const id = `${slot.day}-${slot.time}`;
                  const active = pickedSlot === id;
                  const params = new URLSearchParams();
                  params.set('slot', id);
                  if (selected) params.set('agent', selected);
                  return (
                    <Link
                      key={id}
                      href={`${site.cta.meetingUrl}?${params.toString()}`}
                      onMouseEnter={() => setPickedSlot(id)}
                      onClick={() => setPickedSlot(id)}
                      data-sound="tick"
                      data-cursor="hover"
                      className={
                        'group relative flex flex-col items-start gap-1 overflow-hidden rounded-md border p-4 text-left transition-all ' +
                        (active
                          ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent))]/12 shadow-[0_0_30px_-12px_hsl(var(--accent)/0.7)]'
                          : 'border-[hsl(var(--border))] bg-[hsl(var(--bg))] hover:border-[hsl(var(--accent))]/50 hover:bg-[hsl(var(--accent))]/[0.04]')
                      }
                    >
                      <div className="flex w-full items-center justify-between">
                        <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
                          {en ? FC_EN.slotDays[slot.day] ?? slot.day : slot.day}
                        </span>
                        <ArrowUpRight
                          className={
                            'h-3.5 w-3.5 transition-all ' +
                            (active
                              ? 'translate-x-0 text-[hsl(var(--accent))] opacity-100'
                              : '-translate-x-1 text-[hsl(var(--subtle))] opacity-0 group-hover:translate-x-0 group-hover:opacity-100')
                          }
                        />
                      </div>
                      <span className="mt-1 font-display text-[1.5rem] font-medium tracking-tight text-[hsl(var(--fg))]">
                        {slot.time}
                      </span>
                      <span className="text-[0.7rem] text-[hsl(var(--muted))]">
                        {en ? FC_EN.slotMeta : '30 Min · Video'}
                      </span>
                    </Link>
                  );
                })}
              </div>
              <p className="mt-3 text-[0.75rem] text-[hsl(var(--muted))]">
                {en
                  ? 'Clicking a slot opens the booking calendar directly. Different time? Pick your preferred slot in the calendar.'
                  : 'Klick auf einen Slot öffnet direkt den Buchungs-Kalender. Anderer Termin? Im Kalender wählst du deinen Wunsch-Slot.'}
              </p>
            </div>

            {/* Agent picker */}
            <div className="mt-7">
              <p className="mb-3 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
                {en ? FC_EN.agentQuestion : 'Welcher Agent interessiert dich? (optional)'}
              </p>
              <div className="flex flex-wrap gap-2">
                {fc.agentOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelected(opt)}
                    className={
                      'rounded-full border px-4 py-2 text-[0.8rem] transition ' +
                      (selected === opt
                        ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent))] text-white'
                        : 'border-[hsl(var(--border))] bg-[hsl(var(--bg))] text-[hsl(var(--muted))] hover:border-[hsl(var(--ink))] hover:text-[hsl(var(--fg))]')
                    }
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <a
              href={`${site.cta.meetingUrl}${selected ? `?agent=${encodeURIComponent(selected)}` : ''}`}
              className="group mt-8 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full border border-[hsl(var(--accent))] bg-[hsl(var(--accent))]/90 px-6 font-display text-[0.95rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))]"
            >
              <Calendar className="h-4 w-4" />
              {fc.ctaButton}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          {/* RIGHT — Direct contact + micro-proof */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="flex flex-col gap-4 lg:col-span-5"
          >
            <div className="rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--bg))] p-7">
              <Quote className="h-6 w-6 -scale-x-100 text-[hsl(var(--accent))]" />
              <p className="mt-4 font-display text-[1.05rem] leading-[1.5] text-[hsl(var(--fg))] md:text-[1.15rem]">
                {en ? fc.microProof : `„${finalCta.microProof}"`}
              </p>
            </div>

            {[
              {
                icon: Mail,
                label: en ? FC_EN.contactLabels.email : 'E-Mail · direkt zu Ricardo',
                value: site.contact.email,
                href: `mailto:${site.contact.email}`
              },
              {
                icon: Phone,
                label: en ? FC_EN.contactLabels.phone : 'Telefon · 9–18 Uhr',
                value: site.contact.phone,
                href: site.contact.phoneHref
              },
              {
                icon: Calendar,
                label: en ? FC_EN.contactLabels.hours : 'Sprechzeiten',
                value: en ? FC_EN.hours : site.contact.hours,
                href: null
              }
            ].map((item) => (
              <a
                key={item.label}
                href={item.href ?? undefined}
                className={
                  'group flex items-center gap-4 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--bg))] p-5 transition-all ' +
                  (item.href ? 'hover:border-[hsl(var(--ink))]' : '')
                }
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent))]">
                  <item.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
                    {item.label}
                  </p>
                  <p className="mt-1 text-[0.95rem] font-medium text-[hsl(var(--fg))]">
                    {item.value}
                  </p>
                </div>
                {item.href && (
                  <ArrowUpRight className="h-4 w-4 text-[hsl(var(--subtle))] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[hsl(var(--accent))]" />
                )}
              </a>
            ))}

            <div className="rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--bg))] p-5">
              <p className="text-[0.95rem] font-medium text-[hsl(var(--fg))]">
                {site.contact.city}
              </p>
              <p className="mt-1 text-[0.8rem] text-[hsl(var(--muted))]">
                {site.legal.company} · {site.legal.hrb}
              </p>
              <div className="mt-4 flex gap-5 text-[0.8rem]">
                {[
                  { label: 'LinkedIn', href: site.social.linkedin },
                  { label: 'Instagram', href: site.social.instagram },
                  { label: 'YouTube', href: site.social.youtube }
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
