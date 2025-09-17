import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Geographic types
export interface Country {
  id: string
  code: string
  name_en: string
  name_fr: string
  name_es: string
  name_ht: string
  currency_code?: string
  phone_code?: string
  created_at: string
}

export interface State {
  id: string
  country_id: string
  code?: string
  name_en: string
  name_fr: string
  name_es: string
  name_ht: string
  latitude?: number
  longitude?: number
  created_at: string
}

export interface Department {
  id: string
  state_id?: string
  country_id: string
  code?: string
  name_en: string
  name_fr: string
  name_es: string
  name_ht: string
  latitude?: number
  longitude?: number
  created_at: string
}

export interface City {
  id: string
  department_id?: string
  state_id?: string
  country_id: string
  code?: string
  name_en: string
  name_fr: string
  name_es: string
  name_ht: string
  latitude?: number
  longitude?: number
  population?: number
  is_capital: boolean
  created_at: string
}

export interface Neighborhood {
  id: string
  city_id: string
  name_en: string
  name_fr: string
  name_es: string
  name_ht: string
  latitude?: number
  longitude?: number
  created_at: string
}

export interface AdministrativeLevel {
  id: string
  country_id: string
  level_number: number
  name_en: string
  name_fr: string
  name_es: string
  name_ht: string
  is_required: boolean
  created_at: string
}

// Database types avec géolocalisation complète
export interface Business {
  id: string
  name: string
  description?: string
  address?: string
  phone?: string
  email: string
  category: string
  rating?: number
  logo_url?: string
  brand_color?: string
  // GÉOLOCALISATION COMPLÈTE
  country: string
  state: string
  city: string
  latitude?: number
  longitude?: number
  postal_code?: string
  full_address?: string
  // NOUVELLES RÉFÉRENCES GÉOGRAPHIQUES
  country_id?: string
  state_id?: string
  department_id?: string
  city_id?: string
  neighborhood_id?: string
  client_payment_url?: string
  created_at: string
  updated_at: string
  is_approved?: boolean
  is_active?: boolean
  owner_id?: string
  status?: string
}

export interface Subscription {
  id: string
  business_id: string
  plan: 'Free' | 'Pro' | 'Business' | 'Enterprise'
  status: 'active' | 'inactive' | 'trialing' | 'past_due'
  external_reference?: string
  last_payment_at?: string | null
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  business_id: string
  name: string
  description: string
  price: number
  duration_minutes: number
  online_payment_enabled?: boolean
  payment_required?: boolean
  is_active?: boolean
  created_at: string
}

