import { createClient } from '@supabase/supabase-js';
import Creds from '../../creds.ts'

const supabaseUrl = Creds.VITE_SUPABASE_URL;
const supabaseAnonKey = Creds.VITE_SUPABASE_ANON_KEY;

let supabase: any;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Please set up Supabase connection.');
  // Create a mock client for development
  supabase = {
    auth: {
      signUp: () => Promise.resolve({ error: new Error('Supabase not configured') }),
      signInWithPassword: () => Promise.resolve({ error: new Error('Supabase not configured') }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({ single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }) }),
        order: () => Promise.resolve({ data: [], error: new Error('Supabase not configured') })
      }),
      insert: () => ({
        select: () => ({ single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }) })
      }),
      update: () => ({
        eq: () => ({
          select: () => ({ single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }) })
        })
      }),
      delete: () => ({ eq: () => Promise.resolve({ error: new Error('Supabase not configured') }) }),
    }),
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: 'admin' | 'user';
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          role?: 'admin' | 'user';
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          role?: 'admin' | 'user';
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      leads: {
        Row: {
          id: string;
          name: string;
          email: string;
          company?: string;
          subject: string;
          message: string;
          status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
          priority: 'low' | 'medium' | 'high';
          notes?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          company?: string;
          subject: string;
          message: string;
          status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
          priority?: 'low' | 'medium' | 'high';
          notes?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          company?: string;
          subject?: string;
          message?: string;
          status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
          priority?: 'low' | 'medium' | 'high';
          notes?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
