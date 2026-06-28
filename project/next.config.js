/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
  compress: true,
  webpack(config) {
    config.ignoreWarnings = config.ignoreWarnings || [];
    config.ignoreWarnings.push({
      message: /Critical dependency: the request of a dependency is an expression/,
      module: /@supabase[\\/]realtime-js/,
    });
    return config;
  },
};

module.exports = nextConfig;
