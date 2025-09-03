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
      </div>
    );
  }

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
    </div>
  );
};

export default BusinessDashboard;