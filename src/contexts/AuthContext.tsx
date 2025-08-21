import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';
import { mockCredentials, isAdminEmail, generateId } from '../lib/mockData';
import Creds from "../../creds.ts";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'user';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  // Legacy methods for backward compatibility
  login: (username: string, password: string) => Promise<boolean>;
  logout: (check: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check if Supabase is properly configured
  const isSupabaseConfigured = () => {
    return Creds.VITE_SUPABASE_URL &&
        Creds.VITE_SUPABASE_ANON_KEY &&
        Creds.VITE_SUPABASE_URL !== 'your_supabase_url_here';
  };

  // Fallback to mock authentication if Supabase is not configured
  const useMockAuth = !isSupabaseConfigured();

  // Mock user state for fallback
  const [mockUser, setMockUser] = useState<UserProfile | null>(null);

  // Add some default demo credentials to mock data
  useEffect(() => {
    if (useMockAuth) {
      // Ensure demo credentials exist in mock data
      (mockCredentials as any)['admin@zenthra.com'] = 'zenthra123';
      (mockCredentials as any)['team.zenthra@gmail.com'] = 'zenthra123';
    }
  }, [useMockAuth]);

  // Fetch user profile from Supabase
  const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data as UserProfile;
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return null;
    }
  };

  // Create user profile if it doesn't exist
  const createUserProfile = async (user: User): Promise<UserProfile | null> => {
    try {
      const isAdminEmail = user.email?.endsWith('@zenthra.com') || user.email === 'team.zenthra@gmail.com';

      const userData = {
        id: user.id,
        email: user.email!,
        full_name: user.user_metadata?.full_name || user.email!.split('@')[0],
        role: isAdminEmail ? 'admin' as const : 'user' as const,
        is_active: true
      };

      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single();

      if (error) {
        console.error('Error creating user profile:', error);
        return null;
      }

      return data as UserProfile;
    } catch (error) {
      console.error('Error in createUserProfile:', error);
      return null;
    }
  };

  // Initialize auth state
  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout | null = null;

    const initializeAuth = async () => {
      try {
        // Set a timeout to prevent infinite loading
        timeoutId = setTimeout(() => {
          if (mounted) {
            console.log('Auth initialization timeout after 5 seconds, forcing loading to false');
            setLoading(false);
          }
        }, 3000); // 3 second timeout

        if (useMockAuth) {
          console.log('Using mock authentication');
          // Use mock authentication
          const storedUser = localStorage.getItem('mockUser');
          if (storedUser && mounted) {
            try {
              const userData = JSON.parse(storedUser);
              setMockUser(userData);
              setUserProfile(userData);
            } catch (error) {
              console.error('Error parsing stored user data:', error);
              localStorage.removeItem('mockUser');
            }
          }
          if (mounted) setLoading(false);
          if (timeoutId) clearTimeout(timeoutId);
          timeoutId = null;
          return;
        }

        console.log('Using Supabase authentication');
        // Use Supabase authentication
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Error getting session:', error);
          if (mounted) setLoading(false);
          if (timeoutId) clearTimeout(timeoutId);
          timeoutId = null;
          return;
        }

        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
        }

        if (session?.user && mounted) {
          let profile = await fetchUserProfile(session.user.id);

          // If profile doesn't exist, create it
          if (!profile) {
            console.log('User profile not found, creating new profile...');
            profile = await createUserProfile(session.user);
          }

          if (mounted) {
            setUserProfile(profile);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted) setLoading(false);
      } finally {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
          setLoading(false);
        }
      }
    };

    initializeAuth();

    if (!useMockAuth) {
      // Listen for auth changes only if Supabase is configured
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log('Auth state changed:', event, session?.user?.email);

          if (mounted) {
            setSession(session);
            setUser(session?.user ?? null);
          }

          if (session?.user && mounted) {
            let profile = await fetchUserProfile(session.user.id);

            // If profile doesn't exist, create it
            if (!profile) {
              console.log('User profile not found, creating new profile...');
              profile = await createUserProfile(session.user);
            }

            if (mounted) {
              setUserProfile(profile);
            }
          } else if (mounted) {
            setUserProfile(null);
          }

          if (mounted) {
            setLoading(false);
          }
        },
        { debug: true } // Enable debug mode for auth state changes
      );

      return () => {
        mounted = false;
        if (timeoutId) clearTimeout(timeoutId);
        subscription.unsubscribe();
      };
    }

    return () => {
      mounted = false;
      if (timeoutId) { clearTimeout(timeoutId); timeoutId = null; }
    };
  }, [useMockAuth]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);

      if (useMockAuth) {
        console.log('Mock sign in attempt for:', email);
        // Mock authentication
        if (mockCredentials[email as keyof typeof mockCredentials] !== password) {
          return { error: new Error('Invalid email or password') };
        }

        const userData: UserProfile = {
          id: generateId(),
          email,
          full_name: email.split('@')[0],
          role: isAdminEmail(email) ? 'admin' : 'user',
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        setMockUser(userData);
        setUserProfile(userData);
        localStorage.setItem('mockUser', JSON.stringify(userData));

        return { error: null };
      }

      console.log('Supabase sign in attempt for:', email);
      // Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        return { error };
      }

      console.log('Sign in successful:', data.user?.email);
      // The auth state change listener will handle setting the user profile
      return { error: null };
    } catch (error) {
      console.error('Sign in exception:', error);
      return { error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true);

      if (useMockAuth) {
        console.log('Mock sign up attempt for:', email);
        // Mock authentication
        const userData: UserProfile = {
          id: generateId(),
          email,
          full_name: fullName,
          role: isAdminEmail(email) ? 'admin' : 'user',
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        // Add to mock credentials
        (mockCredentials as any)[email] = password;

        setMockUser(userData);
        setUserProfile(userData);
        localStorage.setItem('mockUser', JSON.stringify(userData));

        return { error: null };
      }

      console.log('Supabase sign up attempt for:', email);
      // Supabase authentication
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        console.error('Sign up error:', error);
        return { error };
      }

      console.log('Sign up successful:', data.user?.email);
      return { error: null };
    } catch (error) {
      console.error('Sign up exception:', error);
      return { error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);

      if (useMockAuth) {
        // Mock authentication
        setMockUser(null);
        setUserProfile(null);
        localStorage.removeItem('mockUser');
        // Clear all possible auth-related localStorage items
        localStorage.clear();
        return;
      }

      // Supabase authentication
      await supabase.auth.signOut();

      // Force clear all state
      setUser(null);
      setUserProfile(null);
      setSession(null);

      // Clear any localStorage items
      localStorage.clear();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  // Legacy methods for backward compatibility
  const login = async (username: string, password: string): Promise<boolean> => {
    if (username === 'admin' && password === 'zenthra2024') {
      try {
        const { error } = await signIn('team.zenthra@gmail.com', 'zenthra123');
        return !error;
      } catch (error) {
        console.error('Demo login error:', error);
        return false;
      }
    }

    return false;
  };

  const logout = (passwordUpdated = false) => {
    signOut().then(() => {
      // Force page reload to ensure clean state
      if (passwordUpdated) {
        window.location.href = '/admin?passwordUpdated=true';
      } else {
        window.location.href = '/admin';
      }
    });
  };

  const isAuthenticated = useMockAuth ? !!mockUser : !!user;
  const isAdmin = userProfile?.role === 'admin' && userProfile?.is_active === true;

  console.log('Auth context state:', {
    useMockAuth,
    isAuthenticated,
    isAdmin,
    loading,
    userEmail: useMockAuth ? mockUser?.email : user?.email,
    profileRole: userProfile?.role
  });

  return (
    <AuthContext.Provider value={{
      user: useMockAuth ? (mockUser as any) : user,
      userProfile,
      session: useMockAuth ? (mockUser ? { user: mockUser } as any : null) : session,
      isAuthenticated,
      isAdmin,
      loading,
      signIn,
      signUp,
      signOut,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
