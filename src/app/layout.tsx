import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buildWebsiteSchema, buildOrganizationSchema } from "@/lib/schema";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aisaastoolkit.com"),
  title: {
    default:  "AISaaSToolkit — Best AI Tools Reviews & Comparisons 2026",
    template: "%s | AISaaSToolkit",
  },
  description: "Independent reviews, comparisons, and rankings of the best AI SaaS tools in 2026. Find the right AI automation, writing, video, and SEO tools for your business.",
  keywords: ["AI tools", "AI SaaS", "AI software reviews", "best AI tools 2026"],
  authors:  [{ name: "AISaaSToolkit", url: "https://aisaastoolkit.com" }],
  creator:  "AISaaSToolkit",
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         "https://aisaastoolkit.com",
    siteName:    "AISaaSToolkit",
    title:       "AISaaSToolkit — Best AI Tools Reviews & Comparisons 2026",
    description: "Independent reviews of the best AI SaaS tools in 2026.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AISaaSToolkit" }],
  },
  twitter: {
    card:    "summary_large_image",
    title:   "AISaaSToolkit — Best AI Tools Reviews 2026",
    description: "Independent reviews of the best AI SaaS tools.",
    images:  ["/og-image.png"],
    creator: "@aisaastoolkit",
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "https://aisaastoolkit.com",
    types: { "application/rss+xml": "https://aisaastoolkit.com/rss.xml" },
  },
  verification: { google: "5ohBL0LIn4yreUDqDR2pyyQFTNzWnETvfoL28IMuB2s", other: { "impact-site-verification": "9a632d0c-9256-4ce7-a867-85b4082fd0b7" } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteSchema      = buildWebsiteSchema();
  const organizationSchema = buildOrganizationSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="alternate" type="application/rss+xml" title="AISaaSToolkit Deals RSS" href="/affiliate-rss.xml" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        {/* Pinterest Domain Verification */}
        <meta name="p:domain_verify" content="d81dd21cca48c3f16117fdf2d454d8d2" />
        {/* Google Analytics 4 */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-M9VX88TN0M" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {"window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-M9VX88TN0M');"}
        </Script>
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
