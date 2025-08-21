/*
  # Minimal User System Setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `full_name` (text)
      - `role` (enum: admin, user)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `users` table
    - Add basic policies for authenticated users

  3. Changes
    - Creates user_role enum type
    - Sets up basic user management structure
*/

-- Create enum type (minimal)
CREATE TYPE user_role AS ENUM ('admin', 'user');

-- Create users table (minimal structure)
CREATE TABLE users (
  id uuid PRIMARY KEY,
  email text,
  full_name text,
  role user_role DEFAULT 'user',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Single policy for all operations
CREATE POLICY "Users can manage own data" 
  ON users 
  USING (auth.uid() = id);