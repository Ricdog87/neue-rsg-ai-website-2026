import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KI-Telefonassistent Heidelberg | RSG AI – 24/7 Telefon-Automatisierung',
  description: 'KI-Telefonassistent für Unternehmen in Heidelberg. Automatisieren Sie Ihre Telefonie mit dem intelligenten Voice-Agent von RSG AI. Jetzt Demo buchen.',
  alternates: { canonical: 'https://www.rsg-ai.de/ki-telefonassistent-heidelberg' }
}

export default function KITelefonassistentHeidelberg() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "Organization"],
            "name": "RSG AI – KI-Telefonassistent Heidelberg",
            "description": "KI-gestützter Telefonassistent für Unternehmen in Heidelberg",
            "url": "https://www.rsg-ai.de/ki-telefonassistent-heidelberg",
            "areaServed": { "@type": "City", "name": "Heidelberg" },
            "address": { "@type": "PostalAddress", "addressLocality": "Heidelberg", "addressRegion": "Baden-Württemberg", "addressCountry": "DE" },
            "parentOrganization": { "@type": "Organization", "name": "RSG Recruiting Solutions Group GmbH", "url": "https://www.recruiting-sg.de" }
          })
        }}
      />
      <main className="min-h-screen">
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">KI-Telefonassistent Heidelberg</h1>
          <p className="text-xl mb-8 text-gray-600">
            Automatisieren Sie Ihre Telefonie in Heidelberg mit dem intelligenten KI-Telefonassistenten von RSG AI.
            24/7 verfügbar, auf Deutsch trainiert, sofort einsatzbereit — für Unternehmen in der Metropolregion Rhein-Neckar.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Warum RSG AI in Heidelberg?</h2>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Lokaler Support für Heidelberger Unternehmen</li>
                <li>✓ Branchenerfahrung in Wissenschaft und Technologie</li>
                <li>✓ Nahtlose Integration in bestehende Systeme</li>
                <li>✓ DSGVO-konform, Server in Deutschland</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Für wen geeignet?</h2>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Life-Science- und Tech-Unternehmen</li>
                <li>✓ Arztpraxen und Kliniken</li>
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
              <a href="/ki-telefonassistent-mannheim" className="text-teal-600 hover:underline">Mannheim</a>
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
