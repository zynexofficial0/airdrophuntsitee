// Performance monitoring utilities

export function reportWebVitals(metric: {
  name: string;
  value: number;
  id: string;
  label: string;
}) {
  // Send to analytics service
  if (process.env.NEXT_PUBLIC_ANALYTICS_ID) {
    console.log('[v0] Web Vital:', metric);
  }
}

export function optimizeImage(url: string, width: number, height?: number) {
  // Vercel Image Optimization if using Vercel
  if (process.env.NEXT_PUBLIC_SITE_URL?.includes('vercel.app')) {
    const params = new URLSearchParams();
    params.set('url', url);
    params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    params.set('q', '75'); // Quality
    return `/_next/image?${params.toString()}`;
  }
  return url;
}

export function generateImageSrcSet(
  url: string,
  widths: number[] = [640, 1024, 1920]
) {
  return widths.map((w) => `${optimizeImage(url, w)} ${w}w`).join(', ');
}

// Cache strategies
export const cacheConfig = {
  articles: {
    revalidate: 3600, // 1 hour
  },
  airdrops: {
    revalidate: 1800, // 30 minutes
  },
  stats: {
    revalidate: 300, // 5 minutes
  },
};
