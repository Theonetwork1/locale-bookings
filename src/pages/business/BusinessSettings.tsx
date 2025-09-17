import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Building2, Bell, Shield, Save, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslations } from '@/hooks/useTranslations';
import { toast } from '@/components/ui/use-toast';

const BusinessSettings = () => {
  const navigate = useNavigate();
  const { user, profile, updateProfile } = useAuth();
  const { language, setLanguage } = useLanguage();
  const t = useTranslations();
  
  const [settings, setSettings] = useState({
    // Business profile settings
    businessName: profile?.business_name || '',
    businessEmail: user?.email || '',
    businessPhone: profile?.phone || '',
    businessAddress: profile?.address || '',
    businessDescription: profile?.description || '',
    
    // Notification settings
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    appointmentReminders: true,
    paymentNotifications: true,
    
    // Privacy settings
    profileVisibility: 'public',
    showEmail: true,
    showPhone: true,
    showAddress: false,
    
  });

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      
      // Update profile information
      if (updateProfile) {
        await updateProfile({
          business_name: settings.businessName,
          phone: settings.businessPhone,
          address: settings.businessAddress,
          description: settings.businessDescription,
        });
      }
      
      
      toast({
        title: t.settingsSaved,
        description: t.settingsSaved,
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: t.settingsSaveError,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-[#1A1A1A] hover:bg-[#EEF1FF]"
              onClick={() => navigate('/business-dashboard')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t.backToDashboard}
            </Button>
            <h1 className="text-2xl font-bold text-[#1A1A1A]">{t.settings}</h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Business Profile Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#1A1A1A]">
              <Building2 className="h-5 w-5 text-[#4B2AAD]" />
              {t.businessInformation}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-[#1A1A1A]">{t.businessName}</Label>
                <Input
                  id="businessName"
                  value={settings.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className="border-gray-300 focus:border-[#4B2AAD] focus:ring-[#4B2AAD]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessEmail" className="text-[#1A1A1A]">{t.businessEmail}</Label>
                <Input
                  id="businessEmail"
                  type="email"
                  value={settings.businessEmail}
                  disabled
                  className="border-gray-300 bg-gray-50"
                />
                <p className="text-xs text-gray-500">{t.emailCannotBeChanged}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessPhone" className="text-[#1A1A1A]">{t.businessPhone}</Label>
              <Input
                id="businessPhone"
                value={settings.businessPhone}
                onChange={(e) => handleInputChange('businessPhone', e.target.value)}
                className="border-gray-300 focus:border-[#4B2AAD] focus:ring-[#4B2AAD]"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessAddress" className="text-[#1A1A1A]">{t.businessAddress}</Label>
              <Input
                id="businessAddress"
                value={settings.businessAddress}
                onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                className="border-gray-300 focus:border-[#4B2AAD] focus:ring-[#4B2AAD]"
                placeholder="123 Main Street, City, State"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessDescription" className="text-[#1A1A1A]">{t.businessDescription}</Label>
              <Textarea
                id="businessDescription"
                value={settings.businessDescription}
                onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                className="border-gray-300 focus:border-[#4B2AAD] focus:ring-[#4B2AAD]"
                placeholder={t.describeYourBusinessServices}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>


        {/* Notification Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#1A1A1A]">
              <Bell className="h-5 w-5 text-[#4B2AAD]" />
              {t.notificationsSection}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-[#1A1A1A]">{t.emailNotifications}</Label>
                <p className="text-sm text-gray-600">{t.receiveNotificationsViaEmail}</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-[#1A1A1A]">{t.smsNotifications}</Label>
                <p className="text-sm text-gray-600">{t.receiveNotificationsViaSMS}</p>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => handleInputChange('smsNotifications', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-[#1A1A1A]">{t.pushNotifications}</Label>
                <p className="text-sm text-gray-600">{t.receivePushNotificationsInBrowser}</p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleInputChange('pushNotifications', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-[#1A1A1A]">{t.appointmentReminders}</Label>
                <p className="text-sm text-gray-600">{t.sendRemindersToClients}</p>
              </div>
              <Switch
                checked={settings.appointmentReminders}
                onCheckedChange={(checked) => handleInputChange('appointmentReminders', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-[#1A1A1A]">{t.paymentNotifications}</Label>
                <p className="text-sm text-gray-600">{t.notifyAboutPaymentsReceived}</p>
              </div>
              <Switch
                checked={settings.paymentNotifications}
                onCheckedChange={(checked) => handleInputChange('paymentNotifications', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#1A1A1A]">
              <Shield className="h-5 w-5 text-[#4B2AAD]" />
              {t.privacy}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[#1A1A1A]">{t.profileVisibility}</Label>
              <select
                value={settings.profileVisibility}
                onChange={(e) => handleInputChange('profileVisibility', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#4B2AAD] focus:ring-[#4B2AAD]"
              >
                <option value="public">{t.public}</option>
                <option value="private">{t.private}</option>
                <option value="verified">{t.verifiedOnly}</option>
              </select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-[#1A1A1A]">{t.showEmail}</Label>
                <p className="text-sm text-gray-600">{t.displayEmailOnProfile}</p>
              </div>
              <Switch
                checked={settings.showEmail}
                onCheckedChange={(checked) => handleInputChange('showEmail', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-[#1A1A1A]">{t.showPhone}</Label>
                <p className="text-sm text-gray-600">{t.displayPhoneOnProfile}</p>
              </div>
              <Switch
                checked={settings.showPhone}
                onCheckedChange={(checked) => handleInputChange('showPhone', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-[#1A1A1A]">{t.showAddress}</Label>
                <p className="text-sm text-gray-600">{t.displayAddressOnProfile}</p>
              </div>
              <Switch
                checked={settings.showAddress}
                onCheckedChange={(checked) => handleInputChange('showAddress', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-[#4B2AAD] hover:bg-[#A68BFA] text-white px-8"
        >
          <Save className="h-4 w-4 mr-2" />
          {loading ? t.saving : t.save + ' ' + t.settings}
        </Button>
      </div>
    </div>
  );
};

export default BusinessSettings;
