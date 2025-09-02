-- Create enum types for better data integrity
CREATE TYPE public.user_role AS ENUM ('client', 'business', 'admin');
CREATE TYPE public.appointment_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
CREATE TYPE public.notification_type AS ENUM ('booking', 'reminder', 'cancellation', 'payment', 'general');
CREATE TYPE public.transaction_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE public.payment_method AS ENUM ('card', 'cash', 'bank_transfer');
CREATE TYPE public.send_method AS ENUM ('sms', 'email', 'both');
CREATE TYPE public.business_category AS ENUM ('restaurant', 'salon', 'hotel', 'lawyer', 'real_estate', 'mechanic', 'healthcare', 'fitness', 'beauty', 'education', 'other');

-- Profiles table (extends auth.users with additional info and roles)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'client',
  department TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Businesses table
CREATE TABLE public.businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  logo_url TEXT,
  description TEXT,
  category business_category NOT NULL DEFAULT 'other',
  address TEXT,
  opening_hours JSONB, -- {"monday": "9:00-17:00", "tuesday": "9:00-17:00", ...}
  branding_color TEXT DEFAULT '#1a1b3a',
  is_approved BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Services table
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2), -- Optional pricing
  duration_minutes INTEGER, -- Service duration in minutes
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Appointments table
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status appointment_status DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Transactions table
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  status transaction_status DEFAULT 'pending',
  payment_method payment_method,
  stripe_payment_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Business settings table
CREATE TABLE public.business_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  chat_enabled BOOLEAN DEFAULT true,
  accept_payments BOOLEAN DEFAULT false,
  custom_url TEXT UNIQUE,
  auto_confirm_bookings BOOLEAN DEFAULT false,
  booking_advance_days INTEGER DEFAULT 30,
  cancellation_policy TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Messages table (bulk messaging from businesses to clients)
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  send_method send_method DEFAULT 'email',
  target_clients UUID[], -- Array of client IDs, null means all clients
  sent_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Create security definer functions to avoid infinite recursion in RLS
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

CREATE OR REPLACE FUNCTION public.is_business_owner(business_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.businesses 
    WHERE id = business_id AND owner_id = auth.uid()
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- RLS Policies for profiles table
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR ALL USING (public.get_user_role() = 'admin');

-- RLS Policies for businesses table
CREATE POLICY "Anyone can view approved businesses" ON public.businesses
  FOR SELECT USING (is_approved = true AND is_active = true);

CREATE POLICY "Business owners can manage their business" ON public.businesses
  FOR ALL USING (auth.uid() = owner_id);

CREATE POLICY "Admins can manage all businesses" ON public.businesses
  FOR ALL USING (public.get_user_role() = 'admin');

-- RLS Policies for services table
CREATE POLICY "Anyone can view active services of approved businesses" ON public.services
  FOR SELECT USING (
    is_active = true AND 
    EXISTS (SELECT 1 FROM public.businesses WHERE id = business_id AND is_approved = true AND is_active = true)
  );

CREATE POLICY "Business owners can manage their services" ON public.services
  FOR ALL USING (public.is_business_owner(business_id));

CREATE POLICY "Admins can manage all services" ON public.services
  FOR ALL USING (public.get_user_role() = 'admin');

-- RLS Policies for appointments table
CREATE POLICY "Clients can view their own appointments" ON public.appointments
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "Clients can create appointments" ON public.appointments
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Clients can update their own appointments" ON public.appointments
  FOR UPDATE USING (auth.uid() = client_id);

CREATE POLICY "Business owners can view their appointments" ON public.appointments
  FOR SELECT USING (public.is_business_owner(business_id));

CREATE POLICY "Business owners can update their appointments" ON public.appointments
  FOR UPDATE USING (public.is_business_owner(business_id));

CREATE POLICY "Admins can manage all appointments" ON public.appointments
  FOR ALL USING (public.get_user_role() = 'admin');

-- RLS Policies for notifications table
CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Business owners can view their business notifications" ON public.notifications
  FOR SELECT USING (public.is_business_owner(business_id));

CREATE POLICY "Business owners can create notifications" ON public.notifications
  FOR INSERT WITH CHECK (public.is_business_owner(business_id) OR auth.uid() = user_id);

CREATE POLICY "Admins can manage all notifications" ON public.notifications
  FOR ALL USING (public.get_user_role() = 'admin');

-- RLS Policies for transactions table
CREATE POLICY "Clients can view their own transactions" ON public.transactions
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "Business owners can view their transactions" ON public.transactions
  FOR SELECT USING (public.is_business_owner(business_id));

CREATE POLICY "System can create transactions" ON public.transactions
  FOR INSERT WITH CHECK (true); -- This will be handled by edge functions

CREATE POLICY "Admins can manage all transactions" ON public.transactions
  FOR ALL USING (public.get_user_role() = 'admin');

-- RLS Policies for business_settings table
CREATE POLICY "Business owners can manage their settings" ON public.business_settings
  FOR ALL USING (public.is_business_owner(business_id));

CREATE POLICY "Anyone can view business settings for approved businesses" ON public.business_settings
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.businesses WHERE id = business_id AND is_approved = true AND is_active = true)
  );

CREATE POLICY "Admins can manage all business settings" ON public.business_settings
  FOR ALL USING (public.get_user_role() = 'admin');

-- RLS Policies for messages table
CREATE POLICY "Business owners can manage their messages" ON public.messages
  FOR ALL USING (public.is_business_owner(business_id));

CREATE POLICY "Admins can manage all messages" ON public.messages
  FOR ALL USING (public.get_user_role() = 'admin');

-- Create triggers for updated_at columns
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_businesses_updated_at
  BEFORE UPDATE ON public.businesses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON public.transactions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_business_settings_updated_at
  BEFORE UPDATE ON public.business_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to auto-create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    COALESCE((new.raw_user_meta_data->>'role')::user_role, 'client')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_businesses_owner_id ON public.businesses(owner_id);
CREATE INDEX idx_businesses_category ON public.businesses(category);
CREATE INDEX idx_businesses_approved_active ON public.businesses(is_approved, is_active);
CREATE INDEX idx_services_business_id ON public.services(business_id);
CREATE INDEX idx_services_active ON public.services(is_active);
CREATE INDEX idx_appointments_client_id ON public.appointments(client_id);
CREATE INDEX idx_appointments_business_id ON public.appointments(business_id);
CREATE INDEX idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX idx_appointments_status ON public.appointments(status);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_business_id ON public.notifications(business_id);
CREATE INDEX idx_notifications_read ON public.notifications(is_read);
CREATE INDEX idx_transactions_client_id ON public.transactions(client_id);
CREATE INDEX idx_transactions_business_id ON public.transactions(business_id);

-- Enable realtime for real-time notifications
ALTER publication supabase_realtime ADD TABLE public.notifications;
ALTER publication supabase_realtime ADD TABLE public.appointments;
ALTER publication supabase_realtime ADD TABLE public.messages;