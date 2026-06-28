const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase env vars (NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY).');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const title = process.argv[2] || 'Test Article';
  console.log(`Searching for articles with title = "${title}"...`);

  const { data, error } = await supabase
    .from('submitted_articles')
    .select('id,article_title,excerpt')
    .eq('article_title', title);

  if (error) {
    console.error('Query error:', error);
    process.exit(1);
  }

  if (!data || data.length === 0) {
    console.log('No matching articles found. Trying fallback search by excerpt...');
    const { data: data2, error: err2 } = await supabase
      .from('submitted_articles')
      .select('id,article_title,excerpt')
      .ilike('excerpt', '%test excerpt%');
    if (err2) {
      console.error('Fallback query error:', err2);
      process.exit(1);
    }
    if (!data2 || data2.length === 0) {
      console.log('No articles found by fallback search. Nothing to delete.');
      return;
    }
    for (const row of data2) {
      console.log('Deleting (fallback match):', row.id, row.article_title);
      const { error: delErr } = await supabase.from('submitted_articles').delete().eq('id', row.id);
      if (delErr) console.error('Delete error:', delErr);
      else console.log('Deleted', row.id);
    }
    return;
  }

  for (const row of data) {
    console.log('Deleting:', row.id, row.article_title);
    const { error: delErr } = await supabase.from('submitted_articles').delete().eq('id', row.id);
    if (delErr) console.error('Delete error:', delErr);
    else console.log('Deleted', row.id);
  }
}

main().catch((e) => {
  console.error('Unexpected error:', e);
  process.exit(1);
});
