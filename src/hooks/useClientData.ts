import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Business {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  logo_url: string | null;
  description: string | null;
  category: string;
  address: string | null;
  opening_hours: any;
  branding_color: string;
}

interface Service {
  id: string;
  business_id: string;
  name: string;
  description: string | null;
  price: number | null;
  duration_minutes: number | null;
  business?: Business;
}

interface Appointment {
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
}

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
        .select('*')
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
          *,
          business:businesses(*)
        `)
        .eq('is_active', true)
        .eq('business.is_approved', true)
        .eq('business.is_active', true);

      if (error) throw error;
      setServices(data || []);
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
          *,
          business:businesses(*),
          service:services(*)
        `)
        .eq('client_id', profile.id)
        .order('appointment_date', { ascending: false })
        .order('appointment_time', { ascending: false });

      if (error) throw error;
      setAppointments(data || []);
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
          *,
          business:businesses(*),
          service:services(*)
        `)
        .single();

      if (error) throw error;
      
      setAppointments(prev => [data, ...prev]);
      return { data, error: null };
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