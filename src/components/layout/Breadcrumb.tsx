import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateBreadcrumbs, type BreadcrumbItem } from "@/lib/breadcrumbs";

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  pathname?: string;
  className?: string;
}

export function Breadcrumb({ items, pathname, className }: BreadcrumbProps) {
  const allItems = items
    ? [{ label: "Home", href: "/" }, ...items]
    : pathname
      ? generateBreadcrumbs(pathname)
      : [{ label: "Home", href: "/" }];

  return (
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
              <span className="text-foreground font-medium truncate max-w-[200px]">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
  );
}
