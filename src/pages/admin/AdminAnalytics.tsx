
import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockClasses, mockExtendedAttendance, mockStudents, mockTeachers } from "@/data/mockData";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminAnalytics = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("monthly");

  // Get all departments
  const departments = [...new Set(mockClasses.map(cls => cls.department))];
  
  // Filter classes by department
  const filteredClasses = selectedDepartment === "all"
    ? mockClasses
    : mockClasses.filter(cls => cls.department === selectedDepartment);
  
  const classIds = filteredClasses.map(cls => cls.id);
  
  // Filter attendance by selected classes
  const filteredAttendance = mockExtendedAttendance.filter(a => classIds.includes(a.classId));
  
  // Attendance summary data
  const attendanceSummary = [
    { name: "Present", value: filteredAttendance.filter(a => a.status === "present").length, color: "#4ade80" },
    { name: "Absent", value: filteredAttendance.filter(a => a.status === "absent").length, color: "#f87171" },
    { name: "Late", value: filteredAttendance.filter(a => a.status === "late").length, color: "#facc15" },
  ];
  
  // Department wise attendance data
  const departmentAttendanceData = departments.map(department => {
    const deptClasses = mockClasses.filter(cls => cls.department === department);
    const deptClassIds = deptClasses.map(cls => cls.id);
    
    const deptAttendance = mockExtendedAttendance.filter(a => deptClassIds.includes(a.classId));
    const totalAttendance = deptAttendance.length;
    const presentAttendance = deptAttendance.filter(a => a.status === "present").length;
    
    return {
      name: department,
      attendanceRate: totalAttendance > 0 ? Math.round((presentAttendance / totalAttendance) * 100) : 0,
    };
  });
  
  // Teacher performance data
  const teacherPerformanceData = mockTeachers.slice(0, 8).map(teacher => {
    const teacherClasses = mockClasses.filter(cls => cls.teacherId === teacher.id);
    const teacherClassIds = teacherClasses.map(cls => cls.id);
    
    const teacherAttendance = mockExtendedAttendance.filter(a => teacherClassIds.includes(a.classId));
    const totalAttendance = teacherAttendance.length;
    const presentAttendance = teacherAttendance.filter(a => a.status === "present").length;
    
    return {
      name: teacher.name,
      attendanceRate: totalAttendance > 0 ? Math.round((presentAttendance / totalAttendance) * 100) : 0,
    };
  }).sort((a, b) => b.attendanceRate - a.attendanceRate);
  
  // Semester wise attendance data
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const semesterAttendanceData = semesters.map(semester => {
    const semClasses = filteredClasses.filter(cls => cls.semester === semester);
    const semClassIds = semClasses.map(cls => cls.id);
    
    const semAttendance = mockExtendedAttendance.filter(a => semClassIds.includes(a.classId));
    const totalAttendance = semAttendance.length;
    const presentAttendance = semAttendance.filter(a => a.status === "present").length;
    
    return {
      name: `Sem ${semester}`,
      attendanceRate: totalAttendance > 0 ? Math.round((presentAttendance / totalAttendance) * 100) : 0,
    };
  });
  
  // Monthly trend data (mock data for demonstration)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyTrendData = months.map(month => {
    return {
      name: month,
      present: Math.floor(Math.random() * 30) + 20,
      absent: Math.floor(Math.random() * 15),
      late: Math.floor(Math.random() * 10),
    };
  });
  
  // Weekly data
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeklyData = weekDays.map(day => {
    return {
      name: day,
      attendance: Math.floor(Math.random() * 40) + 60,
    };
  });
  
  // Calculate total stats
  const totalStudents = mockStudents.length;
  const totalTeachers = mockTeachers.length;
  const totalClasses = mockClasses.length;
  const averageAttendanceRate = attendanceSummary[0].value + attendanceSummary[1].value + attendanceSummary[2].value > 0
    ? Math.round((attendanceSummary[0].value / (attendanceSummary[0].value + attendanceSummary[1].value + attendanceSummary[2].value)) * 100)
    : 0;
  
  const COLORS = ['#4ade80', '#f87171', '#facc15'];
  
  const chartConfig = {
    present: { label: "Present", theme: { light: "#4ade80", dark: "#4ade80" } },
    absent: { label: "Absent", theme: { light: "#f87171", dark: "#f87171" } },
    late: { label: "Late", theme: { light: "#facc15", dark: "#facc15" } },
  };

  return (
    <PageLayout title="University Attendance Analytics">
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row gap-4 md:justify-between">
          <div className="flex gap-4">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <CardDescription>University-wide</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
              <CardDescription>University-wide</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTeachers}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
              <CardDescription>All scheduled classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClasses}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
              <CardDescription>University-wide</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageAttendanceRate}%</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>University-wide attendance</CardDescription>
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
              <CardTitle>Department-wise Attendance</CardTitle>
              <CardDescription>Attendance rates by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={departmentAttendanceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="attendanceRate" fill="#9b87f5" name="Attendance %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Trend</CardTitle>
            <CardDescription>Attendance pattern over time</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="monthly">
              <TabsList className="mb-2">
                <TabsTrigger value="monthly" onClick={() => setSelectedTimeframe("monthly")}>Monthly</TabsTrigger>
                <TabsTrigger value="weekly" onClick={() => setSelectedTimeframe("weekly")}>Weekly</TabsTrigger>
              </TabsList>
              <TabsContent value="monthly" className="h-80">
                <ChartContainer config={chartConfig}>
                  <BarChart
                    data={monthlyTrendData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip>
                      <ChartTooltipContent />
                    </ChartTooltip>
                    <Bar dataKey="present" fill="var(--color-present)" name="Present" />
                    <Bar dataKey="absent" fill="var(--color-absent)" name="Absent" />
                    <Bar dataKey="late" fill="var(--color-late)" name="Late" />
                  </BarChart>
                </ChartContainer>
              </TabsContent>
              <TabsContent value="weekly" className="h-80">
                <ChartContainer config={chartConfig}>
                  <LineChart
                    data={weeklyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <ChartTooltip>
                      <ChartTooltipContent />
                    </ChartTooltip>
                    <Line type="monotone" dataKey="attendance" stroke="#9b87f5" name="Attendance %" />
                  </LineChart>
                </ChartContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Faculty Performance</CardTitle>
              <CardDescription>Teachers with best class attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Faculty Name</TableHead>
                      <TableHead>Attendance Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teacherPerformanceData.slice(0, 5).map((teacher, index) => (
                      <TableRow key={index}>
                        <TableCell>{teacher.name}</TableCell>
                        <TableCell>{teacher.attendanceRate}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Semester-wise Attendance</CardTitle>
              <CardDescription>Attendance rates by semester</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={semesterAttendanceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="attendanceRate" fill="#9b87f5" name="Attendance %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminAnalytics;