export interface Appointment {
  id: string
  client_id: string
  business_id: string
  service_id: string
  appointment_date: string
  appointment_time: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  notes?: string
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  sender_id: string
  recipient_id: string
  business_id: string
  subject: string
  content: string
  is_read: boolean
  created_at: string
}

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface ClientPayment {
  id: string
  client_id: string
  business_id: string
  service_id?: string
  appointment_id?: string
  amount: number
  currency: string
  payment_method?: string
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
  external_payment_id?: string
  receipt_url?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface PlatformPayment {
  id: string
  business_id: string
  subscription_id: string
  amount: number
  currency: string
  payment_method?: string
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
  external_payment_id?: string
  receipt_url?: string
  billing_period_start: string
  billing_period_end: string
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  email: string
  password_hash: string
  name: string
  phone?: string
  role: 'client' | 'business' | 'admin'
  avatar_url?: string
  // GÉOLOCALISATION UTILISATEUR COMPLÈTE
  country: string
  state: string
  city: string
  latitude?: number
  longitude?: number
  full_address?: string
  // NOUVELLES RÉFÉRENCES GÉOGRAPHIQUES
  country_id?: string
  state_id?: string
  department_id?: string
  city_id?: string
  neighborhood_id?: string
  business_name?: string
  business_address?: string
  business_category?: string
  business_description?: string
  is_active: boolean
  email_verified: boolean
  created_at: string
  updated_at: string
}

// Geographic database functions
export const getCountries = async (): Promise<Country[]> => {
  const { data, error } = await supabase
    .from('countries')
    .select('*')
    .order('name_en', { ascending: true })

  if (error) {
    console.error('Error fetching countries:', error)
    return []
  }

  return data || []
}

export const getStatesByCountry = async (countryId: string): Promise<State[]> => {
  const { data, error } = await supabase
    .from('states')
    .select('*')
    .eq('country_id', countryId)
    .order('name_en', { ascending: true })

  if (error) {
    console.error('Error fetching states:', error)
    return []
  }

  return data || []
}

export const getDepartmentsByState = async (stateId: string): Promise<Department[]> => {
  const { data, error } = await supabase
    .from('departments')
    .select('*')
    .eq('state_id', stateId)
    .order('name_en', { ascending: true })

  if (error) {
    console.error('Error fetching departments:', error)
    return []
  }

  return data || []
}

export const getDepartmentsByCountry = async (countryId: string): Promise<Department[]> => {
  const { data, error } = await supabase
    .from('departments')
    .select('*')
    .eq('country_id', countryId)
    .order('name_en', { ascending: true })

  if (error) {
    console.error('Error fetching departments:', error)
    return []
  }

  return data || []
}

export const getCitiesByDepartment = async (departmentId: string): Promise<City[]> => {
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('department_id', departmentId)
    .order('name_en', { ascending: true })

  if (error) {
    console.error('Error fetching cities:', error)
    return []
  }

  return data || []
}

export const getCitiesByState = async (stateId: string): Promise<City[]> => {
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('state_id', stateId)
    .order('name_en', { ascending: true })

  if (error) {
    console.error('Error fetching cities:', error)
    return []
  }

  return data || []
}

export const getCitiesByCountry = async (countryId: string): Promise<City[]> => {
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('country_id', countryId)
    .order('name_en', { ascending: true })

  if (error) {
    console.error('Error fetching cities:', error)
    return []
  }

  return data || []
}

export const getNeighborhoodsByCity = async (cityId: string): Promise<Neighborhood[]> => {
  const { data, error } = await supabase
    .from('neighborhoods')
    .select('*')
    .eq('city_id', cityId)
    .order('name_en', { ascending: true })

  if (error) {
    console.error('Error fetching neighborhoods:', error)
    return []
  }

  return data || []
}

export const getAdministrativeLevels = async (countryId: string): Promise<AdministrativeLevel[]> => {
  const { data, error } = await supabase
    .from('administrative_levels')
    .select('*')
    .eq('country_id', countryId)
    .order('level_number', { ascending: true })

  if (error) {
    console.error('Error fetching administrative levels:', error)
    return []
  }

  return data || []
}

// Database functions
export const getBusinesses = async () => {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as Business[]
}

export const getBusinessById = async (id: string) => {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as Business
}

export const getServicesByBusiness = async (businessId: string) => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('business_id', businessId)
    .order('name')
  
  if (error) throw error
  return data as Service[]
}

export const getAppointmentsByClient = async (clientId: string) => {
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      businesses:business_id(name, address),
      services:service_id(name, price)
    `)
    .eq('client_id', clientId)
    .order('appointment_date', { ascending: true })
  
  if (error) throw error
  return data as (Appointment & { businesses: Business; services: Service })[]
}

export const getMessagesByClient = async (clientId: string) => {
  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      businesses:business_id(name),
      senders:sender_id(name)
    `)
    .eq('recipient_id', clientId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as (Message & { businesses: Business; senders: Client })[]
}

export const markMessageAsRead = async (messageId: string) => {
  const { error } = await supabase
    .from('messages')
    .update({ is_read: true })
    .eq('id', messageId)
  
  if (error) throw error
}

export const createAppointment = async (appointment: Omit<Appointment, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('appointments')
    .insert(appointment)
    .select()
    .single()
  
  if (error) throw error
  return data as Appointment
}

export const updateAppointment = async (id: string, updates: Partial<Appointment>) => {
  const { data, error } = await supabase
    .from('appointments')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as Appointment
}

