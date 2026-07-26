import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { allTools, getToolBySlug } from "@/data/tools";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { buildBreadcrumbSchema, buildFAQSchema } from "@/lib/schema";
import { ALTERNATIVES_MAP } from "@/data/alternatives";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return Object.keys(ALTERNATIVES_MAP).map(slug => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: `Best ${tool.name} Alternatives in 2026 — Ranked & Reviewed`,
    description: `Looking for alternatives to ${tool.name}? We compared the top ${tool.name} alternatives on pricing, features, and ease of use. Find the best option for your needs.`,
    alternates: { canonical: `https://aisaastoolkit.com/alternatives/${slug}` },
    openGraph: {
      title: `Best ${tool.name} Alternatives in 2026`,
      description: `Top ${tool.name} alternatives compared: pricing, features, pros & cons. Find the right tool for your needs.`,
      url: `https://aisaastoolkit.com/alternatives/${slug}`,
    },
  };
}

export default async function AlternativesPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const altSlugs = ALTERNATIVES_MAP[slug] || [];
  const alternatives = altSlugs.map(s => getToolBySlug(s)).filter(Boolean) as (typeof allTools[number])[];

  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "Tools", href: "/tools" },
    { label: `${tool.name} Alternatives`, href: `/alternatives/${tool.slug}` },
  ]);

  const faqSchema = buildFAQSchema([
    {
      question: `What is the best alternative to ${tool.name}?`,
      answer: alternatives[0]
        ? `${alternatives[0].name} is our first editorial alternative to consider for ${tool.name} in 2026. Read the full ${alternatives[0].name} review and verify current features and pricing for your use case.`
        : `We recommend checking our full tool directory at aisaastoolkit.com/tools for the most up-to-date alternatives.`,
    },
    {
      question: `Is there a free alternative to ${tool.name}?`,
      answer: alternatives.find(a => a.pricing?.hasFree)
        ? `Yes — ${alternatives.find(a => a.pricing?.hasFree)!.name} offers a free plan that covers many of the same use cases as ${tool.name}.`
        : `Most alternatives to ${tool.name} offer free trials. Check individual reviews for current free plan availability.`,
    },
    {
      question: `How does ${tool.name} compare to its alternatives?`,
      answer: `${tool.name} may suit users who value ${tool.pros[0]?.toLowerCase() ?? "its core features"}. A common reason to compare alternatives is ${tool.cons[0]?.toLowerCase() ?? "pricing or a specific feature requirement"}. See the comparison above and confirm current provider terms.`,
    },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 max-w-5xl py-8">
          <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: `${tool.name} Alternatives`, href: `/alternatives/${tool.slug}` }]} />
          <header className="mt-8 mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-medium px-3 py-1 rounded-full mb-4">
              Alternatives
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Best {tool.name} Alternatives in 2026
            </h1>
            <p className="text-xl text-muted-foreground">
              Whether {tool.name} is too expensive, missing features you need, or you simply want to compare options, here are our editorial alternatives to consider.
            </p>
          </header>
          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-5 mb-8">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2">You&apos;re looking for alternatives to:</p>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${tool.logoColor ?? "bg-primary"} flex items-center justify-center text-white font-bold`}>{tool.logo}</div>
              <div>
                <p className="font-semibold text-foreground">{tool.name}</p>
                <p className="text-sm text-muted-foreground">Starting at {tool.pricing?.starting ?? tool.startingPrice ?? "varies"}</p>
              </div>
              <Link href={`/reviews/${tool.slug}`} className="ml-auto text-sm text-blue-600 hover:underline">Read our full review &rarr;</Link>
            </div>
          </div>
          <div className="space-y-6">
            {alternatives.map((alt, index) => (
              <div key={alt.slug} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="text-2xl font-bold text-muted-foreground w-8 flex-shrink-0">#{index + 1}</div>
                  <div className={`w-14 h-14 rounded-xl ${alt.logoColor ?? "bg-primary"} flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}>{alt.logo}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-bold text-foreground">{alt.name}</h2>
                      {index === 0 && <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full font-medium">Best Alternative</span>}
                    </div>
                    <p className="text-muted-foreground mb-3">{alt.tagline}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1"><span className="text-yellow-500">&#9733;</span><strong>{alt.rating}</strong></span>
                      <span className="text-muted-foreground">From {alt.pricing?.starting ?? alt.startingPrice ?? "varies"}</span>
                      <span className="capitalize text-muted-foreground">{alt.pricing?.hasFree ? "freemium" : "paid"}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {alt.pros.slice(0, 2).map((pro, i) => (
                        <span key={i} className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-2 py-1 rounded-lg">&#10003; {pro}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <Link href={`/reviews/${alt.slug}`} className="text-sm font-medium text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg transition-colors text-center">Read Review</Link>
                    <a href={alt.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-sm font-medium text-primary border border-primary hover:bg-primary/5 px-4 py-2 rounded-lg transition-colors text-center">Visit Site</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 bg-gradient-to-r from-primary/10 to-blue-600/10 border border-primary/20 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">Still not sure which to choose?</h3>
            <p className="text-muted-foreground mb-4">Read our full review of {tool.name} and compare it directly with the top alternative.</p>
            <div className="flex gap-3 justify-center">
              <Link href={`/reviews/${tool.slug}`} className="font-medium text-white bg-primary hover:bg-primary/90 px-5 py-2.5 rounded-lg transition-colors">Read {tool.name} Review</Link>
              {alternatives[0] && (
                <Link href={`/compare/${tool.slug}-vs-${alternatives[0].slug}`} className="font-medium text-primary border border-primary hover:bg-primary/5 px-5 py-2.5 rounded-lg transition-colors">
                  Compare {tool.name} vs {alternatives[0].name}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
