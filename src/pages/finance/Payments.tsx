import { PageHeader } from "@/components/common/CommonComponents";
import { Card } from "@/components/ui/card";
import { usePayments } from "@/hooks/useApi";

export default function FinancePayments() {
  const { data: payments } = usePayments();

  return (
    <div className="page-container">
      <PageHeader
        title="Payments"
        description="Overview of recent incoming payments and receipts."
      />

      <Card className="p-4">
        <h3 className="section-title mb-4">Recent payments</h3>
        {!payments || payments.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Payments recorded by the finance team will appear here.
          </p>
        ) : (
          <div className="space-y-3 text-sm">
            {payments.map((p) => (
              <div
                key={p.id}
                className="border border-border rounded-md px-3 py-2 flex items-center justify-between gap-3 bg-muted/40"
              >
                <div>
                  <p className="font-medium">{p.studentName}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.date} • Receipt {p.receiptNumber}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{p.amount.toLocaleString()} UZS</p>
                  <p className="text-xs text-muted-foreground">{p.method}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
