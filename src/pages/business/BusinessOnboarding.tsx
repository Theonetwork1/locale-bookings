import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  ArrowRight, 
  Building2, 
  MapPin, 
  Phone, 
  Link as LinkIcon,
  Check,
  Loader2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslations } from '@/hooks/useTranslations';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import LocationForm from '@/components/location/LocationForm';

interface OnboardingData {
  businessName: string;
  businessType: string;
  businessDescription: string;
  country: string;
  state: string;
  city: string;
  countryCode: string;
  stateCode: string;
  address: string;
  phone: string;
  email: string;
  stripePaymentLink: string;
}

const BusinessOnboarding = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const t = useTranslations();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<OnboardingData>({
    businessName: '',
    businessType: '',
    businessDescription: '',
    country: '',
    state: '',
    city: '',
    countryCode: '',
    stateCode: '',
    address: '',
    phone: '',
    email: user?.email || '',
    stripePaymentLink: ''
  });

  const businessTypes = [
    'Restaurant', 'Beauty Salon', 'Barber Shop', 'Clinic', 'Hotel',
    'Gym', 'Spa', 'Dentist', 'Lawyer', 'Consultant',
    'Photographer', 'Event Planner', 'Cleaning Service', 'Repair Service',
    'Online Shop', 'Other'
  ];

  const steps = [
    { number: 1, title: t.businessInfo || 'Business Information', icon: Building2 },
    { number: 2, title: t.location || 'Location', icon: MapPin },
    { number: 3, title: t.contactAndMedia || 'Contact', icon: Phone },
    { number: 4, title: t.paymentSetup || 'Payment Setup', icon: LinkIcon }
  ];

  const progress = (currentStep / steps.length) * 100;

  const handleInputChange = (field: keyof OnboardingData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLocationChange = (location: {
    country: string;
    state: string;
    city: string;
    countryCode: string;
    stateCode: string;
  }) => {
    setFormData(prev => ({
      ...prev,
      country: location.country,
      state: location.state,
      city: location.city,
      countryCode: location.countryCode,
      stateCode: location.stateCode
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.businessName && formData.businessType && formData.businessDescription);
      case 2:
        return !!(formData.country && formData.state && formData.city && formData.countryCode && formData.stateCode && formData.address);
      case 3:
        return !!(formData.phone && formData.email);
      case 4:
        return true; // Payment is optional
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    } else {
      toast({
        title: t.missingInformation || 'Missing Information',
        description: t.pleaseFillAllFields || 'Please fill in all required fields.',
        variant: 'destructive'
      });
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleComplete = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Prepare business data - only include non-empty fields
      const businessData: any = {
        name: formData.businessName,
        description: formData.businessDescription,
        category: formData.businessType,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        owner_id: user.id
      };

      // Only add payment URL if it's not empty
      if (formData.stripePaymentLink && formData.stripePaymentLink.trim()) {
        businessData.client_payment_url = formData.stripePaymentLink.trim();
      }

      console.log('Creating business with data:', businessData);

      const { data: businessResult, error: businessError } = await supabase
        .from('businesses')
        .insert(businessData)
        .select()
        .single();

      if (businessError) {
        console.error('Business creation error:', businessError);
        throw new Error(`Failed to create business: ${businessError.message}`);
      }

      console.log('Business created successfully:', businessResult);

      // Update user profile with business info and mark as complete
      const profileUpdateData = {
        is_business_setup: true,
        isBusinessProfileComplete: true,
        business_name: formData.businessName,
        business_address: formData.address,
        business_category: formData.businessType,
        business_description: formData.businessDescription
      };

      console.log('Updating user profile with:', profileUpdateData);

      const { error: profileError } = await supabase
        .from('user_profiles')
        .update(profileUpdateData)
        .eq('id', user.id);

      if (profileError) {
        console.error('Profile update error:', profileError);
        throw new Error(`Failed to update profile: ${profileError.message}`);
      }

      console.log('Profile updated successfully');

      toast({
        title: t.setupComplete || 'Setup Complete!',
        description: t.businessProfileCreated || 'Your business profile has been created successfully.'
      });

      // Refresh user data to reflect the completion
      await refreshUser();

      // Navigate to dashboard after a short delay
      setTimeout(() => {
        navigate('/business-dashboard');
      }, 1000);

    } catch (error) {
      console.error('Setup error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      toast({
        title: t.setupFailed || 'Setup Failed',
        description: `${t.errorCreatingBusiness || 'Error creating business profile'}: ${errorMessage}`,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="businessName">{t.onboardingBusinessName || 'Business Name'} *</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                placeholder={t.enterBusinessName || 'Enter your business name'}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="businessType">{t.onboardingBusinessType || 'Business Type'} *</Label>
              <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder={t.selectBusinessType || 'Select your business type'} />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="businessDescription">{t.onboardingBusinessDescription || 'Business Description'} *</Label>
              <Textarea
                id="businessDescription"
                value={formData.businessDescription}
                onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                placeholder={t.describeYourBusiness || 'Describe your business, services, and what makes you unique'}
                rows={4}
                className="mt-1"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label>{t.location || 'Location'} *</Label>
              <div className="mt-1">
                <LocationForm
                  onLocationChange={handleLocationChange}
                  selectedCountry={formData.countryCode}
                  selectedState={formData.stateCode}
                  selectedCity={formData.city}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">{t.address || 'Address'} *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder={t.enterFullAddress || 'Enter your full business address'}
                className="mt-1"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="phone">{t.phone || 'Phone Number'} *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder={t.enterPhoneNumber || 'Enter your phone number'}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">{t.email || 'Email'} *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder={t.enterEmail || 'Enter your business email'}
                className="mt-1"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold">{t.paymentSetup || 'Payment Setup'}</h3>
              <p className="text-gray-600">{t.paymentSetupOptional || 'This step is optional. You can set up payment processing later.'}</p>
            </div>

            <div>
              <Label htmlFor="stripePaymentLink">{t.stripePaymentLink || 'Stripe Payment Link'}</Label>
              <Input
                id="stripePaymentLink"
                value={formData.stripePaymentLink}
                onChange={(e) => handleInputChange('stripePaymentLink', e.target.value)}
                placeholder="https://buy.stripe.com/..."
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                {t.stripeLinkDescription || 'Add your Stripe payment link to accept online payments from clients.'}
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4B2AAD] to-[#A68BFA] flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600">{t.pleaseLogin || 'Please log in to continue'}</p>
            <Button onClick={() => navigate('/login')} className="mt-4">
              {t.login || 'Login'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4B2AAD] to-[#A68BFA] relative">
      {/* Full-screen loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="p-8 text-center">
              <Loader2 className="w-12 h-12 animate-spin text-[#4B2AAD] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t.completing || 'Completing Setup...'}</h3>
              <p className="text-gray-600 text-sm">
                {t.businessProfileCreated || 'Creating your business profile and setting up your account.'}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {t.setupBusinessProfile || 'Setup Your Business Profile'}
            </h1>
            <p className="text-white/80">
              {t.businessSetupDescription || 'Complete your business profile to start accepting appointments and growing your business.'}
            </p>
          </div>

          {/* Progress */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-600">
                  {t.step || 'Step'} {currentStep} {t.of || 'of'} {steps.length}
                </span>
                <span className="text-sm font-medium text-gray-600">
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className="mb-6" />
              
              <div className="flex justify-between">
                {steps.map((step) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.number;
                  const isCompleted = currentStep > step.number;
                  
                  return (
                    <div key={step.number} className="flex flex-col items-center space-y-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted 
                          ? 'bg-green-500 text-white' 
                          : isActive 
                            ? 'bg-[#4B2AAD] text-white' 
                            : 'bg-gray-200 text-gray-600'
                      }`}>
                        {isCompleted ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                      <span className={`text-xs text-center ${
                        isActive ? 'text-[#4B2AAD] font-medium' : 'text-gray-600'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Step Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {React.createElement(steps[currentStep - 1].icon, { className: "w-5 h-5" })}
                <span>{steps[currentStep - 1].title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.previous || 'Previous'}
            </Button>

            {currentStep === steps.length ? (
              <Button
                onClick={handleComplete}
                disabled={loading}
                className="bg-[#F97316] hover:bg-[#F97316]/90 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t.completing || 'Completing...'}
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    {t.completeSetup || 'Complete Setup'}
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!validateStep(currentStep)}
                className="bg-[#F97316] hover:bg-[#F97316]/90 text-white"
              >
                {t.next || 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessOnboarding;