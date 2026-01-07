import { PageHeader, StatsCard } from "@/components/common/CommonComponents";
import { Card } from "@/components/ui/card";
import { useInvoices, usePayments } from "@/hooks/useApi";
import { Receipt, CreditCard, AlertCircle, BarChart3 } from "lucide-react";

export default function FinanceReports() {
  const { data: invoices } = useInvoices();
  const { data: payments } = usePayments();

  const totalInvoiced = (invoices || []).reduce((sum, i) => sum + i.amount, 0);
  const totalPaid = (payments || []).reduce((sum, p) => sum + p.amount, 0);
  const outstanding = totalInvoiced - totalPaid;

  const paidCount = (invoices || []).filter((i) => i.status === "paid").length;
  const overdueCount = (invoices || []).filter((i) => i.status === "overdue").length;

  return (
    <div className="page-container">
      <PageHeader
        title="Finance reports"
        description="High-level summary of billing and collections."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total invoiced" value={totalInvoiced.toLocaleString() + " UZS"} icon={Receipt} />
        <StatsCard title="Total paid" value={totalPaid.toLocaleString() + " UZS"} icon={CreditCard} />
        <StatsCard title="Outstanding" value={outstanding.toLocaleString() + " UZS"} icon={AlertCircle} />
        <StatsCard title="Paid / Overdue" value={`${paidCount} / ${overdueCount}`} icon={BarChart3} />
      </div>

      <Card className="p-4">
        <h3 className="section-title mb-2">Notes</h3>
        <p className="text-sm text-muted-foreground">
          This finance report is based on mock data from the admin demo. In a real deployment, this
          view would include export to Excel/CSV, advanced filters and period comparisons.
        </p>
      </Card>
    </div>
  );
}
