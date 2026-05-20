export interface Tag {
  slug: string;
  label: string;
  description: string;
  group: "pricing" | "feature" | "usecase" | "audience" | "integration";
  color: string;
}

export const tags: Tag[] = [
  // Pricing
  { slug: "free-plan",        label: "Free Plan",          description: "Tools with a permanent free tier",                     group: "pricing",     color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" },
  { slug: "under-20",         label: "Under $20/mo",       description: "Paid plans starting below $20/month",                  group: "pricing",     color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" },
  { slug: "enterprise",       label: "Enterprise",          description: "Built for teams and large organisations",              group: "pricing",     color: "bg-slate-100 text-slate-800 dark:bg-slate-800/50 dark:text-slate-300" },
  { slug: "pay-per-use",      label: "Pay-Per-Use",        description: "Billed by consumption rather than seat",               group: "pricing",     color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" },

  // Features
  { slug: "no-code",          label: "No-Code",            description: "No programming knowledge required",                    group: "feature",     color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300" },
  { slug: "api-access",       label: "API Access",          description: "Developer-friendly REST or GraphQL API available",     group: "feature",     color: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300" },
  { slug: "long-context",     label: "Long Context",        description: "Handles very large documents or conversations",        group: "feature",     color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300" },
  { slug: "web-search",       label: "Web Search",          description: "Can retrieve real-time information from the web",      group: "feature",     color: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300" },
  { slug: "image-generation", label: "Image Generation",   description: "Creates images using AI",                              group: "feature",     color: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300" },
  { slug: "code-generation",  label: "Code Generation",    description: "Writes and debugs code across multiple languages",     group: "feature",     color: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300" },
  { slug: "voice-mode",       label: "Voice Mode",          description: "Supports spoken conversation input/output",            group: "feature",     color: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300" },
  { slug: "team-collab",      label: "Team Collaboration",  description: "Multi-user workspaces with sharing and permissions",   group: "feature",     color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" },
  { slug: "brand-voice",      label: "Brand Voice",         description: "Train the AI on your brand's tone and style",          group: "feature",     color: "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/30 dark:text-fuchsia-300" },
  { slug: "templates",        label: "Templates Library",  description: "Pre-built templates for common tasks",                 group: "feature",     color: "bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-300" },
  { slug: "auto-captions",    label: "Auto Captions",       description: "Automatically generates subtitles for video",          group: "feature",     color: "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300" },
  { slug: "seo-tools",        label: "SEO Tools",           description: "Built-in keyword research or content optimisation",    group: "feature",     color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" },
  { slug: "bulk-generation",  label: "Bulk Generation",    description: "Produces content at scale in batch mode",              group: "feature",     color: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300" },
  { slug: "webhook-support",  label: "Webhooks",           description: "Trigger automations via incoming/outgoing webhooks",   group: "feature",     color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" },

  // Use Cases
  { slug: "content-marketing",label: "Content Marketing",  description: "Ideal for blog posts, articles and content strategies", group: "usecase",    color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" },
  { slug: "seo-writing",      label: "SEO Writing",         description: "Optimised specifically for search-engine content",     group: "usecase",     color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" },
  { slug: "video-creation",   label: "Video Creation",     description: "Create or repurpose video content with AI",            group: "usecase",     color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" },
  { slug: "workflow-automation", label: "Workflow Automation", description: "Automate multi-step business processes",            group: "usecase",     color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300" },
  { slug: "research",         label: "Research",           description: "Deep research, fact-checking and source discovery",    group: "usecase",     color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300" },
  { slug: "email-marketing",  label: "Email Marketing",    description: "Write, optimise and automate email campaigns",         group: "usecase",     color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" },
  { slug: "social-media",     label: "Social Media",       description: "Create and schedule social media content",             group: "usecase",     color: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300" },
  { slug: "affiliate-marketing", label: "Affiliate Marketing", description: "Tools built or well-suited for affiliate publishers", group: "usecase",  color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" },

  // Audience
  { slug: "solopreneur",      label: "Solopreneur",        description: "Best suited for individual creators and freelancers",  group: "audience",    color: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300" },
  { slug: "agency",           label: "Agency",             description: "Designed for agencies managing multiple clients",      group: "audience",    color: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300" },
  { slug: "developer",        label: "Developer",          description: "Strong developer experience, API-first design",        group: "audience",    color: "bg-slate-100 text-slate-800 dark:bg-slate-800/50 dark:text-slate-300" },

  // Integrations
  { slug: "zapier-integration", label: "Zapier Integration", description: "Connects natively with Zapier",                     group: "integration", color: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300" },
  { slug: "openai-powered",   label: "OpenAI Powered",     description: "Built on or integrates OpenAI's GPT models",          group: "integration", color: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300" },
];

export function getTagBySlug(slug: string): Tag | undefined {
  return tags.find((t) => t.slug === slug);
}

export function getTagsByGroup(group: Tag["group"]): Tag[] {
  return tags.filter((t) => t.group === group);
}

// Map: tag slug → tool slugs
export const tagToolMap: Record<string, string[]> = {
  "free-plan":           ["claude", "chatgpt", "writesonic", "zapier", "perplexity", "make-com"],
  "under-20":            ["claude", "chatgpt", "writesonic", "make-com", "perplexity"],
  "enterprise":          ["jasper", "zapier", "make-com"],
  "pay-per-use":         ["claude", "chatgpt"],
  "no-code":             ["make-com", "zapier", "pictory", "writesonic", "jasper"],
  "api-access":          ["claude", "chatgpt", "make-com", "zapier", "jasper", "writesonic", "perplexity"],
  "long-context":        ["claude", "perplexity"],
  "web-search":          ["chatgpt", "perplexity", "writesonic"],
  "image-generation":    ["chatgpt", "jasper", "writesonic"],
  "code-generation":     ["claude", "chatgpt", "perplexity"],
  "voice-mode":          ["chatgpt"],
  "team-collab":         ["jasper", "make-com", "zapier", "chatgpt"],
  "brand-voice":         ["jasper", "writesonic"],
  "templates":           ["jasper", "writesonic", "chatgpt", "make-com"],
  "auto-captions":       ["pictory"],
  "seo-tools":           ["jasper", "writesonic", "perplexity"],
  "bulk-generation":     ["jasper", "writesonic"],
  "webhook-support":     ["make-com", "zapier"],
  "content-marketing":   ["claude", "chatgpt", "jasper", "writesonic", "pictory"],
  "seo-writing":         ["jasper", "writesonic", "perplexity", "claude"],
  "video-creation":      ["pictory"],
  "workflow-automation": ["make-com", "zapier"],
  "research":            ["perplexity", "claude", "chatgpt"],
  "email-marketing":     ["jasper", "writesonic", "make-com", "zapier"],
  "social-media":        ["jasper", "writesonic", "pictory", "make-com"],
  "affiliate-marketing": ["claude", "jasper", "writesonic", "make-com", "pictory"],
  "solopreneur":         ["claude", "chatgpt", "writesonic", "make-com", "pictory", "perplexity"],
  "agency":              ["jasper", "make-com", "zapier", "pictory"],
  "developer":           ["claude", "chatgpt", "make-com", "zapier"],
  "zapier-integration":  ["make-com", "jasper", "writesonic", "pictory"],
  "openai-powered":      ["chatgpt", "jasper", "writesonic"],
};

// Reverse map: tool slug → tag slugs
export function getTagsForTool(toolSlug: string): string[] {
  return Object.entries(tagToolMap)
    .filter(([, tools]) => tools.includes(toolSlug))
    .map(([tag]) => tag);
}

export function getToolsForTag(tagSlug: string): string[] {
  return tagToolMap[tagSlug] ?? [];
}
