import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchBar } from "@/components/search/SearchBar";
import { FilterPanel } from "@/components/search/FilterPanel";
import { SearchResults } from "@/components/search/SearchResults";
import { Pagination } from "@/components/common/Pagination";
import { searchEntries, type SearchFilters } from "@/data/searchIndex";
import { paginate } from "@/lib/pagination";

export const metadata: Metadata = {
    title: "Search AI Tools, Reviews & Comparisons",
    description: "Search 50+ AI tool reviews, comparisons, and best-of lists on AISaaSToolkit.",
    alternates: { canonical: "https://aisaastoolkit.com/tools" },
    robots: { index: false, follow: true },
};

const PER_PAGE = 10;

async function SearchContent({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const params  = await searchParams;
  const query   = params.q ?? "";
  const page    = parseInt(params.page ?? "1", 10);

  const filters: SearchFilters = {
    query: query || undefined,
    category:  params.category  || undefined,
    tag:       params.tag       || undefined,
    hasFree:   params.free === "1" ? true : undefined,
    minRating: params.minRating  ? parseFloat(params.minRating) : undefined,
    badge:     params.badge     || undefined,
    type:      params.type as SearchFilters["type"] || undefined,
  };

  const allResults = searchEntries(filters);
  const { items, meta } = paginate(allResults, page, PER_PAGE);

  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-8">
      <Suspense>
        <FilterPanel />
      </Suspense>
      <div>
        <Suspense>
          <SearchResults results={items} query={query} totalCount={meta.totalItems} />
        </Suspense>
        {meta.totalPages > 1 && (
          <div className="mt-8">
            <Pagination meta={meta} basePath="/search" searchParams={params} />
          </div>
        )}
      </div>
    </div>
  );
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-black mb-3">Search AI Tools</h1>
          <Suspense>
            <SearchBar
              size="lg"
              navigateOnSearch
              className="max-w-2xl"
              placeholder="Search tools, comparisons, best lists…"
            />
          </Suspense>
        </div>
        <Suspense fallback={<div className="animate-pulse h-96 bg-muted rounded-xl" />}>
          <SearchContent searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
