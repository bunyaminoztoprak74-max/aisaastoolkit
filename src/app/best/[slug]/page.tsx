import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, CheckCircle, Calendar, TrendingUp } from "lucide-react";
import { getBestListBySlug, bestLists } from "@/data/bestLists";
import { getToolBySlug } from "@/data/tools";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { StarRating } from "@/components/common/StarRating";
import { AffiliateDisclosure } from "@/components/common/AffiliateDisclosure";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const badgeVariantMap: Record<string, "recommended" | "best-value" | "trending" | "new" | "editor-choice"> = {
  recommended: "recommended", "best-value": "best-value", trending: "trending", new: "new", "editor-choice": "editor-choice",
};

export async function generateStaticParams() {
  return bestLists.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const list = getBestListBySlug(slug);
  if (!list) return {};
  return {
    title: list.title,
    description: list.metaDescription,
    alternates: { canonical: `https://aisaastoolkit.com/best/${slug}` },
    openGraph: { title: list.title, description: list.metaDescription, url: `https://aisaastoolkit.com/best/${slug}` },
  };
}

export default async function BestToolsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const list = getBestListBySlug(slug);
  if (!list) notFound();

  const resolvedTools = list.toolSlugs.map(getToolBySlug).filter(Boolean);

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: list.title,
    description: list.metaDescription,
    numberOfItems: resolvedTools.length,
    itemListElement: resolvedTools.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool!.name,
      url: `https://aisaastoolkit.com/reviews/${tool!.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumb items={[{ label: "Best Tools" }, { label: list.title }]} className="mb-6" />

        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="gap-1.5">
              <TrendingUp className="w-3 h-3 text-primary" /> Expert Picks
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Updated {list.lastUpdated}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4">{list.headline}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{list.intro}</p>
        </div>

        <AffiliateDisclosure className="mb-8" />

        {/* Quick picks table */}
        <div className="rounded-xl border border-border overflow-hidden mb-10">
          <div className="bg-muted/50 px-5 py-3 border-b border-border">
            <h2 className="font-bold">Quick Comparison</h2>
          </div>
          <div className="divide-y divide-border">
            {resolvedTools.map((tool, i) => {
              if (!tool) return null;
              return (
                <div key={tool.slug} className="flex items-center gap-4 px-5 py-4 hover:bg-muted/20 transition-colors">
                  <span className="text-lg font-black text-muted-foreground w-6 flex-shrink-0">#{i + 1}</span>
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center font-bold text-primary flex-shrink-0">
                    {tool.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm">{tool.name}</span>
                      {tool.badge && <Badge variant={badgeVariantMap[tool.badge]} className="text-xs capitalize">{tool.badge.replace("-", " ")}</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{tool.tagline}</p>
                  </div>
                  <div className="hidden sm:block flex-shrink-0">
                    <StarRating rating={tool.rating} size="sm" showNumber />
                  </div>
                  <span className="hidden md:block text-xs font-semibold flex-shrink-0">{tool.pricing?.starting ?? tool.startingPrice ?? "varies"}</span>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button variant="outline" size="sm" asChild className="text-xs">
                      <Link href={`/reviews/${tool.slug}`}>Review</Link>
                    </Button>
                    <Button variant="gradient" size="sm" asChild className="text-xs hidden sm:inline-flex">
                      <a href={tool.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow">Visit</a>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed cards */}
        <div className="space-y-8">
          {resolvedTools.map((tool, i) => {
            if (!tool) return null;
            return (
              <Card key={tool.slug} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6 pb-0">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-4xl font-black text-muted-foreground/30 leading-none flex-shrink-0">#{i + 1}</div>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center text-2xl font-black text-primary flex-shrink-0">
                        {tool.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h2 className="text-xl font-black">{tool.name}</h2>
                          {tool.badge && <Badge variant={badgeVariantMap[tool.badge]} className="capitalize">{tool.badge.replace("-", " ")}</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{tool.tagline}</p>
                        <StarRating rating={tool.rating} reviewCount={tool.reviewCount} size="sm" className="mt-1" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{tool.description}</p>
                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1 mb-4">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Pros</p>
                        {tool.pros.slice(0, 3).map((p, j) => (
                          <div key={j} className="flex items-start gap-1.5 text-xs text-green-700 dark:text-green-400 mb-1">
                            <CheckCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />{p}
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Pricing</p>
                        <p className="text-sm font-bold">{tool.pricing?.starting ?? tool.startingPrice ?? "varies"}</p>
                        {tool.pricing?.hasFree && <p className="text-xs text-green-600">Free plan available</p>}
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="p-4 flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/reviews/${tool.slug}`}>Read Full Review</Link>
                    </Button>
                    <Button variant="gradient" size="sm" asChild>
                      <a href={tool.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow">
                        Try {tool.name} <ExternalLink className="ml-2 w-3.5 h-3.5" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Internal links */}
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="font-bold mb-4">More Best Tool Lists</h3>
          <div className="flex flex-wrap gap-3">
            {bestLists.filter((l) => l.slug !== slug).map((l) => (
              <Button key={l.slug} variant="outline" size="sm" asChild>
                <Link href={`/best/${l.slug}`}>{l.title}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
