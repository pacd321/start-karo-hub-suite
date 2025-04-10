
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Download, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ComplianceReportProps {
  sectorType: string;
  businessType: string;
  userProfile: {
    companyName: string;
    incorporationDate: string;
    registrationState: string;
    annualTurnover: string;
    employeeCount: string;
    sector: string;
    businessType: string;
  };
}

const ComplianceReport = ({ sectorType, businessType, userProfile }: ComplianceReportProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const complianceItems = [
    { 
      name: "GST Registration", 
      status: "Completed", 
      dueDate: "Not Applicable",
      details: "Registration Number: 29AADCB2230M1ZT"
    },
    { 
      name: "Income Tax Returns", 
      status: "Pending", 
      dueDate: "October 31, 2024",
      details: "Annual filing for FY 2023-24"
    },
    { 
      name: "Annual ROC Filings", 
      status: "Pending", 
      dueDate: "November 30, 2024",
      details: "Form AOC-4 and MGT-7 for FY 2023-24"
    },
    { 
      name: "TDS Filing", 
      status: "Completed", 
      dueDate: "July 31, 2024",
      details: "Q1 FY 2024-25 TDS Return"
    },
    { 
      name: "ESI Registration", 
      status: "Not Required", 
      dueDate: "Not Applicable",
      details: "Not required based on employee count"
    },
  ];

  const handleDownload = () => {
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      
      toast({
        title: "Report Downloaded",
        description: "Your compliance report has been downloaded successfully.",
      });
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance Report</CardTitle>
        <CardDescription>
          {userProfile.companyName} ({userProfile.sector} - {userProfile.businessType})
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md bg-muted/50 p-3">
          <div className="flex items-center gap-2 text-sm">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span className="font-medium">Compliance score: 75%</span>
            <Badge variant="outline" className="ml-auto">4/5 items complete</Badge>
          </div>
        </div>
        
        <div className="space-y-3 mt-4">
          {complianceItems.map((item, index) => (
            <div key={index} className="flex items-start border-b pb-2">
              <div className="mt-0.5 mr-3">
                {item.status === "Completed" ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : item.status === "Pending" ? (
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                ) : (
                  <Badge variant="outline" className="h-5 px-1 text-xs">N/A</Badge>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.details}</p>
                  </div>
                  <div className="text-right text-sm">
                    <div>Due: {item.dueDate}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleDownload} 
          className="w-full" 
          disabled={isGenerating}
        >
          <FileText className="h-4 w-4 mr-2" />
          {isGenerating ? "Generating..." : "Download Full Report"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ComplianceReport;
