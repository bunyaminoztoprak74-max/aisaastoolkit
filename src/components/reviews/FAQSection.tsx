import type { FAQ } from "@/data/tools";

export function FAQSection({ faqs, toolName }: { faqs: FAQ[]; toolName: string }) {
  return (
    <div id="faq">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions about {toolName}</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className="group rounded-xl border border-border bg-card overflow-hidden">
            <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-sm list-none hover:bg-accent/50 transition-colors">
              {faq.question}
              <span className="ml-4 flex-shrink-0 text-muted-foreground text-lg group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
