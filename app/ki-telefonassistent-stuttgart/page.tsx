import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KI-Telefonassistent Stuttgart | RSG AI – 24/7 Telefon-Automatisierung',
  description: 'KI-Telefonassistent für Unternehmen in Stuttgart. Automatisieren Sie Ihre Telefonie mit dem intelligenten Voice-Agent von RSG AI. Jetzt Demo buchen.',
  alternates: {
    canonical: 'https://www.rsg-ai.de/ki-telefonassistent-stuttgart',
  },
}

export default function KITelefonassistentStuttgart() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['LocalBusiness', 'Organization'],
            name: 'RSG AI – KI-Telefonassistent Stuttgart',
            description:
              'KI-gestützter Telefonassistent für Unternehmen in Stuttgart und der Stuttgart-Region. 24/7 automatisierte Telefonie durch RSG AI.',
            url: 'https://www.rsg-ai.de/ki-telefonassistent-stuttgart',
            areaServed: {
              '@type': 'City',
              name: 'Stuttgart',
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Stuttgart',
              addressRegion: 'Baden-Württemberg',
              addressCountry: 'DE',
            },
            parentOrganization: {
              '@type': 'Organization',
              name: 'RSG Recruiting Solutions Group GmbH',
              url: 'https://www.recruiting-sg.de',
            },
          }),
        }}
      />
      <main className="min-h-screen">
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            KI-Telefonassistent Stuttgart
          </h1>
          <p className="text-xl mb-8 text-gray-600">
            Optimieren Sie Ihre Unternehmenskommunikation in Stuttgart mit dem
            intelligenten KI-Telefonassistenten von RSG AI. Unser Voice-Agent
            übernimmt eingehende Anrufe rund um die Uhr – zuverlässig,
            skalierbar und vollständig automatisiert.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Warum RSG AI in Stuttgart?
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li>
                  ✓ Lokale Expertise für Stuttgarter Unternehmen und
                  Stuttgart-Region
                </li>
                <li>✓ 24/7 Erreichbarkeit ohne zusätzliches Personal</li>
                <li>✓ Nahtlose Integration in bestehende Telefonsysteme</li>
                <li>✓ DSGVO-konform und made in Germany</li>
                <li>
                  ✓ Individuelle Anpassung an Ihre Branche und Unternehmenssprache
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Für wen geeignet?</h2>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Mittelständische Unternehmen in Stuttgart</li>
                <li>✓ Dienstleister und Agenturen in Baden-Württemberg</li>
                <li>✓ Kanzleien, Praxen und Beratungsunternehmen</li>
                <li>✓ E-Commerce und Retail mit hohem Anrufvolumen</li>
                <li>✓ Startups und Wachstumsunternehmen in der Stuttgart-Region</li>
              </ul>
            </div>
          </div>

          <a
            href="/#booking"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Kostenlose Demo buchen
          </a>
        </section>
      </main>
    </>
  )
}
