'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { finalCta, site } from '@/lib/content';
import { ArrowRight, Calendar, Mail, Phone } from 'lucide-react';
import { Magnetic } from '@/components/effects/magnetic';
import { ScrollScale } from '@/components/effects/scroll-scale';
import { ScrollParallax } from '@/components/effects/scroll-parallax';

export function ContactSection() {
  const [selected, setSelected] = useState<string>('');

  return (
    <section
      id="contact"
      className="relative border-t border-white/5 bg-[hsl(var(--bg))] px-6 py-24 md:py-32"
    >
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-96 w-96 rounded-full bg-[hsl(var(--accent))/12] blur-[100px]" />
      </div>

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

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Left: CTA card */}
          <ScrollScale from={0.9} to={1.04} out={1}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-[hsl(var(--accent))/30] bg-[hsl(var(--accent))/5] p-8"
          >
            <div className="inline-block rounded-full border border-[hsl(var(--neon))/30] bg-[hsl(var(--neon))/8] px-3 py-1 font-mono text-xs text-[hsl(var(--neon))]">
              {finalCta.badge}
            </div>

            <h3 className="mt-5 text-2xl font-semibold">{finalCta.ctaTitle}</h3>
            <p className="mt-2 text-sm text-[hsl(var(--muted))]">{finalCta.ctaBody}</p>

            {/* Agent picker */}
            <div className="mt-6">
              <p className="mb-3 text-xs text-[hsl(var(--muted))]">Welcher Agent interessiert dich?</p>
              <div className="flex flex-wrap gap-2">
                {finalCta.agentOptions.map(opt => (
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

            <Magnetic strength={0.25} radius={120}>
              <a
                href={`${site.cta.meetingUrl}${selected ? `?agent=${encodeURIComponent(selected)}` : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 flex items-center justify-center gap-2 rounded-full bg-[hsl(var(--accent))] px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
              >
                <Calendar className="h-4 w-4" />
                {finalCta.ctaButton}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Magnetic>

            <p className="mt-3 text-center text-xs text-[hsl(var(--muted))]">
              {finalCta.responseSla}
            </p>
          </motion.div>

          </ScrollScale>
          {/* Right: contact details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex flex-col gap-5"
          >
            {[
              { icon: Mail, label: 'E-Mail', value: site.contact.email, href: `mailto:${site.contact.email}` },
              { icon: Phone, label: 'Telefon', value: site.contact.phone, href: site.contact.phoneHref },
              { icon: Calendar, label: 'Öffnungszeiten', value: site.contact.hours, href: null },
            ].map(item => (
              <div
                key={item.label}
                className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.03] p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                  <item.icon className="h-4 w-4 text-[hsl(var(--neon))]" />
                </div>
                <div>
                  <p className="text-xs text-[hsl(var(--muted))]">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-medium hover:text-[hsl(var(--neon))] transition">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-5">
              <p className="text-sm font-medium">{site.contact.city}</p>
              <p className="mt-1 text-xs text-[hsl(var(--muted))]">
                {site.legal.company} · {site.legal.hrb}
              </p>
              <div className="mt-3 flex gap-4 text-xs">
                {[
                  { label: 'LinkedIn', href: site.social.linkedin },
                  { label: 'X / Twitter', href: site.social.x },
                  { label: 'YouTube', href: site.social.youtube },
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[hsl(var(--muted))] hover:text-[hsl(var(--neon))] transition"
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
