
import React from "react";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Plus, Calendar, Upload, Clock, X, Check } from "lucide-react";

const StudentRequests = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  // Mock attendance correction requests
  const attendanceRequests = [
    { 
      id: "1", 
      date: "2025-04-20", 
      subject: "Data Structures", 
      reason: "Present but marked absent", 
      status: "pending", 
      createdAt: "2025-04-21"
    },
    { 
      id: "2", 
      date: "2025-04-15", 
      subject: "Computer Networks", 
      reason: "Present but marked absent due to late scan", 
      status: "approved",
      reviewer: "Dr. Smith",
      reviewDate: "2025-04-17"
    },
    { 
      id: "3", 
      date: "2025-04-10", 
      subject: "Database Systems", 
      reason: "Technical issue with QR scanner", 
      status: "rejected",
      reviewer: "Dr. Johnson",
      reviewDate: "2025-04-12",
      comments: "No evidence provided"
    },
  ];
  
  // Mock leave applications
  const leaveRequests = [
    { 
      id: "1", 
      startDate: "2025-05-01", 
      endDate: "2025-05-03", 
      reason: "Medical emergency", 
      status: "pending", 
      createdAt: "2025-04-25"
    },
    { 
      id: "2", 
      startDate: "2025-04-10", 
      endDate: "2025-04-12", 
      reason: "Family function", 
      status: "approved",
      reviewer: "Dr. Williams",
      reviewDate: "2025-04-08"
    },
  ];
  
  return (
    <PageLayout title="Attendance Requests">
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">My Requests</h1>
            <p className="text-muted-foreground">Manage your attendance correction and leave requests</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Attendance Correction
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Attendance Correction Request</DialogTitle>
                  <DialogDescription>
                    Fill in the details to request a correction in your attendance record.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input id="date" type="date" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="data-structures">Data Structures</SelectItem>
                        <SelectItem value="computer-networks">Computer Networks</SelectItem>
                        <SelectItem value="database-systems">Database Systems</SelectItem>
                        <SelectItem value="operating-systems">Operating Systems</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reason">Reason for Correction</Label>
                    <Textarea 
                      id="reason" 
                      placeholder="Please explain why your attendance needs to be corrected"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="evidence">Supporting Evidence (Optional)</Label>
                    <div className="flex items-center">
                      <Button variant="outline" className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Document
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Accepted formats: PDF, JPG, PNG (Max: 5MB)
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Submit Request</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Apply for Leave
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Leave Application</DialogTitle>
                  <DialogDescription>
                    Submit a leave application for your absence.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input id="startDate" type="date" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input id="endDate" type="date" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="leaveReason">Reason for Leave</Label>
                    <Textarea 
                      id="leaveReason" 
                      placeholder="Please explain the reason for your leave"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="leaveEvidence">Supporting Document (Optional)</Label>
                    <div className="flex items-center">
                      <Button variant="outline" className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Document
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Accepted formats: PDF, JPG, PNG (Max: 5MB)
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Submit Leave Application</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <Tabs defaultValue="corrections">
              <div className="flex items-center justify-between">
                <CardTitle>My Requests</CardTitle>
                <TabsList>
                  <TabsTrigger value="corrections">Attendance Corrections</TabsTrigger>
                  <TabsTrigger value="leaves">Leave Applications</TabsTrigger>
                </TabsList>
              </div>
              <CardDescription>View status of your submitted requests</CardDescription>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="corrections" className="space-y-6">
              {attendanceRequests.length > 0 ? (
                <div className="divide-y">
                  {attendanceRequests.map(request => (
                    <div key={request.id} className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{request.subject}</h4>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              request.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : request.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}>
                              {request.status}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Date: {new Date(request.date).toLocaleDateString()}
                          </p>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">View Details</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Request Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium">Subject</p>
                                  <p className="text-sm text-muted-foreground">{request.subject}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Date</p>
                                  <p className="text-sm text-muted-foreground">{new Date(request.date).toLocaleDateString()}</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Reason</p>
                                <p className="text-sm text-muted-foreground">{request.reason}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium">Request Date</p>
                                  <p className="text-sm text-muted-foreground">{new Date(request.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Status</p>
                                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    request.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : request.status === "approved"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}>
                                    {request.status}
                                  </span>
                                </div>
                              </div>
                              {request.reviewer && (
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium">Reviewed By</p>
                                    <p className="text-sm text-muted-foreground">{request.reviewer}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Review Date</p>
                                    <p className="text-sm text-muted-foreground">{new Date(request.reviewDate!).toLocaleDateString()}</p>
                                  </div>
                                </div>
                              )}
                              {request.comments && (
                                <div>
                                  <p className="text-sm font-medium">Comments</p>
                                  <p className="text-sm text-muted-foreground">{request.comments}</p>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <p className="mt-2 text-sm">{request.reason}</p>
                      <div className="mt-4 flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>Submitted on {new Date(request.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No correction requests</p>
                  <p className="text-sm text-muted-foreground">
                    You haven't submitted any attendance correction requests yet
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="leaves">
              {leaveRequests.length > 0 ? (
                <div className="divide-y">
                  {leaveRequests.map(request => (
                    <div key={request.id} className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">Leave Application</h4>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              request.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : request.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}>
                              {request.status}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(request.startDate).toLocaleDateString()} to {new Date(request.endDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">View Details</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Leave Application Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium">Start Date</p>
                                  <p className="text-sm text-muted-foreground">{new Date(request.startDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">End Date</p>
                                  <p className="text-sm text-muted-foreground">{new Date(request.endDate).toLocaleDateString()}</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Reason</p>
                                <p className="text-sm text-muted-foreground">{request.reason}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium">Application Date</p>
                                  <p className="text-sm text-muted-foreground">{new Date(request.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Status</p>
                                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    request.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : request.status === "approved"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}>
                                    {request.status}
                                  </span>
                                </div>
                              </div>
                              {request.reviewer && (
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium">Reviewed By</p>
                                    <p className="text-sm text-muted-foreground">{request.reviewer}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Review Date</p>
                                    <p className="text-sm text-muted-foreground">{new Date(request.reviewDate!).toLocaleDateString()}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <p className="mt-2 text-sm">{request.reason}</p>
                      <div className="mt-4 flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>Submitted on {new Date(request.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No leave applications</p>
                  <p className="text-sm text-muted-foreground">
                    You haven't submitted any leave applications yet
                  </p>
                </div>
              )}
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default StudentRequests;
