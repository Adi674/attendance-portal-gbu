
import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import {
  CalendarDays,
  Plus,
  Calendar,
  Clock,
  MapPin,
  Users,
  Pencil,
  Trash2,
  FileText,
  User,
  Book,
} from "lucide-react";

// Mock data for classes
const mockClasses = [
  {
    id: "1",
    subject: "Introduction to Computer Science",
    semester: 1,
    department: "Computer Science",
    teacher: "Dr. Robert Smith",
    room: "ICT-301",
    startTime: "09:00",
    endTime: "10:30",
    day: "Monday",
    students: 45,
  },
  {
    id: "2",
    subject: "Calculus I",
    semester: 1,
    department: "Mathematics",
    teacher: "Dr. Jane Wilson",
    room: "ICT-201",
    startTime: "11:00",
    endTime: "12:30",
    day: "Monday",
    students: 50,
  },
  {
    id: "3",
    subject: "Digital Logic Design",
    semester: 3,
    department: "Computer Science",
    teacher: "Prof. David Clark",
    room: "ICT-202",
    startTime: "14:00",
    endTime: "15:30",
    day: "Monday",
    students: 38,
  },
  {
    id: "4",
    subject: "Artificial Intelligence",
    semester: 7,
    department: "Computer Science",
    teacher: "Dr. Robert Smith",
    room: "ICT-305",
    startTime: "09:00",
    endTime: "10:30",
    day: "Tuesday",
    students: 30,
  },
  {
    id: "5",
    subject: "Web Development",
    semester: 5,
    department: "Information Technology",
    teacher: "Prof. Lisa Zhang",
    room: "ICT-Lab 1",
    startTime: "13:00",
    endTime: "15:00",
    day: "Tuesday",
    students: 35,
  },
];

// Mock data for departments and teachers
const departments = [
  "Computer Science",
  "Information Technology",
  "Electronics",
  "Mathematics",
  "Physics",
  "Mechanical Engineering",
];

const teachers = [
  "Dr. Robert Smith",
  "Dr. Jane Wilson",
  "Prof. David Clark",
  "Prof. Lisa Zhang",
  "Dr. Emily Johnson",
  "Prof. Sarah Adams",
];

