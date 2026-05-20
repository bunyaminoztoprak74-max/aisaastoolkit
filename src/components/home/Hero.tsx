import Link from "next/link";
import { ArrowRight, Star, TrendingUp, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-bg opacity-[0.07] dark:opacity-[0.12]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      {/* Decorative circles */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "linear-gradient(135deg,#667eea,#764ba2)" }} />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "linear-gradient(135deg,#6B8DD6,#667eea)" }} />

      <div className="relative container mx-auto px-4 py-20 md:py-28 text-center">
        <Badge variant="outline" className="mb-6 gap-1.5 py-1.5 px-4 text-sm font-medium">
          <TrendingUp className="w-3.5 h-3.5 text-primary" />
          Updated for 2026 — 50+ Tools Reviewed
        </Badge>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
          Find the{" "}
          <span className="gradient-text">Best AI Tools</span>{" "}
          for Your Business
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Independent reviews, side-by-side comparisons, and expert rankings of the top AI SaaS tools in 2026. We test every tool so you don't have to.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Button variant="gradient" size="xl" asChild>
            <Link href="/best/ai-automation-tools">
              Explore Top AI Tools <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="xl" asChild>
            <Link href="/compare/claude-vs-chatgpt">Compare AI Tools</Link>
          </Button>
        </div>

        {/* Trust signals */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-500" />
            <span>100% Independent Reviews</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span>50+ Tools Tested & Rated</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span>Updated Monthly</span>
          </div>
        </div>
      </div>
    </section>
  );
}
