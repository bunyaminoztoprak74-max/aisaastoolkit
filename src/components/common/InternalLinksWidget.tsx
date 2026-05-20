import Link from "next/link";
import { ArrowRight, BookOpen, BarChart2, List, Layers } from "lucide-react";
import { getSuggestedLinks, type LinkableEntity } from "@/lib/linking";
import { cn } from "@/lib/utils";

const typeIcons = {
  tool:        <BookOpen className="w-3.5 h-3.5" />,
  comparison:  <BarChart2 className="w-3.5 h-3.5" />,
  "best-list": <List className="w-3.5 h-3.5" />,
  category:    <Layers className="w-3.5 h-3.5" />,
};

const typeColors = {
  tool:        "text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400",
  comparison:  "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400",
  "best-list": "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400",
  category:    "text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400",
};

interface InternalLinksWidgetProps {
  currentUrl: string;
  title?: string;
  limit?: number;
  className?: string;
  layout?: "grid" | "list";
}

export function InternalLinksWidget({
  currentUrl,
  title = "Related Reading",
  limit = 6,
  className,
  layout = "grid",
}: InternalLinksWidgetProps) {
  const links = getSuggestedLinks(currentUrl, limit);
  if (links.length === 0) return null;

  return (
    <div className={cn("rounded-xl border border-border bg-card p-5", className)}>
      <h3 className="font-bold text-base mb-4 flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-primary" />
        {title}
      </h3>
      <div className={cn(
        layout === "grid" ? "grid sm:grid-cols-2 gap-2" : "space-y-2"
      )}>
        {links.map((link) => (
          <InternalLinkItem key={link.url} link={link} />
        ))}
      </div>
    </div>
  );
}

function InternalLinkItem({ link }: { link: LinkableEntity }) {
  return (
    <Link
      href={link.url}
      className="group flex items-center gap-3 rounded-lg p-2.5 hover:bg-accent transition-colors"
    >
      <span className={cn("w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0", typeColors[link.type])}>
        {typeIcons[link.type]}
      </span>
      <span className="flex-1 text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">
        {link.label}
      </span>
      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 flex-shrink-0 transition-opacity" />
    </Link>
  );
}
