import type { Metadata } from "next";

const SITE_URL  = "https://aisaastoolkit.com";
const SITE_NAME = "AISaaSToolkit";

interface MetaOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
}

export function buildMetadata(opts: MetaOptions): Metadata {
  const url    = `${SITE_URL}${opts.path}`;
  const image  = opts.image ?? "/og-image.png";
  const ogType = opts.type ?? "website";

  return {
    title:       { absolute: `${opts.title} | ${SITE_NAME}` },
    description: opts.description,
    keywords:    opts.keywords,
    alternates:  { canonical: url },
    openGraph: {
      type:      ogType as "website",
      url,
      siteName:  SITE_NAME,
      title:     opts.title,
      description: opts.description,
      images:    [{ url: image, width: 1200, height: 630, alt: opts.title }],
      ...(ogType === "article" && {
        publishedTime: opts.publishedTime,
        modifiedTime:  opts.modifiedTime,
      }),
    },
    twitter: {
      card:        "summary_large_image",
      title:       opts.title,
      description: opts.description,
      images:      [image],
      creator:     "@aisaastoolkit",
    },
    robots: { index: true, follow: true },
  };
}

/** Generate keyword variants for a tool review page */
export function buildToolKeywords(toolName: string, category: string): string[] {
  return [
    `${toolName} review`,
    `${toolName} pricing`,
    `${toolName} features`,
    `is ${toolName} worth it`,
    `${toolName} alternatives`,
    `best ${category.replace(/-/g, " ")} tools`,
    `${toolName} 2026`,
    `${toolName} pros and cons`,
  ];
}

/** Generate keyword variants for a comparison page */
export function buildComparisonKeywords(tool1: string, tool2: string): string[] {
  return [
    `${tool1} vs ${tool2}`,
    `${tool2} vs ${tool1}`,
    `${tool1} or ${tool2}`,
    `${tool1} alternative to ${tool2}`,
    `compare ${tool1} and ${tool2}`,
    `${tool1} vs ${tool2} 2026`,
    `best between ${tool1} and ${tool2}`,
  ];
}

/** Generate keyword variants for a tag page */
export function buildTagKeywords(tagLabel: string): string[] {
  return [
    `AI tools with ${tagLabel.toLowerCase()}`,
    `best AI ${tagLabel.toLowerCase()}`,
    `${tagLabel.toLowerCase()} AI software`,
    `${tagLabel.toLowerCase()} tools 2026`,
  ];
}
