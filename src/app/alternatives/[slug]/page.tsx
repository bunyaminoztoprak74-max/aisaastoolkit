import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { allTools, getToolBySlug } from "@/data/tools";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

interface Props { params: Promise<{ slug: string }> }

const ALTERNATIVES_MAP: Record<string, string[]> = {
  // AI Assistants
  "claude": ["chatgpt", "perplexity", "writesonic", "jasper"],
  "chatgpt": ["claude", "perplexity", "writesonic", "notion-ai"],
  "perplexity": ["chatgpt", "claude", "notion-ai"],
  // Writing & Content
  "jasper": ["writesonic", "claude", "chatgpt", "grammarly"],
  "writesonic": ["jasper", "claude", "chatgpt", "grammarly"],
  "grammarly": ["writesonic", "chatgpt", "jasper"],
  // Automation
  "make-com": ["zapier"],
  "zapier": ["make-com"],
  // Image & Design
  "midjourney": ["canva-ai", "adcreative-ai"],
  "canva-ai": ["midjourney", "adcreative-ai"],
  "adcreative-ai": ["canva-ai", "midjourney", "jasper"],
  // Voice & Audio
  "elevenlabs": ["murf-ai", "descript"],
  "murf-ai": ["elevenlabs", "descript"],
  // Video & Podcast
  "pictory": ["descript", "castmagic", "elevenlabs"],
  "descript": ["castmagic", "elevenlabs", "pictory"],
  "castmagic": ["descript", "writesonic", "pictory"],
  // Productivity & Presentations
  "notion-ai": ["chatgpt", "claude", "gamma"],
  "gamma": ["notion-ai", "chatgpt"],
};

export async function generateStaticParams() {
  return Object.keys(ALTERNATIVES_MAP).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: `Best ${tool.name} Alternatives in 2026 — Ranked & Reviewed`,
    description: `Looking for alternatives to ${tool.name}? We compared the top ${tool.name} alternatives on pricing, features, and ease of use.`,
    alternates: { canonical: `https://aisaastoolkit.com/alternatives/${slug}` },
  };
}

export default async function AlternativesPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const altSlugs = ALTERNATIVES_MAP[slug] || [];
  const alternatives = altSlugs.map(s => getToolBySlug(s)).filter(Boolean) as (typeof allTools[number])[];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-5xl py-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: `${tool.name} Alternatives` }]} />

        <header className="mt-8 mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-medium px-3 py-1 rounded-full mb-4">
            Alternatives
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Best {tool.name} Alternatives in 2026
          </h1>
          <p className="text-xl text-muted-foreground">
            Whether {tool.name} is too expensive, missing features you need, or you just want to explore options — here are the top alternatives we&apos;ve tested.
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
            <Link href={`/reviews/${tool.slug}`} className="ml-auto text-sm text-blue-600 hover:underline">Read our full review →</Link>
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
                    <span className="flex items-center gap-1"><span className="text-yellow-500">★</span><strong>{alt.rating}</strong></span>
                    <span className="text-muted-foreground">From {alt.pricing?.starting ?? alt.startingPrice ?? "varies"}</span>
                    <span className="capitalize text-muted-foreground">{alt.pricing?.hasFree ? "freemium" : "paid"}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {alt.pros.slice(0, 2).map((pro, i) => (
                      <span key={i} className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-2 py-1 rounded-lg">"" {pro}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <Link href={`/reviews/${alt.slug}`} className="text-sm font-medium text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg transition-colors text-center">Read Review</Link>
                  <Link href={alt.affiliateUrl} className="text-sm font-medium text-primary border border-primary hover:bg-primary/5 px-4 py-2 rounded-lg transition-colors text-center">Visit Site</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-primary/10 to-blue-600/10 border border-primary/20 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">Still not sure which to choose?</h3>
          <p className="text-muted-foreground mb-4">Read our full review