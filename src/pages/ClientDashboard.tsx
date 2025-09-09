import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
<<<<<<< HEAD
import { Search, Briefcase, Calendar, Mail, MessageSquare, MapPin, Clock, Eye, LogOut } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ClientDashboard = () => {
  const { t } = useLanguage();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const upcomingAppointments = [
    {
      id: 1,
      business: "Glo Salon",
      service: "Haircut",
      time: "9:00 am",
      date: "27",
      status: "confirmed"
    }
  ];

  const myAppointments = [
    { id: 1, business: "Glo Salon", service: "Haircut", time: "9:00 am" },
    { id: 2, business: "Madison Electric", service: "Electrical repair", time: "1:00 pm" },
    { id: 3, business: "Asset Plumbing", service: "Drain cleaning", time: "11:00 am" }
  ];

  const messages = [
    {
      id: 1,
      business: "Savvy Health",
      message: "Spring promo is here! Get a 20% discount - book your appointment today",
      date: "Apr 19"
    }
  ];

  const recommendations = [
    {
      id: 1,
      business: "BellaSpa",
      service: "Massage",
      address: "412 Cedar St"
    },
    {
      id: 2,
      business: "ComputerPros", 
      service: "Laptop repair",
      address: "100 Pine Ave"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7C5FFF] to-[#9C4FFF]">
      {/* Header */}
      <div className="bg-[#7C5FFF] p-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:text-white hover:bg-white/10"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">JD</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white/95 border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#7C5FFF]/10 rounded-lg flex items-center justify-center group-hover:bg-[#7C5FFF]/20 transition-colors">
                <Search className="w-6 h-6 text-[#7C5FFF]" />
              </div>
              <span className="font-semibold text-gray-800">Find a business</span>
            </CardContent>
          </Card>

          <Card className="bg-white/95 border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#7C5FFF]/10 rounded-lg flex items-center justify-center group-hover:bg-[#7C5FFF]/20 transition-colors">
                <Briefcase className="w-6 h-6 text-[#7C5FFF]" />
              </div>
              <span className="font-semibold text-gray-800">My departments</span>
=======
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Briefcase, Calendar, Mail, Eye, Clock, MapPin, Star, TrendingUp, DollarSign, Users, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, Appointment, Message, Business, Service } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Plus, Edit, Trash2 } from "lucide-react";
import { PaymentHistory } from "@/components/payment/PaymentHistory";

const ClientDashboard = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  const [messageRead, setMessageRead] = useState<Record<string, boolean>>({});
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [appointments, setAppointments] = useState<(Appointment & { businesses: Business; services: Service })[]>([]);
  const [messages, setMessages] = useState<(Message & { businesses: Business; senders: any })[]>([]);
  const [recommendations, setRecommendations] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Mock data for demo - replace with actual Supabase calls
      const mockAppointments = [
        {
          id: '1',
          client_id: 'client-1',
          business_id: 'business-1',
          service_id: 'service-1',
          appointment_date: '2024-04-28',
          appointment_time: '10:00:00',
          status: 'confirmed' as const,
          notes: 'Regular checkup appointment',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          businesses: {
            id: 'business-1',
            name: 'Glo Salon & Spa',
            description: 'Premium beauty and wellness services',
            address: '123 Beauty Street, Downtown',
            phone: '(555) 123-4567',
            email: 'info@glosalon.com',
            category: 'Beauty & Wellness',
            rating: 4.8,
            image_url: '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          services: {
            id: 'service-1',
            business_id: 'business-1',
            name: 'Premium Facial Treatment',
            description: 'Deep cleansing facial with premium products',
            price: 120,
            duration_minutes: 90,
            created_at: new Date().toISOString()
          }
        }
      ];

      const mockMessages = [
        {
          id: '1',
          sender_id: 'business-1',
          recipient_id: 'client-1',
          business_id: 'business-1',
          subject: 'Appointment Confirmation',
          content: 'Your appointment has been confirmed for tomorrow at 10:00 AM.',
          is_read: false,
          created_at: new Date().toISOString(),
          businesses: {
            id: 'business-1',
            name: 'Glo Salon & Spa',
            description: 'Premium beauty and wellness services',
            address: '123 Beauty Street, Downtown',
            phone: '(555) 123-4567',
            email: 'info@glosalon.com',
            category: 'Beauty & Wellness',
            rating: 4.8,
            image_url: '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          senders: {
            name: 'Glo Salon & Spa'
          }
        }
      ];

      const mockRecommendations = [
        {
          id: 'rec-1',
          name: 'Elite Fitness Center',
          description: 'State-of-the-art fitness facilities with personal trainers',
          address: '456 Fitness Ave, Uptown',
          phone: '(555) 987-6543',
          email: 'info@elitefitness.com',
          category: 'Fitness & Health',
          rating: 4.9,
          image_url: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'rec-2',
          name: 'Zen Wellness Studio',
          description: 'Holistic wellness treatments and meditation',
          address: '789 Zen Way, Peaceful District',
          phone: '(555) 456-7890',
          email: 'hello@zenwell.com',
          category: 'Wellness & Spa',
          rating: 4.7,
          image_url: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];

      setAppointments(mockAppointments);
      setMessages(mockMessages);
      setRecommendations(mockRecommendations);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectedAppointment = useMemo(() => {
    return appointments.find(apt => apt.id === selectedAppointmentId);
  }, [appointments, selectedAppointmentId]);

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
      <div className="flex h-screen bg-background items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-6 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {user?.name || 'Client'}! 👋
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage your appointments and discover new services
              </p>
            </div>
            <Button 
              onClick={() => navigate('/find-business')}
              className="bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Book New Appointment
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Appointments</p>
                  <p className="text-2xl font-bold text-foreground">{appointments.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-[#F97316]/5 to-[#F97316]/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Unread Messages</p>
                  <p className="text-2xl font-bold text-foreground">{messages.filter(m => !m.is_read).length}</p>
                </div>
                <div className="w-12 h-12 bg-[#F97316]/10 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#F97316]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-success/5 to-success/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Favorite Businesses</p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-secondary/5 to-secondary/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">This Month</p>
                  <p className="text-2xl font-bold text-foreground">$450</p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-secondary" />
                </div>
              </div>
>>>>>>> 6ae5ed6 (Sync changes to Lovable)
            </CardContent>
          </Card>
        </div>

<<<<<<< HEAD
        {/* Upcoming Appointment */}
        <Card className="bg-white/95 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-[#7C5FFF] rounded-lg flex flex-col items-center justify-center text-white">
                  <span className="text-2xl font-bold">27</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Upcoming Appointment</h3>
                  <p className="text-xl font-bold text-gray-900">Glo Salon</p>
                  <p className="text-gray-600">9:00 am</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="text-[#7C5FFF] border-[#7C5FFF] hover:bg-[#7C5FFF] hover:text-white transition-all duration-300"
              >
                <Eye className="w-4 h-4 mr-2" />
                View details
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* My Appointments */}
        <Card className="bg-white/95 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">My Appointments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {myAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-semibold text-gray-800">{appointment.business}</p>
                  <p className="text-gray-600">{appointment.service}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">{appointment.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Messages */}
        <Card className="bg-white/95 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Messages</CardTitle>
          </CardHeader>
          <CardContent>
            {messages.map((message) => (
              <div key={message.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gray-300 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-800">{message.business}</p>
                    <span className="text-sm text-gray-500">{message.date}</span>
                  </div>
                  <p className="text-gray-600 mt-1">{message.message}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Personalized for You */}
        <Card className="bg-white/95 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Personalized for You</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{rec.business}</p>
                    <p className="text-gray-600">{rec.service}</p>
                    <p className="text-sm text-gray-500">{rec.address}</p>
                  </div>
                  <Button 
                    className="bg-[#7C5FFF] hover:bg-[#6B4FE0] text-white transition-all duration-300 hover:scale-105"
                  >
                    Appointments
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
=======
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Appointments */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-foreground flex items-center">
                    <Calendar className="w-6 h-6 mr-3 text-primary" />
                    Upcoming Appointments
                  </CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/client/appointments')}
                    className="hover:bg-[#F97316] hover:text-white hover:border-[#F97316] transition-all duration-200"
                  >
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {appointments.length > 0 ? (
                  appointments.slice(0, 3).map((appointment) => (
                    <div 
                      key={appointment.id} 
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-all duration-200 cursor-pointer"
                      onClick={() => {
                        setSelectedAppointmentId(appointment.id);
                        setDetailsOpen(true);
                      }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{appointment.services.name}</h4>
                          <p className="text-sm text-muted-foreground">{appointment.businesses.name}</p>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Clock className="w-4 h-4 mr-1" />
                            {formatDate(appointment.appointment_date)} at {formatTime(appointment.appointment_time)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                          {appointment.status}
                        </Badge>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No upcoming appointments</h3>
                    <p className="text-muted-foreground mb-4">Book your first appointment to get started</p>
                    <Button 
                      onClick={() => navigate('/find-business')}
                      className="bg-[#F97316] hover:bg-[#EA580C] text-white transition-all duration-200 hover:scale-105"
                    >
                      Find Businesses
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Messages */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-foreground flex items-center">
                    <Mail className="w-6 h-6 mr-3 text-[#F97316]" />
                    Recent Messages
                  </CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/client/messages')}
                    className="hover:bg-[#F97316] hover:text-white hover:border-[#F97316] transition-all duration-200"
                  >
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {messages.length > 0 ? (
                  messages.slice(0, 3).map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex items-start space-x-4 p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:bg-muted/50 ${
                        !message.is_read ? 'bg-primary/5 border-primary/20' : 'bg-muted/30 border-border/50'
                      }`}
                      onClick={() => {
                        setMessageRead(prev => ({ ...prev, [message.id]: true }));
                        navigate('/client/messages');
                      }}
                    >
                      <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-secondary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-foreground truncate">{message.subject}</h4>
                          {!message.is_read && (
                            <div className="w-2 h-2 bg-[#F97316] rounded-full flex-shrink-0"></div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{message.businesses.name}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{message.content}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No messages yet</h3>
                    <p className="text-muted-foreground">Messages from businesses will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => navigate('/find-business')}
                  className="w-full justify-start bg-[#F97316] hover:bg-[#EA580C] text-white transition-all duration-200 hover:scale-105"
                >
                  <Search className="w-4 h-4 mr-3" />
                  Find Businesses
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/client/appointments')}
                  className="w-full justify-start hover:bg-[#F97316] hover:text-white hover:border-[#F97316] transition-all duration-200"
                >
                  <Calendar className="w-4 h-4 mr-3" />
                  My Appointments
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/client/messages')}
                  className="w-full justify-start hover:bg-[#F97316] hover:text-white hover:border-[#F97316] transition-all duration-200"
                >
                  <Mail className="w-4 h-4 mr-3" />
                  Messages
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/my-departments')}
                  className="w-full justify-start hover:bg-[#F97316] hover:text-white hover:border-[#F97316] transition-all duration-200"
                >
                  <MapPin className="w-4 h-4 mr-3" />
                  Browse by Location
                </Button>
              </CardContent>
            </Card>

            {/* Recommended Businesses */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-foreground flex items-center">
                  <Star className="w-5 h-5 mr-2 text-[#F97316]" />
                  Recommended for You
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.map((business) => (
                  <div 
                    key={business.id} 
                    className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-all duration-200 cursor-pointer"
                    onClick={() => navigate(`/business/${business.id}`)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground text-sm">{business.name}</h4>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Star className="w-3 h-3 mr-1 text-yellow-500" />
                        {business.rating}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{business.description}</p>
                    <Button 
                      size="sm" 
                      className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs transition-all duration-200 hover:scale-105"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/book-appointment/${business.id}`);
                      }}
                    >
                      Book Now
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Profile Summary */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-foreground">Profile Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{user?.name || 'Client User'}</h4>
                    <p className="text-sm text-muted-foreground">{user?.email || 'client@example.com'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{appointments.length}</p>
                    <p className="text-xs text-muted-foreground">Total Bookings</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">3</p>
                    <p className="text-xs text-muted-foreground">Favorites</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Payment History Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Payment History</h2>
          <PaymentHistory clientId={user?.id || 'mock-client-id'} />
        </div>
      </div>

      {/* Appointment Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">Appointment Details</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">{selectedAppointment.services.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{selectedAppointment.services.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Business:</span>
                    <span className="font-medium text-foreground">{selectedAppointment.businesses.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium text-foreground">{formatDate(selectedAppointment.appointment_date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span className="font-medium text-foreground">{formatTime(selectedAppointment.appointment_time)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium text-foreground">{selectedAppointment.services.duration_minutes} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-medium text-foreground">${selectedAppointment.services.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant={selectedAppointment.status === 'confirmed' ? 'default' : 'secondary'}>
                      {selectedAppointment.status}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  className="flex-1 hover:bg-[#F97316] hover:text-white hover:border-[#F97316] transition-all duration-200"
                  onClick={() => setDetailsOpen(false)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Reschedule
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex-1"
                  onClick={() => {
                    // Handle cancellation
                    setDetailsOpen(false);
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
>>>>>>> 6ae5ed6 (Sync changes to Lovable)
    </div>
  );
};

export default ClientDashboard;