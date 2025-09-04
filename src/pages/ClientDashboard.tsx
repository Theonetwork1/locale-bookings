import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Briefcase, Calendar, Mail, MessageSquare, MapPin, Clock, Eye, LogOut } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ClientDashboard = () => {
  const { t } = useLanguage();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
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
      business: "BellaSpa",
      service: "Massage",
      address: "412 Cedar St"
    },
    {
      id: 2,
      business: "ComputerPros", 
      service: "Laptop repair",
      address: "100 Pine Ave"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7C5FFF] to-[#9C4FFF]">
      {/* Header */}
      <div className="bg-[#7C5FFF] p-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:text-white hover:bg-white/10"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">JD</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white/95 border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#7C5FFF]/10 rounded-lg flex items-center justify-center group-hover:bg-[#7C5FFF]/20 transition-colors">
                <Search className="w-6 h-6 text-[#7C5FFF]" />
              </div>
              <span className="font-semibold text-gray-800">Find a business</span>
            </CardContent>
          </Card>

          <Card className="bg-white/95 border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#7C5FFF]/10 rounded-lg flex items-center justify-center group-hover:bg-[#7C5FFF]/20 transition-colors">
                <Briefcase className="w-6 h-6 text-[#7C5FFF]" />
              </div>
              <span className="font-semibold text-gray-800">My departments</span>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Appointment */}
        <Card className="bg-white/95 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-[#7C5FFF] rounded-lg flex flex-col items-center justify-center text-white">
                  <span className="text-2xl font-bold">27</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Upcoming Appointment</h3>
                  <p className="text-xl font-bold text-gray-900">Glo Salon</p>
                  <p className="text-gray-600">9:00 am</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="text-[#7C5FFF] border-[#7C5FFF] hover:bg-[#7C5FFF] hover:text-white transition-all duration-300"
              >
                <Eye className="w-4 h-4 mr-2" />
                View details
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* My Appointments */}
        <Card className="bg-white/95 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">My Appointments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {myAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-semibold text-gray-800">{appointment.business}</p>
                  <p className="text-gray-600">{appointment.service}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">{appointment.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Messages */}
        <Card className="bg-white/95 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Messages</CardTitle>
          </CardHeader>
          <CardContent>
            {messages.map((message) => (
              <div key={message.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gray-300 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-800">{message.business}</p>
                    <span className="text-sm text-gray-500">{message.date}</span>
                  </div>
                  <p className="text-gray-600 mt-1">{message.message}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Personalized for You */}
        <Card className="bg-white/95 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Personalized for You</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{rec.business}</p>
                    <p className="text-gray-600">{rec.service}</p>
                    <p className="text-sm text-gray-500">{rec.address}</p>
                  </div>
                  <Button 
                    className="bg-[#7C5FFF] hover:bg-[#6B4FE0] text-white transition-all duration-300 hover:scale-105"
                  >
                    Appointments
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientDashboard;