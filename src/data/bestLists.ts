import type { Tool } from "./tools";

export interface BestList {
  slug: string;
  title: string;
  headline: string;
  metaDescription: string;
  intro: string;
  toolSlugs: string[];
  category: string;
  lastUpdated: string;
}

export const bestLists: BestList[] = [
  {
    slug: "ai-automation-tools",
    title: "Best AI Automation Tools of 2026",
    headline: "The 7 Best AI Automation Tools of 2026 (Tested & Ranked)",
    metaDescription: "7 best AI automation tools in 2026: Make.com, Zapier & more — tested & ranked by price, power & ease of use. Find the right tool for your workflows.",
    intro: "AI automation tools have evolved from simple Zap-style triggers into full workflow orchestration platforms. Whether you\'re running an affiliate site, an agency, or a SaaS business, the right AI automation tool can save dozens of hours every week. We tested 12 tools extensively — here are the seven best.",
    toolSlugs: ["make-com", "zapier", "perplexity", "jasper", "claude", "chatgpt", "writesonic"],
    category: "ai-automation",
    lastUpdated: "2026-06-18",
  },
  {
    slug: "ai-video-tools",
    title: "Best AI Video Tools of 2026",
    headline: "The 6 Best AI Video Creation Tools of 2026 (Ranked by Experts)",
    metaDescription: "Looking for the best AI video tools? We reviewed 10+ AI video generators and ranked the top picks for content creators, marketers, and affiliate bloggers in 2026.",
    intro: "AI video tools have reached a tipping point — you can now create professional-quality videos in minutes without any filming or editing skills. Whether you need to turn blog posts into YouTube videos, generate product demos, or create social media clips at scale, there\'s an AI tool that can do it. Here are the six best.",
    toolSlugs: ["pictory", "jasper", "claude", "chatgpt", "writesonic", "make-com"],
    category: "ai-video",
    lastUpdated: "2026-06-18",
  },
  {
    slug: "ai-seo-tools",
    title: "Best AI SEO Tools of 2026",
    headline: "The 5 Best AI SEO Tools of 2026 (For Rankings & Traffic)",
    metaDescription: "Discover the best AI SEO tools for keyword research, content optimization, and technical SEO in 2026. Expert picks with pricing, pros & cons.",
    intro: "AI has transformed SEO from a manual, time-intensive process into a streamlined content machine. The best AI SEO tools help you find keywords, optimize content, and outrank competitors faster than ever before. Here are our top picks.",
    toolSlugs: ["perplexity", "jasper", "writesonic", "claude", "chatgpt"],
    category: "ai-seo",
    lastUpdated: "2026-06-18",
  },
  {
    slug: "ai-writing-tools",
    title: "Best AI Writing Tools of 2026",
    headline: "The 6 Best AI Writing Tools of 2026 (Content Creators\' Guide)",
    metaDescription: "6 best AI writing tools in 2026: Claude, ChatGPT, Jasper & Writesonic tested. Honest rankings by output quality, pricing & use case. Updated June 2026.",
    intro: "AI writing tools have matured enormously. Whether you\'re writing blog posts, marketing copy, or long-form reports, the right AI writing assistant can 10x your output without sacrificing quality. We tested over a dozen tools — here\'s what actually works.",
    toolSlugs: ["claude", "chatgpt", "jasper", "writesonic", "perplexity", "make-com"],
    category: "ai-writing",
    lastUpdated: "2026-06-18",
  },
  {
    slug: "ai-voice-tools",
    title: "Best AI Voice Generator Tools of 2026",
    headline: "The 5 Best AI Voice Generator Tools of 2026 (Ranked by Audio Quality)",
    metaDescription: "5 best AI voice generators in 2026: ElevenLabs vs Murf vs Pictory — tested for realism, voice cloning & pricing. Which one is worth paying for?",
    intro: "AI voice generation has reached a level of realism that was unimaginable just two years ago. Whether you\'re a podcaster needing a narrator, a developer building a voice-enabled app, or a marketer creating multilingual audio content, the right AI voice tool can transform your workflow. We tested the top platforms head-to-head — here are the five best.",
    toolSlugs: ["elevenlabs", "murf-ai", "pictory"],
    category: "ai-voice",
    lastUpdated: "2026-06-18",
  },
  {
    slug: "ai-image-generators",
    title: "Best AI Image Generators of 2026",
    headline: "The 5 Best AI Image Generators of 2026 (Tested for Quality & Price)",
    metaDescription: "Best AI image generators in 2026: Midjourney vs Canva AI vs AdCreative — tested for image quality, ease of use, and pricing. Expert picks for creators and marketers.",
    intro: "AI image generation has moved from novelty to necessity for content creators, marketers, and designers. Whether you need photorealistic visuals, branded social graphics, or artistic illustrations, the right AI image generator can save hours of design work. We tested every major platform — here are the five best picks for 2026.",
    toolSlugs: ["midjourney", "canva-ai", "adcreative-ai", "chatgpt", "jasper"],
    category: "ai-image",
    lastUpdated: "2026-06-18",
  },
  {
    slug: "ai-productivity-tools",
    title: "Best AI Productivity Tools of 2026",
    headline: "The 7 Best AI Productivity Tools of 2026 (Ranked by Real-World Impact)",
    metaDescription: "Best AI productivity tools in 2026: Claude, ChatGPT, Notion AI, Gamma, Grammarly & more — ranked by time saved, ease of use, and value for professionals.",
    intro: "The right AI productivity tools can reclaim hours every week — from drafting emails and summarizing documents to automating repetitive workflows. In 2026, the best tools go far beyond simple chatbots. We tested the full stack of AI productivity software and ranked the tools that deliver real daily value.",
    toolSlugs: ["claude", "chatgpt", "notion-ai", "grammarly", "gamma", "make-com", "perplexity"],
    category: "ai-productivity",
    lastUpdated: "2026-06-18",
  },
  {
    slug: "ai-presentation-tools",
    title: "Best AI Presentation Tools of 2026",
    headline: "The 4 Best AI Presentation Tools of 2026 (Slide Decks in Minutes)",
    metaDescription: "Best AI presentation tools in 2026: Gamma, ChatGPT, Notion AI & more — compare AI slide builders for speed, design quality, and export options.",
    intro: "AI presentation tools have made it possible to go from a prompt or rough outline to a polished, designed slide deck in under two minutes. Whether you\'re pitching investors, presenting to clients, or creating a course, these tools eliminate the manual design work. Here are the best AI presentation tools we tested in 2026.",
    toolSlugs: ["gamma", "chatgpt", "notion-ai", "claude"],
    category: "ai-presentations",
    lastUpdated: "2026-06-18",
  },
  {
    slug: "ai-podcast-tools",
    title: "Best AI Podcast Tools of 2026",
    headline: "The 5 Best AI Tools for Podcasters in 2026 (Edit, Transcribe & Repurpose)",
    metaDescription: "Best AI podcast tools in 2026: Descript, Castmagic, ElevenLabs & more — compare AI tools for podcast editing, transcription, show notes, and content repurposing.",
    intro: "AI has transformed every stage of the podcast workflow — from editing audio with transcript-based cuts to generating show notes, blog posts, and social clips automatically. Whether you\'re a solo podcaster or running a production team, the right AI tools can cut your post-production time in half. Here are the five best AI podcast tools in 2026.",
    toolSlugs: ["descript", "castmagic", "elevenlabs", "murf-ai", "writesonic"],
    category: "ai-podcast",
    lastUpdated: "2026-06-18",
  },
  {
    slug: "ai-content-repurposing",
    title: "Best AI Content Repurposing Tools of 2026",
    headline: "The 5 Best AI Tools for Content Repurposing in 2026",
    metaDescription: "Best AI content repurposing tools in 2026: Castmagic, Descript, Writesonic & more — automatically turn podcasts, videos, and long-form content into blogs, tweets, and newsletters.",
    intro: "Content repurposing used to mean manually copying, reformatting, and rewriting content across platforms. In 2026, AI tools can take a single podcast episode or video and automatically generate show notes, blog posts, email newsletters, LinkedIn posts, and Twitter threads in minutes. Here are the five best tools for doing exactly that.",
    toolSlugs: ["castmagic", "descript", "writesonic", "jasper", "chatgpt"],
    category: "ai-repurposing",
    lastUpdated: "2026-06-18",
  },
  {
    slug: "ai-marketing-tools",
    title: "Best AI Marketing Tools of 2026",
    headline: "The 8 Best AI Marketing Tools of 2026 (For Every Budget)",
    metaDescription: "Best AI marketing tools in 2026: AdCreative AI, Jasper, Writesonic, Canva AI & more — ranked by ROI, ease of use, and fit for solo marketers vs enterprise teams.",
    intro: "AI marketing tools now span every channel — ad creative, copy, SEO content, social media, email, and analytics. The challenge isn\'t finding an AI marketing tool; it\'s knowing which ones are actually worth paying for. We tested the full stack and ranked the tools that consistently deliver measurable results for both solo marketers and enterprise teams.",
    toolSlugs: ["adcreative-ai", "jasper", "writesonic", "canva-ai", "grammarly", "chatgpt", "claude", "make-com"],
    category: "ai-marketing",
    lastUpdated: "2026-06-18",
  },
  {
    slug: "ai-tools-small-business",
    title: "Best AI Tools for Small Business in 2026",
    headline: "The 8 Best AI Tools for Small Business in 2026 (Tested & Ranked)",
    metaDescription: "Best AI tools for small business in 2026: Claude, ChatGPT, Make.com, Mailchimp & more — ranked by impact, ease of use, and ROI. Expert picks with pricing.",
    intro: "Small businesses today have access to AI tools that would have cost enterprise budgets just five years ago. The right AI stack can handle customer communication, content creation, automation, email marketing, and competitive research — freeing you to focus on growth. We tested the AI tools that consistently deliver the best ROI for small business owners with limited time and budget. Here are the eight that belong in every small business toolkit.",
    toolSlugs: ["claude", "chatgpt", "make-com", "mailchimp", "canva-ai", "grammarly", "n8n", "jasper"],
    category: "ai-productivity",
    lastUpdated: "2026-06-22",
  },
  {
    slug: "best-free-ai-tools",
    title: "Best Free AI Tools of 2026",
    headline: "The 7 Best Free AI Tools of 2026 (No Credit Card Required)",
    metaDescription: "7 best free AI tools in 2026 — Claude, ChatGPT, Canva AI, Grammarly, n8n & Gemini — ranked by what you actually get for free. Expert-tested picks.",
    intro: "The good news: some of the most powerful AI tools in the world have genuinely useful free tiers. The bad news: it's hard to know which free plans are actually worth using versus which are heavily limited demos. We tested every major AI tool's free tier for 30 days and ranked the ones that deliver real value — no credit card required, no bait-and-switch. These seven tools will meaningfully improve your workflow at zero cost.",
    toolSlugs: ["claude", "chatgpt", "canva-ai", "grammarly", "n8n", "gemini", "ubersuggest"],
    category: "ai-productivity",
    lastUpdated: "2026-06-22",
  },
  {
    slug: "ai-automation-tools-2026",
    title: "Best AI Automation Tools of 2026",
    headline: "The 7 Best AI Automation Tools of 2026 (Tested & Ranked)",
    metaDescription: "Best AI automation tools in 2026: Make.com, n8n, Zapier, and more — ranked by power, ease of use, and value. Expert picks with full reviews.",
    intro: "AI-powered automation has fundamentally changed how businesses operate in 2026. The right automation platform can eliminate dozens of hours of manual work per week — syncing data, routing leads, publishing content, triggering workflows, and building AI agent pipelines. We tested every major automation platform for 30+ days across real business workflows. These seven tools are the ones worth your time and money.",
    toolSlugs: ["make-com", "n8n", "zapier", "notion-ai", "mailchimp", "grammarly", "adcreative-ai"],
    category: "ai-automation",
    lastUpdated: "2026-06-23",
  },
];

export function getBestListBySlug(slug: string): BestList | undefined {
  return bestLists.find((l) => l.slug === slug);
}
