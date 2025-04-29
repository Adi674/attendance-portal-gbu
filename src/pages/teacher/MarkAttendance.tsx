
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { mockClasses, mockStudents, mockExtendedAttendance } from "@/data/mockData";
import { Check, X, Calendar } from "lucide-react";

const MarkAttendance = () => {
  const { classId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [selectedClass, setSelectedClass] = useState(classId || "");
  const [filter, setFilter] = useState("");
  const [attendance, setAttendance] = useState<Record<string, "present" | "absent" | "late">>({});
  
  if (!user) return null;

  // Filter classes for this teacher
  const teacherClasses = mockClasses.filter(cls => cls.teacherId === user.id);
  
  // Get students for selected class (in a real app, this would be filtered by enrollment data)
  const classDetails = teacherClasses.find(cls => cls.id === selectedClass);
  
  // For demo purposes, show all students for the selected semester and department
  const students = classDetails ? mockStudents.filter(student => 
    student.department === classDetails.department && 
    student.semester === classDetails.semester
  ) : [];
  
  // Check if attendance is already marked for the selected class today
  const today = new Date().toISOString().split('T')[0];
  const isAttendanceMarked = selectedClass ? 
    mockExtendedAttendance.some(a => 
      a.classId === selectedClass && 
      a.date === today
    ) : false;
  
  // Filter students by name or ID
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(filter.toLowerCase()) ||
    student.studentId.toLowerCase().includes(filter.toLowerCase())
  );

  // Initialize attendance state from any existing records
  React.useEffect(() => {
    if (selectedClass) {
      const todayAttendance = mockExtendedAttendance.filter(
        a => a.classId === selectedClass && a.date === today
      );
      
      const newAttendance: Record<string, "present" | "absent" | "late"> = {};
      
      todayAttendance.forEach(record => {
        newAttendance[record.studentId] = record.status;
      });
      
      setAttendance(newAttendance);
    }
  }, [selectedClass]);

  const handleClassChange = (classId: string) => {
    setSelectedClass(classId);
    // Reset attendance when changing class
    setAttendance({});
  };

  const handleAttendanceChange = (studentId: string, status: "present" | "absent" | "late") => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const markAllPresent = () => {
    const newAttendance: Record<string, "present" | "absent" | "late"> = {};
    students.forEach(student => {
      newAttendance[student.id] = "present";
    });
    setAttendance(newAttendance);
  };

  const saveAttendance = () => {
    // Ensure all students have attendance marked
    const allMarked = students.every(student => attendance[student.id]);
    
    if (!allMarked) {
      toast.error("Please mark attendance for all students");
      return;
    }
    
    // In a real app, save to database here
    toast.success("Attendance marked successfully!");
    
    // Navigate back to dashboard
    navigate("/teacher/dashboard");
  };

  return (
    <PageLayout title="Mark Attendance">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mark Attendance</CardTitle>
            <CardDescription>
              Select a class and mark attendance for students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="class">Select Class</Label>
                  <Select 
                    value={selectedClass} 
                    onValueChange={handleClassChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                      {teacherClasses.map(cls => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.subject} - {cls.date} ({cls.startTime})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="flex items-center border rounded-md px-3 py-2 bg-muted/30">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{today}</span>
                  </div>
                </div>
              </div>

              {selectedClass ? (
                <>
                  <div className="flex items-center justify-between">
                    <div className="space-y-2 w-full max-w-xs">
                      <Label htmlFor="filter">Search Student</Label>
                      <Input
                        id="filter"
                        placeholder="Search by name or ID"
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                      />
                    </div>
                    <Button 
                      onClick={markAllPresent}
                      variant="outline" 
                      className="mt-8"
                    >
                      Mark All Present
                    </Button>
                  </div>

                  {isAttendanceMarked && (
                    <div className="bg-amber-50 text-amber-800 p-4 rounded-md border border-amber-200">
                      Attendance has already been marked for this class today. Any changes will update the existing records.
                    </div>
                  )}

                  {filteredStudents.length > 0 ? (
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Present</TableHead>
                            <TableHead>Absent</TableHead>
                            <TableHead>Late</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredStudents.map(student => (
                            <TableRow key={student.id}>
                              <TableCell className="font-medium">
                                {student.studentId}
                              </TableCell>
                              <TableCell>{student.name}</TableCell>
                              <TableCell>
                                <Button
                                  variant={attendance[student.id] === "present" ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => handleAttendanceChange(student.id, "present")}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant={attendance[student.id] === "absent" ? "destructive" : "outline"}
                                  size="sm"
                                  onClick={() => handleAttendanceChange(student.id, "absent")}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant={attendance[student.id] === "late" ? "secondary" : "outline"}
                                  size="sm"
                                  onClick={() => handleAttendanceChange(student.id, "late")}
                                >
                                  Late
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center p-8 border rounded-md bg-muted/30">
                      No students found matching your search criteria.
                    </div>
                  )}

                  <div className="flex justify-end gap-4 mt-4">
                    <Button variant="outline" onClick={() => navigate("/teacher/dashboard")}>
                      Cancel
                    </Button>
                    <Button onClick={saveAttendance}>
                      Save Attendance
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center p-8 border rounded-md bg-muted/30">
                  Please select a class to mark attendance.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default MarkAttendance;
