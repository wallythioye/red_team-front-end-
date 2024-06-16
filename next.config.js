/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'red-team-hb6hk7c1a-wallys-projects-1e1cb157.vercel.app'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    BACKEND_URL: process.env.BACKEND_URL,
  },
};

module.exports = nextConfig;
