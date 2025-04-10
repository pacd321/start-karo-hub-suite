
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { toast } from "sonner";

// Define document types by sector and business type
interface DocumentsByCategory {
  [key: string]: {
    name: string;
    description: string;
    fileName: string;
  }[];
}

// Documents by sector
const documentsBySector: DocumentsByCategory = {
  "Technology": [
    { 
      name: "Data Privacy Compliance Guide", 
      description: "Essential guide for tech startups on data protection regulations in India", 
      fileName: "tech_data_privacy_guide.pdf" 
    },
    { 
      name: "Software Patent Filing Guide", 
      description: "Step-by-step process for filing software patents in India", 
      fileName: "software_patent_guide.pdf" 
    },
    { 
      name: "IT Service Agreement Template", 
      description: "Standard template for IT service contracts with clients", 
      fileName: "it_service_agreement.pdf" 
    }
  ],
  "Food": [
    { 
      name: "FSSAI Compliance Checklist", 
      description: "Complete checklist for food safety compliance in India", 
      fileName: "fssai_compliance.pdf" 
    },
    { 
      name: "Food Business License Guide", 
      description: "Guidelines for obtaining and maintaining food business licenses", 
      fileName: "food_license_guide.pdf" 
    },
    { 
      name: "Restaurant Health Standards", 
      description: "Health and sanitation standards for food establishments", 
      fileName: "restaurant_health_standards.pdf" 
    }
  ],
  "E-commerce": [
    { 
      name: "E-commerce Policy Guide", 
      description: "Overview of current e-commerce regulations in India", 
      fileName: "ecommerce_policy.pdf" 
    },
    { 
      name: "Return & Refund Policy Template", 
      description: "Standard template for e-commerce return policies", 
      fileName: "return_refund_policy.pdf" 
    },
    { 
      name: "Marketplace vs. Inventory Model", 
      description: "Comparison of e-commerce business models and their legal implications", 
      fileName: "ecommerce_models.pdf" 
    }
  ],
  "Healthcare": [
    { 
      name: "Healthcare Establishment Guide", 
      description: "Regulatory compliance guide for healthcare startups", 
      fileName: "healthcare_establishment.pdf" 
    },
    { 
      name: "Medical Device Registration", 
      description: "Process for registering medical devices in India", 
      fileName: "medical_device_registration.pdf" 
    },
    { 
      name: "Telemedicine Practice Guidelines", 
      description: "Official guidelines for telemedicine practice in India", 
      fileName: "telemedicine_guidelines.pdf" 
    }
  ],
  "Manufacturing": [
    { 
      name: "Factory License Guide", 
      description: "Process for obtaining factory licenses in India", 
      fileName: "factory_license.pdf" 
    },
    { 
      name: "Industrial Safety Standards", 
      description: "Safety standards and compliance for manufacturing units", 
      fileName: "industrial_safety.pdf" 
    },
    { 
      name: "BIS Standards Overview", 
      description: "Overview of Bureau of Indian Standards requirements", 
      fileName: "bis_standards.pdf" 
    }
  ]
};

