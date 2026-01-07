import { PageHeader } from "@/components/common/CommonComponents";
import { Card } from "@/components/ui/card";
import { useMealPlans } from "@/hooks/useApi";

const dayNames = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function KitchenMeals() {
  const { data: mealPlans } = useMealPlans();

  return (
    <div className="page-container">
      <PageHeader
        title="Meal plans"
        description="Weekly overview of planned breakfasts, lunches and snacks."
      />

      <Card className="p-4">
        <h3 className="section-title mb-4">This week's menu</h3>
        {!mealPlans || mealPlans.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Meal plans configured by the kitchen will appear here.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mealPlans.map((meal) => (
              <div key={meal.id} className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-semibold text-primary mb-2">
                  {dayNames[meal.dayOfWeek]} • Week {meal.weekNumber}
                </h4>
                <div className="space-y-1 text-sm">
                  <div>
                    <span className="text-muted-foreground">Breakfast: </span>
                    {meal.breakfast}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Lunch: </span>
                    {meal.lunch}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Snack: </span>
                    {meal.snack}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
