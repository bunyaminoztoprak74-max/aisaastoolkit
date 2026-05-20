import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  reviewCount?: number;
  className?: string;
}

export function StarRating({ rating, maxRating = 5, size = "md", showNumber = true, reviewCount, className }: StarRatingProps) {
  const sizes = { sm: "w-3 h-3", md: "w-4 h-4", lg: "w-5 h-5" };
  const textSizes = { sm: "text-xs", md: "text-sm", lg: "text-base" };

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const partial = !filled && i < rating;
          return (
            <div key={i} className="relative">
              <Star className={cn(sizes[size], "fill-gray-200 text-gray-200")} />
              {(filled || partial) && (
                <div className="absolute inset-0 overflow-hidden" style={{ width: partial ? `${(rating % 1) * 100}%` : "100%" }}>
                  <Star className={cn(sizes[size], "fill-yellow-400 text-yellow-400")} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showNumber && (
        <span className={cn("font-semibold text-foreground", textSizes[size])}>{rating.toFixed(1)}</span>
      )}
      {reviewCount && (
        <span className={cn("text-muted-foreground", textSizes[size])}>({reviewCount.toLocaleString()} reviews)</span>
      )}
    </div>
  );
}
