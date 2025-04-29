
import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockClasses, mockExtendedAttendance } from "@/data/mockData";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StudentAnalytics = () => {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState("all");

  if (!user) return null;

  // Filter attendance records for this student
  const studentAttendance = mockExtendedAttendance.filter(a => a.studentId === user.id);
  
  // Get all classes this student is enrolled in
  const studentClassIds = [...new Set(studentAttendance.map(a => a.classId))];
  const studentClasses = mockClasses.filter(cls => studentClassIds.includes(cls.id));
  const studentSubjects = [...new Set(studentClasses.map(cls => cls.subject))];
  
  // Filter attendance by selected subject
  const filteredAttendance = selectedSubject === "all" 
    ? studentAttendance 
    : studentAttendance.filter(a => {
        const cls = studentClasses.find(c => c.id === a.classId);
        return cls && cls.subject === selectedSubject;
      });
  
  // Attendance summary data
  const attendanceSummary = [
    { name: "Present", value: filteredAttendance.filter(a => a.status === "present").length, color: "#4ade80" },
    { name: "Absent", value: filteredAttendance.filter(a => a.status === "absent").length, color: "#f87171" },
    { name: "Late", value: filteredAttendance.filter(a => a.status === "late").length, color: "#facc15" },
  ];
  
  // Calculate attendance percentage
  const totalAttendance = attendanceSummary.reduce((sum, item) => sum + item.value, 0);
  const attendancePercentage = totalAttendance > 0
    ? Math.round((attendanceSummary[0].value / totalAttendance) * 100)
    : 0;
  
  // Subject-wise attendance data
  const subjectAttendanceData = studentSubjects.map(subject => {
    const subjectClasses = studentClasses.filter(cls => cls.subject === subject);
    const subjectClassIds = subjectClasses.map(cls => cls.id);
    
    const subjectAttendance = studentAttendance.filter(a => subjectClassIds.includes(a.classId));
    const totalClasses = subjectAttendance.length;
    const presentClasses = subjectAttendance.filter(a => a.status === "present").length;
    
    return {
      name: subject,
      attendanceRate: totalClasses > 0 ? Math.round((presentClasses / totalClasses) * 100) : 0,
    };
  });
  
  // Monthly trend data (mock data for demonstration)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyTrendData = months.map(month => {
    return {
      name: month,
      attendance: Math.floor(Math.random() * 30) + 70, // Random attendance between 70% and 100%
    };
  });
  
  const COLORS = ['#4ade80', '#f87171', '#facc15'];
  
  const chartConfig = {
    present: { label: "Present", theme: { light: "#4ade80", dark: "#4ade80" } },
    absent: { label: "Absent", theme: { light: "#f87171", dark: "#f87171" } },
    late: { label: "Late", theme: { light: "#facc15", dark: "#facc15" } },
  };

  return (
    <PageLayout title="My Attendance Analytics">
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row gap-4 md:justify-between">
          <div className="flex gap-4">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {studentSubjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Attendance Overview</CardTitle>
              <CardDescription>My overall attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={attendanceSummary}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {attendanceSummary.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Attendance Status</CardTitle>
              <CardDescription>Current attendance standing</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-60">
              <div className="text-center">
                <div className="text-5xl font-bold mb-4">{attendancePercentage}%</div>
                <div className={`text-lg ${
                  attendancePercentage >= 75 
                    ? "text-green-500" 
                    : attendancePercentage >= 65 
                      ? "text-yellow-500" 
                      : "text-red-500"
                }`}>
                  {attendancePercentage >= 75 
                    ? "Good Standing" 
                    : attendancePercentage >= 65 
                      ? "Needs Improvement" 
                      : "Below Requirement"}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  {attendancePercentage >= 75 
                    ? "Keep up the good work!" 
                    : attendancePercentage >= 65 
                      ? "Try to attend more classes" 
                      : "Your attendance is below the minimum requirement"}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Monthly Trend</CardTitle>
              <CardDescription>Attendance pattern over months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyTrendData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="attendance" stroke="#9b87f5" name="Attendance %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Subject-wise Attendance</CardTitle>
            <CardDescription>Attendance rate by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={subjectAttendanceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar
                    dataKey="attendanceRate"
                    name="Attendance %"
                    fill="#9b87f5"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default StudentAnalytics;
