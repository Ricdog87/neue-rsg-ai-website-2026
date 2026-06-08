import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'KI Telefonassistent Nürnberg | RSG AI – Bayern',
  description: 'KI-Telefon-Agent für Nürnberger Unternehmen: Automatische Anrufannahme, Terminbuchung und Kundenservice rund um die Uhr. Für den Wirtschaftsraum Nürnberg-Bayern.',
  keywords: ['KI Telefonassistent Nürnberg','AI Agent Nürnberg Bayern','Automatisierung Nürnberg','Telefonassistent Bayern'],
  alternates: { canonical: 'https://www.rsg-ai.de/ki-telefonassistent-nuernberg' }
}
export default function NuernbergPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-sm text-white/50 mb-4">Lokale Lösung · Wirtschaftsraum Nürnberg-Bayern</div>
        <h1 className="text-5xl font-bold mb-6">KI-Telefonassistent<br/><span className="text-white/60">für Nürnberger Unternehmen</span></h1>
        <p className="text-xl text-white/70 mb-10 max-w-2xl">Unternehmen in Nürnberg und der Metropolregion automatisieren ihren Telefoneingang mit RSG AI: 24/7 erreichbar, DSGVO-konform, auf Deutsch — ohne zusätzliches Personal.</p>
        <div className="flex gap-4 flex-wrap mb-16">
          <a href="/termin" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition">Demo für Nürnberg anfragen</a>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {[
            ['📍 Metropolregion Nürnberg','Spezialisiert auf den fränkischen Wirtschaftsraum'],
            ['🏭 Mittelstand & KMU','Maßgeschneidert für kleine und mittlere Unternehmen in Bayern'],
            ['🇩🇪 DSGVO-konform','Datenschutz nach deutschem Standard — Server in Deutschland'],
            ['⚡ Schnelle Einrichtung','In 48 Stunden live, direkter Ansprechpartner vor Ort'],
          ].map(([t,d])=>(<div key={t} className="bg-white/5 border border-white/10 rounded-2xl p-6"><h3 className="font-semibold mb-2">{t}</h3><p className="text-white/50 text-sm">{d}</p></div>))}
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-3">Kostenlose Demo für Ihr Nürnberger Unternehmen</h3>
          <a href="/termin" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition inline-block">Termin buchen</a>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context":"https://schema.org","@type":"Service","name":"KI Telefonassistent Nürnberg","provider":{"@type":"Organization","name":"RSG AI","url":"https://www.rsg-ai.de"},"serviceType":"KI-Telefon-Agent","areaServed":{"@type":"City","name":"Nürnberg"}})}} />
      </section>
    </main>
  )
}
