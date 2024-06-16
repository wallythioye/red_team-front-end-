/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'red-team-product.vercel.app'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    BACKEND_URL: process.env.BACKEND_URL,
  },
};

module.exports = nextConfig;
