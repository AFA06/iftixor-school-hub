import { PageHeader, StatsCard } from '@/components/common/CommonComponents';
import { Card } from '@/components/ui/card';
import { Award, Gift } from 'lucide-react';

const mockTokens = {
  total: 42,
  thisMonth: 8,
  history: [
    {
      id: 't1',
      date: '2024-09-18',
      reason: 'Excellent homework completion',
      amount: 3,
      teacher: 'Ms. Rustamova',
    },
    {
      id: 't2',
      date: '2024-09-10',
      reason: 'Helping classmates',
      amount: 5,
      teacher: 'Mr. Aliyev',
    },
  ],
};

const StudentTokens = () => {
  return (
    <div className="page-container">
      <PageHeader
        title="Tokens & rewards"
        description="Read-only view of your reward tokens earned at school."
      />

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <StatsCard
          title="Total tokens"
          value={mockTokens.total}
          icon={Award}
          description="Since the beginning of the year"
          change="+3 this week"
          changeType="positive"
        />
        <StatsCard
          title="This month"
          value={mockTokens.thisMonth}
          icon={Gift}
          description="Reflects positive behaviour and achievements"
        />
      </div>

      <Card className="p-4">
        <h3 className="section-title mb-4">Recent rewards</h3>
        {mockTokens.history.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            When teachers award tokens in class, they will appear here together with a short
            description.
          </p>
        ) : (
          <div className="space-y-3 text-sm">
            {mockTokens.history.map((item) => (
              <div
                key={item.id}
                className="border border-border rounded-md px-3 py-2 flex items-center justify-between gap-3 bg-muted/40"
              >
                <div>
                  <p className="font-medium">{item.reason}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.date} • {item.teacher}
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-600">
                  +{item.amount} tokens
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default StudentTokens;