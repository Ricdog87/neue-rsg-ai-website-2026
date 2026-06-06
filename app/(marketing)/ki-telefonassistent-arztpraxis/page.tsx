import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'KI Telefonassistent Arztpraxis | RSG AI – DSGVO-konform',
  description: 'KI-Telefon-Agent für Arztpraxen: Terminbuchung, Triage-Erfassung und Patientenanfragen rund um die Uhr. DSGVO-konform, keine Wartemusik. Ab 199€/Monat.',
  keywords: ['KI Telefonassistent Arztpraxis','Telefonassistent Praxis','KI Terminbuchung Arzt','Automatischer Telefonassistent Medizin'],
  alternates: { canonical: 'https://rsg-ai.de/ki-telefonassistent-arztpraxis' }
}
export default function ArztpraxisPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-sm text-white/50 mb-4">Branchenlösung · Medizin & Gesundheit</div>
        <h1 className="text-5xl font-bold mb-6">KI Telefonassistent<br/><span className="text-white/60">für Arztpraxen</span></h1>
        <p className="text-xl text-white/70 mb-10 max-w-2xl">Weniger Telefonaufwand für Ihr Praxisteam: Der KI-Agent nimmt Terminanfragen entgegen, qualifiziert Dringlichkeit und bucht direkt in Ihren Kalender — rund um die Uhr, DSGVO-konform.</p>
        <div className="flex gap-4 flex-wrap mb-16">
          <a href="/termin" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition">Demo anfragen</a>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {[
            ['📞 24/7 Terminbuchung','Patienten rufen an wenn die Praxis geschlossen ist — der Agent bucht trotzdem'],
            ['🏥 Triage-Erfassung','Symptombeschreibung und Dringlichkeit werden strukturiert erfasst'],
            ['📋 Rezept-Anfragen','Standardanfragen werden automatisch weitergeleitet'],
            ['🔒 DSGVO & AVV','Patientendaten auf deutschen Servern, AVV-Vertrag inklusive'],
          ].map(([t,d])=>(<div key={t} className="bg-white/5 border border-white/10 rounded-2xl p-6"><h3 className="font-semibold mb-2">{t}</h3><p className="text-white/50 text-sm">{d}</p></div>))}
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-3">Kostenlose Demo für Ihre Praxis</h3>
          <a href="/termin" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition inline-block">Termin buchen</a>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context":"https://schema.org","@type":"Service","name":"KI Telefonassistent Arztpraxis","provider":{"@type":"Organization","name":"RSG AI","url":"https://rsg-ai.de"},"serviceType":"KI-Telefon-Agent","audience":{"@type":"Audience","audienceType":"Arztpraxen"}})}} />
      </section>
    </main>
  )
}
