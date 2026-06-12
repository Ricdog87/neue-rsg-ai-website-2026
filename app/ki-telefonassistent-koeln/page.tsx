import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'KI-Telefonassistent Köln | RSG AI – 24/7 Telefon-Automatisierung',
  description: 'KI-Telefonassistent für Unternehmen in Köln. Automatisieren Sie Ihre Telefonie mit dem intelligenten Voice-Agent von RSG AI. Jetzt Demo buchen.',
  alternates: { canonical: 'https://www.rsg-ai.de/ki-telefonassistent-koeln' }
}
export default function KITelefonassistentKoeln() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": ["LocalBusiness", "Organization"],
        "name": "RSG AI – KI-Telefonassistent Köln",
        "description": "KI-gestützter Telefonassistent für Unternehmen in Köln",
        "url": "https://www.rsg-ai.de/ki-telefonassistent-koeln",
        "areaServed": { "@type": "City", "name": "Köln" },
        "address": { "@type": "PostalAddress", "addressLocality": "Köln", "addressRegion": "Nordrhein-Westfalen", "addressCountry": "DE" },
        "parentOrganization": { "@type": "Organization", "name": "RSG Recruiting Solutions Group GmbH", "url": "https://www.recruiting-sg.de" }
      })}} />
      <main className="min-h-screen">
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">KI-Telefonassistent Köln</h1>
          <p className="text-xl mb-8 text-gray-600">Automatisieren Sie Ihre Telefonie in Köln mit dem intelligenten KI-Telefonassistenten von RSG AI. 24/7 verfügbar, auf Deutsch trainiert, sofort einsatzbereit.</p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Warum RSG AI in Köln?</h2>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Lokaler Support für Kölner Unternehmen</li>
                <li>✓ Branchenerfahrung im Rheinland</li>
                <li>✓ Nahtlose Integration in bestehende Systeme</li>
                <li>✓ DSGVO-konform, Server in Deutschland</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Für wen geeignet?</h2>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Recruiting- und HR-Agenturen</li>
                <li>✓ Immobilienunternehmen</li>
                <li>✓ Kanzleien und Beratungen</li>
                <li>✓ Mittelständische Unternehmen</li>
              </ul>
            </div>
          </div>
          <a href="/#booking" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">Kostenlose Demo buchen</a>
        </section>
      </main>
    </>
  )
}
