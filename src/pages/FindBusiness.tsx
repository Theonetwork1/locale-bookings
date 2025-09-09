import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Phone, Mail, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase, Business, Service } from "@/lib/supabase";

const FindBusiness = () => {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Beauty", "Home Services", "Technology", "Healthcare", "Wellness"];

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('rating', { ascending: false });
      
      if (error) throw error;
      setBusinesses(data || []);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchServicesForBusiness = async (businessId: string) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('business_id', businessId);
      
      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || selectedCategory === "All" || 
                           business.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBookAppointment = (businessId: string) => {
    navigate(`/book-appointment/${businessId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#7C5FFF] to-[#9C4FFF] flex items-center justify-center">
        <div className="text-white text-xl">Loading businesses...</div>
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
            ← Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-white">Find a Business</h1>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">JD</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Search and Filters */}
        <Card className="bg-white/95 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search businesses or services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category === "All" ? "" : category)}
                    className={selectedCategory === category ? "bg-[#7C5FFF] hover:bg-[#6B4FE0]" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => (
            <Card key={business.id} className="bg-white/95 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-800">{business.name}</CardTitle>
                    <Badge variant="outline" className="mt-2">
                      {business.category}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{business.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">{business.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{business.address}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{business.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{business.email}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    className="flex-1 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
                    onClick={() => handleBookAppointment(business.id)}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Appointment
                  </Button>
                  <Button 
                    variant="outline" 
                    className="hover:bg-[#F97316] hover:text-white hover:border-[#F97316] transition-all duration-200"
                    onClick={() => fetchServicesForBusiness(business.id)}
                  >
                    View Services
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBusinesses.length === 0 && (
          <Card className="bg-white/95 border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No businesses found</h3>
              <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FindBusiness;
