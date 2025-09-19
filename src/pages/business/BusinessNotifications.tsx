import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  DashboardLayout, 
  DashboardHeader, 
  DashboardSection, 
  DashboardContent 
} from '@/components/layout/DashboardLayout';
import { 
  Bell,
  Clock,
  User,
  Check,
  Trash2,
  Calendar,
  DollarSign,
  Star,
  Users,
  Settings,
  Info,
  Loader2
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'appointment' | 'payment' | 'review' | 'system' | 'client';
  priority: 'low' | 'medium' | 'high';
  timestamp: string;
  read: boolean;
  actionRequired?: boolean;
  relatedEntity?: {
    type: 'client' | 'appointment' | 'payment';
    id: string;
    name: string;
  };
}

const BusinessNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'appointment' | 'payment' | 'review' | 'system' | 'client'>('all');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const mockNotifications: Notification[] = [
        {
          id: '1',
          title: 'New Appointment Booked',
          message: 'John Smith has booked a haircut appointment for tomorrow at 2:00 PM. Please confirm availability.',
          type: 'appointment',
          priority: 'high',
          timestamp: '2024-04-26 14:30',
          read: false,
          actionRequired: true,
          relatedEntity: { type: 'client', id: 'client-1', name: 'John Smith' }
        },
        {
          id: '2',
          title: 'Payment Received',
          message: 'Payment of $75.00 received from Mike Wilson for haircut service. Transaction completed successfully.',
          type: 'payment',
          priority: 'low',
          timestamp: '2024-04-25 16:45',
          read: true,
          relatedEntity: { type: 'payment', id: 'payment-1', name: 'Mike Wilson' }
        }
      ];
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="w-5 h-5 text-[#4B2AAD]" />;
      case 'payment':
        return <DollarSign className="w-5 h-5 text-[#4B2AAD]" />;
      case 'review':
        return <Star className="w-5 h-5 text-[#4B2AAD]" />;
      case 'client':
        return <Users className="w-5 h-5 text-[#4B2AAD]" />;
      case 'system':
        return <Settings className="w-5 h-5 text-[#4B2AAD]" />;
      default:
        return <Info className="w-5 h-5 text-[#4B2AAD]" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-[#EF4444] text-white';
      case 'medium':
        return 'bg-[#F59E0B] text-white';
      case 'low':
        return 'bg-[#64748B] text-white';
      default:
        return 'bg-[#64748B] text-white';
    }
  };

  const getBorderColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-[#EF4444]';
      case 'medium':
        return 'border-l-[#F59E0B]';
      case 'low':
        return 'border-l-[#64748B]';
      default:
        return 'border-l-[#64748B]';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'all') return true;
    return notification.type === activeFilter;
  });

  const getFilterCount = (filterType: string) => {
    if (filterType === 'all') return notifications.length;
    return notifications.filter(n => n.type === filterType).length;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-[#4B2AAD] animate-spin mx-auto mb-4" />
          <div className="text-lg font-medium text-[#1A1A1A]">Loading notifications...</div>
          <div className="text-sm text-[#64748B] mt-1">Please wait while we fetch your updates</div>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Notifications"
        subtitle="Stay updated with your business activity"
        actions={
          unreadCount > 0 ? (
            <Badge className="bg-[#4B2AAD] text-white border-0 px-3 py-1">
              {unreadCount} unread
            </Badge>
          ) : undefined
        }
      />

      {/* Filter Tabs */}
      <DashboardSection variant="minimal" padding="sm">
        <Tabs value={activeFilter} onValueChange={(value: any) => setActiveFilter(value)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 h-12 bg-[#F8FAFC]">
            <TabsTrigger value="all" className="text-xs sm:text-sm data-[state=active]:bg-[#4B2AAD] data-[state=active]:text-white">
              All ({getFilterCount('all')})
            </TabsTrigger>
            <TabsTrigger value="appointment" className="text-xs sm:text-sm data-[state=active]:bg-[#4B2AAD] data-[state=active]:text-white">
              Appointments ({getFilterCount('appointment')})
            </TabsTrigger>
            <TabsTrigger value="payment" className="text-xs sm:text-sm data-[state=active]:bg-[#4B2AAD] data-[state=active]:text-white">
              Payments ({getFilterCount('payment')})
            </TabsTrigger>
            <TabsTrigger value="review" className="text-xs sm:text-sm data-[state=active]:bg-[#4B2AAD] data-[state=active]:text-white">
              Reviews ({getFilterCount('review')})
            </TabsTrigger>
            <TabsTrigger value="client" className="text-xs sm:text-sm data-[state=active]:bg-[#4B2AAD] data-[state=active]:text-white">
              Clients ({getFilterCount('client')})
            </TabsTrigger>
            <TabsTrigger value="system" className="text-xs sm:text-sm data-[state=active]:bg-[#4B2AAD] data-[state=active]:text-white">
              System ({getFilterCount('system')})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </DashboardSection>

      <DashboardContent>
        {/* Notifications List - Clean Design */}
        <DashboardSection title="Notifications" variant="card" padding="sm">
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <div key={notification.id} className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="flex">
                  {/* Left Border - Priority Color */}
                  <div className={`w-1 ${getBorderColor(notification.priority)} bg-current`}></div>
                  
                  {/* Main Content */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="w-10 h-10 bg-[#F8FAFC] rounded-lg flex items-center justify-center flex-shrink-0">
                        {getTypeIcon(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-[#1A1A1A] text-sm">
                            {notification.title}
                          </h3>
                          
                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <div className="w-2 h-2 bg-[#4B2AAD] rounded-full"></div>
                            )}
                            <Badge className={`${getPriorityColor(notification.priority)} text-xs px-2 py-1`}>
                              {notification.priority}
                            </Badge>
                          </div>
                        </div>

                        {/* Message Content */}
                        <p className="text-sm text-[#374151] line-clamp-2 mb-2">
                          {notification.message}
                        </p>

                        {/* Time and Entity */}
                        <div className="flex items-center gap-2 text-xs text-[#64748B] mb-3">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(notification.timestamp).toLocaleString()}</span>
                          {notification.relatedEntity && (
                            <>
                              <span>•</span>
                              <User className="w-3 h-3" />
                              <span>{notification.relatedEntity.name}</span>
                            </>
                          )}
                        </div>

                        {/* Action Required and Actions */}
                        <div className="flex items-center justify-between">
                          {notification.actionRequired && (
                            <Badge className="bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20 text-xs px-2 py-1">
                              Action Required
                            </Badge>
                          )}
                          
                          <div className="flex gap-2 ml-auto">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="h-8 w-8 p-0 text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#10B981]"
                              >
                                <Check className="w-3 h-3" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="h-8 w-8 p-0 text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#EF4444]"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardSection>

        {/* Empty State */}
        {filteredNotifications.length === 0 && !loading && (
          <DashboardSection title="No Notifications" variant="card" padding="lg">
            <div className="text-center">
              <Bell className="w-16 h-16 text-[#D1D5DB] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">No notifications</h3>
              <p className="text-[#64748B] mb-6">
                {activeFilter === 'all' 
                  ? "You're all caught up! We'll notify you when something new happens."
                  : `No ${activeFilter} notifications at the moment.`
                }
              </p>
            </div>
          </DashboardSection>
        )}
      </DashboardContent>
    </DashboardLayout>
  );
};

export default BusinessNotifications;
