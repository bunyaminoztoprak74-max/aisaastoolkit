import https from "https";
import http from "http";
import { URL } from "url";

const linksToCheck = [
  { name: "Make.com", url: "https://www.make.com/en/register?pc=aisaastoolkit" },
  { name: "ElevenLabs", url: "https://try.elevenlabs.io/2n2qt91ne8ak" },
  { name: "Hostinger (CJ)", url: "https://www.anrdoezrs.net/click-101761541-17112430" },
  { name: "Omneky (CJ)", url: "https://www.anrdoezrs.net/click-101761541-17290970" },
  { name: "n8n", url: "https://n8n.io?via=aisaastoolkit" },
  { name: "1Password (CJ)", url: "https://www.anrdoezrs.net/click-101761541-17036393" },
  { name: "NordLayer (CJ)", url: "https://www.anrdoezrs.net/click-101761541-15041895" },
  { name: "Namecheap (CJ)", url: "https://www.anrdoezrs.net/click-101761541-11426545" }
];

async function checkUrl(initialUrl, maxRedirects = 8) {
  let currentUrl = initialUrl;
  let redirects = [];
  let status = 0;

  for (let i = 0; i < maxRedirects; i++) {
    try {
      const res = await fetch(currentUrl, {
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
        },
        redirect: "manual"
      });

      status = res.status;
      redirects.push({ url: currentUrl, status });

      if (status >= 300 && status < 400) {
        const location = res.headers.get("location");
        if (!location) break;
        currentUrl = new URL(location, currentUrl).toString();
      } else {
        break;
      }
    } catch (err) {
      return { ok: false, error: err.message, redirects, finalUrl: currentUrl, status };
    }
  }

  return { ok: status >= 200 && status < 400, finalUrl: currentUrl, status, redirects };
}

async function main() {
  console.log("==================================================");
  console.log("🔍 Live Verification of Affiliate Links");
  console.log("==================================================\n");

  for (const item of linksToCheck) {
    process.stdout.write(`Testing [${item.name}]... `);
    const result = await checkUrl(item.url);

    if (result.ok) {
      console.log(`✅ OK (${result.status})`);
    } else {
      console.log(`❌ FAILED (Status: ${result.status})`);
    }
    console.log(`   Initial URL : ${item.url}`);
    console.log(`   Final URL   : ${result.finalUrl}`);
    if (result.redirects.length > 1) {
      console.log(`   Hops (${result.redirects.length}):`);
      result.redirects.forEach((r, idx) => console.log(`      ${idx + 1}. [${r.status}] ${r.url}`));
    }
    console.log("");
  }
}

main();