const classRooms = [
  "ICT-301",
  "ICT-201",
  "ICT-202",
  "ICT-305",
  "ICT-Lab 1",
  "ICT-Lab 2",
  "ICT-Lab 3",
  "Science Lab 3",
];

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const AdminSchedule = () => {
  const { user } = useAuth();
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);

  if (!user) return null;

  // Group classes by weekday
  const classesByDay = weekdays.map((day) => {
    return {
      day,
      classes: mockClasses.filter((cls) => cls.day === day),
    };
  });

  const handleOpenAddClass = (day: string) => {
    setSelectedDay(day);
    setIsEditing(false);
    setSelectedClass(null);
    setIsAddClassOpen(true);
  };

  const handleEditClass = (classItem: any) => {
    setSelectedDay(classItem.day);
    setSelectedClass(classItem);
    setIsEditing(true);
    setIsAddClassOpen(true);
  };

  const handleDeleteClass = (classItem: any) => {
    toast.success(`Class "${classItem.subject}" has been deleted`);
  };

  const handleSaveClass = () => {
    if (isEditing) {
      toast.success(`Class "${selectedClass?.subject}" has been updated`);
    } else {
      toast.success("New class has been added to the schedule");
    }
    setIsAddClassOpen(false);
  };

  // Generate time slots
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 7; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const hourStr = hour.toString().padStart(2, "0");
        const minuteStr = minute.toString().padStart(2, "0");
        options.push(`${hourStr}:${minuteStr}`);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  return (
    <PageLayout title="Class Schedule Management">
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Class Schedule</h2>
          <div className="flex space-x-2">
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Export Schedule
            </Button>
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Generate Academic Calendar
            </Button>
          </div>
        </div>

        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="schedule">
              <CalendarDays className="h-4 w-4 mr-2" />
              Weekly Schedule
            </TabsTrigger>
            <TabsTrigger value="subjects">
              <Book className="h-4 w-4 mr-2" />
              Subjects
            </TabsTrigger>
            <TabsTrigger value="rooms">
              <MapPin className="h-4 w-4 mr-2" />
              Classrooms
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedule">
            {classesByDay.map((daySchedule) => (
              <Card key={daySchedule.day} className="mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{daySchedule.day}</CardTitle>
                    <Button
                      size="sm"
                      onClick={() => handleOpenAddClass(daySchedule.day)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Class
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {daySchedule.classes.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Time</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead>Teacher</TableHead>
                          <TableHead>Room</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Semester</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {daySchedule.classes.map((classItem) => (
                          <TableRow key={classItem.id}>
                            <TableCell>
                              {classItem.startTime} - {classItem.endTime}
                            </TableCell>
                            <TableCell>{classItem.subject}</TableCell>
                            <TableCell>{classItem.teacher}</TableCell>
                            <TableCell>{classItem.room}</TableCell>
                            <TableCell>{classItem.department}</TableCell>
                            <TableCell>{classItem.semester}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditClass(classItem)}
                                >
                                  <Pencil className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteClass(classItem)}
                                  className="text-red-500 hover:text-red-500"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No classes scheduled for this day
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="subjects">
            <Card>
              <CardHeader>
                <CardTitle>Subject Management</CardTitle>
                <CardDescription>
                  Manage subjects offered by the institution
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Subject management UI would go here */}
                <div className="text-center py-12 text-muted-foreground">
                  Subject management interface to be implemented
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rooms">
            <Card>
              <CardHeader>
                <CardTitle>Classroom Management</CardTitle>
                <CardDescription>
                  Manage classrooms and their availability
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Classroom management UI would go here */}
                <div className="text-center py-12 text-muted-foreground">
                  Classroom management interface to be implemented
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add/Edit Class Dialog */}
      <Dialog open={isAddClassOpen} onOpenChange={setIsAddClassOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Class Schedule" : "Add New Class"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update the details for this class"
                : `Schedule a new class for ${selectedDay}`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="subject" className="text-right text-sm font-medium">
                Subject
              </label>
              <Input
                id="subject"
                placeholder="Subject name"
                className="col-span-3"
                defaultValue={selectedClass?.subject || ""}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="department" className="text-right text-sm font-medium">
                Department
              </label>
              <Select defaultValue={selectedClass?.department || departments[0]}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="semester" className="text-right text-sm font-medium">
                Semester
              </label>
              <Select defaultValue={selectedClass?.semester?.toString() || "1"}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <SelectItem key={sem} value={sem.toString()}>
                      Semester {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="teacher" className="text-right text-sm font-medium">
                Teacher
              </label>
              <Select defaultValue={selectedClass?.teacher || teachers[0]}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher} value={teacher}>
                        {teacher}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="room" className="text-right text-sm font-medium">
                Classroom
              </label>
              <Select defaultValue={selectedClass?.room || classRooms[0]}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select classroom" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {classRooms.map((room) => (
                      <SelectItem key={room} value={room}>
                        {room}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="day" className="text-right text-sm font-medium">
                Day
              </label>
              <Select defaultValue={selectedDay}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {weekdays.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="start-time" className="text-right text-sm font-medium">
                Start Time
              </label>
              <Select defaultValue={selectedClass?.startTime || "09:00"}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select start time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {timeOptions.map((time) => (
                      <SelectItem key={`start-${time}`} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="end-time" className="text-right text-sm font-medium">
                End Time
              </label>
              <Select defaultValue={selectedClass?.endTime || "10:30"}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select end time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {timeOptions.map((time) => (
                      <SelectItem key={`end-${time}`} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddClassOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveClass}>
              {isEditing ? "Update" : "Schedule"} Class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default AdminSchedule;
