import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string | undefined;
const supabaseServerKey = supabaseServiceRoleKey ?? supabaseAnonKey;

export function getServerSupabase() {
  return createClient<Database>(supabaseUrl, supabaseServerKey, {
    auth: { persistSession: false },
  });
}
