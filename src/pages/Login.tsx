import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslations } from '@/hooks/useTranslations';

type UserRole = 'client' | 'business' | 'admin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('client');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const t = useTranslations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password, role);
      
      // Navigate based on role - the login function will handle business setup check
      switch (role) {
        case 'admin':
          navigate('/dashboard');
          break;
        case 'business':
          navigate('/business-dashboard');
          break;
        case 'client':
          navigate('/client-dashboard');
          break;
      }
    } catch (err) {
      setError(t.loginFailed || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4B2AAD] via-[#A68BFA] to-[#8B5CF6] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-[#1A1A1A] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">BS</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Bizli Solution</h1>
          <p className="text-white/90 text-lg">Professional Business Management</p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-[#1A1A1A]">{t.welcomeBack || 'Welcome Back'}</CardTitle>
            <p className="text-gray-600 text-base">{t.signInToAccount || 'Sign in to your account'}</p>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">{t.email || 'Email Address'}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.enterEmail || 'Enter your email'}
                  className="h-12 text-base border-2 border-gray-200 focus:border-[#4B2AAD] focus:ring-2 focus:ring-[#4B2AAD]/20"
                  required
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">{t.password || 'Password'}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-12 text-base border-2 border-gray-200 focus:border-[#4B2AAD] focus:ring-2 focus:ring-[#4B2AAD]/20"
                  required
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="role" className="text-sm font-semibold text-gray-700">Account Type</Label>
                <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                  <SelectTrigger className="h-12 text-base border-2 border-gray-200 focus:border-[#4B2AAD]">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client" className="text-base py-3">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-[#4B2AAD] rounded-full mr-3"></div>
                        Client - Browse & Book Services
                      </div>
                    </SelectItem>
                    <SelectItem value="business" className="text-base py-3">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-[#A68BFA] rounded-full mr-3"></div>
                        Business - Manage Services
                      </div>
                    </SelectItem>
                    <SelectItem value="admin" className="text-base py-3">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-[#1A1A1A] rounded-full mr-3"></div>
                        Administrator - Platform Management
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm font-medium text-center">{error}</p>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 bg-[#4B2AAD] hover:bg-[#A68BFA] text-white font-semibold text-base transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    {t.signingIn || 'Signing in...'}
                  </div>
                ) : (
                  t.signIn || 'Sign In'
                )}
              </Button>
            </form>
            
            <div className="mt-8 text-center space-y-4">
              <div className="p-4 bg-[#EEF1FF] border border-[#4B2AAD] rounded-lg">
                <p className="text-[#1A1A1A] text-sm font-medium">
                  🎯 Demo Mode: Use any email/password combination
                </p>
              </div>
              
              <div className="flex items-center justify-center space-x-2">
                <div className="h-px bg-gray-300 flex-1"></div>
                <span className="text-gray-500 text-sm">New to Bizli Solution?</span>
                <div className="h-px bg-gray-300 flex-1"></div>
              </div>
              
              <Button
                variant="outline"
                onClick={() => navigate('/register')}
                className="w-full h-12 border-2 border-[#4B2AAD] text-[#4B2AAD] hover:bg-[#4B2AAD] hover:text-white font-semibold text-base transition-all duration-200"
              >
                Create an Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;