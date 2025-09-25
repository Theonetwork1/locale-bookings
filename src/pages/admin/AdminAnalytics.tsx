import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Calendar, DollarSign, TrendingUp, RefreshCw, AlertCircle } from "lucide-react";

const AdminAnalytics = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();


  return (
    <div className="space-y-6">
      {/* Admin Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Analytics & Reports</h1>
          <p className="text-gray-600">Platform metrics and business insights</p>
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Businesses</CardTitle>
            <Users className="h-4 w-4 text-[#4B2AAD]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">148</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +18% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <RefreshCw className="h-4 w-4 text-[#10B981]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">134</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Renewals</CardTitle>
            <Calendar className="h-4 w-4 text-[#F59E0B]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-red-600 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              Next 30 days
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue (This Month)</CardTitle>
            <DollarSign className="h-4 w-4 text-[#8B5CF6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,847</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +28% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <p className="text-sm text-gray-600">Monthly revenue performance</p>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-500">Revenue chart will be displayed here</p>
              <p className="text-sm text-gray-400 mt-2">Chart component integration needed</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Growth</CardTitle>
            <p className="text-sm text-gray-600">New business registrations</p>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-500">Growth chart will be displayed here</p>
              <p className="text-sm text-gray-400 mt-2">Chart component integration needed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tables */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Businesses</CardTitle>
          <p className="text-sm text-gray-600">Businesses with highest revenue and activity</p>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">Performance table will be displayed here</p>
            <p className="text-sm text-gray-400 mt-2">Business analytics data needed</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
