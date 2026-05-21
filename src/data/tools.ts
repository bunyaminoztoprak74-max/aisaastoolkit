export interface PricingTier {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  recommended?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Tool {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  longDescription?: string;
  logo: string;
  logoColor?: string;
  website: string;
  affiliateUrl: string;
  category: string;
  categories?: string[];
  rating: number;
  reviewCount: number;
  badge?: "recommended" | "best-value" | "trending" | "new" | "editor-choice" | "editor choice";
  pricing?: {
    starting: string;
    hasFree: boolean;
    tiers: PricingTier[];
  };
  // New flat pricing fields for ElevenLabs-style tools
  startingPrice?: string;
  pricingTiers?: PricingTier[];
  featured?: boolean;
  trending?: boolean;
  // EEAT fields
  authorSlug?: string;
  lastTestedDate?: string;
  quickVerdict?: string;
  whoIsItFor?: string[];
  whoShouldAvoid?: string[];
  trialUrl?: string;
  discountCode?: string;
  discountAmount?: string;
  alternatives?: string[];
  videoUrl?: string;
  features?: { title: string; description: string }[];
  pros: string[];
  cons: string[];
  bestFor?: string[];
  faqs?: FAQ[];
  lastUpdated?: string;
  tags?: string[];
  relatedTools?: string[];
  metaTitle?: string;
  metaDescription?: string;
}

export const tools: Tool[] = [
  {
    name: "Claude",
    slug: "claude",
    featured: true,
    tagline: "The most capable AI assistant for deep reasoning and long-context tasks",
    description: "Claude is Anthropic's flagship AI assistant, renowned for safety, nuanced reasoning, and handling very long documents.",
    longDescription: "Claude by Anthropic is one of the most powerful AI assistants available in 2026. Built with a Constitutional AI approach, Claude excels at complex reasoning, coding, analysis, and long-context tasks — handling documents up to 200K tokens. Its writing quality is widely considered the best among leading LLMs, and it consistently scores top marks for honesty and safety.",
    logo: "/images/logos/claude.svg",
    website: "https://claude.ai",
    affiliateUrl: "https://claude.ai", // No affiliate program — direct link
    category: "ai-writing",
    categories: ["ai-writing", "ai-productivity", "ai-agents"],
    rating: 4.8,
    reviewCount: 2341,
    badge: "editor-choice",
    pricing: {
      starting: "Free",
      hasFree: true,
      tiers: [
        {
          name: "Free",
          price: "$0",
          period: "/month",
          features: ["Claude Haiku access", "Limited messages/day", "Basic file uploads", "Web interface"],
        },
        {
          name: "Pro",
          price: "$20",
          period: "/month",
          features: ["Claude Opus & Sonnet", "5x more usage", "Priority access", "Projects & memory", "Advanced analysis"],
          highlighted: true,
          badge: "Most Popular",
        },
        {
          name: "Team",
          price: "$30",
          period: "/user/month",
          features: ["Everything in Pro", "Team collaboration", "Admin controls", "SSO", "Higher limits"],
        },
      ],
    },
    features: [
      { title: "200K Context Window", description: "Analyze entire codebases, legal contracts, or books in a single prompt." },
      { title: "Constitutional AI Safety", description: "Built-in guardrails make Claude safer and more honest than competitors." },
      { title: "Advanced Reasoning", description: "Solves complex math, logic puzzles, and multi-step research tasks." },
      { title: "Code Generation", description: "Writes, debugs, and explains code in 20+ programming languages." },
      { title: "Document Analysis", description: "Upload PDFs, spreadsheets, and images for instant analysis." },
      { title: "Projects & Memory", description: "Maintain context across sessions with Claude's Projects feature." },
    ],
    pros: [
      "Best-in-class writing quality and nuance",
      "Extremely long context window (200K tokens)",
      "Refuses harmful requests reliably",
      "Excellent at following complex instructions",
      "Strong coding and debugging ability",
      "Great for long-form content and analysis",
    ],
    cons: [
      "No image generation (text-only outputs)",
      "Slower than GPT-4o on simple tasks",
      "Cannot browse the web on free tier",
      "API pricing can add up at scale",
    ],
    bestFor: [
      "Content creators writing long-form articles",
      "Developers needing coding assistance",
      "Researchers analyzing large documents",
      "Businesses needing safe, reliable AI",
      "Affiliate marketers writing reviews",
    ],
    alternatives: ["chatgpt", "gemini", "perplexity", "jasper"],
    faqs: [
      {
        question: "Is Claude better than ChatGPT?",
        answer: "Claude generally produces higher-quality, more nuanced writing and handles longer documents better. ChatGPT has more integrations and plugins. The best choice depends on your use case.",
      },
      {
        question: "Does Claude have a free plan?",
        answer: "Yes, Claude offers a free tier with access to Claude Haiku and limited daily messages. For heavy use, the Pro plan at $20/month is recommended.",
      },
      {
        question: "Can Claude generate images?",
        answer: "No, Claude is a text-only AI model and cannot generate images. For image generation, consider Midjourney or DALL-E.",
      },
      {
        question: "What is Claude's context window?",
        answer: "Claude supports up to 200,000 tokens in its context window — roughly 150,000 words — making it ideal for analyzing long documents.",
      },
    ],
    lastUpdated: "2026-05-01",
  },
  {
    name: "ChatGPT",
    slug: "chatgpt",
    featured: true,
    trending: true,
    tagline: "The world's most popular AI chatbot with the largest plugin ecosystem",
    description: "OpenAI's ChatGPT remains the most widely-used AI assistant, with GPT-4o powering fast, multimodal conversations.",
    longDescription: "ChatGPT by OpenAI is the AI tool that started the generative AI revolution. With GPT-4o at its core, it handles text, images, voice, and even video inputs. Its massive plugin marketplace and integrations with thousands of apps make it the most versatile AI assistant available.",
    logo: "/images/logos/chatgpt.svg",
    website: "https://chat.openai.com",
    affiliateUrl: "https://chat.openai.com", // No affiliate program — direct link
    category: "ai-writing",
    categories: ["ai-writing", "ai-productivity", "ai-agents"],
    rating: 4.7,
    reviewCount: 5123,
    badge: "trending",
    pricing: {
      starting: "Free",
      hasFree: true,
      tiers: [
        {
          name: "Free",
          price: "$0",
          period: "/month",
          features: ["GPT-4o mini", "Unlimited messages", "Basic image uploads", "DALL-E image gen"],
        },
        {
          name: "Plus",
          price: "$20",
          period: "/month",
          features: ["GPT-4o", "o1 reasoning model", "Advanced data analysis", "Custom GPTs", "DALL-E 3"],
          highlighted: true,
          badge: "Best Value",
        },
        {
          name: "Team",
          price: "$30",
          period: "/user/month",
          features: ["Everything in Plus", "Higher limits", "Admin dashboard", "Team workspaces"],
        },
      ],
    },
    features: [
      { title: "GPT-4o Multimodal", description: "Process text, images, audio, and video in one unified model." },
      { title: "Custom GPTs", description: "Build and share custom AI assistants tailored to specific tasks." },
      { title: "DALL-E 3 Integration", description: "Generate stunning images directly within your chat." },
      { title: "Code Interpreter", description: "Run Python code, analyze data, and create charts in-chat." },
      { title: "Web Browsing", description: "Search the web in real-time for up-to-date information." },
      { title: "Voice Mode", description: "Have natural voice conversations with GPT-4o." },
    ],
    pros: [
      "Largest plugin and integration ecosystem",
      "Fast GPT-4o responses",
      "Built-in image generation with DALL-E 3",
      "Code interpreter for data analysis",
      "Real-time web search",
      "Most recognized AI brand globally",
    ],
    cons: [
      "Context window smaller than Claude (128K vs 200K)",
      "Writing can feel generic compared to Claude",
      "Privacy concerns with training data usage",
      "Usage limits on Plus plan",
    ],
    bestFor: [
      "Users who need image generation + chat",
      "Developers using OpenAI's API ecosystem",
      "Businesses needing extensive integrations",
      "Data analysts using Code Interpreter",
      "Teams building custom GPTs",
    ],
    alternatives: ["claude", "gemini", "perplexity", "jasper"],
    faqs: [
      {
        question: "Is ChatGPT Plus worth it?",
        answer: "Yes, for power users. You get GPT-4o, the o1 reasoning model, DALL-E 3, and advanced data analysis for $20/month — a strong value.",
      },
      {
        question: "What's the difference between GPT-4o and o1?",
        answer: "GPT-4o is optimized for speed and everyday tasks. o1 uses extended 'thinking' for complex reasoning — better for math, coding, and logic problems.",
      },
      {
        question: "Can ChatGPT browse the internet?",
        answer: "Yes, ChatGPT Plus and above can browse the web in real-time using the built-in search feature.",
      },
    ],
    lastUpdated: "2026-05-01",
  },
  {
    name: "Make.com",
    slug: "make-com",
    featured: true,
    trending: true,
    tagline: "The most powerful visual automation platform for non-coders",
    description: "Make.com (formerly Integromat) is a visual workflow automation platform that connects 1,500+ apps with AI-powered logic.",
    longDescription: "Make.com is the leading no-code automation platform for teams who need more power than Zapier without writing custom code. Its visual drag-and-drop scenario builder handles complex branching logic, data transformation, API calls, and AI integrations. With 1,500+ pre-built app connectors and a generous free tier, it's the go-to automation tool for affiliate marketers, agencies, and SaaS businesses.",
    logo: "/images/logos/make.svg",
    website: "https://make.com",
    affiliateUrl: "https://make.com", // TODO: Replace with your affiliate link after signup → make.com/en/affiliate (%35 recurring, 12 months)
    category: "ai-automation",
    categories: ["ai-automation", "ai-marketing"],
    rating: 4.7,
    reviewCount: 1876,
    badge: "recommended",
    pricing: {
      starting: "Free",
      hasFree: true,
      tiers: [
        {
          name: "Free",
          price: "$0",
          period: "/month",
          features: ["1,000 ops/month", "2 active scenarios", "5 min intervals", "All app connections"],
        },
        {
          name: "Core",
          price: "$10.59",
          period: "/month",
          features: ["10,000 ops/month", "Unlimited scenarios", "1 min intervals", "Custom variables"],
          highlighted: true,
          badge: "Best Value",
        },
        {
          name: "Pro",
          price: "$18.82",
          period: "/month",
          features: ["100,000 ops/month", "Custom functions", "Full-text search", "Priority support"],
        },
        {
          name: "Teams",
          price: "$34.12",
          period: "/month",
          features: ["Unlimited scenarios", "Team collaboration", "Custom roles", "Advanced scheduling"],
        },
      ],
    },
    features: [
      { title: "Visual Scenario Builder", description: "Drag-and-drop interface to build complex multi-step automations without code." },
      { title: "1,500+ App Integrations", description: "Connect virtually any app or service, including all major AI tools." },
      { title: "AI & OpenAI Modules", description: "Native integration with ChatGPT, DALL-E, and custom AI models." },
      { title: "Data Store", description: "Built-in database to store and retrieve data across automations." },
      { title: "Error Handling", description: "Advanced error routing and retry logic for bulletproof automations." },
      { title: "Webhooks & APIs", description: "Trigger scenarios via webhooks or connect to any REST API." },
    ],
    pros: [
      "Much more powerful than Zapier for complex workflows",
      "Generous free tier (1,000 ops/month)",
      "Visual flow builder is intuitive and powerful",
      "Native AI and OpenAI integrations",
      "Built-in data store and custom functions",
      "Excellent community and template library",
    ],
    cons: [
      "Steeper learning curve than Zapier",
      "Operations count can run out quickly on complex automations",
      "Customer support can be slow on lower plans",
      "Some advanced features require Pro plan",
    ],
    bestFor: [
      "Agencies automating client workflows",
      "Affiliate marketers building lead funnels",
      "E-commerce stores automating order management",
      "Content creators automating publishing pipelines",
      "SaaS businesses connecting multiple tools",
    ],
    alternatives: ["zapier", "n8n", "activepieces", "pipedream"],
    faqs: [
      {
        question: "Is Make.com better than Zapier?",
        answer: "Make.com is more powerful for complex automations with branching logic and data transformation. Zapier is simpler and has more native integrations. Make wins on price and power; Zapier wins on simplicity.",
      },
      {
        question: "What does 'operations' mean in Make.com?",
        answer: "Each time a module in your scenario executes, it counts as one operation. A scenario with 5 modules that runs 200 times uses 1,000 operations.",
      },
      {
        question: "Can Make.com integrate with AI tools?",
        answer: "Yes. Make.com has native modules for OpenAI (ChatGPT), Google AI, and many other AI services. You can also connect any AI with a REST API.",
      },
      {
        question: "Is Make.com free?",
        answer: "Yes, Make.com offers a free plan with 1,000 operations/month and 2 active scenarios — enough to test and run small automations.",
      },
    ],
    lastUpdated: "2026-05-01",
  },
  {
    name: "Pictory",
    slug: "pictory",
    tagline: "Turn long-form content into engaging short videos with AI",
    description: "Pictory uses AI to automatically convert blog posts, scripts, and recorded videos into professional branded video content.",
    longDescription: "Pictory is the leading AI video creation tool for content marketers and affiliate bloggers who want to repurpose their content into video without any video editing skills. Simply paste a URL, upload a script, or drop in a long video — Pictory's AI selects relevant stock footage, adds captions, and produces a polished branded video in minutes.",
    logo: "/images/logos/pictory.svg",
    website: "https://pictory.ai",
    affiliateUrl: "https://pictory.ai", // TODO: Replace with your affiliate link after signup → partners.pictory.ai (%20-50 recurring, lifetime)
    category: "ai-video",
    categories: ["ai-video", "ai-marketing"],
    rating: 4.5,
    reviewCount: 943,
    badge: "best-value",
    pricing: {
      starting: "$19",
      hasFree: false,
      tiers: [
        {
          name: "Starter",
          price: "$19",
          period: "/month",
          features: ["30 videos/month", "10 min max video length", "3 branded templates", "Auto-captions", "720p export"],
        },
        {
          name: "Professional",
          price: "$39",
          period: "/month",
          features: ["60 videos/month", "20 min max video", "Unlimited templates", "Team collaboration", "1080p export"],
          highlighted: true,
          badge: "Most Popular",
        },
        {
          name: "Teams",
          price: "$99",
          period: "/month",
          features: ["Unlimited videos", "Unlimited length", "3 user seats", "Priority support", "White-label"],
        },
      ],
    },
    features: [
      { title: "Blog to Video", description: "Paste any URL and Pictory turns the article into a video automatically." },
      { title: "Script to Video", description: "Type or paste a script and AI selects matching visuals from 3M+ stock clips." },
      { title: "Auto Captions", description: "AI generates and styles captions with 99% accuracy in 29 languages." },
      { title: "Video Highlight Reels", description: "Extract the best moments from long videos for social media clips." },
      { title: "Brand Kit", description: "Apply your logo, colors, and fonts to every video automatically." },
      { title: "AI Voiceover", description: "Choose from 100+ AI voices to narrate your video in any language." },
    ],
    pros: [
      "Incredibly easy to use — no video skills needed",
      "Converts blog posts to video with one click",
      "Huge stock footage library (3M+ clips)",
      "Accurate auto-captions in 29 languages",
      "Affordable pricing compared to competitors",
      "Great for repurposing content at scale",
    ],
    cons: [
      "No free plan (14-day trial only)",
      "AI stock footage selection isn't always perfect",
      "Limited animation and motion graphics",
      "Advanced editing requires learning curve",
    ],
    bestFor: [
      "Bloggers repurposing articles as YouTube videos",
      "Affiliate marketers creating product review videos",
      "Social media managers creating short clips",
      "Online course creators",
      "Agencies producing video content at scale",
    ],
    alternatives: ["invideo-ai", "synthesia", "heygen", "descript"],
    faqs: [
      {
        question: "Does Pictory have a free trial?",
        answer: "Yes, Pictory offers a 14-day free trial. No credit card is required to start, and you can create up to 3 projects during the trial.",
      },
      {
        question: "Can Pictory create videos from blog posts?",
        answer: "Absolutely — this is Pictory's signature feature. Paste any blog post URL and Pictory's AI automatically selects stock footage, adds voiceover, and generates captions.",
      },
      {
        question: "What video formats does Pictory export?",
        answer: "Pictory exports MP4 videos in 16:9 (YouTube), 9:16 (Reels/TikTok), and 1:1 (Instagram) formats up to 1080p HD.",
      },
    ],
    lastUpdated: "2026-05-01",
  },
  {
    name: "Jasper",
    slug: "jasper",
    featured: true,
    tagline: "Enterprise AI writing platform for marketing teams",
    description: "Jasper is a powerful AI content platform built for marketing teams — with brand voice training, templates, and campaign workflows.",
    longDescription: "Jasper (formerly Jarvis) is one of the most established AI writing tools, purpose-built for marketing teams and content agencies. Its Brand Voice feature ensures every piece of AI-generated content sounds like your brand, while 50+ templates cover everything from Facebook ads to SEO blog posts. Jasper integrates directly with Surfer SEO for real-time optimization.",
    logo: "/images/logos/jasper.svg",
    website: "https://jasper.ai",
    affiliateUrl: "https://jasper.ai", // TODO: Replace with your affiliate link after signup → jasper.ai/affiliates (%25-30 recurring, 12 months)
    category: "ai-writing",
    categories: ["ai-writing", "ai-marketing", "ai-seo"],
    rating: 4.4,
    reviewCount: 1654,
    badge: "trending",
    pricing: {
      starting: "$49",
      hasFree: false,
      tiers: [
        {
          name: "Creator",
          price: "$49",
          period: "/month",
          features: ["1 seat", "Unlimited AI words", "50+ templates", "Browser extension", "Jasper Chat"],
        },
        {
          name: "Pro",
          price: "$69",
          period: "/month",
          features: ["1 seat (+ $49 per additional)", "Brand Voice", "10 Brand personas", "Campaign planner", "SEO integration"],
          highlighted: true,
          badge: "Most Popular",
        },
        {
          name: "Business",
          price: "Custom",
          period: "/month",
          features: ["Custom seats", "Custom brand voices", "API access", "Dedicated support", "SSO"],
        },
      ],
    },
    features: [
      { title: "Brand Voice Training", description: "Train Jasper on your brand guidelines so all content sounds authentically yours." },
      { title: "50+ Templates", description: "Ready-made templates for blog posts, ads, product descriptions, emails, and more." },
      { title: "Surfer SEO Integration", description: "Optimize content for search rankings without leaving Jasper." },
      { title: "Campaign Planner", description: "Plan and produce full marketing campaigns from a single brief." },
      { title: "Team Collaboration", description: "Real-time collaboration with comments, version history, and role management." },
      { title: "AI Image Generation", description: "Create marketing images with Jasper Art powered by Stable Diffusion." },
    ],
    pros: [
      "Best-in-class brand voice training",
      "Purpose-built for marketing teams",
      "Excellent template library for all marketing formats",
      "Native Surfer SEO integration",
      "Reliable and consistent output quality",
      "Strong enterprise features",
    ],
    cons: [
      "Expensive compared to generic AI tools",
      "No free plan — 7-day trial only",
      "Team plans get costly fast",
      "Writing quality not quite as nuanced as Claude",
    ],
    bestFor: [
      "Marketing agencies managing multiple clients",
      "Content teams producing high-volume campaigns",
      "E-commerce brands scaling product descriptions",
      "SaaS companies building content marketing",
      "SEO professionals optimizing at scale",
    ],
    alternatives: ["writesonic", "copy-ai", "claude", "chatgpt"],
    faqs: [
      {
        question: "Is Jasper worth the price?",
        answer: "For marketing teams producing high-volume content, yes. The Brand Voice and campaign planning features justify the cost. Solo bloggers may find Claude or Writesonic more cost-effective.",
      },
      {
        question: "Does Jasper have plagiarism detection?",
        answer: "Jasper doesn't include built-in plagiarism detection, but it integrates with Copyscape. All AI-generated content is original.",
      },
    ],
    lastUpdated: "2026-05-01",
  },
  {
    name: "Writesonic",
    slug: "writesonic",
    trending: true,
    tagline: "Affordable AI writing & SEO tool with built-in Chatsonic",
    description: "Writesonic combines AI writing, image generation, and real-time web search in one affordable platform with a generous free tier.",
    longDescription: "Writesonic is one of the best value AI writing tools available, offering a powerful combination of AI article writing, Chatsonic (ChatGPT with web access), AI image generation, and dedicated SEO writing tools — all at a significantly lower price than competitors like Jasper. Its Botsonic feature lets you build custom AI chatbots for your website.",
    logo: "/images/logos/writesonic.svg",
    website: "https://writesonic.com",
    affiliateUrl: "https://writesonic.com", // TODO: Replace with your affiliate link after signup → affiliates.writesonic.com (%30 recurring, lifetime)
    category: "ai-writing",
    categories: ["ai-writing", "ai-seo", "ai-marketing"],
    rating: 4.3,
    reviewCount: 1102,
    badge: "best-value",
    pricing: {
      starting: "Free",
      hasFree: true,
      tiers: [
        {
          name: "Free",
          price: "$0",
          period: "/month",
          features: ["10,000 words/month", "Chatsonic access", "25+ languages", "Basic templates"],
        },
        {
          name: "Individual",
          price: "$20",
          period: "/month",
          features: ["Unlimited words (GPT-3.5)", "100 GPT-4 generations", "SEO checker", "All templates"],
          highlighted: true,
          badge: "Best Value",
        },
        {
          name: "Teams",
          price: "$19",
          period: "/user/month",
          features: ["Unlimited words", "GPT-4 & Claude", "Team workspaces", "Brand voice", "Priority support"],
        },
      ],
    },
    features: [
      { title: "Article Writer 6.0", description: "One-click SEO-optimized long-form articles with citations and web research." },
      { title: "Chatsonic", description: "ChatGPT alternative with real-time web search and image generation." },
      { title: "Botsonic", description: "Build custom AI chatbots trained on your website data." },
      { title: "SEO Checker & Optimizer", description: "Analyze and improve content SEO score without leaving the editor." },
      { title: "100+ AI Templates", description: "Templates for every marketing use case imaginable." },
      { title: "Bulk Content Generation", description: "Generate hundreds of product descriptions or social posts at once." },
    ],
    pros: [
      "Most affordable full-featured AI writing tool",
      "Generous free tier (10,000 words/month)",
      "Built-in web search via Chatsonic",
      "Article Writer 6.0 produces solid SEO content",
      "Botsonic chatbot builder is unique",
      "Good bulk generation capabilities",
    ],
    cons: [
      "Output quality inconsistent vs. Claude/Jasper",
      "Article Writer can be slow on complex topics",
      "UI can feel cluttered with too many features",
      "GPT-4 access limited on cheaper plans",
    ],
    bestFor: [
      "Budget-conscious bloggers and solopreneurs",
      "E-commerce stores needing bulk descriptions",
      "Agencies looking for affordable AI writing",
      "Businesses wanting to add AI chatbots",
      "Marketers testing AI content strategies",
    ],
    alternatives: ["jasper", "copy-ai", "claude", "chatgpt"],
    faqs: [
      {
        question: "Is Writesonic better than Jasper?",
        answer: "Writesonic is significantly cheaper and offers more features on lower plans. Jasper has better brand voice training and is more suited to enterprise teams. For most individuals and small teams, Writesonic offers better value.",
      },
      {
        question: "Can Writesonic write full blog posts?",
        answer: "Yes — the Article Writer 6.0 can produce 1,500—3,000 word SEO-optimized articles with one click, including proper headings, citations, and internal linking suggestions.",
      },
    ],
    lastUpdated: "2026-05-01",
  },
  {
    name: "Zapier",
    slug: "zapier",
    tagline: "The simplest way to connect your apps and automate workflows",
    description: "Zapier is the world's most popular automation tool, connecting 6,000+ apps with a simple trigger-action workflow builder.",
    longDescription: "Zapier has been the de-facto automation tool for small businesses and entrepreneurs since 2011. With 6,000+ app integrations — more than any competitor — Zapier makes it easy to automate repetitive tasks between your favourite tools without any coding. Its AI features help you build Zaps with plain English descriptions.",
    logo: "/images/logos/zapier.svg",
    website: "https://zapier.com",
    affiliateUrl: "https://zapier.com", // TODO: Replace with your affiliate link after signup → zapier.com/l/partners (%15 recurring)
    category: "ai-automation",
    categories: ["ai-automation", "ai-productivity"],
    rating: 4.5,
    reviewCount: 3211,
    badge: "recommended",
    pricing: {
      starting: "Free",
      hasFree: true,
      tiers: [
        {
          name: "Free",
          price: "$0",
          period: "/month",
          features: ["100 tasks/month", "5 Zaps", "2-step Zaps", "15 min intervals"],
        },
        {
          name: "Starter",
          price: "$29.99",
          period: "/month",
          features: ["750 tasks/month", "Unlimited Zaps", "3-step Zaps", "Filters & formatters"],
          highlighted: true,
          badge: "Most Popular",
        },
        {
          name: "Professional",
          price: "$73.50",
          period: "/month",
          features: ["2,000 tasks/month", "Unlimited steps", "Custom logic", "1-min intervals"],
        },
      ],
    },
    features: [
      { title: "6,000+ App Connections", description: "The largest integration library of any automation platform." },
      { title: "AI Zap Builder", description: "Describe your automation in plain English and AI builds it for you." },
      { title: "Paths & Filters", description: "Add conditional logic to route your data differently based on conditions." },
      { title: "Tables & Interfaces", description: "Built-in database and form builder to capture and manage data." },
      { title: "Zap Templates", description: "1,000+ pre-built Zap templates to get started in seconds." },
      { title: "Transfer", description: "Bulk-migrate historical data between apps with Zapier Transfer." },
    ],
    pros: [
      "Most app integrations of any platform (6,000+)",
      "Easiest to use — suitable for complete beginners",
      "Massive template library",
      "Excellent AI Zap builder",
      "Reliable and battle-tested platform",
      "Great documentation and community",
    ],
    cons: [
      "Tasks run out fast on complex multi-step Zaps",
      "Expensive at scale compared to Make.com",
      "Less flexible than Make for complex logic",
      "No native data transformation capabilities",
    ],
    bestFor: [
      "Non-technical users starting with automation",
      "Small businesses connecting common SaaS tools",
      "Bloggers automating social media posting",
      "Freelancers streamlining client workflows",
      "Teams needing reliable simple automations",
    ],
    alternatives: ["make-com", "n8n", "activepieces"],
    faqs: [
      {
        question: "Is Zapier free?",
        answer: "Yes, Zapier has a free plan with 100 tasks/month and 5 Zaps. It's enough for testing but most users need a paid plan for real workflows.",
      },
      {
        question: "What's the difference between Zapier and Make.com?",
        answer: "Zapier is simpler and has more integrations. Make.com is more powerful for complex logic and more affordable at scale. Beginners should start with Zapier; power users should consider Make.com.",
      },
    ],
    lastUpdated: "2026-05-01",
  },
  {
    name: "ElevenLabs",
    slug: "elevenlabs",
    tagline: "The most realistic AI voice generator and text-to-speech platform",
    description: "ElevenLabs is the industry-leading AI voice synthesis platform, delivering ultra-realistic text-to-speech, voice cloning, and multilingual dubbing for creators, developers, and enterprises.",
    longDescription: "ElevenLabs has set the gold standard for AI-generated voice. Whether you need a lifelike narrator for your podcast, a cloned voice for your brand, or multilingual dubbing for your video content, ElevenLabs delivers audio quality that's often indistinguishable from a real human. With its Instant Voice Cloning technology, you can replicate any voice from a short audio sample — and the Projects feature lets you produce full audiobooks or long-form content in one workflow.",
    logo: "/images/logos/elevenlabs.svg",
    website: "https://elevenlabs.io",
    affiliateUrl: "https://try.elevenlabs.io/2n2qt91ne8ak",
    category: "ai-voice",
    categories: ["ai-voice", "ai-video"],
    rating: 4.8,
    reviewCount: 1243,
    badge: "recommended",
    featured: true,
    trending: true,
    pricing: {
      starting: "Free",
      hasFree: true,
      tiers: [
        {
          name: "Free",
          price: "$0",
          period: "/month",
          features: ["10,000 characters/month", "3 custom voices", "Access to all pre-made voices", "Non-commercial use"],
        },
        {
          name: "Starter",
          price: "$5",
          period: "/month",
          features: ["30,000 characters/month", "10 custom voices", "Commercial license", "API access"],
        },
        {
          name: "Creator",
          price: "$22",
          period: "/month",
          features: ["100,000 characters/month", "30 custom voices", "Instant Voice Cloning", "Projects (audiobooks)"],
          highlighted: true,
          badge: "Most Popular",
        },
        {
          name: "Pro",
          price: "$99",
          period: "/month",
          features: ["500,000 characters/month", "160 custom voices", "Professional Voice Cloning", "Dubbing Studio"],
        },
      ],
    },
    features: [
      { title: "Instant Voice Cloning", description: "Clone any voice from as little as 1 minute of audio with near-perfect accuracy." },
      { title: "29+ Languages", description: "Generate natural-sounding speech in 29 languages including Spanish, French, German, Japanese, and more." },
      { title: "Projects (Audiobooks)", description: "Upload an entire manuscript and produce a full audiobook with consistent voice and pacing." },
      { title: "Dubbing Studio", description: "Automatically dub video content into multiple languages while preserving the original speaker's voice characteristics." },
      { title: "Sound Effects Generator", description: "Generate custom sound effects and ambient audio from text prompts." },
      { title: "API & SDK", description: "Integrate ElevenLabs into any app with a clean REST API and official Python, JavaScript, and Unity SDKs." },
    ],
    pros: [
      "Most realistic AI voice quality on the market",
      "Voice cloning from very short samples",
      "Excellent multilingual support (29 languages)",
      "Generous free tier for evaluation",
      "Audiobook and long-form project workflow",
      "Active development — new features monthly",
    ],
    cons: [
      "Character limits can be restrictive on lower plans",
      "Professional Voice Cloning requires Pro plan",
      "Dubbing Studio still has occasional sync issues",
      "Pricing scales up quickly for high-volume usage",
    ],
    bestFor: [
      "Podcasters and YouTubers needing AI voiceovers",
      "Content creators dubbing videos into multiple languages",
      "Authors producing audiobooks without a studio",
      "Developers building voice-enabled applications",
      "Marketers creating audio ads and brand voices",
    ],
    alternatives: ["murf-ai", "descript", "play-ht"],
    faqs: [
      {
        question: "How realistic is ElevenLabs voice cloning?",
        answer: "ElevenLabs Instant Voice Cloning is the most realistic available today — from a 1-minute sample, it captures tone, pace, and subtle vocal characteristics. Professional Voice Cloning (Pro plan) with more training data is virtually indistinguishable from the original speaker.",
      },
      {
        question: "Is ElevenLabs free to use?",
        answer: "Yes. The free plan gives you 10,000 characters per month and 3 custom voices, which is enough for short projects and evaluation. Paid plans start at just $5/month for commercial use.",
      },
      {
        question: "Can I use ElevenLabs for commercial projects?",
        answer: "Yes, but you need a paid plan (Starter at $5/month or above). The free plan is for non-commercial use only. All paid plans include a full commercial license.",
      },
      {
        question: "What languages does ElevenLabs support?",
        answer: "ElevenLabs supports 29 languages including English, Spanish, French, German, Italian, Portuguese, Polish, Hindi, Japanese, Chinese, Korean, Arabic, and more.",
      },
    ],
    lastUpdated: "2026-05-01",
  },
  {
    name: "Midjourney",
    slug: "midjourney",
    tagline: "The world's most popular AI image generator for stunning visuals",
    description: "Midjourney is the leading AI art and image generation platform, producing breathtaking, photorealistic, and artistic images from simple text prompts.",
    longDescription: "Midjourney has become synonymous with AI art. Its ability to produce strikingly beautiful, highly artistic images from plain English prompts has made it the tool of choice for designers, marketers, content creators, and artists worldwide. Unlike other AI image generators, Midjourney has a distinct aesthetic quality — a painterly, cinematic style that feels genuinely artistic rather than purely computational.",
    logo: "/images/logos/midjourney.svg",
    website: "https://midjourney.com",
    affiliateUrl: "https://midjourney.com",
    category: "ai-video",
    categories: ["ai-video", "ai-marketing"],
    rating: 4.7,
    reviewCount: 2341,
    badge: "recommended",
    featured: true,
    trending: true,
    pricing: {
      starting: "$10/month",
      hasFree: false,
      tiers: [
        {
          name: "Basic",
          price: "$10",
          period: "/month",
          features: ["~200 image generations/month", "General commercial terms", "Access to member gallery", "3 concurrent fast jobs"],
        },
        {
          name: "Standard",
          price: "$30",
          period: "/month",
          features: ["15 fast GPU hours/month", "Unlimited relaxed generations", "General commercial terms", "Stealth mode"],
          highlighted: true,
          badge: "Most Popular",
        },
        {
          name: "Pro",
          price: "$60",
          period: "/month",
          features: ["30 fast GPU hours/month", "Stealth image generation", "Maximum concurrent jobs", "Priority queue"],
        },
      ],
    },
    features: [
      { title: "Photorealistic Image Generation", description: "Generate stunningly realistic photos, portraits, and scenes from text prompts." },
      { title: "Artistic Styles", description: "Create images in any artistic style — oil painting, watercolour, anime, concept art, and more." },
      { title: "Upscaling", description: "Upscale generated images to high resolution for print and professional use." },
      { title: "Variations", description: "Generate multiple variations of any image to explore different creative directions." },
      { title: "Inpainting & Outpainting", description: "Edit specific parts of images or extend them beyond their original borders." },
      { title: "Style Reference", description: "Use existing images as style references to maintain visual consistency across projects." },
    ],
    pros: [
      "Best image quality and artistic style of any AI image generator",
      "Massive community with millions of prompt examples to learn from",
      "Fast generation — results in under a minute",
      "Excellent for concept art, marketing visuals, and editorial images",
      "Regular model updates with improving quality",
    ],
    cons: [
      "No free tier — paid subscription required",
      "Discord-based interface can be confusing for beginners",
      "Limited image editing and inpainting compared to Stable Diffusion",
      "Cannot generate accurate text within images",
    ],
    bestFor: [
      "Graphic designers needing inspiration and concept art",
      "Marketers creating social media visuals at scale",
      "Content creators needing blog and article images",
      "Game developers and concept artists",
      "Anyone needing high-quality visuals without a photographer",
    ],
    alternatives: ["chatgpt", "canva-ai"],
    faqs: [
      {
        question: "Is Midjourney the best AI image generator?",
        answer: "For artistic quality and aesthetic appeal, Midjourney is widely considered the best. For more control and editing capabilities, Stable Diffusion or Adobe Firefly may be preferable. For casual use and integration with other tools, DALL-E 3 (via ChatGPT) is convenient.",
      },
      {
        question: "Does Midjourney have a free trial?",
        answer: "Midjourney no longer offers a free trial as of 2024. The Basic plan at $10/month is the entry point. Given the image quality, most users find it worthwhile for even occasional use.",
      },
      {
        question: "Can I use Midjourney images commercially?",
        answer: "Yes. All paid plans include general commercial use rights. You can use Midjourney-generated images in marketing materials, websites, products, and publications.",
      },
    ],
    lastUpdated: "2026-05-01",
  },
  {
    name: "Notion AI",
    slug: "notion-ai",
    tagline: "AI-powered workspace for notes, docs, projects, and knowledge management",
    description: "Notion AI brings artificial intelligence directly into your workspace — summarising notes, drafting content, answering questions from your documents, and automating repetitive writing tasks.",
    longDescription: "Notion has always been the most versatile workspace tool — equal parts note-taking app, project manager, wiki, and database. Notion AI supercharges every part of it. Ask it to summarise a meeting note, draft a project brief from bullet points, translate content, or answer questions based on your entire knowledge base. The AI is baked directly into the editor rather than bolted on, which makes it feel genuinely integrated rather than a gimmick.",
    logo: "/images/logos/notion-ai.svg",
    website: "https://notion.so",
    affiliateUrl: "https://notion.so",
    category: "ai-productivity",
    categories: ["ai-productivity", "ai-writing"],
    rating: 4.5,
    reviewCount: 1876,
    badge: "best-value",
    featured: true,
    pricing: {
      starting: "Free",
      hasFree: true,
      tiers: [
        {
          name: "Free",
          price: "$0",
          period: "/month",
          features: ["Unlimited pages and blocks", "Basic AI features", "7-day page history", "Up to 10 guests"],
        },
        {
          name: "Plus",
          price: "$10",
          period: "/month",
          features: ["Unlimited guests", "30-day page history", "Full AI add-on available", "Unlimited file uploads"],
          highlighted: true,
          badge: "Best Value",
        },
        {
          name: "AI Add-on",
          price: "+$8",
          period: "/month/member",
          features: ["Unlimited AI responses", "AI across all pages and databases", "Q&A from your knowledge base", "AI autofill for databases"],
        },
      ],
    },
    features: [
      { title: "AI Writing Assistant", description: "Draft, edit, summarise, and translate content directly in your Notion pages." },
      { title: "Q&A from Your Knowledge Base", description: "Ask questions and get answers sourced from your entire Notion workspace." },
      { title: "Meeting Notes Summariser", description: "Paste meeting transcripts and get structured summaries with action items." },
      { title: "AI Database Autofill", description: "Automatically fill database properties using AI based on page content." },
      { title: "Document Generation", description: "Turn bullet points and rough notes into polished documents in seconds." },
      { title: "Multi-language Support", description: "Translate pages into 100+ languages while maintaining formatting." },
    ],
    pros: [
      "AI is deeply integrated — not bolted on",
      "Q&A feature across your whole knowledge base is genuinely powerful",
      "Generous free tier for individual users",
      "Excellent for teams already using Notion",
      "Regular AI feature updates",
    ],
    cons: [
      "AI add-on is an extra $8/member/month on top of base plan",
      "Not a standalone AI tool — requires Notion adoption",
      "Can be slow with very large workspaces",
      "Less powerful for pure creative writing vs Claude or Jasper",
    ],
    bestFor: [
      "Teams already using Notion for project management",
      "Founders building their company wiki",
      "Students managing research and study notes",
      "Content teams managing editorial calendars",
      "Consultants documenting client work",
    ],
    alternatives: ["claude", "chatgpt", "jasper"],
    faqs: [
      {
        question: "Is Notion AI worth it?",
        answer: "If your team already uses Notion, the AI add-on at $8/member/month is excellent value. The Q&A feature alone — being able to ask questions across your entire company knowledge base — is transformative for larger teams.",
      },
      {
        question: "How does Notion AI compare to ChatGPT?",
        answer: "Notion AI excels at working with content already in your workspace — summarising pages, answering questions from your docs, and filling in databases. ChatGPT is better for general-purpose writing and tasks outside your existing documents.",
      },
    ],
    lastUpdated: "2026-05-01",
  },
  {
    name: "Grammarly",
    slug: "grammarly",
    tagline: "AI writing assistant for grammar, clarity, tone, and style",
    description: "Grammarly is the world's most widely used AI writing assistant, helping over 30 million people write more clearly, correctly, and confidently across every platform they use.",
    longDescription: "Grammarly has evolved from a simple grammar checker into a comprehensive AI writing assistant. In 2026, Grammarly GrammarlyGO — its generative AI feature — can draft emails, rewrite sentences for tone and clarity, and even generate full documents. But Grammarly's core strength remains what it's always been: making sure everything you write is error-free, clear, and appropriate for your audience.",
    logo: "/images/logos/grammarly.svg",
    website: "https://grammarly.com",
    affiliateUrl: "https://grammarly.com",
    category: "ai-writing",
    categories: ["ai-writing", "ai-productivity"],
    rating: 4.4,
    reviewCount: 3124,
    badge: "editor-choice",
    featured: true,
    pricing: {
      starting: "Free",
      hasFree: true,
      tiers: [
        {
          name: "Free",
          price: "$0",
          period: "/month",
          features: ["Grammar and spelling checks", "Basic writing suggestions", "Tone detection", "Browser extension"],
        },
        {
          name: "Premium",
          price: "$12",
          period: "/month",
          features: ["Advanced grammar checks", "Clarity rewrites", "Full-sentence rewrites", "GrammarlyGO (generative AI)", "Plagiarism detection"],
          highlighted: true,
          badge: "Most Popular",
        },
        {
          name: "Business",
          price: "$15",
          period: "/member/month",
          features: ["Everything in Premium", "Team style guides", "Brand tone settings", "Analytics dashboard", "Priority support"],
        },
      ],
    },
    features: [
      { title: "Real-Time Grammar and Spell Check", description: "Catch grammar, spelling, and punctuation errors instantly across every app you use." },
      { title: "Clarity Rewrites", description: "Grammarly rewrites unclear sentences to make your writing easier to read." },
      { title: "Tone Detector", description: "See how your writing sounds to readers — confident, friendly, formal, or aggressive." },
      { title: "GrammarlyGO", description: "Generate email replies, rewrite paragraphs, and draft content from prompts using generative AI." },
      { title: "Plagiarism Checker", description: "Check your writing against billions of web pages to ensure originality." },
      { title: "Works Everywhere", description: "Browser extension, desktop app, Google Docs integration, and Microsoft Word add-in." },
    ],
    pros: [
      "Works across every platform — email, Google Docs, Slack, browsers",
      "The most accurate grammar checker available",
      "Tone detection helps match communication style to context",
      "Generous free tier for basic use",
      "Excellent for non-native English speakers",
    ],
    cons: [
      "Premium price ($12/mo) is steep for what is primarily a grammar tool",
      "GrammarlyGO generative AI lags behind Claude and ChatGPT for content creation",
      "Can be overly aggressive with style suggestions",
      "Privacy concerns for some enterprise users",
    ],
    bestFor: [
      "Non-native English speakers wanting error-free writing",
      "Professionals writing important emails and reports",
      "Students checking essays for grammar and clarity",
      "Content teams enforcing brand writing guidelines",
      "Anyone who writes a lot and wants a safety net",
    ],
    alternatives: ["claude", "chatgpt", "writesonic"],
    faqs: [
      {
        question: "Is Grammarly free worth using?",
        answer: "Yes — Grammarly's free tier is genuinely useful for catching basic grammar and spelling errors. It's the best free grammar checker available. The Premium upgrade is worth it if you write professionally or frequently.",
      },
      {
        question: "Is Grammarly better than Microsoft Editor?",
        answer: "Grammarly is more accurate, works across more platforms, and has more advanced features. Microsoft Editor is free with Microsoft 365 and adequate for basic use, but Grammarly Premium is significantly better for professional writing.",
      },
    ],
    lastUpdated: "2026-05-01",
  },
  {
    name: "Canva AI",
    slug: "canva-ai",
    tagline: "AI-powered design platform for creating stunning visuals without design skills",
    description: "Canva's AI features bring professional graphic design capabilities to everyone — from Magic Design that creates layouts from your content, to AI image generation, background removal, and text-to-presentation generation.",
    longDescription: "Canva has always made design accessible to non-designers. In 2026, its AI features have taken that accessibility to a new level. Magic Design creates an entire presentation or social media campaign from a single text prompt. Magic Eraser removes unwanted objects from photos. Magic Write drafts copy for your designs. And the AI image generator produces custom visuals you can drop directly into your designs. For marketers, solopreneurs, and small businesses that can't afford a design team, Canva AI is transformative.",
    logo: "/images/logos/canva-ai.svg",
    website: "https://canva.com",
    affiliateUrl: "https://canva.com",
    category: "ai-marketing",
    categories: ["ai-marketing", "ai-video", "ai-writing"],
    rating: 4.6,
    reviewCount: 4521,
    badge: "recommended",
    featured: true,
    trending: true,
    pricing: {
      starting: "Free",
      hasFree: true,
      tiers: [
        {
          name: "Free",
          price: "$0",
          period: "/month",
          features: ["250,000+ templates", "Basic AI features", "5GB cloud storage", "Background remover (limited)"],
        },
        {
          name: "Pro",
          price: "$15",
          period: "/month",
          features: ["All AI features (Magic Design, Magic Write, Magic Eraser)", "100GB storage", "Brand Kit", "1,000 AI image generations/month", "Schedule social media posts"],
          highlighted: true,
          badge: "Best Value",
        },
        {
          name: "Teams",
          price: "$10",
          period: "/person/month",
          features: ["Everything in Pro", "Team collaboration", "Brand controls", "Custom templates", "Admin tools"],
        },
      ],
    },
    features: [
      { title: "Magic Design", description: "Generate complete presentation decks, social media campaigns, and designs from a text prompt." },
      { title: "AI Image Generator", description: "Create custom images in any style directly within your designs — no separate tool needed." },
      { title: "Magic Eraser", description: "Remove unwanted objects, people, or text from any photo with one click." },
      { title: "Background Remover", description: "Instantly remove backgrounds from product photos and portraits." },
      { title: "Magic Write", description: "Generate copy, headlines, and captions for your designs using AI." },
      { title: "Text to Video", description: "Turn scripts and prompts into short animated videos for social media." },
    ],
    pros: [
      "The most accessible design tool available — no skills required",
      "Huge template library covers every use case",
      "AI features are seamlessly integrated into the design workflow",
      "Generous free tier with basic AI access",
      "Social media scheduling included in Pro",
    ],
    cons: [
      "AI image generation quality lags behind Midjourney",
      "Not suitable for complex professional design work",
      "Pro plan required for full AI feature access",
      "Designs can look generic without customisation",
    ],
    bestFor: [
      "Small business owners creating their own marketing materials",
      "Social media managers producing content at scale",
      "Bloggers and content creators needing article images",
      "Solopreneurs building a personal brand",
      "Non-designers in marketing teams",
    ],
    alternatives: ["midjourney", "jasper", "writesonic"],
    faqs: [
      {
        question: "Is Canva AI free?",
        answer: "Basic AI features including limited background removal and basic Magic Write are available on the free plan. Full AI capabilities — Magic Design, unlimited AI image generation, Magic Eraser — require Canva Pro at $15/month.",
      },
      {
        question: "Can Canva AI replace a graphic designer?",
        answer: "For standard marketing materials, social media graphics, presentations, and simple brand assets, Canva AI can significantly reduce reliance on a designer. For complex brand work, packaging, or highly custom design, a professional designer is still essential.",
      },
    ],
    lastUpdated: "2026-05-01",
  },
  {
    name: "Perplexity AI",
    slug: "perplexity",
    featured: true,
    tagline: "The AI-powered answer engine with real-time web search",
    description: "Perplexity is a conversational AI search engine that provides cited, up-to-date answers from the web in real time.",
    longDescription: "Perplexity AI is redefining search by combining the power of large language models with real-time web search and citation. Unlike traditional search engines, Perplexity gives you direct, synthesized answers with sources you can verify — making it indispensable for research, fact-checking, and staying current.",
    logo: "/images/logos/perplexity.svg",
    website: "https://perplexity.ai",
    affiliateUrl: "https://perplexity.ai", // TODO: Replace with your affiliate link after signup → partners.dub.co/perplexity ($10 flat + %10 recurring)
    category: "ai-productivity",
    categories: ["ai-productivity", "ai-seo"],
    rating: 4.6,
    reviewCount: 876,
    badge: "new",
    pricing: {
      starting: "Free",
      hasFree: true,
      tiers: [
        {
          name: "Free",
          price: "$0",
          period: "/month",
          features: ["Unlimited searches", "5 Pro searches/day", "Basic AI answers", "File uploads (limited)"],
        },
        {
          name: "Pro",
          price: "$20",
          period: "/month",
          features: ["600 Pro searches/day", "GPT-4o, Claude, Gemini", "Unlimited file analysis", "API access"],
          highlighted: true,
          badge: "Best Value",
        },
      ],
    },
    features: [
      { title: "Real-Time Web Search", description: "Every answer is backed by live web sources, always up to date." },
      { title: "Multi-Model Support", description: "Choose between GPT-4o, Claude 3, Gemini, and Perplexity's own models." },
      { title: "Cited Sources", description: "Every claim is backed by a numbered source you can click and verify." },
      { title: "Deep Research Mode", description: "Multi-step research agent that browses dozens of sources and synthesizes findings." },
      { title: "Spaces (Collections)", description: "Organize research into shareable spaces for teams or projects." },
      { title: "File & Image Analysis", description: "Upload documents or images and ask questions about them." },
    ],
    pros: [
      "Best AI tool for real-time research",
      "All answers include verifiable citations",
      "Choice of underlying AI model",
      "Deep Research mode is extremely powerful",
      "Generous free tier",
      "Fast and clean interface",
    ],
    cons: [
      "Not ideal for creative writing tasks",
      "Pro search limit (600/day) can be restrictive",
      "Spaces feature still maturing",
    ],
    bestFor: [
      "Researchers and academics",
      "Journalists fact-checking stories",
      "Affiliate marketers researching niches",
      "Students doing homework and reports",
      "Professionals staying current on industry news",
    ],
    alternatives: ["chatgpt", "claude", "gemini"],
    faqs: [
      {
        question: "Is Perplexity better than Google?",
        answer: "Perplexity is better for research and fact-checking because it provides cited, real-time answers. Google is better for local search, shopping, and navigating to specific websites. For research tasks, Perplexity wins hands down.",
      },
      {
        question: "Is Perplexity AI free?",
        answer: "Yes, Perplexity has a generous free tier with unlimited searches and 5 Pro searches per day. The Pro plan at $20/month unlocks 600 Pro searches daily and access to GPT-4o and Claude.",
      },
    ],
    lastUpdated: "2026-05-01",
  },
];

export function getToolBySlug(slug: string) {
  return tools.find((t) => t.slug === slug);
}

export const allTools = tools;

export function getToolsByCategory(categorySlug: string): Tool[] {
  return tools.filter((t) => (t.categories ?? [t.category]).includes(categorySlug));
}

export function getFeaturedTools(limit = 6): Tool[] {
  const featured = tools.filter((t) => t.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  // Fill remaining slots with highest-rated tools not already in featured
  const featuredSlugs = new Set(featured.map((t) => t.slug));
  const extras = [...tools]
    .filter((t) => !featuredSlugs.has(t.slug))
    .sort((a, b) => b.rating - a.rating);
  return [...featured, ...extras].slice(0, limit);
}

export function getTrendingTools(limit = 6): Tool[] {
  return tools.filter((t) => t.trending || t.badge === "trending")
    .concat(tools.filter((t) => !t.trending && t.badge !== "trending"))
    .slice(0, limit);
}
