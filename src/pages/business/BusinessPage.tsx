import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Globe,
  Save,
  Eye,
  Edit,
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  CreditCard,
  AlertCircle,
  MessageCircle,
  ExternalLink,
  Lock,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Business, updateBusinessClientPaymentUrl, supabase } from '@/lib/supabase';

const BusinessPage = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  
  const [businessInfo, setBusinessInfo] = useState({
    name: 'Your Business',
    description: 'Professional services with expert staff providing top-quality services in a welcoming environment.',
    address: '123 Main St, City, State 12345',
    phone: profile?.phone || '(555) 123-4567',
    email: user?.email || 'info@yourbusiness.com',
    website: 'www.yourbusiness.com',
    hours: 'Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 4:00 PM',
    rating: 4.8,
    isPublic: true,
    showContactInfo: true,
    allowOnlineBooking: true,
    client_payment_url: '' as Business['client_payment_url']
  });

  const [services] = useState([
    { name: 'Premium Service', price: 50, duration: '60 min', available: true },
    { name: 'Standard Service', price: 120, duration: '120 min', available: true },
    { name: 'Express Service', price: 35, duration: '45 min', available: false },
    { name: 'Consultation', price: 25, duration: '30 min', available: true }
  ]);

  useEffect(() => {
    // Initialize with profile/user data
    if (user || profile) {
      setBusinessInfo(prev => ({
        ...prev,
        phone: profile?.phone || prev.phone,
        email: user?.email || prev.email
      }));
    }
  }, [user, profile]);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Only save the fields that are allowed to be modified
      const allowedUpdates = {
        description: businessInfo.description,
        website: businessInfo.website,
        hours: businessInfo.hours,
        isPublic: businessInfo.isPublic,
        showContactInfo: businessInfo.showContactInfo,
        allowOnlineBooking: businessInfo.allowOnlineBooking,
        client_payment_url: businessInfo.client_payment_url
      };

      // In a real app, save to Supabase
      // await supabase.from('businesses').update(allowedUpdates).eq('id', user?.business_id);
      
      console.log('Saving business page updates:', allowedUpdates);
      
      toast({
        title: 'Changes Saved!',
        description: 'Your business page has been updated successfully.'
      });

    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: 'Save Failed',
        description: 'Unable to save changes. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    setPreviewing(true);
    
    // Simulate opening preview in new tab
    const previewData = {
      ...businessInfo,
      services: services.filter(s => s.available)
    };
    
    console.log('Opening preview with data:', previewData);
    
    toast({
      title: 'Preview Opened',
      description: 'Your business page preview is ready (simulated in console).'
    });

    // Reset preview state after a moment
    setTimeout(() => setPreviewing(false), 2000);
  };

  const handleContactAdmin = () => {
    const phoneNumber = '7745069615';
    const message = encodeURIComponent(
      `Hello Bizli Solution admin! I need to update my business profile information. Business: ${businessInfo.name}, Email: ${businessInfo.email}`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleInputChange = (field: string, value: any) => {
    setBusinessInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-sm border-b px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Business Page</h1>
            <p className="text-muted-foreground">Manage your public business profile and settings</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              className="hover:bg-[#F97316] hover:text-white hover:border-[#F97316] transition-all duration-200"
              onClick={handlePreview}
              disabled={previewing}
            >
              {previewing ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                  Opening...
                </div>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </>
              )}
            </Button>
            <Button 
              onClick={handleSave} 
              className="bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold transition-all duration-200 hover:scale-105"
              disabled={saving}
            >
              {saving ? (
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
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Admin Contact Notice */}
        <Alert className="border-[#F97316]/20 bg-[#F97316]/5">
          <AlertCircle className="h-4 w-4 text-[#F97316]" />
          <AlertDescription className="text-foreground">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <strong>Restricted Fields:</strong> Business name, email, and phone can only be changed by our admin team for security reasons.
              </div>
              <Button
                size="sm"
                onClick={handleContactAdmin}
                className="bg-[#25D366] hover:bg-[#22C55E] text-white transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Admin
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Basic Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-[#F97316]" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Restricted Fields */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="flex items-center text-muted-foreground">
                      <Lock className="w-4 h-4 mr-2" />
                      Business Name (Admin Only)
                    </Label>
                    <Input
                      value={businessInfo.name}
                      disabled
                      className="bg-muted cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center text-muted-foreground">
                      <Lock className="w-4 h-4 mr-2" />
                      Email Address (Admin Only)
                    </Label>
                    <Input
                      value={businessInfo.email}
                      disabled
                      className="bg-muted cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center text-muted-foreground">
                      <Lock className="w-4 h-4 mr-2" />
                      Phone Number (Admin Only)
                    </Label>
                    <Input
                      value={businessInfo.phone}
                      disabled
                      className="bg-muted cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center text-muted-foreground">
                      <Lock className="w-4 h-4 mr-2" />
                      Address (Admin Only)
                    </Label>
                    <Input
                      value={businessInfo.address}
                      disabled
                      className="bg-muted cursor-not-allowed"
                    />
                  </div>
                </div>

                <Separator />

                {/* Editable Fields */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Business Description</Label>
                    <Textarea
                      id="description"
                      value={businessInfo.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe your business and services..."
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground">
                      This description will appear on your public business profile
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website URL</Label>
                    <Input
                      id="website"
                      value={businessInfo.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="www.yourbusiness.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hours">Business Hours</Label>
                    <Textarea
                      id="hours"
                      value={businessInfo.hours}
                      onChange={(e) => handleInputChange('hours', e.target.value)}
                      placeholder="Mon-Fri: 9:00 AM - 6:00 PM..."
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Settings */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center">
                  <CreditCard className="w-6 h-6 mr-3 text-[#F97316]" />
                  Payment Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-url">Client Payment URL (Stripe)</Label>
                  <Input
                    id="payment-url"
                    value={businessInfo.client_payment_url || ''}
                    onChange={(e) => handleInputChange('client_payment_url', e.target.value)}
                    placeholder="https://checkout.stripe.com/pay/..."
                  />
                  <p className="text-xs text-muted-foreground">
                    This link will be displayed on your public page for client payments
                  </p>
                </div>

                {businessInfo.client_payment_url && (
                  <div className="p-3 bg-success/5 border border-success/20 rounded-lg">
                    <div className="flex items-center text-success text-sm">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Payment button will be visible to clients
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Page Settings */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">Page Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-foreground">Public Visibility</Label>
                    <p className="text-xs text-muted-foreground">Make your business page visible to clients</p>
                  </div>
                  <Switch
                    checked={businessInfo.isPublic}
                    onCheckedChange={(checked) => handleInputChange('isPublic', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-foreground">Show Contact Information</Label>
                    <p className="text-xs text-muted-foreground">Display phone and email on public page</p>
                  </div>
                  <Switch
                    checked={businessInfo.showContactInfo}
                    onCheckedChange={(checked) => handleInputChange('showContactInfo', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-foreground">Online Booking</Label>
                    <p className="text-xs text-muted-foreground">Allow clients to book appointments online</p>
                  </div>
                  <Switch
                    checked={businessInfo.allowOnlineBooking}
                    onCheckedChange={(checked) => handleInputChange('allowOnlineBooking', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Services Overview */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">Services Preview</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Services that will appear on your public page
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {services.filter(service => service.available).map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <span className="font-medium text-foreground">{service.name}</span>
                      <p className="text-sm text-muted-foreground">{service.duration}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-[#F97316]">${service.price}</span>
                    </div>
                  </div>
                ))}
                
                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground">
                    Manage your services from the main dashboard
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Page Stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">Page Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-foreground">127</div>
                    <div className="text-sm text-muted-foreground">Page Views</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-foreground">23</div>
                    <div className="text-sm text-muted-foreground">Bookings</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Page Status:</span>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${businessInfo.isPublic ? 'bg-success' : 'bg-warning'}`}></div>
                    <span className={`font-medium ${businessInfo.isPublic ? 'text-success' : 'text-warning'}`}>
                      {businessInfo.isPublic ? 'Public' : 'Private'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Preview Section */}
        {previewing && (
          <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground">Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-card rounded-lg border">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-foreground mb-2">{businessInfo.name}</h2>
                  <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(businessInfo.rating) ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`} />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">{businessInfo.rating}</span>
                  </div>
                  <p className="text-muted-foreground">{businessInfo.description}</p>
                </div>

                {businessInfo.showContactInfo && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>{businessInfo.address}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>{businessInfo.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>{businessInfo.email}</span>
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-3">Business Hours</h3>
                  <p className="text-sm text-muted-foreground">{businessInfo.hours}</p>
                </div>

                {businessInfo.allowOnlineBooking && (
                  <div className="text-center">
                    <Button className="bg-[#F97316] hover:bg-[#EA580C] text-white">
                      Book Appointment
                    </Button>
                  </div>
                )}

                {businessInfo.client_payment_url && (
                  <div className="text-center mt-4">
                    <Button variant="outline" className="border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay for Services
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Current Public Page Status */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">Current Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                  businessInfo.isPublic ? 'bg-success/10' : 'bg-warning/10'
                }`}>
                  <Globe className={`w-6 h-6 ${businessInfo.isPublic ? 'text-success' : 'text-warning'}`} />
                </div>
                <div className="font-semibold text-foreground">
                  {businessInfo.isPublic ? 'Public' : 'Private'}
                </div>
                <div className="text-sm text-muted-foreground">Page Visibility</div>
              </div>

              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                  businessInfo.allowOnlineBooking ? 'bg-success/10' : 'bg-muted/10'
                }`}>
                  <Clock className={`w-6 h-6 ${businessInfo.allowOnlineBooking ? 'text-success' : 'text-muted-foreground'}`} />
                </div>
                <div className="font-semibold text-foreground">
                  {businessInfo.allowOnlineBooking ? 'Enabled' : 'Disabled'}
                </div>
                <div className="text-sm text-muted-foreground">Online Booking</div>
              </div>

              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                  businessInfo.client_payment_url ? 'bg-success/10' : 'bg-muted/10'
                }`}>
                  <CreditCard className={`w-6 h-6 ${businessInfo.client_payment_url ? 'text-success' : 'text-muted-foreground'}`} />
                </div>
                <div className="font-semibold text-foreground">
                  {businessInfo.client_payment_url ? 'Configured' : 'Not Set'}
                </div>
                <div className="text-sm text-muted-foreground">Payment Link</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessPage;