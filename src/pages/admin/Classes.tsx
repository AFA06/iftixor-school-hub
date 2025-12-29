import { useState } from 'react';
import { Plus, Search, Eye, Pencil, Trash2, Users, BookOpen, GraduationCap } from 'lucide-react';
import { PageHeader, DataTableSkeleton, EmptyState, StatusBadge } from '@/components/common/CommonComponents';
import { useClasses, useTeachers, useStudents } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { Badge } from '@/components/ui/badge';
import { Class, Subject } from '@/api/mock';

// Mock subjects
const mockSubjects: Subject[] = [
  { id: 'sub1', name: 'Mathematics', code: 'MATH', teacherId: 't1', teacherName: 'Murod Aliyev' },
  { id: 'sub2', name: 'English', code: 'ENG', teacherId: 't2', teacherName: 'Nilufar Qodirova' },
  { id: 'sub3', name: 'Physics', code: 'PHY', teacherId: 't1', teacherName: 'Murod Aliyev' },
  { id: 'sub4', name: 'Chemistry', code: 'CHM', teacherId: 't3', teacherName: 'Sardor Mirzayev' },
  { id: 'sub5', name: 'Biology', code: 'BIO', teacherId: 't3', teacherName: 'Sardor Mirzayev' },
  { id: 'sub6', name: 'History', code: 'HIS', teacherId: 't4', teacherName: 'Dilfuza Saidova' },
  { id: 'sub7', name: 'Geography', code: 'GEO', teacherId: 't4', teacherName: 'Dilfuza Saidova' },
  { id: 'sub8', name: 'Computer Science', code: 'CS', teacherId: 't5', teacherName: 'Kamol Usmanov' },
];

