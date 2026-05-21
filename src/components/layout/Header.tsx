"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, ChevronDown, Zap, Search, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search/SearchBar";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    label: "Tools",
    href:  "/tools",
    children: [
      { label: "All AI Tools",          href: "/tools" },
      { label: "AI Automation",         href: "/category/ai-automation" },
      { label: "AI Writing",            href: "/category/ai-writing" },
      { label: "AI Video",              href: "/category/ai-video" },
      { label: "AI SEO",                href: "/category/ai-seo" },
      { label: "Browse by Tag",         href: "/tags" },
    ],
  },
  {
    label: "Reviews",
    href: "/reviews/claude",
    children: [
      { label: "Claude Review",   href: "/reviews/claude" },
      { label: "ChatGPT Review",  href: "/reviews/chatgpt" },
      { label: "Make.com Review", href: "/reviews/make-com" },
      { label: "Jasper Review",   href: "/reviews/jasper" },
      { label: "Pictory Review",  href: "/reviews/pictory" },
    ],
  },
  {
    label: "Compare",
    href: "/compare/claude-vs-chatgpt",
    children: [
      { label: "Claude vs ChatGPT",    href: "/compare/claude-vs-chatgpt" },
      { label: "Make.com vs Zapier",   href: "/compare/make-vs-zapier" },
      { label: "Jasper vs Writesonic", href: "/compare/jasper-vs-writesonic" },
      { label: "ElevenLabs vs Murf",    href: "/compare/elevenlabs-vs-murf" },
    ],
  },
  {
    label: "Best Lists",
    href: "/best/ai-automation-tools",
    children: [
      { label: "Best AI Automation Tools", href: "/best/ai-automation-tools" },
      { label: "Best AI Video Tools",      href: "/best/ai-video-tools" },
      { label: "Best AI SEO Tools",        href: "/best/ai-seo-tools" },
      { label: "Best AI Writing Tools",    href: "/best/ai-writing-tools" },
      { label: "Best AI Voice Tools",        href: "/best/ai-voice-tools" },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
    children: [
      { label: "All Articles",       href: "/blog" },
      { label: "AI Writing Tips",    href: "/blog/best-ai-writing-tools-2026" },
      { label: "ChatGPT vs Claude",  href: "/blog/chatgpt-vs-claude-2026" },
      { label: "Free AI Tools",      href: "/blog/free-ai-tools-actually-useful" },
    ],
  },
  {
    label: "Deals",
    href: "/deals",
    children: [
      { label: "All Deals",       href: "/deals" },
      { label: "Our Methodology", href: "/methodology" },
    ],
  },
];

export function Header() {
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen,   setSearchOpen]   = useState(false);
  const [mounted,      setMounted]      = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setSearchOpen(false); }, [pathname]);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-200",
      scrolled
        ? "border-b border-border/60 bg-background/95 backdrop-blur-md shadow-sm"
        : "bg-background/80 backdrop-blur-sm"
    )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl flex-shrink-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#667eea,#764ba2)" }}
          >
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="gradient-text hidden sm:block">AISaaSToolkit</span>
        </Link>

        {searchOpen ? (
          <div className="hidden lg:flex flex-1 items-center gap-2 max-w-xl">
            <SearchBar size="sm" navigateOnSearch autoFocus className="flex-1" />
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-accent",
                    pathname.startsWith(link.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform",
                      openDropdown === link.label && "rotate-180"
                    )}
                  />
                </button>
                {openDropdown === link.label && link.children && (
                  <div className="absolute top-full left-0 pt-1 z-50">
                    <div className="bg-popover border border-border rounded-xl shadow-xl p-2 min-w-[220px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block px-3 py-2 text-sm rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors",
                            pathname === child.href && "text-primary font-medium bg-primary/5"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-1 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
            className="hidden lg:flex"
          >
            <Search className="h-4 w-4" />
          </Button>
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          )}
          <Button variant="gradient" size="sm" className="hidden sm:inline-flex" asChild>
            <Link href="/tools">
              <LayoutGrid className="mr-1.5 h-3.5 w-3.5" />All Tools
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 pt-3 pb-2">
            <SearchBar size="sm" navigateOnSearch className="mb-3" />
          </div>
          <nav className="container mx-auto px-4 pb-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className={cn(
                    "block px-3 py-2 text-sm font-medium rounded-lg hover:bg-accent transition-colors",
                    pathname.startsWith(link.href) ? "text-primary bg-primary/5" : "text-foreground"
                  )}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block px-3 py-1.5 text-sm rounded-lg hover:bg-accent transition-colors",
                          pathname === child.href
                            ? "text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
