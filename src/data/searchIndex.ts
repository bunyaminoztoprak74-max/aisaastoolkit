import { allTools as tools } from "./tools";
import { categories } from "./categories";
import { comparisons } from "./comparisons";
import { bestLists } from "./bestLists";
import { getTagsForTool } from "./tags";

export interface SearchEntry {
  id: string;
  type: "tool" | "comparison" | "best-list" | "category";
  title: string;
  description: string;
  url: string;
  tags: string[];
  category?: string;
  rating?: number;
  hasFree?: boolean;
  startingPrice?: string;
  badge?: string;
  keywords: string; // space-joined searchable text
}

function buildKeywords(...parts: (string | undefined | null)[]): string {
  return parts.filter(Boolean).join(" ").toLowerCase();
}

export const searchIndex: SearchEntry[] = [
  // Tools
  ...tools.map((t) => ({
    id: `tool-${t.slug}`,
    type: "tool" as const,
    title: t.name,
    description: t.tagline,
    url: `/reviews/${t.slug}`,
    tags: getTagsForTool(t.slug),
    category: t.category,
    rating: t.rating,
    hasFree: t.pricing?.hasFree ?? false,
    startingPrice: t.pricing?.starting ?? t.startingPrice ?? "varies",
    badge: t.badge,
    keywords: buildKeywords(
      t.name, t.tagline, t.description, t.category,
      (t.features ?? []).map((f) => f.title).join(" "),
      t.pros.join(" "), (t.bestFor ?? []).join(" "),
      getTagsForTool(t.slug).join(" ")
    ),
  })),

  // Comparisons
  ...comparisons.map((c) => ({
    id: `comparison-${c.slug}`,
    type: "comparison" as const,
    title: c.title,
    description: c.metaDescription,
    url: `/compare/${c.slug}`,
    tags: [],
    keywords: buildKeywords(c.title, c.tool1Slug, c.tool2Slug, c.intro),
  })),

  // Best Lists
  ...bestLists.map((l) => ({
    id: `best-${l.slug}`,
    type: "best-list" as const,
    title: l.title,
    description: l.metaDescription,
    url: `/best/${l.slug}`,
    tags: [],
    category: l.category,
    keywords: buildKeywords(l.title, l.intro, l.category),
  })),

  // Categories
  ...categories.map((c) => ({
    id: `category-${c.slug}`,
    type: "category" as const,
    title: `${c.name} Tools`,
    description: c.description,
    url: `/category/${c.slug}`,
    tags: [],
    keywords: buildKeywords(c.name, c.description),
  })),
];

export interface SearchFilters {
  query?: string;
  category?: string;
  tag?: string;
  hasFree?: boolean;
  minRating?: number;
  maxPrice?: number; // monthly USD, 0 = free only
  type?: SearchEntry["type"];
  badge?: string;
}

export function searchEntries(filters: SearchFilters): SearchEntry[] {
  let results = [...searchIndex];

  if (filters.type) {
    results = results.filter((e) => e.type === filters.type);
  }

  if (filters.category) {
    results = results.filter((e) => e.category === filters.category);
  }

  if (filters.tag) {
    results = results.filter((e) => e.tags.includes(filters.tag!));
  }

  if (filters.hasFree) {
    results = results.filter((e) => e.hasFree === true);
  }

  if (filters.minRating) {
    results = results.filter((e) => !e.rating || e.rating >= filters.minRating!);
  }

  if (filters.badge) {
    results = results.filter((e) => e.badge === filters.badge);
  }

  if (filters.query && filters.query.trim().length > 0) {
    const q = filters.query.toLowerCase().trim();
    const terms = q.split(/\s+/).filter((t) => t.length > 1);

    results = results
      .map((entry) => {
        let score = 0;
        // Exact title match = highest
        if (entry.title.toLowerCase().includes(q)) score += 10;
        // Each term in keywords
        terms.forEach((term) => {
          if (entry.keywords.includes(term)) score += 2;
          if (entry.title.toLowerCase().includes(term)) score += 5;
          if (entry.description.toLowerCase().includes(term)) score += 3;
        });
        return { entry, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ entry }) => entry);
  }

  return results;
}
