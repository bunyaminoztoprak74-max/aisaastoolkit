"use client";
import Link from "next/link";
import { ExternalLink, Star, ArrowRight, Layers, BarChart3, List } from "lucide-react";
import type { SearchEntry } from "@/data/searchIndex";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const typeIcons = {
  tool: <Star className="w-3.5 h-3.5" />,
  comparison: <BarChart3 className="w-3.5 h-3.5" />,
  "best-list": <List className="w-3.5 h-3.5" />,
  category: <Layers className="w-3.5 h-3.5" />,
};

const typeLabels = {
  tool: "Tool Review",
  comparison: "Comparison",
  "best-list": "Best List",
  category: "Category",
};

const badgeVariantMap: Record<string, "recommended" | "best-value" | "trending" | "new" | "editor-choice"> = {
  recommended: "recommended",
  "best-value": "best-value",
  trending: "trending",
  new: "new",
  "editor-choice": "editor-choice",
};

interface SearchResultsProps {
  results: SearchEntry[];
  query?: string;
  totalCount: number;
  className?: string;
}

function highlight(text: string, query?: string) {
  if (!query || query.trim().length < 2) return text;
  const terms = query.trim().split(/\s+/).filter((t) => t.length > 1);
  const regex = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part)
      ? <mark key={i} className="bg-yellow-200 dark:bg-yellow-800/50 rounded px-0.5">{part}</mark>
      : part
  );
}

export function SearchResults({ results, query, totalCount, className }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className={cn("text-center py-16", className)}>
        <div className="text-4xl mb-3">🔍</div>
        <h3 className="text-lg font-bold mb-2">No results found</h3>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          {query ? `We couldn't find anything for "${query}". Try different keywords or remove some filters.` : "Try adjusting your filters."}
        </p>
        <Button variant="outline" className="mt-4" asChild>
          <Link href="/best/ai-automation-tools">Browse All AI Tools</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="text-sm text-muted-foreground mb-4">
        <span className="font-semibold text-foreground">{totalCount}</span> result{totalCount !== 1 ? "s" : ""}
        {query && <> for <span className="font-semibold text-foreground">"{query}"</span></>}
      </p>
      <div className="space-y-3">
        {results.map((entry) => (
          <ResultCard key={entry.id} entry={entry} query={query} />
        ))}
      </div>
    </div>
  );
}

function ResultCard({ entry, query }: { entry: SearchEntry; query?: string }) {
  return (
    <Link
      href={entry.url}
      className="group flex gap-4 rounded-xl border border-border bg-card p-4 hover:border-primary/50 hover:shadow-md transition-all duration-200"
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center font-black text-primary text-lg flex-shrink-0">
        {entry.type === "tool" ? entry.title.charAt(0) : typeIcons[entry.type]}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="font-bold text-sm group-hover:text-primary transition-colors">
            {highlight(entry.title, query)}
          </span>
          <Badge variant="outline" className="text-[10px] py-0 gap-1 flex-shrink-0">
            {typeIcons[entry.type]}
            {typeLabels[entry.type]}
          </Badge>
          {entry.badge && (
            <Badge variant={badgeVariantMap[entry.badge] ?? "outline"} className="text-[10px] py-0 capitalize">
              {entry.badge.replace("-", " ")}
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {highlight(entry.description, query)}
        </p>
        <div className="flex items-center gap-3 mt-2">
          {entry.rating && (
            <span className="text-xs font-semibold flex items-center gap-1 text-yellow-600">
              ★ {entry.rating.toFixed(1)}
            </span>
          )}
          {entry.hasFree && <span className="text-xs text-green-600 font-medium">Free plan</span>}
          {entry.startingPrice && entry.startingPrice !== "Free" && (
            <span className="text-xs text-muted-foreground">From {entry.startingPrice}</span>
          )}
        </div>
      </div>

      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 self-center" />
    </Link>
  );
}
