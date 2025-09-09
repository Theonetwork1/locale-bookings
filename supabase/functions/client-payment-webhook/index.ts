import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const body = await req.text()
    const signature = req.headers.get('stripe-signature')

    // Verify webhook signature (in production, use proper Stripe webhook verification)
    // For demo purposes, we'll skip verification
    
    const event = JSON.parse(body)
    
    console.log('Received webhook event:', event.type)

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        const clientReferenceId = session.client_reference_id
        
        if (clientReferenceId) {
          // Update payment status to completed
          const { error } = await supabaseClient
            .from('client_payments')
            .update({
              payment_status: 'completed',
              external_payment_id: session.payment_intent,
              receipt_url: session.receipt_url,
              updated_at: new Date().toISOString()
            })
            .eq('id', clientReferenceId)

          if (error) {
            console.error('Error updating payment:', error)
            throw error
          }

          // Optionally, update appointment status to confirmed
          const { data: payment } = await supabaseClient
            .from('client_payments')
            .select('appointment_id')
            .eq('id', clientReferenceId)
            .single()

          if (payment?.appointment_id) {
            await supabaseClient
              .from('appointments')
              .update({
                status: 'confirmed',
                updated_at: new Date().toISOString()
              })
              .eq('id', payment.appointment_id)
          }

          console.log('Payment completed for:', clientReferenceId)
        }
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object
        const clientReferenceId = paymentIntent.metadata?.client_reference_id
        
        if (clientReferenceId) {
          // Update payment status to failed
          const { error } = await supabaseClient
            .from('client_payments')
            .update({
              payment_status: 'failed',
              external_payment_id: paymentIntent.id,
              updated_at: new Date().toISOString()
            })
            .eq('id', clientReferenceId)

          if (error) {
            console.error('Error updating failed payment:', error)
            throw error
          }

          console.log('Payment failed for:', clientReferenceId)
        }
        break
      }

      case 'charge.dispute.created': {
        const dispute = event.data.object
        const paymentIntentId = dispute.payment_intent
        
        // Update payment status to refunded/disputed
        const { error } = await supabaseClient
          .from('client_payments')
          .update({
            payment_status: 'refunded',
            updated_at: new Date().toISOString()
          })
          .eq('external_payment_id', paymentIntentId)

        if (error) {
          console.error('Error updating disputed payment:', error)
          throw error
        }

        console.log('Payment disputed:', paymentIntentId)
        break
      }

      default:
        console.log('Unhandled event type:', event.type)
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
