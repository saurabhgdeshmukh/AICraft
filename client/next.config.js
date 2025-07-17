/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'https://aicraft-8hlm.onrender.com/api/auth/:path*',
      },
    ];
  },
};

module.exports = nextConfig; 