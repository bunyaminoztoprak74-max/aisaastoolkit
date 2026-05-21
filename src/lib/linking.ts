/**
 * Automatic internal linking engine.
 * Scans a block of text and returns suggested anchor insertions
 * based on a pre-built index of all linkable content.
 */
import { allTools as tools } from "@/data/tools";
import { categories } from "@/data/categories";
import { comparisons } from "@/data/comparisons";
import { bestLists } from "@/data/bestLists";

export interface LinkableEntity {
  label: string;           // display text to match
  url: string;             // internal href
  type: "tool" | "category" | "comparison" | "best-list";
  priority: number;        // higher = prefer this link
  aliases: string[];       // alternate match strings
}

/** Full linkable entity index */
export const linkableEntities: LinkableEntity[] = [
  // Tools
  ...tools.map((t) => ({
    label: t.name,
    url: `/reviews/${t.slug}`,
    type: "tool" as const,
    priority: 10,
    aliases: [t.slug.replace(/-/g, " ")],
  })),

  // Best lists
  ...bestLists.map((l) => ({
    label: l.title.replace("The ", "").replace(" of 2026", ""),
    url: `/best/${l.slug}`,
    type: "best-list" as const,
    priority: 7,
    aliases: [l.slug.replace(/-/g, " ")],
  })),

  // Comparisons
  ...comparisons.map((c) => ({
    label: `${c.tool1Slug} vs ${c.tool2Slug}`.replace(/-/g, " "),
    url: `/compare/${c.slug}`,
    type: "comparison" as const,
    priority: 8,
    aliases: [c.slug.replace(/-/g, " ")],
  })),

  // Categories
  ...categories.map((c) => ({
    label: c.name,
    url: `/category/${c.slug}`,
    type: "category" as const,
    priority: 5,
    aliases: [`${c.name} tools`, `${c.name.toLowerCase()} software`],
  })),
];

/** Given the current page URL, return suggested contextual links (exclude self) */
export function getSuggestedLinks(currentUrl: string, limit = 8): LinkableEntity[] {
  return linkableEntities
    .filter((e) => e.url !== currentUrl)
    .sort((a, b) => b.priority - a.priority)
    .slice(0, limit);
}

/** Given a tool slug, find all pages that should link back to it */
export function getInboundLinkOpportunities(toolSlug: string): LinkableEntity[] {
  const tool = tools.find((t) => t.slug === toolSlug);
  if (!tool) return [];

  const results: LinkableEntity[] = [];

  // Comparisons featuring this tool
  comparisons.forEach((c) => {
    if (c.tool1Slug === toolSlug || c.tool2Slug === toolSlug) {
      results.push({
        label: c.title,
        url: `/compare/${c.slug}`,
        type: "comparison",
        priority: 9,
        aliases: [],
      });
    }
  });

  // Best lists featuring this tool
  bestLists.forEach((l) => {
    if (l.toolSlugs.includes(toolSlug)) {
      results.push({
        label: l.title,
        url: `/best/${l.slug}`,
        type: "best-list",
        priority: 8,
        aliases: [],
      });
    }
  });

  return results;
}
