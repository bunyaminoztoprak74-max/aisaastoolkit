import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Tag as TagIcon, ExternalLink, ArrowLeft } from "lucide-react";
import { getTagBySlug, getToolsForTag, tags } from "@/data/tags";
import { getToolBySlug } from "@/data/tools";
import { StarRating } from "@/components/common/StarRating";
import { TagList } from "@/components/common/TagList";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AffiliateDisclosure } from "@/components/common/AffiliateDisclosure";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata, buildTagKeywords } from "@/lib/seo";
import { buildBreadcrumbSchema, buildItemListSchema } from "@/lib/schema";
import type { BestList } from "@/data/bestLists";

const badgeVariantMap: Record<string, "recommended" | "best-value" | "trending" | "new" | "editor-choice"> = {
  recommended: "recommended", "best-value": "best-value", trending: "trending", new: "new", "editor-choice": "editor-choice",
};

export async function generateStaticParams() {
  return tags.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tag = getTagBySlug(slug);
  if (!tag) return {};
  return buildMetadata({
    title: `Best AI Tools with ${tag.label} (2026)`,
    description: `Discover the top AI tools tagged "${tag.label}". ${tag.description} Find the best tools for your needs.`,
    path: `/tag/${slug}`,
    keywords: buildTagKeywords(tag.label),
  });
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tag = getTagBySlug(slug);
  if (!tag) notFound();

  const toolSlugs  = getToolsForTag(slug);
  const resolvedTools = toolSlugs.map(getToolBySlug).filter(Boolean);

  // Minimal BestList shape for schema builder
  const pseudoList: BestList = {
    slug: `tag-${slug}`,
    title: `Best AI Tools with ${tag.label}`,
    headline: "",
    metaDescription: tag.description,
    intro: "",
    toolSlugs,
    category: tag.group,
    lastUpdated: new Date().toISOString().split("T")[0],
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "Tags", href: "/tags" },
    { label: tag.label },
  ]);

  const listSchema = buildItemListSchema(
    pseudoList,
    resolvedTools.map((t) => ({ name: t!.name, slug: t!.slug }))
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Breadcrumb items={[{ label: "Tags", href: "/tags" }, { label: tag.label }]} className="mb-6" />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-sm font-semibold px-3 py-1.5 rounded-full ${tag.color}`}>{tag.label}</span>
            <span className="text-muted-foreground text-sm">{resolvedTools.length} tools</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-3">
            Best AI Tools with <span className="gradient-text">{tag.label}</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">{tag.description}</p>
        </div>

        <AffiliateDisclosure compact className="mb-8" />

        {resolvedTools.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">No tools tagged with "{tag.label}" yet.</p>
            <Button variant="outline" asChild><Link href="/tags"><ArrowLeft className="mr-2 w-4 h-4" />Back to Tags</Link></Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {resolvedTools.map((tool) => {
              if (!tool) return null;
              return (
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
                    <StarRating rating={tool.rating} reviewCount={tool.reviewCount} size="sm" className="mb-3" />
                    <TagList toolSlug={tool.slug} limit={3} className="mb-3" />
                    <div className="text-xs mb-4">
                      <span className="font-semibold">From: </span>
                      <span className="text-muted-foreground">{tool.pricing?.starting ?? tool.startingPrice ?? "varies"}</span>
                      {tool.pricing?.hasFree && <span className="ml-2 text-green-600">• Free plan</span>}
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
              );
            })}
          </div>
        )}

        {/* Related tags */}
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="font-bold mb-4">Explore Related Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.filter((t) => t.slug !== slug && t.group === tag.group).map((t) => (
              <Link key={t.slug} href={`/tag/${t.slug}`}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border border-transparent hover:opacity-80 transition-opacity ${t.color}`}>
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
