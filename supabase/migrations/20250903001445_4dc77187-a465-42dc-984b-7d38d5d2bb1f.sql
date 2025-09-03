-- Fix critical security vulnerability in transactions table
-- Remove the overly permissive "System can create transactions" policy
-- and replace with secure policies

-- First, drop the insecure policy
DROP POLICY IF EXISTS "System can create transactions" ON public.transactions;

-- Create a secure policy that only allows transaction creation by admins
-- or through service role (edge functions for payment processing)
CREATE POLICY "Admins can create transactions" ON public.transactions
FOR INSERT
WITH CHECK (get_user_role() = 'admin'::user_role);

-- Note: Edge functions using service role key will bypass RLS entirely,
-- which is the proper way for payment processing systems to create transactions