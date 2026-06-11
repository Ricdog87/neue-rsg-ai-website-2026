import type Anthropic from '@anthropic-ai/sdk';
import { Resend } from 'resend';
import { site } from '../content';
import { upsertLead, meetingLinkFor } from './hubspot';

/**
 * Aikos vier Werkzeuge — Definitionen + Handler.
 *
 * Pattern: jeder Handler nimmt die ROHEN Tool-Inputs, validiert hart,
 * macht die Aktion, gibt SOWOHL einen content-String zurück (geht an
 * Claude im tool_result) ALS AUCH ein UI-Event (geht über NDJSON an
 * den Browser für sichtbares Feedback wie „Termin-Link erscheint").
 */

export const TOOLS: Anthropic.Messages.Tool[] = [
  {
    name: 'capture_lead',
    description:
      'Legt einen qualifizierten Lead in HubSpot an (oder updated bestehenden Contact via E-Mail). Vor Aufruf MÜSSEN: 1) DSGVO-Einwilligung explizit erfolgt sein, 2) Name + E-Mail vorhanden sein, 3) Bedarfs-Lage geklärt sein. Niemals Daten erfinden — nur weitergeben, was der Nutzer wirklich gesagt hat.',
    input_schema: {
      type: 'object',
      properties: {
        firstName: { type: 'string', description: 'Vorname der Person' },
        email: { type: 'string', description: 'Geschäftliche E-Mail' },
        phone: { type: 'string', description: 'Telefonnummer (optional)' },
        company: { type: 'string', description: 'Firma (optional)' },
        intent: {
          type: 'string',
          description:
            'Kurzer Bedarfssatz (1 Zeile) — was will der Lead lösen? Welche Abteilung verliert Zeit?',
        },
        summary: {
          type: 'string',
          description:
            'Aikos eigene Zusammenfassung des Gesprächs für Ricardo (3-4 Sätze): Was ist der Pain, was hat der Lead bisher probiert, welches Paket passt, wo gab es Unsicherheit?',
        },
        consent_confirmed: {
          type: 'boolean',
          description:
            'MUSS true sein. Wird gesetzt, wenn der Nutzer explizit der DSGVO-Verarbeitung zugestimmt hat. Bei false: NICHT aufrufen.',
        },
      },
      required: ['firstName', 'email', 'intent', 'summary', 'consent_confirmed'],
    },
  },
  {
    name: 'book_meeting',
    description:
      'Liefert den HubSpot-Buchungslink für ein 30-Min-Erstgespräch mit Ricardo. Aufrufen bei: Scale-Tier, komplexem Custom-Bedarf, juristischen/steuerlichen Fragen, Wunsch nach Mensch, Verhandlung. Pre-fill mit Name/E-Mail wenn capture_lead bereits gelaufen ist.',
    input_schema: {
      type: 'object',
      properties: {
        reason: {
          type: 'string',
          description: 'Kurze Notiz, worum es im Termin gehen soll (für Ricardos Vorbereitung).',
        },
        firstName: { type: 'string', description: 'Vorname für Pre-fill (optional)' },
        email: { type: 'string', description: 'E-Mail für Pre-fill (optional)' },
      },
      required: ['reason'],
    },
  },
  {
    name: 'request_checkout',
    description:
      'Liefert einen Stripe-Checkout-Link für Solo (199 €/Mo) oder AI Account Manager (499 €/Mo). NUR aufrufen wenn: 1) DSGVO-Einwilligung explizit erfolgt, 2) capture_lead bereits aufgerufen (Contact existiert), 3) Nutzer hat tier UND billing eindeutig benannt, 4) tier ist solo ODER team — NIEMALS scale.',
    input_schema: {
      type: 'object',
      properties: {
        tier: {
          type: 'string',
          enum: ['solo', 'team'],
          description: '"solo" für Solo-Paket (199 €/Mo), "team" für AI Account Manager (499 €/Mo).',
        },
        billing: {
          type: 'string',
          enum: ['monthly', 'annual'],
          description:
            'monthly: Setup wird zusätzlich verrechnet. annual: 15 % günstiger, Setup inklusive, 12 Mo Vorkasse.',
        },
      },
      required: ['tier', 'billing'],
    },
  },
  {
    name: 'escalate_to_human',
    description:
      'Übergibt das Gespräch an Ricardo: schickt ihm eine E-Mail mit Zusammenfassung und markiert den HubSpot-Contact (sofern existiert) als heiß. Aufrufen bei: Scale-Anfragen, Verhandlung um Rabatt/Konditionen, Beschwerden, Wunsch nach Mensch, technischen Fragen außerhalb der Wissensbasis, Verunsicherung des Bots.',
    input_schema: {
      type: 'object',
      properties: {
        reason: { type: 'string', description: 'Warum eskalierst du? (1 Satz)' },
        summary: {
          type: 'string',
          description:
            'Zusammenfassung für Ricardo: wer fragt, woher (Branche), was ist der Pain, was hat Aiko bisher gesagt, was braucht der Lead jetzt vom Menschen.',
        },
        firstName: { type: 'string', description: 'Vorname (optional)' },
        email: { type: 'string', description: 'E-Mail (optional)' },
        phone: { type: 'string', description: 'Telefon (optional)' },
        company: { type: 'string', description: 'Firma (optional)' },
      },
      required: ['reason', 'summary'],
    },
  },
];

