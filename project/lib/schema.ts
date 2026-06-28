export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Airdrop Hunt',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/logo.png`,
    description: 'Discover the best crypto airdrops, guides, and Web3 opportunities',
    sameAs: [
      'https://twitter.com/airdrophunt',
      'https://discord.gg/airdrophunt',
    ],
  };
}

export function generateArticleSchema(article: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.article_title,
    description: article.excerpt,
    image: article.article_logo_url,
    datePublished: article.created_at,
    dateModified: article.updated_at,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Airdrop Hunt',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      },
    },
  };
}

export function generateAirdropSchema(airdrop: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Thing',
    name: airdrop.project_name,
    description: airdrop.short_description,
    image: airdrop.logo_url,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/airdrops/${airdrop.slug}`,
    offers: {
      '@type': 'Offer',
      description: airdrop.reward_info,
      availability: airdrop.status === 'live' ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
