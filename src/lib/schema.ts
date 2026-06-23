import type { Tool } from "@/data/tools";
import type { Comparison } from "@/data/comparisons";
import type { BestList } from "@/data/bestLists";
import type { BlogPost } from "@/data/blog";
import type { Author } from "@/data/authors";
import { getAuthorBySlug } from "@/data/authors";

const SITE_URL = "https://aisaastoolkit.com";
const SITE_NAME = "AISaaSToolkit";

/** Software application with AggregateRating + Offer */
export function buildSoftwareSchema(tool: Tool) {
  const tiers = tool.pricing?.tiers ?? tool.pricingTiers ?? [];
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    url: tool.website,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: tiers.map((tier) => ({
      "@type": "Offer",
      name: tier.name,
      price: tier.price.replace(/[^0-9.]/g, "") || "0",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        billingDuration: "P1M",
      },
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tool.rating.toFixed(1),
      reviewCount: tool.reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
    description: tool.description,
    featureList: (tool.features ?? []).map((f) => f.title).join(", "),
  };
}

/** Review schema for review pages */
export function buildReviewSchema(tool: Tool, authorSlugOverride?: string) {
  const authorSlug = authorSlugOverride ?? tool.authorSlug;
  const author = authorSlug ? getAuthorBySlug(authorSlug) : null;
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    name: `${tool.name} Review`,
    reviewBody: tool.longDescription ?? tool.description,
    reviewRating: {
      "@type": "Rating",
      ratingValue: tool.rating.toFixed(1),
      bestRating: "5",
      worstRating: "1",
    },
    author: author ? {
      "@type": "Person",
      name: author.name,
      url: `${SITE_URL}/author/${author.slug}`,
      sameAs: [author.twitter, author.linkedin].filter(Boolean),
    } : {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    itemReviewed: buildSoftwareSchema(tool),
    datePublished: tool.lastUpdated,
    dateModified: tool.lastUpdated,
  };
}

/** FAQ schema */
export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** BreadcrumbList schema */
export function buildBreadcrumbSchema(items: { label: string; href?: string }[]) {
  const allItems = [{ label: "Home", href: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `${SITE_URL}${crumb.href ?? ""}`,
    })),
  };
}

/** ItemList schema for best-of pages */
export function buildItemListSchema(list: BestList, toolNames: { name: string; slug: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: list.title,
    description: list.metaDescription,
    url: `${SITE_URL}/best/${list.slug}`,
    numberOfItems: toolNames.length,
    itemListElement: toolNames.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/reviews/${t.slug}`,
        url: `${SITE_URL}/reviews/${t.slug}`,
        name: t.name,
      },
    })),
  };
}

/** Comparison page schema */
export function buildComparisonSchema(comp: Comparison, tool1Name: string, tool2Name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/compare/${comp.slug}`,
    headline: comp.title,
    description: comp.metaDescription,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    datePublished: comp.lastUpdated,
    dateModified: comp.lastUpdated,
    about: [
      { "@type": "SoftwareApplication", name: tool1Name },
      { "@type": "SoftwareApplication", name: tool2Name },
    ],
  };
}

/** WebSite + SearchAction schema (goes in root layout) */
export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: "Independent reviews and comparisons of the best AI SaaS tools in 2026",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Article schema for blog posts */
export function buildArticleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    datePublished: (() => { try { return new Date(post.publishedAt).toISOStrin