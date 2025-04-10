
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload, FileText, Trash2, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import DocumentViewer from "./DocumentViewer";

// Define types
interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  dateUploaded?: string;
  category?: string;
  preview?: string;
}

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

  return (
    <div className="space-y-6">
      <Tabs defaultValue="my-documents" className="w-full">
        <TabsList>
          <TabsTrigger value="my-documents">My Documents</TabsTrigger>
          <TabsTrigger value="upload">Upload Documents</TabsTrigger>
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
                <Button variant="outline" className="mt-4" asChild>
                  <TabsTrigger value="upload">Upload Documents</TabsTrigger>
                </Button>
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
                    {doc.category && (
                      <div className="flex items-center">
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                          {doc.category}
                        </span>
                      </div>
                    )}
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
