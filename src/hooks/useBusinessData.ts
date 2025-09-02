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
  is_approved: boolean;
  is_active: boolean;
  created_at: string;
}

interface Service {
  id: string;
  business_id: string;
  name: string;
  description: string | null;
  price: number | null;
  duration_minutes: number | null;
  is_active: boolean;
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
  service: Service;
  client: {
    full_name: string;
    email: string;
    phone: string | null;
  };
}

export const useBusinessData = () => {
  const { profile } = useAuth();
  const [business, setBusiness] = useState<Business | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBusiness = async () => {
    if (!profile?.id || profile.role !== 'business') return;

    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('owner_id', profile.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No business found, this is normal for new business users
          setBusiness(null);
        } else {
          throw error;
        }
      } else {
        setBusiness(data);
      }
    } catch (err) {
      console.error('Error fetching business:', err);
      setError('Failed to load business data');
    }
  };

  const fetchServices = async (businessId: string) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('business_id', businessId)
        .eq('is_active', true);

      if (error) throw error;
      setServices(data || []);
    } catch (err) {
      console.error('Error fetching services:', err);
    }
  };

  const fetchAppointments = async (businessId: string) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          service:services(*),
          client:profiles(full_name, email, phone)
        `)
        .eq('business_id', businessId)
        .order('appointment_date', { ascending: true })
        .order('appointment_time', { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

  const createBusiness = async (businessData: {
    name: string;
    email: string;
    phone?: string;
    description?: string;
    category: 'restaurant' | 'salon' | 'hotel' | 'lawyer' | 'real_estate' | 'mechanic' | 'healthcare' | 'fitness' | 'beauty' | 'education' | 'other';
    address?: string;
  }) => {
    if (!profile?.id) return { error: 'No user logged in' };

    try {
      const { data, error } = await supabase
        .from('businesses')
        .insert({
          owner_id: profile.id,
          ...businessData
        })
        .select()
        .single();

      if (error) throw error;

      // Create default business settings
      await supabase
        .from('business_settings')
        .insert({
          business_id: data.id,
          chat_enabled: true,
          accept_payments: false,
          auto_confirm_bookings: false
        });

      setBusiness(data);
      return { data, error: null };
    } catch (err) {
      console.error('Error creating business:', err);
      return { error: err };
    }
  };

  const createService = async (serviceData: {
    name: string;
    description?: string;
    price?: number;
    duration_minutes?: number;
  }) => {
    if (!business?.id) return { error: 'No business found' };

    try {
      const { data, error } = await supabase
        .from('services')
        .insert({
          business_id: business.id,
          ...serviceData
        })
        .select()
        .single();

      if (error) throw error;
      setServices(prev => [...prev, data]);
      return { data, error: null };
    } catch (err) {
      console.error('Error creating service:', err);
      return { error: err };
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, status: 'confirmed' | 'cancelled' | 'completed') => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', appointmentId);

      if (error) throw error;
      
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId ? { ...apt, status } : apt
        )
      );
      
      return { error: null };
    } catch (err) {
      console.error('Error updating appointment status:', err);
      return { error: err };
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchBusiness();
      setLoading(false);
    };

    if (profile) {
      loadData();
    }
  }, [profile]);

  useEffect(() => {
    if (business?.id) {
      fetchServices(business.id);
      fetchAppointments(business.id);
    }
  }, [business]);

  return {
    business,
    services,
    appointments,
    loading,
    error,
    createBusiness,
    createService,
    updateAppointmentStatus,
    refetch: () => {
      if (business?.id) {
        fetchServices(business.id);
        fetchAppointments(business.id);
      }
    }
  };
};