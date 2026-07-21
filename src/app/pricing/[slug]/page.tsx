import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle, ExternalLink, Tag } from "lucide-react";
import { allTools, getToolBySlug } from "@/data/tools";
import { getDealByToolSlug } from "@/data/deals";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AffiliateLink } from "@/components/common/AffiliateLink";
import { Button } from "@/components/ui/button";
import { buildBreadcrumbSchema, buildFAQSchema } from "@/lib/schema";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return allTools.map(t => ({ slug: t.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: `${tool.name} Pricing 2026: Plans, Cost & Free Option`,
    description: `${tool.name} pricing starts at ${tool.pricing?.starting ?? tiersStartingPrice(tool)}. Compare every 2026 plan, free option, limits and best-value tier before you subscribe.`,
    alternates: { canonical: `https://aisaastoolkit.com/pricing/${slug}` },
    openGraph: {
      title: `${tool.name} Pricing 2026: All Plans Compared`,
      description: `Compare all ${tool.name} pricing plans. Find the best option for your budget and use case.`,
      url: `https://aisaastoolkit.com/pricing/${slug}`,
    },
  };
}

function tiersStartingPrice(tool: NonNullable<ReturnType<typeof getToolBySlug>>): string {
  return (tool.pricingTiers ?? tool.pricing?.tiers ?? [])[0]?.price ?? "the provider's current rate";
}

export default async function PricingPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();
  const deal = getDealByToolSlug(tool.slug);
  const tiers = tool.pricingTiers ?? tool.pricing?.tiers ?? [];

  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "Reviews", href: "/reviews" },
    { label: tool.name, href: `/reviews/${tool.slug}` },
    { label: "Pricing", href: `/pricing/${tool.slug}` },
  ]);

  const firstFaqs = tool.faqs?.slice(0, 3) ?? [
    {
      question: `How much does ${tool.name} cost?`,
      answer: tiers.length
        ? `${tool.name} pricing starts at ${tool.pricing?.starting ?? tiers[0]?.price ?? "varies"}. Plans include: ${tiers.map(t => `${t.name} (${t.price}${t.period ? "/" + t.period.replace("/", "") : ""})`).join(", ")}.`
        : `${tool.name} starts at ${tool.pricing?.starting ?? "varies"}. Visit the official site for the latest pricing.`,
    },
    {
      question: `Does ${tool.name} have a free plan?`,
      answer: tool.pricing?.hasFree
        ? `Yes — ${tool.name} offers a free plan that you can start with no credit card required.`
        : `${tool.name} does not currently offer a permanent free plan, but most plans come with a free trial period.`,
    },
    {
      question: `Is ${tool.name} worth the price in 2026?`,
      answer: `${tool.name} may be a good fit when ${tool.pros[0]?.toLowerCase() ?? "its core capabilities match your requirements"}. It is best suited for ${(tool.bestFor ?? []).slice(0, 2).join(" and ") || "people who need its core capabilities"}. Verify current features and pricing with the provider before subscribing.`,
    },
  ];

  const faqSchema = buildFAQSchema(firstFaqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 max-w-5xl py-8">
          <Breadcrumb items={[{ label: "Reviews", href: "/reviews" }, { label: tool.name, href: `/reviews/${tool.slug}` }, { label: "Pricing", href: `/pricing/${tool.slug}` }]} />
          <header className="mt-8 mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 rounded-2xl ${tool.logoColor ?? "bg-primary"} flex items-center justify-center text-white font-bold text-2xl flex-shrink-0`}>
                {tool.logo}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{tool.name} Pricing 2026</h1>
                <p className="text-muted-foreground">All plans compared &mdash; updated {tool.lastTestedDate ?? tool.lastUpdated ?? "June 2026"}</p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground">{tool.tagline}</p>
          </header>

          <section className="rounded-xl border border-primary/20 bg-primary/5 p-6 mb-8" aria-labelledby="pricing-summary">
            <h2 id="pricing-summary" className="text-xl font-bold mb-2">{tool.name} pricing at a glance</h2>
            <p className="text-muted-foreground leading-relaxed">
              {tool.name} starts at <strong className="text-foreground">{tool.pricing?.starting ?? tiers[0]?.price ?? "a custom price"}</strong>.
              {tool.pricing?.hasFree
                ? " A permanent free plan is available, so you can evaluate the core workflow before paying."
                : " There is no permanent free plan, so compare the limits below before choosing a paid tier."}
              {tiers.length > 1 && ` There are ${tiers.length} listed plans; ${tiers.find((tier) => tier.highlighted)?.name ?? tiers[1]?.name} is the highlighted option for most users.`}
            </p>
          </section>

          {deal && (
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-300 dark:border-amber-700 rounded-xl p-5 mb-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Tag className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-amber-800 dark:text-amber-200">{deal.headline}</p>
                  <p className="text-sm text-amber-700 dark:text-amber-300">{deal.discountAmount}</p>
                </div>
              </div>
              <Link href={deal.dealUrl} className="font-semibold text-white bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors">
                Get Deal
              </Link>
            </div>
          )}

          {tiers.length > 0 && (
            <div className={`grid gap-4 mb-12 ${tiers.length <= 2 ? "md:grid-cols-2" : tiers.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4"}`}>
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`rounded-2xl border p-6 flex flex-col ${
                    tier.highlighted
                      ? "border-primary bg-primary/5 shadow-lg ring-1 ring-primary/20"
                      : "border-border bg-card"
                  }`}
                >
                  {tier.badge && (
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{tier.badge}</span>
                    </div>
                  )}
                  <h3 className="font-bold text-lg text-foreground mb-1">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-foreground">{tier.price}</span>
                    {tier.period && <span className="text-muted-foreground text-sm ml-1">{tier.period}</span>}
                  </div>
                  <ul className="space-y-2 flex-1 mb-6">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={tier.highlighted ? "gradient" : "outline"}
                    size="sm"
                    className="w-full"
                    asChild
                  >
                    <AffiliateLink href={tool.affiliateUrl} toolName={tool.name} placement={`pricing_${tier.name.toLowerCase().replace(/\s+/g, "_")}`}>
                      {tier.price === "$0" || tier.price === "Free" ? "Get Started Free" : tier.price === "Custom" ? "Contact Sales" : `Start ${tier.name}`}
                      <ExternalLink className="ml-2 w-3.5 h-3.5" />
                    </AffiliateLink>
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="bg-card border border-border rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">Is {tool.name} Worth It?</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide text-green-600">Pros</h3>
                <ul className="space-y-2">
                  {tool.pros.slice(0, 4).map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide text-red-500">Cons</h3>
                <ul className="space-y-2">
                  {tool.cons.slice(0, 4).map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0 font-bold text-sm leading-5">&#10007;</span>
                      <span className="text-muted-foreground">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {tool.bestFor && tool.bestFor.length > 0 && (
            <div className="bg-card border border-border rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Who Is {tool.name} Best For?</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {tool.bestFor.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 rounded-lg border border-border bg-background p-3">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tool.faqs && tool.faqs.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4">{tool.name} Pricing FAQ</h2>
              <div className="space-y-4">
                {tool.faqs.slice(0, 4).map((faq, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-5">
                    <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 border border-primary/20 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">Ready to get started with {tool.name}?</h3>
            <p className="text-muted-foreground mb-5">
              {tool.pricing?.hasFree
                ? "Start free — no credit card required."
                : `Plans from ${tool.pricing?.starting ?? tiers[0]?.price ?? "varies"}.`}
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button variant="gradient" size="lg" asChild>
                <AffiliateLink href={tool.affiliateUrl} toolName={tool.name} placement="pricing_bottom">
                  {tool.pricing?.hasFree ? `Try ${tool.name} Free` : `Visit ${tool.name}`}
                  <ExternalLink className="ml-2 w-4 h-4" />
                </AffiliateLink>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href={`/reviews/${tool.slug}`}>Read Full Review</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
