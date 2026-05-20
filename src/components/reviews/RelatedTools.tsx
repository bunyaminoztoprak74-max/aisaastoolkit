import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/common/StarRating";
import type { Tool } from "@/data/tools";

export function RelatedTools({ tools }: { tools: Tool[] }) {
  if (!tools.length) return null;
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <div key={tool.slug} className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center font-bold text-primary flex-shrink-0">
              {tool.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm">{tool.name}</h3>
              <StarRating rating={tool.rating} showNumber size="sm" />
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button variant="outline" size="sm" asChild className="text-xs">
                <Link href={`/reviews/${tool.slug}`}>Review</Link>
              </Button>
              <Button variant="gradient" size="sm" asChild className="text-xs">
                <a href={tool.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow">
                  Visit <ExternalLink className="ml-1 w-3 h-3" />
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
