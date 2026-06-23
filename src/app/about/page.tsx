import type { Metadata } from "next";
import { Shield, Users, Zap, Star, FlaskConical, BookOpen } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About AISaaSToolkit — Our Mission & Team",
  description: "AISaaSToolkit provides independent, hands-on reviews of AI SaaS tools. Learn about our 30-day testing methodology, editorial standards, and the team behind our reviews.",
  alternates: { canonical: "https://aisaastoolkit.com/about" },
  openGraph: {
    title: "About AISaaSToolkit — Our Mission & Team",
    description: "Independent AI tool reviews — 30+ days of hands-on testing, no sponsored rankings, no BS.",
    url: "https://aisaastoolkit.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-black mb-4">About AISaaSToolkit</h1>
      <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
        We are a team of AI researchers, engineers, and marketers who believe everyone deserves honest, unbiased information about AI tools — before spending money on them.
      </p>

      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        {[
          { icon: Shield, title: "100% Independent", desc: "We pay for every tool we test out of pocket. We have never accepted payment to write a positive review." },
          { icon: FlaskConical, title: "30-Day Testing Standard", desc: "Every tool is tested for a minimum of 30 days on real tasks before we publish. No first-impression reviews." },
          { icon: Users, title: "Built for Business Users", desc: "Our audience is marketers, founders, freelancers, and teams — we review tools through the lens of real business ROI." },
          { icon: Zap, title: "Always Up to Date", desc: "Reviews are updated when tools change pricing, add major features, or when the competitive landscape shifts." },
          { icon: Star, title: "Transparent Scoring", desc: "Our 5-dimension scoring rubric is published. Every rating is justified by test results, not commercial relationships." },
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
        <p>We cover AI writing tools, automation platforms, image generators, productivity tools, SEO tools, and business security software. Every category page is maintained by a specialist reviewer with real-world experience in that domain.</p>

        <h2>How We Review Tools</h2>
        <p>Our standard review process:</p>
        <ol>
          <li><strong>Sign up like a real user</strong> — we use free trials or pay for access the same way our readers would.</li>
          <li><strong>30 days of active use</strong> — we use the tool for real tasks in its intended category before scoring.</li>
          <li><strong>Six-dimension scoring</strong> — Output Quality (25%), Features (25%), Ease of Use (20%), Value for Money (15%), Reliability (10%), Support (5%).</li>
          <li><strong>Peer review</strong> — a second team member reads every review for accuracy and consistency before publication.</li>
          <li><strong>Ongoing updates</strong> — reviews are flagged for re-testing when a tool changes pricing or releases major features.</li>
        </ol>
        <p>Our <Link href="/editorial-policy">full editorial policy</Link> details every step of this process.</p>

        <h2>Affiliate Relationships</h2>
        <p>Some links on this site are affiliate links. When you sign up through our links, we may earn a commission at no extra cost to you. This is how we fund the site and keep reviews free to read.</p>
        <p>Affiliate relationships do not influence our ratings. We regularly publish low scores on tools we earn commissions from. Our <Link href="/affiliate-disclosure">full affiliate disclosure</Link> lists every program we participate in.</p>

        <h2>Our Team</h2>
        <p>AISaaSToolkit is written and maintained by a small team of specialists:</p>
        <ul>
          <li><strong><Link href="/author/alex-morgan">Alex Morgan</Link></strong> — Senior AI Tools Analyst. Former software engineer with 5+ years reviewing AI and SaaS products.</li>
          <li><strong><Link href="/author/james-wright">James Wright</Link></strong> — AI Automation Specialist. 6+ years building automation workflows with n8n, Make.com, and Zapier.</li>
        </ul>

        <h2>Contact</h2>
        <p>Questions, tool suggestions, or errors to report: <a href="mailto:hello@aisaastoolkit.com">hello@aisaastoolkit.com</a> or use our <Link href="/contact">contact form</Link>.</p>
      </div>
    </div>
  );
}
