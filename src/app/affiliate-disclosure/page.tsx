import type { Metadata } from "next";
import { Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | AISaaSToolkit",
  description: "Read our full affiliate disclosure policy explaining how affiliate links work on AISaaSToolkit.",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#667eea,#764ba2)" }}>
          <Info className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-black">Affiliate Disclosure</h1>
          <p className="text-muted-foreground text-sm">Last updated: May 1, 2026</p>
        </div>
      </div>
      <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-6">
        <div className="rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20 p-5 not-prose">
          <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">Summary: Some links on this site earn us a commission. Our reviews are always independent and honest.</p>
        </div>
        <section>
          <h2>What Are Affiliate Links?</h2>
          <p>Some links on AISaaSToolkit are "affiliate links." This means if you click one of our links and then sign up or make a purchase, we may receive a small commission from the software company. You pay the same price whether you use our link or not — sometimes you may even get a discount through our link.</p>
        </section>
        <section>
          <h2>Does This Influence Our Reviews?</h2>
          <p><strong>No.</strong> We rate and rank tools based on our independent testing and editorial judgment. We routinely give low scores to products we have affiliate relationships with when they don't perform well. We will never recommend a tool purely because of its commission rate.</p>
        </section>
        <section>
          <h2>How We Test Tools</h2>
          <p>Every tool we review is tested by our editorial team before publication. We use free trials, paid plans, and in some cases, review accounts provided by vendors. Vendor-provided access never obligates us to provide a positive review.</p>
        </section>
        <section>
          <h2>Which Companies Do We Partner With?</h2>
          <p>We have affiliate partnerships with many of the tools we review, including but not limited to: Claude, ChatGPT, Make.com, Zapier, Jasper, Writesonic, and Pictory. We identify affiliate links throughout the site.</p>
        </section>
        <section>
          <h2>FTC Compliance</h2>
          <p>This disclosure is provided in compliance with the FTC's guidelines on endorsements and testimonials (16 C.F.R. Part 255).</p>
        </section>
        <section>
          <h2>Questions?</h2>
          <p>Contact us at <strong>hello@aisaastoolkit.com</strong> with any questions about our affiliate relationships.</p>
        </section>
      </div>
    </div>
  );
}
