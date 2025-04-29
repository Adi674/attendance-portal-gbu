
import React, { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { QrCode, Download, RefreshCw } from "lucide-react";
import { mockClasses } from "@/data/mockData";
import { Class } from "@/types";
import { toast } from "sonner";

const QRGenerator: React.FC = () => {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [qrValue, setQrValue] = useState<string>("");
  const [qrImage, setQrImage] = useState<string>("");
  const [teacherClasses, setTeacherClasses] = useState<Class[]>([]);
  const [expiryTime, setExpiryTime] = useState<string>("10");
  
  useEffect(() => {
    if (user?.id) {
      // Filter classes for this teacher
      const classes = mockClasses.filter(cls => cls.teacherId === user.id);
      setTeacherClasses(classes);
    }
  }, [user]);

  const generateQR = () => {
    if (!selectedClass) {
      toast.error("Please select a class");
      return;
    }
    
    // Create a unique token for the QR code
    // In a real app, this would be more secure
    const token = Math.random().toString(36).substring(2, 15);
    
    // Create a payload with necessary information
    const payload = {
      classId: selectedClass,
      teacherId: user?.id,
      timestamp: new Date().toISOString(),
      token: token,
      expiry: parseInt(expiryTime)
    };
    
    // Convert to JSON string for the QR code
    const qrData = JSON.stringify(payload);
    setQrValue(qrData);
    
    // Generate QR code image URL using an external service
    // For this mock, we'll use QR Server API
    const encodedData = encodeURIComponent(qrData);
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodedData}`;
    setQrImage(qrCodeUrl);
    
    toast.success(`QR code generated! Valid for ${expiryTime} minutes`);
  };

  const downloadQR = () => {
    if (!qrImage) {
      toast.error("Please generate a QR code first");
      return;
    }
    
    // Create a link element to download the image
    const link = document.createElement('a');
    link.href = qrImage;
    
    // Get class name for the filename
    const selectedClassData = teacherClasses.find(cls => cls.id === selectedClass);
    const fileName = selectedClassData 
      ? `${selectedClassData.subject}_qr_${new Date().toISOString().split('T')[0]}.png`
      : 'attendance_qr.png';
    
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("QR code downloaded");
  };

  return (
    <PageLayout title="QR Code Generator">
      <div className="container mx-auto py-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* QR Code Generator Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Generate Attendance QR Code</CardTitle>
              <CardDescription>
                Create a QR code that students can scan to mark their attendance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="class">Select Class</Label>
                <Select
                  value={selectedClass}
                  onValueChange={setSelectedClass}
                >
                  <SelectTrigger id="class">
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent>
                    {teacherClasses.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.subject} - Room {cls.room}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expiry">QR Code Validity (minutes)</Label>
                <Select
                  value={expiryTime}
                  onValueChange={setExpiryTime}
                >
                  <SelectTrigger id="expiry">
                    <SelectValue placeholder="Select expiry time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col space-y-4">
                <Button onClick={generateQR} className="w-full">
                  <QrCode className="mr-2 h-4 w-4" />
                  Generate QR Code
                </Button>
                
                <Button
                  onClick={downloadQR}
                  variant="outline"
                  className="w-full"
                  disabled={!qrImage}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download QR Code
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* QR Code Display */}
          <Card>
            <CardHeader>
              <CardTitle>QR Code Preview</CardTitle>
              <CardDescription>
                Show this QR code to your students or download it
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center min-h-[250px]">
              {qrImage ? (
                <div className="flex flex-col items-center space-y-4">
                  <div className="border p-4 rounded-lg bg-white">
                    <img 
                      src={qrImage} 
                      alt="Attendance QR Code" 
                      className="w-64 h-64"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Valid for {expiryTime} minutes
                  </p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={generateQR} 
                    className="flex items-center"
                  >
                    <RefreshCw className="mr-2 h-3.5 w-3.5" />
                    Regenerate
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <QrCode className="h-16 w-16 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">
                    Select a class and generate a QR code to display here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
            <CardDescription>
              How to use the QR code for attendance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>Select your class from the dropdown menu</li>
              <li>Choose how long the QR code should remain valid</li>
              <li>Click "Generate QR Code" to create a unique attendance QR</li>
              <li>Display the QR code to your students or download it to share</li>
              <li>Students can scan the QR code using the mobile app to mark their attendance</li>
              <li>The QR code will expire after the selected time period</li>
              <li>You can generate a new QR code at any time</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default QRGenerator;
