// Types
export type UserRole = 'admin' | 'teacher' | 'finance' | 'kitchen' | 'parent' | 'student';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  createdAt: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  parentId: string;
  parentName: string;
  avatar?: string;
  status: 'active' | 'inactive';
  enrolledAt: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subjects: string[];
  classes: string[];
  avatar?: string;
  status: 'active' | 'inactive';
  joinedAt: string;
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  studentIds: string[];
  avatar?: string;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  avatar?: string;
  status: 'active' | 'inactive';
}

export interface Class {
  id: string;
  name: string;
  grade: number;
  section: string;
  teacherId: string;
  teacherName: string;
  studentCount: number;
  subjects: string[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  teacherId: string;
  teacherName: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  checkInTime?: string;
  checkOutTime?: string;
}

export interface Invoice {
  id: string;
  studentId: string;
  studentName: string;
  parentId: string;
  parentName: string;
  type: 'tuition' | 'meal' | 'bus' | 'other';
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paidDate?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  studentName: string;
  amount: number;
  method: 'cash' | 'card' | 'transfer';
  date: string;
  receiptNumber: string;
}

export interface Homework {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  subjectName: string;
  classId: string;
  className: string;
  teacherId: string;
  dueDate: string;
  attachments: string[];
  status: 'active' | 'closed';
  createdAt: string;
}

export interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  subjectId: string;
  subjectName: string;
  classId: string;
  grade: number;
  maxGrade: number;
  type: 'homework' | 'quiz' | 'exam' | 'project';
  date: string;
  comment?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface MealPlan {
  id: string;
  dayOfWeek: number;
  breakfast: string;
  lunch: string;
  snack: string;
  weekNumber: number;
}

export interface BusRoute {
  id: string;
  name: string;
  driver: string;
  driverPhone: string;
  busNumber: string;
  stops: string[];
  studentCount: number;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  tokenCost: number;
  stock: number;
  image?: string;
}

export interface LibraryItem {
  id: string;
  title: string;
  type: 'book' | 'document' | 'video';
  subject: string;
  uploadedBy: string;
  uploadedAt: string;
  downloadUrl: string;
  size: string;
}

export interface Contract {
  id: string;
  title: string;
  parentId: string;
  parentName: string;
  studentId: string;
  studentName: string;
  status: 'draft' | 'sent' | 'viewed' | 'signed';
  createdAt: string;
  signedAt?: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  attendanceToday: number;
  unpaidInvoices: number;
  totalRevenue: number;
  pendingPayments: number;
}

// Mock Data
const mockUsers: User[] = [
  { id: '1', email: 'admin@demo.com', name: 'Admin User', role: 'admin', createdAt: '2024-01-01' },
  { id: '2', email: 'teacher@demo.com', name: 'Teacher User', role: 'teacher', createdAt: '2024-01-01' },
  { id: '3', email: 'finance@demo.com', name: 'Finance User', role: 'finance', createdAt: '2024-01-01' },
  { id: '4', email: 'kitchen@demo.com', name: 'Kitchen User', role: 'kitchen', createdAt: '2024-01-01' },
  { id: '5', email: 'parent@demo.com', name: 'Parent User', role: 'parent', createdAt: '2024-01-01' },
  { id: '6', email: 'student@demo.com', name: 'Student User', role: 'student', createdAt: '2024-01-01' },
  { id: '7', email: 'plans@demo.local', name: 'Plans Demo', role: 'admin', createdAt: '2024-01-01' },
];

const mockStudents: Student[] = [
  { id: 's1', name: 'Aziza Karimova', email: 'aziza@student.com', phone: '+998901234567', class: '7-A', parentId: 'p1', parentName: 'Karim Karimov', status: 'active', enrolledAt: '2023-09-01' },
  { id: 's2', name: 'Bobur Toshmatov', email: 'bobur@student.com', phone: '+998901234568', class: '7-A', parentId: 'p2', parentName: 'Toshmat Toshmatov', status: 'active', enrolledAt: '2023-09-01' },
  { id: 's3', name: 'Charos Umarova', email: 'charos@student.com', phone: '+998901234569', class: '7-B', parentId: 'p3', parentName: 'Umar Umarov', status: 'active', enrolledAt: '2023-09-01' },
  { id: 's4', name: 'Davron Salimov', email: 'davron@student.com', phone: '+998901234570', class: '8-A', parentId: 'p4', parentName: 'Salim Salimov', status: 'active', enrolledAt: '2023-09-01' },
  { id: 's5', name: 'Elnora Rahimova', email: 'elnora@student.com', phone: '+998901234571', class: '8-A', parentId: 'p5', parentName: 'Rahim Rahimov', status: 'active', enrolledAt: '2023-09-01' },
  { id: 's6', name: 'Farruh Alimov', email: 'farruh@student.com', phone: '+998901234572', class: '8-B', parentId: 'p6', parentName: 'Ali Alimov', status: 'inactive', enrolledAt: '2023-09-01' },
  { id: 's7', name: 'Gulnora Sharipova', email: 'gulnora@student.com', phone: '+998901234573', class: '9-A', parentId: 'p7', parentName: 'Sharip Sharipov', status: 'active', enrolledAt: '2023-09-01' },
  { id: 's8', name: 'Husan Normatov', email: 'husan@student.com', phone: '+998901234574', class: '9-A', parentId: 'p8', parentName: 'Normat Normatov', status: 'active', enrolledAt: '2023-09-01' },
];

const mockTeachers: Teacher[] = [
  { id: 't1', name: 'Murod Aliyev', email: 'murod@teacher.com', phone: '+998901111111', subjects: ['Mathematics', 'Physics'], classes: ['7-A', '8-A'], status: 'active', joinedAt: '2022-09-01' },
  { id: 't2', name: 'Nilufar Qodirova', email: 'nilufar@teacher.com', phone: '+998901111112', subjects: ['English', 'Literature'], classes: ['7-B', '9-A'], status: 'active', joinedAt: '2022-09-01' },
  { id: 't3', name: 'Sardor Mirzayev', email: 'sardor@teacher.com', phone: '+998901111113', subjects: ['Chemistry', 'Biology'], classes: ['8-A', '8-B'], status: 'active', joinedAt: '2023-01-15' },
  { id: 't4', name: 'Dilfuza Saidova', email: 'dilfuza@teacher.com', phone: '+998901111114', subjects: ['History', 'Geography'], classes: ['7-A', '7-B', '8-A'], status: 'active', joinedAt: '2023-01-15' },
  { id: 't5', name: 'Kamol Usmanov', email: 'kamol@teacher.com', phone: '+998901111115', subjects: ['Computer Science'], classes: ['9-A', '8-B'], status: 'active', joinedAt: '2023-09-01' },
];

const mockClasses: Class[] = [
  { id: 'c1', name: '7-A', grade: 7, section: 'A', teacherId: 't1', teacherName: 'Murod Aliyev', studentCount: 25, subjects: ['Mathematics', 'English', 'Physics', 'History'] },
  { id: 'c2', name: '7-B', grade: 7, section: 'B', teacherId: 't2', teacherName: 'Nilufar Qodirova', studentCount: 23, subjects: ['Mathematics', 'English', 'Chemistry', 'Geography'] },
  { id: 'c3', name: '8-A', grade: 8, section: 'A', teacherId: 't3', teacherName: 'Sardor Mirzayev', studentCount: 28, subjects: ['Mathematics', 'English', 'Physics', 'Biology'] },
  { id: 'c4', name: '8-B', grade: 8, section: 'B', teacherId: 't4', teacherName: 'Dilfuza Saidova', studentCount: 26, subjects: ['Mathematics', 'English', 'Chemistry', 'History'] },
  { id: 'c5', name: '9-A', grade: 9, section: 'A', teacherId: 't5', teacherName: 'Kamol Usmanov', studentCount: 24, subjects: ['Mathematics', 'English', 'Physics', 'Computer Science'] },
];

const mockAttendance: Attendance[] = [
  { id: 'a1', studentId: 's1', studentName: 'Aziza Karimova', class: '7-A', date: '2024-12-29', status: 'present', checkInTime: '08:45' },
  { id: 'a2', studentId: 's2', studentName: 'Bobur Toshmatov', class: '7-A', date: '2024-12-29', status: 'late', checkInTime: '09:15' },
  { id: 'a3', studentId: 's3', studentName: 'Charos Umarova', class: '7-B', date: '2024-12-29', status: 'present', checkInTime: '08:30' },
  { id: 'a4', studentId: 's4', studentName: 'Davron Salimov', class: '8-A', date: '2024-12-29', status: 'absent' },
  { id: 'a5', studentId: 's5', studentName: 'Elnora Rahimova', class: '8-A', date: '2024-12-29', status: 'present', checkInTime: '08:50' },
  { id: 'a6', studentId: 's6', studentName: 'Farruh Alimov', class: '8-B', date: '2024-12-29', status: 'present', checkInTime: '08:40' },
  { id: 'a7', studentId: 's7', studentName: 'Gulnora Sharipova', class: '9-A', date: '2024-12-29', status: 'present', checkInTime: '08:35' },
  { id: 'a8', studentId: 's8', studentName: 'Husan Normatov', class: '9-A', date: '2024-12-29', status: 'late', checkInTime: '09:05' },
];

const mockInvoices: Invoice[] = [
  { id: 'inv1', studentId: 's1', studentName: 'Aziza Karimova', parentId: 'p1', parentName: 'Karim Karimov', type: 'tuition', amount: 2500000, status: 'paid', dueDate: '2024-12-15', paidDate: '2024-12-10', createdAt: '2024-12-01' },
  { id: 'inv2', studentId: 's2', studentName: 'Bobur Toshmatov', parentId: 'p2', parentName: 'Toshmat Toshmatov', type: 'tuition', amount: 2500000, status: 'pending', dueDate: '2024-12-31', createdAt: '2024-12-01' },
  { id: 'inv3', studentId: 's3', studentName: 'Charos Umarova', parentId: 'p3', parentName: 'Umar Umarov', type: 'meal', amount: 500000, status: 'overdue', dueDate: '2024-12-20', createdAt: '2024-12-01' },
  { id: 'inv4', studentId: 's4', studentName: 'Davron Salimov', parentId: 'p4', parentName: 'Salim Salimov', type: 'bus', amount: 300000, status: 'paid', dueDate: '2024-12-15', paidDate: '2024-12-12', createdAt: '2024-12-01' },
  { id: 'inv5', studentId: 's5', studentName: 'Elnora Rahimova', parentId: 'p5', parentName: 'Rahim Rahimov', type: 'tuition', amount: 2500000, status: 'pending', dueDate: '2025-01-15', createdAt: '2024-12-15' },
];

const mockPayments: Payment[] = [
  { id: 'pay1', invoiceId: 'inv1', studentName: 'Aziza Karimova', amount: 2500000, method: 'transfer', date: '2024-12-10', receiptNumber: 'RCP-2024-001' },
  { id: 'pay2', invoiceId: 'inv4', studentName: 'Davron Salimov', amount: 300000, method: 'cash', date: '2024-12-12', receiptNumber: 'RCP-2024-002' },
  { id: 'pay3', invoiceId: 'inv1', studentName: 'Gulnora Sharipova', amount: 2500000, method: 'card', date: '2024-12-08', receiptNumber: 'RCP-2024-003' },
];

const mockHomework: Homework[] = [
  { id: 'hw1', title: 'Algebra Chapter 5 Exercises', description: 'Complete exercises 1-20 from page 87', subjectId: 'sub1', subjectName: 'Mathematics', classId: 'c1', className: '7-A', teacherId: 't1', dueDate: '2024-12-30', attachments: [], status: 'active', createdAt: '2024-12-27' },
  { id: 'hw2', title: 'English Essay: My Future', description: 'Write a 300-word essay about your future career goals', subjectId: 'sub2', subjectName: 'English', classId: 'c2', className: '7-B', teacherId: 't2', dueDate: '2025-01-02', attachments: [], status: 'active', createdAt: '2024-12-28' },
  { id: 'hw3', title: 'Physics Lab Report', description: 'Submit the lab report for the pendulum experiment', subjectId: 'sub3', subjectName: 'Physics', classId: 'c3', className: '8-A', teacherId: 't1', dueDate: '2024-12-29', attachments: [], status: 'closed', createdAt: '2024-12-20' },
];

const mockGrades: Grade[] = [
  { id: 'g1', studentId: 's1', studentName: 'Aziza Karimova', subjectId: 'sub1', subjectName: 'Mathematics', classId: 'c1', grade: 95, maxGrade: 100, type: 'exam', date: '2024-12-20' },
  { id: 'g2', studentId: 's2', studentName: 'Bobur Toshmatov', subjectId: 'sub1', subjectName: 'Mathematics', classId: 'c1', grade: 82, maxGrade: 100, type: 'exam', date: '2024-12-20' },
  { id: 'g3', studentId: 's1', studentName: 'Aziza Karimova', subjectId: 'sub2', subjectName: 'English', classId: 'c1', grade: 88, maxGrade: 100, type: 'quiz', date: '2024-12-22' },
  { id: 'g4', studentId: 's3', studentName: 'Charos Umarova', subjectId: 'sub2', subjectName: 'English', classId: 'c2', grade: 91, maxGrade: 100, type: 'homework', date: '2024-12-23' },
];

const mockNotifications: Notification[] = [
  { id: 'n1', title: 'New Student Enrolled', message: 'A new student has been enrolled in class 7-A', type: 'info', read: false, createdAt: '2024-12-29T10:00:00' },
  { id: 'n2', title: 'Payment Received', message: 'Payment of 2,500,000 UZS received from Karim Karimov', type: 'success', read: false, createdAt: '2024-12-29T09:30:00' },
  { id: 'n3', title: 'Overdue Invoice', message: 'Invoice for Charos Umarova is overdue by 9 days', type: 'warning', read: true, createdAt: '2024-12-28T14:00:00' },
  { id: 'n4', title: 'System Update', message: 'System maintenance scheduled for tonight at 11 PM', type: 'info', read: true, createdAt: '2024-12-27T16:00:00' },
];

const mockMealPlans: MealPlan[] = [
  { id: 'mp1', dayOfWeek: 1, breakfast: 'Oatmeal with fruits, toast, juice', lunch: 'Plov, salad, compote', snack: 'Cookies, milk', weekNumber: 52 },
  { id: 'mp2', dayOfWeek: 2, breakfast: 'Eggs, bread, tea', lunch: 'Shurva, bread, compote', snack: 'Fruit, yogurt', weekNumber: 52 },
  { id: 'mp3', dayOfWeek: 3, breakfast: 'Pancakes, honey, milk', lunch: 'Manti, salad, tea', snack: 'Nuts, juice', weekNumber: 52 },
  { id: 'mp4', dayOfWeek: 4, breakfast: 'Cereal, milk, banana', lunch: 'Lagman, bread, compote', snack: 'Cookies, tea', weekNumber: 52 },
  { id: 'mp5', dayOfWeek: 5, breakfast: 'Cheese sandwich, juice', lunch: 'Fish, rice, salad', snack: 'Apple, milk', weekNumber: 52 },
];

const mockBusRoutes: BusRoute[] = [
  { id: 'br1', name: 'Route A - City Center', driver: 'Akmal Rahimov', driverPhone: '+998902222222', busNumber: '01-A-123', stops: ['Main Square', 'Park Street', 'Library', 'School'], studentCount: 15 },
  { id: 'br2', name: 'Route B - Residential Area', driver: 'Bobir Toshev', driverPhone: '+998902222223', busNumber: '01-A-124', stops: ['Apartment Complex', 'Market', 'Hospital', 'School'], studentCount: 18 },
  { id: 'br3', name: 'Route C - Suburb', driver: 'Dilshod Karimov', driverPhone: '+998902222224', busNumber: '01-A-125', stops: ['Village 1', 'Village 2', 'Gas Station', 'School'], studentCount: 12 },
];

const mockRewards: Reward[] = [
  { id: 'r1', name: 'Notebook', description: 'Premium quality notebook with 100 pages', tokenCost: 50, stock: 100 },
  { id: 'r2', name: 'Pencil Set', description: 'Set of 12 colored pencils', tokenCost: 30, stock: 75 },
  { id: 'r3', name: 'School Bag', description: 'High-quality school backpack', tokenCost: 200, stock: 20 },
  { id: 'r4', name: 'Water Bottle', description: 'Stainless steel water bottle', tokenCost: 80, stock: 45 },
  { id: 'r5', name: 'Extra Break Time', description: '15 minutes extra break time pass', tokenCost: 100, stock: 999 },
];

const mockLibraryItems: LibraryItem[] = [
  { id: 'lib1', title: 'Mathematics Grade 7 Textbook', type: 'book', subject: 'Mathematics', uploadedBy: 'Admin', uploadedAt: '2024-09-01', downloadUrl: '#', size: '15 MB' },
  { id: 'lib2', title: 'English Grammar Guide', type: 'document', subject: 'English', uploadedBy: 'Nilufar Qodirova', uploadedAt: '2024-10-15', downloadUrl: '#', size: '2.5 MB' },
  { id: 'lib3', title: 'Physics Experiments Video', type: 'video', subject: 'Physics', uploadedBy: 'Murod Aliyev', uploadedAt: '2024-11-20', downloadUrl: '#', size: '150 MB' },
  { id: 'lib4', title: 'History of Uzbekistan', type: 'book', subject: 'History', uploadedBy: 'Dilfuza Saidova', uploadedAt: '2024-09-05', downloadUrl: '#', size: '25 MB' },
];

const mockContracts: Contract[] = [
  { id: 'con1', title: 'Enrollment Agreement 2024-2025', parentId: 'p1', parentName: 'Karim Karimov', studentId: 's1', studentName: 'Aziza Karimova', status: 'signed', createdAt: '2024-08-15', signedAt: '2024-08-20' },
  { id: 'con2', title: 'Enrollment Agreement 2024-2025', parentId: 'p2', parentName: 'Toshmat Toshmatov', studentId: 's2', studentName: 'Bobur Toshmatov', status: 'viewed', createdAt: '2024-08-15' },
  { id: 'con3', title: 'Bus Service Agreement', parentId: 'p4', parentName: 'Salim Salimov', studentId: 's4', studentName: 'Davron Salimov', status: 'sent', createdAt: '2024-12-01' },
];

// Helper function to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API Functions
export const mockApi = {
  // Auth
  async login(email: string, password: string): Promise<User | null> {
    await delay(800);
    if (password !== 'Demo1234') return null;
    const user = mockUsers.find(u => u.email === email);
    return user || null;
  },

  async getCurrentUser(userId: string): Promise<User | null> {
    await delay(300);
    return mockUsers.find(u => u.id === userId) || null;
  },

  // Dashboard
  async getDashboardStats(role: UserRole): Promise<DashboardStats> {
    await delay(500);
    return {
      totalStudents: mockStudents.length,
      totalTeachers: mockTeachers.length,
      attendanceToday: Math.round((mockAttendance.filter(a => a.status === 'present').length / mockAttendance.length) * 100),
      unpaidInvoices: mockInvoices.filter(i => i.status !== 'paid').length,
      totalRevenue: mockPayments.reduce((sum, p) => sum + p.amount, 0),
      pendingPayments: mockInvoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0),
    };
  },

