import { PageHeader, StatusBadge } from "@/components/common/CommonComponents";
import { Card } from "@/components/ui/card";
import { useInvoices } from "@/hooks/useApi";

export default function FinanceDebts() {
  const { data: invoices } = useInvoices();
  const debts = (invoices || []).filter((i) => i.status !== "paid");

  const totalDebt = debts.reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="page-container">
      <PageHeader
        title="Debts"
        description="Focus view of unpaid and overdue invoices."
      />

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <Card className="p-4 flex flex-col gap-1">
          <p className="text-xs text-muted-foreground">Open items</p>
          <p className="text-2xl font-semibold">{debts.length}</p>
        </Card>
        <Card className="p-4 flex flex-col gap-1">
          <p className="text-xs text-muted-foreground">Total outstanding</p>
          <p className="text-2xl font-semibold">{totalDebt.toLocaleString()} UZS</p>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="section-title mb-4">Unpaid invoices</h3>
        {debts.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            There are no unpaid invoices at the moment.
          </p>
        ) : (
          <div className="overflow-x-auto text-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="py-2 pr-4 text-left font-medium">Student</th>
                  <th className="py-2 pr-4 text-left font-medium">Type</th>
                  <th className="py-2 pr-4 text-left font-medium">Due</th>
                  <th className="py-2 pr-4 text-right font-medium">Amount</th>
                  <th className="py-2 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {debts.map((inv) => (
                  <tr key={inv.id} className="border-b border-border/60 last:border-0">
                    <td className="py-2 pr-4">{inv.studentName}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{inv.type}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{inv.dueDate}</td>
                    <td className="py-2 pr-4 text-right font-medium">
                      {inv.amount.toLocaleString()} UZS
                    </td>
                    <td className="py-2">
                      <StatusBadge
                        status={inv.status}
                        variant={inv.status === "overdue" ? "error" : "warning"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
