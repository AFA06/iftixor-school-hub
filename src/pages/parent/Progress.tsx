import { useMemo, useState } from 'react';
import { PageHeader, StatsCard } from '@/components/common/CommonComponents';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStudents, useGrades, useAttendance } from '@/hooks/useApi';
import { GraduationCap, BarChart3, UserCheck } from 'lucide-react';

const ParentProgress = () => {
  const { data: students } = useStudents();
  const { data: grades } = useGrades();
  const { data: attendance } = useAttendance();
  const [selectedStudentId, setSelectedStudentId] = useState<string | undefined>();

  const childOptions = useMemo(() => students || [], [students]);

  const activeStudent = useMemo(
    () => childOptions.find((s) => !selectedStudentId || s.id === selectedStudentId),
    [childOptions, selectedStudentId]
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

  const attendanceSummary = useMemo(() => {
    const entries = attendance?.filter((a) => a.studentId === activeStudent?.id) || [];
    const total = entries.length || 0;
    const present = entries.filter((a) => a.status === 'Present').length;
    return { total, present, rate: total ? Math.round((present / total) * 100) : null };
  }, [attendance, activeStudent]);

  return (
    <div className="page-container">
      <PageHeader
        title="Progress overview"
        description="Read-only view of your child's academic progress and attendance."
      />

      <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] gap-6 mb-8">
        <Card className="p-4 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <div>
              <p className="text-xs uppercase text-muted-foreground mb-1">Child</p>
              <Select
                value={activeStudent?.id}
                onValueChange={(v) => setSelectedStudentId(v)}
              >
                <SelectTrigger className="w-[220px]">
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
            {activeStudent && (
              <div className="text-sm text-muted-foreground">
                <p>
                  Class: <span className="font-medium text-foreground">{activeStudent.class}</span>
                </p>
              </div>
            )}
          </div>
        </Card>

        <div className="grid sm:grid-cols-3 gap-4">
          <StatsCard
            title="Class"
            value={activeStudent?.class || '–'}
            icon={GraduationCap}
          />
          <StatsCard
            title="Attendance rate"
            value={
              attendanceSummary.rate !== null
                ? `${attendanceSummary.rate}%`
                : 'Not enough data'
            }
            icon={UserCheck}
          />
          <StatsCard
            title="Average grade"
            value={averageGrade !== null ? `${averageGrade}%` : 'No grades yet'}
            icon={BarChart3}
          />
        </div>
      </div>

      <Card className="p-4">
        <h3 className="section-title mb-4">Recent grades</h3>
        {studentGrades.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No grades are available yet. As teachers publish results, they will appear here.
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
                {studentGrades.slice(0, 10).map((g) => (
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

export default ParentProgress;