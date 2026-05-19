import Link from 'next/link';
import { Linkedin, Instagram, Youtube, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { footer, site } from '@/lib/content';

export function Footer() {
  return (
    <footer className="relative bg-[hsl(var(--ink))] text-[hsl(var(--bg))]">
      <div className="mx-auto max-w-[1280px] px-6 pt-24 pb-10 lg:px-10">
        {/* Big editorial statement at the top of the footer */}
        <div className="border-b border-white/10 pb-16">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-white/50">
            — Sprechen wir
          </p>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-light leading-[1.02] tracking-[-0.02em]">
            Bereit, deinen Vertrieb in vier Wochen{' '}
            <span className="italic text-[hsl(var(--accent))]">neu zu denken</span>?
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={site.cta.meetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-14 items-center gap-2 rounded-full bg-[hsl(var(--bg))] px-7 text-[0.95rem] font-medium text-[hsl(var(--ink))] transition-all hover:bg-[hsl(var(--accent))] hover:text-white"
            >
              {site.cta.primary}
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
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="flex items-center gap-3"
              aria-label={`${site.shortName} Startseite`}
            >
              <span
                aria-hidden
                className="grid h-9 w-9 place-items-center rounded-full bg-[hsl(var(--bg))] font-display text-base font-medium text-[hsl(var(--ink))]"
              >
                R
              </span>
              <span className="font-display text-[1.35rem] tracking-tight">
                {site.shortName}
                <span className="text-[hsl(var(--accent))]">.</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-[0.9rem] leading-relaxed text-white/65">
              {footer.description}
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

          {footer.groups.map((group) => (
            <div key={group.title} className="lg:col-span-2">
              <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-white/50">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-3 text-[0.9rem] text-white/75">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <a href={link.href} className="hover:text-[hsl(var(--accent))]">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-8 text-[0.8rem] text-white/55 md:flex-row md:items-center">
          <p>{footer.copyright}</p>
          <p className="italic">{footer.tagline}</p>
        </div>
        <p className="mt-3 text-[0.7rem] italic text-white/40">{site.legal.brandNote}</p>
      </div>
    </footer>
  );
}
