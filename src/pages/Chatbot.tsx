
import ChatInterface from "@/components/chatbot/ChatInterface";
import HeaderComponent from "@/components/layout/Header";
import FooterComponent from "@/components/layout/Footer";

const Chatbot = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderComponent />
      
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">StartKaro AI Assistant</h1>
            <p className="text-muted-foreground mb-6">
              Get personalized guidance for your startup journey based on your documents and profile.
            </p>
            
            <ChatInterface />
          </div>
        </div>
      </main>
      
      <FooterComponent />
    </div>
  );
};

export default Chatbot;