  // Users
  async getStudents(): Promise<Student[]> {
    await delay(400);
    return mockStudents;
  },

  async getTeachers(): Promise<Teacher[]> {
    await delay(400);
    return mockTeachers;
  },

  async createStudent(data: Partial<Student>): Promise<Student> {
    await delay(600);
    const newStudent: Student = {
      id: `s${Date.now()}`,
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      class: data.class || '',
      parentId: data.parentId || '',
      parentName: data.parentName || '',
      status: 'active',
      enrolledAt: new Date().toISOString(),
    };
    mockStudents.push(newStudent);
    return newStudent;
  },

  // Classes
  async getClasses(): Promise<Class[]> {
    await delay(400);
    return mockClasses;
  },

  async getClassStudents(classId: string): Promise<Student[]> {
    await delay(400);
    const cls = mockClasses.find(c => c.id === classId);
    if (!cls) return [];
    return mockStudents.filter(s => s.class === cls.name);
  },

  // Attendance
  async getAttendance(date?: string, classId?: string): Promise<Attendance[]> {
    await delay(400);
    let result = [...mockAttendance];
    if (date) result = result.filter(a => a.date === date);
    if (classId) {
      const cls = mockClasses.find(c => c.id === classId);
      if (cls) result = result.filter(a => a.class === cls.name);
    }
    return result;
  },

