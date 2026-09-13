import Link from "next/link";

const trustItems = [
  {
    icon: "📊",
    title: "Clear Recommendations",
    description: "We explain who each tool is best for, where it falls short, and how affiliate relationships work.",
    href: "/methodology",
  },
  {
    icon: "🧪",
    title: "Evidence Levels",
    description: "Reviews distinguish hands-on experience from product research instead of claiming the same test depth for every tool.",
    href: "/methodology",
  },
  {
    icon: "📝",
    title: "Practical Workflows",
    description: "Our strongest recommendations focus on real automation, content, and business workflows readers can reproduce.",
    href: "/methodology",
  },
  {
    icon: "🔄",
    title: "Visible Update Dates",
    description: "Pricing and features change quickly, so each review shows when its information was last checked.",
    href: "/methodology",
  },
];

export function WhyTrustUs() {
  return (
    <section className="py-16 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Why Trust Our Reviews?</h2>
          <p className="text-muted-foreground">
            See how we research, compare, and disclose AI tools.{" "}
            <Link href="/methodology" className="text-primary hover:underline font-medium">Read our methodology →</Link>
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item) => (
            <div key={item.title} className="bg-card border border-border rounded-xl p-5 text-center hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
