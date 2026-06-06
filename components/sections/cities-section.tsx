import Link from 'next/link'

const CITIES = [
  { name: 'Wiesbaden', href: '/ki-telefonassistent-wiesbaden', badge: '📍 Firmensitz' },
  { name: 'Frankfurt', href: '/ki-telefonassistent-frankfurt', badge: null },
  { name: 'München', href: '/ki-telefonassistent-muenchen', badge: null },
  { name: 'Berlin', href: '/ki-telefonassistent-berlin', badge: null },
  { name: 'Hamburg', href: '/ki-telefonassistent-hamburg', badge: null },
  { name: 'Köln', href: '/ki-telefonassistent-koeln', badge: null },
  { name: 'Stuttgart', href: '/ki-telefonassistent-stuttgart', badge: null },
  { name: 'KI Automatisierung', href: '/ki-automatisierung-wiesbaden', badge: '⚡ Wiesbaden' },
]

export function CitiesSection() {
  return (
    <section className="py-16 border-t border-white/10">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-sm font-medium text-white/40 uppercase tracking-widest mb-6 text-center">
          KI-Telefonassistent · Regional verfügbar
        </h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {CITIES.map(({ name, href, badge }) => (
            <Link
              key={href}
              href={href}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-white/30 hover:text-white transition-all"
            >
              {badge && (
                <span className="text-xs bg-white/10 rounded-full px-2 py-0.5">{badge}</span>
              )}
              {name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