export type ToolEvent =
  | { kind: 'lead_captured'; firstName: string }
  | { kind: 'meeting_link'; url: string }
  | { kind: 'checkout_link'; url: string; tier: string; billing: string }
  | { kind: 'escalated' }
  | { kind: 'tool_error'; message: string };

export type ToolResult = { content: string; ui: ToolEvent };

/* ────────────────────────────────────────────────────────────
   Handler
   ──────────────────────────────────────────────────────────── */

type CaptureLeadInput = {
  firstName: string;
  email: string;
  phone?: string;
  company?: string;
  intent: string;
  summary: string;
  consent_confirmed: boolean;
};

export async function executeTool(
  name: string,
  input: unknown,
  origin: string,
): Promise<ToolResult> {
  try {
    if (name === 'capture_lead') {
      return await handleCaptureLead(input as CaptureLeadInput);
    }
    if (name === 'book_meeting') {
      return await handleBookMeeting(input as { reason: string; firstName?: string; email?: string });
    }
    if (name === 'request_checkout') {
      return await handleRequestCheckout(
        input as { tier: 'solo' | 'team'; billing: 'monthly' | 'annual' },
        origin,
      );
    }
    if (name === 'escalate_to_human') {
      return await handleEscalate(input as EscalateInput);
    }
  } catch (err) {
    console.error('[aiko-tools] handler crashed:', err instanceof Error ? err.message : err);
    return {
      content: JSON.stringify({
        error:
          'Internes Problem beim Ausführen des Tools. Sag dem Nutzer freundlich, dass du gleich an Ricardo eskalierst — und ruf dann escalate_to_human auf.',
      }),
      ui: { kind: 'tool_error', message: 'Tool-Ausführung fehlgeschlagen.' },
    };
  }
  return {
    content: JSON.stringify({ error: 'Unbekanntes Tool: ' + name }),
    ui: { kind: 'tool_error', message: 'Unbekanntes Tool.' },
  };
}

async function handleCaptureLead(input: CaptureLeadInput): Promise<ToolResult> {
  if (!input.consent_confirmed) {
    return {
      content: JSON.stringify({
        error:
          'DSGVO-Einwilligung wurde nicht bestätigt. Frag den Nutzer explizit nach Einwilligung und ruf dann erneut auf.',
      }),
      ui: { kind: 'tool_error', message: 'Einwilligung fehlt.' },
    };
  }
  if (!isValidEmail(input.email)) {
    return {
      content: JSON.stringify({ error: 'Ungültige E-Mail. Bitte den Nutzer um Korrektur.' }),
      ui: { kind: 'tool_error', message: 'E-Mail ungültig.' },
    };
  }
  const out = await upsertLead({
    firstName: input.firstName.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone?.trim(),
    company: input.company?.trim(),
    intent: input.intent,
    summary: input.summary,
    source: 'aiko-chat',
  });
  if (!out) {
    return {
      content: JSON.stringify({
        error:
          'HubSpot-Anlage fehlgeschlagen. Schicke escalate_to_human, damit Ricardo den Lead manuell sieht.',
      }),
      ui: { kind: 'tool_error', message: 'CRM nicht erreichbar.' },
    };
  }
  return {
    content: JSON.stringify({
      status: 'ok',
      contactId: out.contactId,
      note: 'Lead in HubSpot angelegt. Ricardo sieht den Eintrag inkl. deiner Zusammenfassung. Du kannst jetzt: einen Termin buchen (book_meeting) ODER für solo/team einen Checkout-Link senden (request_checkout) ODER eskalieren (escalate_to_human).',
    }),
    ui: { kind: 'lead_captured', firstName: input.firstName },
  };
}

async function handleBookMeeting(input: {
  reason: string;
  firstName?: string;
  email?: string;
}): Promise<ToolResult> {
  const url = meetingLinkFor({
    reason: input.reason,
    firstName: input.firstName,
    email: input.email,
  });
  return {
    content: JSON.stringify({
      status: 'ok',
      url,
      note: 'Buchungslink erzeugt. Erkläre kurz, dass der Nutzer hier seinen Slot selbst wählt, HubSpot bestätigt automatisch.',
    }),
    ui: { kind: 'meeting_link', url },
  };
}

