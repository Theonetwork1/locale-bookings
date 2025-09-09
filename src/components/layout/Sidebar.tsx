import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  MessageSquare, 
  Bell, 
  Settings,
  Globe,
  MessageCircle,
  LogOut,
  User,
  Menu,
  X,
  Building2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarItem {
  icon: any;
  label: string;
  path: string;
  badge?: string;
}

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getSidebarItems = (): SidebarItem[] => {
    if (!user) return [];

    switch (user.role) {
      case 'admin':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
          { icon: Building2, label: 'Businesses', path: '/admin/businesses' },
          { icon: Users, label: 'Team Members', path: '/admin/users' },
          { icon: Calendar, label: 'Appointments', path: '/admin/appointments' },
          { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
          { icon: Bell, label: 'Notifications', path: '/admin/notifications', badge: '3' },
          { icon: Settings, label: 'Settings', path: '/admin/settings' }
        ];
      
      case 'business':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/business-dashboard' },
          { icon: Calendar, label: 'Appointments', path: '/business/appointments' },
          { icon: Users, label: 'Clients', path: '/business/clients' },
          { icon: MessageSquare, label: 'Messages', path: '/business/messages' },
          { icon: Bell, label: 'Notifications', path: '/business/notifications', badge: '2' },
          { icon: Globe, label: 'Business Page', path: '/business/page' },
          { icon: MessageCircle, label: 'Live Chat', path: '/business/chat' },
          { icon: User, label: 'Profile', path: '/business/profile' }
        ];
      
      case 'client':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/client-dashboard' },
          { icon: Calendar, label: 'My Appointments', path: '/client/appointments' },
          { icon: Building2, label: 'Find Business', path: '/find-business' },
          { icon: Users, label: 'Country', path: '/my-departments' },
          { icon: MessageSquare, label: 'Messages', path: '/client/messages' },
          { icon: Bell, label: 'Notifications', path: '/client/notifications', badge: '1' },
          { icon: User, label: 'Profile', path: '/client/profile' }
        ];
      
      default:
        return [];
    }
  };

  const sidebarItems = getSidebarItems();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className={`relative h-full hidden md:flex flex-col bg-white shadow-lg transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white font-bold">
                B
              </div>
              <span className="font-semibold text-foreground">Bizli Solution</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2"
          >
            {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-all duration-200 text-left ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </div>
              {!isCollapsed && item.badge && (
                <Badge variant="secondary" className="bg-accent text-accent-foreground text-xs px-2 py-1">
                  {item.badge}
                </Badge>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            {!isCollapsed && (
              <div>
                <p className="text-sm font-medium text-foreground">{user?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="p-2 text-muted-foreground hover:text-destructive"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
