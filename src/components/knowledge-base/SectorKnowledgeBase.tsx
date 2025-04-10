import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, BookOpen, Lightbulb, ChevronRight, BarChart3, FileCheck, ScrollText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SectorKnowledgeBase = () => {
  const [activeSector, setActiveSector] = useState("technology");

  const downloadResource = () => {
    toast({
      title: "Resource Downloaded",
      description: "The document has been saved to your device.",
    });
  };

  const sectors = [
    { id: "technology", name: "Technology" },
    { id: "healthcare", name: "Healthcare" },
    { id: "ecommerce", name: "E-commerce" },
    { id: "food", name: "Food & Hospitality" },
    { id: "manufacturing", name: "Manufacturing" },
    { id: "entertainment", name: "Entertainment" },
    { id: "education", name: "Education" },
    { id: "fintech", name: "Fintech" }
  ];

  return (
    <div className="space-y-6 mt-8">
      <div className="bg-muted/30 rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-1">Sector-Specific Knowledge Base</h2>
        <p className="text-sm text-muted-foreground">
          Comprehensive information about various startup sectors in India, including regulations, 
          statistics, and required documents. Browse by industry to find relevant resources.
        </p>
      </div>

      <Tabs defaultValue={activeSector} onValueChange={setActiveSector}>
        <TabsList className="bg-muted/50 flex overflow-auto pb-1 mb-2">
          {sectors.map((sector) => (
            <TabsTrigger key={sector.id} value={sector.id}>{sector.name}</TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="technology" className="space-y-6">
          <SectorInformation
            name="Technology & Software"
            description="Information technology, software development, SaaS, and tech-enabled services."
            statistics={[
              { label: "Market Size", value: "$227 billion" },
              { label: "Growth Rate", value: "8.4% YoY" },
              { label: "Startups", value: "12,500+" },
              { label: "Avg. Funding", value: "₹3.2 Cr" }
            ]}
            keyRegulations={[
              "Information Technology Act, 2000",
              "Personal Data Protection Bill",
              "Software Technology Parks of India Regulations",
              "RBI Guidelines for Payment Aggregators and Gateways",
              "Intermediary Guidelines"
            ]}
            documentChecklist={[
              "Certificate of Incorporation",
              "GST Registration",
              "STPI Registration (if applicable)",
              "NASSCOM Membership (recommended)",
              "ISO 27001 Certification (for data security)",
              "Data Localization Compliance Documentation",
              "RBI Authorization (for fintech services)",
              "Digital Signature Certificate"
            ]}
            resources={[
              {
                title: "IT Industry Report 2024",
                type: "report",
                description: "Comprehensive analysis of the tech sector landscape in India"
              },
              {
                title: "Digital India Compliance Guide",
                type: "guide",
                description: "Regulatory framework for tech companies in India"
              },
              {
                title: "Software Patent Protection",
                type: "whitepaper",
                description: "Guidelines for protecting intellectual property in software"
              }
            ]}
            faqs={[
              {
                question: "What licenses do I need for a SaaS startup in India?",
                answer: "For a SaaS startup in India, you typically need a basic business registration (incorporation), GST registration, professional tax registration, and shop & establishment license. If handling sensitive data, you should comply with data privacy regulations. For specific services like fintech, additional licenses from RBI might be required."
              },
              {
                question: "Are there any special tax benefits for tech startups?",
                answer: "Yes, tech startups recognized by DPIIT can get income tax exemption for 3 consecutive years out of 10 years. Startups in STPI zones may qualify for specific benefits. Additionally, there are deductions available for R&D expenditures under Section 35(2AB) of Income Tax Act."
              },
              {
                question: "How does the STPI scheme benefit software companies?",
                answer: "Software Technology Parks of India (STPI) scheme offers benefits like 100% foreign equity permitted, duty-free import of capital goods, exemption from service tax, single-window clearance, and eligibility for Software Technology Park (STP) status that comes with infrastructure and support services."
              }
            ]}
          />
        </TabsContent>

        <TabsContent value="healthcare" className="space-y-6">
          <SectorInformation
            name="Healthcare & Medical"
            description="Healthcare delivery, medical devices, pharmaceuticals, and digital health solutions."
            statistics={[
              { label: "Market Size", value: "$372 billion" },
              { label: "Growth Rate", value: "12.3% YoY" },
              { label: "Startups", value: "4,200+" },
              { label: "Avg. Funding", value: "₹5.8 Cr" }
            ]}
            keyRegulations={[
              "Drugs and Cosmetics Act",
              "Medical Devices Rules, 2017",
              "Clinical Establishments Act",
              "Telemedicine Guidelines, 2020",
              "AYUSH Regulations"
            ]}
            documentChecklist={[
              "Certificate of Incorporation",
              "Pharmacy License (if applicable)",
              "CDSCO Approval (for medical devices)",
              "Drug License (for pharmaceutical products)",
              "Clinical Establishment Registration",
              "NABL Accreditation (for laboratories)",
              "ISO 13485 Certification (for medical devices)",
              "FSSAI License (for dietary supplements)"
            ]}
            resources={[
              {
                title: "Healthcare Industry Report 2024",
                type: "report",
                description: "Analysis of the healthcare sector in India"
              },
              {
                title: "Medical Devices Regulatory Guide",
                type: "guide",
                description: "Compliance requirements for medical device companies"
              },
              {
                title: "Digital Health Innovation Framework",
                type: "whitepaper",
                description: "Guidelines for digital health startups in India"
              }
            ]}
            faqs={[
              {
                question: "What approvals do I need for a healthcare mobile app?",
                answer: "For a healthcare mobile app in India, you need to comply with the Digital Information Security in Healthcare Act (DISHA) guidelines and the Telemedicine Practice Guidelines, 2020. If your app provides direct medical advice, you may need registration with relevant medical councils. For apps handling health data, compliance with data privacy laws is essential."
              },
              {
                question: "How do I get a medical device approved in India?",
                answer: "Medical device approval in India requires registration with the Central Drugs Standard Control Organization (CDSCO). You need to classify your device based on risk (A-D), prepare technical documentation, conduct clinical evaluations if necessary, apply for manufacturing/import license, and obtain registration certificate. For certain high-risk devices, additional clinical trials may be required."
              },
              {
                question: "What are the regulations for telemedicine startups?",
                answer: "Telemedicine startups must follow the Telemedicine Practice Guidelines, 2020 issued by the Medical Council of India. Ensure all consulting doctors are registered with state medical councils, maintain proper electronic health records with adequate data security, obtain informed consent from patients, and comply with the Information Technology Act and data privacy laws."
              }
            ]}
          />
        </TabsContent>
        
        <TabsContent value="ecommerce" className="space-y-6">
          <SectorInformation
            name="E-commerce & Online Retail"
            description="Online marketplaces, direct-to-consumer brands, and digital retail platforms."
            statistics={[
              { label: "Market Size", value: "$84 billion" },
              { label: "Growth Rate", value: "25.5% YoY" },
              { label: "Startups", value: "5,800+" },
              { label: "Avg. Funding", value: "₹4.5 Cr" }
            ]}
            keyRegulations={[
              "Consumer Protection (E-Commerce) Rules, 2020",
              "FDI Policy for E-commerce",
              "Legal Metrology (Packaged Commodities) Rules",
              "Information Technology Act, 2000",
              "GST Regulations for E-commerce"
            ]}
            documentChecklist={[
              "Certificate of Incorporation",
              "GST Registration",
              "GSTIN for TCS Collection",
              "Shops and Establishment License",
              "Trade License",
              "FSSAI License (for food products)",
              "BIS Certification (for electronic products)",
              "Trademark Registration"
            ]}
            resources={[
              {
                title: "E-commerce Industry Report 2024",
                type: "report",
                description: "Market analysis and trends in Indian e-commerce"
              },
              {
                title: "E-commerce Compliance Checklist",
                type: "guide",
                description: "Regulatory requirements for online retailers"
              },
              {
                title: "D2C Brand Building Framework",
                type: "whitepaper",
                description: "Strategies for direct-to-consumer brands in India"
              }
            ]}
            faqs={[
              {
                question: "What are the FDI regulations for e-commerce businesses?",
                answer: "For e-commerce businesses in India, FDI up to 100% is permitted under the automatic route in marketplace models, but not allowed in inventory-based models (except for food product retail trading). Marketplace entities cannot have equity participation in seller entities and must provide services like warehousing and logistics equally to all sellers."
              },
              {
                question: "What are the mandatory disclosures for e-commerce websites?",
                answer: "Under the Consumer Protection (E-Commerce) Rules, 2020, e-commerce entities must display details about the seller (name, address, contact information), product information (country of origin, pricing, returns/exchange policy), payment methods and security, grievance officer contact details, importer details for imported products, and complete terms and conditions."
              },
              {
                question: "How do I handle tax collection for my e-commerce platform?",
                answer: "E-commerce operators must collect Tax Collected at Source (TCS) at 1% under GST laws from sellers while making payments for supplies. You need to register for GST in each state where you have sellers, file monthly GSTR-8 returns for TCS collected, and issue TCS certificates to sellers. Additionally, maintain proper documentation of all transactions and collections."
              }
            ]}
          />
        </TabsContent>

        <TabsContent value="food" className="space-y-6">
          <SectorInformation
            name="Food & Hospitality"
            description="Restaurants, food delivery, cloud kitchens, cafes, and hospitality services."
            statistics={[
              { label: "Market Size", value: "$65 billion" },
              { label: "Growth Rate", value: "15.6% YoY" },
              { label: "Startups", value: "3,800+" },
              { label: "Avg. Funding", value: "₹2.7 Cr" }
            ]}
            keyRegulations={[
              "Food Safety and Standards Act, 2006",
              "Legal Metrology Act",
              "Shops and Establishment Act",
              "Environmental Protection Act (for waste management)",
              "GST Regulations for Restaurants"
            ]}
            documentChecklist={[
              "Certificate of Incorporation",
              "FSSAI License/Registration",
              "GST Registration",
              "Municipal Corporation Health Trade License",
              "Fire Safety NOC",
              "Eating House License",
              "Liquor License (if applicable)",
              "Pollution Control Board Clearance"
            ]}
            resources={[
              {
                title: "Food Service Industry Report 2024",
                type: "report",
                description: "Comprehensive analysis of India's food service sector"
              },
              {
                title: "Restaurant Compliance Handbook",
                type: "guide",
                description: "Legal requirements for food businesses in India"
              },
              {
                title: "Cloud Kitchen Business Model",
                type: "whitepaper",
                description: "Setting up and scaling cloud kitchens in India"
              }
            ]}
            faqs={[
              {
                question: "What licenses do I need to start a cloud kitchen?",
                answer: "For a cloud kitchen in India, you need: FSSAI license (central or state based on turnover), GST registration, shop & establishment license, trade license from local municipal authority, fire safety NOC, pollution control board clearance (for managing waste), and health trade license. If delivering food yourself, you'll need delivery vehicle permits as well."
              },
              {
                question: "What are the FSSAI categories for food businesses?",
                answer: "FSSAI categorizes food businesses based on turnover: Basic Registration (turnover up to ₹12 lakhs), State License (turnover between ₹12 lakhs to ₹20 crores), and Central License (turnover above ₹20 crores or operating in multiple states). Different types of businesses like manufacturers, transporters, retailers, etc., have specific requirements within these categories."
              },
              {
                question: "What are the GST implications for restaurants and food delivery?",
                answer: "Restaurants charge 5% GST without input tax credit (ITC) if not serving alcohol, or 18% with ITC for those in hotels with room tariff above ₹7,500. For food delivery platforms, GST is now collected by the platform itself (effective January 2022) at the applicable rate and paid to the government. Proper invoicing with GST details is mandatory for all transactions."
              }
            ]}
          />
        </TabsContent>
        
        <TabsContent value="manufacturing" className="space-y-6">
          <SectorInformation
            name="Manufacturing"
            description="Product manufacturing, industrial production, and manufacturing services."
            statistics={[
              { label: "Market Size", value: "$415 billion" },
              { label: "Growth Rate", value: "7.2% YoY" },
              { label: "Startups", value: "2,100+" },
              { label: "Avg. Funding", value: "₹6.8 Cr" }
            ]}
            keyRegulations={[
              "Factories Act, 1948",
              "Industrial Disputes Act",
              "Bureau of Indian Standards Act",
              "Environmental Protection Act",
              "Make in India Policies"
            ]}
            documentChecklist={[
              "Certificate of Incorporation",
              "GST Registration",
              "Factory License",
              "Pollution Control Board Clearance",
              "BIS Certification (product specific)",
              "Industrial Entrepreneur Memorandum",
              "Fire Safety License",
              "Electricity and Water Connection Approvals"
            ]}
            resources={[
              {
                title: "Manufacturing Industry Report 2024",
                type: "report",
                description: "Analysis of the Indian manufacturing sector"
              },
              {
                title: "Factory Compliance Guide",
                type: "guide",
                description: "Regulatory requirements for manufacturing facilities"
              },
              {
                title: "Sustainable Manufacturing Framework",
                type: "whitepaper",
                description: "Environmental compliance for manufacturing in India"
              }
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface Statistic {
  label: string;
  value: string;
}

interface Resource {
  title: string;
  type: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface SectorInformationProps {
  name: string;
  description: string;
  statistics: Statistic[];
  keyRegulations: string[];
  documentChecklist: string[];
  resources: Resource[];
  faqs?: FAQ[];
}

const SectorInformation = ({
  name,
  description,
  statistics,
  keyRegulations,
  documentChecklist,
  resources,
  faqs = []
}: SectorInformationProps) => {
  const handleDownload = () => {
    toast({
      title: "Report Downloaded",
      description: `The ${name} sector report has been downloaded.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="md:w-2/3">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{name}</CardTitle>
                <CardDescription className="mt-2">{description}</CardDescription>
              </div>
              <Button onClick={handleDownload} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>Sector Report</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                Key Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {statistics.map((stat, index) => (
                  <div key={index} className="bg-muted/30 p-3 rounded-lg">
                    <p className="text-muted-foreground text-sm">{stat.label}</p>
                    <p className="font-bold text-lg">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <ScrollText className="h-5 w-5 mr-2 text-primary" />
                Key Regulations
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc ml-5">
                {keyRegulations.map((regulation, index) => (
                  <li key={index} className="text-muted-foreground">
                    <span className="text-foreground">{regulation}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <FileCheck className="h-5 w-5 mr-2 text-primary" />
                Required Documents
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc ml-5">
                {documentChecklist.map((document, index) => (
                  <li key={index} className="text-muted-foreground">
                    <span className="text-foreground">{document}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <div className="md:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Key Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {resources.map((resource, index) => (
                <div key={index} className="border rounded-md p-3">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium">{resource.title}</h4>
                    <Badge variant="outline">{resource.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                  <Button variant="outline" size="sm" className="w-full" onClick={handleDownload}>
                    <Download className="h-3 w-3 mr-1" /> Download
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {faqs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="h-5 w-5 mr-2" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SectorKnowledgeBase;
