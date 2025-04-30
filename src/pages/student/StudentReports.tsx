
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, FileText, Filter } from "lucide-react";
import { mockExtendedAttendance, mockWeekClasses } from "@/data/mockData";

const StudentReports = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // Filter attendance data for the current student
  const studentAttendance = mockExtendedAttendance.filter(
    (record) => record.studentId === "s1" // In a real app, this would use the actual user ID
  );
  
  // Calculate attendance statistics
  const totalClasses = studentAttendance.length;
  const presentCount = studentAttendance.filter((record) => record.status === "present").length;
  const absentCount = studentAttendance.filter((record) => record.status === "absent").length;
  const lateCount = studentAttendance.filter((record) => record.status === "late").length;
  
  const attendancePercentage = totalClasses > 0 
    ? Math.round((presentCount / totalClasses) * 100) 
    : 0;
  
  // Get list of unique subjects from the classes
  const subjects = [...new Set(mockWeekClasses.map((cls) => cls.subject))];
  
  return (
    <PageLayout title="Attendance Reports">
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">My Attendance Reports</h2>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download Full Report
            </Button>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClasses}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Present</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{presentCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Absent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{absentCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Attendance Percentage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendancePercentage}%</div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Subject-wise Attendance Report</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Subjects</TabsTrigger>
                {subjects.map((subject) => (
                  <TabsTrigger key={subject} value={subject}>
                    {subject}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value="all">
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 border-b bg-muted/50 p-2 font-medium">
                    <div>Subject</div>
                    <div>Date</div>
                    <div>Time</div>
                    <div>Status</div>
                    <div>Method</div>
                  </div>
                  <div className="divide-y">
                    {studentAttendance.map((record) => {
                      const classInfo = mockWeekClasses.find((cls) => cls.id === record.classId);
                      if (!classInfo) return null;
                      
                      return (
                        <div key={record.id} className="grid grid-cols-5 p-2">
                          <div>{classInfo.subject}</div>
                          <div>{record.date}</div>
                          <div>{`${classInfo.startTime} - ${classInfo.endTime}`}</div>
                          <div>
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                record.status === "present"
                                  ? "bg-green-100 text-green-800"
                                  : record.status === "absent"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {record.status}
                            </span>
                          </div>
                          <div>
                            {record.qrScanned ? "QR Scan" : "Manual"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>
              
              {subjects.map((subject) => {
                const subjectAttendance = studentAttendance.filter((record) => {
                  const classInfo = mockWeekClasses.find((cls) => cls.id === record.classId);
                  return classInfo && classInfo.subject === subject;
                });
                
                const subjectClasses = subjectAttendance.length;
                const subjectPresent = subjectAttendance.filter((record) => record.status === "present").length;
                const subjectPercentage = subjectClasses > 0 
                  ? Math.round((subjectPresent / subjectClasses) * 100) 
                  : 0;
                
                return (
                  <TabsContent key={subject} value={subject}>
                    <div className="mb-4 grid gap-4 md:grid-cols-3">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{subjectClasses}</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Present</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{subjectPresent}</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Attendance Percentage</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{subjectPercentage}%</div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="rounded-md border">
                      <div className="grid grid-cols-4 border-b bg-muted/50 p-2 font-medium">
                        <div>Date</div>
                        <div>Time</div>
                        <div>Status</div>
                        <div>Method</div>
                      </div>
                      <div className="divide-y">
                        {subjectAttendance.map((record) => {
                          const classInfo = mockWeekClasses.find((cls) => cls.id === record.classId);
                          if (!classInfo) return null;
                          
                          return (
                            <div key={record.id} className="grid grid-cols-4 p-2">
                              <div>{record.date}</div>
                              <div>{`${classInfo.startTime} - ${classInfo.endTime}`}</div>
                              <div>
                                <span
                                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                    record.status === "present"
                                      ? "bg-green-100 text-green-800"
                                      : record.status === "absent"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {record.status}
                                </span>
                              </div>
                              <div>
                                {record.qrScanned ? "QR Scan" : "Manual"}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Download Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <Button variant="outline" className="h-auto flex-col items-start gap-1 p-4">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    <span className="font-semibold">Monthly Report</span>
                  </div>
                  <Download className="h-4 w-4" />
                </div>
                <p className="text-xs text-muted-foreground text-left">
                  Download your complete monthly attendance report
                </p>
              </Button>
              
              <Button variant="outline" className="h-auto flex-col items-start gap-1 p-4">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    <span className="font-semibold">Semester Report</span>
                  </div>
                  <Download className="h-4 w-4" />
                </div>
                <p className="text-xs text-muted-foreground text-left">
                  Download your complete semester attendance report
                </p>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default StudentReports;
