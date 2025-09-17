import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Loader2 } from 'lucide-react';

interface LocationData {
  country: string;
  state: string;
  city: string;
  latitude?: number;
  longitude?: number;
  full_address?: string;
}

interface LocationSelectorProps {
  value: LocationData;
  onChange: (location: LocationData) => void;
  required?: boolean;
  showGPS?: boolean;
}

// Données géographiques (peut être remplacé par une API)
const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'FR', name: 'France' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'DE', name: 'Germany' }
];

const STATES = {
  US: ['California', 'New York', 'Texas', 'Florida', 'Illinois'],
  CA: ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba'],
  FR: ['Île-de-France', 'Provence-Alpes-Côte d\'Azur', 'Auvergne-Rhône-Alpes', 'Nouvelle-Aquitaine'],
  UK: ['England', 'Scotland', 'Wales', 'Northern Ireland'],
  DE: ['Bavaria', 'North Rhine-Westphalia', 'Baden-Württemberg', 'Lower Saxony']
};

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  value,
  onChange,
  required = false,
  showGPS = false
}) => {
  const [gettingLocation, setGettingLocation] = useState(false);

  const handleCountryChange = (country: string) => {
    onChange({
      ...value,
      country,
      state: '',
      city: ''
    });
  };

  const handleStateChange = (state: string) => {
    onChange({
      ...value,
      state,
      city: ''
    });
  };

  const handleCityChange = (city: string) => {
    onChange({
      ...value,
      city
    });
  };

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setGettingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Reverse geocoding pour obtenir l'adresse
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          );
          const data = await response.json();
          
          if (data && data.address) {
            onChange({
              ...value,
              latitude,
              longitude,
              country: data.address.country_code?.toUpperCase() || '',
              state: data.address.state || '',
              city: data.address.city || data.address.town || data.address.village || '',
              full_address: data.display_name
            });
          }
        } catch (error) {
          console.error('Reverse geocoding error:', error);
          onChange({
            ...value,
            latitude,
            longitude
          });
        } finally {
          setGettingLocation(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setGettingLocation(false);
        alert('Unable to retrieve your location. Please select manually.');
      }
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-lg font-semibold">Location Information</Label>
        {showGPS && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={getCurrentLocation}
            disabled={gettingLocation}
          >
            {gettingLocation ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <MapPin className="w-4 h-4 mr-2" />
            )}
            {gettingLocation ? 'Getting Location...' : 'Use Current Location'}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="country">Country {required && '*'}</Label>
          <Select value={value.country} onValueChange={handleCountryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="state">State/Region {required && '*'}</Label>
          <Select 
            value={value.state} 
            onValueChange={handleStateChange}
            disabled={!value.country}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {value.country && STATES[value.country as keyof typeof STATES]?.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="city">City {required && '*'}</Label>
          <Input
            id="city"
            value={value.city}
            onChange={(e) => handleCityChange(e.target.value)}
            placeholder="Enter city name"
            disabled={!value.state}
          />
        </div>
      </div>

      {value.full_address && (
        <div className="p-3 bg-muted/30 rounded-lg">
          <Label className="text-sm text-muted-foreground">Detected Address:</Label>
          <p className="text-sm font-medium">{value.full_address}</p>
        </div>
      )}
    </div>
  );
};