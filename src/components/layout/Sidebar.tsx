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
  Building2,
  ChevronLeft,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useSidebar } from './MainLayout';

interface SidebarItem {
  icon: any;
  label: string;
  path: string;
  badge?: string;
}

const Sidebar = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { isCollapsed, toggleSidebar } = useSidebar();

  const getSidebarItems = (): SidebarItem[] => {
    if (!user) return [];

    switch (user?.role) {
      case 'admin':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
          { icon: Building2, label: 'Businesses', path: '/admin/businesses' },
          { icon: Users, label: 'Team Members', path: '/admin/users' },
          { icon: Calendar, label: 'Subscriptions', path: '/admin/appointments' },
          { icon: MessageSquare, label: 'Support Messages', path: '/admin/messages' },
          { icon: Bell, label: 'Notifications', path: '/admin/notifications', badge: '3' },
          { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
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
          { icon: Users, label: 'Departments', path: '/my-departments' },
          { icon: MessageSquare, label: 'Messages', path: '/client/messages' },
          { icon: Bell, label: 'Notifications', path: '/client/notifications', badge: '1' },
          { icon: User, label: 'Profile', path: '/client/profile' }
        ];
      
      default:
        return [];
    }
  };

  const sidebarItems = getSidebarItems();

  return (
    <div className={`relative h-full hidden md:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#4B2AAD] rounded-md flex items-center justify-center text-white font-bold">
                B
              </div>
              <span className="font-semibold text-[#1A1A1A]">Bizli Solution</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
        
        {/* User Info Section */}
        {!isCollapsed && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#4B2AAD] rounded-full flex items-center justify-center text-white font-medium">
                {profile?.full_name?.charAt(0) || user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1A1A1A] truncate">
                  {profile?.full_name || user?.name || 'User'}
                </p>
                <p className="text-xs text-gray-600 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {sidebarItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 text-left group ${
                isActive
                  ? 'bg-[#4B2AAD] text-white shadow-sm'
                  : 'text-gray-700 hover:bg-[#EEF1FF] hover:text-[#4B2AAD]'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className={`w-5 h-5 flex-shrink-0 ${
                  isActive ? 'text-white' : 'text-gray-500 group-hover:text-[#4B2AAD]'
                }`} />
                {!isCollapsed && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </div>
              {!isCollapsed && item.badge && (
                <Badge 
                  variant="secondary" 
                  className={`text-xs px-2 py-0.5 ${
                    isActive 
                      ? 'bg-white/20 text-white border-white/30' 
                      : 'bg-[#A68BFA] text-white border-[#A68BFA]'
                  }`}
                >
                  {item.badge}
                </Badge>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Section - Only show when collapsed */}
      {isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-[#4B2AAD] rounded-full flex items-center justify-center text-white text-sm font-medium">
              {profile?.full_name?.charAt(0) || user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;