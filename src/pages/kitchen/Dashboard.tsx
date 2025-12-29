import { PageHeader, StatsCard } from '@/components/common/CommonComponents';
import { useMealPlans } from '@/hooks/useApi';
import { UtensilsCrossed, Users, CreditCard, Calendar } from 'lucide-react';

const dayNames = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const KitchenDashboard = () => {
  const { data: mealPlans } = useMealPlans();

  return (
    <div className="page-container">
      <PageHeader title="Kitchen Dashboard" description="Manage meal plans and student meals" />
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Meals Today" value="245" icon={UtensilsCrossed} />
        <StatsCard title="Active Students" value="230" icon={Users} />
        <StatsCard title="Unpaid Balances" value="15" icon={CreditCard} />
        <StatsCard title="This Week" value="Week 52" icon={Calendar} />
      </div>

      <div className="card-elevated p-6">
        <h3 className="section-title">This Week's Menu</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mealPlans?.map((meal) => (
            <div key={meal.id} className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-semibold text-primary mb-3">{dayNames[meal.dayOfWeek]}</h4>
              <div className="space-y-2 text-sm">
                <div><span className="text-muted-foreground">Breakfast:</span> {meal.breakfast}</div>
                <div><span className="text-muted-foreground">Lunch:</span> {meal.lunch}</div>
                <div><span className="text-muted-foreground">Snack:</span> {meal.snack}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KitchenDashboard;
