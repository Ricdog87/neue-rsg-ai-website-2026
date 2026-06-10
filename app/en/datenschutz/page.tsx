import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/legal-layout';
import { site } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Privacy Policy (overview)',
  description: 'English overview of the privacy policy of RSG Recruiting Solutions Group GmbH (RSG AI). The German version is legally binding.',
  alternates: {
    canonical: '/en/datenschutz',
    languages: { 'de-DE': '/datenschutz', en: '/en/datenschutz' },
  },
  robots: { index: true, follow: true },
};

export default function EnPrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updatedAt="June 2026">
      <p>
        <em>This is a short English overview for international visitors. The legally binding privacy policy is the{' '}
        <a href="/datenschutz">German version (Datenschutzerklärung)</a>.</em>
      </p>

      <h2>Controller</h2>
      <p>
        {site.legal.company}, Am Heiligenhaus 9, 65207 Wiesbaden, Germany.
        <br />
        Email: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
      </p>

      <h2>How we handle your data</h2>
      <p>
        We process personal data in accordance with the EU General Data Protection Regulation (GDPR). Hosting takes place exclusively on servers in Germany (Nuremberg). Parts of the AI voice processing run via certified EU/US services under the EU-US Data Privacy Framework or standard contractual clauses. We do not store conversation data beyond what is required for processing, and we do not train on your data. A data processing agreement (DPA) is available.
      </p>

      <h2>Your rights</h2>
      <p>
        Under the GDPR you have the right to access, rectification, erasure, restriction of processing, data portability and objection. To exercise any of these rights, contact us at <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. You also have the right to lodge a complaint with a supervisory authority.
      </p>

      <h2>Cookies &amp; analytics</h2>
      <p>
        We use privacy-friendly analytics and only set non-essential cookies with your consent. You can adjust your choices at any time via the cookie settings.
      </p>

      <p>
        For the complete, legally binding details please refer to the{' '}
        <a href="/datenschutz">German privacy policy</a>.
      </p>
    </LegalLayout>
  );
}
