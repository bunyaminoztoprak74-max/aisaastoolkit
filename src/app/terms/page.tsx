import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | AISaaSToolkit",
  description: "Read the AISaaSToolkit terms of service for information about using our website and content.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-black mb-2">Terms of Service</h1>
      <p className="text-muted-foreground mb-8">Last updated: May 1, 2026</p>
      <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-6">
        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing AISaaSToolkit ("the Site"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Site.</p>
        </section>
        <section>
          <h2>2. Informational Purpose</h2>
          <p>All content on this Site is provided for informational purposes only. Tool reviews reflect our editorial opinion based on testing at the time of review. Software tools change frequently — always verify current pricing and features on the vendor's official website.</p>
        </section>
        <section>
          <h2>3. Affiliate Relationships</h2>
          <p>We participate in affiliate programs. When you click certain links and make purchases, we may earn commissions. This does not affect the price you pay or the independence of our reviews.</p>
        </section>
        <section>
          <h2>4. Intellectual Property</h2>
          <p>All content on this Site — including text, graphics, and code — is the property of AISaaSToolkit and may not be reproduced without written permission.</p>
        </section>
        <section>
          <h2>5. Limitation of Liability</h2>
          <p>AISaaSToolkit is not liable for any damages arising from your use of or inability to use this Site or any tools reviewed here. Use all software at your own risk.</p>
        </section>
        <section>
          <h2>6. External Links</h2>
          <p>We link to third-party websites for reference. We are not responsible for the content, privacy policies, or practices of any third-party sites.</p>
        </section>
        <section>
          <h2>7. Contact</h2>
          <p>For questions about these terms, contact us at: <strong>legal@aisaastoolkit.com</strong></p>
        </section>
      </div>
    </div>
  );
}
