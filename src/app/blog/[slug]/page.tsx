import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { allBlogPosts, getBlogPostBySlug } from "@/data/blog";
import { getAuthorBySlug } from "@/data/authors";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AffiliateDisclosure } from "@/components/common/AffiliateDisclosure";
import { AffiliateLink } from "@/components/common/AffiliateLink";
import { getToolBySlug } from "@/data/tools";
import { ExternalLink } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/schema";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return allBlogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    image: post.heroImage,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    keywords: post.tags,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();
  const author = getAuthorBySlug(post.authorSlug);
  const relatedTools = post.relatedToolSlugs.map(getToolBySlug).filter((tool) => tool !== undefined);
  const relatedPosts = allBlogPosts
    .filter((candidate) => candidate.slug !== post.slug && (
      (post.clusterSlug && candidate.clusterSlug === post.clusterSlug) ||
      candidate.relatedToolSlugs.some((slug) => post.relatedToolSlugs.includes(slug))
    ))
    .slice(0, 6);

  const schema = buildArticleSchema(post);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "Blog", href: "/blog" },
    { label: post.title, href: `/blog/${post.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="container mx-auto px-4 max-w-4xl py-8">
        <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.title, href: `/blog/${post.slug}` }]} />

        <article className="mt-8">
          <header className="mb-8">
            <span className="inline-block text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full mb-4">{post.category}</span>
            <div className="text-6xl mb-6">{post.emoji}</div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{post.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>

            <div className="flex items-center gap-4 py-4 border-y border-border">
              {author && (
                <Image src={author.avatar} alt={author.name} width={48} height={48} className="w-12 h-12 rounded-full" />
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

          {relatedPosts.length > 0 && (
            <section className="mt-10 border-t border-border pt-8" aria-labelledby="related-guides">
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Continue researching</p>
              <h2 id="related-guides" className="text-2xl font-bold mb-5">Related guides and comparisons</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedPosts.map((related) => (
                  <Link key={related.slug} href={`/blog/${related.slug}`} className="group rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors">
                    <span className="text-xs font-medium text-primary">{related.category}</span>
                    <h3 className="font-bold mt-1 mb-2 group-hover:text-primary transition-colors">{related.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{related.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {relatedTools.length > 0 && (
            <section className="mt-10 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-purple-500/5 p-6 not-prose">
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Recommended tools</p>
              <h2 className="text-2xl font-bold mb-2">Put this guide into action</h2>
              <p className="text-sm text-muted-foreground mb-5">Compare the tools mentioned in this guide and check their latest plans before choosing.</p>
              <AffiliateDisclosure compact className="mb-5" />
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedTools.map((tool) => (
                  <div key={tool.slug} className="rounded-xl border border-border bg-background p-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-bold">{tool.name}</h3>
                        <p className="text-xs text-muted-foreground">{tool.pricing?.starting ?? tool.startingPrice ?? "See current pricing"}</p>
                      </div>
                      <span className="text-sm font-bold text-primary">{tool.rating}/5</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{tool.quickVerdict ?? tool.description}</p>
                    <div className="flex gap-2">
                      <Link href={`/reviews/${tool.slug}`} className="flex-1 rounded-lg border border-border px-3 py-2 text-center text-sm font-medium hover:border-primary/50">Read review</Link>
                      <AffiliateLink href={tool.affiliateUrl} toolName={tool.name} placement={`blog_${post.slug}`} className="flex-1 rounded-lg bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground hover:opacity-90">
                        {tool.pricing?.hasFree ? "Try free" : "Visit site"} <ExternalLink className="inline-block ml-1 h-3.5 w-3.5" />
                      </AffiliateLink>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {author && (
            <div className="mt-12 bg-card border border-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">About the Author</h3>
              <div className="flex gap-4">
                <Image src={author.avatar} alt={author.name} width={64} height={64} className="w-16 h-16 rounded-full flex-shrink-0" />
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
