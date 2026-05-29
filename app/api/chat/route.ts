import Anthropic from '@anthropic-ai/sdk';
import { Resend } from 'resend';
import { z } from 'zod';
import { site } from '@/lib/content';
import { SYSTEM_PROMPT } from '@/lib/chat/system-prompt';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const MODEL = 'claude-opus-4-8';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(8000),
});

const ChatRequestSchema = z.object({
  messages: z.array(ChatMessageSchema).min(1).max(40),
});

const tools: Anthropic.Messages.Tool[] = [
  {
    name: 'capture_lead',
    description:
      'Übergibt einen qualifizierten Lead an Ricardo per E-Mail. Nutze dieses Tool, sobald du Name + E-Mail + grobe Bedarfssituation des Nutzers kennst und er ernsthaftes Interesse signalisiert hat. Niemals Daten erfinden — nur weitergeben, was der Nutzer wirklich gesagt hat.',
    input_schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Name der Person' },
        email: { type: 'string', description: 'Geschäftliche E-Mail-Adresse' },
        company: { type: 'string', description: 'Firmenname (optional)' },
        role: { type: 'string', description: 'Rolle / Position (optional)' },
        company_size: {
          type: 'string',
          description: 'Mitarbeiterzahl, z.B. "50-100" (optional)',
        },
        pain_point: {
          type: 'string',
          description:
            'Konkretes Problem / Painpoint in 1-2 Sätzen. Welche Abteilung verliert Zeit? Welcher Prozess klemmt?',
        },
        budget_signal: {
          type: 'string',
          description:
            'Indikation Budget / Timing, sofern erwähnt (optional)',
        },
        summary: {
          type: 'string',
          description:
            'Deine kurze Zusammenfassung des Gesprächs für Ricardo (3-4 Sätze)',
        },
      },
      required: ['name', 'email', 'pain_point', 'summary'],
    },
  },
  {
    name: 'suggest_meeting',
    description:
      'Liefert die offiziellen Termin-Daten für ein 30-Minuten-Erstgespräch mit Ricardo. Nutze dieses Tool, wenn der Nutzer einen Termin / ein Erstgespräch / einen Call buchen will. Niemals selbst Links erfinden — immer dieses Tool nutzen.',
    input_schema: {
      type: 'object',
      properties: {
        reason: {
          type: 'string',
          description:
            'Kurze Notiz, worum es im Termin gehen soll (für interne Vorbereitung).',
        },
      },
      required: ['reason'],
    },
  },
];

type CaptureLeadInput = {
  name: string;
  email: string;
  company?: string;
  role?: string;
  company_size?: string;
  pain_point: string;
  budget_signal?: string;
  summary: string;
};

type SuggestMeetingInput = {
  reason: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function sendLeadEmail(input: CaptureLeadInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[chat] RESEND_API_KEY missing — lead not emailed', input);
    return;
  }
  const resend = new Resend(apiKey);
  const rows: Array<[string, string | undefined]> = [
    ['Name', input.name],
    ['E-Mail', input.email],
    ['Firma', input.company],
    ['Rolle', input.role],
    ['Mitarbeiterzahl', input.company_size],
    ['Painpoint', input.pain_point],
    ['Budget / Timing', input.budget_signal],
  ];
  const html = `<!doctype html><html lang="de"><body style="font-family:-apple-system,Segoe UI,Inter,sans-serif;background:#03020c;color:#e8e8ea;padding:32px;">
<div style="max-width:560px;margin:auto;background:#0a0a12;border:1px solid #1d1d28;border-radius:16px;padding:32px;">
<div style="font-family:ui-monospace,monospace;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#a855f7;">RSG AI · Aiko-Lead</div>
<h1 style="margin:16px 0 24px 0;font-size:22px;color:#fff;">Neuer qualifizierter Lead vom Chatbot</h1>
<table style="width:100%;border-collapse:collapse;font-size:14px;">
${rows
  .filter(([, v]) => v)
  .map(
    ([k, v]) =>
      `<tr><td style="padding:8px 0;color:#8a8a96;width:160px;vertical-align:top;">${escapeHtml(k)}</td><td style="padding:8px 0;color:#e8e8ea;">${escapeHtml(v ?? '')}</td></tr>`,
  )
  .join('')}
</table>
<h2 style="margin:32px 0 8px 0;font-size:14px;color:#a855f7;text-transform:uppercase;letter-spacing:0.18em;">Aikos Zusammenfassung</h2>
<p style="font-size:14px;line-height:1.6;color:#e8e8ea;margin:0;">${escapeHtml(input.summary)}</p>
</div></body></html>`;

  try {
    await resend.emails.send({
      from: site.newsletter.fromEmail,
      to: site.contact.email,
      replyTo: input.email,
      subject: `Aiko-Lead · ${input.name}${input.company ? ` (${input.company})` : ''}`,
      html,
    });
  } catch (err) {
    console.error('[chat] resend lead email failed', err);
  }
}

