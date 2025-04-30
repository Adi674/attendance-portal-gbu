
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Settings,
  Bell,
  ShieldAlert,
  Save,
  RefreshCw,
  Database,
  Mail,
  Globe,
  Clock
} from "lucide-react";

const AdminSettings = () => {
  const { user } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [attendanceReminders, setAttendanceReminders] = useState(true);
  const [autoLockTime, setAutoLockTime] = useState("30");
  const [sessionTimeout, setSessionTimeout] = useState("60");
  const [defaultSemesterStartDate, setDefaultSemesterStartDate] = useState("2023-09-01");
  const [defaultSemesterEndDate, setDefaultSemesterEndDate] = useState("2024-01-15");
  const [minimumAttendancePercentage, setMinimumAttendancePercentage] = useState("75");
  const [databaseBackupFrequency, setDatabaseBackupFrequency] = useState("daily");

  if (!user) return null;

  const handleSaveGeneral = () => {
    toast.success("General settings saved successfully");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification settings saved successfully");
  };

  const handleSaveSecurity = () => {
    toast.success("Security settings saved successfully");
  };

  const handleSaveAcademic = () => {
    toast.success("Academic settings saved successfully");
  };

  return (
    <PageLayout title="System Settings">
      <div className="grid gap-6">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">
              <Settings className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security">
              <ShieldAlert className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="academic">
              <Clock className="h-4 w-4 mr-2" />
              Academic
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure the general settings for the attendance system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Institution Details</h3>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="institution-name" className="text-right">
                        Institution Name
                      </Label>
                      <Input
                        id="institution-name"
                        defaultValue="Gautam Buddha University"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="institution-website" className="text-right">
                        Website
                      </Label>
                      <div className="flex items-center col-span-3">
                        <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="institution-website"
                          defaultValue="https://www.gbu.edu"
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="contact-email" className="text-right">
                        Contact Email
                      </Label>
                      <div className="flex items-center col-span-3">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="contact-email"
                          defaultValue="contact@gbu.edu"
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">System Maintenance</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="database-backup" className="text-right">
                        Database Backup
                      </Label>
                      <div className="flex items-center space-x-2 col-span-3">
                        <Database className="h-4 w-4 text-muted-foreground" />
                        <select
                          id="database-backup"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                          value={databaseBackupFrequency}
                          onChange={(e) => setDatabaseBackupFrequency(e.target.value)}
                        >
                          <option value="hourly">Hourly</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <div className="text-right"></div>
                      <Button variant="outline" className="col-span-3 w-fit">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Run Manual Backup
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveGeneral}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how users receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-notifications" className="flex items-center">
                        <Bell className="h-4 w-4 mr-2" />
                        Enable Email Notifications
                      </Label>
                      <Switch
                        id="email-notifications"
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="attendance-reminders" className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Attendance Reminders
                      </Label>
                      <Switch
                        id="attendance-reminders"
                        checked={attendanceReminders}
                        onCheckedChange={setAttendanceReminders}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Notification Content</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="default-email-subject" className="text-right">
                        Default Email Subject
                      </Label>
                      <Input
                        id="default-email-subject"
                        defaultValue="GBU ICT Attendance System Notification"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email-footer" className="text-right">
                        Email Footer Text
                      </Label>
                      <Input
                        id="email-footer"
                        defaultValue="This is an automated message from the GBU ICT Attendance System."
                        className="col-span-3"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveNotifications}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure security and authentication settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Session Settings</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="session-timeout" className="text-right">
                        Session Timeout (minutes)
                      </Label>
                      <Input
                        id="session-timeout"
                        type="number"
                        value={sessionTimeout}
                        onChange={(e) => setSessionTimeout(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="auto-lock" className="text-right">
                        Auto Lock (minutes)
                      </Label>
                      <Input
                        id="auto-lock"
                        type="number"
                        value={autoLockTime}
                        onChange={(e) => setAutoLockTime(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Password Policy</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="require-uppercase" className="flex items-center">
                        Require Uppercase Letters
                      </Label>
                      <Switch id="require-uppercase" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="require-numbers" className="flex items-center">
                        Require Numbers
                      </Label>
                      <Switch id="require-numbers" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="require-symbols" className="flex items-center">
                        Require Special Characters
                      </Label>
                      <Switch id="require-symbols" defaultChecked />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="min-password-length" className="text-right">
                        Minimum Password Length
                      </Label>
                      <Input
                        id="min-password-length"
                        type="number"
                        defaultValue="8"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="password-expiry" className="text-right">
                        Password Expiry (days)
                      </Label>
                      <Input
                        id="password-expiry"
                        type="number"
                        defaultValue="90"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSecurity}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="academic">
            <Card>
              <CardHeader>
                <CardTitle>Academic Settings</CardTitle>
                <CardDescription>
                  Configure academic and attendance settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Semester Settings</h3>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="semester-start" className="text-right">
                        Default Semester Start
                      </Label>
                      <Input
                        id="semester-start"
                        type="date"
                        value={defaultSemesterStartDate}
                        onChange={(e) => setDefaultSemesterStartDate(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="semester-end" className="text-right">
                        Default Semester End
                      </Label>
                      <Input
                        id="semester-end"
                        type="date"
                        value={defaultSemesterEndDate}
                        onChange={(e) => setDefaultSemesterEndDate(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Attendance Policy</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="min-attendance" className="text-right">
                        Minimum Attendance Required (%)
                      </Label>
                      <Input
                        id="min-attendance"
                        type="number"
                        value={minimumAttendancePercentage}
                        onChange={(e) => setMinimumAttendancePercentage(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-mark-absent" className="flex items-center">
                        Automatically Mark Absent for Missed Classes
                      </Label>
                      <Switch id="auto-mark-absent" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="allow-attendance-request" className="flex items-center">
                        Allow Students to Submit Attendance Correction Requests
                      </Label>
                      <Switch id="allow-attendance-request" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveAcademic}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default AdminSettings;
