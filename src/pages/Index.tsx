
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  BookOpen, 
  CheckCircle, 
  FileText, 
  LayoutDashboard, 
  Users,
  Sparkles,
  ArrowUpRight,
  Rocket,
  MessageSquare
} from "lucide-react";
import HeaderComponent from "@/components/layout/Header";
import FooterComponent from "@/components/layout/Footer";

const Index = () => {
  useEffect(() => {
    // For SEO and page title
    document.title = "StartKaro - One Stop Platform for Indian Startup Founders";
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderComponent />
      
      {/* Hero Section with Glassmorphism */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8B5CF6_1px,transparent_1px),linear-gradient(to_bottom,#8B5CF6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] opacity-20"></div>
        
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="mb-6 inline-block">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                  <Sparkles className="mr-1 h-3 w-3" /> Simplifying startup compliance
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-slate-200">
                Launch Your Dream Startup in India with Confidence
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
                Your one-stop platform for all legal, compliance, and business knowledge to kickstart your entrepreneurial journey.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white gap-2 h-12 px-6">
                Get Started <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2 h-12 px-6">
                How It Works <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-10 flex justify-center flex-wrap gap-x-8 gap-y-4 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>AI-powered guidance</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Personalized compliance</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Sector-specific knowledge</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Interactive dashboards</span>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Floating illustrations */}
        <div className="absolute top-20 left-8 lg:left-20 w-16 h-16 md:w-24 md:h-24 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-8 lg:right-20 w-24 h-24 md:w-32 md:h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Start Up</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              StartKaro simplifies the complex process of launching a startup in India with our comprehensive platform.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {/* Feature 1 */}
            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl -z-10 group-hover:scale-[1.03] transition-transform duration-300"></div>
              <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full w-fit mb-5">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Smart Compliance Reports</h3>
                <p className="text-muted-foreground mb-6">
                  Get customized compliance checklists based on your business type and sector.
                </p>
                <Link to="/dashboard" className="inline-flex items-center text-primary font-medium hover:underline">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl -z-10 group-hover:scale-[1.03] transition-transform duration-300"></div>
              <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full w-fit mb-5">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Knowledge Base</h3>
                <p className="text-muted-foreground mb-6">
                  Access industry-specific information and legal requirements for your startup.
                </p>
                <Link to="/knowledge-base" className="inline-flex items-center text-blue-600 font-medium hover:underline">
                  Explore resources <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl -z-10 group-hover:scale-[1.03] transition-transform duration-300"></div>
              <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-full w-fit mb-5">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Interactive Checklists</h3>
                <p className="text-muted-foreground mb-6">
                  Track your progress with interactive checklists for legal and operational requirements.
                </p>
                <Link to="/dashboard" className="inline-flex items-center text-green-600 font-medium hover:underline">
                  View checklists <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Feature 4 */}
            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl -z-10 group-hover:scale-[1.03] transition-transform duration-300"></div>
              <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-gradient-to-br from-amber-100 to-amber-50 rounded-full w-fit mb-5">
                  <MessageSquare className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI-Powered Chatbot</h3>
                <p className="text-muted-foreground mb-6">
                  Get instant answers to your startup queries with our AI assistant.
                </p>
                <Link to="/chatbot" className="inline-flex items-center text-amber-600 font-medium hover:underline">
                  Chat now <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Feature 5 */}
            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl -z-10 group-hover:scale-[1.03] transition-transform duration-300"></div>
              <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-full w-fit mb-5">
                  <LayoutDashboard className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Business Dashboard</h3>
                <p className="text-muted-foreground mb-6">
                  Monitor your startup's progress, compliance status, and next steps all in one place.
                </p>
                <Link to="/dashboard" className="inline-flex items-center text-purple-600 font-medium hover:underline">
                  View dashboard <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
            
            {/* Feature 6 */}
            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl -z-10 group-hover:scale-[1.03] transition-transform duration-300"></div>
              <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-gradient-to-br from-rose-100 to-rose-50 rounded-full w-fit mb-5">
                  <FileText className="h-6 w-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Tax Calculator</h3>
                <p className="text-muted-foreground mb-6">
                  Calculate taxes and find applicable government grants for your startup.
                </p>
                <Link to="/resources" className="inline-flex items-center text-rose-600 font-medium hover:underline">
                  Calculate now <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sectors Section with Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Specialized for Your Industry</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide tailored information for various sectors to help you navigate industry-specific regulations.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { name: "Technology", path: "/knowledge-base?sector=technology", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-blue-500"><path d="M14 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M18 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M6 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M13.93 11.86q.43.36.93.36"></path><path d="M7.14 12.2q.36-.21.86-.2"></path><path d="M17.64 15.97q-.87-.56-.87-1.97"></path><path d="M6.31 15.9q.87-.54.87-1.9"></path><path d="M14.13 7.96q.72.16 1.87.19"></path><path d="M7.89 8.15q1.04-.05 1.89-.19"></path></svg>, color: "bg-blue-50 text-blue-600" },
              { name: "E-commerce", path: "/knowledge-base?sector=ecommerce", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-green-500"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" x2="21" y1="6" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>, color: "bg-green-50 text-green-600" },
              { name: "Food & Hospitality", path: "/knowledge-base?sector=food", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-orange-500"><path d="M20 20a3 3 0 0 1-3-3c0-2-3-3-3-3c.28.02-1 0-1 0c0 .7.1.98-1 1c-1 0-2 0-3.5-.5S4 12 4 10c0-.5 0-2 1-2s2.5 1 3.5 1c1 0 1.5-.5 2-1c.5-.5 2-1.5 2-1.5c.7-.3 2-1 3.5-1c1.5 0 3 3 3 5s-2 3-2 5c0 1 0 2 3 2z"></path><path d="M19.5 16c.9-3 .5-6-2-9.5"></path><path d="M9 10a3 3 0 0 1 .5-2"></path><path d="M15 17c0-5-2-8.5-7-8.5"></path></svg>, color: "bg-orange-50 text-orange-600" },
              { name: "Healthcare", path: "/knowledge-base?sector=healthcare", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-red-500"><path d="M3 12h18"></path><path d="M12 3v18"></path></svg>, color: "bg-red-50 text-red-600" },
              { name: "Entertainment", path: "/knowledge-base?sector=entertainment", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-purple-500"><path d="m4 17 6-3-6-3v6Z"></path><path d="m20 7-6 3 6 3V7Z"></path><rect width="8" height="12" x="8" y="6" rx="2"></rect></svg>, color: "bg-purple-50 text-purple-600" },
              { name: "Manufacturing", path: "/knowledge-base?sector=manufacturing", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-yellow-500"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="18" r="3"></circle></svg>, color: "bg-yellow-50 text-yellow-600" }
            ].map((sector, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link to={sector.path} className="block group">
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                    <div className={`${sector.color} p-4 rounded-lg w-fit mb-6`}>
                      {sector.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{sector.name}</h3>
                    <p className="text-muted-foreground mb-auto">
                      Sector-specific regulations, compliances, and business opportunities.
                    </p>
                    <div className="mt-6 flex items-center text-primary font-medium">
                      Explore sector
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Founders Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from successful entrepreneurs who used StartKaro to navigate their startup journey.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "StartKaro simplified the complex compliance requirements for my tech startup. The personalized checklist saved me both time and legal consultation costs.",
                author: "Rahul Sharma",
                role: "Founder, TechVista Solutions",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                quote: "The sector-specific knowledge base was invaluable when launching my e-commerce platform. I could understand GST implications and FDI regulations clearly.",
                author: "Priya Mehta",
                role: "CEO, ShopEasy",
                image: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                quote: "As a solo founder with limited resources, StartKaro's AI assistant helped me understand critical compliance requirements without expensive legal consultations.",
                author: "Vikram Singh",
                role: "Founder, FoodTruck Network",
                image: "https://randomuser.me/api/portraits/men/46.jpg"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <svg width="45" height="36" className="text-gray-300" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.5 18H9C9.66667 12 12.3333 9 17 9V13.5C15.6667 13.8333 14.6667 14.6667 14 16C13.3333 17.3333 13.1667 18 13.5 18ZM30.5 18H26C26.6667 12 29.3333 9 34 9V13.5C32.6667 13.8333 31.6667 14.6667 31 16C30.3333 17.3333 30.1667 18 30.5 18Z" fill="currentColor"/>
                      <path d="M13.5 18C13.5 18 12 28.5 21 28.5C25.5 28.5 25.5 25.5 25.5 24C25.5 19.5 21 18 13.5 18ZM30.5 18C30.5 18 29 28.5 38 28.5C42.5 28.5 42.5 25.5 42.5 24C42.5 19.5 38 18 30.5 18Z" fill="currentColor"/>
                    </svg>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 flex-grow">
                    {testimonial.quote}
                  </p>
                  
                  <div className="flex items-center mt-auto">
                    <div className="mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author} 
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary to-primary/80 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000,transparent)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8B5CF670_1px,transparent_1px),linear-gradient(to_bottom,#8B5CF670_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>
        
        <div className="container mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="mb-6 inline-block">
              <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white ring-1 ring-inset ring-white/30">
                <Rocket className="mr-1 h-3 w-3" /> Ready to launch?
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Entrepreneurial Journey?</h2>
            <p className="text-xl mb-8 text-white/80">
              Join thousands of founders who've simplified their startup process with StartKaro.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-12 px-6">
                Get Started Free
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 h-12 px-6">
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-24 -right-16 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      </section>

      <FooterComponent />
    </div>
  );
};

export default Index;
