
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Download, HelpCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";

// Helper function to format numbers as Indian currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

const TaxCalculator = () => {
  const [businessType, setBusinessType] = useState("proprietorship");
  const [turnover, setTurnover] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const [employeeCount, setEmployeeCount] = useState<number>(0);
  const [state, setState] = useState("Karnataka");
  const [calculatedResults, setCalculatedResults] = useState<any>(null);

  const calculateTax = () => {
    // Basic calculation logic (simplified for demo)
    const profit = turnover - expenses;
    const taxableIncome = profit;
    
    let incomeTax = 0;
    let gst = 0;
    let professionalTax = 0;
    let totalTax = 0;
    
    // Income tax calculation (simplified)
    if (businessType === "proprietorship") {
      if (taxableIncome <= 250000) {
        incomeTax = 0;
      } else if (taxableIncome <= 500000) {
        incomeTax = (taxableIncome - 250000) * 0.05;
      } else if (taxableIncome <= 1000000) {
        incomeTax = 12500 + (taxableIncome - 500000) * 0.2;
      } else {
        incomeTax = 112500 + (taxableIncome - 1000000) * 0.3;
      }
    } else if (businessType === "private_limited") {
      // Fixed corporate tax rate (simplified)
      incomeTax = taxableIncome * 0.25;
    } else if (businessType === "llp") {
      // LLP tax rate (simplified)
      incomeTax = taxableIncome * 0.30;
    }
    
    // GST calculation (very simplified)
    if (turnover > 2000000) {
      gst = turnover * 0.18 * 0.03; // Estimated GST liability (very simplified)
    }
    
    // Professional tax (simplified based on employee count)
    professionalTax = Math.min(employeeCount * 200 * 12, 25000);
    
    totalTax = incomeTax + gst + professionalTax;
    
    // Apply state-specific adjustments (simplified)
    if (state === "Karnataka") {
      totalTax *= 1; // No adjustment
    } else if (state === "Maharashtra") {
      totalTax *= 1.02; // 2% higher for example purposes
    }
    
    // Calculate effective tax rate
    const effectiveTaxRate = profit > 0 ? (totalTax / profit) * 100 : 0;
    
    setCalculatedResults({
      profit,
      incomeTax,
      gst,
      professionalTax,
      totalTax,
      effectiveTaxRate: effectiveTaxRate.toFixed(2)
    });
    
    toast({
      title: "Tax calculation complete",
      description: "Your estimated tax liability has been calculated.",
    });
  };

  const downloadReport = () => {
    // In a real app, this would generate and download a PDF report
    toast({
      title: "Report downloaded",
      description: "Your tax calculation report has been downloaded.",
    });
  };

  const eligibleSchemes = [
    {
      name: "Startup India Seed Fund",
      eligibility: "Early-stage startups recognized by DPIIT",
      benefit: "Financial assistance up to ₹5 crores"
    },
    {
      name: "Credit Guarantee Fund Trust for MSEs",
      eligibility: "MSMEs with turnover under ₹100 crores",
      benefit: "Collateral-free loans up to ₹2 crores"
    },
    {
      name: "Technology Development Programme",
      eligibility: "Technology-focused startups",
      benefit: "Grants up to ₹1 crore for R&D"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-5">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="mr-2 h-5 w-5" />
              Tax Calculator
            </CardTitle>
            <CardDescription>
              Estimate your startup's tax liability and find applicable schemes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="business-type">Business Type</Label>
                  <Select defaultValue={businessType} onValueChange={setBusinessType}>
                    <SelectTrigger id="business-type">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="proprietorship">Proprietorship</SelectItem>
                      <SelectItem value="private_limited">Private Limited Company</SelectItem>
                      <SelectItem value="llp">Limited Liability Partnership (LLP)</SelectItem>
                      <SelectItem value="partnership">Partnership Firm</SelectItem>
                      <SelectItem value="opc">One Person Company (OPC)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State of Registration</Label>
                  <Select defaultValue={state} onValueChange={setState}>
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Karnataka">Karnataka</SelectItem>
                      <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="Delhi">Delhi</SelectItem>
                      <SelectItem value="Tamil_Nadu">Tamil Nadu</SelectItem>
                      <SelectItem value="Gujarat">Gujarat</SelectItem>
                      <SelectItem value="Telangana">Telangana</SelectItem>
                      <SelectItem value="Other">Other States</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="turnover">Annual Turnover (₹)</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Total revenue generated by your business in the financial year</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input 
                    id="turnover" 
                    type="number" 
                    value={turnover} 
                    onChange={(e) => setTurnover(parseFloat(e.target.value) || 0)} 
                    placeholder="Enter annual turnover"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="expenses">Annual Expenses (₹)</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Total business expenses that can be deducted from your turnover</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input 
                    id="expenses" 
                    type="number" 
                    value={expenses} 
                    onChange={(e) => setExpenses(parseFloat(e.target.value) || 0)} 
                    placeholder="Enter annual expenses"
                  />
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="employees">Number of Employees</Label>
                  <Input 
                    id="employees" 
                    type="number" 
                    value={employeeCount} 
                    onChange={(e) => setEmployeeCount(parseInt(e.target.value) || 0)} 
                    placeholder="Enter employee count"
                  />
                </div>
              </div>
              
              <Button onClick={calculateTax} className="w-full">Calculate Tax Liability</Button>
            </div>
            
            {calculatedResults && (
              <div className="mt-6 border rounded-md p-4 bg-muted/30">
                <h3 className="font-medium mb-2">Calculation Results</h3>
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <span>Profit/Loss:</span>
                    <span className={calculatedResults.profit >= 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                      {formatCurrency(calculatedResults.profit)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Income Tax:</span>
                    <span>{formatCurrency(calculatedResults.incomeTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (estimated):</span>
                    <span>{formatCurrency(calculatedResults.gst)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Professional Tax:</span>
                    <span>{formatCurrency(calculatedResults.professionalTax)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total Estimated Tax:</span>
                    <span>{formatCurrency(calculatedResults.totalTax)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground text-sm">
                    <span>Effective Tax Rate:</span>
                    <span>{calculatedResults.effectiveTaxRate}%</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4" onClick={downloadReport}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Detailed Report
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Eligible Schemes</CardTitle>
            <CardDescription>
              Government schemes you may qualify for based on your business profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eligibleSchemes.map((scheme, index) => (
                <div key={index} className="border rounded-md p-3">
                  <h3 className="font-medium mb-1">{scheme.name}</h3>
                  <div className="text-sm">
                    <div className="flex gap-2 mb-1">
                      <span className="font-medium">Eligibility:</span>
                      <span className="text-muted-foreground">{scheme.eligibility}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium">Benefit:</span>
                      <span className="text-muted-foreground">{scheme.benefit}</span>
                    </div>
                  </div>
                </div>
              ))}
              <Button asChild variant="outline" className="w-full">
                <a href="https://www.startupindia.gov.in/content/sih/en/government-schemes.html" target="_blank" rel="noopener noreferrer">
                  View All Schemes
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-muted/30 rounded-lg p-4 text-sm">
        <p className="text-muted-foreground">
          <strong>Disclaimer:</strong> This calculator provides estimates only and should not be considered as tax advice. 
          Please consult with a professional chartered accountant for accurate tax calculations tailored to your specific situation.
        </p>
      </div>
    </div>
  );
};

export default TaxCalculator;
