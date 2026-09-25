import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLUEPRINTS, getBlueprintBySlug } from "@/data/blueprints";
import { BlueprintDownloadModal } from "@/components/blueprints/BlueprintDownloadModal";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLUEPRINTS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blueprint = getBlueprintBySlug(slug);
  if (!blueprint) return { title: "Blueprint Not Found" };

  return {
    title: `${blueprint.title} — Free Make.com Blueprint Download`,
    description: blueprint.shortDescription,
    alternates: {
      canonical: `https://aisaastoolkit.com/blueprints/${slug}`,
    },
  };
}

export default async function BlueprintDetailPage({ params }: Props) {
  const { slug } = await params;
  const blueprint = getBlueprintBySlug(slug);

  if (!blueprint) notFound();

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/blueprints" className="hover:text-primary transition-colors">Blueprints</Link>
        <span>/</span>
        <span className="text-foreground font-medium truncate">{blueprint.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
            {blueprint.category}
          </span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground border">
            {blueprint.difficulty}
          </span>
          <span className="text-xs text-muted-foreground">
            ⚡ {blueprint.setupTimeMinutes} Minute Setup
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
          {blueprint.title}
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed">
          {blueprint.fullDescription}
        </p>
      </div>

      {/* PRIMARY ACTION / DOWNLOAD + AFFILIATE BOX */}
      <div className="rounded-2xl border-2 border-primary/30 bg-card p-6 md:p-8 mb-10 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
          Verified Working
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Download Ready-to-Import JSON</h3>
            <p className="text-sm text-muted-foreground">
              File: <code className="font-mono text-xs bg-muted px-2 py-0.5 rounded">{blueprint.downloadFileName}</code> • Instant download &amp; 1-click import walkthrough
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
            <BlueprintDownloadModal
              blueprintTitle={blueprint.title}
              blueprintSlug={blueprint.slug}
              downloadUrl={blueprint.downloadUrl}
              downloadFileName={blueprint.downloadFileName}
              affiliateUrl={blueprint.featuredTool.affiliateUrl}
            />
          </div>
        </div>

        {/* Affiliate Partner Notice & Link */}
        <div className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/40 p-4 rounded-xl">
          <div>
            <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <span>Required: Make.com Free Account</span>
              <span className="text-[10px] bg-primary text-white px-2 py-0.2 rounded-full">Partner Offer</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              To import and run this scenario, you need a free Make.com account. Use our link for 1,000 free operations/month.
            </p>
          </div>
          <a
            href={blueprint.featuredTool.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex-shrink-0 text-xs font-bold text-white px-5 py-2.5 rounded-lg shadow hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
          >
            Open Free Make.com Account →
          </a>
        </div>
      </div>

      {/* Features List */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">What This Scenario Does</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {blueprint.features.map((feat, i) => (
            <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-xl border bg-card/60">
              <span className="text-green-500 font-bold mt-0.5">✓</span>
              <span className="text-sm font-medium">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step by Step Setup Guide */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Step-by-Step Setup Instructions</h2>
        <div className="space-y-4">
          {blueprint.steps.map((st, i) => (
            <div key={i} className="p-5 rounded-xl border bg-card flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center flex-shrink-0 text-sm">
                {i + 1}
              </div>
              <div>
                <h3 className="font-bold text-base mb-1">{st.title}</h3>
                <p className="text-sm text-muted-foreground">{st.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {blueprint.faq.map((item, i) => (
            <div key={i} className="p-4 rounded-xl border bg-card">
              <h3 className="font-bold text-sm mb-1.5">{item.question}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Sticky Action Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-primary/30 text-center">
        <h3 className="text-xl font-bold mb-2">Ready to Automate Your Business?</h3>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-4">
          Download the JSON blueprint, sign up for your free Make.com account, and start automating in 5 minutes.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={blueprint.downloadUrl}
            download={blueprint.downloadFileName}
            className="text-xs font-bold text-white bg-green-600 hover:bg-green-700 py-3 px-6 rounded-lg transition-colors"
          >
            Download Blueprint ({blueprint.downloadFileName})
          </a>
          <a
            href={blueprint.featuredTool.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="text-xs font-bold text-white py-3 px-6 rounded-lg transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
          >
            Create Free Make.com Account →
          </a>
        </div>
      </div>
    </div>
  );
}
