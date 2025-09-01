import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  MessageSquare, 
  Bell, 
  Settings,
  Globe,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const BusinessDashboard = () => {
  const { t } = useLanguage();
  const [currentMonth, setCurrentMonth] = useState("April 2024");
  
  const services = [
    { name: "Service One", price: "$100" },
    { name: "Service Two", price: "$75" },
    { name: "Service Three", price: "$30" },
    { name: "Service Four", price: "$50" }
  ];

  const upcomingAppointments = [
    { client: "John Smith", date: "Apr 26, 2024", time: "", status: "Cancel" },
    { client: "Emma Johnson", date: "Apr 28, 2024", time: "11:30 AM", status: "Confirmed" }
  ];

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Calendar, label: "Appointments", active: false },
    { icon: Users, label: "Clients", active: false },
    { icon: MessageSquare, label: "Messages", active: false },
    { icon: Bell, label: "Notifications", active: false, badge: "1" },
    { icon: Globe, label: "Business Page", active: false },
    { icon: MessageCircle, label: "Live Chat", active: false }
  ];

  // Calendar days for April 2024
  const calendarDays = [
    ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, 31, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11]
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              $
            </div>
            <span className="font-semibold text-gray-800">Business</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <div 
              key={index}
              className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
                item.active 
                  ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.badge && (
                <Badge className="bg-orange-500 text-white text-xs px-2 py-1">
                  {item.badge}
                </Badge>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Business Dashboard</h1>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              John Doe
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Content - Main Dashboard */}
            <div className="lg:col-span-2 space-y-6">
              {/* Business Info Card */}
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                      $
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-600 font-medium">Edit Business information</p>
                          <h2 className="text-xl font-bold text-gray-800 mt-1">Business Name</h2>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">123 Main St, City, State</p>
                          <p className="text-gray-600">(122) 456-7890</p>
                        </div>
                        <div>
                          <p className="text-gray-600">09:00 AM - 06:00 PM</p>
                          <p className="text-gray-600">info@business.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Services */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800">Services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-800">{service.name}</span>
                      <span className="font-semibold text-gray-600">{service.price}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Appointments */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800">Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 text-gray-600 font-medium">Client</th>
                          <th className="text-left py-3 text-gray-600 font-medium">Date</th>
                          <th className="text-left py-3 text-gray-600 font-medium">Time</th>
                          <th className="text-left py-3 text-gray-600 font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {upcomingAppointments.map((appointment, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 font-medium text-gray-800">{appointment.client}</td>
                            <td className="py-3 text-gray-600">{appointment.date}</td>
                            <td className="py-3 text-gray-600">{appointment.time}</td>
                            <td className="py-3">
                              <Button 
                                variant={appointment.status === "Cancel" ? "destructive" : "default"}
                                size="sm"
                                className="hover:scale-105 transition-transform"
                              >
                                {appointment.status}
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Manage Availability Calendar */}
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-gray-800">Manage Availability</CardTitle>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <Button variant="ghost" size="sm">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="font-semibold text-gray-800">{currentMonth}</span>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    {calendarDays.map((week, weekIndex) => (
                      week.map((day, dayIndex) => (
                        <div 
                          key={`${weekIndex}-${dayIndex}`}
                          className={`p-2 rounded cursor-pointer transition-colors ${
                            weekIndex === 0 
                              ? 'font-semibold text-gray-600' 
                              : typeof day === 'number' && day > 28 && weekIndex > 4
                                ? 'text-gray-400 hover:bg-gray-50'
                                : 'text-gray-800 hover:bg-blue-50'
                          } ${day === 27 ? 'bg-blue-600 text-white' : ''}`}
                        >
                          {day}
                        </div>
                      ))
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Clients Section */}
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-gray-800">Clients</CardTitle>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Message All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-2xl font-bold text-gray-800">125 Total Clients</div>
                    <p className="text-gray-600">Transaction History</p>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-800">Clients</span>
                      <Button variant="ghost" size="sm">
                        <Menu className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;