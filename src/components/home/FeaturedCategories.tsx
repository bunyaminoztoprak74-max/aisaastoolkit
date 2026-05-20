import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";

export function FeaturedCategories() {
  const featured = categories.filter((c) => c.featured);
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Browse by Category</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Explore curated AI tool reviews organized by use case</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {featured.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group relative rounded-xl border border-border bg-card p-5 hover:border-primary/50 hover:shadow-md transition-all duration-200"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center text-xl mb-3`}>
                {cat.icon}
              </div>
              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{cat.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{cat.toolCount} tools</p>
              <ArrowRight className="w-3.5 h-3.5 absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
