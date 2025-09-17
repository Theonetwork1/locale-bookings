import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Search, Briefcase, Calendar, Mail, MessageSquare, MapPin, Clock, Eye, LogOut,
  TrendingUp, DollarSign, Users, BarChart3, Star, Award, Target, Activity
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslations } from "@/hooks/useTranslations";
import { useNavigate } from "react-router-dom";

const ClientDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const t = useTranslations();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const upcomingAppointments = [
    {
      id: 1,
      business: "Glo Salon",
      service: "Haircut",
      time: "9:00 am",
      date: "27",
      status: "confirmed"
    }
  ];

  const myAppointments = [
    { id: 1, business: "Glo Salon", service: "Haircut", time: "9:00 am" },
    { id: 2, business: "Madison Electric", service: "Electrical repair", time: "1:00 pm" },
    { id: 3, business: "Asset Plumbing", service: "Drain cleaning", time: "11:00 am" }
  ];

  const messages = [
    {
      id: 1,
      business: "Savvy Health",
      message: "Spring promo is here! Get a 20% discount - book your appointment today",
      date: "Apr 19"
    }
  ];

  const recommendations = [
    {
      id: 1,
      business: "Zen Wellness Studio",
      service: "Relaxing Massage",
      address: "123 Main St"
    },
    {
      id: 2,
      business: "TechFix Pro", 
      service: "Computer Repair",
      address: "456 Oak Ave"
    }
  ];

  // Mock data for activity history
  const activityStats = {
    totalAppointments: 24,
    completedAppointments: 22,
    cancelledAppointments: 2,
    totalSpent: 1250.00,
    thisMonthSpent: 180.00,
    lastMonthSpent: 220.00,
    averagePerAppointment: 52.08
  };

  const frequentedBusinesses = [
    {
      id: 1,
      name: "Glo Salon",
      category: "Beauty",
      totalVisits: 8,
      lastVisit: "2024-01-15",
      totalSpent: 320.00,
      rating: 4.8
    },
    {
      id: 2,
      name: "Madison Electric",
      category: "Home Services",
      totalVisits: 3,
      lastVisit: "2024-01-10",
      totalSpent: 450.00,
      rating: 4.9
    },
    {
      id: 3,
      name: "Asset Plumbing",
      category: "Home Services",
      totalVisits: 2,
      lastVisit: "2024-01-08",
      totalSpent: 280.00,
      rating: 4.7
    },
    {
      id: 4,
      name: "Zen Wellness Studio",
      category: "Wellness",
      totalVisits: 5,
      lastVisit: "2024-01-12",
      totalSpent: 200.00,
      rating: 4.9
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "appointment",
      business: "Glo Salon",
      service: "Haircut",
      date: "2024-01-15",
      amount: 45.00,
      status: "completed"
    },
    {
      id: 2,
      type: "appointment",
      business: "Zen Wellness Studio",
      service: "Massage",
      date: "2024-01-12",
      amount: 80.00,
      status: "completed"
    },
    {
      id: 3,
      type: "appointment",
      business: "Madison Electric",
      service: "Electrical repair",
      date: "2024-01-10",
      amount: 150.00,
      status: "completed"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-[#4B2AAD] rounded-xl flex items-center justify-center shadow">
            <span className="text-white font-bold text-xl">BS</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A1A]">Client Dashboard</h1>
            <p className="text-gray-600 text-sm">Welcome back, {user?.name || 'User'}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
          <div className="w-12 h-12 bg-[#EEF1FF] rounded-full flex items-center justify-center border border-[#4B2AAD]">
            <span className="text-[#1A1A1A] font-bold text-lg">{user?.name?.charAt(0) || 'U'}</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            className="bg-white border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={() => navigate('/find-business')}
          >
            <CardContent className="p-8">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-[#4B2AAD] rounded-xl flex items-center justify-center transition-transform shadow">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#1A1A1A]">Find Businesses</h3>
                  <p className="text-gray-600">Discover services near you</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="bg-white border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={() => navigate('/my-departments')}
          >
            <CardContent className="p-8">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-[#A68BFA] rounded-xl flex items-center justify-center transition-transform shadow">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#1A1A1A]">My Departments</h3>
                  <p className="text-gray-600">Manage your preferences</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Appointments */}
        <Card className="bg-white border border-gray-100 shadow-md">
          <CardHeader className="pb-4 border-b border-gray-100">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#4B2AAD] rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-[#1A1A1A]">Today's Appointments</span>
              </div>
              <Badge className="bg-[#EEF1FF] text-[#4B2AAD] border-[#4B2AAD] px-3 py-1">
                {upcomingAppointments.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-3">
                {upcomingAppointments.map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#4B2AAD] text-white rounded-lg flex items-center justify-center font-bold">
                        {apt.date}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{apt.business}</p>
                        <p className="text-sm text-gray-600">{apt.service} at {apt.time}</p>
                      </div>
                    </div>
                    <Badge className="bg-[#EEF1FF] text-[#4B2AAD] border-[#4B2AAD]">
                      {apt.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No appointments today</p>
            )}
          </CardContent>
        </Card>

        {/* My Appointments */}
        <Card className="bg-white border border-gray-100 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-[#4B2AAD]" />
                <span className="text-[#1A1A1A]">My Appointments</span>
              </span>
              <Button size="sm" variant="outline" className="border-[#4B2AAD] text-[#4B2AAD] hover:bg-[#4B2AAD] hover:text-white">
                <Eye className="w-4 h-4 mr-2" />
                View all
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myAppointments.map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">{apt.business}</p>
                    <p className="text-sm text-gray-600">{apt.service}</p>
                  </div>
                  <span className="text-sm font-medium text-[#4B2AAD]">{apt.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card className="bg-white border border-gray-100 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-[#4B2AAD]" />
              <span className="text-[#1A1A1A]">Messages</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {messages.length > 0 ? (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-800">{msg.business}</p>
                      <span className="text-xs text-gray-500">{msg.date}</span>
                    </div>
                    <p className="text-sm text-gray-600">{msg.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No messages</p>
            )}
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="bg-white border border-gray-100 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-[#4B2AAD]" />
              <span className="text-[#1A1A1A]">Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((rec) => (
                <div key={rec.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">{rec.business}</p>
                    <p className="text-sm text-gray-600">{rec.service}</p>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {rec.address}
                    </p>
                  </div>
                  <Button size="sm" className="bg-[#4B2AAD] hover:bg-[#A68BFA] text-white">
                    Book
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity History Section */}
        <div className="mt-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-[#4B2AAD] rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#1A1A1A]">{t.activityHistory || 'Activity History'}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Appointment Reports */}
            <Card className="bg-white border border-gray-100 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-[#4B2AAD]" />
                  <span className="text-[#1A1A1A]">{t.appointmentReports || 'Appointment Reports'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t.totalAppointments || 'Total Appointments'}</span>
                    <span className="text-2xl font-bold text-[#4B2AAD]">{activityStats.totalAppointments}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{t.completedAppointments || 'Completed'}</span>
                      <span className="font-semibold text-green-600">{activityStats.completedAppointments}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{t.cancelledAppointments || 'Cancelled'}</span>
                      <span className="font-semibold text-red-600">{activityStats.cancelledAppointments}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{t.completedAppointments || 'Completed'}</span>
                      <span>{Math.round((activityStats.completedAppointments / activityStats.totalAppointments) * 100)}%</span>
                    </div>
                    <Progress 
                      value={(activityStats.completedAppointments / activityStats.totalAppointments) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Money Spent */}
            <Card className="bg-white border border-gray-100 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-[#F97316]" />
                  <span className="text-[#1A1A1A]">{t.moneySpent || 'Money Spent'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t.totalSpent || 'Total Spent'}</span>
                    <span className="text-2xl font-bold text-[#F97316]">${activityStats.totalSpent.toFixed(2)}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{t.thisMonth || 'This Month'}</span>
                      <span className="font-semibold text-[#F97316]">${activityStats.thisMonthSpent.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{t.lastMonth || 'Last Month'}</span>
                      <span className="font-semibold text-gray-600">${activityStats.lastMonthSpent.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{t.averagePerAppointment || 'Average per Appointment'}</span>
                      <span>${activityStats.averagePerAppointment.toFixed(2)}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-[#F97316] rounded-full" 
                        style={{ width: '75%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Frequented Businesses Summary */}
            <Card className="bg-white border border-gray-100 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-[#4B2AAD]" />
                  <span className="text-[#1A1A1A]">{t.frequentedBusinesses || 'Frequented Businesses'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t.topBusinesses || 'Top Businesses'}</span>
                    <span className="text-2xl font-bold text-[#4B2AAD]">{frequentedBusinesses.length}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{t.mostFrequented || 'Most Frequented'}</span>
                      <span className="font-semibold text-[#4B2AAD]">{frequentedBusinesses[0]?.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{t.totalVisits || 'Total Visits'}</span>
                      <span className="font-semibold text-gray-600">{frequentedBusinesses[0]?.totalVisits}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{t.favoriteCategory || 'Favorite Category'}</span>
                      <span>Beauty & Wellness</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-[#4B2AAD] rounded-full" 
                        style={{ width: '60%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Frequented Businesses */}
          <Card className="bg-white border border-gray-100 shadow-md mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-[#F97316]" />
                <span className="text-[#1A1A1A]">{t.frequentedBusinesses || 'Frequented Businesses'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {frequentedBusinesses.map((business) => (
                  <div key={business.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#4B2AAD] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {business.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{business.name}</p>
                        <p className="text-sm text-gray-600">{business.category}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500 flex items-center">
                            <Target className="w-3 h-3 mr-1" />
                            {business.totalVisits} {t.totalVisits || 'visits'}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {t.lastVisit || 'Last visit'}: {new Date(business.lastVisit).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#F97316]">${business.totalSpent.toFixed(2)}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{business.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white border border-gray-100 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-[#4B2AAD]" />
                <span className="text-[#1A1A1A]">{t.recentActivity || 'Recent Activity'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentActivity.length > 0 ? (
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{activity.business}</p>
                          <p className="text-sm text-gray-600">{activity.service}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(activity.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#F97316]">${activity.amount.toFixed(2)}</p>
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">{t.noActivityYet || 'No activity yet'}</p>
                  <p className="text-sm text-gray-400">{t.startBookingAppointments || 'Start booking appointments to see your activity history'}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;