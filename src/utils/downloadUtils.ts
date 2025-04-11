import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Utility functions for generating and downloading reports
 */

/**
 * Generate compliance report PDF
 */
export const generateComplianceReport = (userData: any) => {
  try {
    // Create a new PDF document
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(33, 37, 41);
    doc.text("Compliance Status Report", pageWidth / 2, 20, { align: 'center' });
    
    // Add company details
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
    doc.text(`Company: ${userData.companyName || "Your Company"}`, 20, 40);
    doc.text(`Sector: ${userData.sector || "Technology"}`, 20, 45);
    doc.text(`Business Type: ${userData.businessType || "Private Limited Company"}`, 20, 50);
    doc.text(`State of Registration: ${userData.registrationState || "Karnataka"}`, 20, 55);
    doc.text(`Annual Turnover: ${userData.annualTurnover || "Under ₹40 lakhs"}`, 20, 60);
    doc.text(`Incorporation Date: ${userData.incorporationDate || "Not specified"}`, 20, 65);
    
    // Add compliance requirements table
    doc.setFontSize(14);
    doc.text("Required Compliances", 20, 75);
    
    const complianceData = [
      ["Compliance Requirement", "Status", "Deadline"],
      ["GST Registration", userData.hasGstRegistration ? "Completed" : "Pending", "N/A"],
      ["Income Tax Filing", userData.hasTaxFiling ? "Completed" : "Pending", "July 31, 2024"],
      ["Trademark Registration", userData.hasTrademark ? "Completed" : "Pending", "N/A"],
      ["Labour Compliances", userData.hasLabourCompliances ? "Completed" : "Pending", "Monthly"],
      ["Shop & Establishment Registration", userData.hasShopEstablishment ? "Completed" : "Pending", "Before business commencement"]
    ];
    
    // Use autoTable as a function
    autoTable(doc, {
      startY: 80,
      head: [complianceData[0]],
      body: complianceData.slice(1),
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { left: 20, right: 20 },
      tableWidth: 'auto'
    });
    
    // Add recommendations
    const recommendations = getRecommendations(userData);
    
    // Get the final Y position after the table
    const finalY = (doc as any).lastAutoTable.finalY + 20;
    doc.setFontSize(14);
    doc.text("Recommendations", 20, finalY);
    
    const recommendationY = finalY + 10;
    doc.setFontSize(10);
    recommendations.forEach((recommendation, index) => {
      doc.text(`• ${recommendation}`, 25, recommendationY + (index * 6));
    });
    
    // Save the PDF with a meaningful filename
    const filename = `compliance-report-${userData.companyName ? userData.companyName.replace(/\s+/g, '-').toLowerCase() : "company"}-${new Date().toLocaleDateString()}.pdf`;
    doc.save(filename);
    
    return true;
  } catch (error) {
    console.error("Error generating compliance report:", error);
    return false;
  }
};

/**
 * Get customized recommendations based on user profile
 */
const getRecommendations = (userData: any) => {
  const recommendations = [
    "Complete all pending compliance registrations",
    "Set up regular reminders for filing deadlines",
    "Consult with a CA for tax optimization strategies",
    "Maintain proper documentation for all registrations"
  ];
  
  // Add sector-specific recommendations
  if (userData.sector === "Technology") {
    recommendations.push("Consider trademark and patent protection for your tech innovations");
    recommendations.push("Ensure compliance with IT Act and data protection regulations");
  } else if (userData.sector === "E-commerce") {
    recommendations.push("Register under the Consumer Protection (E-commerce) Rules, 2020");
    recommendations.push("Ensure proper return and refund policies are in place");
  } else if (userData.sector === "Food") {
    recommendations.push("Obtain FSSAI license before commencing operations");
    recommendations.push("Ensure regular health and hygiene audits for your premises");
  }
  
  // Add business-type specific recommendations
  if (userData.businessType === "Private Limited Company") {
    recommendations.push("Schedule mandatory board meetings (minimum 4 per year)");
    recommendations.push("Plan for your Annual General Meeting within 6 months of financial year end");
  } else if (userData.businessType === "LLP") {
    recommendations.push("Prepare for filing Form 8 and Form 11 annual returns");
  }
  
  return recommendations;
};

/**
 * Generate tax calculation report PDF
 */
