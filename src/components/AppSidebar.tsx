
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  CalendarDays, 
  CheckSquare, 
  FileText, 
  Home, 
  LogOut, 
  QrCode, 
  Settings, 
  UserCog, 
  Users, 
  PieChart,
  Bell,
  BookOpen
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const renderMenu = () => {
    switch (user.role) {
      case "student":
        return (
          <>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate("/student/dashboard")}>
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate("/student/schedule")}>
                <CalendarDays className="h-5 w-5" />
                <span>Class Schedule</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate("/student/attendance")}>
                <CheckSquare className="h-5 w-5" />
                <span>My Attendance</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate("/student/analytics")}>
                <PieChart className="h-5 w-5" />
                <span>Analytics</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate("/student/reports")}>
                <FileText className="h-5 w-5" />
                <span>Reports</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate("/notices")}>
                <BookOpen className="h-5 w-5" />
                <span>Notices</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </>
        );
      case "teacher":
        return (
          <>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate("/teacher/dashboard")}>
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate("/teacher/schedule")}>
                <CalendarDays className="h-5 w-5" />
                <span>Class Schedule</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate("/teacher/mark-attendance")}>
                <CheckSquare className="h-5 w-5" />
                <span>Mark Attendance</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate("/teacher/qr-generator")}>
                <QrCode className="h-5 w-5" />
                <span>QR Generator</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate("/teacher/analytics")}>
                <PieChart className="h-5 w-5" />
                <span>Analytics</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate("/teacher/requests")}>
                <FileText className="h-5 w-5" />
                <span>Requests</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate("/notices")}>
                <BookOpen className="h-5 w-5" />
                <span>Notices</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </>
        );
      case "admin":
        return (
          <>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate("/admin/dashboard")}>
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate("/admin/users")}>
                <Users className="h-5 w-5" />
                <span>Users</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate("/admin/schedule")}>
                <CalendarDays className="h-5 w-5" />
                <span>Class Schedule</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate("/admin/analytics")}>
                <PieChart className="h-5 w-5" />
                <span>Analytics</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate("/admin/requests")}>
                <FileText className="h-5 w-5" />
                <span>Requests</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate("/admin/notices")}>
                <Bell className="h-5 w-5" />
                <span>Notices</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate("/admin/settings")}>
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </>
        );
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center gap-2 p-4">
        <img
          src="/lovable-uploads/ae0bfa2b-3413-4a95-8879-2830e82a6f0c.png"
          alt="GBU Logo"
          className="w-10 h-10"
        />
        <div className="font-semibold text-lg">GBU ICT Attendance</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderMenu()}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={user.profileImage} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={logout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
