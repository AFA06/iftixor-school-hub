import { useState } from "react";
import { PageHeader, StatusBadge } from "@/components/common/CommonComponents";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useInvoices } from "@/hooks/useApi";

const statusOptions = [
  { value: "", label: "All" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "overdue", label: "Overdue" },
];

export default function FinanceInvoices() {
  const [statusFilter, setStatusFilter] = useState<string>("");
  const { data: invoices } = useInvoices(statusFilter || undefined);

  return (
    <div className="page-container">
      <PageHeader
        title="Invoices"
        description="Review and filter all tuition, meal and bus invoices."
      />

      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <div className="flex-1 max-w-xs">
            <p className="text-xs text-muted-foreground mb-1">Status</p>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((opt) => (
                  <SelectItem key={opt.value || "all"} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="section-title mb-4">Invoice list</h3>
        {!invoices || invoices.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No invoices match the selected filter.
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
                {invoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-border/60 last:border-0">
                    <td className="py-2 pr-4">
                      <div className="flex flex-col">
                        <span className="font-medium">{inv.studentName}</span>
                        <span className="text-xs text-muted-foreground">{inv.parentName}</span>
                      </div>
                    </td>
                    <td className="py-2 pr-4 text-muted-foreground">{inv.type}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{inv.dueDate}</td>
                    <td className="py-2 pr-4 text-right font-medium">
                      {inv.amount.toLocaleString()} UZS
                    </td>
                    <td className="py-2">
                      <StatusBadge
                        status={inv.status}
                        variant={
                          inv.status === "paid"
                            ? "success"
                            : inv.status === "overdue"
                            ? "error"
                            : "warning"
                        }
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
