/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    optimizePackageImports: [
      "@mantine/core",
      "@mantine/hooks",
      "@mantine/notifications",
      "@mantine/tiptap",
      "@mantine/code-highlight",
    ],
  },
  ...(process.env.NODE_ENV !== "production" && {
    cacheMaxMemorySize: 0,
  }),
};

export default nextConfig;
