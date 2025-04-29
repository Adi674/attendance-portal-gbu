
import React from "react";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Calendar, CheckCircle, FileText, AlertCircle } from "lucide-react";
import { mockClasses, mockExtendedAttendance } from "@/data/mockData";

const StudentDashboard = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  // Filter today's classes
  const today = new Date().toISOString().split('T')[0];
  const todayClasses = mockClasses.filter(cls => cls.date === today);
  
  // Compute attendance data
  const studentAttendance = mockExtendedAttendance.filter(a => a.studentId === user.id);
  
  const attendanceData = [
    { name: "Present", value: studentAttendance.filter(a => a.status === "present").length },
    { name: "Absent", value: studentAttendance.filter(a => a.status === "absent").length },
    { name: "Late", value: studentAttendance.filter(a => a.status === "late").length },
  ];
  
  const COLORS = ['#4ade80', '#f87171', '#facc15'];
  
  const totalClasses = attendanceData.reduce((sum, item) => sum + item.value, 0);
  const presentPercentage = totalClasses > 0 
    ? Math.round((attendanceData[0].value / totalClasses) * 100) 
    : 0;

  return (
    <PageLayout title="Student Dashboard">
      <div className="grid gap-6">
        <h2 className="text-2xl font-bold">Welcome back, {user.name}!</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{presentPercentage}%</div>
              <p className="text-xs text-muted-foreground">
                {presentPercentage >= 75 
                  ? "Good standing" 
                  : presentPercentage >= 65 
                    ? "Attendance needs improvement" 
                    : "Attendance below minimum requirement"}
              </p>
            </CardContent>
          </Card>
          
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
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">No pending attendance requests</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>Your attendance across all subjects</CardDescription>
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
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Your classes for {new Date().toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              {todayClasses.length > 0 ? (
                <div className="space-y-4">
                  {todayClasses.map(cls => (
                    <div key={cls.id} className="flex items-center space-x-4 rounded-md border p-4">
                      <div className="flex-1 space-y-1">
                        <p className="font-medium">{cls.subject}</p>
                        <p className="text-sm text-muted-foreground">
                          {cls.startTime} - {cls.endTime} | Room {cls.room}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Instructor: {cls.teacher}
                        </p>
                      </div>
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
      </div>
    </PageLayout>
  );
};

export default StudentDashboard;
