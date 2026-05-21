import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { allBlogPosts, getBlogPostBySlug } from "@/data/blog";
import { getAuthorBySlug } from "@/data/authors";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return allBlogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `https://aisaastoolkit.com/blog/${post.slug}` },
    openGraph: { title: post.metaTitle, description: post.metaDescription, type: "article" },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();
  const author = getAuthorBySlug(post.authorSlug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    author: { "@type": "Person", name: post.authorName },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    publisher: { "@type": "Organization", name: "AISaaSToolkit", url: "https://aisaastoolkit.com" },
  };

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="container mx-auto px-4 max-w-4xl py-8">
        <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

        <article className="mt-8">
          <header className="mb-8">
            <span className="inline-block text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full mb-4">{post.category}</span>
            <div className="text-6xl mb-6">{post.emoji}</div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{post.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>

            <div className="flex items-center gap-4 py-4 border-y border-border">
              {author && (
                <img src={author.avatar} alt={author.name} className="w-12 h-12 rounded-full" />
              )}
              <div>
                <p className="font-semibold text-foreground">{post.authorName}</p>
                <p className="text-sm text-muted-foreground">{post.publishedAt} · {post.readTime}</p>
              </div>
              <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
                <span>Last updated: {post.updatedAt}</span>
              </div>
            </div>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
                  <p className="text-blue-800 dark:text-blue-200 font-medium">Full article coming soon</p>
                  <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">This article is being written by {post.authorName}. Check back soon.</p>
                </div>
              </>
            )}
          </div>

          {author && (
            <div className="mt-12 bg-card border border-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">About the Author</h3>
              <div className="flex gap-4">
                <img src={author.avatar} alt={author.name} className="w-16 h-16 rounded-full flex-shrink-0" />
                <div>
                  <p className="font-bold text-foreground">{author.name}</p>
                  <p className="text-sm text-muted-foreground mb-2">{author.title}</p>
                  <p className="text-sm text-foreground">{author.shortBio}</p>
                  <div className="flex gap-3 mt-3">
                    {author.twitter && <Link href={author.twitter} className="text-xs text-blue-600 hover:underline">Twitter</Link>}
                    {author.linkedin && <Link href={author.linkedin} className="text-xs text-blue-600 hover:underline">LinkedIn</Link>}
                  </div>
                </div>
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
