-- Supabase Database Schema for Locale Bookings
-- Run this in your Supabase SQL editor

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  address VARCHAR(500) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255),
  category VARCHAR(100) NOT NULL,
  rating DECIMAL(3,2) DEFAULT 0.0,
  image_url TEXT,
  brand_primary TEXT,
  brand_secondary TEXT,
  brand_accent TEXT,
  country VARCHAR(120),
  state VARCHAR(120),
  city VARCHAR(120),
  client_payment_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration_minutes INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_profiles table for storing complete user information
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(20) NOT NULL CHECK (role IN ('client', 'business', 'admin')),
  avatar_url TEXT,
  -- Business specific fields
  business_name VARCHAR(255),
  business_address VARCHAR(500),
  business_category VARCHAR(100),
  business_description TEXT,
  -- Status and metadata
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  subject VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create departments table (for "My departments" feature)
CREATE TABLE IF NOT EXISTS departments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create client_departments table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS client_departments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  department_id UUID REFERENCES departments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(client_id, department_id)
);

-- Insert sample data
INSERT INTO businesses (name, description, address, phone, email, category, rating) VALUES
('Glo Salon', 'Professional hair salon with expert stylists', '123 Main St, City, State', '(555) 123-4567', 'info@glosalon.com', 'Beauty', 4.8),
('Madison Electric', 'Licensed electrical services for homes and businesses', '456 Electric Ave, City, State', '(555) 234-5678', 'contact@madisonelectric.com', 'Home Services', 4.6),
('Asset Plumbing', 'Complete plumbing solutions and emergency repairs', '789 Pipe St, City, State', '(555) 345-6789', 'service@assetplumbing.com', 'Home Services', 4.7),
('BellaSpa', 'Luxury spa treatments and wellness services', '412 Cedar St, City, State', '(555) 456-7890', 'book@bellaspa.com', 'Wellness', 4.9),
('ComputerPros', 'Expert computer repair and IT services', '100 Pine Ave, City, State', '(555) 567-8901', 'support@computerpros.com', 'Technology', 4.5),
('Savvy Health', 'Comprehensive health and wellness services', '321 Health Blvd, City, State', '(555) 678-9012', 'info@savvyhealth.com', 'Healthcare', 4.8);

INSERT INTO services (business_id, name, description, price, duration_minutes) VALUES
((SELECT id FROM businesses WHERE name = 'Glo Salon'), 'Haircut', 'Professional haircut and styling', 50.00, 60),
((SELECT id FROM businesses WHERE name = 'Glo Salon'), 'Hair Color', 'Full hair coloring service', 120.00, 120),
((SELECT id FROM businesses WHERE name = 'Madison Electric'), 'Electrical Repair', 'General electrical repairs and maintenance', 150.00, 90),
((SELECT id FROM businesses WHERE name = 'Asset Plumbing'), 'Drain Cleaning', 'Professional drain cleaning service', 100.00, 60),
((SELECT id FROM businesses WHERE name = 'BellaSpa'), 'Massage', 'Relaxing full-body massage', 80.00, 90),
((SELECT id FROM businesses WHERE name = 'ComputerPros'), 'Laptop Repair', 'Complete laptop diagnostic and repair', 200.00, 120);

INSERT INTO clients (name, email, phone) VALUES
('John Doe', 'john.doe@email.com', '(555) 111-2222'),
('Jane Smith', 'jane.smith@email.com', '(555) 333-4444');

INSERT INTO departments (name, description) VALUES
('Beauty & Wellness', 'Hair salons, spas, and wellness centers'),
('Home Services', 'Plumbing, electrical, and home maintenance'),
('Technology', 'Computer repair and IT services'),
('Healthcare', 'Medical and health services');

INSERT INTO client_departments (client_id, department_id) VALUES
((SELECT id FROM clients WHERE email = 'john.doe@email.com'), (SELECT id FROM departments WHERE name = 'Beauty & Wellness')),
((SELECT id FROM clients WHERE email = 'john.doe@email.com'), (SELECT id FROM departments WHERE name = 'Home Services'));

INSERT INTO appointments (client_id, business_id, service_id, appointment_date, appointment_time, status) VALUES
((SELECT id FROM clients WHERE email = 'john.doe@email.com'), 
 (SELECT id FROM businesses WHERE name = 'Glo Salon'), 
 (SELECT id FROM services WHERE name = 'Haircut'), 
 '2024-04-27', '09:00:00', 'confirmed'),
