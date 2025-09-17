import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Settings,
  Save,
  Globe,
  Shield,
  Bell,
  Mail
} from 'lucide-react';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    platformName: 'Bizli Solution',
    platformDescription: 'Professional booking platform for businesses and clients',
    supportEmail: 'support@bizlisolution.com',
    maintenanceMode: false,
    emailNotifications: true,
    smsNotifications: false,
    autoApproveBusinesses: false,
    maxAppointmentsPerDay: 50,
    defaultTimezone: 'UTC',
    termsOfService: `Terms of Service
Effective Date: [Insert Date]

Welcome to Bizli Solution LLC. These Terms of Service ("Terms") govern your access and use of our web-based platform ("Bizli" or "the Service"), which allows businesses to manage bookings, online payments, and client interactions. By creating an account or using our platform, you agree to these Terms.

1. Eligibility
   You must be at least 18 years old or of legal age in your country to use Bizli.

2. Account Responsibility
   You are responsible for all activity under your account. You agree to provide accurate business and contact information and to keep it up to date.

3. Subscription & Payments
   - Bizli operates on a monthly or annual subscription model.
   - Businesses may also collect client payments via Stripe links embedded in their profiles.
   - Bizli does not store or process payment information directly.

4. Service Usage
   - You may not use Bizli for illegal or abusive purposes.
   - We reserve the right to suspend any business profile that violates these Terms or posts misleading information.

5. Intellectual Property
   All content, branding, and platform code are the property of Bizli Solution LLC. You may not copy or redistribute platform elements without permission.

6. Limitation of Liability
   Bizli Solution LLC is not responsible for business-client disputes, third-party payment issues, or damages resulting from misuse of the platform.

7. Modifications
   Bizli may update these Terms. Users will be notified of material changes.

For questions, contact us at support@bizlisolution.com.`,
    privacyPolicy: `Privacy Policy
Effective Date: [Insert Date]

Bizli Solution LLC ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal and business data.

1. Data We Collect
   - Business and user registration info (name, email, business name, phone)
   - Location data if enabled
   - Stripe payment link (if provided)
   - Usage data (login history, appointment activity)

2. How We Use Data
   - To operate the Bizli platform and provide services
   - To help customers find businesses based on categories and location
   - To send platform updates and support communication
   - To ensure business accounts comply with Bizli standards

3. Third-Party Services
   We use third-party tools like Stripe for payment and Firebase/GitHub for hosting. These services may process limited user data under their own privacy terms.

4. Data Security
   We implement reasonable security measures to protect your data, including encryption and secure authentication.

5. Your Rights
   You may request access, modification, or deletion of your data by contacting us.

6. Data Retention
   We retain your data as long as your account is active or as required by law.

For more information, contact: privacy@bizlisolution.com.`
  });

  const handleSave = () => {
    // Save settings logic here
    console.log('Saving settings:', settings);
  };

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Platform Settings</h1>
            <p className="text-muted-foreground">Configure platform-wide settings</p>
          </div>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* General Settings */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-primary" />
              <span>General Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="platform-name">Platform Name</Label>
                <Input
                  id="platform-name"
                  value={settings.platformName}
                  onChange={(e) => handleInputChange('platformName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="support-email">Support Email</Label>
                <Input
                  id="support-email"
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => handleInputChange('supportEmail', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="platform-description">Platform Description</Label>
              <Textarea
                id="platform-description"
                value={settings.platformDescription}
                onChange={(e) => handleInputChange('platformDescription', e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>System Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">Put the platform in maintenance mode</p>
              </div>
              <Switch
                id="maintenance-mode"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleInputChange('maintenanceMode', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-approve">Auto-approve New Businesses</Label>
                <p className="text-sm text-muted-foreground">Automatically approve new business registrations</p>
              </div>
              <Switch
                id="auto-approve"
                checked={settings.autoApproveBusinesses}
                onCheckedChange={(checked) => handleInputChange('autoApproveBusinesses', checked)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="max-appointments">Max Appointments Per Day</Label>
                <Input
                  id="max-appointments"
                  type="number"
                  value={settings.maxAppointmentsPerDay}
                  onChange={(e) => handleInputChange('maxAppointmentsPerDay', parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="timezone">Default Timezone</Label>
                <Input
                  id="timezone"
                  value={settings.defaultTimezone}
                  onChange={(e) => handleInputChange('defaultTimezone', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-primary" />
              <span>Notification Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Send email notifications to users</p>
              </div>
              <Switch
                id="email-notifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Send SMS notifications to users</p>
              </div>
              <Switch
                id="sms-notifications"
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => handleInputChange('smsNotifications', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Legal Settings */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-primary" />
              <span>Legal Documents</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="terms">Terms of Service</Label>
              <Textarea
                id="terms"
                value={settings.termsOfService}
                onChange={(e) => handleInputChange('termsOfService', e.target.value)}
                rows={20}
                className="font-mono text-sm"
              />
            </div>
            <div>
              <Label htmlFor="privacy">Privacy Policy</Label>
              <Textarea
                id="privacy"
                value={settings.privacyPolicy}
                onChange={(e) => handleInputChange('privacyPolicy', e.target.value)}
                rows={20}
                className="font-mono text-sm"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
