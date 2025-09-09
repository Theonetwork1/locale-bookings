// Supabase Edge Function: create-checkout-session
// Creates a Stripe Checkout Session for a business subscription.
// Expects JSON body: { business_id: string, plan: 'Pro'|'Business'|'Enterprise' }

// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.16.0?target=deno";

const STRIPE_API_KEY = Deno.env.get("STRIPE_API_KEY") ?? "";
const PRICE_PRO = Deno.env.get("STRIPE_PRICE_PRO") ?? "";
const PRICE_BUSINESS = Deno.env.get("STRIPE_PRICE_BUSINESS") ?? "";
const PRICE_ENTERPRISE = Deno.env.get("STRIPE_PRICE_ENTERPRISE") ?? "";
const SUCCESS_URL = Deno.env.get("CHECKOUT_SUCCESS_URL") ?? "https://example.com/success";
const CANCEL_URL = Deno.env.get("CHECKOUT_CANCEL_URL") ?? "https://example.com/cancel";

const stripe = new Stripe(STRIPE_API_KEY || "sk_test_", {
  apiVersion: "2024-06-20",
});

function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    ...init,
  });
}

serve(async (req) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, { status: 405 });

  try {
    const { business_id, plan } = await req.json();
    if (!business_id || !plan) return json({ error: "Missing business_id or plan" }, { status: 400 });

    let price = PRICE_PRO;
    if (plan === "Business") price = PRICE_BUSINESS;
    if (plan === "Enterprise") price = PRICE_ENTERPRISE;

    if (!price) return json({ error: `No price configured for plan ${plan}` }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      success_url: SUCCESS_URL,
      cancel_url: CANCEL_URL,
      client_reference_id: String(business_id),
      metadata: { business_id: String(business_id), plan: String(plan) },
    });

    return json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return json({ error: message }, { status: 500 });
  }
});
