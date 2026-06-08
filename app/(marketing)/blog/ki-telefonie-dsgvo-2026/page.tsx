import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'KI-Telefonie und DSGVO 2026: Was Unternehmen beachten müssen',
  description: 'Ist KI-Telefonie DSGVO-konform? Alles zu Transparenzpflichten, Kaltakquise-Recht, Widerspruchsrecht und DSGVO-konformem Einsatz von KI-Telefon-Agenten.',
  alternates: { canonical: 'https://www.rsg-ai.de/blog/ki-telefonie-dsgvo-2026' },
  openGraph: { type: 'article', title: 'KI-Telefonie und DSGVO 2026' }
}
export default function DsgvoPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <article className="max-w-3xl mx-auto px-6 py-24">
        <div className="text-sm text-white/50 mb-4">Blog · 6. Juni 2026 · Ricardo Serrano</div>
        <h1 className="text-4xl font-bold mb-6">KI-Telefonie und DSGVO 2026:<br/>Was Ihr Unternehmen beachten muss</h1>
        <p className="text-xl text-white/70 mb-12">KI-Telefon-Agenten sind rechtlich erlaubt — aber es gibt klare DSGVO-Anforderungen. Dieser Leitfaden erklärt was erlaubt ist und worauf Sie achten müssen.</p>

        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-semibold text-green-400 mb-2">✓ Kurzantwort: Ja, DSGVO-konform möglich</h2>
          <p className="text-white/70 text-sm">KI-Telefon-Agenten sind in Deutschland legal einsetzbar, wenn: (1) KI-Identität transparent kommuniziert wird, (2) B2B-Kaltakquise mit mutmaßlicher Einwilligung erfolgt, (3) DSGVO-Widerspruchsrecht technisch umgesetzt ist und (4) Daten auf EU-Servern verarbeitet werden.</p>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Transparenzpflicht: Muss der Agent sich als KI zu erkennen geben?</h2>
        <p className="text-white/70 mb-6">§5 UWG (Gesetz gegen unlauteren Wettbewerb) verbietet irreführende Geschäftspraktiken. Wenn ein Anrufer direkt fragt „Spreche ich mit einem echten Menschen?" muss der KI-Agent wahrheitsgemäß antworten. Proaktive Offenlegung am Anfang jeden Gesprächs ist Best Practice und eliminiert das Risiko vollständig.</p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">B2B-Kaltakquise: Was ist erlaubt?</h2>
        <p className="text-white/70 mb-4">§7 Abs. 2 Nr. 2 UWG erlaubt B2B-Telefonwerbung bei mutmaßlicher Einwilligung. Diese liegt vor wenn eine sachliche Nähe zwischen Angebot und Tätigkeit des Angerufenen besteht.</p>
        <div className="space-y-3 text-white/70 mb-8">
          <div className="flex gap-3"><span className="text-green-400">✓</span><span>HR-Software Anbieter ruft HR-Leiter an → <strong className="text-white">erlaubt</strong></span></div>
          <div className="flex gap-3"><span className="text-green-400">✓</span><span>Recruiting-Agentur ruft Geschäftsführer an → <strong className="text-white">erlaubt</strong></span></div>
          <div className="flex gap-3"><span className="text-red-400">✗</span><span>Willkürliche Kaltakquise ohne Bezug → <strong className="text-white">verboten</strong></span></div>
          <div className="flex gap-3"><span className="text-red-400">✗</span><span>Privatpersonen anrufen → <strong className="text-white">nur mit expliziter Einwilligung</strong></span></div>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4">DSGVO-Checkliste für KI-Telefon-Agenten</h2>
        <ul className="space-y-3 text-white/70 mb-10">
          {['KI-Identität wird auf Nachfrage sofort offengelegt','Widerspruchsrecht (§21 DSGVO) ist technisch umgesetzt (Do-Not-Call-Flag)','AVV-Vertrag mit KI-Anbieter abgeschlossen','Datenverarbeitung auf EU-Servern (keine US-Übertragung)','Rechtsgrundlage dokumentiert (Art. 6 Abs. 1 lit. f DSGVO — berechtigtes Interesse)','Datenschutzerklärung erwähnt KI-Telefonie','Löschkonzept für Gesprächsdaten vorhanden'].map(item=>(
            <li key={item} className="flex gap-3"><span className="text-green-400 mt-1">☐</span><span>{item}</span></li>
          ))}
        </ul>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-3">RSG AI: DSGVO-konform by Design</h3>
          <p className="text-white/60 mb-6">Alle RSG AI Agenten sind mit DSGVO-konformer Konfiguration ausgeliefert. AVV-Vertrag inklusive.</p>
          <a href="/termin" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition inline-block">Demo anfragen</a>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":"KI-Telefonie und DSGVO 2026","author":{"@type":"Person","name":"Ricardo Serrano"},"datePublished":"2026-06-06","publisher":{"@type":"Organization","name":"RSG AI","url":"https://www.rsg-ai.de"}})}} />
      </article>
    </main>
  )
}
