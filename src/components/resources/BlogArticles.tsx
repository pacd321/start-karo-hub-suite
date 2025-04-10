
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Share2, BookmarkPlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BlogArticles = () => {
  return (
    <div className="space-y-8">
      <div className="bg-muted/30 rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          Expert insights, practical tips, and the latest news for Indian startup founders.
        </p>
      </div>
      
      <Tabs defaultValue="latest">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="latest">Latest Articles</TabsTrigger>
          <TabsTrigger value="funding">Funding</TabsTrigger>
          <TabsTrigger value="legal">Legal & Compliance</TabsTrigger>
          <TabsTrigger value="growth">Growth Strategies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="latest" className="space-y-6 pt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article, index) => (
              <BlogCard key={index} article={article} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="funding" className="space-y-6 pt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {fundingArticles.map((article, index) => (
              <BlogCard key={index} article={article} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="legal" className="space-y-6 pt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {legalArticles.map((article, index) => (
              <BlogCard key={index} article={article} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="growth" className="space-y-6 pt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {growthArticles.map((article, index) => (
              <BlogCard key={index} article={article} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface BlogArticle {
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  readTime: number;
  author: {
    name: string;
    avatar: string;
    title: string;
  };
}

const BlogCard = ({ article }: { article: BlogArticle }) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md flex flex-col">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="object-cover w-full h-full transition-all hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="font-normal">
            {article.category}
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            <span>{article.readTime} min read</span>
          </div>
        </div>
        <CardTitle className="line-clamp-2">{article.title}</CardTitle>
        <CardDescription className="line-clamp-2">{article.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={article.author.avatar} alt={article.author.name} />
              <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium">{article.author.name}</span>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{article.date}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <div className="flex justify-between items-center w-full">
          <Button variant="default" className="w-full">
            Read Article
          </Button>
          <div className="flex gap-2 ml-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <BookmarkPlus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

// Sample article data
const latestArticles: BlogArticle[] = [
  {
    title: "New Tax Benefits for Indian Startups in 2024",
    description: "The government has announced additional tax incentives for startups in specific sectors.",
    image: "https://images.unsplash.com/photo-1565514158740-064f34bd6cfd?q=80&w=2940&auto=format&fit=crop",
    category: "Tax & Finance",
    date: "Apr 8, 2024",
    readTime: 5,
    author: {
      name: "Priya Sharma",
      avatar: "https://i.pravatar.cc/150?img=1",
      title: "Tax Consultant"
    }
  },
  {
    title: "How to Scale Your SaaS Startup in India's Growing Market",
    description: "Learn strategies for scaling your SaaS business in the rapidly growing Indian market.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
    category: "Growth",
    date: "Apr 6, 2024",
    readTime: 7,
    author: {
      name: "Arjun Mehta",
      avatar: "https://i.pravatar.cc/150?img=2",
      title: "Growth Strategist"
    }
  },
  {
    title: "The Rise of Fintech Startups in Tier-2 Indian Cities",
    description: "Exploring the growing fintech ecosystem beyond metropolitan areas.",
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=2940&auto=format&fit=crop",
    category: "Industry Trends",
    date: "Apr 4, 2024",
    readTime: 6,
    author: {
      name: "Rahul Kapoor",
      avatar: "https://i.pravatar.cc/150?img=3",
      title: "Fintech Analyst"
    }
  },
  {
    title: "Updated GST Compliance Guidelines for E-commerce Businesses",
    description: "Recent changes to GST regulations affecting e-commerce operations in India.",
    image: "https://images.unsplash.com/photo-1586892477838-2b96e85e0f96?q=80&w=2787&auto=format&fit=crop",
    category: "Legal",
    date: "Apr 2, 2024",
    readTime: 8,
    author: {
      name: "Neha Gupta",
      avatar: "https://i.pravatar.cc/150?img=4",
      title: "Legal Advisor"
    }
  },
  {
    title: "Building a Remote-First Startup Culture in India",
    description: "Best practices for establishing a successful remote work culture for your startup.",
    image: "https://images.unsplash.com/photo-1603383928972-2116518cd3f3?q=80&w=2862&auto=format&fit=crop",
    category: "HR & Culture",
    date: "Mar 30, 2024",
    readTime: 5,
    author: {
      name: "Vikram Singh",
      avatar: "https://i.pravatar.cc/150?img=5",
      title: "HR Consultant"
    }
  },
  {
    title: "How Indian D2C Brands Are Winning in the Global Market",
    description: "Success stories of Indian direct-to-consumer brands making an international impact.",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2940&auto=format&fit=crop",
    category: "Marketing",
    date: "Mar 28, 2024",
    readTime: 6,
    author: {
      name: "Anjali Desai",
      avatar: "https://i.pravatar.cc/150?img=6",
      title: "Marketing Strategist"
    }
  }
];

const fundingArticles: BlogArticle[] = [
  {
    title: "A Comprehensive Guide to Series A Funding in India",
    description: "Everything founders need to know before seeking Series A investment.",
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=2787&auto=format&fit=crop",
    category: "Funding",
    date: "Apr 7, 2024",
    readTime: 10,
    author: {
      name: "Deepak Sharma",
      avatar: "https://i.pravatar.cc/150?img=7",
      title: "Investment Advisor"
    }
  },
  {
    title: "How to Create a Winning Pitch Deck for Indian Investors",
    description: "Tips for crafting a pitch deck that resonates with Indian venture capitalists.",
    image: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=2940&auto=format&fit=crop",
    category: "Funding",
    date: "Apr 5, 2024",
    readTime: 8,
    author: {
      name: "Smita Patel",
      avatar: "https://i.pravatar.cc/150?img=8",
      title: "Startup Mentor"
    }
  },
  {
    title: "Alternative Funding Options for Early-Stage Indian Startups",
    description: "Beyond venture capital: exploring grants, angel investors, and crowdfunding.",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=2940&auto=format&fit=crop",
    category: "Funding",
    date: "Apr 1, 2024",
    readTime: 7,
    author: {
      name: "Rajesh Kumar",
      avatar: "https://i.pravatar.cc/150?img=9",
      title: "Financial Strategist"
    }
  }
];

const legalArticles: BlogArticle[] = [
  {
    title: "Legal Considerations for SaaS Startups in India",
    description: "Key legal aspects that software-as-a-service startups must address.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2942&auto=format&fit=crop",
    category: "Legal",
    date: "Apr 6, 2024",
    readTime: 9,
    author: {
      name: "Aditya Nair",
      avatar: "https://i.pravatar.cc/150?img=10",
      title: "Corporate Lawyer"
    }
  },
  {
    title: "Navigating Data Protection Laws for Indian Startups",
    description: "What founders need to know about data privacy regulations in India.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2940&auto=format&fit=crop",
    category: "Legal",
    date: "Apr 3, 2024",
    readTime: 8,
    author: {
      name: "Nandita Krishnan",
      avatar: "https://i.pravatar.cc/150?img=11",
      title: "Data Privacy Expert"
    }
  },
  {
    title: "Intellectual Property Protection Strategies for Startups",
    description: "How to secure your startup's innovations through patents, trademarks and copyrights.",
    image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?q=80&w=2940&auto=format&fit=crop",
    category: "Legal",
    date: "Mar 29, 2024",
    readTime: 7,
    author: {
      name: "Vivek Joshi",
      avatar: "https://i.pravatar.cc/150?img=12",
      title: "IP Attorney"
    }
  }
];

const growthArticles: BlogArticle[] = [
  {
    title: "Customer Acquisition Strategies for Indian D2C Startups",
    description: "Effective methods to acquire and retain customers in India's competitive market.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2940&auto=format&fit=crop",
    category: "Growth",
    date: "Apr 4, 2024",
    readTime: 6,
    author: {
      name: "Kavita Reddy",
      avatar: "https://i.pravatar.cc/150?img=13",
      title: "Growth Hacker"
    }
  },
  {
    title: "Building Effective Distribution Channels in India",
    description: "How to develop distribution strategies for reaching India's diverse market.",
    image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=2940&auto=format&fit=crop",
    category: "Growth",
    date: "Apr 2, 2024",
    readTime: 7,
    author: {
      name: "Sanjay Mehta",
      avatar: "https://i.pravatar.cc/150?img=14",
      title: "Supply Chain Expert"
    }
  },
  {
    title: "The Art of Product-Market Fit for Indian Startups",
    description: "Finding the right product-market fit in India's unique business landscape.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2940&auto=format&fit=crop",
    category: "Growth",
    date: "Mar 31, 2024",
    readTime: 8,
    author: {
      name: "Divya Sharma",
      avatar: "https://i.pravatar.cc/150?img=15",
      title: "Product Strategist"
    }
  }
];

export default BlogArticles;
