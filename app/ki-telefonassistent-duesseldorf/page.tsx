import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KI-Telefonassistent Düsseldorf | RSG AI – 24/7 Telefon-Automatisierung',
  description: 'KI-Telefonassistent für Unternehmen in Düsseldorf. Automatisieren Sie Ihre Telefonie mit dem intelligenten Voice-Agent von RSG AI. Jetzt Demo buchen.',
  alternates: {
    canonical: 'https://www.rsg-ai.de/ki-telefonassistent-duesseldorf',
  },
}

export default function KITelefonassistentDuesseldorf() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['LocalBusiness', 'Organization'],
            name: 'RSG AI – KI-Telefonassistent Düsseldorf',
            description:
              'KI-gestützter Telefonassistent für Unternehmen in Düsseldorf und der Rhein-Ruhr-Region. 24/7 automatisierte Telefonie durch RSG AI.',
            url: 'https://www.rsg-ai.de/ki-telefonassistent-duesseldorf',
            areaServed: {
              '@type': 'City',
              name: 'Düsseldorf',
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Düsseldorf',
              addressRegion: 'Nordrhein-Westfalen',
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
            KI-Telefonassistent Düsseldorf
          </h1>
          <p className="text-xl mb-8 text-gray-600">
            Optimieren Sie Ihre Unternehmenskommunikation in Düsseldorf mit dem
            intelligenten KI-Telefonassistenten von RSG AI. Unser Voice-Agent
            übernimmt eingehende Anrufe rund um die Uhr – zuverlässig,
            skalierbar und vollständig automatisiert.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Warum RSG AI in Düsseldorf?
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li>
                  ✓ Lokale Expertise für Düsseldorfer Unternehmen und die
                  Rhein-Ruhr-Region
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
                <li>✓ Mittelständische Unternehmen in Düsseldorf</li>
                <li>✓ Dienstleister und Agenturen in Nordrhein-Westfalen</li>
                <li>✓ Kanzleien, Praxen und Beratungsunternehmen</li>
                <li>✓ E-Commerce und Retail mit hohem Anrufvolumen</li>
                <li>✓ Startups und Wachstumsunternehmen in der Rhein-Ruhr-Region</li>
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
