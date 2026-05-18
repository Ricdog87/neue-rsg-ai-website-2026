import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Impressum | RSG AI",
  description: "Impressum der RSG Recruiting Solutions Group GmbH",
}

export default function ImpressumPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-10 text-4xl font-bold">Impressum</h1>
      <section className="space-y-8 text-base leading-relaxed">
        <div>
          <h2 className="mb-3 text-xl font-semibold">Angaben gemäß § 5 TMG</h2>
          <p>RSG Recruiting Solutions Group GmbH<br />Am Heiligenhaus 9<br />65207 Wiesbaden<br />Deutschland</p>
        </div>
        <div>
          <h2 className="mb-3 text-xl font-semibold">Marke</h2>
          <p>RSG AI ist eine Marke der RSG Recruiting Solutions Group GmbH.</p>
        </div>
        <div>
          <h2 className="mb-3 text-xl font-semibold">Vertreten durch</h2>
          <p>Ricardo Serrano, Geschäftsführer</p>
        </div>
        <div>
          <h2 className="mb-3 text-xl font-semibold">Kontakt</h2>
          <p>Telefon: +49 176 60772556<br />E-Mail: <a href="mailto:info@recruiting-sg.de" className="text-purple-600 underline">info@recruiting-sg.de</a></p>
        </div>
        <div>
          <h2 className="mb-3 text-xl font-semibold">Registereintrag</h2>
          <p>Eintragung im Handelsregister<br />Registergericht: Amtsgericht Wiesbaden<br />Registernummer: HRB 35951</p>
        </div>
        <div>
          <h2 className="mb-3 text-xl font-semibold">Umsatzsteuer-ID</h2>
          <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />DE458027073</p>
        </div>
        <div>
          <h2 className="mb-3 text-xl font-semibold">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>Ricardo Serrano<br />Am Heiligenhaus 9<br />65207 Wiesbaden</p>
        </div>
        <div>
          <h2 className="mb-3 text-xl font-semibold">Haftungsausschluss</h2>
          <p className="text-sm">Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.</p>
        </div>
      </section>
    </main>
  )
}
