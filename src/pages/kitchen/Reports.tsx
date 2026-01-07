import { PageHeader, StatsCard } from "@/components/common/CommonComponents";
import { Card } from "@/components/ui/card";
import { UtensilsCrossed, Users, CreditCard } from "lucide-react";

export default function KitchenReports() {
  const totalMeals = 245;
  const activeStudents = 230;
  const unpaidBalances = 15;

  return (
    <div className="page-container">
      <PageHeader
        title="Kitchen reports"
        description="Summary view of meal service and student participation."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard title="Meals today" value={totalMeals} icon={UtensilsCrossed} />
        <StatsCard title="Active students" value={activeStudents} icon={Users} />
        <StatsCard title="Unpaid balances" value={unpaidBalances} icon={CreditCard} />
      </div>

      <Card className="p-4">
        <h3 className="section-title mb-2">Notes</h3>
        <p className="text-sm text-muted-foreground">
          These kitchen KPIs are based on mock data. In production, this section would provide
          exportable reports on portions served, special diets, and payment coverage by class.
        </p>
      </Card>
    </div>
  );
}
