import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KI-Telefonassistent Wiesbaden | RSG AI – Ihr lokaler KI-Anbieter',
  description: 'KI-Telefonassistent direkt aus Wiesbaden: RSG AI automatisiert Ihre Telefonie. Inbound & Outbound, DSGVO-konform, ab 199€/Monat. Lokaler Ansprechpartner.',
  keywords: [
    'KI Telefonassistent Wiesbaden',
    'KI Automatisierung Wiesbaden',
    'KI Agent Wiesbaden',
    'Voice Agent Wiesbaden',
    'Automatisierung Wiesbaden',
    'KI Beratung Wiesbaden',
    'Telefonassistent Wiesbaden',
    'RSG AI Wiesbaden'
  ],
  alternates: { canonical: 'https://rsg-ai.de/ki-telefonassistent-wiesbaden' }
}

export default function WiesbadenPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://rsg-ai.de/ki-telefonassistent-wiesbaden#localbusiness",
    "name": "RSG AI – KI-Telefonassistent Wiesbaden",
    "image": "https://rsg-ai.de/og-image.png",
    "url": "https://rsg-ai.de",
    "telephone": "+49-30-826-83906",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Am Heiligenhaus 9",
      "addressLocality": "Wiesbaden",
      "postalCode": "65207",
      "addressRegion": "Hessen",
      "addressCountry": "DE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "50.0782",
      "longitude": "8.2397"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "€€",
    "description": "KI-Telefonassistent und Automatisierungslösungen für Unternehmen in Wiesbaden und der Rhein-Main-Region",
    "areaServed": [
      {"@type": "City", "name": "Wiesbaden"},
      {"@type": "City", "name": "Mainz"},
      {"@type": "City", "name": "Frankfurt"},
      {"@type": "City", "name": "Darmstadt"}
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "KI-Automatisierungslösungen",
      "itemListElement": [
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "KI-Inbound-Telefonassistent", "description": "Automatische Anrufannahme und Lead-Qualifizierung"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "KI-Outbound-Agent", "description": "Automatisierte Outbound-Kampagnen und Follow-ups"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "KI-Automatisierung", "description": "n8n-basierte Prozessautomatisierung für Vertrieb und Recruiting"}}
      ]
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-4xl mx-auto px-6 py-24">
        
        {/* Location Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white/60 mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Wiesbaden · Am Heiligenhaus 9 · 65207
        </div>

        <h1 className="text-5xl font-bold mb-6 leading-tight">
          KI-Telefonassistent<br />
          <span className="text-white/60">direkt aus Wiesbaden</span>
        </h1>

        <p className="text-xl text-white/70 mb-4 max-w-2xl">
          RSG AI ist Ihr lokaler Anbieter für KI-Automatisierung in Wiesbaden und der Rhein-Main-Region. 
          Wir automatisieren Ihre Telefonie – Inbound & Outbound – DSGVO-konform und ohne IT-Aufwand.
        </p>

        <p className="text-white/50 mb-10 text-sm">
          📍 Firmensitz: Am Heiligenhaus 9, 65207 Wiesbaden · Persönliche Beratung möglich
        </p>

        <div className="flex gap-4 flex-wrap mb-16">
          <a href="/termin" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition">
            Kostenloses Erstgespräch
          </a>
          <a href="tel:+493082683906" className="border border-white/20 text-white px-8 py-4 rounded-full hover:border-white/60 transition">
            +49 30 826 839 06
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-20">
          {[
            ['< 2 Wochen', 'bis Go-Live'],
            ['24/7', 'Verfügbarkeit'],
            ['Wiesbaden', 'Firmensitz'],
          ].map(([stat, label]) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <div className="text-2xl font-bold mb-1">{stat}</div>
              <div className="text-white/50 text-sm">{label}</div>
            </div>
          ))}
        </div>

        {/* Services */}
        <h2 className="text-2xl font-semibold mb-8">KI-Automatisierung für Wiesbadener Unternehmen</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {[
            {
              title: 'KI-Telefonassistent',
              desc: 'Nimmt Anrufe entgegen, qualifiziert Leads und bucht Termine – rund um die Uhr, ohne Wartezeit.',
              href: '/#voice'
            },
            {
              title: 'Outbound-KI-Agent',
              desc: 'Ruft potenzielle Kunden an, qualifiziert den Bedarf und übergibt warme Leads an Ihren Vertrieb.',
              href: '/#voice'
            },
            {
              title: 'KI-Automatisierung',
              desc: 'Vertrieb, Recruiting und Kundenservice automatisieren – mit n8n, HubSpot und Custom-Workflows.',
              href: '/automatisierung'
            }
          ].map(({ title, desc, href }) => (
            <a key={title} href={href} className="block bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/30 transition group">
              <h3 className="font-semibold mb-3 group-hover:text-white">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
            </a>
          ))}
        </div>

        {/* Why local */}
        <h2 className="text-2xl font-semibold mb-6">Warum ein lokaler KI-Anbieter aus Wiesbaden?</h2>
        <ul className="space-y-4 text-white/70 mb-16">
          <li className="flex gap-3">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong className="text-white">Persönliche Beratung vor Ort:</strong> Kein Call-Center, kein Ticket-System – direkter Draht zu Ricardo Serrano und dem RSG-Team</span>
          </li>
          <li className="flex gap-3">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong className="text-white">DSGVO-konform by Design:</strong> Daten bleiben in Deutschland, AVV-Vertrag inklusive, keine US-Server</span>
          </li>
          <li className="flex gap-3">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong className="text-white">Rhein-Main-Netzwerk:</strong> Wir kennen den lokalen Markt – von Wiesbaden bis Frankfurt, Mainz und Darmstadt</span>
          </li>
          <li className="flex gap-3">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong className="text-white">Schnelles Deployment:</strong> Go-Live in unter 2 Wochen – ohne IT-Aufwand auf Ihrer Seite</span>
          </li>
        </ul>

        {/* CTA */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Kostenlose Demo für Wiesbadener Unternehmen</h2>
          <p className="text-white/60 mb-6">Rufen Sie unseren Live-Agenten an oder buchen Sie ein kostenloses Erstgespräch.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/termin" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition">
              Termin buchen
            </a>
            <a href="tel:+493082683906" className="border border-white/20 text-white px-8 py-4 rounded-full hover:border-white/60 transition">
              Jetzt anrufen
            </a>
          </div>
        </div>

      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  )
}
