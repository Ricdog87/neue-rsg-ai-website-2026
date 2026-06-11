import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';
import { SYSTEM_PROMPT } from '@/lib/sales/system-prompt';
import { TOOLS, executeTool, type ToolEvent } from '@/lib/sales/tools';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Aiko — Sales-Bot-Endpoint.
 *
 * Pattern (siehe Anthropic skill / shared/tool-use-concepts.md):
 * - Manueller Agentic Loop (max. 6 Iterationen für Konversation +
 *   Multi-Step-Tool-Use; Sales-Calls brauchen selten mehr).
 * - Streaming nach client als NDJSON: { type: "text" | "tool" | "error" | "done" }.
 * - Prompt-Caching auf System-Prompt + Tools (stabiler Prefix) →
 *   ~90 % günstiger ab 2. Turn der Konversation.
 *
 * Modell: claude-opus-4-8 (höchste Tonalitäts-Treue für Sales).
 * Adaptive Thinking: an, weil Konversations-Reasoning + Tool-Routing
 *   davon profitieren.
 */

const MODEL = 'claude-opus-4-8';
const MAX_LOOP = 6;

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(8000),
});

const ChatRequestSchema = z.object({
  messages: z.array(ChatMessageSchema).min(1).max(40),
});

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error:
          'Aiko ist gerade nicht erreichbar — schreib uns direkt an hello@rsg-ai.de oder buch einen Termin: rsg-ai.de/termin.',
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
    return new Response(JSON.stringify({ error: 'Eingabe ungültig.' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const client = new Anthropic({ apiKey });

  // Same-Origin für interne /api/checkout-Aufrufe
  const url = new URL(req.url);
  const origin = url.origin;

  const messages: Anthropic.Messages.MessageParam[] = parsed.data.messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (e: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(JSON.stringify(e) + '\n'));
      };

      try {
        for (let i = 0; i < MAX_LOOP; i += 1) {
          const msgStream = client.messages.stream({
            model: MODEL,
            max_tokens: 2048,
            system: [
              {
                type: 'text',
                text: SYSTEM_PROMPT,
                cache_control: { type: 'ephemeral' },
              },
            ],
            tools: TOOLS,
            messages,
          });

          for await (const event of msgStream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              emit({ type: 'text', text: event.delta.text });
            }
          }

          const final = await msgStream.finalMessage();
          // Volle Assistant-Content (inkl. tool_use blocks) zurück in History
          messages.push({ role: 'assistant', content: final.content });

          if (final.stop_reason !== 'tool_use') break;

          const toolUses = final.content.filter(
            (b): b is Anthropic.Messages.ToolUseBlock => b.type === 'tool_use',
          );

          const toolResults: Anthropic.Messages.ToolResultBlockParam[] = [];
          for (const t of toolUses) {
            const result = await executeTool(t.name, t.input, origin);
            const uiEvent: ToolEvent = result.ui;
            emit({ type: 'tool', ...uiEvent });
            toolResults.push({
              type: 'tool_result',
              tool_use_id: t.id,
              content: result.content,
            });
          }
          messages.push({ role: 'user', content: toolResults });
        }

        emit({ type: 'done' });
      } catch (err) {
        // PII-frei loggen: nur Fehler-Typ
        const safe =
          err instanceof Error ? err.name + ': ' + err.message.slice(0, 200) : 'unknown';
        console.error('[aiko-chat] stream failed:', safe);
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
