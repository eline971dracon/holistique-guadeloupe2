/*
  # Disable RLS for Custom Authentication
  
  1. Changes
    - Disable RLS on `therapists` table to allow custom authentication
    - Disable RLS on `creators` table to allow custom authentication
  
  2. Notes
    - This is necessary because we're using custom password authentication
    - NOT using Supabase Auth (auth.users)
    - Application handles authentication via password column in tables
    - RLS policies checking JWT email won't work with custom auth
*/

ALTER TABLE therapists DISABLE ROW LEVEL SECURITY;
ALTER TABLE creators DISABLE ROW LEVEL SECURITY;
