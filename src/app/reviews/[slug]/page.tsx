import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Calendar, CheckCircle } from "lucide-react";
import { getToolBySlug, allTools } from "@/data/tools";
import { getAuthorBySlug } from "@/data/authors";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { StarRating } from "@/components/common/StarRating";
import { AffiliateDisclosure } from "@/components/common/AffiliateDisclosure";
import { TableOfContents } from "@/components/common/TableOfContents";
import { TagList } from "@/components/common/TagList";
import { InternalLinksWidget } from "@/components/common/InternalLinksWidget";
import { RatingDisplay } from "@/components/reviews/RatingDisplay";
import { ProsConsSection } from "@/components/reviews/ProsConsSection";
import { PricingSection } from "@/components/reviews/PricingSection";
import { FAQSection } from "@/components/reviews/FAQSection";
import { StickyAffiliateCTA } from "@/components/reviews/StickyAffiliateCTA";
import { QuickVerdictBox } from "@/components/reviews/QuickVerdictBox";
import { AuthorBox } from "@/components/reviews/AuthorBox";
import { WhoIsItFor } from "@/components/reviews/WhoIsItFor";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { buildMetadata, buildToolKeywords } from "@/lib/seo";
import { buildReviewSchema, buildFAQSchema, buildBreadcrumbSchema } from "@/lib/schema";
import { getRelatedToolsScored, getContentSuggestions } from "@/lib/related";

const badgeVariantMap: Record<string, "recommended" | "best-value" | "trending" | "new" | "editor-choice"> = {
  recommended: "recommended", "best-value": "best-value", trending: "trending", new: "new", "editor-choice": "editor-choice",
};

const tocItems = [
  { id: "overview",    title: "Overview",      level: 2 },
  { id: "rating",      title: "Our Rating",    level: 2 },
  { id: "pros-cons",   title: "Pros & Cons",   level: 2 },
  { id: "features",    title: "Key Features",  level: 2 },
  { id: "pricing",     title: "Pricing",       level: 2 },
  { id: "best-for",    title: "Best For",      level: 2 },
  { id: "alternatives",title: "Alternatives",  level: 2 },
  { id: "faq",         title: "FAQs",          level: 2 },
];

