import type { Metadata } from "next";
import Link from "next/link";
import { Tag as TagIcon, ArrowRight } from "lucide-react";
import { tags, getTagsByGroup, getToolsForTag, type Tag } from "@/data/tags";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "All AI Tool Tags & Categories — Browse by Feature, Use Case & Price",
  description: "Browse AI tools by tag — filter by free plan, no-code, SEO, content marketing, automation, and 30+ other attributes.",
  path: "/tags",
  keywords: ["AI tool tags", "AI tool filters", "AI tools by feature", "AI tools by use case"],
});

const groups: { key: Tag["group"]; label: string; emoji: string }[] = [
  { key: "pricing",     label: "Pricing",      emoji: "💰" },
  { key: "feature",     label: "Features",     emoji: "⚡" },
  { key: "usecase",     label: "Use Cases",    emoji: "🎯" },
  { key: "audience",    label: "Audience",     emoji: "👥" },
  { key: "integration", label: "Integrations", emoji: "🔗" },
];

export default function TagsIndexPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
            <TagIcon className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-3xl font-black">Browse AI Tools by Tag</h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Find the perfect AI tool by filtering across {tags.length} attributes — pricing, features, use cases, audience, and integrations.
        </p>
      </div>

      <div className="space-y-10">
        {groups.map(({ key, label, emoji }) => {
          const groupTags = getTagsByGroup(key);
          return (
            <section key={key}>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>{emoji}</span> {label}
              </h2>
              <div className="flex flex-wrap gap-3">
                {groupTags.map((tag) => {
                  const count = getToolsForTag(tag.slug).length;
                  return (
                    <Link
                      key={tag.slug}
                      href={`/tag/${tag.slug}`}
                      className="group flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 hover:border-primary/50 hover:shadow-sm transition-all"
                    >
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tag.color}`}>
                        {tag.label}
                      </span>
                      <span className="text-xs text-muted-foreground">{count} tool{count !== 1 ? "s" : ""}</span>
                      <ArrowRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
