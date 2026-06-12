import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'KI-Telefonassistent Darmstadt | RSG AI – 24/7 Telefon-Automatisierung',
  description: 'KI-Telefonassistent für Unternehmen in Darmstadt. Automatisieren Sie Ihre Telefonie mit dem intelligenten Voice-Agent von RSG AI. Jetzt Demo buchen.',
  alternates: { canonical: 'https://www.rsg-ai.de/ki-telefonassistent-darmstadt' }
}
export default function KITelefonassistentDarmstadt() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "Organization"],
        "name": "RSG AI – KI-Telefonassistent Darmstadt",
        "description": "KI-gestützter Telefonassistent für Unternehmen in Darmstadt",
        "url": "https://www.rsg-ai.de/ki-telefonassistent-darmstadt",
        "areaServed": { "@type": "City", "name": "Darmstadt" },
        "address": { "@type": "PostalAddress", "addressLocality": "Darmstadt", "addressRegion": "Hessen", "addressCountry": "DE" },
        "parentOrganization": { "@type": "Organization", "name": "RSG Recruiting Solutions Group GmbH", "url": "https://www.recruiting-sg.de" }
      })}} />
      <main className="min-h-screen">
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">KI-Telefonassistent Darmstadt</h1>
          <p className="text-xl mb-8 text-gray-600">Automatisieren Sie Ihre Telefonie in Darmstadt mit dem intelligenten KI-Telefonassistenten von RSG AI. 24/7 verfügbar, auf Deutsch trainiert, sofort einsatzbereit.</p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Warum RSG AI in Darmstadt?</h2>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Lokaler Support für Unternehmen in Darmstadt</li>
                <li>✓ Branchenerfahrung im Rhein-Main-Gebiet</li>
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
