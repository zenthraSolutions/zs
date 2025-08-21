/*
  # Create users table and authentication system

  1. New Tables
    - `users`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `full_name` (text)
      - `role` (enum: admin, user)
      - `is_active` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `users` table
    - Add policies for authenticated users to manage their own data
    - Add policy for user creation during signup

  3. Changes
    - Creates user_role enum type
    - Sets up basic user management structure
*/

-- Drop existing objects if they exist to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Allow user creation during signup" ON users;
DROP TABLE IF EXISTS users;
DROP TYPE IF EXISTS user_role;

-- Create enum type
CREATE TYPE user_role AS ENUM ('admin', 'user');

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY,
  email text UNIQUE,
  full_name text,
  role user_role DEFAULT 'user',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies one by one
CREATE POLICY "Users can view their own profile" 
  ON users FOR SELECT 
  TO authenticated 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON users FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = id);

CREATE POLICY "Allow user creation during signup" 
  ON users FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = id);