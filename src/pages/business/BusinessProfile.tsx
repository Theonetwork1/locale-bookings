import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Building2, Save, Upload, MapPin, Navigation, Camera, ArrowLeft, Phone, ChevronDown, ChevronUp, User, Mail, Globe, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from '@/hooks/useTranslations';
import { updateUserProfile, updateBusinessClientPaymentUrl, geocodeAddress } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { LocationSelector } from '@/components/location/LocationSelector';
import { BusinessMap } from '@/components/location/BusinessMap';
import { Business } from '@/types/business';

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

  // Section states for collapsible mobile layout
  const [openSections, setOpenSections] = useState({
    basicInfo: true,
    location: false,
    contact: false
  });

  // Validation states
  const [validation, setValidation] = useState({
    business_name: { isValid: true, message: '' },
    business_category: { isValid: true, message: '' },
    phone: { isValid: true, message: '' },
    business_address: { isValid: true, message: '' }
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

  // Real-time validation
  const validateField = (field: string, value: string) => {
    let isValid = true;
    let message = '';

    switch (field) {
      case 'business_name':
        isValid = value.length >= 2;
        message = isValid ? '' : 'Business name must be at least 2 characters';
        break;
      case 'phone':
        if (value) {
          const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
          isValid = phoneRegex.test(value.replace(/\D/g, ''));
          message = isValid ? '' : 'Please enter a valid phone number';
        }
        break;
      case 'business_address':
        if (value) {
          isValid = value.length >= 10;
          message = isValid ? '' : 'Please enter a complete address';
        }
        break;
    }

    setValidation(prev => ({
      ...prev,
      [field]: { isValid, message }
    }));

    return isValid;
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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

  // Handle input changes with validation
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Validate all fields
    const isNameValid = validateField('business_name', formData.business_name);
    const isPhoneValid = validateField('phone', formData.phone);
    const isAddressValid = validateField('business_address', formData.business_address);

    if (!isNameValid || !isPhoneValid || !isAddressValid) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors before saving.',
        variant: 'destructive'
      });
      return;
    }

    // Validation géolocalisation obligatoire
    if (!formData.country || !formData.state || !formData.city) {
      toast({
        title: 'Location Required',
        description: 'Please provide complete location information.',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      // Géocodage automatique si pas de coordonnées
      if (!formData.latitude || !formData.longitude) {
        const address = formData.business_address || `${formData.city}, ${formData.state}, ${formData.country}`;
        const coords = await geocodeAddress(address);
        if (coords) {
          formData.latitude = coords.lat;
          formData.longitude = coords.lng;
        }
      }

      // Mise à jour du profil utilisateur
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

      // Mise à jour localStorage
      const updatedUser = {
        ...user,
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
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      toast({
        title: 'Profile Updated',
        description: 'Your business profile and location have been successfully updated.'
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
      {/* Mobile-Optimized Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
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
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1A1A1A] truncate">
                {t.businessProfile || 'Business Profile'}
              </h1>
              <p className="text-[#64748B] text-sm hidden sm:block">
                {t.manageBusinessInfo || 'Manage your business information and location settings'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Enhanced Form with Collapsible Sections */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                
                {/* Basic Information Section */}
                <Card className="border-0 shadow-lg">
                  <Collapsible open={openSections.basicInfo} onOpenChange={() => toggleSection('basicInfo')}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-[#F8FAFC] transition-colors">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-[#4B2AAD]" />
                            Business Information
                          </CardTitle>
                          {openSections.basicInfo ? 
                            <ChevronUp className="w-5 h-5 text-[#64748B]" /> : 
                            <ChevronDown className="w-5 h-5 text-[#64748B]" />
                          }
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="space-y-4 sm:space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                          <div>
                            <Label htmlFor="business_name" className="flex items-center gap-2">
                              Business Name *
                              {validation.business_name.isValid ? 
                                <CheckCircle className="w-4 h-4 text-green-500" /> : 
                                <AlertCircle className="w-4 h-4 text-red-500" />
                              }
                            </Label>
                            <Input
                              id="business_name"
                              value={formData.business_name}
                              onChange={(e) => handleInputChange('business_name', e.target.value)}
                              placeholder="Enter business name"
                              required
                              className={`h-12 ${!validation.business_name.isValid ? 'border-red-500 focus:border-red-500' : 'border-[#E5E7EB] focus:border-[#4B2AAD]'}`}
                            />
                            {!validation.business_name.isValid && (
                              <p className="text-red-500 text-xs mt-1">{validation.business_name.message}</p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="business_category">Category *</Label>
                            <Select 
                              value={formData.business_category} 
                              onValueChange={(value) => handleInputChange('business_category', value)}
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
                            onChange={(e) => handleInputChange('business_description', e.target.value)}
                            placeholder="Describe your business and services"
                            rows={3}
                            className="resize-none"
                          />
                          <p className="text-xs text-[#64748B] mt-1">
                            {formData.business_description.length}/500 characters
                          </p>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>

                {/* Location Section */}
                <Card className="border-0 shadow-lg">
                  <Collapsible open={openSections.location} onOpenChange={() => toggleSection('location')}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-[#F8FAFC] transition-colors">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-[#4B2AAD]" />
                            Location & Address
                            {formData.latitude && formData.longitude && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                          </CardTitle>
                          {openSections.location ? 
                            <ChevronUp className="w-5 h-5 text-[#64748B]" /> : 
                            <ChevronDown className="w-5 h-5 text-[#64748B]" />
                          }
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="space-y-4 sm:space-y-6">
                        <div>
                          <Label htmlFor="business_address" className="flex items-center gap-2">
                            Business Address
                            {validation.business_address.isValid ? 
                              <CheckCircle className="w-4 h-4 text-green-500" /> : 
                              <AlertCircle className="w-4 h-4 text-red-500" />
                            }
                          </Label>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Input
                              id="business_address"
                              value={formData.business_address}
                              onChange={(e) => handleInputChange('business_address', e.target.value)}
                              placeholder="Enter complete business address"
                              className={`flex-1 h-12 ${!validation.business_address.isValid ? 'border-red-500' : 'border-[#E5E7EB] focus:border-[#4B2AAD]'}`}
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
                          {!validation.business_address.isValid && (
                            <p className="text-red-500 text-xs mt-1">{validation.business_address.message}</p>
                          )}
                        </div>

                        <div>
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
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>

                {/* Contact Information Section */}
                <Card className="border-0 shadow-lg">
                  <Collapsible open={openSections.contact} onOpenChange={() => toggleSection('contact')}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-[#F8FAFC] transition-colors">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5 text-[#4B2AAD]" />
                            Contact Information
                          </CardTitle>
                          {openSections.contact ? 
                            <ChevronUp className="w-5 h-5 text-[#64748B]" /> : 
                            <ChevronDown className="w-5 h-5 text-[#64748B]" />
                          }
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="space-y-4 sm:space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                          <div>
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              className="bg-gray-50 cursor-not-allowed h-12"
                              disabled
                            />
                            <p className="text-xs text-[#64748B] mt-1">Email cannot be changed</p>
                          </div>

                          <div>
                            <Label htmlFor="phone" className="flex items-center gap-2">
                              Phone Number
                              {formData.phone && validation.phone.isValid && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                              {formData.phone && !validation.phone.isValid && (
                                <AlertCircle className="w-4 h-4 text-red-500" />
                              )}
                            </Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              placeholder="Enter phone number"
                              className={`h-12 ${!validation.phone.isValid ? 'border-red-500' : 'border-[#E5E7EB] focus:border-[#4B2AAD]'}`}
                            />
                            {!validation.phone.isValid && (
                              <p className="text-red-500 text-xs mt-1">{validation.phone.message}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="name">Owner/Manager Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Enter your name"
                            className="h-12 border-[#E5E7EB] focus:border-[#4B2AAD]"
                          />
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>

                {/* Mobile-Optimized Action Buttons */}
                <div className="sticky bottom-0 bg-white p-4 border-t border-[#E5E7EB] -mx-4 sm:mx-0 sm:relative sm:bg-transparent sm:border-0 sm:p-0">
                  <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/business-dashboard')}
                      className="h-12 border-[#E5E7EB] text-[#374151] hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="h-12 bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white transition-all duration-200"
                    >
                      {loading ? (
                        <div className="flex items-center">
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {t.saving || 'Saving...'}
                        </div>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          {t.saveChanges || 'Save Changes'}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>

            {/* Enhanced Live Preview Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Live Business Preview */}
              <Card className="border-0 shadow-lg sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-[#4B2AAD]" />
                    Live Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <Avatar className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 ring-2 ring-[#4B2AAD]/20">
                      <AvatarImage src={formData.avatar_url} alt={formData.business_name} />
                      <AvatarFallback className="text-xl sm:text-2xl font-bold bg-[#4B2AAD]/10 text-[#4B2AAD]">
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

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-[#64748B] flex-shrink-0" />
                      <span className="text-[#374151]">
                        {formData.city && formData.state ? 
                          `${formData.city}, ${formData.state}` : 
                          'Location not set'
                        }
                      </span>
                    </div>
                    {formData.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-[#64748B] flex-shrink-0" />
                        <span className="text-[#374151]">{formData.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-[#64748B] flex-shrink-0" />
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

              {/* Interactive Map Preview */}
              {formData.latitude && formData.longitude && (
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Navigation className="w-5 h-5 text-[#4B2AAD]" />
                      Location Map
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 sm:h-64 rounded-lg overflow-hidden">
                      <BusinessMap
                        businesses={[{
                          id: 'preview',
                          name: formData.business_name || 'Your Business',
                          category: formData.business_category || 'Business',
                          latitude: formData.latitude,
                          longitude: formData.longitude,
                          address: formData.business_address,
                          country: formData.country,
                          state: formData.state,
                          city: formData.city,
                          email: formData.email,
                          created_at: '',
                          updated_at: ''
                        } as Business]}
                        userLocation={null}
                        className="h-full w-full"
                      />
                    </div>
                    <div className="mt-3 p-3 bg-[#F8FAFC] rounded-lg">
                      <div className="flex items-center gap-2 text-xs text-[#64748B]">
                        <Navigation className="w-3 h-3" />
                        <span>GPS: {formData.latitude?.toFixed(6)}, {formData.longitude?.toFixed(6)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#64748B] mt-1">
                        <Globe className="w-3 h-3" />
                        <span>{formData.full_address || 'Address not set'}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
