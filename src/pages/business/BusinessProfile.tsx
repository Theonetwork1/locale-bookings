import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  MapPin, 
  Tag, 
  FileText, 
  ArrowLeft, 
  AlertCircle,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const BusinessProfile = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const handleContactSupport = () => {
    // Open WhatsApp with pre-filled message
    const phoneNumber = '7745069615';
    const message = encodeURIComponent(
      `Hello Bizli Solution team! I would like to request changes to my business profile information. My business email: ${user?.email}`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallSupport = () => {
    window.open('tel:7745069615', '_self');
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
              View your business information and request changes
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile Modification Notice */}
          <Alert className="border-[#F97316]/20 bg-[#F97316]/5">
            <AlertCircle className="h-4 w-4 text-[#F97316]" />
            <AlertDescription className="text-foreground">
              <strong>Business Profile Changes:</strong> For security reasons, business profile modifications 
              must be processed by our admin team. Please contact our support team to request any changes 
              to your business information.
            </AlertDescription>
          </Alert>

          {/* Contact Support Actions */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-[#F97316]/5 to-[#EA580C]/5">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground flex items-center">
                <MessageCircle className="w-6 h-6 mr-3 text-[#F97316]" />
                Request Profile Changes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Need to update your business information? Our support team is here to help you quickly and securely.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleContactSupport}
                  className="flex-1 bg-[#25D366] hover:bg-[#22C55E] text-white transition-all duration-200 hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact via WhatsApp
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  onClick={handleCallSupport}
                  variant="outline"
                  className="flex-1 hover:bg-[#F97316] hover:text-white hover:border-[#F97316] transition-all duration-200"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Support: 7745069615
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Business Overview */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground">Business Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile?.avatar_url || ''} alt={profile?.full_name || 'User'} />
                  <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                    {(profile?.full_name || 'U').charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    {profile?.full_name || 'Not provided'}
                  </h3>
                  <p className="text-muted-foreground">Business</p>
                  <div className="flex items-center mt-2">
                    <Badge variant="secondary" className="mr-2">
                      {user.role} Account
                    </Badge>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                      <span className="text-sm text-success font-medium">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Details */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground">Business Information</CardTitle>
              <p className="text-sm text-muted-foreground">
                Current information on file (read-only)
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-muted-foreground flex items-center">
                    <Building2 className="w-4 h-4 mr-2" />
                    Business Name
                  </Label>
                  <Input
                    value={profile?.full_name || 'Not provided'}
                    disabled
                    className="bg-muted cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground flex items-center">
                    <Tag className="w-4 h-4 mr-2" />
                    Category
                  </Label>
                  <Input
                    value={'Not provided'}
                    disabled
                    className="bg-muted cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Contact Name
                  </Label>
                  <Input
                    value={profile?.full_name || 'Not provided'}
                    disabled
                    className="bg-muted cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Phone Number
                  </Label>
                  <Input
                    value={profile?.phone || 'Not provided'}
                    disabled
                    className="bg-muted cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Address
                </Label>
                <Input
                  value={user?.email || 'Not provided'}
                  disabled
                  className="bg-muted cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Business Address
                </Label>
                <Input
                  value={'Not provided'}
                  disabled
                  className="bg-muted cursor-not-allowed"
                />
              </div>

            </CardContent>
          </Card>

          {/* Account Status */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground">Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-muted-foreground mb-1">Account Type</p>
                  <p className="font-semibold text-foreground capitalize">{user.role}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-muted-foreground mb-1">Status</p>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                    <p className="font-semibold text-success">Active</p>
                  </div>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-muted-foreground mb-1">Email Verified</p>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                    <p className="font-semibold text-success">Verified</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our support team is available to help with:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#F97316] rounded-full mr-3"></div>
                  <span>Updating business information</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#F97316] rounded-full mr-3"></div>
                  <span>Changing contact details</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#F97316] rounded-full mr-3"></div>
                  <span>Account verification issues</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#F97316] rounded-full mr-3"></div>
                  <span>Business category changes</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#F97316] rounded-full mr-3"></div>
                  <span>General account questions</span>
                </li>
              </ul>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">Support Contact</p>
                  <p className="text-sm text-muted-foreground">Available 24/7 for business accounts</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#F97316]">7745069615</p>
                  <p className="text-xs text-muted-foreground">WhatsApp & Phone</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
