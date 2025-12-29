import { PageHeader, StatsCard } from '@/components/common/CommonComponents';
import { useDashboardStats, useHomework, useClasses } from '@/hooks/useApi';
import { BookOpen, Users, ClipboardList, Calendar } from 'lucide-react';

export const TeacherDashboard = () => {
  const { data: stats } = useDashboardStats('teacher');
  const { data: homework } = useHomework();
  const { data: classes } = useClasses();

  return (
    <div className="page-container">
      <PageHeader title="Teacher Dashboard" description="Manage your classes and assignments" />
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard title="My Classes" value={classes?.length || 0} icon={Users} />
        <StatsCard title="Active Homework" value={homework?.filter(h => h.status === 'active').length || 0} icon={BookOpen} />
        <StatsCard title="Pending Grades" value="12" icon={ClipboardList} />
        <StatsCard title="Today's Lessons" value="4" icon={Calendar} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-elevated p-6">
          <h3 className="section-title">Today's Schedule</h3>
          <div className="space-y-3">
            {['Math - 7A (9:00)', 'Physics - 8A (10:00)', 'Math - 8B (11:30)', 'Physics - 9A (14:00)'].map((lesson, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>{lesson}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-elevated p-6">
          <h3 className="section-title">Recent Homework</h3>
          <div className="space-y-3">
            {homework?.slice(0, 4).map((hw) => (
              <div key={hw.id} className="p-3 rounded-lg bg-muted/50">
                <p className="font-medium">{hw.title}</p>
                <p className="text-sm text-muted-foreground">{hw.className} • Due: {hw.dueDate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
