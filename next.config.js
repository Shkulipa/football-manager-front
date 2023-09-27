/** @type {import('next').NextConfig} */

const nextConfig = {
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
