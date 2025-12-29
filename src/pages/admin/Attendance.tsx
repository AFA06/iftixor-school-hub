import { useState } from 'react';
import { Search, Calendar, Filter, Eye, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import { PageHeader, DataTableSkeleton, EmptyState, StatusBadge, StatsCard } from '@/components/common/CommonComponents';
import { useAttendance, useClasses } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { format } from 'date-fns';
import { Attendance } from '@/api/mock';

// Mock student attendance history
const generateAttendanceHistory = (studentId: string) => {
  const history: { date: string; status: 'present' | 'absent' | 'late'; checkInTime?: string }[] = [];
  const today = new Date();
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    if (date.getDay() === 0 || date.getDay() === 6) continue; // Skip weekends
    
    const rand = Math.random();
    let status: 'present' | 'absent' | 'late';
    let checkInTime: string | undefined;
    
    if (rand < 0.8) {
      status = 'present';
      checkInTime = `08:${String(Math.floor(Math.random() * 30) + 15).padStart(2, '0')}`;
    } else if (rand < 0.9) {
      status = 'late';
      checkInTime = `09:${String(Math.floor(Math.random() * 30)).padStart(2, '0')}`;
    } else {
      status = 'absent';
    }
    
    history.push({
      date: format(date, 'yyyy-MM-dd'),
      status,
      checkInTime,
    });
  }
  
  return history;
};

export default function AttendancePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [classFilter, setClassFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Attendance | null>(null);

  const { data: attendance, isLoading } = useAttendance();
  const { data: classes } = useClasses();

  const filteredAttendance = attendance?.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = classFilter === 'all' || record.class === classFilter;
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesSearch && matchesClass && matchesStatus;
  });

  const stats = {
    present: attendance?.filter(a => a.status === 'present').length || 0,
    late: attendance?.filter(a => a.status === 'late').length || 0,
    absent: attendance?.filter(a => a.status === 'absent').length || 0,
    total: attendance?.length || 0,
  };

  const handleViewDetails = (record: Attendance) => {
    setSelectedStudent(record);
    setIsDetailDrawerOpen(true);
  };

  const studentHistory = selectedStudent ? generateAttendanceHistory(selectedStudent.studentId) : [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'late':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  if (isLoading) {
    return (
      <div className="page-container">
        <PageHeader title="Attendance" description="Track student attendance and check-in records" />
        <DataTableSkeleton />
      </div>
    );
  }

  return (
    <div className="page-container">
      <PageHeader 
        title="Attendance" 
        description="Track student attendance and check-in records (Hikvision integration)"
      />

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Present"
          value={stats.present}
          icon={CheckCircle}
          description={`${Math.round((stats.present / stats.total) * 100)}% of students`}
        />
        <StatsCard
          title="Late"
          value={stats.late}
          icon={Clock}
          description={`${Math.round((stats.late / stats.total) * 100)}% of students`}
        />
        <StatsCard
          title="Absent"
          value={stats.absent}
          icon={XCircle}
          description={`${Math.round((stats.absent / stats.total) * 100)}% of students`}
        />
        <StatsCard
          title="Not Scanned"
          value={0}
          icon={AlertCircle}
          description="Pending check-in"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by student name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-[180px]"
        />
        <Select value={classFilter} onValueChange={setClassFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            {classes?.map(cls => (
              <SelectItem key={cls.id} value={cls.name}>{cls.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="present">Present</SelectItem>
            <SelectItem value="late">Late</SelectItem>
            <SelectItem value="absent">Absent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Attendance Table */}
      {filteredAttendance?.length === 0 ? (
        <EmptyState
          title="No attendance records found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <div className="card-elevated overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Student</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Class</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Check-in Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Source</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Notes</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendance?.map((record) => (
                  <tr key={record.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">
                            {record.studentName.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium">{record.studentName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm">{record.class}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(record.status)}
                        <StatusBadge 
                          status={record.status === 'present' ? 'success' : record.status === 'late' ? 'warning' : 'error'}
                        >
                          {record.status}
                        </StatusBadge>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">
                      {record.checkInTime || '-'}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                        Hikvision
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">
                      {record.status === 'late' ? 'Late arrival' : '-'}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleViewDetails(record)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Student Detail Drawer */}
      <Sheet open={isDetailDrawerOpen} onOpenChange={setIsDetailDrawerOpen}>
        <SheetContent className="sm:max-w-[500px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Attendance Details</SheetTitle>
          </SheetHeader>
          {selectedStudent && (
            <div className="mt-6 space-y-6">
              {/* Student Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-primary">
                    {selectedStudent.studentName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{selectedStudent.studentName}</h3>
                  <p className="text-sm text-muted-foreground">Class {selectedStudent.class}</p>
                </div>
              </div>

              {/* Today's Status */}
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Today's Status</span>
                  <StatusBadge 
                    status={selectedStudent.status === 'present' ? 'success' : selectedStudent.status === 'late' ? 'warning' : 'error'}
                  >
                    {selectedStudent.status}
                  </StatusBadge>
                </div>
                {selectedStudent.checkInTime && (
                  <p className="text-sm">Check-in: <strong>{selectedStudent.checkInTime}</strong></p>
                )}
              </div>

              {/* Monthly Stats */}
              <div>
                <h4 className="font-semibold mb-3">This Month</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg bg-success/10 text-center">
                    <p className="text-2xl font-bold text-success">
                      {studentHistory.filter(h => h.status === 'present').length}
                    </p>
                    <p className="text-xs text-muted-foreground">Present</p>
                  </div>
                  <div className="p-3 rounded-lg bg-warning/10 text-center">
                    <p className="text-2xl font-bold text-warning">
                      {studentHistory.filter(h => h.status === 'late').length}
                    </p>
                    <p className="text-xs text-muted-foreground">Late</p>
                  </div>
                  <div className="p-3 rounded-lg bg-destructive/10 text-center">
                    <p className="text-2xl font-bold text-destructive">
                      {studentHistory.filter(h => h.status === 'absent').length}
                    </p>
                    <p className="text-xs text-muted-foreground">Absent</p>
                  </div>
                </div>
              </div>

              {/* Calendar View (Simplified) */}
              <div>
                <h4 className="font-semibold mb-3">Attendance History</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {studentHistory.slice(0, 15).map((record, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(record.status)}
                        <span className="text-sm">{format(new Date(record.date), 'EEE, MMM d')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge 
                          status={record.status === 'present' ? 'success' : record.status === 'late' ? 'warning' : 'error'}
                        >
                          {record.status}
                        </StatusBadge>
                        {record.checkInTime && (
                          <span className="text-xs text-muted-foreground">{record.checkInTime}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