async function executeTool(
  name: string,
  input: unknown,
): Promise<{ content: string; uiPayload: Record<string, unknown> }> {
  if (name === 'capture_lead') {
    const data = input as CaptureLeadInput;
    await sendLeadEmail(data);
    return {
      content: JSON.stringify({
        status: 'sent',
        note: 'Lead wurde an Ricardo übergeben. Antwort meistens innerhalb 2 Std.',
      }),
      uiPayload: { kind: 'lead_captured', name: data.name },
    };
  }
  if (name === 'suggest_meeting') {
    const data = input as SuggestMeetingInput;
    return {
      content: JSON.stringify({
        booking_url: `${site.url}${site.cta.meetingUrl}`,
        duration_min: 30,
        with: 'Ricardo Serrano (Gründer)',
        format: 'Video-Call · kostenlos · unverbindlich',
        response_sla: 'Antwort innerhalb 24h, meistens schneller',
        note: data.reason,
      }),
      uiPayload: {
        kind: 'meeting_suggested',
        url: `${site.url}${site.cta.meetingUrl}`,
      },
    };
  }
  return {
    content: JSON.stringify({ error: 'Unbekanntes Tool' }),
    uiPayload: { kind: 'error' },
  };
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error:
          'Chat ist gerade nicht verfügbar — schreib uns direkt an hello@rsg-ai.de.',
      }),
      { status: 503, headers: { 'content-type': 'application/json' } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Ungültiger Request.' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const parsed = ChatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: 'Eingabe ungültig.' }),
      { status: 400, headers: { 'content-type': 'application/json' } },
    );
  }

  const client = new Anthropic({ apiKey });

  // Convert history to Anthropic message format.
  const messages: Anthropic.Messages.MessageParam[] = parsed.data.messages.map(
    (m) => ({ role: m.role, content: m.content }),
  );

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (event: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(JSON.stringify(event) + '\n'));
      };

      try {
        // Manual agentic loop with streaming. Loops until end_turn (max 4 turns
        // to bound cost — sales conversation shouldn't need more).
        for (let iteration = 0; iteration < 4; iteration += 1) {
          const messageStream = client.messages.stream({
            model: MODEL,
            max_tokens: 2048,
            system: [
              {
                type: 'text',
                text: SYSTEM_PROMPT,
                cache_control: { type: 'ephemeral' },
              },
            ],
            tools,
            messages,
          });

          for await (const event of messageStream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              emit({ type: 'text', text: event.delta.text });
            }
          }

          const finalMessage = await messageStream.finalMessage();

          // Echo assistant turn back into history (preserves tool_use blocks).
          messages.push({ role: 'assistant', content: finalMessage.content });

          if (finalMessage.stop_reason !== 'tool_use') {
            break;
          }

          const toolUseBlocks = finalMessage.content.filter(
            (b): b is Anthropic.Messages.ToolUseBlock => b.type === 'tool_use',
          );

          const toolResults: Anthropic.Messages.ToolResultBlockParam[] = [];
          for (const block of toolUseBlocks) {
            const result = await executeTool(block.name, block.input);
            emit({ type: 'tool', name: block.name, ...result.uiPayload });
            toolResults.push({
              type: 'tool_result',
              tool_use_id: block.id,
              content: result.content,
            });
          }

          messages.push({ role: 'user', content: toolResults });
        }

        emit({ type: 'done' });
      } catch (err) {
        console.error('[chat] stream failed', err);
        emit({
          type: 'error',
          message:
            'Da ist gerade etwas schiefgelaufen. Probier es in 1 Minute noch einmal — oder schreib direkt an hello@rsg-ai.de.',
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'content-type': 'application/x-ndjson; charset=utf-8',
      'cache-control': 'no-cache, no-store',
      'x-accel-buffering': 'no',
    },
  });
}
