export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  emoji: string;
  authorSlug: string;
  authorName: string;
  authorAvatar: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  relatedToolSlugs: string[];
}

export const allBlogPosts: BlogPost[] = [
  {
    slug: "best-ai-writing-tools-2026",
    title: "Best AI Writing Tools in 2026: We Tested 20 So You Don't Have To",
    excerpt: "After 30 days of hands-on testing, here are the AI writing tools actually worth paying for — and the ones that overpromise and underdeliver.",
    content: "",
    category: "AI Writing",
    emoji: "✍",
    authorSlug: "alex-morgan",
    authorName: "Alex Morgan",
    authorAvatar: "https://ui-avatars.com/api/?name=Alex+Morgan&background=2563EB&color=fff&size=64",
    publishedAt: "May 15, 2026",
    updatedAt: "May 15, 2026",
    readTime: "12 min read",
    tags: ["ai-writing", "jasper", "writesonic", "copy-ai"],
    metaTitle: "Best AI Writing Tools 2026 — Tested & Ranked",
    metaDescription: "We tested 20 AI writing tools over 30 days. Here are the ones actually worth your money in 2026.",
    relatedToolSlugs: ["jasper", "writesonic", "claude"],
  },
  {
    slug: "elevenlabs-vs-murf-ai-voice",
    title: "ElevenLabs vs Murf.ai: Which AI Voice Generator Is Better in 2026?",
    excerpt: "Both promise studio-quality AI voices. We put them head-to-head across 8 dimensions to find the winner for creators and businesses.",
    content: "",
    category: "AI Voice",
    emoji: "✨Z",
    authorSlug: "sarah-chen",
    authorName: "Sarah Chen",
    authorAvatar: "https://ui-avatars.com/api/?name=Sarah+Chen&background=10B981&color=fff&size=64",
    publishedAt: "May 12, 2026",
    updatedAt: "May 12, 2026",
    readTime: "9 min read",
    tags: ["elevenlabs", "ai-voice", "comparison"],
    metaTitle: "ElevenLabs vs Murf.ai 2026 — Which AI Voice is Better?",
    metaDescription: "ElevenLabs vs Murf.ai comparison: pricing, voice quality, features, and who should use which.",
    relatedToolSlugs: ["elevenlabs"],
  },
  {
    slug: "make-com-automation-guide",
    title: "Make.com Beginner's Guide: Build Your First Automation in 30 Minutes",
    excerpt: "No coding required. This step-by-step guide walks you through building a real automation workflow with Make.com from scratch.",
    content: "",
    category: "AI Automation",
    emoji: "⚡",
    authorSlug: "alex-morgan",
    authorName: "Alex Morgan",
    authorAvatar: "https://ui-avatars.com/api/?name=Alex+Morgan&background=2563EB&color=fff&size=64",
    publishedAt: "May 8, 2026",
    updatedAt: "May 8, 2026",
    readTime: "15 min read",
    tags: ["make-com", "automation", "tutorial"],
    metaTitle: "Make.com Beginner's Guide 2026 — Build Your First Automation",
    metaDescription: "Step-by-step Make.com tutorial for beginners. Build your first automation workflow in 30 minutes without code.",
    relatedToolSlugs: ["make-com"],
  },
  {
    slug: "free-ai-tools-actually-useful",
    title: "10 Free AI Tools That Are Actually Useful in 2026",
    excerpt: "Most 'free' AI tools are glorified trials. These 10 are genuinely useful with generous free tiers — no credit card required.",
    content: "",
    category: "AI Tools",
    emoji: "👍",
    authorSlug: "alex-morgan",
    authorName: "Alex Morgan",
    authorAvatar: "https://ui-avatars.com/api/?name=Alex+Morgan&background=2563EB&color=fff&size=64",
    publishedAt: "May 5, 2026",
    updatedAt: "May 5, 2026",
    readTime: "8 min read",
    tags: ["free-plan", "tools-overview"],
    metaTitle: "10 Free AI Tools Worth Using in 2026",
    metaDescription: "These free AI tools have genuinely useful free tiers — not just 7-day trials. Tested and ranked by our team.",
    relatedToolSlugs: ["claude", "chatgpt", "writesonic"],
  },
  {
    slug: "chatgpt-vs-claude-2026",
    title: "ChatGPT vs Claude in 2026: After 6 Months of Daily Use",
    excerpt: "I've used both ChatGPT and Claude as my primary AI assistant for 6 months. Here's the unfiltered truth about which is actually better.",
    content: "",
    category: "AI Chatbots",
    emoji: "✨-",
    authorSlug: "alex-morgan",
    authorName: "Alex Morgan",
    authorAvatar: "https://ui-avatars.com/api/?name=Alex+Morgan&background=2563EB&color=fff&size=64",
    publishedAt: "May 1, 2026",
    updatedAt: "May 1, 2026",
    readTime: "11 min read",
    tags: ["chatgpt", "claude", "comparison"],
    metaTitle: "ChatGPT vs Claude 2026 — 6 Months of Daily Use Review",
    metaDescription: "Honest ChatGPT vs Claude comparison after 6 months of real daily use. Which AI assistant is actually better in 2026?",
    relatedToolSlugs: ["claude", "chatgpt"],
  },
  {
    slug: "ai-tools-for-freelancers",
    title: "Best AI Tools for Freelancers in 2026 — Our Top Picks",
    excerpt: "The right AI tools can double your freelance output without sacrificing quality. Here are the exact tools our team recommends for freelancers.",
    content: "",
    category: "AI Tools",
    emoji: "📝'",
    authorSlug: "alex-morgan",
    authorName: "Alex Morgan",
    authorAvatar: "https://ui-avatars.com/api/?name=Alex+Morgan&background=2563EB&color=fff&size=64",
    publishedAt: "April 28, 2026",
    updatedAt: "May 10, 2026",
    readTime: "10 min read",
    tags: ["freelancers", "tools-overview", "productivity"],
    metaTitle: "Best AI Tools for Freelancers 2026 — Tested & Ranked",
    metaDescription: "The AI tools that actually help freelancers earn more. Tested by our team across writing, automation, video, and productivity.",
    relatedToolSlugs: ["jasper", "writesonic", "make-com"],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return allBlogPosts.find((p) => p.slug === slug);
}
