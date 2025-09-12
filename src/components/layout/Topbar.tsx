import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, Settings, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';

type Role = 'admin' | 'business' | 'client';

const roleTabs: Record<Role, { label: string; path: string }[]> = {
  admin: [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Manage Businesses', path: '/admin/businesses' },
    { label: 'Subscriptions & Payments', path: '/admin/appointments' },
    { label: 'Team & Permissions', path: '/admin/users' },
    { label: 'Notifications', path: '/admin/notifications' }
  ],
  business: [
    { label: 'Dashboard', path: '/business-dashboard' },
    { label: 'Appointments', path: '/business/appointments' },
    { label: 'Clients', path: '/business/clients' },
    { label: 'Messages', path: '/business/messages' },
    { label: 'Notifications', path: '/business/notifications' }
  ],
  client: [
    { label: 'Dashboard', path: '/client-dashboard' },
    { label: 'My Appointments', path: '/client/appointments' },
    { label: 'Messages', path: '/client/messages' },
    { label: 'Notifications', path: '/client/notifications' }
  ]
};

const Topbar = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const role = (profile?.role || 'client') as Role;

  const tabs = useMemo(() => roleTabs[role], [role]);
  const active = useMemo(() => location.pathname, [location.pathname]);

  const goTo = (path: string) => navigate(path);

  const notifPath = role === 'admin'
    ? '/admin/notifications'
    : role === 'business'
      ? '/business/notifications'
      : '/client/notifications';

  return (
    <div className="sticky top-0 z-40 w-full border-b border-border bg-primary text-primary-foreground">
      <div className="mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary-foreground">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72">
                <div className="p-4 border-b font-semibold">Bizli Solution</div>
                <nav className="p-2">
                  {tabs.map(t => (
                    <button
                      key={t.path}
                      onClick={() => goTo(t.path)}
                      className={`w-full text-left px-4 py-3 rounded-md transition ${
                        active === t.path ? 'bg-muted text-foreground' : 'hover:bg-muted'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-md bg-primary-foreground/20 flex items-center justify-center font-bold text-base text-primary-foreground">
              BS
            </div>
            <span className="font-semibold hidden sm:inline">Bizli Solution</span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {tabs.map((t) => (
              <button
                key={t.path}
                onClick={() => goTo(t.path)}
                className={`px-3 py-2 rounded-md text-sm transition ${
                  active === t.path ? 'bg-primary-foreground/10' : 'hover:bg-primary-foreground/10'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => goTo(notifPath)}
            className="text-primary-foreground hover:bg-primary-foreground/10"
            title="Notifications"
          >
            <div className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 h-4 min-w-4 rounded-full bg-accent text-[10px] leading-4 text-white px-1 text-center">
                3
              </span>
            </div>
          </Button>

          {role === 'admin' && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-primary text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10"
                >
                  Admin Tools <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-56">
                <DropdownMenuItem onClick={() => goTo('/admin/settings')}>
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => goTo('/admin/users')}>
                  Team & Permissions
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => goTo('/admin/appointments')}>
                  Subscriptions & Payments
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => goTo('/admin/businesses')}>
                  Manage Businesses
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Button
            variant="outline"
            onClick={async () => {
              await signOut();
              navigate('/login');
            }}
            className="bg-primary text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;


