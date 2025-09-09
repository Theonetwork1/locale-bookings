import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Search,
  Calendar,
  Clock,
  Building2,
  Filter,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Appointment, 
  Business, 
  Service, 
  updateAppointment, 
  deleteAppointment,
  getAppointmentsByClient 
} from '@/lib/supabase';

interface ExtendedAppointment extends Appointment {
  businesses?: Business;
  services?: Service;
}

const ClientAppointments = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [appointments, setAppointments] = useState<ExtendedAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedAppointment, setSelectedAppointment] = useState<ExtendedAppointment | null>(null);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  
  // Reschedule form data
  const [rescheduleData, setRescheduleData] = useState({
    date: '',
    time: '',
    notes: ''
  });

  // Cancel form data
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      
      // Mock data with extended information
      const mockAppointments: ExtendedAppointment[] = [
        {
          id: '1',
          client_id: user?.id || 'mock-client-id',
          business_id: 'business-1',
          service_id: 'service-1',
          appointment_date: '2024-04-27',
          appointment_time: '09:00:00',
          status: 'confirmed',
          notes: 'Regular appointment',
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
            online_payment_enabled: true,
            payment_required: false,
            is_active: true,
            created_at: new Date().toISOString()
          }
        },
        {
          id: '2',
          client_id: user?.id || 'mock-client-id',
          business_id: 'business-2',
          service_id: 'service-2',
          appointment_date: '2024-05-01',
          appointment_time: '14:30:00',
          status: 'pending',
          notes: 'First time visit',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          businesses: {
            id: 'business-2',
            name: 'Elite Fitness Center',
            description: 'State-of-the-art fitness facilities',
            address: '456 Fitness Ave, Uptown',
            phone: '(555) 987-6543',
            email: 'info@elitefitness.com',
            category: 'Fitness & Health',
            rating: 4.9,
            image_url: '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          services: {
            id: 'service-2',
            business_id: 'business-2',
            name: 'Personal Training Session',
            description: 'One-on-one fitness coaching',
            price: 80,
            duration_minutes: 60,
            online_payment_enabled: true,
            payment_required: true,
            is_active: true,
            created_at: new Date().toISOString()
          }
        },
        {
          id: '3',
          client_id: user?.id || 'mock-client-id',
          business_id: 'business-1',
          service_id: 'service-3',
          appointment_date: '2024-04-20',
          appointment_time: '11:00:00',
          status: 'completed',
          notes: 'Great service!',
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
            id: 'service-3',
            business_id: 'business-1',
            name: 'Hair Styling',
            description: 'Professional hair styling service',
            price: 65,
            duration_minutes: 75,
            online_payment_enabled: false,
            payment_required: false,
            is_active: true,
            created_at: new Date().toISOString()
          }
        }
      ];

      setAppointments(mockAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast({
        title: 'Loading Failed',
        description: 'Unable to load appointments. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReschedule = async () => {
    if (!selectedAppointment || !rescheduleData.date || !rescheduleData.time) {
      toast({
        title: 'Missing Information',
        description: 'Please select a new date and time.',
        variant: 'destructive'
      });
      return;
    }

    try {
      // Update appointment in database
      const updatedAppointment = await updateAppointment(selectedAppointment.id, {
        appointment_date: rescheduleData.date,
        appointment_time: rescheduleData.time,
        notes: rescheduleData.notes || selectedAppointment.notes,
        status: 'pending' // Reset to pending after reschedule
      });

      // Update local state
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === selectedAppointment.id 
            ? { ...apt, ...updatedAppointment }
            : apt
        )
      );

      toast({
        title: 'Appointment Rescheduled!',
        description: `Your appointment has been moved to ${rescheduleData.date} at ${rescheduleData.time}.`
      });

      setRescheduleModalOpen(false);
      setRescheduleData({ date: '', time: '', notes: '' });
      setSelectedAppointment(null);

    } catch (error) {
      console.error('Reschedule error:', error);
      toast({
        title: 'Reschedule Failed',
        description: 'Unable to reschedule appointment. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleCancel = async () => {
    if (!selectedAppointment) return;

    try {
      // Update appointment status to cancelled
      await updateAppointment(selectedAppointment.id, {
        status: 'cancelled',
        notes: cancelReason ? `Cancelled: ${cancelReason}` : 'Cancelled by client'
      });

      // Update local state
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === selectedAppointment.id 
            ? { ...apt, status: 'cancelled' as const }
            : apt
        )
      );

      toast({
        title: 'Appointment Cancelled',
        description: 'Your appointment has been successfully cancelled.'
      });

      setCancelModalOpen(false);
      setCancelReason('');
      setSelectedAppointment(null);

    } catch (error) {
      console.error('Cancel error:', error);
      toast({
        title: 'Cancellation Failed',
        description: 'Unable to cancel appointment. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (appointmentId: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this appointment? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteAppointment(appointmentId);
      
      setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
      
      toast({
        title: 'Appointment Deleted',
        description: 'The appointment has been permanently removed.'
      });

    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: 'Delete Failed',
        description: 'Unable to delete appointment. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-primary" />;
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      case 'completed':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const canReschedule = (appointment: ExtendedAppointment) => {
    return appointment.status === 'pending' || appointment.status === 'confirmed';
  };

  const canCancel = (appointment: ExtendedAppointment) => {
    return appointment.status === 'pending' || appointment.status === 'confirmed';
  };

  // Filter appointments based on search and status
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.businesses?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.services?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Get appointment counts
  const appointmentCounts = {
    total: appointments.length,
    upcoming: appointments.filter(a => a.status === 'confirmed' || a.status === 'pending').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mr-3"></div>
          <span className="text-muted-foreground">Loading your appointments...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Appointments</h1>
          <p className="text-muted-foreground">Manage your upcoming and past appointments</p>
        </div>
        <Button 
          onClick={() => navigate('/find-business')}
          className="bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold transition-all duration-200 hover:scale-105"
        >
          <Plus className="w-5 h-5 mr-2" />
          Book New Appointment
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{appointmentCounts.total}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[#F97316]">{appointmentCounts.upcoming}</div>
            <div className="text-sm text-muted-foreground">Upcoming</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">{appointmentCounts.completed}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">{appointmentCounts.cancelled}</div>
            <div className="text-sm text-muted-foreground">Cancelled</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground">
            Your Appointments ({filteredAppointments.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {appointments.length === 0 ? 'No appointments yet' : 'No appointments match your filters'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {appointments.length === 0 
                  ? 'Book your first appointment to get started'
                  : 'Try adjusting your search or filter criteria'
                }
              </p>
              <Button 
                onClick={() => navigate('/find-business')}
                className="bg-[#F97316] hover:bg-[#EA580C] text-white transition-all duration-200 hover:scale-105"
              >
                Find Businesses
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-6 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-all duration-200"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Appointment Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {appointment.services?.name || 'Service'}
                          </h3>
                          <p className="text-muted-foreground">{appointment.businesses?.name}</p>
                        </div>
                        <Badge variant={getStatusVariant(appointment.status)} className="flex items-center gap-1">
                          {getStatusIcon(appointment.status)}
                          {appointment.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(appointment.appointment_date)}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="w-4 h-4 mr-2" />
                          {formatTime(appointment.appointment_time)}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <DollarSign className="w-4 h-4 mr-2" />
                          ${appointment.services?.price}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2" />
                          {appointment.businesses?.address?.split(',')[0]}
                        </div>
                      </div>

                      {appointment.notes && (
                        <div className="mt-3 p-3 bg-muted/50 rounded-md">
                          <p className="text-sm text-foreground">{appointment.notes}</p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-row lg:flex-col gap-2">
                      {canReschedule(appointment) && (
                        <Dialog open={rescheduleModalOpen} onOpenChange={setRescheduleModalOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedAppointment(appointment);
                                setRescheduleData({
                                  date: appointment.appointment_date,
                                  time: appointment.appointment_time.substring(0, 5),
                                  notes: appointment.notes || ''
                                });
                              }}
                              className="hover:bg-primary hover:text-white transition-all duration-200"
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Reschedule
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                      )}

                      {canCancel(appointment) && (
                        <Dialog open={cancelModalOpen} onOpenChange={setCancelModalOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedAppointment(appointment)}
                              className="hover:bg-destructive hover:text-white transition-all duration-200"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Cancel
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                      )}

                      {appointment.status === 'completed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(appointment.id)}
                          className="hover:bg-muted-foreground hover:text-white transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      )}

                      {appointment.status === 'cancelled' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setRescheduleData({
                              date: appointment.appointment_date,
                              time: appointment.appointment_time.substring(0, 5),
                              notes: appointment.notes || ''
                            });
                            setRescheduleModalOpen(true);
                          }}
                          className="hover:bg-[#F97316] hover:text-white transition-all duration-200"
                        >
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Rebook
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reschedule Modal */}
      <Dialog open={rescheduleModalOpen} onOpenChange={setRescheduleModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">Reschedule Appointment</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-6">
              {/* Current Appointment Info */}
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Current Appointment</h4>
                <div className="space-y-1 text-sm">
                  <p><strong>Service:</strong> {selectedAppointment.services?.name}</p>
                  <p><strong>Business:</strong> {selectedAppointment.businesses?.name}</p>
                  <p><strong>Current Date:</strong> {formatDate(selectedAppointment.appointment_date)}</p>
                  <p><strong>Current Time:</strong> {formatTime(selectedAppointment.appointment_time)}</p>
                </div>
              </div>

              {/* New Date/Time Selection */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reschedule-date">New Date</Label>
                    <Input
                      id="reschedule-date"
                      type="date"
                      value={rescheduleData.date}
                      onChange={(e) => setRescheduleData(prev => ({ ...prev, date: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <Label htmlFor="reschedule-time">New Time</Label>
                    <Input
                      id="reschedule-time"
                      type="time"
                      value={rescheduleData.time}
                      onChange={(e) => setRescheduleData(prev => ({ ...prev, time: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="reschedule-notes">Notes (Optional)</Label>
                  <Textarea
                    id="reschedule-notes"
                    value={rescheduleData.notes}
                    onChange={(e) => setRescheduleData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any special requests or notes..."
                    rows={3}
                  />
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Rescheduling will change your appointment status to "pending" until confirmed by the business.
                </AlertDescription>
              </Alert>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setRescheduleModalOpen(false);
                    setSelectedAppointment(null);
                    setRescheduleData({ date: '', time: '', notes: '' });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleReschedule}
                  className="flex-1 bg-[#F97316] hover:bg-[#EA580C] text-white transition-all duration-200 hover:scale-105"
                >
                  Confirm Reschedule
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Cancel Modal */}
      <Dialog open={cancelModalOpen} onOpenChange={setCancelModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">Cancel Appointment</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-6">
              {/* Appointment Info */}
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Appointment to Cancel</h4>
                <div className="space-y-1 text-sm">
                  <p><strong>Service:</strong> {selectedAppointment.services?.name}</p>
                  <p><strong>Business:</strong> {selectedAppointment.businesses?.name}</p>
                  <p><strong>Date:</strong> {formatDate(selectedAppointment.appointment_date)}</p>
                  <p><strong>Time:</strong> {formatTime(selectedAppointment.appointment_time)}</p>
                  <p><strong>Price:</strong> ${selectedAppointment.services?.price}</p>
                </div>
              </div>

              {/* Cancellation Reason */}
              <div>
                <Label htmlFor="cancel-reason">Reason for Cancellation (Optional)</Label>
                <Textarea
                  id="cancel-reason"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Let the business know why you're cancelling..."
                  rows={3}
                />
              </div>

              <Alert className="border-destructive/20 bg-destructive/5">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <AlertDescription className="text-destructive">
                  <strong>Warning:</strong> Cancelling this appointment may affect future booking availability. 
                  Consider rescheduling instead if you need a different time.
                </AlertDescription>
              </Alert>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCancelModalOpen(false);
                    setSelectedAppointment(null);
                    setCancelReason('');
                  }}
                  className="flex-1"
                >
                  Keep Appointment
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="destructive"
                  className="flex-1"
                >
                  Confirm Cancellation
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientAppointments;