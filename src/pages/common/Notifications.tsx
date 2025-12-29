import { PageHeader } from '@/components/common/CommonComponents';
import { useNotifications, useMarkNotificationRead } from '@/hooks/useApi';
import { Bell, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const NotificationsPage = () => {
  const { data: notifications, isLoading } = useNotifications();
  const markRead = useMarkNotificationRead();

  const today = notifications?.filter(n => {
    const date = new Date(n.createdAt);
    const now = new Date();
    return date.toDateString() === now.toDateString();
  }) || [];

  const earlier = notifications?.filter(n => {
    const date = new Date(n.createdAt);
    const now = new Date();
    return date.toDateString() !== now.toDateString();
  }) || [];

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success': return 'bg-success/10 text-success';
      case 'warning': return 'bg-warning/10 text-warning';
      case 'error': return 'bg-destructive/10 text-destructive';
      default: return 'bg-info/10 text-info';
    }
  };

  return (
    <div className="page-container">
      <PageHeader title="Notifications" description="Stay updated with the latest activities" />
      
      {today.length > 0 && (
        <div className="mb-8">
          <h3 className="section-title">Today</h3>
          <div className="space-y-3">
            {today.map((n) => (
              <div key={n.id} className={cn('card-elevated p-4 flex items-start gap-4', !n.read && 'border-l-4 border-l-primary')}>
                <div className={cn('w-10 h-10 rounded-full flex items-center justify-center', getTypeStyles(n.type))}>
                  <Bell className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{n.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
                </div>
                {!n.read && (
                  <Button size="sm" variant="ghost" onClick={() => markRead.mutate(n.id)}>
                    <Check className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {earlier.length > 0 && (
        <div>
          <h3 className="section-title">Earlier</h3>
          <div className="space-y-3">
            {earlier.map((n) => (
              <div key={n.id} className="card-elevated p-4 flex items-start gap-4 opacity-75">
                <div className={cn('w-10 h-10 rounded-full flex items-center justify-center', getTypeStyles(n.type))}>
                  <Bell className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{n.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
