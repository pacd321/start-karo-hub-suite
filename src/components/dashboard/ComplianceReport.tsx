
import { useState } from "react";
import { FileText, Download, BookOpen, ClipboardCheck, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface ComplianceReportProps {
  sectorType?: string;
  businessType?: string;
  userProfile?: any;
}

const ComplianceReport = ({
  sectorType = "Technology",
  businessType = "Private Limited Company",
  userProfile = {
    companyName: "TechVentures Pvt Ltd",
    incorporationDate: "2023-06-15",
    registrationState: "Karnataka",
    annualTurnover: "Under ₹40 lakhs",
    employeeCount: "5-10"
  }
}: ComplianceReportProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(true);
  const [addingToKnowledgeBase, setAddingToKnowledgeBase] = useState(false);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
      toast.success("Compliance report generated successfully");
    }, 2000);
  };

  const handleDownload = () => {
    toast.success("Compliance report downloaded successfully");
  };

  const handleAddToKnowledgeBase = () => {
    setAddingToKnowledgeBase(true);
    
    // Simulate adding to knowledge base
    setTimeout(() => {
      setAddingToKnowledgeBase(false);
      toast.success("Report added to your knowledge base");
    }, 1500);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Compliance Report
        </CardTitle>
        <CardDescription>
          Customized legal and compliance requirements for your business
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Business Type</p>
              <p className="text-sm">{businessType}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Sector</p>
              <p className="text-sm">{sectorType}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Registration State</p>
              <p className="text-sm">{userProfile.registrationState}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Annual Turnover</p>
              <p className="text-sm">{userProfile.annualTurnover}</p>
            </div>
          </div>

          {reportGenerated && (
            <div className="mt-6 space-y-4">
              <h4 className="font-medium">Key Compliance Requirements:</h4>
              <div className="space-y-3">
                {[
                  "Annual filing of MCA Form AOC-4 and MGT-7",
                  "Quarterly GST Returns (GSTR-1, GSTR-3B)",
                  "TDS Returns (Form 24Q, Form 26Q)",
                  "ESI & PF Registration (mandatory for your employee count)",
                  "IT Act Compliance for Software Companies",
                  "Annual Board Meeting & AGM requirements"
                ].map((requirement, i) => (
                  <div key={i} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs font-medium text-primary">{i + 1}</span>
                    </div>
                    <p className="text-sm">{requirement}</p>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-md">
                <h4 className="font-medium text-amber-800 flex items-center">
                  <ClipboardCheck className="h-4 w-4 mr-2" />
                  Upcoming Deadlines
                </h4>
                <ul className="mt-2 space-y-2">
                  <li className="text-sm flex items-start">
                    <span className="text-amber-800 mr-2">•</span>
                    GST Return GSTR-3B for April 2024 - Due by May 20, 2024
                  </li>
                  <li className="text-sm flex items-start">
                    <span className="text-amber-800 mr-2">•</span>
                    TDS Return Form 24Q for Q1 - Due by July 31, 2024
                  </li>
                  <li className="text-sm flex items-start">
                    <span className="text-amber-800 mr-2">•</span>
                    Annual Return (MGT-7) - Due by December 14, 2024
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {!reportGenerated ? (
          <Button 
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="w-full sm:w-auto"
          >
            {isGenerating ? "Generating..." : "Generate Compliance Report"}
          </Button>
        ) : (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1 sm:flex-none">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Full Report
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Compliance Report for {userProfile.companyName}</DialogTitle>
                  <DialogDescription>
                    Generated on {new Date().toLocaleDateString()}
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[calc(80vh-12rem)]">
                  <div className="p-4 space-y-6">
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold">1. Executive Summary</h2>
                      <p>This compliance report outlines the key regulatory requirements for {userProfile.companyName}, operating in the {sectorType} sector as a {businessType} registered in {userProfile.registrationState}.</p>
                    </div>
                    
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold">2. Company Registration Compliance</h2>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Maintain updated Director KYC annually through DIR-3 KYC form</li>
                        <li>Update the Register of Members and Register of Directors</li>
                        <li>Conduct Annual General Meeting (AGM) within 6 months from FY end</li>
                        <li>File Annual Returns (MGT-7) within 60 days of AGM</li>
                        <li>File Financial Statements (AOC-4) within 30 days of AGM</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold">3. Tax Compliance</h2>
                      <h3 className="text-lg font-medium">3.1 Income Tax</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>File Income Tax Return by October 31, 2024</li>
                        <li>Maintain books of accounts for at least 8 years</li>
                        <li>For your turnover bracket (Under ₹40 lakhs), tax audit not mandatory</li>
                        <li>Advance Tax payments required if tax liability exceeds ₹10,000</li>
                      </ul>
                      
                      <h3 className="text-lg font-medium">3.2 GST</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>File GSTR-1 monthly by 11th of the following month</li>
                        <li>File GSTR-3B monthly by 20th of the following month</li>
                        <li>Maintain electronic records for GST-registered businesses</li>
                        <li>For your tech services, applicable GST rate is 18%</li>
                      </ul>
                      
                      <h3 className="text-lg font-medium">3.3 TDS</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Deduct TDS on salary payments (Form 24Q)</li>
                        <li>Deduct TDS on contractor/professional payments exceeding ₹30,000 (Form 26Q)</li>
                        <li>TDS returns to be filed quarterly</li>
                        <li>Issue Form 16/16A to deductees</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold">4. Labor Law Compliance</h2>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>For your employee count (5-10), registration under Shops and Establishments Act is mandatory</li>
                        <li>PF registration required (for organizations with 20+ employees)</li>
                        <li>ESI registration required (for organizations with 10+ employees earning up to ₹21,000/month)</li>
                        <li>Professional Tax registration as per Karnataka state regulations</li>
                        <li>Maintain statutory registers under various labor laws</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold">5. Sector-Specific Compliance ({sectorType})</h2>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Compliance with Information Technology Act, 2000</li>
                        <li>Data privacy and protection measures under IT Rules, 2011</li>
                        <li>Software copyright protection for intellectual property</li>
                        <li>Website privacy policy and terms of service requirements</li>
                        <li>If offering digital payment solutions, compliance with Payment and Settlement Systems Act</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold">6. Compliance Calendar for Next 3 Months</h2>
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicable To</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">May 11, 2024</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">GSTR-1 for April 2024</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">All GST Registered Entities</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">May 20, 2024</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">GSTR-3B for April 2024</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">All GST Registered Entities</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">May 31, 2024</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">TDS Payment for May 2024</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">All Deductors</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">June 15, 2024</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">First Installment of Advance Tax</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">All Taxpayers</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">June 11, 2024</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">GSTR-1 for May 2024</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">All GST Registered Entities</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">June 20, 2024</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">GSTR-3B for May 2024</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">All GST Registered Entities</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">June 30, 2024</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">TDS Payment for June 2024</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">All Deductors</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">July 15, 2024</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">TDS Returns for Q1 (Apr-Jun 2024)</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">All Deductors</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold">7. Recommendations</h2>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Implement a compliance management system for timely submissions</li>
                        <li>Conduct quarterly internal compliance audits</li>
                        <li>Consider applying for Startup India recognition for tax benefits</li>
                        <li>Ensure proper documentation of all board meetings and decisions</li>
                        <li>Review and update privacy policy and terms of service periodically</li>
                      </ul>
                    </div>
                  </div>
                </ScrollArea>
                <DialogFooter>
                  <Button onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button onClick={handleDownload} className="flex-1 sm:flex-none">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            
            <Button 
              variant="secondary"
              onClick={handleAddToKnowledgeBase}
              disabled={addingToKnowledgeBase}
              className="flex-1 sm:flex-none"
            >
              {addingToKnowledgeBase ? (
                "Adding..."
              ) : (
                <>
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Add to Knowledge Base
                </>
              )}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default ComplianceReport;
