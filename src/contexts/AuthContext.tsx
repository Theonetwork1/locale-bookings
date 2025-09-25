import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, getUserProfileByEmail, verifyPassword } from '@/lib/supabase';

export type UserRole = 'business' | 'client';

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
  role: UserRole;
  phone?: string;
  avatar_url?: string;
  business_name?: string;
  business_address?: string;
  business_category?: string;
  business_description?: string;
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
  login: (email: string, password: string, role: UserRole) => Promise<void>;
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

    // 2) Additionally check Supabase session (optional demo fallback)
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const mockUser: User = {
            id: session.user.id,
            email: session.user.email || '',
            name: 'John Doe',
            role: 'client',
            avatar_url: session.user.user_metadata?.avatar_url
          };
          setUser(prev => prev ?? mockUser);
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
          const mockUser: User = {
            id: session.user.id,
            email: session.user.email || '',
            name: 'John Doe',
            role: 'client',
            avatar_url: session.user.user_metadata?.avatar_url
          };
          setUser(mockUser);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    try {
      setLoading(true);
      
      // Try to get user profile from database
      try {
        const userProfile = await getUserProfileByEmail(email);
        
        // Verify password
        const isValidPassword = await verifyPassword(password, userProfile.password_hash);
        if (!isValidPassword) {
          throw new Error('Invalid credentials');
        }
        
        // Check if role matches
        if (userProfile.role !== role) {
          throw new Error(`This account is registered as ${userProfile.role}, not ${role}`);
        }
        
        // Special admin access control
        if (userProfile.role === 'admin') {
          if (!isAdminUser(email)) {
            throw new Error('Access denied. Admin privileges not granted for this account.');
          }
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
        
      } catch (dbError) {
        // No demo mode - require valid credentials
        throw new Error('Invalid credentials. Please check your email and password.');
      }
      
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
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name: userData.full_name,
        role: userData.role,
        avatar_url: undefined,
        country: userData.country,
        state: userData.state,
        city: userData.city,
        latitude: userData.latitude,
        longitude: userData.longitude,
        phone: userData.phone,
        business_name: userData.business_name,
        business_address: userData.business_address,
        business_category: userData.business_category,
        business_description: userData.business_description
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
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
