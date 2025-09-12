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

        {/* Today's Appointments */}
        <Card className="bg-white/95 border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-[#7C5FFF]" />
              <span>Today's Appointments</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-3">
                {upcomingAppointments.map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#7C5FFF] text-white rounded-lg flex items-center justify-center font-bold">
                        {apt.date}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{apt.business}</p>
                        <p className="text-sm text-gray-600">{apt.service} at {apt.time}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
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
        <Card className="bg-white/95 border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-[#7C5FFF]" />
                <span>My Appointments</span>
              </span>
              <Button size="sm" variant="outline" className="border-[#7C5FFF] text-[#7C5FFF] hover:bg-[#7C5FFF] hover:text-white">
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
                  <span className="text-sm font-medium text-[#7C5FFF]">{apt.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card className="bg-white/95 border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-[#7C5FFF]" />
              <span>Messages</span>
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
        <Card className="bg-white/95 border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-[#7C5FFF]" />
              <span>Recommendations</span>
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
                  <Button size="sm" className="bg-[#7C5FFF] hover:bg-[#6B4FE0] text-white">
                    Book
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientDashboard;