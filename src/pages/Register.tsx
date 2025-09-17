import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, User, Building2, Mail, Lock, Phone, MapPin, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslations } from '@/hooks/useTranslations';
import { useToast } from '@/hooks/use-toast';
import { LocationSelector } from '@/components/location/LocationSelector';
import { HierarchicalLocationSelector } from '@/components/location/HierarchicalLocationSelector';


const Register = () => {
  const [step, setStep] = useState<'account-type' | 'details' | 'location' | 'verification'>('account-type');
  const [accountType, setAccountType] = useState<'client' | 'business' | ''>('');
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    // Business specific fields
    businessName: '',
    businessAddress: '',
    businessCategory: '',
    businessDescription: '',
    // GÉOLOCALISATION AJOUTÉE
    country: '',
    state: '',
    city: '',
    latitude: undefined as number | undefined,
    longitude: undefined as number | undefined,
    full_address: ''
  });
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAccountTypeSelect = (type: 'client' | 'business') => {
    setAccountType(type);
    setStep('details');
  };

  const handleNext = () => {
    if (step === 'details') {
      // Validation des champs obligatoires
      if (!formData.name || !formData.email || !formData.password) {
        toast({
          title: 'Missing Information',
          description: 'Please fill in all required fields.',
          variant: 'destructive'
        });
        return;
      }
      setStep('location');
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation géolocalisation obligatoire
    if (!formData.country || !formData.state || !formData.city) {
      toast({
        title: 'Location Required',
        description: 'Please provide your location information.',
        variant: 'destructive'
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'Passwords do not match. Please try again.',
        variant: 'destructive'
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        title: 'Terms Required',
        description: 'Please accept the terms and conditions to continue.',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    
    try {
      // Géocodage si pas de coordonnées GPS
      if (!formData.latitude || !formData.longitude) {
        const address = `${formData.city}, ${formData.state}, ${formData.country}`;
        const coords = await geocodeAddress(address);
        if (coords) {
          formData.latitude = coords.lat;
          formData.longitude = coords.lng;
        }
      }

      // Créer le profil avec géolocalisation
      const { error } = await signUp(formData.email, formData.password, {
        full_name: formData.name,
        role: accountType as 'client' | 'business',
        country: formData.country,
        state: formData.state,
        city: formData.city,
        latitude: formData.latitude,
        longitude: formData.longitude,
        phone: formData.phone,
        business_name: formData.businessName,
        business_address: formData.businessAddress,
        business_category: formData.businessCategory,
        business_description: formData.businessDescription
      });

      if (error) {
        toast({
          title: 'Registration Failed',
          description: error.message || 'Unable to create account. Please try again.',
          variant: 'destructive'
        });
        return;
      }

      toast({
        title: 'Account Created!',
        description: `Welcome to Bizli Solution! Your ${accountType} account is ready.`
      });

      // Redirect based on account type
      if (accountType === 'client') {
        navigate('/client-dashboard');
      } else {
        // Business users go to onboarding
        navigate('/business-onboarding');
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration Failed',
        description: error instanceof Error ? error.message : 'Unable to create account. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

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
    'Other'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4B2AAD] via-[#A68BFA] to-[#8B5CF6] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => {
              if (step === 'details') {
                setStep('account-type');
              } else {
                navigate('/');
              }
            }}
            className="text-white hover:bg-white/20 mb-6 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-[#1A1A1A] rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">BS</span>
          </div>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-3">{t.joinBizli || 'Join Bizli Solution'}</h1>
          <p className="text-white/90 text-lg font-medium">
            {step === 'account-type' 
              ? (t.chooseAccountType || 'Choose your account type to get started')
              : step === 'details'
              ? (t.createAccountType || `Create your ${accountType} account`)
              : (t.verifyAccount || 'Verify your account')
            }
          </p>
        </div>

        {/* Step 1: Account Type Selection */}
        {step === 'account-type' && (
          <div className="space-y-4">
            <Card 
              className="cursor-pointer border-2 border-white/20 bg-white/95 hover:border-[#4B2AAD] hover:bg-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              onClick={() => handleAccountTypeSelect('client')}
            >
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <User className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{t.imAClient || 'I\'m a Client'}</h3>
                    <p className="text-gray-600 font-medium">
                      {t.findAndBookServices || 'Find and book services from businesses'}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#4B2AAD] rounded-full mr-3"></div>
                    Browse and book services
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#4B2AAD] rounded-full mr-3"></div>
                    Manage appointments
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#4B2AAD] rounded-full mr-3"></div>
                    Payment history
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer border-2 border-white/20 bg-white/95 hover:border-[#4B2AAD] hover:bg-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              onClick={() => handleAccountTypeSelect('business')}
            >
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Building2 className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{t.imABusiness || 'I\'m a Business'}</h3>
                    <p className="text-gray-600 font-medium">
                      {t.offerServicesAndManage || 'Offer services and manage my business'}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#4B2AAD] rounded-full mr-3"></div>
                    Manage services & clients
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#4B2AAD] rounded-full mr-3"></div>
                    Accept online bookings
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#4B2AAD] rounded-full mr-3"></div>
                    Revenue tracking
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Details Form */}
        {step === 'details' && (
          <Card className="border-0 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center">
                {accountType === 'client' ? (
                  <User className="w-6 h-6 mr-2 text-[#4B2AAD]" />
                ) : (
                  <Building2 className="w-6 h-6 mr-2 text-primary" />
                )}
                {accountType === 'client' ? 'Client Account' : 'Business Account'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Personal Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">
                      {accountType === 'client' ? 'Full Name' : 'Contact Name'}
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Business-specific fields */}
                {accountType === 'business' && (
                  <div className="space-y-4 pt-4 border-t border-border">
                    <h4 className="font-semibold text-foreground">Business Information</h4>
                    
                    <div>
                      <Label htmlFor="businessName">Business Name</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="businessName"
                          type="text"
                          placeholder="Enter your business name"
                          value={formData.businessName}
                          onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="businessAddress">Business Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="businessAddress"
                          type="text"
                          placeholder="Enter your business address"
                          value={formData.businessAddress}
                          onChange={(e) => setFormData({...formData, businessAddress: e.target.value})}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="businessCategory">Business Category</Label>
                      <Select value={formData.businessCategory} onValueChange={(value) => setFormData({...formData, businessCategory: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your business category" />
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

                    <div>
                      <Label htmlFor="businessDescription">Business Description</Label>
                      <Input
                        id="businessDescription"
                        type="text"
                        placeholder="Brief description of your business"
                        value={formData.businessDescription}
                        onChange={(e) => setFormData({...formData, businessDescription: e.target.value})}
                      />
                    </div>
                  </div>
                )}

                {/* Terms and Conditions */}
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('account-type')}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#4B2AAD] hover:bg-[#A68BFA] text-white"
                  >
                    Next: Location
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Location Information */}
        {step === 'location' && (
          <Card className="border-0 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center">
                <MapPin className="w-6 h-6 mr-2 text-[#4B2AAD]" />
                Location Information
              </CardTitle>
              <p className="text-muted-foreground">
                Help us connect you with nearby {accountType === 'client' ? 'businesses' : 'clients'}
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <HierarchicalLocationSelector
                  onLocationChange={(location) => {
                    setFormData(prev => ({
                      ...prev,
                      country: location.country_id || '',
                      state: location.state_id || '',
                      city: location.city_id || '',
                      latitude: location.latitude,
                      longitude: location.longitude,
                      full_address: location.full_address
                    }));
                  }}
                  initialLocation={{
                    country_id: formData.country,
                    state_id: formData.state,
                    city_id: formData.city,
                    latitude: formData.latitude,
                    longitude: formData.longitude,
                    full_address: formData.full_address
                  }}
                  language="en"
                  showNeighborhoods={false}
                />

                {/* Terms and Conditions */}
                <div className="flex items-center space-x-2 pt-4">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground">
                    I agree to the{' '}
                    <a href="#" className="text-[#4B2AAD] hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-[#4B2AAD] hover:underline">Privacy Policy</a>
                  </Label>
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('details')}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#4B2AAD] hover:bg-[#A68BFA] text-white font-semibold transition-all duration-200 hover:scale-105"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Account...
                      </div>
                    ) : (
                      `Create ${accountType === 'client' ? 'Client' : 'Business'} Account`
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Login Link */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="h-px bg-white/30 flex-1"></div>
            <span className="text-white/80 text-sm font-medium">Already have an account?</span>
            <div className="h-px bg-white/30 flex-1"></div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/login')}
            className="w-full h-12 bg-white/10 border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 font-semibold text-base transition-all duration-200 backdrop-blur-sm"
          >
            Sign In to Your Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
