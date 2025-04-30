
import React from "react";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for student schedule
const mockSchedule = [
  {
    id: "1",
    day: "Monday",
    classes: [
      {
        id: "c1",
        subject: "Introduction to Computer Science",
        teacher: "Dr. Robert Smith",
        room: "ICT-301",
        startTime: "09:00",
        endTime: "10:30"
      },
      {
        id: "c2",
        subject: "Calculus I",
        teacher: "Dr. Jane Wilson",
        room: "ICT-201",
        startTime: "11:00",
        endTime: "12:30"
      }
    ]
  },
  {
    id: "2",
    day: "Tuesday",
    classes: [
      {
        id: "c3",
        subject: "Physics",
        teacher: "Dr. Emily Johnson",
        room: "ICT-305",
        startTime: "09:00",
        endTime: "10:30"
      },
      {
        id: "c4",
        subject: "Digital Logic Design",
        teacher: "Prof. David Clark",
        room: "ICT-202",
        startTime: "13:00",
        endTime: "14:30"
      }
    ]
  },
  {
    id: "3",
    day: "Wednesday",
    classes: [
      {
        id: "c5",
        subject: "Introduction to Computer Science",
        teacher: "Dr. Robert Smith",
        room: "ICT-301",
        startTime: "09:00",
        endTime: "10:30"
      },
      {
        id: "c6",
        subject: "Programming Lab",
        teacher: "Dr. Lisa Zhang",
        room: "ICT-Lab 2",
        startTime: "14:00",
        endTime: "16:00"
      }
    ]
  },
  {
    id: "4",
    day: "Thursday",
    classes: [
      {
        id: "c7",
        subject: "Physics Lab",
        teacher: "Dr. Emily Johnson",
        room: "Science Lab 3",
        startTime: "10:00",
        endTime: "12:00"
      },
      {
        id: "c8",
        subject: "English Communication",
        teacher: "Prof. Sarah Adams",
        room: "ICT-105",
        startTime: "13:30",
        endTime: "15:00"
      }
    ]
  },
  {
    id: "5",
    day: "Friday",
    classes: [
      {
        id: "c9",
        subject: "Calculus I",
        teacher: "Dr. Jane Wilson",
        room: "ICT-201",
        startTime: "09:00",
        endTime: "10:30"
      },
      {
        id: "c10",
        subject: "Digital Logic Design",
        teacher: "Prof. David Clark",
        room: "ICT-202",
        startTime: "11:00",
        endTime: "12:30"
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

const StudentSchedule = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <PageLayout title="Class Schedule">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>My Class Schedule</CardTitle>
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
                            className="mb-3 p-3 border rounded-lg bg-background flex flex-col gap-2"
                          >
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">{classItem.subject}</h4>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                {classItem.startTime} - {classItem.endTime}
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              <p>{classItem.teacher}</p>
                              <p>Room: {classItem.room}</p>
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
                                            <span className="text-sm text-muted-foreground ml-2">
                                              ({classItem.room})
                                            </span>
                                          </div>
                                          <div className="text-xs text-muted-foreground">
                                            {classItem.startTime} - {classItem.endTime}
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

export default StudentSchedule;
