import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://rxhbdawlubzntwhehavr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4aGJkYXdsdWJ6bnR3aGVoYXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3OTc3NTUsImV4cCI6MjA2NDM3Mzc1NX0.1EfZb2iBPKSO-2OYVpJ3jkZjjclR6v0hgQ0ncyGiw90";

export const supabase = createClient(supabaseUrl, supabaseKey);