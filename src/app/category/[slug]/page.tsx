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

// Per-category SEO overrides
const categoryMeta: Record<string, { title: string; description: string; keywords: string[] }> = {
  "ai-marketing": {
    title: "Best AI Marketing Tools 2026 — Reviews, Ratings & Comparisons",
    description: "Independent reviews of the best AI marketing tools in 2026. Compare features, pricing, and ratings for AI ad generators, email tools, social media tools, and more.",
    keywords: ["ai marketing tools review", "best ai marketing tools 2026", "ai marketing software", "ai ad generator", "ai email marketing"],
  },
  "ai-writing": {
    title: "Best AI Writing Tools 2026 — Reviews & Comparisons",
    description: "Find the best AI writing tools of 2026. In-depth reviews of Jasper, Writesonic, Claude, ChatGPT and more. Compare pricing and features.",
    keywords: ["best ai writing tools", "ai writing software 2026", "ai content generator review"],
  },
  "ai-automation": {
    title: "Best AI Automation Tools 2026 — Reviews & Comparisons",
    description: "Reviews of the top AI automation and workflow tools in 2026. Compare Make.com, Zapier, and more to find the right automation platform for your business.",
    keywords: ["best ai automation tools", "ai workflow automation 2026", "make.com vs zapier"],
  },
  "ai-video": {
    title: "Best AI Video Tools 2026 — Reviews & Comparisons",
    description: "Reviews of the best AI video creation and editing tools in 2026. Compare Pictory, Descript, Midjourney and more.",
    keywords: ["best ai video tools", "ai video generator 2026", "ai video editor review"],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return {};
  const override = categoryMeta[slug];
  return buildMetadata({
    title: override?.title ?? `Best ${cat.name} Tools 2026 — Reviews & Comparisons`,
    description: override?.description ?? cat.description,
    path: `/category/${slug}`,
    keywords: override?.keywords ?? [`best ${cat.name.toLowerCase()} tools`, `${cat.name.toLowerCase()} software`, `AI ${cat.name.toLowerCase()}`],
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

  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "Categories", href: "/tools" },
    { label: category.name, href: `/category/${category.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumb items={[{ label: "Categories", href: "/tools" }, { label: category.name, href: `/category/${category.slug}` }]} className="mb-6" />

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

            {/* Editorial section for SEO */}
            {slug === "ai-marketing" && (
              <div className="mt-12 prose prose-sm max-w-none dark:prose-invert">
                <h2 className="text-xl font-bold mb-3">Our AI Marketing Tools Reviews — How We Test</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We independently test every AI marketing tool listed on this page. Our review process covers ease of use, output quality, pricing fairness, integrations, and real-world ROI for businesses of different sizes. We do not accept payment for rankings — tools are ordered by our editorial rating.
                </p>
                <h2 className="text-xl font-bold mb-3">What Are AI Marketing Tools?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  AI marketing tools are software platforms that use artificial intelligence to help businesses create, distribute, and optimise marketing content at scale. They cover a wide range — from AI ad copy generators and email subject line optimisers to social media schedulers with AI writing built in, and full campaign automation platforms that connect your CRM, email, and ads in one workflow.
                </p>
                <h2 className="text-xl font-bold mb-3">Best AI Marketing Tools in 2026</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The top-rated AI marketing tools we&apos;ve reviewed include <strong>Jasper</strong> (best for long-form ad and blog content), <strong>Writesonic</strong> (best value for teams), <strong>Canva AI</strong> (best for visual marketing), and <strong>Make.com</strong> (best for automating entire marketing workflows). Use the filters above to sort by rating, price, or free plan availability.
                </p>
              </div>
            )}

            {slug === "ai-automation" && (
              <div className="mt-12 prose prose-sm max-w-none dark:prose-invert">
                <h2 className="text-xl font-bold mb-3">Best AI Automation Tools in 2026</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  AI automation tools let businesses connect apps, automate repetitive tasks, and build intelligent workflows without writing code. The top platforms we&apos;ve reviewed are <strong>Make.com</strong> (most powerful visual automation), <strong>Zapier</strong> (easiest for beginners), and emerging tools like n8n for self-hosted automation. Compare pricing and features above to find the right fit.
                </p>
              </div>
            )}

            {slug === "ai-writing" && (
              <div className="mt-12 prose prose-sm max-w-none dark:prose-invert">
                <h2 className="text-xl font-bold mb-3">Best AI Writing Tools in 2026</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  AI writing tools have transformed content creation — from blog posts and ad copy to emails and social media. The top picks from our testing: <strong>Claude</strong> (best overall writing quality), <strong>ChatGPT</strong> (most versatile), <strong>Jasper</strong> (best for marketing teams), and <strong>Writesonic</strong> (best value). All tools are independently rated and regularly re-tested.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
