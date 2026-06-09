'use client';

import Link from 'next/link';
import { Linkedin, Instagram, Youtube, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { footer, site } from '@/lib/content';
import { RsgLogoFull } from '@/components/icons/rsg-logo';
import { CookieSettings } from '@/components/system/cookie-settings';
import { useEnglish } from '@/components/system/use-locale';

// Footer string translations. Group titles + the common link labels;
// anything unmapped falls back to the German original.
const FOOTER_EN: Record<string, string> = {
  Produkt: 'Product',
  'KI-Lösungen': 'AI Solutions',
  'Cases & Insights': 'Cases & Insights',
  Unternehmen: 'Company',
  Rechtliches: 'Legal',
  Impressum: 'Imprint',
  Datenschutz: 'Privacy',
  AGB: 'Terms',
  'Termin buchen': 'Book a call',
  Kontakt: 'Contact',
  'Warum uns': 'Why us',
  Prozess: 'Process',
  'ROI-Rechner': 'ROI calculator',
  Investment: 'Investment',
  Pipelines: 'Pipelines',
  'Alle Case Studies': 'All case studies',
  'Insights · Essays': 'Insights · Essays',
};

export function Footer() {
  const en = useEnglish();
  const tl = (s: string) => (en ? FOOTER_EN[s] ?? s : s);
  const homeHref = en ? '/en' : '/';
  return (
    <footer className="relative bg-[hsl(var(--ink))] text-[hsl(var(--bg))]">
      <div className="mx-auto max-w-[1280px] px-6 pt-24 pb-10 lg:px-10">
        {/* Big editorial statement at the top of the footer */}
        <div className="border-b border-white/10 pb-16">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-white/50">
            {en ? "— Let's talk" : '— Sprechen wir'}
          </p>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-light leading-[1.08] tracking-[-0.02em]">
            {en ? (
              <>
                Ready to rethink your sales in{' '}
                <span className="italic text-[hsl(var(--accent))]">four weeks</span>?
              </>
            ) : (
              <>
                Bereit, deinen Vertrieb in vier Wochen{' '}
                <span className="italic text-[hsl(var(--accent))]">neu zu denken</span>?
              </>
            )}
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={site.cta.meetingUrl}
              className="group inline-flex h-14 items-center gap-2 rounded-full bg-[hsl(var(--bg))] px-7 text-[0.95rem] font-medium text-[hsl(var(--fg))] transition-all hover:bg-[hsl(var(--accent))] hover:text-white"
            >
              {en ? 'Book a demo' : site.cta.primary}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="text-[0.95rem] underline decoration-white/30 decoration-1 underline-offset-4 transition hover:text-[hsl(var(--accent))] hover:decoration-[hsl(var(--accent))]"
            >
              {site.contact.email}
            </a>
          </div>
        </div>

        {/* Footer grid */}
        <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              href={homeHref}
              className="inline-block"
              aria-label={`${site.shortName} ${en ? 'home' : 'Startseite'}`}
            >
              <RsgLogoFull className="h-12 w-auto text-white" />
            </Link>
            <p className="mt-5 max-w-sm text-[0.9rem] leading-relaxed text-white/65">
              {en
                ? 'AI agents that automate your business processes 24/7. GDPR-compliant, made in Germany.'
                : footer.description}
            </p>
            <ul className="mt-8 space-y-3 text-[0.9rem] text-white/75">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-white/45" aria-hidden />
                <a href={`mailto:${site.contact.email}`} className="hover:text-[hsl(var(--accent))]">
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-white/45" aria-hidden />
                <a href={site.contact.phoneHref} className="hover:text-[hsl(var(--accent))]">
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-white/45" aria-hidden />
                <span>{site.contact.city}</span>
              </li>
            </ul>
            <div className="mt-8 flex items-center gap-3">
              {[
                { href: site.social.linkedin, label: 'LinkedIn', icon: Linkedin },
                { href: site.social.instagram, label: 'Instagram', icon: Instagram },
                { href: site.social.youtube, label: 'YouTube', icon: Youtube }
              ].map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {footer.groups.filter((group) => group.title !== 'Standorte').map((group) => (
            <div key={group.title} className="lg:col-span-2">
              <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-white/50">
                {tl(group.title)}
              </h3>
              <ul className="mt-5 space-y-3 text-[0.9rem] text-white/75">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center transition-colors hover:text-[hsl(var(--accent))]"
                    >
                      {tl(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Standorte — kompakt ganz unten (smart gepackt) */}
        {(() => {
          const standorte = footer.groups.find((g) => g.title === 'Standorte');
          if (!standorte) return null;
          return (
            <div className="mt-12 border-t border-white/10 pt-6">
              <h3 className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-white/40">
                {tl(standorte.title)}
              </h3>
              <ul className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.75rem] text-white/55">
                {standorte.links.map((link, i) => (
                  <li key={link.href} className="flex items-center gap-3">
                    {i > 0 && <span aria-hidden className="text-white/20">·</span>}
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-[hsl(var(--accent))]"
                    >
                      {tl(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })()}

        {/* Editorial chrome strip — version, server, build year */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-white/40">
          <div className="flex flex-wrap items-center gap-5">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(174_100%_50%)] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(174_100%_50%)]" />
              </span>
              <span>System nominal · EU-Cloud</span>
            </span>
            <span className="hidden md:inline">v 2026.{(new Date().getMonth() + 1).toString().padStart(2, '0')}</span>
            <span className="hidden md:inline">Built in Wiesbaden</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <span>{`© ${new Date().getFullYear()}`}</span>
            <span className="hidden md:inline">Latency · {'<0.8s'}</span>
            <span>UPTIME · 99.9 %</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-[0.8rem] text-white/55 md:flex-row md:items-center">
          <p>
            {en
              ? '© 2026 RSG Recruiting Solutions Group GmbH · HRB 35951 · All rights reserved.'
              : footer.copyright}
          </p>
          <p className="italic">
            {en ? 'AI agents · GDPR-compliant · Made in Germany' : footer.tagline}
          </p>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          <p className="text-[0.7rem] italic text-white/40">{site.legal.brandNote}</p>
          <CookieSettings />
        </div>
      </div>
    </footer>
  );
}
