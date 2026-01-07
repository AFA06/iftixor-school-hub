import { PageHeader } from "@/components/common/CommonComponents";
import { Card } from "@/components/ui/card";
import { usePerformanceChartData } from "@/hooks/useApi";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function TeacherAnalytics() {
  const { data: chartData } = usePerformanceChartData();

  return (
    <div className="page-container">
      <PageHeader
        title="Class analytics"
        description="High-level overview of performance trends across your classes."
      />

      <Card className="p-4">
        <h3 className="section-title mb-4">Average performance by class</h3>
        {!chartData ? (
          <p className="text-sm text-muted-foreground">
            Analytics data will appear here as students complete more assessments.
          </p>
        ) : (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v}%`} />
                <Tooltip formatter={(value: number) => `${value}%`} />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>
    </div>
  );
}
