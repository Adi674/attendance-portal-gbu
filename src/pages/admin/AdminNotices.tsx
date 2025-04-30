import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { Label } from "@/components/ui/label";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { 
  Bell,
  Plus,
  Calendar,
  Clock,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format, isAfter } from "date-fns";

// Mock notices data
const mockNotices = [
  {
    id: "1",
    title: "End of Semester Examination Schedule",
    content: "The end of semester examinations will commence from 15th December 2023. Please check the detailed schedule on the Academic Portal.",
    createdBy: "Admin User",
    createdAt: "2023-11-25T10:30:00Z",
    expiresAt: "2023-12-31T23:59:59Z",
    forRoles: ["student", "teacher"],
    isActive: true,
  },
  {
    id: "2",
    title: "System Maintenance Notification",
    content: "The attendance system will undergo maintenance on Saturday, 2nd December 2023 from 10:00 PM to 6:00 AM. Services may be unavailable during this period.",
    createdBy: "Admin User",
    createdAt: "2023-11-28T09:15:00Z",
    expiresAt: "2023-12-03T23:59:59Z",
    forRoles: ["student", "teacher", "admin"],
    isActive: true,
  },
  {
    id: "3",
    title: "Holiday Notice: University Foundation Day",
    content: "The university will remain closed on 5th December 2023 to celebrate the University Foundation Day.",
    createdBy: "Department Admin",
    createdAt: "2023-11-30T11:45:00Z",
    expiresAt: "2023-12-06T23:59:59Z",
    forRoles: ["student", "teacher", "admin"],
    isActive: true,
  },
  {
    id: "4",
    title: "Attendance Submission Reminder",
    content: "All faculty members are requested to submit the attendance records for November 2023 by 5th December 2023.",
    createdBy: "Admin User",
    createdAt: "2023-12-01T08:00:00Z",
    expiresAt: "2023-12-05T23:59:59Z",
    forRoles: ["teacher"],
    isActive: true,
  },
  {
    id: "5",
    title: "New Feature: Mobile Attendance",
    content: "A new mobile attendance feature has been rolled out. Students can now mark attendance using QR codes. Please update your mobile app to the latest version.",
    createdBy: "Admin User",
    createdAt: "2023-10-15T14:20:00Z",
    expiresAt: "2023-11-15T23:59:59Z",
    forRoles: ["student", "teacher"],
    isActive: false,
  }
];

const AdminNotices = () => {
  const { user } = useAuth();
  const [noticeDialogOpen, setNoticeDialogOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  if (!user) return null;

  // Check if notice is active (not expired)
  const isNoticeActive = (notice: any) => {
    if (!notice.expiresAt) return true;
    return isAfter(new Date(notice.expiresAt), new Date());
  };

  const handleAddNotice = () => {
    setSelectedNotice(null);
    setIsEditing(false);
    setNoticeDialogOpen(true);
  };

  const handleEditNotice = (notice: any) => {
    setSelectedNotice(notice);
    setIsEditing(true);
    setNoticeDialogOpen(true);
  };

  const handleToggleActive = (notice: any) => {
    const newState = !notice.isActive;
    const action = newState ? "activated" : "deactivated";
    toast.success(`Notice "${notice.title}" has been ${action}`);
  };

  const handleDeleteNotice = (notice: any) => {
    toast.success(`Notice "${notice.title}" has been deleted`);
  };

  const handleSaveNotice = () => {
    if (isEditing) {
      toast.success(`Notice "${selectedNotice?.title}" has been updated`);
    } else {
      toast.success("New notice has been created and published");
    }
    setNoticeDialogOpen(false);
  };

  return (
    <PageLayout title="Notice Management">
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Notices & Announcements</h2>
          <Button onClick={handleAddNotice}>
            <Plus className="h-4 w-4 mr-2" />
            Create Notice
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Notices</CardTitle>
            <CardDescription>Manage system-wide notices and announcements</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Audience</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockNotices.map((notice) => (
                  <TableRow key={notice.id}>
                    <TableCell className="font-medium">{notice.title}</TableCell>
                    <TableCell>
                      {format(new Date(notice.createdAt), 'dd MMM yyyy')}
                      <div className="text-xs text-muted-foreground">
                        by {notice.createdBy}
                      </div>
                    </TableCell>
                    <TableCell>
                      {notice.expiresAt
                        ? format(new Date(notice.expiresAt), 'dd MMM yyyy')
                        : "Never"}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {notice.forRoles.map((role) => (
                          <Badge key={role} variant="outline" className="capitalize">
                            {role}s
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {notice.isActive && isNoticeActive(notice) ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditNotice(notice)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleActive(notice)}
                        >
                          {notice.isActive ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                          <span className="sr-only">
                            {notice.isActive ? "Deactivate" : "Activate"}
                          </span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteNotice(notice)}
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
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Notice Dialog */}
      <Dialog open={noticeDialogOpen} onOpenChange={setNoticeDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Notice" : "Create New Notice"}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update the notice details"
                : "Create a new notice to be displayed in the system"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-4">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Notice title"
                defaultValue={selectedNotice?.title || ""}
              />
            </div>
            <div className="grid items-center gap-4">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Notice content"
                className="min-h-[120px]"
                defaultValue={selectedNotice?.content || ""}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry-date" className="mb-2 block">
                  Expiry Date
                </Label>
                <Input
                  id="expiry-date"
                  type="date"
                  defaultValue={
                    selectedNotice?.expiresAt
                      ? format(new Date(selectedNotice.expiresAt), 'yyyy-MM-dd')
                      : ""
                  }
                />
              </div>
              <div>
                <Label htmlFor="is-active" className="mb-2 block">
                  Status
                </Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is-active"
                    defaultChecked={selectedNotice?.isActive !== false}
                  />
                  <label
                    htmlFor="is-active"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Active
                  </label>
                </div>
              </div>
            </div>
            <div className="grid items-center gap-4">
              <Label className="mb-2">Target Audience</Label>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="audience-students"
                    defaultChecked={
                      selectedNotice?.forRoles?.includes("student") !== false
                    }
                  />
                  <label
                    htmlFor="audience-students"
                    className="text-sm font-medium leading-none"
                  >
                    Students
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="audience-teachers"
                    defaultChecked={
                      selectedNotice?.forRoles?.includes("teacher") !== false
                    }
                  />
                  <label
                    htmlFor="audience-teachers"
                    className="text-sm font-medium leading-none"
                  >
                    Teachers
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="audience-admins"
                    defaultChecked={
                      selectedNotice?.forRoles?.includes("admin") !== false
                    }
                  />
                  <label
                    htmlFor="audience-admins"
                    className="text-sm font-medium leading-none"
                  >
                    Administrators
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNoticeDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNotice}>
              {isEditing ? "Update" : "Publish"} Notice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default AdminNotices;
