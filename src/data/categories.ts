export interface Category {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  toolCount: number;
  featured: boolean;
}

export const categories: Category[] = [
  {
    name: "AI Automation",
    slug: "ai-automation",
    description: "Automate repetitive tasks and build powerful workflows with AI-powered automation tools.",
    icon: "⚡",
    color: "from-blue-500 to-cyan-500",
    toolCount: 12,
    featured: true,
  },
  {
    name: "AI SEO",
    slug: "ai-seo",
    description: "Supercharge your search rankings with AI-driven keyword research, content optimization, and technical SEO tools.",
    icon: "🔍",
    color: "from-green-500 to-emerald-500",
    toolCount: 9,
    featured: true,
  },
  {
    name: "AI Video",
    slug: "ai-video",
    description: "Create, edit, and enhance videos with artificial intelligence — no camera or editing skills required.",
    icon: "🎬",
    color: "from-red-500 to-pink-500",
    toolCount: 10,
    featured: true,
  },
  {
    name: "AI Writing",
    slug: "ai-writing",
    description: "Generate high-quality blog posts, copy, and long-form content faster than ever with AI writing assistants.",
    icon: "✍️",
    color: "from-purple-500 to-violet-500",
    toolCount: 14,
    featured: true,
  },
  {
    name: "AI Marketing",
    slug: "ai-marketing",
    description: "Scale your marketing campaigns with AI tools for ads, email, social media, and lead generation.",
    icon: "📈",
    color: "from-orange-500 to-yellow-500",
    toolCount: 8,
    featured: true,
  },
  {
    name: "AI Productivity",
    slug: "ai-productivity",
    description: "Work smarter with AI assistants that handle scheduling, summarization, research, and task management.",
    icon: "🚀",
    color: "from-indigo-500 to-blue-500",
    toolCount: 11,
    featured: false,
  },
  {
    name: "AI Agents",
    slug: "ai-agents",
    description: "Deploy autonomous AI agents that can browse the web, write code, manage files, and complete complex tasks.",
    icon: "🤖",
    color: "from-pink-500 to-rose-500",
    toolCount: 7,
    featured: false,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
