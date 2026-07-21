import Link from "next/link";
import { Zap, Twitter, Youtube, Linkedin, Mail, Rss } from "lucide-react";
import { SearchBar } from "@/components/search/SearchBar";
import { Suspense } from "react";

const footerLinks = {
  "AI Tools": [
    { label: "All AI Tools",          href: "/tools" },
    { label: "AI Automation Tools",   href: "/category/ai-automation" },
    { label: "AI Writing Tools",      href: "/category/ai-writing" },
    { label: "AI Video Tools",        href: "/category/ai-video" },
    { label: "Browse by Tag",         href: "/tags" },
  ],
  "Top Reviews": [
    { label: "Claude Review",      href: "/reviews/claude" },
    { label: "ChatGPT Review",     href: "/reviews/chatgpt" },
    { label: "ElevenLabs Review",  href: "/reviews/elevenlabs" },
    { label: "Jasper Review",      href: "/reviews/jasper" },
    { label: "Make.com Review",    href: "/reviews/make-com" },
  ],
  "Comparisons": [
    { label: "Claude vs ChatGPT",       href: "/compare/claude-vs-chatgpt" },
    { label: "Make.com vs Zapier",      href: "/compare/make-vs-zapier" },
    { label: "Claude vs Perplexity",    href: "/compare/claude-vs-perplexity" },
    { label: "Midjourney vs Canva AI",  href: "/compare/midjourney-vs-canva-ai" },
    { label: "Grammarly vs ChatGPT",    href: "/compare/grammarly-vs-chatgpt" },
  ],
  "Best Lists": [
    { label: "Best Writing Tools",      href: "/best/ai-writing-tools" },
    { label: "Best Automation Tools",   href: "/best/ai-automation-tools" },
    { label: "Best Image Generators",   href: "/best/ai-image-generators" },
    { label: "Best Productivity Tools", href: "/best/ai-productivity-tools" },
    { label: "Best Marketing Tools",    href: "/best/ai-marketing-tools" },
  ],
  "Company": [
    { label: "About",                href: "/about" },
    { label: "Contact",              href: "/contact" },
    { label: "Privacy Policy",       href: "/privacy" },
    { label: "Terms of Service",     href: "/terms" },
    { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 pb-10 border-b border-border">
          {/* Brand + search */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#667eea,#764ba2)" }}>
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="gradient-text">AISaaSToolkit</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-4">
              Independent reviews and comparisons of the best AI SaaS tools in 2026.
            </p>
            <Suspense>
              <SearchBar size="sm" navigateOnSearch placeholder="Search tools…" className="max-w-xs mb-4" />
            </Suspense>
            <div className="flex items-center gap-3">
              {[
                { href: "https://twitter.com", icon: Twitter,  label: "Twitter" },
                { href: "https://youtube.com", icon: Youtube,  label: "YouTube" },
                { href: "https://linkedin.com",icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:hello@aisaastoolkit.com", icon: Mail, label: "Email" },
                { href: "/rss.xml", icon: Rss, label: "Content RSS" },
                { href: "/affiliate-rss.xml", icon: Rss, label: "Deals RSS" },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors" aria-label={label}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground mb-3">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} AISaaSToolkit. All rights reserved.</p>
          <p className="text-xs text-muted-foreground text-center">
            Some links are affiliate links.{" "}
            <Link href="/affiliate-disclosure" className="underline hover:text-primary">Disclosure</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
