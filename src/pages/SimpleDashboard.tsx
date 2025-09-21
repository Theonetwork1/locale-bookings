import React from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut, Users, Shield, Activity, Settings, Building2, MessageSquare, Calendar, Bell, BarChart3, TrendingUp, UserCheck, Clock } from "lucide-react";
import { 
  DashboardLayout, 
  DashboardHeader, 
  DashboardContent, 
  DashboardSection,
  DashboardStats
} from '@/components/layout/DashboardLayout';

const SimpleDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Admin Dashboard"
        subtitle="Manage the entire platform"
        actions={
          <Button 
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="border-red-600 text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        }
      />

      <DashboardContent>

        {/* Platform Stats */}
        <DashboardSection variant="minimal" padding="sm">
          <DashboardStats 
            stats={[
              {
                label: "Total Businesses",
                value: "1,234",
                icon: <Building2 className="w-5 h-5" />,
                color: "bg-[#4B2AAD]/10 text-[#4B2AAD]",
                trend: { value: "+12%", isPositive: true }
              },
              {
                label: "Total Appointments",
                value: "5,678",
                icon: <Calendar className="w-5 h-5" />,
                color: "bg-[#10B981]/10 text-[#10B981]",
                trend: { value: "+24%", isPositive: true }
              },
              {
                label: "Active Users",
                value: "3,456",
                icon: <Users className="w-5 h-5" />,
                color: "bg-[#F59E0B]/10 text-[#F59E0B]",
                trend: { value: "+8%", isPositive: true }
              },
              {
                label: "Avg Response Time",
                value: "2.4h",
                icon: <Clock className="w-5 h-5" />,
                color: "bg-[#8B5CF6]/10 text-[#8B5CF6]",
                trend: { value: "-15%", isPositive: true }
              },
              {
                label: "Platform Revenue",
                value: "$45,230",
                icon: <BarChart3 className="w-5 h-5" />,
                color: "bg-[#10B981]/10 text-[#10B981]",
                trend: { value: "+18%", isPositive: true }
              }
            ]}
          />
        </DashboardSection>


        {/* Recent Businesses */}
        <DashboardSection title="Recent Businesses" variant="card" padding="md">
          <div className="space-y-3">
            {[
              { name: 'Beauty Salon Pro', email: 'contact@beautysalon.com', status: 'Active', category: 'Beauty & Wellness' },
              { name: 'Tech Repair Hub', email: 'info@techrepair.com', status: 'Pending', category: 'Technology' },
              { name: 'Fitness Center', email: 'hello@fitness.com', status: 'Active', category: 'Health & Fitness' },
              { name: 'Restaurant Deluxe', email: 'reservations@restaurant.com', status: 'Suspended', category: 'Food & Dining' }
            ].map((business, index) => {
              const getBorderColor = (status: string) => {
                switch (status) {
                  case 'Active': return 'border-l-[#10B981] bg-[#10B981]/5';
                  case 'Pending': return 'border-l-[#F59E0B] bg-[#F59E0B]/5';
                  case 'Suspended': return 'border-l-[#EF4444] bg-[#EF4444]/5';
                  default: return 'border-l-[#64748B] bg-[#64748B]/5';
                }
              };
              
              const getStatusColor = (status: string) => {
                switch (status) {
                  case 'Active': return 'bg-[#10B981] text-white';
                  case 'Pending': return 'bg-[#F59E0B] text-white';
                  case 'Suspended': return 'bg-[#EF4444] text-white';
                  default: return 'bg-[#64748B] text-white';
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
        </DashboardSection>

        {/* Admin Account Info */}
        <DashboardSection title="Administrator Account" variant="card" padding="md">
          <div className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB]">
            <div className="w-12 h-12 bg-[#4B2AAD] rounded-full flex items-center justify-center text-white font-bold text-lg">
              <Shield className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">
                Platform Administrator
              </h3>
              <p className="text-sm text-[#64748B]">
                {user?.email || 'Unknown'}
              </p>
              <span className="inline-block mt-1 px-2 py-1 bg-[#4B2AAD]/10 text-[#4B2AAD] text-xs rounded-full font-medium">
                {user?.role || 'Admin'} • Full Access
              </span>
            </div>
          </div>
        </DashboardSection>
      </DashboardContent>
    </DashboardLayout>
  );
};

export default SimpleDashboard;
