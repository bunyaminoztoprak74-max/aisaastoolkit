import { NextResponse } from "next/server";
import { allTools } from "@/data/tools";

const BASE_URL = "https://aisaastoolkit.com";
const BOT_PATTERN = /bot|crawl|spider|slurp|preview|fetch|feedfetcher|monitor|checker|validator/i;

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = allTools.find((candidate) => candidate.slug === slug);

  if (!tool) return NextResponse.redirect(new URL("/deals", BASE_URL), 307);

  const requestUrl = new URL(request.url);
  const requestedSource = requestUrl.searchParams.get("source") ?? "direct";
  const source = requestedSource.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 40) || "direct";
  const isBot = BOT_PATTERN.test(request.headers.get("user-agent") ?? "");
  const destination = new URL(tool.affiliateUrl);

  destination.searchParams.set("utm_source", isBot ? `${source}_bot` : source);
  destination.searchParams.set("utm_medium", "rss");
  destination.searchParams.set("utm_campaign", isBot ? "aisaastoolkit_affiliate_feed_bot" : "aisaastoolkit_affiliate_feed");
  destination.searchParams.set("utm_content", tool.slug);

  return NextResponse.redirect(destination, 307);
}
