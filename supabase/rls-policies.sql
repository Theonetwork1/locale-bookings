-- Row Level Security (RLS) Policies for Bizli Solution
-- These policies ensure that users can only access data appropriate to their role

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
-- Users can only view and edit their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid()::text = id);

-- Admin users can view all profiles
CREATE POLICY "Admins can view all profiles" ON user_profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid()::text 
            AND role = 'admin'
            AND email IN ('admin@bizli.com', 'administrator@bizli.com')
        )
    );

-- Admin users can update all profiles
CREATE POLICY "Admins can update all profiles" ON user_profiles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid()::text 
            AND role = 'admin'
            AND email IN ('admin@bizli.com', 'administrator@bizli.com')
        )
    );

-- Businesses Policies
-- Business owners can view and edit their own business
CREATE POLICY "Business owners can view own business" ON businesses
    FOR SELECT USING (owner_id = auth.uid()::text);

CREATE POLICY "Business owners can update own business" ON businesses
    FOR UPDATE USING (owner_id = auth.uid()::text);

-- Clients can view all businesses (for booking)
CREATE POLICY "Clients can view all businesses" ON businesses
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid()::text 
            AND role = 'client'
        )
    );

-- Admins can view and manage all businesses
CREATE POLICY "Admins can view all businesses" ON businesses
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid()::text 
            AND role = 'admin'
            AND email IN ('admin@bizli.com', 'administrator@bizli.com')
        )
    );

CREATE POLICY "Admins can manage all businesses" ON businesses
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid()::text 
            AND role = 'admin'
            AND email IN ('admin@bizli.com', 'administrator@bizli.com')
        )
    );

-- Appointments Policies
-- Users can view their own appointments
CREATE POLICY "Users can view own appointments" ON appointments
    FOR SELECT USING (
        client_id = auth.uid()::text OR 
        business_id IN (
            SELECT id FROM businesses WHERE owner_id = auth.uid()::text
        )
    );

-- Users can create appointments
CREATE POLICY "Users can create appointments" ON appointments
    FOR INSERT WITH CHECK (
        client_id = auth.uid()::text OR
        business_id IN (
            SELECT id FROM businesses WHERE owner_id = auth.uid()::text
        )
    );

-- Business owners can update their appointments
CREATE POLICY "Business owners can update own appointments" ON appointments
    FOR UPDATE USING (
        business_id IN (
            SELECT id FROM businesses WHERE owner_id = auth.uid()::text
        )
    );

-- Admins can view and manage all appointments
CREATE POLICY "Admins can manage all appointments" ON appointments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid()::text 
            AND role = 'admin'
            AND email IN ('admin@bizli.com', 'administrator@bizli.com')
        )
    );

-- Services Policies
-- Business owners can manage their own services
CREATE POLICY "Business owners can manage own services" ON services
    FOR ALL USING (
        business_id IN (
            SELECT id FROM businesses WHERE owner_id = auth.uid()::text
        )
    );

-- Clients can view all services
CREATE POLICY "Clients can view all services" ON services
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid()::text 
            AND role = 'client'
        )
    );

-- Admins can manage all services
CREATE POLICY "Admins can manage all services" ON services
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid()::text 
            AND role = 'admin'
            AND email IN ('admin@bizli.com', 'administrator@bizli.com')
        )
    );

-- Messages Policies
-- Users can view messages they sent or received
CREATE POLICY "Users can view own messages" ON messages
    FOR SELECT USING (
        sender_id = auth.uid()::text OR 
        recipient_id = auth.uid()::text
    );

-- Users can send messages
CREATE POLICY "Users can send messages" ON messages
    FOR INSERT WITH CHECK (sender_id = auth.uid()::text);

-- Admins can view all messages
CREATE POLICY "Admins can view all messages" ON messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid()::text 
            AND role = 'admin'
            AND email IN ('admin@bizli.com', 'administrator@bizli.com')
        )
    );

-- Notifications Policies
-- Users can view their own notifications
CREATE POLICY "Users can view own notifications" ON notifications
    FOR SELECT USING (user_id = auth.uid()::text);

-- Users can update their own notifications
CREATE POLICY "Users can update own notifications" ON notifications
    FOR UPDATE USING (user_id = auth.uid()::text);

-- Admins can view all notifications
CREATE POLICY "Admins can view all notifications" ON notifications
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid()::text 
            AND role = 'admin'
            AND email IN ('admin@bizli.com', 'administrator@bizli.com')
        )
    );
