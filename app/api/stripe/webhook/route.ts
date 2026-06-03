import { NextResponse } from 'next/server';

/**
 * Stripe Webhook — minimal `checkout.session.completed` handler.
 *
 * ENV-Vars:
 *   STRIPE_SECRET_KEY
 *   STRIPE_WEBHOOK_SECRET   // whsec_… aus Stripe-Dashboard
 *   HUBSPOT_PRIVATE_TOKEN   // optional: legt Deal in HubSpot an
 *
 * Strategie: wenn HUBSPOT_PRIVATE_TOKEN nicht gesetzt ist → no-op + log.
 * Damit Stripe-Subscriptions trotzdem laufen, ohne dass HubSpot Pflicht ist.
 */

export const runtime = 'nodejs'; // Webhook braucht Node-Runtime (raw body)

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !webhookSecret) {
    return NextResponse.json(
      { error: 'stripe_not_configured', detail: 'Set STRIPE_SECRET_KEY + STRIPE_WEBHOOK_SECRET in Vercel ENV.' },
      { status: 200 },
    );
  }

  const sig = req.headers.get('stripe-signature');
  if (!sig) return NextResponse.json({ error: 'missing_signature' }, { status: 400 });

  let Stripe: typeof import('stripe').default;
  try {
    Stripe = (await import('stripe')).default;
  } catch {
    return NextResponse.json(
      { error: 'stripe_sdk_missing', detail: 'npm install stripe' },
      { status: 200 },
    );
  }

  const stripe = new Stripe(secret);
  const raw = await req.text();

  let event: import('stripe').default.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, webhookSecret);
  } catch (err) {
    return NextResponse.json(
      { error: 'invalid_signature', detail: err instanceof Error ? err.message : 'unknown' },
      { status: 400 },
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as import('stripe').default.Checkout.Session;
    const tier = session.metadata?.tier ?? 'unknown';
    const billing = session.metadata?.billing ?? 'monthly';
    const customerEmail = session.customer_details?.email ?? session.customer_email;

    // Optional: HubSpot Deal anlegen (no-op wenn Token fehlt)
    const hsToken = process.env.HUBSPOT_PRIVATE_TOKEN;
    if (hsToken && customerEmail) {
      try {
        await fetch('https://api.hubapi.com/crm/v3/objects/deals', {
          method: 'POST',
          headers: {
            authorization: `Bearer ${hsToken}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            properties: {
              dealname: `Voice ${tier.toUpperCase()} · ${customerEmail}`,
              pipeline: 'default',
              dealstage: 'closedwon',
              amount: String(session.amount_total ? session.amount_total / 100 : 0),
              description: `Stripe-Checkout · ${tier} · ${billing} · Session ${session.id}`,
            },
          }),
        });
      } catch {
        // Don't fail webhook because HubSpot is down
      }
    }
  }

  return NextResponse.json({ received: true });
}
