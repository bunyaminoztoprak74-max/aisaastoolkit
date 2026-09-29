import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { allAuthors } from "@/data/authors";

export const metadata: Metadata = {
  title: "How We Test & Review AI Tools — Our Methodology | AISaaSToolkit",
  description: "Learn exactly how AISaaSToolkit tests and scores AI tools. Our independent methodology, scoring rubric, and editorial standards.",
  alternates: { canonical: "https://aisaastoolkit.com/methodology" },
};

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">How We Review AI Tools</h1>
          <p className="text-xl text-muted-foreground">Transparent research, practical comparisons, and clearly disclosed commercial links.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl py-12">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-2">Our Core Promise</h2>
          <ul className="text-blue-700 dark:text-blue-300 space-y-1 text-sm">
            <li>✓ We never accept payment to rank a tool higher than it deserves</li>
            <li>✓ We distinguish hands-on experience from documentation-based research</li>
            <li>✓ We evaluate tools against practical business use cases</li>
            <li>✓ We disclose all affiliate relationships transparently</li>
            <li>✓ Scores are updated when tools significantly change</li>
          </ul>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>Our Testing Process</h2>
          <h3>1. Evidence Collection</h3>
          <p>We begin with current product documentation, pricing pages, plan limits, release notes, and credible independent sources. Affiliate status is recorded separately from editorial assessment.</p>

          <h3>2. Practical Evaluation</h3>
          <p>When we have hands-on access, we evaluate the tool in representative workflows and identify those observations in the review. When hands-on access is unavailable, the review is presented as researched comparison rather than a claimed long-term test.</p>

          <h3>3. Six-Dimension Scoring Rubric</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          {[
            { name: "Ease of Use", weight: "20%", desc: "Onboarding, UI clarity, learning curve" },
            { name: "Feature Set", weight: "25%", desc: "Breadth and quality of features vs. competitors" },
            { name: "Output Quality", weight: "25%", desc: "Quality of AI-generated results on real tasks" },
            { name: "Value for Money", weight: "15%", desc: "Price relative to output quality and features" },
            { name: "Reliability", weight: "10%", desc: "Uptime, speed, consistency across sessions" },
            { name: "Support", weight: "5%", desc: "Quality of documentation, support team, community" },
          ].map(dim => (
            <div key={dim.name} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-foreground">{dim.name}</p>
                <span className="text-sm font-bold text-primary">{dim.weight}</span>
              </div>
              <p className="text-sm text-muted-foreground">{dim.desc}</p>
            </div>
          ))}
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h3>4. Competitive Context</h3>
          <p>Scores are relative to the competitive landscape. A 7/10 today may become 6.5/10 if competitors significantly improve — we recalibrate quarterly.</p>

          <h3>5. Publication &amp; Updates</h3>
          <p>Reviews display a last-checked date. High-intent pages are prioritized for review when pricing, plan limits, or major features change.</p>

          <h2>Affiliate Disclosure</h2>
          <p>Some links on AISaaSToolkit are affiliate links. If you purchase through these links, we may earn a commission at no extra cost to you. This never influences our scores or rankings — a tool with no affiliate program receives the same rigorous evaluation as one with a generous commission. Read our full <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>.</p>

          <h2>Our Team</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {allAuthors.map(author => (
            <Link key={author.slug} href={`/author/${author.slug}`} className="flex gap-3 items-center bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <Image src={author.avatar} alt={author.name} width={48} height={48} className="w-12 h-12 rounded-full" />
              <div>
                <p className="font-semibold text-foreground">{author.name}</p>
                <p className="text-sm text-muted-foreground">{author.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
