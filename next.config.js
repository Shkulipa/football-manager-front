/** @type {import('next').NextConfig} */

const nextConfig = {
  async headers() {
    return [
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
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
