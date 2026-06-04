import { NextResponse } from 'next/server';

/**
 * Stripe Checkout Session — Voice-Tiers (Solo / Team).
 *
 * Hardware to wire when going live (set in Vercel ENV):
 *   STRIPE_SECRET_KEY
 *   STRIPE_PRICE_SOLO_MONTHLY
 *   STRIPE_PRICE_SOLO_ANNUAL    // 15 % off, OHNE Setup
 *   STRIPE_PRICE_TEAM_MONTHLY
 *   STRIPE_PRICE_TEAM_ANNUAL    // 15 % off, OHNE Setup
 *   STRIPE_PRICE_SETUP_SOLO     //  490 € netto, one_time — nur bei monthly
 *   STRIPE_PRICE_SETUP_TEAM     //  990 € netto, one_time — nur bei monthly
 *   NEXT_PUBLIC_SITE_URL        // for success/cancel redirect
 *
 * Until env-vars are present, this route returns a `fallbackHref` of
 * `/termin` so the frontend gracefully degrades to sales-led.
 *
 * Request body:  { tier: 'solo' | 'team', billing: 'monthly' | 'annual' }
 * Response:      { url?: string, fallbackHref?: string, error?: string }
 */

type CheckoutBody = {
  tier?: 'solo' | 'team';
  billing?: 'monthly' | 'annual';
};

const PRICE_ENV_KEY: Record<string, string> = {
  'solo:monthly': 'STRIPE_PRICE_SOLO_MONTHLY',
  'solo:annual': 'STRIPE_PRICE_SOLO_ANNUAL',
  'team:monthly': 'STRIPE_PRICE_TEAM_MONTHLY',
  'team:annual': 'STRIPE_PRICE_TEAM_ANNUAL',
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as CheckoutBody;
  const tier = body.tier;
  const billing = body.billing ?? 'monthly';

  if (!tier || !['solo', 'team'].includes(tier)) {
    return NextResponse.json({ error: 'invalid_tier' }, { status: 400 });
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  const recurringPriceId = process.env[PRICE_ENV_KEY[`${tier}:${billing}`]];
  // Setup ONLY for monthly. Bei Jahresvorkasse: kein Setup-line_item.
  const needsSetup = billing === 'monthly';
  const setupEnvKey = tier === 'solo' ? 'STRIPE_PRICE_SETUP_SOLO' : 'STRIPE_PRICE_SETUP_TEAM';
  const setupPriceId = needsSetup ? process.env[setupEnvKey] : null;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.rsg-ai.de';

  if (!secret || !recurringPriceId || (needsSetup && !setupPriceId)) {
    // Graceful fallback until Stripe is configured
    return NextResponse.json(
      {
        fallbackHref: '/termin',
        message: 'Stripe nicht konfiguriert — Sales-Led-Fallback aktiv.',
        missing: {
          STRIPE_SECRET_KEY: !secret,
          [PRICE_ENV_KEY[`${tier}:${billing}`]]: !recurringPriceId,
          ...(needsSetup ? { [setupEnvKey]: !setupPriceId } : {}),
        },
      },
      { status: 200 },
    );
  }

  // Dynamic-import stripe so the route works in CI without the package
  let Stripe: typeof import('stripe').default;
  try {
    Stripe = (await import('stripe')).default;
  } catch {
    return NextResponse.json(
      {
        fallbackHref: '/termin',
        message: 'Stripe-SDK nicht installiert — `npm install stripe` ausführen.',
      },
      { status: 200 },
    );
  }

  const stripe = new Stripe(secret);

  try {
    const line_items = [{ price: recurringPriceId, quantity: 1 }];
    if (needsSetup && setupPriceId) {
      line_items.push({ price: setupPriceId, quantity: 1 }); // einmalig auf 1. Rechnung
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/#pricing`,
      locale: 'de',
      allow_promotion_codes: true,
      automatic_tax: { enabled: true }, // aktivieren, wenn Stripe-Tax konfiguriert
      billing_address_collection: 'required', phone_number_collection: { enabled: true }, tax_id_collection: { enabled: true }, metadata: { tier, billing },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'stripe_error', fallbackHref: '/termin' },
      { status: 500 },
    );
  }
}
