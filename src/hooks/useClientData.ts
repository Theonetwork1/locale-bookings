import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

// Use Supabase generated types from the database
type Business = {
  id: string;
  name: string;
  logo_url: string | null;
  description: string | null;
  category: string;
  address: string | null;
  opening_hours: any;
  brand_color: string | null;
  is_approved: boolean;
  is_active: boolean;
};

type Service = {
  id: string;
  business_id: string;
  name: string;
  description: string | null;
  price: number | null;
  duration_minutes: number | null;
  is_active: boolean;
  business?: Business;
};

type Appointment = {
  id: string;
  client_id: string;
  business_id: string;
  service_id: string;
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes: string | null;
  business?: Business;
  service?: Service;
};

export const useClientData = () => {
  const { profile } = useAuth();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBusinesses = async () => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('id, name, logo_url, description, category, address, opening_hours, brand_color, is_approved, is_active')
        .eq('is_approved', true)
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setBusinesses(data || []);
    } catch (err) {
      console.error('Error fetching businesses:', err);
      setError('Failed to load businesses');
    }
  };

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select(`
          id, business_id, name, description, price, duration_minutes, is_active,
          businesses!inner(id, name, logo_url, description, category, address, opening_hours, brand_color, is_approved, is_active)
        `)
        .eq('is_active', true)
        .eq('businesses.is_approved', true)
        .eq('businesses.is_active', true);

      if (error) throw error;
      
      // Transform the joined data
      const transformedData = data?.map(item => ({
        id: item.id,
        business_id: item.business_id,
        name: item.name,
        description: item.description,
        price: item.price,
        duration_minutes: item.duration_minutes,
        is_active: item.is_active,
        business: Array.isArray(item.businesses) ? item.businesses[0] : item.businesses
      })) || [];
      
      setServices(transformedData);
    } catch (err) {
      console.error('Error fetching services:', err);
    }
  };

  const fetchMyAppointments = async () => {
    if (!profile?.id) return;

    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          id, client_id, business_id, service_id, appointment_date, appointment_time, status, notes,
          businesses!inner(id, name, logo_url, description, category, address, opening_hours, brand_color),
          services!inner(id, name, description, price, duration_minutes)
        `)
        .eq('client_id', profile.id)
        .order('appointment_date', { ascending: false })
        .order('appointment_time', { ascending: false });

      if (error) throw error;
      
      // Transform the joined data
      const transformedData = data?.map(item => ({
        id: item.id,
        client_id: item.client_id,
        business_id: item.business_id,
        service_id: item.service_id,
        appointment_date: item.appointment_date,
        appointment_time: item.appointment_time,
        status: item.status,
        notes: item.notes,
        business: Array.isArray(item.businesses) ? item.businesses[0] : item.businesses,
        service: Array.isArray(item.services) ? item.services[0] : item.services
      })) || [];
      
      setAppointments(transformedData);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

  const bookAppointment = async (appointmentData: {
    business_id: string;
    service_id: string;
    appointment_date: string;
    appointment_time: string;
    notes?: string;
  }) => {
    if (!profile?.id) return { error: 'Not logged in' };

    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert({
          client_id: profile.id,
          ...appointmentData
        })
        .select(`
          id, client_id, business_id, service_id, appointment_date, appointment_time, status, notes,
          businesses!inner(id, name, logo_url, description, category, address, opening_hours, brand_color),
          services!inner(id, name, description, price, duration_minutes)
        `)
        .single();

      if (error) throw error;
      
      // Transform the joined data
      const transformedData = {
        id: data.id,
        client_id: data.client_id,
        business_id: data.business_id,
        service_id: data.service_id,
        appointment_date: data.appointment_date,
        appointment_time: data.appointment_time,
        status: data.status,
        notes: data.notes,
        business: Array.isArray(data.businesses) ? data.businesses[0] : data.businesses,
        service: Array.isArray(data.services) ? data.services[0] : data.services
      };
      
      setAppointments(prev => [transformedData, ...prev]);
      return { data: transformedData, error: null };
    } catch (err) {
      console.error('Error booking appointment:', err);
      return { error: err };
    }
  };

  const cancelAppointment = async (appointmentId: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: 'cancelled' })
        .eq('id', appointmentId);

      if (error) throw error;
      
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId ? { ...apt, status: 'cancelled' as const } : apt
        )
      );
      
      return { error: null };
    } catch (err) {
      console.error('Error cancelling appointment:', err);
      return { error: err };
    }
  };

  const searchBusinesses = (query: string, category?: string) => {
    let filtered = businesses;
    
    if (query) {
      filtered = filtered.filter(business => 
        business.name.toLowerCase().includes(query.toLowerCase()) ||
        business.description?.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (category && category !== 'all') {
      filtered = filtered.filter(business => business.category === category);
    }
    
    return filtered;
  };

  const getServicesByBusiness = (businessId: string) => {
    return services.filter(service => service.business_id === businessId);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchBusinesses(),
        fetchServices(),
        fetchMyAppointments()
      ]);
      setLoading(false);
    };

    if (profile) {
      loadData();
    }
  }, [profile]);

  return {
    businesses,
    services,
    appointments,
    loading,
    error,
    bookAppointment,
    cancelAppointment,
    searchBusinesses,
    getServicesByBusiness,
    refetch: () => {
      fetchBusinesses();
      fetchServices();
      fetchMyAppointments();
    }
  };
};