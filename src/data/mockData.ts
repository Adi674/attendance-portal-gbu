
import { User, Student, Teacher, Admin, Class, Attendance, AttendanceRequest, Leave, Notice } from "@/types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "s1",
    name: "Rahul Sharma",
    email: "student@gbu.ac.in",
    role: "student",
  },
  {
    id: "t1",
    name: "Dr. Priya Gupta",
    email: "teacher@gbu.ac.in",
    role: "teacher",
  },
  {
    id: "a1",
    name: "Admin User",
    email: "admin@gbu.ac.in",
    role: "admin",
  }
];

// Mock Students
export const mockStudents: Student[] = [
  {
    id: "s1",
    name: "Rahul Sharma",
    email: "student@gbu.ac.in",
    role: "student",
    studentId: "20ICT1001",
    department: "School of ICT",
    course: "B.Tech",
    semester: 5,
  },
  {
    id: "s2",
    name: "Neha Singh",
    email: "neha@gbu.ac.in",
    role: "student",
    studentId: "20ICT1002",
    department: "School of ICT",
    course: "B.Tech",
    semester: 5,
  },
  {
    id: "s3",
    name: "Amit Kumar",
    email: "amit@gbu.ac.in",
    role: "student",
    studentId: "20ICT1003",
    department: "School of ICT",
    course: "B.Tech",
    semester: 5,
  }
];

// Mock Teachers
export const mockTeachers: Teacher[] = [
  {
    id: "t1",
    name: "Dr. Priya Gupta",
    email: "teacher@gbu.ac.in",
    role: "teacher",
    teacherId: "ICT-F-001",
    department: "School of ICT",
    subjects: ["Data Structures", "Algorithms", "Database Systems"],
    designation: "Associate Professor",
  },
  {
    id: "t2",
    name: "Dr. Rajesh Mishra",
    email: "rajesh@gbu.ac.in",
    role: "teacher",
    teacherId: "ICT-F-002",
    department: "School of ICT",
    subjects: ["Computer Networks", "Operating Systems", "System Programming"],
    designation: "Assistant Professor",
  }
];

// Mock Admins
export const mockAdmins: Admin[] = [
  {
    id: "a1",
    name: "Admin User",
    email: "admin@gbu.ac.in",
    role: "admin",
    adminId: "ADMIN-001",
    permissions: ["all"],
  }
];

// Mock Classes
export const mockClasses: Class[] = [
  {
    id: "c1",
    subject: "Data Structures",
    teacher: "Dr. Priya Gupta",
    teacherId: "t1",
    room: "ICT-301",
    startTime: "09:00",
    endTime: "10:30",
    date: "2025-04-29",
    department: "School of ICT",
    semester: 5,
  },
  {
    id: "c2",
    subject: "Computer Networks",
    teacher: "Dr. Rajesh Mishra",
    teacherId: "t2",
    room: "ICT-302",
    startTime: "11:00",
    endTime: "12:30",
    date: "2025-04-29",
    department: "School of ICT",
    semester: 5,
  },
  {
    id: "c3",
    subject: "Database Systems",
    teacher: "Dr. Priya Gupta",
    teacherId: "t1",
    room: "ICT-303",
    startTime: "14:00",
    endTime: "15:30",
    date: "2025-04-29",
    department: "School of ICT",
    semester: 5,
  }
];

// Generate classes for the whole week
const generateClassesForWeek = () => {
  const baseClasses = [
    {
      subject: "Data Structures",
      teacher: "Dr. Priya Gupta",
      teacherId: "t1",
      room: "ICT-301",
      startTime: "09:00",
      endTime: "10:30",
      department: "School of ICT",
      semester: 5,
    },
    {
      subject: "Computer Networks",
      teacher: "Dr. Rajesh Mishra",
      teacherId: "t2",
      room: "ICT-302",
      startTime: "11:00",
      endTime: "12:30",
      department: "School of ICT",
      semester: 5,
    },
    {
      subject: "Database Systems",
      teacher: "Dr. Priya Gupta",
      teacherId: "t1",
      room: "ICT-303",
      startTime: "14:00",
      endTime: "15:30",
      department: "School of ICT",
      semester: 5,
    },
    {
      subject: "Algorithms",
      teacher: "Dr. Priya Gupta",
      teacherId: "t1",
      room: "ICT-304",
      startTime: "09:00",
      endTime: "10:30",
      department: "School of ICT",
      semester: 5,
    },
    {
      subject: "Operating Systems",
      teacher: "Dr. Rajesh Mishra",
      teacherId: "t2",
      room: "ICT-305",
      startTime: "11:00",
      endTime: "12:30",
      department: "School of ICT",
      semester: 5,
    }
  ];

  const weekClasses: Class[] = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Skip weekend
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    // Add 3 random classes for this day
    const shuffled = [...baseClasses].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    
    selected.forEach((cls, index) => {
      weekClasses.push({
        ...cls,
        id: `c${i * 3 + index + 1}`,
        date: date.toISOString().split('T')[0]
      });
    });
  }
  
  return weekClasses;
};

