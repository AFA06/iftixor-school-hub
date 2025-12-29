import { PageHeader } from '@/components/common/CommonComponents';
import { useAuthStore } from '@/store/authStore';
import { User, Mail, Phone, Calendar, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ProfilePage = () => {
  const { user } = useAuthStore();

  return (
    <div className="page-container">
      <PageHeader title="Profile" description="Manage your account information" />
      
      <div className="max-w-2xl">
        <div className="card-elevated p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-muted-foreground capitalize">{user?.role} Account</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium capitalize">{user?.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="font-medium">{user?.createdAt}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Button>Edit Profile</Button>
            <Button variant="outline">Change Password</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
