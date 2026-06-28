import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { itemType, id, status } = body as {
    itemType: 'article' | 'airdrop';
    id?: string;
    status?: string;
  };

  if (!itemType || !id || !status) {
    return NextResponse.json({ error: 'Missing itemType, id, or status' }, { status: 400 });
  }

  const table = itemType === 'article' ? 'submitted_articles' : 'submitted_airdrops';
  const supabase = getServerSupabase();

  const { error } = await (supabase.from(table) as any)
    .update({ status })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
