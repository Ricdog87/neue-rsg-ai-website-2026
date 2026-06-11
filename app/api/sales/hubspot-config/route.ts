import { NextResponse } from 'next/server';
import { listOwners, listDealPipelines } from '@/lib/sales/hubspot';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Read-only Setup-Helper: liest HubSpot-Owners + Deal-Pipelines aus,
 * damit Ricardo die richtige `HUBSPOT_OWNER_ID` (für sich selbst) und
 * Pipeline-Stage-ID (für initiale Lead-Stufe) in Vercel-Env setzen kann.
 *
 * Schutz: Header `x-aiko-admin-token` muss `HUBSPOT_ADMIN_TOKEN` aus
 * den Env-Vars matchen (eigenes Secret, NICHT der HubSpot-Token).
 * Setze in Vercel z.B. `HUBSPOT_ADMIN_TOKEN=<beliebiger long random>`
 * und ruf einmal auf:
 *
 *   curl https://www.rsg-ai.de/api/sales/hubspot-config \
 *     -H "x-aiko-admin-token: <dein-secret>"
 *
 * Antwort enthält:
 *   - owners[]: id, email, firstName, lastName
 *   - pipelines[]: id, label, stages[]
 *
 * Aus dem Response wählst du:
 *   HUBSPOT_OWNER_ID = (deine eigene Owner-ID)
 *   (Pipeline-Stages werden vom Stripe-Webhook aktuell nicht
 *    automatisch gesetzt — Stage 2.)
 */
export async function GET(req: Request) {
  const expected = process.env.HUBSPOT_ADMIN_TOKEN;
  if (!expected) {
    return NextResponse.json(
      { error: 'HUBSPOT_ADMIN_TOKEN ist nicht gesetzt. Setze ein Secret in Vercel-Env, dann ruf erneut.' },
      { status: 503 },
    );
  }
  const got = req.headers.get('x-aiko-admin-token');
  if (got !== expected) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }

  const [owners, pipelines] = await Promise.all([listOwners(), listDealPipelines()]);

  if (!owners.ok || !pipelines.ok) {
    return NextResponse.json(
      {
        error: 'HubSpot-Aufruf fehlgeschlagen. Prüfe HUBSPOT_PRIVATE_TOKEN + Scopes (crm.objects.owners.read, crm.schemas.deals.read).',
        owners_status: owners.status,
        pipelines_status: pipelines.status,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    instructions:
      'Wähle aus owners[] deine eigene id → setze HUBSPOT_OWNER_ID in Vercel. Wähle aus pipelines[0].stages[] die initiale Stage (z.B. "appointmentscheduled" oder ähnlich) — wird in Stage 2 für automatische Deal-Erstellung benötigt.',
    owners: owners.data?.results ?? [],
    pipelines: pipelines.data?.results ?? [],
  });
}
