import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Users, Calendar, Star, MapPin, Building2, Eye, LogOut, Search, Globe, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/hooks/useTranslations";
import { detectUserLocation, getCountryByCode } from "@/services/geoip";
import { getCountries, getSubdivisionsByCountry, searchSubdivisions, GeographicSubdivision, Country } from "@/services/geographicData";
import { getSelectedCountry, setSelectedCountry, getUserPreferences } from "@/services/localStorage";

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
  const { language } = useLanguage();
  const t = useTranslations();
  
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountryState] = useState<string>('HT');
  const [subdivisions, setSubdivisions] = useState<GeographicSubdivision[]>([]);
  const [filteredSubdivisions, setFilteredSubdivisions] = useState<GeographicSubdivision[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [clientDepartments, setClientDepartments] = useState<string[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingSubdivisions, setLoadingSubdivisions] = useState(false);
  const [joiningDepartment, setJoiningDepartment] = useState<string | null>(null);
  const [detectingLocation, setDetectingLocation] = useState(false);

  useEffect(() => {
    initializeData();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      loadSubdivisions(selectedCountry);
    }
  }, [selectedCountry]);

  useEffect(() => {
    // Filter subdivisions based on search query
    const filtered = searchSubdivisions(subdivisions, searchQuery);
    setFilteredSubdivisions(filtered);
  }, [subdivisions, searchQuery]);

  const initializeData = async () => {
    try {
      setLoading(true);
      
      // Load countries
      const countriesData = await getCountries();
      setCountries(countriesData);

      // Get user's stored country preference
      const storedCountry = getSelectedCountry();
      
      // Try to detect user's location if no preference is stored
      if (storedCountry === 'HT' && !getUserPreferences().selectedCountry) {
        setDetectingLocation(true);
        try {
          const geoData = await detectUserLocation();
          if (geoData && geoData.countryCode !== 'HT') {
            const detectedCountry = getCountryByCode(geoData.countryCode);
            if (detectedCountry) {
              setSelectedCountryState(geoData.countryCode);
              setSelectedCountry(geoData.countryCode);
              toast({
                title: "Location Detected",
                description: `We detected you're in ${geoData.country}. We've updated your country selection.`,
              });
            }
          }
        } catch (error) {
          console.warn('Location detection failed:', error);
        } finally {
          setDetectingLocation(false);
        }
      } else {
        setSelectedCountryState(storedCountry);
      }

      // Load client's departments and businesses
      await loadClientData();

    } catch (error) {
      console.error('Error initializing data:', error);
      toast({
        title: "Error",
        description: "Failed to load data. Please refresh the page.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadSubdivisions = async (countryCode: string) => {
    try {
      setLoadingSubdivisions(true);
      const subdivisionsData = await getSubdivisionsByCountry(countryCode);
      setSubdivisions(subdivisionsData);
    } catch (error) {
      console.error('Error loading subdivisions:', error);
      toast({
        title: "Error",
        description: "Failed to load subdivisions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoadingSubdivisions(false);
    }
  };

  const loadClientData = async () => {
    try {
      // Fetch client's departments (using a mock client ID for demo)
      const { data: clientDeptData, error: clientDeptError } = await supabase
        .from('client_departments')
        .select('department_id')
        .eq('client_id', 'mock-client-id'); // Replace with actual client ID
      
      if (clientDeptError) {
        console.log('No client departments found, using mock data');
        // Mock data for demo - user starts with 2 departments
        setClientDepartments(['Ouest', 'Artibonite']);
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
      console.error('Error loading client data:', error);
    }
  };

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountryState(countryCode);
    setSelectedCountry(countryCode);
    setSearchQuery(''); // Clear search when country changes
  };

  const handleJoinDepartment = async (departmentName: string) => {
    try {
      setJoiningDepartment(departmentName);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you'd add the client to the department
      console.log(`Joining department: ${departmentName}`);
      setClientDepartments(prev => [...prev, departmentName]);
      
      // Show success toast
      toast({
        title: "Department Joined!",
        description: `You've joined the ${departmentName} department.`,
      });
      
    } catch (error) {
      console.error('Error joining department:', error);
      toast({
        title: "Error",
        description: "Failed to join department. Please try again.",
        variant: "destructive"
      });
    } finally {
      setJoiningDepartment(null);
    }
  };

  const handleLeaveDepartment = async (departmentName: string) => {
    try {
      // In a real app, you'd remove the client from the department
      console.log(`Leaving department: ${departmentName}`);
      setClientDepartments(prev => prev.filter(dept => dept !== departmentName));
      
      toast({
        title: "Department Left",
        description: `You've left the ${departmentName} department.`,
      });
    } catch (error) {
      console.error('Error leaving department:', error);
      toast({
        title: "Error",
        description: "Failed to leave department. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleViewBusinesses = (departmentName: string) => {
    navigate('/find-business', { 
      state: { 
        filter: { 
          department: departmentName,
          country: selectedCountry
        } 
      } 
    });
  };

  const handleBookAppointment = (businessId: string) => {
    navigate(`/book-appointment/${businessId}`);
  };

  const getSubdivisionName = (subdivision: GeographicSubdivision): string => {
    switch (language) {
      case 'fr': return subdivision.name_fr;
      case 'es': return subdivision.name_es;
      case 'ht': return subdivision.name_ht;
      default: return subdivision.name_en;
    }
  };

  const getCountryName = (country: Country): string => {
    switch (language) {
      case 'fr': return country.name_fr;
      case 'es': return country.name_es;
      case 'ht': return country.name_ht;
      default: return country.name_en;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4B2AAD] to-[#A68BFA] flex items-center justify-center">
        <div className="text-white text-xl flex items-center">
          <Loader2 className="w-6 h-6 mr-3 animate-spin" />
          Loading departments...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4B2AAD] to-[#A68BFA]">
      {/* Header */}
      <div className="bg-[#4B2AAD] p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10"
            onClick={() => navigate('/client-dashboard')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.backToDashboard}
          </Button>
          <h1 className="text-2xl font-bold text-white">{t.departments || 'My Departments'}</h1>
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
            <CardTitle className="text-xl font-bold text-[#1A1A1A] flex items-center">
              <Users className="w-5 h-5 mr-2 text-[#4B2AAD]" />
              {t.myActiveDepartments || 'My Active Departments'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {clientDepartments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {clientDepartments.map((deptName) => (
                  <Card key={deptName} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-[#4B2AAD]/10 rounded-lg flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-[#4B2AAD]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#1A1A1A]">{deptName}</h3>
                            <p className="text-sm text-gray-600">
                              {deptName === 'Ouest' && 'Capital region and business center'}
                              {deptName === 'Artibonite' && 'Agriculture and commerce hub'}
                              {deptName === 'Nord' && 'Historical and cultural center'}
                              {deptName === 'Sud' && 'Tourism and fishing industry'}
                              {deptName === 'Centre' && 'Mountain region and agriculture'}
                              {deptName === 'Nord-Est' && 'Border region and trade'}
                              {deptName === 'Nord-Ouest' && 'Coastal and agricultural area'}
                              {deptName === 'Sud-Est' && 'Tourism and fishing'}
                              {deptName === "Grand'Anse" && 'Agriculture and fishing'}
                              {deptName === 'Nippes' && 'Agriculture and crafts'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          onClick={() => handleViewBusinesses(deptName)}
                          className="flex-1 bg-[#4B2AAD] hover:bg-[#A68BFA] text-white"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          {t.viewBusinesses || 'View Businesses'}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleLeaveDepartment(deptName)}
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{t.noDepartmentsYet || 'No departments yet'}</h3>
                <p className="text-gray-600 mb-4">{t.browseDepartmentsBelow || 'Browse departments below to discover local businesses.'}</p>
                <Button 
                  onClick={() => {
                    const element = document.getElementById('available-departments');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-[#4B2AAD] hover:bg-[#A68BFA] text-white"
                >
                  {t.browseDepartments || 'Browse Departments'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Available Departments */}
        <Card id="available-departments" className="bg-white/95 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#1A1A1A] flex items-center">
              <Plus className="w-5 h-5 mr-2 text-[#4B2AAD]" />
              {t.availableDepartments || 'Available Departments'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Country Selection */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-[#4B2AAD]" />
                <label className="text-sm font-medium text-[#1A1A1A]">
                  {t.selectCountry || 'Select Country'}:
                </label>
              </div>
              <Select value={selectedCountry} onValueChange={handleCountryChange}>
                <SelectTrigger className="w-full sm:w-64">
                  <SelectValue placeholder={t.selectCountry || 'Select Country'} />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">
                          {country.code === 'HT' && '🇭🇹'}
                          {country.code === 'US' && '🇺🇸'}
                          {country.code === 'CA' && '🇨🇦'}
                          {country.code === 'FR' && '🇫🇷'}
                          {country.code === 'MX' && '🇲🇽'}
                          {country.code === 'BR' && '🇧🇷'}
                        </span>
                        <span>{getCountryName(country)}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {detectingLocation && (
                <div className="flex items-center text-sm text-gray-600">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t.detectingLocation || 'Detecting location...'}
                </div>
              )}
            </div>

            {/* Search Filter */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={t.searchDepartments || 'Search departments...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Subdivisions Grid */}
            {loadingSubdivisions ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#4B2AAD]" />
                <span className="ml-3 text-[#1A1A1A]">{t.loadingDepartments || 'Loading departments...'}</span>
              </div>
            ) : filteredSubdivisions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSubdivisions
                  .filter(subdivision => !clientDepartments.includes(getSubdivisionName(subdivision)))
                  .map((subdivision) => (
                  <Card key={subdivision.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-[#4B2AAD]/10 rounded-lg flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-[#4B2AAD]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#1A1A1A]">{getSubdivisionName(subdivision)}</h3>
                            <p className="text-sm text-gray-600">{subdivision.description}</p>
                            <Badge variant="outline" className="mt-1 text-xs text-[#4B2AAD] border-[#4B2AAD]">
                              {subdivision.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        size="sm"
                        onClick={() => handleJoinDepartment(getSubdivisionName(subdivision))}
                        disabled={joiningDepartment === getSubdivisionName(subdivision)}
                        className="w-full bg-[#4B2AAD] hover:bg-[#A68BFA] text-white disabled:opacity-50"
                      >
                        {joiningDepartment === getSubdivisionName(subdivision) ? (
                          <>
                            <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            {t.joining || 'Joining...'}
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 mr-2" />
                            {t.join || 'Join'}
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  {searchQuery 
                    ? t.noResultsFound || 'No results found' 
                    : subdivisions.length === 0 
                      ? t.noSubdivisionsAvailable || 'No subdivisions available for this country yet.'
                      : t.noDepartmentsAvailable || 'No departments available'
                  }
                </h3>
                <p className="text-gray-600">
                  {searchQuery 
                    ? t.tryDifferentSearch || 'Try a different search term or clear the search to see all departments.'
                    : subdivisions.length === 0
                      ? t.subdivisionsComingSoon || 'We are working on adding subdivisions for this country. Please check back later or select a different country.'
                      : t.selectDifferentCountry || 'Select a different country to see available departments.'
                  }
                </p>
                {searchQuery && (
                  <Button 
                    variant="outline"
                    onClick={() => setSearchQuery('')}
                    className="mt-4"
                  >
                    {t.clearSearch || 'Clear Search'}
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Businesses in My Departments */}
        {clientDepartments.length > 0 && (
          <Card className="bg-white/95 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#1A1A1A] flex items-center">
                <Star className="w-5 h-5 mr-2 text-[#4B2AAD]" />
                {t.businessesInMyDepartments || 'Businesses in My Departments'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {businesses.map((business) => (
                  <Card key={business.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-[#1A1A1A]">{business.name}</h3>
                          <Badge variant="outline" className="mt-1 text-[#4B2AAD] border-[#4B2AAD]">
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
                        className="w-full bg-[#4B2AAD] hover:bg-[#A68BFA] text-white"
                        onClick={() => handleBookAppointment(business.id)}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        {t.bookAppointment || 'Book Appointment'}
                      </Button>
                    </CardContent>
                  </Card>
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