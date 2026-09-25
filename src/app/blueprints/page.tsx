import type { Metadata } from "next";
import Link from "next/link";
import { BLUEPRINTS } from "@/data/blueprints";

export const metadata: Metadata = {
  title: "Free AI & Automation Blueprints — Download Ready-to-Use Make.com Scenarios",
  description: "Download free, production-ready Make.com automation blueprints. Automate Shopify orders, Instagram DM replies, and lead generation in under 10 minutes.",
  alternates: {
    canonical: "https://aisaastoolkit.com/blueprints",
  },
};

export default function BlueprintsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
          <span className="animate-pulse">⚡</span> 100% Free Automation Blueprints
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
          Ready-to-Import <span className="gradient-text">Automation Scenarios</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Skip hours of trial and error. Download our pre-configured Make.com JSON scenarios, import them into your workspace in 3 clicks, and let AI do the heavy lifting.
        </p>

        {/* Affiliate CTA Box */}
        <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div>
            <div className="font-bold text-sm text-foreground flex items-center gap-2">
              <span>🚀 Don&apos;t have a Make.com account yet?</span>
              <span className="text-[10px] bg-green-500 text-white font-bold px-2 py-0.5 rounded-full uppercase">Official Partner</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Sign up through our link to unlock 1,000 free operations/month to run these blueprints.
            </p>
          </div>
          <a
            href="https://www.make.com/en/register?pc=aisaastoolkit"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex-shrink-0 text-xs font-bold text-white px-5 py-2.5 rounded-lg shadow-md hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
          >
            Claim Free Account →
          </a>
        </div>
      </div>

      {/* Grid of Blueprints */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {BLUEPRINTS.map((bp) => (
          <div
            key={bp.slug}
            className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between hover:border-primary/50 hover:shadow-xl transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                  {bp.category}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  ⏱️ {bp.setupTimeMinutes} min setup
                </span>
              </div>

              <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                <Link href={`/blueprints/${bp.slug}`}>{bp.title}</Link>
              </h2>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {bp.shortDescription}
              </p>

              <div className="border-t border-border/50 pt-3 mb-4">
                <div className="text-xs font-semibold text-muted-foreground mb-2">Required Apps:</div>
                <div className="flex flex-wrap gap-1.5">
                  {bp.requiredApps.map((app) => (
                    <span
                      key={app}
                      className="text-[11px] px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
              <Link
                href={`/blueprints/${bp.slug}`}
                className="w-full text-center text-sm font-semibold text-white py-2.5 px-4 rounded-xl shadow-md transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
              >
                View & Download Blueprint →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* How It Works Section */}
      <div className="rounded-2xl border border-border bg-card/50 p-8 text-center max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">How to Use These Blueprints in 3 Steps</h3>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="p-4 rounded-xl bg-background border border-border">
            <div className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center mb-3">1</div>
            <h4 className="font-bold text-sm mb-1">Download the JSON file</h4>
            <p className="text-xs text-muted-foreground">Download any blueprint directly to your computer without registration.</p>
          </div>
          <div className="p-4 rounded-xl bg-background border border-border">
            <div className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center mb-3">2</div>
            <h4 className="font-bold text-sm mb-1">Import into Make.com</h4>
            <p className="text-xs text-muted-foreground">In Make.com, click &quot;Create new scenario&quot; &gt; &quot;Import Blueprint&quot; and upload the JSON.</p>
          </div>
          <div className="p-4 rounded-xl bg-background border border-border">
            <div className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center mb-3">3</div>
            <h4 className="font-bold text-sm mb-1">Connect Your Accounts</h4>
            <p className="text-xs text-muted-foreground">Authorize your apps (Shopify, Sheets, Instagram) and hit Run. You&apos;re done!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
