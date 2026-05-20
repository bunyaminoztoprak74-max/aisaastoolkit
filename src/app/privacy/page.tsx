import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | AISaaSToolkit",
  description: "Read the AISaaSToolkit privacy policy to understand how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-black mb-2">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">Last updated: May 1, 2026</p>
      <div className="prose dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
        <section>
          <h2>1. Information We Collect</h2>
          <p>We collect information you voluntarily provide (e.g., email address for newsletter signup, contact form submissions). We also collect anonymized usage data through analytics tools to improve our content.</p>
        </section>
        <section>
          <h2>2. How We Use Your Information</h2>
          <p>We use collected information to: send the newsletter you subscribed to, respond to contact inquiries, analyze site usage to improve content quality, and comply with legal obligations.</p>
        </section>
        <section>
          <h2>3. Cookies</h2>
          <p>We use essential cookies for site functionality and optional analytics cookies (Google Analytics) to understand site traffic. You can disable cookies in your browser settings at any time.</p>
        </section>
        <section>
          <h2>4. Affiliate Links</h2>
          <p>Some links on this site are affiliate links. When you click these and make a purchase, we may receive a commission. The presence of affiliate links does not influence our editorial content.</p>
        </section>
        <section>
          <h2>5. Third-Party Services</h2>
          <p>We use third-party services including Google Analytics and email marketing platforms. These services have their own privacy policies. We recommend reviewing them separately.</p>
        </section>
        <section>
          <h2>6. Data Retention</h2>
          <p>We retain newsletter subscriber information until you unsubscribe. Contact form data is deleted after 90 days.</p>
        </section>
        <section>
          <h2>7. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. Contact us at hello@aisaastoolkit.com with any requests.</p>
        </section>
        <section>
          <h2>8. Contact</h2>
          <p>For privacy-related questions, email us at: <strong>privacy@aisaastoolkit.com</strong></p>
        </section>
      </div>
    </div>
  );
}