export const mockWeekClasses = generateClassesForWeek();

// Mock Attendance Records
export const mockAttendance: Attendance[] = [
  {
    id: "a1",
    classId: "c1",
    studentId: "s1",
    date: "2025-04-29",
    status: "present",
    markedBy: "t1",
    markedAt: "2025-04-29T09:15:00",
    qrScanned: true,
  },
  {
    id: "a2",
    classId: "c2",
    studentId: "s1",
    date: "2025-04-29",
    status: "absent",
    markedBy: "t2",
    markedAt: "2025-04-29T11:45:00",
  },
  {
    id: "a3",
    classId: "c3",
    studentId: "s1",
    date: "2025-04-29",
    status: "present",
    markedBy: "t1",
    markedAt: "2025-04-29T14:10:00",
  }
];

// Generate more attendance data
export const generateAttendanceData = () => {
  const attendance: Attendance[] = [];
  const statuses: ("present" | "absent" | "late")[] = ["present", "absent", "late"];
  
  mockStudents.forEach(student => {
    mockWeekClasses.forEach(cls => {
      // 70% present, 20% absent, 10% late
      let status: "present" | "absent" | "late";
      const rand = Math.random();
      if (rand < 0.7) status = "present";
      else if (rand < 0.9) status = "absent";
      else status = "late";
      
      attendance.push({
        id: `a-${student.id}-${cls.id}`,
        classId: cls.id,
        studentId: student.id,
        date: cls.date,
        status,
        markedBy: cls.teacherId,
        markedAt: `${cls.date}T${cls.startTime}:00`,
        qrScanned: Math.random() > 0.5,
      });
    });
  });
  
  return attendance;
};

export const mockExtendedAttendance = generateAttendanceData();

// Mock Attendance Requests
export const mockAttendanceRequests: AttendanceRequest[] = [
  {
    id: "ar1",
    studentId: "s1",
    studentName: "Rahul Sharma",
    classId: "c2",
    subject: "Computer Networks",
    date: "2025-04-29",
    reason: "Was in university hospital for treatment",
    supportingDocument: "hospital_certificate.pdf",
    status: "pending",
  },
  {
    id: "ar2",
    studentId: "s2",
    studentName: "Neha Singh",
    classId: "c3",
    subject: "Database Systems",
    date: "2025-04-29",
    reason: "University bus delayed due to traffic",
    status: "approved",
    reviewedBy: "t1",
    reviewedAt: "2025-04-29T16:00:00",
    comments: "Verified with transport department",
  }
];

// Mock Leaves
export const mockLeaves: Leave[] = [
  {
    id: "l1",
    userId: "s1",
    userName: "Rahul Sharma",
    userRole: "student",
    startDate: "2025-05-01",
    endDate: "2025-05-03",
    reason: "Family function",
    status: "pending",
  },
  {
    id: "l2",
    userId: "t1",
    userName: "Dr. Priya Gupta",
    userRole: "teacher",
    startDate: "2025-05-05",
    endDate: "2025-05-07",
    reason: "Conference attendance",
    status: "approved",
    reviewedBy: "a1",
    reviewedAt: "2025-04-28T10:00:00",
    comments: "Approved. Please ensure classes are adjusted.",
  }
];

// Mock Notices
export const mockNotices: Notice[] = [
  {
    id: "n1",
    title: "Semester End Examination Schedule",
    content: "The semester end examinations will commence from 1st June, 2025. The detailed schedule is available on the university website.",
    createdBy: "a1",
    createdAt: "2025-04-15T09:00:00",
    expiresAt: "2025-06-01T00:00:00",
    forRoles: ["student", "teacher", "admin"],
  },
  {
    id: "n2",
    title: "Faculty Meeting",
    content: "All faculty members are requested to attend a meeting on 5th May, 2025 at 11:00 AM in the Conference Hall.",
    createdBy: "a1",
    createdAt: "2025-04-20T10:00:00",
    expiresAt: "2025-05-05T11:00:00",
    forRoles: ["teacher", "admin"],
  },
  {
    id: "n3",
    title: "Hackathon Announcement",
    content: "School of ICT is organizing a 24-hour Hackathon on 10th May, 2025. All interested students are requested to register by 5th May.",
    createdBy: "a1",
    createdAt: "2025-04-25T14:00:00",
    expiresAt: "2025-05-10T00:00:00",
    forRoles: ["student", "teacher", "admin"],
  }
];