async function handleRequestCheckout(
  input: { tier: 'solo' | 'team'; billing: 'monthly' | 'annual' },
  origin: string,
): Promise<ToolResult> {
  if (!['solo', 'team'].includes(input.tier)) {
    return {
      content: JSON.stringify({ error: 'Ungültiger Tier. Scale → escalate_to_human, nicht request_checkout.' }),
      ui: { kind: 'tool_error', message: 'Scale geht nur via Ricardo.' },
    };
  }
  // Wir rufen unsere eigene /api/checkout-Route auf — derselbe Pfad
  // wie die Pricing-Cards. Konsistenz über alle Conversion-Punkte.
  const res = await fetch(origin + '/api/checkout', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ tier: input.tier, billing: input.billing }),
  });
  const data = await res.json().catch(() => ({}));
  if (data?.url) {
    return {
      content: JSON.stringify({
        status: 'ok',
        url: data.url,
        note:
          'Stripe-Checkout-Link erzeugt. Erkläre kurz: ' +
          (input.billing === 'monthly'
            ? 'monatliches Abo, Setup wird auf der ersten Rechnung zusätzlich verrechnet.'
            : 'Jahresvorkasse, 15 % günstiger, Setup ist inklusive.') +
          ' Direkt nach Zahlung übernimmt Onboarding.',
      }),
      ui: {
        kind: 'checkout_link',
        url: data.url as string,
        tier: input.tier,
        billing: input.billing,
      },
    };
  }
  if (data?.fallbackHref) {
    // Stripe nicht konfiguriert oder Tier nicht abschließbar → Termin-Fallback
    return {
      content: JSON.stringify({
        status: 'fallback',
        fallbackHref: data.fallbackHref,
        note: 'Stripe-Direktcheckout aktuell nicht verfügbar — biete dem Nutzer den Termin-Fallback an (book_meeting).',
      }),
      ui: { kind: 'tool_error', message: 'Checkout-Fallback auf Termin.' },
    };
  }
  return {
    content: JSON.stringify({ error: 'Checkout fehlgeschlagen. Eskaliere an Ricardo.' }),
    ui: { kind: 'tool_error', message: 'Checkout fehlgeschlagen.' },
  };
}

type EscalateInput = {
  reason: string;
  summary: string;
  firstName?: string;
  email?: string;
  phone?: string;
  company?: string;
};

async function handleEscalate(input: EscalateInput): Promise<ToolResult> {
  // Falls Lead-Daten dabei sind → HubSpot-Contact als „escalated" anlegen/updaten
  if (input.email && input.firstName) {
    await upsertLead({
      firstName: input.firstName,
      email: input.email,
      phone: input.phone,
      company: input.company,
      intent: input.reason,
      summary: input.summary,
      source: 'aiko-chat-escalated',
      escalated: true,
    });
  }

  // E-Mail an Ricardo über Resend
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const html = `<!doctype html><html><body style="font-family:system-ui;background:#03020c;color:#e8e8ea;padding:32px">
        <div style="max-width:560px;margin:auto;background:#0a0a12;border:1px solid #1d1d28;border-radius:16px;padding:32px">
          <div style="font-family:ui-monospace,monospace;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#a855f7">RSG AI · Aiko-Eskalation</div>
          <h1 style="margin:16px 0 24px;font-size:22px;color:#fff">Aiko hat an dich übergeben</h1>
          <table style="width:100%;font-size:14px">
            ${[
              ['Grund', input.reason],
              ['Vorname', input.firstName],
              ['E-Mail', input.email],
              ['Telefon', input.phone],
              ['Firma', input.company],
            ]
              .filter(([, v]) => v)
              .map(
                ([k, v]) =>
                  '<tr><td style="padding:6px 0;color:#8a8a96;width:120px;vertical-align:top">' +
                  k +
                  '</td><td style="padding:6px 0;color:#e8e8ea">' +
                  escapeHtml(String(v)) +
                  '</td></tr>',
              )
              .join('')}
          </table>
          <h2 style="margin:24px 0 8px;font-size:14px;color:#a855f7;text-transform:uppercase;letter-spacing:.18em">Aikos Zusammenfassung</h2>
          <p style="font-size:14px;line-height:1.6;margin:0;color:#e8e8ea">${escapeHtml(input.summary)}</p>
        </div>
      </body></html>`;
      await resend.emails.send({
        from: site.newsletter.fromEmail,
        to: site.contact.email,
        replyTo: input.email ?? site.contact.email,
        subject: `Aiko-Eskalation · ${input.firstName ?? 'Anonym'}${input.company ? ' (' + input.company + ')' : ''}`,
        html,
      });
    } catch (err) {
      console.error('[aiko-escalate] resend failed:', err instanceof Error ? err.message : err);
    }
  }

  return {
    content: JSON.stringify({
      status: 'ok',
      note: 'Ricardo wurde benachrichtigt und meldet sich innerhalb 24 Std. Sag dem Nutzer das in einem warmen Satz und biete optional einen Termin (book_meeting) als noch schnelleren Weg.',
    }),
    ui: { kind: 'escalated' },
  };
}

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
