import { PageHeader, StatsCard } from '@/components/common/CommonComponents';
import { useDashboardStats, useInvoices, usePaymentChartData } from '@/hooks/useApi';
import { Receipt, CreditCard, AlertCircle, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const FinanceDashboard = () => {
  const { data: stats } = useDashboardStats('finance');
  const { data: invoices } = useInvoices();
  const { data: chartData } = usePaymentChartData();

  const formatCurrency = (value: number) => new Intl.NumberFormat('uz-UZ').format(value) + ' UZS';

  return (
    <div className="page-container">
      <PageHeader title="Finance Dashboard" description="Track payments and invoices" />
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total Revenue" value={formatCurrency(stats?.totalRevenue || 0)} icon={TrendingUp} />
        <StatsCard title="Pending Payments" value={formatCurrency(stats?.pendingPayments || 0)} icon={CreditCard} />
        <StatsCard title="Unpaid Invoices" value={stats?.unpaidInvoices || 0} icon={Receipt} />
        <StatsCard title="Overdue" value={invoices?.filter(i => i.status === 'overdue').length || 0} icon={AlertCircle} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-elevated p-6">
          <h3 className="section-title">Payment Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v/1000000}M`} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Bar dataKey="collected" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-elevated p-6">
          <h3 className="section-title">Recent Invoices</h3>
          <div className="space-y-3">
            {invoices?.slice(0, 5).map((inv) => (
              <div key={inv.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">{inv.studentName}</p>
                  <p className="text-sm text-muted-foreground">{inv.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(inv.amount)}</p>
                  <span className={`status-badge ${inv.status === 'paid' ? 'bg-success/10 text-success' : inv.status === 'overdue' ? 'bg-destructive/10 text-destructive' : 'bg-warning/10 text-warning'}`}>
                    {inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;
