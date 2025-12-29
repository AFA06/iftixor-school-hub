import { Users, GraduationCap, UserCheck, Receipt, TrendingUp, TrendingDown } from 'lucide-react';
import { StatsCard, PageHeader, DataTableSkeleton } from '@/components/common/CommonComponents';
import { useDashboardStats, useAttendanceChartData, usePaymentChartData, useAttendance } from '@/hooks/useApi';
import { useAuthStore } from '@/store/authStore';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export const AdminDashboard = () => {
  const { user } = useAuthStore();
  const { data: stats, isLoading: statsLoading } = useDashboardStats('admin');
  const { data: attendanceChart } = useAttendanceChartData();
  const { data: paymentChart } = usePaymentChartData();
  const { data: recentAttendance } = useAttendance();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('uz-UZ').format(value) + ' UZS';
  };

  if (statsLoading) {
    return (
      <div className="page-container">
        <PageHeader title="Dashboard" description="Welcome back!" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card-elevated p-6">
              <div className="skeleton h-4 w-24 mb-4" />
              <div className="skeleton h-8 w-16" />
            </div>
          ))}
        </div>
        <DataTableSkeleton />
      </div>
    );
  }

  return (
    <div className="page-container">
      <PageHeader 
        title={`Welcome back, ${user?.name?.split(' ')[0]}!`} 
        description="Here's what's happening at your school today."
      />

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Students"
          value={stats?.totalStudents || 0}
          icon={GraduationCap}
          change="+12"
          changeType="positive"
          description="this month"
        />
        <StatsCard
          title="Total Teachers"
          value={stats?.totalTeachers || 0}
          icon={Users}
          change="+2"
          changeType="positive"
          description="this month"
        />
        <StatsCard
          title="Attendance Today"
          value={`${stats?.attendanceToday || 0}%`}
          icon={UserCheck}
          change="-2%"
          changeType="negative"
          description="vs yesterday"
        />
        <StatsCard
          title="Unpaid Invoices"
          value={stats?.unpaidInvoices || 0}
          icon={Receipt}
          change="3 overdue"
          changeType="negative"
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Attendance Chart */}
        <div className="card-elevated p-6">
          <h3 className="section-title">Weekly Attendance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceChart}>
                <defs>
                  <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Area type="monotone" dataKey="present" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorPresent)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payments Chart */}
        <div className="card-elevated p-6">
          <h3 className="section-title">Monthly Payments</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paymentChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v/1000000}M`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Bar dataKey="collected" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card-elevated">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold">Recent Attendance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Student</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Class</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Check-in</th>
              </tr>
            </thead>
            <tbody>
              {recentAttendance?.slice(0, 5).map((record) => (
                <tr key={record.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-4 text-sm font-medium">{record.studentName}</td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">{record.class}</td>
                  <td className="px-4 py-4">
                    <span className={`status-badge ${
                      record.status === 'present' ? 'bg-success/10 text-success' :
                      record.status === 'late' ? 'bg-warning/10 text-warning' :
                      'bg-destructive/10 text-destructive'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">{record.checkInTime || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
