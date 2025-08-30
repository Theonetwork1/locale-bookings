import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { BusinessTable } from "@/components/dashboard/business-table";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        <DashboardStats />
        <BusinessTable />
      </main>
    </div>
  );
};

export default Dashboard;