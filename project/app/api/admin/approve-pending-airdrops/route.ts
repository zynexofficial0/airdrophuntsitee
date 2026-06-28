import { NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase/server';

export async function POST() {
  const supabase = getServerSupabase();
  const { error } = await (supabase.from('submitted_airdrops') as any)
    .update({ status: 'live' })
    .eq('status', 'pending');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
