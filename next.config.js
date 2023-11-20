/** @type {import('next').NextConfig} */
// const nodeExternals = require('webpack-node-externals');

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
  webpack(config, { isServer }) {
    config.resolve.fallback = {
      fs: false, // the solution
    };

    if (!isServer) {
      config.externals.push({ bufferutil: "bufferutil", "utf-8-validate": "utf-8-validate", "supports-color": "supports-color" }); 
    }

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'football-manager-dev.s3.eu-central-1.amazonaws.com',
        pathname: '/public/**',
      },
      {
        protocol: 'https',
        hostname: 'football-manager-staging.s3.eu-central-1.amazonaws.com',
        pathname: '/public/**',
      },
      {
        protocol: 'https',
        hostname: 'football-manager-prod.s3.eu-central-1.amazonaws.com',
        pathname: '/public/**',
      },
    ],
  },
}

module.exports = nextConfig
