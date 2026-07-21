import { NextResponse } from "next/server";
import { allBlogPosts } from "@/data/blog";

const BASE_URL = "https://aisaastoolkit.com";
const BOT_PATTERN = /bot|crawl|spider|slurp|preview|fetch|feedfetcher|monitor|checker|validator/i;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = allBlogPosts.find((candidate) => candidate.slug === slug);
  const requestUrl = new URL(request.url);
  const requestedSource = requestUrl.searchParams.get("source") ?? "direct";
  const source = requestedSource.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 40) || "direct";
  const isBot = BOT_PATTERN.test(request.headers.get("user-agent") ?? "");
  const destination = new URL(post ? `/blog/${post.slug}` : "/blog", BASE_URL);

  destination.searchParams.set("utm_source", isBot ? `${source}_bot` : source);
  destination.searchParams.set("utm_medium", "rss");
  destination.searchParams.set("utm_campaign", isBot ? "aisaastoolkit_feed_bot" : "aisaastoolkit_feed");
  destination.searchParams.set("utm_content", post?.slug ?? "unknown");
  destination.searchParams.set("utm_term", post?.relatedToolSlugs[0] ?? "general");

  return NextResponse.redirect(destination, 307);
}
