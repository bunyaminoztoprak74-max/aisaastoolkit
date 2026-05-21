export interface Deal {
  id: string;
  toolSlug: string;
  toolName: string;
  headline: string;
  description: string;
  discountCode?: string;
  discountAmount: string;
  originalPrice?: string;
  dealPrice?: string;
  dealUrl: string;
  expiryDate?: string;
  isVerified: boolean;
  category: string;
}

export const allDeals: Deal[] = [
  {
    id: "elevenlabs-starter",
    toolSlug: "elevenlabs",
    toolName: "ElevenLabs",
    headline: "Start Free with ElevenLabs",
    description: "Get access to ElevenLabs AI voice generator with a free plan — no credit card required. Upgrade anytime for more characters and premium voices.",
    dealUrl: "https://try.elevenlabs.io/2n2qt91ne8ak",
    isVerified: true,
    discountAmount: "Free plan available",
    category: "AI Voice",
  },
  {
    id: "make-free-trial",
    toolSlug: "make-com",
    toolName: "Make.com",
    headline: "1,000 Free Operations/Month",
    description: "Make.com's free plan includes 1,000 operations per month — enough to build and test your first automation workflows before committing.",
    dealUrl: "https://make.com",
    isVerified: true,
    discountAmount: "Free tier (1,000 ops/mo)",
    category: "AI Automation",
  },
  {
    id: "pictory-trial",
    toolSlug: "pictory",
    toolName: "Pictory",
    headline: "14-Day Free Trial",
    description: "Try Pictory's AI video creation platform free for 14 days — no credit card required. Convert your blog posts and scripts into professional videos.",
    dealUrl: "https://pictory.ai",
    isVerified: true,
    discountAmount: "14-day free trial",
    category: "AI Video",
  },
  {
    id: "jasper-trial",
    toolSlug: "jasper",
    toolName: "Jasper AI",
    headline: "7-Day Free Trial",
    description: "Try Jasper's enterprise AI writing platform free for 7 days. Access all features including Brand Voice, campaigns, and the AI art generator.",
    dealUrl: "https://jasper.ai",
    isVerified: true,
    discountAmount: "7-day free trial",
    category: "AI Writing",
  },
  {
    id: "writesonic-free",
    toolSlug: "writesonic",
    toolName: "Writesonic",
    headline: "10,000 Free Words Per Month",
    description: "Writesonic's free plan gives you 10,000 words per month — one of the most generous free AI writing tiers available.",
    dealUrl: "https://writesonic.com",
    isVerified: true,
    discountAmount: "Free tier (10,000 words/mo)",
    category: "AI Writing",
  },
];

export function getDealByToolSlug(toolSlug: string): Deal | undefined {
  return allDeals.find((d) => d.toolSlug === toolSlug);
}

export function getDealsByCategory(category: string): Deal[] {
  return allDeals.filter((d) => d.category === category);
}
