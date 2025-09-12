import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { BusinessWithExtras, ServiceWithBusiness, AppointmentWithRelations } from '@/types/database';

export const useBusinessData = () => {
  const { profile } = useAuth();
  const [business, setBusiness] = useState<BusinessWithExtras | null>(null);
  const [services, setServices] = useState<ServiceWithBusiness[]>([]);
  const [appointments, setAppointments] = useState<AppointmentWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBusiness = async () => {
    if (!profile?.id) return;

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
        // Map database fields to expected interface
        const businessData: BusinessWithExtras = {
          ...data,
          brand_primary: data.brand_color, // Map for backwards compatibility
          brand_secondary: data.brand_color,
          brand_accent: data.brand_color,
          image_url: data.logo_url
        };
        setBusiness(businessData);
      }
    } catch (err) {
      console.error('Error fetching business:', err);
      setError('Failed to load business data');
    }
  };

  const fetchServices = async () => {
    if (!business?.id) return;

    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('business_id', business.id)
        .order('name');

      if (error) throw error;
      setServices(data || []);
    } catch (err) {
      console.error('Error fetching services:', err);
    }
  };

  const fetchAppointments = async () => {
    if (!business?.id) return;

    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          profiles!inner(full_name, email)
        `)
        .eq('business_id', business.id)
        .order('appointment_date', { ascending: false })
        .order('appointment_time', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match expected format
      const transformedData = data?.map(item => ({
        ...item,
        client: item.profiles ? {
          full_name: item.profiles.full_name,
          email: item.profiles.email
        } : null
      })) || [];
      
      setAppointments(transformedData);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

  const createBusiness = async (businessData: {
    name: string;
    description?: string;
    address?: string;
    phone?: string;
    email: string;
    category: string;
  }) => {
    if (!profile?.id) return { error: 'Not logged in' };

    try {
      const { data, error } = await supabase
        .from('businesses')
        .insert({
          owner_id: profile.id,
          ...businessData,
          is_approved: false,
          is_active: true
        } as any)
        .select()
        .single();

      if (error) throw error;

      // Map database fields to expected interface
      const businessData_mapped: BusinessWithExtras = {
        ...data,
        brand_primary: data.brand_color,
        brand_secondary: data.brand_color,
        brand_accent: data.brand_color,
        image_url: data.logo_url
      };
      
      setBusiness(businessData_mapped);
      return { data: businessData_mapped, error: null };
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
          ...serviceData,
          is_active: true
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

  const updateAppointmentStatus = async (appointmentId: string, status: 'pending' | 'confirmed' | 'cancelled' | 'completed') => {
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
      console.error('Error updating appointment:', err);
      return { error: err };
    }
  };

  const deleteService = async (serviceId: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId);

      if (error) throw error;
      
      setServices(prev => prev.filter(service => service.id !== serviceId));
      return { error: null };
    } catch (err) {
      console.error('Error deleting service:', err);
      return { error: err };
    }
  };

  useEffect(() => {
    if (profile) {
      fetchBusiness();
    }
  }, [profile]);

  useEffect(() => {
    if (business) {
      fetchServices();
      fetchAppointments();
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
    deleteService,
    refetch: () => {
      fetchBusiness();
      if (business) {
        fetchServices();
        fetchAppointments();
      }
    }
  };
};