-- Script pour corriger le schéma de la base de données
-- Exécutez ce script dans votre SQL Editor Supabase

-- 1. Vérifier si la colonne role existe dans profiles
-- Si elle n'existe pas, l'ajouter
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' 
        AND column_name = 'role'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.profiles 
        ADD COLUMN role user_role NOT NULL DEFAULT 'client';
        
        RAISE NOTICE 'Colonne role ajoutée à la table profiles';
    ELSE
        RAISE NOTICE 'Colonne role existe déjà dans la table profiles';
    END IF;
END $$;

-- 2. Vérifier si les types ENUM existent
DO $$ 
BEGIN
    -- Créer le type user_role s'il n'existe pas
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE public.user_role AS ENUM ('client', 'business', 'admin');
        RAISE NOTICE 'Type user_role créé';
    ELSE
        RAISE NOTICE 'Type user_role existe déjà';
    END IF;
    
    -- Créer le type appointment_status s'il n'existe pas
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'appointment_status') THEN
        CREATE TYPE public.appointment_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
        RAISE NOTICE 'Type appointment_status créé';
    ELSE
        RAISE NOTICE 'Type appointment_status existe déjà';
    END IF;
    
    -- Créer le type notification_type s'il n'existe pas
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'notification_type') THEN
        CREATE TYPE public.notification_type AS ENUM ('booking', 'reminder', 'cancellation', 'payment', 'general');
        RAISE NOTICE 'Type notification_type créé';
    ELSE
        RAISE NOTICE 'Type notification_type existe déjà';
    END IF;
    
    -- Créer le type transaction_status s'il n'existe pas
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'transaction_status') THEN
        CREATE TYPE public.transaction_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
        RAISE NOTICE 'Type transaction_status créé';
    ELSE
        RAISE NOTICE 'Type transaction_status existe déjà';
    END IF;
    
    -- Créer le type payment_method s'il n'existe pas
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_method') THEN
        CREATE TYPE public.payment_method AS ENUM ('card', 'cash', 'bank_transfer');
        RAISE NOTICE 'Type payment_method créé';
    ELSE
        RAISE NOTICE 'Type payment_method existe déjà';
    END IF;
    
    -- Créer le type business_category s'il n'existe pas
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'business_category') THEN
        CREATE TYPE public.business_category AS ENUM ('restaurant', 'salon', 'hotel', 'lawyer', 'real_estate', 'mechanic', 'healthcare', 'fitness', 'beauty', 'education', 'other');
        RAISE NOTICE 'Type business_category créé';
    ELSE
        RAISE NOTICE 'Type business_category existe déjà';
    END IF;
END $$;

-- 3. Mettre à jour les utilisateurs existants sans rôle
UPDATE public.profiles 
SET role = 'client' 
WHERE role IS NULL;

-- 4. Vérifier la structure finale
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND table_schema = 'public'
ORDER BY ordinal_position;
