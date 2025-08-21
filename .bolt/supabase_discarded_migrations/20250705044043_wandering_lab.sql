/*
  # Create leads table

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `company` (text, optional)
      - `subject` (text, required)
      - `message` (text, required)
      - `status` (enum: new, contacted, qualified, converted, closed)
      - `priority` (enum: low, medium, high)
      - `notes` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `leads` table
    - Add policy for public to insert leads (contact form)
    - Add policy for admins to manage all leads

  3. Indexes
    - Performance indexes for common queries
*/

-- Create lead status enum
DO $$ BEGIN
  CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'qualified', 'converted', 'closed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create lead priority enum
DO $$ BEGIN
  CREATE TYPE lead_priority AS ENUM ('low', 'medium', 'high');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  subject text NOT NULL,
  message text NOT NULL,
  status lead_status DEFAULT 'new' NOT NULL,
  priority lead_priority DEFAULT 'medium' NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public can insert leads" ON leads;
DROP POLICY IF EXISTS "Admins can manage all leads" ON leads;

-- Allow public to insert leads (for contact form)
CREATE POLICY "Public can insert leads"
  ON leads
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow admins to manage all leads
CREATE POLICY "Admins can manage all leads"
  ON leads
  FOR ALL
  TO authenticated
  USING (
    (jwt() ->> 'email') LIKE '%@zenthra.com' OR 
    (jwt() ->> 'email') = 'team.zenthra@gmail.com'
  )
  WITH CHECK (
    (jwt() ->> 'email') LIKE '%@zenthra.com' OR 
    (jwt() ->> 'email') = 'team.zenthra@gmail.com'
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_priority ON leads(priority);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);