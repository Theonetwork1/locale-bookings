import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Star, ArrowLeft, Filter, Navigation, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase, Business } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

const FindBusiness = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  
  // Advanced filter states
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDistance, setSelectedDistance] = useState("");
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  // Static data for dropdowns
  const countries = [
    { value: "", label: "All Countries" },
    { value: "haiti", label: "Haiti" },
    { value: "usa", label: "United States" },
    { value: "canada", label: "Canada" },
    { value: "france", label: "France" },
    { value: "mexico", label: "Mexico" },
    { value: "brazil", label: "Brazil" }
  ];

  const states = {
    haiti: [
      { value: "", label: "All Departments" },
      { value: "ouest", label: "Ouest" },
      { value: "artibonite", label: "Artibonite" },
      { value: "centre", label: "Centre" },
      { value: "nord", label: "Nord" },
      { value: "nord-est", label: "Nord-Est" },
      { value: "nord-ouest", label: "Nord-Ouest" },
      { value: "sud", label: "Sud" },
      { value: "sud-est", label: "Sud-Est" },
      { value: "grand-anse", label: "Grand'Anse" },
      { value: "nippes", label: "Nippes" }
    ],
    usa: [
      { value: "", label: "All States" },
      { value: "california", label: "California" },
      { value: "new-york", label: "New York" },
      { value: "texas", label: "Texas" },
      { value: "florida", label: "Florida" },
      { value: "illinois", label: "Illinois" },
      { value: "pennsylvania", label: "Pennsylvania" },
      { value: "ohio", label: "Ohio" },
      { value: "georgia", label: "Georgia" },
      { value: "north-carolina", label: "North Carolina" },
      { value: "michigan", label: "Michigan" }
    ],
    canada: [
      { value: "", label: "All Provinces" },
      { value: "ontario", label: "Ontario" },
      { value: "quebec", label: "Quebec" },
      { value: "british-columbia", label: "British Columbia" },
      { value: "alberta", label: "Alberta" },
      { value: "manitoba", label: "Manitoba" },
      { value: "saskatchewan", label: "Saskatchewan" },
      { value: "nova-scotia", label: "Nova Scotia" },
      { value: "new-brunswick", label: "New Brunswick" },
      { value: "newfoundland", label: "Newfoundland and Labrador" },
      { value: "prince-edward-island", label: "Prince Edward Island" }
    ],
    france: [
      { value: "", label: "All Regions" },
      { value: "ile-de-france", label: "Île-de-France" },
      { value: "auvergne-rhone-alpes", label: "Auvergne-Rhône-Alpes" },
      { value: "hauts-de-france", label: "Hauts-de-France" },
      { value: "grand-est", label: "Grand Est" },
      { value: "nouvelle-aquitaine", label: "Nouvelle-Aquitaine" },
      { value: "occitanie", label: "Occitanie" },
      { value: "provence-alpes-cote-azur", label: "Provence-Alpes-Côte d'Azur" },
      { value: "normandie", label: "Normandie" },
      { value: "bretagne", label: "Bretagne" },
      { value: "pays-de-la-loire", label: "Pays de la Loire" }
    ]
  };

  const cities = {
    "ouest": [
      { value: "", label: "All Cities" },
      { value: "port-au-prince", label: "Port-au-Prince" },
      { value: "carrefour", label: "Carrefour" },
      { value: "delmas", label: "Delmas" },
      { value: "petion-ville", label: "Pétion-Ville" }
    ],
    "california": [
      { value: "", label: "All Cities" },
      { value: "los-angeles", label: "Los Angeles" },
      { value: "san-francisco", label: "San Francisco" },
      { value: "san-diego", label: "San Diego" },
      { value: "sacramento", label: "Sacramento" }
    ],
    "ontario": [
      { value: "", label: "All Cities" },
      { value: "toronto", label: "Toronto" },
      { value: "ottawa", label: "Ottawa" },
      { value: "hamilton", label: "Hamilton" },
      { value: "london", label: "London" }
    ],
    "ile-de-france": [
      { value: "", label: "All Cities" },
      { value: "paris", label: "Paris" },
      { value: "boulogne-billancourt", label: "Boulogne-Billancourt" },
      { value: "saint-denis", label: "Saint-Denis" },
      { value: "argenteuil", label: "Argenteuil" }
    ]
  };

  const businessCategories = [
    { value: "", label: "All Categories" },
    { value: "restaurant", label: "Restaurant" },
    { value: "clinic", label: "Clinic" },
    { value: "hotel", label: "Hotel" },
    { value: "beauty-studio", label: "Beauty Studio" },
    { value: "garage", label: "Garage" },
    { value: "online-shop", label: "Online Shop" },
    { value: "school", label: "School" },
    { value: "pharmacy", label: "Pharmacy" },
    { value: "gym", label: "Gym" },
    { value: "cafe", label: "Café" },
    { value: "bar", label: "Bar" },
    { value: "supermarket", label: "Supermarket" },
    { value: "bank", label: "Bank" },
    { value: "lawyer", label: "Lawyer" },
    { value: "photographer", label: "Photographer" },
    { value: "transport", label: "Transport" },
    { value: "cleaning", label: "Cleaning Service" },
    { value: "it-services", label: "IT Services" },
    { value: "printing", label: "Printing" }
  ];

  const distanceOptions = [
    { value: "", label: "Any Distance" },
    { value: "1", label: "1 km" },
    { value: "5", label: "5 km" },
    { value: "10", label: "10 km" },
    { value: "25", label: "25 km" },
    { value: "50", label: "50 km" },
    { value: "100", label: "100 km" }
  ];

  // Function to get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          toast({
            title: "Location Updated",
            description: "Your current location has been detected for distance filtering.",
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location Error",
            description: "Could not get your current location. Distance filtering will be disabled.",
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Location Not Supported",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive"
      });
    }
  };

  // Function to calculate distance between two points
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in kilometers
  };

  const fetchBusinesses = async () => {
    try {
      console.log("Fetching businesses...");
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching businesses:', error);
        toast({
          title: "Error",
          description: "Failed to load businesses. Please try again.",
          variant: "destructive"
        });
        return;
      }

      console.log("Businesses fetched:", data);
      setBusinesses(data || []);
      setFilteredBusinesses(data || []);
    } catch (error) {
      console.error('Error in fetchBusinesses:', error);
      toast({
        title: "Error",
        description: "An error occurred while loading businesses.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    let filtered = businesses;

    // Apply search term filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(business =>
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply country filter
    if (selectedCountry) {
      filtered = filtered.filter(business =>
        business.country?.toLowerCase().includes(selectedCountry.toLowerCase())
      );
    }

    // Apply state filter
    if (selectedState) {
      filtered = filtered.filter(business =>
        business.state?.toLowerCase().includes(selectedState.toLowerCase())
      );
    }

    // Apply city filter
    if (selectedCity) {
      filtered = filtered.filter(business =>
        business.city?.toLowerCase().includes(selectedCity.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(business =>
        business.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply distance filter
    if (userLocation && selectedDistance) {
      const maxDistance = parseInt(selectedDistance);
      filtered = filtered.filter(business => {
        if (business.latitude && business.longitude) {
          const businessDistance = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            business.latitude,
            business.longitude
          );
          return businessDistance <= maxDistance;
        }
        return true; // Include businesses without coordinates
      });
    }

    setFilteredBusinesses(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCountry("");
    setSelectedState("");
    setSelectedCity("");
    setSelectedCategory("");
    setSelectedDistance("");
    setUserLocation(null);
    setFilteredBusinesses(businesses);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Reset dependent filters when parent changes
  useEffect(() => {
    setSelectedState("");
    setSelectedCity("");
  }, [selectedCountry]);

  useEffect(() => {
    setSelectedCity("");
  }, [selectedState]);

  useEffect(() => {
    console.log("FindBusiness component mounted");
    fetchBusinesses();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, selectedCountry, selectedState, selectedCity, selectedCategory, selectedDistance, userLocation, businesses]);

  console.log("Rendering FindBusiness with:", { 
    loading, 
    businessesCount: businesses.length, 
    filteredCount: filteredBusinesses.length,
    user: user?.name 
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Enhanced Search Component with Integrated Header */}
      <Card className="bg-white border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-[#1A1A1A] hover:bg-[#EEF1FF] p-2"
              onClick={() => navigate(user ? '/client-dashboard' : '/')}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">{user ? 'Back to Dashboard' : 'Back to Home'}</span>
              <span className="sm:hidden">Back</span>
            </Button>
            
            {/* User Menu - Mobile Optimized */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 bg-[#4B2AAD] rounded-full flex items-center justify-center hover:bg-[#A68BFA]"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                <span className="text-xs font-medium text-white">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </Button>
              
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setShowUserDropdown(false);
                        navigate('/client-profile');
                      }}
                    >
                      <User className="h-4 w-4 mr-3" />
                      My Profile
                    </button>
                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setShowUserDropdown(false);
                        navigate('/settings');
                      }}
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Settings
                    </button>
                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setShowUserDropdown(false);
                        handleLogout();
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <CardTitle className="flex items-center gap-2 text-[#1A1A1A] text-xl sm:text-2xl">
            <Search className="h-5 w-5 text-[#4B2AAD]" />
            Find Businesses
          </CardTitle>
        </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Bar */}
            <div className="space-y-2">
              <label htmlFor="search" className="text-[#1A1A1A] block text-sm font-medium">Search by Name</label>
              <div className="flex gap-2">
                <input
                  id="search"
                  type="text"
                  placeholder="Search businesses..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B2AAD]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button
                  onClick={handleSearch}
                  className="bg-[#4B2AAD] hover:bg-[#A68BFA] text-white"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`border-[#4B2AAD] text-[#4B2AAD] hover:bg-[#4B2AAD] hover:text-white transition-all duration-200 ${
                  showAdvancedFilters ? 'bg-[#4B2AAD] text-white' : ''
                }`}
              >
                <Filter className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters</span>
                <span className="sm:hidden">Filters</span>
                <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-200 ${
                  showAdvancedFilters ? 'rotate-180' : ''
                }`} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 text-sm"
              >
                Clear All
              </Button>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="space-y-4 sm:space-y-6 pt-4 border-t border-gray-200 animate-in slide-in-from-top-2 duration-300">
                {/* Location Filters Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {/* Country Filter */}
                  <div className="space-y-2">
                    <label className="text-[#1A1A1A] block text-sm font-medium">Country</label>
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B2AAD]"
                    >
                      {countries.map((country) => (
                        <option key={country.value} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* State/Department Filter */}
                  <div className="space-y-2">
                    <label className="text-[#1A1A1A] block text-sm font-medium">State/Department</label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      disabled={!selectedCountry}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B2AAD] disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      {selectedCountry && states[selectedCountry as keyof typeof states] ? (
                        states[selectedCountry as keyof typeof states].map((state) => (
                          <option key={state.value} value={state.value}>
                            {state.label}
                          </option>
                        ))
                      ) : (
                        <option value="">Select a country first</option>
                      )}
                    </select>
                  </div>

                  {/* City Filter */}
                  <div className="space-y-2">
                    <label className="text-[#1A1A1A] block text-sm font-medium">City</label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      disabled={!selectedState}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B2AAD] disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      {selectedState && cities[selectedState as keyof typeof cities] ? (
                        cities[selectedState as keyof typeof cities].map((city) => (
                          <option key={city.value} value={city.value}>
                            {city.label}
                          </option>
                        ))
                      ) : (
                        <option value="">Select a state first</option>
                      )}
                    </select>
                  </div>
                </div>

                {/* Category and Distance Filters Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Business Category Filter */}
                  <div className="space-y-2">
                    <label className="text-[#1A1A1A] block text-sm font-medium">Business Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B2AAD]"
                    >
                      {businessCategories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Distance Filter */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[#1A1A1A] block text-sm font-medium">Distance Radius</label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={getCurrentLocation}
                        className="text-xs border-[#4B2AAD] text-[#4B2AAD] hover:bg-[#4B2AAD] hover:text-white"
                      >
                        <Navigation className="h-3 w-3 mr-1" />
                        Get Location
                      </Button>
                    </div>
                    <select
                      value={selectedDistance}
                      onChange={(e) => setSelectedDistance(e.target.value)}
                      disabled={!userLocation}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B2AAD] disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      {distanceOptions.map((distance) => (
                        <option key={distance.value} value={distance.value}>
                          {distance.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500">
                      {userLocation 
                        ? `Location detected. Select distance to filter nearby businesses.`
                        : "Click 'Get Location' to enable distance filtering"
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Popular Categories - Show when no search is active */}
        {!searchTerm && !selectedCategory && !selectedCountry && (
          <Card className="bg-gradient-to-r from-[#EEF1FF] to-[#F8FAFC] border-0">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3">Popular Categories</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Restaurant', value: 'restaurant', icon: '🍽️' },
                  { name: 'Clinic', value: 'clinic', icon: '🏥' },
                  { name: 'Hotel', value: 'hotel', icon: '🏨' },
                  { name: 'Beauty Studio', value: 'beauty-studio', icon: '💄' },
                  { name: 'Garage', value: 'garage', icon: '🔧' },
                  { name: 'Pharmacy', value: 'pharmacy', icon: '💊' },
                  { name: 'Gym', value: 'gym', icon: '💪' },
                  { name: 'Café', value: 'cafe', icon: '☕' }
                ].map((category) => (
                  <button
                    key={category.value}
                    onClick={() => {
                      setSelectedCategory(category.value);
                      if (!showAdvancedFilters) setShowAdvancedFilters(true);
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-white text-[#4B2AAD] rounded-full hover:bg-[#4B2AAD] hover:text-white transition-all duration-200 shadow-sm border border-[#4B2AAD] border-opacity-20"
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-lg sm:text-xl font-semibold text-[#1A1A1A]">
              {filteredBusinesses.length} Business{filteredBusinesses.length !== 1 ? 'es' : ''} Found
            </h2>
            {userLocation && selectedDistance && (
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Within {selectedDistance} km of your location</span>
              </div>
            )}
          </div>

          {/* Results Content */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4B2AAD]"></div>
              <span className="ml-3 text-[#1A1A1A]">Loading businesses...</span>
            </div>
          ) : filteredBusinesses.length === 0 ? (
            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="max-w-md mx-auto">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">No businesses found</h3>
                  <p className="text-gray-600 mb-6 text-sm sm:text-base">
                    We couldn't find any businesses matching your criteria. Try adjusting your search or explore popular categories.
                  </p>
                  
                  {/* Quick Actions */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearFilters}
                        className="border-[#4B2AAD] text-[#4B2AAD] hover:bg-[#4B2AAD] hover:text-white"
                      >
                        Clear All Filters
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory("");
                        }}
                        className="border-gray-300 text-gray-600 hover:bg-gray-50"
                      >
                        Reset Search
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-700">Try these popular categories:</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {[
                          { name: 'Restaurant', value: 'restaurant', icon: '🍽️' },
                          { name: 'Clinic', value: 'clinic', icon: '🏥' },
                          { name: 'Hotel', value: 'hotel', icon: '🏨' },
                          { name: 'Beauty Studio', value: 'beauty-studio', icon: '💄' },
                          { name: 'Garage', value: 'garage', icon: '🔧' }
                        ].map((category) => (
                          <button
                            key={category.value}
                            onClick={() => {
                              setSelectedCategory(category.value);
                              setSearchTerm("");
                              if (!showAdvancedFilters) setShowAdvancedFilters(true);
                            }}
                            className="flex items-center gap-1 px-3 py-2 text-xs sm:text-sm bg-[#EEF1FF] text-[#4B2AAD] rounded-full hover:bg-[#4B2AAD] hover:text-white transition-all duration-200"
                          >
                            <span>{category.icon}</span>
                            <span>{category.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredBusinesses.map((business) => {
                const businessDistance = userLocation && business.latitude && business.longitude 
                  ? calculateDistance(userLocation.lat, userLocation.lng, business.latitude, business.longitude)
                  : null;

                return (
                  <Card key={business.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-start space-x-3 mb-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#4B2AAD] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-[#4B2AAD] font-bold text-sm sm:text-lg">
                                {business.name.charAt(0)}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] truncate">
                                {business.name}
                              </h3>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                <span className="px-2 py-1 bg-[#EEF1FF] text-[#4B2AAD] text-xs rounded-full w-fit">
                                  {business.category}
                                </span>
                                {business.rating && (
                                  <div className="flex items-center">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span className="ml-1 text-sm font-medium">{business.rating}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {business.description && (
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {business.description}
                            </p>
                          )}

                          <div className="space-y-2">
                            {business.address && (
                              <div className="flex items-start text-sm text-gray-600">
                                <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="break-words">{business.address}</span>
                              </div>
                            )}
                            {businessDistance && (
                              <div className="flex items-center text-sm text-[#4B2AAD] font-medium">
                                <Navigation className="w-4 h-4 mr-2 flex-shrink-0" />
                                <span>{businessDistance.toFixed(1)} km away</span>
                              </div>
                            )}
                            {business.phone && (
                              <div className="flex items-center text-sm text-gray-600">
                                <span className="w-4 h-4 mr-2 flex-shrink-0">📞</span>
                                <span className="break-all">{business.phone}</span>
                              </div>
                            )}
                            {business.email && (
                              <div className="flex items-center text-sm text-gray-600">
                                <span className="w-4 h-4 mr-2 flex-shrink-0">✉️</span>
                                <span className="break-all">{business.email}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <Button
                          className="w-full bg-[#4B2AAD] hover:bg-[#A68BFA] text-white"
                          onClick={() => {
                            toast({
                              title: "Business Selected",
                              description: "You selected " + business.name,
                            });
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindBusiness;