#!/usr/bin/env node
/**
 * CJ Affiliate (Commission Junction) API Link & Advertiser Fetcher
 *
 * Automatically searches and retrieves affiliate tracking links from CJ.com
 * using the CJ REST Link Search API and updates affiliate-registry.json and tools.ts.
 *
 * Usage:
 *   node scripts/cj-link-fetcher.mjs --search="Hostinger"
 *   node scripts/cj-link-fetcher.mjs --search="1Password"
 *   node scripts/cj-link-fetcher.mjs --advertiser=5140517
 *   node scripts/cj-link-fetcher.mjs --sync
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

// Credentials from environment or defaults
const CJ_PID = process.env.CJ_WEBSITE_ID || process.env.CJ_PID || "101761541";
const CJ_TOKEN = process.env.CJ_PERSONAL_ACCESS_TOKEN || "foQkpzEIgJ_EWhg1AWva4UrGjw";

const REGISTRY_PATH = path.join(__dirname, "affiliate-registry.json");
const TOOLS_PATH = path.join(ROOT_DIR, "src", "data", "tools.ts");

const args = process.argv.slice(2);
const searchKeyword = args.find((a) => a.startsWith("--search="))?.split("=")[1];
const advertiserId = args.find((a) => a.startsWith("--advertiser="))?.split("=")[1];
const isSync = args.includes("--sync");

export async function searchCjLinks({ keyword, advId, records = 10, linkType = "Text Link" }) {
  let url = `https://link-search.api.cj.com/v2/link-search?website-id=${CJ_PID}&records-per-page=${records}`;
  if (keyword) url += `&keywords=${encodeURIComponent(keyword)}`;
  if (advId) url += `&advertiser-ids=${encodeURIComponent(advId)}`;
  if (linkType) url += `&link-type=${encodeURIComponent(linkType)}`;

  const res = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${CJ_TOKEN}`,
      "Accept": "application/xml"
    }
  });

  if (!res.ok) {
    throw new Error(`CJ API responded with ${res.status}: ${res.statusText}`);
  }

  const xml = await res.text();
  const totalMatched = (xml.match(/total-matched="(\d+)"/) || [])[1] || "0";
  const linkBlocks = [...xml.matchAll(/<link>([\s\S]*?)<\/link>/g)];

  const results = linkBlocks.map((block) => {
    const raw = block[1];
    const extract = (tag) => (raw.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`)) || [])[1]?.trim() || "";

    const linkId = extract("link-id");
    const advName = extract("advertiser-name");
    const advIdExt = extract("advertiser-id");
    const linkName = extract("link-name");
    const destination = extract("destination");
    const commission = extract("sale-commission");
    const relationship = extract("relationship-status");
    const category = extract("category");
    const allowDeepLink = extract("allow-deep-linking") === "true";

    // Standard CJ tracking click URL format
    const trackingUrl = `https://www.anrdoezrs.net/click-${CJ_PID}-${linkId}`;

    return {
      linkId,
      advertiserId: advIdExt,
      advertiserName: advName,
      linkName,
      destination,
      commission,
      relationshipStatus: relationship,
      category,
      allowDeepLink,
      trackingUrl
    };
  });

  return { totalMatched: parseInt(totalMatched, 10), results };
}

async function main() {
  console.log("==================================================");
  console.log("🔗 CJ.com Affiliate Link & Advertiser Engine");
  console.log(`   Publisher Website ID (PID): ${CJ_PID}`);
  console.log("==================================================\n");

  if (searchKeyword || advertiserId) {
    const query = searchKeyword || `Advertiser ID ${advertiserId}`;
    console.log(`🔎 Searching CJ for "${query}"...`);
    try {
      const { totalMatched, results } = await searchCjLinks({ keyword: searchKeyword, advId: advertiserId });
      console.log(`Total matched on CJ: ${totalMatched} links. Displaying top ${results.length}:\n`);

      results.forEach((r, idx) => {
        console.log(`[${idx + 1}] ${r.advertiserName} (ID: ${r.advertiserId})`);
        console.log(`    Link: ${r.linkName}`);
        console.log(`    Commission: ${r.commission || "N/A"} | Status: ${r.relationshipStatus}`);
        console.log(`    Destination: ${r.destination}`);
        console.log(`    Affiliate Tracking URL: ${r.trackingUrl}\n`);
      });
    } catch (err) {
      console.error("Error fetching CJ links:", err.message);
    }
    return;
  }

  if (isSync) {
    console.log("🔄 Syncing CJ affiliate opportunities with affiliate-registry.json...\n");
    const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));
    const targets = ["1Password", "Hostinger", "NordLayer", "Mailchimp", "Elementor"];

    for (const target of targets) {
      try {
        const { results } = await searchCjLinks({ keyword: target, records: 3 });
        if (results.length > 0) {
          const best = results[0];
          console.log(`✓ CJ Found: ${best.advertiserName} (Commission: ${best.commission}, Status: ${best.relationshipStatus})`);
          console.log(`  Tracking URL: ${best.trackingUrl}\n`);
        }
      } catch (e) {
        console.log(`✕ Error for ${target}:`, e.message);
      }
    }
    return;
  }

  console.log(`Usage:
  node scripts/cj-link-fetcher.mjs --search="1Password"
  node scripts/cj-link-fetcher.mjs --search="Hostinger"
  node scripts/cj-link-fetcher.mjs --sync
  `);
}

main().catch(console.error);
