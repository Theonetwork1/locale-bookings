import React from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, MessageCircle, Settings, Plus, Bell, User, Globe, BarChart3, Clock, CheckCircle, Star, TrendingUp, DollarSign, Building2 } from "lucide-react";

const SimpleBusinessDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();


  return (
    <div className="space-y-6">
      {/* Business Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Business Dashboard</h1>
          <p className="text-gray-600">Manage your business and appointments</p>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={() => navigate('/business/services')}
          className="w-full sm:w-auto bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Business Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-[#4B2AAD]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-[#10B981]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8 new clients
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-[#F59E0B]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-[#8B5CF6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-gray-600">
              Customer satisfaction
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
              onClick={() => navigate('/business/appointments')}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#4B2AAD]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-[#4B2AAD]" />
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-1">Appointments</h3>
                <p className="text-sm text-[#64748B]">Manage your schedule</p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-200"
              onClick={() => navigate('/business/clients')}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#10B981]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-[#10B981]" />
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-1">Clients</h3>
                <p className="text-sm text-[#64748B]">Manage your clients</p>
              </CardContent>
            </Card>
          </div>

          {/* Second row - 2 buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-200"
              onClick={() => navigate('/business/messages')}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#8B5CF6]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-6 h-6 text-[#8B5CF6]" />
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-1">Messages</h3>
                <p className="text-sm text-[#64748B]">Chat with clients</p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-200"
              onClick={() => navigate('/business/profile')}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#F59E0B]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Settings className="w-6 h-6 text-[#F59E0B]" />
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-1">Business Profile</h3>
                <p className="text-sm text-[#64748B]">Update your information</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div>
        <h2 className="text-xl font-semibold text-[#1A1A1A] mb-4">Today's Schedule</h2>
        <div className="space-y-3">
          {[
            { time: '09:00 AM', client: 'Sarah Johnson', service: 'Hair Cut & Style', status: 'Confirmed' },
            { time: '10:30 AM', client: 'Mike Chen', service: 'Beard Trim', status: 'Pending' },
            { time: '02:00 PM', client: 'Emma Davis', service: 'Color Treatment', status: 'Confirmed' },
            { time: '03:30 PM', client: 'David Wilson', service: 'Hair Wash', status: 'Completed' }
          ].map((appointment, index) => {
            const getStatusColor = (status: string) => {
              switch (status) {
                case 'Confirmed': return 'bg-[#10B981]/10 text-[#10B981]';
                case 'Pending': return 'bg-[#F59E0B]/10 text-[#F59E0B]';
                case 'Completed': return 'bg-[#8B5CF6]/10 text-[#8B5CF6]';
                default: return 'bg-[#64748B]/10 text-[#64748B]';
              }
            };

            const getBorderColor = (status: string) => {
              switch (status) {
                case 'Confirmed': return 'border-l-[#10B981] bg-[#10B981]/5';
                case 'Pending': return 'border-l-[#F59E0B] bg-[#F59E0B]/5';
                case 'Completed': return 'border-l-[#8B5CF6] bg-[#8B5CF6]/5';
                default: return 'border-l-[#64748B] bg-[#64748B]/5';
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
                        <h4 className="font-semibold text-[#1A1A1A] text-sm sm:text-base truncate">
                          {appointment.time} - {appointment.client}
                        </h4>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-[#64748B]">
                        <span>{appointment.service}</span>
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

export default SimpleBusinessDashboard;