
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gbu-soft-blue to-white p-4">
      <div className="flex flex-col items-center justify-center mb-12">
        <img
          src="/lovable-uploads/ae0bfa2b-3413-4a95-8879-2830e82a6f0c.png"
          alt="GBU Logo"
          className="w-32 h-32 mb-4"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-2">
          GBU ICT Attendance Portal
        </h1>
        <p className="text-xl text-center text-gray-600 mb-6">
          School of Information & Communication Technology
        </p>
        <div className="max-w-2xl text-center text-gray-600 mb-8">
          <p className="mb-4">
            Welcome to the official attendance management system for the School of Information
            & Communication Technology at Gautam Buddha University.
          </p>
          <p>
            Track, manage, and analyze attendance with our comprehensive portal
            built for students, teachers, and administrators.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            className="text-lg px-8 py-6"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            className="text-lg px-8 py-6"
            variant="outline"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <div className="bg-gbu-purple/10 p-4 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">For Students</h3>
          <p className="text-gray-600">
            View your attendance records, check class schedules, and request attendance corrections with ease.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <div className="bg-gbu-purple/10 p-4 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">For Teachers</h3>
          <p className="text-gray-600">
            Mark attendance, generate QR codes, view analytics, and manage student attendance requests.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <div className="bg-gbu-purple/10 p-4 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">For Administrators</h3>
          <p className="text-gray-600">
            Oversee the entire attendance system, manage users, post notices, and access comprehensive analytics.
          </p>
        </div>
      </div>
      
      <footer className="mt-16 text-center">
        <p className="text-gray-600">Gautam Buddha University © {new Date().getFullYear()}</p>
        <div className="mt-2">
          <img
            src="/lovable-uploads/80846679-e48c-4e99-a53c-96f63c05c550.png"
            alt="GBU Campus at Night"
            className="w-full max-w-4xl h-auto rounded-lg opacity-90 shadow-lg"
          />
        </div>
      </footer>
    </div>
  );
};

export default Index;
