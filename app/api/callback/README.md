# `/api/callback` · Hero-Live-Callback (Fonio Outbound)

Bindet das Hero-Callback-Formular (`components/sections/hero-callback-card.tsx`)
an die Fonio Outbound API an. Der Server validiert, normalisiert die
Telefonnummer auf E.164, drosselt pro IP und ruft Fonio mit dem API-Key
aus der Server-Env auf — der Key landet **nie** im Client-Bundle.

## Environment Variables (Vercel → Settings → Environment Variables)

| Key                 | Beispiel                                  | Pflicht |
|---------------------|-------------------------------------------|---------|
| `FONIO_API_URL`     | `https://api.fonio.ai/v1/outbound/start`  | ✅       |
| `FONIO_API_KEY`     | `fonio_xxx…`                              | ✅       |
| `FONIO_FROM_NUMBER` | `+493082683906`                           | ✅       |
| `FONIO_AGENT_ID`    | `agent_abc123` (aus dem Fonio-Dashboard)  | ✅       |

Setzen für **Production** und **Preview** Environment.
Nach dem Setzen einmal redeployen, damit die neuen Vars greifen.

> ⚠️ **Key niemals committen.** Wenn er irgendwo durchsickert
> (Chat-Log, Slack, PR-Beschreibung), im Fonio-Dashboard rotieren.

## Request-Shape

`POST /api/callback`

```json
{
  "firstName": "Max",
  "phone": "+49 30 826 83906",
  "consent": true,
  "website": ""
}
```

`website` ist ein **Honeypot** — Bots füllen ihn, Menschen nicht.
Wenn er gefüllt ist, antwortet die Route mit `{ok:true}`, ohne Fonio
zu rufen (no-op success).

## Response-Shape

Erfolg:
```json
{ "ok": true }
```

Fehler (HTTP 400 / 429 / 502 / 503 / 504):
```json
{ "error": "Telefonnummer ungültig — bitte im Format +49 30 1234567 eingeben." }
```

## Fonio-Outbound-Payload (was Server an Fonio sendet)

```ts
{
  api_key: process.env.FONIO_API_KEY,
  from_number: process.env.FONIO_FROM_NUMBER,
  to_number: phoneE164,            // normalisiert
  agent_id: process.env.FONIO_AGENT_ID,
  first_name: firstName,           // → {{first_name}} im Agent-Prompt
  source: 'rsg-ai.de hero callback' // → {{source}} im Agent-Prompt
}
```

> Wenn du im Fonio-Agent-Prompt `{{first_name}}` und `{{source}}`
> referenzierst, kommen die Werte automatisch an. Neue Variablen?
> In `app/api/callback/route.ts` ergänzen.

Header zusätzlich:
```
authorization: Bearer ${FONIO_API_KEY}
```
(falls Fonio den Key als Bearer-Header erwartet — der Key wird parallel
im Body geliefert, das ist Fonio's dokumentierter Weg).

## Sicherheits- & Quality-Defaults

- **Schema-Validierung** mit `zod`
- **Telefonnummer-Normalisierung** auf E.164 (`lib/phone.ts`)
- **Rate-Limit** in-memory: 4 Calls / Minute / IP (best-effort, per Instance)
- **Honeypot** `website` für Bot-Schutz
- **Timeout** 8 s auf den Fonio-Fetch
- **Logging** ohne PII / ohne API-Key
- **Fail-closed**: wenn Env-Vars fehlen → 503 + freundliche Mail-Empfehlung

## Smoke-Test

```bash
curl -X POST https://www.rsg-ai.de/api/callback \
  -H "content-type: application/json" \
  -d '{"firstName":"Max","phone":"+49 30 826 83906","consent":true,"website":""}'
```

Bei korrektem Setup: Anruf an die getestete Nummer innerhalb von Sekunden,
HTTP 200 mit `{"ok":true}`.
