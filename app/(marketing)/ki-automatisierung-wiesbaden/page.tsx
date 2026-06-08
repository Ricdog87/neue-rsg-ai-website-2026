import type { Metadata } from 'next'
import { CitiesSection } from '@/components/sections/cities-section';
export const metadata: Metadata = {
  title: 'KI Automatisierung Wiesbaden – n8n, Workflows, Voice Agents',
  description: 'KI-Automatisierung für Unternehmen in Wiesbaden: Vertrieb, Recruiting und Kundenservice automatisieren. n8n Workflows, KI-Agenten, DSGVO-konform. Jetzt Demo anfragen.',
  keywords: ['KI Automatisierung Wiesbaden', 'Automatisierung Wiesbaden', 'n8n Wiesbaden', 'Prozessautomatisierung Wiesbaden', 'KI Beratung Wiesbaden'],
  alternates: { canonical: 'https://www.rsg-ai.de/ki-automatisierung-wiesbaden' }
}
export default function AutomatisierungWiesbadenPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white/60 mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Wiesbaden · Hessen · DACH
        </div>
        <h1 className="text-5xl font-bold mb-6">KI Automatisierung<br /><span className="text-white/60">in Wiesbaden</span></h1>
        <p className="text-xl text-white/70 mb-10 max-w-2xl">Automatisieren Sie Ihren Vertrieb, Ihr Recruiting und Ihren Kundenservice mit KI – direkt aus Wiesbaden. RSG AI baut maßgeschneiderte n8n-Workflows und KI-Agenten für den DACH-Mittelstand.</p>
        <div className="flex gap-4 flex-wrap mb-16">
          <a href="/termin" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition">Demo anfragen</a>
          <a href="/automatisierung" className="border border-white/20 text-white px-8 py-4 rounded-full hover:border-white/60 transition">Automatisierungs-Pakete</a>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {[
            ['🤖 KI-Telefonagent','Automatische Anrufannahme, Lead-Qualifizierung, Terminbuchung – 24/7'],
            ['⚡ n8n Workflows','Vertrieb und Recruiting automatisieren: CRM-Updates, E-Mail-Follow-ups, Lead-Scoring'],
            ['📊 KI-Reporting','Automatische Berichte, KPI-Dashboards und Echtzeit-Alerts ohne manuellen Aufwand'],
            ['🔗 Systemintegration','HubSpot, Salesforce, SAP, Pipedrive – wir verbinden Ihre bestehenden Tools mit KI'],
          ].map(([t,d]) => (
            <div key={t} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-semibold mb-2">{t}</h3>
              <p className="text-white/50 text-sm">{d}</p>
            </div>
          ))}
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Kostenloses KI-Automatisierungs-Beratungsgespräch</h2>
          <p className="text-white/60 mb-6">30 Minuten, kostenlos – wir analysieren wo KI in Ihrem Unternehmen den größten Impact hat.</p>
          <a href="/termin" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition inline-block">Beratung buchen</a>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context":"https://schema.org","@type":"Service","name":"KI Automatisierung Wiesbaden","provider":{"@type":"Organization","name":"RSG AI","url":"https://www.rsg-ai.de","address":{"@type":"PostalAddress","addressLocality":"Wiesbaden","addressCountry":"DE"}},"areaServed":{"@type":"City","name":"Wiesbaden"},"description":"KI-Automatisierungslösungen für Unternehmen in Wiesbaden: n8n Workflows, KI-Telefonagenten, Prozessautomatisierung"})}} />
      </section>
    <CitiesSection />
      </main>
  )
}
