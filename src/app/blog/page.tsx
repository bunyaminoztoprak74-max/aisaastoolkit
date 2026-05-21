import Link from "next/link";
import { Metadata } from "next";
import { allBlogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "AI Tools Blog — Tips, Reviews & Guides | AISaaSToolkit",
  description: "Expert guides, how-tos, and insights about AI tools and SaaS automation. Updated weekly by our team of AI researchers.",
  alternates: { canonical: "https://aisaastoolkit.com/blog" },
};

export default function BlogPage() {
  const posts = allBlogPosts;
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium px-3 py-1 rounded-full mb-4">
              AI Tools Blog
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Expert Insights on AI Tools
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Practical guides, honest comparisons, and real-world tests from our AI research team.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl py-12">
        {featured && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-muted-foreground mb-6 uppercase tracking-wide">Featured</h2>
            <Link href={`/blog/${featured.slug}`} className="group block bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-12 flex items-center justify-center">
                  <span className="text-8xl">{featured.emoji}</span>
                </div>
                <div className="p-8 md:p-12">
                  <div className="flex gap-2 mb-4">
                    <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">{featured.category}</span>
                    <span className="text-xs text-muted-foreground">{featured.readTime}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{featured.title}</h3>
                  <p className="text-muted-foreground mb-6">{featured.excerpt}</p>
                  <div className="flex items-center gap-3">
                    <img src={featured.authorAvatar} alt={featured.authorName} className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{featured.authorName}</p>
                      <p className="text-xs text-muted-foreground">{featured.publishedAt}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold text-muted-foreground mb-6 uppercase tracking-wide">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 p-8 flex items-center justify-center">
                  <span className="text-5xl">{post.emoji}</span>
                </div>
                <div className="p-5">
                  <div className="flex gap-2 mb-3">
                    <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">{post.category}</span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-2">
                    <img src={post.authorAvatar} alt={post.authorName} className="w-6 h-6 rounded-full" />
                    <span className="text-xs text-muted-foreground">{post.authorName} · {post.publishedAt}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
