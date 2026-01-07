import { useMemo, useState } from 'react';
import { PageHeader, StatusBadge } from '@/components/common/CommonComponents';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStudents, useAttendance } from '@/hooks/useApi';
import { CalendarDays, UserCheck } from 'lucide-react';

const ParentAttendance = () => {
  const { data: students } = useStudents();
  const { data: attendance } = useAttendance();
  const [selectedStudentId, setSelectedStudentId] = useState<string | undefined>();

  const childOptions = useMemo(() => students || [], [students]);
  const activeStudent = useMemo(
    () => childOptions.find((s) => !selectedStudentId || s.id === selectedStudentId),
    [childOptions, selectedStudentId]
  );

  const studentAttendance = useMemo(
    () => attendance?.filter((a) => a.studentId === activeStudent?.id) || [],
    [attendance, activeStudent]
  );

  return (
    <div className="page-container">
      <PageHeader
        title="Attendance"
        description="Read-only view of your child's attendance records."
      />

      <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)] gap-6 mb-8">
        <Card className="p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
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
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              Attendance is recorded by teachers and administrators in real time.
            </div>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
            <UserCheck className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs uppercase text-muted-foreground mb-1">Today&apos;s status</p>
            {studentAttendance[0] ? (
              <StatusBadge
                status={studentAttendance[0].status}
                variant={
                  studentAttendance[0].status === 'Present'
                    ? 'success'
                    : studentAttendance[0].status === 'Late'
                    ? 'warning'
                    : 'error'
                }
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                Today&apos;s attendance has not been recorded yet.
              </p>
            )}
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="section-title mb-4">Recent attendance</h3>
        {studentAttendance.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Once attendance is marked for your child, it will appear here. Historical records are
            available in the mobile app.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="py-2 pr-4 text-left font-medium">Date</th>
                  <th className="py-2 pr-4 text-left font-medium">Lesson / session</th>
                  <th className="py-2 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {studentAttendance.slice(0, 20).map((entry) => (
                  <tr key={entry.id} className="border-b border-border/60 last:border-0">
                    <td className="py-2 pr-4">{entry.date}</td>
                    <td className="py-2 pr-4 text-muted-foreground">
                      {entry.lesson || 'Full day'}
                    </td>
                    <td className="py-2">
                      <StatusBadge
                        status={entry.status}
                        variant={
                          entry.status === 'Present'
                            ? 'success'
                            : entry.status === 'Late'
                            ? 'warning'
                            : 'error'
                        }
                      />
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

export default ParentAttendance;