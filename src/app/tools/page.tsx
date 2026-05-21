import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, LayoutGrid } from "lucide-react";
import { allTools as tools } from "@/data/tools";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { StarRating } from "@/components/common/StarRating";
import { TagList } from "@/components/common/TagList";
import { Pagination } from "@/components/common/Pagination";
import { CategorySidebar } from "@/components/layout/CategorySidebar";
import { SearchBar } from "@/components/search/SearchBar";
import { AffiliateDisclosure } from "@/components/common/AffiliateDisclosure";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";
import { paginate } from "@/lib/pagination";
import { buildWebsiteSchema } from "@/lib/schema";
import { Suspense } from "react";

const badgeVariantMap: Record<string, "recommended" | "best-value" | "trending" | "new" | "editor-choice"> = {
  recommended: "recommended", "best-value": "best-value", trending: "trending", new: "new", "editor-choice": "editor-choice",
};

const SORT_OPTIONS = [
  { label: "Top Rated",    value: "rating" },
  { label: "Most Reviews", value: "reviews" },
  { label: "Name A-Z",     value: "name" },
];

const PER_PAGE = 12;

export const metadata: Metadata = buildMetadata({
  title: "All AI Tools — Reviews, Ratings & Comparisons 2026",
  description: "Browse our complete database of 50+ AI tool reviews. Filter by category, price, rating, and features to find the perfect AI tool for your needs.",
  path: "/tools",
  keywords: ["all AI tools", "AI software database", "AI tool reviews 2026"],
});

export default async function AllToolsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const sp       = await searchParams;
  const page     = parseInt(sp.page ?? "1", 10);
  const sort     = sp.sort ?? "rating";
  const free     = sp.free === "1";
  const category = sp.category ?? "";

  const wsSchema = buildWebsiteSchema();

  let filtered = [...tools];
  if (free)     filtered = filtered.filter((t) => t.pricing?.hasFree ?? false);
  if (category) filtered = filtered.filter((t) => (t.categories ?? [t.category]).includes(category));

  if (sort === "rating")  filtered.sort((a, b) => b.rating - a.rating);
  if (sort === "reviews") filtered.sort((a, b) => b.reviewCount - a.reviewCount);
  if (sort === "name")    filtered.sort((a, b) => a.name.localeCompare(b.name));

  const { items: pagedTools, meta } = paginate(filtered, page, PER_PAGE);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(wsSchema) }} />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumb items={[{ label: "All AI Tools" }]} className="mb-6" />

        <div className="grid lg:grid-cols-[220px_1fr] gap-8">
          <Suspense>
            <CategorySidebar activeCategorySlug={category} className="hidden lg:block" />
          </Suspense>

          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-black flex items-center gap-2">
                  <LayoutGrid className="w-6 h-6 text-primary" /> All AI Tools
                </h1>
                <p className="text-muted-foreground text-sm mt-1">{meta.totalItems} tools reviewed</p>
              </div>
              <Suspense>
                <SearchBar size="sm" navigateOnSearch placeholder="Search tools..." className="sm:w-64" />
              </Suspense>
            </div>

            <AffiliateDisclosure compact className="mb-5" />

            <div className="flex flex-wrap items-center gap-2 mb-6 p-3 rounded-xl border border-border bg-card">
              {SORT_OPTIONS.map((opt) => (
                <Link
                  key={opt.value}
                  href={`/tools?sort=${opt.value}${free ? "&free=1" : ""}${category ? `&category=${category}` : ""}`}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${sort === opt.value ? "bg-primary text-primary-foreground border-primary" : "border-border bg-background hover:border-primary/40"}`}
                >
                  {opt.label}
                </Link>
              ))}
              <Link
                href={`/tools?sort=${sort}&free=${free ? "" : "1"}${category ? `&category=${category}` : ""}`}
                className={`text-xs px-3 py-1.5 rounded-full border ml-auto transition-all ${free ? "bg-green-500 text-white border-green-500" : "border-border bg-background hover:border-green-400"}`}
              >
                Free Plan
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {pagedTools.map((tool) => (
                <Card key={tool.slug} className="group hover:border-primary/50 hover:shadow-lg transition-all duration-200 flex flex-col">
                  <CardContent className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center font-black text-primary text-lg">
                        {tool.name.charAt(0)}
                      </div>
                      {tool.badge && (
                        <Badge variant={badgeVariantMap[tool.badge]} className="text-xs capitalize">
                          {tool.badge.replace("-", " ")}
                        </Badge>
                      )}
                    </div>
                    <h2 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">{tool.name}</h2>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{tool.tagline}</p>
                    <StarRating rating={tool.rating} reviewCount={tool.reviewCount} size="sm" className="mb-2" />
                    <TagList toolSlug={tool.slug} limit={3} className="mb-3" />
                    <div className="text-xs mb-4">
                      <span className="font-semibold">From: </span>
                      <span className="text-muted-foreground">{tool.pricing?.starting ?? tool.startingPrice ?? "varies"}</span>
                      {tool.pricing?.hasFree && <span className="ml-2 text-green-600">Free</span>}
                    </div>
                    <div className="mt-auto flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 text-xs" asChild>
                        <Link href={`/reviews/${tool.slug}`}>Review</Link>
                      </Button>
                      <Button variant="gradient" size="sm" className="flex-1 text-xs" asChild>
                        <a href={tool.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow">
                          Visit <ExternalLink className="ml-1 w-3 h-3" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {meta.totalPages > 1 && (
              <div className="mt-8">
                <Pagination meta={meta} basePath="/tools" searchParams={sp} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
