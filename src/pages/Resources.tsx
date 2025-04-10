
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calculator, CalendarDays, FileText, BookOpen, BookMarked, HandCoins, LucideIcon, FileBarChart, BookCheck, Building, LineChart, PieChart, Building2, BookOpenCheck } from "lucide-react";
import { Link } from "react-router-dom";
import HeaderComponent from "@/components/layout/Header";
import FooterComponent from "@/components/layout/Footer";
import TaxCalculator from "@/components/resources/TaxCalculator";
import ComplianceGuide from "@/components/resources/ComplianceGuide";
import BlogArticles from "@/components/resources/BlogArticles";

const Resources = () => {
  const [activeTab, setActiveTab] = useState("tax-calculator");

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderComponent />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Startup Resources</h1>
          <p className="text-muted-foreground max-w-3xl">
            Everything Indian entrepreneurs need to start and grow their business. From tax calculations to compliance guides and the latest startup news.
          </p>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="tax-calculator" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              <span>Tax Calculator</span>
            </TabsTrigger>
            <TabsTrigger value="compliance-guide" className="flex items-center gap-2">
              <BookCheck className="h-4 w-4" />
              <span>Compliance Guide</span>
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Startup Blog</span>
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center gap-2">
              <BookOpenCheck className="h-4 w-4" />
              <span>Resource Library</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tax-calculator" className="border-none p-0">
            <TaxCalculator />
          </TabsContent>

          <TabsContent value="compliance-guide" className="border-none p-0">
            <ComplianceGuide />
          </TabsContent>

          <TabsContent value="blog" className="border-none p-0">
            <BlogArticles />
          </TabsContent>

          <TabsContent value="library" className="border-none p-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ResourceCard 
                title="Startup India Registration"
                description="Complete guide to registering under the Startup India initiative"
                icon={Building}
                category="Legal"
                url="https://www.startupindia.gov.in/content/sih/en/registration.html"
              />
              <ResourceCard 
                title="GST Guide for Startups"
                description="Comprehensive guide to GST compliance for Indian startups"
                icon={FileText}
                category="Taxation"
                url="https://www.gst.gov.in/"
              />
              <ResourceCard 
                title="Startup Funding Options"
                description="Overview of available funding options for startups in India"
                icon={HandCoins}
                category="Finance"
                url="https://www.sidbi.in/en/offerings"
              />
              <ResourceCard 
                title="Intellectual Property Rights"
                description="Guide to protecting your startup's intellectual property"
                icon={BookMarked}
                category="Legal"
                url="https://ipindia.gov.in/"
              />
              <ResourceCard 
                title="Labor Law Compliance"
                description="Key labor laws and compliance requirements for startups"
                icon={Building2}
                category="Legal"
                url="https://labour.gov.in/acts"
              />
              <ResourceCard 
                title="Market Analysis Reports"
                description="Sector-specific market analysis and trend reports"
                icon={LineChart}
                category="Research"
                url="https://www.ibef.org/industry"
              />
              <ResourceCard 
                title="Industry Statistics"
                description="Latest statistics and data on different industry sectors"
                icon={PieChart}
                category="Research"
                url="https://www.mospi.gov.in/"
              />
              <ResourceCard 
                title="Financial Reporting Standards"
                description="Guide to financial reporting requirements for startups"
                icon={FileBarChart}
                category="Finance"
                url="https://www.mca.gov.in/content/mca/global/en/acts-rules/ebooks/accounting-standards.html"
              />
              <ResourceCard 
                title="Business Events Calendar"
                description="Upcoming startup events, conferences and networking opportunities"
                icon={CalendarDays}
                category="Network"
                url="https://www.startupindia.gov.in/content/sih/en/search.html?roles=Events"
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <FooterComponent />
    </div>
  );
};

interface ResourceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
  url: string;
}

const ResourceCard = ({ title, description, icon: Icon, category, url }: ResourceCardProps) => (
  <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <div className="p-2 bg-primary/10 rounded-md">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <Badge variant="outline">{category}</Badge>
      </div>
      <CardTitle className="text-lg mt-3">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <Button asChild variant="outline" className="w-full">
        <a href={url} target="_blank" rel="noopener noreferrer">
          View Resource
        </a>
      </Button>
    </CardContent>
  </Card>
);

export default Resources;
