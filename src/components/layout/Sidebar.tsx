import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import { UserRole } from '@/api/mock';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  UserCheck,
  Gift,
  Library,
  Bus,
  FileText,
  BarChart3,
  GraduationCap,
  ClipboardList,
  FolderOpen,
  MessageSquare,
  Receipt,
  CreditCard,
  AlertCircle,
  FileSignature,
  ChefHat,
  UtensilsCrossed,
  ListChecks,
  X,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const adminNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Classes & Subjects', href: '/admin/classes', icon: BookOpen },
  { label: 'Timetable', href: '/admin/timetable', icon: Calendar },
  { label: 'Attendance', href: '/admin/attendance', icon: UserCheck },
  { label: 'Tokens & Rewards', href: '/admin/rewards', icon: Gift },
  { label: 'Library', href: '/admin/library', icon: Library },
  { label: 'Bus & Routes', href: '/admin/bus', icon: Bus },
  { label: 'Finance Overview', href: '/admin/finance', icon: Receipt },
  { label: 'Reports', href: '/admin/reports', icon: FileText },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

const teacherNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/teacher', icon: LayoutDashboard },
  { label: 'My Classes', href: '/teacher/classes', icon: GraduationCap },
  { label: 'Gradebook', href: '/teacher/gradebook', icon: ClipboardList },
  { label: 'Homework', href: '/teacher/homework', icon: BookOpen },
  { label: 'Materials', href: '/teacher/materials', icon: FolderOpen },
  { label: 'Teacher Groups', href: '/teacher/groups', icon: MessageSquare },
  { label: 'Analytics', href: '/teacher/analytics', icon: BarChart3 },
];

const financeNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/finance', icon: LayoutDashboard },
  { label: 'Invoices', href: '/finance/invoices', icon: Receipt },
  { label: 'Payments', href: '/finance/payments', icon: CreditCard },
  { label: 'Debts', href: '/finance/debts', icon: AlertCircle },
  { label: 'Contracts', href: '/finance/contracts', icon: FileSignature },
  { label: 'Reports', href: '/finance/reports', icon: FileText },
];

const kitchenNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/kitchen', icon: LayoutDashboard },
  { label: 'Meal Plans', href: '/kitchen/meals', icon: UtensilsCrossed },
  { label: 'Student Meals', href: '/kitchen/students', icon: ListChecks },
  { label: 'Payments', href: '/kitchen/payments', icon: CreditCard },
  { label: 'Reports', href: '/kitchen/reports', icon: FileText },
];

const parentNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/parent', icon: LayoutDashboard },
  { label: 'Progress', href: '/parent/progress', icon: BarChart3 },
  { label: 'Attendance', href: '/parent/attendance', icon: UserCheck },
  { label: 'Bus', href: '/parent/bus', icon: Bus },
  { label: 'Payments', href: '/parent/payments', icon: CreditCard },
  { label: 'Messages', href: '/parent/messages', icon: MessageSquare },
  { label: 'Documents', href: '/parent/documents', icon: FileSignature },
];

const studentNavItems: NavItem[] = [
  { label: 'Timetable', href: '/student/timetable', icon: Calendar },
  { label: 'Grades', href: '/student/grades', icon: ClipboardList },
  { label: 'Homework', href: '/student/homework', icon: BookOpen },
  { label: 'Library', href: '/student/library', icon: Library },
  { label: 'Tokens & Rewards', href: '/student/tokens', icon: Gift },
];

const getNavItemsByRole = (role: UserRole): NavItem[] => {
  switch (role) {
    case 'admin':
      return adminNavItems;
    case 'teacher':
      return teacherNavItems;
    case 'finance':
      return financeNavItems;
    case 'kitchen':
      return kitchenNavItems;
    case 'parent':
      return parentNavItems;
    case 'student':
      return studentNavItems;
    default:
      return [];
  }
};

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const { user } = useAuthStore();
  const navItems = user ? getNavItemsByRole(user.role) : [];

  const roleLabels: Record<UserRole, string> = {
    admin: 'Admin Panel',
    teacher: 'Teacher Panel',
    finance: 'Finance Panel',
    kitchen: 'Kitchen Panel',
    parent: 'Parent Portal',
    student: 'Student Portal',
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 h-screen w-64 bg-sidebar border-r border-sidebar-border z-50 flex flex-col transition-transform duration-300 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow">
              <span className="text-primary-foreground font-bold text-lg">I</span>
            </div>
            <div>
              <h1 className="font-bold text-sidebar-foreground">Iftixor</h1>
              <p className="text-xs text-muted-foreground">{user ? roleLabels[user.role] : 'School'}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
              const Icon = item.icon;
              
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    )}
                  >
                    <Icon className={cn('h-5 w-5', isActive && 'text-sidebar-primary-foreground')} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-sidebar-accent/50">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-muted-foreground capitalize">
                {user?.role || 'Guest'}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
