import { StarRating } from "@/components/common/StarRating";

interface RatingCategory {
  label: string;
  score: number;
}

interface RatingDisplayProps {
  overall: number;
  reviewCount: number;
  categories?: RatingCategory[];
}

export function RatingDisplay({ overall, reviewCount, categories }: RatingDisplayProps) {
  const defaultCategories = [
    { label: "Ease of Use", score: overall - 0.1 },
    { label: "Features", score: overall + 0.1 },
    { label: "Value for Money", score: overall - 0.2 },
    { label: "Customer Support", score: overall - 0.3 },
  ].map((c) => ({ ...c, score: Math.min(5, Math.max(1, c.score)) }));

  const cats = categories ?? defaultCategories;

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="font-bold text-lg mb-4">Our Rating</h3>
      <div className="flex items-center gap-6 mb-6">
        <div className="text-center">
          <div className="text-5xl font-black gradient-text">{overall.toFixed(1)}</div>
          <StarRating rating={overall} showNumber={false} size="lg" className="justify-center mt-1" />
          <p className="text-xs text-muted-foreground mt-1">{reviewCount.toLocaleString()} reviews</p>
        </div>
        <div className="flex-1 space-y-2">
          {cats.map((cat) => (
            <div key={cat.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">{cat.label}</span>
                <span className="font-semibold">{cat.score.toFixed(1)}</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(cat.score / 5) * 100}%`, background: "linear-gradient(90deg,#667eea,#764ba2)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
