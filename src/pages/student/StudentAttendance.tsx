
import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertCircle, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

// Mock attendance data for the current student
const mockAttendanceData = [
  {
    subject: "Introduction to Computer Science",
    totalClasses: 15,
    attended: 14,
    lastFewClasses: [
      { date: "2023-09-05", status: "present" },
      { date: "2023-09-07", status: "present" },
      { date: "2023-09-12", status: "present" },
      { date: "2023-09-14", status: "absent" },
      { date: "2023-09-19", status: "present" }
    ]
  },
  {
    subject: "Calculus I",
    totalClasses: 12,
    attended: 10,
    lastFewClasses: [
      { date: "2023-09-04", status: "present" },
      { date: "2023-09-08", status: "absent" },
      { date: "2023-09-11", status: "present" },
      { date: "2023-09-15", status: "present" },
      { date: "2023-09-18", status: "absent" }
    ]
  },
  {
    subject: "Physics",
    totalClasses: 10,
    attended: 9,
    lastFewClasses: [
      { date: "2023-09-05", status: "present" },
      { date: "2023-09-08", status: "present" },
      { date: "2023-09-12", status: "present" },
      { date: "2023-09-15", status: "present" },
      { date: "2023-09-19", status: "present" }
    ]
  },
  {
    subject: "Digital Logic Design",
    totalClasses: 14,
    attended: 12,
    lastFewClasses: [
      { date: "2023-09-04", status: "present" },
      { date: "2023-09-07", status: "present" },
      { date: "2023-09-11", status: "absent" },
      { date: "2023-09-14", status: "present" },
      { date: "2023-09-18", status: "present" }
    ]
  },
  {
    subject: "English Communication",
    totalClasses: 8,
    attended: 6,
    lastFewClasses: [
      { date: "2023-09-06", status: "absent" },
      { date: "2023-09-13", status: "present" },
      { date: "2023-09-20", status: "absent" },
      { date: "2023-09-27", status: "present" },
      { date: "2023-10-04", status: "present" }
    ]
  }
];

// Mock detailed attendance data for calendar view
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

// Generate attendance data for each day of the month
const calendarData = Array.from({ length: daysInMonth }, (_, i) => {
  const day = i + 1;
  const date = new Date(currentYear, currentMonth, day);
  
  // Skip weekends
  if (date.getDay() === 0 || date.getDay() === 6) {
    return {
      date,
      classes: []
    };
  }
  
  // Random attendance data for weekdays
  return {
    date,
    classes: mockAttendanceData.map(subject => ({
      subject: subject.subject,
      status: Math.random() > 0.2 ? "present" : "absent"
    }))
  };
});

const StudentAttendance = () => {
  const { user } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  
  if (!user) return null;

  // Calculate overall attendance percentage
  const totalClasses = mockAttendanceData.reduce((sum, subject) => sum + subject.totalClasses, 0);
  const attendedClasses = mockAttendanceData.reduce((sum, subject) => sum + subject.attended, 0);
  const overallPercentage = Math.round((attendedClasses / totalClasses) * 100);

  // Status color based on percentage
  const getStatusColor = (percentage: number) => {
    if (percentage >= 75) return "text-green-500";
    if (percentage >= 60) return "text-amber-500";
    return "text-red-500";
  };

  // Status icon based on attendance status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "absent":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
    }
  };

  return (
    <PageLayout title="My Attendance">
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Overall Attendance</CardTitle>
              <CardDescription>{attendedClasses} out of {totalClasses} classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2 flex items-center">
                <span className={getStatusColor(overallPercentage)}>{overallPercentage}%</span>
              </div>
              <Progress value={overallPercentage} className="h-2" />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Attendance by Subject</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary">
                <div className="grid gap-4">
                  {mockAttendanceData.map((subject, index) => {
                    const percentage = Math.round((subject.attended / subject.totalClasses) * 100);
                    return (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-base">{subject.subject}</CardTitle>
                            <span className={`font-medium ${getStatusColor(percentage)}`}>{percentage}%</span>
                          </div>
                          <CardDescription>
                            {subject.attended} out of {subject.totalClasses} classes attended
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Progress value={percentage} className="h-2 mb-4" />
                          <div className="flex items-center justify-between mt-2">
                            <div className="text-sm">Recent classes:</div>
                            <div className="flex space-x-1">
                              {subject.lastFewClasses.map((cls, idx) => (
                                <div 
                                  key={idx} 
                                  className="tooltip" 
                                  title={`${format(new Date(cls.date), 'MMM dd, yyyy')}: ${cls.status}`}
                                >
                                  {getStatusIcon(cls.status)}
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
              
              <TabsContent value="calendar">
                <div className="space-y-4">
                  <div className="flex items-center justify-center mb-4">
                    <h3 className="text-xl font-medium">
                      {format(new Date(currentYear, currentMonth, 1), 'MMMM yyyy')}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="font-medium text-sm py-1">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1">
                    {/* Empty cells for days before the 1st of the month */}
                    {Array.from({ length: new Date(currentYear, currentMonth, 1).getDay() }).map((_, i) => (
                      <div 
                        key={`empty-start-${i}`} 
                        className="aspect-square p-1 border rounded-md bg-muted/30"
                      />
                    ))}
                    
                    {/* Calendar days */}
                    {calendarData.map((day, i) => {
                      const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6;
                      
                      return (
                        <div
                          key={i}
                          className={`aspect-square p-1 border rounded-md flex flex-col
                                    ${isWeekend ? 'bg-muted/30' : 'hover:bg-accent/50 transition-colors'}`}
                        >
                          <div className="text-sm font-medium mb-1 text-center">
                            {day.date.getDate()}
                          </div>
                          
                          {!isWeekend && day.classes.length > 0 && (
                            <div className="flex flex-wrap gap-0.5 justify-center">
                              {day.classes.slice(0, 3).map((cls, idx) => (
                                <div key={idx} className="tooltip" title={cls.subject}>
                                  {getStatusIcon(cls.status)}
                                </div>
                              ))}
                              {day.classes.length > 3 && (
                                <span className="text-xs text-muted-foreground">+{day.classes.length - 3}</span>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                    
                    {/* Empty cells for days after the end of the month */}
                    {Array.from({ length: 6 - new Date(currentYear, currentMonth, daysInMonth).getDay() }).map((_, i) => (
                      <div 
                        key={`empty-end-${i}`} 
                        className="aspect-square p-1 border rounded-md bg-muted/30"
                      />
                    ))}
                  </div>
                  
                  <div className="flex justify-center items-center space-x-2 mt-4">
                    <div className="flex items-center space-x-1">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Present</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Absent</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default StudentAttendance;
