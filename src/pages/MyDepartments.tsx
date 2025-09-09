import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Users, Calendar, Star, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

interface Department {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

interface Business {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  category: string;
  rating: number;
}

const MyDepartments = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [clientDepartments, setClientDepartments] = useState<string[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch all departments
      const { data: deptData, error: deptError } = await supabase
        .from('departments')
        .select('*')
        .order('name');
      
      if (deptError) throw deptError;
      setDepartments(deptData || []);

      // Fetch client's departments (using a mock client ID for demo)
      const { data: clientDeptData, error: clientDeptError } = await supabase
        .from('client_departments')
        .select('department_id')
        .eq('client_id', 'mock-client-id'); // Replace with actual client ID
      
      if (clientDeptError) {
        console.log('No client departments found, using mock data');
        // Mock data for demo
        setClientDepartments(['Beauty & Wellness', 'Home Services']);
      } else {
        setClientDepartments(clientDeptData?.map(item => item.department_id) || []);
      }

      // Fetch businesses in client's departments
      const { data: businessData, error: businessError } = await supabase
        .from('businesses')
        .select('*')
        .in('category', ['Beauty', 'Home Services', 'Wellness'])
        .order('rating', { ascending: false });
      
      if (businessError) throw businessError;
      setBusinesses(businessData || []);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinDepartment = async (departmentName: string) => {
    try {
      // In a real app, you'd add the client to the department
      console.log(`Joining department: ${departmentName}`);
      setClientDepartments(prev => [...prev, departmentName]);
    } catch (error) {
      console.error('Error joining department:', error);
    }
  };

  const handleLeaveDepartment = async (departmentName: string) => {
    try {
      // In a real app, you'd remove the client from the department
      console.log(`Leaving department: ${departmentName}`);
      setClientDepartments(prev => prev.filter(dept => dept !== departmentName));
    } catch (error) {
      console.error('Error leaving department:', error);
    }
  };

  const handleBookAppointment = (businessId: string) => {
    navigate(`/book-appointment/${businessId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#7C5FFF] to-[#9C4FFF] flex items-center justify-center">
        <div className="text-white text-xl">Loading departments...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7C5FFF] to-[#9C4FFF]">
      {/* Header */}
      <div className="bg-[#7C5FFF] p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10"
            onClick={() => navigate('/client-dashboard')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-white">My Departments</h1>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">JD</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* My Active Departments */}
        <Card className="bg-white/95 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              My Active Departments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {clientDepartments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clientDepartments.map((deptName) => (
                  <div key={deptName} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">{deptName}</h3>
                        <p className="text-sm text-gray-600">
                          {deptName === 'Beauty & Wellness' && 'Hair salons, spas, and wellness centers'}
                          {deptName === 'Home Services' && 'Plumbing, electrical, and home maintenance'}
                          {deptName === 'Technology' && 'Computer repair and IT services'}
                          {deptName === 'Healthcare' && 'Medical and health services'}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleLeaveDepartment(deptName)}
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        Leave
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No departments yet</h3>
                <p className="text-gray-600">Join departments below to see relevant businesses and services.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Available Departments */}
        <Card className="bg-white/95 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Available Departments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {departments.map((dept) => (
                <div key={dept.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">{dept.name}</h3>
                      <p className="text-sm text-gray-600">{dept.description}</p>
                    </div>
                    {clientDepartments.includes(dept.name) ? (
                      <Badge variant="secondary">Joined</Badge>
                    ) : (
                      <Button 
                        size="sm"
                        onClick={() => handleJoinDepartment(dept.name)}
                        className="bg-[#7C5FFF] hover:bg-[#6B4FE0] text-white"
                      >
                        Join
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Businesses in My Departments */}
        {clientDepartments.length > 0 && (
          <Card className="bg-white/95 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Businesses in My Departments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {businesses.map((business) => (
                  <div key={business.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-800">{business.name}</h3>
                        <Badge variant="outline" className="mt-1">
                          {business.category}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{business.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{business.description}</p>
                    
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span>{business.address}</span>
                      </div>
                    </div>

                    <Button 
                      size="sm"
                      className="w-full bg-[#7C5FFF] hover:bg-[#6B4FE0] text-white"
                      onClick={() => handleBookAppointment(business.id)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Appointment
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MyDepartments;
