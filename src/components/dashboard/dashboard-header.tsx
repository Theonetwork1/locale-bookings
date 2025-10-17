import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Search, Settings, User, Plus, Filter, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function DashboardHeader() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  return (
    <header className="bg-primary border-b border-white/10 h-16">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Section - Logo & Navigation */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="bg-accent p-2 rounded-lg">
              <img 
                src="/bizli_logo_-removebg-preview.png" 
                alt="Bizli Solution" 
                className="h-6 w-6 object-contain"
              />
            </div>
            <span className="text-xl font-bold text-white">Bizli Solution</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
              Dashboard
            </Button>
            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
              Manage Businesses
            </Button>
            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
              Subscriptions & Payments
            </Button>
            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
              Team & Permissions
            </Button>
            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
              Notifications
            </Button>
          </nav>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10">
            <Settings className="h-5 w-5 mr-2" />
            Admin Tools
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bell className="h-5 w-5 text-white" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
                3
              </Badge>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:text-white hover:bg-white/10"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}