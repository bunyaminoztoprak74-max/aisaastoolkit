import type { MetadataRoute } from "next";
import { allTools as tools } from "@/data/tools";
import { allBlogPosts } from "@/data/blog";
import { allAuthors } from "@/data/authors";
import { categories } from "@/data/categories";
import { comparisons } from "@/data/comparisons";
import { bestLists } from "@/data/bestLists";
import { tags } from "@/data/tags";

const BASE_URL = "https://aisaastoolkit.com";
const now      = new Date();

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

function entry(path: string, priority: number, freq: ChangeFreq, date?: string): MetadataRoute.Sitemap[number] {
  return {
    url:             `${BASE_URL}${path}`,
    lastModified:    date ? new Date(date) : now,
    changeFrequency: freq,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Core pages
    entry("/",                    1.0,  "weekly"),
    entry("/tools",               0.95, "weekly"),
    entry("/search",              0.8,  "daily"),
    entry("/tags",                0.8,  "monthly"),
    entry("/about",               0.5,  "monthly"),
    entry("/contact",             0.5,  "monthly"),
    entry("/privacy",             0.3,  "yearly"),
    entry("/terms",               0.3,  "yearly"),
    entry("/affiliate-disclosure",0.3,  "yearly"),
    entry("/editorial-policy",   0.5,  "monthly"),
    entry("/reviews",            0.9,  "weekly"),

    // Tool reviews
    ...tools.map((t) => entry(`/reviews/${t.slug}`, 0.9, "monthly", t.lastUpdated)),

    // Comparisons
    ...comparisons.map((c) => entry(`/compare/${c.slug}`, 0.88, "monthly", c.lastUpdated)),

    // Best-of lists
    ...bestLists.map((l) => entry(`/best/${l.slug}`, 0.85, "monthly", l.lastUpdated)),

    // Category pages
    ...categories.map((c) => entry(`/category/${c.slug}`, 0.8, "weekly")),

    // Tag pages
    ...tags.map((t) => entry(`/tag/${t.slug}`, 0.7, "monthly")),

    // Blog
    entry("/blog",        0.8, "weekly"),
    entry("/deals",       0.7, "weekly"),
    entry("/methodology", 0.6, "monthly"),

    // Blog posts
    ...allBlogPosts.map((p) => entry(`/blog/${p.slug}`, 0.75, "monthly", p.updatedAt)),

    // Author pages
    ...allAuthors.map((a) => entry(`/author/${a.slug}`, 0.6, "monthly")),

    // Alternatives pages
    ...tools.map((t) => entry(`/alternatives/${t.slug}`, 0.7, "monthly", t.lastUpdated)),

    // Pricing pages
    ...tools.map((t) => entry(`/pricing/${t.slug}`, 0.75, "monthly", t.lastUpdated)),
  ];
}
