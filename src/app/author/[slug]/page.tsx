import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { allAuthors, getAuthorBySlug } from "@/data/authors";
import { allTools } from "@/data/tools";
import { allBlogPosts } from "@/data/blog";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return allAuthors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return {};
  return {
    title: `${author.name} — AI Tools Analyst | AISaaSToolkit`,
    description: author.shortBio,
    alternates: { canonical: `https://aisaastoolkit.com/author/${author.slug}` },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const authorTools = allTools.filter(t => t.authorSlug === author.slug);
  const authorPosts = allBlogPosts.filter(p => p.authorSlug === author.slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.title,
    description: author.bio,
    url: `https://aisaastoolkit.com/author/${author.slug}`,
    sameAs: [author.twitter, author.linkedin].filter(Boolean),
  };

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="bg-gradient-to-b from-primary/5 to-background py-16 border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <img src={author.avatar} alt={author.name} className="w-32 h-32 rounded-full border-4 border-border" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">{author.name}</h1>
              <p className="text-lg text-muted-foreground mt-1">{author.title}</p>
              <p className="text-foreground mt-4 leading-relaxed">{author.bio}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {author.expertise.map(e => (
                  <span key={e} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">{e}</span>
                ))}
              </div>
              <div className="flex gap-4 mt-4">
                {author.twitter && <Link href={author.twitter} className="text-sm text-blue-600 hover:underline font-medium">Twitter/X</Link>}
                {author.linkedin && <Link href={author.linkedin} className="text-sm text-blue-600 hover:underline font-medium">LinkedIn</Link>}
              </div>
              <div className="flex gap-6 mt-6 text-sm text-muted-foreground">
                <span><strong className="text-foreground">{author.reviewCount}</strong> reviews</span>
                <span><strong className="text-foreground">{authorPosts.length}</strong> articles</span>
                <span>Member since <strong className="text-foreground">{new Date(author.joinedDate).getFullYear()}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl py-12">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-5 mb-10">
          <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">Testing Methodology</h3>
          <p className="text-sm text-green-700 dark:text-green-300">All reviews by {author.name} involve a minimum 30-day hands-on testing period using paid accounts. No sponsored placements. All opinions are independent.</p>
        </div>

        {authorTools.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Reviews by {author.name}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {authorTools.map(tool => (
                <Link key={tool.slug} href={`/reviews/${tool.slug}`} className="flex gap-4 items-center bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-xl ${tool.logoColor ?? "bg-primary"} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                    {tool.logo}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{tool.name}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">{tool.tagline}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-500 text-xs">★</span>
                      <span className="text-xs font-medium">{tool.rating}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {authorPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Articles by {author.name}</h2>
            <div className="space-y-4">
              {authorPosts.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="flex gap-4 items-start bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
                  <span className="text-3xl">{post.emoji}</span>
                  <div>
                    <p className="font-semibold text-foreground hover:text-primary transition-colors">{post.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{post.excerpt}</p>
                    <p className="text-xs text-muted-foreground mt-2">{post.publishedAt} · {post.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
