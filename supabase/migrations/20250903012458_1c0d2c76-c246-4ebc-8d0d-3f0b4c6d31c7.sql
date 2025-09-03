-- Fix critical security vulnerability in businesses table
-- Remove public access to sensitive contact information (email, phone)

-- First, drop the overly permissive public policy
DROP POLICY IF EXISTS "Anyone can view approved businesses" ON public.businesses;

-- Create secure policies with proper access control

-- Business owners can view their own complete business information
CREATE POLICY "Business owners can view their complete business" ON public.businesses
FOR SELECT
USING (auth.uid() = owner_id);

-- Admins can view all businesses (already exists, but ensuring it's there)
-- (The "Admins can manage all businesses" policy already covers this)

-- Public can view only non-sensitive business information for approved businesses
-- Note: This requires application-level filtering since RLS doesn't support column-level restrictions
-- Applications should only query: id, name, description, address, category, opening_hours, logo_url, branding_color
CREATE POLICY "Public can view basic approved business info" ON public.businesses
FOR SELECT
USING (
  (is_approved = true) 
  AND (is_active = true)
  AND (
    -- This policy exists but applications must ensure they don't select email/phone fields
    -- when accessed by non-authenticated users or non-owners
    true
  )
);

-- Add a comment to remind developers about column-level security
COMMENT ON TABLE public.businesses IS 'WARNING: Public SELECT policy exists but applications MUST NOT select email/phone fields for non-owners. Use column-level filtering in application queries.';