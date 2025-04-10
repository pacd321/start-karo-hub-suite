
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

const sectorOptions = [
  { value: "technology", label: "Technology" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "food", label: "Food & Hospitality" },
  { value: "healthcare", label: "Healthcare" },
  { value: "entertainment", label: "Entertainment" },
  { value: "manufacturing", label: "Manufacturing" },
];

const businessTypeOptions = [
  { value: "sole_proprietorship", label: "Sole Proprietorship" },
  { value: "partnership", label: "Partnership" },
  { value: "llp", label: "Limited Liability Partnership (LLP)" },
  { value: "pvt_ltd", label: "Private Limited Company" },
  { value: "public_ltd", label: "Public Limited Company" },
  { value: "one_person", label: "One Person Company" },
];

const stageOptions = [
  { value: "ideation", label: "Ideation" },
  { value: "validation", label: "Validation" },
  { value: "early_growth", label: "Early Growth" },
  { value: "scaling", label: "Scaling" },
];

const annualTurnoverOptions = [
  { value: "under_40l", label: "Under ₹40 lakhs" },
  { value: "40l_to_1cr", label: "₹40 lakhs to ₹1 crore" },
  { value: "1cr_to_5cr", label: "₹1 crore to ₹5 crore" },
  { value: "above_5cr", label: "Above ₹5 crore" },
];

const employeeCountOptions = [
  { value: "solo", label: "Solo Founder" },
  { value: "2_5", label: "2-5 employees" },
  { value: "5_10", label: "5-10 employees" },
  { value: "10_50", label: "10-50 employees" },
  { value: "50_plus", label: "50+ employees" },
];

const registrationStateOptions = [
  { value: "andhra_pradesh", label: "Andhra Pradesh" },
  { value: "arunachal_pradesh", label: "Arunachal Pradesh" },
  { value: "assam", label: "Assam" },
  { value: "bihar", label: "Bihar" },
  { value: "chhattisgarh", label: "Chhattisgarh" },
  { value: "delhi", label: "Delhi" },
  { value: "goa", label: "Goa" },
  { value: "gujarat", label: "Gujarat" },
  { value: "haryana", label: "Haryana" },
  { value: "himachal_pradesh", label: "Himachal Pradesh" },
  { value: "jammu_kashmir", label: "Jammu & Kashmir" },
  { value: "jharkhand", label: "Jharkhand" },
  { value: "karnataka", label: "Karnataka" },
  { value: "kerala", label: "Kerala" },
  { value: "madhya_pradesh", label: "Madhya Pradesh" },
  { value: "maharashtra", label: "Maharashtra" },
  { value: "manipur", label: "Manipur" },
  { value: "meghalaya", label: "Meghalaya" },
  { value: "mizoram", label: "Mizoram" },
  { value: "nagaland", label: "Nagaland" },
  { value: "odisha", label: "Odisha" },
  { value: "punjab", label: "Punjab" },
  { value: "rajasthan", label: "Rajasthan" },
  { value: "sikkim", label: "Sikkim" },
  { value: "tamil_nadu", label: "Tamil Nadu" },
  { value: "telangana", label: "Telangana" },
  { value: "tripura", label: "Tripura" },
  { value: "uttar_pradesh", label: "Uttar Pradesh" },
  { value: "uttarakhand", label: "Uttarakhand" },
  { value: "west_bengal", label: "West Bengal" },
];

// Define the steps of the onboarding process
const steps = [
  {
    id: "company-info",
    name: "Company Information",
    fields: ["companyName", "sector", "businessType", "stage"],
  },
  {
    id: "registration-info",
    name: "Registration Details",
    fields: ["incorporationDate", "registrationState", "pan", "gstin", "cinOrLlpin"],
  },
  {
    id: "business-info",
    name: "Business Details",
    fields: ["annualTurnover", "employeeCount", "businessDescription"],
  },
  {
    id: "founder-info",
    name: "Founder Information",
    fields: ["founderName", "founderEmail", "founderPhone"],
  },
  {
    id: "compliance-info",
    name: "Compliance Status",
    fields: ["hasTaxFiling", "hasGstRegistration", "hasTrademark", "hasLabourCompliances", "hasShopEstablishment"],
  },
];

// Create Zod schema for form validation
const formSchema = z.object({
  // Company Information
  companyName: z.string().min(2, "Company name is required"),
  sector: z.string({ required_error: "Please select a sector" }),
  businessType: z.string({ required_error: "Please select a business type" }),
  stage: z.string({ required_error: "Please select your startup stage" }),
  
  // Registration Details
  incorporationDate: z.string().optional(),
  registrationState: z.string().optional(),
  pan: z.string().optional(),
  gstin: z.string().optional(),
  cinOrLlpin: z.string().optional(),
  
  // Business Details
  annualTurnover: z.string().optional(),
  employeeCount: z.string().optional(),
  businessDescription: z.string().optional(),
  
  // Founder Information
  founderName: z.string().min(2, "Founder name is required"),
  founderEmail: z.string().email("Please enter a valid email"),
  founderPhone: z.string().optional(),
  
  // Compliance Status
  hasTaxFiling: z.boolean().optional(),
  hasGstRegistration: z.boolean().optional(),
  hasTrademark: z.boolean().optional(),
  hasLabourCompliances: z.boolean().optional(),
  hasShopEstablishment: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      sector: "",
      businessType: "",
      stage: "",
      incorporationDate: "",
      registrationState: "",
      pan: "",
      gstin: "",
      cinOrLlpin: "",
      annualTurnover: "",
      employeeCount: "",
      businessDescription: "",
      founderName: "",
      founderEmail: "",
      founderPhone: "",
      hasTaxFiling: false,
      hasGstRegistration: false,
      hasTrademark: false,
      hasLabourCompliances: false,
      hasShopEstablishment: false,
    },
  });
  
  // Check if the current step is valid
  const checkStepValidity = async () => {
    const currentFields = steps[currentStep].fields;
    const result = await form.trigger(currentFields as any);
    return result;
  };
  
  const onSubmit = (data: FormValues) => {
    setIsLoading(true);
    
    // In a real app, this would save to a database via an API
    // For demo purposes, we'll save to localStorage
    localStorage.setItem("onboardingData", JSON.stringify(data));
    localStorage.setItem("isOnboarded", "true");
    
    // Show success message
    toast({
      title: "Onboarding Complete",
      description: "Your startup profile has been saved successfully.",
    });
    
    // Redirect to dashboard
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };
  
  const nextStep = async () => {
    const isValid = await checkStepValidity();
    
    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        form.handleSubmit(onSubmit)();
      }
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Progress calculation
  const progress = ((currentStep + 1) / steps.length) * 100;
  
  // Current step fields
  const currentStepFields = steps[currentStep].fields;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-primary">
              Start<span className="text-gradient">Karo</span>
            </h1>
            <span className="text-muted-foreground text-sm">Onboarding</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Need help? <a href="#" className="text-primary">Contact Support</a>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center mb-2">
              <div>
                <CardTitle className="text-xl">{steps[currentStep].name}</CardTitle>
                <CardDescription>
                  Step {currentStep + 1} of {steps.length}
                </CardDescription>
              </div>
              <div className="w-24 text-right">
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-4">
                {/* Company Information Fields */}
                {currentStep === 0 && (
                  <>
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="sector"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Sector</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select business sector" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {sectorOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose the sector that best describes your business
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="businessType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select business type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {businessTypeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Select your business's legal structure
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="stage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Startup Stage</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your startup stage" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {stageOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            What stage is your startup currently in?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                
                {/* Registration Details Fields */}
                {currentStep === 1 && (
                  <>
                    <FormField
                      control={form.control}
                      name="incorporationDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Incorporation Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormDescription>
                            When was your company officially registered?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="registrationState"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Registration State</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select state of registration" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {registrationStateOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            State where your company is registered
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="pan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PAN Number</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., ABCDE1234F" {...field} />
                          </FormControl>
                          <FormDescription>
                            Company's Permanent Account Number
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="gstin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GSTIN (if applicable)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 27AAPFU0939F1ZV" {...field} />
                          </FormControl>
                          <FormDescription>
                            Your Goods and Services Tax Identification Number
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cinOrLlpin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CIN/LLPIN</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., U72200MH2009PLC123456" {...field} />
                          </FormControl>
                          <FormDescription>
                            Corporate Identity Number or Limited Liability Partnership Identification Number
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                
                {/* Business Details Fields */}
                {currentStep === 2 && (
                  <>
                    <FormField
                      control={form.control}
                      name="annualTurnover"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Annual Turnover</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select annual turnover" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {annualTurnoverOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Estimated annual revenue of your business
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="employeeCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Employees</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select employee count" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {employeeCountOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="businessDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your business model and products/services" 
                              className="resize-none h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Brief description of what your company does
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                
                {/* Founder Information Fields */}
                {currentStep === 3 && (
                  <>
                    <FormField
                      control={form.control}
                      name="founderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Founder Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="founderEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="name@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="founderPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your mobile number" {...field} />
                          </FormControl>
                          <FormDescription>
                            We'll use this number for important notifications
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                
                {/* Compliance Status Fields */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="hasTaxFiling"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Income Tax Filing</FormLabel>
                            <FormDescription>
                              Do you have income tax filing obligations?
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="hasGstRegistration"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>GST Registration</FormLabel>
                            <FormDescription>
                              Have you registered for Goods & Services Tax?
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="hasTrademark"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Trademark Registration</FormLabel>
                            <FormDescription>
                              Have you registered your company's trademark?
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="hasLabourCompliances"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Labour Compliances</FormLabel>
                            <FormDescription>
                              Have you registered for PF, ESI, and other labour laws?
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="hasShopEstablishment"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Shop & Establishment Act</FormLabel>
                            <FormDescription>
                              Do you have a Shop & Establishment Act registration?
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            
            <Button
              onClick={nextStep}
              disabled={isLoading}
              className="gap-2"
            >
              {isLoading ? (
                "Processing..."
              ) : currentStep === steps.length - 1 ? (
                <>
                  Complete <CheckCircle2 className="h-4 w-4" />
                </>
              ) : (
                <>
                  Next <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default OnboardingPage;
