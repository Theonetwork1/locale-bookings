import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  X,
  Calendar,
  Building2,
  MessageSquare
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  read: boolean;
}

const ClientNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      // Mock data for demo
      const mockNotifications: Notification[] = [
        {
          id: '1',
          title: 'Appointment Confirmed',
          message: 'Your appointment with Glo Salon for tomorrow at 2 PM has been confirmed',
          type: 'success',
          timestamp: '2024-04-26 14:30',
          read: false
        },
        {
          id: '2',
          title: 'Appointment Reminder',
          message: 'Don\'t forget your appointment with Tech Solutions Inc tomorrow at 10 AM',
          type: 'info',
          timestamp: '2024-04-26 10:15',
          read: false
        },
        {
          id: '3',
          title: 'New Message',
          message: 'You have a new message from Glo Salon',
          type: 'info',
          timestamp: '2024-04-25 16:45',
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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-warning" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Info className="w-5 h-5 text-primary" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-l-success bg-success/5';
      case 'warning':
        return 'border-l-warning bg-warning/5';
      case 'error':
        return 'border-l-destructive bg-destructive/5';
      default:
        return 'border-l-primary bg-primary/5';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="flex h-screen bg-muted items-center justify-center">
        <div className="text-xl">Loading notifications...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with your appointments and messages</p>
          </div>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              {unreadCount} unread
            </Badge>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="p-6">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={`shadow-lg border-0 border-l-4 ${getNotificationColor(notification.type)} ${!notification.read ? 'bg-white' : 'bg-muted/30'}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-foreground">{notification.title}</h3>
                        {!notification.read && (
                          <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-2">{notification.message}</p>
                      <p className="text-sm text-muted-foreground">{notification.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="text-primary hover:bg-primary/10"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteNotification(notification.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No notifications</h3>
            <p className="text-muted-foreground">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientNotifications;
