import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'KI Telefonassistent Immobilien – für Makler & Büros',
  description: 'KI-Telefon-Agent für Immobilienmakler: Exposé-Anfragen automatisch beantworten, Besichtigungen buchen und Interessenten qualifizieren — 24/7, DSGVO-konform.',
  keywords: ['KI Telefonassistent Immobilien','Telefonassistent Makler','KI Agent Immobilienbüro','Automatisierung Immobilien'],
  alternates: { canonical: 'https://www.rsg-ai.de/ki-telefonassistent-immobilien' }
}
export default function ImmobilienPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-sm text-white/50 mb-4">Branchenlösung · Immobilien & Makler</div>
        <h1 className="text-5xl font-bold mb-6">KI Telefonassistent<br/><span className="text-white/60">für Immobilienmakler</span></h1>
        <p className="text-xl text-white/70 mb-10 max-w-2xl">Kein Interessent geht verloren: Der KI-Agent beantwortet Exposé-Anfragen, bucht Besichtigungstermine und qualifiziert Käufer und Verkäufer — automatisch, rund um die Uhr.</p>
        <div className="flex gap-4 flex-wrap mb-16">
          <a href="/termin" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition">Demo anfragen</a>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {[
            ['🏠 Exposé-Anfragen','Objektdetails werden automatisch per Sprachassistent übermittelt'],
            ['📅 Besichtigungen buchen','Interessenten buchen direkt Termine — ohne Makler-Einsatz'],
            ['🎯 Käufer/Verkäufer-Qualifizierung','Budget, Zeitplan und Kaufabsicht werden strukturiert erfasst'],
            ['💶 Preisanfragen erfassen','Marktpreisanfragen werden geloggt und weitergeleitet'],
          ].map(([t,d])=>(<div key={t} className="bg-white/5 border border-white/10 rounded-2xl p-6"><h3 className="font-semibold mb-2">{t}</h3><p className="text-white/50 text-sm">{d}</p></div>))}
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-3">Kostenlose Demo für Ihr Maklerbüro</h3>
          <a href="/termin" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition inline-block">Termin buchen</a>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context":"https://schema.org","@type":"Service","name":"KI Telefonassistent Immobilien","provider":{"@type":"Organization","name":"RSG AI","url":"https://www.rsg-ai.de"},"serviceType":"KI-Telefon-Agent","audience":{"@type":"Audience","audienceType":"Immobilienmakler"}})}} />
      </section>
    </main>
  )
}
