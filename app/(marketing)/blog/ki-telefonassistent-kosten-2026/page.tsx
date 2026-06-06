import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'KI Telefonassistent Kosten 2026: Was kostet ein KI Voice Agent?',
  description: 'Was kostet ein KI Telefonassistent? Alle Preismodelle, versteckte Kosten und ROI-Berechnung für 2026 im Überblick. Ab 199€/Monat bis Enterprise.',
  alternates: { canonical: 'https://rsg-ai.de/blog/ki-telefonassistent-kosten-2026' },
  openGraph: { type: 'article', title: 'KI Telefonassistent Kosten 2026' }
}
export default function KostenPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <article className="max-w-3xl mx-auto px-6 py-24">
        <div className="text-sm text-white/50 mb-4">Blog · 6. Juni 2026 · Ricardo Serrano</div>
        <h1 className="text-4xl font-bold mb-6">KI Telefonassistent Kosten 2026:<br/>Was kostet ein KI Voice Agent wirklich?</h1>
        <p className="text-xl text-white/70 mb-12">Die ehrliche Kostenrechnung — inklusive Setup, laufende Kosten, versteckte Gebühren und ROI-Berechnung für B2B-Unternehmen.</p>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4">Überblick: Preismodelle für KI Telefonassistenten</h2>
        <p className="text-white/70 mb-6">Es gibt grundsätzlich drei Preismodelle: Minutenbasiert, Abonnement und Enterprise-Lizenz. Welches sich für Ihr Unternehmen rechnet, hängt von Ihrem Anrufvolumen ab.</p>
        
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead><tr className="border-b border-white/20">
              <th className="text-left py-3 pr-6">Modell</th><th className="py-3 px-4">Preis</th><th className="py-3 px-4">Geeignet für</th>
            </tr></thead>
            <tbody className="text-white/70">
              {[
                ['Pay-per-Minute','€0,05–0,15/Min','< 500 Min/Monat'],
                ['Monatliches Abo','€199–€999/Mo','500–10.000 Min/Mo'],
                ['Jährliches Abo','€1.990–€9.900/Jahr','stabile Volumen'],
                ['Enterprise','auf Anfrage','> 50.000 Min/Mo'],
              ].map(([m,p,g])=>(
                <tr key={m} className="border-b border-white/10">
                  <td className="py-3 pr-6 text-white font-medium">{m}</td>
                  <td className="py-3 px-4 text-center">{p}</td>
                  <td className="py-3 px-4 text-center">{g}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Setup-Kosten: Was kommt einmalig dazu?</h2>
        <p className="text-white/70 mb-4">Viele Anbieter werben mit niedrigen Monatspreisen, verschweigen aber die Einrichtungsgebühr. Diese umfasst: Prompt-Entwicklung, Integration ins CRM, Testläufe und Onboarding.</p>
        <ul className="space-y-2 text-white/70 mb-8">
          <li>✓ Self-Service (z.B. VAPI): €0 Setup, aber 40–80h Eigenaufwand</li>
          <li>✓ Teilmanaged (z.B. Synthflow): €500–2.000 Setup</li>
          <li>✓ Vollmanaged (z.B. RSG AI): €490–990 Setup, kein IT-Aufwand</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">ROI-Rechnung: Wann lohnt sich ein KI Telefonassistent?</h2>
        <p className="text-white/70 mb-4">Ein Vollzeit-Telefonist kostet in Deutschland ca. €35.000–45.000 brutto/Jahr. Ein KI-Telefonassistent im Team-Paket kostet €5.988/Jahr. Der Break-even liegt bei ca. 200 qualifizierten Anrufen/Monat.</p>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h3 className="font-semibold mb-3">Beispielrechnung: 500 Anrufe/Monat</h3>
          <div className="space-y-2 text-sm text-white/70">
            <div className="flex justify-between"><span>Mitarbeiter (0,5 FTE)</span><span>€22.500/Jahr</span></div>
            <div className="flex justify-between"><span>RSG AI Team-Paket</span><span>€5.988/Jahr</span></div>
            <div className="flex justify-between border-t border-white/10 pt-2 text-white font-semibold"><span>Ersparnis</span><span>€16.512/Jahr</span></div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Versteckte Kosten: Worauf Sie achten sollten</h2>
        <ul className="space-y-3 text-white/70 mb-8">
          <li>⚠️ <strong className="text-white">Minutenlimits:</strong> Manche Tarife kappen bei 1.000 Min/Monat — dann werden Zusatzminuten teuer</li>
          <li>⚠️ <strong className="text-white">Integrationskosten:</strong> CRM-Anbindung kostet extra wenn nicht im Paket enthalten</li>
          <li>⚠️ <strong className="text-white">LLM-Kosten:</strong> Bei API-first Anbietern (VAPI) kommen GPT-4 Kosten obendrauf</li>
          <li>⚠️ <strong className="text-white">Telefonnummern:</strong> Deutsche Nummern kosten €5–15/Monat extra</li>
        </ul>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-3">Kostenlose Beratung für Ihr Unternehmen</h3>
          <p className="text-white/60 mb-6">Wir berechnen Ihren konkreten ROI in 30 Minuten – kostenlos und unverbindlich.</p>
          <a href="/termin" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition inline-block">Beratung anfragen</a>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":"KI Telefonassistent Kosten 2026","author":{"@type":"Person","name":"Ricardo Serrano"},"datePublished":"2026-06-06","publisher":{"@type":"Organization","name":"RSG AI","url":"https://rsg-ai.de"}})}} />
      </article>
    </main>
  )
}
