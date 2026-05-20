import { Info } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AffiliateDisclosureProps {
  compact?:   boolean;
  className?: string;
}

export function AffiliateDisclosure({ compact = false, className }: AffiliateDisclosureProps) {
  if (compact) {
    return (
      <p className={cn("text-xs text-muted-foreground flex items-center gap-1", className)}>
        <Info className="w-3 h-3 flex-shrink-0" />
        <span>
          Some links are affiliate links.{" "}
          <Link href="/affiliate-disclosure" className="underline hover:text-primary">
            Learn more
          </Link>
          .
        </span>
      </p>
    );
  }

  return (
    <div className={cn(
      "rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 p-4 flex gap-3",
      className
    )}>
      <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
      <div className="text-sm text-blue-800 dark:text-blue-300">
        <strong>Affiliate Disclosure:</strong> This page contains affiliate links. If you purchase
        through our links, we may earn a commission at no extra cost to you. Our reviews are
        independent and unbiased.{" "}
        <Link href="/affiliate-disclosure" className="underline hover:text-blue-600">
          Full disclosure →
        </Link>
      </div>
    </div>
  );
}
