import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPageRange, type PaginationMeta } from "@/lib/pagination";
import { cn } from "@/lib/utils";

interface PaginationProps {
  meta: PaginationMeta;
  basePath: string;
  searchParams?: Record<string, string>;
  className?: string;
}

function buildUrl(basePath: string, page: number, searchParams?: Record<string, string>): string {
  const params = new URLSearchParams(searchParams ?? {});
  if (page <= 1) params.delete("page");
  else params.set("page", String(page));
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export function Pagination({ meta, basePath, searchParams, className }: PaginationProps) {
  if (meta.totalPages <= 1) return null;

  const { currentPage, totalPages, hasNextPage, hasPrevPage } = meta;
  const pages = getPageRange(currentPage, totalPages);

  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-center gap-1", className)}>
      {/* Prev */}
      {hasPrevPage ? (
        <Link
          href={buildUrl(basePath, currentPage - 1, searchParams)}
          className="flex items-center gap-1 px-3 h-9 rounded-lg border border-border bg-card text-sm font-medium hover:bg-accent hover:border-primary/50 transition-all"
          rel="prev"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 h-9 rounded-lg border border-border/50 bg-muted text-sm text-muted-foreground cursor-not-allowed opacity-50">
          <ChevronLeft className="w-4 h-4" /> Prev
        </span>
      )}

      {/* Page numbers */}
      {pages.map((page, i) =>
        page === "ellipsis" ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-muted-foreground text-sm">
            …
          </span>
        ) : (
          <Link
            key={page}
            href={buildUrl(basePath, page, searchParams)}
            aria-current={page === currentPage ? "page" : undefined}
            aria-label={`Page ${page}`}
            className={cn(
              "w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all",
              page === currentPage
                ? "text-white shadow-sm"
                : "border border-border bg-card hover:bg-accent hover:border-primary/50"
            )}
            style={page === currentPage ? { background: "linear-gradient(135deg,#667eea,#764ba2)" } : undefined}
          >
            {page}
          </Link>
        )
      )}

      {/* Next */}
      {hasNextPage ? (
        <Link
          href={buildUrl(basePath, currentPage + 1, searchParams)}
          className="flex items-center gap-1 px-3 h-9 rounded-lg border border-border bg-card text-sm font-medium hover:bg-accent hover:border-primary/50 transition-all"
          rel="next"
          aria-label="Next page"
        >
          Next <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 h-9 rounded-lg border border-border/50 bg-muted text-sm text-muted-foreground cursor-not-allowed opacity-50">
          Next <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </nav>
  );
}
