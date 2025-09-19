import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  X,
  Calendar,
  User,
  MessageSquare,
  Filter,
  Eye,
  Trash2,
  Check,
  Clock,
  Star,
  DollarSign,
  Users,
  Settings,
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
  const [swipeStates, setSwipeStates] = useState<{[key: string]: { x: number, action: 'none' | 'read' | 'delete' }}>({});
  const touchStartX = useRef<number>(0);
  const touchCurrentX = useRef<number>(0);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      // Enhanced mock data for demo
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
          title: 'Appointment Cancelled',
          message: 'Sarah Johnson has cancelled her Friday appointment. The slot is now available for booking.',
          type: 'appointment',
          priority: 'medium',
          timestamp: '2024-04-26 10:15',
          read: false,
          relatedEntity: { type: 'client', id: 'client-2', name: 'Sarah Johnson' }
        },
        {
          id: '3',
          title: 'Payment Received',
          message: 'Payment of $75.00 received from Mike Wilson for haircut service. Transaction completed successfully.',
          type: 'payment',
          priority: 'low',
          timestamp: '2024-04-25 16:45',
          read: true,
          relatedEntity: { type: 'payment', id: 'payment-1', name: 'Mike Wilson' }
        },
        {
          id: '4',
          title: 'New 5-Star Review',
          message: 'Emily Davis left a 5-star review: "Amazing service! Highly recommend this salon."',
          type: 'review',
          priority: 'medium',
          timestamp: '2024-04-25 12:20',
          read: false,
          relatedEntity: { type: 'client', id: 'client-3', name: 'Emily Davis' }
        },
        {
          id: '5',
          title: 'New Client Registered',
          message: 'David Wilson just signed up and is interested in your services. Send a welcome message!',
          type: 'client',
          priority: 'medium',
          timestamp: '2024-04-24 18:30',
          read: false,
          actionRequired: true,
          relatedEntity: { type: 'client', id: 'client-4', name: 'David Wilson' }
        },
        {
          id: '6',
          title: 'System Update',
          message: 'Your business profile has been automatically backed up. All data is secure.',
          type: 'system',
          priority: 'low',
          timestamp: '2024-04-24 09:00',
          read: true
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

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent, notificationId: string) => {
    touchStartX.current = e.touches[0].clientX;
    setSwipeStates(prev => ({
      ...prev,
      [notificationId]: { x: 0, action: 'none' }
    }));
  };

  const handleTouchMove = (e: React.TouchEvent, notificationId: string) => {
    if (!touchStartX.current) return;
    
    touchCurrentX.current = e.touches[0].clientX;
    const deltaX = touchCurrentX.current - touchStartX.current;
    
    let action: 'none' | 'read' | 'delete' = 'none';
    if (deltaX > 80) {
      action = 'read';
    } else if (deltaX < -80) {
      action = 'delete';
    }
    
    setSwipeStates(prev => ({
      ...prev,
      [notificationId]: { x: deltaX, action }
    }));
  };

  const handleTouchEnd = (notificationId: string) => {
    const swipeState = swipeStates[notificationId];
    if (!swipeState) return;

    if (swipeState.action === 'read') {
      markAsRead(notificationId);
    } else if (swipeState.action === 'delete') {
      deleteNotification(notificationId);
    }

    setSwipeStates(prev => ({
      ...prev,
      [notificationId]: { x: 0, action: 'none' }
    }));
    touchStartX.current = 0;
    touchCurrentX.current = 0;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="w-5 h-5 text-[#4B2AAD]" />;
      case 'payment':
        return <DollarSign className="w-5 h-5 text-[#10B981]" />;
      case 'review':
        return <Star className="w-5 h-5 text-[#F59E0B]" />;
      case 'client':
        return <Users className="w-5 h-5 text-[#6366F1]" />;
      case 'system':
        return <Settings className="w-5 h-5 text-[#64748B]" />;
      default:
        return <Info className="w-5 h-5 text-[#4B2AAD]" />;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    const baseColors = {
      appointment: 'border-l-[#4B2AAD] bg-[#4B2AAD]/5',
      payment: 'border-l-[#10B981] bg-[#10B981]/5',
      review: 'border-l-[#F59E0B] bg-[#F59E0B]/5',
      client: 'border-l-[#6366F1] bg-[#6366F1]/5',
      system: 'border-l-[#64748B] bg-[#64748B]/5'
    };
    
    const priorityIntensity = priority === 'high' ? '/10' : priority === 'medium' ? '/7' : '/5';
    return baseColors[type as keyof typeof baseColors] || 'border-l-[#4B2AAD] bg-[#4B2AAD]/5';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Filter notifications
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
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Enhanced Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] flex items-center gap-3">
                <Bell className="w-6 h-6 sm:w-8 sm:h-8 text-[#4B2AAD]" />
                Notifications
              </h1>
              <p className="text-[#64748B] mt-1">Stay updated with your business activity</p>
            </div>
            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <Badge className="bg-[#4B2AAD] text-white border-0 px-3 py-1">
                  {unreadCount} unread
                </Badge>
              )}
              {unreadCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                  className="border-[#4B2AAD] text-[#4B2AAD] hover:bg-[#4B2AAD] hover:text-white"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Mark all read
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="bg-white border-b px-4 sm:px-6">
        <Tabs value={activeFilter} onValueChange={(value: any) => setActiveFilter(value)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 h-12 bg-[#F8FAFC]">
            <TabsTrigger value="all" className="text-xs sm:text-sm data-[state=active]:bg-[#4B2AAD] data-[state=active]:text-white">
              All ({getFilterCount('all')})
            </TabsTrigger>
            <TabsTrigger value="appointment" className="text-xs sm:text-sm data-[state=active]:bg-[#4B2AAD] data-[state=active]:text-white">
              <Calendar className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Appointments</span>
              <span className="sm:hidden">Appt</span>
              ({getFilterCount('appointment')})
            </TabsTrigger>
            <TabsTrigger value="payment" className="text-xs sm:text-sm data-[state=active]:bg-[#4B2AAD] data-[state=active]:text-white">
              <DollarSign className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Payments</span>
              <span className="sm:hidden">Pay</span>
              ({getFilterCount('payment')})
            </TabsTrigger>
            <TabsTrigger value="review" className="text-xs sm:text-sm data-[state=active]:bg-[#4B2AAD] data-[state=active]:text-white">
              <Star className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Reviews</span>
              <span className="sm:hidden">Rev</span>
              ({getFilterCount('review')})
            </TabsTrigger>
            <TabsTrigger value="client" className="text-xs sm:text-sm data-[state=active]:bg-[#4B2AAD] data-[state=active]:text-white">
              <Users className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Clients</span>
              <span className="sm:hidden">Cli</span>
              ({getFilterCount('client')})
            </TabsTrigger>
            <TabsTrigger value="system" className="text-xs sm:text-sm data-[state=active]:bg-[#4B2AAD] data-[state=active]:text-white">
              <Settings className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">System</span>
              <span className="sm:hidden">Sys</span>
              ({getFilterCount('system')})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Swipe Instructions for Mobile */}
        <div className="mb-4 p-3 bg-[#EEF1FF] border border-[#4B2AAD]/20 rounded-lg sm:hidden">
          <p className="text-xs text-[#4B2AAD] text-center">
            💡 Swipe right to mark as read • Swipe left to delete
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {filteredNotifications.map((notification) => {
            const swipeState = swipeStates[notification.id] || { x: 0, action: 'none' };
            
            return (
              <div
                key={notification.id}
                className="relative overflow-hidden rounded-lg"
                onTouchStart={(e) => handleTouchStart(e, notification.id)}
                onTouchMove={(e) => handleTouchMove(e, notification.id)}
                onTouchEnd={() => handleTouchEnd(notification.id)}
              >
                {/* Swipe Action Backgrounds */}
                <div className="absolute inset-0 flex">
                  <div className="w-1/2 bg-[#10B981] flex items-center justify-start pl-6">
                    <Check className="w-6 h-6 text-white" />
                    <span className="text-white font-medium ml-2">Mark Read</span>
                  </div>
                  <div className="w-1/2 bg-[#EF4444] flex items-center justify-end pr-6">
                    <span className="text-white font-medium mr-2">Delete</span>
                    <Trash2 className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Notification Card */}
                <Card 
                  className={`
                    relative bg-white border-0 border-l-4 shadow-lg transition-all duration-200 cursor-pointer
                    ${getNotificationColor(notification.type, notification.priority)}
                    ${!notification.read ? 'ring-1 ring-[#4B2AAD]/20' : 'opacity-75'}
                    hover:shadow-xl hover:scale-[1.01]
                  `}
                  style={{
                    transform: `translateX(${swipeState.x}px)`,
                    transition: swipeState.x === 0 ? 'transform 0.3s ease' : 'none'
                  }}
                  onClick={() => setSelectedNotification(notification)}
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-[#1A1A1A] text-sm sm:text-base">
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <Badge className="bg-[#4B2AAD] text-white text-xs px-2 py-0.5">
                                New
                              </Badge>
                            )}
                            {notification.actionRequired && (
                              <Badge className="bg-red-100 text-red-800 border-red-200 text-xs px-2 py-0.5">
                                Action Required
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={`text-xs border ${getPriorityColor(notification.priority)}`}>
                              {notification.priority.toUpperCase()}
                            </Badge>
                            <div className="flex gap-1 sm:hidden">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification.id);
                                  }}
                                  className="h-8 w-8 p-0 text-[#10B981] hover:bg-[#10B981]/10"
                                  aria-label="Mark as read"
                                >
                                  <Check className="w-3 h-3" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="h-8 w-8 p-0 text-[#EF4444] hover:bg-[#EF4444]/10"
                                aria-label="Delete notification"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-[#374151] text-sm mb-3 leading-relaxed">
                          {notification.message}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="flex items-center gap-4 text-xs text-[#64748B]">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{new Date(notification.timestamp).toLocaleString()}</span>
                            </div>
                            {notification.relatedEntity && (
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                <span>{notification.relatedEntity.name}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="hidden sm:flex items-center gap-2">
                            {!notification.read && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                                className="h-8 text-xs border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-white"
                              >
                                <Check className="w-3 h-3 mr-1" />
                                Mark Read
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="h-8 text-xs border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white"
                            >
                              <Trash2 className="w-3 h-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Enhanced Empty State */}
        {filteredNotifications.length === 0 && !loading && (
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-8 sm:p-12 text-center">
              <Bell className="w-16 h-16 text-[#D1D5DB] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">
                {activeFilter === 'all' ? 'No notifications' : `No ${activeFilter} notifications`}
              </h3>
              <p className="text-[#64748B] mb-6">
                {activeFilter === 'all' 
                  ? "You're all caught up! We'll notify you when something new happens."
                  : `No ${activeFilter} notifications at the moment. Check other categories or come back later.`
                }
              </p>
              {activeFilter !== 'all' && (
                <Button
                  variant="outline"
                  onClick={() => setActiveFilter('all')}
                  className="border-[#4B2AAD] text-[#4B2AAD] hover:bg-[#4B2AAD] hover:text-white"
                >
                  View All Notifications
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Notification Detail Modal */}
        <Dialog open={!!selectedNotification} onOpenChange={() => setSelectedNotification(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedNotification && getNotificationIcon(selectedNotification.type)}
                {selectedNotification?.title}
              </DialogTitle>
            </DialogHeader>
            {selectedNotification && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs border ${getPriorityColor(selectedNotification.priority)}`}>
                    {selectedNotification.priority.toUpperCase()} PRIORITY
                  </Badge>
                  {selectedNotification.actionRequired && (
                    <Badge className="bg-red-100 text-red-800 border-red-200 text-xs">
                      Action Required
                    </Badge>
                  )}
                </div>
                
                <p className="text-[#374151] leading-relaxed">
                  {selectedNotification.message}
                </p>
                
                <div className="space-y-2 text-sm text-[#64748B]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(selectedNotification.timestamp).toLocaleString()}</span>
                  </div>
                  {selectedNotification.relatedEntity && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>Related to: {selectedNotification.relatedEntity.name}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-4">
                  {!selectedNotification.read && (
                    <Button
                      onClick={() => {
                        markAsRead(selectedNotification.id);
                        setSelectedNotification(null);
                      }}
                      className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Mark as Read
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => {
                      deleteNotification(selectedNotification.id);
                      setSelectedNotification(null);
                    }}
                    className="flex-1 border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BusinessNotifications;
