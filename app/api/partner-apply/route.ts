import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const Schema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  region: z.string().max(100).optional(),
  gewerbe: z.enum(['ja', 'nein', 'in-planung']).optional(),
  vertriebserfahrung: z.string().min(10).max(500),
  nachricht: z.string().max(1000).optional(),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'UngÃ¸ltige Anfrage.' }, { status: 400 });
  }

  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Bitte prÃ¼fe deine Eingaben.' },
      { status: 422 },
    );
  }

  const data = parsed.data;
  let saved = false;

  // Strategy 1: Supabase REST
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && serviceKey) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/partner_applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          full_name: data.fullName,
          email: data.email,
          phone: data.phone ?? null,
          region: data.region ?? null,
          gewerbe: data.gewerbe ?? null,
          vertriebserfahrung: data.vertriebserfahrung,
          nachricht: data.nachricht ?? null,
        }),
      });
      if (res.ok || res.status === 201) saved = true;
    } catch {
      // fall through to email
    }
  }

  // Strategy 2: Resend email fallback
  if (!saved) {
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: 'partner-form@rsg-ai.de',
            to: 'hello@rsg-ai.de',
            subject: `Neue Partner-Bewerbung: ${data.fullName}`,
            text: [
              `Name: ${data.fullName}`,
              `E-Mail: ${data.email}`,
              `Telefon: ${data.phone ?? 'â'}`,
              `Region: ${data.region ?? 'â'}`,
              `Gewerbe: ${data.gewerbe ?? 'â'}`,
              `Vertriebserfahrung: ${data.vertriebserfahrung}`,
              `Nachricht: ${data.nachricht ?? 'â'}`,
            ].join('\n'),
          }),
        });
        saved = true;
      } catch {
        // both strategies failed
      }
    }
  }

  if (!saved) {
    return NextResponse.json(
      { error: 'Serverfehler â bitte versuche es spÃ¤ter erneut.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
