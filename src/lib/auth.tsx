
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isOnboarded: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for the application
const DEMO_USERS = [
  { 
    id: "user-1", 
    name: "Demo User", 
    email: "demo@example.com", 
    password: "password", 
    role: "user" as const 
  },
  { 
    id: "admin-1", 
    name: "Admin User", 
    email: "admin@example.com", 
    password: "admin123", 
    role: "admin" as const 
  }
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Check if user has completed onboarding
  const isOnboarded = localStorage.getItem("isOnboarded") === "true";

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = DEMO_USERS.find(
        (u) => u.email === email && u.password === password
      );
      
      if (foundUser) {
        // Extract user data without the password
        const { password: _, ...userData } = foundUser;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${userData.name}!`,
        });
        
        // Redirect based on role and onboarding status
        if (userData.role === "admin") {
          navigate("/dashboard");
        } else if (isOnboarded) {
          navigate("/dashboard");
        } else {
          navigate("/onboarding");
        }
      } else {
        setError("Invalid email or password");
        toast({
          title: "Login Failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
      }
    } catch (err) {
      setError("An error occurred during login");
      toast({
        title: "Login Failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Signup function
  const signup = async (name: string, email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const userExists = DEMO_USERS.some((u) => u.email === email);
      
      if (userExists) {
        setError("Email already exists");
        toast({
          title: "Signup Failed",
          description: "An account with this email already exists.",
          variant: "destructive",
        });
        return;
      }
      
      // Create new user (in a real app, this would call an API to create the user)
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: "user" as const,
      };
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      toast({
        title: "Account Created",
        description: "Your account has been created successfully.",
      });
      
      // Redirect to onboarding
      navigate("/onboarding");
    } catch (err) {
      setError("An error occurred during signup");
      toast({
        title: "Signup Failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
    
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        isOnboarded,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};

// Higher order component to protect routes
export const withAuth = 
  (Component: React.ComponentType, requireAdmin = false, requireOnboarding = true) => {
    // eslint-disable-next-line react/display-name
    return (props: any) => {
      const { isAuthenticated, isAdmin, isOnboarded, loading } = useAuth();
      const navigate = useNavigate();

      useEffect(() => {
        if (!loading) {
          if (!isAuthenticated) {
            navigate("/login");
          } else if (requireAdmin && !isAdmin) {
            navigate("/dashboard");
          } else if (requireOnboarding && !isOnboarded && !isAdmin) {
            navigate("/onboarding");
          }
        }
      }, [isAuthenticated, isAdmin, isOnboarded, loading, navigate]);

      if (loading) {
        return (
          <div className="h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
          </div>
        );
      }

      if (!isAuthenticated) {
        return null;
      }

      if (requireAdmin && !isAdmin) {
        return null;
      }

      if (requireOnboarding && !isOnboarded && !isAdmin) {
        return null;
      }

      return <Component {...props} />;
    };
  };
