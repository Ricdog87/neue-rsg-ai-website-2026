import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/legal-layout';
import { site } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Imprint',
  description: 'Imprint and provider identification of RSG Recruiting Solutions Group GmbH (RSG AI).',
  alternates: {
    canonical: '/en/impressum',
    languages: { 'de-DE': '/impressum', en: '/en/impressum' },
  },
  robots: { index: true, follow: true },
};

const vatId = 'DE458027073';

export default function EnImprintPage() {
  return (
    <LegalLayout title="Imprint" updatedAt="June 2026">
      <p>
        <em>Courtesy English translation. The legally authoritative version is the{' '}
        <a href="/impressum">German Imprint</a>.</em>
      </p>
      <p>
        <strong>{site.legal.brandName}</strong> is a brand of the company named below. This website is operated by:
      </p>

      <h2>Provider (§ 5 DDG)</h2>
      <p>
        <strong>{site.legal.company}</strong>
        <br />
        Am Heiligenhaus 9
        <br />
        65207 Wiesbaden, Germany
      </p>

      <h2>Represented by</h2>
      <p>Ricardo Serrano, Managing Director</p>

      <h2>Commercial register</h2>
      <p>
        Registered in the commercial register.
        <br />
        Register court: Wiesbaden Local Court (Amtsgericht Wiesbaden)
        <br />
        Register number: {site.legal.hrb}
      </p>

      <h2>Contact</h2>
      <p>
        Phone: <a href={site.contact.phoneHref}>{site.contact.phone}</a>
        <br />
        Email: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
      </p>

      <h2>VAT ID</h2>
      <p>
        VAT identification number pursuant to § 27 a German VAT Act:
        <br />
        {vatId}
      </p>

      <h2>Consumer information</h2>
      <p>
        RSG AI’s services are aimed exclusively at businesses. The European Commission provides a platform for online dispute resolution (ODR):{' '}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr/
        </a>
        . We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.
      </p>

      <h2>Liability for content &amp; links</h2>
      <p>
        As a service provider we are responsible for our own content on these pages under the general laws. However, we are not obliged to monitor third-party information transmitted or stored on our platform. Our site contains links to external third-party websites over whose content we have no influence; the respective provider or operator is always responsible for the content of linked pages.
      </p>

      <h2>Copyright</h2>
      <p>
        The content and works created by the site operators on these pages are subject to German copyright law. Reproduction, editing, distribution and any kind of use beyond the limits of copyright require the written consent of the respective author or creator.
      </p>
    </LegalLayout>
  );
}
