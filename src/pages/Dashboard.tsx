import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  LogOut, 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Building2,
  Settings,
  BarChart3,
  Shield,
  MessageSquare,
  Bell
} from "lucide-react";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="space-y-6">
        {/* Admin Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Admin Dashboard</h1>
          <p className="text-gray-600">Manage the entire platform</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
            Logout
            </Button>
          </div>
        </div>
        
      {/* Platform-Wide KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Platform Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-[#4B2AAD]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,230</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +18% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Recurring Revenue</CardTitle>
            <BarChart3 className="h-4 w-4 text-[#10B981]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,847</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +24% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Businesses</CardTitle>
            <Building2 className="h-4 w-4 text-[#F59E0B]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscriptions</CardTitle>
            <Users className="h-4 w-4 text-[#8B5CF6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,156</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
            <Calendar className="h-4 w-4 text-[#64748B]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              -15% faster
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-[#10B981]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+28%</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              vs last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Shortcuts */}
      <div>
        <h2 className="text-xl font-semibold text-[#1A1A1A] mb-4">Quick Access</h2>
        <div className="space-y-4">
          {/* First row - 2 buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-200"
              onClick={() => navigate('/admin/businesses')}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#4B2AAD]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Building2 className="w-6 h-6 text-[#4B2AAD]" />
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-1">Businesses</h3>
                <p className="text-sm text-[#64748B]">Manage business accounts</p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-200"
              onClick={() => navigate('/admin/users')}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#10B981]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-[#10B981]" />
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-1">Team Members</h3>
                <p className="text-sm text-[#64748B]">Manage team & roles</p>
              </CardContent>
            </Card>
          </div>

          {/* Second row - 2 buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-200"
              onClick={() => navigate('/admin/appointments')}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#8B5CF6]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-[#8B5CF6]" />
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-1">Subscriptions</h3>
                <p className="text-sm text-[#64748B]">Manage platform subscriptions</p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-200"
              onClick={() => navigate('/admin/messages')}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#F59E0B]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="w-6 h-6 text-[#F59E0B]" />
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-1">Support Messages</h3>
                <p className="text-sm text-[#64748B]">Handle support communications</p>
              </CardContent>
            </Card>
          </div>

          {/* Third row - 2 buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-200"
              onClick={() => navigate('/admin/settings')}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#64748B]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Settings className="w-6 h-6 text-[#64748B]" />
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-1">Platform Settings</h3>
                <p className="text-sm text-[#64748B]">Configure system settings</p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-200"
              onClick={() => navigate('/admin/analytics')}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#06B6D4]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-6 h-6 text-[#06B6D4]" />
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-1">Analytics</h3>
                <p className="text-sm text-[#64748B]">View platform analytics & reports</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Recent Businesses */}
      <div>
        <h2 className="text-xl font-semibold text-[#1A1A1A] mb-4">Recent Businesses</h2>
        <div className="space-y-3">
          {[
            { name: 'Beauty Salon Pro', email: 'contact@beautysalon.com', status: 'Active', category: 'Beauty & Wellness' },
            { name: 'Tech Repair Hub', email: 'info@techrepair.com', status: 'Pending', category: 'Technology' },
            { name: 'Fitness Center', email: 'hello@fitness.com', status: 'Active', category: 'Health & Fitness' },
            { name: 'Restaurant Deluxe', email: 'reservations@restaurant.com', status: 'Suspended', category: 'Food & Dining' }
          ].map((business, index) => {
            const getStatusColor = (status: string) => {
              switch (status) {
                case 'Active': return 'bg-[#10B981]/10 text-[#10B981]';
                case 'Pending': return 'bg-[#F59E0B]/10 text-[#F59E0B]';
                case 'Suspended': return 'bg-[#EF4444]/10 text-[#EF4444]';
                default: return 'bg-[#64748B]/10 text-[#64748B]';
              }
            };

            const getBorderColor = (status: string) => {
              switch (status) {
                case 'Active': return 'border-l-[#10B981] bg-[#10B981]/5';
                case 'Pending': return 'border-l-[#F59E0B] bg-[#F59E0B]/5';
                case 'Suspended': return 'border-l-[#EF4444] bg-[#EF4444]/5';
                default: return 'border-l-[#64748B] bg-[#64748B]/5';
              }
            };

            return (
              <Card key={index} className={`bg-white border-0 border-l-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${getBorderColor(business.status)}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#4B2AAD]/10 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-[#4B2AAD]" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-[#1A1A1A] text-sm sm:text-base truncate">
                          {business.name}
                        </h4>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(business.status)}`}>
                          {business.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-[#64748B]">
                        <span className="px-2 py-1 bg-[#F3F4F6] text-[#64748B] rounded-full">
                          {business.category}
                        </span>
                        <span>•</span>
                        <span>{business.email}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;