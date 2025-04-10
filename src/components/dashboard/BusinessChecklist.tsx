
import { useState, useEffect } from "react";
import { CheckCircle2, Circle, Clock, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Types
interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: string;
  priority: "high" | "medium" | "low";
  deadline?: string;
  resources?: { title: string; url: string }[];
}

interface BusinessChecklistProps {
  onProgressChange?: (progress: number) => void;
}

const BusinessChecklist = ({ onProgressChange }: BusinessChecklistProps) => {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    {
      id: "1",
      title: "Register your company",
      description: "Complete incorporation process with MCA",
      completed: true,
      category: "Legal",
      priority: "high",
      deadline: "Completed",
      resources: [
        { title: "MCA Portal", url: "https://www.mca.gov.in/mcafoportal/login.do" },
        { title: "Incorporation Guide", url: "/resources/incorporation" }
      ]
    },
    {
      id: "2",
      title: "Obtain GST registration",
      description: "Apply for GST if turnover exceeds ₹20 lakhs",
      completed: false,
      category: "Tax",
      priority: "high",
      deadline: "30 days after crossing threshold",
      resources: [
        { title: "GST Portal", url: "https://www.gst.gov.in/" },
        { title: "GST Registration Guide", url: "/resources/gst" }
      ]
    },
    {
      id: "3",
      title: "Open current account",
      description: "Open business bank account for your startup",
      completed: true,
      category: "Finance",
      priority: "high",
      deadline: "Completed",
      resources: [
        { title: "Bank Comparison", url: "/resources/banking" }
      ]
    },
    {
      id: "4",
      title: "Apply for MSME registration",
      description: "Register as Micro, Small, or Medium Enterprise",
      completed: false,
      category: "Legal",
      priority: "medium",
      deadline: "Within 90 days",
      resources: [
        { title: "Udyam Registration", url: "https://udyamregistration.gov.in/" }
      ]
    },
    {
      id: "5",
      title: "Prepare shareholder agreement",
      description: "Create and sign shareholder/founder agreement",
      completed: false,
      category: "Legal",
      priority: "high",
      deadline: "Before accepting investment",
      resources: [
        { title: "Agreement Templates", url: "/resources/templates" }
      ]
    },
    {
      id: "6",
      title: "Intellectual property protection",
      description: "File for trademarks, patents, or copyrights",
      completed: false,
      category: "Legal",
      priority: "medium",
      deadline: "Before product launch",
      resources: [
        { title: "IP Registration Portal", url: "https://ipindia.gov.in/" }
      ]
    },
    {
      id: "7",
      title: "Employment documentation",
      description: "Create employment contracts and HR policies",
      completed: false,
      category: "HR",
      priority: "medium",
      deadline: "Before first hire",
      resources: [
        { title: "HR Templates", url: "/resources/hr" }
      ]
    },
    {
      id: "8",
      title: "Obtain business licenses",
      description: "Secure industry-specific licenses for operations",
      completed: false,
      category: "Compliance",
      priority: "high",
      deadline: "Before operations start",
      resources: [
        { title: "License Guide", url: "/resources/licenses" }
      ]
    },
    {
      id: "9",
      title: "Set up accounting system",
      description: "Implement bookkeeping and accounting processes",
      completed: true,
      category: "Finance",
      priority: "high",
      deadline: "Completed",
      resources: [
        { title: "Accounting Software", url: "/resources/accounting" }
      ]
    },
    {
      id: "10",
      title: "Register for professional tax",
      description: "Register for professional tax in your state",
      completed: false,
      category: "Tax",
      priority: "low",
      deadline: "State-dependent",
      resources: [
        { title: "Professional Tax Guide", url: "/resources/professional-tax" }
      ]
    }
  ]);
  
  const [selectedItem, setSelectedItem] = useState<ChecklistItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [progress, setProgress] = useState(0);

  // Calculate progress whenever checklist changes
  useEffect(() => {
    const completedCount = checklistItems.filter(item => item.completed).length;
    const totalCount = checklistItems.length;
    const progressValue = Math.round((completedCount / totalCount) * 100);
    
    setProgress(progressValue);
    
    // Call the parent's callback if provided
    if (onProgressChange) {
      onProgressChange(progressValue);
    }
  }, [checklistItems, onProgressChange]);

  // Toggle completion status of an item
  const toggleItemCompletion = (id: string) => {
    setChecklistItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, completed: !item.completed } 
          : item
      )
    );
    
    const item = checklistItems.find(item => item.id === id);
    
    if (item) {
      toast(
        item.completed ? "Task marked as incomplete" : "Task completed!",
        {
          description: item.title
        }
      );
    }
  };

  // Filter checklist by category
  const filteredItems = filterCategory === "all" 
    ? checklistItems 
    : checklistItems.filter(item => item.category.toLowerCase() === filterCategory.toLowerCase());

  // Group by category
  const groupedItems = filteredItems.reduce((acc, item) => {
    const category = acc[item.category] || [];
    category.push(item);
    acc[item.category] = category;
    return acc;
  }, {} as Record<string, ChecklistItem[]>);

  // Get all unique categories
  const categories = ["all", ...new Set(checklistItems.map(item => item.category))];

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2">
        <CardTitle>Startup Checklist</CardTitle>
        <div className="mt-2 sm:mt-0 flex items-center text-sm">
          <Progress value={progress} className="w-32 h-2 mr-2" />
          <span>{progress}% complete</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map(category => (
            <Button
              key={category}
              variant={filterCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory(category)}
              className="text-xs h-8"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        <ScrollArea className="h-[500px] pr-4">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">{category}</h3>
              <div className="space-y-2">
                {items.map(item => (
                  <div
                    key={item.id}
                    className={cn(
                      "flex items-start p-3 rounded-md border",
                      item.completed ? "bg-muted/50 border-muted" : "bg-white"
                    )}
                  >
                    <button
                      onClick={() => toggleItemCompletion(item.id)}
                      className="mt-1 mr-3 flex-shrink-0"
                      aria-label={item.completed ? "Mark as incomplete" : "Mark as complete"}
                    >
                      {item.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                    <div className="flex-grow">
                      <div className="flex items-start justify-between">
                        <h4 className={cn(
                          "font-medium",
                          item.completed ? "line-through text-muted-foreground" : ""
                        )}>
                          {item.title}
                        </h4>
                        <div className="flex items-center ml-2">
                          <span className={cn(
                            "text-xs px-2 py-0.5 rounded-full",
                            item.priority === "high" ? "bg-red-100 text-red-700" :
                            item.priority === "medium" ? "bg-amber-100 text-amber-700" :
                            "bg-green-100 text-green-700"
                          )}>
                            {item.priority}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      {item.deadline && (
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{item.deadline}</span>
                        </div>
                      )}
                      <div className="flex mt-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 px-2 text-xs"
                              onClick={() => setSelectedItem(item)}
                            >
                              <FileText className="h-3 w-3 mr-1" />
                              Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{selectedItem?.title}</DialogTitle>
                              <DialogDescription>{selectedItem?.description}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div>
                                <h4 className="text-sm font-medium mb-2">Category</h4>
                                <p className="text-sm">{selectedItem?.category}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-2">Priority</h4>
                                <div className={cn(
                                  "inline-block text-xs px-2 py-0.5 rounded-full",
                                  selectedItem?.priority === "high" ? "bg-red-100 text-red-700" :
                                  selectedItem?.priority === "medium" ? "bg-amber-100 text-amber-700" :
                                  "bg-green-100 text-green-700"
                                )}>
                                  {selectedItem?.priority}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-2">Deadline</h4>
                                <p className="text-sm">{selectedItem?.deadline || "No deadline set"}</p>
                              </div>
                              {selectedItem?.resources && selectedItem.resources.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Resources</h4>
                                  <ul className="space-y-2">
                                    {selectedItem.resources.map((resource, index) => (
                                      <li key={index}>
                                        <a 
                                          href={resource.url} 
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-sm text-primary hover:underline flex items-center"
                                        >
                                          <FileText className="h-3 w-3 mr-2" />
                                          {resource.title}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default BusinessChecklist;
