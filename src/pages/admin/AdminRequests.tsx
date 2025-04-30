import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Check, X, Clock, Search, Calendar, MessageSquare, Filter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockAttendanceRequests, mockLeaves, mockClasses, mockStudents, mockTeachers } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const AdminRequests = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState<string>("pending");
  
  if (!user) return null;

  // Filter requests based on status
  const filteredAttendanceRequests = status === "all" 
    ? mockAttendanceRequests 
    : mockAttendanceRequests.filter(req => req.status === status);
  
  const filteredLeaveRequests = status === "all" 
    ? mockLeaves 
    : mockLeaves.filter(leave => leave.status === status);
  
  const getStudentName = (id: string) => {
    const student = mockStudents.find(s => s.id === id);
    return student ? student.name : "Unknown Student";
  };
  
  const getTeacherName = (id: string) => {
    const teacher = mockTeachers.find(t => t.id === id);
    return teacher ? teacher.name : "Unknown Teacher";
  };
  
  return (
    <PageLayout title="All Requests">
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Manage All Requests</h1>
            <p className="text-muted-foreground">Review and manage attendance correction and leave requests</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name or ID..." className="pl-8" />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="all">All Requests</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <Tabs defaultValue="attendance">
              <div className="flex items-center justify-between">
                <CardTitle>All Requests</CardTitle>
                <TabsList>
                  <TabsTrigger value="attendance">Attendance Corrections</TabsTrigger>
                  <TabsTrigger value="leaves">Leave Applications</TabsTrigger>
                </TabsList>
              </div>
              <CardDescription>Review and respond to requests from students and faculty</CardDescription>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="attendance">
              <TabsContent value="attendance" className="space-y-6">
                {filteredAttendanceRequests.length > 0 ? (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-7 bg-muted/50 p-4 font-medium">
                      <div>Student</div>
                      <div>Subject</div>
                      <div>Date</div>
                      <div>Reason</div>
                      <div>Status</div>
                      <div>Reviewer</div>
                      <div>Actions</div>
                    </div>
                    <div className="divide-y">
                      {filteredAttendanceRequests.map(request => (
                        <div key={request.id} className="grid grid-cols-7 p-4 hover:bg-muted/50">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{request.studentName.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium truncate">{request.studentName}</span>
                          </div>
                          <div className="truncate">{request.subject}</div>
                          <div>{new Date(request.date).toLocaleDateString()}</div>
                          <div className="truncate">{request.reason}</div>
                          <div>
                            <Badge
                              className={`${
                                request.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                  : request.status === "approved"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : "bg-red-100 text-red-800 hover:bg-red-100"
                              }`}
                            >
                              {request.status}
                            </Badge>
                          </div>
                          <div className="truncate">
                            {request.reviewedBy 
                              ? getTeacherName(request.reviewedBy) 
                              : "-"}
                          </div>
                          <div className="flex items-center gap-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <FileText className="h-4 w-4" />
                                  <span className="sr-only">View Details</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Attendance Correction Request</DialogTitle>
                                  <DialogDescription>
                                    Review request details
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="flex items-center space-x-4">
                                    <Avatar>
                                      <AvatarFallback>{request.studentName.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h4 className="font-medium">{request.studentName}</h4>
                                      <p className="text-sm text-muted-foreground">Student ID: {request.studentId}</p>
                                    </div>
                                  </div>
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
                                    <p className="text-sm">{request.reason}</p>
                                  </div>
                                  {request.supportingDocument && (
                                    <div>
                                      <p className="text-sm font-medium">Supporting Document</p>
                                      <Button variant="outline" className="mt-1">
                                        View Document
                                      </Button>
                                    </div>
                                  )}
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm font-medium">Status</p>
                                      <Badge
                                        className={`mt-1 ${
                                          request.status === "pending"
                                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                            : request.status === "approved"
                                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                                            : "bg-red-100 text-red-800 hover:bg-red-100"
                                        }`}
                                      >
                                        {request.status}
                                      </Badge>
                                    </div>
                                    {request.reviewedBy && (
                                      <div>
                                        <p className="text-sm font-medium">Reviewed By</p>
                                        <p className="text-sm text-muted-foreground">
                                          {getTeacherName(request.reviewedBy)}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                  {request.comments && (
                                    <div>
                                      <p className="text-sm font-medium">Comments</p>
                                      <p className="text-sm text-muted-foreground">{request.comments}</p>
                                    </div>
                                  )}
                                  {request.status === "pending" && (
                                    <div>
                                      <p className="text-sm font-medium">Admin Comments</p>
                                      <textarea 
                                        className="mt-1 w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        placeholder="Add your comments here..."
                                      />
                                    </div>
                                  )}
                                </div>
                                {request.status === "pending" && (
                                  <DialogFooter className="flex space-x-2">
                                    <Button variant="outline" className="flex-1">
                                      <X className="mr-2 h-4 w-4" />
                                      Reject
                                    </Button>
                                    <Button className="flex-1">
                                      <Check className="mr-2 h-4 w-4" />
                                      Approve
                                    </Button>
                                  </DialogFooter>
                                )}
                              </DialogContent>
                            </Dialog>
                            {request.status === "pending" && (
                              <>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600">
                                  <X className="h-4 w-4" />
                                  <span className="sr-only">Reject</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-green-600">
                                  <Check className="h-4 w-4" />
                                  <span className="sr-only">Approve</span>
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">No requests found</p>
                    <p className="text-sm text-muted-foreground">
                      There are no attendance correction requests with the selected status
                    </p>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing {filteredAttendanceRequests.length} of {mockAttendanceRequests.length} requests
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled={filteredAttendanceRequests.length === 0}>
                      Export Data
                    </Button>
                    <Button size="sm" disabled={filteredAttendanceRequests.length === 0}>
                      Batch Actions
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="leaves" className="space-y-6">
                {filteredLeaveRequests.length > 0 ? (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-7 bg-muted/50 p-4 font-medium">
                      <div>User</div>
                      <div>Role</div>
                      <div>Start Date</div>
                      <div>End Date</div>
                      <div>Reason</div>
                      <div>Status</div>
                      <div>Actions</div>
                    </div>
                    <div className="divide-y">
                      {filteredLeaveRequests.map(leave => (
                        <div key={leave.id} className="grid grid-cols-7 p-4 hover:bg-muted/50">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{leave.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium truncate">{leave.userName}</span>
                          </div>
                          <div className="capitalize">{leave.userRole}</div>
                          <div>{new Date(leave.startDate).toLocaleDateString()}</div>
                          <div>{new Date(leave.endDate).toLocaleDateString()}</div>
                          <div className="truncate">{leave.reason}</div>
                          <div>
                            <Badge
                              className={`${
                                leave.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                  : leave.status === "approved"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : "bg-red-100 text-red-800 hover:bg-red-100"
                              }`}
                            >
                              {leave.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <FileText className="h-4 w-4" />
                                  <span className="sr-only">View Details</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Leave Application</DialogTitle>
                                  <DialogDescription>
                                    Review leave application details
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="flex items-center space-x-4">
                                    <Avatar>
                                      <AvatarFallback>{leave.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h4 className="font-medium">{leave.userName}</h4>
                                      <p className="text-sm text-muted-foreground">
                                        {leave.userRole.charAt(0).toUpperCase() + leave.userRole.slice(1)} • ID: {leave.userId}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm font-medium">Start Date</p>
                                      <p className="text-sm text-muted-foreground">{new Date(leave.startDate).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">End Date</p>
                                      <p className="text-sm text-muted-foreground">{new Date(leave.endDate).toLocaleDateString()}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Duration</p>
                                    <p className="text-sm text-muted-foreground">
                                      {Math.ceil(
                                        (new Date(leave.endDate).getTime() - new Date(leave.startDate).getTime()) / 
                                        (1000 * 60 * 60 * 24)
                                      ) + 1} days
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Reason</p>
                                    <p className="text-sm">{leave.reason}</p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm font-medium">Status</p>
                                      <Badge
                                        className={`mt-1 ${
                                          leave.status === "pending"
                                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                            : leave.status === "approved"
                                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                                            : "bg-red-100 text-red-800 hover:bg-red-100"
                                        }`}
                                      >
                                        {leave.status}
                                      </Badge>
                                    </div>
                                    {leave.reviewedBy && (
                                      <div>
                                        <p className="text-sm font-medium">Reviewed By</p>
                                        <p className="text-sm text-muted-foreground">
                                          {leave.reviewedBy}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                  {leave.comments && (
                                    <div>
                                      <p className="text-sm font-medium">Comments</p>
                                      <p className="text-sm text-muted-foreground">{leave.comments}</p>
                                    </div>
                                  )}
                                  {leave.status === "pending" && (
                                    <div>
                                      <p className="text-sm font-medium">Admin Comments</p>
                                      <textarea 
                                        className="mt-1 w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        placeholder="Add your comments here..."
                                      />
                                    </div>
                                  )}
                                </div>
                                {leave.status === "pending" && (
                                  <DialogFooter className="flex space-x-2">
                                    <Button variant="outline" className="flex-1">
                                      <X className="mr-2 h-4 w-4" />
                                      Reject
                                    </Button>
                                    <Button className="flex-1">
                                      <Check className="mr-2 h-4 w-4" />
                                      Approve
                                    </Button>
                                  </DialogFooter>
                                )}
                              </DialogContent>
                            </Dialog>
                            {leave.status === "pending" && (
                              <>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600">
                                  <X className="h-4 w-4" />
                                  <span className="sr-only">Reject</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-green-600">
                                  <Check className="h-4 w-4" />
                                  <span className="sr-only">Approve</span>
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">No leave applications found</p>
                    <p className="text-sm text-muted-foreground">
                      There are no leave applications with the selected status
                    </p>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing {filteredLeaveRequests.length} of {mockLeaves.length} leave applications
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled={filteredLeaveRequests.length === 0}>
                      Export Data
                    </Button>
                    <Button size="sm" disabled={filteredLeaveRequests.length === 0}>
                      Batch Actions
                    </Button>
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

export default AdminRequests;
