<<<<<<< HEAD
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Users, 
  Settings, 
  Star,
  Clock,
  Mail,
  Phone,
  MapPin,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle,
  LogOut
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useBusinessData } from '@/hooks/useBusinessData';
import { useToast } from '@/hooks/use-toast';
import BusinessSetup from '@/components/business/BusinessSetup';
import ServiceForm from '@/components/business/ServiceForm';
import { useNavigate } from 'react-router-dom';

const BusinessDashboard = () => {
  const { language } = useLanguage();
  const { signOut, profile } = useAuth();
  const { business, services, appointments, loading, createBusiness, createService, updateAppointmentStatus } = useBusinessData();
  const [showServiceForm, setShowServiceForm] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // If business doesn't exist, show setup form
  if (!loading && !business) {
    return <BusinessSetup onBusinessCreated={() => {
      // The createBusiness function already updates the business state
      // No need to reload the page, the component will re-render automatically
      toast({
        title: "Welcome to Bizli Solution!",
        description: "Your business dashboard is now ready.",
      });
    }} createBusiness={createBusiness} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your business dashboard...</p>
        </div>
=======
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  MessageSquare, 
  Bell, 
  Settings,
  Globe,
  MessageCircle,
  Plus,
  Edit,
  Trash2,
  LogOut,
  DollarSign,
  TrendingUp,
  Clock,
  Star,
  Link as LinkIcon,
  Eye,
  EyeOff,
  Upload,
  Save
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, Business, Service, Appointment, Client, updateBusinessClientPaymentUrl, updateUserProfile } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { BusinessRevenueTracker } from "@/components/payment/BusinessRevenueTracker";

// API call helper for checkout session
async function createCheckoutSession(businessId: string, plan: 'Pro' | 'Business' | 'Enterprise') {
  const baseUrl = import.meta.env.VITE_SUPABASE_URL?.replace('/rest/v1', '');
  const url = `${baseUrl}/functions/v1/create-checkout-session`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ business_id: businessId, plan })
  });
  if (!res.ok) throw new Error('Failed to create checkout session');
  const data = await res.json();
  return data.url as string;
}

const BusinessDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [business, setBusiness] = useState<Business | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddService, setShowAddService] = useState(false);
  const [showAddAppointment, setShowAddAppointment] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const { toast } = useToast();

  const [branding, setBranding] = useState({
    logoUrl: '',
    primary: '#3C50E0',
    secondary: '#38BDF8',
    accent: '#F97316'
  });
  const [savingBranding, setSavingBranding] = useState(false);
  const [previewBranding, setPreviewBranding] = useState(false);
  const [addingService, setAddingService] = useState(false);
  const [addingAppointment, setAddingAppointment] = useState(false);

  // Payments
  const [clientPaymentUrl, setClientPaymentUrl] = useState("");
  const [savingPaymentUrl, setSavingPaymentUrl] = useState(false);
  const PLAN_PRO = import.meta.env.VITE_STRIPE_PLAN_PRO as string | undefined;
  const PLAN_BUSINESS = import.meta.env.VITE_STRIPE_PLAN_BUSINESS as string | undefined;
  const PLAN_ENTERPRISE = import.meta.env.VITE_STRIPE_PLAN_ENTERPRISE as string | undefined;

  // Form states
  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    price: '',
    duration_minutes: ''
  });
  const [appointmentForm, setAppointmentForm] = useState({
    client_id: '',
    service_id: '',
    appointment_date: '',
    appointment_time: '',
    notes: ''
  });

  const hexToHsl = (hex: string) => {
    let r = 0, g = 0, b = 0;
    const full = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const short = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(hex);
    if (full) { r = parseInt(full[1], 16); g = parseInt(full[2], 16); b = parseInt(full[3], 16); }
    else if (short) { r = parseInt(short[1] + short[1], 16); g = parseInt(short[2] + short[2], 16); b = parseInt(short[3] + short[3], 16); }
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0; const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 1); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  const brandingVars = previewBranding ? {
    ['--primary' as any]: hexToHsl(branding.primary),
    ['--secondary' as any]: hexToHsl(branding.secondary),
    ['--accent' as any]: hexToHsl(branding.accent),
  } : undefined;

  useEffect(() => {
    fetchBusinessData();
  }, []);

  const fetchBusinessData = async () => {
    try {
      setLoading(true);
      
      // Fetch business data (mock for demo)
      const mockBusiness: Business = {
        id: '1',
        name: 'Glo Salon',
        description: 'Professional hair salon with expert stylists',
        address: '123 Main St, City, State',
        phone: '(555) 123-4567',
        email: 'info@glosalon.com',
        category: 'Beauty',
        rating: 4.8,
        client_payment_url: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setBusiness(mockBusiness);
      setClientPaymentUrl(mockBusiness.client_payment_url || "");
      setBranding(prev => ({
        ...prev,
        logoUrl: mockBusiness.image_url || '',
        primary: (mockBusiness as any).brand_primary || prev.primary,
        secondary: (mockBusiness as any).brand_secondary || prev.secondary,
        accent: (mockBusiness as any).brand_accent || prev.accent
      }));

      // Fetch services
      const mockServices: Service[] = [
        {
          id: '1',
          business_id: '1',
          name: 'Haircut',
          description: 'Professional haircut and styling',
          price: 50,
          duration_minutes: 60,
          online_payment_enabled: true,
          payment_required: false,
          is_active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          business_id: '1',
          name: 'Hair Color',
          description: 'Full hair coloring service',
          price: 120,
          duration_minutes: 120,
          online_payment_enabled: true,
          payment_required: true,
          is_active: true,
          created_at: new Date().toISOString()
        }
      ];
      setServices(mockServices);

      // Fetch appointments
      const mockAppointments: Appointment[] = [
        {
          id: '1',
          client_id: '1',
          business_id: '1',
          service_id: '1',
          appointment_date: '2024-04-27',
          appointment_time: '09:00:00',
          status: 'confirmed',
          notes: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      setAppointments(mockAppointments);

      // Fetch clients
      const mockClients: Client[] = [
        {
          id: '1',
          name: 'John Smith',
          email: 'john@email.com',
          phone: '(555) 111-2222',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      setClients(mockClients);

    } catch (error) {
      console.error('Error fetching business data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async () => {
    try {
      setAddingService(true);
      const newService: Service = {
        id: Date.now().toString(),
        business_id: business?.id || '1',
        name: serviceForm.name,
        description: serviceForm.description,
        price: parseFloat(serviceForm.price),
        duration_minutes: parseInt(serviceForm.duration_minutes),
        created_at: new Date().toISOString()
      };
      
      setServices([...services, newService]);
      setServiceForm({ name: '', description: '', price: '', duration_minutes: '' });
      setShowAddService(false);
      toast({ title: 'Service added', description: `${newService.name} created.` });
    } catch (error) {
      console.error('Error adding service:', error);
      toast({ title: 'Failed to add service', variant: 'destructive' });
    } finally {
      setAddingService(false);
    }
  };

  const handleEditService = async (service: Service) => {
    try {
      setServices(services.map(s => s.id === service.id ? service : s));
      setEditingService(null);
    } catch (error) {
      console.error('Error editing service:', error);
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    try {
      // In a real app, you would delete from Supabase
      // await supabase.from('services').delete().eq('id', serviceId);
      
      setServices(services.filter(s => s.id !== serviceId));
      toast({ 
        title: 'Service Deleted', 
        description: 'The service has been removed from your offerings.' 
      });
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({ 
        title: 'Delete Failed', 
        description: 'Unable to delete service. Please try again.', 
        variant: 'destructive' 
      });
    }
  };

  const handleToggleService = async (serviceId: string) => {
    try {
      // Toggle service visibility/availability
      setServices(services.map(s => 
        s.id === serviceId 
          ? { ...s, is_active: !s.is_active } 
          : s
      ));
      
      const service = services.find(s => s.id === serviceId);
      const newStatus = !service?.is_active;
      
      toast({ 
        title: newStatus ? 'Service Activated' : 'Service Deactivated', 
        description: newStatus 
          ? 'The service is now available for booking.' 
          : 'The service has been hidden from clients.' 
      });
    } catch (error) {
      console.error('Error toggling service:', error);
      toast({ 
        title: 'Update Failed', 
        description: 'Unable to update service status.', 
        variant: 'destructive' 
      });
    }
  };

  const handleAddAppointment = async () => {
    try {
      setAddingAppointment(true);
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        client_id: appointmentForm.client_id,
        business_id: business?.id || '1',
        service_id: appointmentForm.service_id,
        appointment_date: appointmentForm.appointment_date,
        appointment_time: appointmentForm.appointment_time,
        status: 'pending',
        notes: appointmentForm.notes,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setAppointments([...appointments, newAppointment]);
      setAppointmentForm({ client_id: '', service_id: '', appointment_date: '', appointment_time: '', notes: '' });
      setShowAddAppointment(false);
      toast({ title: 'Appointment added' });
    } catch (error) {
      console.error('Error adding appointment:', error);
      toast({ title: 'Failed to add appointment', variant: 'destructive' });
    } finally {
      setAddingAppointment(false);
    }
  };

  const handleLogoUpload = async (file: File) => {
    try {
      if (!file || !business?.id) return;
      const path = `${business.id}/${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage.from('logos').upload(path, file, { upsert: true });
      if (error) throw error;
      const { data: pub } = supabase.storage.from('logos').getPublicUrl(path);
      const url = pub?.publicUrl || '';
      setBranding(b => ({ ...b, logoUrl: url }));
      await supabase.from('businesses')
        .update({ image_url: url })
        .eq('id', business.id);
      toast({ title: 'Logo updated', description: 'Your logo has been uploaded.' });
    } catch (e) {
      console.error(e);
      toast({ title: 'Upload failed', description: 'Unable to upload logo.', variant: 'destructive' });
    }
  };

  const handleSaveBranding = async () => {
    if (!business?.id && !user?.id) {
      toast({ title: 'Error', description: 'Unable to save branding. User not found.', variant: 'destructive' });
      return;
    }
    
    setSavingBranding(true);
    try {
      // Save to businesses table if business exists
      if (business?.id) {
        await supabase.from('businesses')
          .update({
            brand_primary: branding.primary,
            brand_secondary: branding.secondary,
            brand_accent: branding.accent,
            image_url: branding.logoUrl
          })
          .eq('id', business.id);
      }
      
      // Also save logo to user profile for immediate display
      if (user?.id && branding.logoUrl) {
        await updateUserProfile(user.id, {
          avatar_url: branding.logoUrl
        });
        
        // Update local user data
        const updatedUser = { ...user, avatar_url: branding.logoUrl };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      toast({ 
        title: 'Branding Saved!', 
        description: 'Your logo and brand colors have been updated successfully.' 
      });
      
      // Force a small delay to show the changes
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (e) {
      console.error(e);
      toast({ 
        title: 'Save Failed', 
        description: 'Unable to save branding. Please try again.', 
        variant: 'destructive' 
      });
    } finally {
      setSavingBranding(false);
    }
  };

  const saveClientPayment = async () => {
    if (!business?.id) return;
    try {
      setSavingPaymentUrl(true);
      await updateBusinessClientPaymentUrl(business.id, clientPaymentUrl);
      toast({ title: 'Payment URL saved', description: 'Public payment button will use this link.' });
    } catch (e) {
      console.error(e);
      toast({ title: 'Save failed', description: 'Unable to save payment URL.', variant: 'destructive' });
    } finally {
      setSavingPaymentUrl(false);
    }
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
  return (
      <div className="flex h-screen bg-muted items-center justify-center">
        <div className="text-xl">Loading...</div>
>>>>>>> 6ae5ed6 (Sync changes to Lovable)
      </div>
    );
  }

<<<<<<< HEAD
  const sidebarItems = [
    { icon: Calendar, label: language === 'en' ? 'Dashboard' : 'Tablero', active: true },
    { icon: Users, label: language === 'en' ? 'Clients' : 'Clientes', badge: appointments.length.toString() },
    { icon: Settings, label: language === 'en' ? 'Services' : 'Servicios', badge: services.length.toString() },
    { icon: Star, label: language === 'en' ? 'Reviews' : 'Reseñas' },
    { icon: Mail, label: language === 'en' ? 'Messages' : 'Mensajes' },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 bg-card border-r border-border flex flex-col">
        {/* Business Brand */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                {business?.name?.charAt(0) || 'B'}
              </span>
            </div>
            <div>
              <h2 className="font-semibold text-card-foreground">{business?.name || 'Your Business'}</h2>
              <p className="text-sm text-muted-foreground capitalize">{business?.category || 'Business'}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            {sidebarItems.map((item, index) => (
              <div key={index} className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors ${
                item.active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}>
                <item.icon className="w-5 h-5" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </div>
            ))}
          </nav>
        </div>
        
        {/* Logout Button */}
        <div className="p-4 border-t border-border">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 text-muted-foreground"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4" />
            {language === 'en' ? 'Sign Out' : 'Cerrar Sesión'}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="p-6 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-card-foreground">
              {language === 'en' ? 'Business Dashboard' : 'Panel de Negocio'}
            </h1>
            <Button variant="outline" size="sm" className="gap-2">
              <Users className="w-4 h-4" />
              {profile?.full_name || 'Business Owner'}
            </Button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Business Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    {language === 'en' ? 'Business Information' : 'Información del Negocio'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {business?.email}
                  </div>
                  {business?.phone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      {business.phone}
                    </div>
                  )}
                  {business?.address && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {business.address}
                    </div>
                  )}
                  <div className="pt-2">
                    <Badge variant={business?.is_approved ? "default" : "secondary"}>
                      {business?.is_approved ? 
                        (language === 'en' ? 'Approved' : 'Aprobado') : 
                        (language === 'en' ? 'Pending Approval' : 'Pendiente de Aprobación')
                      }
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Services Card with Add Button */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      {language === 'en' ? 'Your Services' : 'Tus Servicios'}
                    </CardTitle>
                    <Button 
                      size="sm" 
                      onClick={() => setShowServiceForm(true)}
                      className="gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      {language === 'en' ? 'Add Service' : 'Agregar Servicio'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {services.length > 0 ? (
                    <div className="space-y-3">
                      {services.map((service) => (
                        <div key={service.id} className="flex items-center justify-between p-3 bg-background-secondary rounded-md">
                          <div>
                            <h4 className="font-medium">{service.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {service.price && `$${service.price}`}
                              {service.price && service.duration_minutes && ' • '}
                              {service.duration_minutes && `${service.duration_minutes} min`}
                            </p>
                          </div>
                          <Badge variant="outline">
                            {language === 'en' ? 'Active' : 'Activo'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <Star className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>{language === 'en' ? 'No services yet' : 'No hay servicios aún'}</p>
                      <p className="text-sm">{language === 'en' ? 'Add your first service to get started' : 'Agrega tu primer servicio para comenzar'}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    {language === 'en' ? 'Quick Stats' : 'Estadísticas Rápidas'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Total Services' : 'Servicios Totales'}
                    </span>
                    <span className="font-medium">{services.length}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Total Appointments' : 'Citas Totales'}
                    </span>
                    <span className="font-medium">{appointments.length}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    {language === 'en' ? 'Recent Appointments' : 'Citas Recientes'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {appointments.length > 0 ? (
                    <div className="space-y-3">
                      {appointments.slice(0, 3).map((appointment) => (
                        <div key={appointment.id} className="p-3 bg-background-secondary rounded-md">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium">{appointment.client?.full_name}</h4>
                            <Badge variant="outline" className="capitalize">
                              {appointment.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {appointment.service?.name} • {appointment.appointment_date}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>{language === 'en' ? 'No appointments yet' : 'No hay citas aún'}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Service Form Modal */}
      <ServiceForm
        open={showServiceForm}
        onOpenChange={setShowServiceForm}
        onServiceCreated={() => {
          setShowServiceForm(false);
          toast({
            title: "Service Created!",
            description: "Your new service has been added successfully.",
          });
        }}
        createService={createService}
      />
=======
  return (
    <div className="min-h-screen bg-muted" style={brandingVars as any}>
        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Content - Main Dashboard */}
            <div className="lg:col-span-2 space-y-6">
              {/* Business Info Card */}
            <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-primary rounded-md flex items-center justify-center text-primary-foreground text-2xl font-bold overflow-hidden">
                    {branding.logoUrl ? (
                      <img src={branding.logoUrl} alt="Business Logo" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl font-bold">$</span>
                    )}
                  </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-primary font-medium">Edit Business information</p>
                          <h2 className="text-xl font-bold text-foreground mt-1">{user?.business_name || business?.name || 'Your Business'}</h2>
                        </div>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">View profile</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Business Profile</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                                  {branding.logoUrl ? (
                                    <img src={branding.logoUrl} className="w-full h-full object-cover" alt="logo" />
                                  ) : (
                                    <span className="text-xs text-muted-foreground">Logo</span>
                                  )}
                                </div>
                                  <div>
                                    <p className="font-semibold text-foreground">{user?.business_name || business?.name}</p>
                                    <p className="text-sm text-muted-foreground">{user?.email || business?.email}</p>
                                  </div>
                              </div>
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                  <p className="text-muted-foreground">{user?.business_address || business?.address}</p>
                                  <p className="text-muted-foreground">{user?.phone || business?.phone}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Hours: 09:00 - 18:00</p>
                                  <p className="text-muted-foreground">Category: {user?.business_category || business?.category}</p>
                                </div>
                              </div>
                              <div>
                                <p className="font-medium text-foreground mb-2">Services</p>
                                <div className="flex flex-wrap gap-2">
                                  {services.map(s => (
                                    <Badge key={s.id} variant="secondary">{s.name}</Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-primary text-primary hover:bg-primary/10"
                          onClick={() => navigate('/business/profile')}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div>
                        <p className="text-muted-foreground">{business?.address}</p>
                        <p className="text-muted-foreground">{business?.phone}</p>
                        </div>
                        <div>
                        <p className="text-muted-foreground">09:00 AM - 06:00 PM</p>
                        <p className="text-muted-foreground">{business?.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Branding */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-foreground">Branding</CardTitle>
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-muted-foreground">Preview</label>
                    <Button
                      variant={previewBranding ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewBranding(v => !v)}
                    >
                      {previewBranding ? 'On' : 'Off'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Logo Upload Section */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold text-foreground">Business Logo</Label>
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-lg bg-muted overflow-hidden flex items-center justify-center border-2 border-dashed border-border">
                      {branding.logoUrl ? (
                        <img src={branding.logoUrl} alt="Business Logo" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center">
                          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <span className="text-xs text-muted-foreground">Upload Logo</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="logo-upload">Upload Business Logo</Label>
                      <Input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleLogoUpload(f);
                        }}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#F97316] file:text-white hover:file:bg-[#EA580C] file:cursor-pointer"
                      />
                      <p className="text-xs text-muted-foreground">
                        Recommended: 200x200px, PNG or JPG format
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Color Customization */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold text-foreground">Brand Colors</Label>
                  <p className="text-sm text-muted-foreground">
                    Customize your dashboard colors to match your brand identity
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="brand-primary" className="text-sm font-medium">Primary Color</Label>
                      <div className="flex items-center space-x-3">
                        <input
                          id="brand-primary"
                          type="color"
                          value={branding.primary}
                          onChange={(e) => setBranding({ ...branding, primary: e.target.value })}
                          className="w-12 h-12 rounded-lg cursor-pointer border border-border"
                        />
                        <div className="flex-1">
                          <Input
                            value={branding.primary}
                            onChange={(e) => setBranding({ ...branding, primary: e.target.value })}
                            placeholder="#3C50E0"
                            className="font-mono text-sm"
                          />
                          <p className="text-xs text-muted-foreground mt-1">Main brand color</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="brand-secondary" className="text-sm font-medium">Secondary Color</Label>
                      <div className="flex items-center space-x-3">
                        <input
                          id="brand-secondary"
                          type="color"
                          value={branding.secondary}
                          onChange={(e) => setBranding({ ...branding, secondary: e.target.value })}
                          className="w-12 h-12 rounded-lg cursor-pointer border border-border"
                        />
                        <div className="flex-1">
                          <Input
                            value={branding.secondary}
                            onChange={(e) => setBranding({ ...branding, secondary: e.target.value })}
                            placeholder="#38BDF8"
                            className="font-mono text-sm"
                          />
                          <p className="text-xs text-muted-foreground mt-1">Supporting color</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="brand-accent" className="text-sm font-medium">Accent Color</Label>
                      <div className="flex items-center space-x-3">
                        <input
                          id="brand-accent"
                          type="color"
                          value={branding.accent}
                          onChange={(e) => setBranding({ ...branding, accent: e.target.value })}
                          className="w-12 h-12 rounded-lg cursor-pointer border border-border"
                        />
                        <div className="flex-1">
                          <Input
                            value={branding.accent}
                            onChange={(e) => setBranding({ ...branding, accent: e.target.value })}
                            placeholder="#F97316"
                            className="font-mono text-sm"
                          />
                          <p className="text-xs text-muted-foreground mt-1">Action color</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Color Preview */}
                  {previewBranding && (
                    <div className="p-4 bg-muted/30 rounded-lg border">
                      <p className="text-sm font-medium text-foreground mb-3">Color Preview:</p>
                      <div className="flex items-center space-x-4">
                        <div 
                          className="w-8 h-8 rounded-md" 
                          style={{ backgroundColor: branding.primary }}
                          title="Primary"
                        ></div>
                        <div 
                          className="w-8 h-8 rounded-md" 
                          style={{ backgroundColor: branding.secondary }}
                          title="Secondary"
                        ></div>
                        <div 
                          className="w-8 h-8 rounded-md" 
                          style={{ backgroundColor: branding.accent }}
                          title="Accent"
                        ></div>
                        <span className="text-sm text-muted-foreground">
                          Toggle preview to see colors applied to your dashboard
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setBranding({
                        logoUrl: branding.logoUrl,
                        primary: '#3C50E0',
                        secondary: '#38BDF8',
                        accent: '#F97316'
                      });
                      toast({ title: 'Colors Reset', description: 'Brand colors have been reset to default.' });
                    }}
                    className="hover:bg-muted transition-colors"
                  >
                    Reset to Default
                  </Button>
                  <Button
                    onClick={handleSaveBranding}
                    className="bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold transition-all duration-200 hover:scale-105"
                    disabled={savingBranding}
                  >
                    {savingBranding ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Saving...
                      </div>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Branding
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
              </Card>

              {/* Services */}
            <Card className="shadow-lg border-0">
                <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-foreground">Services</CardTitle>
                  <Dialog open={showAddService} onOpenChange={setShowAddService}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-primary hover:bg-primary-dark text-primary-foreground">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Service
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Service</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="service-name">Service Name</Label>
                          <Input
                            id="service-name"
                            value={serviceForm.name}
                            onChange={(e) => setServiceForm({...serviceForm, name: e.target.value})}
                            placeholder="Enter service name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="service-description">Description</Label>
                          <Textarea
                            id="service-description"
                            value={serviceForm.description}
                            onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                            placeholder="Enter service description"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="service-price">Price ($)</Label>
                            <Input
                              id="service-price"
                              type="number"
                              value={serviceForm.price}
                              onChange={(e) => setServiceForm({...serviceForm, price: e.target.value})}
                              placeholder="0.00"
                            />
                          </div>
                          <div>
                            <Label htmlFor="service-duration">Duration (minutes)</Label>
                            <Input
                              id="service-duration"
                              type="number"
                              value={serviceForm.duration_minutes}
                              onChange={(e) => setServiceForm({...serviceForm, duration_minutes: e.target.value})}
                              placeholder="60"
                            />
                          </div>
                        </div>
                        <Button
                          onClick={handleAddService}
                          className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
                          disabled={addingService}
                        >
                          {addingService ? 'Adding…' : 'Add Service'}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                </CardHeader>
              <CardContent className="space-y-3">
                {services.map((service) => (
                  <div 
                    key={service.id} 
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                      service.is_active 
                        ? 'bg-muted/30 border-border/50 hover:bg-muted/50' 
                        : 'bg-muted/10 border-muted-foreground/20 opacity-60'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span className={`font-medium ${service.is_active ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {service.name}
                        </span>
                        <div className="flex items-center space-x-2">
                          {service.online_payment_enabled && (
                            <Badge variant="secondary" className="text-xs">Online Pay</Badge>
                          )}
                          {service.payment_required && (
                            <Badge variant="outline" className="text-xs">Required</Badge>
                          )}
                          <Badge 
                            variant={service.is_active ? "default" : "secondary"} 
                            className="text-xs"
                          >
                            {service.is_active ? 'Active' : 'Hidden'}
                          </Badge>
                        </div>
                      </div>
                      <p className={`text-sm mt-1 ${service.is_active ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>
                        {service.description}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <span>{service.duration_minutes} min</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`font-semibold text-lg ${service.is_active ? 'text-[#F97316]' : 'text-muted-foreground'}`}>
                        ${service.price}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleToggleService(service.id)}
                          className={`hover:bg-${service.is_active ? 'warning' : 'success'}/10 hover:text-${service.is_active ? 'warning' : 'success'}`}
                          title={service.is_active ? 'Hide service' : 'Show service'}
                        >
                          {service.is_active ? (
                            <Eye className="w-4 h-4 text-warning" />
                          ) : (
                            <EyeOff className="w-4 h-4 text-muted-foreground" />
                          )}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setEditingService(service)}
                          className="hover:bg-primary/10 hover:text-primary"
                          title="Edit service"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${service.name}"? This action cannot be undone.`)) {
                              handleDeleteService(service.id);
                            }
                          }}
                          className="hover:bg-destructive/10 hover:text-destructive"
                          title="Delete service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              </Card>

              {/* Upcoming Appointments */}
            <Card className="shadow-lg border-0">
                <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-foreground">Upcoming Appointments</CardTitle>
                  <Dialog open={showAddAppointment} onOpenChange={setShowAddAppointment}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-primary hover:bg-primary-dark text-primary-foreground">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Appointment
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Appointment</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="appointment-client">Client</Label>
                          <Select value={appointmentForm.client_id} onValueChange={(value) => setAppointmentForm({...appointmentForm, client_id: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select client" />
                            </SelectTrigger>
                            <SelectContent>
                              {clients.map((client) => (
                                <SelectItem key={client.id} value={client.id}>
                                  {client.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="appointment-service">Service</Label>
                          <Select value={appointmentForm.service_id} onValueChange={(value) => setAppointmentForm({...appointmentForm, service_id: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select service" />
                            </SelectTrigger>
                            <SelectContent>
                              {services.map((service) => (
                                <SelectItem key={service.id} value={service.id}>
                                  {service.name} - ${service.price}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="appointment-date">Date</Label>
                            <Input
                              id="appointment-date"
                              type="date"
                              value={appointmentForm.appointment_date}
                              onChange={(e) => setAppointmentForm({...appointmentForm, appointment_date: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="appointment-time">Time</Label>
                            <Input
                              id="appointment-time"
                              type="time"
                              value={appointmentForm.appointment_time}
                              onChange={(e) => setAppointmentForm({...appointmentForm, appointment_time: e.target.value})}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="appointment-notes">Notes</Label>
                          <Textarea
                            id="appointment-notes"
                            value={appointmentForm.notes}
                            onChange={(e) => setAppointmentForm({...appointmentForm, notes: e.target.value})}
                            placeholder="Optional notes"
                          />
                        </div>
                        <Button
                          onClick={handleAddAppointment}
                          className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
                          disabled={addingAppointment}
                        >
                          {addingAppointment ? 'Adding…' : 'Add Appointment'}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                        <th className="text-left py-3 text-muted-foreground font-medium">Client</th>
                        <th className="text-left py-3 text-muted-foreground font-medium">Service</th>
                        <th className="text-left py-3 text-muted-foreground font-medium">Date</th>
                        <th className="text-left py-3 text-muted-foreground font-medium">Time</th>
                        <th className="text-left py-3 text-muted-foreground font-medium">Status</th>
                        <th className="text-left py-3 text-muted-foreground font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                      {appointments.map((appointment) => {
                        const client = clients.find(c => c.id === appointment.client_id);
                        const service = services.find(s => s.id === appointment.service_id);
                        return (
                          <tr key={appointment.id} className="border-b">
                            <td className="py-3 font-medium text-foreground">{client?.name}</td>
                            <td className="py-3 text-muted-foreground">{service?.name}</td>
                            <td className="py-3 text-muted-foreground">{formatDate(appointment.appointment_date)}</td>
                            <td className="py-3 text-muted-foreground">{formatTime(appointment.appointment_time)}</td>
                            <td className="py-3">
                              <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                                {appointment.status}
                              </Badge>
                            </td>
                            <td className="py-3">
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">

            {/* Client Payment URL */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">Customer Payments</CardTitle>
                </CardHeader>
              <CardContent className="space-y-3">
                <Label htmlFor="client-payment-url">Client Payment URL (Stripe)</Label>
                <Input
                  id="client-payment-url"
                  placeholder="https://checkout.stripe.com/pay/..."
                  value={clientPaymentUrl}
                  onChange={(e) => setClientPaymentUrl(e.target.value)}
                />
                <Button
                  onClick={saveClientPayment}
                  disabled={savingPaymentUrl}
                  className="w-full bg-primary text-primary-foreground hover:bg-accent hover:text-white transition"
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  {savingPaymentUrl ? 'Saving…' : 'Save Payment Link'}
                </Button>
                <p className="text-xs text-muted-foreground">
                  This link will be shown on your public page so clients can pay directly on your Stripe.
                </p>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="shadow-lg border-0">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-success/10 rounded-md flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                      <p className="text-lg font-bold text-foreground">$2,450</p>
                        </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Growth</p>
                      <p className="text-lg font-bold text-foreground">+12%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">New appointment booked</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">New client registered</p>
                    <p className="text-xs text-muted-foreground">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">New review received</p>
                    <p className="text-xs text-muted-foreground">6 hours ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:bg-[#F97316] hover:text-white hover:border-[#F97316] transition-all duration-200"
                  onClick={() => navigate('/business/messages')}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:bg-[#F97316] hover:text-white hover:border-[#F97316] transition-all duration-200"
                  onClick={() => navigate('/business/appointments')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  View Calendar
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:bg-[#F97316] hover:text-white hover:border-[#F97316] transition-all duration-200"
                  onClick={() => navigate('/business/profile')}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Revenue Tracking Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Revenue & Payments</h2>
          <BusinessRevenueTracker businessId={business?.id || '1'} />
        </div>
      </div>
>>>>>>> 6ae5ed6 (Sync changes to Lovable)
    </div>
  );
};

export default BusinessDashboard;