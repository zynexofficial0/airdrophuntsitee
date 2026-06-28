import { getServerSupabase } from '@/lib/supabase/server';
import type { Article, Airdrop } from '@/types';

export async function getFeaturedAirdrops(limit = 6): Promise<Airdrop[]> {
  const supabase = getServerSupabase();
  const { data } = await supabase
    .from('submitted_airdrops')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(limit);
  return (data as unknown as Airdrop[]) ?? [];
}

export async function getLatestAirdrops(limit = 12): Promise<Airdrop[]> {
  const supabase = getServerSupabase();
  const { data } = await supabase
    .from('submitted_airdrops')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  return (data as unknown as Airdrop[]) ?? [];
}

export async function getAirdropBySlug(slug: string): Promise<Airdrop | null> {
  const supabase = getServerSupabase();
  const { data } = await supabase
    .from('submitted_airdrops')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  return (data as unknown as Airdrop) ?? null;
}

export async function getRelatedAirdrops(
  category: string,
  excludeId: string,
  limit = 3
): Promise<Airdrop[]> {
  const supabase = getServerSupabase();
  const { data } = await supabase
    .from('submitted_airdrops')
    .select('*')
    .eq('category', category)
    .neq('id', excludeId)
    .order('created_at', { ascending: false })
    .limit(limit);
  return (data as unknown as Airdrop[]) ?? [];
}

export async function getFeaturedArticles(limit = 4): Promise<Article[]> {
  const supabase = getServerSupabase();
  const { data } = await supabase
    .from('submitted_articles')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(limit);
  return (data as unknown as Article[]) ?? [];
}

export async function getLatestArticles(limit = 12): Promise<Article[]> {
  const supabase = getServerSupabase();
  const { data } = await supabase
    .from('submitted_articles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  return (data as unknown as Article[]) ?? [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = getServerSupabase();
  const { data } = await supabase
    .from('submitted_articles')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  return (data as unknown as Article) ?? null;
}

export async function getRelatedArticles(
  category: string,
  excludeId: string,
  limit = 3
): Promise<Article[]> {
  const supabase = getServerSupabase();
  const { data } = await supabase
    .from('submitted_articles')
    .select('*')
    .eq('category', category)
    .neq('id', excludeId)
    .order('created_at', { ascending: false })
    .limit(limit);
  return (data as unknown as Article[]) ?? [];
}

export async function getStats() {
  const supabase = getServerSupabase();
  const [airdropsRes, articlesRes, activeRes] = await Promise.all([
    supabase.from('submitted_airdrops').select('*', { count: 'exact', head: true }),
    supabase.from('submitted_articles').select('*', { count: 'exact', head: true }),
    supabase
      .from('submitted_airdrops')
      .select('*', { count: 'exact', head: true })
      .in('status', ['live', 'upcoming']),
  ]);
  return {
    airdrops: airdropsRes.count ?? 0,
    articles: articlesRes.count ?? 0,
    active: activeRes.count ?? 0,
  };
}

// Pagination queries
export async function getAirdropsWithPagination(
  page = 1,
  pageSize = 12,
  category?: string,
  status?: string,
  search?: string
): Promise<{ data: Airdrop[]; total: number; pages: number }> {
  const supabase = getServerSupabase();
  let query = supabase.from('submitted_airdrops').select('*', { count: 'exact' });

  if (category && category !== 'all') {
    query = query.eq('category', category);
  }
  if (status && status !== 'all') {
    query = query.eq('status', status);
  }
  if (search) {
    query = query.or(
      `project_name.ilike.%${search}%,short_description.ilike.%${search}%`
    );
  }

  const totalResult = await query;
  const total = totalResult.count ?? 0;
  const pages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;

  const { data } = await query
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })
    .range(start, start + pageSize - 1);

  return {
    data: (data as unknown as Airdrop[]) ?? [],
    total,
    pages,
  };
}

export async function getArticlesWithPagination(
  page = 1,
  pageSize = 12,
  category?: string,
  search?: string
): Promise<{ data: Article[]; total: number; pages: number }> {
  const supabase = getServerSupabase();
  let query = supabase.from('submitted_articles').select('*', { count: 'exact' });

  if (category && category !== 'all') {
    query = query.eq('category', category);
  }
  if (search) {
    query = query.or(
      `article_title.ilike.%${search}%,excerpt.ilike.%${search}%`
    );
  }

  const totalResult = await query;
  const total = totalResult.count ?? 0;
  const pages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;

  const { data } = await query
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })
    .range(start, start + pageSize - 1);

  return {
    data: (data as unknown as Article[]) ?? [],
    total,
    pages,
  };
}
