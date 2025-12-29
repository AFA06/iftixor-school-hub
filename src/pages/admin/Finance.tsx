import { useState } from 'react';
import { Search, DollarSign, TrendingUp, TrendingDown, AlertCircle, Eye, Download, Receipt } from 'lucide-react';
import { PageHeader, DataTableSkeleton, EmptyState, StatusBadge, StatsCard } from '@/components/common/CommonComponents';
import { useInvoices, usePayments, useDashboardStats, usePaymentChartData } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Invoice, Payment } from '@/api/mock';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--warning))', 'hsl(var(--destructive))'];

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const { data: stats, isLoading: statsLoading } = useDashboardStats('admin');
  const { data: invoices, isLoading: invoicesLoading } = useInvoices();
  const { data: payments, isLoading: paymentsLoading } = usePayments();
  const { data: paymentChart } = usePaymentChartData();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('uz-UZ').format(value) + ' UZS';
  };

  const filteredInvoices = invoices?.filter(invoice => {
    const matchesSearch = invoice.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.parentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    const matchesType = typeFilter === 'all' || invoice.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewReceipt = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsReceiptOpen(true);
  };

  // Calculate pie chart data
  const pieData = invoices ? [
    { name: 'Paid', value: invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0) },
    { name: 'Pending', value: invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0) },
    { name: 'Overdue', value: invoices.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.amount, 0) },
  ] : [];

  const totalCollected = payments?.reduce((sum, p) => sum + p.amount, 0) || 0;
  const totalOutstanding = invoices?.filter(i => i.status !== 'paid').reduce((sum, i) => sum + i.amount, 0) || 0;
  const totalOverdue = invoices?.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.amount, 0) || 0;

  if (statsLoading) {
    return (
      <div className="page-container">
        <PageHeader title="Finance Overview" description="Financial summary and payment tracking" />
        <DataTableSkeleton />
      </div>
    );
  }

  return (
    <div className="page-container">
      <PageHeader 
        title="Finance Overview" 
        description="Financial summary and payment tracking"
      />

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Collected"
          value={formatCurrency(totalCollected)}
          icon={DollarSign}
          change="+12%"
          changeType="positive"
          description="this month"
        />
        <StatsCard
          title="Outstanding"
          value={formatCurrency(totalOutstanding)}
          icon={TrendingUp}
          description="pending payments"
        />
        <StatsCard
          title="Overdue"
          value={formatCurrency(totalOverdue)}
          icon={AlertCircle}
          change={`${invoices?.filter(i => i.status === 'overdue').length || 0} invoices`}
          changeType="negative"
        />
        <StatsCard
          title="Unpaid Invoices"
          value={stats?.unpaidInvoices || 0}
          icon={Receipt}
          description="require attention"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Monthly Payments Chart */}
            <div className="card-elevated p-6">
              <h3 className="font-semibold mb-4">Monthly Payments</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={paymentChart}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v/1000000}M`} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Bar dataKey="collected" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Collected" />
                    <Bar dataKey="pending" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} name="Pending" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Payment Status Pie Chart */}
            <div className="card-elevated p-6">
              <h3 className="font-semibold mb-4">Payment Status Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                {pieData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                    <span className="text-sm text-muted-foreground">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="card-elevated p-6 lg:col-span-2">
              <h3 className="font-semibold mb-4">Recent Transactions</h3>
              <div className="space-y-4">
                {payments?.slice(0, 5).map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <p className="font-medium">{payment.studentName}</p>
                        <p className="text-sm text-muted-foreground">{payment.date} • {payment.method}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-success">+{formatCurrency(payment.amount)}</p>
                      <p className="text-xs text-muted-foreground">{payment.receiptNumber}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by student or parent..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="tuition">Tuition</SelectItem>
                <SelectItem value="meal">Meal</SelectItem>
                <SelectItem value="bus">Bus</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {invoicesLoading ? (
            <DataTableSkeleton />
          ) : filteredInvoices?.length === 0 ? (
            <EmptyState
              title="No invoices found"
              description="Try adjusting your search or filters."
            />
          ) : (
            <div className="card-elevated overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Student / Parent</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Due Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices?.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-medium">{invoice.studentName}</p>
                            <p className="text-sm text-muted-foreground">{invoice.parentName}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="capitalize px-2 py-1 rounded-full bg-muted text-xs font-medium">
                            {invoice.type}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-medium">{formatCurrency(invoice.amount)}</td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">{invoice.dueDate}</td>
                        <td className="px-4 py-4">
                          <StatusBadge 
                            status={invoice.status === 'paid' ? 'success' : invoice.status === 'overdue' ? 'error' : 'warning'}
                          >
                            {invoice.status}
                          </StatusBadge>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments">
          {paymentsLoading ? (
            <DataTableSkeleton />
          ) : payments?.length === 0 ? (
            <EmptyState
              title="No payments found"
              description="Payment history will appear here."
            />
          ) : (
            <div className="card-elevated overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Receipt #</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Student</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Method</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Date</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments?.map((payment) => (
                      <tr key={payment.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                        <td className="px-4 py-4 font-medium text-primary">{payment.receiptNumber}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-semibold text-primary">
                                {payment.studentName.charAt(0)}
                              </span>
                            </div>
                            <span className="font-medium">{payment.studentName}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 font-semibold text-success">{formatCurrency(payment.amount)}</td>
                        <td className="px-4 py-4">
                          <span className="capitalize px-2 py-1 rounded-full bg-muted text-xs font-medium">
                            {payment.method}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">{payment.date}</td>
                        <td className="px-4 py-4 text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleViewReceipt(payment)}>
                            <Receipt className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Receipt Modal */}
      <Dialog open={isReceiptOpen} onOpenChange={setIsReceiptOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Payment Receipt</DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="py-4">
              <div className="border border-border rounded-lg p-6 space-y-4">
                <div className="text-center border-b border-border pb-4">
                  <h3 className="font-bold text-lg text-primary">Iftixor School</h3>
                  <p className="text-sm text-muted-foreground">Payment Receipt</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Receipt No:</span>
                    <span className="font-medium">{selectedPayment.receiptNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">{selectedPayment.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Student:</span>
                    <span className="font-medium">{selectedPayment.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Method:</span>
                    <span className="font-medium capitalize">{selectedPayment.method}</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="font-medium">Amount:</span>
                    <span className="font-bold text-lg text-primary">{formatCurrency(selectedPayment.amount)}</span>
                  </div>
                </div>
                <div className="text-center pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">Thank you for your payment!</p>
                </div>
              </div>
              <Button className="w-full mt-4 btn-gradient">
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
