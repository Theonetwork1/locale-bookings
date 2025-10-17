import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, getUserProfileByEmail, verifyPassword } from '@/lib/supabase';

export type UserRole = 'business' | 'client' | 'admin';

// Admin access control - only specific emails can access admin functions
const ADMIN_EMAILS = [
  'admin@bizli.com',
  'administrator@bizli.com'
  // Add more admin emails as needed
];

export const isAdminUser = (email: string): boolean => {
  return ADMIN_EMAILS.includes(email.toLowerCase());
};

export interface User {
  id: string;
  email: string;
  name: string;
  full_name?: string;
  role: UserRole;
  phone?: string;
  avatar_url?: string;
  business_name?: string;
  business_address?: string;
  business_category?: string;
  business_description?: string;
  address?: string;
  description?: string;
  bio?: string;
  // GÉOLOCALISATION AJOUTÉE
  country?: string;
  state?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  full_address?: string;
  is_business_setup?: boolean;
  isBusinessProfileComplete?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<User>;
  logout: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, userData: { 
    full_name: string; 
    role: 'client' | 'business';
    country?: string;
    state?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
    business_name?: string;
    business_address?: string;
    business_category?: string;
    business_description?: string;
  }) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  profile: User | null;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1) Restore user from localStorage to keep role and show sidebar after reload
    const savedUserRaw = localStorage.getItem('user');
    if (savedUserRaw) {
      try {
        const savedUser: User = JSON.parse(savedUserRaw);
        setUser(savedUser);
        setLoading(false);
      } catch {
        // ignore parse errors
      }
    }

    // 2) Check Supabase session for valid authentication
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          // Get user profile from database
          const userProfile = await getUserProfileByEmail(session.user.email || '');
          if (userProfile) {
            const user: User = {
              id: userProfile.id,
              email: userProfile.email,
              name: userProfile.name,
              role: userProfile.role as UserRole,
              phone: userProfile.phone,
              avatar_url: userProfile.avatar_url,
              business_name: userProfile.business_name,
              business_address: userProfile.business_address,
              business_category: userProfile.business_category,
              business_description: userProfile.business_description,
              is_business_setup: userProfile.is_business_setup,
              isBusinessProfileComplete: userProfile.isBusinessProfileComplete
            };
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          try {
            const userProfile = await getUserProfileByEmail(session.user.email || '');
            if (userProfile) {
              const user: User = {
                id: userProfile.id,
                email: userProfile.email,
                name: userProfile.name,
                role: userProfile.role as UserRole,
                phone: userProfile.phone,
                avatar_url: userProfile.avatar_url,
                business_name: userProfile.business_name,
                business_address: userProfile.business_address,
                business_category: userProfile.business_category,
                business_description: userProfile.business_description,
                is_business_setup: userProfile.is_business_setup,
                isBusinessProfileComplete: userProfile.isBusinessProfileComplete
              };
              setUser(user);
              localStorage.setItem('user', JSON.stringify(user));
            }
          } catch (error) {
            console.error('Error getting user profile:', error);
            setUser(null);
          }
        } else {
          setUser(null);
          localStorage.removeItem('user');
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    try {
      setLoading(true);
      
      // Check if we're in development mode (no Supabase configured)
      const isDevelopmentMode = import.meta.env.VITE_DEVELOPMENT_MODE === 'true' || 
                               !import.meta.env.VITE_SUPABASE_URL || 
                               import.meta.env.VITE_SUPABASE_URL === 'https://your-project.supabase.co';
      
      if (isDevelopmentMode) {
        // Development mode - allow login with any credentials
        console.log('Development mode: Allowing login without database connection');
        
        const user: User = {
          id: `dev-${Date.now()}`,
          email: email,
          name: email.split('@')[0],
          role: role,
          avatar_url: undefined,
          is_business_setup: role === 'business' ? false : undefined,
          isBusinessProfileComplete: false
        };
        
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }
      
      // Production mode - use Supabase
      // Get user profile from database
      const userProfile = await getUserProfileByEmail(email);
      
      // Verify password
      const isValidPassword = await verifyPassword(password, userProfile.password_hash);
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }
      
      // Check if role matches (only for client and business)
      if (userProfile.role !== role && userProfile.role !== 'admin') {
        throw new Error(`This account is registered as ${userProfile.role}, not ${role}`);
      }
      
      // Special admin access control - admin role is determined by database, not user selection
      if (userProfile.role === 'admin') {
        if (!isAdminUser(email)) {
          throw new Error('Access denied. Admin privileges not granted for this account.');
        }
        // Admin users are automatically redirected regardless of selected role
      }
        
      // For existing business users, check if they have business data
      // If they have business data in their profile, they should be considered as setup complete
      let isBusinessSetup = userProfile.is_business_setup;
      let isBusinessProfileComplete = userProfile.isBusinessProfileComplete || false;
      
      if (userProfile.role === 'business' && !isBusinessSetup) {
        // Check if user has business data in their profile
        if (userProfile.business_name && userProfile.business_address && userProfile.business_category) {
          isBusinessSetup = true;
          // Update the database to reflect this
          try {
            await supabase
              .from('user_profiles')
              .update({ is_business_setup: true })
              .eq('id', userProfile.id);
          } catch (error) {
            console.error('Error updating business setup status:', error);
          }
        }
      }

      const user: User = {
        id: userProfile.id,
        email: userProfile.email,
        name: userProfile.name,
        role: userProfile.role as UserRole,
        phone: userProfile.phone,
        avatar_url: userProfile.avatar_url,
        business_name: userProfile.business_name,
        business_address: userProfile.business_address,
        business_category: userProfile.business_category,
        business_description: userProfile.business_description,
        is_business_setup: isBusinessSetup,
        isBusinessProfileComplete: isBusinessProfileComplete
      };
      
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Return the user object for navigation handling
      return user;
      
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setUser(null);
      localStorage.removeItem('user');
      
      // In a real app, you'd also sign out from Supabase
      // await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };


  // Compatibility methods for new auth system
  const signIn = async (email: string, password: string) => {
    try {
      await login(email, password, 'client'); // Default to client for compatibility
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  // Mise à jour de la méthode signUp pour inclure la géolocalisation
  const signUp = async (email: string, password: string, userData: { 
    full_name: string; 
    role: 'client' | 'business';
    country?: string;
    state?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
    business_name?: string;
    business_address?: string;
    business_category?: string;
    business_description?: string;
  }) => {
    try {
      // Check if we're in development mode
      const isDevelopmentMode = import.meta.env.VITE_DEVELOPMENT_MODE === 'true' || 
                               !import.meta.env.VITE_SUPABASE_URL || 
                               import.meta.env.VITE_SUPABASE_URL === 'https://your-project.supabase.co';
      
      if (isDevelopmentMode) {
        // Development mode - just return success
        console.log('Development mode: Signup successful without database connection');
        return { error: null };
      }
      
      // Production mode - use Supabase
      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name,
            role: userData.role
          }
        }
      });

      if (authError) {
        return { error: authError };
      }

      if (authData.user) {
        // Create user profile in database
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: authData.user.id,
            email,
            name: userData.full_name,
            role: userData.role,
            country: userData.country,
            state: userData.state,
            city: userData.city,
            latitude: userData.latitude,
            longitude: userData.longitude,
            phone: userData.phone,
            business_name: userData.business_name,
            business_address: userData.business_address,
            business_category: userData.business_category,
            business_description: userData.business_description,
            is_business_setup: userData.role === 'business' ? false : null,
            isBusinessProfileComplete: false
          });

        if (profileError) {
          return { error: profileError };
        }
      }

      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const refreshUser = async () => {
    if (!user) return;
    
    try {
      const userProfile = await getUserProfileByEmail(user.email);
      if (userProfile) {
        const updatedUser: User = {
          id: userProfile.id,
          email: userProfile.email,
          name: userProfile.name,
          role: userProfile.role as UserRole,
          phone: userProfile.phone,
          avatar_url: userProfile.avatar_url,
          business_name: userProfile.business_name,
          business_address: userProfile.business_address,
          business_category: userProfile.business_category,
          business_description: userProfile.business_description,
          is_business_setup: userProfile.is_business_setup,
          isBusinessProfileComplete: userProfile.isBusinessProfileComplete
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    signIn,
    signUp,
    signOut: logout, // Alias pour logout
    profile: user, // For compatibility with ProtectedRoute
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
