
import React from "react";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Calendar, CheckCircle, FileText, Users, Settings, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { mockStudents, mockTeachers, mockAttendanceRequests, mockLeaves, mockNotices, mockExtendedAttendance } from "@/data/mockData";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!user) return null;

  // Get pending requests
  const pendingAttendanceRequests = mockAttendanceRequests.filter(req => req.status === "pending");
  const pendingLeaves = mockLeaves.filter(leave => leave.status === "pending");
  
  // Attendance data by department (mock data)
  const departmentData = [
    { name: "School of ICT", attendanceRate: 85 },
    { name: "School of Engineering", attendanceRate: 78 },
    { name: "School of Business", attendanceRate: 82 },
    { name: "School of Science", attendanceRate: 80 },
    { name: "School of Law", attendanceRate: 88 },
  ];
  
  // Compute attendance stats
  const attendanceData = [
    { name: "Present", value: mockExtendedAttendance.filter(a => a.status === "present").length },
    { name: "Absent", value: mockExtendedAttendance.filter(a => a.status === "absent").length },
    { name: "Late", value: mockExtendedAttendance.filter(a => a.status === "late").length },
  ];
  
  const COLORS = ['#4ade80', '#f87171', '#facc15'];
  
  return (
    <PageLayout title="Admin Dashboard">
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Welcome back, {user.name}!</h2>
          <div className="flex gap-4">
            <Button onClick={() => navigate("/admin/notices/new")}>
              Create Notice
            </Button>
            <Button onClick={() => navigate("/admin/settings")} variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStudents.length}</div>
              <p className="text-xs text-muted-foreground">
                In School of ICT
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockTeachers.length}</div>
              <p className="text-xs text-muted-foreground">
                In School of ICT
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {attendanceData[0].value + attendanceData[2].value > 0 
                  ? Math.round(
                      (attendanceData[0].value / 
                      (attendanceData[0].value + attendanceData[1].value + attendanceData[2].value)) 
                      * 100
                    ) 
                  : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                Average across all departments
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {pendingAttendanceRequests.length + pendingLeaves.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Attendance corrections and leaves
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>Overall university attendance</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Department-wise Attendance</CardTitle>
              <CardDescription>Attendance rates by department</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={departmentData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="attendanceRate" fill="#9b87f5" name="Attendance %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Leave Applications</CardTitle>
                <CardDescription>Teacher and student leave requests</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate("/admin/requests")}>
                View All
              </Button>
            </CardHeader>
            <CardContent>
              {mockLeaves.length > 0 ? (
                <div className="space-y-4">
                  {mockLeaves.slice(0, 3).map(leave => (
                    <div key={leave.id} className="flex items-center justify-between rounded-md border p-4">
                      <div className="space-y-1">
                        <p className="font-medium">{leave.userName}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {leave.userRole} • {leave.startDate} to {leave.endDate}
                        </p>
                        <p className="text-sm">{leave.reason}</p>
                      </div>
                      <div>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          leave.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : leave.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {leave.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">No leave applications</p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Notices</CardTitle>
                <CardDescription>Latest announcements</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate("/admin/notices")}>
                View All
              </Button>
            </CardHeader>
            <CardContent>
              {mockNotices.length > 0 ? (
                <div className="space-y-4">
                  {mockNotices.slice(0, 3).map(notice => (
                    <div key={notice.id} className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{notice.title}</h3>
                        <Bell className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm mt-2 line-clamp-2">
                        {notice.content}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          {new Date(notice.createdAt).toLocaleDateString()}
                        </span>
                        <div className="flex gap-1">
                          {notice.forRoles.map(role => (
                            <span key={role} className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">No notices</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminDashboard;
