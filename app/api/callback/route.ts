import { NextResponse } from 'next/server';

/**
 * Callback-Request — die KI-Telefonassistent (oder Ricardo persönlich)
 * ruft den Lead innerhalb von ~5 Min zurück.
 *
 * MVP: Wir validieren die Nummer, loggen sie und senden eine
 * Benachrichtigung (Telegram-Webhook, Slack-Webhook ODER Resend-Mail).
 * Für die ENV-Vars:
 *   CALLBACK_NOTIFY_WEBHOOK  (Slack-/Telegram-Webhook-URL, optional)
 *   CALLBACK_NOTIFY_EMAIL    (Fallback-Empfänger, default: hello@rsg-ai.de)
 *   RESEND_API_KEY           (für Mail-Versand, sofern E-Mail-Pfad)
 *
 * Body: { phone: string }
 */

type Body = { phone?: string };

export async function POST(req: Request) {
  const { phone } = (await req.json().catch(() => ({}))) as Body;

  if (!phone || !/^[+0-9 ()\-]{6,}$/.test(phone)) {
    return NextResponse.json({ error: 'invalid_phone' }, { status: 400 });
  }

  const normalized = phone.replace(/\s+/g, '');
  const webhook = process.env.CALLBACK_NOTIFY_WEBHOOK;
  const fallbackEmail = process.env.CALLBACK_NOTIFY_EMAIL ?? 'hello@rsg-ai.de';

  // 1) Slack/Telegram-Webhook bevorzugt (sub-second-Latency)
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          text: `📞 Neuer Callback-Request: ${normalized}`,
          source: 'rsg-ai.de · voice-section',
          ts: new Date().toISOString(),
        }),
      });
    } catch {
      // notification failed but request is still valid — log + continue
    }
  }

  // 2) Resend-Fallback nur, wenn kein Webhook konfiguriert
  if (!webhook && process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'hello@rsg-ai.de',
        to: fallbackEmail,
        subject: `Callback-Request · ${normalized}`,
        text: `Neuer Callback-Request via rsg-ai.de Voice-Section.\n\nNummer: ${normalized}\nZeit: ${new Date().toISOString()}`,
      });
    } catch {
      // ignore
    }
  }

  return NextResponse.json({ ok: true });
}
