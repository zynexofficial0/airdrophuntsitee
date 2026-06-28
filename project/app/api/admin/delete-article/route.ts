import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, slug, title } = body as { id?: string; slug?: string; title?: string };

  if (!id && !slug && !title) {
    return NextResponse.json({ error: 'Missing id, slug, or title' }, { status: 400 });
  }

  const supabase = getServerSupabase();
  let query = (supabase.from('submitted_articles') as any).delete();

  if (id) query = query.eq('id', id);
  else if (slug) query = query.eq('slug', slug);
  else if (title) query = query.eq('article_title', title);

  const { error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
