"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Filter, X } from "lucide-react";
import { categories } from "@/data/categories";
import { getTagsByGroup } from "@/data/tags";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterPanelProps {
  className?: string;
  compact?: boolean; // horizontal chips mode
}

type FilterKey = "category" | "tag" | "free" | "minRating" | "badge" | "type";

export function FilterPanel({ className, compact = false }: FilterPanelProps) {
  const router       = useRouter();
  const searchParams = useSearchParams();

  const get    = (key: string)        => searchParams.get(key) ?? "";
  const active = (key: string, val: string) => get(key) === val;

  const toggle = useCallback(
    (key: FilterKey, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page"); // reset pagination on filter change
      if (params.get(key) === value) params.delete(key);
      else params.set(key, value);
      router.push(`/search?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const toggleBool = useCallback(
    (key: FilterKey) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      if (params.has(key)) params.delete(key);
      else params.set(key, "1");
      router.push(`/search?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const clearAll = () => {
    const params = new URLSearchParams();
    const q = searchParams.get("q");
    if (q) params.set("q", q);
    router.push(`/search?${params.toString()}`, { scroll: false });
  };

  const hasFilters = !!(get("category") || get("tag") || get("free") || get("badge") || get("minRating") || get("type"));

  const ratingOptions = [{ label: "4.5+", val: "4.5" }, { label: "4.0+", val: "4.0" }, { label: "3.5+", val: "3.5" }];
  const typeOptions   = [{ label: "Tool Reviews", val: "tool" }, { label: "Comparisons", val: "comparison" }, { label: "Best Lists", val: "best-list" }];
  const badgeOptions  = [{ label: "★ Editor's Choice", val: "editor-choice" }, { label: "👍 Recommended", val: "recommended" }, { label: "📝 Best Value", val: "best-value" }, { label: "📊 Trending", val: "trending" }];
  const featureTags   = getTagsByGroup("feature").slice(0, 8);
  const usecaseTags   = getTagsByGroup("usecase").slice(0, 6);
  const pricingTags   = getTagsByGroup("pricing");

  if (compact) {
    return (
      <div className={cn("flex flex-wrap gap-2 items-center", className)}>
        <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        {categories.slice(0, 5).map((cat) => (
          <button
            key={cat.slug}
            onClick={() => toggle("category", cat.slug)}
            className={cn("text-xs px-3 py-1 rounded-full border transition-all",
              active("category", cat.slug)
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background border-border hover:border-primary/60"
            )}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
        <button
          onClick={() => toggleBool("free")}
          className={cn("text-xs px-3 py-1 rounded-full border transition-all",
            searchParams.has("free")
              ? "bg-green-500 text-white border-green-500"
              : "bg-background border-border hover:border-green-400"
          )}
        >
          Free Plan
        </button>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearAll} className="h-7 text-xs gap-1">
            <X className="w-3 h-3" /> Clear
          </Button>
        )}
      </div>
    );
  }

  return (
    <aside className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filters
        </h3>
        {hasFilters && (
          <button onClick={clearAll} className="text-xs text-primary hover:underline flex items-center gap-1">
            <X className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      {/* Content Type */}
      <FilterSection title="Content Type">
        {typeOptions.map(({ label, val }) => (
          <FilterChip key={val} label={label} active={active("type", val)} onClick={() => toggle("type", val)} />
        ))}
      </FilterSection>

      {/* Category */}
      <FilterSection title="Category">
        {categories.map((cat) => (
          <FilterChip key={cat.slug} label={`${cat.icon} ${cat.name}`} active={active("category", cat.slug)} onClick={() => toggle("category", cat.slug)} count={cat.toolCount} />
        ))}
      </FilterSection>

      {/* Pricing */}
      <FilterSection title="Pricing">
        <FilterChip label="✓ Free Plan Available" active={searchParams.has("free")} onClick={() => toggleBool("free")} />
        {pricingTags.map((t) => (
          <FilterChip key={t.slug} label={t.label} active={active("tag", t.slug)} onClick={() => toggle("tag", t.slug)} />
        ))}
      </FilterSection>

      {/* Badge */}
      <FilterSection title="Our Rating">
        {badgeOptions.map(({ label, val }) => (
          <FilterChip key={val} label={label} active={active("badge", val)} onClick={() => toggle("badge", val)} />
        ))}
      </FilterSection>

      {/* Min Rating */}
      <FilterSection title="User Rating">
        {ratingOptions.map(({ label, val }) => (
          <FilterChip key={val} label={`★ ${label}`} active={active("minRating", val)} onClick={() => toggle("minRating", val)} />
        ))}
      </FilterSection>

      {/* Feature Tags */}
      <FilterSection title="Features">
        {featureTags.map((t) => (
          <FilterChip key={t.slug} label={t.label} active={active("tag", t.slug)} onClick={() => toggle("tag", t.slug)} />
        ))}
      </FilterSection>

      {/* Use Case Tags */}
      <FilterSection title="Use Cases">
        {usecaseTags.map((t) => (
          <FilterChip key={t.slug} label={t.label} active={active("tag", t.slug)} onClick={() => toggle("tag", t.slug)} />
        ))}
      </FilterSection>
    </aside>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">{title}</p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function FilterChip({ label, active, onClick, count }: { label: string; active: boolean; onClick: () => void; count?: number }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-xs px-2.5 py-1 rounded-full border transition-all flex items-center gap-1",
        active
          ? "bg-primary text-primary-foreground border-primary font-medium"
          : "bg-background border-border hover:border-primary/50 hover:bg-accent"
      )}
    >
      {label}
      {count !== undefined && <span className="opacity-60">({count})</span>}
    </button>
  );
}