export const generateTaxReport = (taxData: any) => {
  // Create a new PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  
  // Add title
  doc.setFontSize(20);
  doc.setTextColor(33, 37, 41);
  doc.text("Tax Calculation Report", pageWidth / 2, 20, { align: 'center' });
  
  // Add company details
  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
  doc.text(`Company: ${taxData.companyName || "Your Company"}`, 20, 40);
  doc.text(`Financial Year: ${taxData.financialYear || "2023-24"}`, 20, 45);
  
  // Add tax calculation table
  const taxDetails = [
    ["Particular", "Amount (₹)"],
    ["Revenue", taxData.revenue?.toLocaleString() || "0"],
    ["Expenses", taxData.expenses?.toLocaleString() || "0"],
    ["Profit", ((taxData.revenue || 0) - (taxData.expenses || 0)).toLocaleString()],
    ["Taxable Income", taxData.taxableIncome?.toLocaleString() || "0"],
    ["Tax Rate", taxData.taxRate || "25%"],
    ["Estimated Tax", taxData.estimatedTax?.toLocaleString() || "0"]
  ];
  
  // Use autoTable as a function
  autoTable(doc, {
    startY: 55,
    head: [taxDetails[0]],
    body: taxDetails.slice(1),
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    alternateRowStyles: { fillColor: [240, 240, 240] }
  });
  
  // Add tax saving suggestions
  const suggestions = [
    "Consider registering as a startup under Startup India to avail tax benefits",
    "Explore Section 80IAC for tax holiday benefits for eligible startups",
    "Utilize R&D expenditure benefits under section 35(2AB)",
    "Consider angel tax exemption under section 56(2)(viib)"
  ];
  
  // Use doc.autoTable.previous for getting the final Y position
  let suggestionY = (doc as any).lastAutoTable.finalY + 20;
  doc.setFontSize(14);
  doc.text("Tax Saving Suggestions", 20, suggestionY);
  
  suggestionY += 10;
  doc.setFontSize(10);
  suggestions.forEach((suggestion, index) => {
    doc.text(`• ${suggestion}`, 25, suggestionY + (index * 6));
  });
  
  // Save the PDF
  doc.save(`tax-report-${taxData.companyName || "company"}-${new Date().toLocaleDateString()}.pdf`);
  
  return true;
};

/**
 * Generate business plan template
 */
export const downloadBusinessPlanTemplate = () => {
  // Create a new PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  
  // Add title
  doc.setFontSize(20);
  doc.setTextColor(33, 37, 41);
  doc.text("Business Plan Template", pageWidth / 2, 20, { align: 'center' });
  
  // Add sections
  const sections = [
    { title: "1. Executive Summary", content: [
      "Business Name:",
      "Business Location:",
      "Business Model:",
      "Vision & Mission:",
      "Products/Services:",
      "Target Market:",
      "USP (Unique Selling Proposition):",
      "Funding Requirements:"
    ]},
    { title: "2. Company Description", content: [
      "Company Background:",
      "Legal Structure:",
      "Industry Analysis:",
      "Growth Opportunities:",
      "Business Goals:"
    ]},
    { title: "3. Market Analysis", content: [
      "Target Market Demographics:",
      "Market Size:",
      "Market Trends:",
      "Competitor Analysis:",
      "SWOT Analysis:"
    ]},
    { title: "4. Organization & Management", content: [
      "Organizational Structure:",
      "Management Team:",
      "Board of Directors/Advisors:",
      "Legal & Accounting Support:"
    ]},
    { title: "5. Products or Services", content: [
      "Description:",
      "Life Cycle:",
      "Intellectual Property:",
      "R&D Activities:"
    ]},
    { title: "6. Marketing & Sales Strategy", content: [
      "Marketing Channels:",
      "Pricing Strategy:",
      "Sales Strategy:",
      "Growth Strategy:"
    ]},
    { title: "7. Financial Projections", content: [
      "Income Statement:",
      "Balance Sheet:",
      "Cash Flow Statement:",
      "Break-even Analysis:",
      "Funding Requirements:",
      "Use of Funds:"
    ]},
    { title: "8. Compliance & Regulatory Requirements", content: [
      "Licenses Required:",
      "Permits Required:",
      "Tax Obligations:",
      "Labor Law Compliance:",
      "Industry-specific Regulations:"
    ]},
    { title: "9. Risk Assessment", content: [
      "Internal Risks:",
      "External Risks:",
      "Mitigation Strategies:"
    ]},
    { title: "10. Implementation Timeline", content: [
      "Key Milestones:",
      "Launch Plan:",
      "Scaling Strategy:"
    ]}
  ];
  
  let yPosition = 30;
  
  sections.forEach(section => {
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(section.title, 20, yPosition);
    doc.setFont(undefined, 'normal');
    
    yPosition += 10;
    doc.setFontSize(10);
    
    section.content.forEach(item => {
      doc.text(`• ${item}`, 25, yPosition);
      yPosition += 7;
    });
    
    yPosition += 10;
  });
  
  // Save the PDF
  doc.save(`business-plan-template-${new Date().toLocaleDateString()}.pdf`);
  
  return true;
};

/**
 * Generate sector-specific compliance checklist PDF
 */
