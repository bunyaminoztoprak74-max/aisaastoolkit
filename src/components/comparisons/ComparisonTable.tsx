import { Check, X, Minus } from "lucide-react";
import type { ComparisonFeature } from "@/data/comparisons";
import { cn } from "@/lib/utils";

interface ComparisonTableProps {
  features: ComparisonFeature[];
  tool1Name: string;
  tool2Name: string;
}

function renderValue(val: string | boolean) {
  if (val === true) return <Check className="w-5 h-5 text-green-500 mx-auto" />;
  if (val === false) return <X className="w-5 h-5 text-red-400 mx-auto" />;
  return <span className="text-sm font-medium">{val}</span>;
}

export function ComparisonTable({ features, tool1Name, tool2Name }: ComparisonTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-4 py-3 text-left font-semibold text-muted-foreground w-[40%]">Feature</th>
            <th className="px-4 py-3 text-center font-bold text-foreground w-[30%]">{tool1Name}</th>
            <th className="px-4 py-3 text-center font-bold text-foreground w-[30%]">{tool2Name}</th>
          </tr>
        </thead>
        <tbody>
          {features.map((row, i) => (
            <tr key={i} className={cn("border-b border-border last:border-0", i % 2 === 0 ? "bg-card" : "bg-muted/20")}>
              <td className="px-4 py-3 font-medium">{row.feature}</td>
              <td className={cn("px-4 py-3 text-center", row.winner === 1 && "bg-green-50 dark:bg-green-950/20")}>
                <div className="flex items-center justify-center gap-1">
                  {renderValue(row.tool1)}
                  {row.winner === 1 && <span className="text-xs text-green-600 font-bold ml-1">✓</span>}
                </div>
              </td>
              <td className={cn("px-4 py-3 text-center", row.winner === 2 && "bg-green-50 dark:bg-green-950/20")}>
                <div className="flex items-center justify-center gap-1">
                  {renderValue(row.tool2)}
                  {row.winner === 2 && <span className="text-xs text-green-600 font-bold ml-1">✓</span>}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
