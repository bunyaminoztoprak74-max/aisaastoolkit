"use client";
import { useState } from "react";
import { Sparkles, CheckCircle } from "lucide-react";
import { NewsletterForm } from "@/components/common/NewsletterForm";

export function NewsletterSignup() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 hero-bg opacity-[0.06] dark:opacity-[0.10]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="relative container mx-auto px-4 text-center max-w-2xl">
        <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: "linear-gradient(135deg,#667eea,#764ba2)" }}>
          <Sparkles className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Stay Ahead of the <span className="gradient-text">AI Curve</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-3">
          Get weekly roundups of the best new AI tools, exclusive deals, and expert tips — straight to your inbox.
        </p>
        <p className="text-sm font-medium text-primary mb-8">
          Get our free &quot;Top 50 AI Tools&quot; comparison guide when you subscribe.
        </p>
        <div className="max-w-md mx-auto">
          <NewsletterForm variant="hero" leadMagnet="Top 50 AI Tools comparison guide" />
        </div>
        <p className="text-xs text-muted-foreground mt-4">Join 12,000+ readers. Unsubscribe anytime. No spam, ever.</p>
      </div>
    </section>
  );
}
