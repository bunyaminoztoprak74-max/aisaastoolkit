/**
 * ComparisonEngine — reusable for any two tools.
 * Accepts raw data and renders a full comparison UI
 * with feature table, pricing, best-for, and verdict.
 */
import Link from "next/link";
import { ExternalLink, Trophy, CheckCircle, Check, X } from "lucide-react";
import { StarRating } from "@/components/common/StarRating";
import { TagList } from "@/components/common/TagList";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Tool } from "@/data/tools";

// ——— Types ——————————————————————————————————————————————————————————————————
export interface EngineFeatureRow {
  feature:  string;
  tool1:    string | boolean;
  tool2:    string | boolean;
  winner?:  1 | 2 | "tie";
  note?:    string;
}

export interface EnginePricingRow {
  tool1Free:     boolean;
  tool2Free:     boolean;
  tool1Starting: string;
  tool2Starting: string;
  tool1Plan:     string;
  tool2Plan:     string;
  winner:        1 | 2 | "tie";
}

export interface ComparisonEngineProps {
  tool1:      Tool;
  tool2:      Tool;
  features:   EngineFeatureRow[];
  pricing:    EnginePricingRow;
  bestFor1:   string[];
  bestFor2:   string[];
  verdict:    string;
  winner:     1 | 2;
  winnerNote: string;
}

// ——— Feature cell renderer ———————————————————————————————————————————————————
function FeatureCell({ value }: { value: string | boolean }) {
  if (value === true)  return <Check className="w-5 h-5 text-green-500 mx-auto" />;
  if (value === false) return <X className="w-5 h-5 text-red-400 mx-auto" />;
  return <span className="text-sm">{value}</span>;
}

// ——— Main Component ——————————————————————————————————————————————————————————
export function ComparisonEngine({
  tool1, tool2, features, pricing, bestFor1, bestFor2, verdict, winner, winnerNote,
}: ComparisonEngineProps) {
  const winnerTool  = winner === 1 ? tool1 : tool2;
  const tool1Score  = features.filter((f) => f.winner === 1).length;
  const tool2Score  = features.filter((f) => f.winner === 2).length;
  const tieScore    = features.filter((f) => f.winner === "tie").length;

  return (
    <div className="space-y-12">
      {/* Hero Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {([tool1, tool2] as const).map((tool, idx) => {
          const isWinner = (idx === 0 && winner === 1) || (idx === 1 && winner === 2);
          return (
            <div key={tool.slug} className={cn(
              "relative rounded-2xl border p-6",
              isWinner
                ? "border-primary shadow-lg bg-gradient-to-b from-primary/5 to-transparent"
                : "border-border bg-card"
            )}>
              {isWinner && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow" style={{ background: "linear-gradient(135deg,#667eea,#764ba2)" }}>
                  <Trophy className="w-3.5 h-3.5" /> Editor's Pick
                </div>
              )}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center text-2xl font-black text-primary">
                  {tool.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{tool.name}</h3>
                  <StarRating rating={tool.rating} reviewCount={tool.reviewCount} size="sm" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{tool.tagline}</p>
              <TagList toolSlug={tool.slug} limit={4} className="mb-4" />
              <div className="flex items-center justify-between text-xs mb-4">
                <span className="font-semibold">From: {tool.pricing?.starting ?? tool.startingPrice ?? "varies"}</span>
                {tool.pricing?.hasFree && <Badge variant="recommended" className="text-[10px]">Free plan</Badge>}
              </div>
              <Button variant={isWinner ? "gradient" : "outline"} className="w-full" asChild>
                <a href={tool.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow">
                  Try {tool.name} Free <ExternalLink className="ml-2 w-3.5 h-3.5" />
                </a>
              </Button>
            </div>
          );
        })}
      </div>

      {/* Score summary */}
      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide font-semibold">Feature Score Summary</p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-black text-primary">{tool1Score}</div>
            <div className="text-xs text-muted-foreground">{tool1.name} wins</div>
          </div>
          <div>
            <div className="text-2xl font-black text-muted-foreground">{tieScore}</div>
            <div className="text-xs text-muted-foreground">Ties</div>
          </div>
          <div>
            <div className="text-2xl font-black text-blue-500">{tool2Score}</div>
            <div className="text-xs text-muted-foreground">{tool2.name} wins</div>
          </div>
        </div>
      </div>

      {/* Feature table */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Feature Comparison</h2>
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Feature</th>
                <th className="px-4 py-3 text-center font-bold">{tool1.name}</th>
                <th className="px-4 py-3 text-center font-bold">{tool2.name}</th>
              </tr>
            </thead>
            <tbody>
              {features.map((row, i) => (
                <tr key={i} className={cn("border-b border-border last:border-0 transition-colors", i % 2 === 0 ? "bg-card" : "bg-muted/10")}>
                  <td className="px-4 py-3 font-medium">
                    {row.feature}
                    {row.note && <p className="text-[10px] text-muted-foreground mt-0.5">{row.note}</p>}
                  </td>
                  <td className={cn("px-4 py-3 text-center", row.winner === 1 && "bg-green-50 dark:bg-green-950/20")}>
                    <div className="flex items-center justify-center gap-1">
                      <FeatureCell value={row.tool1} />
                      {row.winner === 1 && <span className="text-[10px] text-green-600 font-bold">""</span>}
                    </div>
                  </td>
                  <td className={cn("px-4 py-3 text-center", row.winner === 2 && "bg-green-50 dark:bg-green-950/20")}>
                    <div className="flex items-center justify-center gap-1">
                      <FeatureCell value={row.tool2} />
                      {row.winner === 2 && <span className="text-[10px] text-green-600 font-bold">""</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pricing */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Pricing Comparison</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {([
            { tool: tool1, free: pricing.tool1Free, starting: pricing.tool1Starting, plan: pricing.tool1Plan, isWinner: pricing.winner === 1 },
            { tool: tool2, free: pricing.tool2Free, starting: pricing.tool2Starting, plan: pricing.tool2Plan, isWinner: pricing.winner === 2 },
          ] as const).map(({ tool, free, starting, plan, isWinner }) => (
            <div key={tool.slug} className={cn(
              "rounded-xl border p-5",
              isWinner ? "border-green-400 dark:border-green-700 bg-green-50 dark:bg-green-950/20" : "border-border bg-card"
            )}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold">{tool.name}</h3>
                {isWinner && <Badge variant="recommended">Better Value</Badge>}
              </div>
              <p className="text-2xl font-black mb-1">{starting}</p>
              <p className="text-xs text-muted-foreground mb-2">{free ? "✓ Free plan available" : "✗ No free plan"}</p>
              <p className="text-xs italic text-muted-foreground">Best plan: {plan}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Best For */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Who Should Use Each?</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {([
            { tool: tool1, bestFor: bestFor1 },
            { tool: tool2, bestFor: bestFor2 },
          ] as const).map(({ tool, bestFor }) => (
            <div key={tool.slug} className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-bold mb-3">{tool.name} is best for:</h3>
              <ul className="space-y-2">
                {bestFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Verdict */}
      <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-purple-500/5 p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Final Verdict</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-2">{verdict}</p>
        <p className="text-sm font-semibold text-primary mb-5">Our pick: {winnerTool.name} — {winnerNote}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="gradient" size="lg" asChild>
            <a href={winnerTool.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow">
              Try {winnerTool.name} <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href={`/reviews/${winnerTool.slug}`}>Full {winnerTool.name} Review →</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
