import Link from "next/link";
import { ArrowRight, CheckCircle, XCircle, ExternalLink } from "lucide-react";
import { getFeaturedTools } from "@/data/tools";
import { StarRating } from "@/components/common/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const badgeVariantMap: Record<string, "recommended" | "best-value" | "trending" | "new" | "editor-choice"> = {
  recommended: "recommended", "best-value": "best-value", trending: "trending", new: "new", "editor-choice": "editor-choice",
};

export function FeaturedReviews() {
  const tools = getFeaturedTools(6);
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Best AI Tools of 2026</h2>
            <p className="text-muted-foreground">Our top picks across every category, thoroughly tested</p>
          </div>
          <Button variant="outline" asChild className="hidden sm:flex">
            <Link href="/best/ai-automation-tools">See All <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Card key={tool.slug} className="group hover:border-primary/40 hover:shadow-xl transition-all duration-200 flex flex-col">
              <CardContent className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center text-2xl font-black text-primary mb-2">
                      {tool.name.charAt(0)}
                    </div>
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{tool.name}</h3>
                    <p className="text-xs text-muted-foreground">{tool.category.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}</p>
                  </div>
                  {tool.badge && (
                    <Badge variant={badgeVariantMap[tool.badge]} className="text-xs capitalize flex-shrink-0">
                      {tool.badge.replace("-", " ")}
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{tool.tagline}</p>
                <StarRating rating={tool.rating} reviewCount={tool.reviewCount} size="sm" className="mb-4" />

                <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-4">
                  {tool.pros.slice(0, 2).map((pro, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-green-700 dark:text-green-400">
                      <CheckCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{pro}</span>
                    </div>
                  ))}
                  {tool.cons.slice(0, 2).map((con, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-red-600 dark:text-red-400">
                      <XCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{con}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-border flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-xs" asChild>
                    <Link href={`/reviews/${tool.slug}`}>Full Review</Link>
                  </Button>
                  <Button variant="gradient" size="sm" className="flex-1 text-xs" asChild>
                    <a href={tool.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow">
                      Visit Site <ExternalLink className="ml-1 w-3 h-3" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
