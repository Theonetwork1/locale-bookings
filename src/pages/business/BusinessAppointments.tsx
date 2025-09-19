import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DashboardLayout, 
  DashboardHeader, 
  DashboardSection, 
  DashboardStats, 
  DashboardContent 
} from '@/components/layout/DashboardLayout';
import { 
  Search,
  Calendar,
  Clock,
  Check,
  X,
  CalendarDays,
  List,
  MapPin,
  Loader2,
  CheckCircle,
  XCircle,
  Hourglass,
  AlertCircle
} from 'lucide-react';

interface Appointment {
  id: string;
  clientName: string;
  clientAvatar?: string;
  serviceName: string;
  duration: number;
  price: number;
  date: string;
  time: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  location?: string;
  priority?: 'low' | 'medium' | 'high';
}

const BusinessAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const mockAppointments: Appointment[] = [
        {
          id: '1',
          clientName: 'John Smith',
          clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
          serviceName: 'Premium Haircut & Styling',
          duration: 60,
          price: 85,
          date: '2024-04-27',
          time: '09:00',
          endTime: '10:00',
          status: 'confirmed',
          notes: 'Regular customer - prefers scissors over clippers',
          location: 'Salon Chair 3'
        },
        {
          id: '2',
          clientName: 'Sarah Johnson',
          clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
          serviceName: 'Full Hair Color & Highlights',
          duration: 180,
          price: 220,
          date: '2024-04-27',
          time: '14:30',
          endTime: '17:30',
          status: 'pending',
          notes: 'First time client - consultation needed',
          location: 'Color Station 1'
        },
        {
          id: '3',
          clientName: 'Michael Brown',
          clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
          serviceName: 'Beard Trim & Styling',
          duration: 30,
          price: 45,
          date: '2024-04-27',
          time: '11:00',
          endTime: '11:30',
          status: 'completed',
          notes: 'Likes medium length beard',
          location: 'Salon Chair 2'
        }
      ];
      setAppointments(mockAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = (id: string, status: 'pending' | 'confirmed' | 'cancelled' | 'completed') => {
    setAppointments(appointments.map(apt => apt.id === id ? { ...apt, status } : apt));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-[#10B981] text-white';
      case 'pending':
        return 'bg-[#F59E0B] text-white';
      case 'cancelled':
        return 'bg-[#EF4444] text-white';
      case 'completed':
        return 'bg-[#4B2AAD] text-white';
      default:
        return 'bg-[#64748B] text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-3 h-3" />;
      case 'pending':
        return <Hourglass className="w-3 h-3" />;
      case 'cancelled':
        return <XCircle className="w-3 h-3" />;
      case 'completed':
        return <CheckCircle className="w-3 h-3" />;
      default:
        return <AlertCircle className="w-3 h-3" />;
    }
  };

  const getBorderColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'border-l-[#10B981]';
      case 'pending':
        return 'border-l-[#F59E0B]';
      case 'cancelled':
        return 'border-l-[#EF4444]';
      case 'completed':
        return 'border-l-[#4B2AAD]';
      default:
        return 'border-l-[#64748B]';
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusSummary = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
    todayRevenue: appointments
      .filter(a => a.date === '2024-04-27' && a.status === 'completed')
      .reduce((sum, a) => sum + a.price, 0)
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-[#4B2AAD] animate-spin mx-auto mb-4" />
          <div className="text-lg font-medium text-[#1A1A1A]">Loading appointments...</div>
          <div className="text-sm text-[#64748B] mt-1">Fetching your schedule</div>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Appointments"
        subtitle="Manage your business schedule"
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-[#4B2AAD] text-white' : 'border-[#4B2AAD] text-[#4B2AAD]'}
            >
              <List className="w-4 h-4 mr-1" />
              List
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('calendar')}
              className={viewMode === 'calendar' ? 'bg-[#4B2AAD] text-white' : 'border-[#4B2AAD] text-[#4B2AAD]'}
            >
              <CalendarDays className="w-4 h-4 mr-1" />
              Calendar
            </Button>
          </div>
        }
      />

      {/* Status Summary */}
      <DashboardSection variant="minimal" padding="sm">
        <DashboardStats 
          stats={[
            {
              label: "Total Today",
              value: statusSummary.total,
              icon: <Calendar className="w-5 h-5" />,
              color: "bg-[#4B2AAD]/10 text-[#4B2AAD]"
            },
            {
              label: "Pending",
              value: statusSummary.pending,
              icon: <Hourglass className="w-5 h-5" />,
              color: "bg-[#F59E0B]/10 text-[#F59E0B]"
            },
            {
              label: "Confirmed",
              value: statusSummary.confirmed,
              icon: <CheckCircle className="w-5 h-5" />,
              color: "bg-[#10B981]/10 text-[#10B981]"
            },
            {
              label: "Completed",
              value: statusSummary.completed,
              icon: <Check className="w-5 h-5" />,
              color: "bg-[#4B2AAD]/10 text-[#4B2AAD]"
            },
            {
              label: "Revenue",
              value: `$${statusSummary.todayRevenue}`,
              icon: <div className="w-5 h-5 bg-[#10B981] rounded-full flex items-center justify-center text-white text-xs font-bold">$</div>,
              color: "bg-[#10B981]/10 text-[#10B981]"
            }
          ]}
        />
      </DashboardSection>

      <DashboardContent>
        {/* Filters */}
        <DashboardSection title="Filters & Search" variant="card" padding="md">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] w-4 h-4" />
              <Input
                placeholder="Search clients, services, or notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 border-[#E5E7EB] focus:border-[#4B2AAD]"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 h-10 border-[#E5E7EB] focus:border-[#4B2AAD]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </DashboardSection>

        {/* Appointments List - New Clean Design */}
        {viewMode === 'list' && (
          <DashboardSection title="Appointments" variant="card" padding="sm">
            <div className="space-y-3">
              {filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex">
                    {/* Left Border - Status Color */}
                    <div className={`w-1 ${getBorderColor(appointment.status)} bg-current`}></div>
                    
                    {/* Main Content */}
                    <div className="flex-1 p-4">
                      <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <Avatar className="w-12 h-12 flex-shrink-0">
                          <AvatarImage src={appointment.clientAvatar} alt={appointment.clientName} />
                          <AvatarFallback className="bg-[#F3F4F6] text-[#64748B] font-semibold">
                            {appointment.clientName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          {/* Client Name */}
                          <h3 className="font-semibold text-[#1A1A1A] text-base mb-1">
                            {appointment.clientName}
                          </h3>
                          
                          {/* Service */}
                          <p className="text-sm text-[#64748B] mb-2">
                            {appointment.serviceName}
                          </p>
                          
                          {/* Time and Details */}
                          <div className="flex items-center gap-4 text-sm text-[#64748B]">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{appointment.time}</span>
                            </div>
                            <span className="font-semibold text-[#1A1A1A]">${appointment.price}</span>
                            <span>{appointment.duration}min</span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <Badge className={`${getStatusColor(appointment.status)} flex items-center gap-1 px-3 py-1`}>
                          {getStatusIcon(appointment.status)}
                          {appointment.status}
                        </Badge>

                        {/* Simple Actions */}
                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                            className="h-8 w-8 p-0 text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#10B981]"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                            className="h-8 w-8 p-0 text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#EF4444]"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Notes */}
                      {appointment.notes && (
                        <p className="text-xs text-[#64748B] mt-3 italic">
                          {appointment.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardSection>
        )}

        {/* Calendar View Placeholder */}
        {viewMode === 'calendar' && (
          <DashboardSection title="Calendar View" variant="card" padding="lg">
            <div className="text-center">
              <CalendarDays className="w-16 h-16 text-[#4B2AAD] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Coming Soon</h3>
              <p className="text-[#64748B] mb-6">
                Calendar view is coming soon! This will show your appointments in a visual calendar layout.
              </p>
              <Button
                variant="outline"
                onClick={() => setViewMode('list')}
                className="border-[#4B2AAD] text-[#4B2AAD] hover:bg-[#4B2AAD] hover:text-white"
              >
                <List className="w-4 h-4 mr-2" />
                Back to List View
              </Button>
            </div>
          </DashboardSection>
        )}

        {/* Empty State */}
        {filteredAppointments.length === 0 && !loading && (
          <DashboardSection title="No Appointments" variant="card" padding="lg">
            <div className="text-center">
              <Calendar className="w-16 h-16 text-[#D1D5DB] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">No appointments found</h3>
              <p className="text-[#64748B] mb-6">
                {searchTerm || statusFilter !== 'all'
                  ? 'No appointments match your current filters. Try adjusting your search.'
                  : 'No appointments scheduled yet. Your upcoming appointments will appear here.'
                }
              </p>
            </div>
          </DashboardSection>
        )}
      </DashboardContent>
    </DashboardLayout>
  );
};

export default BusinessAppointments;
