import Link from 'next/link';

const CITIES = [
  { name: 'Wiesbaden', href: '/ki-telefonassistent-wiesbaden', badge: '📍 Firmensitz' },
  { name: 'Frankfurt', href: '/ki-telefonassistent-frankfurt', badge: null },
  { name: 'München', href: '/ki-telefonassistent-muenchen', badge: null },
  { name: 'Berlin', href: '/ki-telefonassistent-berlin', badge: null },
  { name: 'Hamburg', href: '/ki-telefonassistent-hamburg', badge: null },
  { name: 'Köln', href: '/ki-telefonassistent-koeln', badge: null },
  { name: 'Stuttgart', href: '/ki-telefonassistent-stuttgart', badge: null },
  { name: 'Düsseldorf', href: '/ki-telefonassistent-duesseldorf', badge: null },
  { name: 'Nürnberg', href: '/ki-telefonassistent-nuernberg', badge: null },
  { name: 'KI Automatisierung', href: '/ki-automatisierung-wiesbaden', badge: '⚡ Wiesbaden' },
];

const BRANCHES = [
  { name: 'Arztpraxis', href: '/ki-telefonassistent/arztpraxis' },
  { name: 'Handwerk', href: '/ki-telefonassistent/handwerk' },
  { name: 'Steuerberater', href: '/ki-telefonassistent/steuerberater' },
  { name: 'Hausverwaltung', href: '/ki-telefonassistent/hausverwaltung' },
  { name: 'Hotel', href: '/ki-telefonassistent/hotel' },
  { name: 'Autohaus', href: '/ki-telefonassistent/autohaus' },
];

const READS = [
  { name: 'KI-Telefonassistent Vergleich 2026', href: '/blog/ki-telefonassistent-vergleich-2026' },
  { name: 'Warum 94 % der KI-Projekte scheitern', href: '/insights/warum-94-prozent-ki-projekte-scheitern' },
  { name: 'ROI-Checkliste: Lohnt sich ein KI-Agent?', href: '/roi-checkliste-ki-agent' },
];

const PILL =
  'inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/60 transition-all hover:border-white/30 hover:text-white';
const LABEL = 'mb-4 text-center text-[0.7rem] font-medium uppercase tracking-widest text-white/40';

/**
 * Regional & branch internal-link hub. De-orphans the city pages and the
 * blog/insights articles by linking them from a high-traffic section (home
 * + /ki-telefonassistent), with descriptive anchor text.
 */
export function CitiesSection() {
  return (
    <section className="border-t border-white/10 py-16" aria-label="KI-Telefonassistent regional, nach Branche & mehr lesen">
      <div className="mx-auto max-w-5xl space-y-10 px-6">
        <h2 className="text-center font-display text-[clamp(1.5rem,3vw,2.25rem)] font-medium tracking-tight text-white">
          KI-Telefonassistent — regional &amp; für deine Branche
        </h2>
        <div>
          <h3 className={LABEL}>Nach Stadt</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {CITIES.map(({ name, href, badge }) => (
              <Link key={href} href={href} className={PILL}>
                {badge && <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">{badge}</span>}
                {name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className={LABEL}>Nach Branche</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {BRANCHES.map(({ name, href }) => (
              <Link key={href} href={href} className={PILL}>
                {name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className={LABEL}>Tiefer einsteigen</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {READS.map(({ name, href }) => (
              <Link key={href} href={href} className={PILL}>
                {name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
