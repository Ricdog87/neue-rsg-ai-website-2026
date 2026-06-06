import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'KI Telefonassistent für Handwerksbetriebe 2026 | RSG AI',
  description: 'Wie Handwerksbetriebe mit KI-Telefon-Agenten Anfragen automatisch bearbeiten, Termine buchen und nie wieder Anrufe verpassen. Praxisbeispiele + Kosten.',
  alternates: { canonical: 'https://rsg-ai.de/blog/ki-telefonassistent-handwerk' },
  openGraph: { type: 'article', title: 'KI Telefonassistent für Handwerk 2026' }
}
export default function HandwerkPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <article className="max-w-3xl mx-auto px-6 py-24">
        <div className="text-sm text-white/50 mb-4">Blog · 6. Juni 2026 · Ricardo Serrano</div>
        <h1 className="text-4xl font-bold mb-6">KI Telefonassistent für Handwerksbetriebe:<br/>Nie wieder Anrufe verpassen</h1>
        <p className="text-xl text-white/70 mb-12">Handwerker sind selten am Schreibtisch. Gleichzeitig kosten verpasste Anrufe täglich neue Aufträge. KI-Telefon-Agenten lösen genau dieses Problem — rund um die Uhr, ohne Sekretariat.</p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Das Problem: Verpasste Anrufe = verlorene Aufträge</h2>
        <p className="text-white/70 mb-6">Laut Bitkom rufen 62% der Kunden nur einmal an und wechseln zum Konkurrenten wenn niemand abnimmt. Für Handwerksbetriebe bedeutet das: Jeder verpasste Anruf kostet durchschnittlich €200–500 Auftragsvolumen.</p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Was ein KI Telefonassistent für Handwerker tut</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {[
            ['📞 Anrufe entgegennehmen','Automatisch rund um die Uhr — auch wenn Sie auf der Baustelle sind'],
            ['📅 Termine buchen','Direkt in Ihren Kalender — ohne Rückruf'],
            ['📋 Auftragsinfos erfassen','Adresse, Schadenbeschreibung, Dringlichkeit — alles strukturiert'],
            ['🔄 Rückruf organisieren','Wichtige Anrufe werden priorisiert und weitergeleitet'],
          ].map(([t,d])=>(
            <div key={t} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="font-semibold mb-2">{t}</h3>
              <p className="text-white/50 text-sm">{d}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Praxisbeispiel: Elektriker in Frankfurt</h2>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10">
          <p className="text-white/70 italic mb-4">"Früher haben wir täglich 3–5 Anrufe verpasst wenn wir auf Montage waren. Seit wir den KI-Agenten haben, wird jeder Anruf entgegengenommen und das Anliegen erfasst. Wir buchen damit jeden Monat 4–6 Aufträge mehr."</p>
          <p className="text-sm text-white/40">— Elektriker-Betrieb, Frankfurt, 8 Mitarbeiter</p>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Kosten vs. Nutzen für Handwerksbetriebe</h2>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-white/70"><span>RSG AI Solo-Paket</span><span>€199/Mo</span></div>
            <div className="flex justify-between text-white/70"><span>Ø 4 zusätzliche Aufträge/Mo</span><span>€800–2.000 Mehreinnahmen</span></div>
            <div className="flex justify-between border-t border-white/10 pt-2 text-white font-semibold"><span>ROI</span><span>300–900%</span></div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-3">KI-Agent für Ihren Betrieb</h3>
          <p className="text-white/60 mb-6">Setup in unter 2 Wochen. Kein IT-Aufwand. Demo kostenlos testen.</p>
          <a href="/termin" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition inline-block">Demo anfragen</a>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":"KI Telefonassistent für Handwerksbetriebe 2026","author":{"@type":"Person","name":"Ricardo Serrano"},"datePublished":"2026-06-06","publisher":{"@type":"Organization","name":"RSG AI","url":"https://rsg-ai.de"}})}} />
      </article>
    </main>
  )
}
