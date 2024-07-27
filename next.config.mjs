/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  ...(process.env.NODE_ENV !== "production" && {
    cacheMaxMemorySize: 0,
  }),
};

export default nextConfig;
