import React from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut, Calendar, MessageCircle, Bell, User, Clock, CheckCircle, AlertCircle, Star, Search, MapPin } from "lucide-react";
import { 
  DashboardLayout, 
  DashboardHeader, 
  DashboardContent, 
  DashboardSection 
} from '@/components/layout/DashboardLayout';

const SimpleClientDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Client Dashboard"
        subtitle="Manage your appointments and bookings"
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

        {/* Main Actions - Vertical Stack */}
        <div className="max-w-md mx-auto space-y-4 mb-8">
          <Button
            onClick={() => navigate('/find-business')}
            className="w-full h-16 bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white rounded-xl text-lg font-semibold flex items-center justify-start px-6 gap-4 shadow-lg"
          >
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <span>Find Business</span>
          </Button>

          <Button
            onClick={() => navigate('/client/appointments')}
            className="w-full h-16 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl text-lg font-semibold flex items-center justify-start px-6 gap-4 shadow-lg"
          >
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <span>My Appointments</span>
          </Button>

          <Button
            onClick={() => navigate('/client/messages')}
            className="w-full h-16 bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-xl text-lg font-semibold flex items-center justify-start px-6 gap-4 shadow-lg"
          >
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span>Messages</span>
          </Button>

          <Button
            onClick={() => navigate('/client/profile')}
            className="w-full h-16 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl text-lg font-semibold flex items-center justify-start px-6 gap-4 shadow-lg"
          >
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <span>My Profile</span>
          </Button>
        </div>

        {/* Recent Activity */}
        <DashboardSection title="Recent Activity" variant="card" padding="md">
          <div className="space-y-3">
            {[
              { type: 'Appointment', business: 'Beauty Salon Pro', date: 'Today, 2:00 PM', status: 'Confirmed', category: 'Beauty & Wellness', icon: Calendar },
              { type: 'Message', business: 'Tech Repair Hub', date: 'Yesterday', status: 'New Reply', category: 'Technology', icon: MessageCircle },
              { type: 'Appointment', business: 'Fitness Center', date: 'Tomorrow, 10:00 AM', status: 'Pending', category: 'Health & Fitness', icon: Clock },
              { type: 'Review', business: 'Restaurant Deluxe', date: '2 days ago', status: 'Completed', category: 'Food & Dining', icon: Star }
            ].map((activity, index) => {
              const IconComponent = activity.icon;
              const getBorderColor = (status: string) => {
                switch (status) {
                  case 'Confirmed': return 'border-l-[#10B981] bg-[#10B981]/5';
                  case 'New Reply': return 'border-l-[#4B2AAD] bg-[#4B2AAD]/5';
                  case 'Pending': return 'border-l-[#F59E0B] bg-[#F59E0B]/5';
                  default: return 'border-l-[#64748B] bg-[#64748B]/5';
                }
              };
              
              const getStatusColor = (status: string) => {
                switch (status) {
                  case 'Confirmed': return 'bg-[#10B981] text-white';
                  case 'New Reply': return 'bg-[#4B2AAD] text-white';
                  case 'Pending': return 'bg-[#F59E0B] text-white';
                  default: return 'bg-[#64748B] text-white';
                }
              };

              return (
                <Card key={index} className={`bg-white border-0 border-l-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${getBorderColor(activity.status)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#4B2AAD]/10 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-[#4B2AAD]" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-[#1A1A1A] text-sm sm:text-base truncate">
                            {activity.business}
                          </h4>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(activity.status)}`}>
                            {activity.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-[#64748B]">
                          <span className="px-2 py-1 bg-[#F3F4F6] text-[#64748B] rounded-full">
                            {activity.category}
                          </span>
                          <span>•</span>
                          <span>{activity.type} • {activity.date}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </DashboardSection>

        {/* User Info */}
        <DashboardSection title="Account Information" variant="card" padding="md">
          <div className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB]">
            <div className="w-12 h-12 bg-[#4B2AAD] rounded-full flex items-center justify-center text-white font-bold text-lg">
              {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">
                Welcome back!
              </h3>
              <p className="text-sm text-[#64748B]">
                {user?.email || 'Unknown'}
              </p>
              <span className="inline-block mt-1 px-2 py-1 bg-[#4B2AAD]/10 text-[#4B2AAD] text-xs rounded-full font-medium">
                {user?.role || 'Client'}
              </span>
            </div>
          </div>
        </DashboardSection>
      </DashboardContent>
    </DashboardLayout>
  );
};

export default SimpleClientDashboard;
