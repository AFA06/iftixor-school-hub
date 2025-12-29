import { useState } from 'react';
import { Plus, Printer, ChevronLeft, ChevronRight, Pencil, Trash2, Save } from 'lucide-react';
import { PageHeader, DataTableSkeleton } from '@/components/common/CommonComponents';
import { useClasses, useTeachers } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
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

interface Lesson {
  id: string;
  day: number;
  timeSlot: number;
  subject: string;
  teacher: string;
  room: string;
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = [
  '08:00 - 08:45',
  '09:00 - 09:45',
  '10:00 - 10:45',
  '11:00 - 11:45',
  '12:00 - 12:45',
  '14:00 - 14:45',
  '15:00 - 15:45',
];

const subjects = ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Computer Science'];
const rooms = ['Room 101', 'Room 102', 'Room 103', 'Room 104', 'Lab 1', 'Lab 2', 'Computer Lab'];

// Mock timetable data
const mockTimetable: Lesson[] = [
  { id: '1', day: 0, timeSlot: 0, subject: 'Mathematics', teacher: 'Murod Aliyev', room: 'Room 101' },
  { id: '2', day: 0, timeSlot: 1, subject: 'English', teacher: 'Nilufar Qodirova', room: 'Room 101' },
  { id: '3', day: 0, timeSlot: 2, subject: 'Physics', teacher: 'Murod Aliyev', room: 'Lab 1' },
  { id: '4', day: 1, timeSlot: 0, subject: 'Chemistry', teacher: 'Sardor Mirzayev', room: 'Lab 2' },
  { id: '5', day: 1, timeSlot: 1, subject: 'Biology', teacher: 'Sardor Mirzayev', room: 'Lab 2' },
  { id: '6', day: 1, timeSlot: 2, subject: 'History', teacher: 'Dilfuza Saidova', room: 'Room 102' },
  { id: '7', day: 2, timeSlot: 0, subject: 'Geography', teacher: 'Dilfuza Saidova', room: 'Room 102' },
  { id: '8', day: 2, timeSlot: 1, subject: 'Computer Science', teacher: 'Kamol Usmanov', room: 'Computer Lab' },
  { id: '9', day: 2, timeSlot: 2, subject: 'Mathematics', teacher: 'Murod Aliyev', room: 'Room 101' },
  { id: '10', day: 3, timeSlot: 0, subject: 'English', teacher: 'Nilufar Qodirova', room: 'Room 101' },
  { id: '11', day: 3, timeSlot: 1, subject: 'Physics', teacher: 'Murod Aliyev', room: 'Lab 1' },
  { id: '12', day: 4, timeSlot: 0, subject: 'Chemistry', teacher: 'Sardor Mirzayev', room: 'Lab 2' },
  { id: '13', day: 4, timeSlot: 1, subject: 'History', teacher: 'Dilfuza Saidova', room: 'Room 102' },
  { id: '14', day: 4, timeSlot: 2, subject: 'Computer Science', teacher: 'Kamol Usmanov', room: 'Computer Lab' },
];

export default function TimetablePage() {
  const [selectedClass, setSelectedClass] = useState('7-A');
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [timetable, setTimetable] = useState<Lesson[]>(mockTimetable);
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);
  const [isEditLessonOpen, setIsEditLessonOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ day: number; timeSlot: number } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Form state
  const [formSubject, setFormSubject] = useState('');
  const [formTeacher, setFormTeacher] = useState('');
  const [formRoom, setFormRoom] = useState('');

  const { data: classes, isLoading } = useClasses();
  const { data: teachers } = useTeachers();

  const getLesson = (day: number, timeSlot: number) => {
    return timetable.find(l => l.day === day && l.timeSlot === timeSlot);
  };

  const formatWeekRange = () => {
    const startOfWeek = new Date(currentWeek);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 4);
    
