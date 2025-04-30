
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Notices from "@/pages/Notices";
import StudentDashboard from "@/pages/student/StudentDashboard";
import TeacherDashboard from "@/pages/teacher/TeacherDashboard";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import QRGenerator from "@/pages/teacher/QRGenerator";
import MarkAttendance from "@/pages/teacher/MarkAttendance";
import StudentAnalytics from "@/pages/student/StudentAnalytics";
import TeacherAnalytics from "@/pages/teacher/TeacherAnalytics";
import AdminAnalytics from "@/pages/admin/AdminAnalytics";
import StudentReports from "@/pages/student/StudentReports";
import TeacherReports from "@/pages/teacher/TeacherReports";
import AdminReports from "@/pages/admin/AdminReports";
import StudentRequests from "@/pages/student/StudentRequests";
import TeacherRequests from "@/pages/teacher/TeacherRequests";
import AdminRequests from "@/pages/admin/AdminRequests";
import AdminNotices from "@/pages/admin/AdminNotices";
import AdminSchedule from "@/pages/admin/AdminSchedule";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminSettings from "@/pages/admin/AdminSettings";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    switch (user.role) {
      case "student":
        return <Navigate to="/student/dashboard" />;
      case "teacher":
        return <Navigate to="/teacher/dashboard" />;
      case "admin":
        return <Navigate to="/admin/dashboard" />;
      default:
        return <Navigate to="/login" />;
    }
  }
  
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Student Routes */}
            <Route 
              path="/student/dashboard" 
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/analytics" 
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentAnalytics />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/reports" 
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentReports />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/requests" 
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentRequests />
                </ProtectedRoute>
              } 
            />
            
            {/* Teacher Routes */}
            <Route 
              path="/teacher/dashboard" 
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <TeacherDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher/analytics" 
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <TeacherAnalytics />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher/qr-generator" 
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <QRGenerator />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher/mark-attendance" 
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <MarkAttendance />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher/mark-attendance/:classId" 
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <MarkAttendance />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher/reports" 
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <TeacherReports />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher/requests" 
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <TeacherRequests />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/analytics" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminAnalytics />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/reports" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminReports />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/requests" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminRequests />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/notices" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminNotices />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminUsers />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/schedule" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminSchedule />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/settings" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminSettings />
                </ProtectedRoute>
              } 
            />
            
            {/* Shared Routes */}
            <Route 
              path="/notices" 
              element={
                <ProtectedRoute allowedRoles={["student", "teacher", "admin"]}>
                  <Notices />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
