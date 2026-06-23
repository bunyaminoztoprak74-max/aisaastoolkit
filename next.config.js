/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: false },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
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

module.exports = nextConfig;
