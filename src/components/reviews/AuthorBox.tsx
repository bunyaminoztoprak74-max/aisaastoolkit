import Link from "next/link";
import Image from "next/image";
import { Author } from "@/data/authors";

interface Props {
  author: Author;
  toolName: string;
  lastTestedDate?: string;
}

export function AuthorBox({ author, toolName, lastTestedDate }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start py-4 border-y border-border my-6">
      <Image src={author.avatar} alt={author.name} width={56} height={56} className="w-14 h-14 rounded-full border-2 border-border flex-shrink-0" />
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <Link href={`/author/${author.slug}`} className="font-semibold text-foreground hover:text-primary transition-colors">{author.name}</Link>
          <span className="text-muted-foreground text-sm">·</span>
          <span className="text-sm text-muted-foreground">{author.title}</span>
        </div>
        <p className="text-sm text-muted-foreground">{author.shortBio}</p>
        <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
          <span>Tested: 30 days hands-on with {toolName}</span>
          {lastTestedDate && <span>Last updated: {new Date(lastTestedDate).toLocaleDateString("en-US", {year:"numeric",month:"long"})}</span>}
          <span>Independent review — no sponsored content</span>
        </div>
      </div>
    </div>
  );
}
