import Link from "next/link";
import { Metadata } from "next";
import { allDeals } from "@/data/deals";
import { getToolBySlug } from "@/data/tools";

export const metadata: Metadata = {
  title: "Best AI Tool Deals & Discounts 2026 | AISaaSToolkit",
  description: "Verified AI tool deals, free trials, and discount codes. Updated weekly. Save money on the best AI writing, video, voice, and automation tools.",
  alternates: { canonical: "https://aisaastoolkit.com/deals" },
};

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-b from-amber-50 to-background dark:from-amber-900/10 dark:to-background py-16 border-b border-border">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-medium px-3 py-1 rounded-full mb-4">
            Verified Deals
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">AI Tool Deals &amp; Free Trials</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Verified free trials and deals for the top AI tools. All tested by our team.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl py-12">
        <div className="grid gap-5">
          {allDeals.map(deal => {
            const tool = getToolBySlug(deal.toolSlug);
            return (
              <div key={deal.id} className="bg-card border border-border rounded-xl p-6">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className={`w-14 h-14 rounded-xl ${tool?.logoColor ?? "bg-primary"} flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}>
                    {tool?.logo ?? deal.toolName[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start gap-2 mb-1">
                      <h2 className="text-lg font-bold text-foreground">{deal.headline}</h2>
                      {deal.isVerified && <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full font-medium mt-0.5">✅ Verified</span>}
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{deal.description}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">{deal.discountAmount}</span>
                      {deal.discountCode && <span className="text-xs font-mono bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 px-2 py-1 rounded">CODE: {deal.discountCode}</span>}
                      {deal.expiryDate && <span className="text-xs text-muted-foreground">Expires: {deal.expiryDate}</span>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:flex-shrink-0">
                    <Link href={deal.dealUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-white bg-amber-500 hover:bg-amber-600 px-5 py-2.5 rounded-lg transition-colors text-center text-sm whitespace-nowrap">
                      Get This Deal →
                    </Link>
                    {tool && <Link href={`/reviews/${tool.slug}`} className="text-sm text-center text-muted-foreground hover:text-primary transition-colors">Read Review</Link>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>All deals are verified by our team. Some links are affiliate links — <Link href="/affiliate-disclosure" className="underline">see our disclosure</Link>. Deals and pricing are subject to change.</p>
        </div>
      </div>
    </div>
  );
}
