-- =====================================================
-- SUPABASE ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================
-- This file contains all RLS policies for the Bizli Solution application
-- Run these commands in your Supabase SQL editor to enable security

-- =====================================================
-- USER PROFILES TABLE
-- =====================================================
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admins can manage all user profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Businesses can manage their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Clients can manage their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.user_profiles;

-- Admin policy: Admins can view/modify all profiles
CREATE POLICY "Admins can manage all user profiles" ON public.user_profiles
FOR ALL USING (
  auth.uid() IN (
    SELECT id FROM public.user_profiles 
    WHERE role = 'admin' 
    AND email IN ('admin@bizli.com', 'administrator@bizli.com')
  )
)
WITH CHECK (
  auth.uid() IN (
    SELECT id FROM public.user_profiles 
    WHERE role = 'admin' 
    AND email IN ('admin@bizli.com', 'administrator@bizli.com')
  )
);

-- Business policy: Businesses can view/modify their own profile
CREATE POLICY "Businesses can manage their own profile" ON public.user_profiles
FOR ALL USING (auth.uid() = id AND role = 'business')
WITH CHECK (auth.uid() = id AND role = 'business');

-- Client policy: Clients can view/modify their own profile
CREATE POLICY "Clients can manage their own profile" ON public.user_profiles
FOR ALL USING (auth.uid() = id AND role = 'client')
WITH CHECK (auth.uid() = id AND role = 'client');

-- =====================================================
-- BUSINESSES TABLE
-- =====================================================
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admins can view all businesses" ON public.businesses;
DROP POLICY IF EXISTS "Business owners can manage their own business" ON public.businesses;

-- Admin policy: Admins can view all businesses
CREATE POLICY "Admins can view all businesses" ON public.businesses
FOR SELECT USING (
  auth.uid() IN (
    SELECT id FROM public.user_profiles 
    WHERE role = 'admin' 
    AND email IN ('admin@bizli.com', 'administrator@bizli.com')
  )
);

