import type { Tool } from "./tools";

export interface ComparisonFeature {
  feature: string;
  tool1: string | boolean;
  tool2: string | boolean;
  winner?: 1 | 2 | "tie";
}

export interface Comparison {
  slug: string;
  tool1Slug: string;
  tool2Slug: string;
  title: string;
  metaDescription: string;
  headline: string;
  intro: string;
  verdict: string;
  tool1Winner: boolean;
  winnerReason: string;
  features: ComparisonFeature[];
  pricingComparison: {
    tool1Free: boolean;
    tool2Free: boolean;
    tool1Starting: string;
    tool2Starting: string;
    tool1BestPlan: string;
    tool2BestPlan: string;
    winner: 1 | 2 | "tie";
  };
  bestFor: {
    tool1: string[];
    tool2: string[];
  };
  faqs: { question: string; answer: string }[];
  lastUpdated: string;
}

export const comparisons: Comparison[] = [
  {
    slug: "claude-vs-chatgpt",
    tool1Slug: "claude",
    tool2Slug: "chatgpt",
    title: "Claude vs ChatGPT (2026): Which AI Assistant Is Better?",
    metaDescription: "Claude vs ChatGPT — an in-depth 2026 comparison of features, pricing, writing quality, and use cases to help you choose the right AI assistant.",
    headline: "Claude vs ChatGPT: The Ultimate 2026 Showdown",
    intro: "Claude and ChatGPT are the two titans of the AI assistant world. Both use state-of-the-art large language models, both cost $20/month on Pro plans, and both handle a wide range of tasks. But which one is actually better for you? We tested both tools extensively across writing, coding, research, and analysis tasks to give you the definitive answer.",
    verdict: "Claude wins for writing quality, long-document analysis, and safety-conscious applications. ChatGPT wins for integrations, image generation, and users who need the widest toolset. For pure text and reasoning tasks, Claude edges ahead — but for an all-in-one AI experience, ChatGPT Plus remains the most versatile choice.",
    tool1Winner: true,
    winnerReason: "Better writing quality, longer context window, and more nuanced reasoning",
    features: [
      { feature: "Context Window", tool1: "200,000 tokens", tool2: "128,000 tokens", winner: 1 },
      { feature: "Image Generation", tool1: false, tool2: true, winner: 2 },
      { feature: "Web Browsing", tool1: "Pro only", tool2: "Plus & above", winner: "tie" },
      { feature: "Voice Mode", tool1: false, tool2: true, winner: 2 },
      { feature: "Code Interpreter", tool1: "Basic", tool2: "Advanced (Python)", winner: 2 },
      { feature: "Writing Quality", tool1: "⭐⭐⭐⭐⭐", tool2: "⭐⭐⭐⭐", winner: 1 },
      { feature: "Safety & Refusals", tool1: "Best-in-class", tool2: "Good", winner: 1 },
      { feature: "Plugin Ecosystem", tool1: "Limited", tool2: "1,000+ GPTs", winner: 2 },
      { feature: "API Availability", tool1: true, tool2: true, winner: "tie" },
      { feature: "Projects / Memory", tool1: "Projects", tool2: "Memory", winner: "tie" },
      { feature: "Free Plan", tool1: true, tool2: true, winner: "tie" },
      { feature: "Price (Pro)", tool1: "$20/month", tool2: "$20/month", winner: "tie" },
    ],
    pricingComparison: {
      tool1Free: true,
      tool2Free: true,
      tool1Starting: "$20/month (Pro)",
      tool2Starting: "$20/month (Plus)",
      tool1BestPlan: "Pro — best for writing & analysis",
      tool2BestPlan: "Plus — best all-round value",
      winner: "tie",
    },
    bestFor: {
      tool1: [
        "Long-form writing and content creation",
        "Analyzing large documents and PDFs",
        "Complex reasoning and research",
        "Coding assistance and debugging",
        "Businesses needing safe, reliable AI",
      ],
      tool2: [
        "Image generation alongside text",
        "Data analysis with Code Interpreter",
        "Voice conversations",
        "Building custom GPTs and workflows",
        "Users in the OpenAI ecosystem",
      ],
    },
    faqs: [
      {
        question: "Is Claude better than ChatGPT for writing?",
        answer: "Yes, most users and benchmarks agree that Claude produces more nuanced, natural-sounding writing. It follows stylistic instructions more precisely and avoids the 'AI tone' that plagues some ChatGPT outputs.",
      },
      {
        question: "Can I use both Claude and ChatGPT?",
        answer: "Absolutely. Many power users subscribe to both. Claude for deep writing and analysis; ChatGPT for image generation and integrations.",
      },
      {
        question: "Which AI is better for coding?",
        answer: "Both are excellent, but ChatGPT's Code Interpreter (with Python execution) gives it an edge for data science tasks. For writing and explaining code, Claude is slightly better.",
      },
      {
        question: "Which has a better free plan?",
        answer: "ChatGPT's free plan is more generous — it includes DALL-E image generation and unlimited GPT-4o mini messages. Claude's free plan has daily message limits.",
      },
      {
        question: "Is Claude safer than ChatGPT?",
        answer: "Claude is built on Constitutional AI principles and is generally considered more resistant to jailbreaks and harmful outputs. Both are safe for business use.",
      },
    ],
    lastUpdated: "2026-05-01",
  },
  {
    slug: "make-vs-zapier",
    tool1Slug: "make-com",
    tool2Slug: "zapier",
    title: "Make.com vs Zapier (2026): Which Automation Tool Wins?",
    metaDescription: "Make.com vs Zapier — detailed 2026 comparison of pricing, features, ease of use, and power to find the best automation tool for your needs.",
    headline: "Make.com vs Zapier: Power vs Simplicity",
    intro: "Make.com and Zapier dominate the no-code automation market, but they serve different users. Zapier is the world's most popular automation tool with 6,000+ integrations and a beginner-friendly interface. Make.com offers far more power, flexibility, and value for money for users who need complex multi-step workflows.",
    verdict: "Make.com wins on price, power, and complex workflow capabilities. Zapier wins on simplicity, app integrations, and beginner-friendliness. For most businesses and agencies building serious automations, Make.com delivers far better value. For non-technical users connecting common apps, Zapier is the easier starting point.",
    tool1Winner: true,
    winnerReason: "More powerful, significantly cheaper at scale, and better for complex automations",
    features: [
      { feature: "App Integrations", tool1: "1,500+", tool2: "6,000+", winner: 2 },
      { feature: "Free Plan Ops", tool1: "1,000/month", tool2: "100 tasks/month", winner: 1 },
      { feature: "Visual Flow Builder", tool1: "⭐⭐⭐⭐⭐", tool2: "⭐⭐⭐", winner: 1 },
      { feature: "Complex Logic", tool1: "Advanced branching", tool2: "Basic paths", winner: 1 },
      { feature: "Data Transformation", tool1: "Built-in modules", tool2: "Limited formatter", winner: 1 },
      { feature: "Ease of Use", tool1: "Moderate", tool2: "Very Easy", winner: 2 },
      { feature: "Error Handling", tool1: "Advanced", tool2: "Basic", winner: 1 },
      { feature: "Webhooks", tool1: true, tool2: true, winner: "tie" },
      { feature: "AI Integration", tool1: "Native OpenAI modules", tool2: "AI Zap builder", winner: 1 },
      { feature: "Price (10K ops)", tool1: "$10.59/month", tool2: "$73.50/month", winner: 1 },
    ],
    pricingComparison: {
      tool1Free: true,
      tool2Free: true,
      tool1Starting: "$10.59/month (Core)",
      tool2Starting: "$29.99/month (Starter)",
      tool1BestPlan: "Core — best for small teams",
      tool2BestPlan: "Starter — best for beginners",
      winner: 1,
    },
    bestFor: {
      tool1: [
        "Complex multi-step automations",
        "Agencies building client workflows",
        "Data transformation and manipulation",
        "Users who outgrew Zapier's pricing",
        "AI-powered workflow automation",
      ],
      tool2: [
        "First-time automation users",
        "Connecting niche apps (6,000+ integrations)",
        "Simple trigger-action workflows",
        "Teams already in the Zapier ecosystem",
        "Users who value simplicity over power",
      ],
    },
    faqs: [
      {
        question: "Should I switch from Zapier to Make.com?",
        answer: "If you're on a paid Zapier plan and building complex automations, switching to Make.com can save you 60–80% on monthly costs while giving you more power. Migration takes effort but is worth it for most users.",
      },
      {
        question: "Is Make.com harder than Zapier?",
        answer: "Yes, Make.com has a steeper learning curve. But its visual interface is actually quite intuitive once you invest 2–3 hours learning it.",
      },
      {
        question: "Does Make.com have more integrations than Zapier?",
        answer: "No — Zapier has 6,000+ integrations vs Make's 1,500+. However, Make's HTTP module lets you connect to any REST API, filling most gaps.",
      },
    ],
    lastUpdated: "2026-05-01",
  },
  {
    slug: "jasper-vs-writesonic",
    tool1Slug: "jasper",
    tool2Slug: "writesonic",
    title: "Jasper vs Writesonic (2026): Best AI Writing Tool?",
    metaDescription: "Jasper vs Writesonic — side-by-side 2026 comparison of pricing, writing quality, templates, and features for content marketers.",
    headline: "Jasper vs Writesonic: Enterprise Power vs Affordable Value",
    intro: "Jasper and Writesonic are both purpose-built AI writing tools for marketers and content creators — but they serve very different budgets. Jasper is the premium enterprise choice with powerful brand voice training. Writesonic is the budget-friendly option that punches above its weight with real-time web search and a generous free tier.",
    verdict: "Jasper wins for enterprise marketing teams who need brand consistency and campaign planning. Writesonic wins for individual creators, bloggers, and budget-conscious teams who need solid AI writing at a fraction of the price.",
    tool1Winner: false,
    winnerReason: "Better value for most users — free plan, real-time web access, and comparable quality at lower cost",
    features: [
      { feature: "Free Plan", tool1: false, tool2: true, winner: 2 },
      { feature: "Brand Voice Training", tool1: "Advanced", tool2: "Basic", winner: 1 },
      { feature: "Web Search Integration", tool1: false, tool2: true, winner: 2 },
      { feature: "Starting Price", tool1: "$49/month", tool2: "$20/month", winner: 2 },
      { feature: "Templates", tool1: "50+", tool2: "100+", winner: 2 },
      { feature: "SEO Integration", tool1: "Surfer SEO", tool2: "Built-in checker", winner: "tie" },
      { feature: "Image Generation", tool1: "Jasper Art", tool2: "Chatsonic Art", winner: "tie" },
      { feature: "Chatbot Builder", tool1: false, tool2: "Botsonic", winner: 2 },
      { feature: "Enterprise Features", tool1: "⭐⭐⭐⭐⭐", tool2: "⭐⭐⭐", winner: 1 },
      { feature: "Writing Quality", tool1: "⭐⭐⭐⭐", tool2: "⭐⭐⭐½", winner: 1 },
    ],
    pricingComparison: {
      tool1Free: false,
      tool2Free: true,
      tool1Starting: "$49/month (Creator)",
      tool2Starting: "Free / $20/month (Individual)",
      tool1BestPlan: "Pro — best for teams",
      tool2BestPlan: "Individual — best for solo creators",
      winner: 2,
    },
    bestFor: {
      tool1: [
        "Enterprise marketing teams",
        "Agencies managing multiple brand voices",
        "Companies needing campaign planning tools",
        "Teams requiring SSO and admin controls",
        "Businesses scaling content production",
      ],
      tool2: [
        "Bloggers and solopreneurs on a budget",
        "Users needing real-time web research",
        "E-commerce stores with bulk content needs",
        "Businesses wanting a website chatbot",
        "Marketers starting with AI writing",
      ],
    },
    faqs: [
      {
        question: "Which is better for blog writing — Jasper or Writesonic?",
        answer: "Writesonic's Article Writer 6.0 is excellent for SEO blog posts and includes web research. Jasper's long-form assistant is more polished but costs more. For blogs, Writesonic is the better value.",
      },
      {
        question: "Does Jasper have a free trial?",
        answer: "Jasper offers a 7-day free trial. Writesonic offers a permanent free plan with 10,000 words/month.",
      },
    ],
    lastUpdated: "2026-05-01",
  },
];

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}
