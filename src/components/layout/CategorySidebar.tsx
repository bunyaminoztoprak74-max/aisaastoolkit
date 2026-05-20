import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { categories } from "@/data/categories";
import { tools } from "@/data/tools";
import { cn } from "@/lib/utils";

interface CategorySidebarProps {
  activeCategorySlug?: string;
  className?: string;
}

export function CategorySidebar({ activeCategorySlug, className }: CategorySidebarProps) {
  // Count actual tools per category from data
  const countMap = Object.fromEntries(
    categories.map((cat) => [
      cat.slug,
      tools.filter((t) => t.categories.includes(cat.slug)).length,
    ])
  );

  return (
    <nav className={cn("space-y-1", className)} aria-label="Categories">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-3">
        Browse Categories
      </p>
      {categories.map((cat) => {
        const isActive = cat.slug === activeCategorySlug;
        return (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group",
              isActive
                ? "bg-primary/10 text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            <span className={cn(
              "w-7 h-7 rounded-md flex items-center justify-center text-sm transition-all",
              `bg-gradient-to-br ${cat.color}`,
              isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"
            )}>
              {cat.icon}
            </span>
            <span className="flex-1">{cat.name}</span>
            <span className={cn(
              "text-[10px] font-medium px-1.5 py-0.5 rounded-full transition-all",
              isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground group-hover:bg-accent"
            )}>
              {countMap[cat.slug] ?? 0}
            </span>
            {isActive && <ChevronRight className="w-3.5 h-3.5 text-primary" />}
          </Link>
        );
      })}
      <div className="border-t border-border pt-3 mt-3">
        <Link
          href="/tags"
          className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-accent"
        >
          🏷️ Browse all tags
        </Link>
        <Link
          href="/search"
          className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-accent"
        >
          🔍 Advanced search
        </Link>
      </div>
    </nav>
  );
}
