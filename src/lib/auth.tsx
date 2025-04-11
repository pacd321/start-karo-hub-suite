
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  isOnboarded: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any, user: any }>;
  signOut: () => Promise<void>;
  login: (email: string, password: string) => Promise<{ error: any }>;
  signup: (name: string, email: string, password: string) => Promise<{ error: any, user: any }>;
  logout: () => Promise<void>;
}

// Add a custom type that extends User to include name property
export interface ExtendedUser extends User {
  name?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        if (newSession?.user) {
          const extendedUser = { 
            ...newSession.user,
            name: newSession.user.user_metadata?.name || 'User'  // Add name from metadata
          };
          setUser(extendedUser as ExtendedUser);
        } else {
          setUser(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      if (currentSession?.user) {
        const extendedUser = { 
          ...currentSession.user,
          name: currentSession.user.user_metadata?.name || 'User'  // Add name from metadata
        };
        setUser(extendedUser as ExtendedUser);
      } else {
        setUser(null);
      }

      // Check if user has a profile to determine if they're onboarded
      if (currentSession?.user) {
        // Fix for the Promise.catch() TypeScript error
        supabase
          .from('profiles')
          .select('*')
          .eq('id', currentSession.user.id)
          .single()
          .then(({ data }) => {
            setIsOnboarded(!!data);
            setIsLoading(false);
          })
          .catch(() => {
            // Handle the error explicitly in this promise chain
            setIsOnboarded(false);
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Check if the user is an admin (for demo purposes)
  const isAdmin = user?.email === 'admin@example.com';

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password
    });
    return { error, user: data?.user || null };
  };

  const signup = async (name: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          name
        }
      }
    });
    return { error, user: data?.user || null };
  };

  const login = signIn;

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const logout = signOut;

  const value = {
    user: user as User | null,
    session,
    isAuthenticated: !!user,
    isLoading,
    isAdmin,
    isOnboarded,
    signIn,
    signUp,
    signOut,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
