
import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockClasses, mockExtendedAttendance, mockStudents } from "@/data/mockData";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TeacherAnalytics = () => {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("monthly");

  if (!user) return null;

  // Filter classes taught by this teacher
  const teacherClasses = mockClasses.filter(cls => cls.teacherId === user.id);
  const teacherSubjects = [...new Set(teacherClasses.map(cls => cls.subject))];
  
  // Filter attendance for this teacher's classes
  const classIds = teacherClasses.map(cls => cls.id);
  const filteredAttendance = mockExtendedAttendance.filter(
    attendance => classIds.includes(attendance.classId) &&
    (selectedSubject === "all" || teacherClasses.find(cls => cls.id === attendance.classId)?.subject === selectedSubject)
  );

  // Attendance summary data
  const attendanceSummary = [
    { name: "Present", value: filteredAttendance.filter(a => a.status === "present").length, color: "#4ade80" },
    { name: "Absent", value: filteredAttendance.filter(a => a.status === "absent").length, color: "#f87171" },
    { name: "Late", value: filteredAttendance.filter(a => a.status === "late").length, color: "#facc15" },
  ];

  // Student performance data
  const studentPerformanceData = mockStudents.slice(0, 8).map(student => {
    const studentAttendance = filteredAttendance.filter(a => a.studentId === student.id);
    const totalClasses = studentAttendance.length;
    const presentClasses = studentAttendance.filter(a => a.status === "present").length;
    const attendanceRate = totalClasses > 0 ? (presentClasses / totalClasses) * 100 : 0;
    
    return {
      name: student.name,
      attendanceRate: Math.round(attendanceRate),
    };
  }).sort((a, b) => b.attendanceRate - a.attendanceRate);

  // Time series data (mock data for now)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const timeSeriesData = months.map(month => {
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

  const COLORS = ['#4ade80', '#f87171', '#facc15'];

  const chartConfig = {
    present: { label: "Present", theme: { light: "#4ade80", dark: "#4ade80" } },
    absent: { label: "Absent", theme: { light: "#f87171", dark: "#f87171" } },
    late: { label: "Late", theme: { light: "#facc15", dark: "#facc15" } },
  };

  return (
    <PageLayout title="Attendance Analytics">
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row gap-4 md:justify-between">
          <div className="flex gap-4">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {teacherSubjects.map(subject => (
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
              <CardDescription>Overall attendance statistics</CardDescription>
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
              <CardTitle className="text-base">Weekly Pattern</CardTitle>
              <CardDescription>Attendance rate by day of week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyData}
                    margin={{
                      top: 5, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="attendance" fill="#9b87f5" name="Attendance %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Attendance Trend</CardTitle>
              <CardDescription>Attendance pattern over time</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="monthly">
                <TabsList className="mb-2">
                  <TabsTrigger value="monthly" onClick={() => setSelectedTimeframe("monthly")}>Monthly</TabsTrigger>
                  <TabsTrigger value="weekly" onClick={() => setSelectedTimeframe("weekly")}>Weekly</TabsTrigger>
                </TabsList>
                <TabsContent value="monthly" className="h-60">
                  <ChartContainer config={chartConfig}>
                    <BarChart
                      data={timeSeriesData}
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
                <TabsContent value="weekly" className="h-60">
                  <ChartContainer config={chartConfig}>
                    <BarChart
                      data={weeklyData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip>
                        <ChartTooltipContent />
                      </ChartTooltip>
                      <Bar dataKey="attendance" fill="#9b87f5" name="Attendance %" />
                    </BarChart>
                  </ChartContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Top Student Attendance</CardTitle>
            <CardDescription>Students with best attendance records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={studentPerformanceData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip />
                  <Bar dataKey="attendanceRate" fill="#9b87f5" name="Attendance %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default TeacherAnalytics;
