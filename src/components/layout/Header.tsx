
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const HeaderComponent = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className={cn(
            "text-2xl font-bold transition-colors",
            isScrolled || location.pathname !== "/" ? "text-primary" : "text-white"
          )}>
            StartKaro
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  isScrolled || location.pathname !== "/" ? "text-foreground" : "text-white"
                )}>
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/knowledge-base" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Knowledge Base</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Access documents and information for your startup journey
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/resources" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Resource Library</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Templates, guides, and tools for startup founders
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/tax-calculator" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Tax Calculator</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Calculate taxes and find government grants
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/compliance" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Compliance Guide</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Stay up to date with legal requirements
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  isScrolled || location.pathname !== "/" ? "text-foreground" : "text-white"
                )}>
                  Sectors
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {[
                      { name: "Technology", path: "/sectors/technology" },
                      { name: "E-commerce", path: "/sectors/ecommerce" },
                      { name: "Food & Hospitality", path: "/sectors/food" },
                      { name: "Healthcare", path: "/sectors/healthcare" },
                      { name: "Entertainment", path: "/sectors/entertainment" },
                      { name: "Manufacturing", path: "/sectors/manufacturing" }
                    ].map((sector, i) => (
                      <li key={i}>
                        <NavigationMenuLink asChild>
                          <Link to={sector.path} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">{sector.name}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Sector-specific regulations and resources
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <nav className="flex items-center gap-6">
            <Link
              to="/how-it-works"
              className={cn(
                "font-medium hover:underline",
                isActive("/how-it-works") ? "text-primary" : 
                isScrolled || location.pathname !== "/" ? "text-foreground" : "text-white"
              )}
            >
              How It Works
            </Link>
            <Link
              to="/chatbot"
              className={cn(
                "font-medium hover:underline",
                isActive("/chatbot") ? "text-primary" : 
                isScrolled || location.pathname !== "/" ? "text-foreground" : "text-white"
              )}
            >
              Chatbot
            </Link>
            <Link
              to="/pricing"
              className={cn(
                "font-medium hover:underline",
                isActive("/pricing") ? "text-primary" : 
                isScrolled || location.pathname !== "/" ? "text-foreground" : "text-white"
              )}
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button asChild variant="outline" className={cn(
              !isScrolled && location.pathname === "/" ? "border-white text-white hover:bg-white/10" : ""
            )}>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled || location.pathname !== "/" ? "text-foreground" : "text-white"} />
          ) : (
            <Menu className={isScrolled || location.pathname !== "/" ? "text-foreground" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t py-4 px-4 shadow-lg animate-fade-in">
          <nav className="flex flex-col gap-4">
            <Link to="/how-it-works" className="px-4 py-2 hover:bg-secondary rounded-md">
              How It Works
            </Link>
            <Link to="/chatbot" className="px-4 py-2 hover:bg-secondary rounded-md">
              Chatbot
            </Link>
            <Link to="/knowledge-base" className="px-4 py-2 hover:bg-secondary rounded-md">
              Knowledge Base
            </Link>
            <Link to="/resources" className="px-4 py-2 hover:bg-secondary rounded-md">
              Resources
            </Link>
            <Link to="/sectors/technology" className="px-4 py-2 hover:bg-secondary rounded-md">
              Sectors
            </Link>
            <Link to="/tax-calculator" className="px-4 py-2 hover:bg-secondary rounded-md">
              Tax Calculator
            </Link>
            <Link to="/pricing" className="px-4 py-2 hover:bg-secondary rounded-md">
              Pricing
            </Link>
            
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t">
              <Button asChild variant="outline">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default HeaderComponent;
