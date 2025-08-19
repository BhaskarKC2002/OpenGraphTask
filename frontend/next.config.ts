import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true,
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:4000'
  }
};

export default nextConfig;


