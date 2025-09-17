import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Navigation, Loader2 } from 'lucide-react';
import { 
  Country, 
  State, 
  Department, 
  City, 
  Neighborhood,
  AdministrativeLevel,
  getCountries,
  getStatesByCountry,
  getDepartmentsByState,
  getDepartmentsByCountry,
  getCitiesByDepartment,
  getCitiesByState,
  getCitiesByCountry,
  getNeighborhoodsByCity,
  getAdministrativeLevels
} from '@/lib/supabase';

interface LocationData {
  country_id?: string;
  state_id?: string;
  department_id?: string;
  city_id?: string;
  neighborhood_id?: string;
  latitude?: number;
  longitude?: number;
  full_address?: string;
}

interface HierarchicalLocationSelectorProps {
  onLocationChange: (location: LocationData) => void;
  initialLocation?: LocationData;
  language?: 'en' | 'fr' | 'es' | 'ht';
  showNeighborhoods?: boolean;
  className?: string;
}

const HierarchicalLocationSelector: React.FC<HierarchicalLocationSelectorProps> = ({
  onLocationChange,
  initialLocation,
  language = 'en',
  showNeighborhoods = false,
  className = ''
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [administrativeLevels, setAdministrativeLevels] = useState<AdministrativeLevel[]>([]);
  
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('');
  
  const [loading, setLoading] = useState(false);
  const [geolocationLoading, setGeolocationLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Load countries on component mount
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await getCountries();
        setCountries(data);
      } catch (err) {
        setError('Failed to load countries');
        console.error('Error loading countries:', err);
      }
    };
    loadCountries();
  }, []);

  // Load administrative levels when country changes
  useEffect(() => {
    if (selectedCountry) {
      const loadAdministrativeLevels = async () => {
        try {
          const levels = await getAdministrativeLevels(selectedCountry);
          setAdministrativeLevels(levels);
        } catch (err) {
          console.error('Error loading administrative levels:', err);
        }
      };
      loadAdministrativeLevels();
    }
  }, [selectedCountry]);

  // Load states when country changes
  useEffect(() => {
    if (selectedCountry) {
      const loadStates = async () => {
        setLoading(true);
        try {
          const data = await getStatesByCountry(selectedCountry);
          setStates(data);
          // Reset dependent selections
          setSelectedState('');
          setSelectedDepartment('');
          setSelectedCity('');
          setSelectedNeighborhood('');
          setDepartments([]);
          setCities([]);
          setNeighborhoods([]);
        } catch (err) {
          setError('Failed to load states');
          console.error('Error loading states:', err);
        } finally {
          setLoading(false);
        }
      };
      loadStates();
    }
  }, [selectedCountry]);

  // Load departments when state changes
  useEffect(() => {
    if (selectedState) {
      const loadDepartments = async () => {
        setLoading(true);
        try {
          const data = await getDepartmentsByState(selectedState);
          setDepartments(data);
          // Reset dependent selections
          setSelectedDepartment('');
          setSelectedCity('');
          setSelectedNeighborhood('');
          setCities([]);
          setNeighborhoods([]);
        } catch (err) {
          setError('Failed to load departments');
          console.error('Error loading departments:', err);
        } finally {
          setLoading(false);
        }
      };
      loadDepartments();
    }
  }, [selectedState]);

  // Load cities when department changes
  useEffect(() => {
    if (selectedDepartment) {
      const loadCities = async () => {
        setLoading(true);
        try {
          const data = await getCitiesByDepartment(selectedDepartment);
          setCities(data);
          // Reset dependent selections
          setSelectedCity('');
          setSelectedNeighborhood('');
          setNeighborhoods([]);
        } catch (err) {
          setError('Failed to load cities');
          console.error('Error loading cities:', err);
        } finally {
          setLoading(false);
        }
      };
      loadCities();
    }
  }, [selectedDepartment]);

  // Load neighborhoods when city changes (if enabled)
  useEffect(() => {
    if (selectedCity && showNeighborhoods) {
      const loadNeighborhoods = async () => {
        setLoading(true);
        try {
          const data = await getNeighborhoodsByCity(selectedCity);
          setNeighborhoods(data);
          setSelectedNeighborhood('');
        } catch (err) {
          setError('Failed to load neighborhoods');
          console.error('Error loading neighborhoods:', err);
        } finally {
          setLoading(false);
        }
      };
      loadNeighborhoods();
    }
  }, [selectedCity, showNeighborhoods]);

  // Update parent component when location changes
  useEffect(() => {
    const locationData: LocationData = {
      country_id: selectedCountry || undefined,
      state_id: selectedState || undefined,
      department_id: selectedDepartment || undefined,
      city_id: selectedCity || undefined,
      neighborhood_id: selectedNeighborhood || undefined,
    };
    onLocationChange(locationData);
  }, [selectedCountry, selectedState, selectedDepartment, selectedCity, selectedNeighborhood, onLocationChange]);

  // Initialize with provided location
  useEffect(() => {
    if (initialLocation) {
      setSelectedCountry(initialLocation.country_id || '');
      setSelectedState(initialLocation.state_id || '');
      setSelectedDepartment(initialLocation.department_id || '');
      setSelectedCity(initialLocation.city_id || '');
      setSelectedNeighborhood(initialLocation.neighborhood_id || '');
    }
  }, [initialLocation]);

  const getLocalizedName = (item: any, language: string) => {
    switch (language) {
      case 'fr': return item.name_fr;
      case 'es': return item.name_es;
      case 'ht': return item.name_ht;
      default: return item.name_en;
    }
  };

  const getLevelName = (level: AdministrativeLevel, language: string) => {
    switch (language) {
      case 'fr': return level.name_fr;
      case 'es': return level.name_es;
      case 'ht': return level.name_ht;
      default: return level.name_en;
    }
  };

  const handleGeolocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setGeolocationLoading(true);
    setError('');

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Use reverse geocoding to get address
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&accept-language=${language}`
      );
      
      if (response.ok) {
        const data = await response.json();
        const address = data.display_name;
        
        onLocationChange({
          country_id: selectedCountry,
          state_id: selectedState,
          department_id: selectedDepartment,
          city_id: selectedCity,
          neighborhood_id: selectedNeighborhood,
          latitude,
          longitude,
          full_address: address
        });
      }
    } catch (err) {
      setError('Failed to get current location');
      console.error('Geolocation error:', err);
    } finally {
      setGeolocationLoading(false);
    }
  };

  const getLevel1Name = () => {
    const level = administrativeLevels.find(l => l.level_number === 1);
    return level ? getLevelName(level, language) : 'State/Province';
  };

  const getLevel2Name = () => {
    const level = administrativeLevels.find(l => l.level_number === 2);
    return level ? getLevelName(level, language) : 'Department/District';
  };

  const getLevel3Name = () => {
    const level = administrativeLevels.find(l => l.level_number === 3);
    return level ? getLevelName(level, language) : 'City/Municipality';
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#1A1A1A]">
          <MapPin className="h-5 w-5 text-[#4B2AAD]" />
          Location Selection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Country Selection */}
        <div className="space-y-2">
          <Label htmlFor="country" className="text-[#1A1A1A]">Country</Label>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.id} value={country.id}>
                  {getLocalizedName(country, language)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* State/Province Selection */}
        {selectedCountry && (
          <div className="space-y-2">
            <Label htmlFor="state" className="text-[#1A1A1A]">{getLevel1Name()}</Label>
            <Select value={selectedState} onValueChange={setSelectedState} disabled={loading}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select a ${getLevel1Name().toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state.id} value={state.id}>
                    {getLocalizedName(state, language)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Department/District Selection */}
        {selectedState && (
          <div className="space-y-2">
            <Label htmlFor="department" className="text-[#1A1A1A]">{getLevel2Name()}</Label>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment} disabled={loading}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select a ${getLevel2Name().toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {departments.map((department) => (
                  <SelectItem key={department.id} value={department.id}>
                    {getLocalizedName(department, language)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* City/Municipality Selection */}
        {selectedDepartment && (
          <div className="space-y-2">
            <Label htmlFor="city" className="text-[#1A1A1A]">{getLevel3Name()}</Label>
            <Select value={selectedCity} onValueChange={setSelectedCity} disabled={loading}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select a ${getLevel3Name().toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.id} value={city.id}>
                    {getLocalizedName(city, language)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Neighborhood Selection (Optional) */}
        {selectedCity && showNeighborhoods && (
          <div className="space-y-2">
            <Label htmlFor="neighborhood" className="text-[#1A1A1A]">Neighborhood/Quarter</Label>
            <Select value={selectedNeighborhood} onValueChange={setSelectedNeighborhood} disabled={loading}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a neighborhood (optional)" />
              </SelectTrigger>
              <SelectContent>
                {neighborhoods.map((neighborhood) => (
                  <SelectItem key={neighborhood.id} value={neighborhood.id}>
                    {getLocalizedName(neighborhood, language)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Geolocation Button */}
        <div className="pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleGeolocation}
            disabled={geolocationLoading}
            className="w-full border-[#4B2AAD] text-[#4B2AAD] hover:bg-[#4B2AAD] hover:text-white"
          >
            {geolocationLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Navigation className="h-4 w-4 mr-2" />
            )}
            Use Current Location
          </Button>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-[#4B2AAD]" />
            <span className="ml-2 text-[#1A1A1A]">Loading locations...</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export { HierarchicalLocationSelector };
export default HierarchicalLocationSelector;
