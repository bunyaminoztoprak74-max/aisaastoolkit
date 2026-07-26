import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { bestLists } from "@/data/bestLists";

export const metadata: Metadata = {
  title: "Best AI Tools by Category — 2026 Guides | AISaaSToolkit",
  description:
    "Every AISaaSToolkit \"best of\" guide in one place — hand-tested rankings of the top AI automation, writing, video, SEO, and productivity tools for 2026.",
  alternates: { canonical: "https://aisaastoolkit.com/best" },
};

export default function BestListsIndexPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium px-3 py-1 rounded-full mb-4">
              Best-Of Guides
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Best AI Tools, By Category
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hand-tested, expert-ranked shortlists — pick the category that matches what you're
              trying to get done.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestLists.map((list) => (
            <Link
              key={list.slug}
              href={`/best/${list.slug}`}
              className="group block bg-card rounded-xl border border-border p-6 hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                {list.category}
              </span>
              <h2 className="font-bold text-lg text-foreground mt-3 mb-2 group-hover:text-primary transition-colors leading-snug">
                {list.title}
              </h2>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{list.intro}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                View ranking <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
