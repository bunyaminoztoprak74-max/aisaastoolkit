import Link from "next/link";
import { getTagsForTool, getTagBySlug } from "@/data/tags";
import { cn } from "@/lib/utils";

interface TagListProps {
  toolSlug: string;
  limit?: number;
  className?: string;
  linkable?: boolean;
}

export function TagList({ toolSlug, limit = 5, className, linkable = true }: TagListProps) {
  const tagSlugs = getTagsForTool(toolSlug).slice(0, limit);
  const resolvedTags = tagSlugs.map(getTagBySlug).filter(Boolean);

  if (resolvedTags.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {resolvedTags.map((tag) => {
        if (!tag) return null;
        const chip = (
          <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full cursor-default", tag.color)}>
            {tag.label}
          </span>
        );
        return linkable ? (
          <Link key={tag.slug} href={`/tag/${tag.slug}`} className="hover:opacity-80 transition-opacity">
            {chip}
          </Link>
        ) : (
          <span key={tag.slug}>{chip}</span>
        );
      })}
    </div>
  );
}
