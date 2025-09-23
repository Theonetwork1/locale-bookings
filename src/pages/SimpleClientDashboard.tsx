import React from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Calendar, MessageCircle, Bell, User, Clock, CheckCircle, AlertCircle, Star, Search, MapPin, TrendingUp, Building2 } from "lucide-react";

const SimpleClientDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="space-y-6">
      {/* Client Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Client Dashboard</h1>
          <p className="text-gray-600">Manage your appointments and bookings</p>
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

      {/* Client Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-[#4B2AAD]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              Next: Tomorrow 2PM
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorite Businesses</CardTitle>
            <Building2 className="h-4 w-4 text-[#10B981]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-gray-600">
              Saved for quick booking
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <CheckCircle className="h-4 w-4 text-[#F59E0B]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +3 this month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loyalty Points</CardTitle>
            <Star className="h-4 w-4 text-[#8B5CF6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-gray-600">
              Available to redeem
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
              onClick={() => navigate('/find-business')}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#4B2AAD]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6 text-[#4B2AAD]" />
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-1">Find Business</h3>
                <p className="text-sm text-[#64748B]">Discover local services</p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-200"
              onClick={() => navigate('/client/appointments')}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#10B981]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-[#10B981]" />
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-1">My Appointments</h3>
                <p className="text-sm text-[#64748B]">View your bookings</p>
              </CardContent>
            </Card>
          </div>

          {/* Second row - 2 buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-200"
              onClick={() => navigate('/client/messages')}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#8B5CF6]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-6 h-6 text-[#8B5CF6]" />
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-1">Messages</h3>
                <p className="text-sm text-[#64748B]">Chat with providers</p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-200"
              onClick={() => navigate('/client/profile')}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#F59E0B]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <User className="w-6 h-6 text-[#F59E0B]" />
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-1">Profile</h3>
                <p className="text-sm text-[#64748B]">Manage your account</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-[#1A1A1A] mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[
            { type: 'booking', business: 'Glo Beauty Salon', service: 'Hair Cut & Style', date: '2024-01-15', status: 'Confirmed' },
            { type: 'review', business: 'Tech Repair Hub', service: 'Phone Screen Repair', date: '2024-01-12', status: 'Completed' },
            { type: 'booking', business: 'Fitness Center Pro', service: 'Personal Training', date: '2024-01-10', status: 'Confirmed' },
            { type: 'payment', business: 'Restaurant Deluxe', service: 'Dinner Reservation', date: '2024-01-08', status: 'Paid' }
          ].map((activity, index) => {
            const getStatusColor = (status: string) => {
              switch (status) {
                case 'Confirmed': return 'bg-[#10B981]/10 text-[#10B981]';
                case 'Completed': return 'bg-[#8B5CF6]/10 text-[#8B5CF6]';
                case 'Paid': return 'bg-[#F59E0B]/10 text-[#F59E0B]';
                default: return 'bg-[#64748B]/10 text-[#64748B]';
              }
            };

            const getBorderColor = (status: string) => {
              switch (status) {
                case 'Confirmed': return 'border-l-[#10B981] bg-[#10B981]/5';
                case 'Completed': return 'border-l-[#8B5CF6] bg-[#8B5CF6]/5';
                case 'Paid': return 'border-l-[#F59E0B] bg-[#F59E0B]/5';
                default: return 'border-l-[#64748B] bg-[#64748B]/5';
              }
            };

            const getIcon = (type: string) => {
              switch (type) {
                case 'booking': return Calendar;
                case 'review': return Star;
                case 'payment': return CheckCircle;
                default: return Clock;
              }
            };

            const IconComponent = getIcon(activity.type);

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
                        <span>{activity.service}</span>
                        <span>•</span>
                        <span>{new Date(activity.date).toLocaleDateString()}</span>
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

export default SimpleClientDashboard;