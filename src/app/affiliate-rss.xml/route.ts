import { allTools } from "@/data/tools";

const BASE_URL = "https://aisaastoolkit.com";

function escapeXml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}

function cdata(value: string) {
  return value.replaceAll("]]>", "]]]]><![CDATA[>");
}

export async function GET(request: Request) {
  const requestedSource = new URL(request.url).searchParams.get("source") ?? "direct";
  const source = requestedSource.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 40) || "direct";
  const tools = allTools.filter((tool) => /[?&](pc|via|utm_source|ref|aff|tag)=/i.test(tool.affiliateUrl));
  const latestUpdate = Math.max(...tools.map((tool) => Date.parse(tool.lastUpdated ?? "January 1, 2026")));

  const items = tools.map((tool) => {
    const trackedUrl = `${BASE_URL}/go/affiliate/${tool.slug}?source=${source}`;
    const reviewUrl = `${BASE_URL}/reviews/${tool.slug}`;
    const price = tool.pricing?.starting ?? tool.startingPrice ?? "See current pricing";

    return `
    <item>
      <title>${escapeXml(`${tool.name}: ${tool.tagline}`)}</title>
      <link>${escapeXml(trackedUrl)}</link>
      <guid isPermaLink="false">${reviewUrl}#affiliate-offer</guid>
      <description><![CDATA[${cdata(`${tool.description} Starting price: ${price}. Rating: ${tool.rating}/5. Clicking opens the provider's official store. Affiliate disclosure applies.`)}]]></description>
      <category><![CDATA[${cdata(tool.category)}]]></category>
      <pubDate>${new Date(tool.lastUpdated ?? "January 1, 2026").toUTCString()}</pubDate>
    </item>`;
  }).join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AISaaSToolkit — AI SaaS Deals &amp; Offers</title>
    <link>${BASE_URL}/deals</link>
    <atom:link href="${BASE_URL}/affiliate-rss.xml" rel="self" type="application/rss+xml" />
    <description>Tracked offers for AI SaaS products reviewed by AISaaSToolkit. Links may earn us a commission at no extra cost to the reader.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(latestUpdate).toUTCString()}</lastBuildDate>
    <ttl>60</ttl>${items}
  </channel>
</rss>`;

  return new Response(feed, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400" } });
}
