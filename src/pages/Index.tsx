
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
  Users 
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
      
      {/* Hero Section */}
      <section className="animated-bg-gradient text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Launch Your Dream Startup in India with Confidence
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Your one-stop platform for all legal, compliance, and business knowledge to kickstart your entrepreneurial journey.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link to="/signup">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link to="/how-it-works">How It Works</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
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
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md">
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Compliance Reports</h3>
              <p className="text-muted-foreground mb-4">
                Get customized compliance checklists based on your business type and sector.
              </p>
              <Link to="/dashboard" className="text-primary font-medium hover:underline flex items-center">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md">
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Knowledge Base</h3>
              <p className="text-muted-foreground mb-4">
                Access industry-specific information and legal requirements for your startup.
              </p>
              <Link to="/knowledge-base" className="text-primary font-medium hover:underline flex items-center">
                Explore resources <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md">
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Interactive Checklists</h3>
              <p className="text-muted-foreground mb-4">
                Track your progress with interactive checklists for legal and operational requirements.
              </p>
              <Link to="/dashboard" className="text-primary font-medium hover:underline flex items-center">
                View checklists <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>

            {/* Feature 4 */}
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md">
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI-Powered Chatbot</h3>
              <p className="text-muted-foreground mb-4">
                Get instant answers to your startup queries with our AI assistant.
              </p>
              <Link to="/chatbot" className="text-primary font-medium hover:underline flex items-center">
                Chat now <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>

            {/* Feature 5 */}
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md">
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                <LayoutDashboard className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Business Dashboard</h3>
              <p className="text-muted-foreground mb-4">
                Monitor your startup's progress, compliance status, and next steps all in one place.
              </p>
              <Link to="/dashboard" className="text-primary font-medium hover:underline flex items-center">
                View dashboard <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
            
            {/* Feature 6 */}
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md">
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Tax Calculator</h3>
              <p className="text-muted-foreground mb-4">
                Calculate taxes and find applicable government grants for your startup.
              </p>
              <Link to="/dashboard" className="text-primary font-medium hover:underline flex items-center">
                Calculate now <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
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
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {[
              { name: "Technology", path: "/knowledge-base?sector=technology", color: "bg-blue-100" },
              { name: "E-commerce", path: "/knowledge-base?sector=ecommerce", color: "bg-green-100" },
              { name: "Food & Hospitality", path: "/knowledge-base?sector=food", color: "bg-orange-100" },
              { name: "Healthcare", path: "/knowledge-base?sector=healthcare", color: "bg-red-100" },
              { name: "Entertainment", path: "/knowledge-base?sector=entertainment", color: "bg-purple-100" },
              { name: "Manufacturing", path: "/knowledge-base?sector=manufacturing", color: "bg-yellow-100" }
            ].map((sector, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link to={sector.path} className="block group">
                  <div className={`${sector.color} p-6 rounded-lg transition-all duration-200 group-hover:shadow-md`}>
                    <h3 className="text-xl font-medium mb-1">{sector.name}</h3>
                    <p className="text-muted-foreground flex items-center">
                      Explore regulations
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-white">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Entrepreneurial Journey?</h2>
            <p className="text-xl mb-8">
              Join thousands of founders who've simplified their startup process with StartKaro.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link to="/signup">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <FooterComponent />
    </div>
  );
};

export default Index;