-- Business owner policy: Business owners can manage their own business
CREATE POLICY "Business owners can manage their own business" ON public.businesses
FOR ALL USING (
  auth.uid() = owner_id 
  AND (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'business'
)
WITH CHECK (
  auth.uid() = owner_id 
  AND (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'business'
);

-- =====================================================
-- SERVICES TABLE
-- =====================================================
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admins can view all services" ON public.services;
DROP POLICY IF EXISTS "Business owners can manage their own services" ON public.services;
DROP POLICY IF EXISTS "Clients can view services" ON public.services;

-- Admin policy: Admins can view all services
CREATE POLICY "Admins can view all services" ON public.services
FOR SELECT USING (
  auth.uid() IN (
    SELECT id FROM public.user_profiles 
    WHERE role = 'admin' 
    AND email IN ('admin@bizli.com', 'administrator@bizli.com')
  )
);

-- Business owner policy: Business owners can manage their own services
CREATE POLICY "Business owners can manage their own services" ON public.services
FOR ALL USING (
  business_id IN (
    SELECT id FROM public.businesses 
    WHERE owner_id = auth.uid()
  ) 
  AND (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'business'
)
WITH CHECK (
  business_id IN (
    SELECT id FROM public.businesses 
    WHERE owner_id = auth.uid()
  ) 
  AND (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'business'
);

-- Client policy: Clients can view all services (for booking)
CREATE POLICY "Clients can view services" ON public.services
FOR SELECT USING (
  (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'client'
);

-- =====================================================
-- APPOINTMENTS TABLE
-- =====================================================
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admins can view all appointments" ON public.appointments;
DROP POLICY IF EXISTS "Business owners can manage their appointments" ON public.appointments;
DROP POLICY IF EXISTS "Clients can manage their appointments" ON public.appointments;

-- Admin policy: Admins can view all appointments
CREATE POLICY "Admins can view all appointments" ON public.appointments
FOR SELECT USING (
  auth.uid() IN (
    SELECT id FROM public.user_profiles 
    WHERE role = 'admin' 
    AND email IN ('admin@bizli.com', 'administrator@bizli.com')
  )
);

-- Business owner policy: Business owners can manage appointments for their business
CREATE POLICY "Business owners can manage their appointments" ON public.appointments
FOR ALL USING (
  business_id IN (
    SELECT id FROM public.businesses 
    WHERE owner_id = auth.uid()
  )
  AND (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'business'
)
WITH CHECK (
  business_id IN (
    SELECT id FROM public.businesses 
    WHERE owner_id = auth.uid()
  )
  AND (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'business'
);

-- Client policy: Clients can manage their own appointments
CREATE POLICY "Clients can manage their appointments" ON public.appointments
FOR ALL USING (
  client_id = auth.uid() 
  AND (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'client'
)
WITH CHECK (
  client_id = auth.uid() 
  AND (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'client'
);

-- =====================================================
-- MESSAGES TABLE
-- =====================================================
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admins can view all messages" ON public.messages;
DROP POLICY IF EXISTS "Users can manage their messages" ON public.messages;

-- Admin policy: Admins can view all messages
CREATE POLICY "Admins can view all messages" ON public.messages
FOR SELECT USING (
  auth.uid() IN (
    SELECT id FROM public.user_profiles 
    WHERE role = 'admin' 
    AND email IN ('admin@bizli.com', 'administrator@bizli.com')
  )
);

-- User policy: Users can manage messages they sent or received
CREATE POLICY "Users can manage their messages" ON public.messages
FOR ALL USING (
  sender_id = auth.uid() OR receiver_id = auth.uid()
)
WITH CHECK (
  sender_id = auth.uid() OR receiver_id = auth.uid()
);

-- =====================================================
-- NOTIFICATIONS TABLE
-- =====================================================
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admins can view all notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can manage their notifications" ON public.notifications;

-- Admin policy: Admins can view all notifications
CREATE POLICY "Admins can view all notifications" ON public.notifications
FOR SELECT USING (
  auth.uid() IN (
    SELECT id FROM public.user_profiles 
    WHERE role = 'admin' 
    AND email IN ('admin@bizli.com', 'administrator@bizli.com')
  )
);

-- User policy: Users can manage their own notifications
CREATE POLICY "Users can manage their notifications" ON public.notifications
FOR ALL USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- =====================================================
-- PAYMENTS TABLE
-- =====================================================
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admins can view all payments" ON public.payments;
DROP POLICY IF EXISTS "Business owners can view their payments" ON public.payments;
DROP POLICY IF EXISTS "Clients can view their payments" ON public.payments;

-- Admin policy: Admins can view all payments
CREATE POLICY "Admins can view all payments" ON public.payments
FOR SELECT USING (
  auth.uid() IN (
    SELECT id FROM public.user_profiles 
    WHERE role = 'admin' 
    AND email IN ('admin@bizli.com', 'administrator@bizli.com')
  )
);

-- Business owner policy: Business owners can view payments for their business
CREATE POLICY "Business owners can view their payments" ON public.payments
FOR SELECT USING (
  business_id IN (
    SELECT id FROM public.businesses 
    WHERE owner_id = auth.uid()
  )
  AND (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'business'
);

-- Client policy: Clients can view their own payments
CREATE POLICY "Clients can view their payments" ON public.payments
FOR SELECT USING (
  client_id = auth.uid() 
  AND (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'client'
);

-- =====================================================
-- ADDITIONAL SECURITY MEASURES
-- =====================================================

-- Create a function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin_user(user_email text)
RETURNS boolean AS $$
BEGIN
  RETURN user_email IN ('admin@bizli.com', 'administrator@bizli.com');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get user role
CREATE OR REPLACE FUNCTION get_user_role(user_id uuid)
RETURNS text AS $$
BEGIN
  RETURN (
    SELECT role FROM public.user_profiles 
    WHERE id = user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
-- Run these queries to verify your RLS policies are working:

-- Check if RLS is enabled on all tables
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('user_profiles', 'businesses', 'services', 'appointments', 'messages', 'notifications', 'payments');

-- Check existing policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;