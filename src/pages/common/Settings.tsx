import { PageHeader } from '@/components/common/CommonComponents';
import { useAuthStore } from '@/store/authStore';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Globe, Bell, Moon } from 'lucide-react';

export const SettingsPage = () => {
  const { language, setLanguage } = useAuthStore();

  return (
    <div className="page-container">
      <PageHeader title="Settings" description="Customize your experience" />
      
      <div className="max-w-2xl space-y-6">
        <div className="card-elevated p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5" /> Language
          </h3>
          <div className="flex gap-2">
            {(['en', 'ru', 'uz'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  language === lang ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="card-elevated p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5" /> Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notif">Email Notifications</Label>
              <Switch id="email-notif" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notif">Push Notifications</Label>
              <Switch id="push-notif" defaultChecked />
            </div>
          </div>
        </div>

        <div className="card-elevated p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Moon className="h-5 w-5" /> Appearance
          </h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch id="dark-mode" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
