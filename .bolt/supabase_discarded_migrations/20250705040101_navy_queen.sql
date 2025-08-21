/*
  # Ultra-minimal user setup

  1. Check and create enum type if needed
  2. Check and create users table if needed  
  3. Enable RLS if not already enabled
  4. Create basic policy if not exists

  This migration uses existence checks to avoid conflicts and timeouts.
*/

-- Check if enum exists, create if not
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('admin', 'user');
    END IF;
END $$;

-- Check if table exists, create if not
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
        CREATE TABLE users (
            id uuid PRIMARY KEY,
            email text,
            role user_role DEFAULT 'user'
        );
    END IF;
END $$;

-- Enable RLS if not already enabled
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables 
        WHERE tablename = 'users' 
        AND rowsecurity = true
    ) THEN
        ALTER TABLE users ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Create policy if not exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'users' 
        AND policyname = 'Users can manage own data'
    ) THEN
        CREATE POLICY "Users can manage own data" ON users USING (auth.uid() = id);
    END IF;
END $$;