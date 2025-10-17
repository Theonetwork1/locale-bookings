import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
          const { data: userProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          if (userProfile) {
            const actualRole = isAdminUser(session.user.email || '') ? 'admin' : userProfile.role;
            const user: User = {
              id: userProfile.id,
              email: userProfile.email,
              name: userProfile.full_name,
              role: actualRole,
              phone: userProfile.phone,
              avatar_url: userProfile.avatar_url,
              business_name: undefined,
              business_address: undefined,
              business_category: undefined,
              business_description: undefined,
              is_business_setup: actualRole === 'business' ? false : undefined,
              isBusinessProfileComplete: false
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
            const { data: userProfile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            if (userProfile) {
              const actualRole = isAdminUser(session.user.email || '') ? 'admin' : userProfile.role;
              const user: User = {
                id: userProfile.id,
                email: userProfile.email,
                name: userProfile.full_name,
                role: actualRole,
                phone: userProfile.phone,
                avatar_url: userProfile.avatar_url,
                business_name: undefined,
                business_address: undefined,
                business_category: undefined,
                business_description: undefined,
                is_business_setup: actualRole === 'business' ? false : undefined,
                isBusinessProfileComplete: false
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
      
      // Use Supabase Auth for login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.user) {
        throw new Error('Login failed');
      }

      // Get user profile from profiles table
      const { data: userProfile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError || !userProfile) {
        throw new Error('User profile not found');
      }
      
      // Determine actual user role (admin is determined by email, not database)
      const actualRole = isAdminUser(email) ? 'admin' : userProfile.role;
      
      // Check if role matches (only for client and business)
      if (actualRole !== role && actualRole !== 'admin') {
        throw new Error(`This account is registered as ${actualRole}, not ${role}`);
      }

      // Check admin access
      if (actualRole === 'admin' && !isAdminUser(email)) {
        throw new Error('Admin access denied');
      }
        
      // Note: Business setup logic simplifié pour le schéma actuel

      const user: User = {
        id: userProfile.id,
        email: userProfile.email,
        name: userProfile.full_name,
        role: actualRole,
        phone: userProfile.phone,
        avatar_url: userProfile.avatar_url,
        business_name: undefined, // Ces champs ne sont pas dans le schéma actuel
        business_address: undefined,
        business_category: undefined,
        business_description: undefined,
        is_business_setup: actualRole === 'business' ? false : undefined,
        isBusinessProfileComplete: false
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
      
      // Sign out from Supabase
      await supabase.auth.signOut();
      setUser(null);
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
          .from('profiles')
          .insert({
            id: authData.user.id,
            email,
            full_name: userData.full_name,
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
      const { data: userProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (userProfile) {
        const actualRole = isAdminUser(user.email) ? 'admin' : userProfile.role;
        const updatedUser: User = {
          id: userProfile.id,
          email: userProfile.email,
          name: userProfile.full_name,
          role: actualRole,
          phone: userProfile.phone,
          avatar_url: userProfile.avatar_url,
          business_name: undefined,
          business_address: undefined,
          business_category: undefined,
          business_description: undefined,
          is_business_setup: actualRole === 'business' ? false : undefined,
          isBusinessProfileComplete: false
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
