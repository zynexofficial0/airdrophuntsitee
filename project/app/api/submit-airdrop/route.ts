import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const {
    project_name,
    short_description,
    full_description,
    participation_steps,
    category,
    chain,
    reward_info,
    start_date,
    end_date,
    website_url,
    twitter_url,
    telegram_url,
    discord_url,
    logo_url,
    submitter_name,
    status,
    featured,
    slug,
  } = body as {
    project_name: string;
    short_description: string;
    full_description: string;
    participation_steps: string;
    category: string;
    chain: string;
    reward_info: string;
    start_date: string | null;
    end_date: string | null;
    website_url: string | null;
    twitter_url: string | null;
    telegram_url: string | null;
    discord_url: string | null;
    logo_url: string;
    submitter_name: string;
    status: string;
    featured: boolean;
    slug: string;
  };

  const supabase = getServerSupabase();
  const { error } = await (supabase.from('submitted_airdrops') as any).insert({
    project_name,
    short_description,
    full_description,
    participation_steps,
    category,
    chain,
    reward_info,
    start_date,
    end_date,
    website_url,
    twitter_url,
    telegram_url,
    discord_url,
    logo_url,
    submitter_name,
    status,
    featured,
    slug,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
