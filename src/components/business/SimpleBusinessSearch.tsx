import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Filter, X } from 'lucide-react';

interface SearchFilters {
  searchTerm: string;
  category: string;
  radius: number;
  sortBy: 'distance' | 'rating' | 'name' | 'created_at';
  sortOrder: 'asc' | 'desc';
}

interface SimpleBusinessSearchProps {
  onSearch: (filters: SearchFilters) => void;
  onClear: () => void;
  initialFilters?: Partial<SearchFilters>;
  className?: string;
}

const SimpleBusinessSearch: React.FC<SimpleBusinessSearchProps> = ({
  onSearch,
  onClear,
  initialFilters = {},
  className = ''
}) => {
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    category: '',
    radius: 25,
    sortBy: 'distance',
    sortOrder: 'desc',
    ...initialFilters
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const categories = [
    { value: '', label: 'All categories' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'beauty', label: 'Beauty & Wellness' },
    { value: 'health', label: 'Healthcare' },
    { value: 'fitness', label: 'Fitness & Sports' },
    { value: 'education', label: 'Education' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'home', label: 'Home Services' },
    { value: 'professional', label: 'Professional Services' },
    { value: 'retail', label: 'Retail' },
    { value: 'other', label: 'Other' }
  ];

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
      radius: 25,
      sortBy: 'distance',
      sortOrder: 'desc'
    });
    onClear();
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
              className="bg-[#4B2AAD] hover:bg-[#A68BFA] text-white"
            >
              <Search className="h-4 w-4" />
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
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
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
          
          <Button
            variant="ghost"
            onClick={handleClear}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            {/* Distance Filter */}
            <div className="space-y-2">
              <Label className="text-[#1A1A1A]">Search Radius: {filters.radius}km</Label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={filters.radius}
                  onChange={(e) => handleFilterChange('radius', parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm text-gray-500 w-12">{filters.radius}km</span>
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
            className="w-full bg-[#4B2AAD] hover:bg-[#A68BFA] text-white"
          >
            <Search className="h-4 w-4 mr-2" />
            Search Businesses
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleBusinessSearch;