    return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newDate);
  };

  const handleAddLesson = () => {
    if (!selectedSlot || !formSubject || !formTeacher || !formRoom) {
      toast.error('Please fill all fields');
      return;
    }

    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      day: selectedSlot.day,
      timeSlot: selectedSlot.timeSlot,
      subject: formSubject,
      teacher: formTeacher,
      room: formRoom,
    };

    setTimetable([...timetable, newLesson]);
    setHasChanges(true);
    toast.success('Lesson added');
    setIsAddLessonOpen(false);
    resetForm();
  };

  const handleEditLesson = () => {
    if (!selectedLesson || !formSubject || !formTeacher || !formRoom) {
      toast.error('Please fill all fields');
      return;
    }

    setTimetable(timetable.map(l => 
      l.id === selectedLesson.id 
        ? { ...l, subject: formSubject, teacher: formTeacher, room: formRoom }
        : l
    ));
    setHasChanges(true);
    toast.success('Lesson updated');
    setIsEditLessonOpen(false);
    resetForm();
  };

  const handleDeleteLesson = () => {
    if (!selectedLesson) return;
    setTimetable(timetable.filter(l => l.id !== selectedLesson.id));
    setHasChanges(true);
    toast.success('Lesson deleted');
    setIsDeleteDialogOpen(false);
    setSelectedLesson(null);
  };

  const handleSaveTimetable = () => {
    // Mock save
    toast.success('Timetable saved successfully');
    setHasChanges(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const openAddModal = (day: number, timeSlot: number) => {
    setSelectedSlot({ day, timeSlot });
    resetForm();
    setIsAddLessonOpen(true);
  };

  const openEditModal = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setFormSubject(lesson.subject);
    setFormTeacher(lesson.teacher);
    setFormRoom(lesson.room);
    setIsEditLessonOpen(true);
  };

  const resetForm = () => {
    setFormSubject('');
    setFormTeacher('');
    setFormRoom('');
    setSelectedSlot(null);
    setSelectedLesson(null);
  };

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      'Mathematics': 'bg-blue-100 border-blue-300 text-blue-800',
      'English': 'bg-purple-100 border-purple-300 text-purple-800',
      'Physics': 'bg-orange-100 border-orange-300 text-orange-800',
      'Chemistry': 'bg-green-100 border-green-300 text-green-800',
      'Biology': 'bg-emerald-100 border-emerald-300 text-emerald-800',
      'History': 'bg-amber-100 border-amber-300 text-amber-800',
      'Geography': 'bg-teal-100 border-teal-300 text-teal-800',
      'Computer Science': 'bg-indigo-100 border-indigo-300 text-indigo-800',
    };
    return colors[subject] || 'bg-gray-100 border-gray-300 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="page-container">
        <PageHeader title="Timetable" description="Manage weekly class schedules" />
        <DataTableSkeleton />
      </div>
    );
  }

  return (
    <div className="page-container">
      <PageHeader 
        title="Timetable" 
        description="Manage weekly class schedules"
      >
        <div className="flex gap-2">
          {hasChanges && (
            <Button onClick={handleSaveTimetable} className="btn-gradient">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          )}
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </PageHeader>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {classes?.map(cls => (
                <SelectItem key={cls.id} value={cls.name}>{cls.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => navigateWeek('prev')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium px-4">{formatWeekRange()}</span>
          <Button variant="outline" size="icon" onClick={() => navigateWeek('next')}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="card-elevated overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-border">
                <th className="w-24 px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase bg-muted/50">
                  Time
                </th>
                {days.map(day => (
                  <th key={day} className="px-2 py-3 text-center text-xs font-medium text-muted-foreground uppercase bg-muted/50">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot, slotIndex) => (
                <tr key={slotIndex} className="border-b border-border last:border-0">
                  <td className="px-4 py-2 text-sm font-medium text-muted-foreground bg-muted/30 whitespace-nowrap">
                    {slot}
                  </td>
                  {days.map((_, dayIndex) => {
                    const lesson = getLesson(dayIndex, slotIndex);
                    return (
                      <td key={dayIndex} className="px-2 py-2 h-24">
                        {lesson ? (
                          <div 
                            className={`h-full p-2 rounded-lg border cursor-pointer transition-all hover:shadow-md ${getSubjectColor(lesson.subject)}`}
                            onClick={() => openEditModal(lesson)}
                          >
                            <div className="font-semibold text-sm truncate">{lesson.subject}</div>
                            <div className="text-xs opacity-80 truncate">{lesson.teacher}</div>
                            <div className="text-xs opacity-60 truncate">{lesson.room}</div>
                          </div>
                        ) : (
                          <button
                            onClick={() => openAddModal(dayIndex, slotIndex)}
                            className="w-full h-full flex items-center justify-center rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-colors"
                          >
                            <Plus className="h-4 w-4 text-muted-foreground" />
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Lesson Modal */}
      <Dialog open={isAddLessonOpen} onOpenChange={setIsAddLessonOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Lesson</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedSlot && (
              <div className="p-3 bg-muted rounded-lg text-sm">
                <strong>{days[selectedSlot.day]}</strong> at <strong>{timeSlots[selectedSlot.timeSlot]}</strong>
              </div>
            )}
            <div className="grid gap-2">
              <Label>Subject</Label>
              <Select value={formSubject} onValueChange={setFormSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(sub => (
                    <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Teacher</Label>
              <Select value={formTeacher} onValueChange={setFormTeacher}>
                <SelectTrigger>
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachers?.map(t => (
                    <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Room</Label>
              <Select value={formRoom} onValueChange={setFormRoom}>
                <SelectTrigger>
                  <SelectValue placeholder="Select room" />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map(room => (
                    <SelectItem key={room} value={room}>{room}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddLessonOpen(false)}>Cancel</Button>
            <Button onClick={handleAddLesson} className="btn-gradient">Add Lesson</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Lesson Modal */}
      <Dialog open={isEditLessonOpen} onOpenChange={setIsEditLessonOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Lesson</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedLesson && (
              <div className="p-3 bg-muted rounded-lg text-sm">
                <strong>{days[selectedLesson.day]}</strong> at <strong>{timeSlots[selectedLesson.timeSlot]}</strong>
              </div>
            )}
            <div className="grid gap-2">
              <Label>Subject</Label>
              <Select value={formSubject} onValueChange={setFormSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(sub => (
                    <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Teacher</Label>
              <Select value={formTeacher} onValueChange={setFormTeacher}>
                <SelectTrigger>
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachers?.map(t => (
                    <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Room</Label>
              <Select value={formRoom} onValueChange={setFormRoom}>
                <SelectTrigger>
                  <SelectValue placeholder="Select room" />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map(room => (
                    <SelectItem key={room} value={room}>{room}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <Button 
              variant="destructive" 
              onClick={() => { setIsEditLessonOpen(false); setIsDeleteDialogOpen(true); }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditLessonOpen(false)}>Cancel</Button>
              <Button onClick={handleEditLesson} className="btn-gradient">Save Changes</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Lesson</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this lesson? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteLesson} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
