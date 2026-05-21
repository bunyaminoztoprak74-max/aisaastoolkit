interface Props {
  toolName: string;
  whoIsItFor: string[];
  whoShouldAvoid: string[];
}

export function WhoIsItFor({ toolName, whoIsItFor, whoShouldAvoid }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-4 my-8">
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
          <span>"...</span> Who Should Use {toolName}
        </h3>
        <ul className="space-y-2">
          {whoIsItFor.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="text-green-500 flex-shrink-0 mt-0.5">•</span>
              <span className="text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
          <span>✗</span> Who Should Avoid {toolName}
        </h3>
        <ul className="space-y-2">
          {whoShouldAvoid.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="text-red-500 flex-shrink-0 mt-0.5">•</span>
              <span className="text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
