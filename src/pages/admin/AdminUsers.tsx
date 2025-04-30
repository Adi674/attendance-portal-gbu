
import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  MoreHorizontal, 
  UserPlus, 
  Search, 
  UserCog,
  Trash2,
  FileEdit,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  UserRound,
  Users
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Mock users data
const mockStudents = [
  { 
    id: "s1", 
    name: "John Smith", 
    email: "john.smith@gbu.edu", 
    studentId: "ST2023001",
    department: "Computer Science",
    course: "B.Tech",
    semester: 5,
    status: "active"
  },
  { 
    id: "s2", 
    name: "Emily Johnson", 
    email: "emily.johnson@gbu.edu", 
    studentId: "ST2023002",
    department: "Information Technology",
    course: "B.Tech",
    semester: 3,
    status: "active"
  },
  { 
    id: "s3", 
    name: "Michael Brown", 
    email: "michael.brown@gbu.edu", 
    studentId: "ST2023003",
    department: "Computer Science",
    course: "M.Tech",
    semester: 1,
    status: "active"
  },
  { 
    id: "s4", 
    name: "Sarah Davis", 
    email: "sarah.davis@gbu.edu", 
    studentId: "ST2023004",
    department: "Electronics",
    course: "B.Tech",
    semester: 7,
    status: "inactive"
  },
  { 
    id: "s5", 
    name: "David Wilson", 
    email: "david.wilson@gbu.edu", 
    studentId: "ST2023005",
    department: "Mechanical Engineering",
    course: "B.Tech",
    semester: 5,
    status: "active"
  }
];

const mockTeachers = [
  { 
    id: "t1", 
    name: "Dr. Robert Smith", 
    email: "robert.smith@gbu.edu", 
    teacherId: "TCH2023001",
    department: "Computer Science",
    subjects: ["Introduction to Computer Science", "Advanced Programming"],
    designation: "Associate Professor",
    status: "active"
  },
  { 
    id: "t2", 
    name: "Dr. Jane Wilson", 
    email: "jane.wilson@gbu.edu", 
    teacherId: "TCH2023002",
    department: "Mathematics",
    subjects: ["Calculus I", "Linear Algebra"],
    designation: "Professor",
    status: "active"
  },
  { 
    id: "t3", 
    name: "Prof. David Clark", 
    email: "david.clark@gbu.edu", 
    teacherId: "TCH2023003",
    department: "Computer Science",
    subjects: ["Digital Logic Design", "Computer Architecture"],
    designation: "Assistant Professor",
    status: "active"
  },
  { 
    id: "t4", 
    name: "Dr. Emily Johnson", 
    email: "emily.johnson@gbu.edu", 
    teacherId: "TCH2023004",
    department: "Physics",
    subjects: ["Physics I", "Mechanics"],
    designation: "Professor",
    status: "inactive"
  }
];

const mockAdmins = [
  { 
    id: "a1", 
    name: "Admin User", 
    email: "admin@gbu.edu", 
    adminId: "ADM2023001",
    permissions: ["all"],
    status: "active"
  },
  { 
    id: "a2", 
    name: "Department Admin", 
    email: "dept.admin@gbu.edu", 
    adminId: "ADM2023002",
    permissions: ["users", "scheduling"],
    status: "active"
  },
  { 
    id: "a3", 
    name: "Reports Admin", 
    email: "reports.admin@gbu.edu", 
    adminId: "ADM2023003",
    permissions: ["reports", "analytics"],
    status: "active"
  }
];

