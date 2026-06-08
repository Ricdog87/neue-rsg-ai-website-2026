import type { Metadata } from 'next'
import { CitiesSection } from '@/components/sections/cities-section';
export const metadata: Metadata = {
  title: 'KI Telefonassistent Steuerberater & Kanzlei',
  description: 'KI-Telefon-Agent für Steuerberater und Kanzleien: Mandantenanfragen erfassen, Erstgespräche qualifizieren und 24/7 erreichbar sein — DSGVO-konform.',
  keywords: ['KI Telefonassistent Steuerberater','Telefonassistent Kanzlei','KI Agent Steuerbüro','Automatisierung Kanzlei'],
  alternates: { canonical: 'https://www.rsg-ai.de/ki-telefonassistent-kanzlei' }
}
export default function KanzleiPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-sm text-white/50 mb-4">Branchenlösung · Steuerberatung & Kanzleien</div>
        <h1 className="text-5xl font-bold mb-6">KI Telefonassistent<br/><span className="text-white/60">für Steuerberater & Kanzleien</span></h1>
        <p className="text-xl text-white/70 mb-10 max-w-2xl">Ihre Kanzlei ist immer erreichbar: Der KI-Agent nimmt Mandantenanfragen entgegen, unterscheidet Erstgespräch von Bestandsmandant und koordiniert Termine — automatisch und DSGVO-konform.</p>
        <div className="flex gap-4 flex-wrap mb-16">
          <a href="/termin" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition">Demo anfragen</a>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {[
            ['📂 Mandantenanfragen erfassen','Anliegen, Steuerjahr und Dringlichkeit werden strukturiert aufgenommen'],
            ['🤝 Termin-Qualifizierung','Erstgespräch oder Bestandsmandant — der Agent erkennt den Unterschied'],
            ['⏰ Fristen-Erinnerungen','Automatische Hinweise auf Abgabefristen für Mandanten'],
            ['📞 24/7 Erreichbarkeit','Keine verpassten Anrufe mehr — auch außerhalb der Bürozeiten'],
          ].map(([t,d])=>(<div key={t} className="bg-white/5 border border-white/10 rounded-2xl p-6"><h3 className="font-semibold mb-2">{t}</h3><p className="text-white/50 text-sm">{d}</p></div>))}
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-3">Kostenlose Demo für Ihre Kanzlei</h3>
          <a href="/termin" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition inline-block">Termin buchen</a>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context":"https://schema.org","@type":"Service","name":"KI Telefonassistent Steuerberater Kanzlei","provider":{"@type":"Organization","name":"RSG AI","url":"https://www.rsg-ai.de"},"serviceType":"KI-Telefon-Agent","audience":{"@type":"Audience","audienceType":"Steuerberater und Kanzleien"}})}} />
      </section>
    <CitiesSection />
      </main>
  )
}
