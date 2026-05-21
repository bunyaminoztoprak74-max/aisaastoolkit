import { allTools as tools, type Tool } from "@/data/tools";
import { getTagsForTool } from "@/data/tags";
import { comparisons } from "@/data/comparisons";
import { bestLists } from "@/data/bestLists";

// ——— Scoring weights ————————————————————————————————————————————————————————
const W = {
  SAME_CATEGORY:      4,
  SHARED_CATEGORY:    2,
  SHARED_TAG:         3,
  IN_ALTERNATIVES:    5,
  SHARED_PRICE_BAND:  1,
  RATING_BONUS:       0.5,
} as const;

function priceBand(tool: Tool): "free" | "budget" | "mid" | "premium" {
  if (tool.pricing?.hasFree) return "free";
  const s = (tool.pricing?.starting ?? tool.startingPrice ?? "").replace(/[^0-9]/g, "");
  const n = parseInt(s, 10);
  if (isNaN(n) || n < 25) return "budget";
  if (n < 60) return "mid";
  return "premium";
}

export interface ScoredTool { tool: Tool; score: number; reasons: string[] }

/** Score a candidate tool against a source tool */
export function scoreTool(source: Tool, candidate: Tool): ScoredTool {
  let score = 0;
  const reasons: string[] = [];
  const sourceTags = new Set(getTagsForTool(source.slug));
  const candidateTags = getTagsForTool(candidate.slug);

  if (candidate.category === source.category) {
    score += W.SAME_CATEGORY;
    reasons.push("Same primary category");
  }

  const sourceCats = source.categories ?? [source.category];
  const candidateCats = candidate.categories ?? [candidate.category];
  const sharedCats = candidateCats.filter((c) => sourceCats.includes(c));
  score += sharedCats.length * W.SHARED_CATEGORY;
  if (sharedCats.length) reasons.push(`Shared categories: ${sharedCats.join(", ")}`);

  const sharedTags = candidateTags.filter((t) => sourceTags.has(t));
  score += sharedTags.length * W.SHARED_TAG;
  if (sharedTags.length) reasons.push(`Shared tags: ${sharedTags.join(", ")}`);

  if ((source.alternatives ?? []).includes(candidate.slug) || (candidate.alternatives ?? []).includes(source.slug)) {
    score += W.IN_ALTERNATIVES;
    reasons.push("Listed as alternative");
  }

  if (priceBand(source) === priceBand(candidate)) {
    score += W.SHARED_PRICE_BAND;
  }

  // Slight boost for highly-rated tools to surface quality content
  score += candidate.rating * W.RATING_BONUS;

  return { tool: candidate, score, reasons };
}

/** Get top N related tools for a given slug */
export function getRelatedToolsScored(slug: string, limit = 4): Tool[] {
  const source = tools.find((t) => t.slug === slug);
  if (!source) return [];

  return tools
    .filter((t) => t.slug !== slug)
    .map((t) => scoreTool(source, t))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ tool }) => tool);
}

// ——— Contextual content suggestions ————————————————————————————————————————
export interface ContentSuggestion {
  type: "comparison" | "best-list" | "tool";
  title: string;
  url: string;
  reason: string;
}

/** For a given tool, return related comparisons + best lists to link to */
export function getContentSuggestions(toolSlug: string, limit = 6): ContentSuggestion[] {
  const suggestions: ContentSuggestion[] = [];
  const tool = tools.find((t) => t.slug === toolSlug);
  if (!tool) return [];

  // Related comparisons
  comparisons.forEach((comp) => {
    if (comp.tool1Slug === toolSlug || comp.tool2Slug === toolSlug) {
      const other = comp.tool1Slug === toolSlug ? comp.tool2Slug : comp.tool1Slug;
      const otherTool = tools.find((t) => t.slug === other);
      suggestions.push({
        type: "comparison",
        title: `${tool.name} vs ${otherTool?.name ?? other}`,
        url: `/compare/${comp.slug}`,
        reason: "Head-to-head comparison",
      });
    }
  });

  // Best lists that include this tool
  bestLists.forEach((list) => {
    if (list.toolSlugs.includes(toolSlug)) {
      suggestions.push({
        type: "best-list",
        title: list.title,
        url: `/best/${list.slug}`,
        reason: `${tool.name} is featured in this list`,
      });
    }
  });

  // Related tools
  getRelatedToolsScored(toolSlug, 3).forEach((t) => {
    suggestions.push({
      url: `/reviews/${t.slug}`,
      title: `${t.name} Review`,
      type: "tool" as const,
      reason: `Related tool: ${t.name}`,
    });
  });

  return suggestions;
}
