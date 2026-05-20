import type { Metadata } from "next";
import { Shield, Users, Zap, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "About AISaaSToolkit — Our Mission & Team",
  description: "Learn about AISaaSToolkit, our mission to provide independent AI tool reviews, and how we evaluate every tool we review.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-black mb-4">About AISaaSToolkit</h1>
      <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
        We're a team of AI enthusiasts, marketers, and developers who believe everyone deserves honest, unbiased information about AI tools.
      </p>

      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        {[
          { icon: Shield, title: "100% Independent", desc: "We pay for tools out of pocket and are never paid to write positive reviews." },
          { icon: Star, title: "Rigorously Tested", desc: "Every tool is tested for at least 2 weeks across real-world use cases before we publish." },
          { icon: Users, title: "Built for Creators", desc: "Our audience is bloggers, marketers, and founders — we review tools through that lens." },
          { icon: Zap, title: "Always Up to Date", desc: "We update every review when tools change pricing, add features, or when better alternatives emerge." },
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
        <p>The AI SaaS market is growing at an incredible pace. New tools launch every week, pricing changes constantly, and it's genuinely hard to know what's worth paying for. AISaaSToolkit exists to cut through the noise.</p>
        <h2>How We Review Tools</h2>
        <p>Our review process is standardized: we sign up for a free trial or paid plan, use the tool for its primary intended purpose, evaluate it against our rubric (features, ease of use, value for money, and support), and then write an honest summary of what we found — including the downsides.</p>
        <h2>Affiliate Disclosure</h2>
        <p>Some of our links are affiliate links. We earn a small commission when you sign up through our links, at no extra cost to you. This helps us keep the lights on and continue reviewing tools. It never influences our ratings or recommendations. Our <a href="/affiliate-disclosure">full disclosure policy is here</a>.</p>
        <h2>Contact Us</h2>
        <p>Have a tool you'd like us to review? Found an error? We'd love to hear from you at <a href="mailto:hello@aisaastoolkit.com">hello@aisaastoolkit.com</a>.</p>
      </div>
    </div>
  );
}
