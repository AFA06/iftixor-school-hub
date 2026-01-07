import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import AdminLayout from "@/components/layout/AdminLayout";
import TeacherLayout from "@/components/layout/TeacherLayout";
import ParentLayout from "@/components/layout/ParentLayout";
import StudentLayout from "@/components/layout/StudentLayout";
import FinanceLayout from "@/components/layout/FinanceLayout";
import KitchenLayout from "@/components/layout/KitchenLayout";

// Pages
import LandingPage from "@/pages/Landing";
import LoginPage from "@/pages/auth/Login";
import SignupPage from "@/pages/auth/Signup";
import ForgotPasswordPage from "@/pages/auth/ForgotPassword";
import NotFound from "@/pages/NotFound";

// Common Pages
import NotificationsPage from "@/pages/common/Notifications";
import ProfilePage from "@/pages/common/Profile";
import SettingsPage from "@/pages/common/Settings";

// Role Dashboards / Pages
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminUsers from "@/pages/admin/Users";
import AdminClasses from "@/pages/admin/Classes";
import AdminTimetable from "@/pages/admin/Timetable";
import AdminAttendance from "@/pages/admin/Attendance";
import AdminRewards from "@/pages/admin/Rewards";
import AdminLibrary from "@/pages/admin/Library";
import AdminBus from "@/pages/admin/Bus";
import AdminFinance from "@/pages/admin/Finance";
import AdminReports from "@/pages/admin/Reports";
import AdminSettings from "@/pages/admin/Settings";

import TeacherDashboard from "@/pages/teacher/Dashboard";
import TeacherClasses from "@/pages/teacher/Classes";
import TeacherGradebook from "@/pages/teacher/Gradebook";
import TeacherHomework from "@/pages/teacher/Homework";
import TeacherMaterials from "@/pages/teacher/Materials";
import TeacherGroups from "@/pages/teacher/Groups";
import TeacherAnalytics from "@/pages/teacher/Analytics";

import FinanceDashboard from "@/pages/finance/Dashboard";
import FinanceInvoices from "@/pages/finance/Invoices";
import FinancePayments from "@/pages/finance/Payments";
import FinanceDebts from "@/pages/finance/Debts";
import FinanceContracts from "@/pages/finance/Contracts";
import FinanceReports from "@/pages/finance/Reports";

import KitchenDashboard from "@/pages/kitchen/Dashboard";
import KitchenMeals from "@/pages/kitchen/Meals";
import KitchenStudents from "@/pages/kitchen/Students";
import KitchenPayments from "@/pages/kitchen/Payments";
import KitchenReports from "@/pages/kitchen/Reports";

import ParentDashboard from "@/pages/parent/Dashboard";
import ParentProgress from "@/pages/parent/Progress";
import ParentAttendance from "@/pages/parent/Attendance";
import ParentBus from "@/pages/parent/Bus";
import ParentPayments from "@/pages/parent/Payments";
import ParentMessages from "@/pages/parent/Messages";
import ParentDocuments from "@/pages/parent/Documents";

import StudentTimetable from "@/pages/student/Timetable";
import StudentGrades from "@/pages/student/Grades";
import StudentHomework from "@/pages/student/Homework";
import StudentLibrary from "@/pages/student/Library";
import StudentTokens from "@/pages/student/Tokens";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Protected Dashboard Routes */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Common */}
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />

            {/* Admin Panel */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="classes" element={<AdminClasses />} />
              <Route path="timetable" element={<AdminTimetable />} />
              <Route path="attendance" element={<AdminAttendance />} />
              <Route path="rewards" element={<AdminRewards />} />
              <Route path="library" element={<AdminLibrary />} />
              <Route path="bus" element={<AdminBus />} />
              <Route path="finance" element={<AdminFinance />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Teacher Panel */}
            <Route
              path="/teacher"
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <TeacherLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<TeacherDashboard />} />
              <Route path="classes" element={<TeacherClasses />} />
              <Route path="gradebook" element={<TeacherGradebook />} />
              <Route path="homework" element={<TeacherHomework />} />
              <Route path="materials" element={<TeacherMaterials />} />
              <Route path="groups" element={<TeacherGroups />} />
              <Route path="analytics" element={<TeacherAnalytics />} />
            </Route>

            {/* Finance Panel */}
            <Route
              path="/finance"
              element={
                <ProtectedRoute allowedRoles={["finance"]}>
                  <FinanceLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<FinanceDashboard />} />
              <Route path="invoices" element={<FinanceInvoices />} />
              <Route path="payments" element={<FinancePayments />} />
              <Route path="debts" element={<FinanceDebts />} />
              <Route path="contracts" element={<FinanceContracts />} />
              <Route path="reports" element={<FinanceReports />} />
            </Route>

            {/* Kitchen Panel */}
            <Route
              path="/kitchen"
              element={
                <ProtectedRoute allowedRoles={["kitchen"]}>
                  <KitchenLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<KitchenDashboard />} />
              <Route path="meals" element={<KitchenMeals />} />
              <Route path="students" element={<KitchenStudents />} />
              <Route path="payments" element={<KitchenPayments />} />
              <Route path="reports" element={<KitchenReports />} />
            </Route>

            {/* Parent Panel */}
            <Route
              path="/parent"
              element={
                <ProtectedRoute allowedRoles={["parent"]}>
                  <ParentLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<ParentDashboard />} />
              <Route path="progress" element={<ParentProgress />} />
              <Route path="attendance" element={<ParentAttendance />} />
              <Route path="bus" element={<ParentBus />} />
              <Route path="payments" element={<ParentPayments />} />
              <Route path="messages" element={<ParentMessages />} />
              <Route path="documents" element={<ParentDocuments />} />
            </Route>

            {/* Student Panel (read-only) */}
            <Route
              path="/student"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<StudentTimetable />} />
              <Route path="timetable" element={<StudentTimetable />} />
              <Route path="grades" element={<StudentGrades />} />
              <Route path="homework" element={<StudentHomework />} />
              <Route path="library" element={<StudentLibrary />} />
              <Route path="tokens" element={<StudentTokens />} />
            </Route>

            {/* Default dashboard redirect */}
            <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
