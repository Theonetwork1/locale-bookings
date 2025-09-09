import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, User, Building2, Mail, Lock, Phone, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { createUserProfile, hashPassword } from '@/lib/supabase';

const Register = () => {
  const [step, setStep] = useState<'account-type' | 'details' | 'verification'>('account-type');
  const [accountType, setAccountType] = useState<'client' | 'business' | ''>('');
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
    businessDescription: ''
  });
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAccountTypeSelect = (type: 'client' | 'business') => {
    setAccountType(type);
    setStep('details');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
      // Hash password
      const passwordHash = await hashPassword(formData.password);
      
      // Create user profile in database
      const userProfile = await createUserProfile({
        email: formData.email,
        password_hash: passwordHash,
        name: formData.name,
        phone: formData.phone,
        role: accountType as 'client' | 'business',
        business_name: accountType === 'business' ? formData.businessName : undefined,
        business_address: accountType === 'business' ? formData.businessAddress : undefined,
        business_category: accountType === 'business' ? formData.businessCategory : undefined,
        business_description: accountType === 'business' ? formData.businessDescription : undefined,
        is_active: true,
        email_verified: false
      });
      
      // Auto-login after registration
      await login(formData.email, formData.password, accountType as UserRole);
      
      toast({
        title: 'Account Created!',
        description: `Welcome to Bizli Solution! Your ${accountType} account is ready.`
      });

      // Redirect based on account type
      if (accountType === 'client') {
        navigate('/client-dashboard');
      } else {
        // Business users go to subscription selection
        navigate('/business-subscription-setup');
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
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
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
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-white mb-2">Join Bizli Solution</h1>
          <p className="text-white/80">
            {step === 'account-type' 
              ? 'Choose your account type to get started'
              : step === 'details'
              ? `Create your ${accountType} account`
              : 'Verify your account'
            }
          </p>
        </div>

        {/* Step 1: Account Type Selection */}
        {step === 'account-type' && (
          <div className="space-y-4">
            <Card 
              className="cursor-pointer border-2 border-transparent hover:border-[#F97316] transition-all duration-200 hover:scale-105"
              onClick={() => handleAccountTypeSelect('client')}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#F97316]/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-[#F97316]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">I'm a Client</h3>
                    <p className="text-sm text-muted-foreground">
                      I want to find and book services from businesses
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  ✓ Browse and book services • ✓ Manage appointments • ✓ Payment history
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer border-2 border-transparent hover:border-[#F97316] transition-all duration-200 hover:scale-105"
              onClick={() => handleAccountTypeSelect('business')}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">I'm a Business</h3>
                    <p className="text-sm text-muted-foreground">
                      I want to offer services and manage my business
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  ✓ Manage services • ✓ Accept bookings • ✓ Revenue tracking • ✓ Subscription required
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
                  <User className="w-6 h-6 mr-2 text-[#F97316]" />
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
                <div className="flex items-center space-x-2 pt-4">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground">
                    I agree to the{' '}
                    <a href="#" className="text-[#F97316] hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-[#F97316] hover:underline">Privacy Policy</a>
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold transition-all duration-200 hover:scale-105"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    `Create ${accountType === 'client' ? 'Client' : 'Business'} Account`
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Login Link */}
        <div className="text-center">
          <p className="text-white/80 text-sm">
            Already have an account?{' '}
            <Button
              variant="link"
              onClick={() => navigate('/login')}
              className="text-white hover:text-[#F97316] p-0 h-auto font-semibold"
            >
              Sign In
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
