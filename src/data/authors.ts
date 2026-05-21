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
    bio: "Alex Morgan has been researching and reviewing AI and SaaS tools for over 5 years. With a background in software engineering and digital marketing, Alex brings a unique perspective to tool evaluations — combining technical depth with real-world business application. Every review on AISaaSToolkit undergoes a minimum 30-day hands-on testing period before publication.",
    shortBio: "5+ years reviewing AI tools. Former software engineer. 30-day hands-on testing on every review.",
    avatar: "https://ui-avatars.com/api/?name=Alex+Morgan&background=2563EB&color=fff&size=128",
    linkedin: "https://linkedin.com/in/alexmorgan-ai",
    twitter: "https://twitter.com/alexmorgan_ai",
    expertise: ["AI Writing Tools", "AI Automation", "AI Video", "SaaS Analytics"],
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
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return allAuthors.find((a) => a.slug === slug);
}
