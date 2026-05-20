import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateBreadcrumbs, type BreadcrumbItem } from "@/lib/breadcrumbs";

interface BreadcrumbProps {
  /** Manual breadcrumb trail. If omitted, `pathname` must be provided. */
  items?: BreadcrumbItem[];
  /** Auto-generate the trail from this pathname using generateBreadcrumbs(). */
  pathname?: string;
  className?: string;
}

export function Breadcrumb({ items, pathname, className }: BreadcrumbProps) {
  const resolved = items ?? (pathname ? generateBreadcrumbs(pathname) : []);
  const allItems = [{ label: "Home", href: "/" }, ...resolved];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `https://aisaastoolkit.com${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1 text-sm text-muted-foreground", className)}>
        {allItems.map((item, index) => (
          <span key={index} className="flex items-center gap-1">
            {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 flex-shrink-0" />}
            {index === 0 && <Home className="w-3.5 h-3.5 flex-shrink-0" />}
            {item.href && index < allItems.length - 1 ? (
              <Link href={item.href} className="hover:text-primary transition-colors truncate max-w-[150px]">
                {item.label}
              </Link>
            ) : (
              <span className={cn("truncate max-w-[200px]", index === allItems.length - 1 && "text-foreground font-medium")}>
                {item.label}
              </span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
