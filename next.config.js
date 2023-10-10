/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack(config) {
    config.resolve.fallback = {
      fs: false, // the solution
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'football-manager-dev.s3.eu-central-1.amazonaws.com',
        pathname: '/public/**',
      },
    ],
  },
}

module.exports = nextConfig
