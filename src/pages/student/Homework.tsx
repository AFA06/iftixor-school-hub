import { PageHeader } from '@/components/common/CommonComponents';
import { Card } from '@/components/ui/card';
import { useHomework } from '@/hooks/useApi';
import { BookOpen } from 'lucide-react';

const StudentHomework = () => {
  const { data: homework } = useHomework();

  return (
    <div className="page-container">
      <PageHeader
        title="Homework"
        description="Read-only overview of upcoming and recent homework."
      />

      <Card className="p-4">
        <h3 className="section-title mb-4 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          Assigned homework
        </h3>
        {!homework || homework.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Homework assigned to you by your teachers will appear here. Deadlines and descriptions
            come directly from the teacher module in Iftixor.
          </p>
        ) : (
          <div className="space-y-3">
            {homework.slice(0, 15).map((task) => (
              <div
                key={task.id}
                className="border border-border rounded-md px-3 py-2 flex flex-col gap-1 bg-muted/40"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">{task.title}</p>
                  <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {task.subjectName} • {task.type}
                </p>
                {task.description && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {task.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default StudentHomework;