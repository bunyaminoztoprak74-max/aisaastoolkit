import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getComparisonBySlug, comparisons } from "@/data/comparisons";
import { getToolBySlug } from "@/data/tools";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AffiliateDisclosure } from "@/components/common/AffiliateDisclosure";
import { FAQSection } from "@/components/reviews/FAQSection";
import { InternalLinksWidget } from "@/components/common/InternalLinksWidget";
import { ComparisonEngine } from "@/components/comparisons/ComparisonEngine";
import type { EngineFeatureRow, EnginePricingRow } from "@/components/comparisons/ComparisonEngine";
import { buildMetadata, buildComparisonKeywords } from "@/lib/seo";
import { buildComparisonSchema, buildFAQSchema, buildBreadcrumbSchema } from "@/lib/schema";

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const comp  = getComparisonBySlug(slug);
  if (!comp) return {};
  const tool1 = getToolBySlug(comp.tool1Slug);
  const tool2 = getToolBySlug(comp.tool2Slug);
  return buildMetadata({
    title:    comp.title,
    description: comp.metaDescription,
    path:     `/compare/${slug}`,
    type:     "article",
    modifiedTime: comp.lastUpdated,
    keywords: buildComparisonKeywords(tool1?.name ?? "", tool2?.name ?? ""),
  });
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comp  = getComparisonBySlug(slug);
  if (!comp) notFound();

  const tool1 = getToolBySlug(comp.tool1Slug);
  const tool2 = getToolBySlug(comp.tool2Slug);
  if (!tool1 || !tool2) notFound();

  // Build typed props for the engine
  const features: EngineFeatureRow[] = comp.features.map((f) => ({
    feature: f.feature,
    tool1:   f.tool1,
    tool2:   f.tool2,
    winner:  f.winner,
  }));

  const pricing: EnginePricingRow = {
    tool1Free:     comp.pricingComparison.tool1Free,
    tool2Free:     comp.pricingComparison.tool2Free,
    tool1Starting: comp.pricingComparison.tool1Starting,
    tool2Starting: comp.pricingComparison.tool2Starting,
    tool1Plan:     comp.pricingComparison.tool1BestPlan,
    tool2Plan:     comp.pricingComparison.tool2BestPlan,
    winner:        comp.pricingComparison.winner === "tie" ? 1 : comp.pricingComparison.winner,
  };

  // Schemas
  const compSchema       = buildComparisonSchema(comp, tool1.name, tool2.name);
  const faqSchema        = buildFAQSchema(comp.faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "Comparisons" },
    { label: `${tool1.name} vs ${tool2.name}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(compSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Breadcrumb
          items={[{ label: "Comparisons" }, { label: `${tool1.name} vs ${tool2.name}` }]}
          className="mb-6"
        />

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-black mb-4">{comp.headline}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{comp.intro}</p>
        </div>

        <AffiliateDisclosure className="mb-10" />

        <ComparisonEngine
          tool1={tool1}
          tool2={tool2}
          features={features}
          pricing={pricing}
          bestFor1={comp.bestFor.tool1}
          bestFor2={comp.bestFor.tool2}
          verdict={comp.verdict}
          winner={comp.tool1Winner ? 1 : 2}
          winnerNote={comp.winnerReason}
        />

        <div className="mt-12">
          <FAQSection faqs={comp.faqs} toolName={`${tool1.name} vs ${tool2.name}`} />
        </div>

        <div className="mt-12">
          <InternalLinksWidget currentUrl={`/compare/${slug}`} title="Also Read" />
        </div>
      </div>
    </>
  );
}
