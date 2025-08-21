/*
  # Ultra-minimal user authentication setup

  1. New Tables
    - `users` table with basic fields
  2. Security
    - Enable RLS on users table
    - Basic user policies
*/

-- Step 1: Create enum type
CREATE TYPE user_role AS ENUM ('admin', 'user');

-- Step 2: Create table without foreign key first
CREATE TABLE users (
  id uuid PRIMARY KEY,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role user_role DEFAULT 'user' NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Step 3: Add foreign key constraint separately
ALTER TABLE users ADD CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Step 4: Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Step 5: Create basic policies
CREATE POLICY "Users can read own data" ON users FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can insert own data" ON users FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Step 6: Create minimal indexes
CREATE INDEX idx_users_email ON users(email);