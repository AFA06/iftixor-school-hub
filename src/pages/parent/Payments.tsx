import { useMemo } from 'react';
import { PageHeader, StatusBadge } from '@/components/common/CommonComponents';
import { Card } from '@/components/ui/card';
import { useInvoices, usePayments } from '@/hooks/useApi';
import { CreditCard, Receipt, Wallet } from 'lucide-react';

const ParentPayments = () => {
  const { data: invoices } = useInvoices();
  const { data: payments } = usePayments();

  const outstanding = useMemo(
    () => (invoices || []).filter((i) => i.status !== 'Paid'),
    [invoices]
  );
  const paid = useMemo(
    () => (invoices || []).filter((i) => i.status === 'Paid'),
    [invoices]
  );

  const totalOutstanding = outstanding.reduce((sum, i) => sum + i.amount, 0);
  const totalPaid = paid.reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="page-container">
      <PageHeader
        title="Payments & invoices"
        description="Read-only overview of school invoices and payment history."
      />

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Card className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Receipt className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs uppercase text-muted-foreground mb-1">Open invoices</p>
            <p className="font-semibold text-foreground">
              {outstanding.length} invoice{outstanding.length === 1 ? '' : 's'}
            </p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <Wallet className="h-5 w-5 text-emerald-500" />
          </div>
          <div>
            <p className="text-xs uppercase text-muted-foreground mb-1">Outstanding</p>
            <p className="font-semibold text-foreground">
              {totalOutstanding.toLocaleString()} UZS
            </p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-xs uppercase text-muted-foreground mb-1">Paid this year</p>
            <p className="font-semibold text-foreground">
              {totalPaid.toLocaleString()} UZS
            </p>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)] gap-6">
        <Card className="p-4">
          <h3 className="section-title mb-4">Invoices</h3>
          {invoices && invoices.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border text-xs text-muted-foreground">
                    <th className="py-2 pr-4 text-left font-medium">Date</th>
                    <th className="py-2 pr-4 text-left font-medium">Description</th>
                    <th className="py-2 pr-4 text-right font-medium">Amount</th>
                    <th className="py-2 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="border-b border-border/60 last:border-0">
                      <td className="py-2 pr-4">{inv.date}</td>
                      <td className="py-2 pr-4 text-muted-foreground">{inv.description}</td>
                      <td className="py-2 pr-4 text-right font-medium">
                        {inv.amount.toLocaleString()} UZS
                      </td>
                      <td className="py-2">
                        <StatusBadge
                          status={inv.status}
                          variant={
                            inv.status === 'Paid'
                              ? 'success'
                              : inv.status === 'Overdue'
                              ? 'error'
                              : 'warning'
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Invoices generated for your child will appear here. For now, this is a demo view using
              mock data from the admin finance module.
            </p>
          )}
        </Card>

        <Card className="p-4">
          <h3 className="section-title mb-4">Recent payments</h3>
          {payments && payments.length > 0 ? (
            <div className="space-y-3 text-sm">
              {payments.slice(0, 6).map((p) => (
                <div
                  key={p.id}
                  className="border border-border rounded-md px-3 py-2 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{p.method}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.date} • Ref {p.reference}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{p.amount.toLocaleString()} UZS</p>
                    <p className="text-xs text-muted-foreground">{p.status}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              When payments are recorded by the finance team, they will appear here for quick
              reference.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ParentPayments;