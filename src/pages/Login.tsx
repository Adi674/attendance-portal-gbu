
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState<"student" | "teacher" | "admin">("student");
  
  const { login, isLoading } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    
    try {
      await login(email, password);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred during login");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gbu-soft-blue to-white p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center">
          <img
            src="/lovable-uploads/ae0bfa2b-3413-4a95-8879-2830e82a6f0c.png"
            alt="GBU Logo"
            className="w-24 h-24 mb-2"
          />
          <h1 className="text-3xl font-bold text-center text-gray-800">
            GBU ICT Attendance Portal
          </h1>
          <p className="text-gray-600 text-center mt-2">
            School of Information &amp; Communication Technology
          </p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" onValueChange={(value) => setRole(value as any)}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="teacher">Teacher</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>

              <form onSubmit={handleLogin}>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder={`${role}@gbu.ac.in`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </form>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center">
              <Link to="/forgot-password" className="text-gbu-purple hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="text-sm text-center">
              <span>Don't have an account? </span>
              <Link to="/register" className="text-gbu-purple hover:underline">
                Register
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

export default Login;
