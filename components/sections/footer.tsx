import Link from 'next/link';
import { Linkedin, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { footer, site } from '@/lib/content';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[hsl(var(--bg))]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2" aria-label={`${site.shortName} Startseite`}>
              <span
                aria-hidden
                className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-[hsl(var(--accent))] to-[hsl(var(--neon))] text-sm font-bold text-black"
              >
                R
              </span>
              <span className="font-display text-xl tracking-tight">{site.shortName}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-[hsl(var(--muted))]">{footer.description}</p>
            <ul className="mt-6 space-y-2 text-sm text-[hsl(var(--muted))]">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" aria-hidden />
                <a href={`mailto:${site.contact.email}`} className="hover:text-[hsl(var(--fg))]">
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" aria-hidden />
                <a href={site.contact.phoneHref} className="hover:text-[hsl(var(--fg))]">
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" aria-hidden />
                <span>{site.contact.city}</span>
              </li>
            </ul>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-[hsl(var(--muted))] hover:border-[hsl(var(--neon))] hover:text-[hsl(var(--neon))]"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={site.social.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-[hsl(var(--muted))] hover:border-[hsl(var(--neon))] hover:text-[hsl(var(--neon))]"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={site.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-[hsl(var(--muted))] hover:border-[hsl(var(--neon))] hover:text-[hsl(var(--neon))]"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {footer.groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold tracking-wide text-[hsl(var(--fg))]">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-[hsl(var(--muted))]">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <a href={link.href} className="hover:text-[hsl(var(--fg))]">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-white/5 pt-6 text-xs text-[hsl(var(--muted))] md:flex-row md:items-center">
          <p>{footer.copyright}</p>
          <p>{footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
