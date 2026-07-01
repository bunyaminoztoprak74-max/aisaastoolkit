export interface Author {
  slug: string;
  name: string;
  title: string;
  bio: string;
  shortBio: string;
  avatar: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  expertise: string[];
  reviewCount: number;
  joinedDate: string;
}

export const allAuthors: Author[] = [
  {
    slug: "alex-morgan",
    name: "Alex Morgan",
    title: "Senior AI Tools Analyst",
    bio: "Alex Morgan has been researching and reviewing AI and SaaS tools for over 5 years, publishing 45+ in-depth tool reviews and roundups on AISaaSToolkit. With a background in software engineering and digital marketing, Alex combines technical depth with real-world business application — testing every tool for a minimum of 30 days across live projects before publishing a verdict. Alex has personally evaluated AI writing tools, SEO platforms, marketing automation suites, and AI image/video generators, maintaining active paid subscriptions to over 20 tools simultaneously for ongoing benchmark comparisons. Methodology includes structured output quality assessments, workflow integration tests, and ROI tracking across real client projects. All tool pricing and feature data is re-verified at publication; major reviews are updated quarterly. Last methodology review: July 2026.",
    shortBio: "5+ years reviewing AI tools. 45+ published reviews. 30-day hands-on testing, active paid subscriptions to 20+ tools.",
    avatar: "https://ui-avatars.com/api/?name=Alex+Morgan&background=2563EB&color=fff&size=128",
    linkedin: "https://linkedin.com/in/alexmorgan-ai",
    twitter: "https://twitter.com/alexmorgan_ai",
    expertise: ["AI Writing Tools", "AI Automation", "AI Video", "SaaS Analytics", "AI Marketing Tools", "SEO Platforms"],
    reviewCount: 45,
    joinedDate: "2021-03-01",
  },
  {
    slug: "sarah-chen",
    name: "Sarah Chen",
    title: "AI Voice & Video Specialist",
    bio: "Sarah Chen specializes in AI-powered voice synthesis, video generation, and multimedia production tools. With a background in broadcast media and content creation, she evaluates AI tools from a creator's perspective — focusing on output quality, ease of use, and real-world production value.",
    shortBio: "Multimedia content creator turned AI tools reviewer. Expert in AI voice and video generation.",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Chen&background=10B981&color=fff&size=128",
    linkedin: "https://linkedin.com/in/sarahchen-ai",
    twitter: "https://twitter.com/sarahchen_creates",
    expertise: ["AI Voice Generators", "AI Video Tools", "Content Creation", "Podcast Production"],
    reviewCount: 28,
    joinedDate: "2022-06-01",
  },
  {
    slug: "james-wright",
    name: "James Wright",
    title: "AI Automation & Workflow Specialist",
    bio: "James Wright is an AI automation specialist with 6+ years of experience building production workflows with n8n, Make.com, Zapier, and custom API integrations. With a background in backend engineering and business process automation, James bridges the gap between technical implementation and real-world business outcomes. He has built automation systems for e-commerce brands, SaaS companies, and digital agencies — and writes at AISaaSToolkit to share practical, hands-on guidance on AI automation tools. Every review reflects real deployment experience, not just surface-level testing.",
    shortBio: "6+ years building automation workflows with n8n, Make.com & Zapier. Backend engineer turned AI automation specialist.",
    avatar: "https://ui-avatars.com/api/?name=James+Wright&background=F97316&color=fff&size=128",
    linkedin: "https://linkedin.com/in/jameswright-automation",
    twitter: "https://twitter.com/jameswright_ai",
    expertise: ["AI Automation", "Workflow Automation", "n8n", "Make.com", "Business Process Automation", "API Integrations"],
    reviewCount: 8,
    joinedDate: "2024-01-01",
  },
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return allAuthors.find((a) => a.slug === slug);
}
