-- Complete database structure setup for the appointment booking system

-- 1. Create reviews table (missing)
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL,
  business_id UUID NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 2. Restructure messages table to support 1-to-1 conversations
DROP TABLE IF EXISTS public.messages CASCADE;
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID NOT NULL,
  receiver_id UUID NOT NULL,
  content TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- 3. Adjust businesses table - add missing fields and fix naming
ALTER TABLE public.businesses 
  DROP COLUMN IF EXISTS branding_color,
  ADD COLUMN IF NOT EXISTS brand_color TEXT DEFAULT '#1a1b3a',
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive'));

-- Update existing businesses to set status based on is_approved and is_active
UPDATE public.businesses 
SET status = CASE 
  WHEN is_approved = true AND is_active = true THEN 'active'
  ELSE 'inactive'
END;

-- 4. Update notifications table structure
ALTER TABLE public.notifications
  DROP COLUMN IF EXISTS title,
  ADD COLUMN IF NOT EXISTS message TEXT;

-- Migrate existing content to message field if title exists
UPDATE public.notifications SET message = content WHERE message IS NULL;

-- 5. Add foreign key constraints (only if they don't exist)
DO $$ 
BEGIN
  -- Reviews foreign keys
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'reviews_client_id_fkey') THEN
    ALTER TABLE public.reviews ADD CONSTRAINT reviews_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'reviews_business_id_fkey') THEN
    ALTER TABLE public.reviews ADD CONSTRAINT reviews_business_id_fkey FOREIGN KEY (business_id) REFERENCES public.businesses(id) ON DELETE CASCADE;
  END IF;

  -- Messages foreign keys
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'messages_sender_id_fkey') THEN
    ALTER TABLE public.messages ADD CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'messages_receiver_id_fkey') THEN
    ALTER TABLE public.messages ADD CONSTRAINT messages_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
  END IF;

  -- Businesses foreign keys
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'businesses_owner_id_fkey') THEN
    ALTER TABLE public.businesses ADD CONSTRAINT businesses_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;

  -- Services foreign keys
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'services_business_id_fkey') THEN
    ALTER TABLE public.services ADD CONSTRAINT services_business_id_fkey FOREIGN KEY (business_id) REFERENCES public.businesses(id) ON DELETE CASCADE;
  END IF;

  -- Appointments foreign keys
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'appointments_business_id_fkey') THEN
    ALTER TABLE public.appointments ADD CONSTRAINT appointments_business_id_fkey FOREIGN KEY (business_id) REFERENCES public.businesses(id) ON DELETE CASCADE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'appointments_client_id_fkey') THEN
    ALTER TABLE public.appointments ADD CONSTRAINT appointments_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'appointments_service_id_fkey') THEN
    ALTER TABLE public.appointments ADD CONSTRAINT appointments_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id) ON DELETE CASCADE;
  END IF;

  -- Notifications foreign keys
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'notifications_user_id_fkey') THEN
    ALTER TABLE public.notifications ADD CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'notifications_business_id_fkey') THEN
    ALTER TABLE public.notifications ADD CONSTRAINT notifications_business_id_fkey FOREIGN KEY (business_id) REFERENCES public.businesses(id) ON DELETE SET NULL;
  END IF;

  -- Transactions foreign keys
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'transactions_client_id_fkey') THEN
    ALTER TABLE public.transactions ADD CONSTRAINT transactions_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'transactions_business_id_fkey') THEN
    ALTER TABLE public.transactions ADD CONSTRAINT transactions_business_id_fkey FOREIGN KEY (business_id) REFERENCES public.businesses(id) ON DELETE CASCADE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'transactions_appointment_id_fkey') THEN
    ALTER TABLE public.transactions ADD CONSTRAINT transactions_appointment_id_fkey FOREIGN KEY (appointment_id) REFERENCES public.appointments(id) ON DELETE SET NULL;
  END IF;

  -- Business settings foreign keys
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'business_settings_business_id_fkey') THEN
    ALTER TABLE public.business_settings ADD CONSTRAINT business_settings_business_id_fkey FOREIGN KEY (business_id) REFERENCES public.businesses(id) ON DELETE CASCADE;
  END IF;
END $$;

-- 6. Update business_settings table structure
ALTER TABLE public.business_settings
  ADD COLUMN IF NOT EXISTS theme_color TEXT DEFAULT '#1a1b3a',
  ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'fr',
  ADD COLUMN IF NOT EXISTS notification_preferences JSONB DEFAULT '{}';

-- 7. Create comprehensive RLS policies

-- Reviews policies
CREATE POLICY "Users can view reviews for approved businesses" ON public.reviews FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.businesses WHERE id = business_id AND status = 'active')
);

CREATE POLICY "Clients can create reviews for their appointments" ON public.reviews FOR INSERT WITH CHECK (
  auth.uid() = client_id AND 
  EXISTS (
    SELECT 1 FROM public.appointments 
    WHERE client_id = auth.uid() AND business_id = reviews.business_id AND status = 'completed'
  )
);

CREATE POLICY "Clients can update their own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = client_id);

CREATE POLICY "Admins can manage all reviews" ON public.reviews FOR ALL USING (get_user_role() = 'admin');

-- Messages policies  
CREATE POLICY "Users can view their own messages" ON public.messages FOR SELECT USING (
  auth.uid() = sender_id OR auth.uid() = receiver_id
);

CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (
  auth.uid() = sender_id
);

CREATE POLICY "Admins can view all messages" ON public.messages FOR SELECT USING (get_user_role() = 'admin');

-- Update business policies to use new status field
DROP POLICY IF EXISTS "Public can view basic approved business info" ON public.businesses;
CREATE POLICY "Public can view active businesses" ON public.businesses FOR SELECT USING (status = 'active');

-- 8. Create updated_at triggers for all tables
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers where missing
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_reviews_updated_at') THEN
    ALTER TABLE public.reviews ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();
    CREATE TRIGGER update_reviews_updated_at
      BEFORE UPDATE ON public.reviews
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_messages_updated_at') THEN
    ALTER TABLE public.messages ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();
    CREATE TRIGGER update_messages_updated_at
      BEFORE UPDATE ON public.messages
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;