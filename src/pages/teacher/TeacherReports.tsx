
import React from "react";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockClasses, mockExtendedAttendance } from "@/data/mockData";
import { Download, Printer, FileText } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TeacherReports = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  // Get classes taught by this teacher
  const teacherClasses = mockClasses.filter(cls => cls.teacherId === user.id);
  
  // Get attendance data for classes taught by this teacher
  const classIds = teacherClasses.map(cls => cls.id);
  const classAttendance = mockExtendedAttendance.filter(a => classIds.includes(a.classId));
  
  // Calculate attendance statistics
  const totalClasses = teacherClasses.length;
  const totalAttendanceRecords = classAttendance.length;
  const presentCount = classAttendance.filter(a => a.status === "present").length;
  const absentCount = classAttendance.filter(a => a.status === "absent").length;
  
  const attendancePercentage = totalAttendanceRecords > 0 
    ? Math.round((presentCount / totalAttendanceRecords) * 100) 
    : 0;
  
  return (
    <PageLayout title="Attendance Reports">
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Attendance Reports</h1>
            <p className="text-muted-foreground">Generate and view attendance reports for your classes</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Select defaultValue="current">
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Month</SelectItem>
                <SelectItem value="previous">Previous Month</SelectItem>
                <SelectItem value="semester">Entire Semester</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClasses}</div>
              <p className="text-xs text-muted-foreground">Classes you teach</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAttendanceRecords}</div>
              <p className="text-xs text-muted-foreground">Records marked</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Present</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{presentCount}</div>
              <p className="text-xs text-muted-foreground">Across all classes</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{attendancePercentage}%</div>
              <p className="text-xs text-muted-foreground">
                Average across all your classes
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <Tabs defaultValue="class">
              <div className="flex items-center justify-between">
                <CardTitle>Attendance Reports</CardTitle>
                <TabsList>
                  <TabsTrigger value="class">By Class</TabsTrigger>
                  <TabsTrigger value="student">By Student</TabsTrigger>
                  <TabsTrigger value="date">By Date</TabsTrigger>
                </TabsList>
              </div>
              <CardDescription>Detailed attendance breakdown</CardDescription>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="class" className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-5 bg-muted/50 p-4 font-medium">
                  <div>Subject</div>
                  <div>Total Students</div>
                  <div>Present</div>
                  <div>Absent</div>
                  <div>Percentage</div>
                </div>
                <div className="divide-y">
                  {/* Subject-wise data */}
                  {teacherClasses.map(cls => {
                    const classAttendanceRecords = classAttendance.filter(a => a.classId === cls.id);
                    const totalStudents = new Set(classAttendanceRecords.map(a => a.studentId)).size;
                    const present = classAttendanceRecords.filter(a => a.status === "present").length;
                    const absent = classAttendanceRecords.filter(a => a.status === "absent").length;
                    const percentage = classAttendanceRecords.length > 0 
                      ? Math.round((present / classAttendanceRecords.length) * 100) 
                      : 0;
                    
                    return (
                      <div key={cls.id} className="grid grid-cols-5 p-4 hover:bg-muted/50">
                        <div className="font-medium">{cls.subject}</div>
                        <div>{totalStudents}</div>
                        <div>{present}</div>
                        <div>{absent}</div>
                        <div className={`${
                          percentage >= 75 
                            ? "text-green-600" 
                            : percentage >= 65 
                              ? "text-yellow-600" 
                              : "text-red-600"
                        }`}>
                          {percentage}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button variant="outline" className="mr-2">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Report
                </Button>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="student">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 bg-muted/50 p-4 font-medium">
                  <div>Student ID</div>
                  <div>Student Name</div>
                  <div>Total Classes</div>
                  <div>Present</div>
                  <div>Absent</div>
                  <div>Percentage</div>
                </div>
                <div className="divide-y">
                  {/* Mock student data */}
                  {Array.from({ length: 10 }).map((_, i) => {
                    const total = Math.floor(Math.random() * 10) + 20;
                    const present = Math.floor(Math.random() * (total - 5)) + 5;
                    const absent = total - present;
                    const percentage = Math.round((present / total) * 100);
                    
                    return (
                      <div key={i} className="grid grid-cols-6 p-4 hover:bg-muted/50">
                        <div>S{String(2023001 + i).padStart(7, '0')}</div>
                        <div className="font-medium">Student {i + 1}</div>
                        <div>{total}</div>
                        <div>{present}</div>
                        <div>{absent}</div>
                        <div className={`${
                          percentage >= 75 
                            ? "text-green-600" 
                            : percentage >= 65 
                              ? "text-yellow-600" 
                              : "text-red-600"
                        }`}>
                          {percentage}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="date">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 bg-muted/50 p-4 font-medium">
                  <div>Date</div>
                  <div>Subject</div>
                  <div>Total Students</div>
                  <div>Present</div>
                  <div>Absent</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y">
                  {/* Date-wise data */}
                  {Array.from({ length: 10 }).map((_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    const subjects = teacherClasses.map(cls => cls.subject);
                    const randomSubject = subjects[Math.floor(Math.random() * subjects.length)] || "Computer Science";
                    const totalStudents = Math.floor(Math.random() * 10) + 30;
                    const present = Math.floor(Math.random() * (totalStudents - 5)) + 5;
                    const absent = totalStudents - present;
                    
                    return (
                      <div key={i} className="grid grid-cols-6 p-4 hover:bg-muted/50">
                        <div>{date.toLocaleDateString()}</div>
                        <div>{randomSubject}</div>
                        <div>{totalStudents}</div>
                        <div>{present}</div>
                        <div>{absent}</div>
                        <div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">View Details</span>
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default TeacherReports;
