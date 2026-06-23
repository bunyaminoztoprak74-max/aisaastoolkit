import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Editorial Policy — How We Write & Review AI Tools | AISaaSToolkit",
  description:
    "AISaaSToolkit editorial policy: how we select tools to review, our independence standards, update schedule, and our commitment to reader trust.",
  path: "/editorial-policy",
  keywords: ["aisaastoolkit editorial policy", "ai tool review standards", "independent ai reviews"],
});

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-14 border-b border-border">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Editorial Policy</h1>
          <p className="text-xl text-muted-foreground">
            Our commitment to independent, accurate, and reader-first AI tool reviews.
          </p>
          <p className="text-sm text-muted-foreground mt-3">Last updated: June 1, 2026</p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-3xl py-12">
        {/* Summary box */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-10">
          <h2 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-3">Our Core Commitments</h2>
          <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
            <li>✓ We never accept payment to change a review score or recommendation</li>
            <li>✓ Affiliate commissions are disclosed on every page that contains them</li>
            <li>✓ Tools are selected for review based on reader demand and category importance — not affiliate rates</li>
            <li>✓ Every review reflects at least 30 days of hands-on testing on a paid or free-trial account</li>
            <li>✓ Reviews are updated when a tool significantly changes its pricing, features, or quality</li>
            <li>✓ We correct factual errors promptly when they are reported</li>
          </ul>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">

          <h2>1. How We Select Tools to Review</h2>
          <p>
            We review AI SaaS tools based on three criteria: reader interest (search volume and direct requests),
            category importance (coverage gaps in our database), and editorial judgment about a tool&rsquo;s
            significance in the market. We do <strong>not</strong> select tools for review based on affiliate
            commission rates.
          </p>
          <p>
            If you&rsquo;d like to suggest a tool for review, you can{" "}
            <Link href="/contact">contact us here</Link>. Tool companies may also request a review, but
            editorial coverage is never guaranteed and a request does not influence the outcome.
          </p>

          <h2>2. Our Independence Standard</h2>
          <p>
            AISaaSToolkit operates as an independent publisher. We have affiliate relationships with many
            of the tools we cover — when you purchase through our links, we may earn a commission at no
            extra cost to you. This is how we fund the site.
          </p>
          <p>
            However, our ratings and recommendations are determined entirely by our testing results. We
            routinely give low scores to tools we earn commissions from. A 3/5 review earns us the same
            commission as a 5/5 review — there is no financial incentive to inflate scores.
          </p>
          <p>
            <strong>We do not accept sponsored reviews, paid placements, or advertorial content.</strong>
            If a tool company has paid for content on this site, it will be clearly labelled as
            &ldquo;Sponsored&rdquo; — but as of the publication of this policy, we have no such
            arrangements and do not plan to introduce them.
          </p>

          <h2>3. The Review Process</h2>

          <h3>Step 1 — Account Setup</h3>
          <p>
            We sign up using a standard free trial or paid plan — the same way any user would. We do not
            use vendor-provided demo accounts, as these may be artificially optimized. When a vendor
            provides review access, we disclose this in the review.
          </p>

          <h3>Step 2 — 30-Day Hands-On Testing</h3>
          <p>
            Every tool is tested for a minimum of 30 days across real use cases relevant to our readers:
            content creation, SEO, automation, marketing, and developer workflows. We do not publish
            first-impression reviews or reviews based on marketing materials.
          </p>

          <h3>Step 3 — Six-Dimension Scoring</h3>
          <p>Our scoring rubric weights six dimensions:</p>
          <ul>
            <li><strong>Output Quality (25%)</strong> — quality of AI-generated results on real tasks</li>
            <li><strong>Feature Set (25%)</strong> — breadth and quality of features vs. competitors</li>
            <li><strong>Ease of Use (20%)</strong> — onboarding, UI clarity, learning curve</li>
            <li><strong>Value for Money (15%)</strong> — price relative to output quality</li>
            <li><strong>Reliability (10%)</strong> — uptime, speed, consistency</li>
            <li><strong>Support (5%)</strong> — documentation, support team, community</li>
          </ul>
          <p>
            See our <Link href="/methodology">full methodology page</Link> for the complete scoring rubric
            with criteria for each score level (1–5).
          </p>

          <h3>Step 4 — Peer Review</h3>
          <p>
            Before publication, reviews are read by at least one other team member who checks for factual
            accuracy, completeness, and consistency with our scoring rubric.
          </p>

          <h2>4. Content Update Policy</h2>
          <p>
            AI tools change frequently. We commit to updating reviews when:
          </p>
          <ul>
            <li>A tool changes its pricing by more than 20%</li>
            <li>A tool adds or removes a major feature</li>
            <li>A competitor significantly changes the competitive landscape</li>
            <li>A reader or the tool company reports a factual error</li>
          </ul>
          <p>
            Every review displays a &ldquo;Last updated&rdquo; date. Reviews older than 12 months without
            an update are flagged for re-testing.
          </p>

          <h2>5. Error Correction Policy</h2>
          <p>
            We take accuracy seriously. If you believe a review contains a factual error — incorrect
            pricing, wrong feature descriptions, or outdated information — please{" "}
            <Link href="/contact">contact us</Link>. We will investigate and correct confirmed errors
            within 5 business days, and we will note the correction at the bottom of the relevant page.
          </p>

          <h2>6. Affiliate Relationships</h2>
          <p>
            Our <Link href="/affiliate-disclosure">full affiliate disclosure</Link> lists all current
            affiliate partnerships. In summary: when you click an affiliate link and make a purchase,
            we may earn a commission. The affiliate relationship is disclosed on every page that contains
            affiliate links, at the top of the article and inline where relevant.
          </p>
          <p>
            Affiliate links are marked with a note where practical. They are never disguised as
            non-commercial links.
          </p>

          <h2>7. AI-Assisted Writing Disclosure</h2>
          <p>
            Some content on this site is drafted with AI writing assistance (including Claude and
            ChatGPT). All AI-assisted content is reviewed, fact-checked, and edited by a human editor
            before publication. We do not publish unedited AI output. Hands-on testing of tools is
            always performed by human reviewers.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            Questions about this policy? Errors to report? Tool suggestions?{" "}
            <Link href="/contact">Reach us here</Link> or email{" "}
            <a href="mailto:hello@aisaastoolkit.com">hello@aisaastoolkit.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
