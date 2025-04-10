
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload, FileText, Trash2, Search, Plus, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import DocumentViewer from "./DocumentViewer";
import { useAuth } from "@/lib/auth";

// Define types
interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  dateUploaded?: string;
  category?: string;
  preview?: string;
  sectorSpecific?: boolean;
}

// Generate sector-specific default documents
const generateSectorDocuments = (sector: string): Document[] => {
  const defaultDocs: Record<string, Document[]> = {
    "Technology": [
      { 
        id: "tech-1", 
        name: "data_privacy_requirements.pdf", 
        type: "application/pdf", 
        size: "1.7 MB",
        dateUploaded: "2024-01-15",
        category: "Compliance",
        sectorSpecific: true
      },
      { 
        id: "tech-2", 
        name: "software_patent_guide.pdf", 
        type: "application/pdf", 
        size: "2.8 MB",
        dateUploaded: "2024-01-12",
        category: "Legal",
        sectorSpecific: true
      },
      { 
        id: "tech-3", 
        name: "it_service_agreement_template.pdf", 
        type: "application/pdf", 
        size: "0.9 MB",
        dateUploaded: "2024-01-10",
        category: "Templates",
        sectorSpecific: true
      }
    ],
    "Food": [
      { 
        id: "food-1", 
        name: "fssai_guidelines_2024.pdf", 
        type: "application/pdf", 
        size: "3.2 MB",
        dateUploaded: "2024-02-05",
        category: "Compliance",
        sectorSpecific: true
      },
      { 
        id: "food-2", 
        name: "food_labeling_requirements.pdf", 
        type: "application/pdf", 
        size: "1.5 MB",
        dateUploaded: "2024-02-01",
        category: "Compliance",
        sectorSpecific: true
      }
    ],
    "E-commerce": [
      { 
        id: "ecom-1", 
        name: "ecommerce_policy_guidelines.pdf", 
        type: "application/pdf", 
        size: "2.1 MB",
        dateUploaded: "2024-01-20",
        category: "Compliance",
        sectorSpecific: true
      },
      { 
        id: "ecom-2", 
        name: "consumer_protection_rules.pdf", 
        type: "application/pdf", 
        size: "1.8 MB",
        dateUploaded: "2024-01-15",
        category: "Legal",
        sectorSpecific: true
      }
    ],
    "Healthcare": [
      { 
        id: "health-1", 
        name: "clinical_establishment_requirements.pdf", 
        type: "application/pdf", 
        size: "2.9 MB",
        dateUploaded: "2024-01-25",
        category: "Compliance",
        sectorSpecific: true
      },
      { 
        id: "health-2", 
        name: "medical_device_registration.pdf", 
        type: "application/pdf", 
        size: "1.6 MB",
        dateUploaded: "2024-01-20",
        category: "Compliance",
        sectorSpecific: true
      }
    ],
    "Manufacturing": [
      { 
        id: "manuf-1", 
        name: "factory_license_guidelines.pdf", 
        type: "application/pdf", 
        size: "2.5 MB",
        dateUploaded: "2024-02-10",
        category: "Compliance",
        sectorSpecific: true
      },
      { 
        id: "manuf-2", 
        name: "pollution_control_requirements.pdf", 
        type: "application/pdf", 
        size: "1.9 MB",
        dateUploaded: "2024-02-05",
        category: "Environmental",
        sectorSpecific: true
      }
    ]
  };
  
  return defaultDocs[sector] || defaultDocs["Technology"];
};

// Mock service for document operations
const DocumentService = {
  uploadDocument: async (file: File): Promise<Document> => {
    // Simulate upload delay and success
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      id: Date.now().toString(),
      name: file.name,
      type: file.type,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      dateUploaded: new Date().toLocaleDateString(),
      category: 'Compliance'
    };
  },
  
  deleteDocument: async (id: string): Promise<void> => {
    // Simulate deletion delay
    await new Promise(resolve => setTimeout(resolve, 500));
  },
  
  // Mock adding document to knowledge base
  addToKnowledgeBase: async (document: Document): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
};

