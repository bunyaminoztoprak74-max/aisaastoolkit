import Link from "next/link";

const trustItems = [
  {
    icon: "📊",
    title: "Independent Reviews",
    description: "No sponsored rankings. We never accept payment to boost a tool's score. Our ratings reflect real testing results only.",
    href: "/methodology",
  },
  {
    icon: "🧪",
    title: "30-Day Testing",
    description: "Every tool review involves at minimum 30 days of hands-on use on paid accounts — not vendor demos or free trials.",
    href: "/methodology",
  },
  {
    icon: "📝",
    title: "Named Experts",
    description: "Every review is written by a named analyst with verifiable credentials. No anonymous content here.",
    href: "/methodology",
  },
  {
    icon: "🔄",
    title: "Updated Weekly",
    description: "Scores are recalibrated when tools ship major updates. We track the AI landscape so you don't have to.",
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
            We set the standard for independent AI tool journalism.{" "}
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
