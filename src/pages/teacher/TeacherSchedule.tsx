
import React from "react";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";

// Mock data for teacher schedule
const mockSchedule = [
  {
    id: "1",
    day: "Monday",
    classes: [
      {
        id: "c1",
        subject: "Advanced Database Systems",
        semester: 5,
        department: "Computer Science",
        room: "ICT-301",
        startTime: "09:00",
        endTime: "10:30",
        students: 45
      },
      {
        id: "c2",
        subject: "Web Development",
        semester: 3,
        department: "Information Technology",
        room: "ICT-201",
        startTime: "11:00",
        endTime: "12:30",
        students: 38
      }
    ]
  },
  {
    id: "2",
    day: "Tuesday",
    classes: [
      {
        id: "c3",
        subject: "Artificial Intelligence",
        semester: 6,
        department: "Computer Science",
        room: "ICT-305",
        startTime: "09:00",
        endTime: "10:30",
        students: 32
      },
      {
        id: "c4",
        subject: "Web Development",
        semester: 3,
        department: "Information Technology",
        room: "ICT-Lab 1",
        startTime: "13:00",
        endTime: "15:00",
        students: 38
      }
    ]
  },
  {
    id: "3",
    day: "Wednesday",
    classes: [
      {
        id: "c5",
        subject: "Advanced Database Systems",
        semester: 5,
        department: "Computer Science",
        room: "ICT-301",
        startTime: "09:00",
        endTime: "10:30",
        students: 45
      },
      {
        id: "c6",
        subject: "Software Engineering",
        semester: 4,
        department: "Computer Science",
        room: "ICT-202",
        startTime: "14:00",
        endTime: "15:30",
        students: 50
      }
    ]
  },
  {
    id: "4",
    day: "Thursday",
    classes: [
      {
        id: "c7",
        subject: "Artificial Intelligence",
        semester: 6,
        department: "Computer Science",
        room: "ICT-Lab 3",
        startTime: "10:00",
        endTime: "12:00",
        students: 32
      }
    ]
  },
  {
    id: "5",
    day: "Friday",
    classes: [
      {
        id: "c8",
        subject: "Software Engineering",
        semester: 4,
        department: "Computer Science",
        room: "ICT-202",
        startTime: "09:00",
        endTime: "10:30",
        students: 50
      },
      {
        id: "c9",
        subject: "Web Development",
        semester: 3,
        department: "Information Technology",
        room: "ICT-Lab 1",
        startTime: "13:00",
        endTime: "15:00",
        students: 38
      }
    ]
  }
];

// Group schedule by week and month
const weeklySchedule = mockSchedule;
const monthlySchedule = [
  {
    month: "September 2023",
    weeks: [
      {
        weekNumber: 1,
        days: weeklySchedule
      },
      {
        weekNumber: 2,
        days: weeklySchedule
      },
      {
        weekNumber: 3,
        days: weeklySchedule
      },
      {
        weekNumber: 4,
        days: weeklySchedule
      }
    ]
  }
];

const TeacherSchedule = () => {
  const { user } = useAuth();
  
  if (!user) return <React.Fragment />;

  return (
    <PageLayout title="Class Schedule">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>My Teaching Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="weekly" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="weekly">Weekly View</TabsTrigger>
                <TabsTrigger value="monthly">Monthly View</TabsTrigger>
              </TabsList>
              
              <TabsContent value="weekly">
                <div className="grid gap-4">
                  {weeklySchedule.map((day) => (
                    <Card key={day.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{day.day}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {day.classes.map((classItem) => (
                          <div
                            key={classItem.id}
                            className="mb-3 p-4 border rounded-lg bg-background"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-medium">{classItem.subject}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {classItem.department} - Semester {classItem.semester}
                                </p>
                              </div>
                              <div className="flex flex-col items-end">
                                <div className="flex items-center text-sm">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {classItem.startTime} - {classItem.endTime}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {classItem.room}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center mt-2 text-sm">
                              <Users className="h-4 w-4 mr-1" />
                              <span>{classItem.students} students</span>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="monthly">
                <div className="grid gap-6">
                  {monthlySchedule.map((month) => (
                    <div key={month.month}>
                      <h3 className="text-lg font-medium mb-4">{month.month}</h3>
                      <div className="grid gap-6">
                        {month.weeks.map((week) => (
                          <Card key={week.weekNumber}>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">Week {week.weekNumber}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="grid gap-4">
                                {week.days.map((day) => (
                                  <div key={day.id}>
                                    <h4 className="font-medium mb-2">{day.day}</h4>
                                    <div className="grid gap-2">
                                      {day.classes.map((classItem) => (
                                        <div
                                          key={classItem.id}
                                          className="p-2 border rounded bg-muted/50 flex justify-between items-center"
                                        >
                                          <div>
                                            <span className="font-medium">{classItem.subject}</span>
                                            <span className="text-xs text-muted-foreground ml-2">
                                              (Sem {classItem.semester})
                                            </span>
                                          </div>
                                          <div className="text-xs">
                                            <span className="text-muted-foreground">{classItem.room}</span>
                                            <span className="mx-1">•</span>
                                            <span>{classItem.startTime} - {classItem.endTime}</span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default TeacherSchedule;
