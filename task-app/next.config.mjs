/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  experimental: {
    nodeMiddleware: true,
    cacheComponents: true,
  },
};

export default nextConfig;
