import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Search, Settings, User, Plus, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

export function DashboardHeader() {
  return (
    <header className="bg-primary border-b border-white/10 h-16">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Section - Logo & Navigation */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="bg-accent p-2 rounded-lg">
              <span className="text-white font-bold text-sm">SS</span>
            </div>
            <span className="text-xl font-bold text-white">ServiceSync</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
              Home
            </Button>
            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
              Programs
            </Button>
            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
              Analytics
            </Button>
            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
              Status Report
            </Button>
          </nav>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10">
            <Bell className="h-5 w-5 mr-2" />
            Help Center
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Bell className="h-5 w-5 text-white" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
                1
              </Badge>
            </div>
            <span className="text-white text-sm font-medium">SD</span>
          </div>
        </div>
      </div>
    </header>
  );
}