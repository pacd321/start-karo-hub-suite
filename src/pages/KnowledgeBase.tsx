
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KnowledgeUpload from "@/components/knowledge-base/KnowledgeUpload";
import HeaderComponent from "@/components/layout/Header";
import FooterComponent from "@/components/layout/Footer";
import { Lightbulb, BookOpenCheck, FileQuestion } from "lucide-react";

const KnowledgeBase = () => {
  const [activeTab, setActiveTab] = useState("my-documents");
  
  // Queries can be expanded with actual API endpoints in a real implementation
  const { data: documentData, isLoading: isLoadingDocuments } = useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { 
        documents: [
          { id: "1", name: "compliance_report.pdf", type: "application/pdf", size: "2.3 MB" },
          { id: "2", name: "business_plan.pdf", type: "application/pdf", size: "1.8 MB" },
          { id: "3", name: "tax_documents.pdf", type: "application/pdf", size: "0.9 MB" }
        ]
      };
    },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderComponent />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Knowledge Base</h1>
          <p className="text-muted-foreground max-w-3xl">
            Upload your business documents to the knowledge base to allow our AI chatbot to provide personalized assistance based on your specific details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <KnowledgeUpload />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* How It Works */}
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                <h3 className="font-semibold">How It Works</h3>
              </div>
              <ol className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 flex items-center justify-center bg-primary/10 rounded-full h-5 w-5 text-xs text-primary font-medium mt-0.5">1</span>
                  <span>Upload your business documents to your knowledge base</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 flex items-center justify-center bg-primary/10 rounded-full h-5 w-5 text-xs text-primary font-medium mt-0.5">2</span>
                  <span>Add documents to your AI knowledge base using the "Add to KB" button</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 flex items-center justify-center bg-primary/10 rounded-full h-5 w-5 text-xs text-primary font-medium mt-0.5">3</span>
                  <span>Chat with our AI assistant to get personalized guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 flex items-center justify-center bg-primary/10 rounded-full h-5 w-5 text-xs text-primary font-medium mt-0.5">4</span>
                  <span>Receive tailored answers based on your specific documents and situation</span>
                </li>
              </ol>
            </div>
            
            {/* Tips */}
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <BookOpenCheck className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold">Recommended Documents</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Company Incorporation Certificate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Business Plan & Financial Projections</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Tax Registration Documents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Compliance Reports & Legal Agreements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Licenses & Permits</span>
                </li>
              </ul>
            </div>
            
            {/* FAQ */}
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FileQuestion className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold">FAQ</h3>
              </div>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-medium mb-1">What file types are supported?</p>
                  <p className="text-muted-foreground">PDF, DOC, DOCX, and TXT files up to 10MB.</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Is my data secure?</p>
                  <p className="text-muted-foreground">Yes, all documents are encrypted and only accessible to you.</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Can I delete documents later?</p>
                  <p className="text-muted-foreground">Yes, you can remove documents from your knowledge base at any time.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <FooterComponent />
    </div>
  );
};

export default KnowledgeBase;
