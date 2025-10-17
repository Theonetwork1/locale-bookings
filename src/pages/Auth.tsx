import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from '@/hooks/useTranslations';
import { Loader2, UserPlus, LogIn } from 'lucide-react';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const { signIn, signUp, user, login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const t = useTranslations();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Modifier loginForm pour inclure le rôle :
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    role: 'client' as 'client' | 'business'
  });

  const [signupForm, setSignupForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    role: 'client' as 'client' | 'business'
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await login(loginForm.email, loginForm.password, loginForm.role);
      
      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      });
      
      // Navigate based on user's actual role from database
      switch (user.role) {
        case 'client':
          navigate('/client-dashboard');
          break;
        case 'business':
          navigate('/business-dashboard');
          break;
        case 'admin':
          navigate('/admin-dashboard');
          break;
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupForm.password !== signupForm.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (signupForm.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await signUp(signupForm.email, signupForm.password, {
        full_name: signupForm.fullName,
        role: signupForm.role
      });
      
      toast({
        title: "Account Created!",
        description: "You can now sign in with your credentials.",
      });
      setActiveTab('login');
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4B2AAD] via-[#A68BFA] to-[#8B5CF6] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-[#1A1A1A] rounded-xl flex items-center justify-center shadow-lg p-2">
              <img 
                src="/bizli_logo_-removebg-preview.png" 
                alt="Bizli Solution" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Bizli Solution</h1>
          <p className="text-white/80 text-lg">Connect businesses with clients seamlessly</p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">Welcome</CardTitle>
            <p className="text-gray-600 text-base">Choose your access method</p>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  {t.login || 'Login'}
                </TabsTrigger>
                <TabsTrigger value="signup" className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  {t.signUp || 'Sign Up'}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.email || 'Email'}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t.enterEmail || 'Enter your email'}
                      value={loginForm.email}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">{t.password || 'Password'}</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder={t.enterPassword || 'Enter your password'}
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Account Type</Label>
                    <Select 
                      value={loginForm.role} 
                      onValueChange={(value: 'client' | 'business') => 
                        setLoginForm(prev => ({ ...prev, role: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="client">Client - Browse & Book Services</SelectItem>
                        <SelectItem value="business">Business - Manage Services & Clients</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t.signingIn || 'Signing in...'}
                      </>
                    ) : (
                      t.signIn || 'Sign In'
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t.fullName || 'Full Name'}</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder={t.enterFullName || 'Enter your full name'}
                      value={signupForm.fullName}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, fullName: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signupEmail">{t.email || 'Email'}</Label>
                    <Input
                      id="signupEmail"
                      type="email"
                      placeholder={t.enterEmail || 'Enter your email'}
                      value={signupForm.email}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">{t.accountType || 'Account Type'}</Label>
                    <Select value={signupForm.role} onValueChange={(value: 'client' | 'business') => 
                      setSignupForm(prev => ({ ...prev, role: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.selectAccountType || 'Select account type'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="client">{t.clientAccount || 'Client - Browse & Book Services'}</SelectItem>
                        <SelectItem value="business">{t.businessAccount || 'Business - Manage Services & Clients'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signupPassword">{t.password || 'Password'}</Label>
                    <Input
                      id="signupPassword"
                      type="password"
                      placeholder={t.createPassword || 'Create a password (min 6 characters)'}
                      value={signupForm.password}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t.creatingAccount || 'Creating account...'}
                      </>
                    ) : (
                      t.createAccount || 'Create Account'
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;