((SELECT id FROM clients WHERE email = 'john.doe@email.com'), 
 (SELECT id FROM businesses WHERE name = 'Madison Electric'), 
 (SELECT id FROM services WHERE name = 'Electrical Repair'), 
 '2024-04-28', '13:00:00', 'confirmed'),
((SELECT id FROM clients WHERE email = 'john.doe@email.com'), 
 (SELECT id FROM businesses WHERE name = 'Asset Plumbing'), 
 (SELECT id FROM services WHERE name = 'Drain Cleaning'), 
 '2024-04-29', '11:00:00', 'confirmed');

INSERT INTO messages (sender_id, recipient_id, business_id, subject, content) VALUES
((SELECT id FROM clients WHERE email = 'jane.smith@email.com'), 
 (SELECT id FROM clients WHERE email = 'john.doe@email.com'), 
 (SELECT id FROM businesses WHERE name = 'Savvy Health'), 
 'Spring Promotion', 
 'Spring promo is here! Get a 20% discount - book your appointment today.');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_appointments_client_id ON appointments(client_id);
CREATE INDEX IF NOT EXISTS idx_appointments_business_id ON appointments(business_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_messages_business_id ON messages(business_id);
CREATE INDEX IF NOT EXISTS idx_services_business_id ON services(business_id);
CREATE INDEX IF NOT EXISTS idx_businesses_country ON businesses(country);
CREATE INDEX IF NOT EXISTS idx_businesses_state ON businesses(state);
CREATE INDEX IF NOT EXISTS idx_businesses_city ON businesses(city);
CREATE INDEX IF NOT EXISTS idx_client_payments_client_id ON client_payments(client_id);
CREATE INDEX IF NOT EXISTS idx_client_payments_business_id ON client_payments(business_id);
CREATE INDEX IF NOT EXISTS idx_client_payments_status ON client_payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_platform_payments_business_id ON platform_payments(business_id);
CREATE INDEX IF NOT EXISTS idx_platform_payments_subscription_id ON platform_payments(subscription_id);
CREATE INDEX IF NOT EXISTS idx_platform_payments_status ON platform_payments(payment_status);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  plan VARCHAR(20) NOT NULL CHECK (plan IN ('Free','Pro','Business','Enterprise')),
  status VARCHAR(20) NOT NULL CHECK (status IN ('active','inactive','trialing','past_due')),
  external_reference TEXT,
  last_payment_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payments table for client payments to businesses
CREATE TABLE IF NOT EXISTS client_payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  payment_method VARCHAR(50),
  payment_status VARCHAR(20) NOT NULL CHECK (payment_status IN ('pending','completed','failed','refunded')),
  external_payment_id TEXT, -- Stripe payment intent ID
  receipt_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create platform payments table for business subscriptions to Bizli Solution
CREATE TABLE IF NOT EXISTS platform_payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  payment_method VARCHAR(50),
  payment_status VARCHAR(20) NOT NULL CHECK (payment_status IN ('pending','completed','failed','refunded')),
  external_payment_id TEXT, -- Stripe payment intent ID
  receipt_url TEXT,
  billing_period_start DATE,
  billing_period_end DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Update services table to include payment settings
ALTER TABLE services ADD COLUMN IF NOT EXISTS online_payment_enabled BOOLEAN DEFAULT true;
ALTER TABLE services ADD COLUMN IF NOT EXISTS payment_required BOOLEAN DEFAULT false;
ALTER TABLE services ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Enable Row Level Security (RLS)
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (allow all for demo - customize for production)
CREATE POLICY "Allow all operations on businesses" ON businesses FOR ALL USING (true);
CREATE POLICY "Allow all operations on services" ON services FOR ALL USING (true);
CREATE POLICY "Allow all operations on clients" ON clients FOR ALL USING (true);
CREATE POLICY "Allow all operations on appointments" ON appointments FOR ALL USING (true);
CREATE POLICY "Allow all operations on messages" ON messages FOR ALL USING (true);
CREATE POLICY "Allow all operations on departments" ON departments FOR ALL USING (true);
CREATE POLICY "Allow all operations on client_departments" ON client_departments FOR ALL USING (true);
CREATE POLICY "Allow all operations on subscriptions" ON subscriptions FOR ALL USING (true);
CREATE POLICY "Allow all operations on client_payments" ON client_payments FOR ALL USING (true);
CREATE POLICY "Allow all operations on platform_payments" ON platform_payments FOR ALL USING (true);
CREATE POLICY "Allow all operations on user_profiles" ON user_profiles FOR ALL USING (true);
