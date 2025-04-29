
import React from "react";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Check, X, Clock, Search, Calendar, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockAttendanceRequests, mockLeaves, mockClasses } from "@/data/mockData";

const TeacherRequests = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  // Filter classes taught by this teacher
  const teacherClasses = mockClasses.filter(cls => cls.teacherId === user.id);
  const teacherClassIds = teacherClasses.map(cls => cls.id);
  
  // Filter attendance correction requests for this teacher's classes
  const pendingAttendanceRequests = mockAttendanceRequests.filter(
    req => teacherClassIds.includes(req.classId) && req.status === "pending"
  );
  
  // Filter leave applications where this teacher is the reviewer
  const pendingLeaveRequests = mockLeaves.filter(
    leave => leave.status === "pending" && leave.reviewedBy === user.id
  );
  
  return (
    <PageLayout title="Requests">
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Manage Requests</h1>
            <p className="text-muted-foreground">Review and manage student attendance correction and leave requests</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search requests..." className="pl-8" />
            </div>
            <Select defaultValue="pending">
              <SelectTrigger className="w-full sm:w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <Tabs defaultValue="attendance">
              <div className="flex items-center justify-between">
                <CardTitle>Pending Requests</CardTitle>
                <TabsList>
                  <TabsTrigger value="attendance">Attendance Corrections</TabsTrigger>
                  <TabsTrigger value="leaves">Leave Applications</TabsTrigger>
                </TabsList>
              </div>
              <CardDescription>Review and respond to student requests</CardDescription>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="attendance" className="space-y-6">
              {pendingAttendanceRequests.length > 0 ? (
                <div className="divide-y">
                  {pendingAttendanceRequests.map(request => (
                    <div key={request.id} className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>{request.studentName.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{request.studentName}</h4>
                            <p className="text-sm text-muted-foreground">
                              {request.subject} • {new Date(request.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
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
                                  Review the student's attendance correction request
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
                                    <Button variant="outline" className="mt-1 w-full">
                                      View Document
                                    </Button>
                                  </div>
                                )}
                                <div>
                                  <p className="text-sm font-medium">Comments (Optional)</p>
                                  <textarea 
                                    className="mt-1 w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    placeholder="Add your comments here..."
                                  />
                                </div>
                              </div>
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
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Reject</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-green-600">
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Approve</span>
                          </Button>
                        </div>
                      </div>
                      <p className="mt-2 text-sm">{request.reason}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>Submitted: {new Date().toLocaleDateString()}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 text-xs">
                          <MessageSquare className="mr-1 h-3 w-3" />
                          Add Comment
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No pending requests</p>
                  <p className="text-sm text-muted-foreground">
                    There are no pending attendance correction requests to review
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="leaves">
              {pendingLeaveRequests.length > 0 ? (
                <div className="divide-y">
                  {pendingLeaveRequests.map(leave => (
                    <div key={leave.id} className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>{leave.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{leave.userName}</h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date(leave.startDate).toLocaleDateString()} to {new Date(leave.endDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
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
                                  Review the student's leave application
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="flex items-center space-x-4">
                                  <Avatar>
                                    <AvatarFallback>{leave.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h4 className="font-medium">{leave.userName}</h4>
                                    <p className="text-sm text-muted-foreground">Student ID: {leave.userId}</p>
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
                                  <p className="text-sm font-medium">Reason</p>
                                  <p className="text-sm">{leave.reason}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Comments (Optional)</p>
                                  <textarea 
                                    className="mt-1 w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    placeholder="Add your comments here..."
                                  />
                                </div>
                              </div>
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
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Reject</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-green-600">
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Approve</span>
                          </Button>
                        </div>
                      </div>
                      <p className="mt-2 text-sm">{leave.reason}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span>Duration: {Math.round((new Date(leave.endDate).getTime() - new Date(leave.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} days</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 text-xs">
                          <MessageSquare className="mr-1 h-3 w-3" />
                          Add Comment
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No leave applications</p>
                  <p className="text-sm text-muted-foreground">
                    There are no pending leave applications to review
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

export default TeacherRequests;