export const generateSectorComplianceChecklist = (userData: any) => {
  try {
    // Create a new PDF document
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(33, 37, 41);
    const sector = userData.sector || "Technology";
    doc.text(`${sector} Sector Compliance Checklist`, pageWidth / 2, 20, { align: 'center' });
    
    // Add company details
    doc.setFontSize(12);
    doc.text(`Generated for: ${userData.companyName || "Your Company"}`, 20, 30);
    doc.text(`Business Type: ${userData.businessType || "Private Limited Company"}`, 20, 35);
    doc.text(`State: ${userData.registrationState || "Karnataka"}`, 20, 40);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 45);
    
    // Define sector-specific compliances
    const compliancesBySector: Record<string, Array<{name: string, description: string, deadline: string, link: string}>> = {
      "Technology": [
        {name: "GST Registration", description: "Mandatory for businesses with turnover above ₹20 lakhs", deadline: "Before starting operations", link: "https://www.gst.gov.in/"},
        {name: "Shop & Establishment Act", description: "Registration under local municipal corporation", deadline: "Within 30 days of starting business", link: "https://shramsuvidha.gov.in/"},
        {name: "Professional Tax", description: "Registration and payment for employees", deadline: "Monthly/Quarterly as applicable", link: "https://www.gst.gov.in/"},
        {name: "Trademark Registration", description: "Protection for company name and logo", deadline: "As early as possible", link: "https://ipindia.gov.in/"},
        {name: "MSME Registration", description: "Benefits for small and medium enterprises", deadline: "Optional but recommended", link: "https://udyamregistration.gov.in/"},
        {name: "IT Act Compliance", description: "Privacy policy, terms of service for websites/apps", deadline: "Before launch", link: "#"},
        {name: "Labour Laws Compliance", description: "If hiring employees (PF, ESI, etc.)", deadline: "Before hiring", link: "https://www.epfindia.gov.in/"},
      ],
      "Food": [
        {name: "FSSAI License", description: "Food Safety and Standards Authority of India license", deadline: "Before starting operations", link: "https://foscos.fssai.gov.in/"},
        {name: "GST Registration", description: "Mandatory for businesses with turnover above ₹20 lakhs", deadline: "Before starting operations", link: "https://www.gst.gov.in/"},
        {name: "Health Trade License", description: "From local municipal corporation", deadline: "Before starting operations", link: "#"},
        {name: "Fire Safety License", description: "For restaurant premises", deadline: "Before starting operations", link: "#"},
        {name: "Eating House License", description: "From police department", deadline: "Before starting operations", link: "#"},
        {name: "Weights & Measures License", description: "If using weighing equipment", deadline: "Before starting operations", link: "#"},
        {name: "Liquor License", description: "If serving alcohol", deadline: "Before serving alcohol", link: "#"},
      ],
      "E-commerce": [
        {name: "GST Registration", description: "Mandatory for e-commerce businesses", deadline: "Before starting operations", link: "https://www.gst.gov.in/"},
        {name: "Shop & Establishment Act", description: "For office premises", deadline: "Within 30 days of setup", link: "https://shramsuvidha.gov.in/"},
        {name: "Consumer Protection Rules", description: "E-commerce specific rules compliance", deadline: "Before launch", link: "#"},
        {name: "Trademark Registration", description: "Protection for brand and logo", deadline: "As early as possible", link: "https://ipindia.gov.in/"},
        {name: "Payment Aggregator Compliance", description: "For payment processing", deadline: "Before accepting payments", link: "#"},
      ],
      // Add other sectors here
    };
    
    // Map sector name to the formats used in our dictionary
    const sectorKey = sector.charAt(0).toUpperCase() + sector.slice(1).toLowerCase();
    
    // Get compliances for user's sector or default to Technology
    const compliances = compliancesBySector[sector] || compliancesBySector["Technology"];
    
    // Create compliance table
    const tableData = [["Compliance", "Description", "Deadline"]];
    compliances.forEach(item => {
      tableData.push([item.name, item.description, item.deadline]);
    });
    
    // Add table to PDF with adjusted column widths
    autoTable(doc, {
      startY: 55,
      head: [tableData[0]],
      body: tableData.slice(1),
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 90 },
        2: { cellWidth: 40 }
      },
      margin: { left: 15, right: 15 },
    });
    
    // Add links section - get the final Y position after the table
    const finalY = (doc as any).lastAutoTable.finalY + 20;
    doc.setFontSize(14);
    doc.text("Useful Links", 20, finalY);
    
    const linksY = finalY + 10;
    doc.setFontSize(10);
    
    compliances.forEach((compliance, index) => {
      if (index < 9) { // Limit to prevent overflow
        doc.text(`• ${compliance.name}: `, 25, linksY + (index * 7));
        doc.setTextColor(0, 0, 255);
        const textWidth = doc.getTextWidth(`• ${compliance.name}: `);
        doc.text(compliance.link, 25 + textWidth, linksY + (index * 7));
        doc.setTextColor(33, 37, 41); // Reset text color
      }
    });
    
    // Save the PDF with a meaningful filename
    const filename = `${sector.toLowerCase()}-sector-compliance-checklist.pdf`;
    doc.save(filename);
    
    return true;
  } catch (error) {
    console.error("Error generating sector checklist:", error);
    return false;
  }
};
