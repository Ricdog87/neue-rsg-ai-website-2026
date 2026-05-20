import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import crypto from 'node:crypto';
import { site } from '@/lib/content';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const subscribeSchema = z.object({
  email: z.string().trim().toLowerCase().email('Bitte eine gültige E-Mail-Adresse.'),
  // Honeypot — bots fill this, humans don't.
  ['company-name']: z.string().optional(),
});

/**
 * Issue a signed double-opt-in token: <emailB64>.<sigHex>
 * The /api/confirm route verifies the signature server-side.
 */
function signToken(email: string, secret: string) {
  const b64 = Buffer.from(email).toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(b64).digest('hex');
  return `${b64}.${sig}`;
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const secret = process.env.NEWSLETTER_SECRET;

  if (!apiKey || !secret) {
    return NextResponse.json(
      { error: 'Newsletter ist gerade nicht verfügbar — probier bitte LinkedIn.' },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Ungültiger Request.' }, { status: 400 });
  }

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Eingabe ungültig.' },
      { status: 400 },
    );
  }

  // Honeypot tripped → fake-success, don't leak the trap.
  if (parsed.data['company-name']?.trim()) {
    return NextResponse.json({ message: 'Check dein Postfach.' }, { status: 200 });
  }

  const { email } = parsed.data;
  const token = signToken(email, secret);
  const confirmUrl = `${site.url}/api/confirm?token=${encodeURIComponent(token)}`;

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: site.newsletter.fromEmail,
      to: email,
      subject: 'Bestätige dein Abo — RSG AI · ROI-Checkliste',
      replyTo: site.contact.email,
      html: `
<!doctype html>
<html lang="de">
<body style="margin:0;padding:0;background:#03020c;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,sans-serif;color:#e8e8ea;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#03020c;padding:48px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#0a0a12;border:1px solid #1d1d28;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:40px 40px 8px 40px;">
              <div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#a855f7;">RSG AI · Werkstatt</div>
              <h1 style="margin:24px 0 12px 0;font-size:28px;line-height:1.15;font-weight:500;letter-spacing:-0.02em;color:#ffffff;">Ein Klick noch — dann gehört die Checkliste dir.</h1>
              <p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;color:#a5a5b0;">
                Wir verschicken nichts ohne deine Bestätigung (Double-Opt-In, DSGVO). Klick einmal — und du bekommst sofort den Link zur ROI-Checkliste sowie unseren wöchentlichen Brief.
              </p>
              <a href="${confirmUrl}" style="display:inline-block;background:#a855f7;color:#ffffff;font-weight:500;text-decoration:none;padding:14px 28px;border-radius:999px;font-size:15px;">
                Anmeldung bestätigen
              </a>
              <p style="margin:32px 0 0 0;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;line-height:1.6;color:#5a5a66;">
                Falls der Button nicht funktioniert, kopier diesen Link in deinen Browser:<br />
                <span style="color:#a5a5b0;word-break:break-all;">${confirmUrl}</span>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px 32px 40px;border-top:1px solid #1d1d28;">
              <p style="margin:0;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;line-height:1.6;color:#5a5a66;">
                Du hast diese E-Mail erhalten, weil ${email} sich auf rsg-ai.de für die ROI-Checkliste angemeldet hat. War das nicht du? Ignorier die Mail einfach — wir speichern erst nach deiner Bestätigung.
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:24px 0 0 0;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10px;color:#5a5a66;">
          ${site.legal.company} · ${site.contact.city}
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`.trim(),
    });

    return NextResponse.json(
      { message: 'Check dein Postfach — bestätige den Link, dann fliegt die Checkliste raus.' },
      { status: 200 },
    );
  } catch (err) {
    console.error('[subscribe] resend failed', err);
    return NextResponse.json(
      { error: 'Versand fehlgeschlagen. Versuch es gleich noch einmal oder schreib uns direkt.' },
      { status: 502 },
    );
  }
}