// Documents by business type
const documentsByBusinessType: DocumentsByCategory = {
  "Private Limited Company": [
    { 
      name: "Annual Compliance Calendar", 
      description: "Schedule of annual filings and deadlines for private limited companies", 
      fileName: "pvt_ltd_compliance_calendar.pdf" 
    },
    { 
      name: "Director's Responsibility Guide", 
      description: "Comprehensive guide on directors' duties and liabilities", 
      fileName: "directors_responsibilities.pdf" 
    },
    { 
      name: "Board Meeting Procedures", 
      description: "Standard procedures and templates for conducting board meetings", 
      fileName: "board_meeting_procedures.pdf" 
    }
  ],
  "LLP": [
    { 
      name: "LLP Annual Filing Guide", 
      description: "Guide to annual statement filing requirements for LLPs", 
      fileName: "llp_annual_filing.pdf" 
    },
    { 
      name: "LLP Partnership Agreement", 
      description: "Template and guidelines for LLP agreements", 
      fileName: "llp_agreement_template.pdf" 
    },
    { 
      name: "Partner's Rights and Duties", 
      description: "Overview of rights, duties and liabilities of LLP partners", 
      fileName: "llp_partner_duties.pdf" 
    }
  ],
  "Sole Proprietorship": [
    { 
      name: "Sole Proprietor Legal Guide", 
      description: "Legal aspects of running a sole proprietorship in India", 
      fileName: "sole_proprietor_guide.pdf" 
    },
    { 
      name: "Business Name Registration", 
      description: "Process for registering your business name as a sole proprietor", 
      fileName: "business_name_registration.pdf" 
    },
    { 
      name: "Converting to Other Business Entities", 
      description: "Guide on when and how to convert to other business structures", 
      fileName: "business_conversion.pdf" 
    }
  ],
  "One Person Company": [
    { 
      name: "OPC Compliance Handbook", 
      description: "Comprehensive handbook for OPC compliance requirements", 
      fileName: "opc_compliance.pdf" 
    },
    { 
      name: "Nominee Appointment Guide", 
      description: "Process for appointing and changing nominees in an OPC", 
      fileName: "opc_nominee.pdf" 
    },
    { 
      name: "OPC to Private Limited Conversion", 
      description: "Step-by-step guide to convert an OPC to a private limited company", 
      fileName: "opc_conversion.pdf" 
    }
  ],
  "Partnership": [
    { 
      name: "Partnership Deed Template", 
      description: "Template and guidelines for creating a partnership deed", 
      fileName: "partnership_deed.pdf" 
    },
    { 
      name: "Partnership Tax Guide", 
      description: "Tax filing requirements and considerations for partnerships", 
      fileName: "partnership_tax.pdf" 
    },
    { 
      name: "Partner Dispute Resolution", 
      description: "Legal framework for resolving disputes between partners", 
      fileName: "partnership_disputes.pdf" 
    }
  ]
};

interface SectorDocumentsProps {
  sector: string;
  businessType: string;
  userProfile: any;
}

const SectorDocuments: React.FC<SectorDocumentsProps> = ({ 
  sector = "Technology", 
  businessType = "Private Limited Company",
  userProfile
}) => {
  
  // Get documents specific to this sector and business type
  const sectorDocs = documentsBySector[sector] || documentsBySector["Technology"];
  const businessTypeDocs = documentsByBusinessType[businessType] || documentsByBusinessType["Private Limited Company"];
  
  // Handle document download
  const handleDownload = (docName: string) => {
    // In a real app, this would download the actual document
    // For now, we'll just show a toast message
    toast.info(`Document ${docName} would download here in a real app.`);
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Recommended Documents for Your Business</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sector-specific documents */}
        <Card>
          <CardHeader>
            <CardTitle>
              {sector} Industry Documents
            </CardTitle>
            <CardDescription>
              Essential documents for your industry sector
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {sectorDocs.map((doc, index) => (
                <li key={index} className="flex items-start gap-3 border-b pb-3 last:border-0">
                  <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">{doc.description}</p>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => handleDownload(doc.fileName)}>
                    <Download className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => toast.info("All documents would download here")}>
              Download All ({sectorDocs.length})
            </Button>
          </CardFooter>
        </Card>
        
        {/* Business type documents */}
        <Card>
          <CardHeader>
            <CardTitle>
              {businessType} Documents
            </CardTitle>
            <CardDescription>
              Essential documents for your business structure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {businessTypeDocs.map((doc, index) => (
                <li key={index} className="flex items-start gap-3 border-b pb-3 last:border-0">
                  <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">{doc.description}</p>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => handleDownload(doc.fileName)}>
                    <Download className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => toast.info("All documents would download here")}>
              Download All ({businessTypeDocs.length})
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SectorDocuments;
