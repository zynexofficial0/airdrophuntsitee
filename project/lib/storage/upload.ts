import { getBrowserSupabase } from '@/lib/supabase/client';

export async function uploadFile(
  bucket: 'article-logos' | 'airdrop-logos',
  file: File
): Promise<{ url: string; error: string | null }> {
  const supabase = getBrowserSupabase();

  const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    });

  console.log('Upload Data:', data);
  console.log('Upload Error:', error);

  if (error) {
    return {
      url: '',
      error: error.message,
    };
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return {
    url: publicUrlData.publicUrl,
    error: null,
  };
}

export function validateImageFile(file: File): string | null {
  const allowed = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp',
  ];

  if (!allowed.includes(file.type)) {
    return 'Only PNG, JPG and WEBP images are allowed.';
  }

  if (file.size > 4 * 1024 * 1024) {
    return 'Image must be under 4MB.';
  }

  return null;
}