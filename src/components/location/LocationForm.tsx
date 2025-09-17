import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  getCountries, 
  getStatesByCountry, 
  getCitiesByState, 
  Country, 
  State, 
  City 
} from '@/data/locationData';

interface LocationFormProps {
  onLocationChange: (location: {
    country: string;
    state: string;
    city: string;
    countryCode: string;
    stateCode: string;
  }) => void;
  selectedCountry?: string;
  selectedState?: string;
  selectedCity?: string;
  disabled?: boolean;
}

const LocationForm: React.FC<LocationFormProps> = ({
  onLocationChange,
  selectedCountry,
  selectedState,
  selectedCity,
  disabled = false
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [countryCode, setCountryCode] = useState<string>(selectedCountry || '');
  const [stateCode, setStateCode] = useState<string>(selectedState || '');
  const [cityName, setCityName] = useState<string>(selectedCity || '');

  // Load countries on component mount
  useEffect(() => {
    try {
      const countriesData = getCountries();
      setCountries(countriesData);
      setError(null);
    } catch (err) {
      setError('Failed to load countries. Please refresh the page.');
      console.error('Error loading countries:', err);
    }
  }, []);

  // Load states when country changes
  useEffect(() => {
    if (countryCode) {
      try {
        const statesData = getStatesByCountry(countryCode);
        setStates(statesData);
        setStateCode(''); // Reset state selection
        setCityName(''); // Reset city selection
        setCities([]); // Clear cities
        setError(null);
      } catch (err) {
        setError('Failed to load states for selected country.');
        console.error('Error loading states:', err);
        setStates([]);
      }
    } else {
      setStates([]);
      setCities([]);
      setStateCode('');
      setCityName('');
    }
  }, [countryCode]);

  // Load cities when state changes
  useEffect(() => {
    if (countryCode && stateCode) {
      try {
        const citiesData = getCitiesByState(countryCode, stateCode);
        setCities(citiesData);
        setCityName(''); // Reset city selection
        setError(null);
      } catch (err) {
        setError('Failed to load cities for selected state.');
        console.error('Error loading cities:', err);
        setCities([]);
      }
    } else {
      setCities([]);
      setCityName('');
    }
  }, [countryCode, stateCode]);

  // Notify parent component when location changes
  useEffect(() => {
    if (countryCode && stateCode && cityName) {
      const selectedCountry = countries.find(c => c.code === countryCode);
      const selectedState = states.find(s => s.code === stateCode);
      
      if (selectedCountry && selectedState) {
        onLocationChange({
          country: selectedCountry.name,
          state: selectedState.name,
          city: cityName,
          countryCode,
          stateCode
        });
      }
    }
  }, [countryCode, stateCode, cityName, countries, states, onLocationChange]);

  const handleUseCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        });
      });

      // For demo purposes, we'll set a default location
      // In a real app, you would reverse geocode the coordinates
      setCountryCode('HT');
      setStateCode('OU');
      setCityName('Port-au-Prince');
      
    } catch (err) {
      console.error('Geolocation error:', err);
      setError('Unable to get your current location. Please select manually.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Country Selection */}
      <div>
        <Label htmlFor="country">Country *</Label>
        <Select 
          value={countryCode} 
          onValueChange={setCountryCode}
          disabled={disabled}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select your country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* State/Region Selection */}
      <div>
        <Label htmlFor="state">State/Region/Province *</Label>
        <Select 
          value={stateCode} 
          onValueChange={setStateCode}
          disabled={!countryCode || disabled}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder={countryCode ? "Select your state/region" : "Select a country first"} />
          </SelectTrigger>
          <SelectContent>
            {states.map((state) => (
              <SelectItem key={state.code} value={state.code}>
                {state.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {countryCode && states.length === 0 && (
          <p className="text-sm text-gray-500 mt-1">No states available for this country.</p>
        )}
      </div>

      {/* City Selection */}
      <div>
        <Label htmlFor="city">City *</Label>
        <Select 
          value={cityName} 
          onValueChange={setCityName}
          disabled={!stateCode || disabled}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder={stateCode ? "Select your city" : "Select a state first"} />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city.name} value={city.name}>
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {stateCode && cities.length === 0 && (
          <p className="text-sm text-gray-500 mt-1">No cities available for this state.</p>
        )}
      </div>

      {/* Use Current Location Button */}
      <div className="pt-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleUseCurrentLocation}
          disabled={loading || disabled}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Getting location...
            </>
          ) : (
            <>
              <MapPin className="w-4 h-4 mr-2" />
              Use Current Location
            </>
          )}
        </Button>
        <p className="text-xs text-gray-500 mt-1 text-center">
          This will automatically fill in your location if GPS is available
        </p>
      </div>

      {/* Validation Messages */}
      {countryCode && stateCode && cityName && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>Selected Location:</strong> {cityName}, {states.find(s => s.code === stateCode)?.name}, {countries.find(c => c.code === countryCode)?.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationForm;
