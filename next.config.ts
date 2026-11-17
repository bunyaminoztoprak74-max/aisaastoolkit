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
      { source: "/blog/best-press-release-distribution-services-2026", destination: "/blog/best-press-release-distribution-services", permanent: true },
      { source: "/vpn", destination: "https://www.jdoqocy.com/click-101761541-13756265", permanent: false },
      { source: "/pass", destination: "https://www.jdoqocy.com/click-101761541-17262576", permanent: false },
      { source: "/vps", destination: "https://www.dpbolvw.net/click-101761537-17226848", permanent: false },
      { source: "/surfshark", destination: "https://www.jdoqocy.com/click-101761541-15438547", permanent: false },
      { source: "/webinar", destination: "https://www.kqzyfj.com/click-101761541-17217347", permanent: false },
      // Official CJ YouTube Channel PIDs: CardBook AI (101930714) & Synthetica Code (101930717)
      { source: "/go/nordvpn", destination: "https://www.jdoqocy.com/click-101930714-13756265?sid=cardbook_yt_nordvpn", permanent: false },
      { source: "/go/nordpass", destination: "https://www.jdoqocy.com/click-101930714-17262576?sid=cardbook_yt_nordpass", permanent: false },
      { source: "/go/1password", destination: "https://www.anrdoezrs.net/click-101930714-17036393?sid=cardbook_yt_1password", permanent: false },
      { source: "/go/surfshark", destination: "https://www.jdoqocy.com/click-101930714-15438547?sid=cardbook_yt_surfshark", permanent: false },
      { source: "/go/hostinger-vps", destination: "https://www.dpbolvw.net/click-101930717-17226848?sid=synthetica_yt_vps", permanent: false },
      { source: "/go/1password-dev", destination: "https://www.anrdoezrs.net/click-101930717-17036393?sid=synthetica_yt_1pass", permanent: false },
      { source: "/go/nordvpn-dev", destination: "https://www.jdoqocy.com/click-101930717-13756265?sid=synthetica_yt_nordvpn", permanent: false },
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
