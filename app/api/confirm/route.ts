import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { Resend } from 'resend';
import { site } from '@/lib/content';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function verify(token: string, secret: string): string | null {
  const [b64, sig] = token.split('.');
  if (!b64 || !sig) return null;
  const expected = crypto.createHmac('sha256', secret).update(b64).digest('hex');
  const a = Buffer.from(sig, 'hex');
  const b = Buffer.from(expected, 'hex');
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    return Buffer.from(b64, 'base64url').toString('utf8');
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const secret = process.env.NEWSLETTER_SECRET;
  const url = new URL(req.url);
  const token = url.searchParams.get('token') ?? '';

  if (!apiKey || !secret) {
    return NextResponse.redirect(`${site.url}/${site.newsletter.leadMagnet}?status=unavailable`);
  }

  const email = verify(token, secret);
  if (!email) {
    return NextResponse.redirect(`${site.url}/${site.newsletter.leadMagnet}?status=invalid`);
  }

  const resend = new Resend(apiKey);
  const checklistUrl = `${site.url}/${site.newsletter.leadMagnet}`;

  try {
    await resend.emails.send({
      from: site.newsletter.fromEmail,
      to: email,
      subject: 'Da ist sie — deine ROI-Checkliste · RSG AI',
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
            <td style="padding:40px;">
              <div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#a855f7;">Bestätigt ✓</div>
              <h1 style="margin:24px 0 12px 0;font-size:28px;line-height:1.15;font-weight:500;letter-spacing:-0.02em;color:#ffffff;">Hier ist deine ROI-Checkliste.</h1>
              <p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;color:#a5a5b0;">
                12 harte Fragen aus echten Discovery-Calls. Druck sie aus, geh sie mit deinem Team durch — und falls die Antworten unbequem sind, weißt du, wo wir helfen können.
              </p>
              <a href="${checklistUrl}" style="display:inline-block;background:#a855f7;color:#ffffff;font-weight:500;text-decoration:none;padding:14px 28px;border-radius:999px;font-size:15px;">
                Checkliste öffnen
              </a>
              <p style="margin:32px 0 0 0;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;color:#5a5a66;">
                PS: Wenn du nach Frage 7 schon weißt, dass du Hilfe brauchst — <a href="${site.url}${site.cta.meetingUrl}" style="color:#a855f7;">buch dir 20 Minuten</a>.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim(),
    });
  } catch (err) {
    console.error('[confirm] resend failed', err);
  }

  return NextResponse.redirect(`${site.url}/${site.newsletter.leadMagnet}?status=confirmed`);
}
