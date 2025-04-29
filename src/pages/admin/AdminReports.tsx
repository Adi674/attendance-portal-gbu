
import React from "react";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockClasses, mockExtendedAttendance, mockStudents, mockTeachers } from "@/data/mockData";
import { Download, Printer, FileText, Calendar, User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminReports = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  // Calculate overall statistics
  const totalStudents = mockStudents.length;
  const totalTeachers = mockTeachers.length;
  const totalClasses = mockClasses.length;
  
  const totalAttendanceRecords = mockExtendedAttendance.length;
  const presentCount = mockExtendedAttendance.filter(a => a.status === "present").length;
  const absentCount = mockExtendedAttendance.filter(a => a.status === "absent").length;
  const lateCount = mockExtendedAttendance.filter(a => a.status === "late").length;
  
  const attendancePercentage = totalAttendanceRecords > 0 
    ? Math.round((presentCount / totalAttendanceRecords) * 100) 
    : 0;
  
  // Department-wise data (mock data)
  const departments = [
    "Computer Science", 
    "Information Technology", 
    "Electronics", 
    "Mechanical", 
    "Civil"
  ];
  
  return (
    <PageLayout title="Admin Reports">
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Attendance Reports</h1>
            <p className="text-muted-foreground">Comprehensive attendance reporting across the institution</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Select defaultValue="current">
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Month</SelectItem>
                <SelectItem value="previous">Previous Month</SelectItem>
                <SelectItem value="semester">Current Semester</SelectItem>
                <SelectItem value="annual">Annual Report</SelectItem>
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
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="text-xs text-muted-foreground">Across all departments</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTeachers}</div>
              <p className="text-xs text-muted-foreground">Across all departments</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClasses}</div>
              <p className="text-xs text-muted-foreground">Active classes</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{attendancePercentage}%</div>
              <p className="text-xs text-muted-foreground">
                Institution-wide average
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <Tabs defaultValue="department">
              <div className="flex items-center justify-between">
                <CardTitle>Attendance Reports</CardTitle>
                <TabsList>
                  <TabsTrigger value="department">By Department</TabsTrigger>
                  <TabsTrigger value="semester">By Semester</TabsTrigger>
                  <TabsTrigger value="teacher">By Faculty</TabsTrigger>
                </TabsList>
              </div>
              <CardDescription>Detailed attendance breakdown</CardDescription>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="department" className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-5 bg-muted/50 p-4 font-medium">
                  <div>Department</div>
                  <div>Total Students</div>
                  <div>Present</div>
                  <div>Absent</div>
                  <div>Percentage</div>
                </div>
                <div className="divide-y">
                  {/* Department-wise data */}
                  {departments.map((dept, index) => {
                    // Mock statistics for each department
                    const totalDeptStudents = Math.floor(totalStudents / departments.length) + Math.floor(Math.random() * 10);
                    const deptAttendance = Math.floor(Math.random() * 20) + 70; // 70-90% random attendance
                    const deptPresent = Math.floor((deptAttendance / 100) * totalDeptStudents * 30); // Assuming 30 classes per student
                    const deptAbsent = Math.floor(totalDeptStudents * 30) - deptPresent;
                    
                    return (
                      <div key={dept} className="grid grid-cols-5 p-4 hover:bg-muted/50">
                        <div className="font-medium">{dept}</div>
                        <div>{totalDeptStudents}</div>
                        <div>{deptPresent}</div>
                        <div>{deptAbsent}</div>
                        <div className={`${
                          deptAttendance >= 80 
                            ? "text-green-600" 
                            : deptAttendance >= 70 
                              ? "text-yellow-600" 
                              : "text-red-600"
                        }`}>
                          {deptAttendance}%
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
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Detailed Report
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="semester" className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-5 bg-muted/50 p-4 font-medium">
                  <div>Semester</div>
                  <div>Total Students</div>
                  <div>Present</div>
                  <div>Absent</div>
                  <div>Percentage</div>
                </div>
                <div className="divide-y">
                  {/* Semester-wise data */}
                  {Array.from({ length: 8 }).map((_, i) => {
                    // Mock statistics for each semester
                    const semesterNum = i + 1;
                    const totalSemStudents = Math.floor(totalStudents / 8) + Math.floor(Math.random() * 10);
                    const semAttendance = Math.floor(Math.random() * 25) + 70; // 70-95% random attendance
                    const semPresent = Math.floor((semAttendance / 100) * totalSemStudents * 30); // Assuming 30 classes per student
                    const semAbsent = Math.floor(totalSemStudents * 30) - semPresent;
                    
                    return (
                      <div key={i} className="grid grid-cols-5 p-4 hover:bg-muted/50">
                        <div className="font-medium">Semester {semesterNum}</div>
                        <div>{totalSemStudents}</div>
                        <div>{semPresent}</div>
                        <div>{semAbsent}</div>
                        <div className={`${
                          semAttendance >= 80 
                            ? "text-green-600" 
                            : semAttendance >= 70 
                              ? "text-yellow-600" 
                              : "text-red-600"
                        }`}>
                          {semAttendance}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="teacher" className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 bg-muted/50 p-4 font-medium">
                  <div>Faculty</div>
                  <div>Department</div>
                  <div>Classes</div>
                  <div>Students</div>
                  <div>Attendance Rate</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y">
                  {/* Teacher-wise data */}
                  {mockTeachers.slice(0, 10).map((teacher, index) => {
                    // Mock statistics for each teacher
                    const teacherClasses = Math.floor(Math.random() * 3) + 2; // 2-5 classes
                    const teacherStudents = teacherClasses * 30; // ~30 students per class
                    const teacherAttendance = Math.floor(Math.random() * 20) + 75; // 75-95% random attendance
                    
                    return (
                      <div key={teacher.id} className="grid grid-cols-6 p-4 hover:bg-muted/50">
                        <div className="font-medium flex items-center gap-2">
                          <Avatar>
                            <AvatarFallback>{teacher.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <span>{teacher.name}</span>
                        </div>
                        <div>{teacher.department}</div>
                        <div>{teacherClasses}</div>
                        <div>{teacherStudents}</div>
                        <div className={`${
                          teacherAttendance >= 80 
                            ? "text-green-600" 
                            : teacherAttendance >= 70 
                              ? "text-yellow-600" 
                              : "text-red-600"
                        }`}>
                          {teacherAttendance}%
                        </div>
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
        
        <Card>
          <CardHeader>
            <CardTitle>Report Generation</CardTitle>
            <CardDescription>Generate comprehensive attendance reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Department Report</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept.toLowerCase().replace(' ', '-')}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Student Report</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Enter Student ID" />
                  </div>
                  <Button className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Date Range Report</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <Input type="date" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <Input type="date" />
                    </div>
                  </div>
                  <Button className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

// Missing imports
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default AdminReports;
