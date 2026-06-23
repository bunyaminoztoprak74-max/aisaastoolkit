import type { Metadata } from "next";
import { Info, CheckCircle, ShieldCheck, FlaskConical, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | AISaaSToolkit",
  description: "Full affiliate disclosure for AISaaSToolkit: how we earn commissions, our editorial independence policy, tool testing methodology, and affiliate program table.",
  alternates: { canonical: "https://aisaastoolkit.com/affiliate-disclosure" },
};

const affiliatePrograms = [
  { company: "Claude / Anthropic", program: "Direct / Referral", platform: "Direct", category: "AI Assistant" },
  { company: "ChatGPT / OpenAI", program: "OpenAI Affiliates", platform: "PartnerStack", category: "AI Assistant" },
  { company: "Make.com", program: "Make Partner Program", platform: "Impact", category: "AI Automation" },
  { company: "Zapier", program: "Zapier Partner Program", platform: "PartnerStack", category: "AI Automation" },
  { company: "n8n", program: "n8n Partner Program", platform: "Direct", category: "AI Automation" },
  { company: "Jasper", program: "Jasper Affiliates", platform: "Impact", category: "AI Writing" },
  { company: "Writesonic", program: "Writesonic Affiliates", platform: "PartnerStack", category: "AI Writing" },
  { company: "Grammarly", program: "Grammarly Affiliates", platform: "CJ Affiliate", category: "AI Writing" },
  { company: "ElevenLabs", program: "ElevenLabs Affiliates", platform: "PartnerStack", category: "AI Voice" },
  { company: "Pictory", program: "Pictory Affiliates", platform: "PartnerStack", category: "AI Video" },
  { company: "Descript", program: "Descript Affiliates", platform: "PartnerStack", category: "AI Video" },
  { company: "AdCreative.ai", program: "AdCreative Affiliates", platform: "Impact", category: "AI Marketing" },
  { company: "Canva", program: "Canva Affiliates", platform: "Impact", category: "AI Design" },
  { company: "Midjourney", program: "N/A (reviewed independently)", platform: "—", category: "AI Image" },
  { company: "Notion", program: "Notion Affiliates", platform: "PartnerStack", category: "AI Productivity" },
  { company: "Gamma", program: "Gamma Affiliates", platform: "PartnerStack", category: "AI Productivity" },
  { company: "Perplexity", program: "Perplexity Affiliates", platform: "PartnerStack", category: "AI Research" },
  { company: "Mailchimp", program: "Mailchimp Affiliate Program", platform: "CJ Affiliate", category: "AI Marketing" },
  { company: "Omneky", program: "Omneky Affiliate Program", platform: "Direct", category: "AI Marketing" },
  { company: "1Password", program: "1Password Affiliates", platform: "Impact", category: "SaaS Security" },
  { company: "NordLayer", program: "NordLayer Partner Program", platform: "Impact", category: "SaaS Security" },
  { company: "Hostinger", program: "Hostinger Affiliates", platform: "Impact", category: "Web Hosting" },
  { company: "TeamViewer", program: "TeamViewer Partner Program", platform: "CJ Affiliate", category: "AI Productivity" },
  { company: "Ubersuggest / NP Digital", program: "NP Digital Affiliates", platform: "Direct", category: "AI SEO" },
  { company: "Gemini / Google", program: "Google Workspace Affiliates", platform: "CJ Affiliate", category: "AI Productivity" },
];

const testingSteps = [
  { step: "1. Free trial or paid plan sign-up", detail: "We sign up with our own accounts. No compensation for signing up." },
  { step: "2. 30-day active use period", detail: "We use the tool for real work tasks across at least 30 days before scoring." },
  { step: "3. Feature matrix testing", detail: "We systematically test every advertised feature against our standard rubric." },
  { step: "4. Pricing verification", detail: "We verify all pricing tiers, limits, and billing terms at the time of publication." },
  { step: "5. Comparison with competitors", detail: "We compare outputs and value against 3-5 direct competitors in the same category." },
  { step: "6. Final editorial review", detail: "A second reviewer reads every published review before it goes live." },
];

