import Link from "next/link";
import { ArrowLeftRight } from "lucide-react";
import { comparisons } from "@/data/comparisons";
import { Button } from "@/components/ui/button";

export function TopComparisons() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Top AI Tool Comparisons</h2>
          <p className="text-muted-foreground text-lg">Head-to-head breakdowns to help you pick the right tool</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {comparisons.slice(0, 3).map((comp) => (
            <Link
              key={comp.slug}
              href={`/compare/${comp.slug}`}
              className="group rounded-xl border border-border bg-card p-6 hover:border-primary/50 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center font-bold text-primary">
                  {comp.tool1Slug.charAt(0).toUpperCase()}
                </div>
                <ArrowLeftRight className="w-5 h-5 text-muted-foreground" />
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center font-bold text-blue-600">
                  {comp.tool2Slug.charAt(0).toUpperCase()}
                </div>
              </div>
              <h3 className="text-sm font-bold text-center group-hover:text-primary transition-colors line-clamp-2">{comp.title}</h3>
              <p className="text-xs text-center text-muted-foreground mt-2">Read comparison →</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/compare/claude-vs-chatgpt">View All Comparisons</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
