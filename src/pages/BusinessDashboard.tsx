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
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "@/hooks/useTranslations";
import { BusinessRevenueTracker } from "@/components/payment/BusinessRevenueTracker";

interface Business {
  id: string;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email: string;
  category: string;
  rating?: number;
  image_url?: string;
  brand_primary?: string;
  brand_secondary?: string;
  brand_accent?: string;
  client_payment_url?: string;
  created_at: string;
  updated_at: string;
}

interface Service {
  id: string;
  business_id: string;
  name: string;
  description?: string;
  price?: number;
  duration_minutes?: number;
  online_payment_enabled?: boolean;
  payment_required?: boolean;
  is_active?: boolean;
  created_at: string;
}

interface Appointment {
  id: string;
  client_id: string;
  business_id: string;
  service_id: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

const BusinessDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const t = useTranslations();
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
    primary: '#4B2AAD',
    secondary: '#A68BFA',
    accent: '#1A1A1A'
  });
  const [savingBranding, setSavingBranding] = useState(false);
  const [previewBranding, setPreviewBranding] = useState(false);
  const [addingService, setAddingService] = useState(false);
  const [addingAppointment, setAddingAppointment] = useState(false);

  // Payments
  const [clientPaymentUrl, setClientPaymentUrl] = useState("");
  const [savingPaymentUrl, setSavingPaymentUrl] = useState(false);

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

  const brandingVars = previewBranding
    ? ({
        ['--primary' as string]: hexToHsl(branding.primary),
        ['--secondary' as string]: hexToHsl(branding.secondary),
        ['--accent' as string]: hexToHsl(branding.accent),
      } as React.CSSProperties)
    : undefined;

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetchBusinessData();
  }, [user]);

  const fetchBusinessData = async () => {
    try {
      setLoading(true);
      
      // Fetch business data for current user
      const { data: businessData, error: businessError } = await supabase
        .from('businesses')
        .select('*')
        .eq('owner_id', user?.id)
        .single();

      if (businessError && businessError.code !== 'PGRST116') {
        console.error('Error fetching business:', businessError);
        return;
      }

      if (businessData) {
        setBusiness(businessData as any);
        setClientPaymentUrl(businessData.logo_url || "");
        setBranding(prev => ({
          ...prev,
          logoUrl: businessData.logo_url || '',
          primary: businessData.brand_color || prev.primary,
          secondary: businessData.brand_color || prev.secondary,
          accent: businessData.brand_color || prev.accent
        }));

        // Fetch services for this business
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .eq('business_id', businessData.id);

        if (!servicesError) {
          setServices(servicesData || []);
        }

        // Fetch appointments for this business
        const { data: appointmentsData, error: appointmentsError } = await supabase
          .from('appointments')
          .select('*')
          .eq('business_id', businessData.id);

        if (!appointmentsError) {
          setAppointments(appointmentsData || []);
        }
      } else {
        // If no business data exists but user has business info in profile, create business record
        if (user?.business_name && user?.business_address && user?.business_category) {
          try {
            const { data: newBusinessData, error: createError } = await supabase
              .from('businesses')
              .insert({
                name: user.business_name,
                description: user.business_description || '',
                category: user.business_category,
                address: user.business_address,
                phone: user.phone || '',
                email: user.email,
                country: user.country || '',
                state: user.state || '',
                city: user.city || '',
                latitude: user.latitude,
                longitude: user.longitude,
                owner_id: user.id
              })
              .select()
              .single();

            if (!createError && newBusinessData) {
              setBusiness(newBusinessData as any);
              
              // Update user profile to mark business setup as complete
              await supabase
                .from('user_profiles')
                .update({ is_business_setup: true })
                .eq('id', user.id);
            }
          } catch (createError) {
            console.error('Error creating business from profile:', createError);
          }
        }
      }

    } catch (error) {
      console.error('Error fetching business data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async () => {
    if (!business?.id) return;
    
    try {
      setAddingService(true);
      const { data, error } = await supabase
        .from('services')
        .insert({
          business_id: business.id,
          name: serviceForm.name,
          description: serviceForm.description,
          price: parseFloat(serviceForm.price) || null,
          duration_minutes: parseInt(serviceForm.duration_minutes) || null,
        })
        .select()
        .single();

      if (error) throw error;

      setServices([...services, data]);
      setServiceForm({ name: '', description: '', price: '', duration_minutes: '' });
      setShowAddService(false);
      toast({ title: 'Service added', description: `${data.name} created.` });
    } catch (error) {
      console.error('Error adding service:', error);
      toast({ title: 'Failed to add service', variant: 'destructive' });
    } finally {
      setAddingService(false);
    }
  };

  const handleEditService = async (service: Service) => {
    try {
      const { error } = await supabase
        .from('services')
        .update(service)
        .eq('id', service.id);

      if (error) throw error;

      setServices(services.map(s => s.id === service.id ? service : s));
      setEditingService(null);
      toast({ title: 'Service updated' });
    } catch (error) {
      console.error('Error editing service:', error);
      toast({ title: 'Failed to update service', variant: 'destructive' });
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId);

      if (error) throw error;

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
      const service = services.find(s => s.id === serviceId);
      if (!service) return;

      const { error } = await supabase
        .from('services')
        .update({ is_active: !service.is_active })
        .eq('id', serviceId);

      if (error) throw error;

      setServices(services.map(s => 
        s.id === serviceId 
          ? { ...s, is_active: !s.is_active } 
          : s
      ));
      
      const newStatus = !service.is_active;
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

  const handleSaveBranding = async () => {
    if (!business?.id) {
      toast({ title: 'Error', description: 'Unable to save branding. Business not found.', variant: 'destructive' });
      return;
    }
    
    setSavingBranding(true);
    try {
      const { error } = await supabase
        .from('businesses')
        .update({
          brand_color: branding.primary,
          logo_url: branding.logoUrl
        } as any)
        .eq('id', business.id);

      if (error) throw error;
      
      toast({ 
        title: 'Branding Saved!', 
        description: 'Your logo and brand colors have been updated successfully.' 
      });
      
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-white items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Check if business profile is complete - redirect to onboarding if not
  if (user?.role === 'business' && !user?.isBusinessProfileComplete) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Complete Business Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Please complete your business profile setup to access the dashboard.
            </p>
            <Button onClick={() => navigate('/business-onboarding')} className="w-full">
              Complete Setup
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Loading Business Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Loading your business information...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" style={brandingVars}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#4B2AAD] rounded-lg flex items-center justify-center">
                {branding.logoUrl ? (
                  <img src={branding.logoUrl} alt="Logo" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span className="text-white font-bold">
                    {business.name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#1A1A1A]">{t.dashboard || 'Business Dashboard'}</h1>
                <p className="text-sm text-gray-600">{business.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate('/business/profile')}>
                <Settings className="w-4 h-4 mr-2" />
                {t.settings || 'Settings'}
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                {t.logout || 'Logout'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Content - Main Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Info Card */}
            <Card className="shadow-md border border-gray-100 bg-white">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-[#4B2AAD] rounded-md flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                    {branding.logoUrl ? (
                      <img src={branding.logoUrl} alt="Business Logo" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl font-bold">{business.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#4B2AAD] font-medium">Business Information</p>
                        <h2 className="text-xl font-bold text-[#1A1A1A] mt-1">{business.name}</h2>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-[#4B2AAD] text-[#4B2AAD] hover:bg-[#EEF1FF]"
                          onClick={() => navigate('/business/profile')}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">{business.address}</p>
                        <p className="text-muted-foreground">{business.phone}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">09:00 AM - 06:00 PM</p>
                        <p className="text-muted-foreground">{business.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services Management */}
            <Card className="shadow-md border border-gray-100 bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-[#1A1A1A]">{t.services || 'Services'}</CardTitle>
                  <Button onClick={() => setShowAddService(true)} size="sm" className="bg-[#4B2AAD] hover:bg-[#A68BFA] text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    {t.addService || 'Add Service'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {services.length > 0 ? (
                  <div className="space-y-4">
                    {services.map((service) => (
                      <div key={service.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-semibold">{service.name}</h3>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            {service.price && <span>${service.price}</span>}
                            {service.duration_minutes && <span>{service.duration_minutes} min</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={service.is_active ? "default" : "secondary"}>
                            {service.is_active ? "Active" : "Inactive"}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleService(service.id)}
                          >
                            {service.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingService(service)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteService(service.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>{t.noServicesYet || 'No services yet'}</p>
                    <p className="text-sm">{t.addFirstService || 'Add your first service to get started'}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Revenue Tracker */}
            <BusinessRevenueTracker businessId={business.id} />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="shadow-md border border-gray-100 bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1A1A1A]">{t.quickStats || 'Quick Stats'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t.services || 'Total Services'}</span>
                  <span className="font-semibold">{services.length}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t.appointments || 'Total Appointments'}</span>
                  <span className="font-semibold">{appointments.length}</span>
                </div>
              </CardContent>
            </Card>

            {/* Branding */}
            <Card className="shadow-md border border-gray-100 bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-[#1A1A1A]">Branding</CardTitle>
                  <Button
                    variant={previewBranding ? "default" : "outline"}
                    size="sm"
                    className={previewBranding ? "bg-[#4B2AAD] hover:bg-[#A68BFA] text-white" : "border-[#4B2AAD] text-[#4B2AAD] hover:bg-[#EEF1FF]"}
                    onClick={() => setPreviewBranding(v => !v)}
                  >
                    {previewBranding ? 'Preview On' : 'Preview Off'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <Input
                    type="color"
                    value={branding.primary}
                    onChange={(e) => setBranding(prev => ({ ...prev, primary: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Secondary Color</Label>
                  <Input
                    type="color"
                    value={branding.secondary}
                    onChange={(e) => setBranding(prev => ({ ...prev, secondary: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Accent Color</Label>
                  <Input
                    type="color"
                    value={branding.accent}
                    onChange={(e) => setBranding(prev => ({ ...prev, accent: e.target.value }))}
                  />
                </div>
                <Button
                  onClick={handleSaveBranding}
                  disabled={savingBranding}
                  className="w-full bg-[#4B2AAD] hover:bg-[#A68BFA] text-white"
                >
                  {savingBranding ? 'Saving...' : 'Save Branding'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Add Service Dialog */}
      <Dialog open={showAddService} onOpenChange={setShowAddService}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.addNewService || 'Add New Service'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="service-name">{t.serviceName || 'Service Name'}</Label>
              <Input
                id="service-name"
                value={serviceForm.name}
                onChange={(e) => setServiceForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder={t.serviceNamePlaceholder || 'e.g. Haircut'}
              />
            </div>
            <div>
              <Label htmlFor="service-description">{t.description || 'Description'}</Label>
              <Textarea
                id="service-description"
                value={serviceForm.description}
                onChange={(e) => setServiceForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder={t.serviceDescriptionPlaceholder || 'Describe your service...'}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="service-price">{t.price || 'Price'} ($)</Label>
                <Input
                  id="service-price"
                  type="number"
                  value={serviceForm.price}
                  onChange={(e) => setServiceForm(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="50"
                />
              </div>
              <div>
                <Label htmlFor="service-duration">{t.duration || 'Duration'} (min)</Label>
                <Input
                  id="service-duration"
                  type="number"
                  value={serviceForm.duration_minutes}
                  onChange={(e) => setServiceForm(prev => ({ ...prev, duration_minutes: e.target.value }))}
                  placeholder="60"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleAddService}
                disabled={addingService || !serviceForm.name}
                className="flex-1"
              >
                {addingService ? (t.adding || 'Adding...') : (t.addService || 'Add Service')}
              </Button>
              <Button variant="outline" onClick={() => setShowAddService(false)}>
                {t.cancel || 'Cancel'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusinessDashboard;