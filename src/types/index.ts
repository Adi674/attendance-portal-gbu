
export type UserRole = "student" | "teacher" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
}

export interface Student extends User {
  role: "student";
  studentId: string;
  department: string;
  course: string;
  semester: number;
}

export interface Teacher extends User {
  role: "teacher";
  teacherId: string;
  department: string;
  subjects: string[];
  designation: string;
}

export interface Admin extends User {
  role: "admin";
  adminId: string;
  permissions: string[];
}

export interface Class {
  id: string;
  subject: string;
  teacher: string;
  teacherId: string;
  room: string;
  startTime: string;
  endTime: string;
  date: string;
  department: string;
  semester: number;
}

export interface Attendance {
  id: string;
  classId: string;
  studentId: string;
  date: string;
  status: "present" | "absent" | "late";
  markedBy: string;
  markedAt: string;
  qrScanned?: boolean;
}

export interface AttendanceRequest {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  subject: string;
  date: string;
  reason: string;
  supportingDocument?: string;
  status: "pending" | "approved" | "rejected";
  reviewedBy?: string;
  reviewedAt?: string;
  comments?: string;
}

export interface Leave {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  reviewedBy?: string;
  reviewedAt?: string;
  comments?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  createdAt: string;
  expiresAt?: string;
  forRoles: UserRole[];
}