export default function AffiliateDisclosurePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#667eea,#764ba2)" }}>
          <Info className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-black">Affiliate Disclosure</h1>
          <p className="text-muted-foreground text-sm">Last updated: June 22, 2026</p>
        </div>
      </div>

      <div className="rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20 p-5 mb-10">
        <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">Quick summary</p>
        <p className="text-sm text-blue-700 dark:text-blue-400">Some links on this site earn us a commission. Our reviews are always independent. We never rank a tool higher because of its commission rate, and we regularly give low scores to products we have affiliate relationships with.</p>
      </div>

      <div className="space-y-12 text-sm leading-relaxed">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Scale className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">How We Make Money</h2>
          </div>
          <p className="text-muted-foreground mb-4">AISaaSToolkit earns revenue through affiliate commissions. When a reader clicks one of our affiliate links and signs up for or purchases a paid plan, the software company pays us a referral fee. <strong>You pay the same price regardless</strong> of whether you use our link. In some cases, our links include exclusive discounts.</p>
          <p className="text-muted-foreground">We do not accept payment for positive coverage, placement in rankings, or favorable review scores. Affiliate relationships do not influence editorial scores.</p>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Editorial Independence</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Review scores are determined by our testers, not by commercial relationships",
              "We disclose all affiliate relationships, including for tools we rate poorly",
              "Tools are added to our directory based on editorial relevance, not affiliate status",
              "We accept no payment for top-of-list placements in our Best roundups",
              "Vendor-provided review access never obligates a positive review",
              "We will update or remove tools that no longer meet our quality standards",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 rounded-lg border border-border bg-card p-3">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <FlaskConical className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Tool Testing Methodology</h2>
          </div>
          <p className="text-muted-foreground mb-5">Every review on AISaaSToolkit follows our standard testing process before publication:</p>
          <div className="space-y-3">
            {testingSteps.map(({ step, detail }) => (
              <div key={step} className="flex gap-4 rounded-lg border border-border bg-card p-4">
                <div className="font-semibold text-foreground min-w-52 text-sm">{step}</div>
                <div className="text-muted-foreground text-sm">{detail}</div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground mt-4">Our review rubric scores tools across five dimensions: Features (25%), Ease of Use (20%), Pricing &amp; Value (20%), Output Quality (20%), and Support &amp; Reliability (15%). The weighted average produces the final star rating shown on each review page.</p>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Our Affiliate Relationships</h2>
          </div>
          <p className="text-muted-foreground mb-5">Below is a full list of the affiliate programs we participate in. This table is updated when new relationships are established.</p>
          <div className="rounded-xl border border-border overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left px-4 py-3 font-semibold">Company / Tool</th>
                  <th className="text-left px-4 py-3 font-semibold">Program</th>
                  <th className="text-left px-4 py-3 font-semibold">Platform</th>
                  <th className="text-left px-4 py-3 font-semibold">Category</th>
                </tr>
              </thead>
              <tbody>
                {affiliatePrograms.map((row, i) => (
                  <tr key={i} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-background" : "bg-muted/20"}`}>
                    <td className="px-4 py-3 font-medium">{row.company}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.program}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded-full">{row.platform}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{row.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Sponsored Content Policy</h2>
          <p className="text-muted-foreground mb-3">AISaaSToolkit does not currently publish sponsored posts, paid placements, or branded content. All articles on this site are written by our editorial team based on independent research and testing.</p>
          <p className="text-muted-foreground">If this policy changes in the future, any sponsored content will be clearly labeled with a &ldquo;Sponsored&rdquo; disclosure at the top of the article.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">FTC Compliance</h2>
          <p className="text-muted-foreground">This disclosure is provided in compliance with the Federal Trade Commission&apos;s guidelines on endorsements and testimonials (16 C.F.R. Part 255). Our affiliate relationships are disclosed on every review page and in the site footer.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Questions?</h2>
          <p className="text-muted-foreground">Contact us at <a href="mailto:hello@aisaastoolkit.com" className="text-primary underline hover:no-underline">hello@aisaastoolkit.com</a> with any questions about our affiliate relationships or editorial standards.</p>
        </section>
      </div>
    </div>
  );
}
