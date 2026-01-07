import { PageHeader, StatsCard } from '@/components/common/CommonComponents';
import { useStudents, useAttendance, useGrades } from '@/hooks/useApi';
import { useAuthStore } from '@/store/authStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { GraduationCap, UserCheck, BarChart3, Megaphone } from 'lucide-react';
import { useMemo, useState } from 'react';

export const ParentDashboard = () => {
  const { user } = useAuthStore();
  const { data: students } = useStudents();
  const { data: attendance } = useAttendance();
  const { data: grades } = useGrades();
  const [selectedStudentId, setSelectedStudentId] = useState<string | undefined>(undefined);

  const childOptions = useMemo(
    () => students || [],
    [students]
  );

  const activeStudent = useMemo(
    () => childOptions.find((s) => !selectedStudentId || s.id === selectedStudentId),
    [childOptions, selectedStudentId]
  );

  const todayAttendance = useMemo(
    () => attendance?.find((a) => a.studentId === activeStudent?.id),
    [attendance, activeStudent]
  );

  const studentGrades = useMemo(
    () => grades?.filter((g) => g.studentId === activeStudent?.id) || [],
    [grades, activeStudent]
  );

  const averageGrade = useMemo(() => {
    if (!studentGrades.length) return null;
    const sum = studentGrades.reduce((acc, g) => acc + (g.grade / g.maxGrade) * 100, 0);
    return Math.round(sum / studentGrades.length);
  }, [studentGrades]);

  return (
    <div className="page-container">
      <PageHeader
        title="Parent Dashboard"
        description="Overview of your child's school life"
      />

      {/* Child selector + summary */}
      <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] gap-6 mb-8">
        <Card className="p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs uppercase text-muted-foreground mb-1">Logged in as</p>
              <p className="font-medium">{user?.name}</p>
            </div>
            <div className="w-px h-10 bg-border hidden sm:block" />
            <div className="flex-1 min-w-[200px]">
              <p className="text-xs uppercase text-muted-foreground mb-1">Child</p>
              <Select
                value={activeStudent?.id}
                onValueChange={(v) => setSelectedStudentId(v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select child" />
                </SelectTrigger>
                <SelectContent>
                  {childOptions.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name} — {s.class}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <div className="grid sm:grid-cols-3 gap-4">
          <StatsCard
            title="Class"
            value={activeStudent?.class || '–'}
            icon={GraduationCap}
          />
          <StatsCard
            title="Attendance today"
            value={todayAttendance?.status ? todayAttendance.status : 'Pending'}
            icon={UserCheck}
          />
          <StatsCard
            title="Average grade"
            value={averageGrade !== null ? `${averageGrade}%` : 'No data'}
            icon={BarChart3}
          />
        </div>
      </div>

      {/* Grades + announcements */}
      <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] gap-6">
        <Card className="p-4">
          <h3 className="section-title mb-4">Recent grades</h3>
          {studentGrades.length === 0 ? (
            <p className="text-sm text-muted-foreground">No grades available yet.</p>
          ) : (
            <div className="space-y-3">
              {studentGrades.slice(0, 5).map((g) => (
                <div key={g.id} className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm">
                  <div>
                    <p className="font-medium">{g.subjectName}</p>
                    <p className="text-xs text-muted-foreground">{g.type} • {g.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{g.grade}/{g.maxGrade}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-4">
          <h3 className="section-title mb-4 flex items-center gap-2">
            <Megaphone className="h-4 w-4 text-primary" />
            Announcements
          </h3>
          <p className="text-sm text-muted-foreground">
            Announcements from school administration and teachers will appear here. For now, this is a
            demo space showing how communication is surfaced on the web; parents primarily receive
            push notifications in the mobile app.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default ParentDashboard;
