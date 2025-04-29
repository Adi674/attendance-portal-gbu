
import React from "react";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Calendar, CheckCircle, FileText, AlertCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { mockClasses, mockExtendedAttendance, mockAttendanceRequests } from "@/data/mockData";

const TeacherDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!user) return null;

  // Filter today's classes for this teacher
  const today = new Date().toISOString().split('T')[0];
  const teacherClasses = mockClasses.filter(cls => cls.teacherId === user.id);
  const todayClasses = teacherClasses.filter(cls => cls.date === today);
  
  // Get attendance requests for this teacher's classes
  const teacherClassIds = teacherClasses.map(cls => cls.id);
  const pendingRequests = mockAttendanceRequests.filter(
    req => teacherClassIds.includes(req.classId) && req.status === "pending"
  );
  
  // Compute attendance stats for classes taught by this teacher
  const allClassAttendance = mockExtendedAttendance.filter(a => 
    teacherClassIds.includes(a.classId)
  );
  
  const attendanceData = [
    { name: "Present", value: allClassAttendance.filter(a => a.status === "present").length },
    { name: "Absent", value: allClassAttendance.filter(a => a.status === "absent").length },
    { name: "Late", value: allClassAttendance.filter(a => a.status === "late").length },
  ];
  
  // Prepare class attendance data for bar chart
  const classSummaryData = teacherClasses
    .slice(0, 5) // Get most recent classes
    .map(cls => {
      const classAttendance = allClassAttendance.filter(a => a.classId === cls.id);
      const present = classAttendance.filter(a => a.status === "present").length;
      const total = classAttendance.length;
      const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
      
      return {
        name: cls.subject,
        attendanceRate: percentage,
      };
    });
  
  const COLORS = ['#4ade80', '#f87171', '#facc15'];
  
  return (
    <PageLayout title="Teacher Dashboard">
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Welcome back, {user.name}!</h2>
          <div className="flex gap-4">
            <Button onClick={() => navigate("/teacher/mark-attendance")}>
              Mark Attendance
            </Button>
            <Button onClick={() => navigate("/teacher/qr-generator")} variant="outline">
              Generate QR Code
            </Button>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayClasses.length}</div>
              <p className="text-xs text-muted-foreground">
                {todayClasses.length > 0 
                  ? `Next class: ${todayClasses[0].subject} at ${todayClasses[0].startTime}` 
                  : "No classes scheduled today"}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">120</div>
              <p className="text-xs text-muted-foreground">
                Across all your classes
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
                Average across all classes
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingRequests.length}</div>
              <p className="text-xs text-muted-foreground">
                {pendingRequests.length > 0 
                  ? "Attendance correction requests" 
                  : "No pending requests"}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>Student attendance across all your subjects</CardDescription>
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
              <CardTitle>Class-wise Attendance</CardTitle>
              <CardDescription>Attendance rates by subject</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={classSummaryData}
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
        
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your classes for {new Date().toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent>
            {todayClasses.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {todayClasses.map(cls => (
                  <div key={cls.id} className="flex flex-col space-y-3 rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{cls.subject}</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => navigate(`/teacher/mark-attendance/${cls.id}`)}
                      >
                        Mark Attendance
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {cls.startTime} - {cls.endTime} | Room {cls.room}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Semester {cls.semester}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-center">
                <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No classes scheduled for today</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default TeacherDashboard;
