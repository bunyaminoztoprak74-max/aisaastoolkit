/**
 * Dynamic breadcrumb generator.
 *
 * Converts a URL pathname into a labelled breadcrumb trail,
 * using data from the content layer to resolve pretty names
 * (e.g. "/reviews/make-com" → Home → Reviews → Make.com Review).
 */
import { getToolBySlug }       from "@/data/tools";
import { getCategoryBySlug }   from "@/data/categories";
import { getComparisonBySlug } from "@/data/comparisons";
import { getBestListBySlug }   from "@/data/bestLists";
import { getTagBySlug }        from "@/data/tags";

export interface BreadcrumbItem {
  label: string;
  href?: string;   // undefined = current page (no link)
}

/** Segment display overrides for static segments */
const STATIC_LABELS: Record<string, string> = {
  reviews:              "Reviews",
  compare:              "Comparisons",
  best:                 "Best Lists",
  category:             "Categories",
  tag:                  "Tags",
  tags:                 "Tags",
  tools:                "All Tools",
  search:               "Search",
  about:                "About",
  contact:              "Contact",
  privacy:              "Privacy Policy",
  terms:                "Terms of Service",
  "affiliate-disclosure": "Affiliate Disclosure",
};

/**
 * Given a URL pathname (e.g. "/reviews/claude"),
 * returns an ordered array of breadcrumb items starting from Home.
 *
 * The last item always has no `href` (it is the current page).
 */
export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

  // Strip leading slash and split
  const segments = pathname.replace(/^\//, "").split("/").filter(Boolean);

  segments.forEach((segment, index) => {
    const isLast    = index === segments.length - 1;
    const builtPath = "/" + segments.slice(0, index + 1).join("/");
    const parent    = index > 0 ? segments[index - 1] : null;

    // Resolve a pretty label for dynamic slug segments
    const label = resolveDynamicLabel(segment, parent) ??
                  STATIC_LABELS[segment] ??
                  toTitleCase(segment);

    crumbs.push(
      isLast
        ? { label }                          // current page — no link
        : { label, href: builtPath }         // ancestor — link
    );
  });

  return crumbs;
}

/**
 * Attempt to resolve a human-readable label for a slug
 * using its parent segment as context.
 */
function resolveDynamicLabel(slug: string, parent: string | null): string | null {
  if (!parent) return null;

  switch (parent) {
    case "reviews": {
      const tool = getToolBySlug(slug);
      return tool ? `${tool.name} Review` : null;
    }
    case "compare": {
      const comp = getComparisonBySlug(slug);
      if (comp) {
        const t1 = getToolBySlug(comp.tool1Slug);
        const t2 = getToolBySlug(comp.tool2Slug);
        if (t1 && t2) return `${t1.name} vs ${t2.name}`;
      }
      return null;
    }
    case "best": {
      const list = getBestListBySlug(slug);
      // Shorten "The 7 Best AI Automation Tools of 2026" → "Best AI Automation Tools"
      return list ? list.title.replace(/^The \d+ /, "").replace(/ of \d{4}$/, "") : null;
    }
    case "category": {
      const cat = getCategoryBySlug(slug);
      return cat ? `${cat.name} Tools` : null;
    }
    case "tag": {
      const tag = getTagBySlug(slug);
      return tag ? tag.label : null;
    }
    default:
      return null;
  }
}

function toTitleCase(s: string): string {
  return s
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