  // Invoices
  async getInvoices(status?: string): Promise<Invoice[]> {
    await delay(400);
    if (status) return mockInvoices.filter(i => i.status === status);
    return mockInvoices;
  },

  async createInvoice(data: Partial<Invoice>): Promise<Invoice> {
    await delay(600);
    const newInvoice: Invoice = {
      id: `inv${Date.now()}`,
      studentId: data.studentId || '',
      studentName: data.studentName || '',
      parentId: data.parentId || '',
      parentName: data.parentName || '',
      type: data.type || 'tuition',
      amount: data.amount || 0,
      status: 'pending',
      dueDate: data.dueDate || '',
      createdAt: new Date().toISOString(),
    };
    mockInvoices.push(newInvoice);
    return newInvoice;
  },

  // Payments
  async getPayments(): Promise<Payment[]> {
    await delay(400);
    return mockPayments;
  },

  // Homework
  async getHomework(teacherId?: string): Promise<Homework[]> {
    await delay(400);
    if (teacherId) return mockHomework.filter(h => h.teacherId === teacherId);
    return mockHomework;
  },

  async createHomework(data: Partial<Homework>): Promise<Homework> {
    await delay(600);
    const newHomework: Homework = {
      id: `hw${Date.now()}`,
      title: data.title || '',
      description: data.description || '',
      subjectId: data.subjectId || '',
      subjectName: data.subjectName || '',
      classId: data.classId || '',
      className: data.className || '',
      teacherId: data.teacherId || '',
      dueDate: data.dueDate || '',
      attachments: [],
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    mockHomework.push(newHomework);
    return newHomework;
  },

  // Grades
  async getGrades(classId?: string, subjectId?: string): Promise<Grade[]> {
    await delay(400);
    let result = [...mockGrades];
    if (classId) result = result.filter(g => g.classId === classId);
    if (subjectId) result = result.filter(g => g.subjectId === subjectId);
    return result;
  },

  async saveGrade(data: Partial<Grade>): Promise<Grade> {
    await delay(400);
    const newGrade: Grade = {
      id: `g${Date.now()}`,
      studentId: data.studentId || '',
      studentName: data.studentName || '',
      subjectId: data.subjectId || '',
      subjectName: data.subjectName || '',
      classId: data.classId || '',
      grade: data.grade || 0,
      maxGrade: data.maxGrade || 100,
      type: data.type || 'homework',
      date: new Date().toISOString().split('T')[0],
      comment: data.comment,
    };
    mockGrades.push(newGrade);
    return newGrade;
  },

  // Notifications
  async getNotifications(): Promise<Notification[]> {
    await delay(300);
    return mockNotifications;
  },

  async markNotificationRead(id: string): Promise<void> {
    await delay(200);
    const notification = mockNotifications.find(n => n.id === id);
    if (notification) notification.read = true;
  },

  // Meal Plans
  async getMealPlans(): Promise<MealPlan[]> {
    await delay(400);
    return mockMealPlans;
  },

  async updateMealPlan(id: string, data: Partial<MealPlan>): Promise<MealPlan> {
    await delay(400);
    const index = mockMealPlans.findIndex(m => m.id === id);
    if (index >= 0) {
      mockMealPlans[index] = { ...mockMealPlans[index], ...data };
      return mockMealPlans[index];
    }
    throw new Error('Meal plan not found');
  },

  // Bus Routes
  async getBusRoutes(): Promise<BusRoute[]> {
    await delay(400);
    return mockBusRoutes;
  },

  // Rewards
  async getRewards(): Promise<Reward[]> {
    await delay(400);
    return mockRewards;
  },

  async createReward(data: Partial<Reward>): Promise<Reward> {
    await delay(600);
    const newReward: Reward = {
      id: `r${Date.now()}`,
      name: data.name || '',
      description: data.description || '',
      tokenCost: data.tokenCost || 0,
      stock: data.stock || 0,
    };
    mockRewards.push(newReward);
    return newReward;
  },

  // Library
  async getLibraryItems(subject?: string): Promise<LibraryItem[]> {
    await delay(400);
    if (subject) return mockLibraryItems.filter(i => i.subject === subject);
    return mockLibraryItems;
  },

  // Contracts
  async getContracts(): Promise<Contract[]> {
    await delay(400);
    return mockContracts;
  },

  // Chart Data
  async getAttendanceChartData(): Promise<{ date: string; present: number; absent: number; late: number }[]> {
    await delay(400);
    return [
      { date: 'Mon', present: 92, absent: 5, late: 3 },
      { date: 'Tue', present: 95, absent: 3, late: 2 },
      { date: 'Wed', present: 88, absent: 8, late: 4 },
      { date: 'Thu', present: 94, absent: 4, late: 2 },
      { date: 'Fri', present: 90, absent: 6, late: 4 },
    ];
  },

  async getPaymentChartData(): Promise<{ month: string; collected: number; pending: number }[]> {
    await delay(400);
    return [
      { month: 'Sep', collected: 45000000, pending: 8000000 },
      { month: 'Oct', collected: 52000000, pending: 5000000 },
      { month: 'Nov', collected: 48000000, pending: 12000000 },
      { month: 'Dec', collected: 55000000, pending: 7000000 },
    ];
  },

  async getPerformanceChartData(): Promise<{ subject: string; average: number }[]> {
    await delay(400);
    return [
      { subject: 'Math', average: 85 },
      { subject: 'English', average: 78 },
      { subject: 'Physics', average: 82 },
      { subject: 'Chemistry', average: 76 },
      { subject: 'History', average: 88 },
    ];
  },
};

export default mockApi;