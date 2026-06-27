/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
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
