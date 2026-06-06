import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'KI Telefonassistent Düsseldorf | RSG AI – NRW-Region',
  description: 'KI-Telefon-Agent für Düsseldorfer Unternehmen: Automatische Anrufannahme, Terminbuchung und Kundenanfragen rund um die Uhr. Für die NRW-Wirtschaftsregion Köln-Düsseldorf.',
  keywords: ['KI Telefonassistent Düsseldorf','AI Agent Düsseldorf','Automatisierung Düsseldorf NRW','Telefonassistent NRW'],
  alternates: { canonical: 'https://rsg-ai.de/ki-telefonassistent-duesseldorf' }
}
export default function DuesseldorfPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-sm text-white/50 mb-4">Lokale Lösung · NRW-Wirtschaftsregion Köln-Düsseldorf</div>
        <h1 className="text-5xl font-bold mb-6">KI-Telefonassistent<br/><span className="text-white/60">für Düsseldorfer Unternehmen</span></h1>
        <p className="text-xl text-white/70 mb-10 max-w-2xl">Unternehmen in Düsseldorf und der NRW-Region automatisieren ihren Telefoneingang mit RSG AI: Kein Anruf bleibt unbeantwortet — 24/7, auf Deutsch, DSGVO-konform.</p>
        <div className="flex gap-4 flex-wrap mb-16">
          <a href="/termin" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition">Demo für Düsseldorf anfragen</a>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {[
            ['📍 Lokal verankert','Auf die NRW-Wirtschaftsregion Köln-Düsseldorf spezialisiert'],
            ['🏢 Alle Branchen','Von Kanzleien über Arztpraxen bis zu Immobilienbüros'],
            ['🇩🇪 DSGVO-konform','Daten bleiben auf deutschen Servern — AVV inklusive'],
            ['⚡ Schnelle Integration','In 48 Stunden einsatzbereit, keine IT-Kenntnisse nötig'],
          ].map(([t,d])=>(<div key={t} className="bg-white/5 border border-white/10 rounded-2xl p-6"><h3 className="font-semibold mb-2">{t}</h3><p className="text-white/50 text-sm">{d}</p></div>))}
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-3">Kostenlose Demo für Ihr Düsseldorfer Unternehmen</h3>
          <a href="/termin" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition inline-block">Termin buchen</a>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context":"https://schema.org","@type":"Service","name":"KI Telefonassistent Düsseldorf","provider":{"@type":"Organization","name":"RSG AI","url":"https://rsg-ai.de"},"serviceType":"KI-Telefon-Agent","areaServed":{"@type":"City","name":"Düsseldorf"}})}} />
      </section>
    </main>
  )
}
