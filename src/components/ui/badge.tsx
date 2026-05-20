import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        recommended: "border-transparent bg-green-500 text-white",
        "best-value": "border-transparent bg-blue-500 text-white",
        trending: "border-transparent bg-orange-500 text-white",
        new: "border-transparent bg-purple-500 text-white",
        "editor-choice": "border-transparent text-white",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, style, ...props }: BadgeProps) {
  const gradientStyle = variant === "editor-choice"
    ? { background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", ...style }
    : style;
  return <div className={cn(badgeVariants({ variant }), className)} style={gradientStyle} {...props} />;
}
export { Badge, badgeVariants };
