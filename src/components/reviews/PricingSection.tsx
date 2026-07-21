import { Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { PricingTier } from "@/data/tools";
import { cn } from "@/lib/utils";
import { AffiliateLink } from "@/components/common/AffiliateLink";

export function PricingSection({ tiers, toolName, affiliateUrl }: { tiers: PricingTier[]; toolName: string; affiliateUrl: string }) {
  return (
    <div>
      <h2 id="pricing" className="text-2xl font-bold mb-6">{toolName} Pricing</h2>
      <div className={cn("grid gap-4", tiers.length === 2 ? "sm:grid-cols-2" : tiers.length >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "")}>
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              "relative rounded-xl border p-6 flex flex-col",
              tier.highlighted
                ? "border-primary shadow-lg bg-gradient-to-b from-primary/5 to-purple-500/5"
                : "border-border bg-card"
            )}
          >
            {tier.badge && (
              <Badge variant="recommended" className="absolute -top-3 left-1/2 -translate-x-1/2 shadow-sm">
                {tier.badge}
              </Badge>
            )}
            <div className="mb-4">
              <h3 className="font-bold text-lg">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black">{tier.price}</span>
                <span className="text-muted-foreground text-sm">{tier.period}</span>
              </div>
            </div>
            <ul className="space-y-2 flex-1 mb-6">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button
              variant={tier.highlighted ? "gradient" : "outline"}
              className="w-full"
              asChild
            >
              <AffiliateLink href={affiliateUrl} toolName={toolName} placement={`pricing_${tier.name.toLowerCase().replace(/\s+/g, "_")}`}>
                Get {tier.name} <ExternalLink className="ml-2 w-3.5 h-3.5" />
              </AffiliateLink>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
