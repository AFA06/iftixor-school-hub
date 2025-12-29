import { useState } from 'react';
import { Search, Plus, MoreHorizontal, Eye, Pencil, UserX, UserCheck, Trash2, Filter, X } from 'lucide-react';
import { PageHeader, DataTableSkeleton, EmptyState, StatusBadge } from '@/components/common/CommonComponents';
import { useStudents, useTeachers } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Student, Teacher, Parent, Staff } from '@/api/mock';

// Mock parents and staff data
const mockParents: Parent[] = [
  { id: 'p1', name: 'Karim Karimov', email: 'karim@parent.com', phone: '+998901234567', studentIds: ['s1'] },
  { id: 'p2', name: 'Toshmat Toshmatov', email: 'toshmat@parent.com', phone: '+998901234568', studentIds: ['s2'] },
  { id: 'p3', name: 'Umar Umarov', email: 'umar@parent.com', phone: '+998901234569', studentIds: ['s3'] },
  { id: 'p4', name: 'Salim Salimov', email: 'salim@parent.com', phone: '+998901234570', studentIds: ['s4'] },
  { id: 'p5', name: 'Rahim Rahimov', email: 'rahim@parent.com', phone: '+998901234571', studentIds: ['s5'] },
];

const mockStaff: Staff[] = [
  { id: 'st1', name: 'Akbar Turaev', email: 'akbar@staff.com', phone: '+998903333331', department: 'Administration', position: 'Secretary', status: 'active' },
  { id: 'st2', name: 'Nodira Yusupova', email: 'nodira@staff.com', phone: '+998903333332', department: 'Finance', position: 'Accountant', status: 'active' },
  { id: 'st3', name: 'Jamshid Olimov', email: 'jamshid@staff.com', phone: '+998903333333', department: 'IT', position: 'System Administrator', status: 'active' },
  { id: 'st4', name: 'Malika Ergasheva', email: 'malika@staff.com', phone: '+998903333334', department: 'Kitchen', position: 'Head Chef', status: 'active' },
];

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState('students');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [classFilter, setClassFilter] = useState<string>('all');
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  
  const { data: students, isLoading: studentsLoading } = useStudents();
  const { data: teachers, isLoading: teachersLoading } = useTeachers();

  const handleView = (user: any) => {
    setSelectedUser(user);
    setIsViewDrawerOpen(true);
  };

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSuspend = (user: any) => {
    setSelectedUser(user);
    setIsSuspendDialogOpen(true);
  };

  const handleDelete = (user: any) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmSuspend = () => {
    toast.success(`${selectedUser?.name} has been ${selectedUser?.status === 'active' ? 'suspended' : 'activated'}`);
    setIsSuspendDialogOpen(false);
    setSelectedUser(null);
  };

  const confirmDelete = () => {
    toast.success(`${selectedUser?.name} has been deleted`);
    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const handleAddUser = () => {
    toast.success('User added successfully');
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = () => {
    toast.success('User updated successfully');
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const filteredStudents = students?.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    const matchesClass = classFilter === 'all' || student.class === classFilter;
    return matchesSearch && matchesStatus && matchesClass;
  });

  const filteredTeachers = teachers?.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || teacher.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredParents = mockParents.filter(parent => 
    parent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    parent.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStaff = mockStaff.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         staff.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || staff.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const classes = ['7-A', '7-B', '8-A', '8-B', '9-A'];

  return (
    <div className="page-container">
      <PageHeader 
        title="Users Management" 
        description="Manage students, parents, teachers, and staff members"
      >
        <Button onClick={() => setIsAddModalOpen(true)} className="btn-gradient">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </PageHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="students">Students ({students?.length || 0})</TabsTrigger>
          <TabsTrigger value="parents">Parents ({mockParents.length})</TabsTrigger>
          <TabsTrigger value="teachers">Teachers ({teachers?.length || 0})</TabsTrigger>
          <TabsTrigger value="staff">Staff ({mockStaff.length})</TabsTrigger>
        </TabsList>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          {activeTab === 'students' && (
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {classes.map(cls => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Students Tab */}
        <TabsContent value="students">
          {studentsLoading ? (
            <DataTableSkeleton />
          ) : filteredStudents?.length === 0 ? (
            <EmptyState
              title="No students found"
              description="Try adjusting your search or filters to find what you're looking for."
            />
          ) : (
            <div className="card-elevated overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Class</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Phone</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Parent</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Enrolled</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents?.map((student) => (
                      <tr key={student.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-semibold text-primary">
                                {student.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-sm">{student.name}</p>
                              <p className="text-xs text-muted-foreground">{student.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm">{student.class}</td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">{student.phone}</td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">{student.parentName}</td>
                        <td className="px-4 py-4">
                          <StatusBadge status={student.status === 'active' ? 'success' : 'error'}>
                            {student.status}
                          </StatusBadge>
                        </td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">{student.enrolledAt}</td>
                        <td className="px-4 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-popover">
                              <DropdownMenuItem onClick={() => handleView(student)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEdit(student)}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSuspend(student)}>
                                {student.status === 'active' ? (
                                  <>
                                    <UserX className="h-4 w-4 mr-2" />
                                    Suspend
                                  </>
                                ) : (
                                  <>
                                    <UserCheck className="h-4 w-4 mr-2" />
                                    Activate
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(student)} className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Parents Tab */}
        <TabsContent value="parents">
          {filteredParents.length === 0 ? (
            <EmptyState
              title="No parents found"
              description="Try adjusting your search to find what you're looking for."
            />
          ) : (
            <div className="card-elevated overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Phone</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Children</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredParents.map((parent) => (
                      <tr key={parent.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-semibold text-primary">
                                {parent.name.charAt(0)}
                              </span>
                            </div>
                            <p className="font-medium text-sm">{parent.name}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">{parent.email}</td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">{parent.phone}</td>
                        <td className="px-4 py-4 text-sm">{parent.studentIds.length} student(s)</td>
                        <td className="px-4 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-popover">
                              <DropdownMenuItem onClick={() => handleView(parent)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEdit(parent)}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(parent)} className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Teachers Tab */}
        <TabsContent value="teachers">
          {teachersLoading ? (
            <DataTableSkeleton />
          ) : filteredTeachers?.length === 0 ? (
            <EmptyState
              title="No teachers found"
              description="Try adjusting your search or filters to find what you're looking for."
            />
          ) : (
            <div className="card-elevated overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Subjects</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Classes</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Phone</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Joined</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeachers?.map((teacher) => (
                      <tr key={teacher.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-semibold text-primary">
                                {teacher.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-sm">{teacher.name}</p>
                              <p className="text-xs text-muted-foreground">{teacher.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-1">
                            {teacher.subjects.slice(0, 2).map(s => (
                              <span key={s} className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                                {s}
                              </span>
                            ))}
                            {teacher.subjects.length > 2 && (
                              <span className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
                                +{teacher.subjects.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">
                          {teacher.classes.join(', ')}
                        </td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">{teacher.phone}</td>
                        <td className="px-4 py-4">
                          <StatusBadge status={teacher.status === 'active' ? 'success' : 'error'}>
                            {teacher.status}
                          </StatusBadge>
                        </td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">{teacher.joinedAt}</td>
                        <td className="px-4 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-popover">
                              <DropdownMenuItem onClick={() => handleView(teacher)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEdit(teacher)}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSuspend(teacher)}>
                                {teacher.status === 'active' ? (
                                  <>
                                    <UserX className="h-4 w-4 mr-2" />
                                    Suspend
                                  </>
                                ) : (
                                  <>
                                    <UserCheck className="h-4 w-4 mr-2" />
                                    Activate
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(teacher)} className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Staff Tab */}
        <TabsContent value="staff">
          {filteredStaff.length === 0 ? (
            <EmptyState
              title="No staff found"
              description="Try adjusting your search or filters to find what you're looking for."
            />
          ) : (
            <div className="card-elevated overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Department</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Position</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Phone</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStaff.map((staff) => (
                      <tr key={staff.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-semibold text-primary">
                                {staff.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-sm">{staff.name}</p>
                              <p className="text-xs text-muted-foreground">{staff.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm">{staff.department}</td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">{staff.position}</td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">{staff.phone}</td>
                        <td className="px-4 py-4">
                          <StatusBadge status={staff.status === 'active' ? 'success' : 'error'}>
                            {staff.status}
                          </StatusBadge>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-popover">
                              <DropdownMenuItem onClick={() => handleView(staff)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEdit(staff)}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSuspend(staff)}>
                                {staff.status === 'active' ? (
                                  <>
                                    <UserX className="h-4 w-4 mr-2" />
                                    Suspend
                                  </>
                                ) : (
                                  <>
                                    <UserCheck className="h-4 w-4 mr-2" />
                                    Activate
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(staff)} className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Add User Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter full name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="+998901234567" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select defaultValue="student">
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="class">Class (for students)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map(cls => (
                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddUser} className="btn-gradient">Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input id="edit-name" defaultValue={selectedUser?.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input id="edit-email" type="email" defaultValue={selectedUser?.email} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-phone">Phone</Label>
              <Input id="edit-phone" defaultValue={selectedUser?.phone} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit} className="btn-gradient">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View User Drawer */}
      <Sheet open={isViewDrawerOpen} onOpenChange={setIsViewDrawerOpen}>
        <SheetContent className="sm:max-w-[400px]">
          <SheetHeader>
            <SheetTitle>User Details</SheetTitle>
          </SheetHeader>
          {selectedUser && (
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-primary">
                    {selectedUser.name?.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{selectedUser.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-medium">{selectedUser.phone}</span>
                </div>
                {selectedUser.class && (
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Class</span>
                    <span className="font-medium">{selectedUser.class}</span>
                  </div>
                )}
                {selectedUser.parentName && (
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Parent</span>
                    <span className="font-medium">{selectedUser.parentName}</span>
                  </div>
                )}
                {selectedUser.subjects && (
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Subjects</span>
                    <span className="font-medium">{selectedUser.subjects.join(', ')}</span>
                  </div>
                )}
                {selectedUser.department && (
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Department</span>
                    <span className="font-medium">{selectedUser.department}</span>
                  </div>
                )}
                {selectedUser.position && (
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Position</span>
                    <span className="font-medium">{selectedUser.position}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Status</span>
                  <StatusBadge status={selectedUser.status === 'active' ? 'success' : 'error'}>
                    {selectedUser.status || 'active'}
                  </StatusBadge>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => handleEdit(selectedUser)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="destructive" className="flex-1" onClick={() => handleDelete(selectedUser)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Suspend Confirmation Dialog */}
      <AlertDialog open={isSuspendDialogOpen} onOpenChange={setIsSuspendDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedUser?.status === 'active' ? 'Suspend User' : 'Activate User'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {selectedUser?.status === 'active' ? 'suspend' : 'activate'} {selectedUser?.name}? 
              {selectedUser?.status === 'active' && ' They will not be able to access the system.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSuspend} className={selectedUser?.status === 'active' ? 'bg-warning hover:bg-warning/90' : ''}>
              {selectedUser?.status === 'active' ? 'Suspend' : 'Activate'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
