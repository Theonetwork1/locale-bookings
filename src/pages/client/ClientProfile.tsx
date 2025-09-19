import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Save, Upload, MapPin, Navigation, Camera, ArrowLeft, User, Phone, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { updateUserProfile } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { LocationSelector } from '@/components/location/LocationSelector';

const ClientProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar_url: user?.avatar_url || '',
    // GÉOLOCALISATION
    country: user?.country || '',
    state: user?.state || '',
    city: user?.city || '',
    latitude: user?.latitude,
    longitude: user?.longitude,
    full_address: user?.full_address || '',
    bio: user?.bio || ''
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Mise à jour du profil utilisateur
      await updateUserProfile(user.id, {
        name: formData.name,
        phone: formData.phone,
        avatar_url: formData.avatar_url,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        latitude: formData.latitude,
        longitude: formData.longitude,
        full_address: formData.full_address,
        bio: formData.bio
      });

      // Mise à jour localStorage
      const updatedUser = {
        ...user,
        name: formData.name,
        phone: formData.phone,
        avatar_url: formData.avatar_url,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        latitude: formData.latitude,
        longitude: formData.longitude,
        full_address: formData.full_address,
        bio: formData.bio
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.'
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
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate('/client-dashboard')}
              className="mb-4 p-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Client Profile</h1>
            <p className="text-[#64748B] mt-2 text-sm sm:text-base">
              Manage your personal information and preferences
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Formulaire principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations personnelles */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-[#4B2AAD]" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your full name"
                        required
                        className="h-12"
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
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      className="bg-gray-50 cursor-not-allowed h-12"
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>

                  <div>
                    <Label htmlFor="bio">About Me</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      placeholder="Tell us about yourself, your preferences, or anything you'd like businesses to know"
                      rows={3}
                      className="resize-none"
                    />
                  </div>

                  <Separator />

                  {/* Géolocalisation */}
                  <div>
                    <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#4B2AAD]" />
                      Location Information
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      This helps us show you businesses in your area and provide better recommendations.
                    </p>
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
                      required={false}
                      showGPS={true}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/client-dashboard')}
                      className="h-12"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white transition-all duration-200 h-12"
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

          {/* Sidebar - Aperçu profil */}
          <div className="space-y-6">
            {/* Aperçu profil client */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-[#4B2AAD]" />
                  Profile Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={formData.avatar_url} alt={formData.name} />
                    <AvatarFallback className="text-xl font-bold bg-[#4B2AAD]/10 text-[#4B2AAD]">
                      {formData.name?.charAt(0)?.toUpperCase() || 'C'}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold text-[#1A1A1A]">{formData.name || 'Your Name'}</h3>
                  <p className="text-sm text-[#64748B]">Client Member</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-3 text-[#64748B]" />
                    <span className="text-[#374151]">{formData.email}</span>
                  </div>
                  {formData.phone && (
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-3 text-[#64748B]" />
                      <span className="text-[#374151]">{formData.phone}</span>
                    </div>
                  )}
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 mr-3 text-[#64748B] mt-0.5" />
                    <span className="text-[#374151]">
                      {formData.city && formData.state && formData.country 
                        ? `${formData.city}, ${formData.state}, ${formData.country}` 
                        : 'Location not set'
                      }
                    </span>
                  </div>
                </div>

                {formData.bio && (
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-[#374151] italic">"{formData.bio}"</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Statistiques client */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Account Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-[#EEF1FF] rounded-lg">
                    <div className="text-xl font-bold text-[#4B2AAD]">24</div>
                    <div className="text-xs text-[#64748B]">Appointments</div>
                  </div>
                  <div className="p-3 bg-[#F0F9FF] rounded-lg">
                    <div className="text-xl font-bold text-[#0EA5E9]">8</div>
                    <div className="text-xs text-[#64748B]">Businesses</div>
                  </div>
                  <div className="p-3 bg-[#F0FDF4] rounded-lg">
                    <div className="text-xl font-bold text-[#22C55E]">12</div>
                    <div className="text-xs text-[#64748B]">Reviews</div>
                  </div>
                  <div className="p-3 bg-[#FEF3C7] rounded-lg">
                    <div className="text-xl font-bold text-[#F59E0B]">4.8</div>
                    <div className="text-xs text-[#64748B]">Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;