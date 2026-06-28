import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const siteName = 'Airdrop Hunt';

export function generateMeta(options: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
}): Metadata {
  const title = options.title ? `${options.title} — ${siteName}` : siteName;
  const description =
    options.description ||
    'Discover the best crypto airdrops, guides, and Web3 opportunities';
  const image = options.image || `${baseUrl}/og-image.png`;
  const url = options.url || baseUrl;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: options.type || 'website',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@airdrophunt',
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  };
}

export function generateArticleMeta(article: any): Metadata {
  return generateMeta({
    title: article.article_title,
    description: article.excerpt,
    image: article.article_logo_url,
    url: `${baseUrl}/articles/${article.slug}`,
    type: 'article',
    author: article.author,
    publishedDate: article.created_at,
    modifiedDate: article.updated_at,
  });
}

export function generateAirdropMeta(airdrop: any): Metadata {
  return generateMeta({
    title: `${airdrop.project_name} Airdrop`,
    description: airdrop.short_description,
    image: airdrop.logo_url,
    url: `${baseUrl}/airdrops/${airdrop.slug}`,
    type: 'website',
  });
}