export const deleteAppointment = async (id: string) => {
  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

export const updateBusinessClientPaymentUrl = async (businessId: string, url: string) => {
  const { data, error } = await supabase
    .from('businesses')
    .update({ client_payment_url: url, updated_at: new Date().toISOString() })
    .eq('id', businessId)
    .select()
    .single()
  if (error) throw error
  return data as Business
}

export const getSubscriptions = async () => {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as Subscription[]
}

export const upsertSubscription = async (sub: Omit<Subscription, 'id' | 'created_at' | 'updated_at'> & { id?: string }) => {
  const { data, error } = await supabase
    .from('subscriptions')
    .upsert(sub)
    .select()
    .single()
  if (error) throw error
  return data as Subscription
}

// Payment functions
export const createClientPayment = async (payment: Omit<ClientPayment, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('client_payments')
    .insert(payment)
    .select()
    .single()
  if (error) throw error
  return data as ClientPayment
}

export const updateClientPayment = async (id: string, updates: Partial<ClientPayment>) => {
  const { data, error } = await supabase
    .from('client_payments')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as ClientPayment
}

export const getClientPaymentsByBusiness = async (businessId: string) => {
  const { data, error } = await supabase
    .from('client_payments')
    .select(`
      *,
      clients:client_id(name, email),
      services:service_id(name),
      appointments:appointment_id(appointment_date, appointment_time)
    `)
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as (ClientPayment & { 
    clients: Client; 
    services: Service; 
    appointments: Appointment 
  })[]
}

export const getClientPaymentsByClient = async (clientId: string) => {
  const { data, error } = await supabase
    .from('client_payments')
    .select(`
      *,
      businesses:business_id(name),
      services:service_id(name),
      appointments:appointment_id(appointment_date, appointment_time)
    `)
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as (ClientPayment & { 
    businesses: Business; 
    services: Service; 
    appointments: Appointment 
  })[]
}

export const createPlatformPayment = async (payment: Omit<PlatformPayment, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('platform_payments')
    .insert(payment)
    .select()
    .single()
  if (error) throw error
  return data as PlatformPayment
}

export const updatePlatformPayment = async (id: string, updates: Partial<PlatformPayment>) => {
  const { data, error } = await supabase
    .from('platform_payments')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as PlatformPayment
}

export const getPlatformPayments = async () => {
  const { data, error } = await supabase
    .from('platform_payments')
    .select(`
      *,
      businesses:business_id(name, email),
      subscriptions:subscription_id(plan, status)
    `)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as (PlatformPayment & { 
    businesses: Business; 
    subscriptions: Subscription 
  })[]
}

export const getBusinessRevenueSummary = async (businessId: string, startDate?: string, endDate?: string) => {
  let query = supabase
    .from('client_payments')
    .select('amount, currency, payment_status, created_at')
    .eq('business_id', businessId)
    .eq('payment_status', 'completed')

  if (startDate) query = query.gte('created_at', startDate)
  if (endDate) query = query.lte('created_at', endDate)

  const { data, error } = await query.order('created_at', { ascending: false })
  if (error) throw error
  return data
}

// User Profile functions
export const createUserProfile = async (profile: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert(profile)
    .select()
    .single()
  if (error) throw error
  return data as UserProfile
}

export const getUserProfileByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('email', email)
    .single()
  if (error) throw error
  return data as UserProfile
}

export const updateUserProfile = async (id: string, updates: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as UserProfile
}

export const getUserProfileById = async (id: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data as UserProfile
}

// Simple password hashing for demo (use proper hashing in production)
export const hashPassword = async (password: string): Promise<string> => {
  // In production, use bcrypt or similar
  return btoa(password + 'salt123')
}

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  // In production, use bcrypt.compare or similar
  return btoa(password + 'salt123') === hash
}

// Nouvelles fonctions de géolocalisation
export const getBusinessesByLocation = async (country: string, state?: string, city?: string, radius?: number, userLat?: number, userLng?: number) => {
  let query = supabase
    .from('businesses')
    .select('*')
    .eq('country', country)
    .eq('is_active', true)

  if (state) query = query.eq('state', state)
  if (city) query = query.eq('city', city)

  const { data, error } = await query.order('rating', { ascending: false })
  
  if (error) throw error
  
  // Si rayon et position utilisateur fournis, filtrer par distance
  if (radius && userLat && userLng) {
    return (data as Business[]).filter(business => {
      if (!business.latitude || !business.longitude) return false
      const distance = calculateDistance(userLat, userLng, business.latitude, business.longitude)
      return distance <= radius
    }).sort((a, b) => {
      const distA = calculateDistance(userLat, userLng, a.latitude!, a.longitude!)
      const distB = calculateDistance(userLat, userLng, b.latitude!, b.longitude!)
      return distA - distB
    })
  }
  
  return data as Business[]
}

// Calcul de distance (formule haversine)
export const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371 // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

// Géocodage d'adresse (utilise une API externe)
export const geocodeAddress = async (address: string): Promise<{lat: number, lng: number} | null> => {
  try {
    // Utiliser Nominatim (gratuit) ou Google Geocoding API
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
    const data = await response.json()
    
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      }
    }
    return null
  } catch (error) {
    console.error('Geocoding error:', error)
    return null
  }
}
