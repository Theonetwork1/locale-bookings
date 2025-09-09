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
    termsOfService: 'Terms of service content...',
    privacyPolicy: 'Privacy policy content...'
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
          <Button onClick={handleSave} className="bg-primary hover:bg-primary-dark text-primary-foreground">
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
                rows={6}
              />
            </div>
            <div>
              <Label htmlFor="privacy">Privacy Policy</Label>
              <Textarea
                id="privacy"
                value={settings.privacyPolicy}
                onChange={(e) => handleInputChange('privacyPolicy', e.target.value)}
                rows={6}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
