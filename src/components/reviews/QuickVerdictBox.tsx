import Link from "next/link";

interface Props {
  verdict: string;
  rating: number;
  toolName: string;
  affiliateUrl: string;
  trialUrl?: string;
  pros: string[];
  cons: string[];
}

export function QuickVerdictBox({ verdict, rating, toolName, affiliateUrl, trialUrl, pros, cons }: Props) {
  const stars = Math.round(rating);
  return (
    <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-2xl p-6 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-shrink-0 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">Quick Verdict</div>
        <div className="flex items-center gap-1">
          {Array.from({length: 5}).map((_, i) => (
            <span key={i} className={i < stars ? "text-yellow-400" : "text-gray-300"}>★</span>
          ))}
          <span className="text-lg font-bold text-foreground ml-1">{rating}/5</span>
        </div>
      </div>
      <p className="text-foreground leading-relaxed mb-5">{verdict}</p>
      <div className="grid md:grid-cols-2 gap-3 mb-5">
        <div>
          <p className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase tracking-wide mb-2">Top Pros</p>
          <ul className="space-y-1">
            {pros.slice(0,3).map((p, i) => <li key={i} className="text-sm flex gap-2"><span className="text-green-500 flex-shrink-0">""</span><span>{p}</span></li>)}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide mb-2">Notable Cons</p>
          <ul className="space-y-1">
            {cons.slice(0,2).map((c, i) => <li key={i} className="text-sm flex gap-2"><span className="text-red-500 flex-shrink-0">"--</span><span>{c}</span></li>)}
          </ul>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href={trialUrl ?? affiliateUrl} target="_blank" rel="noopener noreferrer sponsored" className="flex-1 text-center font-semibold text-white bg-green-600 hover:bg-green-700 py-3 px-5 rounded-xl transition-colors">
          Try {toolName} Free →
        </Link>
        <Link href={affiliateUrl} target="_blank" rel="noopener noreferrer sponsored" className="flex-1 text-center font-semibold text-green-700 dark:text-green-300 border-2 border-green-300 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/30 py-3 px-5 rounded-xl transition-colors">
          Visit {toolName}
        </Link>
      </div>
    </div>
  );
}
