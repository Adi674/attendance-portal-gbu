
import React from "react";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockExtendedAttendance } from "@/data/mockData";
import { FileText, Download, Printer } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StudentReports = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  // Get student attendance data
  const studentAttendance = mockExtendedAttendance.filter(a => a.studentId === user.id);
  
  // Calculate attendance statistics
  const totalClasses = studentAttendance.length;
  const presentCount = studentAttendance.filter(a => a.status === "present").length;
  const absentCount = studentAttendance.filter(a => a.status === "absent").length;
  const lateCount = studentAttendance.filter(a => a.status === "late").length;
  
  const attendancePercentage = totalClasses > 0 
    ? Math.round((presentCount / totalClasses) * 100) 
    : 0;
  
  return (
    <PageLayout title="Attendance Reports">
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">My Attendance Reports</h1>
            <p className="text-muted-foreground">View and download your attendance reports</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Select defaultValue="current">
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Semester</SelectItem>
                <SelectItem value="previous">Previous Semester</SelectItem>
                <SelectItem value="year">Academic Year</SelectItem>
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
              <p className="text-xs text-muted-foreground">Current semester</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Present</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{presentCount}</div>
              <p className="text-xs text-muted-foreground">Classes attended</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Absent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{absentCount}</div>
              <p className="text-xs text-muted-foreground">Classes missed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${
                attendancePercentage >= 75 
                  ? "text-green-600" 
                  : attendancePercentage >= 65 
                    ? "text-yellow-600" 
                    : "text-red-600"
              }`}>
                {attendancePercentage}%
              </div>
              <p className="text-xs text-muted-foreground">
                {attendancePercentage >= 75 
                  ? "Good standing" 
                  : attendancePercentage >= 65 
                    ? "Warning: Attendance needs improvement" 
                    : "Critical: Below minimum requirement"}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <Tabs defaultValue="subject">
              <div className="flex items-center justify-between">
                <CardTitle>Attendance Reports</CardTitle>
                <TabsList>
                  <TabsTrigger value="subject">By Subject</TabsTrigger>
                  <TabsTrigger value="date">By Date</TabsTrigger>
                </TabsList>
              </div>
              <CardDescription>Detailed attendance breakdown</CardDescription>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="subject" className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-5 bg-muted/50 p-4 font-medium">
                  <div>Subject</div>
                  <div>Total Classes</div>
                  <div>Present</div>
                  <div>Absent</div>
                  <div>Percentage</div>
                </div>
                <div className="divide-y">
                  {/* Mock subject data */}
                  {["Data Structures", "Computer Networks", "Database Systems", "Operating Systems", "Web Development"].map(subject => {
                    // Mock statistics for each subject
                    const total = Math.floor(Math.random() * 10) + 20;
                    const present = Math.floor(Math.random() * (total - 5)) + 5;
                    const absent = total - present;
                    const percentage = Math.round((present / total) * 100);
                    
                    return (
                      <div key={subject} className="grid grid-cols-5 p-4 hover:bg-muted/50">
                        <div className="font-medium">{subject}</div>
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
            
            <TabsContent value="date">
              <div className="rounded-md border">
                <div className="grid grid-cols-5 bg-muted/50 p-4 font-medium">
                  <div>Date</div>
                  <div>Day</div>
                  <div>Subject</div>
                  <div>Status</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y">
                  {/* Mock date-wise data */}
                  {Array.from({ length: 10 }).map((_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    const subjects = ["Data Structures", "Computer Networks", "Database Systems", "Operating Systems", "Web Development"];
                    const statuses = ["present", "absent", "late"];
                    const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
                    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
                    
                    return (
                      <div key={i} className="grid grid-cols-5 p-4 hover:bg-muted/50">
                        <div>{date.toLocaleDateString()}</div>
                        <div>{['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()]}</div>
                        <div>{randomSubject}</div>
                        <div>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            randomStatus === "present"
                              ? "bg-green-100 text-green-800"
                              : randomStatus === "absent"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {randomStatus}
                          </span>
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
      </div>
    </PageLayout>
  );
};

export default StudentReports;
