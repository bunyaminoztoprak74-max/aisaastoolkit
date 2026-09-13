import type { Metadata } from "next";
import { Shield, Users, Zap, Star, FlaskConical, BookOpen } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About AISaaSToolkit — Our Mission & Team",
  description: "AISaaSToolkit provides practical AI SaaS research and comparisons. Learn about our evidence standards, editorial process, and affiliate disclosures.",
  alternates: { canonical: "https://aisaastoolkit.com/about" },
  openGraph: {
    title: "About AISaaSToolkit — Our Mission & Team",
    description: "Practical AI tool comparisons with transparent evidence and affiliate disclosures.",
    url: "https://aisaastoolkit.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-black mb-4">About AISaaSToolkit</h1>
      <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
        We help business users compare AI tools before spending money, with clear sourcing, practical use cases, and transparent affiliate disclosures.
      </p>

      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        {[
          { icon: Shield, title: "Reader-First", desc: "Commercial relationships are disclosed and do not change the price readers pay." },
          { icon: FlaskConical, title: "Evidence-Based", desc: "We distinguish hands-on experience from research based on product documentation and published information." },
          { icon: Users, title: "Built for Business Users", desc: "Our audience is marketers, founders, freelancers, and teams — we review tools through the lens of real business ROI." },
          { icon: Zap, title: "Dated Research", desc: "Reviews show update dates so readers can judge whether pricing and feature information is current." },
          { icon: Star, title: "Editorial Scoring", desc: "Ratings summarize our editorial assessment of features, usability, value, reliability, and support." },
          { icon: BookOpen, title: "AI-Assisted, Human-Verified", desc: "Some drafts use AI assistance. All published content is fact-checked, edited, and approved by a human reviewer." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-xl border border-border bg-card p-5">
            <Icon className="w-8 h-8 text-primary mb-3" />
            <h2 className="font-bold text-lg mb-2">{title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Our Mission</h2>
        <p>The AI SaaS market moves fast. New tools launch every week, pricing changes constantly, and marketing copy is designed to impress rather than inform. AISaaSToolkit exists to give you an honest picture of what these tools actually do — and whether they are worth your time and money.</p>
        <p>We cover AI writing tools, automation platforms, image generators, productivity tools, SEO tools, and business software. Our strongest coverage focuses on practical automation and content workflows.</p>

        <h2>How We Review Tools</h2>
        <p>Our standard review process:</p>
        <ol>
          <li><strong>Collect current evidence</strong> — we review vendor documentation, pricing, plan limits, release notes, and credible third-party sources.</li>
          <li><strong>Use the product when available</strong> — hands-on observations are identified as such and are not implied for every tool.</li>
          <li><strong>Six-dimension scoring</strong> — Output Quality (25%), Features (25%), Ease of Use (20%), Value for Money (15%), Reliability (10%), Support (5%).</li>
          <li><strong>Editorial review</strong> — claims, links, pricing, and disclosures are checked before publication.</li>
          <li><strong>Ongoing updates</strong> — reviews are flagged for re-testing when a tool changes pricing or releases major features.</li>
        </ol>
        <p>Our <Link href="/editorial-policy">full editorial policy</Link> details every step of this process.</p>

        <h2>Affiliate Relationships</h2>
        <p>Some links on this site are affiliate links. When you sign up through our links, we may earn a commission at no extra cost to you. This is how we fund the site and keep reviews free to read.</p>
        <p>Affiliate relationships do not influence our ratings. We regularly publish low scores on tools we earn commissions from. Our <Link href="/affiliate-disclosure">full affiliate disclosure</Link> lists every program we participate in.</p>

        <h2>Our Team</h2>
        <p>AISaaSToolkit organizes coverage through editorial desks rather than invented individual reviewer identities:</p>
        <ul>
          <li><strong><Link href="/author/alex-morgan">Editorial Team</Link></strong> — general AI software research and comparisons.</li>
          <li><strong><Link href="/author/james-wright">Automation Desk</Link></strong> — Make.com, n8n, Zapier, APIs, and workflow coverage.</li>
        </ul>

        <h2>Contact</h2>
        <p>Questions, tool suggestions, or errors to report: <a href="mailto:hello@aisaastoolkit.com">hello@aisaastoolkit.com</a> or use our <Link href="/contact">contact form</Link>.</p>
      </div>
    </div>
  );
}
