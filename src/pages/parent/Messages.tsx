import { PageHeader } from '@/components/common/CommonComponents';
import { Card } from '@/components/ui/card';
import { MessageCircle, Megaphone, Mail } from 'lucide-react';

const mockMessages = [
  {
    id: 'm1',
    from: 'Class teacher',
    title: 'Homework update',
    preview: 'Tomorrow the class will have a short quiz on unit 3…',
    date: '2024-09-18',
    channel: 'Teacher',
  },
  {
    id: 'm2',
    from: 'School administration',
    title: 'Parent meeting',
    preview: 'We invite you to the parent–teacher meeting next Wednesday…',
    date: '2024-09-12',
    channel: 'School',
  },
];

const ParentMessages = () => {
  return (
    <div className="page-container">
      <PageHeader
        title="Messages"
        description="Read-only view of announcements and teacher communication."
      />

      <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] gap-6">
        <Card className="p-4">
          <h3 className="section-title mb-4 flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-primary" />
            Inbox
          </h3>
          {mockMessages.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Messages from teachers and the school will appear here. Parents primarily receive
              push notifications in the mobile app.
            </p>
          ) : (
            <div className="space-y-3">
              {mockMessages.map((m) => (
                <div
                  key={m.id}
                  className="border border-border rounded-md px-3 py-2 flex items-start justify-between gap-3 bg-muted/40"
                >
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {m.channel} • {m.date}
                    </p>
                    <p className="font-medium">{m.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{m.preview}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {m.from}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-4 flex flex-col gap-3">
          <h3 className="section-title flex items-center gap-2">
            <Megaphone className="h-4 w-4 text-primary" />
            How communication works
          </h3>
          <p className="text-sm text-muted-foreground">
            The Iftixor mobile app is the primary channel for real-time communication. The web
            panel offers a clean, read-only overview suitable for parents checking from a desktop.
          </p>
          <div className="flex items-start gap-3 text-sm text-muted-foreground">
            <Mail className="h-4 w-4 mt-0.5" />
            <p>
              For urgent topics, please contact the school by phone or email. Replies from this web
              inbox are disabled to keep the workflow focused in the mobile app.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ParentMessages;