import { PageHeader } from '@/components/common/CommonComponents';
import { Card } from '@/components/ui/card';
import { useClasses } from '@/hooks/useApi';
import { useMemo } from 'react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const mockTimetable = [
  { day: 'Monday', time: '08:30 - 09:15', subject: 'Mathematics', room: '201' },
  { day: 'Monday', time: '09:25 - 10:10', subject: 'English', room: '204' },
  { day: 'Tuesday', time: '08:30 - 09:15', subject: 'Physics', room: '305' },
  { day: 'Wednesday', time: '10:30 - 11:15', subject: 'History', room: '103' },
  { day: 'Thursday', time: '11:25 - 12:10', subject: 'Computer Science', room: 'Lab 1' },
  { day: 'Friday', time: '09:25 - 10:10', subject: 'Biology', room: '307' },
];

export const StudentTimetable = () => {
  const { data: classes } = useClasses();
  const currentClass = useMemo(() => classes?.[0], [classes]);

  return (
    <div className="page-container">
      <PageHeader
        title="Timetable"
        description="Read-only view of your weekly schedule"
      />

      {currentClass && (
        <p className="text-sm text-muted-foreground mb-4">
          Showing example timetable for class <span className="font-medium">{currentClass.name}</span>.
        </p>
      )}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {days.map((day) => (
          <Card key={day} className="p-4">
            <h3 className="font-semibold mb-3">{day}</h3>
            <div className="space-y-2 text-sm">
              {mockTimetable
                .filter((slot) => slot.day === day)
                .map((slot, idx) => (
                  <div
                    key={idx}
                    className="border border-border rounded-md px-3 py-2 flex flex-col gap-1 bg-muted/40"
                  >
                    <span className="text-xs text-muted-foreground">{slot.time}</span>
                    <span className="font-medium">{slot.subject}</span>
                    <span className="text-xs text-muted-foreground">Room {slot.room}</span>
                  </div>
                ))}
              {mockTimetable.filter((slot) => slot.day === day).length === 0 && (
                <p className="text-xs text-muted-foreground">No lessons configured for this day.</p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentTimetable;
