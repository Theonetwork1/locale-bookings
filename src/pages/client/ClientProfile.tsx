import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Phone, Camera, Save, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { updateUserProfile, getUserProfileById } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

const ClientProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar_url: user?.avatar_url || ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        avatar_url: user.avatar_url || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Update user profile in database
      await updateUserProfile(user.id, {
        name: formData.name,
        phone: formData.phone,
        avatar_url: formData.avatar_url
      });

      // Update local user data
      const updatedUser = {
        ...user,
        name: formData.name,
        phone: formData.phone,
        avatar_url: formData.avatar_url
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      toast({
        title: 'Profile Updated',
        description: 'Your profile information has been successfully updated.'
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

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload to Supabase Storage
      // For demo, we'll just create a URL
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, avatar_url: url }));
      
      toast({
        title: 'Avatar Updated',
        description: 'Your profile picture has been updated.'
      });
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate('/client-dashboard')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
            <p className="text-muted-foreground mt-2">
              Manage your personal information and preferences
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile Picture Section */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground">Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={formData.avatar_url} alt={formData.name} />
                    <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                      {formData.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <label className="absolute bottom-0 right-0 p-2 bg-[#F97316] rounded-full cursor-pointer hover:bg-[#EA580C] transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{formData.name}</h3>
                  <p className="text-muted-foreground">{user.role} Account</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Click the camera icon to update your profile picture
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground">Personal Information</CardTitle>
              <p className="text-sm text-muted-foreground">
                Update your personal details below
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      className="pl-10 bg-muted cursor-not-allowed"
                      disabled
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Email address cannot be changed. Contact support if you need to update this.
                  </p>
                </div>

                <Separator />

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/client-dashboard')}
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

          {/* Account Information */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground">Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Account Type</p>
                  <p className="font-semibold text-foreground capitalize">{user.role}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Member Since</p>
                  <p className="font-semibold text-foreground">
                    {new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Account Status</p>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                    <p className="font-semibold text-success">Active</p>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">Email Verified</p>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                    <p className="font-semibold text-success">Verified</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
