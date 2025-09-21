import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { BusinessTable } from "@/components/dashboard/business-table";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslations } from "@/hooks/useTranslations";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import { useSidebar } from "@/components/layout/MainLayout";

const Dashboard = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const t = useTranslations();
  const { toggleSidebar } = useSidebar();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };


  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Admin Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="md:hidden p-2 hover:bg-gray-100"
            >
              <Menu className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">{t.adminDashboard || 'Admin Dashboard'}</h1>
              <p className="text-gray-600">{t.managePlatform || 'Manage the entire platform'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t.logout || 'Logout'}
            </Button>
          </div>
        </div>
        
        <DashboardStats />
        <BusinessTable />
      </main>
    </div>
  );
};

export default Dashboard;