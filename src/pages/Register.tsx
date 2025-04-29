
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState<"student" | "teacher" | "admin">("student");
  
  // Student specific fields
  const [studentId, setStudentId] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  
  // Teacher specific fields
  const [teacherId, setTeacherId] = useState("");
  const [designation, setDesignation] = useState("");
  
  const { register, isLoading } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all required fields");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    
    // Role specific validations
    if (role === "student" && (!studentId || !course || !semester)) {
      setError("Please fill all student details");
      return;
    }
    
    if (role === "teacher" && (!teacherId || !designation)) {
      setError("Please fill all teacher details");
      return;
    }
    
    try {
      const userData = {
        name,
        email,
        role,
        ...(role === "student" && {
          studentId,
          course,
          semester: parseInt(semester),
          department: "School of ICT"
        }),
        ...(role === "teacher" && {
          teacherId,
          designation,
          department: "School of ICT",
          subjects: []
        }),
        ...(role === "admin" && {
          adminId: "admin-" + Date.now(),
          permissions: []
        })
      };
      
      await register(userData, password);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred during registration");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gbu-soft-blue to-white py-12 px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center">
          <img
            src="/lovable-uploads/ae0bfa2b-3413-4a95-8879-2830e82a6f0c.png"
            alt="GBU Logo"
            className="w-20 h-20 mb-2"
          />
          <h1 className="text-2xl font-bold text-center text-gray-800">
            GBU ICT Attendance Portal
          </h1>
          <p className="text-gray-600 text-center text-sm">
            School of Information &amp; Communication Technology
          </p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center">Register</CardTitle>
            <CardDescription className="text-center">
              Create your account to access the portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" onValueChange={(value) => setRole(value as any)}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="teacher">Teacher</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>

              <form onSubmit={handleRegister}>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={`${role}@gbu.ac.in`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  {role === "student" && (
                    <>
                      <div>
                        <Label htmlFor="studentId">Student ID</Label>
                        <Input
                          id="studentId"
                          type="text"
                          placeholder="e.g., 20ICT1001"
                          value={studentId}
                          onChange={(e) => setStudentId(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="course">Course</Label>
                        <Select value={course} onValueChange={setCourse}>
                          <SelectTrigger id="course">
                            <SelectValue placeholder="Select course" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="B.Tech">B.Tech</SelectItem>
                            <SelectItem value="M.Tech">M.Tech</SelectItem>
                            <SelectItem value="PhD">PhD</SelectItem>
                            <SelectItem value="BCA">BCA</SelectItem>
                            <SelectItem value="MCA">MCA</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="semester">Semester</Label>
                        <Select value={semester} onValueChange={setSemester}>
                          <SelectTrigger id="semester">
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
                    </>
                  )}
                  
                  {role === "teacher" && (
                    <>
                      <div>
                        <Label htmlFor="teacherId">Teacher ID</Label>
                        <Input
                          id="teacherId"
                          type="text"
                          placeholder="e.g., ICT-F-001"
                          value={teacherId}
                          onChange={(e) => setTeacherId(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="designation">Designation</Label>
                        <Select value={designation} onValueChange={setDesignation}>
                          <SelectTrigger id="designation">
                            <SelectValue placeholder="Select designation" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Professor">Professor</SelectItem>
                            <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                            <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                            <SelectItem value="Lecturer">Lecturer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                  
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Min. 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Registering..." : "Register"}
                  </Button>
                </div>
              </form>
            </Tabs>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-center w-full">
              <span>Already have an account? </span>
              <Link to="/login" className="text-gbu-purple hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
        
        <p className="text-center text-sm text-gray-600 mt-6">
          Gautam Buddha University © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Register;
