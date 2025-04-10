
/**
 * Utility functions for generating and downloading reports
 */

/**
 * Generate compliance report PDF
 */
export const generateComplianceReport = (userData: any) => {
  // In a real app, this would use a PDF library like pdfmake or jspdf
  // For demo purposes, we'll just create a text file with JSON data
  
  const reportData = {
    reportType: "Compliance Status Report",
    generatedAt: new Date().toISOString(),
    company: userData.companyName || "Your Company",
    sector: userData.sector || "Technology",
    businessType: userData.businessType || "Private Limited Company",
    status: "In Compliance",
    requiredCompliances: [
      {
        name: "GST Registration",
        status: userData.hasGstRegistration ? "Completed" : "Pending",
        deadline: "N/A"
      },
      {
        name: "Income Tax Filing",
        status: userData.hasTaxFiling ? "Completed" : "Pending",
        deadline: "July 31, 2024"
      },
      {
        name: "Trademark Registration",
        status: userData.hasTrademark ? "Completed" : "Pending",
        deadline: "N/A"
      },
      {
        name: "Labour Compliances",
        status: userData.hasLabourCompliances ? "Completed" : "Pending",
        deadline: "Monthly"
      },
      {
        name: "Shop & Establishment Registration",
        status: userData.hasShopEstablishment ? "Completed" : "Pending",
        deadline: "Before business commencement"
      }
    ],
    recommendations: [
      "Complete all pending compliance registrations",
      "Set up regular reminders for filing deadlines",
      "Consult with a CA for tax optimization strategies",
      "Maintain proper documentation for all registrations"
    ]
  };
  
  const content = JSON.stringify(reportData, null, 2);
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `compliance-report-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  return true;
};

/**
 * Generate tax calculation report PDF
 */
export const generateTaxReport = (taxData: any) => {
  // In a real app, this would use a PDF library like pdfmake or jspdf
  
  const reportData = {
    reportType: "Tax Calculation Report",
    generatedAt: new Date().toISOString(),
    company: taxData.companyName || "Your Company",
    financialYear: taxData.financialYear || "2023-24",
    revenue: taxData.revenue || 0,
    expenses: taxData.expenses || 0,
    profit: (taxData.revenue || 0) - (taxData.expenses || 0),
    taxableIncome: taxData.taxableIncome || 0,
    taxRate: taxData.taxRate || "25%",
    estimatedTax: taxData.estimatedTax || 0,
    taxSavingSuggestions: [
      "Consider registering as a startup under Startup India to avail tax benefits",
      "Explore Section 80IAC for tax holiday benefits for eligible startups",
      "Utilize R&D expenditure benefits under section 35(2AB)",
      "Consider angel tax exemption under section 56(2)(viib)",
    ]
  };
  
  const content = JSON.stringify(reportData, null, 2);
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `tax-report-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  return true;
};

/**
 * Generate business plan template
 */
export const downloadBusinessPlanTemplate = () => {
  // In a real app, this would either download a pre-made template or generate one
  
  const template = `# Business Plan Template for Startups in India

## 1. Executive Summary
- Business Name:
- Business Location:
- Business Model:
- Vision & Mission:
- Products/Services:
- Target Market:
- USP (Unique Selling Proposition):
- Funding Requirements:

## 2. Company Description
- Company Background:
- Legal Structure:
- Industry Analysis:
- Growth Opportunities:
- Business Goals:

## 3. Market Analysis
- Target Market Demographics:
- Market Size:
- Market Trends:
- Competitor Analysis:
- SWOT Analysis:

## 4. Organization & Management
- Organizational Structure:
- Management Team:
- Board of Directors/Advisors:
- Legal & Accounting Support:

## 5. Products or Services
- Description:
- Life Cycle:
- Intellectual Property:
- R&D Activities:

## 6. Marketing & Sales Strategy
- Marketing Channels:
- Pricing Strategy:
- Sales Strategy:
- Growth Strategy:

## 7. Financial Projections
- Income Statement:
- Balance Sheet:
- Cash Flow Statement:
- Break-even Analysis:
- Funding Requirements:
- Use of Funds:

## 8. Compliance & Regulatory Requirements
- Licenses Required:
- Permits Required:
- Tax Obligations:
- Labor Law Compliance:
- Industry-specific Regulations:

## 9. Risk Assessment
- Internal Risks:
- External Risks:
- Mitigation Strategies:

## 10. Implementation Timeline
- Key Milestones:
- Launch Plan:
- Scaling Strategy:
  `;
  
  const blob = new Blob([template], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'startup-business-plan-template.md';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  return true;
};
