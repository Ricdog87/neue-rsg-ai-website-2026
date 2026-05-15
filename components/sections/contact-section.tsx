'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { finalCta, site, about } from '@/lib/content';
import { ArrowRight, Calendar, Mail, Phone, Quote } from 'lucide-react';
import { Magnetic } from '@/components/effects/magnetic';
import { ScrollScale } from '@/components/effects/scroll-scale';
import { ScrollParallax } from '@/components/effects/scroll-parallax';

export function ContactSection() {
  const [selected, setSelected] = useState<string>('');
  const [pickedSlot, setPickedSlot] = useState<string>('');

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/5 bg-[hsl(var(--bg))] px-6 py-24 md:py-32"
    >
      {/* Ambient atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 top-1/4 h-[500px] w-[500px] rounded-full opacity-30 blur-[140px]"
        style={{ background: 'radial-gradient(circle, hsl(271 91% 65% / 0.55), transparent 65%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 bottom-0 h-[400px] w-[400px] rounded-full opacity-25 blur-[140px]"
        style={{ background: 'radial-gradient(circle, hsl(174 100% 50% / 0.5), transparent 65%)' }}
      />

      <div className="relative mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))]">
          {finalCta.eyebrow}
        </p>
        <ScrollParallax x={-8}>
          <h2 className="mt-4 font-display text-balance text-4xl tracking-tight md:text-6xl">
            {finalCta.headline}
          </h2>
        </ScrollParallax>
        <p className="mt-6 max-w-3xl text-base text-[hsl(var(--muted))] md:text-lg">
          {finalCta.subline}
        </p>

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {/* LEFT — Booking panel (7 cols) */}
          <ScrollScale from={0.94} to={1} out={1} className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl border border-[hsl(var(--accent))/30] p-8 md:p-10"
              style={{
                background:
                  'linear-gradient(155deg, hsl(271 91% 65% / 0.10) 0%, hsl(174 100% 50% / 0.05) 60%, hsl(240 14% 5%) 100%)',
                boxShadow:
                  '0 40px 100px -30px hsl(271 91% 65% / 0.45), inset 0 1px 0 hsl(0 0% 100% / 0.05)',
              }}
            >
              {/* Diagonal grid */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, hsl(var(--fg)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--fg)) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              <div className="relative">
                {/* Live status */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--neon))/35] bg-[hsl(var(--neon))/10] px-3 py-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[hsl(var(--neon))] opacity-70" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--neon))]" />
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--neon))]">
                      {finalCta.liveStatus.label}
                    </span>
                  </span>
                  <span className="text-xs text-[hsl(var(--muted))]">
                    {finalCta.liveStatus.sub}
                  </span>
                </div>

                {/* Founder row */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-[hsl(var(--accent))/40] md:h-20 md:w-20">
                    <Image
                      src={about.founder.photo}
                      alt={about.founder.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold tracking-tight md:text-2xl">
                      {about.founder.name}
                    </p>
                    <p className="text-sm text-[hsl(var(--muted))]">
                      {about.founder.role} · {about.founder.company}
                    </p>
                  </div>
                </div>

                <p className="mt-5 max-w-xl text-sm text-[hsl(var(--fg))] md:text-base">
                  {finalCta.founderTagline}
                </p>

                {/* Badge row */}
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-[hsl(var(--neon))/30] bg-[hsl(var(--neon))/10] px-3 py-1 font-mono text-[11px] text-[hsl(var(--neon))]">
                    {finalCta.badge}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-[hsl(var(--muted))]">
                    {finalCta.responseSla}
                  </span>
                </div>

                {/* Next slots picker — feels like a calendar */}
                <div className="mt-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[hsl(var(--muted))]">
                    Nächste freie Slots
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {finalCta.nextSlots.map((slot) => {
                      const id = `${slot.day}-${slot.time}`;
                      const active = pickedSlot === id;
                      return (
                        <button
                          key={id}
                          onClick={() => setPickedSlot(id)}
                          className={`group flex flex-col items-start rounded-xl border p-4 text-left transition-all duration-300 ${
                            active
                              ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent))/12] shadow-[0_0_30px_-10px_hsl(271_91%_65%/0.6)]'
                              : 'border-white/10 bg-white/[0.025] hover:border-white/25 hover:bg-white/[0.04]'
                          }`}
                        >
                          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--neon))]">
                            {slot.day}
                          </span>
                          <span className="mt-1.5 font-display text-2xl font-bold tracking-tight">
                            {slot.time}
                          </span>
                          <span className="mt-1 text-[10px] text-[hsl(var(--muted))]">
                            30 Min · Video
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-[11px] text-[hsl(var(--muted))]">
                    Anderer Termin? Im Buchungs-Kalender wählst du deinen Slot.
                  </p>
                </div>

                {/* Agent picker */}
                <div className="mt-7">
                  <p className="mb-3 text-xs font-medium text-[hsl(var(--muted))]">
                    Welcher Agent interessiert dich? (optional)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {finalCta.agentOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelected(opt)}
                        className={`rounded-full border px-3 py-1.5 text-xs transition ${
                          selected === opt
                            ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent))/15] text-[hsl(var(--fg))]'
                            : 'border-white/10 text-[hsl(var(--muted))] hover:border-white/25'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <Magnetic strength={0.25} radius={140}>
                  <a
                    href={`${site.cta.meetingUrl}${selected ? `?agent=${encodeURIComponent(selected)}` : ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 flex items-center justify-center gap-2 rounded-full bg-[hsl(var(--accent))] px-6 py-4 text-sm font-bold text-white transition hover:opacity-90"
                    style={{ boxShadow: '0 25px 60px -15px hsl(271 91% 65% / 0.7)' }}
                  >
                    <Calendar className="h-4 w-4" />
                    {finalCta.ctaButton}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Magnetic>
              </div>
            </motion.div>
          </ScrollScale>

          {/* RIGHT — Direct contact + micro-proof (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex flex-col gap-5 lg:col-span-5"
          >
            {/* Micro-testimonial — instant social proof */}
            <div
              className="relative overflow-hidden rounded-2xl border border-white/10 p-6"
              style={{
                background:
                  'linear-gradient(155deg, hsl(174 100% 50% / 0.06) 0%, hsl(240 14% 5%) 100%)',
              }}
            >
              <Quote className="h-6 w-6 text-[hsl(var(--neon))/60]" />
              <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--fg))] md:text-base">
                {finalCta.microProof}
              </p>
            </div>

            {/* Direct contact */}
            {[
              {
                icon: Mail,
                label: 'E-Mail · direkt zu Ricardo',
                value: site.contact.email,
                href: `mailto:${site.contact.email}`,
              },
              {
                icon: Phone,
                label: 'Telefon · 9–18 Uhr',
                value: site.contact.phone,
                href: site.contact.phoneHref,
              },
              {
                icon: Calendar,
                label: 'Sprechzeiten',
                value: site.contact.hours,
                href: null,
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href ?? undefined}
                className={`group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition-all ${
                  item.href ? 'hover:border-[hsl(var(--neon))/35] hover:bg-white/[0.04]' : ''
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[hsl(var(--neon))/25] bg-[hsl(var(--neon))/8] transition-transform group-hover:scale-110">
                  <item.icon className="h-4 w-4 text-[hsl(var(--neon))]" />
                </div>
                <div className="flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--muted))]">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-[hsl(var(--fg))] group-hover:text-[hsl(var(--neon))]">
                    {item.value}
                  </p>
                </div>
                {item.href && (
                  <ArrowRight className="h-4 w-4 text-[hsl(var(--muted))] transition-all group-hover:translate-x-1 group-hover:text-[hsl(var(--neon))]" />
                )}
              </a>
            ))}

            {/* Address & socials */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <p className="text-sm font-medium">{site.contact.city}</p>
              <p className="mt-1 text-xs text-[hsl(var(--muted))]">
                {site.legal.company} · {site.legal.hrb}
              </p>
              <div className="mt-3 flex gap-4 text-xs">
                {[
                  { label: 'LinkedIn', href: site.social.linkedin },
                  { label: 'X / Twitter', href: site.social.x },
                  { label: 'YouTube', href: site.social.youtube },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[hsl(var(--muted))] transition hover:text-[hsl(var(--neon))]"
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
