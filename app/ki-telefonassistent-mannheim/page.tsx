import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KI-Telefonassistent Mannheim | RSG AI – 24/7 Telefon-Automatisierung',
  description: 'KI-Telefonassistent für Unternehmen in Mannheim. Automatisieren Sie Ihre Telefonie mit dem intelligenten Voice-Agent von RSG AI. Jetzt Demo buchen.',
  alternates: { canonical: 'https://www.rsg-ai.de/ki-telefonassistent-mannheim' }
}

export default function KITelefonassistentMannheim() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "Organization"],
            "name": "RSG AI – KI-Telefonassistent Mannheim",
            "description": "KI-gestützter Telefonassistent für Unternehmen in Mannheim",
            "url": "https://www.rsg-ai.de/ki-telefonassistent-mannheim",
            "areaServed": { "@type": "City", "name": "Mannheim" },
            "address": { "@type": "PostalAddress", "addressLocality": "Mannheim", "addressRegion": "Baden-Württemberg", "addressCountry": "DE" },
            "parentOrganization": { "@type": "Organization", "name": "RSG Recruiting Solutions Group GmbH", "url": "https://www.recruiting-sg.de" }
          })
        }}
      />
      <main className="min-h-screen">
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">KI-Telefonassistent Mannheim</h1>
          <p className="text-xl mb-8 text-gray-600">
            Automatisieren Sie Ihre Telefonie in Mannheim mit dem intelligenten KI-Telefonassistenten von RSG AI.
            24/7 verfügbar, auf Deutsch trainiert, sofort einsatzbereit — auch für den Rhein-Neckar-Raum.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Warum RSG AI in Mannheim?</h2>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Lokaler Support für Mannheimer Unternehmen</li>
                <li>✓ Branchenerfahrung im Rhein-Neckar-Raum</li>
                <li>✓ Nahtlose Integration in bestehende Systeme</li>
                <li>✓ DSGVO-konform, Server in Deutschland</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Für wen geeignet?</h2>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Industrie- und Produktionsunternehmen</li>
                <li>✓ Handels- und Logistikfirmen</li>
                <li>✓ Kanzleien und Beratungen</li>
                <li>✓ Mittelständische Unternehmen</li>
              </ul>
            </div>
          </div>
          <a href="/#booking" className="inline-block bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transition">
            Kostenlose Demo buchen
          </a>
          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">KI-Telefonassistent auch verfügbar in:</p>
            <div className="flex flex-wrap gap-3 text-sm">
              <a href="/ki-telefonassistent-frankfurt" className="text-teal-600 hover:underline">Frankfurt</a>
              <a href="/ki-telefonassistent-wiesbaden" className="text-teal-600 hover:underline">Wiesbaden</a>
              <a href="/ki-telefonassistent-mainz" className="text-teal-600 hover:underline">Mainz</a>
              <a href="/ki-telefonassistent-darmstadt" className="text-teal-600 hover:underline">Darmstadt</a>
              <a href="/ki-telefonassistent-offenbach" className="text-teal-600 hover:underline">Offenbach</a>
              <a href="/ki-telefonassistent-heidelberg" className="text-teal-600 hover:underline">Heidelberg</a>
              <a href="/ki-telefonassistent-koeln" className="text-teal-600 hover:underline">Köln</a>
              <a href="/ki-telefonassistent-muenchen" className="text-teal-600 hover:underline">München</a>
              <a href="/ki-telefonassistent-berlin" className="text-teal-600 hover:underline">Berlin</a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
