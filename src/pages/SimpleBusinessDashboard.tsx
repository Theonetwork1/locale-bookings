import React from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut, Calendar, Users, MessageCircle, Settings, Plus, Bell, User, Globe, BarChart3, Clock, CheckCircle, Star } from "lucide-react";
import { 
  DashboardLayout, 
  DashboardHeader, 
  DashboardContent, 
  DashboardSection,
  DashboardStats
} from '@/components/layout/DashboardLayout';

const SimpleBusinessDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Business Dashboard"
        subtitle="Manage your business and appointments"
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

        {/* Business Stats */}
        <DashboardSection variant="minimal" padding="sm">
          <DashboardStats 
            stats={[
              {
                label: "Today's Appointments",
                value: 24,
                icon: <Calendar className="w-5 h-5" />,
                color: "bg-[#4B2AAD]/10 text-[#4B2AAD]",
                trend: { value: "+12%", isPositive: true }
              },
              {
                label: "Total Clients",
                value: 156,
                icon: <Users className="w-5 h-5" />,
                color: "bg-[#10B981]/10 text-[#10B981]",
                trend: { value: "+8", isPositive: true }
              },
              {
                label: "Services Offered",
                value: 8,
                icon: <Settings className="w-5 h-5" />,
                color: "bg-[#F59E0B]/10 text-[#F59E0B]"
              },
              {
                label: "Average Rating",
                value: "4.8",
                icon: <Star className="w-5 h-5" />,
                color: "bg-[#F59E0B]/10 text-[#F59E0B]"
              },
              {
                label: "Monthly Revenue",
                value: "$12,450",
                icon: <BarChart3 className="w-5 h-5" />,
                color: "bg-[#10B981]/10 text-[#10B981]",
                trend: { value: "+15%", isPositive: true }
              }
            ]}
          />
        </DashboardSection>

        {/* Main Actions - Vertical Stack */}
        <div className="max-w-md mx-auto space-y-4 mb-8">
          <Button
            onClick={() => navigate('/business/appointments')}
            className="w-full h-16 bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white rounded-xl text-lg font-semibold flex items-center justify-start px-6 gap-4 shadow-lg"
          >
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <span>Appointments</span>
          </Button>

          <Button
            onClick={() => navigate('/business/clients')}
            className="w-full h-16 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl text-lg font-semibold flex items-center justify-start px-6 gap-4 shadow-lg"
          >
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <span>Clients</span>
          </Button>

          <Button
            onClick={() => navigate('/business/messages')}
            className="w-full h-16 bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-xl text-lg font-semibold flex items-center justify-start px-6 gap-4 shadow-lg"
          >
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span>Messages</span>
          </Button>

          <Button
            onClick={() => navigate('/business/notifications')}
            className="w-full h-16 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl text-lg font-semibold flex items-center justify-start px-6 gap-4 shadow-lg"
          >
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <span>Notifications</span>
          </Button>

          <Button
            onClick={() => navigate('/business/profile')}
            className="w-full h-16 bg-[#64748B] hover:bg-[#475569] text-white rounded-xl text-lg font-semibold flex items-center justify-start px-6 gap-4 shadow-lg"
          >
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <span>Business Profile</span>
          </Button>
        </div>

        {/* Today's Schedule */}
        <DashboardSection title="Today's Schedule" variant="card" padding="md">
          <div className="space-y-3">
            {[
              { time: '9:00 AM', client: 'Sarah Johnson', service: 'Haircut', status: 'Confirmed', duration: '45min' },
              { time: '10:30 AM', client: 'Mike Chen', service: 'Consultation', status: 'Pending', duration: '30min' },
              { time: '2:00 PM', client: 'Emma Davis', service: 'Styling', status: 'Confirmed', duration: '60min' },
              { time: '4:00 PM', client: 'John Smith', service: 'Beard Trim', status: 'Confirmed', duration: '30min' }
            ].map((appointment, index) => {
              const getBorderColor = (status: string) => {
                switch (status) {
                  case 'Confirmed': return 'border-l-[#10B981] bg-[#10B981]/5';
                  case 'Pending': return 'border-l-[#F59E0B] bg-[#F59E0B]/5';
                  default: return 'border-l-[#64748B] bg-[#64748B]/5';
                }
              };
              
              const getStatusColor = (status: string) => {
                switch (status) {
                  case 'Confirmed': return 'bg-[#10B981] text-white';
                  case 'Pending': return 'bg-[#F59E0B] text-white';
                  default: return 'bg-[#64748B] text-white';
                }
              };

              return (
                <Card key={index} className={`bg-white border-0 border-l-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${getBorderColor(appointment.status)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#4B2AAD]/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-[#4B2AAD]" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-[#1A1A1A] text-sm sm:text-base">
                            {appointment.time} - {appointment.client}
                          </h4>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-[#64748B]">
                          <span>{appointment.service}</span>
                          <span>•</span>
                          <span>{appointment.duration}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </DashboardSection>

        {/* Business Account Info */}
        <DashboardSection title="Business Account" variant="card" padding="md">
          <div className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB]">
            <div className="w-12 h-12 bg-[#4B2AAD] rounded-full flex items-center justify-center text-white font-bold text-lg">
              {user?.name?.charAt(0) || user?.email?.charAt(0) || 'B'}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">
                Business Account
              </h3>
              <p className="text-sm text-[#64748B]">
                {user?.email || 'Unknown'}
              </p>
              <span className="inline-block mt-1 px-2 py-1 bg-[#4B2AAD]/10 text-[#4B2AAD] text-xs rounded-full font-medium">
                {user?.role || 'Business'}
              </span>
            </div>
          </div>
        </DashboardSection>
      </DashboardContent>
    </DashboardLayout>
  );
};

export default SimpleBusinessDashboard;
