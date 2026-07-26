// Submits every URL in the live sitemap to IndexNow (instantly notifies
// Bing, Yandex, and other participating search engines about new/updated
// pages instead of waiting for their next crawl).
//
// Uses the IndexNow key already published at:
//   https://aisaastoolkit.com/8b1c165b857948dd8f87da9d5b1e938b.txt
//
// Run with: npm run indexnow:submit
// Kept in sync with src/lib/seo.ts's SITE_URL. Not imported directly because
// Node can't load a .ts module without a TS loader, and this script needs
// to run standalone via plain `node`.
const SITE_URL = "https://aisaastoolkit.com";

const KEY = "8b1c165b857948dd8f87da9d5b1e938b";
const HOST = new URL(SITE_URL).host;
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

async function fetchSitemapUrls() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch sitemap: ${res.status} ${res.statusText}`);
  }
  const xml = await res.text();
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)];
  return matches.map((m) => m[1].trim());
}

function chunk(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

async function submitBatch(urlList) {
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList
    })
  });
  return { status: res.status, statusText: res.statusText };
}

async function main() {
  const urls = await fetchSitemapUrls();
  console.log(`Found ${urls.length} URLs in sitemap.`);

  // IndexNow accepts up to 10,000 URLs per request; batch conservatively.
  const batches = chunk(urls, 500);
  for (const [i, batch] of batches.entries()) {
    const result = await submitBatch(batch);
    console.log(
      `Batch ${i + 1}/${batches.length} (${batch.length} URLs): ${result.status} ${result.statusText}`
    );
  }
  console.log("IndexNow submission complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
