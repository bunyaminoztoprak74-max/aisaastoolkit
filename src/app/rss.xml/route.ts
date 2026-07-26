import { allBlogPosts } from "@/data/blog";

const BASE_URL = "https://aisaastoolkit.com";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function cdata(value: string) {
  return value.replaceAll("]]>", "]]]]><![CDATA[>");
}

export async function GET(request: Request) {
  const requestedSource = new URL(request.url).searchParams.get("source") ?? "direct";
  const source = requestedSource.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 40) || "direct";
  const posts = [...allBlogPosts]
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .slice(0, 50);

  const lastBuildDate = posts.length
    ? new Date(Math.max(...posts.map((post) => Date.parse(post.updatedAt)))).toUTCString()
    : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;
      const trackedUrl = `${BASE_URL}/go/rss/${post.slug}?source=${source}`;

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(trackedUrl)}</link>
      <guid isPermaLink="true">${canonicalUrl}</guid>
      <description><![CDATA[${cdata(post.excerpt)}]]></description>
      <content:encoded><![CDATA[${cdata(post.content)}]]></content:encoded>
      <dc:creator><![CDATA[${cdata(post.authorName)}]]></dc:creator>
      <category><![CDATA[${cdata(post.category)}]]></category>
      ${post.tags.map((tag) => `<category><![CDATA[${cdata(tag)}]]></category>`).join("\n      ")}
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>`;
    })
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>AISaaSToolkit — AI Tools Reviews &amp; Guides</title>
    <link>${BASE_URL}/blog</link>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Independent AI SaaS tool reviews, comparisons, pricing guides, and automation insights.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <ttl>60</ttl>
    <image>
      <url>${BASE_URL}/og-image.png</url>
      <title>AISaaSToolkit</title>
      <link>${BASE_URL}/blog</link>
    </image>${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
