import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { allTools, getToolBySlug } from "@/data/tools";
import { getDealByToolSlug } from "@/data/deals";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return allTools.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: `${tool.name} Pricing 2026: Is It Worth It? (All Plans Compared)`,
    description: `Full ${tool.name} pricing breakdown for 2026. Compare all plans, understand what is included, and find the best deal.`,
    alternates: { canonical: `https://aisaastoolkit.com/pricing/${slug}` },
  };
}

export default async function PricingPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();
  const deal = getDealByToolSlug(tool.slug);

  const tiers = tool.pricingTiers ?? tool.pricing?.tiers ?? [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-5xl py-8">
        <Breadcrumb items={[{ label: "Reviews", href: "/tools" }, { label: tool.name, href: `/reviews/${tool.slug}` }, { label: "Pricing" }]} />

        <header className="mt-8 mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 rounded-2xl ${tool.logoColor ?? "bg-primary"} flex items-center justify-center text-white font-bold text-2xl`}>{tool.logo}</div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{tool.name} Pricing 2026</h1>
              <p className="text-muted-foreground">All plans compared — updated {tool.lastTestedDate ?? tool.lastUpdated ?? "May 2026"}</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground">{tool.tagline}</p>
        </header>

        {deal && (
          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-300 dark:border-amber-700 rounded-xl p-5 mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-amber-800 dark:text-amber-200">🏷 {deal.headline}</p>
              <p className="text-sm text-amber-700 dark:text-amber-300">{deal.discountAmount}</p>
            </div>
            <Link href={deal.dealUrl} className="font-semibold text-white bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-lg text-sm whitespace-nowrap">Get Deal</Link>
          </div>
        )}

        <div className={`grid gap-4 mb-12 ${tiers.length <= 3 ? "md:grid-cols-3" : "md:grid-cols-4"}`}>
          {tiers.map(tier => (
            <div key={tier.name} className={`bg-card border rounded-xl p-5 ${(tier.recommended || tier.highlighted) ? "border-primary ring-2 ring-primary/20 relative" : "border-border"}`}>
              {(tier.recommended || tier.highlighted) && <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold text-white bg-primary px-3 py-1 rounded-full whitespace-nowrap">Recommended</div>}
              <h3 className="font-bold text-foreground text-lg mb-1">{tier.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-foreground">{tier.price}</span>
                {tier.period && <span className="text-muted-foreground text-sm">/{tier.period}</span>}
              </div>
              <ul className="space-y-2">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">""</span>
                    <span className="text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Link href={tool.trialUrl ?? tool.affiliateUrl} className={`mt-5 block text-center text-sm font-semibold py-2.5 rounded-lg transition-colors ${(tier.recommended || tier.highlighted) ? "bg-primary text-white hover:bg-primary/90" : "border border-primary text-primary hover:bg-primary/5"}`}>
                {tier.price === "$0" ? "Start Free" : "Get Started"}
              </Link>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-foreground text-lg mb-2">Our Pricing Recommendation</h2>
          <p className="text-foreground">
            {tool.quickVerdict ?? `We recommend starting with the free plan or lowest paid tier to test ${tool.name} before committing to a higher plan. Read our full review for our hands-on assessment.`}
          </p>
          <Link href={`/reviews/${tool.slug}`} className="inline-block mt-3 text-sm font-medium text-primary hover:underline">Read our full {tool.name} review →</Link>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-bold text-foreground mb-4">Compare {tool.name} Pricing vs Alternatives</h2>
          <Link href={`/alternatives/${tool.slug}`} className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
            See the best {tool.name} alternatives →
          </Link>
        </div>
      </div>
    </div>
  );
}
