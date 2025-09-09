// Supabase Edge Function: Stripe Webhook
// Verifies the Stripe signature, parses checkout.session.completed events,
// and upserts subscription status for the related business.

// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.16.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET") ?? "";
const STRIPE_API_KEY = Deno.env.get("STRIPE_API_KEY") ?? ""; // optional if you need to fetch line items
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const stripe = new Stripe(STRIPE_API_KEY || "sk_test_", {
  apiVersion: "2024-06-20",
});

function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
}

serve(async (req) => {
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig || !STRIPE_WEBHOOK_SECRET) {
    return json({ error: "Missing signature or secret" }, { status: 400 });
  }

  const body = await req.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return json({ error: `Webhook signature verification failed: ${message}` }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Try to resolve business and plan
      const businessId = (session.client_reference_id || session.metadata?.business_id || "").trim();
      let plan = (session.metadata?.plan || "Pro").trim() as "Free" | "Pro" | "Business" | "Enterprise";
      if (!(["Free", "Pro", "Business", "Enterprise"] as const).includes(plan)) {
        plan = "Pro";
      }

      if (!businessId) {
        // If your links don't pass a reference, ignore or log
        console.warn("checkout.session.completed without business reference");
        return json({ received: true });
      }

      // Upsert subscription
      const { error } = await supabase
        .from("subscriptions")
        .upsert({
          business_id: businessId,
          plan,
          status: "active",
          external_reference: session.id,
          last_payment_at: new Date().toISOString(),
        }, { onConflict: "business_id" });

      if (error) {
        console.error("Supabase upsert error:", error);
        return json({ error: "Failed to upsert subscription" }, { status: 500 });
      }
    }

    // You can handle other events like invoice.payment_failed -> set past_due, etc.
    if (event.type === "invoice.payment_failed") {
      const invoice = event.data.object as Stripe.Invoice;
      const businessId = (invoice.client_reference_id || invoice.metadata?.business_id || "").trim();
      if (businessId) {
        const { error } = await supabase
          .from("subscriptions")
          .update({ status: "past_due", updated_at: new Date().toISOString() })
          .eq("business_id", businessId);
        if (error) console.error("Failed to set past_due:", error);
      }
    }

    return json({ received: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Webhook handler error:", message);
    return json({ error: message }, { status: 500 });
  }
});
