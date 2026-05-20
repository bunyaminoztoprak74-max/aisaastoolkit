import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { getTrendingTools } from "@/data/tools";
import { StarRating } from "@/components/common/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const badgeMap: Record<string, "recommended" | "best-value" | "trending" | "new" | "editor-choice"> = {
  recommended: "recommended",
  "best-value": "best-value",
  trending: "trending",
  new: "new",
  "editor-choice": "editor-choice",
};

export function TrendingTools() {
  const tools = getTrendingTools(4);
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Trending AI Tools</h2>
            <p className="text-muted-foreground">The most popular tools our readers are checking out right now</p>
          </div>
          <Button variant="outline" asChild className="hidden sm:flex">
            <Link href="/best/ai-automation-tools">View All <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <Card key={tool.slug} className="group hover:border-primary/50 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center text-2xl font-bold text-primary">
                    {tool.name.charAt(0)}
                  </div>
                  {tool.badge && (
                    <Badge variant={badgeMap[tool.badge]} className="text-xs capitalize">
                      {tool.badge.replace("-", " ")}
                    </Badge>
                  )}
                </div>
                <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">{tool.name}</h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{tool.tagline}</p>
                <StarRating rating={tool.rating} reviewCount={tool.reviewCount} size="sm" className="mb-4" />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-xs" asChild>
                    <Link href={`/reviews/${tool.slug}`}>Read Review</Link>
                  </Button>
                  <Button variant="gradient" size="sm" className="flex-1 text-xs" asChild>
                    <a href={tool.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow">
                      Visit <ExternalLink className="ml-1 w-3 h-3" />
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
