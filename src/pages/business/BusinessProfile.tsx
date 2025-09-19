import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Building2, Save, MapPin, ArrowLeft, Phone, Mail, CheckCircle, AlertCircle, Loader2, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from '@/hooks/useTranslations';
import { updateUserProfile, geocodeAddress } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { LocationSelector } from '@/components/location/LocationSelector';

const BusinessProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar_url: user?.avatar_url || '',
    business_name: user?.business_name || '',
    business_description: user?.business_description || '',
    business_category: user?.business_category || '',
    country: user?.country || '',
    state: user?.state || '',
    city: user?.city || '',
    latitude: user?.latitude,
    longitude: user?.longitude,
    full_address: user?.full_address || '',
    business_address: user?.business_address || ''
  });

  const categories = [
    'Beauty & Wellness',
    'Healthcare',
    'Fitness & Sports',
    'Education & Training',
    'Professional Services',
    'Home & Garden Services',
    'Automotive',
    'Food & Beverage',
    'Entertainment',
    'Technology',
    'Other'
  ];

  const handleLocationChange = (location: any) => {
    setFormData({
      ...formData,
      country: location.country,
      state: location.state,
      city: location.city,
      latitude: location.latitude,
      longitude: location.longitude,
      full_address: location.full_address
    });
  };

  const handleAddressGeocode = async () => {
    if (!formData.business_address) return;

    setGeoLoading(true);
    try {
      const coords = await geocodeAddress(formData.business_address);
      if (coords) {
        setFormData({
          ...formData,
          latitude: coords.lat,
          longitude: coords.lng
        });
        toast({
          title: 'Location Found',
          description: 'GPS coordinates updated from business address.'
        });
      } else {
        toast({
          title: 'Location Not Found',
          description: 'Unable to find GPS coordinates for this address.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      toast({
        title: 'Geocoding Failed',
        description: 'Unable to process address. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setGeoLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      await updateUserProfile(user.id, {
        name: formData.name,
        phone: formData.phone,
        avatar_url: formData.avatar_url,
        business_name: formData.business_name,
        business_description: formData.business_description,
        business_category: formData.business_category,
        business_address: formData.business_address,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        latitude: formData.latitude,
        longitude: formData.longitude,
        full_address: formData.full_address
      });

      toast({
        title: 'Profile Updated',
        description: 'Your business profile has been successfully updated.'
      });

    } catch (error) {
      console.error('Profile update error:', error);
      toast({
        title: 'Update Failed',
        description: 'Unable to update profile. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/business-dashboard')}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                Business Profile
              </h1>
              <p className="text-[#64748B] text-sm hidden sm:block">
                Manage your business information
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Basic Information */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-[#4B2AAD]" />
                      Business Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="business_name">Business Name *</Label>
                        <Input
                          id="business_name"
                          value={formData.business_name}
                          onChange={(e) => setFormData({...formData, business_name: e.target.value})}
                          placeholder="Enter business name"
                          required
                          className="h-12"
                        />
                      </div>

                      <div>
                        <Label htmlFor="business_category">Category *</Label>
                        <Select 
                          value={formData.business_category} 
                          onValueChange={(value) => setFormData({...formData, business_category: value})}
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="business_description">Description</Label>
                      <Textarea
                        id="business_description"
                        value={formData.business_description}
                        onChange={(e) => setFormData({...formData, business_description: e.target.value})}
                        placeholder="Describe your business and services"
                        rows={3}
                        className="resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Location */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#4B2AAD]" />
                      Location & Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="business_address">Business Address</Label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Input
                          id="business_address"
                          value={formData.business_address}
                          onChange={(e) => setFormData({...formData, business_address: e.target.value})}
                          placeholder="Enter complete business address"
                          className="flex-1 h-12"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleAddressGeocode}
                          disabled={!formData.business_address || geoLoading}
                          className="h-12 px-4"
                        >
                          {geoLoading ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <MapPin className="w-4 h-4 mr-2" />
                          )}
                          <span className="hidden sm:inline">Find GPS</span>
                          <span className="sm:hidden">GPS</span>
                        </Button>
                      </div>
                    </div>

                    <LocationSelector
                      value={{
                        country: formData.country,
                        state: formData.state,
                        city: formData.city,
                        latitude: formData.latitude,
                        longitude: formData.longitude,
                        full_address: formData.full_address
                      }}
                      onChange={handleLocationChange}
                      required={true}
                      showGPS={true}
                    />
                  </CardContent>
                </Card>

                {/* Contact */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-[#4B2AAD]" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          className="bg-gray-50 cursor-not-allowed h-12"
                          disabled
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="+1 (555) 123-4567"
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="name">Owner/Manager Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your full name"
                        className="h-12"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/business-dashboard')}
                    className="h-12"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-12 bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </div>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Preview */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-[#4B2AAD]" />
                    Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={formData.avatar_url} alt={formData.business_name} />
                      <AvatarFallback className="text-xl font-bold bg-[#4B2AAD]/10 text-[#4B2AAD]">
                        {formData.business_name?.charAt(0)?.toUpperCase() || 'B'}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold text-[#1A1A1A]">
                      {formData.business_name || 'Business Name'}
                    </h3>
                    <p className="text-sm text-[#64748B]">
                      {formData.business_category || 'Category'}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-[#64748B]" />
                      <span className="text-[#374151]">
                        {formData.city && formData.state ? 
                          `${formData.city}, ${formData.state}` : 
                          'Location not set'
                        }
                      </span>
                    </div>
                    {formData.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-[#64748B]" />
                        <span className="text-[#374151]">{formData.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-[#64748B]" />
                      <span className="text-[#374151] break-all">{formData.email}</span>
                    </div>
                  </div>

                  {formData.business_description && (
                    <div className="pt-3 border-t border-[#E5E7EB]">
                      <p className="text-sm text-[#374151] italic">
                        "{formData.business_description}"
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
