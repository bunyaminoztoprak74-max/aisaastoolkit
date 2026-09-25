export interface Blueprint {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: "E-Commerce" | "Social Media" | "Lead Gen & Sales" | "Content & SEO";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  setupTimeMinutes: number;
  featuredTool: {
    name: string;
    slug: string;
    affiliateUrl: string;
    badgeText: string;
  };
  requiredApps: string[];
  downloadFileName: string;
  downloadUrl: string;
  features: string[];
  steps: {
    title: string;
    description: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export const BLUEPRINTS: Blueprint[] = [
  {
    slug: "shopify-order-sync-sheets-whatsapp",
    title: "Shopify Orders to Google Sheets & WhatsApp VIP Alerts",
    shortDescription: "Automatically log every Shopify order into Google Sheets and trigger instant WhatsApp/Telegram alerts for high-value orders.",
    fullDescription: "Stop wasting hours manually reconciling orders. This battle-tested Make.com scenario intercepts every new order placed on Shopify or WooCommerce, structures customer and item data into Google Sheets, calculates profit margins, and sends an automated VIP notification to your WhatsApp or Slack channel.",
    category: "E-Commerce",
    difficulty: "Beginner",
    setupTimeMinutes: 5,
    featuredTool: {
      name: "Make.com",
      slug: "make-com",
      affiliateUrl: "https://www.make.com/en/register?pc=aisaastoolkit",
      badgeText: "Free 1,000 Ops Included",
    },
    requiredApps: ["Shopify", "Google Sheets", "WhatsApp / Slack", "Make.com"],
    downloadFileName: "shopify-order-sync.json",
    downloadUrl: "/downloads/blueprints/shopify-order-sync.json",
    features: [
      "Zero manual data entry: real-time order logging",
      "Dynamic VIP alert filters (orders over $100 trigger instant notifications)",
      "Automatic customer lifetime value (LTV) calculation",
      "Ready-to-import Make.com JSON file (works in 3 clicks)",
    ],
    steps: [
      {
        title: "Step 1: Get your free Make.com account",
        description: "Sign up via our partner link to unlock 1,000 free operations/month and instant scenario importing.",
      },
      {
        title: "Step 2: Download the Blueprint JSON",
        description: "Click the download button below to save the scenario template to your computer.",
      },
      {
        title: "Step 3: Import into Make.com",
        description: "In Make.com, go to Scenarios -> Create a new scenario -> click 'More' (...) at the bottom -> 'Import Blueprint' and select the downloaded JSON.",
      },
      {
        title: "Step 4: Connect your Shopify & Google account",
        description: "Click each module to authorize your Shopify store and your target Google Sheet. Hit 'Run once' to test!",
      },
    ],
    faq: [
      {
        question: "Does this require coding skills?",
        answer: "No coding required. It uses Make's visual drag-and-drop builder with pre-configured mapping.",
      },
      {
        question: "Is Make.com free for this workflow?",
        answer: "Yes, Make.com offers a free plan with 1,000 operations per month, which handles roughly 200–300 orders effortlessly.",
      },
      {
        question: "Can I use WooCommerce instead of Shopify?",
        answer: "Yes, you can swap the initial Shopify trigger module with the WooCommerce module in just 30 seconds.",
      },
    ],
  },
  {
    slug: "instagram-dm-ai-smart-responder",
    title: "Instagram DM AI Smart Auto-Responder (OpenAI + Make)",
    shortDescription: "Turn Instagram DMs into paying customers 24/7 with a conversational GPT-4o mini auto-responder that qualifies leads and shares links.",
    fullDescription: "Never lose a customer because you were sleeping. This automation captures incoming Instagram direct messages, runs the inquiry through an OpenAI GPT-4 prompt conditioned with your business FAQs and pricing, and sends a natural, highly personalized reply within 10 seconds.",
    category: "Social Media",
    difficulty: "Intermediate",
    setupTimeMinutes: 10,
    featuredTool: {
      name: "Make.com",
      slug: "make-com",
      affiliateUrl: "https://www.make.com/en/register?pc=aisaastoolkit",
      badgeText: "Recommended Partner",
    },
    requiredApps: ["Instagram for Business", "OpenAI (ChatGPT)", "Make.com"],
    downloadFileName: "instagram-ai-auto-reply.json",
    downloadUrl: "/downloads/blueprints/instagram-ai-auto-reply.json",
    features: [
      "Sub-15 second response time for all direct messages",
      "Trained on your custom business knowledge & product catalog",
      "Escalates complex issues to human support via email/Slack",
      "Filters out spam and bot messages automatically",
    ],
    steps: [
      {
        title: "Step 1: Open your Make.com account",
        description: "Ensure your Make.com account is active using our partner link.",
      },
      {
        title: "Step 2: Download & Import Blueprint",
        description: "Download the JSON blueprint and import it into a fresh Make scenario.",
      },
      {
        title: "Step 3: Add your OpenAI API Key",
        description: "Connect your OpenAI API key in the ChatGPT module and customize the prompt with your business details.",
      },
      {
        title: "Step 4: Connect Instagram Professional Account",
        description: "Link your Meta Business account to authorize Instagram DM reading and messaging permissions.",
      },
    ],
    faq: [
      {
        question: "Does this violate Instagram policies?",
        answer: "No, it connects via the official Meta Graph API / Instagram Messaging API, which is 100% compliant.",
      },
      {
        question: "How much does the AI cost?",
        answer: "Using GPT-4o mini, each response costs approximately $0.0001 (fractions of a cent), meaning 1,000 conversations cost less than $0.20.",
      },
    ],
  },
  {
    slug: "b2b-lead-scraper-crm-enricher",
    title: "Automated Lead Scraper & CRM Data Enricher",
    shortDescription: "Automatically extract, verify email, and enrich inbound website leads before pushing them into HubSpot or Airtable.",
    fullDescription: "Stop wasting sales team time researching inbound leads. When a lead enters their email on your website form, this scenario verifies email deliverability, queries public databases for company size, revenue, and LinkedIn profiles, and saves an enriched profile straight to your CRM.",
    category: "Lead Gen & Sales",
    difficulty: "Intermediate",
    setupTimeMinutes: 8,
    featuredTool: {
      name: "Make.com",
      slug: "make-com",
      affiliateUrl: "https://www.make.com/en/register?pc=aisaastoolkit",
      badgeText: "Free Tier Available",
    },
    requiredApps: ["Webhook / Typeform", "Clearbit / Hunter", "Airtable / HubSpot", "Make.com"],
    downloadFileName: "lead-scraper-crm-enricher.json",
    downloadUrl: "/downloads/blueprints/lead-scraper-crm-enricher.json",
    features: [
      "Automatic email validity check (prevents fake lead spam)",
      "Fetches company logo, employee count, and industry automatically",
      "Instant Slack / Email alert to sales rep with full dossier",
      "100% customizable data fields for any CRM",
    ],
    steps: [
      {
        title: "Step 1: Sign up to Make.com",
        description: "Create or log into your Make.com account.",
      },
      {
        title: "Step 2: Import the Blueprint",
        description: "Import the pre-configured workflow JSON file.",
      },
      {
        title: "Step 3: Point your Form Webhook",
        description: "Paste your website form webhook URL into the initial trigger module.",
      },
      {
        title: "Step 4: Connect your CRM or Airtable base",
        description: "Select your Airtable table or HubSpot CRM contact pipeline.",
      },
    ],
    faq: [
      {
        question: "Can I use Google Sheets instead of Airtable?",
        answer: "Yes, you can easily replace the Airtable destination module with Google Sheets or Notion.",
      },
      {
        question: "What form builders are supported?",
        answer: "Any form builder supporting webhooks (Typeform, Tally, WordPress Elementor, Webflow, Jotform, etc.).",
      },
    ],
  },
];

export function getBlueprintBySlug(slug: string): Blueprint | undefined {
  return BLUEPRINTS.find((b) => b.slug === slug);
}
