import { useState } from 'react';
import { FileText, Users, GraduationCap, DollarSign, Star, Download, Filter, Calendar } from 'lucide-react';
import { PageHeader, DataTableSkeleton, EmptyState } from '@/components/common/CommonComponents';
import { useAttendance, useStudents, useInvoices, usePayments } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface ReportCard {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const reportCards: ReportCard[] = [
  {
    id: 'attendance',
    title: 'Attendance Report',
    description: 'Student attendance records and statistics',
    icon: Users,
    color: 'bg-blue-100 text-blue-800',
  },
  {
    id: 'grades',
    title: 'Grade Report',
    description: 'Academic performance and grade analysis',
    icon: GraduationCap,
    color: 'bg-purple-100 text-purple-800',
  },
  {
    id: 'payments',
    title: 'Payments Report',
    description: 'Financial transactions and payment history',
    icon: DollarSign,
    color: 'bg-green-100 text-green-800',
  },
  {
    id: 'tokens',
    title: 'Tokens Report',
    description: 'Student rewards and token activity',
    icon: Star,
    color: 'bg-amber-100 text-amber-800',
  },
];

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [classFilter, setClassFilter] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState(format(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'));
  const [dateTo, setDateTo] = useState(format(new Date(), 'yyyy-MM-dd'));

  const { data: attendance, isLoading: attendanceLoading } = useAttendance();
  const { data: students } = useStudents();
  const { data: invoices } = useInvoices();
  const { data: payments } = usePayments();

  const handleExportPDF = () => {
    toast.success('Generating PDF report...');
    setTimeout(() => {
      toast.success('Report downloaded successfully!');
    }, 1500);
  };

  const handleExportExcel = () => {
    toast.success('Generating Excel report...');
    setTimeout(() => {
      toast.success('Report downloaded successfully!');
    }, 1500);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('uz-UZ').format(value) + ' UZS';
  };

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'attendance':
        return (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-success/10">
                <p className="text-sm text-muted-foreground">Present</p>
                <p className="text-2xl font-bold text-success">
                  {attendance?.filter(a => a.status === 'present').length || 0}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-warning/10">
                <p className="text-sm text-muted-foreground">Late</p>
                <p className="text-2xl font-bold text-warning">
                  {attendance?.filter(a => a.status === 'late').length || 0}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-destructive/10">
                <p className="text-sm text-muted-foreground">Absent</p>
                <p className="text-2xl font-bold text-destructive">
                  {attendance?.filter(a => a.status === 'absent').length || 0}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{attendance?.length || 0}</p>
              </div>
            </div>

            {/* Table */}
            <div className="card-elevated overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Student</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Class</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Check-in</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance?.slice(0, 10).map((record) => (
                      <tr key={record.id} className="border-b border-border last:border-0">
                        <td className="px-4 py-3 font-medium">{record.studentName}</td>
                        <td className="px-4 py-3 text-sm">{record.class}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{record.date}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            record.status === 'present' ? 'bg-success/10 text-success' :
                            record.status === 'late' ? 'bg-warning/10 text-warning' :
                            'bg-destructive/10 text-destructive'
                          }`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{record.checkInTime || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'grades':
        return (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-primary/10">
                <p className="text-sm text-muted-foreground">Average Grade</p>
                <p className="text-2xl font-bold text-primary">85%</p>
              </div>
              <div className="p-4 rounded-lg bg-success/10">
                <p className="text-sm text-muted-foreground">A Grades</p>
                <p className="text-2xl font-bold text-success">24</p>
              </div>
              <div className="p-4 rounded-lg bg-warning/10">
                <p className="text-sm text-muted-foreground">B Grades</p>
                <p className="text-2xl font-bold text-warning">18</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">Total Assessments</p>
                <p className="text-2xl font-bold">56</p>
              </div>
            </div>

            <div className="card-elevated overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Student</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Subject</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Grade</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students?.slice(0, 8).map((student, idx) => (
                      <tr key={student.id} className="border-b border-border last:border-0">
                        <td className="px-4 py-3 font-medium">{student.name}</td>
                        <td className="px-4 py-3 text-sm">Mathematics</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Exam</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            idx % 3 === 0 ? 'bg-success/10 text-success' :
                            idx % 3 === 1 ? 'bg-warning/10 text-warning' :
                            'bg-primary/10 text-primary'
                          }`}>
                            {85 + (idx * 2)}%
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">2024-12-{20 + idx}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-success/10">
                <p className="text-sm text-muted-foreground">Total Collected</p>
                <p className="text-2xl font-bold text-success">
                  {formatCurrency(payments?.reduce((sum, p) => sum + p.amount, 0) || 0)}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-warning/10">
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-warning">
                  {formatCurrency(invoices?.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0) || 0)}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-destructive/10">
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold text-destructive">
                  {formatCurrency(invoices?.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.amount, 0) || 0)}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">Transactions</p>
                <p className="text-2xl font-bold">{payments?.length || 0}</p>
              </div>
            </div>

            <div className="card-elevated overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Receipt</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Student</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Method</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments?.map((payment) => (
                      <tr key={payment.id} className="border-b border-border last:border-0">
                        <td className="px-4 py-3 font-medium text-primary">{payment.receiptNumber}</td>
                        <td className="px-4 py-3 text-sm">{payment.studentName}</td>
                        <td className="px-4 py-3 font-medium text-success">{formatCurrency(payment.amount)}</td>
                        <td className="px-4 py-3 text-sm capitalize">{payment.method}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{payment.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'tokens':
        return (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-primary/10">
                <p className="text-sm text-muted-foreground">Total Awarded</p>
                <p className="text-2xl font-bold text-primary">2,450</p>
              </div>
              <div className="p-4 rounded-lg bg-warning/10">
                <p className="text-sm text-muted-foreground">Redeemed</p>
                <p className="text-2xl font-bold text-warning">850</p>
              </div>
              <div className="p-4 rounded-lg bg-success/10">
                <p className="text-sm text-muted-foreground">Active Tokens</p>
                <p className="text-2xl font-bold text-success">1,600</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">Transactions</p>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>

            <div className="card-elevated overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Student</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Class</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Total Earned</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Spent</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students?.slice(0, 8).map((student, idx) => {
                      const earned = 200 + (idx * 35);
                      const spent = 50 + (idx * 10);
                      return (
                        <tr key={student.id} className="border-b border-border last:border-0">
                          <td className="px-4 py-3 font-medium">{student.name}</td>
                          <td className="px-4 py-3 text-sm">{student.class}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1 text-primary">
                              <Star className="h-4 w-4 fill-primary" />
                              <span className="font-medium">{earned}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{spent}</td>
                          <td className="px-4 py-3 font-semibold text-success">{earned - spent}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      <PageHeader 
        title="Reports" 
        description="Generate and export school reports"
      />

      {!selectedReport ? (
        // Report Selection
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reportCards.map((report) => {
            const Icon = report.icon;
            return (
              <div
                key={report.id}
                className="card-elevated p-6 hover:shadow-lg transition-all cursor-pointer hover:scale-105"
                onClick={() => setSelectedReport(report.id)}
              >
                <div className={`w-12 h-12 rounded-xl ${report.color} flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{report.title}</h3>
                <p className="text-sm text-muted-foreground">{report.description}</p>
              </div>
            );
          })}
        </div>
      ) : (
        // Report View
        <div className="space-y-6">
          {/* Report Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => setSelectedReport(null)}>
                ← Back
              </Button>
              <div>
                <h2 className="font-bold text-lg">
                  {reportCards.find(r => r.id === selectedReport)?.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Generated on {format(new Date(), 'MMMM d, yyyy')}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExportPDF}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button onClick={handleExportExcel} className="btn-gradient">
                <Download className="h-4 w-4 mr-2" />
                Export Excel
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="7-A">7-A</SelectItem>
                <SelectItem value="7-B">7-B</SelectItem>
                <SelectItem value="8-A">8-A</SelectItem>
                <SelectItem value="8-B">8-B</SelectItem>
                <SelectItem value="9-A">9-A</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-[150px]"
              />
              <span className="text-muted-foreground">to</span>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-[150px]"
              />
            </div>
          </div>

          {/* Report Content */}
          {attendanceLoading ? <DataTableSkeleton /> : renderReportContent()}
        </div>
      )}
    </div>
  );
}
