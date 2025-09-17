import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Star, Filter, Navigation, SlidersHorizontal } from 'lucide-react';
import { Business, getBusinessesByLocation, calculateDistance } from '@/lib/supabase';
import { LocationSelector } from '@/components/location/LocationSelector';
import { useGeolocation } from '@/hooks/useGeolocation';
import { Label } from '@/components/ui/label';

interface BusinessSearchProps {
  onResults: (businesses: Business[]) => void;
  initialLocation?: {
    country: string;
    state: string;
    city: string;
    latitude?: number;
    longitude?: number;
  };
}

export const BusinessSearch: React.FC<BusinessSearchProps> = ({
  onResults,
  initialLocation
}) => {
  const { latitude, longitude, getCurrentPosition, loading: geoLoading } = useGeolocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [locationFilter, setLocationFilter] = useState({
    country: initialLocation?.country || '',
    state: initialLocation?.state || '',
    city: initialLocation?.city || '',
    latitude: initialLocation?.latitude,
    longitude: initialLocation?.longitude,
    full_address: ''
  });
  const [radiusFilter, setRadiusFilter] = useState(25);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'name'>('distance');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = [
    'All Categories',
    'Beauty & Wellness',
    'Healthcare',
    'Fitness & Sports',
    'Professional Services',
    'Food & Beverage',
    'Technology',
    'Home Services',
    'Entertainment'
  ];

  useEffect(() => {
    if (latitude && longitude) {
      setLocationFilter(prev => ({
        ...prev,
        latitude,
        longitude
      }));
    }
  }, [latitude, longitude]);

  useEffect(() => {
    handleSearch();
  }, [locationFilter, radiusFilter, minRating, sortBy]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      let businesses: Business[] = [];

      // Recherche par localisation
      if (locationFilter.country) {
        businesses = await getBusinessesByLocation(
          locationFilter.country,
          locationFilter.state,
          locationFilter.city,
          radiusFilter,
          locationFilter.latitude,
          locationFilter.longitude
        );
      }

      // Filtres supplémentaires
      let filtered = businesses;

      // Filtre par terme de recherche
      if (searchTerm) {
        filtered = filtered.filter(business =>
          business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          business.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          business.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filtre par catégorie
      if (selectedCategory && selectedCategory !== 'All Categories') {
        filtered = filtered.filter(business => business.category === selectedCategory);
      }

      // Filtre par note minimum
      if (minRating > 0) {
        filtered = filtered.filter(business => (business.rating || 0) >= minRating);
      }

      onResults(filtered);
    } catch (error) {
      console.error('Search error:', error);
      onResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6 space-y-6">
        {/* Recherche principale */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search businesses, services, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Catégories rapides */}
        <div className="flex flex-wrap gap-2">
          {categories.slice(0, 6).map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(selectedCategory === category ? "" : category)}
              className={selectedCategory === category ? "bg-primary hover:bg-primary/90" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Localisation */}
        <LocationSelector
          value={locationFilter}
          onChange={setLocationFilter}
          showGPS={true}
        />

        {/* Filtres avancés */}
        <div className="space-y-4">
          <Button
            variant="ghost"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full justify-start"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
          </Button>

          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
              <div>
                <Label>Search Radius</Label>
                <Select value={radiusFilter.toString()} onValueChange={(value) => setRadiusFilter(parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 km</SelectItem>
                    <SelectItem value="10">10 km</SelectItem>
                    <SelectItem value="25">25 km</SelectItem>
                    <SelectItem value="50">50 km</SelectItem>
                    <SelectItem value="100">100 km</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Minimum Rating</Label>
                <Select value={minRating.toString()} onValueChange={(value) => setMinRating(parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any Rating</SelectItem>
                    <SelectItem value="3">3+ Stars</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="5">5 Stars Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Sort By</Label>
                <Select value={sortBy} onValueChange={(value: 'distance' | 'rating' | 'name') => setSortBy(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="distance">Distance</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Bouton de recherche */}
        <Button
          onClick={handleSearch}
          disabled={loading}
          className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white"
        >
          {loading ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Searching...
            </div>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Search Businesses
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
