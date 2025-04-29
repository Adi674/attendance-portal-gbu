
import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip as RechartsTooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  LineChart,
  Line
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { mockClasses, mockExtendedAttendance, mockStudents } from "@/data/mockData";

const TeacherAnalytics = () => {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  
  if (!user) return null;

  // Filter classes taught by this teacher
  const teacherClasses = mockClasses.filter(cls => cls.teacherId === user.id);
  const subjectOptions = ["all", ...new Set(teacherClasses.map(cls => cls.subject))];
  
  // Filter attendance data based on selected subject
  const filteredClasses = selectedSubject === "all" 
    ? teacherClasses 
    : teacherClasses.filter(cls => cls.subject === selectedSubject);
  
  const filteredClassIds = filteredClasses.map(cls => cls.id);
  
  const filteredAttendance = mockExtendedAttendance.filter(a => 
    filteredClassIds.includes(a.classId)
  );
  
  // Overall attendance data
  const attendanceData = [
    { name: "Present", value: filteredAttendance.filter(a => a.status === "present").length },
    { name: "Absent", value: filteredAttendance.filter(a => a.status === "absent").length },
    { name: "Late", value: filteredAttendance.filter(a => a.status === "late").length },
  ];
  
  // Monthly attendance trend data
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyTrendData = months.map(month => {
    // Simulate monthly trends
    const randomPercentage = Math.floor(Math.random() * 20) + 75; // 75-95% random attendance
    return {
      name: month,
      attendanceRate: randomPercentage
    };
  });
  
  // Student performance data (top 5 and bottom 5)
  const getStudentAttendanceRate = (studentId: string) => {
    const studentClasses = filteredAttendance.filter(a => a.studentId === studentId);
    const present = studentClasses.filter(a => a.status === "present").length;
    const total = studentClasses.length || 1;
    return Math.round((present / total) * 100);
  };
  
  const studentPerformance = mockStudents
    .filter(student => {
      // Check if student has any attendance records in these classes
      return filteredAttendance.some(a => a.studentId === student.id);
    })
    .map(student => {
      return {
        id: student.id,
        name: student.name,
        attendanceRate: getStudentAttendanceRate(student.id)
      };
    });
  
  const topStudents = [...studentPerformance]
    .sort((a, b) => b.attendanceRate - a.attendanceRate)
    .slice(0, 5);
    
  const bottomStudents = [...studentPerformance]
    .sort((a, b) => a.attendanceRate - b.attendanceRate)
    .slice(0, 5);
  
  const COLORS = ['#4ade80', '#f87171', '#facc15'];
  
  return (
    <PageLayout title="Teacher Analytics">
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Attendance Analytics</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjectOptions.map(subject => (
                  <SelectItem key={subject} value={subject}>
                    {subject === "all" ? "All Subjects" : subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">Export Report</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredClasses.length}</div>
              <p className="text-xs text-muted-foreground">
                {selectedSubject === "all" ? "Across all subjects" : selectedSubject}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {attendanceData[0].value + attendanceData[1].value + attendanceData[2].value > 0 
                  ? Math.round(
                      (attendanceData[0].value / 
                      (attendanceData[0].value + attendanceData[1].value + attendanceData[2].value)) 
                      * 100
                    ) 
                  : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                Class average
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(filteredAttendance.map(a => a.studentId)).size}
              </div>
              <p className="text-xs text-muted-foreground">
                Enrolled in your classes
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>Distribution of attendance in your classes</CardDescription>
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
                  <Legend />
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Monthly Trend</CardTitle>
              <CardDescription>Attendance trend over the academic year</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyTrendData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[60, 100]} />
                  <Legend />
                  <RechartsTooltip />
                  <Line
                    type="monotone"
                    dataKey="attendanceRate"
                    name="Attendance Rate (%)"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Students</CardTitle>
              <CardDescription>Students with highest attendance rates</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topStudents}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Legend />
                  <RechartsTooltip />
                  <Bar dataKey="attendanceRate" name="Attendance Rate (%)" fill="#4ade80" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Students Needing Attention</CardTitle>
              <CardDescription>Students with lowest attendance rates</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={bottomStudents}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Legend />
                  <RechartsTooltip />
                  <Bar dataKey="attendanceRate" name="Attendance Rate (%)" fill="#f87171" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default TeacherAnalytics;
