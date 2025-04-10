
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Download, FileCheck, Info, AlertTriangle, CheckCircle2, BookOpen, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

const ComplianceGuide = () => {
  const [businessType, setBusinessType] = useState("private_limited");

  const handleDownload = () => {
    toast({
      title: "Guide downloaded",
      description: "The compliance guide has been downloaded to your device.",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue={businessType} onValueChange={setBusinessType} className="space-y-6">
        <div className="bg-muted/30 rounded-lg p-4 mb-4">
          <p className="text-sm text-muted-foreground">
            Select your business structure to see specific compliance requirements and timelines.
          </p>
        </div>

        <TabsList className="bg-muted/50">
          <TabsTrigger value="private_limited">Private Limited Company</TabsTrigger>
          <TabsTrigger value="llp">Limited Liability Partnership</TabsTrigger>
          <TabsTrigger value="proprietorship">Proprietorship</TabsTrigger>
          <TabsTrigger value="opc">One Person Company</TabsTrigger>
        </TabsList>
        
        {/* Private Limited Company */}
        <TabsContent value="private_limited" className="border-none p-0">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileCheck className="mr-2 h-5 w-5" />
                    Compliance Requirements
                  </CardTitle>
                  <CardDescription>
                    Key compliance requirements for Private Limited Companies in India
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="initial">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center">
                          <span>Initial Compliances</span>
                          <Badge className="ml-2" variant="outline">One-time</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <ComplianceItem 
                            title="Certificate of Incorporation" 
                            description="Issued by MCA upon successful registration"
                            deadline="One-time"
                            status="required"
                          />
                          <ComplianceItem 
                            title="PAN and TAN Application" 
                            description="Mandatory for all business operations and tax compliance"
                            deadline="Within 30 days of incorporation"
                            status="required"
                          />
                          <ComplianceItem 
                            title="GST Registration" 
                            description="Required if turnover exceeds ₹40 lakh (₹20 lakh for service sector)"
                            deadline="Before starting business operations"
                            status="conditional"
                          />
                          <ComplianceItem 
                            title="ESI Registration" 
                            description="For companies with more than 10 employees"
                            deadline="Within 15 days of the ESI Act becoming applicable"
                            status="conditional"
                          />
                          <ComplianceItem 
                            title="PF Registration" 
                            description="For companies with 20 or more employees"
                            deadline="Within 30 days of employee threshold being reached"
                            status="conditional"
                          />
                          <ComplianceItem 
                            title="Professional Tax Registration" 
                            description="Varies by state; required for employees earning salary"
                            deadline="Varies by state"
                            status="conditional"
                          />
                          <ComplianceItem 
                            title="MSME Registration" 
                            description="Optional registration for benefits under MSME schemes"
                            deadline="Any time after incorporation"
                            status="optional"
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="periodic">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center">
                          <span>Periodic Compliances</span>
                          <Badge className="ml-2" variant="outline">Recurring</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <ComplianceItem 
                            title="Annual Returns (Form MGT-7)" 
                            description="Details of shareholders, directors, and other company information"
                            deadline="Within 60 days from AGM date"
                            status="required"
                          />
                          <ComplianceItem 
                            title="Financial Statements (AOC-4)" 
                            description="Balance sheet, profit and loss account, and other financial details"
                            deadline="Within 30 days from AGM date"
                            status="required"
                          />
                          <ComplianceItem 
                            title="Income Tax Returns" 
                            description="Annual filing of income tax returns"
                            deadline="September 30 (non-audit cases) / October 31 (audit cases)"
                            status="required"
                          />
                          <ComplianceItem 
                            title="GST Returns" 
                            description="Monthly/Quarterly filing of GST returns"
                            deadline="GSTR-1: 10th of next month; GSTR-3B: 20th of next month"
                            status="conditional"
                          />
                          <ComplianceItem 
                            title="TDS Returns" 
                            description="Quarterly filing of TDS returns"
                            deadline="7th of month following the quarter end"
                            status="conditional"
                          />
                          <ComplianceItem 
                            title="ESI and PF Returns" 
                            description="Monthly filing of ESI and PF returns"
                            deadline="ESI: 15th of next month; PF: 15th of next month"
                            status="conditional"
                          />
                          <ComplianceItem 
                            title="Annual General Meeting (AGM)" 
                            description="Mandatory annual meeting of shareholders"
                            deadline="Within 6 months from the end of the financial year"
                            status="required"
                          />
                          <ComplianceItem 
                            title="Board Meetings" 
                            description="Regular meetings of the board of directors"
                            deadline="At least four meetings annually, with gap not exceeding 120 days"
                            status="required"
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="filings">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center">
                          <span>Event-Based Compliances</span>
                          <Badge className="ml-2" variant="outline">As Needed</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <ComplianceItem 
                            title="Change in Directors (DIR-12)" 
                            description="Filing for appointment or resignation of directors"
                            deadline="Within 30 days of the change"
                            status="conditional"
                          />
                          <ComplianceItem 
                            title="Change in Registered Office (INC-22)" 
                            description="Filing for change in registered office address"
                            deadline="Within 30 days of the change"
                            status="conditional"
                          />
                          <ComplianceItem 
                            title="Change in Authorized Capital (SH-7)" 
                            description="Filing for increasing the authorized share capital"
                            deadline="Within 30 days of the change"
                            status="conditional"
                          />
                          <ComplianceItem 
                            title="Allotment of Shares (PAS-3)" 
                            description="Filing for allotment of shares to shareholders"
                            deadline="Within 30 days of allotment"
                            status="conditional"
                          />
                          <ComplianceItem 
                            title="Director's KYC (DIR-3 KYC)" 
                            description="Annual KYC filing for all directors"
                            deadline="September 30th each year"
                            status="required"
                          />
                          <ComplianceItem 
                            title="Significant Beneficial Ownership (BEN-1)" 
                            description="Disclosure of significant beneficial owners"
                            deadline="Within 30 days of acquiring significant beneficial ownership"
                            status="conditional"
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Key Deadlines
                  </CardTitle>
                  <CardDescription>
                    Important compliance deadlines for the current financial year
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-md">
                      <div className="flex items-center">
                        <AlertTriangle className="text-amber-500 h-5 w-5 mr-2" />
                        <h3 className="font-medium">Upcoming Deadlines</h3>
                      </div>
                      <div className="pl-7 mt-2 space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span>GSTR-3B for April 2024</span>
                          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">May 20, 2024</Badge>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>TDS Payment for April 2024</span>
                          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">May 7, 2024</Badge>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>ESI Payment for April 2024</span>
                          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">May 15, 2024</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-2">Annual Deadlines</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span>Annual General Meeting</span>
                          <span className="text-muted-foreground">Within 6 months from end of FY (by Sept 30)</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Filing of Annual Returns (MGT-7)</span>
                          <span className="text-muted-foreground">Within 60 days of AGM (by Nov 29)</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Filing of Financial Statements (AOC-4)</span>
                          <span className="text-muted-foreground">Within 30 days of AGM (by Oct 30)</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Income Tax Return Filing</span>
                          <span className="text-muted-foreground">Oct 31, 2024 (for audit cases)</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Director's KYC (DIR-3 KYC)</span>
                          <span className="text-muted-foreground">Sep 30, 2024</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="mr-2 h-5 w-5" />
                    Compliance Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">Total Requirements:</span>
                        <span className="font-medium">24</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">Mandatory:</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">Conditional:</span>
                        <span className="font-medium">9</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Optional:</span>
                        <span className="font-medium">3</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">Annual Filings:</span>
                        <span className="font-medium">5</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">Quarterly Filings:</span>
                        <span className="font-medium">4</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly Filings:</span>
                        <span className="font-medium">6</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-2">Non-Compliance Penalties</h4>
                      <div className="space-y-2">
                        <div className="text-muted-foreground">
                          <span className="font-medium text-foreground">Late Annual Filing:</span> Up to ₹10,000 per form
                        </div>
                        <div className="text-muted-foreground">
                          <span className="font-medium text-foreground">GST Non-Compliance:</span> Up to 18% interest p.a.
                        </div>
                        <div className="text-muted-foreground">
                          <span className="font-medium text-foreground">TDS Default:</span> 1.5% interest per month
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3 p-3 border rounded-md">
                    <FileText className="h-5 w-5 mt-1 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Compliance Calendar</h4>
                      <p className="text-muted-foreground text-sm">Complete annual calendar with all due dates</p>
                      <Button variant="link" className="px-0 h-auto py-1 text-blue-600" onClick={handleDownload}>
                        Download PDF
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 border rounded-md">
                    <BookOpen className="h-5 w-5 mt-1 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Compliance Handbook</h4>
                      <p className="text-muted-foreground text-sm">Detailed guide for Private Limited Companies</p>
                      <Button variant="link" className="px-0 h-auto py-1 text-blue-600" onClick={handleDownload}>
                        Download PDF
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 border rounded-md">
                    <CheckCircle2 className="h-5 w-5 mt-1 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Form Templates</h4>
                      <p className="text-muted-foreground text-sm">Ready-to-use templates for common forms</p>
                      <Button variant="link" className="px-0 h-auto py-1 text-blue-600" onClick={handleDownload}>
                        Download ZIP
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* LLP */}
        <TabsContent value="llp" className="border-none p-0">
          <Card>
            <CardHeader>
              <CardTitle>Limited Liability Partnership (LLP) Compliance</CardTitle>
              <CardDescription>Key requirements and deadlines for LLPs in India</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                LLPs have a simpler compliance structure compared to Private Limited Companies, but still have important regulatory requirements to fulfill.
              </p>
              
              <div className="space-y-4">
                <h3 className="font-medium">Key LLP Compliances:</h3>
                <div className="space-y-4">
                  <ComplianceItem 
                    title="Annual Return (Form 11)" 
                    description="Details of partners, registered office, and other LLP information"
                    deadline="Within 60 days from the close of the financial year"
                    status="required"
                  />
                  <ComplianceItem 
                    title="Statement of Accounts & Solvency (Form 8)" 
                    description="Financial statements and solvency declaration"
                    deadline="Within 30 days from the end of 6 months of the financial year"
                    status="required"
                  />
                  <ComplianceItem 
                    title="Income Tax Return" 
                    description="Annual filing of income tax return"
                    deadline="July 31 (non-audit cases) / October 31 (audit cases)"
                    status="required"
                  />
                  <ComplianceItem 
                    title="GST Registration & Returns" 
                    description="Required if turnover exceeds threshold limits"
                    deadline="GSTR-1: 10th of next month; GSTR-3B: 20th of next month"
                    status="conditional"
                  />
                </div>
                
                <div className="mt-6">
                  <Button className="w-full" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download LLP Compliance Guide
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Proprietorship */}
        <TabsContent value="proprietorship" className="border-none p-0">
          <Card>
            <CardHeader>
              <CardTitle>Proprietorship Compliance</CardTitle>
              <CardDescription>Key requirements for proprietorship businesses in India</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Proprietorships have the simplest compliance structure among all business types, but still have important legal requirements to fulfill.
              </p>
              
              <div className="space-y-4">
                <h3 className="font-medium">Key Proprietorship Compliances:</h3>
                <div className="space-y-4">
                  <ComplianceItem 
                    title="Income Tax Return" 
                    description="Annual filing of income tax return"
                    deadline="July 31 (non-audit cases) / October 31 (audit cases)"
                    status="required"
                  />
                  <ComplianceItem 
                    title="GST Registration & Returns" 
                    description="Required if turnover exceeds ₹40 lakhs (₹20 lakhs for service businesses)"
                    deadline="GSTR-1: 10th of next month; GSTR-3B: 20th of next month"
                    status="conditional"
                  />
                  <ComplianceItem 
                    title="Shop & Establishment Act Registration" 
                    description="Required for businesses with physical premises"
                    deadline="Within 30 days of starting the business"
                    status="conditional"
                  />
                  <ComplianceItem 
                    title="Trade License" 
                    description="Required for specific types of businesses (varies by location)"
                    deadline="Varies by location"
                    status="conditional"
                  />
                </div>
                
                <div className="mt-6">
                  <Button className="w-full" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Proprietorship Compliance Guide
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* OPC */}
        <TabsContent value="opc" className="border-none p-0">
          <Card>
            <CardHeader>
              <CardTitle>One Person Company (OPC) Compliance</CardTitle>
              <CardDescription>Key requirements for OPCs in India</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                OPCs have similar compliance requirements to Private Limited Companies with some relaxations.
              </p>
              
              <div className="space-y-4">
                <h3 className="font-medium">Key OPC Compliances:</h3>
                <div className="space-y-4">
                  <ComplianceItem 
                    title="Annual Returns (Form MGT-7)" 
                    description="Details of shareholders, directors, and other company information"
                    deadline="Within 60 days from AGM date"
                    status="required"
                  />
                  <ComplianceItem 
                    title="Financial Statements (AOC-4)" 
                    description="Balance sheet, profit and loss account, and other financial details"
                    deadline="Within 30 days from AGM date"
                    status="required"
                  />
                  <ComplianceItem 
                    title="Income Tax Return" 
                    description="Annual filing of income tax returns"
                    deadline="October 31 (for audit cases)"
                    status="required"
                  />
                  <ComplianceItem 
                    title="GST Registration & Returns" 
                    description="Required if turnover exceeds threshold limits"
                    deadline="GSTR-1: 10th of next month; GSTR-3B: 20th of next month"
                    status="conditional"
                  />
                </div>
                
                <div className="mt-6">
                  <Button className="w-full" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download OPC Compliance Guide
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ComplianceItemProps {
  title: string;
  description: string;
  deadline: string;
  status: "required" | "conditional" | "optional";
}

const ComplianceItem = ({ title, description, deadline, status }: ComplianceItemProps) => {
  const statusConfig = {
    required: {
      icon: <CheckCircle className="h-4 w-4 text-red-500" />,
      label: "Required"
    },
    conditional: {
      icon: <Info className="h-4 w-4 text-amber-500" />,
      label: "Conditional"
    },
    optional: {
      icon: <Info className="h-4 w-4 text-blue-500" />,
      label: "Optional"
    }
  };

  return (
    <div className="flex items-start gap-2 border-b pb-3">
      <div className="mt-1">{statusConfig[status].icon}</div>
      <div>
        <div className="flex items-center gap-2">
          <h4 className="font-medium">{title}</h4>
          <Badge variant="outline" className="text-xs">
            {statusConfig[status].label}
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm">{description}</p>
        <div className="flex items-center mt-1">
          <Clock className="h-3 w-3 text-muted-foreground mr-1" />
          <span className="text-xs text-muted-foreground">Deadline: {deadline}</span>
        </div>
      </div>
    </div>
  );
};

export default ComplianceGuide;
