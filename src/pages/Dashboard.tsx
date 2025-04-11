import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, BarChart3, Bell, CheckCircle2, CircleDot, FileBarChart2, Users } from "lucide-react";
import BusinessChecklist from "@/components/dashboard/BusinessChecklist";
import ComplianceReport from "@/components/dashboard/ComplianceReport";
import SectorDocuments from "@/components/knowledge-base/SectorDocuments";
import HeaderComponent from "@/components/layout/Header";
import FooterComponent from "@/components/layout/Footer";
import { useAuth } from "@/lib/auth";

interface DashboardDatum {
  date: string;
  value: number;
}

const dashboardData: {
  weeklyProgress: DashboardDatum[];
  monthlyProgress: DashboardDatum[];
} = {
  weeklyProgress: [
    { date: "Mon", value: 10 },
    { date: "Tue", value: 20 },
    { date: "Wed", value: 35 },
    { date: "Thu", value: 35 },
    { date: "Fri", value: 55 },
    { date: "Sat", value: 75 },
    { date: "Sun", value: 80 },
  ],
  monthlyProgress: [
    { date: "Week 1", value: 25 },
    { date: "Week 2", value: 45 },
    { date: "Week 3", value: 65 },
    { date: "Week 4", value: 80 },
  ],
};

const Dashboard = () => {
  const [progressValue, setProgressValue] = useState(30);
  const { user } = useAuth();
  
  const storedProfile = localStorage.getItem("userProfile");
  const userProfile = storedProfile ? JSON.parse(storedProfile) : {
    companyName: "TechVentures Pvt Ltd",
    incorporationDate: "2023-06-15",
    registrationState: "Karnataka",
    annualTurnover: "Under ₹40 lakhs",
    employeeCount: "5-10",
    sector: "Technology",
    businessType: "Private Limited Company"
  };
  
  const handleProgressChange = (value: number) => {
    setProgressValue(value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderComponent />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.user_metadata?.name || user?.email || "User"}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Overall Progress</CardTitle>
              <CardDescription>
                Your startup journey completion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{progressValue}%</span>
                  <span className="text-xs text-muted-foreground">Updated today</span>
                </div>
                <Progress value={progressValue} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Next Deadline</CardTitle>
              <CardDescription>
                Upcoming compliance date
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CircleDot className="h-4 w-4 text-amber-500" />
                  <p className="font-medium">GST Return (GSTR-3B)</p>
                </div>
                <p className="text-muted-foreground text-sm">Due on May 20, 2024</p>
                <p className="text-sm mt-2">Monthly return for April 2024</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription>
                Latest updates on your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Bell className="h-4 w-4 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm">Compliance report generated</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm">Checklist item completed</p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <BusinessChecklist onProgressChange={handleProgressChange} />
            
            <SectorDocuments 
              sector={userProfile.sector}
              businessType={userProfile.businessType}
              userProfile={userProfile}
            />
          </div>
          
          <div className="space-y-6">
            <ComplianceReport 
              sectorType={userProfile.sector}
              businessType={userProfile.businessType}
              userProfile={userProfile}
            />
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Progress Report
                </CardTitle>
                <CardDescription>
                  Track your weekly compliance progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="weekly">
                  <TabsList className="mb-4">
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  </TabsList>
                  <TabsContent value="weekly" className="space-y-4">
                    <div className="h-36">
                      <div className="flex h-full items-end gap-2">
                        {dashboardData.weeklyProgress.map((item, i) => (
                          <div key={i} className="relative flex flex-col items-center flex-1">
                            <div 
                              className="w-full bg-primary rounded-t"
                              style={{ height: `${item.value}%` }}
                            />
                            <span className="text-xs mt-2">{item.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Apr 8 - Apr 14, 2024</span>
                      <div className="flex items-center text-green-600">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        <span>45% increase</span>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="monthly" className="space-y-4">
                    <div className="h-36">
                      <div className="flex h-full items-end gap-6">
                        {dashboardData.monthlyProgress.map((item, i) => (
                          <div key={i} className="relative flex flex-col items-center flex-1">
                            <div 
                              className="w-full bg-primary rounded-t"
                              style={{ height: `${item.value}%` }}
                            />
                            <span className="text-xs mt-2">{item.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Apr 1 - Apr 30, 2024</span>
                      <div className="flex items-center text-green-600">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        <span>55% increase</span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileBarChart2 className="mr-2 h-5 w-5" />
                  Business Insights
                </CardTitle>
                <CardDescription>
                  Based on your startup profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Startup India Recognition</h3>
                  <p className="text-sm text-muted-foreground">
                    Your startup qualifies for DPIIT registration, which can provide tax benefits.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">GST Threshold</h3>
                  <p className="text-sm text-muted-foreground">
                    With turnover under ₹40 lakhs, GST registration is not mandatory for services in Karnataka.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Funding Eligibility</h3>
                  <p className="text-sm text-muted-foreground">
                    Your tech startup may qualify for funding schemes like SIDBI Startup Fund.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <FooterComponent />
    </div>
  );
};

export default Dashboard;
