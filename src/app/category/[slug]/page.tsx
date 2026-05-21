import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, SlidersHorizontal } from "lucide-react";
import { getCategoryBySlug, categories } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CategorySidebar } from "@/components/layout/CategorySidebar";
import { StarRating } from "@/components/common/StarRating";
import { TagList } from "@/components/common/TagList";
import { AffiliateDisclosure } from "@/components/common/AffiliateDisclosure";
import { Pagination } from "@/components/common/Pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { paginate } from "@/lib/pagination";
import { Suspense } from "react";

const badgeVariantMap: Record<string, "recommended" | "best-value" | "trending" | "new" | "editor-choice"> = {
  recommended: "recommended", "best-value": "best-value", trending: "trending", new: "new", "editor-choice": "editor-choice",
};

const SORT_OPTIONS = [
  { label: "Top Rated",    value: "rating" },
  { label: "Most Reviews", value: "reviews" },
  { label: "Name A—Z",     value: "name" },
  { label: "Free First",   value: "free" },
];

const PER_PAGE = 9;

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return {};
  return buildMetadata({
    title: `Best ${cat.name} Tools 2026 — Reviews & Comparisons`,
    description: cat.description,
    path: `/category/${slug}`,
    keywords: [`best ${cat.name.toLowerCase()} tools`, `${cat.name.toLowerCase()} software`, `AI ${cat.name.toLowerCase()}`],
  });
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { slug } = await params;
  const sp       = await searchParams;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const page  = parseInt(sp.page  ?? "1", 10);
  const sort  = sp.sort  ?? "rating";
  const badge = sp.badge ?? "";
  const free  = sp.free  === "1";

  // Get + filter tools
  let tools = getToolsByCategory(slug);
  if (badge) tools = tools.filter((t) => t.badge === badge);
  if (free)  tools = tools.filter((t) => t.pricing?.hasFree ?? false);

  // Sort
  if (sort === "rating")  tools = [...tools].sort((a, b) => b.rating - a.rating);
  if (sort === "reviews") tools = [...tools].sort((a, b) => b.reviewCount - a.reviewCount);
  if (sort === "name")    tools = [...tools].sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "free")    tools = [...tools].sort((a, b) => Number(b.pricing?.hasFree ?? false) - Number(a.pricing?.hasFree ?? false));

  const { items: pagedTools, meta } = paginate(tools, page, PER_PAGE);

  const breadcrumbSchema = buildBreadcrumbSchema([{ label: "Categories" }, { label: category.name }]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumb items={[{ label: "Categories" }, { label: category.name }]} className="mb-6" />

        <div className="grid lg:grid-cols-[220px_1fr] gap-8">
          {/* Sidebar */}
          <Suspense>
            <CategorySidebar activeCategorySlug={slug} className="hidden lg:block" />
          </Suspense>

          <div>
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                {category.icon}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black">{category.name} Tools</h1>
                <p className="text-muted-foreground text-sm mt-1 max-w-2xl">{category.description}</p>
              </div>
            </div>

            <AffiliateDisclosure compact className="mb-5" />

            {/* Filter bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 flex-wrap">
                <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">Sort:</span>
                {SORT_OPTIONS.map((opt) => (
                  <Link
                    key={opt.value}
                    href={`/category/${slug}?sort=${opt.value}${free ? "&free=1" : ""}${badge ? `&badge=${badge}` : ""}`}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${sort === opt.value ? "bg-primary text-primary-foreground border-primary" : "border-border bg-background hover:border-primary/40"}`}
                  >
                    {opt.label}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/category/${slug}?sort=${sort}&free=${free ? "" : "1"}${badge ? `&badge=${badge}` : ""}`}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${free ? "bg-green-500 text-white border-green-500" : "border-border bg-background hover:border-green-400"}`}
                >
                  ✓ Free Plan Only
                </Link>
                <span className="text-xs text-muted-foreground">{meta.totalItems} tool{meta.totalItems !== 1 ? "s" : ""}</span>
              </div>
            </div>

            {/* Tool grid */}
            {pagedTools.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-lg mb-3">No tools match your filters.</p>
                <Button variant="outline" asChild>
                  <Link href={`/category/${slug}`}>Clear Filters</Link>
                </Button>
              </div>
            ) : (
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
                        {tool.pricing?.hasFree && <span className="ml-2 text-green-600">• Free</span>}
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
            )}

            {meta.totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  meta={meta}
                  basePath={`/category/${slug}`}
                  searchParams={sp}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
