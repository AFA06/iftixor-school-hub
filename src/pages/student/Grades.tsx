import { useMemo } from 'react';
import { PageHeader } from '@/components/common/CommonComponents';
import { Card } from '@/components/ui/card';
import { useGrades } from '@/hooks/useApi';
import { BarChart3 } from 'lucide-react';

const StudentGrades = () => {
  const { data: grades } = useGrades();

  const average = useMemo(() => {
    if (!grades || grades.length === 0) return null;
    const sum = grades.reduce((acc, g) => acc + (g.grade / g.maxGrade) * 100, 0);
    return Math.round(sum / grades.length);
  }, [grades]);

  return (
    <div className="page-container">
      <PageHeader
        title="Grades"
        description="Read-only list of your recent grades as recorded by teachers."
      />

      <div className="grid md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-6 mb-6">
        <Card className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs uppercase text-muted-foreground mb-1">Average</p>
            <p className="font-semibold text-foreground">
              {average !== null ? `${average}%` : 'Not enough data yet'}
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="section-title mb-4">Recent results</h3>
        {!grades || grades.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Once your teachers start recording marks in Iftixor, they will appear here.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="py-2 pr-4 text-left font-medium">Subject</th>
                  <th className="py-2 pr-4 text-left font-medium">Type</th>
                  <th className="py-2 pr-4 text-left font-medium">Date</th>
                  <th className="py-2 text-right font-medium">Result</th>
                </tr>
              </thead>
              <tbody>
                {grades.slice(0, 15).map((g) => (
                  <tr key={g.id} className="border-b border-border/60 last:border-0">
                    <td className="py-2 pr-4">{g.subjectName}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{g.type}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{g.date}</td>
                    <td className="py-2 text-right font-medium">
                      {g.grade}/{g.maxGrade}
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
};

export default StudentGrades;