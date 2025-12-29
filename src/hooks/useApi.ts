import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockApi, UserRole, Student, Invoice, Homework, Grade, Reward } from '@/api/mock';

// Dashboard hooks
export const useDashboardStats = (role: UserRole) => {
  return useQuery({
    queryKey: ['dashboardStats', role],
    queryFn: () => mockApi.getDashboardStats(role),
  });
};

// Student hooks
export const useStudents = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: mockApi.getStudents,
  });
};

export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Student>) => mockApi.createStudent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
};

// Teacher hooks
export const useTeachers = () => {
  return useQuery({
    queryKey: ['teachers'],
    queryFn: mockApi.getTeachers,
  });
};

// Class hooks
export const useClasses = () => {
  return useQuery({
    queryKey: ['classes'],
    queryFn: mockApi.getClasses,
  });
};

export const useClassStudents = (classId: string) => {
  return useQuery({
    queryKey: ['classStudents', classId],
    queryFn: () => mockApi.getClassStudents(classId),
    enabled: !!classId,
  });
};

// Attendance hooks
export const useAttendance = (date?: string, classId?: string) => {
  return useQuery({
    queryKey: ['attendance', date, classId],
    queryFn: () => mockApi.getAttendance(date, classId),
  });
};

// Invoice hooks
export const useInvoices = (status?: string) => {
  return useQuery({
    queryKey: ['invoices', status],
    queryFn: () => mockApi.getInvoices(status),
  });
};

export const useCreateInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Invoice>) => mockApi.createInvoice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
  });
};

// Payment hooks
export const usePayments = () => {
  return useQuery({
    queryKey: ['payments'],
    queryFn: mockApi.getPayments,
  });
};

// Homework hooks
export const useHomework = (teacherId?: string) => {
  return useQuery({
    queryKey: ['homework', teacherId],
    queryFn: () => mockApi.getHomework(teacherId),
  });
};

export const useCreateHomework = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Homework>) => mockApi.createHomework(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homework'] });
    },
  });
};

// Grades hooks
export const useGrades = (classId?: string, subjectId?: string) => {
  return useQuery({
    queryKey: ['grades', classId, subjectId],
    queryFn: () => mockApi.getGrades(classId, subjectId),
  });
};

export const useSaveGrade = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Grade>) => mockApi.saveGrade(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grades'] });
    },
  });
};

// Notification hooks
export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: mockApi.getNotifications,
  });
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => mockApi.markNotificationRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

// Meal Plan hooks
export const useMealPlans = () => {
  return useQuery({
    queryKey: ['mealPlans'],
    queryFn: mockApi.getMealPlans,
  });
};

// Bus Route hooks
export const useBusRoutes = () => {
  return useQuery({
    queryKey: ['busRoutes'],
    queryFn: mockApi.getBusRoutes,
  });
};

// Reward hooks
export const useRewards = () => {
  return useQuery({
    queryKey: ['rewards'],
    queryFn: mockApi.getRewards,
  });
};

export const useCreateReward = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Reward>) => mockApi.createReward(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rewards'] });
    },
  });
};

// Library hooks
export const useLibraryItems = (subject?: string) => {
  return useQuery({
    queryKey: ['libraryItems', subject],
    queryFn: () => mockApi.getLibraryItems(subject),
  });
};

// Contract hooks
export const useContracts = () => {
  return useQuery({
    queryKey: ['contracts'],
    queryFn: mockApi.getContracts,
  });
};

// Chart Data hooks
export const useAttendanceChartData = () => {
  return useQuery({
    queryKey: ['attendanceChart'],
    queryFn: mockApi.getAttendanceChartData,
  });
};

export const usePaymentChartData = () => {
  return useQuery({
    queryKey: ['paymentChart'],
    queryFn: mockApi.getPaymentChartData,
  });
};

export const usePerformanceChartData = () => {
  return useQuery({
    queryKey: ['performanceChart'],
    queryFn: mockApi.getPerformanceChartData,
  });
};
