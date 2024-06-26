/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'red-team-product.vercel.app'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

module.exports = nextConfig;
