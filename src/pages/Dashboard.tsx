import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { BusinessTable } from "@/components/dashboard/business-table";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Dashboard = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-muted">
      <main className="container mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Admin Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage the entire platform</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="text-destructive border-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
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