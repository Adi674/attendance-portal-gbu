
import React from "react";
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
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockExtendedAttendance, mockStudents, mockTeachers, mockClasses } from "@/data/mockData";

const AdminAnalytics = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // Overall attendance data
  const attendanceData = [
    { name: "Present", value: mockExtendedAttendance.filter(a => a.status === "present").length },
    { name: "Absent", value: mockExtendedAttendance.filter(a => a.status === "absent").length },
    { name: "Late", value: mockExtendedAttendance.filter(a => a.status === "late").length },
  ];
  
  // Department-wise attendance data
  const departments = ["Computer Science", "Information Technology", "Electronics", "Mechanical", "Civil"];
  const departmentAttendanceData = departments.map(department => {
    // Simulate department-specific calculations
    const randomPercentage = Math.floor(Math.random() * 30) + 70; // 70-100% random attendance
    return {
      name: department,
      attendanceRate: randomPercentage
    };
  });
  
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
  
  // Semester-wise attendance data
  const semesterAttendanceData = [
    { name: "Semester 1", attendanceRate: 88 },
    { name: "Semester 2", attendanceRate: 84 },
    { name: "Semester 3", attendanceRate: 82 },
    { name: "Semester 4", attendanceRate: 79 },
    { name: "Semester 5", attendanceRate: 75 },
    { name: "Semester 6", attendanceRate: 73 },
    { name: "Semester 7", attendanceRate: 78 },
    { name: "Semester 8", attendanceRate: 76 },
  ];
  
  // Class-wise attendance data
  const topClassesData = mockClasses.slice(0, 5).map(cls => {
    // Simulate class-specific calculations
    const randomPercentage = Math.floor(Math.random() * 25) + 70; // 70-95% random attendance
    return {
      name: cls.subject,
      attendanceRate: randomPercentage
    };
  });
  
  // Teacher performance data
  const teacherPerformanceData = mockTeachers.slice(0, 5).map(teacher => {
    // Simulate teacher-specific calculations
    const randomPercentage = Math.floor(Math.random() * 20) + 75; // 75-95% random attendance
    return {
      name: teacher.name,
      attendanceRate: randomPercentage
    };
  });
  
  const COLORS = ['#4ade80', '#f87171', '#facc15'];
  
  return (
    <PageLayout title="Analytics Dashboard">
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Attendance Analytics</h1>
          <div className="flex gap-2">
            <Button variant="outline">Export Report</Button>
            <Button variant="outline">Print Dashboard</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStudents.length}</div>
              <p className="text-xs text-muted-foreground">Across all departments</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockTeachers.length}</div>
              <p className="text-xs text-muted-foreground">Across all departments</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockClasses.length}</div>
              <p className="text-xs text-muted-foreground">Active classes</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
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
              <p className="text-xs text-muted-foreground">Institutional average</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>Distribution of attendance across institution</CardDescription>
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
              <CardTitle>Department-wise Attendance</CardTitle>
              <CardDescription>Attendance rates by department</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={departmentAttendanceData}
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
                  <Legend />
                  <RechartsTooltip />
                  <Bar dataKey="attendanceRate" name="Attendance Rate (%)" fill="#9b87f5" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Monthly Attendance Trend</CardTitle>
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
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Academic Analysis</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <Tabs defaultValue="semester">
                <TabsList className="mb-4">
                  <TabsTrigger value="semester">Semester</TabsTrigger>
                  <TabsTrigger value="class">Classes</TabsTrigger>
                </TabsList>
                <TabsContent value="semester">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={semesterAttendanceData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[50, 100]} />
                      <Legend />
                      <RechartsTooltip />
                      <Bar dataKey="attendanceRate" name="Attendance Rate (%)" fill="#4ade80" />
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="class">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={topClassesData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[50, 100]} />
                      <Legend />
                      <RechartsTooltip />
                      <Bar dataKey="attendanceRate" name="Attendance Rate (%)" fill="#facc15" />
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Teacher Performance</CardTitle>
              <CardDescription>Class attendance rates by teacher</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={teacherPerformanceData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[50, 100]} />
                  <Legend />
                  <RechartsTooltip />
                  <Bar dataKey="attendanceRate" name="Attendance Rate (%)" fill="#9b87f5" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminAnalytics;