export async function generateStaticParams() {
  return allTools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return buildMetadata({
    title: tool.metaTitle ?? `${tool.name} Review (2026): Pricing, Features & Verdict`,
    description: tool.metaDescription ?? `Independent ${tool.name} review covering current pricing, features, pros, cons, and suitable use cases for 2026.`,
    path: `/reviews/${slug}`,
    type: "article",
    publishedTime: tool.lastUpdated,
    modifiedTime:  tool.lastUpdated,
    keywords: buildToolKeywords(tool.name, tool.category),
  });
}

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const relatedTools   = getRelatedToolsScored(slug, 4);
  const suggestions    = getContentSuggestions(slug, 6);
  const author         = tool.authorSlug ? getAuthorBySlug(tool.authorSlug) : undefined;

  // Build all schemas
  const reviewSchema     = buildReviewSchema(tool);
  const faqSchema        = buildFAQSchema(tool.faqs ?? []);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "All Reviews", href: "/tools" },
    { label: `${tool.name} Review` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <StickyAffiliateCTA
        toolName={tool.name}
        affiliateUrl={tool.affiliateUrl}
        pricing={tool.pricing?.starting ?? tool.startingPrice ?? "Free"}
        badge={tool.badge?.replace("-", " ")}
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumb
          items={[{ label: "All Reviews", href: "/tools" }, { label: `${tool.name} Review` }]}
          className="mb-6"
        />

        {/* Hero card */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center text-4xl font-black text-primary flex-shrink-0">
              {tool.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className="text-3xl md:text-4xl font-black">{tool.name} Review</h1>
                {tool.badge && (
                  <Badge variant={badgeVariantMap[tool.badge]} className="capitalize">
                    {tool.badge.replace("-", " ")}
                  </Badge>
                )}
              </div>
              <p className="text-lg text-muted-foreground mb-3">{tool.tagline}</p>
              <StarRating rating={tool.rating} reviewCount={tool.reviewCount} size="lg" className="mb-3" />
              <TagList toolSlug={slug} limit={6} className="mb-3" />
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Updated {tool.lastUpdated}</span>
                <span>•</span>
                <span>Starting from <strong className="text-foreground">{tool.pricing?.starting ?? tool.startingPrice ?? "varies"}</strong></span>
                {(tool.pricing?.hasFree ?? false) && (
                  <Badge variant="outline" className="text-green-600 border-green-300">Free plan available</Badge>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0 min-w-[160px]">
              <Button variant="gradient" size="lg" className="w-full" asChild>
                <a href={tool.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow">
                  {tool.pricing?.hasFree ? `Try ${tool.name} Free` : `Visit ${tool.name}`} <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                <a href={tool.website} target="_blank" rel="noopener noreferrer">Official Site</a>
              </Button>
            </div>
          </div>
        </div>

        <AffiliateDisclosure className="mb-8" />

        {/* Quick Verdict Box */}
        {tool.quickVerdict && (
          <QuickVerdictBox
            verdict={tool.quickVerdict}
            rating={tool.rating}
            toolName={tool.name}
            affiliateUrl={tool.affiliateUrl}
            trialUrl={tool.trialUrl}
            pros={tool.pros}
            cons={tool.cons}
          />
        )}

        {/* 2-column layout */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-8">
          {/* Main content */}
          <div className="space-y-12 min-w-0">
            {/* Overview */}
            <section id="overview">
              <h2 className="text-2xl font-bold mb-4">What is {tool.name}?</h2>
              <p className="text-muted-foreground leading-relaxed">{tool.longDescription ?? tool.description}</p>
              {author && (
                <AuthorBox
                  author={author}
                  toolName={tool.name}
                  lastTestedDate={tool.lastTestedDate ?? tool.lastUpdated}
                />
              )}
            </section>

            {/* Rating */}
            <section id="rating">
              <RatingDisplay overall={tool.rating} reviewCount={tool.reviewCount} />
            </section>

            <ProsConsSection pros={tool.pros} cons={tool.cons} />

            {/* Who Is It For */}
            {tool.whoIsItFor && tool.whoShouldAvoid && (
              <WhoIsItFor
                toolName={tool.name}
                whoIsItFor={tool.whoIsItFor}
                whoShouldAvoid={tool.whoShouldAvoid}
              />
            )}

            {/* Features */}
            <section id="features">
              <h2 className="text-2xl font-bold mb-6">Key Features</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {(tool.features ?? []).map((f) => (
                  <div key={f.title} className="rounded-xl border border-border bg-card p-4">
                    <h3 className="font-bold text-sm mb-1.5 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      {f.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{f.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <PricingSection
              tiers={tool.pricing?.tiers ?? tool.pricingTiers ?? []}
              toolName={tool.name}
              affiliateUrl={tool.affiliateUrl}
            />

            {/* Best for */}
            <section id="best-for">
              <h2 className="text-2xl font-bold mb-5">Who is {tool.name} Best For?</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {(tool.bestFor ?? []).map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 rounded-lg border border-border bg-card p-3">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Alternatives — auto internal links */}
            <section id="alternatives">
              <h2 className="text-2xl font-bold mb-4">Alternatives to {tool.name}</h2>
              <p className="text-muted-foreground mb-4">
                Not sure {tool.name} is right for you? Here are some worthy alternatives:
              </p>
              <div className="flex flex-wrap gap-2">
                {(tool.alternatives ?? []).map((alt) => (
                  <Link
                    key={alt}
                    href={`/reviews/${alt}`}
                    className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:border-primary/50 hover:text-primary transition-colors capitalize"
                  >
                    {alt.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} →
                  </Link>
                ))}
              </div>
            </section>

            {tool.faqs && tool.faqs.length > 0 && (
              <FAQSection faqs={tool.faqs} toolName={tool.name} />
            )}

            {/* Related tools (scored) */}
            {relatedTools.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-5">Related AI Tools</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedTools.map((t) => (
                    <div key={t.slug} className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center font-bold text-primary flex-shrink-0">
                        {t.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{t.name}</p>
                        <StarRating rating={t.rating} showNumber size="sm" />
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button variant="outline" size="sm" asChild className="text-xs">
                          <Link href={`/reviews/${t.slug}`}>Review</Link>
                        </Button>
                        <Button variant="gradient" size="sm" asChild className="text-xs">
                          <a href={t.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow">
                            Visit <ExternalLink className="ml-1 w-3 h-3" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Auto internal links */}
            <InternalLinksWidget
              currentUrl={`/reviews/${slug}`}
              title="Also Read"
              limit={6}
            />
          </div>

          {/* Sticky sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              <TableOfContents items={tocItems} />

              {/* CTA card */}
              <div className="rounded-xl border border-primary/20 bg-gradient-to-b from-primary/5 to-purple-500/5 p-5">
                <p className="text-sm font-bold mb-1">Ready to try {tool.name}?</p>
                <p className="text-xs text-muted-foreground mb-4">
                  {tool.pricing?.hasFree ? "Start free — no card needed." : `Plans from ${tool.pricing?.starting ?? tool.startingPrice ?? "varies"}.`}
                </p>
                <Button variant="gradient" size="sm" className="w-full" asChild>
                  <a href={tool.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow">
                    Get Started <ExternalLink className="ml-2 w-3.5 h-3.5" />
                  </a>
                </Button>
              </div>

              {/* Tag cloud */}
             
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Tags</p>
                <TagList toolSlug={slug} className="flex-wrap" />
              </div>

              {/* Content suggestions */}
              {suggestions.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Related Content</p>
                  <div className="space-y-2">
                    {suggestions.map((s) => (
                      <Link key={s.url} href={s.url} className="block text-sm text-muted-foreground hover:text-primary transition-colors hover:underline">
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
