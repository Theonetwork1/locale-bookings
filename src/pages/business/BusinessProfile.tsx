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

  // Enhanced validation states
  const [validation, setValidation] = useState({
    business_name: { isValid: true, message: '' },
    business_category: { isValid: true, message: '' },
    phone: { isValid: true, message: '' },
    business_address: { isValid: true, message: '' },
    business_description: { isValid: true, message: '' },
    name: { isValid: true, message: '' }
  });

  // Location autofill suggestions
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  // Enhanced real-time validation
  const validateField = (field: string, value: string) => {
    let isValid = true;
    let message = '';

    switch (field) {
      case 'business_name':
        if (!value.trim()) {
          isValid = false;
          message = 'Business name is required';
        } else if (value.length < 2) {
          isValid = false;
          message = 'Business name must be at least 2 characters';
        } else if (value.length > 100) {
          isValid = false;
          message = 'Business name must be less than 100 characters';
        } else if (!/^[a-zA-Z0-9\s\-&'.]+$/.test(value)) {
          isValid = false;
          message = 'Business name contains invalid characters';
        }
        break;
      case 'name':
        if (value && value.length < 2) {
          isValid = false;
          message = 'Name must be at least 2 characters';
        } else if (value && !/^[a-zA-Z\s\-'.]+$/.test(value)) {
          isValid = false;
          message = 'Name can only contain letters, spaces, hyphens, and apostrophes';
        }
        break;
      case 'phone':
        if (value) {
          const cleanPhone = value.replace(/\D/g, '');
          if (cleanPhone.length < 10) {
            isValid = false;
            message = 'Phone number must be at least 10 digits';
          } else if (cleanPhone.length > 15) {
            isValid = false;
            message = 'Phone number must be less than 15 digits';
          }
        }
        break;
      case 'business_address':
        if (value) {
          if (value.length < 10) {
            isValid = false;
            message = 'Please enter a complete address (minimum 10 characters)';
          } else if (value.length > 200) {
            isValid = false;
            message = 'Address must be less than 200 characters';
          }
        }
        break;
      case 'business_description':
        if (value && value.length > 500) {
          isValid = false;
          message = 'Description must be less than 500 characters';
        }
        break;
    }

    setValidation(prev => ({
      ...prev,
      [field]: { isValid, message }
    }));

    return isValid;
  };

  // Location autofill functionality
  const handleAddressAutofill = async (partialAddress: string) => {
    if (partialAddress.length < 3) {
      setLocationSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      // Mock suggestions - in real app, use Google Places API
      const mockSuggestions = [
        `${partialAddress} Street, New York, NY`,
        `${partialAddress} Avenue, Los Angeles, CA`,
        `${partialAddress} Road, Chicago, IL`,
        `${partialAddress} Boulevard, Miami, FL`
      ];
      setLocationSuggestions(mockSuggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
    }
  };

  const selectAddressSuggestion = (suggestion: string) => {
    setFormData(prev => ({ ...prev, business_address: suggestion }));
    setShowSuggestions(false);
    validateField('business_address', suggestion);
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
                                 <CheckCircle className="w-4 h-4 text-green-500" aria-label="Valid business name" /> : 
                                 <AlertCircle className="w-4 h-4 text-red-500" aria-label="Invalid business name" />
                               }
                             </Label>
                             <Input
                               id="business_name"
                               value={formData.business_name}
                               onChange={(e) => handleInputChange('business_name', e.target.value)}
                               placeholder="Enter business name"
                               required
                               className={`h-12 ${!validation.business_name.isValid ? 'border-red-500 focus:border-red-500' : 'border-[#E5E7EB] focus:border-[#4B2AAD]'}`}
                               aria-describedby="business-name-error business-name-help"
                               autoComplete="organization"
                               maxLength={100}
                             />
                             {!validation.business_name.isValid && (
                               <p id="business-name-error" className="text-red-500 text-xs mt-1" role="alert">
                                 {validation.business_name.message}
                               </p>
                             )}
                             <p id="business-name-help" className="text-xs text-[#64748B] mt-1">
                               {formData.business_name.length}/100 characters
                             </p>
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
                           <Label htmlFor="business_description" className="flex items-center gap-2">
                             Description
                             {validation.business_description.isValid ? 
                               <CheckCircle className="w-4 h-4 text-green-500" aria-label="Valid description" /> : 
                               <AlertCircle className="w-4 h-4 text-red-500" aria-label="Invalid description" />
                             }
                           </Label>
                           <Textarea
                             id="business_description"
                             value={formData.business_description}
                             onChange={(e) => handleInputChange('business_description', e.target.value)}
                             placeholder="Describe your business and services"
                             rows={3}
                             className={`resize-none ${!validation.business_description.isValid ? 'border-red-500' : 'border-[#E5E7EB] focus:border-[#4B2AAD]'}`}
                             aria-describedby="description-help description-error"
                             maxLength={500}
                           />
                           {!validation.business_description.isValid && (
                             <p id="description-error" className="text-red-500 text-xs mt-1" role="alert">
                               {validation.business_description.message}
                             </p>
                           )}
                           <p id="description-help" className={`text-xs mt-1 ${formData.business_description.length > 450 ? 'text-orange-500' : 'text-[#64748B]'}`}>
                             {formData.business_description.length}/500 characters
                             {formData.business_description.length > 450 && ' (approaching limit)'}
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
                         <div className="relative">
                           <Label htmlFor="business_address" className="flex items-center gap-2">
                             Business Address
                             {validation.business_address.isValid ? 
                               <CheckCircle className="w-4 h-4 text-green-500" aria-label="Valid address" /> : 
                               <AlertCircle className="w-4 h-4 text-red-500" aria-label="Invalid address" />
                             }
                           </Label>
                           <div className="flex flex-col sm:flex-row gap-2">
                             <div className="flex-1 relative">
                               <Input
                                 id="business_address"
                                 value={formData.business_address}
                                 onChange={(e) => {
                                   handleInputChange('business_address', e.target.value);
                                   handleAddressAutofill(e.target.value);
                                 }}
                                 onFocus={() => setShowSuggestions(locationSuggestions.length > 0)}
                                 onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                 placeholder="Enter complete business address"
                                 className={`h-12 ${!validation.business_address.isValid ? 'border-red-500' : 'border-[#E5E7EB] focus:border-[#4B2AAD]'}`}
                                 aria-describedby="address-help address-error"
                                 autoComplete="street-address"
                               />
                               
                               {/* Address Suggestions Dropdown */}
                               {showSuggestions && locationSuggestions.length > 0 && (
                                 <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E5E7EB] rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
                                   {locationSuggestions.map((suggestion, index) => (
                                     <button
                                       key={index}
                                       type="button"
                                       onClick={() => selectAddressSuggestion(suggestion)}
                                       className="w-full text-left px-3 py-2 text-sm hover:bg-[#F8FAFC] hover:text-[#4B2AAD] transition-colors"
                                     >
                                       <MapPin className="w-3 h-3 inline mr-2" />
                                       {suggestion}
                                     </button>
                                   ))}
                                 </div>
                               )}
                             </div>
                             <Button
                               type="button"
                               variant="outline"
                               onClick={handleAddressGeocode}
                               disabled={!formData.business_address || geoLoading}
                               className="h-12 px-4"
                               aria-label={geoLoading ? 'Finding GPS coordinates...' : 'Find GPS coordinates'}
                             >
                               {geoLoading ? (
                                 <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                               ) : (
                                 <MapPin className="w-4 h-4 mr-2" aria-hidden="true" />
                               )}
                               <span className="hidden sm:inline">
                                 {geoLoading ? 'Finding...' : 'Find GPS'}
                               </span>
                               <span className="sm:hidden">
                                 {geoLoading ? '...' : 'GPS'}
                               </span>
                             </Button>
                           </div>
                           {!validation.business_address.isValid && (
                             <p id="address-error" className="text-red-500 text-xs mt-1" role="alert">
                               {validation.business_address.message}
                             </p>
                           )}
                           <p id="address-help" className="text-xs text-[#64748B] mt-1">
                             {geoLoading ? 
                               'Searching for GPS coordinates...' : 
                               'Enter your complete business address for accurate location mapping'
                             }
                           </p>
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
                               aria-describedby="email-help"
                             />
                             <p id="email-help" className="text-xs text-[#64748B] mt-1">
                               Email cannot be changed. Contact support if you need to update your email.
                             </p>
                           </div>

                           <div>
                             <Label htmlFor="phone" className="flex items-center gap-2">
                               Phone Number
                               {formData.phone && validation.phone.isValid && (
                                 <CheckCircle className="w-4 h-4 text-green-500" aria-label="Valid phone number" />
                               )}
                               {formData.phone && !validation.phone.isValid && (
                                 <AlertCircle className="w-4 h-4 text-red-500" aria-label="Invalid phone number" />
                               )}
                             </Label>
                             <Input
                               id="phone"
                               type="tel"
                               value={formData.phone}
                               onChange={(e) => handleInputChange('phone', e.target.value)}
                               placeholder="+1 (555) 123-4567"
                               className={`h-12 ${!validation.phone.isValid ? 'border-red-500' : 'border-[#E5E7EB] focus:border-[#4B2AAD]'}`}
                               aria-describedby="phone-help phone-error"
                               autoComplete="tel"
                             />
                             {!validation.phone.isValid && (
                               <p id="phone-error" className="text-red-500 text-xs mt-1" role="alert">
                                 {validation.phone.message}
                               </p>
                             )}
                             <p id="phone-help" className="text-xs text-[#64748B] mt-1">
                               Include country code for international numbers
                             </p>
                           </div>
                        </div>

                         <div>
                           <Label htmlFor="name" className="flex items-center gap-2">
                             Owner/Manager Name
                             {formData.name && validation.name.isValid && (
                               <CheckCircle className="w-4 h-4 text-green-500" aria-label="Valid name" />
                             )}
                             {formData.name && !validation.name.isValid && (
                               <AlertCircle className="w-4 h-4 text-red-500" aria-label="Invalid name" />
                             )}
                           </Label>
                           <Input
                             id="name"
                             value={formData.name}
                             onChange={(e) => handleInputChange('name', e.target.value)}
                             placeholder="Enter your full name"
                             className={`h-12 ${!validation.name.isValid ? 'border-red-500' : 'border-[#E5E7EB] focus:border-[#4B2AAD]'}`}
                             aria-describedby="name-help name-error"
                             autoComplete="name"
                           />
                           {!validation.name.isValid && (
                             <p id="name-error" className="text-red-500 text-xs mt-1" role="alert">
                               {validation.name.message}
                             </p>
                           )}
                           <p id="name-help" className="text-xs text-[#64748B] mt-1">
                             This will be displayed as the business contact person
                           </p>
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
               {/* Enhanced Live Business Preview */}
               <Card className="border-0 shadow-lg sticky top-24 transition-all duration-300">
                 <CardHeader className="pb-3">
                   <CardTitle className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                       <Eye className="w-5 h-5 text-[#4B2AAD]" />
                       Live Preview
                     </div>
                     <div className="flex items-center gap-1">
                       <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                       <span className="text-xs text-[#64748B]">Live</span>
                     </div>
                   </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                   <div className="text-center p-4 bg-gradient-to-br from-[#EEF1FF] to-[#F8FAFC] rounded-lg">
                     <Avatar className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 ring-2 ring-[#4B2AAD]/20 transition-all duration-300 hover:ring-[#4B2AAD]/40">
                       <AvatarImage src={formData.avatar_url} alt={formData.business_name || 'Business'} />
                       <AvatarFallback className="text-xl sm:text-2xl font-bold bg-[#4B2AAD]/10 text-[#4B2AAD] transition-all duration-300">
                         {formData.business_name?.charAt(0)?.toUpperCase() || 'B'}
                       </AvatarFallback>
                     </Avatar>
                     <h3 className="text-lg font-semibold text-[#1A1A1A] transition-all duration-300">
                       {formData.business_name || (
                         <span className="text-[#94A3B8] italic">Business Name</span>
                       )}
                     </h3>
                     <p className="text-sm text-[#64748B] transition-all duration-300">
                       {formData.business_category || (
                         <span className="text-[#94A3B8] italic">Select Category</span>
                       )}
                     </p>
                     {formData.business_name && formData.business_category && (
                       <div className="mt-2 px-3 py-1 bg-[#4B2AAD]/10 text-[#4B2AAD] text-xs rounded-full inline-block">
                         ✓ Ready to publish
                       </div>
                     )}
                   </div>

                   {/* Interactive Contact Information */}
                   <div className="space-y-3 text-sm">
                     <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors">
                       <MapPin className="w-4 h-4 text-[#64748B] flex-shrink-0" />
                       <span className="text-[#374151] flex-1">
                         {formData.city && formData.state ? 
                           `${formData.city}, ${formData.state}` : 
                           <span className="text-[#94A3B8] italic">Location not set</span>
                         }
                       </span>
                       {formData.latitude && formData.longitude && (
                         <CheckCircle className="w-4 h-4 text-green-500" aria-label="GPS coordinates available" />
                       )}
                     </div>
                     
                     {formData.phone && (
                       <a 
                         href={`tel:${formData.phone}`}
                         className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors group"
                       >
                         <Phone className="w-4 h-4 text-[#64748B] group-hover:text-[#4B2AAD] flex-shrink-0 transition-colors" />
                         <span className="text-[#374151] group-hover:text-[#4B2AAD] transition-colors">{formData.phone}</span>
                       </a>
                     )}
                     
                     <a 
                       href={`mailto:${formData.email}`}
                       className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors group"
                     >
                       <Mail className="w-4 h-4 text-[#64748B] group-hover:text-[#4B2AAD] flex-shrink-0 transition-colors" />
                       <span className="text-[#374151] group-hover:text-[#4B2AAD] break-all transition-colors">{formData.email}</span>
                     </a>
                   </div>

                   {formData.business_description && (
                     <div className="pt-3 border-t border-[#E5E7EB]">
                       <p className="text-sm text-[#374151] italic leading-relaxed">
                         "{formData.business_description}"
                       </p>
                     </div>
                   )}

                   {/* Completion Progress */}
                   <div className="pt-3 border-t border-[#E5E7EB]">
                     <div className="flex items-center justify-between mb-2">
                       <span className="text-xs font-medium text-[#374151]">Profile Completion</span>
                       <span className="text-xs text-[#64748B]">
                         {Math.round(
                           ((formData.business_name ? 1 : 0) +
                            (formData.business_category ? 1 : 0) +
                            (formData.business_description ? 1 : 0) +
                            (formData.business_address ? 1 : 0) +
                            (formData.phone ? 1 : 0) +
                            (formData.latitude && formData.longitude ? 1 : 0)) / 6 * 100
                         )}%
                       </span>
                     </div>
                     <div className="w-full bg-[#E5E7EB] rounded-full h-2">
                       <div 
                         className="bg-[#4B2AAD] h-2 rounded-full transition-all duration-500"
                         style={{
                           width: `${Math.round(
                             ((formData.business_name ? 1 : 0) +
                              (formData.business_category ? 1 : 0) +
                              (formData.business_description ? 1 : 0) +
                              (formData.business_address ? 1 : 0) +
                              (formData.phone ? 1 : 0) +
                              (formData.latitude && formData.longitude ? 1 : 0)) / 6 * 100
                           )}%`
                         }}
                       />
                     </div>
                   </div>
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
