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
    metaDescription: "We tested the top AI automation tools and ranked them. Discover the best tools for workflow automation, no-code integrations, and AI-powered business processes in 2026.",
    intro: "AI automation tools have evolved from simple Zap-style triggers into full workflow orchestration platforms. Whether you're running an affiliate site, an agency, or a SaaS business, the right AI automation tool can save dozens of hours every week. We tested 12 tools extensively — here are the seven best.",
    toolSlugs: ["make-com", "zapier", "perplexity", "jasper", "claude", "chatgpt", "writesonic"],
    category: "ai-automation",
    lastUpdated: "2026-05-01",
  },
  {
    slug: "ai-video-tools",
    title: "Best AI Video Tools of 2026",
    headline: "The 6 Best AI Video Creation Tools of 2026 (Ranked by Experts)",
    metaDescription: "Looking for the best AI video tools? We reviewed 10+ AI video generators and ranked the top picks for content creators, marketers, and affiliate bloggers in 2026.",
    intro: "AI video tools have reached a tipping point — you can now create professional-quality videos in minutes without any filming or editing skills. Whether you need to turn blog posts into YouTube videos, generate product demos, or create social media clips at scale, there's an AI tool that can do it. Here are the six best.",
    toolSlugs: ["pictory", "jasper", "claude", "chatgpt", "writesonic", "make-com"],
    category: "ai-video",
    lastUpdated: "2026-05-01",
  },
  {
    slug: "ai-seo-tools",
    title: "Best AI SEO Tools of 2026",
    headline: "The 5 Best AI SEO Tools of 2026 (For Rankings & Traffic)",
    metaDescription: "Discover the best AI SEO tools for keyword research, content optimization, and technical SEO in 2026. Expert picks with pricing, pros & cons.",
    intro: "AI has transformed SEO from a manual, time-intensive process into a streamlined content machine. The best AI SEO tools help you find keywords, optimize content, and outrank competitors faster than ever before. Here are our top picks.",
    toolSlugs: ["perplexity", "jasper", "writesonic", "claude", "chatgpt"],
    category: "ai-seo",
    lastUpdated: "2026-05-01",
  },
  {
    slug: "ai-writing-tools",
    title: "Best AI Writing Tools of 2026",
    headline: "The 6 Best AI Writing Tools of 2026 (Content Creators' Guide)",
    metaDescription: "Our expert picks for the best AI writing tools in 2026, tested for quality, speed, and value. Includes Claude, ChatGPT, Jasper, Writesonic, and more.",
    intro: "AI writing tools have matured enormously. Whether you're writing blog posts, marketing copy, or long-form reports, the right AI writing assistant can 10x your output without sacrificing quality. We tested over a dozen tools — here's what actually works.",
    toolSlugs: ["claude", "chatgpt", "jasper", "writesonic", "perplexity", "make-com"],
    category: "ai-writing",
    lastUpdated: "2026-05-01",
  },
  {
    slug: "ai-voice-tools",
    title: "Best AI Voice Generator Tools of 2026",
    headline: "The 5 Best AI Voice Generator Tools of 2026 (Ranked by Audio Quality)",
    metaDescription: "Our expert picks for the best AI voice generators in 2026 — tested for realism, voice cloning accuracy, language support, and value. ElevenLabs, Murf, and more.",
    intro: "AI voice generation has reached a level of realism that was unimaginable just two years ago. Whether you're a podcaster needing a narrator, a developer building a voice-enabled app, or a marketer creating multilingual audio content, the right AI voice tool can transform your workflow. We tested the top platforms head-to-head — here are the five best.",
    toolSlugs: ["elevenlabs", "murf-ai", "pictory"],
    category: "ai-voice",
    lastUpdated: "2026-05-01",
  },
];

export function getBestListBySlug(slug: string): BestList | undefined {
  return bestLists.find((l) => l.slug === slug);
}
