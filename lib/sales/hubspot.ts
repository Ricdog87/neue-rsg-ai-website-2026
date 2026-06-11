/**
 * HubSpot Private-App-Client für Aiko.
 *
 * Nutzt denselben HUBSPOT_PRIVATE_TOKEN, den der Stripe-Webhook
 * schon hat — eine Quelle, eine Berechtigung.
 *
 * Scopes, die das Token braucht:
 *   crm.objects.contacts.read / .write
 *   crm.objects.deals.read / .write
 *   crm.objects.owners.read
 *   crm.schemas.deals.read (für Pipelines)
 *   sales-email-read (optional)
 *
 * DSGVO: dieses Modul wird nur aufgerufen, wenn der Bot vorher die
 * Einwilligung des Nutzers eingeholt hat (siehe System-Prompt).
 * Wir loggen NIE PII in console; bei Fehlern nur Status-Code +
 * Endpoint, keine Daten.
 */

const HS_BASE = 'https://api.hubapi.com';

function token(): string | null {
  return process.env.HUBSPOT_PRIVATE_TOKEN ?? null;
}

function ownerId(): string | null {
  // Falls gesetzt → Lead/Notiz wird Ricardo zugeordnet.
  return process.env.HUBSPOT_OWNER_ID ?? null;
}

async function hs<T = unknown>(
  path: string,
  init: RequestInit = {},
): Promise<{ ok: boolean; status: number; data: T | null }> {
  const t = token();
  if (!t) return { ok: false, status: 0, data: null };
  const res = await fetch(`${HS_BASE}${path}`, {
    ...init,
    headers: {
      authorization: `Bearer ${t}`,
      'content-type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
  let data: T | null = null;
  try {
    data = (await res.json()) as T;
  } catch {
    /* leerer Body bei 204 */
  }
  if (!res.ok) {
    // PII-frei loggen: nur Endpoint + Status
    console.error('[hubspot] ' + (init.method ?? 'GET') + ' ' + path + ' → ' + res.status);
  }
  return { ok: res.ok, status: res.status, data };
}

/* ────────────────────────────────────────────────────────────
   Setup-Helfer (für /api/sales/hubspot-config)
   ──────────────────────────────────────────────────────────── */

export async function listOwners() {
  return hs<{ results: Array<{ id: string; email: string; firstName?: string; lastName?: string }> }>(
    '/crm/v3/owners?limit=100',
  );
}

export async function listDealPipelines() {
  return hs<{
    results: Array<{
      id: string;
      label: string;
      stages: Array<{ id: string; label: string; displayOrder: number }>;
    }>;
  }>('/crm/v3/pipelines/deals');
}

/* ────────────────────────────────────────────────────────────
   Lead-Erfassung
   ──────────────────────────────────────────────────────────── */

type LeadInput = {
  firstName: string;
  email: string;
  phone?: string;
  company?: string;
  intent: string;          // kurzer Bedarfs-Satz
  summary: string;         // Aikos Gesprächs-Zusammenfassung
  source?: string;         // z.B. "aiko-chat"
  /** Optional: Eskalations-Flag → HubSpot-Property `aiko_status` = "escalated" */
  escalated?: boolean;
};

/**
 * Legt einen Contact in HubSpot an (oder aktualisiert bestehenden via Email-Upsert)
 * und hängt eine Notiz mit Aikos Gesprächs-Zusammenfassung dran.
 * Returns: { contactId } bei Erfolg.
 */
export async function upsertLead(lead: LeadInput): Promise<{ contactId: string } | null> {
  // Contacts API: PATCH /crm/v3/objects/contacts/{email}?idProperty=email
  // Vorhandenen Contact updaten oder anlegen via search → POST/PATCH.
  const search = await hs<{ results: Array<{ id: string }> }>(
    '/crm/v3/objects/contacts/search',
    {
      method: 'POST',
      body: JSON.stringify({
        filterGroups: [
          { filters: [{ propertyName: 'email', operator: 'EQ', value: lead.email }] },
        ],
        properties: ['email'],
        limit: 1,
      }),
    },
  );

  const properties: Record<string, string> = {
    email: lead.email,
    firstname: lead.firstName,
    lifecyclestage: 'lead',
    lead_source_detail: lead.source ?? 'aiko-chat',
    hs_lead_status: lead.escalated ? 'CONNECTED' : 'NEW',
  };
  if (lead.phone) properties.phone = lead.phone;
  if (lead.company) properties.company = lead.company;
  const owner = ownerId();
  if (owner) properties.hubspot_owner_id = owner;

  let contactId: string | null = null;

  if (search.ok && search.data?.results?.[0]?.id) {
    const id = search.data.results[0].id;
    const upd = await hs<{ id: string }>(
      '/crm/v3/objects/contacts/' + id,
      { method: 'PATCH', body: JSON.stringify({ properties }) },
    );
    if (upd.ok && upd.data) contactId = upd.data.id;
  } else {
    const created = await hs<{ id: string }>('/crm/v3/objects/contacts', {
      method: 'POST',
      body: JSON.stringify({ properties }),
    });
    if (created.ok && created.data) contactId = created.data.id;
  }

  if (!contactId) return null;

  // Notiz mit Gespräch + Intent anhängen
  await attachNote(contactId, formatNote(lead));

  return { contactId };
}

function formatNote(lead: LeadInput): string {
  return [
    '<b>Aiko-Gespräch (KI-Bot)</b>',
    '',
    '<b>Bedarf:</b> ' + escapeHtml(lead.intent),
    '<b>Zusammenfassung:</b> ' + escapeHtml(lead.summary),
    lead.escalated ? '<b>Status:</b> 🔴 An Mensch eskaliert' : '',
    '',
    '<i>Quelle: ' + (lead.source ?? 'aiko-chat') + ' · DSGVO-Einwilligung wurde im Chat eingeholt</i>',
  ]
    .filter(Boolean)
    .join('<br>');
}

async function attachNote(contactId: string, html: string) {
  // 1) Note anlegen
  const note = await hs<{ id: string }>('/crm/v3/objects/notes', {
    method: 'POST',
    body: JSON.stringify({
      properties: {
        hs_note_body: html,
        hs_timestamp: new Date().toISOString(),
      },
    }),
  });
  if (!note.ok || !note.data?.id) return;
  // 2) Note ↔ Contact assoziieren (V4 default assoc type)
  await hs(
    '/crm/v4/objects/notes/' + note.data.id + '/associations/default/contacts/' + contactId,
    { method: 'PUT' },
  );
}

/* ────────────────────────────────────────────────────────────
   Booking-Link
   ──────────────────────────────────────────────────────────── */

/**
 * Liefert den HubSpot-Meeting-Link, ggf. mit pre-fill-Parametern.
 * Quelle ist site.cta.meetingUrl in lib/content.ts — keine Hardcodes hier.
 */
export function meetingLinkFor(params: {
  email?: string;
  firstName?: string;
  reason?: string;
}): string {
  // Basis-URL aus content.ts (single source of truth)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { site } = require('../content') as typeof import('../content');
  const base = site.cta.meetingUrl;
  // HubSpot Meetings akzeptiert ?email= &firstName= &userMessage=
  const u = new URL(base.startsWith('http') ? base : 'https://www.rsg-ai.de' + base);
  if (params.email) u.searchParams.set('email', params.email);
  if (params.firstName) u.searchParams.set('firstName', params.firstName);
  if (params.reason) u.searchParams.set('userMessage', params.reason);
  return u.toString();
}

/* ────────────────────────────────────────────────────────────
   String-Utils
   ──────────────────────────────────────────────────────────── */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
