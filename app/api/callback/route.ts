import { NextResponse } from 'next/server';
import { z } from 'zod';
import { normalizePhone } from '@/lib/phone';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Hero-Callback-API · ruft die Fonio Outbound API serverseitig auf.
 *
 *   Frontend sendet:   { firstName, phone, consent, website }
 *                      `website` ist der Honeypot — Bots füllen ihn,
 *                      Menschen sehen ihn nicht.
 *   Wir validieren,
 *   normalisieren die Telefonnummer auf E.164,
 *   prüfen ein simples In-Memory-Rate-Limit pro IP,
 *   und POSTen an die Fonio Outbound API.
 *
 * WICHTIG — Body-Format laut Fonio-Dashboard
 * (Assistent → Webhooks → Outbound API):
 *   - camelCase Felder: apiKey, fromNumber, toNumber, agentId
 *   - dynamische Variablen liegen im verschachtelten `context`-Objekt
 *   - die Variable `name` im context muss dem Placeholder {{name}}
 *     im Fonio-Agent-Prompt entsprechen
 *
 * Env-Vars (Vercel → Settings → Environment Variables):
 *   FONIO_API_URL     — https://app.fonio.ai/api/public/v1/outbound_call
 *   FONIO_API_KEY     — fonio_xxxx (NIEMALS im Repo)
 *   FONIO_FROM_NUMBER — importierte Outbound-Nummer (E.164), z.B. +493082683906
 *   FONIO_AGENT_ID    — der Fonio-Agent, der den Call führen soll
 */

const CallbackSchema = z.object({
  firstName: z.string().trim().min(1, 'Vorname fehlt').max(60),
  phone: z.string().trim().min(5).max(40),
  consent: z.literal(true, {
    message: 'Datenschutz-Einwilligung erforderlich',
  }),
  // Honeypot — must be empty/undefined for human submissions.
  website: z.string().max(0).optional(),
});

// Simple per-IP rate limit (best-effort, per serverless instance).
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 4;

function clientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]!.trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || b.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (b.count >= MAX_PER_WINDOW) return true;
  b.count += 1;
  return false;
}

export async function POST(req: Request) {
  // 1) Required server config — fail closed if missing.
  const apiUrl = process.env.FONIO_API_URL;
  const apiKey = process.env.FONIO_API_KEY;
  const fromNumber = process.env.FONIO_FROM_NUMBER;
  const agentId = process.env.FONIO_AGENT_ID;

  if (!apiUrl || !apiKey || !fromNumber || !agentId) {
    console.error('[callback] missing FONIO_* env vars');
    return NextResponse.json(
      {
        error:
          'Rückruf gerade nicht möglich — schreib uns kurz an hello@rsg-ai.de, wir melden uns persönlich.',
      },
      { status: 503 },
    );
  }

  // 2) Parse + validate input.
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const parsed = CallbackSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? 'Eingabe ungültig.';
    return NextResponse.json({ error: first }, { status: 400 });
  }

  // 3) Honeypot → fake success (don't leak the trap).
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // 4) Rate limit per IP.
  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { error: 'Zu viele Rückrufanfragen — versuch es in einer Minute nochmal.' },
      { status: 429 },
    );
  }

  // 5) Normalize phone to E.164.
  const e164 = normalizePhone(parsed.data.phone);
  if (!e164) {
    return NextResponse.json(
      { error: 'Telefonnummer ungültig — bitte im Format +49 30 1234567 eingeben.' },
      { status: 400 },
    );
  }

  // 6) Build Fonio payload (camelCase + context — exakt wie im Fonio-Dashboard).
  //    Variablen-Namen in `context` müssen mit dem Agent-Prompt übereinstimmen
  //    (im Fonio-Agent referenzierbar als {{name}}, {{source}}).
  const payload = {
    apiKey,
    fromNumber,
    toNumber: e164,
    agentId,
    context: {
      name: parsed.data.firstName,
      source: 'rsg-ai.de hero callback',
    },
  };

  // 7) Fire-and-respond. 8s timeout, defensive parsing.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        // Fonio akzeptiert den Key zusätzlich als Bearer-Header.
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      // Log gekürzt — keine PII / kein Key im Log.
      console.error(
        '[callback] fonio non-2xx',
        res.status,
        errText.slice(0, 300),
      );
      return NextResponse.json(
        {
          error:
            'Rückruf gerade nicht zustellbar. Probier es gleich nochmal — oder schreib uns an hello@rsg-ai.de.',
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const isAbort = err instanceof Error && err.name === 'AbortError';
    console.error('[callback] fonio fetch failed', isAbort ? 'timeout' : err);
    return NextResponse.json(
      {
        error:
          'Verbindung abgebrochen — probier es gleich nochmal oder schreib uns an hello@rsg-ai.de.',
      },
      { status: 504 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
