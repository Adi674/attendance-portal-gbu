
import React from "react";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { mockNotices } from "@/data/mockData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Notices = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!user) return null;

  // Filter notices based on user role
  const relevantNotices = mockNotices.filter(notice => 
    notice.forRoles.includes(user.role)
  );
  
  // Sort notices by date
  const sortedNotices = [...relevantNotices].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  // Split notices into active and archived
  const today = new Date();
  const activeNotices = sortedNotices.filter(
    notice => !notice.expiresAt || new Date(notice.expiresAt) >= today
  );
  const archivedNotices = sortedNotices.filter(
    notice => notice.expiresAt && new Date(notice.expiresAt) < today
  );

  return (
    <PageLayout title="Notices">
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Notices & Announcements</h2>
          {user.role === "admin" && (
            <Button onClick={() => navigate("/admin/notices/new")}>
              Create Notice
            </Button>
          )}
        </div>
        
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="active">Active ({activeNotices.length})</TabsTrigger>
            <TabsTrigger value="archived">Archived ({archivedNotices.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            {activeNotices.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {activeNotices.map(notice => (
                  <Card key={notice.id} className="animate-fade-in">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-base">{notice.title}</CardTitle>
                      <Bell className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm">{notice.content}</p>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4 flex flex-col items-start space-y-2">
                      <div className="flex gap-1">
                        {notice.forRoles.map(role => (
                          <span key={role} className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                            {role}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <p className="text-xs text-muted-foreground">
                          Posted on {new Date(notice.createdAt).toLocaleDateString()}
                        </p>
                        {notice.expiresAt && (
                          <p className="text-xs text-muted-foreground">
                            Expires: {new Date(notice.expiresAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-60 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No active notices</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  There are currently no active notices for your role.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="archived">
            {archivedNotices.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {archivedNotices.map(notice => (
                  <Card key={notice.id} className="bg-muted/30">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-base text-muted-foreground">{notice.title}</CardTitle>
                      <Bell className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm text-muted-foreground">{notice.content}</p>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4 flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        Posted on {new Date(notice.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Expired: {new Date(notice.expiresAt!).toLocaleDateString()}
                      </p>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-60 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No archived notices</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  There are no expired notices in your archive.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Notices;
