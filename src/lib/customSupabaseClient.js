import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tecjzkflbdnujgvarypr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlY2p6a2ZsYmRudWpndmFyeXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwODQyMjMsImV4cCI6MjA3MjY2MDIyM30.Qk2XCF9EosO_y1xzp7D47PmCfHtEWOXdRzR2ocVTHQk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);