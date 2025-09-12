// Temporary type definitions to bridge differences between local types and Supabase schema

export interface BusinessWithExtras {
  id: string;
  name: string;
  description?: string | null;
  address?: string | null;
  phone?: string | null;
  email: string;
  category: string;
  rating?: number | null;
  logo_url?: string | null;
  brand_color?: string | null;
  brand_primary?: string | null;  // For backwards compatibility
  brand_secondary?: string | null; // For backwards compatibility
  brand_accent?: string | null;    // For backwards compatibility
  image_url?: string | null;       // For backwards compatibility
  country?: string | null;
  state?: string | null;
  city?: string | null;
  client_payment_url?: string | null;
  created_at: string;
  updated_at: string;
  is_approved?: boolean;
  is_active?: boolean;
  owner_id?: string;
  status?: string;
  opening_hours?: any;
}

export interface ServiceWithBusiness {
  id: string;
  business_id: string;
  name: string;
  description?: string | null;
  price?: number | null;
  duration_minutes?: number | null;
  is_active?: boolean;
  created_at: string;
  updated_at?: string;
  business?: BusinessWithExtras;
}

export interface AppointmentWithRelations {
  id: string;
  client_id: string;
  business_id: string;
  service_id: string;
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string | null;
  created_at: string;
  updated_at: string;
  business?: BusinessWithExtras;
  service?: ServiceWithBusiness;
}

export interface ClientPaymentWithRelations {
  id: string;
  client_id: string;
  business_id: string;
  service_id?: string | null;
  appointment_id?: string | null;
  amount: number;
  currency: string;
  payment_method?: string | null;
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  external_payment_id?: string | null;
  receipt_url?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
  // Optional joined relations
  businesses?: BusinessWithExtras;
  services?: ServiceWithBusiness;
  appointments?: AppointmentWithRelations;
}

export interface PlatformPaymentWithRelations {
  id: string;
  business_id: string;
  subscription_id: string;
  amount: number;
  currency: string;
  payment_method?: string | null;
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  external_payment_id?: string | null;
  receipt_url?: string | null;
  billing_period_start?: string;
  billing_period_end?: string;
  created_at: string;
  updated_at: string;
  // Optional joined relations
  businesses?: BusinessWithExtras;
  subscriptions?: {
    id: string;
    plan: string;
    status: string;
  };
}