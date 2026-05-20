import { CheckCircle, XCircle } from "lucide-react";

export function ProsConsSection({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div id="pros-cons">
      <h2 className="text-2xl font-bold mb-6">Pros & Cons</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20 p-6">
          <h3 className="font-bold text-green-800 dark:text-green-400 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" /> Pros
          </h3>
          <ul className="space-y-3">
            {pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-green-800 dark:text-green-300">{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20 p-6">
          <h3 className="font-bold text-red-800 dark:text-red-400 mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5" /> Cons
          </h3>
          <ul className="space-y-3">
            {cons.map((con, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm">
                <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-red-800 dark:text-red-300">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
