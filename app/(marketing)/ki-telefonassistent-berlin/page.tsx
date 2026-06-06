import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'KI-Telefonassistent Berlin | RSG AI – DSGVO-konform & 24/7',
  description: 'KI-Telefonassistent für Berliner Unternehmen. Automatisch Anrufe annehmen, Leads qualifizieren, Termine buchen. Ab 199€/Monat. Jetzt Demo anfragen.',
  keywords: ['KI Telefonassistent Berlin', 'AI Voice Agent Berlin', 'Automatischer Telefonassistent Berlin', 'KI Kundenservice Berlin', 'KI Agent Berlin'],
  alternates: { canonical: 'https://rsg-ai.de/ki-telefonassistent-berlin' }
}
export default function BerlinPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-sm text-white/50 mb-4">Berlin · Deutschland</div>
        <h1 className="text-5xl font-bold mb-6">KI-Telefonassistent<br /><span className="text-white/60">für Berliner Unternehmen</span></h1>
        <p className="text-xl text-white/70 mb-8 max-w-2xl">Ihr KI-Telefonassistent in Berlin: Nimmt Anrufe entgegen, qualifiziert Leads und bucht Termine – vollautomatisch, DSGVO-konform, 24/7. Kein Headcount nötig.</p>
        <div className="flex gap-4 flex-wrap">
          <a href="/termin" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition">Demo anfragen</a>
          <a href="/#preise" className="border border-white/20 text-white px-8 py-4 rounded-full hover:border-white/60 transition">Preise ansehen</a>
        </div>
        <div className="mt-16 grid grid-cols-3 gap-8 text-center">
          {[['< 2 Wochen','bis Go-Live'],['24/7','Verfügbarkeit'],['DSGVO','konform']].map(([s,l])=>(<div key={l}><div className="text-3xl font-bold mb-2">{s}</div><div className="text-white/50 text-sm">{l}</div></div>))}
        </div>
        <div className="mt-16"><h2 className="text-2xl font-semibold mb-6">Warum Berliner Unternehmen RSG AI wählen</h2>
        <ul className="space-y-4 text-white/70">
          <li>✓ Deployment ohne IT-Aufwand – wir richten alles ein</li>
          <li>✓ Skalierbar: von 1 bis 1.000 parallele Anrufe</li>
          <li>✓ Integriert in CRM (HubSpot, Salesforce, Pipedrive)</li>
          <li>✓ Berliner Startup-Mindset: schnell, direkt, messbar</li>
        </ul></div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"RSG AI Berlin","url":"https://rsg-ai.de/ki-telefonassistent-berlin","areaServed":{"@type":"City","name":"Berlin"},"description":"KI-Telefonassistent für Berliner Unternehmen"})}} />
      </section>
    </main>
  )
}
