# Aiko — KI-Sales-System

Stage 1 (Concierge + Auto-Closer bis 499 €). Voice-Closing und Outbound sind explizit NICHT enthalten — die kommen als separate, rechtlich abgesicherte Builds.

## Architektur

```
Browser-Widget (components/sales/aiko-widget.tsx)
   ↓ NDJSON-Stream
/api/sales-chat (Anthropic Claude Opus 4.8 + Tool-Use-Loop)
   ↓ Tools
┌─────────────────┬──────────────────┬─────────────────┬──────────────────┐
│ capture_lead    │ book_meeting     │ request_checkout│ escalate_to_human│
│ HubSpot Contact │ HubSpot Meeting  │ /api/checkout   │ Resend + HubSpot │
│ + Note          │ + pre-fill       │ → Stripe        │ Flag             │
└─────────────────┴──────────────────┴─────────────────┴──────────────────┘
```

## Env-Vars

Pflicht (bevor Aiko produktiv arbeitet):

| Var | Quelle |
|---|---|
| `ANTHROPIC_API_KEY` | console.anthropic.com |
| `HUBSPOT_PRIVATE_TOKEN` | HubSpot → Settings → Integrations → Private Apps |
| `RESEND_API_KEY` | resend.com (existiert vermutlich schon) |
| `STRIPE_SECRET_KEY` + `STRIPE_PRICE_*` (6 Stk.) | bereits gesetzt laut User |

Optional, aber empfohlen:

| Var | Was |
|---|---|
| `HUBSPOT_OWNER_ID` | Ricardos Owner-ID — neue Leads werden ihm zugeordnet. Via Setup-Endpoint auslesen. |
| `HUBSPOT_ADMIN_TOKEN` | Beliebiges Secret. Schützt `/api/sales/hubspot-config`. |

## HubSpot-Setup (einmalig)

1. Setze `HUBSPOT_ADMIN_TOKEN` in Vercel (z.B. `openssl rand -hex 32`).
2. Setze `HUBSPOT_PRIVATE_TOKEN` (Private-App-Token mit Scopes:
   `crm.objects.contacts.read/write`, `crm.objects.deals.read/write`,
   `crm.objects.owners.read`, `crm.schemas.deals.read`).
3. Ruf einmal auf:
   ```bash
   curl https://www.rsg-ai.de/api/sales/hubspot-config \
     -H "x-aiko-admin-token: $HUBSPOT_ADMIN_TOKEN"
   ```
4. Aus der Antwort: deine Owner-ID raussuchen → als `HUBSPOT_OWNER_ID` setzen.
5. Redeploy.

## Compliance — was passiert wann

| Schritt | Mechanik | Rechtsgrundlage |
|---|---|---|
| Widget öffnet | Banner „Du chattest mit einer KI" dauerhaft sichtbar | EU AI Act Art. 50 |
| Aikos erste Antwort | System-Prompt zwingt „Ich bin Aiko, eine KI von RSG AI" | EU AI Act Art. 50 |
| Vor Datenerhebung | Aiko fragt: „Einverstanden mit DSGVO-Verarbeitung?" | DSGVO Art. 13 + 6 (1) (a/b) |
| `capture_lead` | Nur bei `consent_confirmed=true` (Tool-Schema enforced) | DSGVO Art. 6 (1) (b) |
| `request_checkout` | Liefert nur Link — User klickt aktiv in Stripe | KEIN Art. 22 (keine vollautomatische Entscheidung) |
| Konversation | localStorage browserseitig, kein Server-Persist | Datenminimierung Art. 5 |
| Notiz in HubSpot | Aikos Zusammenfassung als Note am Contact | Vertragsanbahnung Art. 6 (1) (b) |
| Logs | Nur Status/Endpoint, NIE PII | Privacy by Design Art. 25 |

## Guardrails (im System-Prompt enforced)

- Scale-Tier → IMMER `escalate_to_human` oder `book_meeting`, niemals `request_checkout`
- Rabatte/Sonderkonditionen → IMMER `escalate_to_human`
- Juristische/steuerliche Fragen → IMMER `escalate_to_human` oder `book_meeting`
- Wettbewerber → respektvolle Abgrenzung, kein Bashing
- KI-Eigenschaft → bei direkter Frage klar offenlegen, nie verschleiern

## Was NICHT in Stage 1 ist

- **Voice-Agent (Marija) als Closer** — separater Build mit Anwalts-Review (§ 312j BGB, Widerrufsbelehrung am Telefon, Aufzeichnungs-Consent)
- **Outbound-Kampagnen** — § 7 UWG, mutmaßliche Einwilligung, Listen-Provenance
- **Lead-Scoring** — erst sinnvoll nach ≥ 100 Konversationen
- **Cross-Session-Memory** — aktuell nur localStorage je Browser
- **A/B-Testing Conversion-Rate** — Telemetrie kommt erst, wenn DSGVO-Cookie-Consent für Analytics liegt

## Maintenance

- System-Prompt = stabiler Cache-Prefix. JEDE Änderung invalidiert die Prompt-Cache-Ersparnis (~90 %). Bei größeren Updates: in Off-Hours releasen.
- Wissens-Quelle: `lib/sales/knowledge.ts` rendert aus `lib/content.ts`, `lib/pricing-voice.ts`, `lib/faq.ts`, `lib/case-studies.ts`. Preise ändern → nur dort, Aiko zieht's automatisch.
