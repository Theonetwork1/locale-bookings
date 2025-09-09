<<<<<<< HEAD
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: 'client' | 'business' | 'admin';
  department: string | null;
  avatar_url: string | null;
=======
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, getUserProfileByEmail, verifyPassword } from '@/lib/supabase';

export type UserRole = 'admin' | 'business' | 'client';

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
>>>>>>> 6ae5ed6 (Sync changes to Lovable)
}

interface AuthContextType {
  user: User | null;
<<<<<<< HEAD
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: { full_name: string; role: 'client' | 'business' }) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>;
=======
  loading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  switchRole: (role: UserRole) => void;
>>>>>>> 6ae5ed6 (Sync changes to Lovable)
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

<<<<<<< HEAD
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }
      
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer profile fetching to avoid blocking
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
        
=======
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
>>>>>>> 6ae5ed6 (Sync changes to Lovable)
        setLoading(false);
      }
    );

<<<<<<< HEAD
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(() => {
          fetchProfile(session.user.id);
        }, 0);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData: { full_name: string; role: 'client' | 'business' }) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: userData.full_name,
          role: userData.role
        }
      }
    });
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('No user logged in') };
    
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);
    
    if (!error && profile) {
      setProfile({ ...profile, ...updates });
    }
    
    return { error };
  };

  const value: AuthContextType = {
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile
=======
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
          business_description: userProfile.business_description
        };
        
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        
      } catch (dbError) {
        // Fallback to demo mode if user not found in database
        console.log('User not found in database, using demo mode');
        const mockUser: User = {
          id: 'mock-user-id',
          email,
          name: email.split('@')[0],
          role,
          avatar_url: undefined
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
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

  const switchRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    switchRole
>>>>>>> 6ae5ed6 (Sync changes to Lovable)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
<<<<<<< HEAD
};
=======
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
>>>>>>> 6ae5ed6 (Sync changes to Lovable)
