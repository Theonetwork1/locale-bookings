import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Filter, X, Loader2 } from 'lucide-react';
import { Business, Country, State, Department, City } from '@/lib/supabase';
import { useGeographicData } from '@/hooks/useGeographicData';

interface SearchFilters {
  searchTerm: string;
  category: string;
  countryId: string;
  stateId: string;
  departmentId: string;
  cityId: string;
  radius: number;
  sortBy: 'distance' | 'rating' | 'name' | 'created_at';
  sortOrder: 'asc' | 'desc';
}

interface AdvancedBusinessSearchProps {
  onSearch: (filters: SearchFilters) => void;
  onClear: () => void;
  initialFilters?: Partial<SearchFilters>;
  language?: 'en' | 'fr' | 'es' | 'ht';
  className?: string;
}

const AdvancedBusinessSearch: React.FC<AdvancedBusinessSearchProps> = ({
  onSearch,
  onClear,
  initialFilters = {},
  language = 'en',
  className = ''
}) => {
  const {
    countries,
    states,
    departments,
    cities,
    administrativeLevels,
    loading,
    error,
    loadStates,
    loadDepartments,
    loadCities,
    loadAdministrativeLevels
  } = useGeographicData();

  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    category: '',
    countryId: '',
    stateId: '',
    departmentId: '',
    cityId: '',
    radius: 25,
    sortBy: 'distance',
    sortOrder: 'desc',
    ...initialFilters
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Business categories
  const categories = [
    { value: 'restaurant', label: { en: 'Restaurant', fr: 'Restaurant', es: 'Restaurante', ht: 'Restoran' } },
    { value: 'beauty', label: { en: 'Beauty & Wellness', fr: 'Beauté & Bien-être', es: 'Belleza y Bienestar', ht: 'Bote & Byennèt' } },
    { value: 'health', label: { en: 'Healthcare', fr: 'Santé', es: 'Salud', ht: 'Sante' } },
    { value: 'fitness', label: { en: 'Fitness & Sports', fr: 'Fitness & Sports', es: 'Fitness y Deportes', ht: 'Fitness & Espò' } },
    { value: 'education', label: { en: 'Education', fr: 'Éducation', es: 'Educación', ht: 'Edukasyon' } },
    { value: 'automotive', label: { en: 'Automotive', fr: 'Automobile', es: 'Automotriz', ht: 'Otomobil' } },
    { value: 'home', label: { en: 'Home Services', fr: 'Services à domicile', es: 'Servicios del hogar', ht: 'Sèvis lakay' } },
    { value: 'professional', label: { en: 'Professional Services', fr: 'Services professionnels', es: 'Servicios profesionales', ht: 'Sèvis pwofesyonèl' } },
    { value: 'retail', label: { en: 'Retail', fr: 'Commerce de détail', es: 'Venta al por menor', ht: 'Komès detay' } },
    { value: 'other', label: { en: 'Other', fr: 'Autre', es: 'Otro', ht: 'Lòt' } }
  ];

  // Load states when country changes
  useEffect(() => {
    if (filters.countryId) {
      loadStates(filters.countryId);
      loadAdministrativeLevels(filters.countryId);
      // Reset dependent filters
      setFilters(prev => ({
        ...prev,
        stateId: '',
        departmentId: '',
        cityId: ''
      }));
    }
  }, [filters.countryId, loadStates, loadAdministrativeLevels]);

  // Load departments when state changes
  useEffect(() => {
    if (filters.stateId) {
      loadDepartments(filters.stateId);
      // Reset dependent filters
      setFilters(prev => ({
        ...prev,
        departmentId: '',
        cityId: ''
      }));
    }
  }, [filters.stateId, loadDepartments]);

  // Load cities when department changes
  useEffect(() => {
    if (filters.departmentId) {
      loadCities(filters.departmentId);
      // Reset dependent filters
      setFilters(prev => ({
        ...prev,
        cityId: ''
      }));
    }
  }, [filters.departmentId, loadCities]);

  // Update active filters
  useEffect(() => {
    const active: string[] = [];
    if (filters.searchTerm) active.push(`Search: "${filters.searchTerm}"`);
    if (filters.category) active.push(`Category: ${getCategoryLabel(filters.category)}`);
    if (filters.countryId) active.push(`Country: ${getCountryName(filters.countryId)}`);
    if (filters.stateId) active.push(`State: ${getStateName(filters.stateId)}`);
    if (filters.departmentId) active.push(`Department: ${getDepartmentName(filters.departmentId)}`);
    if (filters.cityId) active.push(`City: ${getCityName(filters.cityId)}`);
    if (filters.radius !== 25) active.push(`Radius: ${filters.radius}km`);
    setActiveFilters(active);
  }, [filters]);

  const getLocalizedName = (item: any, language: string) => {
    switch (language) {
      case 'fr': return item.name_fr;
      case 'es': return item.name_es;
      case 'ht': return item.name_ht;
      default: return item.name_en;
    }
  };

  const getCategoryLabel = (categoryValue: string) => {
    const category = categories.find(c => c.value === categoryValue);
    return category ? category.label[language] : categoryValue;
  };

  const getCountryName = (countryId: string) => {
    const country = countries.find(c => c.id === countryId);
    return country ? getLocalizedName(country, language) : countryId;
  };

  const getStateName = (stateId: string) => {
    const state = states.find(s => s.id === stateId);
    return state ? getLocalizedName(state, language) : stateId;
  };

  const getDepartmentName = (departmentId: string) => {
    const department = departments.find(d => d.id === departmentId);
    return department ? getLocalizedName(department, language) : departmentId;
  };

  const getCityName = (cityId: string) => {
    const city = cities.find(c => c.id === cityId);
    return city ? getLocalizedName(city, language) : cityId;
  };

  const getLevel1Name = () => {
    const level = administrativeLevels.find(l => l.level_number === 1);
    return level ? getLocalizedName(level, language) : 'State/Province';
  };

  const getLevel2Name = () => {
    const level = administrativeLevels.find(l => l.level_number === 2);
    return level ? getLocalizedName(level, language) : 'Department/District';
  };

  const getLevel3Name = () => {
    const level = administrativeLevels.find(l => l.level_number === 3);
    return level ? getLocalizedName(level, language) : 'City/Municipality';
  };

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClear = () => {
    setFilters({
      searchTerm: '',
      category: '',
      countryId: '',
      stateId: '',
      departmentId: '',
      cityId: '',
      radius: 25,
      sortBy: 'distance',
      sortOrder: 'desc'
    });
    onClear();
  };

  const removeFilter = (filterToRemove: string) => {
    if (filterToRemove.startsWith('Search:')) {
      handleFilterChange('searchTerm', '');
    } else if (filterToRemove.startsWith('Category:')) {
      handleFilterChange('category', '');
    } else if (filterToRemove.startsWith('Country:')) {
      handleFilterChange('countryId', '');
    } else if (filterToRemove.startsWith('State:')) {
      handleFilterChange('stateId', '');
    } else if (filterToRemove.startsWith('Department:')) {
      handleFilterChange('departmentId', '');
    } else if (filterToRemove.startsWith('City:')) {
      handleFilterChange('cityId', '');
    } else if (filterToRemove.startsWith('Radius:')) {
      handleFilterChange('radius', 25);
    }
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#1A1A1A]">
          <Search className="h-5 w-5 text-[#4B2AAD]" />
          Find Businesses
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Search Term */}
        <div className="space-y-2">
          <Label htmlFor="search" className="text-[#1A1A1A]">Search</Label>
          <div className="flex gap-2">
            <Input
              id="search"
              placeholder="Search businesses, services..."
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleSearch}
              disabled={loading}
              className="bg-[#4B2AAD] hover:bg-[#A68BFA] text-white"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <Label htmlFor="category" className="text-[#1A1A1A]">Category</Label>
          <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label[language]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="border-[#4B2AAD] text-[#4B2AAD] hover:bg-[#4B2AAD] hover:text-white"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
          </Button>
          
          {activeFilters.length > 0 && (
            <Button
              variant="ghost"
              onClick={handleClear}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <X className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="space-y-2">
            <Label className="text-[#1A1A1A]">Active Filters</Label>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-[#EEF1FF] text-[#4B2AAD] hover:bg-[#A68BFA] hover:text-white cursor-pointer"
                  onClick={() => removeFilter(filter)}
                >
                  {filter}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            {/* Location Filters */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#1A1A1A] font-medium">
                <MapPin className="h-4 w-4" />
                Location Filters
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label htmlFor="country" className="text-[#1A1A1A]">Country</Label>
                <Select value={filters.countryId} onValueChange={(value) => handleFilterChange('countryId', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All countries</SelectItem>
                    {countries.map((country) => (
                      <SelectItem key={country.id} value={country.id}>
                        {getLocalizedName(country, language)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* State/Province */}
              {filters.countryId && (
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-[#1A1A1A]">{getLevel1Name()}</Label>
                  <Select value={filters.stateId} onValueChange={(value) => handleFilterChange('stateId', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={`All ${getLevel1Name().toLowerCase()}s`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All {getLevel1Name().toLowerCase()}s</SelectItem>
                      {states.map((state) => (
                        <SelectItem key={state.id} value={state.id}>
                          {getLocalizedName(state, language)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Department/District */}
              {filters.stateId && (
                <div className="space-y-2">
                  <Label htmlFor="department" className="text-[#1A1A1A]">{getLevel2Name()}</Label>
                  <Select value={filters.departmentId} onValueChange={(value) => handleFilterChange('departmentId', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={`All ${getLevel2Name().toLowerCase()}s`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All {getLevel2Name().toLowerCase()}s</SelectItem>
                      {departments.map((department) => (
                        <SelectItem key={department.id} value={department.id}>
                          {getLocalizedName(department, language)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* City/Municipality */}
              {filters.departmentId && (
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-[#1A1A1A]">{getLevel3Name()}</Label>
                  <Select value={filters.cityId} onValueChange={(value) => handleFilterChange('cityId', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={`All ${getLevel3Name().toLowerCase()}s`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All {getLevel3Name().toLowerCase()}s</SelectItem>
                      {cities.map((city) => (
                        <SelectItem key={city.id} value={city.id}>
                          {getLocalizedName(city, language)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Distance Filter */}
            <div className="space-y-2">
              <Label className="text-[#1A1A1A]">Search Radius: {filters.radius}km</Label>
              <Slider
                value={[filters.radius]}
                onValueChange={([value]) => handleFilterChange('radius', value)}
                max={100}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1km</span>
                <span>50km</span>
                <span>100km</span>
              </div>
            </div>

            {/* Sort Options */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sortBy" className="text-[#1A1A1A]">Sort By</Label>
                <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="distance">Distance</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="created_at">Date Added</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sortOrder" className="text-[#1A1A1A]">Order</Label>
                <Select value={filters.sortOrder} onValueChange={(value) => handleFilterChange('sortOrder', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Search Button */}
        <div className="pt-4">
          <Button
            onClick={handleSearch}
            disabled={loading}
            className="w-full bg-[#4B2AAD] hover:bg-[#A68BFA] text-white"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Search className="h-4 w-4 mr-2" />
            )}
            Search Businesses
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedBusinessSearch;
