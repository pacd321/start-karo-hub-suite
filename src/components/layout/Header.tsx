
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const HeaderComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-bold text-xl text-primary">StartKaro</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive("/") && "text-primary font-medium"
                    )}
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/dashboard">
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive("/dashboard") && "text-primary font-medium"
                    )}
                  >
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/knowledge-base">
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive("/knowledge-base") && "text-primary font-medium"
                    )}
                  >
                    Knowledge Base
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/chatbot">
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive("/chatbot") && "text-primary font-medium"
                    )}
                  >
                    AI Chatbot
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/how-it-works">
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive("/how-it-works") && "text-primary font-medium"
                    )}
                  >
                    How It Works
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Login/Signup Buttons Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="outline">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <Link 
              to="/" 
              className={cn(
                "block px-4 py-2 rounded-md",
                isActive("/") ? "bg-primary/10 text-primary font-medium" : "hover:bg-gray-50"
              )}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className={cn(
                "block px-4 py-2 rounded-md",
                isActive("/dashboard") ? "bg-primary/10 text-primary font-medium" : "hover:bg-gray-50"
              )}
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
            <Link 
              to="/knowledge-base" 
              className={cn(
                "block px-4 py-2 rounded-md",
                isActive("/knowledge-base") ? "bg-primary/10 text-primary font-medium" : "hover:bg-gray-50"
              )}
              onClick={toggleMenu}
            >
              Knowledge Base
            </Link>
            <Link 
              to="/chatbot" 
              className={cn(
                "block px-4 py-2 rounded-md",
                isActive("/chatbot") ? "bg-primary/10 text-primary font-medium" : "hover:bg-gray-50"
              )}
              onClick={toggleMenu}
            >
              AI Chatbot
            </Link>
            <Link 
              to="/how-it-works" 
              className={cn(
                "block px-4 py-2 rounded-md",
                isActive("/how-it-works") ? "bg-primary/10 text-primary font-medium" : "hover:bg-gray-50"
              )}
              onClick={toggleMenu}
            >
              How It Works
            </Link>
            
            <div className="pt-4 space-y-2">
              <Button asChild variant="outline" className="w-full">
                <Link to="/login" onClick={toggleMenu}>Login</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/signup" onClick={toggleMenu}>Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderComponent;
