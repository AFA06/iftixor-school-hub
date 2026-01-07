import { PageHeader, StatusBadge } from "@/components/common/CommonComponents";
import { Card } from "@/components/ui/card";
import { useContracts } from "@/hooks/useApi";

export default function FinanceContracts() {
  const { data: contracts } = useContracts();

  return (
    <div className="page-container">
      <PageHeader
        title="Contracts"
        description="Enrollment and service contracts with parents."
      />

      <Card className="p-4">
        <h3 className="section-title mb-4">Parent contracts</h3>
        {!contracts || contracts.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Contracts prepared by administration will be listed here.
          </p>
        ) : (
          <div className="overflow-x-auto text-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="py-2 pr-4 text-left font-medium">Title</th>
                  <th className="py-2 pr-4 text-left font-medium">Parent</th>
                  <th className="py-2 pr-4 text-left font-medium">Student</th>
                  <th className="py-2 pr-4 text-left font-medium">Created</th>
                  <th className="py-2 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((c) => (
                  <tr key={c.id} className="border-b border-border/60 last:border-0">
                    <td className="py-2 pr-4">{c.title}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{c.parentName}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{c.studentName}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{c.createdAt}</td>
                    <td className="py-2">
                      <StatusBadge status={c.status} />
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
