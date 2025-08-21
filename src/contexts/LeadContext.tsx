import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Creds from "../../creds.ts";

export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

interface LeadContextType {
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'priority'>) => Promise<void>;
  updateLead: (id: string, updates: Partial<Lead>) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  getLeadById: (id: string) => Lead | undefined;
  getLeadsByStatus: (status: Lead['status']) => Lead[];
  searchLeads: (query: string) => Lead[];
  loading: boolean;
  error: string | null;
  fetchLeads: () => Promise<void>;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export const useLead = () => {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error('useLead must be used within a LeadProvider');
  }
  return context;
};

interface LeadProviderProps {
  children: React.ReactNode;
}

// Helper function to convert database lead to Lead interface
const dbLeadToLead = (dbLead: any): Lead => ({
  id: dbLead.id,
  name: dbLead.name,
  email: dbLead.email,
  company: dbLead.company,
  subject: dbLead.subject,
  message: dbLead.message,
  status: dbLead.status,
  priority: dbLead.priority,
  notes: dbLead.notes,
  createdAt: new Date(dbLead.created_at),
  updatedAt: new Date(dbLead.updated_at),
});

// Helper function to convert Lead to database format
const leadToDbLead = (lead: Partial<Lead>) => ({
  name: lead.name,
  email: lead.email,
  company: lead.company,
  subject: lead.subject,
  message: lead.message,
  status: lead.status,
  priority: lead.priority,
  notes: lead.notes,
});

export const LeadProvider: React.FC<LeadProviderProps> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check if Supabase is properly configured
  const isSupabaseConfigured = () => {
    return Creds.VITE_SUPABASE_URL &&
        Creds.VITE_SUPABASE_ANON_KEY &&
        Creds.VITE_SUPABASE_URL !== 'your_supabase_url_here';
  };

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!isSupabaseConfigured()) {
        // Fallback to mock data if Supabase is not configured
        const { mockLeads } = await import('../lib/mockData');
        const formattedLeads = mockLeads.map(mockLead => ({
          id: mockLead.id,
          name: mockLead.name,
          email: mockLead.email,
          company: mockLead.company,
          subject: mockLead.subject,
          message: mockLead.message,
          status: mockLead.status,
          priority: mockLead.priority,
          notes: mockLead.notes,
          createdAt: new Date(mockLead.created_at),
          updatedAt: new Date(mockLead.updated_at),
        }));
        setLeads(formattedLeads);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      const formattedLeads = (data || []).map(dbLeadToLead);
      setLeads(formattedLeads);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch leads';
      setError(errorMessage);
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load leads on component mount
  useEffect(() => {
    fetchLeads();
  }, []);

  const addLead = async (leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'priority'>) => {
    try {
      setLoading(true);
      setError(null);

      if (!isSupabaseConfigured()) {
        throw new Error('Supabase is not configured. Please set up your database connection.');
      }

      const newLeadData = {
        ...leadToDbLead({
          ...leadData,
          status: 'new' as const,
          priority: 'medium' as const,
        }),
      };

      const { data, error: insertError } = await supabase
        .from('leads')
        .insert([newLeadData])
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      const newLead = dbLeadToLead(data);
      setLeads(prev => [newLead, ...prev]);

      console.log('Lead added successfully:', newLead);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add lead';
      setError(errorMessage);
      console.error('Error adding lead:', err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateLead = async (id: string, updates: Partial<Lead>) => {
    try {
      setLoading(true);
      setError(null);

      if (!isSupabaseConfigured()) {
        throw new Error('Supabase is not configured. Please set up your database connection.');
      }

      const updateData = leadToDbLead(updates);

      const { data, error: updateError } = await supabase
        .from('leads')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      const updatedLead = dbLeadToLead(data);
      setLeads(prev => prev.map(lead =>
        lead.id === id ? updatedLead : lead
      ));

      console.log('Lead updated successfully:', id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update lead';
      setError(errorMessage);
      console.error('Error updating lead:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteLead = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      if (!isSupabaseConfigured()) {
        throw new Error('Supabase is not configured. Please set up your database connection.');
      }

      const { error: deleteError } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);

      if (deleteError) {
        throw deleteError;
      }

      setLeads(prev => prev.filter(lead => lead.id !== id));

      console.log('Lead deleted successfully:', id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete lead';
      setError(errorMessage);
      console.error('Error deleting lead:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getLeadById = (id: string) => {
    return leads.find(lead => lead.id === id);
  };

  const getLeadsByStatus = (status: Lead['status']) => {
    return leads.filter(lead => lead.status === status);
  };

  const searchLeads = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return leads.filter(lead =>
      lead.name.toLowerCase().includes(lowercaseQuery) ||
      lead.email.toLowerCase().includes(lowercaseQuery) ||
      lead.company?.toLowerCase().includes(lowercaseQuery) ||
      lead.subject.toLowerCase().includes(lowercaseQuery) ||
      lead.message.toLowerCase().includes(lowercaseQuery)
    );
  };

  return (
    <LeadContext.Provider value={{
      leads,
      addLead,
      updateLead,
      deleteLead,
      getLeadById,
      getLeadsByStatus,
      searchLeads,
      loading,
      error,
      fetchLeads,
    }}>
      {children}
    </LeadContext.Provider>
  );
};