const AdminUsers = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTab, setCurrentTab] = useState("students");
  
  if (!user) return null;

  // Filter users based on search term
  const filteredStudents = mockStudents.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredTeachers = mockTeachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.teacherId.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredAdmins = mockAdmins.filter(admin => 
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.adminId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // User actions
  const handleAddUser = () => {
    setSelectedUser(null);
    setIsEditing(false);
    setUserDialogOpen(true);
  };
  
  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setIsEditing(true);
    setUserDialogOpen(true);
  };
  
  const handleDeleteUser = (user: any) => {
    toast.success(`User ${user.name} has been deleted`);
  };
  
  const handleToggleStatus = (user: any) => {
    const newStatus = user.status === "active" ? "inactive" : "active";
    toast.success(`User ${user.name} status set to ${newStatus}`);
  };
  
  const handleSaveUser = () => {
    if (isEditing) {
      toast.success("User updated successfully");
    } else {
      toast.success("New user created successfully");
    }
    setUserDialogOpen(false);
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <PageLayout title="User Management">
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 w-full max-w-sm">
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              icon={<Search className="h-4 w-4" />}
            />
          </div>
          <Button onClick={handleAddUser}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              Manage students, teachers and administrators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue="students" 
              className="w-full"
              onValueChange={setCurrentTab}
            >
              <TabsList className="mb-4 grid w-full grid-cols-3">
                <TabsTrigger value="students">
                  <UserRound className="h-4 w-4 mr-2" />
                  Students ({mockStudents.length})
                </TabsTrigger>
                <TabsTrigger value="teachers">
                  <Users className="h-4 w-4 mr-2" />
                  Teachers ({mockTeachers.length})
                </TabsTrigger>
                <TabsTrigger value="admins">
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  Admins ({mockAdmins.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="students">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="" />
                              <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-muted-foreground">{student.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>{student.studentId}</TableCell>
                          <TableCell>{student.department}</TableCell>
                          <TableCell>{student.course}</TableCell>
                          <TableCell>{student.semester}</TableCell>
                          <TableCell>
                            {student.status === "active" ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                Active
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
                                Inactive
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleEditUser(student)}>
                                  <FileEdit className="h-4 w-4 mr-2" />
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleToggleStatus(student)}>
                                  {student.status === "active" ? (
                                    <>
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Deactivate
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle2 className="h-4 w-4 mr-2" />
                                      Activate
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => handleDeleteUser(student)}
                                  className="text-red-500 focus:text-red-500"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          No students found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="teachers">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Teacher ID</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Designation</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTeachers.length > 0 ? (
                      filteredTeachers.map((teacher) => (
                        <TableRow key={teacher.id}>
                          <TableCell className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="" />
                              <AvatarFallback>{getInitials(teacher.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{teacher.name}</p>
                              <p className="text-sm text-muted-foreground">{teacher.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>{teacher.teacherId}</TableCell>
                          <TableCell>{teacher.department}</TableCell>
                          <TableCell>{teacher.designation}</TableCell>
                          <TableCell>
                            {teacher.status === "active" ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                Active
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
                                Inactive
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleEditUser(teacher)}>
                                  <FileEdit className="h-4 w-4 mr-2" />
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleToggleStatus(teacher)}>
                                  {teacher.status === "active" ? (
                                    <>
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Deactivate
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle2 className="h-4 w-4 mr-2" />
                                      Activate
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => handleDeleteUser(teacher)}
                                  className="text-red-500 focus:text-red-500"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No teachers found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="admins">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Admin ID</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAdmins.length > 0 ? (
                      filteredAdmins.map((admin) => (
                        <TableRow key={admin.id}>
                          <TableCell className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="" />
                              <AvatarFallback>{getInitials(admin.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{admin.name}</p>
                              <p className="text-sm text-muted-foreground">{admin.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>{admin.adminId}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {admin.permissions.map((permission, index) => (
                                <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                                  {permission}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            {admin.status === "active" ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                Active
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
                                Inactive
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleEditUser(admin)}>
                                  <FileEdit className="h-4 w-4 mr-2" />
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleToggleStatus(admin)}>
                                  {admin.status === "active" ? (
                                    <>
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Deactivate
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle2 className="h-4 w-4 mr-2" />
                                      Activate
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => handleDeleteUser(admin)}
                                  className="text-red-500 focus:text-red-500"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          No admins found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* Add/Edit User Dialog */}
      <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit User" : "Add New User"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Update user information" : "Fill in the details to create a new user"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right font-medium">
                Name
              </label>
              <Input
                id="name"
                defaultValue={selectedUser?.name || ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right font-medium">
                Email
              </label>
              <Input
                id="email"
                defaultValue={selectedUser?.email || ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="role" className="text-right font-medium">
                Role
              </label>
              <Select defaultValue={currentTab.slice(0, -1)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select user role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="department" className="text-right font-medium">
                Department
              </label>
              <Select defaultValue={selectedUser?.department || ""}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Information Technology">Information Technology</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right font-medium">
                Status
              </label>
              <Select defaultValue={selectedUser?.status || "active"}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveUser}>
              {isEditing ? "Update User" : "Create User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default AdminUsers;