export default function ClassesPage() {
  const [activeTab, setActiveTab] = useState('classes');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [isViewClassOpen, setIsViewClassOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const { data: classes, isLoading: classesLoading } = useClasses();
  const { data: teachers } = useTeachers();
  const { data: students } = useStudents();

  const filteredClasses = classes?.filter(cls =>
    cls.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSubjects = mockSubjects.filter(sub =>
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewClass = (cls: Class) => {
    setSelectedClass(cls);
    setIsViewClassOpen(true);
  };

  const handleAddClass = () => {
    toast.success('Class created successfully');
    setIsAddClassOpen(false);
  };

  const handleAddSubject = () => {
    toast.success('Subject added successfully');
    setIsAddSubjectOpen(false);
  };

  const handleDeleteClass = (cls: Class) => {
    setSelectedClass(cls);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    toast.success(`${selectedClass?.name || selectedSubject?.name} deleted successfully`);
    setIsDeleteDialogOpen(false);
    setSelectedClass(null);
    setSelectedSubject(null);
  };

  const getClassStudents = (className: string) => {
    return students?.filter(s => s.class === className) || [];
  };

  return (
    <div className="page-container">
      <PageHeader 
        title="Classes & Subjects" 
        description="Manage school classes and academic subjects"
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="classes">Classes ({classes?.length || 0})</TabsTrigger>
          <TabsTrigger value="subjects">Subjects ({mockSubjects.length})</TabsTrigger>
        </TabsList>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => activeTab === 'classes' ? setIsAddClassOpen(true) : setIsAddSubjectOpen(true)} className="btn-gradient">
            <Plus className="h-4 w-4 mr-2" />
            Add {activeTab === 'classes' ? 'Class' : 'Subject'}
          </Button>
        </div>

        {/* Classes Tab */}
        <TabsContent value="classes">
          {classesLoading ? (
            <DataTableSkeleton />
          ) : filteredClasses?.length === 0 ? (
            <EmptyState
              title="No classes found"
              description="Get started by creating your first class."
            />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClasses?.map((cls) => (
                <div key={cls.id} className="card-elevated p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleViewClass(cls)}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); }}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleDeleteClass(cls); }}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{cls.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">Grade {cls.grade}, Section {cls.section}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{cls.studentCount} students</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span>{cls.teacherName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>{cls.subjects.length} subjects</span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1">
                    {cls.subjects.slice(0, 3).map(sub => (
                      <Badge key={sub} variant="secondary" className="text-xs">
                        {sub}
                      </Badge>
                    ))}
                    {cls.subjects.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{cls.subjects.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Subjects Tab */}
        <TabsContent value="subjects">
          {filteredSubjects.length === 0 ? (
            <EmptyState
              title="No subjects found"
              description="Get started by adding your first subject."
            />
          ) : (
            <div className="card-elevated overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Subject</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Code</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Teacher</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Classes</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubjects.map((subject) => {
                      const subjectClasses = classes?.filter(c => c.subjects.includes(subject.name)) || [];
                      return (
                        <tr key={subject.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <BookOpen className="h-4 w-4 text-primary" />
                              </div>
                              <span className="font-medium">{subject.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <Badge variant="outline">{subject.code}</Badge>
                          </td>
                          <td className="px-4 py-4 text-sm text-muted-foreground">{subject.teacherName}</td>
                          <td className="px-4 py-4">
                            <div className="flex flex-wrap gap-1">
                              {subjectClasses.slice(0, 3).map(c => (
                                <Badge key={c.id} variant="secondary" className="text-xs">{c.name}</Badge>
                              ))}
                              {subjectClasses.length > 3 && (
                                <Badge variant="outline" className="text-xs">+{subjectClasses.length - 3}</Badge>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => { setSelectedSubject(subject); setIsDeleteDialogOpen(true); }}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Add Class Modal */}
      <Dialog open={isAddClassOpen} onOpenChange={setIsAddClassOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Class</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="grade">Grade</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(g => (
                      <SelectItem key={g} value={g.toString()}>Grade {g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="section">Section</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    {['A', 'B', 'C', 'D'].map(s => (
                      <SelectItem key={s} value={s}>Section {s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="teacher">Main Teacher</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachers?.map(t => (
                    <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Subjects</Label>
              <div className="flex flex-wrap gap-2 p-3 border rounded-lg">
                {mockSubjects.map(sub => (
                  <Badge key={sub.id} variant="outline" className="cursor-pointer hover:bg-primary/10">
                    {sub.name}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Click to select subjects</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddClassOpen(false)}>Cancel</Button>
            <Button onClick={handleAddClass} className="btn-gradient">Create Class</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Subject Modal */}
      <Dialog open={isAddSubjectOpen} onOpenChange={setIsAddSubjectOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Subject</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="subjectName">Subject Name</Label>
              <Input id="subjectName" placeholder="e.g., Mathematics" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subjectCode">Subject Code</Label>
              <Input id="subjectCode" placeholder="e.g., MATH" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subjectTeacher">Assign Teacher</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachers?.map(t => (
                    <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddSubjectOpen(false)}>Cancel</Button>
            <Button onClick={handleAddSubject} className="btn-gradient">Add Subject</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Class Drawer */}
      <Sheet open={isViewClassOpen} onOpenChange={setIsViewClassOpen}>
        <SheetContent className="sm:max-w-[500px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Class Details</SheetTitle>
          </SheetHeader>
          {selectedClass && (
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl">{selectedClass.name}</h3>
                  <p className="text-muted-foreground">Grade {selectedClass.grade}, Section {selectedClass.section}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Main Teacher</span>
                  <span className="font-medium">{selectedClass.teacherName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Total Students</span>
                  <span className="font-medium">{selectedClass.studentCount}</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Subjects ({selectedClass.subjects.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedClass.subjects.map(sub => (
                    <Badge key={sub} variant="secondary">{sub}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Students</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {getClassStudents(selectedClass.name).length === 0 ? (
                    <p className="text-sm text-muted-foreground">No students enrolled</p>
                  ) : (
                    getClassStudents(selectedClass.name).map(student => (
                      <div key={student.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
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
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {selectedClass ? 'Class' : 'Subject'}</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedClass?.name || selectedSubject?.name}? This action cannot be undone.
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
