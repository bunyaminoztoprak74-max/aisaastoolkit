#!/usr/bin/env node
/**
 * Affiliate Revenue & Performance Tracker for AISaaSToolkit
 *
 * Capabilities:
 * - Queries CJ.com Commissions GraphQL API for real-time earnings, sales, and publisher payouts
 * - Aggregates commissions by advertiser (Hostinger, Omneky, 1Password, etc.)
 * - Displays earnings breakdown, pending vs locked payouts, and conversion metrics
 *
 * Usage:
 *   node scripts/track-revenue.mjs
 */

const CJ_CID = "7967515";
const CJ_TOKEN = process.env.CJ_PERSONAL_ACCESS_TOKEN || "foQkpzEIgJ_EWhg1AWva4UrGjw";

async function fetchCjCommissions() {
  const query = `{
    publisherCommissions(forPublishers: ["${CJ_CID}"]) {
      count
      payloadComplete
      records {
        commissionId
        advertiserName
        advertiserId
        actionStatus
        pubCommissionAmountUsd
        eventDate
        lockingDate
      }
    }
  }`;

  const res = await fetch("https://commissions.api.cj.com/query", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${CJ_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  });

  const json = await res.json();
  return json.data?.publisherCommissions;
}

async function main() {
  console.log("==================================================");
  console.log("💰 AISaaSToolkit - Live Revenue & Commission Tracker");
  console.log("==================================================\n");

  try {
    process.stdout.write("Connecting to CJ.com Commissions API... ");
    const commData = await fetchCjCommissions();

    if (!commData) {
      console.log("⚠️ No commission response received.");
      return;
    }

    console.log("✅ Connected!\n");

    const records = commData.records || [];
    console.log(`📊 Total Commission Events on CJ: ${commData.count}`);

    if (records.length === 0) {
      console.log("No transactions recorded yet in current cycle.");
      console.log("As visitors buy via your pages, sales will appear here automatically.\n");
    } else {
      let totalEarnedUsd = 0;
      const byAdvertiser = {};

      records.forEach((r) => {
        const amount = parseFloat(r.pubCommissionAmountUsd || 0);
        totalEarnedUsd += amount;
        if (!byAdvertiser[r.advertiserName]) {
          byAdvertiser[r.advertiserName] = { count: 0, total: 0 };
        }
        byAdvertiser[r.advertiserName].count += 1;
        byAdvertiser[r.advertiserName].total += amount;
      });

      console.log(`💵 Total Earned: $${totalEarnedUsd.toFixed(2)} USD\n`);
      console.log("Breakdown by Advertiser:");
      Object.entries(byAdvertiser).forEach(([name, stat]) => {
        console.log(`  • ${name.padEnd(20)}: ${stat.count} sales | $${stat.total.toFixed(2)} USD`);
      });
    }

    console.log("--------------------------------------------------");
    console.log("📌 Active Affiliate Portals for Direct Dashboard Tracking:");
    console.log("  1. CJ Affiliate Dashboard  : https://members.cj.com (CID: 7967515)");
    console.log("  2. Make.com PartnerStack   : https://dash.partnerstack.com (pc=aisaastoolkit)");
    console.log("  3. ElevenLabs PartnerStack : https://elevenlabs.partnerstack.com");
    console.log("  4. n8n Partner Dashboard   : https://partners.n8n.io (via=aisaastoolkit)");
    console.log("==================================================\n");
  } catch (err) {
    console.error("Error fetching commissions:", err.message);
  }
}

main();
