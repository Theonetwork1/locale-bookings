import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Building2, Save, Upload, MapPin, Navigation, Camera, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { updateUserProfile, updateBusinessClientPaymentUrl, geocodeAddress } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { LocationSelector } from '@/components/location/LocationSelector';
import { BusinessMap } from '@/components/location/BusinessMap';

const BusinessProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar_url: user?.avatar_url || '',
    business_name: user?.business_name || '',
    business_description: user?.business_description || '',
    business_category: user?.business_category || '',
    // GÉOLOCALISATION
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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

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
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate('/business-dashboard')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Business Profile</h1>
            <p className="text-muted-foreground mt-2">
              Manage your business information and location settings
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations de base */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="business_name">Business Name *</Label>
                      <Input
                        id="business_name"
                        value={formData.business_name}
                        onChange={(e) => setFormData({...formData, business_name: e.target.value})}
                        placeholder="Enter business name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="business_category">Category *</Label>
                      <Select value={formData.business_category} onValueChange={(value) => setFormData({...formData, business_category: value})}>
                        <SelectTrigger>
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
                    />
                  </div>

                  <div>
                    <Label htmlFor="business_address">Business Address</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="business_address"
                        value={formData.business_address}
                        onChange={(e) => setFormData({...formData, business_address: e.target.value})}
                        placeholder="Enter complete business address"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleAddressGeocode}
                        disabled={!formData.business_address}
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        Find GPS
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Géolocalisation */}
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

                  <Separator />

                  {/* Contact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        className="bg-muted cursor-not-allowed"
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
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/business-dashboard')}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-[#F97316] hover:bg-[#EA580C] text-white transition-all duration-200 hover:scale-105"
                    >
                      {loading ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
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
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Aperçu et carte */}
          <div className="space-y-6">
            {/* Aperçu business */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Business Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={formData.avatar_url} alt={formData.business_name} />
                    <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                      {formData.business_name?.charAt(0)?.toUpperCase() || 'B'}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold">{formData.business_name || 'Business Name'}</h3>
                  <p className="text-sm text-muted-foreground">{formData.business_category || 'Category'}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{formData.city && formData.state ? `${formData.city}, ${formData.state}` : 'Location not set'}</span>
                  </div>
                  {formData.phone && (
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>{formData.phone}</span>
                    </div>
                  )}
                </div>

                {formData.business_description && (
                  <p className="text-sm text-muted-foreground">{formData.business_description}</p>
                )}
              </CardContent>
            </Card>

            {/* Carte de localisation */}
            {formData.latitude && formData.longitude && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Business Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 rounded-lg overflow-hidden">
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
                  <div className="mt-3 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Navigation className="w-3 h-3 mr-1" />
                      GPS: {formData.latitude?.toFixed(6)}, {formData.longitude?.toFixed(6)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
