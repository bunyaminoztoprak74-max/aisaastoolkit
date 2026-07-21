import type { Metadata } from "next";
import Link from "next/link";
import { allTools } from "@/data/tools";
import { categories } from "@/data/categories";
import { StarRating } from "@/components/common/StarRating";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "AI Tool Reviews 2026 — Independent & Tested | AISaaSToolkit",
  description:
    "Independent reviews of 40+ AI SaaS tools — every tool tested for 30+ days on real tasks. Find the right AI tool for your business in 2026.",
  path: "/reviews",
  keywords: [
    "ai tool reviews 2026",
    "best ai tools reviews",
    "independent ai software reviews",
    "ai saas reviews",
  ],
});

const badgeVariantMap: Record<string, "recommended" | "best-value" | "trending" | "new" | "editor-choice"> = {
  recommended: "recommended",
  "best-value": "best-value",
  trending: "trending",
  new: "new",
  "editor-choice": "editor-choice",
  "editor choice": "editor-choice",
};

export default function ReviewsIndexPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([{ label: "Reviews", href: "/reviews" }]);

  // Group tools by category
  const categoryMap = new Map<string, typeof allTools>();
  allTools.forEach((tool) => {
    const cat = tool.category;
    if (!categoryMap.has(cat)) categoryMap.set(cat, []);
    categoryMap.get(cat)!.push(tool);
  });

  const featuredTools = allTools.filter((t) => t.featured || t.trending);
  const allSorted = [...allTools].sort((a, b) => b.rating - a.rating);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background border-b border-border py-14">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            AI Tool Reviews 2026
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Independent, hands-on reviews of the best AI SaaS tools. Every tool tested for 30+ days.
            No sponsored rankings. No BS.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              {allTools.length} tools reviewed
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
              30+ days testing each
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />
              Updated monthly
            </span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl py-12">

        {/* Category filter links */}
        <nav className="flex flex-wrap gap-2 mb-10" aria-label="Review categories">
          <Link
            href="/reviews"
            className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary text-primary-foreground"
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="px-4 py-1.5 rounded-full text-sm font-medium border border-border hover:bg-muted transition-colors"
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
        </nav>

        {/* Editor's Picks */}
        {featuredTools.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              ⭐ Editor&rsquo;s Top Picks
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredTools.slice(0, 6).map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/reviews/${tool.slug}`}
                  className="group rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all p-5 flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center text-xl font-black text-primary shrink-0">
                      {tool.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-foreground group-hover:text-primary transition-colors truncate">
                        {tool.name}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {tool.category.replace(/-/g, " ")}
                      </p>
                    </div>
                    {tool.badge && (
                      <Badge variant={badgeVariantMap[tool.badge]} className="capitalize text-xs shrink-0">
                        {tool.badge.replace("-", " ")}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {tool.tagline}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
                    <StarRating rating={tool.rating} reviewCount={tool.reviewCount} size="sm" />
                    <span className="text-xs font-medium text-muted-foreground">
                      {tool.pricing?.starting ?? tool.startingPrice ?? "Varies"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Reviews A-Z */}
        <section>
          <h2 className="text-2xl font-bold mb-6">All Reviews ({allTools.length})</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allSorted.map((tool) => (
              <Link
                key={tool.slug}
                href={`/reviews/${tool.slug}`}
                className="group rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-sm transition-all p-4 flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/15 to-purple-500/15 flex items-center justify-center text-base font-black text-primary shrink-0">
                  {tool.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                    {tool.name}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mt-0.5">
                    {tool.tagline}
                  </p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <span className="text-xs font-bold text-amber-500">{tool.rating.toFixed(1)}</span>
                    <span className="text-amber-400 text-xs">★</span>
                    <span className="text-xs text-muted-foreground">
                      · {tool.pricing?.starting ?? tool.startingPrice ?? "—"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-2xl bg-primary/5 border border-primary/20 p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Missing a Tool?</h2>
          <p className="text-muted-foreground mb-5">
            We&rsquo;re constantly adding new AI tool reviews. If you&rsquo;d like us to review a specific
            tool, let us know.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Request a Review →
          </Link>
        </div>
      </div>
    </>
  );
}
