
import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { generateComplianceReport } from "@/utils/downloadUtils";

interface SectorComplianceMap {
  [key: string]: string[];
}

// Pre-defined compliance requirements by sector
const sectorCompliance: SectorComplianceMap = {
  "Technology": ["GST Registration", "Shop & Establishment Act", "Professional Tax", "MSME Registration", "Trademark Registration", "Patents (if applicable)", "Data Protection Compliance"],
  "Food": ["FSSAI License", "GST Registration", "Health Trade License", "Fire Safety License", "Weights & Measures License", "Eating House License", "MSME Registration"],
  "E-commerce": ["GST Registration", "Shop & Establishment Act", "Professional Tax", "MSME Registration", "Consumer Protection (E-commerce) Rules", "FDI Compliance", "Payment Aggregator Guidelines"],
  "Healthcare": ["Clinical Establishment License", "GST Registration", "Biomedical Waste Management", "Drugs License (if applicable)", "PNDT Registration (if applicable)", "Fire Safety License", "Pharmacy Council Registration"],
  "Entertainment": ["GST Registration", "Shop & Establishment Act", "Local Municipal Permissions", "Copyright Registration", "Censor Board Certification (for films)", "Performance License", "Event Permissions"],
  "Manufacturing": ["Factory License", "GST Registration", "Pollution Control Board Consent", "Fire Safety License", "MSME Registration", "Industrial Entrepreneur Memorandum", "Electricity and Water Connection Approvals"],
};

// Pre-defined business type compliance requirements
const businessTypeCompliance: SectorComplianceMap = {
  "Sole Proprietorship": ["PAN Card", "GST Registration (if applicable)", "Shop & Establishment Act", "Business License", "Municipal Trade License"],
  "Partnership": ["Partnership Deed Registration", "PAN Card", "GST Registration", "Shop & Establishment Act", "Professional Tax"],
  "LLP": ["LLP Registration", "PAN & TAN", "GST Registration", "Shop & Establishment Act", "Annual Filing (Form 8 & 11)"],
  "Private Limited Company": ["Certificate of Incorporation", "PAN & TAN", "GST Registration", "MSME Registration", "ESI & PF Registration", "Annual Filing (MGT-7, AOC-4)"],
  "Public Limited Company": ["Certificate of Incorporation", "PAN & TAN", "GST Registration", "SEBI Compliance", "Annual Filing (MGT-7, AOC-4)", "Stock Exchange Compliances"],
  "One Person Company": ["Certificate of Incorporation", "PAN & TAN", "GST Registration", "MSME Registration", "Annual Filing (MGT-7, AOC-4)"]
};

interface ComplianceReportProps {
  sectorType: string;
  businessType: string;
  userProfile: any;
}

const ComplianceReport: React.FC<ComplianceReportProps> = ({ 
  sectorType = "Technology",
  businessType = "Private Limited Company",
  userProfile = {}
}) => {
  const [downloading, setDownloading] = useState(false);

  // Get the appropriate compliance requirements
  const sector = sectorType || "Technology";
  const businessEntity = businessType || "Private Limited Company";
  
  const sectorRequirements = sectorCompliance[sector] || sectorCompliance["Technology"];
  const businessRequirements = businessTypeCompliance[businessEntity] || businessTypeCompliance["Private Limited Company"];
  
  // All combined compliance requirements
  const allRequirements = [...businessRequirements, ...sectorRequirements];
  
  // Handle report download
  const handleDownload = () => {
    setDownloading(true);
    
    // Use the download utility with enriched user profile
    const enrichedProfile = {
      ...userProfile,
      // Add compliance status flags
      hasGstRegistration: Math.random() > 0.5,
      hasTaxFiling: Math.random() > 0.5,
      hasTrademark: Math.random() > 0.5,
      hasLabourCompliances: Math.random() > 0.5,
      hasShopEstablishment: Math.random() > 0.5,
    };
    
    try {
      if (generateComplianceReport(enrichedProfile)) {
        toast({
          title: "Report Downloaded",
          description: "Your compliance report has been downloaded successfully.",
        });
      } else {
        toast({
          title: "Download Error",
          description: "There was an error downloading the report.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Download Error",
        description: "There was an unexpected error generating your report.",
        variant: "destructive",
      });
      console.error("Report generation error:", error);
    } finally {
      setDownloading(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance Report</CardTitle>
        <CardDescription>
          Required compliances for your {businessEntity} in the {sector} sector
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Required Registrations & Licenses</h4>
            <ul className="text-sm space-y-1 pl-5 list-disc">
              {allRequirements.slice(0, 8).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
              {allRequirements.length > 8 && (
                <li className="text-muted-foreground">+{allRequirements.length - 8} more</li>
              )}
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm pt-2 border-t">
            <div className="text-muted-foreground">Business Type:</div>
            <div className="font-medium">{businessEntity}</div>
            
            <div className="text-muted-foreground">Sector:</div>
            <div className="font-medium">{sector}</div>
            
            <div className="text-muted-foreground">Location:</div>
            <div className="font-medium">{userProfile.registrationState || "Karnataka"}</div>
            
            <div className="text-muted-foreground">Turnover Range:</div>
            <div className="font-medium">{userProfile.annualTurnover || "Under ₹40 lakhs"}</div>
            
            <div className="text-muted-foreground">Incorporation Date:</div>
            <div className="font-medium">{userProfile.incorporationDate || "2023-06-15"}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloading ? "Downloading..." : "Download Detailed Report"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ComplianceReport;
