import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslations } from '@/hooks/useTranslations';

type UserRole = 'client' | 'business';

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
      const user = await login(email, password, role);
      
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
    } catch (err) {
      setError(t.loginFailed || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EEF1FF] to-[#F8FAFC] opacity-50"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(75, 42, 173, 0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(166, 139, 250, 0.05) 0%, transparent 50%)`
      }}></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-[#4B2AAD] rounded-2xl flex items-center justify-center shadow-xl p-3">
              <img 
                src="/bizli_logo_-removebg-preview.png" 
                alt="Bizli Solution" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-[#1A1A1A] mb-3">Bizli Solution</h1>
          <p className="text-[#64748B] text-lg font-medium">Professional Business Management</p>
        </div>

        <Card className="bg-white border-0 shadow-xl ring-1 ring-gray-200/50">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold text-[#1A1A1A] mb-2">{t.welcomeBack || 'Welcome Back'}</CardTitle>
            <p className="text-[#64748B] text-base font-medium">{t.signInToAccount || 'Sign in to your account'}</p>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-semibold text-[#374151]">{t.email || 'Email Address'}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.enterEmail || 'Enter your email'}
                  className="h-12 text-base border-2 border-[#E5E7EB] focus:border-[#4B2AAD] focus:ring-2 focus:ring-[#4B2AAD]/10 bg-white"
                  required
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-semibold text-[#374151]">{t.password || 'Password'}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-12 text-base border-2 border-[#E5E7EB] focus:border-[#4B2AAD] focus:ring-2 focus:ring-[#4B2AAD]/10 bg-white"
                  required
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="role" className="text-sm font-semibold text-[#374151]">Account Type</Label>
                <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                  <SelectTrigger className="h-12 text-base border-2 border-[#E5E7EB] focus:border-[#4B2AAD] bg-white">
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
                        Business - Manage Services & Clients
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
                className="w-full h-12 bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white font-semibold text-base transition-all duration-200 shadow-lg hover:shadow-xl"
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
              
              <div className="flex items-center justify-center space-x-3">
                <div className="h-px bg-[#E5E7EB] flex-1"></div>
                <span className="text-[#64748B] text-sm font-medium">New to Bizli Solution?</span>
                <div className="h-px bg-[#E5E7EB] flex-1"></div>
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