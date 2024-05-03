import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mnwefvnykbgyhbdzpleh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ud2Vmdm55a2JneWhiZHpwbGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNzQ3MzQsImV4cCI6MjAyODg1MDczNH0.tnHysd1LqayzpQ1L-PImcvlkUmkNvocpMS7tS-hYZNg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);