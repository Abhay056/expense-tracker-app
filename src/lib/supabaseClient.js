import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || supabaseUrl.includes('your_supabase_url') || !supabaseAnonKey || supabaseAnonKey.includes('your_supabase_anon_key')) {
  throw new Error("Supabase URL and anonymous key are required, and they must not be the placeholder values. Check your .env.local file.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
