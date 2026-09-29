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
    name: "AISaaSToolkit Editorial Team",
    title: "AI Software Research",
    bio: "The AISaaSToolkit editorial team researches AI and SaaS products for business users. Reviews combine current product documentation, published pricing, feature comparisons, and hands-on experience when it is available. Because AI products change quickly, readers should confirm final pricing and plan limits on the vendor's website before purchasing.",
    shortBio: "Practical AI software research with transparent sourcing, update dates, and affiliate disclosures.",
    avatar: "https://ui-avatars.com/api/?name=AI+SaaS+Toolkit&background=2563EB&color=fff&size=128",
    expertise: ["AI Writing Tools", "AI Automation", "AI Video", "SaaS Analytics", "AI Marketing Tools", "SEO Platforms"],
    reviewCount: 45,
    joinedDate: "2021-03-01",
  },
  {
    slug: "sarah-chen",
    name: "AISaaSToolkit Media Desk",
    title: "AI Voice & Video Research",
    bio: "The AISaaSToolkit Media Desk compares AI voice, video, and multimedia products using published specifications, current pricing, sample outputs, and hands-on workflows where available. Coverage focuses on output quality, usability, licensing, and practical production value.",
    shortBio: "Research and practical comparisons for AI voice, video, and creator tools.",
    avatar: "https://ui-avatars.com/api/?name=Media+Desk&background=10B981&color=fff&size=128",
    expertise: ["AI Voice Generators", "AI Video Tools", "Content Creation", "Podcast Production"],
    reviewCount: 3,
    joinedDate: "2022-06-01",
  },
  {
    slug: "james-wright",
    name: "AISaaSToolkit Automation Desk",
    title: "Automation & Workflow Research",
    bio: "The AISaaSToolkit Automation Desk covers Make.com, n8n, Zapier, APIs, and AI-assisted workflows. Coverage prioritizes reproducible use cases, setup complexity, operating limits, and business value instead of vendor marketing claims.",
    shortBio: "Workflow-focused research for Make.com, n8n, Zapier, APIs, and AI automation.",
    avatar: "https://ui-avatars.com/api/?name=Automation+Desk&background=F97316&color=fff&size=128",
    expertise: ["AI Automation", "Workflow Automation", "n8n", "Make.com", "Business Process Automation", "API Integrations"],
    reviewCount: 8,
    joinedDate: "2024-01-01",
  },
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return allAuthors.find((a) => a.slug === slug);
}
