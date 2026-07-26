"use client";
import { useEffect, useState } from "react";
import { ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AffiliateLink } from "@/components/common/AffiliateLink";

interface StickyAffiliateCTAProps {
  toolName: string;
  affiliateUrl: string;
  pricing: string;
  hasFree?: boolean;
  badge?: string;
}

export function StickyAffiliateCTA({ toolName, affiliateUrl, pricing, hasFree, badge }: StickyAffiliateCTAProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!dismissed) setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  if (!visible || dismissed) return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-md shadow-2xl slide-up"
    )}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center font-black text-primary">
            {toolName.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-bold">{toolName}</p>
            <p className="text-xs text-muted-foreground">Starting from {pricing}</p>
          </div>
          {badge && (
            <span className="hidden sm:inline text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ background: "linear-gradient(135deg,#667eea,#764ba2)" }}>
              {badge}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="gradient" size="sm" asChild className="text-xs sm:text-sm">
            <AffiliateLink href={affiliateUrl} toolName={toolName} placement="sticky_bar">
              {hasFree ? `Try ${toolName} Free` : `Visit ${toolName}`} <ExternalLink className="ml-1.5 w-3.5 h-3.5" />
            </AffiliateLink>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={() => setDismissed(true)} aria-label="Dismiss">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
