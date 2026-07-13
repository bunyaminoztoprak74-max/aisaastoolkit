import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: false },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    // Keep Vercel Image Optimization transformations and cache writes at zero.
    // Existing assets are served directly from their source/CDN URLs.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/compare/n8n-vs-make-com", destination: "/compare/n8n-vs-make", permanent: true },
      { source: "/compare/make-com-vs-n8n", destination: "/compare/n8n-vs-make", permanent: true },
      { source: "/compare/make-com-vs-zapier", destination: "/compare/make-vs-zapier", permanent: true },
      { source: "/compare/zapier-vs-make-com", destination: "/compare/make-vs-zapier", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
