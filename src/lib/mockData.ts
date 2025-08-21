// Mock data for the application
export interface MockUser {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'user';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MockLead {
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
}

// Mock users
export const mockUsers: MockUser[] = [
  {
    id: 'admin-1',
    email: 'team.zenthra@gmail.com',
    full_name: 'Zenthra Admin',
    role: 'admin',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'admin-2',
    email: 'admin@zenthra.com',
    full_name: 'Admin User',
    role: 'admin',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Mock leads with sample data
export const mockLeads: MockLead[] = [
  {
    id: 'lead-1',
    name: 'John Smith',
    email: 'john.smith@techcorp.com',
    company: 'TechCorp Solutions',
    subject: 'Mobile App Development Inquiry',
    message: 'Hi, we are looking to develop a React Native mobile application for our e-commerce platform. We need both iOS and Android versions with features like user authentication, product catalog, shopping cart, and payment integration. Could you provide a quote and timeline?',
    status: 'new',
    priority: 'high',
    notes: 'Potential high-value client',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'lead-2',
    name: 'Sarah Johnson',
    email: 'sarah.j@startup.io',
    company: 'StartupIO',
    subject: 'Web Application Development',
    message: 'We need a modern web application built with React.js for our SaaS platform. The app should include user dashboard, analytics, subscription management, and API integrations. Looking for a full-stack solution.',
    status: 'contacted',
    priority: 'medium',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'lead-3',
    name: 'Michael Chen',
    email: 'mchen@healthtech.com',
    company: 'HealthTech Innovations',
    subject: 'Healthcare Mobile App',
    message: 'We want to create a healthcare mobile app for patient management. Features needed: appointment scheduling, medical records, telemedicine, and secure messaging. HIPAA compliance is essential.',
    status: 'qualified',
    priority: 'high',
    notes: 'Discussed requirements in detail. Ready to proceed with proposal.',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'lead-4',
    name: 'Emily Rodriguez',
    email: 'emily@financeapp.com',
    company: 'FinanceApp Ltd',
    subject: 'Fintech Application Development',
    message: 'Looking for a team to build a comprehensive fintech application with features like budget tracking, investment portfolio, bill payments, and financial analytics. Need both web and mobile versions.',
    status: 'converted',
    priority: 'high',
    notes: 'Project started. Contract signed.',
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'lead-5',
    name: 'David Wilson',
    email: 'david.wilson@retailco.com',
    company: 'RetailCo',
    subject: 'E-commerce Platform Upgrade',
    message: 'Our current e-commerce platform needs a complete overhaul. We want a modern, fast, and scalable solution with advanced features like AI recommendations, inventory management, and multi-vendor support.',
    status: 'new',
    priority: 'medium',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'lead-6',
    name: 'Lisa Thompson',
    email: 'lisa@edutech.org',
    company: 'EduTech Solutions',
    subject: 'Educational Platform Development',
    message: 'We need an online learning platform with video streaming, interactive quizzes, progress tracking, and certification system. The platform should support thousands of concurrent users.',
    status: 'contacted',
    priority: 'medium',
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'lead-7',
    name: 'Robert Kim',
    email: 'robert@logistics.com',
    subject: 'Logistics Management System',
    message: 'We require a comprehensive logistics management system for tracking shipments, managing inventory, route optimization, and real-time updates. Integration with existing ERP system is needed.',
    status: 'qualified',
    priority: 'low',
    created_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'lead-8',
    name: 'Amanda Foster',
    email: 'amanda@realestate.com',
    company: 'Foster Real Estate',
    subject: 'Real Estate Management App',
    message: 'Looking to develop a real estate management application with property listings, virtual tours, client management, and document handling. Both web and mobile versions required.',
    status: 'closed',
    priority: 'low',
    notes: 'Client decided to go with another vendor.',
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock authentication credentials
export const mockCredentials = {
  'team.zenthra@gmail.com': 'zenthra123',
  'admin@zenthra.com': 'admin123',
  'demo@zenthra.com': 'demo123',
};

// Helper functions for mock data
export const generateId = () => {
  return 'mock-' + Math.random().toString(36).substr(2, 9);
};

export const isAdminEmail = (email: string): boolean => {
  return email === 'team.zenthra@gmail.com' || email.endsWith('@zenthra.com');
};