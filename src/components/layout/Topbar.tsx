import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, Settings, Menu, User, LogOut, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import MobileNavigation from './MobileNavigation';

const Topbar = () => {
  const { user, profile, signOut } = useAuth();
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const getLanguageLabel = (lang: string) => {
    const labels = {
      'en': 'English',
      'fr': 'Français', 
      'es': 'Español',
      'ht': 'Kreyòl Ayisyen'
    };
    return labels[lang as keyof typeof labels] || lang;
  };

  const getLanguageFlag = (lang: string) => {
    const flags = {
      'en': '🇺🇸',
      'fr': '🇫🇷',
      'es': '🇪🇸', 
      'ht': '🇭🇹'
    };
    return flags[lang as keyof typeof flags] || '🌐';
  };

  const getNotificationCount = () => {
    // Mock notification count - in real app, this would come from API
    return 3;
  };

  const notificationCount = getNotificationCount();

  return (
    <div className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left Section - Logo and Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-80">
                <div className="p-4 border-b bg-gradient-to-r from-[#4B2AAD] to-[#A68BFA]">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                      <img 
                        src="/bizli logo'.jpg" 
                        alt="Bizli Solution" 
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = '<span class="text-[#4B2AAD] font-bold text-lg">BS</span>';
                        }}
                      />
                    </div>
                    <div>
                      <span className="font-bold text-white text-lg">Bizli Solution</span>
                      <p className="text-white/80 text-xs">Mobile Dashboard</p>
                    </div>
                  </div>
                </div>
                <MobileNavigation />
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#4B2AAD] rounded-md flex items-center justify-center p-1">
              <img 
                src="/bizli logo'.jpg" 
                alt="Bizli Solution" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = '<span class="text-white font-bold text-sm">BS</span>';
                }}
              />
            </div>
            <span className="font-semibold text-[#1A1A1A] hidden sm:inline">Bizli Solution</span>
          </div>
        </div>

        {/* Right Section - Language, Notifications, User Menu */}
        <div className="flex items-center gap-2">
          {/* Language Switcher - Hidden on mobile, shown on tablet+ */}
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  <span className="hidden lg:inline">{getLanguageFlag(language)} {getLanguageLabel(language)}</span>
                  <span className="lg:hidden">{getLanguageFlag(language)}</span>
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem 
                onClick={() => setLanguage('en')}
                className={`cursor-pointer ${language === 'en' ? 'bg-[#EEF1FF] text-[#4B2AAD]' : ''}`}
              >
                <span className="mr-2">🇺🇸</span>
                English
                {language === 'en' && <span className="ml-auto text-[#4B2AAD]">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setLanguage('fr')}
                className={`cursor-pointer ${language === 'fr' ? 'bg-[#EEF1FF] text-[#4B2AAD]' : ''}`}
              >
                <span className="mr-2">🇫🇷</span>
                Français
                {language === 'fr' && <span className="ml-auto text-[#4B2AAD]">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setLanguage('es')}
                className={`cursor-pointer ${language === 'es' ? 'bg-[#EEF1FF] text-[#4B2AAD]' : ''}`}
              >
                <span className="mr-2">🇪🇸</span>
                Español
                {language === 'es' && <span className="ml-auto text-[#4B2AAD]">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setLanguage('ht')}
                className={`cursor-pointer ${language === 'ht' ? 'bg-[#EEF1FF] text-[#4B2AAD]' : ''}`}
              >
                <span className="mr-2">🇭🇹</span>
                Kreyòl Ayisyen
                {language === 'ht' && <span className="ml-auto text-[#4B2AAD]">✓</span>}
              </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Notifications - Only show if user is logged in */}
          {user && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const notifPath = user?.role === 'admin'
                  ? '/admin/notifications'
                  : user?.role === 'business'
                    ? '/business/notifications'
                    : '/client/notifications';
                navigate(notifPath);
              }}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative h-9 w-9"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              {notificationCount > 0 && (
                <span className="absolute -right-1 -top-1 h-4 min-w-4 rounded-full bg-[#F97316] text-[9px] leading-4 text-white px-1 text-center font-medium">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </Button>
          )}

          {/* User Menu - Only show if user is logged in */}
          {user && (
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-[#4B2AAD] rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {profile?.full_name?.charAt(0) || user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-[#1A1A1A]">
                    {profile?.full_name || user?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-600 truncate max-w-32">
                    {user?.email}
                  </p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-600 hidden sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium text-[#1A1A1A]">
                  {profile?.full_name || user?.name || 'User'}
                </p>
                <p className="text-xs text-gray-600 truncate">
                  {user?.email}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => {
                  const profilePath = user?.role === 'admin'
                    ? '/admin/profile'
                    : user?.role === 'business'
                      ? '/business/profile'
                      : '/client/profile';
                  navigate(profilePath);
                }}
                className="cursor-pointer"
              >
                <User className="mr-2 h-4 w-4" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  const settingsPath = user?.role === 'admin'
                    ? '/admin/settings'
                    : user?.role === 'business'
                      ? '/business/settings'
                      : '/client/settings';
                  navigate(settingsPath);
                }}
                className="cursor-pointer"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;