const KnowledgeUpload = () => {
  const { user, isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documents, setDocuments] = useState<Document[]>([
    { 
      id: "1", 
      name: "compliance_report.pdf", 
      type: "application/pdf", 
      size: "2.3 MB",
      dateUploaded: "2023-12-15",
      category: "Compliance"
    },
    { 
      id: "2", 
      name: "business_plan.pdf", 
      type: "application/pdf", 
      size: "1.8 MB",
      dateUploaded: "2023-12-10",
      category: "Planning"
    },
    { 
      id: "3", 
      name: "tax_documents.pdf", 
      type: "application/pdf", 
      size: "0.9 MB",
      dateUploaded: "2023-12-05",
      category: "Tax"
    }
  ]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const queryClient = useQueryClient();
  
  // Get user profile data from local storage or use defaults
  const storedProfile = localStorage.getItem("userProfile");
  const userProfile = storedProfile ? JSON.parse(storedProfile) : {
    sector: "Technology",
  };
  
  // Add sector-specific documents on component mount
  useEffect(() => {
    const sectorDocs = generateSectorDocuments(userProfile.sector);
    setDocuments(prevDocs => {
      // Filter out existing sector documents to avoid duplicates
      const filteredDocs = prevDocs.filter(doc => !doc.sectorSpecific);
      return [...filteredDocs, ...sectorDocs];
    });
  }, [userProfile.sector]);

  // Upload document mutation
  const uploadMutation = useMutation({
    mutationFn: DocumentService.uploadDocument,
    onSuccess: (newDocument) => {
      setDocuments(prev => [...prev, newDocument]);
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast.success('Document uploaded successfully!');
      setSelectedFile(null);
    },
    onError: () => {
      toast.error('Failed to upload document. Please try again.');
      setSelectedFile(null);
    }
  });

  // Delete document mutation
  const deleteMutation = useMutation({
    mutationFn: DocumentService.deleteDocument,
    onSuccess: (_, id) => {
      setDocuments(prev => prev.filter(doc => doc.id !== id));
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast.success('Document deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete document. Please try again.');
    }
  });

  // Knowledge base addition mutation
  const addToKnowledgeBaseMutation = useMutation({
    mutationFn: DocumentService.addToKnowledgeBase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledgeBase'] });
      toast.success('Document added to knowledge base!');
    },
    onError: () => {
      toast.error('Failed to add document to knowledge base.');
    }
  });

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate progress updates
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 100);
    
    try {
      await uploadMutation.mutateAsync(selectedFile);
      setUploadProgress(100);
    } finally {
      clearInterval(interval);
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    }
  };

  // Handle document deletion
  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  // Add document to knowledge base
  const addToKnowledgeBase = (document: Document) => {
    addToKnowledgeBaseMutation.mutate(document);
  };

  // Filter documents by search term
  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doc.category && doc.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Check if user has admin access
  const canManageKnowledgeBase = isAdmin;

  return (
    <div className="space-y-6">
      {!canManageKnowledgeBase && (
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-amber-600" />
              <div>
                <p className="font-medium text-amber-800">Knowledge Base Administrator Access</p>
                <p className="text-sm text-amber-700">
                  Some features are only available to administrators. Admin credentials: 
                  <span className="font-mono bg-white px-1 mx-1 rounded">admin@example.com</span> / 
                  <span className="font-mono bg-white px-1 mx-1 rounded">admin123</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="my-documents" className="w-full">
        <TabsList>
          <TabsTrigger value="my-documents">My Documents</TabsTrigger>
          <TabsTrigger value="upload" disabled={!canManageKnowledgeBase}>Upload Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-documents" className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          
          {filteredDocuments.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">No documents found</p>
                {canManageKnowledgeBase && (
                  <Button variant="outline" className="mt-4" asChild>
                    <TabsTrigger value="upload">Upload Documents</TabsTrigger>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredDocuments.map(doc => (
                <Card key={doc.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-base truncate" title={doc.name}>
                          {doc.name}
                        </CardTitle>
                        <CardDescription>
                          {doc.size} • {doc.dateUploaded}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center gap-2">
                      {doc.category && (
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                          {doc.category}
                        </span>
                      )}
                      {doc.sectorSpecific && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
                          {userProfile.sector}
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between p-4 pt-0">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedDocument(doc)}
                        >
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl h-[80vh]">
                        <DialogHeader>
                          <DialogTitle>{selectedDocument?.name}</DialogTitle>
                          <DialogDescription>
                            {selectedDocument?.size} • {selectedDocument?.dateUploaded}
                          </DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="h-[calc(80vh-10rem)]">
                          <DocumentViewer document={selectedDocument} />
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                    <div className="flex gap-2">
                      {canManageKnowledgeBase && (
                        <>
                          <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={() => addToKnowledgeBase(doc)}
                          >
                            <Plus className="h-4 w-4 mr-1" /> Add to KB
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="icon"
                            onClick={() => handleDelete(doc.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Document</CardTitle>
              <CardDescription>
                Upload documents to your knowledge base for AI assistant to analyze
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-dashed border-2 rounded-lg p-8 text-center cursor-pointer bg-muted/50 hover:bg-muted transition-colors">
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="font-medium mb-1">
                      {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      PDF, DOC, DOCX, TXT (Max 10MB)
                    </p>
                  </div>
                </label>
              </div>
              
              {isUploading && (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setSelectedFile(null)}
                disabled={!selectedFile || isUploading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
              >
                Upload
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgeUpload;
