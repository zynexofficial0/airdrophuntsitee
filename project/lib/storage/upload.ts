import { getBrowserSupabase } from '@/lib/supabase/client';

export async function uploadFile(
  bucket: 'article-logos' | 'airdrop-logos',
  file: File
): Promise<{ url: string; error: string | null }> {
  const supabase = getBrowserSupabase();
  const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;

  const { error } = await supabase.storage.from(bucket).upload(fileName, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type,
  });

  if (error) {
    const message = error.message.toLowerCase().includes('bucket')
      ? `Storage bucket "${bucket}" is not available. Create the bucket in Supabase Storage or check your migration setup.`
      : error.message;
    return { url: '', error: message };
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
  if (!data?.publicUrl) {
    return { url: '', error: 'Failed to generate a public URL for the uploaded file.' };
  }

  return { url: data.publicUrl, error: null };
}

export function validateImageFile(file: File): string | null {
  const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  if (!allowed.includes(file.type)) {
    return 'Only PNG, JPG, and WEBP files are allowed.';
  }
  if (file.size > 4 * 1024 * 1024) {
    return 'File size must be under 4MB.';
  }
  return null;
}
