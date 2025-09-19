import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search,
  Calendar,
  Clock,
  User,
  Filter,
  Edit3,
  X,
  Check,
  Trash2,
  CalendarDays,
  List,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Loader2,
  RotateCcw,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  Hourglass
} from 'lucide-react';

interface Appointment {
  id: string;
  clientName: string;
  clientAvatar?: string;
  clientPhone?: string;
  clientEmail?: string;
  serviceName: string;
  duration: number; // in minutes
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
  const [swipeStates, setSwipeStates] = useState<{[key: string]: { x: number, action: 'none' | 'reschedule' | 'cancel' | 'complete' }}>({});
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      // Enhanced mock data for demo
      const mockAppointments: Appointment[] = [
        {
          id: '1',
          clientName: 'John Smith',
          clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
          clientPhone: '+1 (555) 123-4567',
          clientEmail: 'john.smith@email.com',
          serviceName: 'Premium Haircut & Styling',
          duration: 60,
          price: 85,
          date: '2024-04-27',
          time: '09:00',
          endTime: '10:00',
          status: 'confirmed',
          notes: 'Regular customer - prefers scissors over clippers',
          location: 'Salon Chair 3',
          priority: 'medium'
        },
        {
          id: '2',
          clientName: 'Sarah Johnson',
          clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
          clientPhone: '+1 (555) 234-5678',
          clientEmail: 'sarah.johnson@email.com',
          serviceName: 'Full Hair Color & Highlights',
          duration: 180,
          price: 220,
          date: '2024-04-27',
          time: '14:30',
          endTime: '17:30',
          status: 'pending',
          notes: 'First time client - consultation needed',
          location: 'Color Station 1',
          priority: 'high'
        },
        {
          id: '3',
          clientName: 'Michael Brown',
          clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
          clientPhone: '+1 (555) 345-6789',
          clientEmail: 'michael.brown@email.com',
          serviceName: 'Beard Trim & Styling',
          duration: 30,
          price: 45,
          date: '2024-04-27',
          time: '11:00',
          endTime: '11:30',
          status: 'completed',
          notes: 'Likes medium length beard',
          location: 'Salon Chair 2',
          priority: 'low'
        },
        {
          id: '4',
          clientName: 'Emily Davis',
          clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
          clientPhone: '+1 (555) 456-7890',
          clientEmail: 'emily.davis@email.com',
          serviceName: 'Wedding Hair & Makeup',
          duration: 120,
          price: 350,
          date: '2024-04-28',
          time: '08:00',
          endTime: '10:00',
          status: 'confirmed',
          notes: 'Wedding day - extra care needed',
          location: 'Private Suite',
          priority: 'high'
        },
        {
          id: '5',
          clientName: 'David Wilson',
          clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
          clientPhone: '+1 (555) 567-8901',
          clientEmail: 'david.wilson@email.com',
          serviceName: 'Basic Haircut',
          duration: 45,
          price: 55,
          date: '2024-04-28',
          time: '16:00',
          endTime: '16:45',
          status: 'cancelled',
          notes: 'Cancelled due to emergency',
          location: 'Salon Chair 1',
          priority: 'low'
        }
      ];
      setAppointments(mockAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent, appointmentId: string) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setSwipeStates(prev => ({
      ...prev,
      [appointmentId]: { x: 0, action: 'none' }
    }));
  };

  const handleTouchMove = (e: React.TouchEvent, appointmentId: string) => {
    if (!touchStartX.current) return;
    
    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;
    
    // Only handle horizontal swipes
    if (Math.abs(deltaY) > Math.abs(deltaX)) return;
    
    let action: 'none' | 'reschedule' | 'cancel' | 'complete' = 'none';
    if (deltaX > 100) {
      action = 'complete';
    } else if (deltaX > 50) {
      action = 'reschedule';
    } else if (deltaX < -80) {
      action = 'cancel';
    }
    
    setSwipeStates(prev => ({
      ...prev,
      [appointmentId]: { x: deltaX, action }
    }));
  };

  const handleTouchEnd = (appointmentId: string) => {
    const swipeState = swipeStates[appointmentId];
    if (!swipeState) return;

    if (swipeState.action === 'complete') {
      updateAppointmentStatus(appointmentId, 'completed');
    } else if (swipeState.action === 'reschedule') {
      // Handle reschedule action
      console.log('Reschedule appointment:', appointmentId);
    } else if (swipeState.action === 'cancel') {
      updateAppointmentStatus(appointmentId, 'cancelled');
    }

    setSwipeStates(prev => ({
      ...prev,
      [appointmentId]: { x: 0, action: 'none' }
    }));
    touchStartX.current = 0;
    touchStartY.current = 0;
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
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Hourglass className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusBorderColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'border-l-[#10B981] bg-[#10B981]/5';
      case 'pending':
        return 'border-l-[#F59E0B] bg-[#F59E0B]/5';
      case 'cancelled':
        return 'border-l-[#EF4444] bg-[#EF4444]/5';
      case 'completed':
        return 'border-l-[#4B2AAD] bg-[#4B2AAD]/5';
      default:
        return 'border-l-[#64748B] bg-[#64748B]/5';
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'text-[#EF4444]';
      case 'medium':
        return 'text-[#F59E0B]';
      case 'low':
        return 'text-[#64748B]';
      default:
        return 'text-[#64748B]';
    }
  };

  // Enhanced filtering
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Status summary calculations
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
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Enhanced Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] flex items-center gap-3">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-[#4B2AAD]" />
                Appointments
              </h1>
              <p className="text-[#64748B] mt-1">Manage your business schedule</p>
            </div>
            
            {/* View Toggle */}
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
          </div>
        </div>
      </header>

      {/* Horizontal Scrollable Status Summary */}
      <div className="bg-white border-b px-4 sm:px-6 py-4">
        <div className="overflow-x-auto">
          <div className="flex gap-4 min-w-max pb-2">
            <div className="flex items-center gap-3 bg-[#4B2AAD]/5 px-4 py-3 rounded-lg min-w-[140px]">
              <Calendar className="w-8 h-8 text-[#4B2AAD]" />
              <div>
                <div className="text-2xl font-bold text-[#4B2AAD]">{statusSummary.total}</div>
                <div className="text-xs text-[#64748B]">Total Today</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-[#F59E0B]/5 px-4 py-3 rounded-lg min-w-[140px]">
              <Hourglass className="w-8 h-8 text-[#F59E0B]" />
              <div>
                <div className="text-2xl font-bold text-[#F59E0B]">{statusSummary.pending}</div>
                <div className="text-xs text-[#64748B]">Pending</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-[#10B981]/5 px-4 py-3 rounded-lg min-w-[140px]">
              <CheckCircle className="w-8 h-8 text-[#10B981]" />
              <div>
                <div className="text-2xl font-bold text-[#10B981]">{statusSummary.confirmed}</div>
                <div className="text-xs text-[#64748B]">Confirmed</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-[#4B2AAD]/5 px-4 py-3 rounded-lg min-w-[140px]">
              <Check className="w-8 h-8 text-[#4B2AAD]" />
              <div>
                <div className="text-2xl font-bold text-[#4B2AAD]">{statusSummary.completed}</div>
                <div className="text-xs text-[#64748B]">Completed</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-[#10B981]/5 px-4 py-3 rounded-lg min-w-[140px]">
              <div className="w-8 h-8 bg-[#10B981] rounded-full flex items-center justify-center text-white font-bold">$</div>
              <div>
                <div className="text-2xl font-bold text-[#10B981]">${statusSummary.todayRevenue}</div>
                <div className="text-xs text-[#64748B]">Revenue</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Enhanced Filters */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-3">
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

        {/* Swipe Instructions for Mobile */}
        <div className="mb-4 p-3 bg-[#EEF1FF] border border-[#4B2AAD]/20 rounded-lg sm:hidden">
          <p className="text-xs text-[#4B2AAD] text-center">
            💡 Swipe right to complete • Swipe slightly right to reschedule • Swipe left to cancel
          </p>
        </div>

        {/* Appointments List View */}
        {viewMode === 'list' && (
          <div className="space-y-3">
            {filteredAppointments.map((appointment) => {
              const swipeState = swipeStates[appointment.id] || { x: 0, action: 'none' };
              
              return (
                <div
                  key={appointment.id}
                  className="relative overflow-hidden rounded-lg"
                  onTouchStart={(e) => handleTouchStart(e, appointment.id)}
                  onTouchMove={(e) => handleTouchMove(e, appointment.id)}
                  onTouchEnd={() => handleTouchEnd(appointment.id)}
                >
                  {/* Swipe Action Backgrounds */}
                  <div className="absolute inset-0 flex">
                    <div className="w-1/3 bg-[#F59E0B] flex items-center justify-start pl-6">
                      <RotateCcw className="w-6 h-6 text-white" />
                      <span className="text-white font-medium ml-2 text-sm">Reschedule</span>
                    </div>
                    <div className="w-1/3 bg-[#10B981] flex items-center justify-center">
                      <Check className="w-6 h-6 text-white" />
                      <span className="text-white font-medium ml-2 text-sm">Complete</span>
                    </div>
                    <div className="w-1/3 bg-[#EF4444] flex items-center justify-end pr-6">
                      <span className="text-white font-medium mr-2 text-sm">Cancel</span>
                      <X className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Enhanced Appointment Card */}
                  <Card 
                    className={`
                      relative bg-white border-0 border-l-4 shadow-md transition-all duration-200
                      ${getStatusBorderColor(appointment.status)}
                      hover:shadow-lg hover:scale-[1.01]
                    `}
                    style={{
                      transform: `translateX(${swipeState.x}px)`,
                      transition: swipeState.x === 0 ? 'transform 0.3s ease' : 'none'
                    }}
                  >
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-start gap-3">
                        {/* Client Avatar */}
                        <Avatar className="w-12 h-12 ring-2 ring-[#4B2AAD]/20 flex-shrink-0">
                          <AvatarImage src={appointment.clientAvatar} alt={appointment.clientName} />
                          <AvatarFallback className="bg-[#4B2AAD]/10 text-[#4B2AAD] font-semibold">
                            {appointment.clientName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          {/* Compact Header */}
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-[#1A1A1A] text-sm sm:text-base truncate">
                                {appointment.clientName}
                              </h3>
                              <p className="text-xs sm:text-sm text-[#64748B] truncate">
                                {appointment.serviceName}
                              </p>
                            </div>
                            
                            {/* Status Badge with Icon */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <Badge className={`${getStatusColor(appointment.status)} text-xs px-2 py-1 flex items-center gap-1`}>
                                {getStatusIcon(appointment.status)}
                                {appointment.status}
                              </Badge>
                              {appointment.priority === 'high' && (
                                <Star className="w-3 h-3 text-[#EF4444] fill-current" />
                              )}
                            </div>
                          </div>

                          {/* Condensed Time & Location Info */}
                          <div className="flex items-center gap-4 text-xs text-[#64748B] mb-2">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{appointment.time} - {appointment.endTime}</span>
                            </div>
                            {appointment.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span className="truncate">{appointment.location}</span>
                              </div>
                            )}
                          </div>

                          {/* Price & Duration */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs text-[#64748B]">
                              <span className="font-medium text-[#10B981]">${appointment.price}</span>
                              <span>{appointment.duration}min</span>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => console.log('Reschedule', appointment.id)}
                                className="h-7 px-2 text-xs text-[#F59E0B] hover:bg-[#F59E0B]/10"
                              >
                                <RotateCcw className="w-3 h-3 mr-1" />
                                <span className="hidden sm:inline">Reschedule</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                                className="h-7 px-2 text-xs text-[#EF4444] hover:bg-[#EF4444]/10"
                              >
                                <X className="w-3 h-3 mr-1" />
                                <span className="hidden sm:inline">Cancel</span>
                              </Button>
                            </div>
                          </div>

                          {/* Notes (if any) */}
                          {appointment.notes && (
                            <p className="text-xs text-[#64748B] mt-2 line-clamp-1 italic">
                              {appointment.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        )}

        {/* Calendar View Placeholder */}
        {viewMode === 'calendar' && (
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-8 sm:p-12 text-center">
              <CalendarDays className="w-16 h-16 text-[#4B2AAD] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Calendar View</h3>
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
            </CardContent>
          </Card>
        )}

        {/* Enhanced Empty State */}
        {filteredAppointments.length === 0 && !loading && (
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-8 sm:p-12 text-center">
              <Calendar className="w-16 h-16 text-[#D1D5DB] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">No appointments found</h3>
              <p className="text-[#64748B] mb-6">
                {searchTerm || statusFilter !== 'all'
                  ? 'No appointments match your current filters. Try adjusting your search.'
                  : 'No appointments scheduled yet. Your upcoming appointments will appear here.'
                }
              </p>
              {(searchTerm || statusFilter !== 'all') && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                  }}
                  className="border-[#4B2AAD] text-[#4B2AAD] hover:bg-[#4B2AAD] hover:text-white"
                >
                  Clear Filters
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BusinessAppointments;
