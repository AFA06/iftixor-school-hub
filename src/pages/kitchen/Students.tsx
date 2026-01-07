import { PageHeader } from "@/components/common/CommonComponents";
import { Card } from "@/components/ui/card";

const mockStudents = [
  { id: "s1", name: "Aziza Karimova", className: "7-A", plan: "Full", status: "Active" },
  { id: "s2", name: "Bobur Toshmatov", className: "7-A", plan: "Lunch only", status: "Active" },
  { id: "s3", name: "Charos Umarova", className: "7-B", plan: "None", status: "Opted out" },
];

export default function KitchenStudents() {
  return (
    <div className="page-container">
      <PageHeader
        title="Student meals"
        description="Read-only view of which students are enrolled in school meals."
      />

      <Card className="p-4">
        <h3 className="section-title mb-4">Enrolment list</h3>
        <div className="overflow-x-auto text-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="py-2 pr-4 text-left font-medium">Student</th>
                <th className="py-2 pr-4 text-left font-medium">Class</th>
                <th className="py-2 pr-4 text-left font-medium">Plan</th>
                <th className="py-2 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockStudents.map((s) => (
                <tr key={s.id} className="border-b border-border/60 last:border-0">
                  <td className="py-2 pr-4">{s.name}</td>
                  <td className="py-2 pr-4 text-muted-foreground">{s.className}</td>
                  <td className="py-2 pr-4 text-muted-foreground">{s.plan}</td>
                  <td className="py-2 text-muted-foreground">{s.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
