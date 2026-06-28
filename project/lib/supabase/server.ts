import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseServerKey = supabaseServiceRoleKey ?? supabaseAnonKey;

export function getServerSupabase() {
  if (!supabaseUrl || !supabaseServerKey) {
    throw new Error(
      'Missing Supabase environment variables. Please ensure NEXT_PUBLIC_SUPABASE_URL and either SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY are set.'
    );
  }
  
  return createClient<Database>(supabaseUrl, supabaseServerKey, {
    auth: { persistSession: false },
  });
}
